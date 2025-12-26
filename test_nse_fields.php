<?php
/**
 * Test script to see what fields NSE API actually returns
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

echo "=== Testing NSE API Fields ===\n\n";

// Initialize session
function getNseCurlSession() {
    static $cookieFile = null;
    if ($cookieFile === null) {
        $cookieFile = sys_get_temp_dir() . '/nse_cookies_' . uniqid() . '.txt';
    }
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        CURLOPT_HTTPHEADER => [
            'Accept: application/json, text/plain, */*',
            'Accept-Language: en-US,en;q=0.9',
            'Connection: keep-alive',
            'Referer: https://www.nseindia.com/',
        ],
        CURLOPT_COOKIEFILE => $cookieFile,
        CURLOPT_COOKIEJAR => $cookieFile,
        CURLOPT_TIMEOUT => 30,
    ]);
    return $ch;
}

function initNseSession() {
    $ch = getNseCurlSession();
    curl_setopt($ch, CURLOPT_URL, 'https://www.nseindia.com/');
    curl_exec($ch);
    curl_close($ch);
}

initNseSession();
sleep(1);

$ch = getNseCurlSession();
$url = 'https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O';
curl_setopt($ch, CURLOPT_URL, $url);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    echo "ERROR: Failed to fetch. HTTP Code: $httpCode\n";
    exit(1);
}

$nseData = json_decode($response, true);
if (!$nseData || !isset($nseData['data']) || !is_array($nseData['data'])) {
    echo "ERROR: Invalid response\n";
    exit(1);
}

echo "Total stocks: " . count($nseData['data']) . "\n\n";

// Analyze first 3 stocks
for ($i = 0; $i < min(3, count($nseData['data'])); $i++) {
    $stock = $nseData['data'][$i];
    $symbol = $stock['symbol'] ?? 'UNKNOWN';
    
    echo "=== Stock $i: $symbol ===\n";
    echo "Main object fields:\n";
    $mainFields = array_keys($stock);
    foreach ($mainFields as $field) {
        $value = $stock[$field];
        if (is_array($value)) {
            echo "  - $field: [array with " . count($value) . " items]\n";
        } else {
            $displayValue = is_string($value) && strlen($value) > 50 ? substr($value, 0, 50) . '...' : $value;
            echo "  - $field: $displayValue\n";
        }
    }
    
    if (isset($stock['meta'])) {
        echo "\nMeta object fields:\n";
        $metaFields = array_keys($stock['meta']);
        foreach ($metaFields as $field) {
            $value = $stock['meta'][$field];
            if (is_array($value)) {
                echo "  - $field: [array with " . count($value) . " items]\n";
            } else {
                $displayValue = is_string($value) && strlen($value) > 50 ? substr($value, 0, 50) . '...' : $value;
                echo "  - $field: $displayValue\n";
            }
        }
    }
    
    // Check for PE, PB, Market Cap, Div Yield
    echo "\nLooking for financial metrics:\n";
    $metrics = ['pe', 'pE', 'peRatio', 'pb', 'pB', 'pbRatio', 'marketCap', 'mcap', 'ffmc', 'divYield', 'dividendYield', 'divYld'];
    foreach ($metrics as $metric) {
        if (isset($stock[$metric])) {
            echo "  ✓ Found $metric in main: " . $stock[$metric] . "\n";
        }
        if (isset($stock['meta'][$metric])) {
            echo "  ✓ Found $metric in meta: " . $stock['meta'][$metric] . "\n";
        }
    }
    
    echo "\n";
}

