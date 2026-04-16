<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

// How many to process — increase once confirmed working
$limit = (int)($_GET['limit'] ?? 10);

$db      = getDB();
$symbols = $db->query("SELECT symbol FROM fno_prices ORDER BY symbol LIMIT $limit")->fetchAll(PDO::FETCH_COLUMN);

echo "Processing $limit symbols...\n\n";
flush();

$ok   = 0;
$fail = 0;

foreach ($symbols as $symbol) {
    echo "--- $symbol ---\n";
    flush();

    $data = nseGet('https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol));

    if (!$data || !isset($data['priceInfo'])) {
        echo "FAILED: no priceInfo in response\n";
        if ($data) echo "Keys returned: " . implode(', ', array_keys($data)) . "\n";
        $fail++;
        usleep(300000);
        continue;
    }

    $p    = $data['priceInfo'];
    $info = $data['info']         ?? [];
    $ind  = $data['industryInfo'] ?? [];
    $dp   = $data['securityWiseDP'] ?? [];

    $row = [
        ':symbol'             => $symbol,
        ':company_name'       => $info['companyName'] ?? '',
        ':industry'           => $ind['industry']     ?? '',
        ':current_price'      => (float)($p['lastPrice']               ?? 0),
        ':open_price'         => (float)($p['open']                    ?? 0),
        ':high_price'         => (float)($p['intraDayHighLow']['max']  ?? 0),
        ':low_price'          => (float)($p['intraDayHighLow']['min']  ?? 0),
        ':close_price'        => (float)($p['close']                   ?? 0),
        ':prev_close'         => (float)($p['previousClose']           ?? 0),
        ':change_amount'      => (float)($p['change']                  ?? 0),
        ':change_percent'     => (float)($p['pChange']                 ?? 0),
        ':volume'             => (int)($dp['quantityTraded']           ?? 0),
        ':total_traded_value' => (float)($p['totalTradedVolume']       ?? 0),
        ':week52_high'        => (float)($p['weekHighLow']['max']      ?? 0),
        ':week52_low'         => (float)($p['weekHighLow']['min']      ?? 0),
        ':delivery_qty'       => (int)($dp['deliveryQuantity']         ?? 0),
        ':delivery_pct'       => (float)($dp['deliveryToTradedQuantity'] ?? 0),
    ];

    $stmt = $db->prepare("
        UPDATE fno_prices SET
            company_name       = :company_name,
            industry           = :industry,
            current_price      = :current_price,
            open_price         = :open_price,
            high_price         = :high_price,
            low_price          = :low_price,
            close_price        = :close_price,
            prev_close         = :prev_close,
            change_amount      = :change_amount,
            change_percent     = :change_percent,
            volume             = :volume,
            total_traded_value = :total_traded_value,
            week52_high        = :week52_high,
            week52_low         = :week52_low,
            delivery_qty       = :delivery_qty,
            delivery_pct       = :delivery_pct,
            fetched_at         = CURRENT_TIMESTAMP
        WHERE symbol = :symbol
    ");
    $stmt->execute($row);

    echo "OK: " . ($info['companyName'] ?? '') . " | LTP: " . $p['lastPrice'] . " | 52W H: " . ($p['weekHighLow']['max'] ?? 'N/A') . "\n";
    flush();
    $ok++;
    usleep(300000);
}

echo "\n=== DONE: $ok saved, $fail failed ===\n";
echo "To process all symbols add ?limit=213 to URL\n";
