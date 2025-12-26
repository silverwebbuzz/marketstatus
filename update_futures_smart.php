<?php
/**
 * Smart Futures Data Updater
 * Tries to fetch new data, but always ensures data exists
 * 
 * Strategy:
 * 1. Try to fetch from Zerodha (Python or PHP)
 * 2. If that fails, use existing fnO.json
 * 3. Always ensure futures_margins.json exists
 * 
 * Usage: php update_futures_smart.php
 * Cron: 0 8 * * * /usr/bin/php /path/to/update_futures_smart.php >> cron_log.txt 2>&1
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

$outputFile = DATA_PATH . '/futures_margins.json';
$fnOFile = DATA_PATH . '/fnO.json';

echo "Smart Futures Data Updater\n";
echo "==========================\n\n";

$success = false;

// Method 1: Try Python script
if (shell_exec('which python3 2>/dev/null')) {
    echo "Trying Python script...\n";
    $output = shell_exec('python3 ' . __DIR__ . '/fetch_futures.py 2>&1');
    $exitCode = shell_exec('python3 ' . __DIR__ . '/fetch_futures.py > /dev/null 2>&1; echo $?');
    
    if (file_exists($outputFile) && filesize($outputFile) > 100) {
        $data = loadJsonData('futures_margins.json');
        if ($data && isset($data['data']) && count($data['data']) > 0) {
            echo "✓ Success: Fetched new data with Python\n";
            $success = true;
        }
    }
}

// Method 2: Try PHP script
if (!$success) {
    echo "Trying PHP script...\n";
    ob_start();
    include __DIR__ . '/fetch_futures_data.php';
    $output = ob_get_clean();
    
    if (file_exists($outputFile) && filesize($outputFile) > 100) {
        $data = loadJsonData('futures_margins.json');
        if ($data && isset($data['data']) && count($data['data']) > 0) {
            echo "✓ Success: Fetched new data with PHP\n";
            $success = true;
        }
    }
}

// Method 3: Use existing fnO.json (always ensure data exists)
if (!$success && file_exists($fnOFile)) {
    echo "Using existing fnO.json data...\n";
    include __DIR__ . '/convert_fnO_to_futures.php';
    
    if (file_exists($outputFile)) {
        echo "✓ Success: Using existing fnO.json data\n";
        echo "Note: This is existing data, not freshly fetched\n";
        $success = true;
    }
}

if (!$success) {
    echo "✗ ERROR: Could not update futures data\n";
    exit(1);
}

echo "\nFutures data is ready!\n";
exit(0);

