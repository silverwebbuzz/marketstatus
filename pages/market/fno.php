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

// Group contracts by symbol
$groupedData = [];
if ($futuresData && isset($futuresData['data'])) {
    foreach ($futuresData['data'] as $contract) {
        $symbol = $contract['symbol'] ?? 'UNKNOWN';
        if (!isset($groupedData[$symbol])) {
            $groupedData[$symbol] = [];
        }
        $groupedData[$symbol][] = $contract;
    }
}

// Load stock data (OHLC, Volume, Indicators)
$stockData = loadJsonData('stock_data.json');
$stockDataMap = [];
if ($stockData && isset($stockData['data'])) {
    foreach ($stockData['data'] as $symbol => $data) {
        $stockDataMap[strtoupper($symbol)] = $data;
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
                Total Contracts: <?php echo count($futuresData['data']); ?> | 
                Unique Symbols: <span id="visible-symbols-count"><?php echo count($groupedData); ?></span>
            </p>
        </div>

        <!-- Search and Filter Section -->
        <div class="futures-controls">
            <div class="search-filter-row">
                <div class="search-box">
                    <input type="text" id="symbol-search" placeholder="Search by symbol (e.g., NIFTY, RELIANCE)" autocomplete="off">
                    <span class="search-icon">🔍</span>
                </div>
                <div class="filter-box">
                    <select id="expiry-filter">
                        <option value="">All Expiries</option>
                        <?php
                        // Get unique expiries
                        $expiries = [];
                        foreach ($futuresData['data'] as $contract) {
                            if (isset($contract['expiry'])) {
                                $expiries[$contract['expiry']] = true;
                            }
                        }
                        ksort($expiries);
                        foreach ($expiries as $expiry => $val) {
                            echo '<option value="' . e($expiry) . '">' . e($expiry) . '</option>';
                        }
                        ?>
                    </select>
                </div>
                <div class="filter-box">
                    <select id="margin-rate-filter">
                        <option value="">All Margin Rates</option>
                        <option value="0-15">Below 15%</option>
                        <option value="15-20">15% - 20%</option>
                        <option value="20-25">20% - 25%</option>
                        <option value="25-30">25% - 30%</option>
                        <option value="30+">Above 30%</option>
                    </select>
                </div>
                <button id="clear-filters" class="btn-clear">Clear Filters</button>
            </div>
        </div>
        
        <div class="futures-table-container">
            <table class="futures-table" id="futures-table">
                <thead>
                    <tr>
                        <th class="sortable" data-sort="symbol">
                            Symbol <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="expiry">
                            Expiry <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="current_price">
                            Current Price <span class="sort-indicator">↕</span>
                        </th>
                        <th>OHLC</th>
                        <th class="sortable" data-sort="volume">
                            Volume <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="lot_size">
                            Lot Size <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="mwpl">
                            MWPL <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="nrml_margin">
                            NRML Margin <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="nrml_margin_rate">
                            Margin Rate <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="price">
                            Futures Price <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="contract_value">
                            Contract Value <span class="sort-indicator">↕</span>
                        </th>
                        <th>Indicators</th>
                    </tr>
                </thead>
                <tbody id="futures-tbody">
                    <?php foreach ($groupedData as $symbol => $contracts): 
                        // Sort contracts by expiry
                        usort($contracts, function($a, $b) {
                            return strcmp($a['expiry'] ?? '', $b['expiry'] ?? '');
                        });
                        $firstContract = $contracts[0];
                        $contractCount = count($contracts);
                        $symbolUpper = strtoupper($symbol);
                        $stockInfo = $stockDataMap[$symbolUpper] ?? null;
                    ?>
                        <tr class="symbol-row" data-symbol="<?php echo e($symbolUpper); ?>" data-expiry="<?php echo e($firstContract['expiry'] ?? ''); ?>" data-margin-rate="<?php echo e($firstContract['nrml_margin_rate'] ?? 0); ?>" data-current-price="<?php echo e($stockInfo['current_price'] ?? 0); ?>" data-volume="<?php echo e($stockInfo['volume'] ?? 0); ?>">
                            <td>
                                <strong><?php echo e($symbol); ?></strong>
                                <?php if ($contractCount > 1): ?>
                                    <button class="toggle-details" data-symbol="<?php echo e($symbol); ?>" title="Click to show/hide all contracts">
                                        <span class="toggle-icon">▼</span>
                                    </button>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php echo e($firstContract['expiry'] ?? 'N/A'); ?>
                                <?php if ($contractCount > 1): ?>
                                    <span class="more-expiries" title="Click button to see all expiries">+<?php echo ($contractCount - 1); ?> more</span>
                                <?php endif; ?>
                            </td>
                            <td class="price-cell">
                                <?php if ($stockInfo && isset($stockInfo['current_price'])): ?>
                                    ₹<?php echo formatNumber($stockInfo['current_price'], 2); ?>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td class="ohlc-cell">
                                <?php if ($stockInfo): ?>
                                    <div class="ohlc-compact">
                                        <span>O: ₹<?php echo formatNumber($stockInfo['open'] ?? 0, 2); ?></span>
                                        <span>H: ₹<?php echo formatNumber($stockInfo['high'] ?? 0, 2); ?></span>
                                        <span>L: ₹<?php echo formatNumber($stockInfo['low'] ?? 0, 2); ?></span>
                                        <span>C: ₹<?php echo formatNumber($stockInfo['close'] ?? 0, 2); ?></span>
                                    </div>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php if ($stockInfo && isset($stockInfo['volume'])): ?>
                                    <?php echo formatNumber($stockInfo['volume'], 0); ?>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td><?php echo isset($firstContract['lot_size']) ? number_format($firstContract['lot_size']) : 'N/A'; ?></td>
                            <td><?php echo isset($firstContract['mwpl']) && $firstContract['mwpl'] ? formatPercentage($firstContract['mwpl'], 2) : 'N/A'; ?></td>
                            <td>₹<?php echo isset($firstContract['nrml_margin']) && $firstContract['nrml_margin'] ? formatNumber($firstContract['nrml_margin'], 0) : 'N/A'; ?></td>
                            <td><?php echo isset($firstContract['nrml_margin_rate']) && $firstContract['nrml_margin_rate'] ? formatPercentage($firstContract['nrml_margin_rate'], 2) : 'N/A'; ?></td>
                            <td>₹<?php echo isset($firstContract['price']) && $firstContract['price'] ? formatNumber($firstContract['price'], 2) : 'N/A'; ?></td>
                            <td>
                                <?php 
                                $lotSize = $firstContract['lot_size'] ?? 0;
                                $price = $firstContract['price'] ?? 0;
                                $contractValue = $lotSize * $price;
                                echo $contractValue > 0 ? '₹' . formatNumber($contractValue, 2) : 'N/A';
                                ?>
                            </td>
                            <td>
                                <?php if ($stockInfo): ?>
                                    <button class="btn-indicators" data-symbol="<?php echo e($symbol); ?>" onclick="showIndicators('<?php echo e($symbol); ?>')">
                                        View
                                    </button>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php if ($contractCount > 1): ?>
                            <?php foreach (array_slice($contracts, 1) as $contract): ?>
                                <tr class="detail-row hidden" data-parent-symbol="<?php echo e($symbol); ?>" data-expiry="<?php echo e($contract['expiry'] ?? ''); ?>" data-margin-rate="<?php echo e($contract['nrml_margin_rate'] ?? 0); ?>">
                                    <td class="indented">↳ <?php echo e($symbol); ?></td>
                                    <td><?php echo e($contract['expiry'] ?? 'N/A'); ?></td>
                                    <td colspan="3"></td>
                                    <td><?php echo isset($contract['lot_size']) ? number_format($contract['lot_size']) : 'N/A'; ?></td>
                                    <td><?php echo isset($contract['mwpl']) && $contract['mwpl'] ? formatPercentage($contract['mwpl'], 2) : 'N/A'; ?></td>
                                    <td>₹<?php echo isset($contract['nrml_margin']) && $contract['nrml_margin'] ? formatNumber($contract['nrml_margin'], 0) : 'N/A'; ?></td>
                                    <td><?php echo isset($contract['nrml_margin_rate']) && $contract['nrml_margin_rate'] ? formatPercentage($contract['nrml_margin_rate'], 2) : 'N/A'; ?></td>
                                    <td>₹<?php echo isset($contract['price']) && $contract['price'] ? formatNumber($contract['price'], 2) : 'N/A'; ?></td>
                                    <td>
                                        <?php 
                                        $lotSize = $contract['lot_size'] ?? 0;
                                        $price = $contract['price'] ?? 0;
                                        $contractValue = $lotSize * $price;
                                        echo $contractValue > 0 ? '₹' . formatNumber($contractValue, 2) : 'N/A';
                                        ?>
                                    </td>
                                    <td></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
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
            <li><strong>Contract Value</strong> = Lot Size × Price (total value of one contract)</li>
            <li>Data source: Zerodha Margin Calculator</li>
            <li>Please verify margins with your broker before trading</li>
        </ul>
    </div>
</div>

<!-- Indicators Modal -->
<div id="indicators-modal" class="modal">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2 id="modal-symbol">Symbol Indicators</h2>
        <div id="indicators-content"></div>
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
    position: sticky;
    top: 0;
    z-index: 10;
}

.futures-table th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #ddd;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.futures-table th.sortable:hover {
    background: #e8e8e8;
}

