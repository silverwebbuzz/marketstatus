<?php
/**
 * Market Status - Main Entry Point
 * PHP version of the React application
 */

// Start session if needed
session_start();

// Include configuration
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';

// Get the current route
$route = getCurrentRoute();

// Route handling
switch ($route) {
    case '/':
        include __DIR__ . '/pages/dashboard.php';
        break;
    
    case '/indices':
        include __DIR__ . '/pages/market/indices.php';
        break;
    
    case '/futures-margins':
        include __DIR__ . '/pages/market/fno.php';
        break;
    
    case '/ipo':
        include __DIR__ . '/pages/market/ipo.php';
        break;
    
    // Dynamic routes will be handled in default case
    
    // Calculators
    case '/sip-calculator':
        include __DIR__ . '/pages/calculators/sip.php';
        break;
    
    case '/emi-calculator':
        include __DIR__ . '/pages/calculators/emi.php';
        break;
    
    case '/fd-calculator':
        include __DIR__ . '/pages/calculators/fd.php';
        break;
    
    case '/lumpsum-calculator':
        include __DIR__ . '/pages/calculators/lumpsum.php';
        break;
    
    case '/yearly-sip-calculator':
        include __DIR__ . '/pages/calculators/yrsip.php';
        break;
    
    case '/roi-calculator':
        include __DIR__ . '/pages/calculators/roi.php';
        break;
    
    case '/cagr-calculator':
        include __DIR__ . '/pages/calculators/cagr.php';
        break;
    
    case '/rd-calculator':
        include __DIR__ . '/pages/calculators/rd.php';
        break;
    
    case '/ppf-calculator':
        include __DIR__ . '/pages/calculators/ppf.php';
        break;
    
    case '/ci-calculator':
        include __DIR__ . '/pages/calculators/ci.php';
        break;
    
    case '/si-calculator':
        include __DIR__ . '/pages/calculators/si.php';
        break;
    
    case '/nps-calculator':
        include __DIR__ . '/pages/calculators/nps.php';
        break;
    
    // Mutual Funds
    case '/mutual-funds/amc':
        include __DIR__ . '/pages/mutualfunds/amc.php';
        break;
    
    case '/mutual-funds/equity-fund':
        include __DIR__ . '/pages/mutualfunds/equity.php';
        break;
    
    case '/mutual-funds/debt-fund':
        include __DIR__ . '/pages/mutualfunds/debt.php';
        break;
    
    case '/mutual-funds/hybrid-fund':
        include __DIR__ . '/pages/mutualfunds/hybrid.php';
        break;
    
    case '/mutual-funds/index-fund':
        include __DIR__ . '/pages/mutualfunds/index.php';
        break;
    
    case '/mutual-funds/elss-fund':
        include __DIR__ . '/pages/mutualfunds/elss.php';
        break;
    
    // Market
    case '/market/cryptocurrency':
        include __DIR__ . '/pages/market/crypto.php';
        break;
    
    case '/market/forex':
        include __DIR__ . '/pages/market/forex.php';
        break;
    
    case '/market/worldindices':
        include __DIR__ . '/pages/market/worldindices.php';
        break;
    
    // Dynamic routes will be handled in default case
    
    case '/holidays':
        include __DIR__ . '/pages/holidays.php';
        break;
    
    // Finance Companies
    case '/finance-companies/analysis-companies':
        include __DIR__ . '/pages/financecompanies/analysis_companies.php';
        break;
    
    case '/finance-companies/broker-companies':
        include __DIR__ . '/pages/financecompanies/broker_companies.php';
        break;
    
    case '/finance-companies/crypto-currency-companies':
        include __DIR__ . '/pages/financecompanies/crypto_currency_companies.php';
        break;
    
    case '/finance-companies/fintech-company':
        include __DIR__ . '/pages/financecompanies/fintech_company.php';
        break;
    
    case '/finance-companies/bank':
        include __DIR__ . '/pages/financecompanies/banks.php';
        break;
    
    case '/finance-companies/investment-management-companies':
        include __DIR__ . '/pages/financecompanies/investment_management_companies.php';
        break;
    
    case '/finance-companies/funding-companies-list':
        include __DIR__ . '/pages/financecompanies/funding_companies.php';
        break;
    
    case '/finance-companies/CA-companies':
        include __DIR__ . '/pages/financecompanies/ca_companies.php';
        break;
    
    case '/finance-companies/CS-companies':
        include __DIR__ . '/pages/financecompanies/cs_companies.php';
        break;
    
    case '/finance-companies/international-money-transfer-companies':
        include __DIR__ . '/pages/financecompanies/international_money_transfer_companies.php';
        break;
    
    case '/finance-companies/micro-finance-companies':
        include __DIR__ . '/pages/financecompanies/micro_finance_companies.php';
        break;
    
    case '/finance-companies/payment-gateways':
        include __DIR__ . '/pages/financecompanies/payment_gateways.php';
        break;
    
    case '/finance-companies/insurance-companies':
        include __DIR__ . '/pages/financecompanies/insurance_companies.php';
        break;
    
    // Insurance
    case '/Insurance/general-insurance':
        include __DIR__ . '/pages/insurance/general_insurance.php';
        break;
    
    case '/Insurance/life-insurance':
        include __DIR__ . '/pages/insurance/life_insurance.php';
        break;
    
    case '/Insurance/health-insurance':
        include __DIR__ . '/pages/insurance/health_insurance.php';
        break;
    
    case '/Insurance/car-insurance':
        include __DIR__ . '/pages/insurance/car_insurance.php';
        break;
    
    case '/Insurance/bike-insurance':
        include __DIR__ . '/pages/insurance/bike_insurance.php';
        break;
    
    case '/Insurance/term-insurance':
        include __DIR__ . '/pages/insurance/term_insurance.php';
        break;
    
    case '/Insurance/travel-insurance':
        include __DIR__ . '/pages/insurance/travel_insurance.php';
        break;
    
    case '/Insurance/business-insurance':
        include __DIR__ . '/pages/insurance/business_insurance.php';
        break;
    
    case '/Insurance/pet-insurance':
        include __DIR__ . '/pages/insurance/pet_insurance.php';
        break;
    
    case '/Insurance/fire-insurance':
        include __DIR__ . '/pages/insurance/fire_insurance.php';
        break;
    
    // Loans
    case '/loans/personal_loan':
        include __DIR__ . '/pages/loans/personal_loan.php';
        break;
    
    case '/loans/home_loan':
        include __DIR__ . '/pages/loans/home_loan.php';
        break;
    
    case '/loans/gold_loan':
        include __DIR__ . '/pages/loans/gold_loan.php';
        break;
    
    case '/loans/auto_loan':
        include __DIR__ . '/pages/loans/auto_loan.php';
        break;
    
    case '/loans/business_loan':
        include __DIR__ . '/pages/loans/business_loan.php';
        break;
    
    case '/loans/mortgage_loan':
        include __DIR__ . '/pages/loans/mortgage_loan.php';
        break;
    
    case '/loans/student_loan':
        include __DIR__ . '/pages/loans/student_loan.php';
        break;
    
    // News
    case '/news/business_news':
        include __DIR__ . '/pages/news/business_news.php';
        break;
    
    case '/news/economy_news':
        include __DIR__ . '/pages/news/economy_news.php';
        break;
    
    case '/news/political_news':
        include __DIR__ . '/pages/news/political_news.php';
        break;
    
    case '/news/world_news':
        include __DIR__ . '/pages/news/world_news.php';
        break;
    
    case '/blog':
        include __DIR__ . '/pages/blog.php';
        break;
    
    default:
        // Check for dynamic routes
        if (preg_match('#^/ipo/(.+)$#', $route, $matches)) {
            $company_name = urldecode($matches[1]);
            include __DIR__ . '/pages/market/ipo_subpage.php';
        } elseif (preg_match('#^/amc/(.+)$#', $route, $matches)) {
            $amc_name = urldecode($matches[1]);
            include __DIR__ . '/pages/mutualfunds/amc_subpage.php';
        } elseif (preg_match('#^/stock/(.+)$#', $route, $matches)) {
            $title = urldecode($matches[1]);
            include __DIR__ . '/pages/market/stockbox_subpage.php';
        } elseif (preg_match('#^/indices/(.+)$#', $route, $matches)) {
            $indexSymbol = urldecode($matches[1]);
            include __DIR__ . '/pages/market/stockdata.php';
        } elseif (preg_match('#^/mutualfunds/(.+)/(.+)$#', $route, $matches)) {
            $category = urldecode($matches[1]);
            $subcategory = urldecode($matches[2]);
            include __DIR__ . '/pages/mutualfunds/subcategory.php';
        } else {
            http_response_code(404);
            include __DIR__ . '/pages/404.php';
        }
        break;
}
?>

