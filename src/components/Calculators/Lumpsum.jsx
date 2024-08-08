import React, { useState } from "react";
import "../../style/calculators/lumpsum.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMoneyCheckAlt, faHandshake, faCalendarDays, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Slider,
  Box,
  Typography,
  TextField,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksLumpsumAmount = [
  { value: 500, label: "₹ 500" },
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

const LumpsumCalculator = () => {
  const [lumpsumAmount, setLumpsumAmount] = useState(25000);
  const [returnRate, setReturnRate] = useState(10);
  const [lumpsumTenure, setLoanTenure] = useState(1);

  const handleLumpsumAmountChange = (event, newValue) => {
    setLumpsumAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const calculateLumpsum = (amount, rate, tenure) => {
    const annualRate = rate / 100;
    const futureValue = amount * Math.pow(1 + annualRate, tenure);
    return futureValue.toFixed(2);
  };

  const lumpsum = calculateLumpsum(lumpsumAmount, returnRate, lumpsumTenure);
  const totalInterest = (lumpsum - lumpsumAmount).toFixed(2);

  const data = {
    labels: ["Principal Loan Amount", "Total Interest"],
    datasets: [
      {
        data: [lumpsumAmount, totalInterest],
        backgroundColor: ["#9f9f9f", "#2c9430"],
        hoverBackgroundColor: ["#666667", "#265628"],
      },
    ],
  };

  const options = {
    cutout: '80%', // Increase this value to increase the inner radius
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
      <div className="lumpsumcalculator_row">
        <h1 className="lumpsum_h1">Lumpsum Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="lumpsum_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Total Investment</label>
                  <TextField
                    type="number"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={lumpsumAmount}
                    onChange={handleLumpsumAmountChange}
                    min={500}
                    max={10000000}
                    step={10000}
                    marks={marksLumpsumAmount}
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
                    step={0.5}
                    marks={marksInterestRate}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Time Period</label>
                  <TextField
                    type="number"
                    value={lumpsumTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={lumpsumTenure}
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
                <Typography>Investment Amount:<br /> ₹{formatNumber(lumpsumAmount)}</Typography>
                <Typography>Estimated Returns:<br /> ₹{formatNumber(totalInterest)}</Typography>
                <Typography>Maturity Value:<br /> <span className="value-color">₹{formatNumber(lumpsum)}</span></Typography>
              </div>
            </div>
            <div className="chart-container-lumpsum">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="similar_calculators">
        <h2>Similar Calculators</h2>
        <div className="calculator_grid">
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/sip-calculator" className="card_link">
              <FontAwesomeIcon icon={faHandshake} size="2x" className="icon"/>
              <h4>SIP Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/fd-calculator" className="card_link">
              <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" className="icon" />
              <h4>FD Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/emi-calculator" className="card_link">
              <FontAwesomeIcon icon={faChartLine} size="2x" className="icon" />
              <h4>EMI Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/yearly-sip-calculator" className="card_link">
              <FontAwesomeIcon icon={faCalendarDays} size="2x" className="icon" />
              <h4>Yearly SIP Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/cagr-calculator" className="card_link">
              <FontAwesomeIcon icon={faMoneyBillTrendUp} size="2x" className="icon" />
              <h4>CAGR Calculator</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