.futures-table th.sortable.active {
    background: #d0e8ff;
}

.sort-indicator {
    font-size: 12px;
    margin-left: 5px;
    color: #999;
    display: inline-block;
    width: 15px;
}

.futures-table th.sortable.active .sort-indicator {
    color: #0066cc;
}

.futures-table th.sortable.asc .sort-indicator::after {
    content: ' ↑';
}

.futures-table th.sortable.desc .sort-indicator::after {
    content: ' ↓';
}

.futures-table td {
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
}

.futures-table tbody tr.symbol-row {
    background: #fafafa;
    font-weight: 500;
}

.futures-table tbody tr.symbol-row:hover {
    background: #f0f0f0;
}

.futures-table tbody tr.detail-row {
    background: white;
}

.futures-table tbody tr.detail-row:hover {
    background: #f9f9f9;
}

.futures-table tbody tr.detail-row.hidden {
    display: none;
}

.futures-table td.indented {
    padding-left: 30px;
    color: #666;
}

.ohlc-compact {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 11px;
}

.ohlc-compact span {
    white-space: nowrap;
}

.price-cell {
    font-weight: 600;
    color: #0066cc;
}

.no-data-badge {
    font-size: 11px;
    color: #999;
    font-style: italic;
}

.btn-indicators {
    background: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px 12px;
    cursor: pointer;
    font-size: 12px;
}

