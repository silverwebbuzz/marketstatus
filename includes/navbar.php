<div class="container">
    <div class="Nav_toggle">
        <button class="navbar-burger self-center xl:hidden" id="mobile-menu-toggle" style="width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; padding: 0;">
            <svg id="menu-icon" width="35" height="35" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="6" fill="transparent"></rect>
                <path d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="currentColor"></path>
            </svg>
        </button>
    </div>
    <div class="Navbar1">
        <div class="Nav_bottom" id="nav-menu">
            <div class="navbar">
                <nav class="Nav">
                    <ul class="nav_ul">
                        <li class="dropdown">
                            <a href="<?php echo url('/'); ?>">Home</a>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('market')">Market <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="market-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/indices'); ?>">Indices</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/market/worldindices'); ?>">World Indices</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/futures-margins'); ?>">Future Margin</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/ipo'); ?>">IPO</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/market/cryptocurrency'); ?>">Crypto Currency</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/market/forex'); ?>">Forex</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('mutualFunds')">Mutual Funds <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="mutualFunds-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/amc'); ?>">AMC Funds</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/equity-fund'); ?>">Equity Fund</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/debt-fund'); ?>">Debt Fund</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/hybrid-fund'); ?>">Hybrid Fund</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/index-fund'); ?>">Index Fund</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/mutual-funds/elss-fund'); ?>">ELSS Fund</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('Insurance')">Insurance <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="Insurance-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/general-insurance'); ?>">General Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/life-insurance'); ?>">Life Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/health-insurance'); ?>">Health Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/car-insurance'); ?>">Car Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/bike-insurance'); ?>">Bike Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/term-insurance'); ?>">Term Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/travel-insurance'); ?>">Travel Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/business-insurance'); ?>">Business Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/pet-insurance'); ?>">Pet Insurance</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/Insurance/fire-insurance'); ?>">Fire Insurance</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('Finance Institutes')">Finance Institutes <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="Finance Institutes-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/insurance-companies'); ?>">Insurance Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/broker-companies'); ?>">Broker Companies list</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/fintech-company'); ?>">Fintech Companies list</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/micro-finance-companies'); ?>">Micro Finance Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/payment-gateways'); ?>">Payment Gateways</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/crypto-currency-companies'); ?>">Crypto Currency Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/bank'); ?>">Banks</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/investment-management-companies'); ?>">Investment Management Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/analysis-companies'); ?>">Analysis Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/funding-companies-list'); ?>">Funding Companies list</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/CA-companies'); ?>">CA Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/CS-companies'); ?>">CS Companies</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/finance-companies/international-money-transfer-companies'); ?>">International Money Transfer Companies</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('Loans')">Loans <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="Loans-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/personal_loan'); ?>">Personal Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/home_loan'); ?>">Home Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/gold_loan'); ?>">Gold Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/auto_loan'); ?>">Auto Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/business_loan'); ?>">Business Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/mortgage_loan'); ?>">Mortgage Loan</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/loans/student_loan'); ?>">Student Loan</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <span onclick="toggleDropdown('Calculators')">Calculators <i class="faCaretDown">▼</i></span>
                            <ul class="dropdown-menu" id="Calculators-dropdown">
                                <li class="dropmenu-li"><a href="<?php echo url('/sip-calculator'); ?>">SIP Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/emi-calculator'); ?>">EMI Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/lumpsum-calculator'); ?>">Lumpsum Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/fd-calculator'); ?>">FD Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/yearly-sip-calculator'); ?>">Yearly SIP Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/cagr-calculator'); ?>">CAGR Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/rd-calculator'); ?>">RD Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/ppf-calculator'); ?>">PPF Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/ci-calculator'); ?>">Compound Interest Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/si-calculator'); ?>">Simple Interest Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/roi-calculator'); ?>">ROI Calculator</a></li>
                                <li class="dropmenu-li"><a href="<?php echo url('/nps-calculator'); ?>">NPS Calculator</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="<?php echo url('/blog'); ?>">Blog</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>

<script>
function toggleDropdown(dropdown) {
    const menu = document.getElementById(dropdown + '-dropdown');
    if (menu) {
        menu.classList.toggle('show');
    }
}

document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('open');
    
    const icon = document.getElementById('menu-icon');
    if (navMenu.classList.contains('open')) {
        icon.innerHTML = '<path d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z" fill="#556987"></path>';
    } else {
        icon.innerHTML = '<rect width="32" height="32" rx="6" fill="transparent"></rect><path d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z" fill="currentColor"></path>';
    }
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav_ul a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
            document.getElementById('nav-menu').classList.remove('open');
        }
    });
});
</script>

