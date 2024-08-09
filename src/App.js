import React, { useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IndicesTable from './components/IndicesTable';
import FnO from './components/FnO';
import Footer from './components/Footer';
import AMC from './components/MutualFunds/AMC';
import Subcategory from './components/Subcategory';
import IPO from './components/Ipo';
import CAGR from "./components/Calculators/CAGR";
import RD from "./components/Calculators/RD";
import PPF from "./components/Calculators/PPF";
import CI from "./components/Calculators/CI";
import SI from "./components/Calculators/SI";
import SIP from "./components/Calculators/SIP";
import YRSIP from "./components/Calculators/YRSIP";
import EMI from "./components/Calculators/EMI";
import FD from "./components/Calculators/FD";
import Lumpsum from "./components/Calculators/Lumpsum";

import './App.css';

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
        <Route path="/yearly-sip-calculator" element={<YRSIP />} />
        <Route path="/cagr-calculator" element={<CAGR />} />
        <Route path="/emi-calculator" element={<EMI />} />
        <Route path="/fd-calculator" element={<FD />} />
        <Route path="/rd-calculator" element={<RD />} />
        <Route path="/ci-calculator" element={<CI />} />
        <Route path="/ppf-calculator" element={<PPF />} />
        <Route path="/si-calculator" element={<SI />} />
        <Route path="/lumpsum-calculator" element={<Lumpsum />} />
        <Route path="/mutual-funds/amc" element={<AMC />} />
        <Route path="/mutual-funds/amc" element={<AMC />} />
        <Route path="/funds/:subcategory" element={<Subcategory />} />
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
