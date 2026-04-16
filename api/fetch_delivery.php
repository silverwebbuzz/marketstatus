<?php
/**
 * Fetch Equity delivery data (Delivery Qty / Delivery %) from NSE and save into fno_prices.
 * On-demand endpoint to avoid slowing the main dashboard load.
 *
 * GET ?symbol=INFY
 */
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

header('Content-Type: application/json');

$symbol = strtoupper(trim($_GET['symbol'] ?? ''));
if (!$symbol) {
    echo json_encode(['success' => false, 'error' => 'Symbol required']);
    exit;
}

$url  = 'https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol) . '&section=trade_info';
$data = nseGetWithSession($url);

if (!$data) {
    echo json_encode(['success' => false, 'error' => 'Could not reach NSE API.']);
    exit;
}

$dp = $data['securityWiseDP'] ?? null;
if (!is_array($dp)) {
    echo json_encode(['success' => false, 'error' => 'NSE response missing securityWiseDP.']);
    exit;
}

$deliveryQty = isset($dp['deliveryQuantity']) ? (int)$dp['deliveryQuantity'] : 0;
$deliveryPct = isset($dp['deliveryToTradedQuantity']) ? (float)$dp['deliveryToTradedQuantity'] : 0.0;
$asOf        = trim((string)($dp['secWiseDelPosDate'] ?? ''));

// Some symbols may not have delivery data for the current session.
if ($deliveryQty <= 0 && $deliveryPct <= 0) {
    echo json_encode([
        'success' => false,
        'error'   => 'No delivery data available from NSE for ' . $symbol,
        'as_of'   => $asOf ?: null,
    ]);
    exit;
}

$db = getDB();
$db->prepare("
    UPDATE fno_prices
    SET delivery_qty = :qty,
        delivery_pct = :pct,
        fetched_at   = CURRENT_TIMESTAMP
    WHERE symbol = :symbol
")->execute([
    ':qty'    => $deliveryQty,
    ':pct'    => $deliveryPct,
    ':symbol' => $symbol,
]);

echo json_encode([
    'success' => true,
    'symbol'  => $symbol,
    'data'    => [
        'delivery_qty' => $deliveryQty,
        'delivery_pct' => $deliveryPct,
        'as_of'        => $asOf ?: null,
    ],
]);

