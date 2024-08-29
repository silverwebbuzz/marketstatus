import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import business_insurance from "../../assets/business_insurance.jpg";

function Business_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What does business insurance cover?",
      answer:
        "Business insurance covers property damage, legal liabilities, and employee-related risks that could otherwise cause financial loss to your company.",
    },
    {
      question: "Is business insurance mandatory?",
      answer:
        "While not all types of business insurance are mandatory, some forms, such as liability insurance, may be required depending on your business type and location.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Business Insurance in India</h1>
          <div className="intro-section">
            <img
              src={business_insurance}
              alt="Business Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Business insurance helps protect your company from financial
              losses due to property damage, legal liabilities, and
              employee-related risks. It ensures that your business can recover
              from unexpected events and continue operations without facing
              severe financial strain. By covering various aspects of risk,
              business insurance is crucial for maintaining stability and
              safeguarding your company’s future.
            </p>
          </div>
          <div className="details-section">
            <h2>Types of Business Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Commercial Property Insurance:</strong>
                <p>Protects a business’s physical assets, including buildings, equipment, inventory, furniture, and fixtures, against risks such as fire, theft, vandalism, and natural disasters.</p>
              </div>
              <div>
                <strong>Liability Insurance:</strong>
                <p>Protects against claims of bodily injury, property damage, and personal or advertising injury caused by the business’s operations, products, or services.</p>
              </div>
              <div>
                <strong>Workers' Compensation Insurance:</strong> 
                <p> Provides benefits to employees who suffer work-related injuries or illnesses, including medical expenses, lost wages, and rehabilitation costs.</p>
              </div>
              <div>
                <strong>Commercial Umbrella Insurance:</strong> 
                <p>Provides additional liability coverage above the limits of existing primary policies, like general liability or commercial auto insurance.</p>
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

export default Business_Insurance;
