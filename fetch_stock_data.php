<?php
/**
 * Fetch Stock Data from Yahoo Finance
 * Fetches OHLC, Volume, and calculates technical indicators
 * Runs every 30 minutes via cron
 * 
 * Cron: */30 * * * * /usr/bin/php /path/to/fetch_stock_data.php >> cron_stock.log 2>&1
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

set_time_limit(300);
$outputFile = DATA_PATH . '/stock_data.json';
$futuresFile = DATA_PATH . '/futures_margins.json';

echo "Fetching stock data from Yahoo Finance...\n";

// Load futures data to get symbols
$futuresData = loadJsonData('futures_margins.json');
if (!$futuresData || !isset($futuresData['data'])) {
    echo "ERROR: No futures data found\n";
    exit(1);
}

// Get unique symbols
$symbols = [];
foreach ($futuresData['data'] as $contract) {
    $symbol = $contract['symbol'] ?? '';
    if ($symbol && !in_array($symbol, $symbols)) {
        $symbols[] = $symbol;
    }
}

echo "Found " . count($symbols) . " unique symbols\n";

$stockData = [];
$processed = 0;
$failed = 0;

foreach ($symbols as $symbol) {
    $processed++;
    if ($processed % 10 == 0) {
        echo "Processed: $processed / " . count($symbols) . "\n";
    }
    
    // Fetch from Yahoo Finance
    $url = "https://query1.finance.yahoo.com/v8/finance/chart/{$symbol}.NS";
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        CURLOPT_TIMEOUT => 10,
        CURLOPT_CONNECTTIMEOUT => 5,
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || !$response) {
        $failed++;
        continue;
    }
    
    $data = json_decode($response, true);
    if (!$data || !isset($data['chart']['result'][0])) {
        $failed++;
        continue;
    }
    
    $result = $data['chart']['result'][0];
    $meta = $result['meta'] ?? [];
    $indicators = $result['indicators'] ?? [];
    $quote = $indicators['quote'][0] ?? [];
    
    // Get current price
    $currentPrice = $meta['regularMarketPrice'] ?? $meta['previousClose'] ?? 0;
    
    // Get OHLC from quote data
    $opens = $quote['open'] ?? [];
    $highs = $quote['high'] ?? [];
    $lows = $quote['low'] ?? [];
    $closes = $quote['close'] ?? [];
    $volumes = $quote['volume'] ?? [];
    
    // Get latest values (last non-null)
    $open = 0;
    $high = 0;
    $low = 0;
    $close = $currentPrice;
    $volume = 0;
    
    for ($i = count($opens) - 1; $i >= 0; $i--) {
        if ($opens[$i] !== null) { $open = $opens[$i]; break; }
    }
    for ($i = count($highs) - 1; $i >= 0; $i--) {
        if ($highs[$i] !== null) { $high = $highs[$i]; break; }
    }
    for ($i = count($lows) - 1; $i >= 0; $i--) {
        if ($lows[$i] !== null) { $low = $lows[$i]; break; }
    }
    for ($i = count($closes) - 1; $i >= 0; $i--) {
        if ($closes[$i] !== null) { $close = $closes[$i]; break; }
    }
    for ($i = count($volumes) - 1; $i >= 0; $i--) {
        if ($volumes[$i] !== null) { $volume = $volumes[$i]; break; }
    }
    
    // Get 52-week high/low
    $fiftyTwoWeekHigh = $meta['fiftyTwoWeekHigh'] ?? $high;
    $fiftyTwoWeekLow = $meta['fiftyTwoWeekLow'] ?? $low;
    
    // Get historical data for DMA calculation (last 200 days)
    $timestamps = $result['timestamp'] ?? [];
    $historicalCloses = [];
    foreach ($closes as $idx => $closePrice) {
        if ($closePrice !== null) {
            $historicalCloses[] = $closePrice;
        }
    }
    
    // Calculate DMAs
    $dma5 = calculateDMA($historicalCloses, 5);
    $dma10 = calculateDMA($historicalCloses, 10);
    $dma20 = calculateDMA($historicalCloses, 20);
    $dma50 = calculateDMA($historicalCloses, 50);
    $dma100 = calculateDMA($historicalCloses, 100);
    $dma200 = calculateDMA($historicalCloses, 200);
    
    // Calculate Pivot Points
    $pivotData = calculatePivotPoints($high, $low, $close);
    
    // Calculate Fibonacci levels (using 52-week range)
    $fibLevels = calculateFibonacciLevels($fiftyTwoWeekHigh, $fiftyTwoWeekLow);
    
    // Calculate crash probability signals
    $crashSignals = calculateCrashSignals($close, $dma50, $dma100, $volume, $historicalCloses);
    
    // Calculate target prices
    $targets = calculateTargets($high, $low, $close);
    
    $stockData[$symbol] = [
        'symbol' => $symbol,
        'current_price' => round($currentPrice, 2),
        'open' => round($open, 2),
        'high' => round($high, 2),
        'low' => round($low, 2),
        'close' => round($close, 2),
        'volume' => (int)$volume,
        'fifty_two_week_high' => round($fiftyTwoWeekHigh, 2),
        'fifty_two_week_low' => round($fiftyTwoWeekLow, 2),
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
    ];
    
    // Small delay to avoid rate limiting
    usleep(100000); // 0.1 second
}

// Save data
$output = [
    'last_updated' => date('Y-m-d H:i:s'),
    'total_symbols' => count($stockData),
    'successful' => count($stockData),
    'failed' => $failed,
    'data' => $stockData
];

file_put_contents($outputFile, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "\n✓ Success: " . count($stockData) . " symbols saved\n";
echo "✗ Failed: $failed symbols\n";
exit(0);

/**
 * Calculate DMA (Daily Moving Average)
 */
function calculateDMA($prices, $period) {
    if (count($prices) < $period) {
        return 0;
    }
    $slice = array_slice($prices, -$period);
    return array_sum($slice) / count($slice);
}

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
    
    // Signal 1: Price below 50 & 100 DMA
    if ($dma50 > 0 && $dma100 > 0 && $currentPrice < $dma50 && $currentPrice < $dma100) {
        $signals[] = 'Price below 50 & 100 DMA';
        $signalCount++;
    }
    
    // Signal 2: Breakdown below 61.8% Fib (need to calculate)
    // This would need the 52-week range, simplified here
    
    // Signal 3: High volume + price fall
    if (count($historicalCloses) >= 2) {
        $prevClose = $historicalCloses[count($historicalCloses) - 2];
        $priceChange = (($currentPrice - $prevClose) / $prevClose) * 100;
        if ($priceChange < -2 && $volume > 0) { // 2% fall with volume
            $signals[] = 'High volume + price fall';
            $signalCount++;
        }
    }
    
    // Signal 4: Close below previous swing low
    if (count($historicalCloses) >= 5) {
        $recentLows = array_slice($historicalCloses, -5);
        $swingLow = min($recentLows);
        if ($currentPrice < $swingLow) {
            $signals[] = 'Close below previous swing low';
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
    
    // Range expansion method
    $breakoutLevel = $high;
    $target1 = $breakoutLevel + $range;
    
    // Fibonacci extension
    $target_fib_127 = $close + ($range * 1.272);
    $target_fib_162 = $close + ($range * 1.618);
    
    return [
        'target_1' => round($target1, 2),
        'target_fib_127' => round($target_fib_127, 2),
        'target_fib_162' => round($target_fib_162, 2),
    ];
}

