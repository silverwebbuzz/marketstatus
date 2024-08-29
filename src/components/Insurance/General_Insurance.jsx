import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import general_insurance from "../../assets/general_insurance.jpg";

function General_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is general insurance?",
      answer:
        "General insurance is non-life insurance that provides financial protection against various risks like health issues, accidents, theft, natural disasters, and more.",
    },
    {
      question: "Why do I need general insurance?",
      answer:
        "General insurance provides financial security and peace of mind by covering unexpected expenses related to accidents, health issues, and other risks.",
    },
    // Add more FAQ items here as needed
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>General Insurance in India</h1>
          <div className="intro-section">
            <img
              src={general_insurance}
              alt="General Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              General insurance provides protection against financial losses
              that are not covered by life insurance. It includes various
              policies such as health insurance, motor insurance, home
              insurance, and travel insurance. These policies offer coverage for
              different types of risks and damages.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of General Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Health Insurance:</strong>
                <p> Covers medical expenses for illnesses, surgeries, and sometimes dental care. </p>
              </div>
              <div>
                <strong>Motor Insurance:</strong>
                <p>Provides coverage for cars, bikes, and other vehicles against accidents, theft, and damage.</p> 
              </div>
              <div>
                <strong>Home Insurance:</strong>
                <p> Protects your home and its contents against risks like fire, theft, and natural disasters.</p>
              </div>
              <div>
                <strong>Travel Insurance:</strong>
                <p> Covers unexpected events while traveling, such as medical emergencies, trip cancellations, and lost luggage.</p>
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

export default General_Insurance;
