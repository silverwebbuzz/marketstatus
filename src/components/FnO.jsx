import React, { useState, useEffect } from "react";
import "../style/FnO.css";

const FnO = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [funds, setFunds] = useState("");

  useEffect(() => {
    fetch("/fnO.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = () => {
    const filtered = data.filter(
      (item) => parseFloat(item.margin) <= parseFloat(funds)
    );
    setFilteredData(filtered);
  };

  return (
    <section>
      <div className="container">
        <div className="dashboard_FnO">
          <div className="search-container">
            <input
              type="number"
              placeholder="Enter your fund"
              value={funds}
              onChange={(e) => setFunds(e.target.value)}
            />
            <button onClick={handleSearch}>Find</button>
          </div>
          <div className="table_ind">

          <table>
            <thead>
              <tr>
                <th>Contract</th>
                <th>Price</th>
                <th>Lot Size</th>
                <th>Margin</th>
                <th>MarginRate%</th>
                <th>No. of Lots</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="t_row">
                  
                  <td>
                    {item.scrip} {item.expiry}
                  </td>
                  <td>₹ {item.price}</td>
                  <td>{item["lot_size"]}</td>
                  <td>₹ {item.nrml_margin}</td>
                  <td>{item.margin} %</td>
                  <td>
                    {funds
                      ? Math.floor(parseFloat(funds) / parseFloat(item.margin))
                      : 0}
                  </td>
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

export default FnO;


