<?php
/**
 * Fetch F&O Stock Data from NSE India
 * Single API call to get all F&O securities data
 * Merges with existing futures_margins.json
 * 
 * Cron: 0,30 * * * * /usr/bin/php /path/to/fetch_nse_fno_data.php >> cron_nse_fno.log 2>&1
 * Note: Use 0,30 format instead of star-slash-30 to avoid PHP parse errors
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

set_time_limit(120);
$outputFile = DATA_PATH . '/stock_data.json';
$futuresFile = DATA_PATH . '/futures_margins.json';

echo "Fetching F&O stock data from NSE India...\n";

// Load existing futures margins data
$futuresData = loadJsonData('futures_margins.json');
if (!$futuresData || !isset($futuresData['data'])) {
    echo "WARNING: No futures margins data found. Run update_futures_smart.php first.\n";
    $futuresData = ['data' => []];
}

// Create symbol map from futures data for merging
$futuresSymbolMap = [];
foreach ($futuresData['data'] as $contract) {
    $symbol = strtoupper($contract['symbol'] ?? '');
    if ($symbol && !isset($futuresSymbolMap[$symbol])) {
        $futuresSymbolMap[$symbol] = $contract;
    }
}

// Initialize advance/decline counters
$advanceDecline = [
    'advances' => 0,
    'declines' => 0,
    'unchanged' => 0,
    'last_updated' => date('Y-m-d H:i:s'),
];

// Create cURL session with proper headers and cookies
function getNseCurlSession() {
    static $cookieFile = null;
    
    if ($cookieFile === null) {
        $cookieFile = sys_get_temp_dir() . '/nse_cookies_' . uniqid() . '.txt';
    }
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        CURLOPT_HTTPHEADER => [
            'Accept: application/json, text/plain, */*',
            'Accept-Language: en-US,en;q=0.9',
            'Accept-Encoding: gzip, deflate, br',
            'Connection: keep-alive',
            'Referer: https://www.nseindia.com/',
            'Origin: https://www.nseindia.com',
        ],
        CURLOPT_COOKIEFILE => $cookieFile,
        CURLOPT_COOKIEJAR => $cookieFile,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_ENCODING => 'gzip, deflate, br',
    ]);
    return $ch;
}

// Initialize session by visiting NSE homepage first
function initNseSession() {
    $ch = getNseCurlSession();
    curl_setopt($ch, CURLOPT_URL, 'https://www.nseindia.com/');
    curl_exec($ch);
    curl_close($ch);
}

// Initialize NSE session
echo "Initializing NSE session...\n";
initNseSession();
sleep(1);

// Fetch all F&O securities in one call
echo "Fetching F&O securities data from NSE...\n";
$ch = getNseCurlSession();
$url = 'https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O';
curl_setopt($ch, CURLOPT_URL, $url);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    echo "ERROR: Failed to fetch NSE data. HTTP Code: $httpCode\n";
    exit(1);
}

$nseData = json_decode($response, true);
if (!$nseData || !isset($nseData['data']) || !is_array($nseData['data'])) {
    echo "ERROR: Invalid NSE data format\n";
    exit(1);
}

echo "Found " . count($nseData['data']) . " F&O securities from NSE\n";

$stockData = [];
$processed = 0;

