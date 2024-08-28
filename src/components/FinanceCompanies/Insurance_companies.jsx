import React, { useState, useEffect } from "react";
import "../../style/Finance_companies/Insurance_companies.css";

function Insurance_companies() {
  const [lifeCompanies, setLifeCompanies] = useState([]);
  const [nonLifeCompanies, setNonLifeCompanies] = useState([]);

  useEffect(() => {
    // Fetch Life Insurance Companies
    fetch("/life_insurance_companies.json")
      .then((response) => response.json())
      .then((data) => setLifeCompanies(data))
      .catch((error) =>
        console.error("Error fetching life insurance companies data:", error)
      );

    // Fetch Non-Life Insurance Companies
    fetch("/non_life_insurance_companies.json")
      .then((response) => response.json())
      .then((data) => setNonLifeCompanies(data))
      .catch((error) =>
        console.error(
          "Error fetching non-life insurance companies data:",
          error
        )
      );
  }, []);

  return (
    <div className="container">
      <h2>Life Insurance Companies in India</h2>
      <p>
        Explore our curated list of top insurance companies known for their
        reliable coverage, customer service, and financial stability. Whether
        you're seeking life, health, or property insurance, these companies
        offer a range of policies to meet your needs and ensure peace of mind.
      </p>
      <div className="table_ind">
        <table className="Insurance_com_table">
          <thead className="Insurance_com_thead">
            <tr className="Insurance_com_tr">
              <th>#</th>
              <th>Company</th>
              <th>Sector</th>
              <th>Headquarters</th>
              <th>Founded</th>
            </tr>
          </thead>
          <tbody className="Insurance_com_tbody">
            {lifeCompanies.map((company) => (
              <tr key={company.id} className="Insurance_com_td">
                <td>{company.id}</td>
                <td>{company.company}</td>
                <td>{company.sector}</td>
                <td>{company.headquarters}</td>
                <td>{company.founded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Non-Life Insurance Companies in India</h2>
      <div className="table_ind">
        <table className="Insurance_com_table">
          <thead className="Insurance_com_thead">
            <tr className="Insurance_com_tr">
              <th>#</th>
              <th>Company</th>
              <th>Sector</th>
              <th>Headquarters</th>
              <th>Founded</th>
            </tr>
          </thead>
          <tbody className="Insurance_com_tbody">
            {nonLifeCompanies.map((company) => (
              <tr key={company.id} className="Insurance_com_td">
                <td>{company.id}</td>
                <td>{company.company}</td>
                <td>{company.sector}</td>
                <td>{company.headquarters}</td>
                <td>{company.founded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Insurance_companies;
