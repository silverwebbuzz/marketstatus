<?php
/**
 * NSE API Helper
 * Some endpoints (equity index) work without cookies.
 * Derivative endpoints need a session cookie from NSE homepage.
 */

function nseGet(string $url): ?array {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept: application/json, text/plain, */*',
            'Accept-Language: en-US,en;q=0.9',
            'Referer: https://www.nseindia.com/',
            'Connection: keep-alive',
        ],
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
    ]);

    $body    = curl_exec($ch);
    $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($curlErr || $status !== 200 || !$body) {
        error_log("[NSE] HTTP $status for $url — $curlErr");
        return null;
    }

    $decoded = json_decode($body, true);
    if ($decoded === null) {
        error_log("[NSE] JSON decode failed for $url");
        return null;
    }

    return $decoded;
}

/**
 * NSE session-based GET — hits homepage first to get cookies, then fetches API.
 * Required for derivative/quote endpoints that check for valid session.
 */
function nseGetWithSession(string $url): ?array {
    $cookieFile = sys_get_temp_dir() . '/nse_session_' . md5($url) . '.txt';

    $headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language: en-US,en;q=0.9',
        'Connection: keep-alive',
        'Upgrade-Insecure-Requests: 1',
    ];

    // Step 1: Hit NSE homepage to get session cookies
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR      => $cookieFile,
        CURLOPT_COOKIEFILE     => $cookieFile,
        CURLOPT_HTTPHEADER     => $headers,
    ]);
    curl_exec($ch);
    $homeStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    // Step 2: Fetch the actual API with session cookies
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR      => $cookieFile,
        CURLOPT_COOKIEFILE     => $cookieFile,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept: application/json, text/plain, */*',
            'Accept-Language: en-US,en;q=0.9',
            'Referer: https://www.nseindia.com/',
            'X-Requested-With: XMLHttpRequest',
            'Connection: keep-alive',
        ],
    ]);

    $body    = curl_exec($ch);
    $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    // Clean up cookie file
    @unlink($cookieFile);

    if ($curlErr || $status !== 200 || !$body) {
        error_log("[NSE-SESSION] Homepage: $homeStatus | API: $status for $url — $curlErr");
        return null;
    }

    $decoded = json_decode($body, true);
    if ($decoded === null) {
        error_log("[NSE-SESSION] JSON decode failed for $url — response: " . substr($body, 0, 200));
        return null;
    }

    return $decoded;
}
