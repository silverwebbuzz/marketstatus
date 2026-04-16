<?php
/**
 * Fetch Zerodha margin calculator, parse and save to DB
 * Cron:    0 9 * * 1-5 php /path/to/api/fetch_zerodha.php
 * Browser: https://silverwebbuzz.com/ms/api/fetch_zerodha.php?key=SilverMS2024
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');
header('X-Accel-Buffering: no');
set_time_limit(120);

$isBrowser = php_sapi_name() !== 'cli';
if ($isBrowser && ($_GET['key'] ?? '') !== 'SilverMS2024') {
    http_response_code(403); die('Forbidden');
}

require_once __DIR__ . '/../db.php';

function out($m) { echo $m . "\n"; flush(); }

// ── Step 1: Fetch HTML ─────────────────────────────
out("Step 1: Fetching Zerodha margin calculator...");

$cookieFile = sys_get_temp_dir() . '/zerodha_cookies.txt';

// Hit homepage first to get cookies
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://zerodha.com/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR      => $cookieFile,
    CURLOPT_COOKIEFILE     => $cookieFile,
    CURLOPT_HTTPHEADER     => ['User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'],
]);
curl_exec($ch);
curl_close($ch);
sleep(1);

// Fetch margin calculator page
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://zerodha.com/margin-calculator/Futures/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR      => $cookieFile,
    CURLOPT_COOKIEFILE     => $cookieFile,
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language: en-US,en;q=0.9',
        'Referer: https://zerodha.com/',
        'Upgrade-Insecure-Requests: 1',
    ],
]);
$html   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

out("HTTP: $status | Size: " . number_format(strlen($html ?? '')) . " bytes");
if ($err) { out("cURL error: $err"); die(); }
if ($status !== 200 || strlen($html) < 50000) { out("ERROR: Could not fetch page."); die(); }

// ── Step 2: Parse <tr> data attributes ────────────
out("Step 2: Parsing margin data...");

// Match all <tr> rows with data-scrip attribute
preg_match_all(
    '/<tr[^>]+data-scrip="([^"]+)"[^>]+data-expiry="([^"]+)"[^>]+data-margin="([^"]+)"[^>]+data-lot_size="([^"]+)"[^>]+data-nrml_margin="([^"]+)"[^>]+data-mis_margin="([^"]+)"[^>]+data-price="([^"]+)"[^>]*/i',
    $html,
    $matches,
    PREG_SET_ORDER
);

out("Found " . count($matches) . " contracts.");

if (empty($matches)) {
    out("ERROR: No contracts parsed. HTML structure may have changed.");
    die();
}

// ── Step 3: Save to DB ────────────────────────────
out("Step 3: Saving to database...");

$db    = getDB();
$today = date('Y-m-d');
$saved = 0;

// Clear today's data
$db->prepare("DELETE FROM fno_margins WHERE fetched_date = ?")->execute([$today]);

$stmt = $db->prepare("
    INSERT INTO fno_margins
        (symbol, expiry, lot_size, nrml_margin, mis_margin, nrml_margin_rate, futures_price, fetched_date)
    VALUES
        (:symbol, :expiry, :lot_size, :nrml_margin, :mis_margin, :nrml_margin_rate, :futures_price, :fetched_date)
    ON DUPLICATE KEY UPDATE
        lot_size         = VALUES(lot_size),
        nrml_margin      = VALUES(nrml_margin),
        mis_margin       = VALUES(mis_margin),
        nrml_margin_rate = VALUES(nrml_margin_rate),
        futures_price    = VALUES(futures_price),
        updated_at       = CURRENT_TIMESTAMP
");

foreach ($matches as $m) {
    $symbol    = trim($m[1]);
    $expiry    = trim($m[2]);   // e.g. 28-APR-2026
    $marginPct = (float)$m[3]; // e.g. 22.26
    $lotSize   = (int)$m[4];
    $nrml      = (float)$m[5]; // absolute margin in ₹
    $mis       = (float)$m[6];
    $price     = (float)$m[7];

    $stmt->execute([
        ':symbol'           => $symbol,
        ':expiry'           => $expiry,
        ':lot_size'         => $lotSize,
        ':nrml_margin'      => $nrml,
        ':mis_margin'       => $mis,
        ':nrml_margin_rate' => $marginPct,
        ':futures_price'    => $price,
        ':fetched_date'     => $today,
    ]);

    out("$symbol | $expiry | Lot: $lotSize | NRML: ₹" . number_format($nrml) . " ($marginPct%) | Price: ₹$price");
    $saved++;
}

out("\n=== DONE: $saved contracts saved for $today ===");
