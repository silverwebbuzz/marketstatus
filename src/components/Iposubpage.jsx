import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Iposubpage.css";
function Iposubpage() {
  const location = useLocation();
  const { ipo } = location.state; // Access the IPO data from location state
  const [ipoData, setIpoData] = useState(null); // State to hold fetched IPO data

  // Extracting the company name from the state
  const company_name = ipo?.company_name.toLowerCase().replace(/\s+/g, "");
  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../assets/ipo", false, /\.(png|jpe?g|svg)$/)
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // 'en-GB' format is dd/mm/yyyy
  };

  useEffect(() => {
    // Fetching JSON data dynamically from the public directory
    const fetchData = async () => {
      try {
        const response = await fetch(`/iposubpage/${company_name}.json`);
        if (response.ok) {
          const data = await response.json();
          setIpoData(data);
        } else {
          console.error("Error fetching IPO data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching IPO data:", error);
      }
    };

    if (company_name) {
      fetchData();
    }
  }, [company_name]);

  if (!ipoData) {
    return <div>Loading...</div>; // Show loading while data is being fetched
  }

  return (
    <>
      <section>
        {ipoData.schemes &&
          ipoData.schemes.map((scheme, index) => (
            <div className="container" key={index}>
              <div className="subpage_header">
                <div className="header_box">
                  <img
                    src={images[ipo.logo]}
                    alt={`${ipo.amc_name} logo`}
                    className="logo"
                  />
                  <h2>{ipoData.company_name}</h2>
                  <span className="status"> {scheme.IPOstatus}</span>
                </div>
                <div className="time_line">
                  <div>
                    <span>{formatDate(scheme.IPOOpenDate)}</span>
                    Open
                  </div>
                  <div>
                    <span>{formatDate(scheme.IPOCloseDate)}</span>
                    Close
                  </div>
                  <div>
                    <span>{formatDate(scheme.IPOAllotmentDate)}</span>
                    Finalisation of Basis of Allotment
                  </div>
                  <div>
                    <span>{formatDate(scheme.IPORefundsInitiation)}</span>
                    Initiation of Refunds
                  </div>
                  <div>
                    <span>{formatDate(scheme.IPODematTransfer)}</span>
                    Transfer of Shares to Demat Account
                  </div>
                  <div>
                    <span>{formatDate(scheme.IPOListingDate)}</span>
                    Listing Date
                  </div>
                </div>

                {/* <div>Issue Size: {scheme.issueSize} Cr</div>
                <p>Category: {scheme.CategoryForIPOS}</p>
                <div>
                  Offer Price: <span>{scheme.fromPrice}</span> to{" "}
                  <span>{scheme.toPrice}</span>
                </div> */}
              </div>

              <div className="keypoints">
                <h3>IPO Strengths & Risks</h3>
                <div className="keypoints_row">
                  <div className="keypoints_box">
                    <h4>Strengths:</h4>
                    <ul>
                      {scheme.Strength.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="keypoints_box">
                    <h4>Risks:</h4>
                    <ul>
                      {scheme.Risk.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="detaipage_table_row">
                <div className="detailpage_table">
                  <div className="detailpage_table_heading">
                    <h3>IPO Financials</h3>
                  </div>
                  <div className="table_ind">
                  <table>
                    <thead className="detailpage_table_thead">
                      <tr>
                        <th>Period</th>
                        <th>Assets (Cr)</th>
                        <th>Revenue (Cr)</th>
                        <th>Profit (Cr)</th>
                      </tr>
                    </thead>
                    <tbody className="detailpage_table_thead">
                      {scheme.companyFinancials.map((financial, i) => (
                        <tr key={i}>
                          <td>
                            {new Date(financial.period).toLocaleDateString()}
                          </td>
                          <td>{financial.assets}</td>
                          <td>{financial.revenue}</td>
                          <td>{financial.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                 
                </div>
                <div className="detailpage_table subpage_discription">
                  <h3>Disclaimer</h3>
                  <p
                    className="disclimer"
                    dangerouslySetInnerHTML={{ __html: scheme.disclaimer }}
                  ></p>
                </div>
                <div className="detailpage_table subpage_discription">
                  <h3>About {ipoData.companyName}</h3>
                  <p
                    className="disclimer"
                    dangerouslySetInnerHTML={{
                      __html: scheme.companyDescription,
                    }}
                  ></p>
                </div>
                <div className="detailpage_table">
                  <div className="detailpage_table_heading">
                    <h3>Lot Sizes</h3>
                  </div>
                  <div className="table_ind">
                  <table className="lotsize">
                    <thead className="detailpage_table_thead">
                      <tr>
                        <th>Application</th>
                        <th>Lots</th>
                        <th>Shares</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody className="detailpage_table_thead">
                      {scheme.financialLotsize &&
                        scheme.financialLotsize.map((lot, lotIndex) => (
                          <tr key={lotIndex}>
                            <td>{lot.application}</td>
                            <td>{lot.lots}</td>
                            <td>{lot.shares}</td>
                            <td>{lot.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
              <div className="subpage_informatic">
                <div className="informatic_box">
                  <h3>Promoters</h3>
                  <ul>
                    {scheme.promotersName.map((promoter, i) => (
                      <li key={i}>{promoter.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="informatic_box">
                  <h3>Contact Information</h3>
                  <p>Address: {scheme.address}</p>
                  <p>Email: {scheme.email}</p>
                  <p>Phone: {scheme.companyPhone}</p>
                </div>
                <div className="informatic_box">
                  <h3>IPO Allotment Status</h3>
                  <p>
                    <a
                      href={scheme.allotmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check Allotment
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default Iposubpage;
