import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import bike_insurance from "../../assets/bike_insurance.jpg";

function Bike_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "Why is bike insurance important?",
      answer:
        "Bike insurance helps cover the cost of repairs or replacements due to accidents, theft, or natural disasters.",
    },
    {
      question: "Is bike insurance mandatory?",
      answer:
        "Yes, third-party bike insurance is mandatory in India as per the Motor Vehicles Act.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Bike Insurance in India</h1>
          <div className="intro-section">
            <img
              src={bike_insurance}
              alt="Bike Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Bike insurance offers protection against financial losses arising
              from accidents, theft, or damage to your motorcycle. It ensures
              that you are covered for repair costs, replacement, and any
              liabilities towards third parties in case of an accident. By
              providing a financial safety net, bike insurance helps you manage
              unforeseen expenses and maintain peace of mind while on the road.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Bike Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Third-Party Insurance:</strong>
                <p>This is the most basic and mandatory type of bike insurance. It covers legal liabilities arising from accidents that cause injury, death, or property damage to a third party.</p> 
              </div>
              <div>
                <strong>Comprehensive Insurance:</strong>
                <p>This policy provides extensive coverage, including both third-party liabilities and damages to your own bike due to accidents, theft, natural disasters (like floods, earthquakes), man-made disasters (like vandalism, riots), and personal accidents.</p>
              </div>
              <div>
                <strong>Zero Depreciation Cover:</strong>
                <p>An add-on to a comprehensive policy that ensures you get full claim benefits without any depreciation deductions on the bike's parts. Only the compulsory deductibles apply.</p>
              </div>
              <div>
                <strong>Personal Accident Cover:</strong>
                <p> This is a mandatory cover for the owner-driver and provides compensation in case of accidental death, permanent total disability, or injuries sustained in a bike accident.</p>
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

export default Bike_Insurance;
