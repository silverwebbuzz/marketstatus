<?php
/**
 * Watchlist CRUD API
 * GET    ?action=list
 * POST   action=add    — add entry
 * POST   action=edit   — update entry
 * POST   action=delete — delete entry
 * POST   action=close  — mark closed with sell_price
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';
require_once __DIR__ . '/../db.php';

header('Content-Type: application/json');

$user = authUser();
if (!$user) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']); exit;
}

$db     = getDB();
$uid    = $user['id'];
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

// ── LIST ─────────────────────────────────────────────
if ($action === 'list') {
    $rows = $db->prepare("
        SELECT w.*,
               p.current_price, p.change_amount, p.change_percent,
               p.high_price, p.low_price, p.prev_close,
               m.lot_size, m.nrml_margin, m.futures_price,
               m.expiry
        FROM user_watchlist w
        LEFT JOIN fno_prices  p ON p.symbol = w.symbol
        LEFT JOIN fno_margins m ON m.symbol = w.symbol
                               AND m.fetched_date = (SELECT MAX(fetched_date) FROM fno_margins)
        WHERE w.user_id = ?
        ORDER BY w.status ASC, w.created_at DESC
    ");
    $rows->execute([$uid]);
    $entries = [];
    $seen    = [];

    foreach ($rows->fetchAll() as $r) {
        $id = $r['id'];
        // Only take first (nearest expiry) contract per watchlist entry
        if (isset($seen[$id])) continue;
        $seen[$id] = true;

        $entry      = (float)$r['entry_price'];
        $curr       = (float)$r['current_price'];
        $target     = $r['target_price'] ? (float)$r['target_price'] : null;
        $sl         = $r['stop_loss']    ? (float)$r['stop_loss']    : null;
        $qty        = (int)$r['quantity'];
        $lotSize    = (int)($r['lot_size'] ?: 1);
        $isBuy      = $r['trade_type'] === 'BUY';

        // Unrealised P/L
        $pl         = $isBuy ? ($curr - $entry) * $qty * $lotSize
                              : ($entry - $curr) * $qty * $lotSize;
        $plPct      = $entry > 0 ? (($isBuy ? $curr - $entry : $entry - $curr) / $entry) * 100 : 0;

        // % to target
        $toTarget   = null;
        if ($target && $curr > 0) {
            $toTarget = $isBuy ? (($target - $curr) / $curr) * 100
                               : (($curr - $target) / $curr) * 100;
        }

        // Target / SL hit
        $targetHit = $target && ($isBuy ? $curr >= $target : $curr <= $target);
        $slHit     = $sl     && ($isBuy ? $curr <= $sl     : $curr >= $sl);

        $entries[] = [
            'id'           => $id,
            'symbol'       => $r['symbol'],
            'trade_type'   => $r['trade_type'],
            'entry_price'  => $entry,
            'sell_price'   => $r['sell_price']   ? (float)$r['sell_price']   : null,
            'target_price' => $target,
            'stop_loss'    => $sl,
            'quantity'     => $qty,
            'lot_size'     => $lotSize,
            'notes'        => $r['notes'],
            'status'       => $r['status'],
            'current_price'=> $curr,
            'futures_price'=> (float)$r['futures_price'],
            'expiry'       => $r['expiry'],
            'nrml_margin'  => (float)$r['nrml_margin'],
            'pl'           => round($pl, 2),
            'pl_pct'       => round($plPct, 2),
            'to_target_pct'=> $toTarget !== null ? round($toTarget, 2) : null,
            'target_hit'   => $targetHit,
            'sl_hit'       => $slHit,
            'created_at'   => $r['created_at'],
        ];
    }
    echo json_encode(['success' => true, 'data' => $entries]); exit;
}

// ── ADD ───────────────────────────────────────────────
if ($action === 'add') {
    $symbol = strtoupper(trim($_POST['symbol'] ?? ''));
    $type   = strtoupper(trim($_POST['trade_type'] ?? 'BUY'));
    $entry  = (float)($_POST['entry_price']  ?? 0);
    $target = $_POST['target_price'] !== '' ? (float)$_POST['target_price'] : null;
    $sl     = $_POST['stop_loss']    !== '' ? (float)$_POST['stop_loss']    : null;
    $qty    = max(1, (int)($_POST['quantity'] ?? 1));
    $notes  = trim($_POST['notes'] ?? '');

    if (!$symbol || !$entry || !in_array($type, ['BUY','SELL'])) {
        echo json_encode(['success' => false, 'error' => 'Symbol, trade type and entry price required']); exit;
    }

    $db->prepare("
        INSERT INTO user_watchlist (user_id, symbol, trade_type, entry_price, target_price, stop_loss, quantity, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ")->execute([$uid, $symbol, $type, $entry, $target, $sl, $qty, $notes]);

    echo json_encode(['success' => true, 'id' => $db->lastInsertId()]); exit;
}

// ── EDIT ──────────────────────────────────────────────
if ($action === 'edit') {
    $id     = (int)($_POST['id'] ?? 0);
    $target = $_POST['target_price'] !== '' ? (float)$_POST['target_price'] : null;
    $sl     = $_POST['stop_loss']    !== '' ? (float)$_POST['stop_loss']    : null;
    $qty    = max(1, (int)($_POST['quantity'] ?? 1));
    $notes  = trim($_POST['notes'] ?? '');

    $db->prepare("
        UPDATE user_watchlist SET target_price=?, stop_loss=?, quantity=?, notes=?, updated_at=NOW()
        WHERE id=? AND user_id=?
    ")->execute([$target, $sl, $qty, $notes, $id, $uid]);

    echo json_encode(['success' => true]); exit;
}

// ── CLOSE ─────────────────────────────────────────────
if ($action === 'close') {
    $id         = (int)($_POST['id'] ?? 0);
    $sell_price = (float)($_POST['sell_price'] ?? 0);

    $db->prepare("
        UPDATE user_watchlist SET status='CLOSED', sell_price=?, updated_at=NOW()
        WHERE id=? AND user_id=?
    ")->execute([$sell_price ?: null, $id, $uid]);

    echo json_encode(['success' => true]); exit;
}

// ── DELETE ────────────────────────────────────────────
if ($action === 'delete') {
    $id = (int)($_POST['id'] ?? 0);
    $db->prepare("DELETE FROM user_watchlist WHERE id=? AND user_id=?")->execute([$id, $uid]);
    echo json_encode(['success' => true]); exit;
}

echo json_encode(['success' => false, 'error' => 'Unknown action']);
