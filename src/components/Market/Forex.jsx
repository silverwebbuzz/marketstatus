import React, { useState, useEffect } from "react";

const ForexHistorical = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL for fetching EUR/USD historical data
  const FOREX_URL = `https://financialmodelingprep.com/api/v3/historical-price-full/EURUSD?apikey=3osufswzvLER4WHcmaBvc9xo56ncWXqX`;

  useEffect(() => {
    const fetchForexData = async () => {
      try {
        const response = await fetch(FOREX_URL);
        const data = await response.json();

        // Assuming the historical data is nested under the "historical" key
        if (data && data.historical) {
          setHistoricalData(data.historical);
        } else {
          console.error("Unexpected response format:", data);
          setError("Unexpected data format");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the forex data: ", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchForexData();
  }, [FOREX_URL]);

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
          <h2>EUR/USD Historical Data</h2>
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
                {historicalData.map((entry) => (
                  <tr key={entry.date}>
                    <td>{entry.date}</td>
                    <td>${entry.open.toFixed(4)}</td>
                    <td>${entry.high.toFixed(4)}</td>
                    <td>${entry.low.toFixed(4)}</td>
                    <td>${entry.close.toFixed(4)}</td>
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

export default ForexHistorical;
