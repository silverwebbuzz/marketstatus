<?php
$pageTitle = 'SIP Calculator | Market Status';
$pageDescription = 'Calculate your Systematic Investment Plan (SIP) returns with our free SIP calculator. Plan your investments and see potential returns.';

includeHeader($pageTitle, $pageDescription);
?>

<div class="container calculator-page">
    <h1>SIP Calculator</h1>
    <p class="calculator-description">Calculate your Systematic Investment Plan (SIP) returns and plan your investments effectively.</p>
    
    <div class="calculator-container">
        <div class="calculator-form">
            <form id="sip-calculator-form">
                <div class="form-group">
                    <label for="monthly-investment">Monthly Investment (₹)</label>
                    <input type="number" id="monthly-investment" name="monthly_investment" value="5000" min="100" step="100" required>
                </div>
                
                <div class="form-group">
                    <label for="investment-period">Investment Period (Years)</label>
                    <input type="number" id="investment-period" name="investment_period" value="10" min="1" max="50" required>
                </div>
                
                <div class="form-group">
                    <label for="expected-return">Expected Annual Return (%)</label>
                    <input type="number" id="expected-return" name="expected_return" value="12" min="1" max="30" step="0.1" required>
                </div>
                
                <button type="submit" class="btn-calculate">Calculate</button>
            </form>
        </div>
        
        <div class="calculator-results" id="sip-results" style="display: none;">
            <h2>Results</h2>
            <div class="result-item">
                <span class="result-label">Total Investment:</span>
                <span class="result-value" id="total-investment">₹0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Estimated Returns:</span>
                <span class="result-value" id="estimated-returns">₹0</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Value:</span>
                <span class="result-value" id="total-value">₹0</span>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('sip-calculator-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    const investmentPeriod = parseFloat(document.getElementById('investment-period').value);
    const expectedReturn = parseFloat(document.getElementById('expected-return').value);
    
    // SIP Calculation Formula
    // Maturity Amount = P × [({(1 + r)^n - 1} / r) × (1 + r)]
    // Where: P = Monthly Investment, r = Monthly Rate, n = Number of Months
    
    const monthlyRate = expectedReturn / 100 / 12;
    const numberOfMonths = investmentPeriod * 12;
    
    const maturityAmount = monthlyInvestment * (((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * numberOfMonths;
    const estimatedReturns = maturityAmount - totalInvestment;
    
    // Display results
    document.getElementById('total-investment').textContent = '₹' + totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 2});
    document.getElementById('estimated-returns').textContent = '₹' + estimatedReturns.toLocaleString('en-IN', {maximumFractionDigits: 2});
    document.getElementById('total-value').textContent = '₹' + maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 2});
    
    document.getElementById('sip-results').style.display = 'block';
});
</script>

<?php includeFooter(); ?>

