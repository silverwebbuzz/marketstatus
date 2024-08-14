import React, { useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IndicesTable from './components/Market/IndicesTable';
import FnO from './components/Market/FnO';
import Footer from './components/Footer';
import SIP from './components/Calculators/SIP';
import EMI from './components/Calculators/EMI';
import FD from './components/Calculators/FD';
import Lumpsum from './components/Calculators/Lumpsum';
import AMC from './components/MutualFunds/AMC';
import Subcategory from './components/Subcategory';
import StockData from './components/Market/StockData';
import IPO from './components/Market/Ipo';
import './App.css';
import NseHolidays from './components/NseHolidays';
import Analysis_companies from './components/FinanceCompanies/Analysis_companies';
import Fintech_company from './components/FinanceCompanies/Fintech_company';
import Broker_Companies from './components/FinanceCompanies/Broker_Companies';
import Crypto_currency from './components/FinanceCompanies/Crypto_currency_companies';
import Bank from './components/FinanceCompanies/Banks';
import Investment_management_companies from './components/FinanceCompanies/Investment_management_companies';
import Funding_Companies from './components/FinanceCompanies/Funding_Companies';
import CA_companies from './components/FinanceCompanies/CA_companies';
import CS_companies from './components/FinanceCompanies/CS_companies';
import International_money_transfer_companies from './components/FinanceCompanies/International_money_transfer_companies';
import Crypto_currency_companies from './components/FinanceCompanies/Crypto_currency_companies';
import Small_Finance_companies from './components/FinanceCompanies/Small_finance_companies';
import Equity from './components/MutualFunds/Equity';
import Debt from './components/MutualFunds/Debt';
import Hybrid from './components/MutualFunds/Hybrid';
import Index from './components/MutualFunds/Index';
import ELSS from './components/MutualFunds/ELSS';
import Forex from './components/Market/Forex';
import Personal_loan from './components/Loans/Personal_loan';
import Home_loan from './components/Loans/Home_loan';
import Car_loan from './components/Loans/Car_loan';
import General_Insurance from './components/Insurance/General_Insurance';
import WorldIndices from './components/Market/WorldIndices';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    if (window.gtag) {
      window.gtag('config', 'G-4XC6ZTHXRW', {
        page_path: pagePath,
      });
    }
  }, [location]);
};

const AppContent = () => {
  usePageTracking();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/indices" element={<IndicesTable />} />
        <Route path="/futures-margins" element={<FnO />} />
        <Route path="/ipo" element={<IPO />} />
        <Route path="/sip-calculator" element={<SIP />} />
        <Route path="/emi-calculator" element={<EMI />} />
        <Route path="/fd-calculator" element={<FD />} />
        <Route path="/lumpsum-calculator" element={<Lumpsum />} />
        <Route path="/mutual-funds/amc" element={<AMC />} />
        <Route path="/mutualfunds/:category/:subcategory" element={<Subcategory />} />
        <Route path="/index/:indexSymbol" element={<StockData />} />
        <Route path="/holidays" element={<NseHolidays />} />
        <Route path="/finance-companies/analysis-companies" element={<Analysis_companies/>} />
        <Route path="/finance-companies/broker-companies" element={<Broker_Companies/>} />
        <Route path="/finance-companies/crypto-currency-companies" element={<Crypto_currency_companies/>} />
        <Route path="/finance-companies/fintech-company" element={<Fintech_company/>} />
        <Route path="/finance-companies/bank" element={<Bank/>} />
        <Route path="/finance-companies/investment-management-companies" element={<Investment_management_companies/>} />
        <Route path="/finance-companies/funding-companies-list" element={<Funding_Companies/>} />
        <Route path="/finance-companies/CA-companies" element={<CA_companies/>} />
        <Route path="/finance-companies/CS-companies" element={<CS_companies/>} />
        <Route path="/finance-companies/international-money-transfer-companies" element={<International_money_transfer_companies/>} />
        <Route path="/finance-companies/small-finance-companies" element={<Small_Finance_companies/>} />
        <Route path="/market/cryptocurrency" element={<Crypto_currency/>} />
        <Route path="/market/forex" element={<Forex/>} />
        <Route path="/mutual-funds/equity-fund" element={<Equity/>} />
        <Route path="/mutual-funds/debt-fund" element={<Debt/>} />
        <Route path="/mutual-funds/hybrid-fund" element={<Hybrid/>} />
        <Route path="/mutual-funds/index-fund" element={<Index/>} />
        <Route path="/mutual-funds/elss-fund" element={<ELSS/>} />
        <Route path="/Insurance/general-insurance" element={<General_Insurance/>} />
        <Route path="Loans/personal_loan" element={<Personal_loan/>} />
        <Route path="Loans/home_loan" element={<Home_loan/>} />
        <Route path="Loans/car_loan" element={<Car_loan/>} />
        <Route path="market/worldindices" element={<WorldIndices/>} />
        
        
        
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
