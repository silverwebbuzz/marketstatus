import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CalculatorCard from './CalculatorCard';
import { Slider, Box, Typography, TextField,} from "@mui/material";
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

const YRSIP = () => {
  const [sipAmount, setSipAmount] = useState(10000);
  const [returnRate, setReturnRate] = useState(15);
  const [sipTenure, setLoanTenure] = useState(3);

  const handleSipAmountChange = (event, newValue) => {
    setSipAmount(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setReturnRate(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const calculateSip = (amount, rate, tenure) => {
    const annualRate = rate / 100;
    const futureValue = amount * ((Math.pow(1 + annualRate, tenure) - 1) / annualRate) * (1 + annualRate);
    return futureValue.toFixed(2);
  };

  const futureValue = calculateSip(sipAmount, returnRate, sipTenure);
  const investedAmount = sipAmount * sipTenure;
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
    <>
      <section>
        <div className="container">
          <div className="YRSIP_row">
            <h1 className="calculator_h1">Yearly SIP Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>SIP Investment</label>
                      <TextField type="number" value={sipAmount} onChange={(e) => setSipAmount((e.target.value))} size="small"/>
                      <Slider value={sipAmount} onChange={handleSipAmountChange} min={100} max={1000000} step={100} marks={marksSipAmount} valueLabelDisplay="auto" />
                    </div>
                    <div className="input-group">
                      <label>Expected Return Rate (p.a)</label>
                      <TextField type="number" value={returnRate} onChange={(e) => setReturnRate((e.target.value))} size="small"/>
                      <Slider value={returnRate} onChange={handleInterestRateChange} min={1} max={30} step={0.1} marks={marksInterestRate} valueLabelDisplay="auto" />
                    </div>
                    <div className="input-group">
                      <label>Time Period</label>
                      <TextField type="number" value={sipTenure} onChange={(e) => setLoanTenure((e.target.value))} size="small" />
                      <Slider value={sipTenure} onChange={handleLoanTenureChange} min={1} max={40} step={1} marks={marksLoanTenure} valueLabelDisplay="auto"/>
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

export default YRSIP;