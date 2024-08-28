import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from './CalculatorCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
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
    <>
      <section>
        <div className="container">
          <div className="PPF_row">
            <h1 className="calculator_h1">PPF Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>Yearly PPF Investment</label>
                      <TextField
                        type="number"
                        value={ppfAmount}
                        onChange={(e) => setPpfAmount((e.target.value))}
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
                        onChange={(e) => setPpfTenure((e.target.value))}
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

export default PPF;
