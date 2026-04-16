<?php
/**
 * NSE API Helper
 * NSE requires a valid session cookie from the homepage before calling APIs.
 */

define('NSE_COOKIE_FILE', sys_get_temp_dir() . '/nse_cookies.txt');
define('NSE_COOKIE_TTL', 1800); // 30 minutes

function nseDebug(string $msg): void {
    echo '[NSE] ' . $msg . "\n";
    flush();
    ob_flush();
}

function nseGet(string $url): ?array {
    nseDebug("Fetching: $url");

    $cookies = getNseCookies();
    nseDebug("Cookies: " . (strlen($cookies) > 0 ? substr($cookies, 0, 80) . '...' : 'NONE'));

    $headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: application/json, text/plain, */*',
        'Accept-Language: en-US,en;q=0.9',
        'Referer: https://www.nseindia.com/market-data/equity-derivatives-watch',
        'Origin: https://www.nseindia.com',
        'Connection: keep-alive',
        'Sec-Fetch-Dest: empty',
        'Sec-Fetch-Mode: cors',
        'Sec-Fetch-Site: same-origin',
        'X-Requested-With: XMLHttpRequest',
    ];

    if ($cookies) {
        $headers[] = 'Cookie: ' . $cookies;
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_VERBOSE        => false,
    ]);

    $body    = curl_exec($ch);
    $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    nseDebug("HTTP Status: $status | Body length: " . strlen($body ?? ''));
    if ($curlErr) nseDebug("cURL Error: $curlErr");

    if ($status !== 200 || !$body) {
        nseDebug("Attempt 1 failed (HTTP $status). Refreshing cookies and retrying...");
        sleep(2);
        refreshNseCookies();
        $cookies = getNseCookies();
        $headers = array_filter($headers, fn($h) => strpos($h, 'Cookie:') === false);
        if ($cookies) $headers[] = 'Cookie: ' . $cookies;

        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL            => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING       => '',
            CURLOPT_HTTPHEADER     => array_values($headers),
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_FOLLOWLOCATION => true,
        ]);
        $body    = curl_exec($ch);
        $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr = curl_error($ch);
        curl_close($ch);

        nseDebug("Retry HTTP Status: $status | Body length: " . strlen($body ?? ''));
        if ($curlErr) nseDebug("cURL Error on retry: $curlErr");
    }

    if (!$body) {
        nseDebug("ERROR: Empty body after retry.");
        return null;
    }

    // Show first 300 chars of response for debug
    nseDebug("Response preview: " . substr($body, 0, 300));

    $decoded = json_decode($body, true);
    if ($decoded === null) {
        nseDebug("ERROR: JSON decode failed. Raw: " . substr($body, 0, 500));
        return null;
    }

    nseDebug("OK: JSON decoded successfully.");
    return $decoded;
}

function getNseCookies(): string {
    if (file_exists(NSE_COOKIE_FILE)) {
        if ((time() - filemtime(NSE_COOKIE_FILE)) < NSE_COOKIE_TTL) {
            $cached = trim(file_get_contents(NSE_COOKIE_FILE));
            if (strlen($cached) > 10) {
                nseDebug("Using cached cookies from " . NSE_COOKIE_FILE);
                return $cached;
            }
        }
    }
    nseDebug("Fetching fresh cookies from NSE homepage...");
    return refreshNseCookies();
}

function refreshNseCookies(): string {
    nseDebug("Hitting NSE homepage to get session cookies...");

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
            'Accept-Encoding: gzip, deflate, br',
            'Connection: keep-alive',
            'Upgrade-Insecure-Requests: 1',
        ],
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
    ]);

    $response = curl_exec($ch);
    $status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr  = curl_error($ch);
    curl_close($ch);

    nseDebug("Homepage HTTP: $status");
    if ($curlErr) nseDebug("Homepage cURL error: $curlErr");

    $cookies = [];
    preg_match_all('/^Set-Cookie:\s*([^;\r\n]+)/mi', $response, $matches);
    foreach ($matches[1] as $cookie) {
        $cookies[] = trim($cookie);
    }

    nseDebug("Cookies found: " . count($cookies) . " — " . implode(', ', array_map(fn($c) => explode('=', $c)[0], $cookies)));

    $cookieStr = implode('; ', $cookies);
    file_put_contents(NSE_COOKIE_FILE, $cookieStr);
    return $cookieStr;
}
