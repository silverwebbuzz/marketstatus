import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from './CalculatorCard';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Slider, Box, Typography, TextField } from "@mui/material";


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
    <>
      <section>
        <div className="container">
          <div className="NPS_row">
            <h1 className="calculator_h1">NPS Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>Initial Investment</label>
                      <TextField
                        type="number"
                        value={investmentAmount}
                        onChange={(e) =>
                          setInvestmentAmount((e.target.value))
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
                        onChange={(e) => setMaturityValue((e.target.value))}
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
                        onChange={(e) => setDuration((e.target.value))}
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

export default NPS;
