<?php
/**
 * Debug script to see HTML structure
 */

$htmlFile = 'data/zerodha_temp.html';

if (!file_exists($htmlFile)) {
    echo "File not found: $htmlFile\n";
    exit(1);
}

$html = file_get_contents($htmlFile);

// Find first few table rows
preg_match_all('/<tr[^>]*>.*?<\/tr>/is', $html, $matches);

echo "Found " . count($matches[0]) . " table rows\n\n";

// Show first 5 rows
for ($i = 0; $i < min(5, count($matches[0])); $i++) {
    echo "=== Row " . ($i + 1) . " ===\n";
    echo htmlspecialchars(substr($matches[0][$i], 0, 500)) . "\n\n";
}

// Find tables
preg_match_all('/<table[^>]*>.*?<\/table>/is', $html, $tableMatches);
echo "Found " . count($tableMatches[0]) . " tables\n\n";

// Show first table structure
if (count($tableMatches[0]) > 0) {
    echo "=== First Table (first 2000 chars) ===\n";
    echo htmlspecialchars(substr($tableMatches[0][0], 0, 2000)) . "\n";
}

