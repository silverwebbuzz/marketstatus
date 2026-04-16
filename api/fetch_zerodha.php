<?php
/**
 * Fetch Zerodha margin calculator page and save HTML
 * Browser: https://silverwebbuzz.com/ms/api/fetch_zerodha.php?key=SilverMS2024
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');
header('X-Accel-Buffering: no');
set_time_limit(60);

if (($_GET['key'] ?? '') !== 'SilverMS2024') { http_response_code(403); die('Forbidden'); }

require_once __DIR__ . '/../db.php';

function out($m) { echo $m . "\n"; flush(); }

$htmlFile = __DIR__ . '/../zerodha_margins.html';

// ── Attempt 1: Direct curl ─────────────────────────
out("Attempt 1: Direct curl...");

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://zerodha.com/margin-calculator/Futures/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR      => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_COOKIEFILE     => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language: en-US,en;q=0.9',
        'Accept-Encoding: gzip, deflate, br',
        'Cache-Control: no-cache',
        'Pragma: no-cache',
        'Upgrade-Insecure-Requests: 1',
        'Sec-Fetch-Dest: document',
        'Sec-Fetch-Mode: navigate',
        'Sec-Fetch-Site: none',
    ],
]);
$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

out("HTTP Status: $status | Size: " . strlen($body ?? '') . " bytes");
if ($err) out("cURL error: $err");

$hasData = strpos($body ?? '', 'RELIANCE') !== false || strpos($body ?? '', 'margin') !== false;
out("Has margin data: " . ($hasData ? 'YES' : 'NO'));
out("Preview: " . substr($body ?? '', 0, 300));

if ($status === 200 && strlen($body) > 50000 && $hasData) {
    file_put_contents($htmlFile, $body);
    out("\nSUCCESS: HTML saved to zerodha_margins.html (" . strlen($body) . " bytes)");
    out("Proceed to parse.");
    exit;
}

// ── Attempt 2: With Referer + session ─────────────
out("\nAttempt 2: With session init...");

// First hit homepage
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://zerodha.com/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR      => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_COOKIEFILE     => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept: text/html,*/*',
    ],
]);
curl_exec($ch);
$homeStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
out("Homepage status: $homeStatus");
sleep(2);

// Now hit the margin calculator with referer
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://zerodha.com/margin-calculator/Futures/',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING       => '',
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_COOKIEJAR      => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_COOKIEFILE     => sys_get_temp_dir() . '/zerodha_cookies.txt',
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language: en-US,en;q=0.9',
        'Referer: https://zerodha.com/',
        'Upgrade-Insecure-Requests: 1',
    ],
]);
$body   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

out("HTTP Status: $status | Size: " . strlen($body ?? '') . " bytes");
$hasData = strpos($body ?? '', 'RELIANCE') !== false || strpos($body ?? '', 'margin') !== false;
out("Has margin data: " . ($hasData ? 'YES' : 'NO'));
out("Preview: " . substr($body ?? '', 0, 500));

if ($status === 200 && strlen($body) > 50000 && $hasData) {
    file_put_contents($htmlFile, $body);
    out("\nSUCCESS: HTML saved (" . strlen($body) . " bytes)");
    exit;
}

// ── Attempt 3: Check if there's a JSON API behind the page ──
out("\nAttempt 3: Checking Zerodha JSON API...");

$apis = [
    'https://zerodha.com/margin-calculator/Futures/data/',
    'https://zerodha.com/api/margins/futures',
    'https://zerodha.com/margin-calculator/data/futures',
];

foreach ($apis as $api) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $api,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0',
            'Accept: application/json',
            'Referer: https://zerodha.com/margin-calculator/Futures/',
        ],
    ]);
    $resp   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    out("$api → HTTP $status | " . substr($resp ?? '', 0, 200));
}

out("\n=== SUMMARY ===");
out("Zerodha is blocking server-side requests (Cloudflare protection).");
out("Saved HTML size was too small or had no margin data.");
out("HTML file NOT saved.");
