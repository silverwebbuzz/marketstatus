import React, { useState } from "react";
import "../../style/calculators/calculatorComan.css";
import CalculatorCard from "./CalculatorCard";
import { Slider, Box, Typography, TextField } from "@mui/material";

const EPF = () => {
  const [monthlySalary, setMonthlySalary] = useState(10000);
  const [annualIncrease, setAnnualIncrease] = useState(10);
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentInterestRate] = useState(8.15);
  const [employerContribution] = useState(3.67);
  const [employeeContribution] = useState(12);

  const handleMonthlySalaryChange = (event, newValue) => {
    setMonthlySalary(newValue);
  };

  const handleAnnualIncreaseChange = (event, newValue) => {
    setAnnualIncrease(newValue);
  };

  const handleCurrentAgeChange = (event) => {
    setCurrentAge(Number(event.target.value));
  };

  const handleRetirementAgeChange = (event) => {
    setRetirementAge(Number(event.target.value));
  };

  const calculateMaturityAmount = () => {
    let maturityAmount = 0;
    let currentSalary = monthlySalary;
    let totalYears = retirementAge - currentAge;

    for (let i = 0; i < totalYears; i++) {
      let yearlyContribution =
        (currentSalary * (employerContribution + employeeContribution)) / 100;
      maturityAmount =
        (maturityAmount + yearlyContribution * 12) *
        (1 + currentInterestRate / 100);
      currentSalary += (currentSalary * annualIncrease) / 100;
    }

    return maturityAmount.toFixed(2);
  };

  const totalMaturityAmount = calculateMaturityAmount();
  const timeDuration = retirementAge - currentAge;

  return (
    <>
      <section>
        <div className="container">
          <div className="EPF_row">
            <h1 className="calculator_h1">EPF Calculator</h1>
            <div className="calculator_box">
              <div className="calculator_container_box">
                <div className="calculator_top">
                  <Box>
                    <div className="input-group">
                      <label>Monthly Salary (Basic + DA)</label>
                      <TextField
                        type="number"
                        value={monthlySalary}
                        onChange={(e) =>
                          setMonthlySalary((e.target.value))
                        }
                        size="small"
                      />
                      <Slider
                        value={monthlySalary}
                        onChange={handleMonthlySalaryChange}
                        min={1000}
                        max={1000000}
                        step={1000}
                        valueLabelDisplay="auto"
                      />
                    </div>

                    <div className="input-group">
                      <label>Annual Increase Salary (%)</label>
                      <TextField
                        type="number"
                        value={annualIncrease}
                        onChange={(e) =>
                          setAnnualIncrease((e.target.value))
                        }
                        size="small"
                      />
                      <Slider
                        value={annualIncrease}
                        onChange={handleAnnualIncreaseChange}
                        min={1}
                        max={50}
                        step={1}
                        valueLabelDisplay="auto"
                      />
                    </div>

                    <div className="input-group">
                      <label>Current Age</label>
                      <TextField
                        type="number"
                        value={currentAge}
                        onChange={handleCurrentAgeChange}
                        size="small"
                      />
                    </div>

                    <div className="input-group">
                      <label>Retirement Age</label>
                      <TextField
                        type="number"
                        value={retirementAge}
                        onChange={handleRetirementAgeChange}
                        size="small"
                      />
                    </div>

                    <div className="input-group">
                      <label>Current Rate of Interest (%)</label>
                      <TextField
                        type="number"
                        value={currentInterestRate}
                        InputProps={{ readOnly: true }}
                        size="small"
                      />
                    </div>

                    <div className="input-group">
                      <label>Employer's Monthly Contribution to EPF (%)</label>
                      <TextField
                        type="number"
                        value={employerContribution}
                        InputProps={{ readOnly: true }}
                        size="small"
                      />
                    </div>

                    <div className="input-group">
                      <label>Employee's Monthly Contribution to EPF (%)</label>
                      <TextField
                        type="number"
                        value={employeeContribution}
                        InputProps={{ readOnly: true }}
                        size="small"
                      />
                    </div>
                  </Box>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="results_section">
              <div className="result_box">
                <Typography component="div">
                  Total Maturity Amount:
                  <br />
                  <span className="result_value">
                    ₹{" "}
                    {new Intl.NumberFormat("en-IN").format(totalMaturityAmount)}
                  </span>
                </Typography>
              </div>
              <div className="result_box">
                <Typography component="div">
                  Time Duration:
                  <br />
                  <span className="result_value">{timeDuration} Yrs</span>
                </Typography>
              </div>
            </div>
          </div>
          <CalculatorCard></CalculatorCard>
        </div>
      </section>
    </>
  );
};

export default EPF;
