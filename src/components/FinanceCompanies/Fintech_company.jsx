import React, { useState, useEffect } from "react";

const Fintech_Company = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch data from JSON file
    fetch("/fintechcd.json")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching holiday data:", error));
  }, []);
  return (
    <div className="container">
      <div className="fintech_companies">
        <h2>Top Fintech Companies List</h2>
        <p>
          Discover the leading fintech companies that are transforming the
          financial landscape with innovative solutions. These companies are at
          the forefront of digital payments, lending, wealth management, and
          more, providing cutting-edge services that make managing your finances
          easier and more accessible.
        </p>
        <div className="table_ind">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Location</th>
                <th>Industry</th>
                <th>Founded</th>
                <th>CEO</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company.location}</td>
                  <td>{company.industry}</td>
                  <td>{company.founded}</td>
                  <td>{company.ceo}</td>
                  <td>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fintech_Company;
