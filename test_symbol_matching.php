<?php
/**
 * Test script to check symbol matching between futures and NSE data
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

echo "=== Symbol Matching Test ===\n\n";

// Load futures data
$futuresData = loadJsonData('futures_margins.json');
if (!$futuresData || !isset($futuresData['data'])) {
    echo "ERROR: No futures data found\n";
    exit(1);
}

// Load NSE data
$stockData = loadJsonData('stock_data.json');
if (!$stockData || !isset($stockData['data'])) {
    echo "ERROR: No NSE data found\n";
    exit(1);
}

// Get unique symbols from futures
$futuresSymbols = [];
foreach ($futuresData['data'] as $contract) {
    $symbol = strtoupper(trim($contract['symbol'] ?? ''));
    if ($symbol) {
        $futuresSymbols[$symbol] = true;
    }
}

// Get symbols from NSE
$nseSymbols = [];
$nseSymbolMap = [];
foreach ($stockData['data'] as $symbol => $data) {
    $normalized = strtoupper(trim(str_replace(' ', '', $symbol)));
    $nseSymbols[$normalized] = true;
    $nseSymbolMap[$normalized] = $symbol; // Keep original for reference
}

echo "Futures symbols: " . count($futuresSymbols) . "\n";
echo "NSE symbols: " . count($nseSymbols) . "\n\n";

// Check matches
$matches = 0;
$mismatches = [];
$sampleMatches = [];
$sampleMismatches = [];

foreach ($futuresSymbols as $fSymbol => $_) {
    $fNormalized = str_replace([' ', '-', '_'], '', $fSymbol);
    
    if (isset($nseSymbols[$fNormalized])) {
        $matches++;
        if (count($sampleMatches) < 10) {
            $sampleMatches[] = [
                'futures' => $fSymbol,
                'nse_original' => $nseSymbolMap[$fNormalized] ?? $fNormalized,
                'nse_normalized' => $fNormalized
            ];
        }
    } else {
        $mismatches[] = $fSymbol;
        if (count($sampleMismatches) < 10) {
            $sampleMismatches[] = $fSymbol;
        }
    }
}

echo "=== Results ===\n";
echo "Matches: $matches / " . count($futuresSymbols) . "\n";
echo "Mismatches: " . count($mismatches) . "\n\n";

echo "=== Sample Matches (first 10) ===\n";
foreach ($sampleMatches as $match) {
    echo "✓ {$match['futures']} -> {$match['nse_original']} (normalized: {$match['nse_normalized']})\n";
}

echo "\n=== Sample Mismatches (first 10) ===\n";
foreach ($sampleMismatches as $mismatch) {
    echo "✗ $mismatch\n";
    // Try to find similar
    $fNormalized = str_replace([' ', '-', '_'], '', $mismatch);
    $similar = [];
    foreach ($nseSymbols as $nSymbol => $_) {
        if (stripos($nSymbol, $fNormalized) !== false || stripos($fNormalized, $nSymbol) !== false) {
            $similar[] = $nSymbol;
        }
    }
    if (!empty($similar)) {
        echo "  Similar NSE symbols: " . implode(', ', array_slice($similar, 0, 5)) . "\n";
    }
}

echo "\n=== NSE Symbol Keys (first 20) ===\n";
$nseKeys = array_keys($stockData['data']);
foreach (array_slice($nseKeys, 0, 20) as $key) {
    $normalized = strtoupper(trim(str_replace(' ', '', $key)));
    echo "Original: '$key' -> Normalized: '$normalized'\n";
}

echo "\n=== Futures Symbol Sample (first 20) ===\n";
$futuresKeys = array_keys($futuresSymbols);
foreach (array_slice($futuresKeys, 0, 20) as $key) {
    $normalized = str_replace([' ', '-', '_'], '', $key);
    echo "Original: '$key' -> Normalized: '$normalized'\n";
}

