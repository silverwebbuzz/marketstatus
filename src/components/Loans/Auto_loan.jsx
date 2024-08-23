import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import autoloan from "../../assets/autoloan.jpg";

function Auto_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is an Auto Loan?",
      answer:
        "An auto loan is a type of financing used to purchase a vehicle. The borrower receives a lump sum to buy the car and agrees to repay the loan, including interest, over a set period through monthly payments.",
    },
    {
      question: "How do I qualify for an auto loan?",
      answer:
        "To qualify for an auto loan, lenders typically evaluate your credit score, income, employment history, and debt-to-income ratio. A higher credit score and stable income increase your chances of getting approved for a loan with favorable terms.",
    },
    {
      question: "What loan term should I choose?",
      answer:
        "Auto loan terms typically range from 36 to 72 months. Shorter terms have higher monthly payments but lower overall interest costs. Longer terms lower monthly payments but may result in higher total interest over the life of the loan.",
    },
    {
      question: "Can I pay off my auto loan early?",
      answer:
        "Yes, you can pay off your auto loan early. Some loans may have prepayment penalties, so check your loan agreement for any fees associated with early repayment. Paying off the loan early can reduce the total interest paid.",
    },
    {
      question: "What happens if I miss a payment?",
      answer:
        "Missing a payment can result in late fees and negatively impact your credit score. Continued missed payments can lead to repossession of the vehicle, where the lender takes back the car to recover the remaining loan balance.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction to Auto Loans</h2>
            <p>
              An auto loan is a type of financing specifically designed to help
              individuals purchase a vehicle. By borrowing money from a lender,
              you can spread the cost of a car over a set period through
              manageable monthly payments. Auto loans make it possible for many
              people to buy a car they need or want without having to pay the
              full purchase price upfront.
            </p>
            <p>
              Auto loans come with various terms, interest rates, and repayment
              options, allowing you to tailor the loan to fit your financial
              situation. The loan amount is based on the car's purchase price,
              minus any down payment you make. The interest rate can be fixed or
              variable, affecting the total cost of borrowing over the life of
              the loan.
            </p>
            <p>
              When applying for an auto loan, lenders consider factors such as
              your credit score, income, and the value of the vehicle.
              Understanding these factors can help you secure the best possible
              loan terms. With a wide range of options available, from new and
              used car loans to refinancing opportunities, auto loans provide
              flexibility and accessibility in vehicle ownership.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={autoloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <div className="loan_criteria_left">
              <div className="loan_criteria_left_row">
                <div className="loan_criteria_left_cover">
                  <h2>Applying for an Auto Loan</h2>
                  <div>
                    <label>Step 1: Pre-Approval:</label>
                    <p>
                      Obtain pre-approval from a lender to determine how much
                      you can borrow and the interest rate. This can help you
                      set a budget and negotiate better terms with dealerships.
                    </p>
                  </div>
                  <div>
                    <label>Step 2: Required Documentation: </label>
                    <p>
                      Provide documents such as proof of income, employment
                      verification, identification, and details about the
                      vehicle.
                    </p>
                  </div>
                  <div>
                    <label>Step 3: Loan Agreement:</label>
                    <p>
                      {" "}
                      Review the loan terms, including the interest rate, loan
                      term, monthly payment, and any fees or penalties. Ensure
                      you understand all the terms before signing.
                    </p>
                  </div>
                </div>
                <div className="loan_criteria_right_cover">
                  <h2>Key Considerations</h2>
                  <div>
                    <label>Credit Score:</label>
                    <p>
                      Your credit score impacts the interest rate you receive.
                      Higher scores generally qualify for lower rates, while
                      lower scores may result in higher rates.
                    </p>
                  </div>
                  <div>
                    <label>Down Payment:</label>
                    <p>
                      Making a down payment reduces the amount you need to
                      finance. A larger down payment can lower your monthly
                      payments and reduce the total interest paid.
                    </p>
                  </div>
                  <div>
                    <label>Loan Term: </label>
                    <p>
                      Shorter terms result in higher monthly payments but lower
                      total interest costs. Longer terms lower monthly payments
                      but can lead to higher overall costs.
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

export default Auto_loan;
