import React, { useState } from "react";
import "../../style/calculators/nps.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Slider, Box, Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMoneyCheckAlt,
  faCalculator,
  faHandHoldingDollar,
  faCircleDollarToSlot,
  faHandshake,
  faCoins,
  faMoneyBillTrendUp,
  faCalendarDays,
  faCommentsDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksInvestmentAmount = [
  { value: 1000, label: "₹ 1,000" },
  { value: 100000000, label: "₹ 1,00,00,000" },
];

const marksDuration = [
  { value: 1, label: "1 yr" },
  { value: 40, label: "40 yrs" },
];

const NPS = () => {
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [maturityValue, setMaturityValue] = useState(25000);
  const [duration, setDuration] = useState(10);

  const handleInvestmentAmountChange = (event, newValue) => {
    setInvestmentAmount(newValue);
  };

  const handleMaturityValueChange = (event, newValue) => {
    setMaturityValue(newValue);
  };

  const handleDurationChange = (event, newValue) => {
    setDuration(newValue);
  };

  const calculateGainLoss = (maturityValue, investmentAmount) => {
    return maturityValue - investmentAmount;
  };

  const calculateNPS = (gainLoss, investmentAmount) => {
    return ((gainLoss / investmentAmount) * 100).toFixed(2);
  };

  const calculateCAGR = (maturityValue, investmentAmount, duration) => {
    return (
      (Math.pow(maturityValue / investmentAmount, 1 / duration) - 1) *
      100
    ).toFixed(2);
  };

  const gainLoss = calculateGainLoss(maturityValue, investmentAmount);
  const nps = calculateNPS(gainLoss, investmentAmount);
  const cagr = calculateCAGR(maturityValue, investmentAmount, duration);

  const data = {
    labels: ["Investment Amount", "Maturity Value"],
    datasets: [
      {
        data: [investmentAmount, maturityValue],
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
      <div className="NPS_row">
        <h1 className="nps-h1">NPS Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="nps_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Initial Investment</label>
                  <TextField
                    type="number"
                    value={investmentAmount}
                    onChange={(e) =>
                      setInvestmentAmount(Number(e.target.value))
                    }
                    size="small"
                  />
                  <Slider
                    value={investmentAmount}
                    onChange={handleInvestmentAmountChange}
                    min={1000}
                    max={100000000}
                    step={1000}
                    marks={marksInvestmentAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Maturity Value</label>
                  <TextField
                    type="number"
                    value={maturityValue}
                    onChange={(e) => setMaturityValue(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={maturityValue}
                    onChange={handleMaturityValueChange}
                    min={1000}
                    max={100000000}
                    step={1000}
                    marks={marksInvestmentAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Duration of Investment (in years)</label>
                  <TextField
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={duration}
                    onChange={handleDurationChange}
                    min={1}
                    max={40}
                    step={1}
                    marks={marksDuration}
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
              <div className="results">
                <Typography component="div">
                  Gain / Loss:
                  <br /> ₹{formatNumber(gainLoss)}
                </Typography>
                <Typography component="div">
                  Return on Investment:
                  <br />
                  <span className="value-color">{nps}%</span>
                </Typography>
                <Typography component="div">
                  Annual Growth:
                  <br /> {cagr}%
                </Typography>
              </div>
            </div>
            <div className="chart-container-nps">
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
        </div>
      </div>
    </div>
  );
};

export default NPS;
