<?php
/**
 * Top Mutual Funds Component
 */
if (!isset($mutualFundsData)) {
    $mutualFundsData = loadJsonData('topMD.json');
}

if ($mutualFundsData && is_array($mutualFundsData)) {
    $topFunds = array_slice($mutualFundsData, 0, 10); // Get top 10
    ?>
    <div class="top-mf-list">
        <?php foreach ($topFunds as $fund): ?>
            <div class="mf-item">
                <div class="mf-name"><?php echo e($fund['name'] ?? 'N/A'); ?></div>
                <div class="mf-returns">
                    <span class="mf-return-value"><?php echo formatPercentage($fund['returns'] ?? 0, 2); ?></span>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
} else {
    echo '<p>No mutual fund data available.</p>';
}
?>

