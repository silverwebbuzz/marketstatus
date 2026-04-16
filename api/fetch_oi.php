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

$data = nseGet('https://www.nseindia.com/api/quote-derivative?symbol=' . urlencode($symbol));

if (!$data || empty($data['stocks'])) {
    echo json_encode(['success' => false, 'error' => 'Could not fetch OI data from NSE']);
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
