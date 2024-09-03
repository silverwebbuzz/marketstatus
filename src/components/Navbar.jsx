import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  // const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? "" : dropdown));
  };

  const closeMenuOnClick = () => {
    if (window.innerWidth <= 767) {
      setShowMenu(false);
      setActiveDropdown("");
    }
  };
  //const handleOpen = () => {
  //  setOpen(!open);
  //};
  // const handleOpen = () => {
  //    if (window.innerWidth <= 767) {
  //      setOpen(!open);
  //    }
  //  };

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
                  <NavLink to="/" onClick={closeMenuOnClick}>
                    {/* onClick={() => setShowMenu(!showMenu)} */}
                    Home
                  </NavLink>
                </li>
                <li className="dropdown">
                  <span onClick={() => toggleDropdown("market")}>
                     Market 
                    <FontAwesomeIcon
                      className="faCaretDown"
                      icon={faCaretDown}
                    />
                  </span>
                  <ul className={`dropdown-menu ${ activeDropdown === "market" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                    <NavLink to="/indices" onClick={closeMenuOnClick}>
                       Indices
                   </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/worldindices"
                        onClick={closeMenuOnClick}
                      >
                        World Indices
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/futures-margins"
                        onClick={closeMenuOnClick}
                      >
                        Future Margin
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/ipo"
                        onClick={closeMenuOnClick}
                      >
                        IPO
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/cryptocurrency"
                        onClick={closeMenuOnClick}
                      >
                        Crypto Currency
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/market/forex"
                        onClick={closeMenuOnClick}
                      >
                        Forex
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                <span onClick={() => toggleDropdown("mutualFunds")}>
                  Mutual Funds
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                </span>
                <ul className={`dropdown-menu ${activeDropdown === "mutualFunds" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/amc"
                        onClick={closeMenuOnClick}
                      >
                        AMC Funds
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/equity-fund"
                        onClick={closeMenuOnClick}
                      >
                        Equity Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/debt-fund"
                        onClick={closeMenuOnClick}
                      >
                        Debt Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/hybrid-fund"
                        onClick={closeMenuOnClick}
                      >
                        Hybrid Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/index-fund"
                        onClick={closeMenuOnClick}
                      >
                        Index Fund
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/mutual-funds/elss-fund"
                        onClick={closeMenuOnClick}
                      >
                        ELSS Fund
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown" >
                <span onClick={() => toggleDropdown("Insurance")}>
                  Insurance
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                </span>  
                <ul className={`dropdown-menu ${activeDropdown === "Insurance" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/general-insurance"
                        smooth={true}
                        onClick={closeMenuOnClick}
                      >
                        General Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/life-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Life Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/health-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Health Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/car-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Car Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/bike-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Bike Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/term-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Term Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/travel-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Travel Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/business-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Business Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/pet-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Pet Insurance
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/Insurance/fire-insurance"
                        onClick={closeMenuOnClick}
                      >
                        Fire Insurance
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                <span onClick={() => toggleDropdown("Finance Institutes")}>
                  Finance Institutes
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                </span>  
                <ul className={`dropdown-menu ${activeDropdown === "Finance Institutes" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/insurance-companies"
                        onClick={closeMenuOnClick}
                      >
                        Insurance Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/broker-companies"
                        onClick={closeMenuOnClick}
                      >
                        Broker Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/fintech-company"
                        onClick={closeMenuOnClick}
                      >
                        Fintech Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/micro-finance-companies"
                        onClick={closeMenuOnClick}
                      >
                        Micro Finance Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/payment-gateways"
                        onClick={closeMenuOnClick}
                      >
                        Payment Gateways{" "}
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/crypto-currency-companies"
                        onClick={closeMenuOnClick}
                      >
                        Crypto Currency Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/bank"
                        onClick={closeMenuOnClick}
                      >
                        Banks
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/investment-management-companies"
                        onClick={closeMenuOnClick}
                      >
                        Investment Management Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/analysis-companies"
                        onClick={closeMenuOnClick}
                      >
                        Analysis Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/funding-companies-list"
                        onClick={closeMenuOnClick}
                      >
                        Funding Companies list
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/CA-companies"
                        onClick={closeMenuOnClick}
                      >
                        CA Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="finance-companies/CS-companies"
                        onClick={closeMenuOnClick}
                      >
                        CS Companies
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/finance-companies/international-money-transfer-companies"
                        onClick={closeMenuOnClick}
                      >
                        International Money Transfer Companies
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                <span onClick={() => toggleDropdown("Loans")}>
                  Loans
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                </span>
                <ul className={`dropdown-menu ${activeDropdown === "Loans" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/personal_loan"
                        onClick={closeMenuOnClick}
                      >
                        Personal Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/home_loan"
                        onClick={closeMenuOnClick}
                      >
                        Home Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/gold_loan"
                        onClick={closeMenuOnClick}
                      >
                        Gold Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/auto_loan"
                        onClick={closeMenuOnClick}
                      >
                        Auto Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/business_loan"
                        onClick={closeMenuOnClick}
                      >
                        Business Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/mortgage_loan"
                        onClick={closeMenuOnClick}
                      >
                        Mortgage Loan
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/loans/student_loan"
                        onClick={closeMenuOnClick}
                      >
                        Student Loan
                      </NavLink>
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
                <li className="dropdown" >
                <span onClick={() => toggleDropdown("Calculators")}>
                  Calculators
                  <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
                </span>
                <ul className={`dropdown-menu ${activeDropdown === "Calculators" ? "show" : ""}`}>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/sip-calculator"
                        onClick={closeMenuOnClick}
                      >
                        SIP Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/emi-calculator"
                        onClick={closeMenuOnClick}
                      >
                        EMI Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/lumpsum-calculator"
                        onClick={closeMenuOnClick}
                      >
                        Lumpsum Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/fd-calculator"
                        onClick={closeMenuOnClick}
                      >
                        FD Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/yearly-sip-calculator"
                        onClick={closeMenuOnClick}
                      >
                        Yearly SIP Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/cagr-calculator"
                        onClick={closeMenuOnClick}
                      >
                        CAGR Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/rd-calculator"
                        onClick={closeMenuOnClick}
                      >
                        RD Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/ppf-calculator"
                        onClick={closeMenuOnClick}
                      >
                        PPF Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/ci-calculator"
                        onClick={closeMenuOnClick}
                      >
                        Compound Interest Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/si-calculator"
                        onClick={closeMenuOnClick}
                      >
                        Simple Interest Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/roi-calculator"
                        onClick={closeMenuOnClick}
                      >
                        ROI Calculator
                      </NavLink>
                    </li>
                    <li className="dropmenu-li">
                      <NavLink
                        to="/nps-calculator"
                        onClick={closeMenuOnClick}
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
// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState("");

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown((prev) => (prev === dropdown ? "" : dropdown));
//   };

//   const closeMenuOnClick = () => {
//     if (window.innerWidth <= 767) {
//       setShowMenu(false);
//       setActiveDropdown("");
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="container">
//       {/* Burger Menu Button */}
//       <div className="Nav_toggle">
//         <button
//           className="navbar-burger self-center xl:hidden"
//           onClick={toggleMenu}
//           style={{
//             width: "35px",
//             height: "35px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             padding: "0",
//           }}
//         >
//           {showMenu ? (
//             <svg
//               width="12"
//               height="12"
//               viewBox="0 0 12 12"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {/* SVG path for close icon */}
//             </svg>
//           ) : (
//             <svg
//               width="35"
//               height="35"
//               viewBox="0 0 32 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {/* SVG path for menu icon */}
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Navbar Links */}
//       <div className="Navbar1">
//         <div className={`Nav_bottom ${showMenu ? "open" : ""}`}>
//           <nav className="Nav">
//             <ul className="nav_ul">
//               <li>
//                 <NavLink to="/" onClick={closeMenuOnClick}>
//                   Home
//                 </NavLink>
//               </li>

//               {/* Market Dropdown */}
//               <li className="dropdown">
//                 <span onClick={() => toggleDropdown("market")}>
//                   Market
//                   <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
//                 </span>
//                 <ul className={`dropdown-menu ${ activeDropdown === "market" ? "show" : ""}`}>
//                   {/* List of dropdown items */}
//                   <li className="dropmenu-li">
//                     <NavLink to="/indices" onClick={closeMenuOnClick}>
//                       Indices
//                     </NavLink>
//                   </li>
//                   {/* Add other dropdown items similarly */}
//                 </ul>
//               </li>

//               {/* Mutual Funds Dropdown */}
//               <li className="dropdown">
//                 <span onClick={() => toggleDropdown("mutualFunds")}>
//                   Mutual Funds
//                   <FontAwesomeIcon className="faCaretDown" icon={faCaretDown} />
//                 </span>
//                 <ul className={`dropdown-menu ${activeDropdown === "mutualFunds" ? "show" : ""}`}>
//                   {/* List of dropdown items */}
//                   <li className="dropmenu-li">
//                     <NavLink to="/mutual-funds/amc" onClick={closeMenuOnClick}>
//                       AMC Funds
//                     </NavLink>
//                   </li>
//                   {/* Add other dropdown items similarly */}
//                 </ul>
//               </li>

//               {/* Repeat for other dropdown sections like Insurance, Finance Institutes, Loans, etc. */}

//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
