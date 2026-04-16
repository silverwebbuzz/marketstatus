<?php
/**
 * Fetch live prices for FNO stocks from NSE.
 * Called via AJAX from dashboard or run directly for bulk fetch.
 *
 * ?symbol=RELIANCE  → single symbol
 * (no param)        → all symbols from DB
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

header('Content-Type: application/json');

$symbol = isset($_GET['symbol']) ? strtoupper(trim($_GET['symbol'])) : '';

if ($symbol) {
    $data = fetchAndSavePrice($symbol);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

$db      = getDB();
$symbols = $db->query("SELECT DISTINCT symbol FROM fno_margins ORDER BY symbol")->fetchAll(PDO::FETCH_COLUMN);

$results = [];
foreach ($symbols as $sym) {
    $results[$sym] = fetchAndSavePrice($sym);
    usleep(200000);
}

echo json_encode(['success' => true, 'count' => count($results), 'data' => $results]);

function fetchAndSavePrice(string $symbol): ?array {
    $data = nseGet('https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol));
    if (!$data || !isset($data['priceInfo'])) return null;

    $p    = $data['priceInfo'];
    $info = $data['info'] ?? [];
    $ind  = $data['industryInfo'] ?? [];

    $row = [
        'symbol'             => $symbol,
        'company_name'       => $info['companyName'] ?? '',
        'industry'           => $ind['industry'] ?? '',
        'current_price'      => (float)($p['lastPrice'] ?? 0),
        'open_price'         => (float)($p['open'] ?? 0),
        'high_price'         => (float)($p['intraDayHighLow']['max'] ?? 0),
        'low_price'          => (float)($p['intraDayHighLow']['min'] ?? 0),
        'close_price'        => (float)($p['close'] ?? 0),
        'prev_close'         => (float)($p['previousClose'] ?? 0),
        'change_amount'      => (float)($p['change'] ?? 0),
        'change_percent'     => (float)($p['pChange'] ?? 0),
        'volume'             => (int)($data['securityWiseDP']['quantityTraded'] ?? 0),
        'total_traded_value' => (float)($p['totalTradedVolume'] ?? 0),
        'week52_high'        => (float)($p['weekHighLow']['max'] ?? 0),
        'week52_low'         => (float)($p['weekHighLow']['min'] ?? 0),
        'delivery_qty'       => (int)($data['securityWiseDP']['deliveryQuantity'] ?? 0),
        'delivery_pct'       => (float)($data['securityWiseDP']['deliveryToTradedQuantity'] ?? 0),
    ];

    try {
        $db   = getDB();
        $stmt = $db->prepare("
            INSERT INTO fno_prices
                (symbol, company_name, industry, current_price, open_price, high_price, low_price,
                 close_price, prev_close, change_amount, change_percent, volume, total_traded_value,
                 week52_high, week52_low, delivery_qty, delivery_pct)
            VALUES
                (:symbol, :company_name, :industry, :current_price, :open_price, :high_price, :low_price,
                 :close_price, :prev_close, :change_amount, :change_percent, :volume, :total_traded_value,
                 :week52_high, :week52_low, :delivery_qty, :delivery_pct)
            ON DUPLICATE KEY UPDATE
                company_name       = VALUES(company_name),
                industry           = VALUES(industry),
                current_price      = VALUES(current_price),
                open_price         = VALUES(open_price),
                high_price         = VALUES(high_price),
                low_price          = VALUES(low_price),
                close_price        = VALUES(close_price),
                prev_close         = VALUES(prev_close),
                change_amount      = VALUES(change_amount),
                change_percent     = VALUES(change_percent),
                volume             = VALUES(volume),
                total_traded_value = VALUES(total_traded_value),
                week52_high        = VALUES(week52_high),
                week52_low         = VALUES(week52_low),
                delivery_qty       = VALUES(delivery_qty),
                delivery_pct       = VALUES(delivery_pct),
                fetched_at         = CURRENT_TIMESTAMP
        ");
        $stmt->execute($row);
    } catch (Exception $e) {}

    return $row;
}
