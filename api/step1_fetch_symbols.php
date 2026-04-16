<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

echo "Fetching F&O list from NSE...\n";
flush();

$data = nseGet('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O');

if (!$data || !isset($data['data'])) {
    die("FAILED: Could not fetch data\n");
}

$db    = getDB();
$saved = 0;

foreach ($data['data'] as $row) {
    $symbol = trim($row['symbol'] ?? '');
    if (!$symbol || $symbol === 'NIFTY 50') continue;

    $meta = $row['meta'] ?? [];

    $stmt = $db->prepare("
        INSERT INTO fno_prices
            (symbol, company_name, industry, current_price, open_price, high_price, low_price,
             prev_close, change_amount, change_percent, volume, total_traded_value,
             week52_high, week52_low)
        VALUES
            (:symbol, :company_name, :industry, :ltp, :open, :high, :low,
             :prev, :chg, :pchg, :vol, :tval, :w52h, :w52l)
        ON DUPLICATE KEY UPDATE
            company_name       = VALUES(company_name),
            industry           = VALUES(industry),
            current_price      = VALUES(current_price),
            open_price         = VALUES(open_price),
            high_price         = VALUES(high_price),
            low_price          = VALUES(low_price),
            prev_close         = VALUES(prev_close),
            change_amount      = VALUES(change_amount),
            change_percent     = VALUES(change_percent),
            volume             = VALUES(volume),
            total_traded_value = VALUES(total_traded_value),
            week52_high        = VALUES(week52_high),
            week52_low         = VALUES(week52_low),
            fetched_at         = CURRENT_TIMESTAMP
    ");

    $stmt->execute([
        ':symbol'       => $symbol,
        ':company_name' => $meta['companyName'] ?? '',
        ':industry'     => $meta['industry']    ?? '',
        ':ltp'          => (float)($row['lastPrice']         ?? 0),
        ':open'         => (float)($row['open']              ?? 0),
        ':high'         => (float)($row['dayHigh']           ?? 0),
        ':low'          => (float)($row['dayLow']            ?? 0),
        ':prev'         => (float)($row['previousClose']     ?? 0),
        ':chg'          => (float)($row['change']            ?? 0),
        ':pchg'         => (float)($row['pChange']           ?? 0),
        ':vol'          => (int)($row['totalTradedVolume']   ?? 0),
        ':tval'         => (float)($row['totalTradedValue']  ?? 0),
        ':w52h'         => (float)($row['yearHigh']          ?? 0),
        ':w52l'         => (float)($row['yearLow']           ?? 0),
    ]);

    echo "SAVED: $symbol | LTP: {$row['lastPrice']} | Vol: {$row['totalTradedVolume']} | 52W H: {$row['yearHigh']}\n";
    flush();
    $saved++;
}

echo "\n=== DONE: $saved symbols saved ===\n";
echo "All price data, volume, 52W high/low, company name, industry saved in one shot.\n";
echo "No need for step2 — this single API gives everything.\n";
