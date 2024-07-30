
import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import IndicesTable from './components/IndicesTable';
import FnO from './components/FnO';
import MutualFund from './components/MutualFund';
import MutualData from './Data/mutualData.json';// Adjust the path as necessary
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/indices" element={<IndicesTable />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/fnO" element={<FnO />} />
          <Route path="/mutualFunds" element={<MutualFund data={MutualData} />} /> {/* New Route */}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

