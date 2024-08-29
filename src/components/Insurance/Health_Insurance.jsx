import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import health_insurance from "../../assets/health_insurance.webp";

function Health_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is health insurance?",
      answer:
        "Health insurance covers the cost of medical expenses incurred due to illnesses, surgeries, and hospitalizations.",
    },
    {
      question: "Is health insurance mandatory?",
      answer:
        "Health insurance is not mandatory in India, but it is highly recommended to protect against high medical costs.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Health Insurance in India</h1>
          <div className="intro-section">
            <img
              src={health_insurance}
              alt="Health Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Health insurance provides coverage for medical expenses, ensuring
              that you are financially protected in the event of illness or
              injury. It plays a vital role in safeguarding your financial
              stability by covering the costs of doctor visits, hospital stays,
              surgeries, and prescription medications. With health insurance,
              you can access necessary medical care without the burden of
              overwhelming expenses, making it an essential part of a
              comprehensive financial plan and overall well-being.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Health Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Individual Health Insurance:</strong>
                <p>Provides coverage for a single person. It includes hospitalization, pre- and post-hospitalization expenses, surgical procedures, and sometimes outpatient expenses, depending on the policy.</p>
              </div>
              <div>
                <strong>Family Floater Policy:</strong>
                <p>A single plan that covers all family members (like spouse, children, and sometimes parents) under one sum insured. The sum insured can be used by any family member as needed.</p>
              </div>
              <div>
                <strong>Critical Illness Policy:</strong>
                <p> Provides a lump sum amount upon the diagnosis of specified critical illnesses, such as cancer, stroke, heart attack, kidney failure, etc. The payout can be used for treatment or other expenses.</p>
              </div>
              <div>
                <strong>Personal Accident Insurance:</strong>
                <p> Provides compensation in case of accidental death, permanent total disability, partial disability, and temporary total disability due to an accident. Some policies also cover hospitalization expenses due to an accident.</p>
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

export default Health_Insurance;
