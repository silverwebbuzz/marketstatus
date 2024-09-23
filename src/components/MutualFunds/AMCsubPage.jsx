import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams for dynamic routing
import SIPAndLumpsumCalculator from "../Calculators/SIPAndLumpsumCalculator";
import { Helmet } from "react-helmet";
import AMCcompanies from "./AMCcompanies";
import "../../style/mutualfunds/amcsubpage.css";

const formatNumber = (num) => {
  return parseFloat(num).toFixed(2);
};

function AMCsubPage() {
  const { amc_name } = useParams(); // Get the AMC name from the URL
  const [fundData, setFundData] = useState(null);

  useEffect(() => {
    const fetchFundData = async () => {
      try {
        const response = await fetch(`/amccompanies/${amc_name}.json`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFundData(data);
      } catch (error) {
        console.error("Error fetching fund data:", error);
      }
    };

    fetchFundData();
  }, [amc_name]);

  if (!fundData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{fundData.amc_name} Mutual Funds - Detailed Information</title>
        <meta
          name="description"
          content={`Explore mutual funds offered by ${fundData.amc_name}. Find detailed information about schemes, returns, and more.`}
        />
      </Helmet>
      <section>
        <div className="container">
          <div className="breadcrumb_subcategory">
            <Link to="/">Home</Link> &gt;
            <Link to="/">Mutual Funds</Link> &gt;
            <Link to="/mutual-funds/amc">AMC</Link> &gt;
          </div>
          <h2>{fundData.amc_name}</h2>
          <div className="table_ind">
            <div className="table_main">
              <table className="table-scroll">
                <thead className="thead-list">
                  <tr className="amc_tr">
                    <th>Scheme Name</th>
                    <th>Min. Investment</th>
                    <th>AUM (in Cr.)</th>
                    <th>1Y Returns</th>
                    <th>3Y Returns</th>
                    <th>5Y Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {fundData.schemes.map((scheme, index) => (
                    <tr key={index}>
                      <td>{scheme.scheme_name}</td>
                      <td>₹{formatNumber(scheme.lumsum_minimum_amt)}</td>
                      <td>₹{formatNumber(scheme.scheme_aum)}</td>
                      <td>{formatNumber(scheme.scheme_1_year_return)}%</td>
                      <td>{formatNumber(scheme.scheme_3_year_return)}%</td>
                      <td>{formatNumber(scheme.scheme_5_year_return)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <AMCcompanies />
      <SIPAndLumpsumCalculator />
    </>
  );
}

export default AMCsubPage;
