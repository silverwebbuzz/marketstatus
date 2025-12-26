<?php
$pageTitle = 'Market Status | Stay Updated on the Indian Stock Market';
$pageDescription = 'Get real-time updates on the Indian stock market with Market Status. Track stock prices, indices, and trends instantly. Stay informed with us.';

// Load mutual funds data
$mutualFundsData = loadJsonData('topMD.json');

includeHeader($pageTitle, $pageDescription);
?>

<section class="section_gap">
    <div class="container">
        <div class="dashboard_row">
            <div class="dashboard">
                <div class="stock-boxes">
                    <?php 
                    $stockTitles = ['NIFTY 50', 'NIFTYBANK', 'SENSEX'];
                    foreach ($stockTitles as $title) {
                        include __DIR__ . '/../components/stockbox.php';
                    }
                    ?>
                    <div class="stock-box adv_box">
                        <div class="adverstiment">
                            <img src="<?php echo asset('images/YFOBS.png'); ?>" alt="adv">
                        </div>
                        <a href="https://yfobs.in" target="_blank">yfobs</a>
                    </div>
                </div>
            </div>
            <div class="adv">
                <div>
                    <h4>Top Ranked Mutual Funds</h4>
                </div>
                <div class="trmfl">
                    <?php include __DIR__ . '/../components/topmf.php'; ?>
                </div>
            </div>
        </div>
    </div>
    <div class="stick">
        <img src="<?php echo asset('images/sticker1.png'); ?>" alt="sticker" class="sticker1">
    </div>
</section>

<?php
// Include mutual fund sections
include __DIR__ . '/mutualfunds/equity.php';
include __DIR__ . '/mutualfunds/debt.php';
include __DIR__ . '/mutualfunds/hybrid.php';
include __DIR__ . '/mutualfunds/index.php';
include __DIR__ . '/mutualfunds/elss.php';
include __DIR__ . '/../components/calculatorcard.php';
?>

<div class="container">
    <div class="faq-section">
        <h2>Frequently Asked Questions (FAQ)</h2>
        <?php
        $faqData = [
            [
                'question' => 'What are stocks or shares?',
                'answer' => 'Stocks, or shares, are small pieces of a company that you can buy. When you own a share, you own a part of that company.'
            ],
            [
                'question' => 'How does the stock market work?',
                'answer' => 'The stock market is where people buy and sell shares of companies. Prices go up or down based on how many people want to buy or sell.'
            ],
            [
                'question' => 'How can you pick the right stocks?',
                'answer' => 'To pick the right stocks, look at how a company is doing, what\'s happening in its industry, and what experts are saying. Spreading your investments across different stocks can also reduce risks.'
            ],
            [
                'question' => 'What other things can you trade in the stock market?',
                'answer' => 'Besides shares, you can trade things like bonds, mutual funds, and exchange-traded funds (ETFs). These give you more options to invest.'
            ],
            [
                'question' => 'What affects the price of a stock?',
                'answer' => 'Stock prices change because of things like company performance, news, the economy, and how people feel about the market. It\'s all about supply and demand.'
            ]
        ];
        
        foreach ($faqData as $index => $faq) {
            ?>
            <div class="faq-item">
                <div class="faq-question" onclick="toggleFaq(<?php echo $index; ?>)">
                    <h3><?php echo e($faq['question']); ?></h3>
                    <span id="faq-icon-<?php echo $index; ?>">+</span>
                </div>
                <div class="faq-answer" id="faq-answer-<?php echo $index; ?>" style="display: none;">
                    <p><?php echo e($faq['answer']); ?></p>
                </div>
            </div>
            <?php
        }
        ?>
    </div>
</div>

<script>
function toggleFaq(index) {
    const answer = document.getElementById('faq-answer-' + index);
    const icon = document.getElementById('faq-icon-' + index);
    
    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.textContent = '-';
    } else {
        answer.style.display = 'none';
        icon.textContent = '+';
    }
}
</script>

<?php includeFooter(); ?>

