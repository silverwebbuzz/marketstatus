import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from './CalculatorCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Slider, Box, Typography, TextField } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const marksRdAmount = [
  { value: 500, label: "₹ 500" },
  { value: 1000000, label: "₹ 10,00,000" },
];

const marksInterestRate = [
  { value: 1, label: "1%" },
  { value: 15, label: "15%" },
];

const marksRdTenure = [
  { value: 1, label: "1 Month" },
  { value: 120, label: "120 Month" },
];

const RD = () => {
  const [rdAmount, setRdAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(7);
  const [rdTenure, setRdTenure] = useState(24);

  const handleRdAmountChange = (event, newValue) => {
    setRdAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleRdTenureChange = (event, newValue) => {
    setRdTenure(newValue);
  };

const calculateRd = (monthlyInvestment, rate, tenureMonths) => {
  const monthlyRate = rate / (12 * 100);
  const maturityValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, tenureMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);
  return maturityValue.toFixed(2);
};


  const futureValue = calculateRd(rdAmount, returnRate, rdTenure);
  const investedAmount = rdAmount * rdTenure;
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
    <>
      <section>
        <div className="container">
          <div className="RD_row">
            <h1 className="calculator_h1">RD Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>Monthly RD Investment</label>
                      <TextField
                        type="number"
                        value={rdAmount}
                        onChange={(e) => setRdAmount((e.target.value))}
                        size="small"
                      />
                      <Slider
                        value={rdAmount}
                        onChange={handleRdAmountChange}
                        min={500}
                        max={1000000}
                        step={100}
                        marks={marksRdAmount}
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
                        max={15}
                        step={0.1}
                        marks={marksInterestRate}
                        valueLabelDisplay="auto"
                      />
                    </div>
                    <div className="input-group">
                      <label>Time Period (in months)</label>
                      <TextField
                        type="number"
                        value={rdTenure}
                        onChange={(e) => setRdTenure((e.target.value))}
                        size="small"
                      />
                      <Slider
                        value={rdTenure}
                        onChange={handleRdTenureChange}
                        min={1}
                        max={120}
                        step={1}
                        marks={marksRdTenure}
                        valueLabelDisplay="auto"
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

export default RD;
