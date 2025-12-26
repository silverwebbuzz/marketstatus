<?php
/**
 * Safe Futures Data Fetcher with Rate Limit Handling
 * Includes delays and better error handling
 * 
 * Usage: php fetch_futures_data_safe.php
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

set_time_limit(300);
$outputFile = DATA_PATH . '/futures_margins.json';
$url = 'https://zerodha.com/margin-calculator/Futures/';

echo "Fetching futures data from Zerodha...\n";

$futuresData = [];

// Add delay before making request (respectful scraping)
sleep(2);

// Fetch HTML with retry logic
$html = fetchWithRetry($url, 3, 5);

if (!$html) {
    echo "ERROR: Failed to fetch data after multiple attempts.\n";
    echo "Zerodha may be rate-limiting requests.\n";
    echo "Please try again later or check if they have an API endpoint.\n";
    exit(1);
}

// Parse HTML
$futuresData = parseFuturesData($html);

if (empty($futuresData)) {
    error_log("No futures data extracted");
    echo "WARNING: No data extracted. Page structure may have changed.\n";
    echo "You may need to manually update data/futures_margins.json\n";
    exit(1);
}

// Save data
$data = [
    'last_updated' => date('Y-m-d H:i:s'),
    'source' => 'Zerodha',
    'source_url' => $url,
    'total_contracts' => count($futuresData),
    'data' => $futuresData
];

$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (file_put_contents($outputFile, $json) === false) {
    error_log("Failed to write to $outputFile");
    exit(1);
}

echo "Success: " . count($futuresData) . " contracts saved to $outputFile\n";
exit(0);

/**
 * Fetch URL with retry logic and rate limit handling
 */
function fetchWithRetry($url, $maxRetries = 3, $initialDelay = 5) {
    $delay = $initialDelay;
    
    for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
        if ($attempt > 1) {
            echo "Waiting {$delay} seconds before retry {$attempt}/{$maxRetries}...\n";
            sleep($delay);
            $delay *= 2; // Exponential backoff
        }
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            CURLOPT_HTTPHEADER => [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language: en-US,en;q=0.9',
                'Accept-Encoding: gzip, deflate, br',
                'Connection: keep-alive',
            ],
            CURLOPT_ENCODING => '',
            CURLOPT_TIMEOUT => 60,
            CURLOPT_CONNECTTIMEOUT => 30,
        ]);
        
        $html = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($httpCode === 200 && !empty($html)) {
            return $html;
        }
        
        if ($httpCode === 429) {
            echo "Rate limited (HTTP 429). ";
            continue;
        }
        
        echo "Attempt $attempt failed: HTTP $httpCode";
        if ($curlError) {
            echo " - $curlError";
        }
        echo "\n";
    }
    
    return null;
}

/**
 * Parse futures data from HTML
 */
function parseFuturesData($html) {
    $futuresData = [];
    
    // Try to find JSON in script tags
    if (preg_match_all('/<script[^>]*>(.*?)<\/script>/is', $html, $scriptMatches)) {
        foreach ($scriptMatches[1] as $scriptContent) {
            if (preg_match('/var\s+(\w+Data|\w+Futures|\w+Margins)\s*=\s*(\[.*?\]|\{.*?\});/s', $scriptContent, $dataMatch)) {
                $jsonStr = $dataMatch[2];
                $data = json_decode($jsonStr, true);
                if ($data && is_array($data) && !empty($data)) {
                    return $data;
                }
            }
        }
    }
    
    // Parse HTML table
    libxml_use_internal_errors(true);
    $dom = new DOMDocument();
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    libxml_clear_errors();
    
    $xpath = new DOMXPath($dom);
    $rows = $xpath->query("//table//tr[td]");
    
    foreach ($rows as $row) {
        $cells = $xpath->query(".//td", $row);
        
        if ($cells->length >= 4) {
            $contractText = trim($cells->item(0)->textContent);
            
            if (preg_match('/\*\*([^*]+)\*\*/', $contractText, $symbolMatch) &&
                preg_match('/(\d{2}-\w{3}-\d{4})/', $contractText, $expiryMatch)) {
                
                $symbol = trim($symbolMatch[1]);
                $expiry = trim($expiryMatch[1]);
                
                $lotSize = null;
                $mwpl = null;
                if (preg_match('/Lot size\s+(\d+)/', $contractText, $lotMatch)) {
                    $lotSize = (int)$lotMatch[1];
                }
                if (preg_match('/MWPL\s+([\d.]+)%/', $contractText, $mwplMatch)) {
                    $mwpl = (float)$mwplMatch[1];
                }
                
                $nrmlMargin = trim($cells->item(1)->textContent);
                $nrmlMarginRate = trim($cells->item(2)->textContent);
                $price = trim($cells->item(3)->textContent);
                
                $nrmlMargin = (float)str_replace([',', '₹', ' ', 'Rs'], '', $nrmlMargin);
                $nrmlMarginRate = (float)str_replace(['%', ' '], '', $nrmlMarginRate);
                $price = (float)str_replace([',', '₹', ' ', 'Rs'], '', $price);
                
                $futuresData[] = [
                    'symbol' => $symbol,
                    'expiry' => $expiry,
                    'lot_size' => $lotSize,
                    'mwpl' => $mwpl,
                    'nrml_margin' => $nrmlMargin > 0 ? $nrmlMargin : null,
                    'nrml_margin_rate' => $nrmlMarginRate > 0 ? $nrmlMarginRate : null,
                    'price' => $price > 0 ? $price : null,
                ];
            }
        }
    }
    
    return $futuresData;
}

