<?php
/**
 * Returns FNO table data as JSON (margins + prices joined).
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$db = getDB();

$sql = "
    SELECT
        m.symbol, m.expiry, m.lot_size, m.nrml_margin, m.mis_margin, m.nrml_margin_rate, m.futures_price, m.mwpl,
        p.company_name, p.industry,
        p.current_price, p.open_price, p.high_price, p.low_price, p.close_price,
        p.prev_close, p.change_amount, p.change_percent,
        p.volume, p.total_traded_value,
        p.week52_high, p.week52_low,
        p.delivery_qty, p.delivery_pct,
        p.fetched_at AS price_updated
    FROM fno_margins m
    LEFT JOIN fno_prices p ON p.symbol = m.symbol
    WHERE m.fetched_date = (SELECT MAX(fetched_date) FROM fno_margins)
    ORDER BY m.symbol, m.expiry
";

$rows    = $db->query($sql)->fetchAll();
$grouped = [];

foreach ($rows as $row) {
    $sym = $row['symbol'];
    if (!isset($grouped[$sym])) {
        $grouped[$sym] = [
            'symbol'             => $sym,
            'company_name'       => $row['company_name'],
            'industry'           => $row['industry'],
            'current_price'      => (float)$row['current_price'],
            'open_price'         => (float)$row['open_price'],
            'high_price'         => (float)$row['high_price'],
            'low_price'          => (float)$row['low_price'],
            'close_price'        => (float)$row['close_price'],
            'prev_close'         => (float)$row['prev_close'],
            'change_amount'      => (float)$row['change_amount'],
            'change_percent'     => (float)$row['change_percent'],
            'volume'             => (int)$row['volume'],
            'total_traded_value' => (float)$row['total_traded_value'],
            'week52_high'        => (float)$row['week52_high'],
            'week52_low'         => (float)$row['week52_low'],
            'delivery_qty'       => (int)$row['delivery_qty'],
            'delivery_pct'       => (float)$row['delivery_pct'],
            'price_updated'      => $row['price_updated'],
            'contracts'          => [],
        ];
    }
    $grouped[$sym]['contracts'][] = [
        'expiry'           => $row['expiry'],
        'lot_size'         => (int)$row['lot_size'],
        'nrml_margin'      => (float)$row['nrml_margin'],
        'mis_margin'       => (float)$row['mis_margin'],
        'nrml_margin_rate' => (float)$row['nrml_margin_rate'],
        'futures_price'    => (float)$row['futures_price'],
        'mwpl'             => (float)$row['mwpl'],
    ];
}

echo json_encode([
    'success' => true,
    'count'   => count($grouped),
    'data'    => array_values($grouped),
]);
