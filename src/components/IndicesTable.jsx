import React, { useState, useEffect } from "react";
import "../style/IndicesTable.css";

const IndicesTable = () => {
  const [isNSE, setIsNSE] = useState(true);
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
      const exchange = isNSE ? "NSE" : "BSE";
      try {
        const response = await fetch(
          `https://www.research360.in/ajax/markets/majorIndicesApiHandler.php?table_flag=majorIndices&exchangeName=${exchange}&_=1721813024`
        );
        const result = await response.json();
        const formattedData = result.data.map((item) => ({
          name: item[0].replace(/<\/?[^>]+(>|$)/g, ""),
          price: item[3].replace(/<\/?[^>]+(>|$)/g, ""),
          netChange: item[5].replace(/<\/?[^>]+(>|$)/g, ""),
          oneDayPercent: item[6].replace(/<\/?[^>]+(>|$)/g, ""),
          oneDayHighLow: item[8].replace(/<\/?[^>]+(>|$)/g, ""),
          fiftyTwoWHighLow: item[10].replace(/<\/?[^>]+(>|$)/g, ""),
          threeMPercent: item[11].replace(/<\/?[^>]+(>|$)/g, ""),
          sixMPercent: item[12].replace(/<\/?[^>]+(>|$)/g, ""),
          oneYPercent: item[13].replace(/<\/?[^>]+(>|$)/g, ""),
        }));
        setData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [isNSE]);

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
              Last Updated:{" "} {unixTimestamp ? new Date(unixTimestamp * 1000).toLocaleString(): "Fetching..."}
            </p>
          </div>
          <div className="toggle-button">
            <div className="but_cover">
              <button
                onClick={() => setIsNSE(true)}
                className={isNSE ? "active" : ""}
              >
                NSE
              </button>
              <button
                onClick={() => setIsNSE(false)}
                className={!isNSE ? "active" : ""}
              >
                BSE
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Indices</th>
                <th>Price</th>
                <th>Net Change</th>
                <th>1D%</th>
                <th>1D High-Low</th>
                <th>52W High-Low</th>
                <th>3M%</th>
                <th>6M%</th>
                <th>1Y%</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td style={{ color: getColor(item.netChange) }}>
                    {item.netChange}
                  </td>
                  <td style={{ color: getColor(item.oneDayPercent) }}>
                    {item.oneDayPercent}
                  </td>
                  <td>{item.oneDayHighLow}</td>
                  <td>{item.fiftyTwoWHighLow}</td>
                  <td style={{ color: getColor(item.threeMPercent) }}>
                    {item.threeMPercent}
                  </td>
                  <td style={{ color: getColor(item.sixMPercent) }}>
                    {item.sixMPercent}
                  </td>
                  <td style={{ color: getColor(item.oneYPercent) }}>
                    {item.oneYPercent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default IndicesTable;