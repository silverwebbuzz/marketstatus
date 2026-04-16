<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

$limit = (int)($_GET['limit'] ?? 10);
$db    = getDB();

$symbols = $db->query("SELECT symbol FROM fno_prices ORDER BY symbol LIMIT $limit")->fetchAll(PDO::FETCH_COLUMN);

echo "Processing $limit symbols...\n\n";
flush();

$ok = $fail = 0;

foreach ($symbols as $symbol) {
    echo "--- $symbol ---\n";
    flush();

    // Call 1: main quote
    $data = nseGet('https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol));

    if (!$data || !isset($data['priceInfo'])) {
        echo "FAILED: no priceInfo\n\n";
        $fail++;
        usleep(300000);
        continue;
    }

    $p    = $data['priceInfo'];
    $info = $data['info']         ?? [];
    $ind  = $data['industryInfo'] ?? [];

    // Call 2: trade info (volume, delivery)
    $trade    = nseGet('https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol) . '&section=trade_info');
    $tradeDay = $trade['marketDeptOrderBook']['tradeInfo'] ?? [];
    $secDP    = $trade['securityWiseDP']                   ?? [];

    $row = [
        ':symbol'             => $symbol,
        ':company_name'       => $info['companyName']                      ?? '',
        ':industry'           => $ind['basicIndustry']                     ?? ($ind['industry'] ?? ''),
        ':sector'             => $ind['sector']                            ?? '',
        ':current_price'      => (float)($p['lastPrice']                   ?? 0),
        ':open_price'         => (float)($p['open']                        ?? 0),
        ':high_price'         => (float)($p['intraDayHighLow']['max']      ?? 0),
        ':low_price'          => (float)($p['intraDayHighLow']['min']      ?? 0),
        ':prev_close'         => (float)($p['previousClose']               ?? 0),
        ':vwap'               => (float)($p['vwap']                        ?? 0),
        ':change_amount'      => (float)($p['change']                      ?? 0),
        ':change_percent'     => (float)($p['pChange']                     ?? 0),
        ':week52_high'        => (float)($p['weekHighLow']['max']          ?? 0),
        ':week52_low'         => (float)($p['weekHighLow']['min']          ?? 0),
        ':upper_circuit'      => (float)(str_replace(',', '', $p['upperCP'] ?? '0')),
        ':lower_circuit'      => (float)(str_replace(',', '', $p['lowerCP'] ?? '0')),
        ':volume'             => (int)($tradeDay['tradedVolume']           ?? 0),
        ':total_traded_value' => (float)($tradeDay['tradedValue']         ?? 0),
        ':delivery_qty'       => (int)($secDP['deliveryQuantity']         ?? 0),
        ':delivery_pct'       => (float)($secDP['deliveryToTradedQuantity'] ?? 0),
    ];

    $stmt = $db->prepare("
        UPDATE fno_prices SET
            company_name       = :company_name,
            industry           = :industry,
            current_price      = :current_price,
            open_price         = :open_price,
            high_price         = :high_price,
            low_price          = :low_price,
            prev_close         = :prev_close,
            change_amount      = :change_amount,
            change_percent     = :change_percent,
            week52_high        = :week52_high,
            week52_low         = :week52_low,
            volume             = :volume,
            total_traded_value = :total_traded_value,
            delivery_qty       = :delivery_qty,
            delivery_pct       = :delivery_pct,
            fetched_at         = CURRENT_TIMESTAMP
        WHERE symbol = :symbol
    ");
    $stmt->execute(array_intersect_key($row, array_flip([
        ':symbol',':company_name',':industry',':current_price',':open_price',
        ':high_price',':low_price',':prev_close',':change_amount',':change_percent',
        ':week52_high',':week52_low',':volume',':total_traded_value',
        ':delivery_qty',':delivery_pct'
    ])));

    echo "OK | LTP: {$row[':current_price']} | 52W H: {$row[':week52_high']} | Vol: {$row[':volume']} | Delivery%: {$row[':delivery_pct']}\n\n";
    flush();
    $ok++;
    usleep(300000);
}

echo "=== DONE: $ok saved, $fail failed ===\n";
echo "Run all: ?limit=213\n";
