<?php
// Quick diagnostic — visit: https://silverwebbuzz.com/ms/api/test.php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

echo "=== SERVER DIAGNOSTIC ===\n\n";

// 1. PHP version
echo "PHP Version: " . PHP_VERSION . "\n";

// 2. cURL
echo "cURL enabled: " . (function_exists('curl_init') ? 'YES' : 'NO') . "\n";
if (function_exists('curl_version')) {
    $cv = curl_version();
    echo "cURL version: " . $cv['version'] . "\n";
    echo "SSL version: " . $cv['ssl_version'] . "\n";
}

// 3. DB connection
echo "\n--- DB Test ---\n";
try {
    require_once __DIR__ . '/../config.php';
    require_once __DIR__ . '/../db.php';
    $db = getDB();
    echo "DB Connection: OK\n";
    // Check if tables exist
    $tables = $db->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . (count($tables) ? implode(', ', $tables) : 'NONE - run schema.sql first') . "\n";
} catch (Exception $e) {
    echo "DB Error: " . $e->getMessage() . "\n";
}

// 4. NSE homepage reachable?
echo "\n--- NSE Connectivity Test ---\n";
if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_NOBODY         => true, // HEAD only, fast
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ],
    ]);
    curl_exec($ch);
    $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err     = curl_error($ch);
    curl_close($ch);
    echo "NSE Homepage HTTP: $status\n";
    if ($err) echo "cURL Error: $err\n";

    // 5. NSE API reachable?
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept: application/json',
            'Referer: https://www.nseindia.com/',
        ],
    ]);
    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err    = curl_error($ch);
    curl_close($ch);
    echo "NSE API HTTP: $status\n";
    if ($err) echo "cURL Error: $err\n";
    echo "Response (first 300 chars): " . substr($body, 0, 300) . "\n";
} else {
    echo "cURL not available!\n";
}

// 6. temp dir writable (for cookie file)
echo "\n--- Temp Dir ---\n";
$tmp = sys_get_temp_dir();
echo "Temp dir: $tmp\n";
echo "Writable: " . (is_writable($tmp) ? 'YES' : 'NO') . "\n";
