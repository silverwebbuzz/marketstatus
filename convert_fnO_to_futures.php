<?php
/**
 * Convert existing fnO.json to futures_margins.json format
 * Use this if fetching from Zerodha doesn't work
 * 
 * Usage: php convert_fnO_to_futures.php
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

$fnOFile = DATA_PATH . '/fnO.json';
$outputFile = DATA_PATH . '/futures_margins.json';

// Load existing fnO.json
$fnOData = loadJsonData('fnO.json');

if (!$fnOData || !is_array($fnOData)) {
    echo "ERROR: Could not load fnO.json\n";
    exit(1);
}

// Convert format
$futuresData = [];

foreach ($fnOData as $item) {
    $futuresData[] = [
        'symbol' => $item['scrip'] ?? 'N/A',
        'expiry' => $item['expiry'] ?? 'N/A',
        'lot_size' => isset($item['lot_size']) ? (int)$item['lot_size'] : null,
        'mwpl' => null, // Not in fnO.json
        'nrml_margin' => isset($item['nrml_margin']) ? (float)$item['nrml_margin'] : null,
        'nrml_margin_rate' => isset($item['margin']) ? (float)$item['margin'] : null,
        'price' => isset($item['price']) ? (float)$item['price'] : null,
    ];
}

// Save in new format
$data = [
    'last_updated' => date('Y-m-d H:i:s'),
    'source' => 'fnO.json (converted)',
    'total_contracts' => count($futuresData),
    'data' => $futuresData
];

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (file_put_contents($outputFile, $json) === false) {
    echo "ERROR: Failed to write to $outputFile\n";
    exit(1);
}

echo "Success: Converted " . count($futuresData) . " contracts from fnO.json to futures_margins.json\n";
exit(0);

