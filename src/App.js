import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
//import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import IndicesTable from './components/IndicesTable';
import FnO from './components/FnO';
import MutualFund from './components/MutualFund';
import MutualData from './Data/mutualData.json'; // Adjust the path as necessary
import Footer from './components/Footer';
import Ipo from './components/Ipo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Custom hook to handle Google Analytics page views
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
        {/* <Navbar /> */}
        <Routes>
          <Route path="/indices" element={<IndicesTable />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/fnO" element={<FnO />} />
          <Route path="/ipo" element={<Ipo />} />
          <Route path="/mutualFunds" element={<MutualFund data={MutualData} />} /> 
        </Routes>
        <Footer />     
    </>
  );
}


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
