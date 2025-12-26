<?php
/**
 * Parse futures data from saved HTML file
 * Use this if you manually download the HTML or if fetch fails
 * 
 * Usage: php parse_from_html.php [path_to_html_file]
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

$htmlFile = $argv[1] ?? DATA_PATH . '/zerodha_temp.html';
$outputFile = DATA_PATH . '/futures_margins.json';

if (!file_exists($htmlFile)) {
    echo "ERROR: HTML file not found: $htmlFile\n";
    echo "Usage: php parse_from_html.php [path_to_html_file]\n";
    exit(1);
}

echo "Parsing HTML file: $htmlFile\n";

$html = file_get_contents($htmlFile);
if (!$html) {
    echo "ERROR: Could not read HTML file\n";
    exit(1);
}

// Parse HTML using DOMDocument
libxml_use_internal_errors(true);
$dom = new DOMDocument();
@$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
libxml_clear_errors();

$xpath = new DOMXPath($dom);
$futuresData = [];

// Find all table rows
$rows = $xpath->query("//table//tr[td]");

echo "Found " . $rows->length . " rows\n";

$rowCount = 0;
foreach ($rows as $row) {
    $cells = $xpath->query(".//td", $row);
    
    if ($cells->length >= 4) {
        $contractText = trim($cells->item(0)->textContent);
        
        // Debug first few rows
        if ($rowCount < 3) {
            echo "Row " . ($rowCount + 1) . " contract text: " . substr($contractText, 0, 100) . "\n";
        }
        
        // Extract symbol - try with ** first, then without
        $symbolMatch = null;
        $expiryMatch = null;
        
        if (preg_match('/\*\*([^*]+)\*\*/', $contractText, $symbolMatch)) {
            // Found with **
        } elseif (preg_match('/^([A-Z0-9]+)/', $contractText, $symbolMatch)) {
            // Found without **
        }
        
        // Date format: 30-DEC-2025 (1-2 digits, 3 letters, 4 digits)
        if (preg_match('/(\d{1,2}-[A-Z]{3}-\d{4})/i', $contractText, $expiryMatch)) {
            // Found expiry
        }
        
        if ($symbolMatch && $expiryMatch) {
            
            $symbol = trim($symbolMatch[1]);
            $expiry = trim($expiryMatch[1]);
            
            // Extract lot size and MWPL (case insensitive)
            $lotSize = null;
            $mwpl = null;
            if (preg_match('/Lot size\s+(\d+)/i', $contractText, $lotMatch)) {
                $lotSize = (int)$lotMatch[1];
            }
            if (preg_match('/MWPL\s+([\d.]+)%/i', $contractText, $mwplMatch)) {
                $mwpl = (float)$mwplMatch[1];
            }
            
            // Get values from cells
            $nrmlMargin = trim($cells->item(1)->textContent);
            $nrmlMarginRate = trim($cells->item(2)->textContent);
            $price = trim($cells->item(3)->textContent);
            
            // Clean values
            $nrmlMargin = (float)str_replace([',', '₹', ' ', 'Rs'], '', $nrmlMargin);
            $nrmlMarginRate = (float)str_replace(['%', ' '], '', $nrmlMarginRate);
            $price = (float)str_replace([',', '₹', ' ', 'Rs'], '', $price);
            
            if ($nrmlMargin > 0) {
                $futuresData[] = [
                    'symbol' => $symbol,
                    'expiry' => $expiry,
                    'lot_size' => $lotSize,
                    'mwpl' => $mwpl,
                    'nrml_margin' => $nrmlMargin,
                    'nrml_margin_rate' => $nrmlMarginRate > 0 ? $nrmlMarginRate : null,
                    'price' => $price > 0 ? $price : null,
                ];
                $rowCount++;
            }
        }
    }
}

echo "Successfully parsed $rowCount contracts\n";

if (empty($futuresData)) {
    echo "ERROR: No data extracted from HTML\n";
    exit(1);
}

// Save data
$data = [
    'last_updated' => date('Y-m-d H:i:s'),
    'source' => 'Zerodha (parsed from HTML)',
    'source_url' => 'https://zerodha.com/margin-calculator/Futures/',
    'html_source' => $htmlFile,
    'total_contracts' => count($futuresData),
    'data' => $futuresData
];

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (file_put_contents($outputFile, $json) === false) {
    echo "ERROR: Failed to write to $outputFile\n";
    exit(1);
}

echo "✓ Success: " . count($futuresData) . " contracts saved to $outputFile\n";
exit(0);

