<?php
/**
 * Fetch Futures & Options Data from Zerodha
 * Simple PHP-only solution using cURL
 * 
 * This script tries multiple methods:
 * 1. Check for API endpoint
 * 2. Extract from HTML table
 * 3. Extract from embedded JSON in script tags
 * 
 * Usage: php fetch_futures_data.php
 * Cron: 0 8 * * * /usr/bin/php /path/to/fetch_futures_data.php >> cron_log.txt 2>&1
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

set_time_limit(120);
$outputFile = DATA_PATH . '/futures_margins.json';
$url = 'https://zerodha.com/margin-calculator/Futures/';

$futuresData = [];

// Method 1: Try API endpoints first (if available)
$apiEndpoints = [
    'https://zerodha.com/api/margin-calculator/futures',
    'https://api.zerodha.com/margin-calculator/futures',
    'https://zerodha.com/margin-calculator/api/futures',
];

foreach ($apiEndpoints as $endpoint) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $endpoint,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer: https://zerodha.com/margin-calculator/Futures/',
        ],
        CURLOPT_TIMEOUT => 10,
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $response) {
        $json = json_decode($response, true);
        if ($json && is_array($json)) {
            $futuresData = $json;
            break;
        }
    }
    
    // Small delay between API attempts to avoid rate limiting
    if ($httpCode === 429) {
        sleep(2);
    }
}

// Method 2: Fetch HTML and parse (with retry logic for rate limiting)
if (empty($futuresData)) {
    $html = null;
    $httpCode = 0;
    $maxRetries = 3;
    $retryDelay = 5; // seconds
    
    for ($attempt = 1; $attempt <= $maxRetries; $attempt++) {
        if ($attempt > 1) {
            echo "Rate limited (HTTP 429). Waiting {$retryDelay} seconds before retry {$attempt}/{$maxRetries}...\n";
            sleep($retryDelay);
            $retryDelay *= 2; // Exponential backoff
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
                'Cache-Control: no-cache',
            ],
            CURLOPT_ENCODING => '',
            CURLOPT_TIMEOUT => 60,
            CURLOPT_CONNECTTIMEOUT => 30,
        ]);
        
        $html = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        // If we got 200, break out of retry loop
        if ($httpCode === 200 && !empty($html)) {
            break;
        }
        
        // If 429 (rate limit), retry
        if ($httpCode === 429) {
            continue;
        }
        
        // For other errors, log and continue retry
        if ($httpCode !== 200) {
            error_log("Attempt $attempt failed: HTTP $httpCode - $curlError");
        }
    }
    
    if ($httpCode !== 200 || empty($html)) {
        error_log("Failed to fetch HTML after $maxRetries attempts: HTTP $httpCode");
        echo "ERROR: Could not fetch data. HTTP $httpCode\n";
        echo "Possible reasons:\n";
        echo "1. Rate limited by Zerodha (try again later)\n";
        echo "2. Network issues\n";
        echo "3. Zerodha blocked the request\n\n";
        echo "Solution: Wait a few minutes and try again, or check if Zerodha has an API endpoint.\n";
        exit(1);
    }
    
    // Try to find JSON data in script tags
    if (preg_match_all('/<script[^>]*>(.*?)<\/script>/is', $html, $scriptMatches)) {
        foreach ($scriptMatches[1] as $scriptContent) {
            // Look for data objects
            if (preg_match('/var\s+(\w+Data|\w+Futures|\w+Margins)\s*=\s*(\[.*?\]|\{.*?\});/s', $scriptContent, $dataMatch)) {
                $jsonStr = $dataMatch[2];
                $data = json_decode($jsonStr, true);
                if ($data && is_array($data) && !empty($data)) {
                    $futuresData = $data;
                    break;
                }
            }
        }
    }
    
    // Method 3: Parse HTML table
    if (empty($futuresData)) {
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
                
                // Extract symbol and expiry
                if (preg_match('/\*\*([^*]+)\*\*/', $contractText, $symbolMatch) &&
                    preg_match('/(\d{2}-\w{3}-\d{4})/', $contractText, $expiryMatch)) {
                    
                    $symbol = trim($symbolMatch[1]);
                    $expiry = trim($expiryMatch[1]);
                    
                    // Extract lot size and MWPL
                    $lotSize = null;
                    $mwpl = null;
                    if (preg_match('/Lot size\s+(\d+)/', $contractText, $lotMatch)) {
                        $lotSize = (int)$lotMatch[1];
                    }
                    if (preg_match('/MWPL\s+([\d.]+)%/', $contractText, $mwplMatch)) {
                        $mwpl = (float)$mwplMatch[1];
                    }
                    
                    // Get other values
                    $nrmlMargin = trim($cells->item(1)->textContent);
                    $nrmlMarginRate = trim($cells->item(2)->textContent);
                    $price = trim($cells->item(3)->textContent);
                    
                    // Clean values
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
    }
    
    // Method 4: Regex extraction as last resort
    if (empty($futuresData)) {
        $pattern = '/\*\*([A-Z0-9]+)\*\*\s+(\d{2}-\w{3}-\d{4}).*?Lot size\s+(\d+).*?MWPL\s+([\d.]+)%.*?(\d+(?:,\d+)*)\s+([\d.]+)%\s+(\d+(?:\.\d+)?)/s';
        
        if (preg_match_all($pattern, $html, $matches, PREG_SET_ORDER)) {
            foreach ($matches as $match) {
                $futuresData[] = [
                    'symbol' => $match[1],
                    'expiry' => $match[2],
                    'lot_size' => (int)$match[3],
                    'mwpl' => (float)$match[4],
                    'nrml_margin' => (float)str_replace(',', '', $match[5]),
                    'nrml_margin_rate' => (float)$match[6],
                    'price' => (float)$match[7],
                ];
            }
        }
    }
}

// Check if we got data
if (empty($futuresData)) {
    error_log("No futures data extracted. Zerodha may use JavaScript rendering.");
    echo "ERROR: Could not extract data.\n";
    echo "Possible reasons:\n";
    echo "1. Zerodha loads data via JavaScript (not in initial HTML)\n";
    echo "2. Page structure changed\n";
    echo "3. Need to find their API endpoint\n\n";
    echo "Solution: Check browser Network tab to find API endpoint, then update this script.\n";
    exit(1);
}

// Format and save data
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

