import React, { useState } from "react";
import "../../style/calculators/fd.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHandshake, faCalculator, faCalendarDays, faMoneyBillTrendUp,faCommentsDollar,faHandHoldingDollar, faCoins, faMoneyBillTransfer} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Slider,
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksFdAmount = [
  { value: 500, label: "₹ 500" },
  { value: 1000000, label: "₹ 10,00,000" },
];

const marksInterestRate = [
  { value: 1, label: "1%" },
  { value: 30, label: "30%" },
];

const marksLoanTenure = [
  { value: 1, label: "1 yr" },
  { value: 40, label: "40 yr" },
];

const FdCalculator = () => {
  const [fdFrequency, setFdFrequency] = useState("Monthly");
  const [fdAmount, setFdAmount] = useState(500);
  const [returnRate, setReturnRate] = useState(10);
  const [fdTenure, setLoanTenure] = useState(1);

  const handleFdFrequencyChange = (event, newFrequency) => {
    setFdFrequency(newFrequency);
  };

  const handleFdAmountChange = (event, newValue) => {
    setFdAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const calculateFd = (amount, rate, tenure, frequency) => {
    const annualRate = rate / 100;
    let n;
    switch (frequency) {
      case "Monthly":
        n = 12;
        break;
      case "Quarterly":
        n = 4;
        break;
      case "Half Yearly":
        n = 2;
        break;
      case "Yearly":
        n = 1;
        break;
      default:
        n = 1;
    }

    const futureValue = amount * Math.pow(1 + annualRate / n, n * tenure);
    return futureValue.toFixed(2);
  };

  const futureValue = calculateFd(fdAmount, returnRate, fdTenure, fdFrequency);
  const investedAmount = fdAmount;
  const totalReturn = (futureValue - investedAmount).toFixed(2);

  const data = {
    labels: ["Investment Amount", "Returns"],
    datasets: [
      {
        data: [investedAmount, totalReturn],
        backgroundColor: ["#9f9f9f", "#2c9430"],
        hoverBackgroundColor: ["#666667", "#265628"],
      },
    ],
  };

  const options = {
    cutout: "80%",  
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
      <div className="fdcalculator_row">
        <h1 className="fd_h1">FD Calculator</h1>
        <div className="calculator_box">
          <ToggleButtonGroup
            color="primary"
            value={fdFrequency}
            exclusive
            onChange={handleFdFrequencyChange}
            aria-label="FD Frequency"
          >
            <ToggleButton value="Monthly">Monthly</ToggleButton>
            <ToggleButton value="Quarterly">Quarterly</ToggleButton>
            <ToggleButton value="Half Yearly">Half Yearly</ToggleButton>
            <ToggleButton value="Yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
          <div className="calculator_container_box">
            <div className="fd_calculator_top">
              <Box>
                <div className="input-group">
                  <label>FD Investment</label>
                  <TextField
                    type="number"
                    value={fdAmount}
                    onChange={(e) => setFdAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={fdAmount}
                    onChange={handleFdAmountChange}
                    min={500}
                    max={1000000}
                    step={500}
                    marks={marksFdAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Expected Return Rate (p.a)</label>
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
                    step={0.1}
                    marks={marksInterestRate}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Time Period</label>
                  <TextField
                    type="number"
                    value={fdTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={fdTenure}
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
                  Investment Amount:
                  <br /> ₹{formatNumber(investedAmount)}
                </Typography>
                <Typography>
                  Estimated Returns:
                  <br /> ₹{formatNumber(totalReturn)}
                </Typography>
                <Typography>
                  Maturity Value:
                  <br />{" "}
                  <span className="value-color">
                    ₹{formatNumber(futureValue)}
                  </span>
                </Typography>
              </div>
            </div>
            <div className="chart-container-fd">
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
              <FontAwesomeIcon icon={faChartLine} size="3x" className="icon" />
              <h3>EMI Calculator</h3>
              <p className="calc_description">
                Calculate estimate of your monthly EMI amount and interest paid
                with our loan EMI calculator online.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/emi-calculator"
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
        </div>
      </div>
    </div>
  );
};

export default FdCalculator;
