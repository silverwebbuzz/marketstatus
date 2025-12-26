<?php
/**
 * Hybrid Mutual Funds Page
 */
$hybridData = loadJsonData('mutualfunds/hybrid/hybrid.json');
?>

<section class="mutual-funds-section">
    <div class="container">
        <h2>Hybrid Mutual Funds</h2>
        <p class="section-description">Balanced funds combining equity and debt for moderate risk-return profile.</p>
        
        <?php if ($hybridData && is_array($hybridData)): ?>
            <div class="funds-grid">
                <?php foreach ($hybridData as $fund): ?>
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
                        <a href="<?php echo url('/mutualfunds/hybrid/' . urlencode($fund['name'] ?? '')); ?>" class="fund-link">View Details</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No hybrid fund data available at the moment.</p>
        <?php endif; ?>
    </div>
</section>