.btn-indicators:hover {
    background: #218838;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 90%;
    max-width: 800px;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.modal-close:hover,
.modal-close:focus {
    color: #000;
}

.indicators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.indicator-card {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #0066cc;
}

.indicator-card h4 {
    margin: 0 0 10px 0;
    color: #0066cc;
    font-size: 14px;
}

.indicator-card .value {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.indicator-card .label {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
}

.crash-signals {
    background: #fff3cd;
    padding: 15px;
    border-radius: 5px;
    margin-top: 15px;
}

.crash-signals.high {
    background: #f8d7da;
    border-left: 4px solid #dc3545;
}

.crash-signals.medium {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
}

.crash-signals.low {
    background: #d1ecf1;
    border-left: 4px solid #17a2b8;
}

.signal-item {
    padding: 5px 0;
    font-size: 13px;
}

.more-expiries {
    font-size: 11px;
    color: #0066cc;
    font-weight: normal;
    margin-left: 5px;
}

.toggle-details {
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 2px 8px;
    margin-left: 8px;
    cursor: pointer;
    font-size: 10px;
    vertical-align: middle;
}

.toggle-details:hover {
    background: #0052a3;
}

.toggle-icon {
    display: inline-block;
    transition: transform 0.3s;
}

.toggle-details.expanded .toggle-icon {
    transform: rotate(180deg);
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

.futures-controls {
    margin: 20px 0;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 5px;
}

.search-filter-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
}

.search-box {
    flex: 1;
    min-width: 250px;
    position: relative;
}

.search-box input {
    width: 100%;
    padding: 10px 35px 10px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.filter-box {
    min-width: 150px;
}

.filter-box select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    background: white;
}

.btn-clear {
    padding: 10px 20px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

.btn-clear:hover {
    background: #c82333;
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

@media (max-width: 767px) {
    .search-filter-row {
        flex-direction: column;
    }
    
    .search-box, .filter-box {
        width: 100%;
    }
    
    .futures-table-container {
        overflow-x: scroll;
    }
}
</style>

<script>
(function() {
    const table = document.getElementById('futures-table');
    const tbody = document.getElementById('futures-tbody');
    const searchInput = document.getElementById('symbol-search');
    const expiryFilter = document.getElementById('expiry-filter');
    const marginRateFilter = document.getElementById('margin-rate-filter');
    const clearBtn = document.getElementById('clear-filters');
    const visibleCount = document.getElementById('visible-symbols-count');
    
    let currentSort = { column: null, direction: 'asc' };
    let allRows = Array.from(tbody.querySelectorAll('tr'));
    
    // Toggle detail rows
    document.querySelectorAll('.toggle-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const symbol = this.dataset.symbol;
            const detailRows = tbody.querySelectorAll(`tr.detail-row[data-parent-symbol="${symbol}"]`);
            const isExpanded = this.classList.contains('expanded');
            
            detailRows.forEach(row => {
                if (isExpanded) {
                    row.classList.add('hidden');
                } else {
                    row.classList.remove('hidden');
                }
            });
            
            this.classList.toggle('expanded');
        });
    });
    
    // Column sorting
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', function() {
            const column = this.dataset.sort;
            const isActive = this.classList.contains('active');
            const isAsc = this.classList.contains('asc');
            
            // Reset all headers
            document.querySelectorAll('.sortable').forEach(h => {
                h.classList.remove('active', 'asc', 'desc');
            });
            
            // Set current header
            this.classList.add('active');
            this.classList.toggle('asc', !isActive || !isAsc);
            this.classList.toggle('desc', isActive && isAsc);
            
            currentSort = {
                column: column,
                direction: this.classList.contains('asc') ? 'asc' : 'desc'
            };
            
            sortTable();
        });
    });
    
    function sortTable() {
        const rows = Array.from(tbody.querySelectorAll('tr:not(.hidden)'));
        const symbolRows = rows.filter(r => r.classList.contains('symbol-row'));
        
        symbolRows.sort((a, b) => {
            let aVal, bVal;
            
            switch(currentSort.column) {
                case 'symbol':
                    aVal = a.dataset.symbol || '';
                    bVal = b.dataset.symbol || '';
                    break;
                case 'expiry':
                    aVal = a.dataset.expiry || '';
                    bVal = b.dataset.expiry || '';
                    break;
                case 'lot_size':
                    const aLot = a.querySelector('td:nth-child(3)')?.textContent.replace(/,/g, '') || '0';
                    const bLot = b.querySelector('td:nth-child(3)')?.textContent.replace(/,/g, '') || '0';
                    aVal = parseFloat(aLot) || 0;
                    bVal = parseFloat(bLot) || 0;
                    break;
                case 'mwpl':
                    const aMwpl = a.querySelector('td:nth-child(4)')?.textContent.replace(/[%,]/g, '') || '0';
                    const bMwpl = b.querySelector('td:nth-child(4)')?.textContent.replace(/[%,]/g, '') || '0';
                    aVal = parseFloat(aMwpl) || 0;
                    bVal = parseFloat(bMwpl) || 0;
                    break;
                case 'nrml_margin':
                    const aMargin = a.querySelector('td:nth-child(5)')?.textContent.replace(/[₹,]/g, '') || '0';
                    const bMargin = b.querySelector('td:nth-child(5)')?.textContent.replace(/[₹,]/g, '') || '0';
                    aVal = parseFloat(aMargin) || 0;
                    bVal = parseFloat(bMargin) || 0;
                    break;
                case 'nrml_margin_rate':
                    aVal = parseFloat(a.dataset.marginRate) || 0;
                    bVal = parseFloat(b.dataset.marginRate) || 0;
                    break;
                case 'current_price':
                    aVal = parseFloat(a.dataset.currentPrice) || 0;
                    bVal = parseFloat(b.dataset.currentPrice) || 0;
                    break;
                case 'volume':
                    aVal = parseFloat(a.dataset.volume) || 0;
                    bVal = parseFloat(b.dataset.volume) || 0;
                    break;
                case 'price':
                    const aPrice = a.querySelector('td:nth-child(10)')?.textContent.replace(/[₹,]/g, '') || '0';
                    const bPrice = b.querySelector('td:nth-child(10)')?.textContent.replace(/[₹,]/g, '') || '0';
                    aVal = parseFloat(aPrice) || 0;
                    bVal = parseFloat(bPrice) || 0;
                    break;
                case 'contract_value':
                    const aValue = a.querySelector('td:nth-child(11)')?.textContent.replace(/[₹,]/g, '') || '0';
                    const bValue = b.querySelector('td:nth-child(11)')?.textContent.replace(/[₹,]/g, '') || '0';
                    aVal = parseFloat(aValue) || 0;
                    bVal = parseFloat(bValue) || 0;
                    break;
                default:
                    return 0;
            }
            
            if (typeof aVal === 'string') {
                return currentSort.direction === 'asc' 
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else {
                return currentSort.direction === 'asc' 
                    ? aVal - bVal
                    : bVal - aVal;
            }
        });
        
        // Re-insert sorted rows with their detail rows
        symbolRows.forEach(symbolRow => {
            const symbol = symbolRow.dataset.symbol;
            const detailRows = Array.from(tbody.querySelectorAll(`tr.detail-row[data-parent-symbol="${symbol}"]`));
            
            tbody.appendChild(symbolRow);
            detailRows.forEach(detailRow => {
                if (!detailRow.classList.contains('hidden')) {
                    tbody.appendChild(detailRow);
                }
            });
        });
        
        updateVisibleCount();
    }
    
    // Search and filter
    function filterTable() {
        const searchTerm = searchInput.value.toUpperCase();
        const expiryValue = expiryFilter.value;
        const marginRateValue = marginRateFilter.value;
        
        let visibleSymbols = 0;
        
        allRows.forEach(row => {
            if (row.classList.contains('symbol-row')) {
                const symbol = row.dataset.symbol || '';
                const expiry = row.dataset.expiry || '';
                const marginRate = parseFloat(row.dataset.marginRate) || 0;
                
                let show = true;
                
                // Search filter
                if (searchTerm && !symbol.includes(searchTerm)) {
                    show = false;
                }
                
                // Expiry filter
                if (expiryValue && expiry !== expiryValue) {
                    show = false;
                }
                
                // Margin rate filter
                if (marginRateValue) {
                    const [min, max] = marginRateValue.includes('+') 
                        ? [30, 999] 
                        : marginRateValue.split('-').map(v => parseFloat(v));
                    if (marginRate < min || (max && marginRate > max)) {
                        show = false;
                    }
                }
                
                if (show) {
                    row.style.display = '';
                    visibleSymbols++;
                    
                    // Show detail rows if parent is visible
                    const symbol = row.dataset.symbol;
                    const detailRows = tbody.querySelectorAll(`tr.detail-row[data-parent-symbol="${symbol}"]`);
                    detailRows.forEach(detailRow => {
                        if (!detailRow.classList.contains('hidden')) {
                            detailRow.style.display = '';
                        }
                    });
                } else {
                    row.style.display = 'none';
                    
                    // Hide detail rows
                    const symbol = row.dataset.symbol;
                    const detailRows = tbody.querySelectorAll(`tr.detail-row[data-parent-symbol="${symbol}"]`);
                    detailRows.forEach(detailRow => {
                        detailRow.style.display = 'none';
                    });
                }
            }
        });
        
        if (visibleCount) {
            visibleCount.textContent = visibleSymbols;
        }
    }
    
    searchInput.addEventListener('input', filterTable);
    expiryFilter.addEventListener('change', filterTable);
    marginRateFilter.addEventListener('change', filterTable);
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        expiryFilter.value = '';
        marginRateFilter.value = '';
        filterTable();
    });
    
    function updateVisibleCount() {
        const visible = tbody.querySelectorAll('tr.symbol-row:not([style*="display: none"])').length;
        if (visibleCount) {
            visibleCount.textContent = visible;
        }
    }
    
    // Initial count
    updateVisibleCount();
})();

