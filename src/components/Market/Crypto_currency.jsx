// import React, { useState, useEffect } from 'react';

// function Crypto_currency() {
//   return (
//     <div>
//       <h3>Coming soo !! 😄</h3>
//     </div>
//   )
// }

// export default Crypto_currency

import React, { useState, useEffect } from "react";

const CryptoCurrency = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL for fetching BTCUSD historical data
  const CRYPTO_URL = `https://financialmodelingprep.com/api/v3/historical-price-full/BTCUSD?apikey=3osufswzvLER4WHcmaBvc9xo56ncWXqX`;

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(CRYPTO_URL);
        const data = await response.json();

        // Check if the data contains the "historical" key
        if (data && data.historical) {
          setCryptoCurrency(data.historical);
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected data format");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the crypto data: ", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [CRYPTO_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section>
        <div className="container">
          <h2>BTCUSD Historical Data</h2>
          <div className="table_ind">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Close</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {cryptoCurrency.map((entry) => (
                  <tr key={entry.date}>
                    <td>{entry.date}</td>
                    <td>${entry.open.toFixed(2)}</td>
                    <td>${entry.high.toFixed(2)}</td>
                    <td>${entry.low.toFixed(2)}</td>
                    <td>${entry.close.toFixed(2)}</td>
                    <td>{entry.volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CryptoCurrency;
