import React, { useState, useEffect } from "react";
import "../../style/Finance_companies/Insurance_companies.css";

const Banks = () => {
  const [banks, setBanks] = useState({});

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/banks.json")
      .then((response) => response.json())
      .then((data) => setBanks(data.banks[0])) // Assuming banks[0] holds the actual bank data
      .catch((error) => console.error("Error fetching bank data:", error));
  }, []);

  return (
    <section>
      <div className="container">
        <div className="banks_header">
          <h1>List of Banks</h1>
          <p>Below is a list of banks with their codes and names.</p>
        </div>
        <div className="banks_list">
          {Object.entries(banks).map(([code, name]) => (
            <div className="bank_item" key={code}>
              <div className="bank_code">
                <strong>Bank Code:</strong> {code}
              </div>
              <div className="bank_name">
                <strong>Name:</strong> {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banks;
