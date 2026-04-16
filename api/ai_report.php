<?php
/**
 * Generate AI report for a symbol using Claude Haiku
 * GET ?symbol=RELIANCE          — fetch cached report
 * GET ?symbol=RELIANCE&refresh=1 — force regenerate
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

function _ms_model_label(string $key): string {
    return $key === 'sonnet' ? 'Sonnet' : 'Haiku';
}

function _ms_pick_model(string $key): array {
    $key = strtolower(trim($key));
    if ($key === 'sonnet') {
        $m = defined('ANTHROPIC_MODEL_SONNET') ? ANTHROPIC_MODEL_SONNET : '';
        return ['key' => 'sonnet', 'label' => _ms_model_label('sonnet'), 'model' => $m];
    }
    if ($key === 'haiku') {
        $m = defined('ANTHROPIC_MODEL_HAIKU') ? ANTHROPIC_MODEL_HAIKU : (defined('ANTHROPIC_MODEL') ? ANTHROPIC_MODEL : '');
        return ['key' => 'haiku', 'label' => _ms_model_label('haiku'), 'model' => $m];
    }
    // default
    $m = defined('ANTHROPIC_MODEL') ? ANTHROPIC_MODEL : '';
    return ['key' => 'default', 'label' => 'Default', 'model' => $m];
}

// Must be logged in
$user = authUser();
if (!$user) {
    echo json_encode(['success' => false, 'error' => 'Login required']); exit;
}

$symbol  = strtoupper(trim($_GET['symbol'] ?? ''));
$refresh = isset($_GET['refresh']);
$all     = isset($_GET['all']);
$modelKey = strtolower(trim($_GET['model'] ?? 'haiku'));
$modelSel = _ms_pick_model($modelKey);
$modelId  = $modelSel['model'];
$maxTokens = ($modelSel['key'] === 'sonnet') ? 1800 : 1024;
$temperature = 0; // deterministic; safer for finance-style outputs

if (!$symbol) {
    echo json_encode(['success' => false, 'error' => 'Symbol required']); exit;
}

$db = getDB();

// ── Fetch cached reports (multi-model) ─────────────────
if ($all) {
    $rows = $db->prepare("SELECT * FROM ai_reports WHERE symbol = ? ORDER BY generated_at DESC");
    $rows->execute([$symbol]);
    $reports = $rows->fetchAll() ?: [];
    echo json_encode(['success' => true, 'cached' => true, 'reports' => $reports]);
    exit;
}

// ── Return cached report if fresh (< 24h) and not forced ─
if (!$refresh) {
    $cached = $db->prepare("SELECT * FROM ai_reports WHERE symbol = ? AND model_used = ? LIMIT 1");
    $cached->execute([$symbol, $modelId ?: (defined('ANTHROPIC_MODEL') ? ANTHROPIC_MODEL : '')]);
    $report = $cached->fetch();
    if ($report) {
        $age = time() - strtotime($report['generated_at']);
        if ($age < 86400) {
            echo json_encode([
                'success'   => true,
                'cached'    => true,
                'age_hours' => round($age/3600, 1),
                'report'    => $report,
            ]);
            exit;
        }
    }
}

// ── Fetch stock data ──────────────────────────────────
$data = $db->prepare("
    SELECT
        m.symbol, m.expiry, m.lot_size, m.nrml_margin, m.mis_margin,
        m.nrml_margin_rate, m.futures_price, m.mwpl,
        p.company_name, p.industry,
        p.current_price, p.open_price, p.high_price, p.low_price,
        p.prev_close, p.change_amount, p.change_percent,
        p.volume, p.total_traded_value, p.delivery_pct,
        p.week52_high, p.week52_low
    FROM fno_margins m
    LEFT JOIN fno_prices p ON p.symbol = m.symbol
    WHERE m.symbol = ? AND m.fetched_date = (SELECT MAX(fetched_date) FROM fno_margins)
    ORDER BY m.expiry
    LIMIT 1
");
$data->execute([$symbol]);
$d = $data->fetch();

if (!$d || !$d['current_price']) {
    echo json_encode(['success' => false, 'error' => 'No data found for ' . $symbol]); exit;
}

// ── Calculate derived values ──────────────────────────
$high  = (float)$d['high_price'];
$low   = (float)$d['low_price'];
$close = (float)$d['prev_close'] ?: (float)$d['current_price'];
$pivot = ($high + $low + $close) / 3;
$r1    = 2 * $pivot - $low;
$r2    = $pivot + ($high - $low);
$s1    = 2 * $pivot - $high;
$s2    = $pivot - ($high - $low);

$w52h   = (float)$d['week52_high'];
$w52l   = (float)$d['week52_low'];
$curr   = (float)$d['current_price'];
$fibRange = $w52h - $w52l;
$fib236 = $w52h - $fibRange * 0.236;
$fib382 = $w52h - $fibRange * 0.382;
$fib50  = $w52h - $fibRange * 0.5;
$fib618 = $w52h - $fibRange * 0.618;

$fromHigh   = $w52h > 0 ? round(($w52h - $curr) / $w52h * 100, 1) : 0;
$fromLow    = $w52l > 0 ? round(($curr - $w52l) / $w52l * 100, 1) : 0;
$premium    = (float)$d['futures_price'] > 0 ? round((float)$d['futures_price'] - $curr, 2) : 0;
$todayPL    = round((float)$d['change_amount'] * (int)$d['lot_size'], 2);
$roi        = (float)$d['nrml_margin'] > 0 ? round($todayPL / (float)$d['nrml_margin'] * 100, 2) : 0;
$pivotBias  = $curr > $pivot ? 'Above Pivot (Bullish bias)' : 'Below Pivot (Bearish bias)';
$pctPos52w  = ($w52h - $w52l) > 0 ? round(($curr - $w52l) / ($w52h - $w52l) * 100, 1) : 0;
$deliveryPctRaw = isset($d['delivery_pct']) ? (float)$d['delivery_pct'] : 0.0;
// NSE delivery% is frequently 0 intraday / missing. Treat 0 as "unknown" for AI.
$deliveryPctForAi = $deliveryPctRaw > 0 ? (string)$deliveryPctRaw : 'N/A';

// Simple signal score
$score = 0;
if ((float)$d['change_percent'] > 1)  $score++;
if ((float)$d['change_percent'] > 2)  $score++;
if ((float)$d['change_percent'] < -1) $score--;
if ((float)$d['change_percent'] < -2) $score--;
if ((float)$d['delivery_pct'] > 50)   $score++;
if ((float)$d['delivery_pct'] < 20 && (float)$d['delivery_pct'] > 0) $score--;
if ($fromHigh > 40) $score++;
if ($fromHigh < 5)  $score--;
$signal = $score >= 2 ? 'BUY' : ($score <= -2 ? 'SELL' : 'NEUTRAL');

// ── Build prompt ──────────────────────────────────────
$prompt = <<<PROMPT
You are an expert Indian stock market analyst specializing in NSE F&O (Futures & Options) stocks.
Analyze the following data for {$d['symbol']} and provide a concise trading report.

=== STOCK DATA ===
Symbol:        {$d['symbol']}
Company:       {$d['company_name']}
Sector:        {$d['industry']}

=== PRICE ===
Current Price: ₹{$curr}
Today Change:  {$d['change_amount']} ({$d['change_percent']}%)
Open:          ₹{$d['open_price']}
High:          ₹{$d['high_price']}
Low:           ₹{$d['low_price']}
Prev Close:    ₹{$d['prev_close']}

=== 52-WEEK RANGE ===
52W High:      ₹{$w52h} ({$fromHigh}% away)
52W Low:       ₹{$w52l} ({$fromLow}% above)
Position:      {$pctPos52w}% of 52W range (0%=at low, 100%=at high)

=== F&O DATA ===
Expiry:        {$d['expiry']}
Lot Size:      {$d['lot_size']}
Futures Price: ₹{$d['futures_price']}
Futures Premium: ₹{$premium}
NRML Margin:   ₹{$d['nrml_margin']} ({$d['nrml_margin_rate']}%)
MIS Margin:    ₹{$d['mis_margin']}
MWPL:          {$d['mwpl']}% (Market-Wide Position Limit used)
Today P/L/lot: ₹{$todayPL}
Today ROI:     {$roi}%

=== VOLUME & DELIVERY ===
Volume:        {$d['volume']}
Delivery %:    {$deliveryPctForAi}

=== TECHNICAL LEVELS ===
Pivot (P):     ₹{$pivot}
R1:            ₹{$r1}
R2:            ₹{$r2}
S1:            ₹{$s1}
S2:            ₹{$s2}
Pivot Bias:    {$pivotBias}
Fib 23.6%:     ₹{$fib236}
Fib 38.2%:     ₹{$fib382}
Fib 50%:       ₹{$fib50}
Fib 61.8%:     ₹{$fib618}

=== SYSTEM SIGNAL ===
Algo Signal:   {$signal} (score: {$score})

=== YOUR ANALYSIS ===
Based on ALL the above data, provide:

1. **BIAS**: State BULLISH, BEARISH, or NEUTRAL with a confidence percentage (e.g. BULLISH 72%)

2. **KEY REASONS**: 3-5 bullet points explaining the bias (reference specific numbers from the data)

3. **KEY LEVELS TO WATCH**:
   - Strong Support: ₹___
   - Strong Resistance: ₹___
   - Stop Loss suggestion: ₹___
   - Target suggestion: ₹___

4. **RISK FACTORS**: 2-3 specific risks for this trade right now

5. **SHORT-TERM OUTLOOK (1-5 days)**: One concise paragraph

Keep the entire response under 400 words. Be specific, use the actual numbers provided. Do not add disclaimers.

OUTPUT FORMAT (STRICT):
- Return ONLY valid JSON.
- Do not wrap in markdown fences.
- Do not include any extra keys outside the schema.
- If a field is unknown / missing / unreliable (example: Delivery % = N/A or 0.00 intraday), use null (not 0) and mention that in key_reasons.
- Always incorporate MWPL % in KEY REASONS (not only risks). Interpret:
  - > 50% as elevated concentration/crowding (can be bullish continuation OR risk; explain)
  - < 20% as lower participation/conviction (explain)

JSON SCHEMA:
{
  "bias": "BULLISH" | "BEARISH" | "NEUTRAL",
  "confidence": 0-100,
  "key_reasons": [
    {"reason": "string", "numbers_used": ["string", "..."]}
  ],
  "levels": {
    "strong_support": {"label": "string", "price": number|null},
    "strong_resistance": {"label": "string", "price": number|null},
    "stop_loss": {"label": "string", "price": number|null},
    "target": {"label": "string", "price": number|null}
  },
  "risk_factors": ["string", "..."],
  "outlook_1_5d": "string"
}
PROMPT;

// ── Call Anthropic API ────────────────────────────────
if (!defined('ANTHROPIC_API_KEY') || ANTHROPIC_API_KEY === '<Key here>') {
    echo json_encode(['success' => false, 'error' => 'Anthropic API key not configured. Set ANTHROPIC_API_KEY in config.php on the server.']);
    exit;
}

if (!$modelId) {
    $lbl = $modelSel['label'];
    echo json_encode(['success' => false, 'error' => "$lbl model is not configured. Set ANTHROPIC_MODEL_" . strtoupper($modelSel['key']) . " in config.php."]);
    exit;
}

$payload = json_encode([
    'model'      => $modelId,
    'max_tokens' => $maxTokens,
    'temperature'=> $temperature,
    'system'     => "You must follow these rules strictly:\n"
        . "1) Output ONLY valid JSON matching the provided schema. No markdown, no extra text.\n"
        . "2) Use ONLY the numbers in the prompt. If a value is missing or unreliable (example: Delivery % is N/A or 0.00 intraday), set the JSON value to null and state that in key_reasons.\n"
        . "3) Do not invent support/resistance outside the provided pivot/fib levels and prices.\n"
        . "4) Always incorporate MWPL % in KEY REASONS (not only risks). Treat >50% as crowding/concentration; treat <20% as lower participation. Explain which side it supports and why.\n"
        . "5) Keep it concise; prefer concrete numeric references in numbers_used.",
    'messages'   => [
        ['role' => 'user', 'content' => $prompt]
    ]
]);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://api.anthropic.com/v1/messages',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_TIMEOUT        => 60,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'x-api-key: ' . ANTHROPIC_API_KEY,
        'anthropic-version: 2023-06-01',
    ],
]);

$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

if ($err || $status !== 200) {
    echo json_encode(['success' => false, 'error' => "Anthropic API error: HTTP $status — $err — " . substr($body, 0, 200)]);
    exit;
}

$resp = json_decode($body, true);
$text = $resp['content'][0]['text'] ?? '';

if (!$text) {
    echo json_encode(['success' => false, 'error' => 'Empty response from AI']); exit;
}

// ── Parse JSON response safely ────────────────────────
$jsonText = trim($text);
// If the model accidentally wrapped in fences, strip them.
$jsonText = preg_replace('/^\s*```(?:json)?\s*/i', '', $jsonText);
$jsonText = preg_replace('/\s*```\s*$/', '', $jsonText);

