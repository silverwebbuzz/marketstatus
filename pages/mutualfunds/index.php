<?php
/**
 * Index Mutual Funds Page
 */
$indexData = loadJsonData('mutualfunds/index/index.json');
?>

<section class="mutual-funds-section">
    <div class="container">
        <h2>Index Mutual Funds</h2>
        <p class="section-description">Passive funds that track market indices for low-cost investing.</p>
        
        <?php if ($indexData && is_array($indexData)): ?>
            <div class="funds-grid">
                <?php foreach ($indexData as $fund): ?>
                    <div class="fund-card">
                        <h3><?php echo e($fund['name'] ?? 'N/A'); ?></h3>
                        <div class="fund-details">
                            <div class="fund-detail-item">
                                <span class="label">Returns:</span>
                                <span class="value"><?php echo formatPercentage($fund['returns'] ?? 0, 2); ?></span>
                            </div>
                            <div class="fund-detail-item">
                                <span class="label">NAV:</span>
                                <span class="value">₹<?php echo formatNumber($fund['nav'] ?? 0, 2); ?></span>
                            </div>
                        </div>
                        <a href="<?php echo url('/mutualfunds/index/' . urlencode($fund['name'] ?? '')); ?>" class="fund-link">View Details</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No index fund data available at the moment.</p>
        <?php endif; ?>
    </div>
</section>

