<?php
/**
 * Fetch FNO Margins from NSE
 * Cron:    0 9 * * 1-5 php /path/to/api/fetch_margins.php
 * Browser: https://silverwebbuzz.com/ms/api/fetch_margins.php?key=SilverMS2024
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');
header('X-Accel-Buffering: no');
set_time_limit(300);

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

$isBrowser = php_sapi_name() !== 'cli';
if ($isBrowser && ($_GET['key'] ?? '') !== 'SilverMS2024') {
    http_response_code(403);
    die('Forbidden');
}

function out(string $msg): void {
    echo $msg . "\n";
    flush();
}

$today = date('Y-m-d');
out("Starting margin fetch for $today...");

// Step 1: Get F&O stock list
out("Fetching F&O stock list from NSE...");
$fnoList = nseGet('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O');

if (!$fnoList || !isset($fnoList['data'])) {
    die("ERROR: Could not fetch F&O list from NSE\n");
}

$symbols = [];
foreach ($fnoList['data'] as $stock) {
    $sym = $stock['symbol'] ?? '';
    if ($sym && $sym !== 'NIFTY 50') $symbols[] = $sym;
}
out("Found " . count($symbols) . " F&O symbols.");

// Step 2: For each symbol fetch derivative data
$db    = getDB();
$saved = 0;
$skip  = 0;

foreach ($symbols as $symbol) {
    $url   = 'https://www.nseindia.com/api/quote-derivative?symbol=' . urlencode($symbol);
    $deriv = nseGet($url);

    if (!$deriv || empty($deriv['stocks'])) {
        out("SKIP: $symbol (no derivative data)");
        $skip++;
        usleep(200000);
        continue;
    }

    $contractsSaved = 0;
    foreach ($deriv['stocks'] as $contract) {
        $meta      = $contract['metadata']                          ?? [];
        $tradeInfo = $contract['marketDeptOrderBook']['tradeInfo']  ?? [];

        if (($meta['instrumentType'] ?? '') !== 'Stock Futures') continue;

        $expiry   = $meta['expiryDate'] ?? '';
        $lotSize  = (int)($meta['lotSize']   ?? 0);
        $futPrice = (float)($meta['lastPrice'] ?? 0);
        $nrmlRate = (float)($tradeInfo['marginPercentage'] ?? 0);
        $nrmlAbs  = ($nrmlRate > 0 && $lotSize > 0 && $futPrice > 0)
                    ? round(($nrmlRate / 100) * $lotSize * $futPrice, 2)
                    : 0;

        if (!$expiry || !$lotSize) continue;

        $stmt = $db->prepare("
            INSERT INTO fno_margins
                (symbol, expiry, lot_size, nrml_margin, nrml_margin_rate, futures_price, fetched_date)
            VALUES
                (:symbol, :expiry, :lot_size, :nrml_margin, :nrml_margin_rate, :futures_price, :fetched_date)
            ON DUPLICATE KEY UPDATE
                lot_size         = VALUES(lot_size),
                nrml_margin      = VALUES(nrml_margin),
                nrml_margin_rate = VALUES(nrml_margin_rate),
                futures_price    = VALUES(futures_price),
                updated_at       = CURRENT_TIMESTAMP
        ");
        $stmt->execute([
            ':symbol'           => $symbol,
            ':expiry'           => $expiry,
            ':lot_size'         => $lotSize,
            ':nrml_margin'      => $nrmlAbs,
            ':nrml_margin_rate' => $nrmlRate,
            ':futures_price'    => $futPrice,
            ':fetched_date'     => $today,
        ]);
        $contractsSaved++;
        $saved++;
    }

    out("OK: $symbol — $contractsSaved contracts saved");
    usleep(200000);
}

out("\n=== DONE: $saved contracts saved, $skip symbols skipped for $today ===");
