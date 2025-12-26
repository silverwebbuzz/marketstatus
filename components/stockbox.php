<?php
/**
 * StockBox Component
 * Displays stock index information with chart
 */
if (!isset($title)) {
    $title = 'NIFTY 50';
}

$apiUrls = [
    'NIFTY 50' => 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=nifty50',
    'NIFTYBANK' => 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=niftyBank',
    'SENSEX' => 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=sensex',
];

$dataKeys = [
    'NIFTY 50' => 'today_stock_data',
    'NIFTYBANK' => 'today_stock_data_bn',
    'SENSEX' => 'today_stocks_sx_data',
];

$apiUrl = $apiUrls[$title] ?? $apiUrls['NIFTY 50'];
$dataKey = $dataKeys[$title] ?? $dataKeys['NIFTY 50'];

// Fetch data from API
$stockData = null;
$chartData = [];
$currentPrice = 0;
$change = 0;
$changePercent = 0;

if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    curl_close($ch);
    
    if ($response) {
        $result = json_decode($response, true);
        if (isset($result[$dataKey])) {
            $stockData = $result[$dataKey];
            if (isset($stockData['current_price'])) {
                $currentPrice = $stockData['current_price'];
            }
            if (isset($stockData['change'])) {
                $change = $stockData['change'];
            }
            if (isset($stockData['change_percent'])) {
                $changePercent = $stockData['change_percent'];
            }
            if (isset($stockData['chart_data']) && is_array($stockData['chart_data'])) {
                $chartData = $stockData['chart_data'];
            }
        }
    }
}
?>

<div class="stock-box" data-title="<?php echo e($title); ?>">
    <div class="stock-header">
        <h3><?php echo e($title); ?></h3>
    </div>
    <div class="stock-price">
        <span class="price"><?php echo formatNumber($currentPrice, 2); ?></span>
        <span class="change <?php echo $change >= 0 ? 'positive' : 'negative'; ?>">
            <?php echo ($change >= 0 ? '+' : '') . formatNumber($change, 2); ?>
            (<?php echo ($changePercent >= 0 ? '+' : '') . formatPercentage($changePercent, 2); ?>)
        </span>
    </div>
    <div class="stock-chart" id="chart-<?php echo str_replace(' ', '-', strtolower($title)); ?>">
        <!-- Chart will be rendered here by JavaScript -->
    </div>
    <a href="<?php echo url('/indices/' . strtolower(str_replace(' ', '-', $title))); ?>" class="stock-link">View Details</a>
</div>

<script>
// Initialize chart for <?php echo e($title); ?>
document.addEventListener('DOMContentLoaded', function() {
    const chartId = 'chart-<?php echo str_replace(' ', '-', strtolower($title)); ?>';
    const chartData = <?php echo json_encode($chartData); ?>;
    
    if (chartData.length > 0 && typeof ApexCharts !== 'undefined') {
        const options = {
            chart: {
                type: 'area',
                height: 100,
                toolbar: { show: false },
                sparkline: { enabled: true }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: ['rgba(16, 145, 33, 0.3)'],
                    inverseColors: false,
                    opacityFrom: 0.8,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                }
            },
            colors: ['rgb(16, 145, 33)'],
            series: [{
                name: 'Price',
                data: chartData.map(item => item.value || item.y || item)
            }],
            xaxis: {
                type: 'datetime',
                labels: { show: false }
            },
            yaxis: { show: false },
            grid: { show: false },
            tooltip: {
                theme: 'dark'
            }
        };
        
        const chart = new ApexCharts(document.querySelector('#' + chartId), options);
        chart.render();
    }
});
</script>

