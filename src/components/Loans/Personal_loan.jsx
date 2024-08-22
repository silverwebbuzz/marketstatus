import React, { useState } from 'react';
import '../../style/Loans/PersonalLoan.css';
import personaloan from '../../assets/personalloan.jpg';

function Personal_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: " What is a personal loan?",
      answer:
        "A personal loan is an unsecured loan that you can use for various personal needs, such as consolidating debt, covering emergency expenses, or making a large purchase. Since it is unsecured, it doesn't require collateral like a house or car."    },
    {
      question: "What is the interest rate on a personal loan?",
      answer:
        " Interest rates on personal loans vary based on factors like your credit score, income, and the lender’s policies. Rates generally range from 5.99% to 15.99% APR.",
    },
    {
      question: "How long do I have to repay the loan?",
      answer:
        " Repayment terms usually range from 12 to 60 months. You can choose a term that best fits your financial situation.",
    },
    {
      question: "Can I apply for a personal loan with a low credit score?",
      answer:
        " Yes, you can apply, but your interest rate might be higher, and your loan options may be limited. A higher credit score generally results in better loan terms",
    },
    {
      question: " What happens if I miss a loan payment?",
      answer:
        "Missing a payment can result in late fees, a negative impact on your credit score, and potentially higher interest rates. It’s important to communicate with your lender if you’re having trouble making payments.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Personal Loans Made Simple</h2>
            <p>
              A personal loan is an unsecured loan that you can use for a variety of personal needs, such as consolidating debt, covering emergency expenses, or making a large purchase. Unlike secured loans, personal loans don't require collateral, making them an attractive option for many borrowers. Whether you need funds for a medical emergency in your family, your sibling’s wedding, or to renovate your home, a personal loan can finance all your requirements. Personal loans have many advantages over other forms of credit, such as credit cards and informal loans from friends, family members or untrustworthy financiers. Most salaried persons, self-employed and professionals can apply for personal loans. With attractive interest rates, minimal documentation and speedy processing.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={personaloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <h2>
              Eligibility Criteria
            </h2>
            <div className='loan_criteria_left'>
                <ul>
                  <li>
                    <h4>Age Requirement</h4>
                    <p>You must be at least 21 years old at the time of application.</p>
                    <p>The maximum age at loan maturity should not exceed 65 years.</p>
                  </li>
                  <li>
                    <h4>Employment Status</h4>
                    <p>Salaried Individuals: Must be employed with a stable income for at least 6 months at your current job and have a minimum of 2 years of total work experience.</p>
                    <p>Self-Employed Individuals: Must have a steady income stream and at least 3 years of business continuity in the current profession.</p>
                  </li>
                  <li>
                    <h4>Credit Score</h4>
                    <p>A minimum credit score of 650 is typically required to qualify for a personal loan. A higher credit score may help you secure a lower interest rate.</p>
                  </li>
                  <li>
                    <h4>Documentation Requirements</h4>
                    <p>Identity Proof: Valid government-issued ID such as a passport, driver’s license, or national ID card.</p>
                    <p>Address Proof: Utility bills, rental agreement, or other valid documents showing your current address.</p>
                    <p>Income Proof: Recent pay stubs, bank statements, or tax returns depending on your employment status.</p>
                  </li>
                  <li>
                    <h4>Other Conditions</h4>
                    <p>No history of loan defaults or bankruptcy in the recent past.</p>
                    <p>Must have a valid bank account for disbursement of the loan amount.</p>
                  </li>
                </ul>
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

export default Personal_loan;
