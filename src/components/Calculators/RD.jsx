import React, { useState } from "react";
import "../../style/calculators/rd.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMoneyCheckAlt,
  faCalculator,
  faHandHoldingDollar,
  faHandshake,
  faMoneyBillTrendUp,
  faCalendarDays,
  faCommentsDollar,
  faMoneyBillTransfer
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Slider, Box, Typography, TextField } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksRdAmount = [
  { value: 500, label: "₹ 500" },
  { value: 1000000, label: "₹ 10,00,000" },
];

const marksInterestRate = [
  { value: 1, label: "1%" },
  { value: 15, label: "15%" },
];

const marksRdTenure = [
  { value: 1, label: "1 Month" },
  { value: 120, label: "120 Month" },
];

const RD = () => {
  const [rdAmount, setRdAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(7);
  const [rdTenure, setRdTenure] = useState(24);

  const handleRdAmountChange = (event, newValue) => {
    setRdAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleRdTenureChange = (event, newValue) => {
    setRdTenure(newValue);
  };

const calculateRd = (monthlyInvestment, rate, tenureMonths) => {
  const monthlyRate = rate / (12 * 100);
  const maturityValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, tenureMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  return maturityValue.toFixed(2);
};


  const futureValue = calculateRd(rdAmount, returnRate, rdTenure);
  const investedAmount = rdAmount * rdTenure;
  const totalReturn = (futureValue - investedAmount).toFixed(2);

  const data = {
    labels: ["Investment Amount", "Maturity Value"],
    datasets: [
      {
        data: [investedAmount, futureValue],
        backgroundColor: ["#9f9f9f", "#2c9430"],
        hoverBackgroundColor: ["#666667", "#265628"],
      },
    ],
  };

  const options = {
    cutout: "80%",
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container">
      <div className="RD_row">
        <h1 className="rd-h1">RD Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="rd_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Monthly RD Investment</label>
                  <TextField
                    type="number"
                    value={rdAmount}
                    onChange={(e) => setRdAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={rdAmount}
                    onChange={handleRdAmountChange}
                    min={500}
                    max={1000000}
                    step={100}
                    marks={marksRdAmount}
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
                    max={15}
                    step={0.1}
                    marks={marksInterestRate}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Time Period (in months)</label>
                  <TextField
                    type="number"
                    value={rdTenure}
                    onChange={(e) => setRdTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={rdTenure}
                    onChange={handleRdTenureChange}
                    min={1}
                    max={120}
                    step={1}
                    marks={marksRdTenure}
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
              <div className="results">
                <Typography component="div">
                  Investment Amount:
                  <br /> ₹{formatNumber(investedAmount)}
                </Typography>
                <Typography component="div">
                  Estimated Returns:
                  <br /> ₹{formatNumber(totalReturn)}
                </Typography>
                <Typography component="div">
                  Maturity Value:
                  <br />
                  <span className="value-color">
                    {" "}
                    ₹{formatNumber(futureValue)}
                  </span>
                </Typography>
              </div>
            </div>
            <div className="chart-container-rd">
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

export default RD;
