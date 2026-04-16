<?php
/**
 * Fetch FNO Margins from NSE
 * Cron:    0 9 * * 1-5 php /path/to/api/fetch_margins.php
 * Browser: https://silverwebbuzz.com/ms/api/fetch_margins.php?key=SilverMS2024
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

// Allow browser trigger with secret key
$isBrowser = php_sapi_name() !== 'cli';
if ($isBrowser) {
    if (($_GET['key'] ?? '') !== 'SilverMS2024') {
        http_response_code(403);
        die('Forbidden');
    }
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Accel-Buffering: no'); // disable nginx buffering
    set_time_limit(300);
    ob_implicit_flush(true);
    if (ob_get_level()) ob_end_flush();
}

$today = date('Y-m-d');

$fnoList = nseGet('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O');

if (!$fnoList || !isset($fnoList['data'])) {
    die("ERROR: Could not fetch F&O list from NSE\n");
}

$db      = getDB();
$saved   = 0;

foreach ($fnoList['data'] as $stock) {
    $symbol = $stock['symbol'] ?? '';
    if (!$symbol || $symbol === 'NIFTY 50') continue;

    $deriv = nseGet('https://www.nseindia.com/api/quote-derivative?symbol=' . urlencode($symbol));
    if (!$deriv) {
        echo "SKIP: $symbol\n";
        usleep(300000);
        continue;
    }

    foreach ($deriv['stocks'] ?? [] as $contract) {
        $meta      = $contract['metadata'] ?? [];
        $tradeInfo = $contract['marketDeptOrderBook']['tradeInfo'] ?? [];

        if (($meta['instrumentType'] ?? '') !== 'Stock Futures') continue;

        $expiry      = $meta['expiryDate']  ?? '';
        $lotSize     = (int)($meta['lotSize'] ?? 0);
        $futPrice    = (float)($meta['lastPrice'] ?? 0);
        $nrmlRate    = (float)($tradeInfo['marginPercentage'] ?? 0);
        $nrmlAbs     = ($nrmlRate > 0 && $lotSize > 0 && $futPrice > 0)
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
        $saved++;
    }

    usleep(300000);
}

echo "Done: $saved records saved for $today\n";
