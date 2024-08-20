import React, { useState } from "react";
import "../../style/calculators/si.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, TextField, Slider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faChartLine,
  faMoneyCheckAlt,
  faMagnifyingGlassDollar,
  faCalculator,
  faCalendarDays,
  faMoneyBillTrendUp,
  faCoins,
  faCircleDollarToSlot,
  faMoneyBillTransfer,
  faCommentsDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksSiAmount = [
  { value: 100, label: "₹ 100" },
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

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [annualRate, setAnnualRate] = useState(15);
  const [years, setYears] = useState(3);

  const handlePrincipalChange = (event, newValue) => {
    setPrincipal(newValue);
  };

  const handleAnnualRateChange = (event, newValue) => {
    setAnnualRate(newValue);
  };

  const handleYearsChange = (event, newValue) => {
    setYears(newValue);
  };

  const calculateSimpleInterest = (principal, rate, time) => {
    const simpleInterest = (principal * rate * time) / 100;
    const futureValue = principal + simpleInterest;
    return futureValue.toFixed(2);
  };

  const futureValue = calculateSimpleInterest(principal, annualRate, years);
  const investedAmount = principal;
  const totalReturn = (futureValue - investedAmount).toFixed(2);

  const data = {
    labels: ["Invested Amount", "Maturity Value"],
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
      <div className="SI_row">
        <h1 className="si-h1">Simple Interest Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="si_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Principal Amount</label>
                  <TextField
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={principal}
                    onChange={handlePrincipalChange}
                    min={100}
                    max={1000000}
                    step={100}
                    marks={marksSiAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Annual Interest Rate</label>
                  <TextField
                    type="number"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={annualRate}
                    onChange={handleAnnualRateChange}
                    min={1}
                    max={30}
                    step={0.1}
                    marks={marksInterestRate}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Time Period (years)</label>
                  <TextField
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={years}
                    onChange={handleYearsChange}
                    min={1}
                    max={40}
                    step={1}
                    marks={marksLoanTenure}
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
              <div className="results">
                <Typography component="div">
                  Principal Amount:
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
            <div className="chart-container-si">
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
                icon={faCircleDollarToSlot}
                size="3x"
                className="icon"
              />
              <h3>ROI Calculator</h3>
              <p className="calc_description">
                Calculate absolue return and annual return on your investments
                using this ROI calculator.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/roi-calculator"
              className="card_link"
            ></Link>
          </div>
          <div className="calculator_card">
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlassDollar}
                size="3x"
                className="icon"
              />
              <h3>NPS Calculator</h3>
              <p className="calc_description">
                Calculate monthly pension and lumpsum amount to be received on
                retirement with our online national pension scheme calculator.
              </p>
            </div>
            <Link
              onClick={scrollToTop}
              to="/nps-calculator"
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

export default SimpleInterestCalculator;
