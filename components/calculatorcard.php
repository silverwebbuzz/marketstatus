<?php
/**
 * Calculator Card Component
 * Displays calculator cards on dashboard
 */
$calculators = [
    ['name' => 'SIP Calculator', 'url' => '/sip-calculator', 'icon' => '📊'],
    ['name' => 'EMI Calculator', 'url' => '/emi-calculator', 'icon' => '💰'],
    ['name' => 'FD Calculator', 'url' => '/fd-calculator', 'icon' => '🏦'],
    ['name' => 'Lumpsum Calculator', 'url' => '/lumpsum-calculator', 'icon' => '💵'],
    ['name' => 'Yearly SIP Calculator', 'url' => '/yearly-sip-calculator', 'icon' => '📈'],
    ['name' => 'CAGR Calculator', 'url' => '/cagr-calculator', 'icon' => '📉'],
    ['name' => 'RD Calculator', 'url' => '/rd-calculator', 'icon' => '💳'],
    ['name' => 'PPF Calculator', 'url' => '/ppf-calculator', 'icon' => '🎯'],
    ['name' => 'Compound Interest', 'url' => '/ci-calculator', 'icon' => '💎'],
    ['name' => 'Simple Interest', 'url' => '/si-calculator', 'icon' => '💸'],
    ['name' => 'ROI Calculator', 'url' => '/roi-calculator', 'icon' => '📊'],
    ['name' => 'NPS Calculator', 'url' => '/nps-calculator', 'icon' => '🏛️'],
];
?>

<div class="calculator-cards-section">
    <div class="container">
        <h2>Financial Calculators</h2>
        <div class="calculator-cards">
            <?php foreach ($calculators as $calc): ?>
                <div class="calculator-card">
                    <div class="calc-icon"><?php echo $calc['icon']; ?></div>
                    <h3><?php echo e($calc['name']); ?></h3>
                    <a href="<?php echo url($calc['url']); ?>" class="card-link" onclick="window.scrollTo({top: 0, behavior: 'smooth'});">
                        Calculate Now
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>

