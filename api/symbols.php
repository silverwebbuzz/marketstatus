<?php
/**
 * Returns distinct symbols + their expiries from fno_margins
 * GET ?q=REL  — search by prefix (for autocomplete)
 * GET ?symbol=RELIANCE — get expiries for a specific symbol
 */

require_once __DIR__ . '/../db.php';
header('Content-Type: application/json');

$db = getDB();
$q  = strtoupper(trim($_GET['q']      ?? ''));
$sym = strtoupper(trim($_GET['symbol'] ?? ''));

if ($sym) {
    // Return expiries + lot_size for a specific symbol
    $stmt = $db->prepare("
        SELECT expiry, lot_size, futures_price, nrml_margin
        FROM fno_margins
        WHERE symbol = ? AND fetched_date = (SELECT MAX(fetched_date) FROM fno_margins)
        ORDER BY expiry
    ");
    $stmt->execute([$sym]);
    echo json_encode(['success' => true, 'expiries' => $stmt->fetchAll()]);
    exit;
}

// Return matching symbols
$stmt = $db->prepare("
    SELECT DISTINCT m.symbol, p.company_name
    FROM fno_margins m
    LEFT JOIN fno_prices p ON p.symbol = m.symbol
    WHERE m.fetched_date = (SELECT MAX(fetched_date) FROM fno_margins)
      AND m.symbol LIKE ?
    ORDER BY m.symbol
    LIMIT 20
");
$stmt->execute([$q . '%']);
echo json_encode(['success' => true, 'symbols' => $stmt->fetchAll()]);
