import React, { useState } from "react";
import "../../style/calculators/emi.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faMoneyCheckAlt,
  faCalculator,
  faCalendarDays,
  faHandHoldingDollar,
  faMoneyBillTrendUp,
  faCoins,
  faMoneyBillTransfer,
  faCommentsDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import {
  Slider,
  Box,
  Typography,
  TextField,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksEmiAmount = [
  { value: 100000, label: "₹ 100000" },
  { value: 10000000, label: "₹ 1,00,00,000" },
];

const marksInterestRate = [
  { value: 1, label: "1%" },
  { value: 30, label: "30%" },
];

const marksLoanTenure = [
  { value: 1, label: "1 yr" },
  { value: 40, label: "40 yr" },
];

const EmiCalculator = () => {
  const [emiAmount, setEmiAmount] = useState(100000);
  const [returnRate, setReturnRate] = useState(10);
  const [emiTenure, setLoanTenure] = useState(1);

  const handleEmiAmountChange = (event, newValue) => {
    setEmiAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const calculateEmi = (amount, rate, tenure) => {
    const monthlyRate = rate / 12 / 100;
    const numOfMonths = tenure * 12;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, numOfMonths)) / (Math.pow(1 + monthlyRate, numOfMonths) - 1);
    return emi.toFixed(2);
  };

  const emi = calculateEmi(emiAmount, returnRate, emiTenure);
  const totalPayment = (emi * emiTenure * 12).toFixed(2);
  const totalInterest = (totalPayment - emiAmount).toFixed(2);

  const data = {
    labels: ["Principal Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [emiAmount, totalInterest],
        backgroundColor: ["#9f9f9f", "#2c9430"],
        hoverBackgroundColor: ["#666667", "#265628"],
      },
    ],
  };

  const options = {
    cutout: '80%', 
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
  };


  return (
    <div className="container">
      <div className="emicalculator_row">
        <h1 className="emi_h1">EMI Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="emi_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Loan Amount</label>
                  <TextField
                    type="number"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={emiAmount}
                    onChange={handleEmiAmountChange}
                    min={100000}
                    max={10000000}
                    step={10000}
                    marks={marksEmiAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Rate of Interest (p.a)</label>
                  <TextField
                    type="number"
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={returnRate}
                    onChange={handleInterestRateChange}
                    min={1}
                    max={30}
                    step={0.5}
                    marks={marksInterestRate}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Loan Tenure</label>
                  <TextField
                    type="number"
                    value={emiTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={emiTenure}
                    onChange={handleLoanTenureChange}
                    min={1}
                    max={40}
                    step={1}
                    marks={marksLoanTenure}
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
              <div className="results">
                <Typography>
                  Monthly EMI:
                  <br /> ₹{formatNumber(emi)}
                </Typography>
                <Typography>
                  Total Interest:
                  <br /> ₹{formatNumber(totalInterest)}
                </Typography>
                <Typography>
                  Total Payment:
                  <br />{" "}
                  <span className="value-color">
                    ₹{formatNumber(totalPayment)}
                  </span>
                </Typography>
              </div>
            </div>
            <div className="chart-container-emi">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="similar_calculators">
        <h2>Similar Calculators</h2>
        <div className="calculator-grid">
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon icon={faHandshake} size="3x" className="icon" />
              <h3>SIP Calculator</h3>
              <p className="calc_description">
                Calculate investment returns with SIP return calculator to
                determine your maturity amount and returns.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/sip-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faMoneyCheckAlt}
                size="3x"
                className="icon"
              />
              <h3>FD Calculator</h3>
              <p className="calc_description">
                Calculate investment returns and maturity value earned on FD
                schemes in India with our fixed deposit calculator.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/fd-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon icon={faCalculator} size="3x" className="icon" />
              <h3>Lumpsum Calculator</h3>
              <p className="calc_description">
                Calculate investment returns with lumpsum return calculator to
                determine your maturity amount over a period of time.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/lumpsum-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="3x"
                className="icon"
              />
              <h3>Yearly SIP Calculator</h3>
              <p className="calc_description">
                Calculate returns easily on your annual or yearly SIP investment
                in MF, stocks and ETFs.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/yearly-sip-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faMoneyBillTrendUp}
                size="3x"
                className="icon"
              />
              <h3>CAGR Calculator</h3>
              <p className="calc_description">
                Compound Annual Growth Rate (CAGR) measures the mean annual
                growth rate of an investment over a specified time period.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/cagr-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon icon={faCoins} size="3x" className="icon" />
              <h3>RD Calculator</h3>
              <p className="calc_description">
                Calculate investment returns and maturity value earned on
                recurring deposits schemes in India with our recurring deposit
                calculator.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/rd-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faMoneyBillTransfer}
                size="3x"
                className="icon"
              />
              <h3>PPF Calculator</h3>
              <p className="calc_description">
                Calculate and understand the amount of money you will accumulate
                in your public provident fund account with our PPF return
                calculator.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/ppf-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faCommentsDollar}
                size="3x"
                className="icon"
              />
              <h3>Compound Interest Calculator</h3>
              <p className="calc_description">
                Calculate and understand your investment returns over a period
                of time with our online compound return calculator in minutes!
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/ci-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faCommentsDollar}
                size="3x"
                className="icon"
              />
              <h3>Compound Interest Calculator</h3>
              <p className="calc_description">
                Calculate and understand your investment returns over a period
                of time with our online compound return calculator in minutes!
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/ci-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                size="3x"
                className="icon"
              />
              <h3>Simple Interest Calculator</h3>
              <p className="calc_description">
                Calculate and understand the fixed interest amount on your
                invested or deposit amount.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/si-calculator"
              className="card_link"
            ></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;
