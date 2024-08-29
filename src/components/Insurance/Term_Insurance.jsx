import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import term_insurance from "../../assets/term_insurance.jpg";

function Term_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is term insurance?",
      answer:
        "Term insurance provides life coverage for a specific period. If the insured person dies during the term, the death benefit is paid to the beneficiaries.",
    },
    {
      question: "Is term insurance the same as life insurance?",
      answer:
        "Term insurance is a type of life insurance that provides coverage for a set period, typically without a cash value component.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Term Insurance in India</h1>
          <div className="intro-section">
            <img
              src={term_insurance}
              alt="Term Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Term insurance offers life coverage for a specific period,
              providing financial security to your loved ones in the event of
              your untimely demise. It ensures that your beneficiaries receive a
              lump sum payout, helping them manage expenses such as mortgages,
              education, and daily living costs. As an affordable and
              straightforward form of life insurance, term insurance is a
              crucial tool for protecting your family's financial future.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Term Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Level Term Insurance:</strong>
                <p>Provides a fixed sum assured for a specific period (term). The premium amount and coverage remain constant throughout the policy term.</p> 
              </div>
              <div>
                <strong>Increasing Term Insurance:</strong> 
                <p>The sum assured increases at a predetermined rate (usually 5% or 10% per annum) to keep up with inflation and rising expenses.</p>
              </div>
              <div>
                <strong>Decreasing Term Insurance:</strong>
                <p> The sum assured decreases over the policy term, usually aligned with a decreasing financial obligation, such as a mortgage or loan.</p>
              </div>
              <div>
                <strong>Whole Life Term Insurance:</strong>
                <p> Technically, it provides coverage for the entire lifetime of the policyholder but works on a term basis for premium payments (limited to a certain age, like 85 or 100).</p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
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
      </div>
    </section>
  );
}

export default Term_Insurance;
