import React, { useState, useEffect } from "react";
 import "../../style/WorldIndices.css";

const formatNumber = (num) => {
  if (!num && num !== 0) return "-";  // Handling undefined or null numbers
  return parseFloat(num).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const WorldIndices = () => {
  const [indicesData, setIndicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIndicesData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://devapi.marketstatus.in/sm/worldIndicesApiHandler.php`
        );
        const result = await response.json();

        const formattedData = result.data.map((item) => ({
          name: item[0].replace(/<\/?[^>]+(>|$)/g, "").trim(), // Extracting and cleaning the index name
          countryImg: item[0].match(/src=['"]([^'"]+)['"]/)?.[1] || "", // Extracting the image URL
          price: parseFloat(item[1].replace(/<\/?[^>]+(>|$)/g, "").trim()), // Current price
          netChange: parseFloat(item[2].replace(/<\/?[^>]+(>|$)/g, "").trim()), // Net change
          oneDayPercent: parseFloat(item[3].replace(/<\/?[^>]+(>|$)/g, "").trim()), // 1-day percent change
          high: parseFloat(item[4].replace(/<\/?[^>]+(>|$)/g, "").trim()), // Day's high
          low: parseFloat(item[5].replace(/<\/?[^>]+(>|$)/g, "").trim()), // Day's low
          previousClose: parseFloat(item[6].replace(/<\/?[^>]+(>|$)/g, "").trim()) // Previous close
        }));

        setIndicesData(formattedData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchIndicesData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section>
      <div className="container">
        <h1>World Indices</h1>
        <div className="table_ind">
          <table className="World_indices_table">
            <thead className="World_indices_thead">
              <tr className="World_indices_thead_tr">
                <th>Index</th>
                {/* {/ <th>Country</th> /} */}
                <th>Price</th>
                <th>Change</th>
                <th>% Change</th>
                <th>High</th>
                <th>Low</th>
                <th>Previous Close</th>
              </tr>
            </thead>
            <tbody className="World_indices_tbody">
              {indicesData.map((item, index) => (
                <tr className="World_indices_tbody_tr" key={index}>
                  <td >
                  <div className="padding_right">
                    {item.countryImg && <img src={item.countryImg} alt="Country flag" style={{ width: '20px', height: 'auto' }} />}
                    <p>{item.name}</p>
                  </div>
                  </td>
                  <td>{formatNumber(item.price)}</td>
                  <td style={{ color: item.netChange > 0 ? 'green' : 'red' }}>
                    {formatNumber(item.netChange)}
                  </td>
                  <td style={{ color: item.oneDayPercent > 0 ? 'green' : 'red' }}>
                    {formatNumber(item.oneDayPercent)}%
                  </td>
                  <td>{formatNumber(item.high)}</td>
                  <td>{formatNumber(item.low)}</td>
                  <td>{formatNumber(item.previousClose)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WorldIndices;