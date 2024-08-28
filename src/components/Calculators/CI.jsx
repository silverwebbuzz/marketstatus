import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from './CalculatorCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, TextField, Slider } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksCiAmount = [
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

const CompoundInterestCalculator = () => {
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

  const calculateCompoundInterest = (principal, rate, time) => {
    const annualRate = rate / 100;
    const futureValue = principal * Math.pow(1 + annualRate, time);
    return futureValue.toFixed(2);
  };

  const futureValue = calculateCompoundInterest(principal, annualRate, years);
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
    <>
      <section>
        <div className="container">
          <div className="CI_row">
            <h1 className="calculator_h1">Compound Interest Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label> Principal Amount</label>
                      <TextField
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal((e.target.value))}
                        size="small"
                      />
                      <Slider
                        value={principal}
                        onChange={handlePrincipalChange}
                        min={100}
                        max={1000000}
                        step={100}
                        marks={marksCiAmount}
                        valueLabelDisplay="auto"
                      />
                    </div>
                    <div className="input-group">
                      <label>Annual Interest Rate</label>
                      <TextField
                        type="number"
                        value={annualRate}
                        onChange={(e) => setAnnualRate((e.target.value))}
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
                        onChange={(e) => setYears((e.target.value))}
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

export default CompoundInterestCalculator;
