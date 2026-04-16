<?php
/**
 * Parse saved zerodha_margins.html and save to DB
 * Browser: https://silverwebbuzz.com/ms/api/parse_zerodha.php?key=SilverMS2024
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');
header('X-Accel-Buffering: no');

if (($_GET['key'] ?? '') !== 'SilverMS2024') { http_response_code(403); die('Forbidden'); }

require_once __DIR__ . '/../db.php';

function out($m) { echo $m . "\n"; flush(); }

$htmlFile = __DIR__ . '/../zerodha_margins.html';
if (!file_exists($htmlFile)) {
    die("ERROR: zerodha_margins.html not found. Run fetch_zerodha.php first.\n");
}

$html = file_get_contents($htmlFile);
out("HTML size: " . number_format(strlen($html)) . " bytes");

// Show a sample of the table area so we can see exact structure
$tablePos = strpos($html, '<table');
if ($tablePos !== false) {
    out("Table found at position: $tablePos");
    out("Table preview (500 chars):\n" . substr($html, $tablePos, 500));
} else {
    out("No <table> tag found.");
}

// Check for tbody
$tbodyPos = strpos($html, '<tbody');
if ($tbodyPos !== false) {
    out("\ntbody found. First row preview:\n" . substr($html, $tbodyPos, 800));
}

// Check if data is in a JS variable
if (preg_match('/var\s+\w*[Dd]ata\w*\s*=\s*(\[.{50,}?\]);/s', $html, $m)) {
    out("\nFound JS data array (first 300 chars): " . substr($m[1], 0, 300));
}
if (preg_match('/window\.__INITIAL_STATE__\s*=\s*({.+?});/s', $html, $m)) {
    out("\nFound __INITIAL_STATE__ (first 300 chars): " . substr($m[1], 0, 300));
}

// Search for RELIANCE in context
$pos = strpos($html, 'RELIANCE');
if ($pos !== false) {
    out("\nRELIANCE found at pos $pos. Context (400 chars):\n" . substr($html, $pos - 100, 400));
} else {
    out("\nRELIANCE not found in HTML.");
}
