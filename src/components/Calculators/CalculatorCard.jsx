import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faChartLine, faMoneyCheckAlt, faCalculator, faCalendarDays, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../../style/calculators/calculatorcard.css';

const scrollToTop = () => {
  window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
};

function Calculate() {
  return (
    <div className="calculator-container">
      <h1 className='calculator-name'>Calculator</h1>
      <div className="calculator-grid">
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/sip-calculator" className="card_link">
            <FontAwesomeIcon icon={faHandshake} size="3x" className="icon" />
            <h3>SIP Calculator</h3>
            <p className='calc_description'>Calculate investment returns with SIP return calculator to determine your maturity amount and returns.</p>          
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/emi-calculator" className="card_link">
            <FontAwesomeIcon icon={faChartLine} size="3x" className="icon"/>
            <h3>EMI Calculator</h3>
            <p className='calc_description'>Calculate estimate of your monthly EMI amount and interest paid with our loan EMI calculator online.</p>
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/fd-calculator" className="card_link">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x" className="icon" />
            <h3>FD Calculator</h3>
            <p className='calc_description'>Calculate investment returns and maturity value earned on FD schemes in India with our fixed deposit calculator.</p>
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/lumpsum-calculator" className="card_link">
            <FontAwesomeIcon icon={faCalculator} size="3x" className="icon" />
            <h3>Lumpsum Calculator</h3>
            <p className='calc_description'>Calculate investment returns with lumpsum return calculator to determine your maturity amount over a period of time.</p>
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/yearly-sip-calculator" className="card_link">
            <FontAwesomeIcon icon={faCalendarDays} size="3x" className="icon" />
            <h3>Yearly SIP Calculator</h3>
            <p className='calc_description'>Calculate returns easily on your annual or yearly SIP investment in MF, stocks and ETFs.</p>
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/cagr-calculator" className="card_link">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} size="3x" className="icon" />
            <h3>CAGR Calculator</h3>
            <p className='calc_description'>Compound Annual Growth Rate (CAGR) measures the mean annual growth rate of an investment over a specified time period.</p>
          </Link>
        </div>
        <div className="calculator_card">
          <Link onClick={scrollToTop} to="/" className="card_link">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} size="3x" className="icon" />
            <h3>RD Calculator</h3>
            <h5>Coming soon !!</h5>
            <p className='calc_description'>Calculate investment returns and maturity value earned on recurring deposits schemes in India with our recurring deposit calculator.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Calculate;