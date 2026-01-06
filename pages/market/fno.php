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
// Extract base symbol (remove expiry suffix like " 30", " 27", " 24")
$groupedData = [];
if ($futuresData && isset($futuresData['data'])) {
    foreach ($futuresData['data'] as $contract) {
        $symbol = $contract['symbol'] ?? 'UNKNOWN';
        
        // Extract base symbol by removing expiry suffix (e.g., "360ONE 30" -> "360ONE")
        // Pattern: symbol followed by space and 1-2 digits (expiry day)
        $baseSymbol = preg_replace('/\s+\d{1,2}$/', '', $symbol);
        $baseSymbol = trim($baseSymbol);
        
        // Use base symbol for grouping
        if (!isset($groupedData[$baseSymbol])) {
            $groupedData[$baseSymbol] = [];
        }
        $groupedData[$baseSymbol][] = $contract;
    }
}

// Load stock data (OHLC, Volume, Indicators) from NSE
$stockData = loadJsonData('stock_data.json');
$stockDataMap = [];
$industries = [];
$debugSymbols = []; // For debugging
if ($stockData && isset($stockData['data'])) {
    foreach ($stockData['data'] as $symbol => $data) {
        // Normalize symbol key (remove spaces, uppercase)
        $normalizedSymbol = strtoupper(trim(str_replace(' ', '', $symbol)));
        $stockDataMap[$normalizedSymbol] = $data;
        // Also store with original symbol format for fallback
        $stockDataMap[strtoupper(trim($symbol))] = $data;
        // Collect industries for filter
        if (isset($data['industry']) && $data['industry']) {
            $industries[$data['industry']] = true;
        }
        // Debug: Store first 10 symbols
        if (count($debugSymbols) < 10) {
            $debugSymbols[] = ['original' => $symbol, 'normalized' => $normalizedSymbol];
        }
    }
}
ksort($industries);

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
            <?php if ($stockData && isset($stockData['advance_decline'])): 
                $advDec = $stockData['advance_decline'];
            ?>
                <div class="advance-decline">
                    <span class="advance-item">
                        <strong>Advances:</strong> <span class="advance-count"><?php echo number_format($advDec['advances'] ?? 0); ?></span>
                    </span>
                    <span class="decline-item">
                        <strong>Declines:</strong> <span class="decline-count"><?php echo number_format($advDec['declines'] ?? 0); ?></span>
                    </span>
                    <?php if (isset($advDec['unchanged']) && $advDec['unchanged'] > 0): ?>
                        <span class="unchanged-item">
                            <strong>Unchanged:</strong> <?php echo number_format($advDec['unchanged']); ?>
                        </span>
                    <?php endif; ?>
                    <?php if (isset($advDec['last_updated'])): ?>
                        <span class="adv-dec-time">
                            (Updated: <?php echo e($advDec['last_updated']); ?>)
                        </span>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
            <div class="futures-note-compact">
                <span class="note-item">Margins updated daily at 8:00 AM IST</span> | 
                <span class="note-item">NRML = Normal Margin (overnight positions)</span> | 
                <span class="note-item">MWPL = Maximum Weighted Position Limit</span> | 
                <span class="note-item">Contract Value = Lot Size × Price</span> | 
                <span class="note-item">Data source: Zerodha Margin Calculator</span> | 
                <span class="note-item">Please verify margins with your broker before trading</span>
            </div>
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
                <div class="filter-box">
                    <select id="industry-filter">
                        <option value="">All Industries</option>
                        <?php foreach ($industries as $industry => $val): ?>
                            <option value="<?php echo e($industry); ?>"><?php echo e($industry); ?></option>
                        <?php endforeach; ?>
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
                        <th>OHLC + 52 Week Range</th>
                        <th class="sortable" data-sort="current_price">
                            Current Price <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="current_price">
                            <b>Traget Price</b>
                        </th>
                        <th class="sortable" data-sort="current_price">
                            <b>Difference</b>
                        </th>
                        <th class="sortable" data-sort="nrml_margin">
                            NRML Margin <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="lot_size">
                            Lot Size <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="profit_loss">
                            Profit/Loss <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="roi">
                            ROI <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="price">
                            Futures Price <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="contract_value">
                            Contract Value <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="nrml_margin_rate">
                            Margin Rate <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="mwpl">
                            MWPL <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="volume">
                            Volume <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="change">
                            Change <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="change_percent">
                            Change % <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="today_pl">
                            Today P/L <span class="sort-indicator">↕</span>
                        </th>
                        <th class="sortable" data-sort="total_traded_value">
                            Traded Value <span class="sort-indicator">↕</span>
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
                        // $symbol is already the base symbol (expiry suffix removed during grouping)
                        $symbolUpper = strtoupper(trim($symbol));
                        
                        // Normalize symbol for matching (remove spaces, dashes, etc.)
                        $symbolNormalized = str_replace([' ', '-', '_'], '', $symbolUpper);
                        
                        // Try multiple symbol formats for matching
                        $stockInfo = $stockDataMap[$symbolNormalized] ?? $stockDataMap[$symbolUpper] ?? null;
                        
                        // If still not found, try other variants
                        if (!$stockInfo) {
                            $symbolVariants = [
                                $symbolNormalized,
                                $symbolUpper,
                                str_replace('-', '', $symbolUpper),
                                str_replace(' ', '', $symbolUpper),
                                trim($symbolUpper),
                            ];
                            foreach ($symbolVariants as $variant) {
                                if (isset($stockDataMap[$variant])) {
                                    $stockInfo = $stockDataMap[$variant];
                                    break;
                                }
                            }
                        }
                    ?>
                        <tr class="symbol-row" data-symbol="<?php echo e($symbolUpper); ?>" data-expiry="<?php echo e($firstContract['expiry'] ?? ''); ?>" data-margin-rate="<?php echo e($firstContract['nrml_margin_rate'] ?? 0); ?>" data-current-price="<?php echo e($stockInfo['current_price'] ?? 0); ?>" data-volume="<?php echo e($stockInfo['volume'] ?? 0); ?>" data-industry="<?php echo e($stockInfo['industry'] ?? ''); ?>">
                            <td>
                                <div class="symbol-cell">
                                    <strong><?php echo e($symbol); ?></strong>
                                    <?php if ($contractCount > 1): ?>
                                        <button class="toggle-details" data-symbol="<?php echo e($symbol); ?>" title="Click to show/hide all contracts">
                                            <span class="toggle-icon">▼</span>
                                        </button>
                                    <?php endif; ?>
                                </div>
                                <?php if ($stockInfo && isset($stockInfo['company_name']) && $stockInfo['company_name']): ?>
                                    <div class="company-name-inline" title="<?php echo e($stockInfo['company_name']); ?>">
                                        <?php echo e($stockInfo['company_name']); ?>
                                    </div>
                                <?php endif; ?>
                                <?php if ($stockInfo && isset($stockInfo['industry']) && $stockInfo['industry']): ?>
                                    <div class="industry-inline">
                                        <span class="industry-badge"><?php echo e($stockInfo['industry']); ?></span>
                                    </div>
                                <?php endif; ?>
                            </td>
                            <td>
                                <div><?php echo e($firstContract['expiry'] ?? 'N/A'); ?></div>
                                <?php if ($contractCount > 1): ?>
                                    <div class="more-expiries" title="Click button to see all expiries">+<?php echo ($contractCount - 1); ?> more</div>
                                <?php endif; ?>
                            </td>
                            <td class="ohlc-range-cell">
                                <?php if ($stockInfo): ?>
                                    <div class="ohlc-range-compact">
                                        <div class="ohlc-section">
                                            <div><strong>O:</strong> ₹<?php echo formatNumber($stockInfo['open'] ?? 0, 2); ?></div>
                                            <div><strong>H:</strong> ₹<?php echo formatNumber($stockInfo['high'] ?? 0, 2); ?></div>
                                            <div><strong>L:</strong> ₹<?php echo formatNumber($stockInfo['low'] ?? 0, 2); ?></div>
                                            <div><strong>C:</strong> ₹<?php echo formatNumber($stockInfo['close'] ?? 0, 2); ?></div>
                                        </div>
                                        <div class="range-section">
                                            <div><strong>52W H:</strong> ₹<?php echo formatNumber($stockInfo['fifty_two_week_high'] ?? 0, 2); ?></div>
                                            <div><strong>52W L:</strong> ₹<?php echo formatNumber($stockInfo['fifty_two_week_low'] ?? 0, 2); ?></div>
                                        </div>
                                    </div>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td class="price-cell">
                                <?php if ($stockInfo && isset($stockInfo['current_price'])): ?>
                                    ₹<?php echo formatNumber($stockInfo['current_price'], 2); ?>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php 
                                    if (isset($stockInfo['current_price']) && $stockInfo['current_price']) {
                                        $futurePrice = $stockInfo['current_price'] + (5 * ($stockInfo['current_price'] / 100));
                                        echo '₹<b>' . formatNumber($futurePrice, 2) . '</b>';
                                    } else {
                                        echo '<span class="no-data-badge">N/A</span>';
                                    }
                                ?>
                            </td>
                            <td>
                            <?php if ($stockInfo && isset($stockInfo['current_price']) && $stockInfo['current_price']): ?>
                                <?php 
                                    $futurePrice = $stockInfo['current_price'] + (5 * ($stockInfo['current_price'] / 100));
                                    $change = $futurePrice - $stockInfo['current_price'];
                                    $changeClass = $change > 0 ? 'positive' : ($change < 0 ? 'negative' : '');
                                ?>
                                    <span class="change-amount <?php echo $changeClass; ?>">
                                        <?php echo ($change > 0 ? '+' : '') . '₹' . formatNumber($change, 2); ?>
                                    </span>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td>₹<?php echo isset($firstContract['nrml_margin']) && $firstContract['nrml_margin'] ? formatNumber($firstContract['nrml_margin'], 0) : 'N/A'; ?></td>
                            <td><?php echo isset($firstContract['lot_size']) ? number_format($firstContract['lot_size']) : 'N/A'; ?></td>
                            <td class="profit-loss-cell" data-sort-value="<?php  echo $change * $firstContract['lot_size'];?>">
                                <b><?php 
                                $profitLoss = $change * $firstContract['lot_size'];   echo ($profitLoss > 0 ? '+' : '') . '₹' . formatNumber($profitLoss, 2);
                                ?></b>
                            </td>
                            <td class="roi-cell" data-sort-value="<?php  echo ($profitLoss / $firstContract['nrml_margin']) * 100;?>">
                                <b><?php 
                                $roi = ($profitLoss / $firstContract['nrml_margin']) * 100;   echo ($roi > 0 ? '+' : '') . formatNumber($roi, 2);
                                ?></b>
                            </td>
                            <td>₹<?php echo isset($firstContract['price']) && $firstContract['price'] ? formatNumber($firstContract['price'], 2) : 'N/A'; ?></td>
                            <td>
                                <?php 
                                $lotSize = $firstContract['lot_size'] ?? 0;
                                $price = $firstContract['price'] ?? 0;
                                $contractValue = $lotSize * $price;
                                echo $contractValue > 0 ? '₹' . formatNumber($contractValue, 2) : 'N/A';
                                ?>
                            </td>
                            <td><?php echo isset($firstContract['nrml_margin_rate']) && $firstContract['nrml_margin_rate'] ? formatPercentage($firstContract['nrml_margin_rate'], 2) : 'N/A'; ?></td>
                            <td><?php echo isset($firstContract['mwpl']) && $firstContract['mwpl'] ? formatPercentage($firstContract['mwpl'], 2) : 'N/A'; ?></td>
                            <td class="volume-cell" data-sort-value="<?php echo $stockInfo['volume'] ?? 0; ?>">
                                <?php if ($stockInfo && isset($stockInfo['volume'])): ?>
                                    <?php echo formatNumber($stockInfo['volume'], 0); ?>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td class="change-cell" data-sort-value="<?php echo $stockInfo['change'] ?? 0; ?>">
                                <?php if ($stockInfo && isset($stockInfo['change'])): ?>
                                    <?php 
                                    $change = $stockInfo['change'];
                                    $changeClass = $change > 0 ? 'positive' : ($change < 0 ? 'negative' : '');
                                    ?>
                                    <span class="change-amount <?php echo $changeClass; ?>">
                                        <?php echo ($change > 0 ? '+' : '') . '₹' . formatNumber($change, 2); ?>
                                    </span>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td class="change-cell" data-sort-value="<?php echo $stockInfo['change_percent'] ?? 0; ?>">
                                <?php if ($stockInfo && isset($stockInfo['change_percent'])): ?>
                                    <?php 
                                    $changePercent = $stockInfo['change_percent'];
                                    $changeClass = $changePercent > 0 ? 'positive' : ($changePercent < 0 ? 'negative' : '');
                                    ?>
                                    <span class="change-percent <?php echo $changeClass; ?>">
                                        <?php echo ($changePercent > 0 ? '+' : '') . formatNumber($changePercent, 2); ?>%
                                    </span>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td class="pl-cell" data-sort-value="<?php 
                                $change = $stockInfo['change'] ?? 0;
                                $lotSize = $firstContract['lot_size'] ?? 0;
                                echo $change * $lotSize;
                            ?>">
                                <?php 
                                $change = $stockInfo['change'] ?? 0;
                                $lotSize = $firstContract['lot_size'] ?? 0;
                                $todayPL = $change * $lotSize;
                                if ($stockInfo && isset($stockInfo['change']) && $lotSize > 0):
                                    $plClass = $todayPL > 0 ? 'positive' : ($todayPL < 0 ? 'negative' : '');
                                ?>
                                    <span class="pl-amount <?php echo $plClass; ?>">
                                        <?php echo ($todayPL > 0 ? '+' : '') . '₹' . formatNumber($todayPL, 2); ?>
                                    </span>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
                            </td>
                            <td>
                                <?php if ($stockInfo && isset($stockInfo['total_traded_value']) && $stockInfo['total_traded_value'] > 0): ?>
                                    <?php 
                                    $tradedValue = $stockInfo['total_traded_value'];
                                    if ($tradedValue >= 10000000) {
                                        echo '₹' . formatNumber($tradedValue / 10000000, 2) . ' Cr';
                                    } elseif ($tradedValue >= 100000) {
                                        echo '₹' . formatNumber($tradedValue / 100000, 2) . ' L';
                                    } else {
                                        echo '₹' . formatNumber($tradedValue, 2);
                                    }
                                    ?>
                                <?php else: ?>
                                    <span class="no-data-badge">N/A</span>
                                <?php endif; ?>
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
                                    <td></td>
                                    <td></td>
                                    <td>₹<?php echo isset($contract['price']) && $contract['price'] ? formatNumber($contract['price'], 2) : 'N/A'; ?></td>
                                    <td><?php echo isset($contract['lot_size']) ? number_format($contract['lot_size']) : 'N/A'; ?></td>
                                    <td>
                                        <?php 
                                        $lotSize = $contract['lot_size'] ?? 0;
                                        $price = $contract['price'] ?? 0;
                                        $contractValue = $lotSize * $price;
                                        echo $contractValue > 0 ? '₹' . formatNumber($contractValue, 2) : 'N/A';
                                        ?>
                                    </td>
                                    <td><?php echo isset($contract['nrml_margin_rate']) && $contract['nrml_margin_rate'] ? formatPercentage($contract['nrml_margin_rate'], 2) : 'N/A'; ?></td>
                                    <td>₹<?php echo isset($contract['nrml_margin']) && $contract['nrml_margin'] ? formatNumber($contract['nrml_margin'], 0) : 'N/A'; ?></td>
                                    <td><?php echo isset($contract['mwpl']) && $contract['mwpl'] ? formatPercentage($contract['mwpl'], 2) : 'N/A'; ?></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
