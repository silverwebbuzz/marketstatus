<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/nse_helper.php';

$symbol = $_GET['symbol'] ?? 'RELIANCE';

$data = nseGet('https://www.nseindia.com/api/quote-equity?symbol=' . urlencode($symbol));

echo "=== RAW RESPONSE FOR $symbol ===\n\n";
echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