// Process each stock from NSE
foreach ($nseData['data'] as $stock) {
    $processed++;
    
    $symbol = strtoupper(trim($stock['symbol'] ?? ''));
    if (!$symbol) {
        continue;
    }
    
    // Clean symbol (remove any extra spaces, special chars that might cause mismatch)
    $symbol = preg_replace('/\s+/', '', $symbol); // Remove all spaces
    
    // Extract all available fields from NSE
    $currentPrice = (float)($stock['lastPrice'] ?? $stock['ltp'] ?? 0);
    $open = (float)($stock['open'] ?? 0);
    $high = (float)($stock['dayHigh'] ?? $stock['high'] ?? 0);
    $low = (float)($stock['dayLow'] ?? $stock['low'] ?? 0);
    $close = (float)($stock['previousClose'] ?? $currentPrice);
    $volume = (int)($stock['totalTradedVolume'] ?? $stock['volume'] ?? 0);
    
    // 52-week high/low
    $fiftyTwoWeekHigh = (float)($stock['yearHigh'] ?? $stock['52WeekHigh'] ?? $high);
    $fiftyTwoWeekLow = (float)($stock['yearLow'] ?? $stock['52WeekLow'] ?? $low);
    
    // Change and change percentage
    $change = (float)($stock['change'] ?? ($currentPrice - $close));
    $changePercent = (float)($stock['pChange'] ?? ($close > 0 ? (($change / $close) * 100) : 0));
    
    // Count advance/decline
    if ($change > 0) {
        $advanceDecline['advances']++;
    } elseif ($change < 0) {
        $advanceDecline['declines']++;
    } else {
        $advanceDecline['unchanged']++;
    }
    
    // Industry
    $industry = $stock['industry'] ?? $stock['industryName'] ?? '';
    
    // Additional NSE fields
    $marketCap = (float)($stock['marketCap'] ?? 0);
    $pe = (float)($stock['pe'] ?? 0);
    $pb = (float)($stock['pb'] ?? 0);
    $divYield = (float)($stock['divYield'] ?? 0);
    $faceValue = (float)($stock['faceValue'] ?? 0);
    
    // Get futures contract data if available
    $futuresContract = $futuresSymbolMap[$symbol] ?? null;
    
    // Calculate technical indicators (simplified - using available data)
    $historicalCloses = $close > 0 ? [$close] : [];
    
    // Basic DMA calculation (would need historical data for accurate DMAs)
    $dma5 = $currentPrice;
    $dma10 = $currentPrice;
    $dma20 = $currentPrice;
    $dma50 = $currentPrice;
    $dma100 = $currentPrice;
    $dma200 = $currentPrice;
    
    // Calculate Pivot Points
    $pivotData = calculatePivotPoints($high, $low, $close);
    
    // Calculate Fibonacci levels
    $fibLevels = calculateFibonacciLevels($fiftyTwoWeekHigh, $fiftyTwoWeekLow);
    
    // Calculate crash signals (simplified)
    $crashSignals = calculateCrashSignals($currentPrice, $dma50, $dma100, $volume, $historicalCloses);
    
    // Calculate target prices
    $targets = calculateTargets($high, $low, $close);
    
    // Build comprehensive stock data
    $stockData[$symbol] = [
        'symbol' => $symbol,
        'current_price' => round($currentPrice, 2),
        'open' => round($open, 2),
        'high' => round($high, 2),
        'low' => round($low, 2),
        'close' => round($close, 2),
        'change' => round($change, 2),
        'change_percent' => round($changePercent, 2),
        'volume' => $volume,
        'fifty_two_week_high' => round($fiftyTwoWeekHigh, 2),
        'fifty_two_week_low' => round($fiftyTwoWeekLow, 2),
        'industry' => $industry,
        'market_cap' => $marketCap > 0 ? round($marketCap, 2) : null,
        'pe' => $pe > 0 ? round($pe, 2) : null,
        'pb' => $pb > 0 ? round($pb, 2) : null,
        'div_yield' => $divYield > 0 ? round($divYield, 2) : null,
        'face_value' => $faceValue > 0 ? round($faceValue, 2) : null,
        'dma' => [
            'dma5' => round($dma5, 2),
            'dma10' => round($dma10, 2),
            'dma20' => round($dma20, 2),
            'dma50' => round($dma50, 2),
            'dma100' => round($dma100, 2),
            'dma200' => round($dma200, 2),
        ],
        'pivot_points' => $pivotData,
        'fibonacci' => $fibLevels,
        'crash_signals' => $crashSignals,
        'targets' => $targets,
        'last_updated' => date('Y-m-d H:i:s'),
        // Merge futures contract data if available
        'futures_contract' => $futuresContract ? [
            'expiry' => $futuresContract['expiry'] ?? null,
            'lot_size' => $futuresContract['lot_size'] ?? null,
            'nrml_margin' => $futuresContract['nrml_margin'] ?? null,
            'nrml_margin_rate' => $futuresContract['nrml_margin_rate'] ?? null,
            'mwpl' => $futuresContract['mwpl'] ?? null,
            'price' => $futuresContract['price'] ?? null,
        ] : null,
    ];
}

