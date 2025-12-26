<?php
/**
 * Debt Mutual Funds Page
 */
$debtData = loadJsonData('mutualfunds/debt/debt.json');
?>

<section class="mutual-funds-section">
    <div class="container">
        <h2>Debt Mutual Funds</h2>
        <p class="section-description">Explore debt mutual funds for stable returns with lower risk.</p>
        
        <?php if ($debtData && is_array($debtData)): ?>
            <div class="funds-grid">
                <?php foreach ($debtData as $fund): ?>
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
                        <a href="<?php echo url('/mutualfunds/debt/' . urlencode($fund['name'] ?? '')); ?>" class="fund-link">View Details</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>No debt fund data available at the moment.</p>
        <?php endif; ?>
    </div>
</section>

