import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Slider, Box, Typography, TextField, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const SIPAndLumpsumCalculator = () => {
  const [calculatorType, setCalculatorType] = useState("sip"); // Default to SIP
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(5);
  const [lumpsumAmount, setLumpsumAmount] = useState(25000);

  // Handle switching between SIP and Lumpsum
  const handleCalculatorChange = (event, newCalculatorType) => {
    setCalculatorType(newCalculatorType);
  };

  // Handle state changes for input fields
  const handleMonthlyInvestmentChange = (event, newValue) => {
    setMonthlyInvestment(newValue);
  };

  const handleLumpsumAmountChange = (event, newValue) => {
    setLumpsumAmount(newValue);
  };

  const handleExpectedReturnRateChange = (event, newValue) => {
    setExpectedReturnRate(newValue);
  };

  const handleTimePeriodChange = (event, newValue) => {
    setTimePeriod(newValue);
  };

  // SIP Calculation Formula
  const calculateSIP = (monthlyInvestment, rate, timePeriod) => {
    const monthlyRate = rate / 12 / 100;
    const months = timePeriod * 12;
    const futureValue = (monthlyInvestment * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate)) / monthlyRate;
    return futureValue.toFixed(2);
  };

  // Lumpsum Calculation Formula
  const calculateLumpsum = (amount, rate, tenure) => {
    const annualRate = rate / 100;
    const futureValue = amount * Math.pow(1 + annualRate, tenure);
    return futureValue.toFixed(2);
  };

  // Use different calculation depending on the type of calculator
  const maturityValue = calculatorType === "sip"
    ? calculateSIP(monthlyInvestment, expectedReturnRate, timePeriod)
    : calculateLumpsum(lumpsumAmount, expectedReturnRate, timePeriod);

  // Chart Data
  const chartData = {
    labels: ["Principal", "Returns"],
    datasets: [
      {
        data: calculatorType === "sip"
          ? [monthlyInvestment * timePeriod * 12, maturityValue - (monthlyInvestment * timePeriod * 12)]
          : [lumpsumAmount, maturityValue - lumpsumAmount],
          backgroundColor: ["#9f9f9f", "#2c9430"],
          hoverBackgroundColor: ["#666667", "#265628"],
      },
    ],
  };

  return (
    <section>
      <div className="container">
        <div className="calculator_row">
          <h1 className="calculator_h1">{calculatorType === "sip" ? "SIP Calculator" : "Lumpsum Calculator"}</h1>

          {/* Toggle between SIP and Lumpsum */}
          <ToggleButtonGroup
            value={calculatorType}
            exclusive
            onChange={handleCalculatorChange}
            aria-label="calculator type"
            className="calculator_type_toggle"
          >
            <ToggleButton value="sip" aria-label="sip">
              Monthly SIP
            </ToggleButton>
            <ToggleButton value="lumpsum" aria-label="lumpsum">
              Lumpsum
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="calculator_container_box">
            <div className="calculator_top">
              <Box>
              {/* Inputs for SIP Calculator */}
              {calculatorType === "sip" && (
                <>
                  <div className="input-group">
                    <label>Monthly Investment</label>
                    <TextField
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={monthlyInvestment}
                      onChange={handleMonthlyInvestmentChange}
                      min={500}
                      max={100000}
                      step={500}
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="input-group">
                    <label>Expected Return Rate (p.a)</label>
                    <TextField
                      type="number"
                      value={expectedReturnRate}
                      onChange={(e) => setExpectedReturnRate((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={expectedReturnRate}
                      onChange={handleExpectedReturnRateChange}
                      min={1}
                      max={30}
                      step={0.5}
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="input-group">
                    <label>Time Period (years)</label>
                    <TextField
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={timePeriod}
                      onChange={handleTimePeriodChange}
                      min={1}
                      max={40}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </>
              )}

              {/* Inputs for Lumpsum Calculator */}
              {calculatorType === "lumpsum" && (
                <>
                  <div className="input-group">
                    <label>Total Investment</label>
                    <TextField
                      type="number"
                      value={lumpsumAmount}
                      onChange={(e) => setLumpsumAmount((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={lumpsumAmount}
                      onChange={handleLumpsumAmountChange}
                      min={500}
                      max={10000000}
                      step={10000}
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="input-group">
                    <label>Expected Return Rate (p.a)</label>
                    <TextField
                      type="number"
                      value={expectedReturnRate}
                      onChange={(e) => setExpectedReturnRate((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={expectedReturnRate}
                      onChange={handleExpectedReturnRateChange}
                      min={1}
                      max={30}
                      step={0.5}
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="input-group">
                    <label>Time Period (years)</label>
                    <TextField
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod((e.target.value))}
                      size="small"
                    />
                    <Slider
                      value={timePeriod}
                      onChange={handleTimePeriodChange}
                      min={1}
                      max={40}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </>
              )}
</Box>
              {/* Results and Chart */}
              <div className="results">
                <Typography component="div">
                  Maturity Value:
                  <br />
                  ₹{new Intl.NumberFormat("en-IN").format(maturityValue)}
                </Typography>
              </div>
            </div>
            <div className="chart_container">
                <Doughnut data={chartData} />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SIPAndLumpsumCalculator;
