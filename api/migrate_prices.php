<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

require_once __DIR__ . '/../db.php';

$db = getDB();

$cols = [
    "ALTER TABLE fno_prices ADD COLUMN IF NOT EXISTS vwap          DECIMAL(12,2) DEFAULT 0 AFTER change_percent",
    "ALTER TABLE fno_prices ADD COLUMN IF NOT EXISTS sector        VARCHAR(100)  DEFAULT '' AFTER industry",
    "ALTER TABLE fno_prices ADD COLUMN IF NOT EXISTS upper_circuit DECIMAL(12,2) DEFAULT 0 AFTER week52_low",
    "ALTER TABLE fno_prices ADD COLUMN IF NOT EXISTS lower_circuit DECIMAL(12,2) DEFAULT 0 AFTER upper_circuit",
];

foreach ($cols as $sql) {
    try {
        $db->exec($sql);
        echo "OK: $sql\n";
    } catch (Exception $e) {
        echo "SKIP (already exists?): " . $e->getMessage() . "\n";
    }
}

echo "\nDone.\n";
