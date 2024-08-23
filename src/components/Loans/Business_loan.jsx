import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import businessloan from "../../assets/businessloan.jpg";

function Business_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: " What is a Business Loan?",
      answer:
        "A business loan is a type of financing provided by banks, financial institutions, or alternative lenders to help businesses meet their operational, expansion, or working capital needs. It can be used for various purposes, such as purchasing equipment, managing cash flow, or funding growth initiatives.",
    },
    {
      question: "Who is eligible for a business loan?",
      answer:
        " The business should have a minimum turnover of ₹40 lakhs. The business should have a Minimum Annual Income (ITR) of ₹1.5 lakhs per annum. The applicant should be at least 21 years at the time of applying for the loan, and should be not older than 65 years at the time of loan maturity. The business should have a Minimum Annual Income (ITR) of ₹1.5 lakhs per annum.",
    },
    {
      question: "How is the interest rate on a business loan determined?",
      answer:
        " Interest rates are based on several factors, including the type of loan, loan amount, repayment term, the creditworthiness of the borrower, and the lender's policies. Business loans can have fixed or variable interest rates.",
    },
    {
      question: "Can I pay off my business loan early?",
      answer:
        " Many lenders allow early repayment of business loans, but some may charge prepayment penalties. It's important to check the loan agreement for any prepayment terms.",
    },
    {
      question: " What happens if I default on a business loan?",
      answer:
        "If you default on a business loan, the lender can take legal action to recover the owed amount, which may include seizing collateral (for secured loans) or garnishing business income. Defaulting can also severely impact your credit score and future borrowing ability.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction to Business Loans</h2>
            <p>
              A business loan is a financial product designed to provide funding
              to businesses for various purposes, from starting a new venture to
              expanding existing operations. By securing a business loan,
              entrepreneurs and business owners can access the capital needed to
              fuel growth, manage day-to-day expenses, or invest in new
              opportunities.
            </p>
            <p>
              Business loans come in various forms, including term loans,
              working capital loans, equipment financing, and lines of credit,
              each catering to different financial needs. These loans are
              typically offered by banks, credit unions, and alternative
              lenders, and can be secured or unsecured, depending on the
              collateral requirements.
            </p>
            <p>
              With flexible terms and competitive interest rates, business loans
              offer a viable solution for managing cash flow, purchasing
              equipment, hiring staff, or undertaking major projects.
              Understanding the different types of business loans and their
              benefits can help businesses make informed decisions and secure
              the right financing to achieve their goals.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={businessloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <h2>Criteria for Business Loan</h2>
            <div className="loan_criteria_left">
              <div className="types_of_homeloan">
                <div className="Criteria_box">
                  <h4> Business Age</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <label>Minimum Operational Period:</label>
                      <p>
                        Most lenders require your business to have been
                        operational for at least 1 to 3 years. This shows that
                        your business is stable and has a track record of
                        performance.
                      </p>
                    </span>
                    <span>
                      <label>Startups:</label>
                      <p>
                        Some lenders may consider lending to startups, but this
                        typically requires a strong business plan and other
                        supporting factors like personal credit or collateral.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="Criteria_box">
                  <h4>Repayment Capacity</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <lable>Repayment Ability: </lable>
                      <p>
                        Demonstrating your business’s ability to repay the loan
                        through detailed financial projections, including cash
                        flow forecasts, is crucial for approval.
                      </p>
                    </span>
                    <span>
                      <lable>Repayment History: </lable>
                      <p>
                        A history of timely repayments on previous loans or
                        credit lines can positively influence the lender’s
                        decision.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="Criteria_box">
                  <h4>Industry Type</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <lable>Industry Risk: </lable>
                      <p>
                        Certain industries are considered higher risk by lenders
                        (e.g., restaurants, construction), which may affect your
                        loan approval or the terms offered. However, a strong
                        financial history and business plan can mitigate some of
                        this risk.
                      </p>
                    </span>
                    <span>
                      <lable>Lender Preferences:</lable>
                      <p>
                        Some lenders specialize in or prefer certain industries.
                        Researching lenders that focus on your industry can
                        increase your chances of approval.
                      </p>
                    </span>
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

export default Business_loan;
