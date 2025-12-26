<?php
/**
 * Equity Mutual Funds Page
 */
$equityData = loadJsonData('mutualfunds/equity/equity.json');
?>

<section class="mutual-funds-section">
    <div class="container">
        <h2>Equity Mutual Funds</h2>
        <p class="section-description">Explore top-performing equity mutual funds for long-term wealth creation.</p>
        
        <?php if ($equityData && is_array($equityData)): ?>
            <div class="funds-grid">
                <?php foreach ($equityData as $fund): ?>
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
                            <div class="fund-detail-item">
                                <span class="label">Category:</span>
                                <span class="value"><?php echo e($fund['category'] ?? 'Equity'); ?></span>
                            </div>
                        </div>
                        <a href="<?php echo url('/mutualfunds/equity/' . urlencode($fund['name'] ?? '')); ?>" class="fund-link">View Details</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No equity fund data available at the moment.</p>
        <?php endif; ?>
    </div>
</section>

