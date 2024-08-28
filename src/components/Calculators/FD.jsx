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
    <>
      <section>
        <div className="container">
          <div className="fdcalculator_row">
            <h1 className="calculator_h1">FD Calculator</h1>
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
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>FD Investment</label>
                      <TextField
                        type="number"
                        value={fdAmount}
                        onChange={(e) => setFdAmount((e.target.value))}
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
                        onChange={(e) => setReturnRate((e.target.value))}
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
                        onChange={(e) => setLoanTenure((e.target.value))}
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

export default FdCalculator;