$parsed = json_decode($jsonText, true);
if (!is_array($parsed)) {
    echo json_encode([
        'success' => false,
        'error'   => 'AI returned invalid JSON. Try refresh.',
        'debug'   => substr($text, 0, 400),
    ]);
    exit;
}

// Normalize + validate minimal fields
$biasRaw = strtoupper(trim((string)($parsed['bias'] ?? 'NEUTRAL')));
$bias    = in_array($biasRaw, ['BULLISH','BEARISH','NEUTRAL'], true) ? $biasRaw : 'NEUTRAL';
$confidence = (int)($parsed['confidence'] ?? 50);
if ($confidence < 0) $confidence = 0;
if ($confidence > 100) $confidence = 100;

// Build a readable report text (keep UI-friendly markdown-ish formatting)
$reasons = $parsed['key_reasons'] ?? [];
$risk    = $parsed['risk_factors'] ?? [];
$levels  = $parsed['levels'] ?? [];

$fmtLevel = function($obj) {
    if (!is_array($obj)) return 'N/A';
    $label = trim((string)($obj['label'] ?? ''));
    $price = $obj['price'] ?? null;
    if ($price === null || $price === '') return $label ? ($label . ' (N/A)') : 'N/A';
    $p = is_numeric($price) ? (float)$price : null;
    if ($p === null) return $label ? ($label . ' (N/A)') : 'N/A';
    return ($label ? ($label . ': ') : '') . '₹' . rtrim(rtrim(number_format($p, 2, '.', ''), '0'), '.');
};

