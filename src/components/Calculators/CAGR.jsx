import React, { useState } from "react";
import "../../style/calculators/cagr.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faMoneyCheckAlt, faCalculator, faHandshake, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  Slider,
  Box,
  Typography,
  TextField,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksInitialAmount = [
  { value: 1000, label: "₹ 1000" },
  { value: 1000000, label: "₹ 10,00,000" },
];

const marksFinalAmount = [
  { value: 1000, label: "₹ 1000" },
  { value: 5000000, label: "₹ 50,00,000" },
];

const marksTenure = [
  { value: 1, label: "1 yr" },
  { value: 40, label: "40 yr" },
];

const CAGR = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [finalAmount, setFinalAmount] = useState(20000);
  const [cagrTenure, setTenure] = useState(3);

  const handleInitialAmountChange = (event, newValue) => {
    setInitialAmount(newValue);
  };

  const handleFinalAmountChange = (event, newValue) => {
    setFinalAmount(newValue);
  };

  const handleTenureChange = (event, newValue) => {
    setTenure(newValue);
  };

  const calculateCagr = (initialValue, finalValue, tenure) => {
    if (initialValue <= 0 || finalValue <= 0 || tenure <= 0) return 0;
    const cagr = Math.pow(finalValue / initialValue, 1 / tenure) - 1;
    return (cagr * 100).toFixed(2);
  };

  const cagr = calculateCagr(initialAmount, finalAmount, cagrTenure);

  const data = {
    labels: ["Initial Investment", "Final Value"],
    datasets: [
      {
        data: [initialAmount, finalAmount],
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
      <div className="YRCAGR_row">
        <h1 className="cagr-h1">CAGR Calculator</h1>
        <div className="calculator_box">
          <div className="calculator_container_box">
            <div className="cagr_calculator_top">
              <Box>
                <div className="input-group">
                  <label>Initial Investment</label>
                  <TextField
                    type="number"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={initialAmount}
                    onChange={handleInitialAmountChange}
                    min={1000}
                    max={1000000}
                    step={1000}
                    marks={marksInitialAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Final Value</label>
                  <TextField
                    type="number"
                    value={finalAmount}
                    onChange={(e) => setFinalAmount(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={finalAmount}
                    onChange={handleFinalAmountChange}
                    min={1000}
                    max={5000000}
                    step={100}
                    marks={marksFinalAmount}
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="input-group">
                  <label>Time Period</label>
                  <TextField
                    type="number"
                    value={cagrTenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    size="small"
                  />
                  <Slider
                    value={cagrTenure}
                    onChange={handleTenureChange}
                    min={1}
                    max={40}
                    step={1}
                    marks={marksTenure}
                    valueLabelDisplay="auto"
                  />
                </div>
              </Box>
              <div className="results">
                <Typography component="div">Initial Investment:<br /> ₹{formatNumber(initialAmount)}</Typography>
                <Typography component="div">Final Value:<br /> ₹{formatNumber(finalAmount)}</Typography>
                <Typography component="div">CAGR:<br /><span className="value-color">{cagr}%</span></Typography>
              </div>
            </div>
            <div className="chart-container-cagr">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="similar_calculators">
        <h2>Similar Calculators</h2>
        <div className="calculator_grid">
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/emi-calculator" className="card_link">
              <FontAwesomeIcon icon={faChartLine} size="2x" className="icon"/>
              <h4>EMI Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/yearly-sip-calculator" className="card_link">
              <FontAwesomeIcon icon={faCalendarDays} size="2x" className="icon" />
              <h4>Yearly SIP Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/fd-calculator" className="card_link">
              <FontAwesomeIcon icon={faMoneyCheckAlt} size="2x" className="icon" />
              <h4>FD Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/lumpsum-calculator" className="card_link">
              <FontAwesomeIcon icon={faCalculator} size="2x" className="icon" />
              <h4>Lumpsum Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/sip-calculator" className="card_link">
              <FontAwesomeIcon icon={faHandshake} size="2x" className="icon" />
              <h4>SIP Calculator</h4>
            </Link>
          </div>
          <div className="calculator_card_cagr">
            <Link onClick={scrollToTop} to="/rd-calculator" className="card_link">
              <FontAwesomeIcon icon={faHandshake} size="2x" className="icon" />
              <h4>RD Calculator</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CAGR;