/* Hide navbar for futures-margins page */
.Navbar1,
.Nav_toggle {
    display: none !important;
}

/* Set td font size to 14px */
.futures-table td {
    font-size: 14px !important;
}

.futures-table-container {
    overflow-x: auto;
    margin: 20px 0;
    max-height: calc(100vh - 300px);
    overflow-y: auto;
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
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.futures-table th {
    padding: 8px 6px;
    text-align: left;
    font-weight: 600;
    font-size: 12px;
    border-bottom: 2px solid #ddd;
    cursor: pointer;
    user-select: none;
    position: relative;
    white-space: nowrap;
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
    padding: 6px 6px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    line-height: 1.4;
}

.futures-table tbody tr.symbol-row {
    background: #fafafa;
    font-weight: 500;
    font-size: 14px;
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

.ohlc-range-cell {
    min-width: 180px;
    max-width: 200px;
}

.ohlc-range-compact {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 10px;
}

.ohlc-section, .range-section {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.ohlc-section {
    border-bottom: 1px solid #eee;
    padding-bottom: 3px;
}

.range-section {
    padding-top: 2px;
}

.ohlc-range-compact div div {
    white-space: nowrap;
}

.ohlc-range-compact strong {
    display: inline-block;
    width: 30px;
    color: #666;
    font-size: 10px;
}

.price-cell {
    font-weight: 600;
    color: #0066cc;
    font-size: 12px;
    white-space: nowrap;
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
    padding: 6px 12px;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
    display: inline-block;
    width: auto;
}

.btn-indicators:hover {
    background: #218838;
}}

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
    font-size: 10px;
    color: #0066cc;
    font-weight: normal;
    margin-top: 2px;
    line-height: 1.2;
}

.toggle-details {
    background: #0066cc;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 2px 6px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 9px;
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

.advance-decline {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
}

.advance-item, .decline-item, .unchanged-item {
    font-size: 13px;
}

.advance-item strong {
    color: #28a745;
}

.decline-item strong {
    color: #dc3545;
}

.change-percent {
    font-weight: 600;
    font-size: 12px;
}

.change-percent.positive {
    color: #28a745;
}

.change-percent.negative {
    color: #dc3545;
}

.change-cell {
    text-align: center;
}

.pl-cell {
    text-align: center;
    font-weight: 600;
}

.pl-amount {
    font-size: 14px;
    font-weight: 600;
}

.pl-amount.positive {
    color: #28a745;
}

.pl-amount.negative {
    color: #dc3545;
}

.symbol-cell {
    margin-bottom: 6px;
}

.company-name-inline {
    font-size: 12px;
    color: #555;
    margin-top: 4px;
    line-height: 1.4;
    display: block;
}

.industry-inline {
    margin-top: 4px;
    display: block;
}

.industry-badge {
    display: inline-block;
    padding: 2px 8px;
    background: #e3f2fd;
    color: #1976d2;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
}
.unchanged-item strong {
    color: #6c757d;
}

.advance-count {
    color: #28a745;
    font-weight: bold;
    font-size: 14px;
}

.decline-count {
    color: #dc3545;
    font-weight: bold;
    font-size: 14px;
}

.adv-dec-time {
    font-size: 11px;
    color: #999;
    margin-left: auto;
}

.futures-note-compact {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    font-size: 11px;
    color: #666;
    line-height: 1.6;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.futures-note-compact .note-item {
    white-space: nowrap;
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
    const industryFilter = document.getElementById('industry-filter');
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
                case 'ohlc_range':
                    // OHLC + 52 Week Range is the 3rd td (2)
                    aVal = (a.cells[2]?.textContent || '').trim();
                    bVal = (b.cells[2]?.textContent || '').trim();
                    break;
                case 'current_price':
                    // Current Price is 4th td (3)
                    aVal = parseFloat((a.cells[3]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[3]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    break;
                case 'target_price':
                    // Target Price is 5th td (4)
                    aVal = parseFloat((a.cells[4]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[4]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    break;
                case 'difference':
                    // Difference is 6th td (5)
                    {
                        const getDiffVal = cell =>
                            parseFloat(
                                (cell?.querySelector('span.change-amount')?.textContent || cell?.textContent || '0')
                                .replace(/[₹+,\s]/g, '')
                            ) || 0;
                        aVal = getDiffVal(a.cells[5]);
                        bVal = getDiffVal(b.cells[5]);
                    }
                    break;
                case 'nrml_margin':
                    // NRML Margin is 7th td (6)
                    aVal = parseFloat((a.cells[6]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[6]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    break;
                case 'lot_size':
                    // Lot Size is 8th td (7)
                    aVal = parseFloat((a.cells[7]?.textContent || '').replace(/,/g, '')) || 0;
                    bVal = parseFloat((b.cells[7]?.textContent || '').replace(/,/g, '')) || 0;
                    break;
                case 'profit_loss':
                    // Profit/Loss is 9th td (8)
                    {
                        const getPLVal = cell =>
                            parseFloat(
                                (cell?.textContent || '')
                                .replace(/[₹+,\s]/g, '')
                            ) || 0;
                        aVal = getPLVal(a.cells[8]);
                        bVal = getPLVal(b.cells[8]);
                    }
                    break;
                case 'roi':
                    // ROI is 10th td (9)
                    aVal = parseFloat((a.cells[9]?.textContent || '').replace(/[+,%\s]/g, '')) || 0;
                    bVal = parseFloat((b.cells[9]?.textContent || '').replace(/[+,%\s]/g, '')) || 0;
                    break;
                case 'price':
                    // Futures Price is 11th td (10)
                    aVal = parseFloat((a.cells[10]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[10]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    break;
                case 'contract_value':
                    // Contract Value is 12th td (11)
                    aVal = parseFloat((a.cells[11]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[11]?.textContent || '').replace(/[₹,]/g, '')) || 0;
                    break;
                case 'nrml_margin_rate':
                    // Margin Rate is 13th td (12)
                    aVal = parseFloat(a.dataset.marginRate) || 0;
                    bVal = parseFloat(b.dataset.marginRate) || 0;
                    break;
                case 'mwpl':
                    // MWPL is 14th td (13)
                    aVal = parseFloat((a.cells[13]?.textContent || '').replace(/[%,]/g, '')) || 0;
                    bVal = parseFloat((b.cells[13]?.textContent || '').replace(/[%,]/g, '')) || 0;
                    break;
                case 'volume':
                    // Volume is 15th td (14)
                    aVal = parseFloat(a.dataset.volume) || 0;
                    bVal = parseFloat(b.dataset.volume) || 0;
                    break;
                case 'change':
                    // Change is 16th td (15)
                    {
                        const getChangeVal = cell =>
                            parseFloat(
                                (cell?.querySelector('.change-amount')?.textContent ||
                                 cell?.textContent ||
                                 '0').replace(/[₹+,\s]/g, '')
                            ) || 0;
                        aVal = getChangeVal(a.cells[15]);
                        bVal = getChangeVal(b.cells[15]);
                    }
                    break;
                case 'change_percent':
                    // Change % is 17th td (16)
                    {
                        const getChangePercentVal = cell =>
                            parseFloat(
                                (cell?.querySelector('.change-percent')?.textContent ||
                                 cell?.textContent ||
                                 '0').replace(/[+%,\s]/g, '')
                            ) || 0;
                        aVal = getChangePercentVal(a.cells[16]);
                        bVal = getChangePercentVal(b.cells[16]);
                    }
                    break;
                case 'today_pl':
                    // Today P/L is 18th td (17)
                    aVal = parseFloat(
                        (a.cells[17]?.dataset.sortValue) ||
                        (a.cells[17]?.textContent || '').replace(/[₹+,\s]/g, '')
                    ) || 0;
                    bVal = parseFloat(
                        (b.cells[17]?.dataset.sortValue) ||
                        (b.cells[17]?.textContent || '').replace(/[₹+,\s]/g, '')
                    ) || 0;
                    break;
                case 'total_traded_value':
                    // Traded Value is 19th td (18); may be Cr/L formatting
                    {
                        const parseTradedValue = cell => {
                            if (!cell) return 0;
                            const txt = cell.textContent.replace(/[₹,\s]/g, '') || '0';
                            let val = parseFloat(txt.replace(/[CrL]/g, '')) || 0;
                            if (txt.includes('Cr')) val *= 10000000;
                            else if (txt.includes('L')) val *= 100000;
                            return val;
                        };
                        aVal = parseTradedValue(a.cells[18]);
                        bVal = parseTradedValue(b.cells[18]);
                    }
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
        const industryValue = industryFilter.value;
        
        let visibleSymbols = 0;
        
        allRows.forEach(row => {
            if (row.classList.contains('symbol-row')) {
                const symbol = row.dataset.symbol || '';
                const expiry = row.dataset.expiry || '';
                const marginRate = parseFloat(row.dataset.marginRate) || 0;
                const industry = row.dataset.industry || '';
                
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
                
                // Industry filter - check both data attribute and cell content
                if (industryValue) {
                    // Try to find industry badge in the row
                    const industryBadge = row.querySelector('.industry-badge');
                    const cellIndustry = industryBadge ? industryBadge.textContent.trim() : '';
                    // Check both data attribute and cell content
                    if (industry !== industryValue && cellIndustry !== industryValue) {
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
    industryFilter.addEventListener('change', filterTable);
    
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        expiryFilter.value = '';
        marginRateFilter.value = '';
        industryFilter.value = '';
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
