import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import life_insurance from "../../assets/life_insurance.png";

function Life_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is life insurance?",
      answer:
        "Life insurance is a policy that pays a sum of money either on the death of the insured person or after a set period.",
    },
    {
      question: "Why do I need life insurance?",
      answer:
        "Life insurance provides financial security to your family in the event of your untimely demise, ensuring they can maintain their standard of living.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Life Insurance in India</h1>
          <div className="intro-section">
            <img
              src={life_insurance}
              alt="Life Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Life insurance is a contract between an insurer and a
              policyholder, where the insurer guarantees payment of a death
              benefit to named beneficiaries upon the death of the insured. This
              type of insurance is crucial for financial planning and
              protection, offering peace of mind that loved ones will be
              financially secure even in the policyholder's absence. By ensuring
              that beneficiaries receive a predetermined sum, life insurance
              helps to cover expenses such as mortgages, education, and daily
              living costs, making it an essential component of long-term
              financial security.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Life Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Term Life Insurance:</strong>
                <p>Provides coverage for a specific term (e.g., 10, 20, 30 years). Pays a death benefit if the insured person dies during the term.</p>
              </div>
              <div>
                <strong>Whole Life Insurance:</strong>
                <p> Provides lifetime coverage with a guaranteed death benefit. Includes a savings component (cash value) that grows over time.</p>
              </div>
              <div>
                <strong>Universal Life Insurance (UL):</strong>
                <p>Offers lifelong protection with flexible premiums and adjustable death benefits. Includes a cash value component that earns interest.</p>
              </div>
              <div>
                <strong>Simplified Issue Life Insurance:</strong>
                <p>Provides life insurance with minimal medical underwriting, usually just a short health questionnaire.</p>
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

export default Life_Insurance;
