import React, { useState } from "react";
import "../../style/calculators/ppf.css";
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
  faCommentsDollar,
  faCalendarDays,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Slider, Box, Typography, TextField } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksPpfAmount = [
  { value: 500, label: "₹ 500" },
  { value: 150000, label: "₹ 1,50,000" },
];

const marksPpfTenure = [
  { value: 15, label: "15 Years" },
  { value: 50, label: "50 Years" },
];

const PPF = () => {
  const [ppfAmount, setPpfAmount] = useState(50000);
  const [ppfTenure, setPpfTenure] = useState(15);
  const returnRate = 7.1;

  const handlePpfAmountChange = (event, newValue) => {
    setPpfAmount(newValue);
  };

  const handlePpfTenureChange = (event, newValue) => {
    setPpfTenure(newValue);
  };

  const calculatePpf = (annualInvestment, rate, tenureYears) => {
    const yearlyRate = rate / 100;
    let maturityValue = 0;

    for (let i = 0; i < tenureYears; i++) {
      maturityValue = (maturityValue + annualInvestment) * (1 + yearlyRate);
    }

    return maturityValue.toFixed(2);
  };

  const futureValue = calculatePpf(ppfAmount, returnRate, ppfTenure);
  const investedAmount = ppfAmount * ppfTenure;
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
      <div className="PPF_row">
        <h1 className="ppf-h1">PPF Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="ppf_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Yearly PPF Investment</label>
                  <TextField
                    type="number"
                    value={ppfAmount}
                    onChange={(e) => setPpfAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={ppfAmount}
                    onChange={handlePpfAmountChange}
                    min={500}
                    max={150000}
                    step={100}
                    marks={marksPpfAmount}
                    valueLabelDisplay="auto"
                  />
                </div>

                <div className="input-group">
                  <label>Time Period (in years)</label>
                  <TextField
                    type="number"
                    value={ppfTenure}
                    onChange={(e) => setPpfTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={ppfTenure}
                    onChange={handlePpfTenureChange}
                    min={15}
                    max={50}
                    step={1}
                    marks={marksPpfTenure}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Current Rate of Interest</label>
                  <TextField
                    type="number"
                    value={returnRate}
                    InputProps={{ readOnly: true }}
                    size="small"
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
            <div className="chart-container-ppf">
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

export default PPF;
