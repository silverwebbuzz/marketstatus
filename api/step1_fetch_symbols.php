<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

echo "Fetching F&O symbol list from NSE...\n";
flush();

$data = nseGet('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O');

if (!$data || !isset($data['data'])) {
    die("FAILED: Could not fetch data\n");
}

$db = getDB();

// Make sure fno_prices has the symbol column ready
$saved = 0;
foreach ($data['data'] as $row) {
    $symbol = trim($row['symbol'] ?? '');
    if (!$symbol || $symbol === 'NIFTY 50') continue;

    // Insert symbol with basic price data from this API response
    $stmt = $db->prepare("
        INSERT INTO fno_prices (symbol, current_price, open_price, high_price, low_price, prev_close, change_amount, change_percent)
        VALUES (:symbol, :ltp, :open, :high, :low, :prev, :chg, :pchg)
        ON DUPLICATE KEY UPDATE
            current_price  = VALUES(current_price),
            open_price     = VALUES(open_price),
            high_price     = VALUES(high_price),
            low_price      = VALUES(low_price),
            prev_close     = VALUES(prev_close),
            change_amount  = VALUES(change_amount),
            change_percent = VALUES(change_percent),
            fetched_at     = CURRENT_TIMESTAMP
    ");
    $stmt->execute([
        ':symbol' => $symbol,
        ':ltp'    => (float)($row['lastPrice']      ?? 0),
        ':open'   => (float)($row['open']           ?? 0),
        ':high'   => (float)($row['dayHigh']        ?? 0),
        ':low'    => (float)($row['dayLow']         ?? 0),
        ':prev'   => (float)($row['previousClose']  ?? 0),
        ':chg'    => (float)($row['change']         ?? 0),
        ':pchg'   => (float)($row['pChange']        ?? 0),
    ]);

    echo "SAVED: $symbol — LTP: " . ($row['lastPrice'] ?? 'N/A') . "\n";
    flush();
    $saved++;
}

echo "\n=== DONE: $saved symbols saved to fno_prices ===\n";
