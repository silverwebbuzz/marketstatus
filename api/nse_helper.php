<?php
/**
 * NSE API Helper
 * On this server NSE API responds directly without needing homepage cookies.
 */

function nseGet(string $url): ?array {
    $headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: application/json, text/plain, */*',
        'Accept-Language: en-US,en;q=0.9',
        'Referer: https://www.nseindia.com/',
        'Connection: keep-alive',
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING       => '',
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
    ]);

    $body    = curl_exec($ch);
    $status  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        echo "[NSE] cURL error for $url: $curlErr\n";
        return null;
    }

    if ($status !== 200 || !$body) {
        echo "[NSE] HTTP $status for $url\n";
        return null;
    }

    $decoded = json_decode($body, true);
    if ($decoded === null) {
        echo "[NSE] JSON decode failed for $url — response: " . substr($body, 0, 200) . "\n";
        return null;
    }

    return $decoded;
}
