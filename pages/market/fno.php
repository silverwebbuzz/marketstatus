<?php
$pageTitle = 'Futures & Options | Market Status';
$pageDescription = 'View futures and options margin requirements. Get real-time margin calculations for equity futures.';

// Load futures margin data - try new format first, fallback to old format
$futuresData = loadJsonData('futures_margins.json');

// If new format not available, try old fnO.json format
if (!$futuresData || !isset($futuresData['data'])) {
    $oldData = loadJsonData('fnO.json');
    if ($oldData && is_array($oldData)) {
        // Convert old format to new format
        $convertedData = [];
        foreach ($oldData as $item) {
            $convertedData[] = [
                'symbol' => $item['scrip'] ?? 'N/A',
                'expiry' => $item['expiry'] ?? 'N/A',
                'lot_size' => isset($item['lot_size']) ? (int)$item['lot_size'] : null,
                'mwpl' => null,
                'nrml_margin' => isset($item['nrml_margin']) ? (float)$item['nrml_margin'] : null,
                'nrml_margin_rate' => isset($item['margin']) ? (float)$item['margin'] : null,
                'price' => isset($item['price']) ? (float)$item['price'] : null,
            ];
        }
        $futuresData = [
            'last_updated' => date('Y-m-d H:i:s'),
            'source' => 'Legacy Data',
            'total_contracts' => count($convertedData),
            'data' => $convertedData
        ];
    }
}

includeHeader($pageTitle, $pageDescription);
?>

<div class="container">
    <h1>Futures & Options Margins</h1>
    
    <?php if ($futuresData && isset($futuresData['data']) && !empty($futuresData['data'])): ?>
        <div class="futures-info">
            <p class="last-updated">
                Last updated: <?php echo e($futuresData['last_updated'] ?? 'N/A'); ?>
                <?php if (isset($futuresData['source'])): ?>
                    | Source: <?php echo e($futuresData['source']); ?>
                <?php endif; ?>
            </p>
            <p class="total-contracts">
                Total Contracts: <?php echo count($futuresData['data']); ?>
            </p>
        </div>
        
        <div class="futures-table-container">
            <table class="futures-table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Expiry</th>
                        <th>Lot Size</th>
                        <th>MWPL</th>
                        <th>NRML Margin</th>
                        <th>NRML Margin Rate</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($futuresData['data'] as $contract): ?>
                        <tr>
                            <td><strong><?php echo e($contract['symbol'] ?? 'N/A'); ?></strong></td>
                            <td><?php echo e($contract['expiry'] ?? 'N/A'); ?></td>
                            <td><?php echo isset($contract['lot_size']) ? number_format($contract['lot_size']) : 'N/A'; ?></td>
                            <td><?php echo isset($contract['mwpl']) && $contract['mwpl'] ? formatPercentage($contract['mwpl'], 2) : 'N/A'; ?></td>
                            <td>₹<?php echo isset($contract['nrml_margin']) && $contract['nrml_margin'] ? formatNumber($contract['nrml_margin'], 0) : 'N/A'; ?></td>
                            <td><?php echo isset($contract['nrml_margin_rate']) && $contract['nrml_margin_rate'] ? formatPercentage($contract['nrml_margin_rate'], 2) : 'N/A'; ?></td>
                            <td>₹<?php echo isset($contract['price']) && $contract['price'] ? formatNumber($contract['price'], 2) : 'N/A'; ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php else: ?>
        <div class="no-data">
            <p>Futures margin data is currently unavailable.</p>
            <p>Data is updated daily at 8:00 AM. Please check back later.</p>
            <p><small>If this issue persists, please contact support.</small></p>
        </div>
    <?php endif; ?>
    
    <div class="futures-note">
        <h3>Note:</h3>
        <ul>
            <li>Margins are updated daily at 8:00 AM IST</li>
            <li>NRML = Normal Margin (overnight positions)</li>
            <li>MWPL = Maximum Weighted Position Limit</li>
            <li>Data source: Zerodha Margin Calculator</li>
            <li>Please verify margins with your broker before trading</li>
        </ul>
    </div>
</div>

<style>
.futures-table-container {
    overflow-x: auto;
    margin: 20px 0;
}

.futures-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.futures-table thead {
    background: #f5f5f5;
}

.futures-table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
}

.futures-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
}

.futures-table tbody tr:hover {
    background: #f9f9f9;
}

.futures-info {
    margin: 20px 0;
    padding: 15px;
    background: #f0f7ff;
    border-left: 4px solid #0066cc;
}

.last-updated, .total-contracts {
    margin: 5px 0;
    color: #666;
}

.futures-note {
    margin-top: 30px;
    padding: 20px;
    background: #fff9e6;
    border-radius: 5px;
}

.futures-note h3 {
    margin-top: 0;
    color: #d97706;
}

.futures-note ul {
    margin: 10px 0;
    padding-left: 20px;
}

.futures-note li {
    margin: 8px 0;
    color: #666;
}

.no-data {
    text-align: center;
    padding: 40px 20px;
    background: #fff3cd;
    border-radius: 5px;
    margin: 20px 0;
}

.no-data p {
    margin: 10px 0;
    color: #856404;
}
</style>

<?php includeFooter(); ?>
