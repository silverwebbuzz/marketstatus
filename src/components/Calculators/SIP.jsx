import React, { useState } from "react";
import "../../style/calculators/sip.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMoneyCheckAlt, faCalculator, faCalendarDays, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
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

const marksSipAmount = [
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

const SipCalculator = () => {
  const [sipFrequency, setSipFrequency] = useState("Monthly");
  const [sipAmount, setSipAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(15);
  const [sipTenure, setLoanTenure] = useState(3);

  const handleSipFrequencyChange = (event, newFrequency) => {
    setSipFrequency(newFrequency);
  };

  const handleSipAmountChange = (event, newValue) => {
    setSipAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const calculateSip = (amount, rate, tenure, frequency) => {
    const monthlyRate = rate / 12 / 100;
    const numOfMonths = tenure * 12;
    const periods =
      frequency === "Monthly"
        ? numOfMonths
        : frequency === "Quarterly"
        ? numOfMonths / 3
        : numOfMonths / 6;
    const periodRate =
      monthlyRate *
      (frequency === "Monthly" ? 1 : frequency === "Quarterly" ? 3 : 6);

    const futureValue =
      amount *
      ((Math.pow(1 + periodRate, periods) - 1) / periodRate) *
      (1 + periodRate);
    return futureValue.toFixed(2);
  };

  const futureValue = calculateSip(
    sipAmount,
    returnRate,
    sipTenure,
    sipFrequency
  );
  const investedAmount =
    sipAmount *
    sipTenure *
    (sipFrequency === "Monthly" ? 12 : sipFrequency === "Quarterly" ? 4 : 2);
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
      <div className="sipcalculator_row">
        <h1 className="sip-h1">SIP Calculator</h1>
        <div className="calculator_box">
          <ToggleButtonGroup
            color="primary"
            value={sipFrequency}
            exclusive
            onChange={handleSipFrequencyChange}
            aria-label="SIP Frequency"
          >
            <ToggleButton value="Monthly">Monthly</ToggleButton>
            <ToggleButton value="Quarterly">Quarterly</ToggleButton>
            <ToggleButton value="Half Yearly">Half Yearly</ToggleButton>
          </ToggleButtonGroup>
          <div className="calculator_container_box">
            <div className="sip_calculator_top">
              <Box>
                <div className="input-group">
                  <label>SIP Investment</label>
                  <TextField
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={sipAmount}
                    onChange={handleSipAmountChange}
                    min={100}
                    max={1000000}
                    step={100}
                    marks={marksSipAmount}
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
                    value={sipTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={sipTenure}
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
                <Typography component="div">Investment Amount:<br /> ₹{formatNumber(investedAmount)}</Typography>
                <Typography component="div">Estimated Returns:<br /> ₹{formatNumber(totalReturn)}</Typography>
                <Typography component="div">Maturity Value:<br /><span className="value-color"> ₹{formatNumber(futureValue)}</span></Typography>
              </div>
            </div>
            <div className="chart-container-sip">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="similar_calculators">
        <h2>Similar Calculators</h2>
        <div className="calculator_grid">
          <div className="calculator_card_sip">
            <Link onClick={scrollToTop} to="/emi-calculator" className="card_link">
              <FontAwesomeIcon icon={faChartLine} size="2x" className="icon"/>
              <h4>EMI Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_sip">
            <Link onClick={scrollToTop} to="/fd-calculator" className="card_link">
              <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" className="icon" />
              <h4>FD Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_lump">
            <Link onClick={scrollToTop} to="/cagr-calculator" className="card_link">
              <FontAwesomeIcon icon={faMoneyBillTrendUp} size="2x" className="icon" />
              <h4>CAGR Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_sip">
            <Link onClick={scrollToTop} to="/lumpsum-calculator" className="card_link">
              <FontAwesomeIcon icon={faCalculator} size="2x" className="icon" />
              <h4>Lumpsum Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_sip">
            <Link onClick={scrollToTop} to="/yearly-sip-calculator" className="card_link">
              <FontAwesomeIcon icon={faCalendarDays} size="2x" className="icon" />
              <h4>Yearly SIP Calculator</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
