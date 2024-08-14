import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../style/StockData.css";

// Function to format numbers with commas and two decimal places
const formatNumber = (num) => {
  if (!num && num !== 0) return "-"; // Handling undefined or null numbers
  return parseFloat(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const getColor = (value) =>
  parseFloat(value) >= 0 ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)";

// New function to convert a value to crores
const convertToCrores = (value) => {
  return value / 10000000; // 10 million is equivalent to 1 crore
};

const StockData = () => {
  const { indexSymbol } = useParams();
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://devapi.marketstatus.in/sm/stockListApiHandler.php?indicesStock=${indexSymbol}`
        );
        const result = await response.json();
        if (result && result.data) {
          setStockData(result.data);
        } else {
          setError(new Error("Invalid data structure"));
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchStockData();
  }, [indexSymbol]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <div className="container">
        <div className="stock_data_heading">
          <h1>Stock Data for {indexSymbol}</h1>
        </div>
        <div className="table_ind">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Prev. Close</th>
                <th>Ltp</th>
                <th>Change</th>
                <th>%Change</th>
                <th>Volume (shares)</th>
                <th>Value (₹ Crores)</th>
                <th>52W H</th>
                <th>52W L</th>
                <th>30D %Change</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{formatNumber(item.open)}</td>
                  <td>{formatNumber(item.dayHigh)}</td>
                  <td>{formatNumber(item.dayLow)}</td>
                  <td>{formatNumber(item.previousClose)}</td>
                  <td>{formatNumber(item.lastPrice)}</td>
                  <td style={{ color: getColor(item.change) }}>
                    {formatNumber(item.change)}
                  </td>
                  <td style={{ color: getColor(item.pChange) }}>
                    {formatNumber(item.pChange)}
                  </td>
                  <td>{formatNumber(item.totalTradedVolume)}</td>
                  <td>{formatNumber(convertToCrores(item.totalTradedValue))}</td>
                  <td>{formatNumber(item.yearHigh)}</td>
                  <td>{formatNumber(item.yearLow)}</td>
                  <td>{formatNumber(item.perChange30d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default StockData;
