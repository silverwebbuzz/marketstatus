import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from './CalculatorCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
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
    <>
      <section>
        <div className="container">
          <div className="emicalculator_row">
            <h1 className="calculator_h1">EMI Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>Loan Amount</label>
                      <TextField
                        type="number"
                        value={emiAmount}
                        onChange={(e) => setEmiAmount((e.target.value))}
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
                        onChange={(e) => setReturnRate((e.target.value))}
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
                        onChange={(e) => setLoanTenure((e.target.value))}
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
                <div className="chart_container">
                  <Doughnut data={data} options={options} />
                </div>
              </div>
            </div>
          </div>
          <CalculatorCard></CalculatorCard>
        </div>
      </section>
    </>
  );
};

export default EmiCalculator;