// Save data with advance/decline
$output = [
    'last_updated' => date('Y-m-d H:i:s'),
    'source' => 'NSE India (F&O Securities)',
    'total_symbols' => count($stockData),
    'advance_decline' => $advanceDecline,
    'data' => $stockData
];

file_put_contents($outputFile, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "\n✓ Success: " . count($stockData) . " symbols saved\n";
echo "📊 Advance/Decline: " . $advanceDecline['advances'] . " advances, " . $advanceDecline['declines'] . " declines, " . $advanceDecline['unchanged'] . " unchanged\n";
exit(0);

/**
 * Calculate Pivot Points
 */
function calculatePivotPoints($high, $low, $close) {
    if ($high == 0 || $low == 0 || $close == 0) {
        return [
            'pivot' => 0,
            'r1' => 0, 'r2' => 0, 'r3' => 0,
            's1' => 0, 's2' => 0, 's3' => 0,
        ];
    }
    
    $pivot = ($high + $low + $close) / 3;
    
    return [
        'pivot' => round($pivot, 2),
        'r1' => round((2 * $pivot) - $low, 2),
        'r2' => round($pivot + ($high - $low), 2),
        'r3' => round($high + 2 * ($pivot - $low), 2),
        's1' => round((2 * $pivot) - $high, 2),
        's2' => round($pivot - ($high - $low), 2),
        's3' => round($low - 2 * ($high - $pivot), 2),
    ];
}

/**
 * Calculate Fibonacci Levels
 */
function calculateFibonacciLevels($high, $low) {
    if ($high == 0 || $low == 0) {
        return [];
    }
    
    $range = $high - $low;
    
    return [
        'fib_0' => round($high, 2),
        'fib_23.6' => round($high - ($range * 0.236), 2),
        'fib_38.2' => round($high - ($range * 0.382), 2),
        'fib_50' => round($high - ($range * 0.5), 2),
        'fib_61.8' => round($high - ($range * 0.618), 2),
        'fib_100' => round($low, 2),
    ];
}

/**
 * Calculate Crash Signals
 */
function calculateCrashSignals($currentPrice, $dma50, $dma100, $volume, $historicalCloses) {
    $signals = [];
    $signalCount = 0;
    
    if ($dma50 > 0 && $dma100 > 0 && $currentPrice < $dma50 && $currentPrice < $dma100) {
        $signals[] = 'Price below 50 & 100 DMA';
        $signalCount++;
    }
    
    if (count($historicalCloses) >= 2) {
        $prevClose = $historicalCloses[count($historicalCloses) - 2];
        $priceChange = (($currentPrice - $prevClose) / $prevClose) * 100;
        if ($priceChange < -2 && $volume > 0) {
            $signals[] = 'High volume + price fall';
            $signalCount++;
        }
    }
    
    return [
        'signals' => $signals,
        'signal_count' => $signalCount,
        'risk_level' => $signalCount >= 3 ? 'HIGH' : ($signalCount >= 2 ? 'MEDIUM' : 'LOW'),
    ];
}

/**
 * Calculate Target Prices
 */
function calculateTargets($high, $low, $close) {
    if ($high == 0 || $low == 0) {
        return [];
    }
    
    $range = $high - $low;
    $breakoutLevel = $high;
    $target1 = $breakoutLevel + $range;
    $target_fib_127 = $close + ($range * 1.272);
    $target_fib_162 = $close + ($range * 1.618);
    
    return [
        'target_1' => round($target1, 2),
        'target_fib_127' => round($target_fib_127, 2),
        'target_fib_162' => round($target_fib_162, 2),
    ];
}

