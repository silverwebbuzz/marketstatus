<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain');

echo "Step 1: Starting\n";

require_once __DIR__ . '/../config.php';
echo "Step 2: config.php loaded\n";

require_once __DIR__ . '/../db.php';
echo "Step 3: db.php loaded\n";

require_once __DIR__ . '/nse_helper.php';
echo "Step 4: nse_helper.php loaded\n";

echo "Step 5: Calling NSE API...\n";
$result = nseGet('https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O');

if ($result === null) {
    echo "Step 6: FAILED - nseGet returned null\n";
} else {
    echo "Step 6: SUCCESS - got response\n";
    echo "Keys: " . implode(', ', array_keys($result)) . "\n";
    echo "Data count: " . count($result['data'] ?? []) . "\n";
}
