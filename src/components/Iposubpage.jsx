import React from 'react';
import { useLocation } from 'react-router-dom';

function Iposubpage() {
  const location = useLocation();
  const { ipo } = location.state; // Access the IPO data from location state

  return (
    <div>
      <h3>IPO Details for {ipo.company_name}</h3>
      <p>Open Date: {ipo.open_date}</p>
      <p>Close Date: {ipo.close_date}</p>
      <p>Issue Size: ₹ {ipo.issue_size}</p>
      <p>Price Band: ₹ {ipo.price_band}</p>
      <p>Minimum Investment: ₹ {ipo.min_investment}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default Iposubpage;
