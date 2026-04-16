<?php
/**
 * Fetch OI data for a single symbol from NSE derivative API
 * Called on-demand from Detail modal
 * POST/GET: ?symbol=RELIANCE
 */

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/nse_helper.php';

header('Content-Type: application/json');

$symbol = strtoupper(trim($_GET['symbol'] ?? $_POST['symbol'] ?? ''));
if (!$symbol) {
    echo json_encode(['success' => false, 'error' => 'Symbol required']);
    exit;
}

// Debug: test raw curl to see exact response
$debug = isset($_GET['debug']);
if ($debug) {
    $cookieFile = sys_get_temp_dir() . '/nse_oi_debug.txt';
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR      => $cookieFile,
        CURLOPT_COOKIEFILE     => $cookieFile,
        CURLOPT_HTTPHEADER     => ['User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'],
    ]);
    curl_exec($ch);
    $homeCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://www.nseindia.com/api/quote-derivative?symbol=' . urlencode($symbol),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_COOKIEJAR      => $cookieFile,
        CURLOPT_COOKIEFILE     => $cookieFile,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept: application/json, */*',
            'Referer: https://www.nseindia.com/',
        ],
    ]);
    $body    = curl_exec($ch);
    $apiCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err     = curl_error($ch);
    curl_close($ch);
    @unlink($cookieFile);

    echo json_encode([
        'debug'        => true,
        'homepage_http'=> $homeCode,
        'api_http'     => $apiCode,
        'curl_error'   => $err,
        'response_len' => strlen($body),
        'response_preview' => substr($body, 0, 300),
    ]);
    exit;
}

$data = nseGetWithSession('https://www.nseindia.com/api/quote-derivative?symbol=' . urlencode($symbol));

if (!$data || empty($data['stocks'])) {
    echo json_encode(['success' => false, 'error' => 'Could not fetch OI data from NSE. Server may be blocked or NSE is down.']);
    exit;
}

$db      = getDB();
$results = [];

foreach ($data['stocks'] as $stock) {
    $md = $stock['metadata'] ?? [];

    // Only futures, skip options
    if (($md['instrumentType'] ?? '') !== 'Stock Futures') continue;

    $expiry    = $md['expiryDate']  ?? '';
    $oi        = (int)($md['openInterest']          ?? 0);
    $oiChange  = (int)($md['changeinOpenInterest']   ?? 0);
    $oiChgPct  = (float)($md['pchangeinOpenInterest'] ?? 0);

    // PCR comes from tradeInfo inside marketDeptOrderBook
    $tradeInfo = $stock['marketDeptOrderBook']['tradeInfo'] ?? [];
    $pcr       = (float)($tradeInfo['putCallRatio'] ?? 0);

    if (!$expiry || !$oi) continue;

    $db->prepare("
        INSERT INTO fno_oi (symbol, expiry, open_interest, oi_change, oi_change_pct, pcr)
        VALUES (:symbol, :expiry, :oi, :oi_change, :oi_change_pct, :pcr)
        ON DUPLICATE KEY UPDATE
            open_interest  = VALUES(open_interest),
            oi_change      = VALUES(oi_change),
            oi_change_pct  = VALUES(oi_change_pct),
            pcr            = VALUES(pcr),
            fetched_at     = CURRENT_TIMESTAMP
    ")->execute([
        ':symbol'      => $symbol,
        ':expiry'      => $expiry,
        ':oi'          => $oi,
        ':oi_change'   => $oiChange,
        ':oi_change_pct' => $oiChgPct,
        ':pcr'         => $pcr,
    ]);

    $results[] = [
        'expiry'      => $expiry,
        'oi'          => $oi,
        'oi_change'   => $oiChange,
        'oi_change_pct' => $oiChgPct,
        'pcr'         => $pcr,
    ];
}

if (empty($results)) {
    echo json_encode(['success' => false, 'error' => 'No futures OI data found for ' . $symbol]);
    exit;
}

echo json_encode(['success' => true, 'symbol' => $symbol, 'data' => $results]);
