<?php
/**
 * Step 1: Download fresh instruments.csv from Zerodha + import NFO futures to DB
 * Cron:    0 9 * * 1-5 php /path/to/api/import_instruments.php
 * Browser: https://silverwebbuzz.com/ms/api/import_instruments.php?key=SilverMS2024
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');
header('X-Accel-Buffering: no');
set_time_limit(120);

$isBrowser = php_sapi_name() !== 'cli';
if ($isBrowser && ($_GET['key'] ?? '') !== 'SilverMS2024') {
    http_response_code(403);
    die('Forbidden');
}

require_once __DIR__ . '/../db.php';

function out($msg) { echo $msg . "\n"; flush(); }

// ── Step 1: Download instruments.csv from Zerodha ──
out("Downloading instruments.csv from Zerodha...");

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => 'https://api.kite.trade/instruments',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0',
        'Accept: text/csv,*/*',
    ],
]);
$csv    = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

if ($err || $status !== 200 || !$csv) {
    die("FAILED: Could not download instruments.csv — HTTP $status — $err\n");
}

out("Downloaded " . number_format(strlen($csv)) . " bytes (HTTP $status).");

// ── Step 2: Parse CSV in memory ───────────────────
$lines  = explode("\n", trim($csv));
$header = str_getcsv(array_shift($lines));
$cols   = array_flip($header);

$db    = getDB();
$today = date('Y-m-d');

// Remove today's existing margins and re-insert fresh
$db->prepare("DELETE FROM fno_margins WHERE fetched_date = ?")->execute([$today]);
out("Cleared old margins for $today. Importing fresh data...\n");

$saved   = 0;
$symbols = [];

foreach ($lines as $line) {
    if (!trim($line)) continue;
    $row = str_getcsv($line);

    if (($row[$cols['segment']] ?? '')         !== 'NFO-FUT') continue;
    if (($row[$cols['instrument_type']] ?? '')  !== 'FUT')     continue;

    $symbol  = trim($row[$cols['name']]      ?? '');
    $expiry  = trim($row[$cols['expiry']]    ?? '');
    $lotSize = (int)($row[$cols['lot_size']] ?? 0);

    if (!$symbol || !$expiry || !$lotSize) continue;

    // Format: 2026-04-28 → 28-Apr-2026
    $expDate   = DateTime::createFromFormat('Y-m-d', $expiry);
    $expiryFmt = $expDate ? $expDate->format('d-M-Y') : $expiry;

    $stmt = $db->prepare("
        INSERT INTO fno_margins (symbol, expiry, lot_size, fetched_date)
        VALUES (:symbol, :expiry, :lot_size, :fetched_date)
        ON DUPLICATE KEY UPDATE
            lot_size   = VALUES(lot_size),
            updated_at = CURRENT_TIMESTAMP
    ");
    $stmt->execute([
        ':symbol'       => $symbol,
        ':expiry'       => $expiryFmt,
        ':lot_size'     => $lotSize,
        ':fetched_date' => $today,
    ]);

    $symbols[$symbol] = true;
    $saved++;
}

out("=== DONE: $saved contracts saved for " . count($symbols) . " symbols ===");
out("Symbols: " . implode(', ', array_keys($symbols)));
