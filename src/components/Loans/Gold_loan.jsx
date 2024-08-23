import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import goldloan from "../../assets/goldloan.jpg";

function Gold_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is a Gold Loan?",
      answer:
        "Gold loan is a secured loan where you pledge your gold ornaments or coins as collateral to borrow money. The loan amount is typically a percentage of the gold's market value.",
    },
    {
      question: "How much can I borrow against my gold?",
      answer:
        "The loan amount usually ranges from 75% to 90% of the gold’s current market value, depending on the lender’s policies and the purity of the gold.",
    },
    {
      question: "What is the minimum and maximum tenure for a gold loan?",
      answer:
        "Gold loan tenures typically range from a few months to a few years, with the maximum tenure usually being around 36 months. However, this can vary depending on the lender.",
    },
    {
      question: "How quickly can I get a gold loan?",
      answer:
        " Gold loans are processed very quickly, often within a few hours, making them ideal for urgent financial needs. The exact time frame depends on the lender and the documentation provided.",
    },
    {
      question: " What happens if I fail to repay the gold loan?",
      answer:
        "If you default on the loan, the lender has the right to auction your gold to recover the outstanding amount. It’s crucial to ensure timely repayment to avoid losing your gold.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction To Gold Loans</h2>
            <p>
              A gold loan is a type of secured loan where individuals pledge
              their gold ornaments or coins as collateral in exchange for funds
              from a lender. It is a popular financing option due to its
              simplicity, quick processing, and minimal documentation
              requirements. Gold loans are often preferred by those who need
              immediate cash for personal, business, or emergency purposes, as
              they offer a fast and efficient way to leverage the value of gold
              assets without selling them.
            </p>
            <p>
              The loan amount provided is typically a percentage of the current
              market value of the gold, and the borrower can choose from
              flexible repayment options. With competitive interest rates and
              the ability to reclaim your gold upon full repayment, gold loans
              are an attractive solution for individuals seeking short-term
              financial assistance.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={goldloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            {/* <h2>Eligibility Criteria</h2> */}
            <div className="loan_criteria_left">
              <div className="loan_criteria_left_row">
                <div className="loan_criteria_left_cover">
                  <h2>How to Apply for a Gold Loan</h2>
                  <div>
                    <label>Step 1: Assess Your Gold:</label>
                    <p>
                      Determine the weight and purity of the gold you wish to
                      pledge. Most lenders accept gold with a purity of 18
                      karats or higher.
                    </p>
                  </div>
                  <div>
                    <label>Step 2: Choose a Lender: </label>
                    <p>
                      Compare interest rates, loan-to-value ratios, and
                      repayment terms from different banks and financial
                      institutions.
                    </p>
                  </div>
                  <div>
                    <label>Step 3: Submit Your Gold:</label>
                    <p>
                      Visit the lender’s branch with your gold ornaments or
                      coins. The lender will evaluate the gold’s purity and
                      weight.
                    </p>
                  </div>
                  <div>
                    <label>Step 4: Receive the Loan:</label>
                    <p>
                      Once the evaluation is complete, the lender will disburse
                      the loan amount, typically as a percentage of the gold's
                      value, directly to your bank account or in cash.
                    </p>
                  </div>
                  <div>
                    <label>Step 5: Repay the Loan:</label>
                    <p>
                      Choose a repayment plan that suits your financial
                      situation. Once the loan is fully repaid, your gold is
                      returned to you.
                    </p>
                  </div>
                </div>
                <div className="loan_criteria_right_cover">
                  <h2>Benefits of a Gold Loan</h2>

                  <div>
                    <label>No Income Proof Required:</label>
                    <p>
                      Since the loan is secured by gold, lenders do not usually
                      require proof of income.
                    </p>
                  </div>
                  <div>
                    <label>Fast Disbursement: </label>
                    <p>
                      Ideal for emergency financial needs, with funds often
                      available the same day.
                    </p>
                  </div>
                  <div>
                    <label>Retention of Ownership:</label>
                    <p>
                      You retain ownership of your gold, which is returned to
                      you once the loan is repaid.
                    </p>
                  </div>
                  <div>
                    <label>No Restrictions on End Use: </label>
                    <p>
                      The funds from a gold loan can be used for any purpose,
                      whether it's personal, business, or emergency needs.
                    </p>
                  </div>
                </div>
              </div>
              {/* <ul>
                <li>
                  <h4>Age Requirement</h4>
                  <p>
                    You must be at least 21 years old at the time of
                    application.
                  </p>
                  <p>
                    The maximum age at loan maturity should not exceed 65 years.
                  </p>
                </li>
                <li>
                  <h4>Employment Status</h4>
                  <p>
                    Salaried Individuals: Must be employed with a stable income
                    for at least 6 months at your current job and have a minimum
                    of 2 years of total work experience.
                  </p>
                  <p>
                    Self-Employed Individuals: Must have a steady income stream
                    and at least 3 years of business continuity in the current
                    profession.
                  </p>
                </li>
                <li>
                  <h4>Credit Score</h4>
                  <p>
                    A minimum credit score of 650 is typically required to
                    qualify for a personal loan. A higher credit score may help
                    you secure a lower interest rate.
                  </p>
                </li>
                <li>
                  <h4>Documentation Requirements</h4>
                  <p>
                    Identity Proof: Valid government-issued ID such as a
                    passport, driver’s license, or national ID card.
                  </p>
                  <p>
                    Address Proof: Utility bills, rental agreement, or other
                    valid documents showing your current address.
                  </p>
                  <p>
                    Income Proof: Recent pay stubs, bank statements, or tax
                    returns depending on your employment status.
                  </p>
                </li>
                <li>
                  <h4>Other Conditions</h4>
                  <p>
                    No history of loan defaults or bankruptcy in the recent
                    past.
                  </p>
                  <p>
                    Must have a valid bank account for disbursement of the loan
                    amount.
                  </p>
                </li>
              </ul> */}
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

export default Gold_loan;
