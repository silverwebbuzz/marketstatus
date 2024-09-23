import React, { useState, useEffect } from "react";
import "../../style/IndicesTable.css";
import { Link } from "react-router-dom";

const IndicesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unixTimestamp, setUnixTimestamp] = useState(null);

  useEffect(() => {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    setUnixTimestamp(timestamp);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://devapi.marketstatus.in/sm/indiceslistApiHandler.php?exchangeName=NSE`
        );
        const result = await response.json();

        if (result && result.data && Array.isArray(result.data)) {
          const formattedData = result.data.map((item) => ({
            name: item.indexSymbol,
            price: item.last,
            Change: item.percentChange,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.previousClose,
            yearHigh: item.yearHigh,
            yearLow: item.yearLow,
          }));
          setData(formattedData);
        } else {
          setError(new Error("Invalid data structure"));
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColor = (value) =>
    parseFloat(value) >= 0 ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)";

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="Indices">
      <div className="container">
        <div className="Indices_row">
          <div className="heading_row">
            <h1 className="heading">MAJOR INDICES</h1>
            <p>
              Last Updated:{" "}
              {unixTimestamp
                ? new Date(unixTimestamp * 1000).toLocaleString()
                : "Fetching..."}
            </p>
          </div>
          <div className="table_ind">
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Current</th>
                  <th>% Change</th>
                  <th>Open</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Prev close</th>
                  <th>52W H</th>
                  <th>52W L</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/index/${item.name}`}>{item.name}</Link>
                    </td>
                    <td>{item.price}</td>
                    <td style={{ color: getColor(item.Change) }}>
                      {item.Change}
                    </td>
                    <td>{item.open}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.close}</td>
                    <td>{item.yearHigh}</td>
                    <td>{item.yearLow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndicesTable;