// Stock data for indicators
const stockData = <?php echo json_encode($stockDataMap, JSON_UNESCAPED_UNICODE); ?>;

// Show indicators modal
function showIndicators(symbol) {
    const modal = document.getElementById('indicators-modal');
    const modalSymbol = document.getElementById('modal-symbol');
    const content = document.getElementById('indicators-content');
    
    const data = stockData[symbol.toUpperCase()];
    if (!data) {
        content.innerHTML = '<p>No data available for ' + symbol + '</p>';
        modal.style.display = 'block';
        return;
    }
    
    modalSymbol.textContent = symbol + ' - Technical Indicators';
    
    let html = '<div class="indicators-grid">';
    
    // OHLC Data
    html += '<div class="indicator-card">';
    html += '<h4>OHLC Data</h4>';
    html += '<div class="value">Open: ₹' + (data.open || 0).toFixed(2) + '</div>';
    html += '<div class="value">High: ₹' + (data.high || 0).toFixed(2) + '</div>';
    html += '<div class="value">Low: ₹' + (data.low || 0).toFixed(2) + '</div>';
    html += '<div class="value">Close: ₹' + (data.close || 0).toFixed(2) + '</div>';
    html += '<div class="value">Current: ₹' + (data.current_price || 0).toFixed(2) + '</div>';
    html += '<div class="label">Volume: ' + (data.volume || 0).toLocaleString() + '</div>';
    html += '</div>';
    
    // 52-Week High/Low
    html += '<div class="indicator-card">';
    html += '<h4>52-Week Range</h4>';
    html += '<div class="value">High: ₹' + (data.fifty_two_week_high || 0).toFixed(2) + '</div>';
    html += '<div class="value">Low: ₹' + (data.fifty_two_week_low || 0).toFixed(2) + '</div>';
    const range = (data.fifty_two_week_high || 0) - (data.fifty_two_week_low || 0);
    html += '<div class="label">Range: ₹' + range.toFixed(2) + '</div>';
    html += '</div>';
    
    // DMA
    if (data.dma) {
        html += '<div class="indicator-card">';
        html += '<h4>Daily Moving Averages (DMA)</h4>';
        html += '<div class="value">5 DMA: ₹' + (data.dma.dma5 || 0).toFixed(2) + '</div>';
        html += '<div class="value">10 DMA: ₹' + (data.dma.dma10 || 0).toFixed(2) + '</div>';
        html += '<div class="value">20 DMA: ₹' + (data.dma.dma20 || 0).toFixed(2) + '</div>';
        html += '<div class="value">50 DMA: ₹' + (data.dma.dma50 || 0).toFixed(2) + '</div>';
        html += '<div class="value">100 DMA: ₹' + (data.dma.dma100 || 0).toFixed(2) + '</div>';
        html += '<div class="value">200 DMA: ₹' + (data.dma.dma200 || 0).toFixed(2) + '</div>';
        
        // Trend bias
        const price = data.current_price || 0;
        const dma20 = data.dma.dma20 || 0;
        const dma50 = data.dma.dma50 || 0;
        let trend = 'Neutral';
        if (price > dma20 && price > dma50) {
            trend = '<span style="color: green;">Bullish</span>';
        } else if (price < dma20 && price < dma50) {
            trend = '<span style="color: red;">Bearish</span>';
        }
        html += '<div class="label" style="margin-top: 10px;">Trend: ' + trend + '</div>';
        html += '</div>';
    }
    
    // Pivot Points
    if (data.pivot_points) {
        html += '<div class="indicator-card">';
        html += '<h4>Pivot Points</h4>';
        html += '<div class="value">Pivot (P): ₹' + (data.pivot_points.pivot || 0).toFixed(2) + '</div>';
        html += '<div class="label">Resistance Levels:</div>';
        html += '<div>R1: ₹' + (data.pivot_points.r1 || 0).toFixed(2) + '</div>';
        html += '<div>R2: ₹' + (data.pivot_points.r2 || 0).toFixed(2) + '</div>';
        html += '<div>R3: ₹' + (data.pivot_points.r3 || 0).toFixed(2) + '</div>';
        html += '<div class="label" style="margin-top: 10px;">Support Levels:</div>';
        html += '<div>S1: ₹' + (data.pivot_points.s1 || 0).toFixed(2) + '</div>';
        html += '<div>S2: ₹' + (data.pivot_points.s2 || 0).toFixed(2) + '</div>';
        html += '<div>S3: ₹' + (data.pivot_points.s3 || 0).toFixed(2) + '</div>';
        
        // Pivot bias
        const price = data.current_price || 0;
        const pivot = data.pivot_points.pivot || 0;
        let bias = price > pivot ? '<span style="color: green;">Above Pivot (Bullish)</span>' : '<span style="color: red;">Below Pivot (Bearish)</span>';
        html += '<div class="label" style="margin-top: 10px;">Bias: ' + bias + '</div>';
        html += '</div>';
    }
    
    // Fibonacci Levels
    if (data.fibonacci) {
        html += '<div class="indicator-card">';
        html += '<h4>Fibonacci Levels</h4>';
        html += '<div>0% (High): ₹' + (data.fibonacci.fib_0 || 0).toFixed(2) + '</div>';
        html += '<div>23.6%: ₹' + (data.fibonacci['fib_23.6'] || 0).toFixed(2) + '</div>';
        html += '<div>38.2%: ₹' + (data.fibonacci['fib_38.2'] || 0).toFixed(2) + '</div>';
        html += '<div>50%: ₹' + (data.fibonacci.fib_50 || 0).toFixed(2) + '</div>';
        html += '<div>61.8%: ₹' + (data.fibonacci['fib_61.8'] || 0).toFixed(2) + '</div>';
        html += '<div>100% (Low): ₹' + (data.fibonacci.fib_100 || 0).toFixed(2) + '</div>';
        html += '</div>';
    }
    
    // Target Prices
    if (data.targets) {
        html += '<div class="indicator-card">';
        html += '<h4>Target Prices</h4>';
        html += '<div class="value">Target 1: ₹' + (data.targets.target_1 || 0).toFixed(2) + '</div>';
        html += '<div class="value">Fib 127%: ₹' + (data.targets.target_fib_127 || 0).toFixed(2) + '</div>';
        html += '<div class="value">Fib 162%: ₹' + (data.targets.target_fib_162 || 0).toFixed(2) + '</div>';
        html += '</div>';
    }
    
    html += '</div>';
    
    // Crash Signals
    if (data.crash_signals) {
        const riskLevel = data.crash_signals.risk_level || 'LOW';
        const signalCount = data.crash_signals.signal_count || 0;
        html += '<div class="crash-signals ' + riskLevel.toLowerCase() + '">';
        html += '<h4>Crash Probability Signals</h4>';
        html += '<div class="value">Risk Level: <strong>' + riskLevel + '</strong> (' + signalCount + ' signals)</div>';
        if (data.crash_signals.signals && data.crash_signals.signals.length > 0) {
            html += '<div style="margin-top: 10px;">';
            data.crash_signals.signals.forEach(signal => {
                html += '<div class="signal-item">⚠ ' + signal + '</div>';
            });
            html += '</div>';
        }
        if (signalCount >= 3) {
            html += '<div style="margin-top: 10px; color: #dc3545; font-weight: bold;">⚠️ HIGH CRASH PROBABILITY - 3+ signals detected</div>';
        }
        html += '</div>';
    }
    
    content.innerHTML = html;
    modal.style.display = 'block';
}

// Close modal
document.querySelector('.modal-close').addEventListener('click', function() {
    document.getElementById('indicators-modal').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('indicators-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
</script>

<?php includeFooter(); ?>
