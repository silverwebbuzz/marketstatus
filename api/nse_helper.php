<?php
/**
 * NSE API Helper
 * NSE requires a valid session cookie from the homepage before calling APIs.
 */

define('NSE_COOKIE_FILE', sys_get_temp_dir() . '/nse_cookies.txt');
define('NSE_COOKIE_TTL', 1800); // 30 minutes

function nseGet(string $url): ?array {
    $cookies = getNseCookies();

    $headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: application/json, text/plain, */*',
        'Accept-Language: en-US,en;q=0.9',
        'Accept-Encoding: gzip, deflate, br',
        'Referer: https://www.nseindia.com/',
        'Origin: https://www.nseindia.com',
        'Connection: keep-alive',
        'Sec-Fetch-Dest: empty',
        'Sec-Fetch-Mode: cors',
        'Sec-Fetch-Site: same-origin',
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
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_FOLLOWLOCATION => true,
    ]);

    $body   = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status !== 200 || !$body) {
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
            CURLOPT_TIMEOUT        => 20,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_FOLLOWLOCATION => true,
        ]);
        $body   = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    }

    if (!$body) return null;
    return json_decode($body, true) ?? null;
}

function getNseCookies(): string {
    if (file_exists(NSE_COOKIE_FILE)) {
        if ((time() - filemtime(NSE_COOKIE_FILE)) < NSE_COOKIE_TTL) {
            return trim(file_get_contents(NSE_COOKIE_FILE));
        }
    }
    return refreshNseCookies();
}

function refreshNseCookies(): string {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
        ],
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_FOLLOWLOCATION => true,
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $cookies = [];
    preg_match_all('/^Set-Cookie:\s*([^;]+)/mi', $response, $matches);
    foreach ($matches[1] as $cookie) {
        $cookies[] = trim($cookie);
    }

    $cookieStr = implode('; ', $cookies);
    file_put_contents(NSE_COOKIE_FILE, $cookieStr);
    return $cookieStr;
}
