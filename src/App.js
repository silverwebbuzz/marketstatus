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
import YRSIP from "./components/Calculators/YRSIP";
import CAGR from "./components/Calculators/CAGR";
import RD from "./components/Calculators/RD";
import PPF from "./components/Calculators/PPF";
import CI from "./components/Calculators/CI";
import SI from "./components/Calculators/SI";
import ROI from "./components/Calculators/ROI";
import NPS from "./components/Calculators/NPS";
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
import Micro_Finance_companies from './components/FinanceCompanies/Micro_finance_companies';
import Equity from './components/MutualFunds/Equity';
import Debt from './components/MutualFunds/Debt';
import Hybrid from './components/MutualFunds/Hybrid';
import Index from './components/MutualFunds/Index';
import ELSS from './components/MutualFunds/ELSS';
import Forex from './components/Market/Forex';
import Personal_loan from './components/Loans/Personal_loan';
import Home_loan from './components/Loans/Home_loan';
import General_Insurance from './components/Insurance/General_Insurance';
import WorldIndices from './components/Market/WorldIndices';
import Life_Insurance from './components/Insurance/Life_Insurance';
import Health_Insurance from './components/Insurance/Health_Insurance';
import Car_Insurance from './components/Insurance/Car_Insurance';
import Bike_Insurance from './components/Insurance/Bike_Insurance';
import Term_Insurance from './components/Insurance/Term_Insurance';
import Travel_Insurance from './components/Insurance/Travel_Insurance';
import Business_Insurance from './components/Insurance/Business_Insurance';
import Pet_Insurance from './components/Insurance/Pet_Insurance';
import Fire_Insurance from './components/Insurance/Fire_Insurance';
import Gold_loan from './components/Loans/Gold_loan';
import Auto_loan from './components/Loans/Auto_loan';
import Business_loan from './components/Loans/Business_loan';
import Mortgage_loan from './components/Loans/Mortgage_loan';
import Student_loan from './components/Loans/Student_loan';
import Business_news from './components/News/Business_news';
import Economy_news from './components/News/Economy_news';
import Political_news from './components/News/Political_news';
import World_news from './components/News/World_news';
import Insurance_companies from './components/FinanceCompanies/Insurance_companies';
import PaymentGateways from './components/FinanceCompanies/Payment_gateways';

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
        <Route path="/yearly-sip-calculator" element={<YRSIP />} />
        <Route path="/roi-calculator" element={<ROI />} />
        <Route path="/cagr-calculator" element={<CAGR />} />
        <Route path="/rd-calculator" element={<RD />} />
        <Route path="/ppf-calculator" element={<PPF />} />
        <Route path="/ci-calculator" element={<CI />} />
        <Route path="/si-calculator" element={<SI />} />
        <Route path="/nps-calculator" element={<NPS />} />

        <Route path="/mutual-funds/amc" element={<AMC />} />
        <Route
          path="/mutualfunds/:category/:subcategory"
          element={<Subcategory />}
        />
        <Route path="/index/:indexSymbol" element={<StockData />} />
        <Route path="/holidays" element={<NseHolidays />} />
        <Route
          path="/finance-companies/analysis-companies"
          element={<Analysis_companies />}
        />
        <Route
          path="/finance-companies/broker-companies"
          element={<Broker_Companies />}
        />
        <Route
          path="/finance-companies/crypto-currency-companies"
          element={<Crypto_currency_companies />}
        />
        <Route
          path="/finance-companies/fintech-company"
          element={<Fintech_company />}
        />
        <Route path="/finance-companies/bank" element={<Bank />} />
        <Route
          path="/finance-companies/investment-management-companies"
          element={<Investment_management_companies />}
        />
        <Route
          path="/finance-companies/funding-companies-list"
          element={<Funding_Companies />}
        />
        <Route
          path="/finance-companies/CA-companies"
          element={<CA_companies />}
        />
        <Route
          path="/finance-companies/CS-companies"
          element={<CS_companies />}
        />
        <Route
          path="/finance-companies/international-money-transfer-companies"
          element={<International_money_transfer_companies />}
        />
        <Route
          path="/finance-companies/micro-finance-companies"
          element={<Micro_Finance_companies />}
        />
        <Route
          path="/finance-companies/payment-gateways"
          element={<PaymentGateways />}
        />
        <Route path="/market/cryptocurrency" element={<Crypto_currency />} />
        <Route path="/market/forex" element={<Forex />} />
        <Route path="/mutual-funds/equity-fund" element={<Equity />} />
        <Route path="/mutual-funds/debt-fund" element={<Debt />} />
        <Route path="/mutual-funds/hybrid-fund" element={<Hybrid />} />
        <Route path="/mutual-funds/index-fund" element={<Index />} />
        <Route path="/mutual-funds/elss-fund" element={<ELSS />} />
        <Route
          path="/Insurance/general-insurance"
          element={<General_Insurance />}
        />
        <Route path="/loans/personal_loan" element={<Personal_loan />} />
        <Route path="/loans/home_loan" element={<Home_loan />} />
        <Route path="market/worldindices" element={<WorldIndices />} />
        <Route path="/Insurance/life-insurance" element={<Life_Insurance />} />
        <Route
          path="/Insurance/health-insurance"
          element={<Health_Insurance />}
        />
        <Route path="/Insurance/car-insurance" element={<Car_Insurance />} />
        <Route path="/Insurance/bike-insurance" element={<Bike_Insurance />} />
        <Route path="/Insurance/term-insurance" element={<Term_Insurance />} />
        <Route
          path="/Insurance/travel-insurance"
          element={<Travel_Insurance />}
        />
        <Route
          path="/Insurance/business-insurance"
          element={<Business_Insurance />}
        />
        <Route path="/Insurance/pet-insurance" element={<Pet_Insurance />} />
        <Route path="/Insurance/fire-insurance" element={<Fire_Insurance />} />
        <Route path="/loans/gold_loan" element={<Gold_loan />} />
        <Route path="/loans/auto_loan" element={<Auto_loan />} />
        <Route path="/loans/business_loan" element={<Business_loan />} />
        <Route path="/loans/mortgage_loan" element={<Mortgage_loan />} />
        <Route path="/loans/student_loan" element={<Student_loan />} />
        <Route path="/news/business_news" element={<Business_news />} />
        <Route path="/news/economy_news" element={<Economy_news />} />
        <Route path="/news/political_news" element={<Political_news />} />
        <Route path="/news/world_news" element={<World_news />} />
        <Route
          path="/finance-companies/insurance-companies"
          element={<Insurance_companies />}
        />
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
