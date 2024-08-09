import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faChartLine, faMoneyCheckAlt, faCalculator } from '@fortawesome/free-solid-svg-icons';
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
    <div>
      <h1 className='calculator-name'>Calculator</h1>
      <div className="home-page">
        <Link onClick={scrollToTop} to="/sip-calculator" className="card-link">
          <div className="calculator-card">
            <FontAwesomeIcon icon={faHandshake} size="3x" className="icon" style={{color: "#33a7ff",}}/>
            <h3>SIP Calculator</h3>
            <p>Calculate investment returns with SIP return calculator to determine your maturity amount and returns.</p>
          </div>
        </Link>
        <Link onClick={scrollToTop} to="/emi-calculator" className="card-link">
          <div className="calculator-card">
            <FontAwesomeIcon icon={faChartLine} size="3x" className="icon" style={{color: "#33a7ff",}} />
            <h3>EMI Calculator</h3>
            <p>Calculate estimate of your monthly EMI amount and interest paid with our loan EMI calculator online.</p>
          </div>
        </Link>
        <Link onClick={scrollToTop} to="/fd-calculator" className="card-link">
          <div className="calculator-card">
            <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x" className="icon" style={{color: "#33a7ff",}}/>
            <h3>FD Calculator</h3>
            <p>Calculate investment returns and maturity value earned on FD schemes in India with our fixed deposit calculator.</p>
          </div>
        </Link>
        <Link onClick={scrollToTop} to="/lumpsum-calculator" className="card-link">
          <div className="calculator-card">
            <FontAwesomeIcon icon={faCalculator} size="3x" className="icon" style={{color: "#33a7ff",}}/>
            <h3>Lumpsum Calculator</h3>
            <p>Calculate investment returns with lumpsum return calculator to determine your maturity amount over a period of time.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Calculate;
