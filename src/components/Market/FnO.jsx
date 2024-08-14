import React, { useState, useEffect } from "react";
import "../../style/FnO.css";

const FnO = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [funds, setFunds] = useState("");
  const [contract, setContract] = useState("");

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

  const handleContractChange = (e) => {
    const contract = e.target.value;
    setContract(contract);
    const filtered = data.filter((item) =>
      item.scrip.toLowerCase().includes(contract.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <section>
      <div className="container">
        <div className="dashboard_FnO">
          <div className="FM_header">
            <h1 className="FM_h1">Future Margin</h1>
            <p className="FM_p">Elevate your equity game with smart margins</p>
          </div>
          <div className="search_row">
          <div className="search-container">
            <input
              type="number"
              placeholder="Enter your fund"
              value={funds}
              onChange={(e) => setFunds(e.target.value)}
            />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for a contract"
              value={contract}
              onChange={handleContractChange}
            />
          </div>
          </div>
          <div className="table_ind">
            <table className="futureoption_table">
              <thead className="futureoption_thead">
                <tr className="futureoption_thead_trow">
                  <th>Contract</th>
                  <th>Price</th>
                  <th>Lot Size</th>
                  <th>Margin</th>
                  <th>MarginRate%</th>
                  <th>No. of Lots</th>
                </tr>
              </thead>
              <tbody className="futureoption_tbody">
                {filteredData.map((item, index) => (
                  <tr key={index} className="futureoption_tbody_trow">
                    <td>{item.scrip} {item.expiry}</td>
                    <td>₹ {item.price}</td>
                    <td>{item["lot_size"]}</td>
                    <td>₹ {item.nrml_margin}</td>
                    <td>{item.margin} %</td>
                    <td>{funds ? Math.floor(parseFloat(funds) / parseFloat(item.nrml_margin)) : 0}</td>
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
