import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <div className="Nav_toggle">
        <button
          className="navbar-burger self-center xl:hidden"
          onClick={toggleMenu}
          style={{
            width: "35px",
            height: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
          }}
        >
          {showMenu ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.94004 6L11.14 1.80667C11.2656 1.68113 11.3361 1.51087 11.3361 1.33333C11.3361 1.1558 11.2656 0.985537 11.14 0.860002C11.0145 0.734466 10.8442 0.66394 10.6667 0.66394C10.4892 0.66394 10.3189 0.734466 10.1934 0.860002L6.00004 5.06L1.80671 0.860002C1.68117 0.734466 1.51091 0.663941 1.33337 0.663941C1.15584 0.663941 0.985576 0.734466 0.860041 0.860002C0.734505 0.985537 0.66398 1.1558 0.66398 1.33333C0.66398 1.51087 0.734505 1.68113 0.860041 1.80667L5.06004 6L0.860041 10.1933C0.797555 10.2553 0.747959 10.329 0.714113 10.4103C0.680267 10.4915 0.662842 10.5787 0.662842 10.6667C0.662842 10.7547 0.680267 10.8418 0.714113 10.9231C0.747959 11.0043 0.797555 11.078 0.860041 11.14C0.922016 11.2025 0.99575 11.2521 1.07699 11.2859C1.15823 11.3198 1.24537 11.3372 1.33337 11.3372C1.42138 11.3372 1.50852 11.3198 1.58976 11.2859C1.671 11.2521 1.74473 11.2025 1.80671 11.14L6.00004 6.94L10.1934 11.14C10.2554 11.2025 10.3291 11.2521 10.4103 11.2859C10.4916 11.3198 10.5787 11.3372 10.6667 11.3372C10.7547 11.3372 10.8419 11.3198 10.9231 11.2859C11.0043 11.2521 11.0781 11.2025 11.14 11.14C11.2025 11.078 11.2521 11.0043 11.286 10.9231C11.3198 10.8418 11.3372 10.7547 11.3372 10.6667C11.3372 10.5787 11.3198 10.4915 11.286 10.4103C11.2521 10.329 11.2025 10.2553 11.14 10.1933L6.94004 6Z"
                fill="#556987"
              ></path>
            </svg>
          ) : (
            <svg
              width="35"
              height="35"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                className="text-coolGray-50"
                width="32"
                height="32"
                rx="6"
                fill="transparent"
              ></rect>
              <path
                className="text-coolGray-500"
                d="M7 12H25C25.2652 12 25.5196 11.8946 25.7071 11.7071C25.8946 11.5196 26 11.2652 26 11C26 10.7348 25.8946 10.4804 25.7071 10.2929C25.5196 10.1054 25.2652 10 25 10H7C6.73478 10 6.48043 10.1054 6.29289 10.2929C6.10536 10.4804 6 10.7348 6 11C6 11.2652 6.10536 11.5196 6.29289 11.7071C6.48043 11.8946 6.73478 12 7 12ZM25 15H7C6.73478 15 6.48043 15.1054 6.29289 15.2929C6.10536 15.4804 6 15.7348 6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H25C25.2652 17 25.5196 16.8946 25.7071 16.7071C25.8946 16.5196 26 16.2652 26 16C26 15.7348 25.8946 15.4804 25.7071 15.2929C25.5196 15.1054 25.2652 15 25 15ZM25 20H7C6.73478 20 6.48043 20.1054 6.29289 20.2929C6.10536 20.4804 6 20.7348 6 21C6 21.2652 6.10536 21.5196 6.29289 21.7071C6.48043 21.8946 6.73478 22 7 22H25C25.2652 22 25.5196 21.8946 25.7071 21.7071C25.8946 21.5196 26 21.2652 26 21C26 20.7348 25.8946 20.4804 25.7071 20.2929C25.5196 20.1054 25.2652 20 25 20Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div className="Navbar1">
        <div className={` Nav_bottom ${showMenu ? "open" : ""}`}>
          <div className="navbar">
            <nav className="Nav">
              <ul className="nav_ul">
                <li className="dropdown">
                  <NavLink to="/" onClick={() => setShowMenu(!showMenu)}>
                    Home
                  </NavLink>
                </li>
                <li className="dropdown">
                  Market
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink
                        to="/indices"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Indices
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/worldindices"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        World Indices
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/futures-margins"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Future Margin
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/ipo" onClick={() => setShowMenu(!showMenu)}>
                        IPO
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/cryptocurrency"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Crypto Currency
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/forex"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Forex
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  Mutual Funds
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/amc"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        AMC Funds
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/equity-fund"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Equity Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/debt-fund"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Debt Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/hybrid-fund"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Hybrid Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/index-fund"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Index Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/elss-fund"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        ELSS Fund
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  Insurance
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/general-insurance">
                        General Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/life-insurance">
                        Life Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/health-insurance">
                        Health Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/car-insurance">
                        Car Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/bike-insurance">
                        Bike Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/term-insurance">
                        Term Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/travel-insurance">
                        Travel Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/business-insurance">
                        Business Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/pet-insurance">
                        Pet Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/Insurance/fire-insurance">
                        Fire Insurance
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  Finance Institutes
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/insurance-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Insurance Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/broker-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Broker Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/fintech-company"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Fintech Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/crypto-currency-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Crypto Currency Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/bank"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Banks
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/small-finance-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Small Finance Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/investment-management-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Investment Management Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/analysis-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Analysis Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/funding-companies-list"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Funding Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/CA-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        CA Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="finance-companies/CS-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        CS Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/international-money-transfer-companies"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        International Money Transfer Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/payment-gateways"
                        onClick={() => setShowMenu(!showMenu)}
                      >
                        Payment Gateways{" "}
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  Loans
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink to="/loans/personal_loan">Personal Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/home_loan">Home Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/gold_loan">Gold Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/auto_loan">Auto Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/business_loan">Business Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/mortgage_loan">Mortgage Loan</NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink to="/loans/student_loan">Student Loan</NavLink>
                    </li>
                  </ul>
                </li>
                {/* <li className='dropdown'>
                  News
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className='dropdown-menu'>
                    <li className='dropmenu-li'><NavLink to="/news/business_news">Business News</NavLink></li>
                    <li className='dropmenu-li'><NavLink to="/news/political_news">Political News</NavLink></li>
                    <li className='dropmenu-li'><NavLink to="/news/economy_news">Economy News</NavLink></li>
                    <li className='dropmenu-li'><NavLink to="/news/world_news">World News</NavLink></li>
                  </ul>
                </li> */}
                <li className="dropdown">
                  Calculators
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                  <ul className="dropdown-menu">
                    <li className="dropmenu-li">
                      <NavLink
                        to="/sip-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        SIP Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/emi-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        EMI Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/lumpsum-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        Lumpsum Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/fd-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        FD Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/yearly-sip-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        Yearly SIP Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/cagr-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        CAGR Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/rd-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        RD Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/ppf-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        PPF Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/ci-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        Compound Interest Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/si-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        Simple Interest Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/roi-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        ROI Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/nps-calculator"
                        onClick={() => {
                          scrollToTop();
                          setShowMenu(!showMenu);
                        }}
                      >
                        NPS Calculator
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
