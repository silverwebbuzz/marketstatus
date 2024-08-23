import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import mortgageloan from "../../assets/mortgageloan.jpg";

function Mortgage_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: " What is a Mortgage Loan?",
      answer:
        "A mortgage loan is a type of loan used to purchase real estate, where the property itself serves as collateral. The borrower agrees to repay the loan, usually in monthly installments, over a specified period, typically 15 to 30 years.",
    },
    {
      question: "How do I qualify for a mortgage loan?",
      answer:
        " Qualification for a mortgage loan depends on several factors, including your credit score, income, employment history, debt-to-income ratio, and the amount of your down payment. Lenders use this information to assess your ability to repay the loan.",
    },
    {
      question: "How much can I borrow with a mortgage loan?",
      answer:
        "The amount you can borrow depends on your income, credit score, existing debts, and the lender’s policies. Getting pre-approved by a lender will give you an estimate of how much you can borrow.",
    },
    {
      question: "Can I pay off my mortgage early?",
      answer:
        "Yes, you can pay off your mortgage early, but some loans may have prepayment penalties. It's essential to check with your lender to understand the terms of your loan.",
    },
    {
      question: "How long does it take to get a mortgage loan approved?",
      answer:
        "The mortgage loan approval process can take anywhere from a few weeks to over a month, depending on the lender and your financial situation. This includes pre-approval, appraisal, underwriting, and closing.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction to Mortgage Loans</h2>
            <p>
              A mortgage loan is a financial product specifically designed to
              help individuals purchase real estate, such as a home or an
              investment property. Unlike other types of loans, a mortgage is
              secured by the property itself, meaning the lender holds a legal
              claim to the property as collateral until the loan is fully
              repaid.
            </p>
            <p>
              Mortgage loans are a fundamental part of the home-buying process,
              enabling buyers to spread the cost of a property over many years,
              typically ranging from 15 to 30 years. This makes owning a home
              more accessible, even for those who may not have the full purchase
              price upfront.
            </p>
            <p>
              The process of obtaining a mortgage involves several steps,
              including determining your borrowing capacity, choosing the right
              type of mortgage, and navigating the application and approval
              process. Various factors, such as interest rates, loan terms, and
              down payments, play a critical role in shaping the overall cost of
              the mortgage.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={mortgageloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <div className="loan_criteria_left">
              <div className="loan_criteria_left_row">
                <div className="loan_criteria_left_cover">
                  <h2>Application Process</h2>
                  <div>
                    <label>Step 1: Pre-Approval:</label>
                    <p>
                      Obtain a pre-approval letter from a lender to determine
                      how much you can borrow.
                    </p>
                  </div>
                  <div>
                    <label>Step 2: Choose a Mortgage Type: </label>
                    <p>
                      Select the loan type that best fits your financial
                      situation.
                    </p>
                  </div>
                  <div>
                    <label>Step 3: Submit Documents: </label>
                    <p>
                      {" "}
                      Provide financial information, including income, assets,
                      and employment history.
                    </p>
                  </div>
                  <div>
                    <label>Step 4: Appraisal: </label>
                    <p>
                      An appraisal will determine the property’s value to ensure
                      it meets the loan requirements.
                    </p>
                  </div>
                  <div>
                    <label>Step 5: Closing:</label>
                    <p>
                      Review and sign the loan documents, pay closing costs, and
                      finalize the loan.
                    </p>
                  </div>
                </div>
                <div className="loan_criteria_right_cover">
                  <h2>Key Considerations</h2>

                  <div>
                    <label>Down Payment:</label>
                    <p>
                      The initial payment made when buying a home, typically
                      ranging from 3% to 20% of the property’s value.
                    </p>
                  </div>
                  <div>
                    <label>Interest Rates: </label>
                    <p>
                      Rates can vary based on the type of mortgage, loan term,
                      and the borrower’s creditworthiness.
                    </p>
                  </div>
                  <div>
                    <label>Loan Term: </label>
                    <p>
                      Common terms are 15 or 30 years, with shorter terms
                      generally having higher monthly payments but lower total
                      interest costs.
                    </p>
                  </div>
                  <div>
                    <label>Closing Costs: </label>
                    <p>
                      These include fees for processing the loan, and they are
                      typically paid upfront.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="faq-section">
          <h2>Frequently Asked Questions (FAQ)</h2>
          {faqData.map((faq, index) => (
            <div key={index} className="faq-item">
              <div
                className="faq-question"
                onClick={() => handleFaqToggle(index)}
              >
                <h3>{faq.question}</h3>
                <span>{faqOpen === index ? "-" : "+"}</span>
              </div>
              {faqOpen === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mortgage_loan;
