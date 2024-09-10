import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../style/Ipo.css";

const IPO = () => {
  const [ipos, setIpos] = useState([]);
  const [listedIpos, setListedIpos] = useState([]);
  const [faqOpen, setFaqOpen] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch("/ipoData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const currentDate = new Date();
        const filteredIpos = data.filter((ipo) => {
          const openDate = new Date(ipo.open_date);
          const closeDate = new Date(ipo.close_date);
          return (
            openDate <= currentDate &&
            currentDate <= closeDate.setHours(17, 59, 59)
          );
        });
        setIpos(filteredIpos);
      })
      .catch((error) => console.error("Error fetching IPO data:", error));
  }, []);

  useEffect(() => {
    fetch("/listedipo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setListedIpos(data.listedIpos))
      .catch((error) =>
        console.error("Error fetching listed IPO data:", error)
      );
  }, []);

  const getColor = (value) => {
    return parseFloat(value) >= 0 ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)";
  };

  const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  };

  const images = importAll(
    require.context("../../assets/ipo", false, /\.(png|jpe?g|svg)$/)
  );

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleNavigateToSubpage = (ipo) => {
    // Navigate to the subpage and pass IPO details using state
    navigate(`/ipo/iposubpage`, { state: { ipo } });
  };

  const faqData = [
    {
      question: "What is an IPO?",
      answer:
        "An Initial Public Offering (IPO) is the process by which a private company offers its shares to the public for the first time to raise capital from public investors.",
    },
    {
      question: "Why do companies go public?",
      answer:
        "Companies go public to raise capital for expansion, pay off debt, enhance their public profile, and provide liquidity for shareholders.",
    },
    {
      question: "What is the IPO subscription period?",
      answer:
        "The IPO subscription period is the time frame during which investors can apply for the IPO. This period is generally a few days long and is set by the company issuing the IPO.",
    },
    {
      question: "How can I invest in an IPO?",
      answer:
        "To invest in an IPO, you typically need a brokerage account. You can place an order for IPO shares through your broker during the subscription period.",
    },
    {
      question: "What is a prospectus?",
      answer:
        "A prospectus is a legal document issued by the company offering the IPO that provides detailed information about the company, its business model, financials, management, and the risks involved.",
    },
  ];

  return (
    <div className="container">
      <div className="ipo-dashboard">
        <div className="ipo-list">
          <h2>Open & Upcoming IPOs</h2>
          <p>Open IPOs are initial public offerings recently available
             for investors to apply for shares at the offer price before
              they are listed on the stock exchange. This period Frequently
               lasts for a some days and Considering the high level of interest,
                Upcoming IPOs are expected to lead to such levels of participation
                 from them. You can also take a look at the tentative dates of IPOs 
                 lined up on this site.</p>
          <div className="table_ind">
            <table className="ipo_table">
              <thead className="ipo_thead">
                <tr className="ipo_thead_tablerow">
                  <th>Company Name</th>
                  <th>Open Date</th>
                  <th>Close Date</th>
                  <th>Issue Size</th>
                  <th>Price Range</th>
                  <th>Min Bid Amount</th>
                </tr>
              </thead>
              <tbody className="ipo_tablebody">
              {ipos.map((ipo, index) => (
                <tr key={index} onClick={() => handleNavigateToSubpage(ipo)}>
                  <td>
                    <div className="company-logo">
                      <div className="companylogo_inner">
                        <span>{ipo.company_name}</span>
                        <p>{ipo.ipo_switch}</p>
                      </div>
                      <div className="exchange-tags">
                        <img
                          src={images[ipo.logo]}
                          alt={`${ipo.amc_name} logo`}
                          className="amc-logo"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{ipo.open_date}</td>
                  <td>{ipo.close_date}</td>
                  <td className="text-right">₹ {ipo.issue_size}</td>
                  <td className="text-right">₹ {ipo.price_band}</td>
                  <td className="text-right">₹ {ipo.min_investment}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Rest of your code for FAQ and listed IPOs */}
      </div>
    </div>
  );
};

export default IPO;
