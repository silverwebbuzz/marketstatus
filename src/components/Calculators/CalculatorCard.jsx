import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faChartLine,
  faMoneyCheckAlt,
  faCalculator,
  faCalendarDays,
  faMoneyBillTrendUp,
  faMagnifyingGlassDollar,
  faCoins,
  faHandHoldingDollar,
  faMoneyBillTransfer,
  faCommentsDollar,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../style/calculators/calculatorcard.css";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function Calculate() {
  return (
    <>
      <section className="calc_card_dash">
        <div className="container">
          <h1 className="calculator-name">Calculator</h1>
          <div className="calculator-grid">
            <div className="calculator_card">
                  <FontAwesomeIcon icon={faHandshake} size="3x" className="icon"/>
                  <h3>SIP Calculator</h3>
                  <p className="calc_description"> Calculate investment returns with SIP return calculator to determine your maturity amount and returns. </p>
                <Link onClick={scrollToTop} to="/sip-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faChartLine} size="3x" className="icon"/>
                  <h3>EMI Calculator</h3>
                  <p className="calc_description"> Calculate estimate of your monthly EMI amount and interest paid with our loan EMI calculator online.</p>
                </div>
                <Link onClick={scrollToTop} to="/emi-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x" className="icon"/>
                  <h3>FD Calculator</h3>
                  <p className="calc_description"> Calculate investment returns and maturity value earned on FD schemes in India with our fixed deposit calculator.</p>
                </div>
                <Link onClick={scrollToTop} to="/fd-calculator" className="card_link" ></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faCalculator} size="3x" className="icon"/>
                  <h3>Lumpsum Calculator</h3>
                  <p className="calc_description">Calculate investment returns with lumpsum return calculator to determine your maturity amount over a period of time. </p>
                </div>
                <Link onClick={scrollToTop} to="/lumpsum-calculator" className="card_link" ></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faCalendarDays} size="3x" className="icon"/>
                  <h3>Yearly SIP Calculator</h3>
                  <p className="calc_description">Calculate returns easily on your annual or yearly SIP investment in MF, stocks and ETFs. </p>
                </div>
                <Link onClick={scrollToTop} to="/yearly-sip-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} size="3x"className="icon"/>
                  <h3>CAGR Calculator</h3>
                  <p className="calc_description"> Compound Annual Growth Rate (CAGR) measures the mean annual growth rate of an investment over a specified time period. </p>
                </div>
                <Link onClick={scrollToTop} to="/cagr-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faCoins} size="3x" className="icon" />
                  <h3>RD Calculator</h3>
                  <p className="calc_description">Calculate investment returns and maturity value earned on recurring deposits schemes in India with our recurring deposit calculator.</p>
                </div>
                <Link onClick={scrollToTop} to="/rd-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faMoneyBillTransfer} size="3x"className="icon"/>
                  <h3>PPF Calculator</h3>
                  <p className="calc_description"> Calculate and understand the amount of money you will accumulate in your public provident fund account with our PPF return calculator. </p>
                </div>
                <Link onClick={scrollToTop} to="/ppf-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faCommentsDollar} size="3x" className="icon"/>
                  <h3>Compound Interest Calculator</h3>
                  <p className="calc_description"> Calculate and understand your investment returns over a period of time with our online compound return calculator in minutes! </p>
                </div>
                <Link onClick={scrollToTop} to="/ci-calculator" className="card_link" ></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faHandHoldingDollar} size="3x" className="icon"/>
                  <h3>Simple Interest Calculator</h3>
                  <p className="calc_description"> Calculate and understand the fixed interest amount on your invested or deposit amount.</p>
                </div>
                <Link onClick={scrollToTop} to="/si-calculator" className="card_link"></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faCircleDollarToSlot}size="3x" className="icon" />
                  <h3>ROI Calculator</h3>
                  <p className="calc_description"> Calculate absolue return and annual return on your investments using this ROI calculator. </p>
                </div>
                <Link onClick={scrollToTop} to="/roi-calculator" className="card_link" ></Link>
            </div>
            <div className="calculator_card">
                <div>
                  <FontAwesomeIcon icon={faMagnifyingGlassDollar} size="3x" className="icon"/>
                  <h3>NPS Calculator</h3>
                  <p className="calc_description"> Calculate monthly pension and lumpsum amount to be received on retirement with our online national pension schemecalculator. </p>
                </div>
                <Link onClick={scrollToTop} to="/nps-calculator" className="card_link"></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Calculate;
