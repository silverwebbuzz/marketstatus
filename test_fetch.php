<?php
/**
 * Test script to verify futures data fetching works
 * Run: php test_fetch.php
 */

// Get absolute path
$scriptPath = __DIR__ . '/fetch_futures_data.php';

echo "Testing futures data fetch...\n";
echo "Script path: $scriptPath\n";
echo "File exists: " . (file_exists($scriptPath) ? "YES" : "NO") . "\n\n";

if (file_exists($scriptPath)) {
    echo "Running fetch script...\n";
    include $scriptPath;
} else {
    echo "ERROR: fetch_futures_data.php not found!\n";
    exit(1);
}

