import React from "react";
import "../style/Footer.css";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer_row">
          <div className="footer_top">
            <div className="footertop_left">
              <div className="footer_links">
                <div className="footer_card">
                  <h3>Calculators</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/sip-calculator"
                        onClick={scrollToTop}
                      >
                        SIP Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/emi-calculator"
                        onClick={scrollToTop}
                      >
                        EMI Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/fd-calculator"
                        onClick={scrollToTop}
                      >
                        FD Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/lumpsum-calculator"
                        onClick={scrollToTop}
                      >
                        Lumpsum Calculatoe{" "}
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/yearly-sip-calculator"
                        onClick={scrollToTop}
                      >
                        Yearly Sip Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/cagr-calculator"
                        onClick={scrollToTop}
                      >
                        CAGR Calculator{" "}
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/rd-calculator"
                        onClick={scrollToTop}
                      >
                        RD Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/ppf-calculator"
                        onClick={scrollToTop}
                      >
                        PPF Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/si-calculator"
                        onClick={scrollToTop}
                      >
                        Simple Interest Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/ci-calculator"
                        onClick={scrollToTop}
                      >
                        Compound Interest Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/roi-calculator"
                        onClick={scrollToTop}
                      >
                        ROI Calculator
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/nps-calculator"
                        onClick={scrollToTop}
                      >
                        NPS Calculator
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer_card">
                  <h3>Insurance</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/general-insurance"
                        onClick={scrollToTop}
                      >
                        General Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/life-insurance"
                        onClick={scrollToTop}
                      >
                        Life Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/health-insurance"
                        onClick={scrollToTop}
                      >
                        Health Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/car-insurance"
                        onClick={scrollToTop}
                      >
                        Car Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/bike-insurance"
                        onClick={scrollToTop}
                      >
                        Bike Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/term-insurance"
                        onClick={scrollToTop}
                      >
                        Term Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/travel-insurance"
                        onClick={scrollToTop}
                      >
                        Travel Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/business-insurance"
                        onClick={scrollToTop}
                      >
                        Business Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/pet-insurance"
                        onClick={scrollToTop}
                      >
                        Pet Insurance
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/Insurance/fire-insurance"
                        onClick={scrollToTop}
                      >
                        Fire Insurance
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer_card">
                  <h3>Loan</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/personal_loan"
                        onClick={scrollToTop}
                      >
                        Personal Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/home_loan"
                        onClick={scrollToTop}
                      >
                        Home Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/gold_loan"
                        onClick={scrollToTop}
                      >
                        Gold Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/auto_loan"
                        onClick={scrollToTop}
                      >
                        Auto Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/business_loan"
                        onClick={scrollToTop}
                      >
                        Business Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/mortgage_loan"
                        onClick={scrollToTop}
                      >
                        Mortgage Loan
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/loans/student_loan"
                        onClick={scrollToTop}
                      >
                        Student Loan
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer_card">
                  <h3>Mutual Funds</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/mutual-funds/equity-fund"
                        onClick={scrollToTop}
                      >
                        Equity Funds
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/mutual-funds/debt-fund"
                        onClick={scrollToTop}
                      >
                        Debt Funds
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/mutual-funds/hybrid-fund"
                        onClick={scrollToTop}
                      >
                        Hybrid Funds
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/mutual-funds/index-fund"
                        onClick={scrollToTop}
                      >
                        Index Funds
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/mutual-funds/elss-fund"
                        onClick={scrollToTop}
                      >
                        Elss Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer_card">
                  <h3>Quick links</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/indices"
                        onClick={scrollToTop}
                      >
                        {" "}
                        Indices
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/market/worldindices"
                        onClick={scrollToTop}
                      >
                        World Indices
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/futures-margins"
                        onClick={scrollToTop}
                      >
                        {" "}
                        Future Margin
                      </Link>
                    </li>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/ipo"
                        onClick={scrollToTop}
                      >
                        IPO
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="footer_card">
                  <h3>General Link</h3>
                  <ul>
                    <li className="footercard_links">
                      <Link
                        className="footer_after_line"
                        to="/holidays"
                        onClick={scrollToTop}
                      >
                        {" "}
                        Holidays list
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_bottom">
            <div className="footer_left">
              <div className="footer_content">
                <p>
                  Copyright 2024
                  <a href="https://silverwebbuzz.com/" target="/">
                    ©Silverwebbuzz
                  </a>
                  . All rights reserved.
                </p>
              </div>
            </div>
            <div className="footer_right">
              <div className="bottom_socialicon">
                <ul>
                  <li className="social_icon">
                    <a
                      className="si"
                      href="https://www.linkedin.com/company/market-status/"
                      target="/"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <path
                            d="M9.71205 8.52046C10.0249 8.04712 10.4629 7.68842 10.9968 7.42586C11.7018 7.07825 12.4609 6.96731 13.2577 7.00799C13.6581 7.03018 14.0544 7.07455 14.4423 7.1707C15.677 7.48503 16.382 8.24311 16.7157 9.31552C16.9076 9.93678 16.9826 10.5728 16.991 11.2126C17.0035 13.0616 16.9993 14.9106 16.9993 16.7632C16.9993 16.9962 16.9952 16.9999 16.7282 16.9999C15.7688 16.9999 14.8052 16.9962 13.8458 16.9999C13.6456 16.9999 13.5789 16.9481 13.583 16.7669C13.5914 15.1842 13.5914 13.6015 13.583 12.0187C13.583 11.5935 13.5538 11.1645 13.4287 10.7503C13.266 10.2178 12.924 9.82954 12.2857 9.726C11.8436 9.65574 11.3931 9.66313 10.9634 9.81105C10.4963 9.97007 10.2043 10.2807 10.0291 10.6875C9.8497 11.1164 9.79964 11.5676 9.79964 12.015C9.7913 13.5867 9.79964 15.1583 9.79547 16.73C9.79547 16.9075 9.69536 16.9962 9.49514 16.9962C8.54825 16.9962 7.60136 16.9962 6.65031 16.9962C6.38334 16.9962 6.375 16.9925 6.375 16.7632C6.375 13.668 6.375 10.5728 6.375 7.47763C6.375 7.24466 6.37917 7.24096 6.64613 7.24096C7.56799 7.24096 8.48985 7.24096 9.40754 7.24096C9.65365 7.24096 9.66199 7.24836 9.66199 7.47394C9.66199 7.81785 9.66199 8.15806 9.66199 8.50197C9.67868 8.50567 9.69536 8.51307 9.71205 8.51676V8.52046Z"
                            fill="white"
                          />
                          <path
                            d="M0.548828 12.015C0.548828 10.4317 0.548828 8.84464 0.548828 7.26136C0.548828 7.00379 0.548828 7 0.911633 7C2.09852 7 3.28541 7.00379 4.46712 7C4.7159 7 4.79883 7.05303 4.79883 7.23863C4.79364 10.4128 4.79364 13.5907 4.79883 16.7649C4.79883 16.9543 4.71072 17.0035 4.46712 16.9997C3.28023 16.9921 2.09334 16.9997 0.911633 16.9997C0.548828 16.9997 0.548828 16.9997 0.548828 16.7384C0.548828 15.1664 0.548828 13.5945 0.548828 12.0188V12.015Z"
                            fill="white"
                          />
                          <path
                            d="M2.125 3.99948C0.959821 3.99948 0 3.09896 0 1.9974C0 0.900027 0.959821 -0.000488281 2.12946 -0.000488281C3.28125 -0.000488281 4.24553 0.904216 4.25 1.98902C4.25 3.08221 3.28571 3.99948 2.125 3.99948Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li className="social_icon">
                    <a
                      className="si"
                      href="https://x.com/MarketStat82237"
                      target="/"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          width="24"
                          viewBox="0 0 512 512"
                        >
                          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                        </svg>
                      </span>
                    </a>
                  </li>
                  <li className="social_icon">
                    <a
                      className="si"
                      href="https://www.instagram.com/marketstatus_in/"
                      target="/"
                    >
                      <span>
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                              fill="#ffffff"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
