import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import homeloan from "../../assets/homeloan.jpg";

function Home_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is a home loan?",
      answer:
        "A home loan, also known as a mortgage, is a sum of money borrowed from a financial institution or bank to purchase a home. The borrower is required to repay the loan over a set period with interest.",
    },
    {
      question: "Who is eligible for a home loan?",
      answer:
        "Eligibility for a home loan generally depends on factors such as your income, credit score, employment history, age, and the property’s value. Lenders also consider your existing debts and financial commitments.",
    },
    {
      question: "What is the loan tenure, and how does it affect my EMI?",
      answer:
        "Loan tenure is the period over which you agree to repay the loan. A longer tenure results in lower EMIs but increases the total interest paid over time. Conversely, a shorter tenure means higher EMIs but less interest overall.",
    },
    {
      question: " What is a down payment, and how much do I need to pay?",
      answer:
        "A down payment is the portion of the home’s purchase price that you pay upfront. Typically, lenders require a down payment ranging from 10% to 20% of the property’s value, but it can vary depending on the loan type and lender.",
    },
    {
      question: "What are the tax benefits of a home loan?",
      answer:
        "Home loans offer tax benefits under various sections of the Income Tax Act. For instance, you can claim deductions on the principal repayment under Section 80C and on the interest paid under Section 24(b).",
    },
    {
      question: "Can I transfer my home loan to another lender?",
      answer:
        "Yes, you can transfer your existing home loan to another lender through a process known as a balance transfer. This is often done to benefit from lower interest rates or better loan terms offered by the new lender.",
    },
  ];

  return (
    <section className="home_loan">
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction to Home Loans</h2>
            <p>
              Buying a home is one of the most significant financial decisions
              you’ll ever make. However, the cost of purchasing a property can
              be daunting, and most people don’t have the funds to buy a home
              outright. This is where a home loan comes into play.
            </p>
            <p>
              A home loan, also known as a mortgage, is a financial product that
              allows you to borrow money from a lender to purchase a home. You
              repay this loan over a specified period, typically ranging from 10
              to 30 years, through monthly installments that include both the
              principal amount and interest.
            </p>
            <p>
              Home loans make it possible for individuals and families to own a
              home without having to pay the full price upfront. Instead, the
              cost is spread out over time, making homeownership more accessible
              and manageable.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={homeloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <h2>Types of Home Loans</h2>
            <div className="loan_criteria_left">
              <div className="types_of_homeloan">
                <div className="typeof_box">
                  <h4>Fixed-Rate Home Loan</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <li>Overview</li>
                      <p>
                        {" "}
                        A fixed-rate home loan offers an interest rate that
                        remains constant throughout the entire loan tenure. This
                        means your monthly EMI (Equated Monthly Installment)
                        stays the same, regardless of market fluctuations.
                      </p>
                    </span>
                    <span>
                      <li>Benefits</li>
                      <p>
                        {" "}
                        Stability and predictability in payments make it easier
                        to plan your finances.
                      </p>
                    </span>
                    <span>
                      <li>Ideal For</li>
                      <p>
                        {" "}
                        Borrowers who prefer consistency in their repayment
                        schedule and want to avoid the risk of rising interest
                        rates.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="typeof_box">
                  <h4>Home Equity Loan</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <li>Overview</li>
                      <p>
                        {" "}
                        Also known as a second mortgage, a home equity loan
                        allows you to borrow against the equity you've built up
                        in your home. It typically comes with a fixed interest
                        rate and a set repayment period.
                      </p>
                    </span>
                    <span>
                      <li>Benefits</li>
                      <p>
                        {" "}
                        Access to a lump sum of money for major expenses like
                        home renovations or debt consolidation.
                      </p>
                    </span>
                    <span>
                      <li>Ideal For</li>
                      <p>
                        {" "}
                        Homeowners with significant equity in their property who
                        need access to funds.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="typeof_box">
                  <h4>Reverse Mortgage</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <li>Overview</li>
                      <p>
                        {" "}
                        A reverse mortgage allows homeowners aged 62 and older
                        to convert part of their home equity into cash. Instead
                        of making monthly payments to the lender, the lender
                        makes payments to the borrower.
                      </p>
                    </span>
                    <span>
                      <li>Benefits</li>
                      <p>
                        {" "}
                        Provides a steady income stream for retirees while
                        allowing them to stay in their homes.
                      </p>
                    </span>
                    <span>
                      <li>Ideal For</li>
                      <p>
                        Senior homeowners who need additional income and want to
                        remain in their homes.
                      </p>
                    </span>
                  </div>
                </div>
                <div className="typeof_box">
                  <h4>Adjustable-Rate Home Loan (ARHL)</h4>
                  <div className="typeof_box_inner">
                    <span>
                      <li>Overview</li>
                      <p>
                        Also known as a floating-rate loan, the interest rate on
                        an adjustable-rate home loan varies with market
                        conditions. Initially, the interest rate may be lower
                        than that of a fixed-rate loan, but it can increase or
                        decrease over time.
                      </p>
                    </span>
                    <span>
                      <li>Benefits</li>
                      <p>
                        Lower initial interest rates can lead to lower initial
                        EMIs.
                      </p>
                    </span>
                    <span>
                      <li>Ideal For</li>
                      <p>
                        Borrowers who expect interest rates to decrease in the
                        future or those who plan to sell or refinance the home
                        before rates rise significantly.
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

export default Home_loan;