$reportLines = [];
$reportLines[] = "# {$symbol} - TRADING REPORT";
$reportLines[] = "";
$reportLines[] = "## 1. BIAS";
$reportLines[] = "**{$bias} {$confidence}%**";
$reportLines[] = "";
$reportLines[] = "## 2. KEY REASONS";
if (is_array($reasons) && count($reasons) > 0) {
    foreach (array_slice($reasons, 0, 6) as $r) {
        if (!is_array($r)) continue;
        $reason = trim((string)($r['reason'] ?? ''));
        if ($reason === '') continue;
        $nums = $r['numbers_used'] ?? [];
        $numsTxt = '';
        if (is_array($nums) && count($nums) > 0) {
            $numsTxt = ' (data: ' . implode(', ', array_map('strval', array_slice($nums, 0, 6))) . ')';
        }
        $reportLines[] = "- **{$reason}**{$numsTxt}";
    }
} else {
    $reportLines[] = "- **N/A**";
}
$reportLines[] = "";
$reportLines[] = "## 3. KEY LEVELS TO WATCH";
$reportLines[] = "- **Strong Support**: " . $fmtLevel($levels['strong_support'] ?? null);
$reportLines[] = "- **Strong Resistance**: " . $fmtLevel($levels['strong_resistance'] ?? null);
$reportLines[] = "- **Stop Loss**: " . $fmtLevel($levels['stop_loss'] ?? null);
$reportLines[] = "- **Target**: " . $fmtLevel($levels['target'] ?? null);
$reportLines[] = "";
$reportLines[] = "## 4. RISK FACTORS";
if (is_array($risk) && count($risk) > 0) {
    foreach (array_slice($risk, 0, 6) as $rf) {
        $t = trim((string)$rf);
        if ($t === '') continue;
        $reportLines[] = "- **{$t}**";
    }
} else {
    $reportLines[] = "- **N/A**";
}
$reportLines[] = "";
$reportLines[] = "## 5. SHORT-TERM OUTLOOK (1-5 DAYS)";
$outlook = trim((string)($parsed['outlook_1_5d'] ?? ''));
$reportLines[] = $outlook !== '' ? $outlook : 'N/A';

$text = implode("\n", $reportLines);

// ── Save to DB ────────────────────────────────────────
$db->prepare("
    INSERT INTO ai_reports (symbol, bias, confidence, report_text, model_used)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        bias         = VALUES(bias),
        confidence   = VALUES(confidence),
        report_text  = VALUES(report_text),
        model_used   = VALUES(model_used),
        generated_at = CURRENT_TIMESTAMP
")->execute([$symbol, $bias, $confidence, $text, $modelId]);

echo json_encode([
    'success'    => true,
    'cached'     => false,
    'age_hours'  => 0,
    'report'     => [
        'symbol'       => $symbol,
        'bias'         => $bias,
        'confidence'   => $confidence,
        'report_text'  => $text,
        'model_used'   => $modelId,
        'generated_at' => date('Y-m-d H:i:s'),
    ]
]);
