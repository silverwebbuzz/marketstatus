<?php
/**
 * ELSS Mutual Funds Page
 */
$elssData = loadJsonData('mutualfunds/elss/elss.json');
?>

<section class="mutual-funds-section">
    <div class="container">
        <h2>ELSS Mutual Funds</h2>
        <p class="section-description">Tax-saving equity-linked savings schemes with 3-year lock-in period.</p>
        
        <?php if ($elssData && is_array($elssData)): ?>
            <div class="funds-grid">
                <?php foreach ($elssData as $fund): ?>
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
                        <a href="<?php echo url('/mutualfunds/elss/' . urlencode($fund['name'] ?? '')); ?>" class="fund-link">View Details</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No ELSS fund data available at the moment.</p>
        <?php endif; ?>
    </div>
</section>

