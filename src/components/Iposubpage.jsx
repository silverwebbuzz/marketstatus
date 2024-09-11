import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Iposubpage() {
  const location = useLocation();
  const { ipo } = location.state; // Access the IPO data from location state
  const [ipoData, setIpoData] = useState(null); // State to hold fetched IPO data

  // Extracting the company name from the state
  const company_name = ipo?.company_name.toLowerCase().replace(/\s+/g, '');

  useEffect(() => {
    // Fetching JSON data dynamically from the public directory
    const fetchData = async () => {
      try {
        const response = await fetch(`/iposubpage/${company_name}.json`);
        if (response.ok) {
          const data = await response.json();
          setIpoData(data);
        } else {
          console.error('Error fetching IPO data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      }
    };

    if (company_name) {
      fetchData();
    }
  }, [company_name]);

  if (!ipoData) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <div>
      <h2>{ipoData.company_name}</h2>
      {ipoData.schemes && ipoData.schemes.map((scheme, index) => (
        <div key={index}>
          <p>IPO Status: {scheme.IPOstatus}</p>
          <p>Company Name: {scheme.companyName}</p>
          <p>Email: {scheme.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Iposubpage;
