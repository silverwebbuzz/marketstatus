import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import fire_insurance from "../../assets/fire_insurance.jpg";

function Fire_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is fire insurance?",
      answer:
        "Fire insurance provides coverage against damages or losses caused by fire and other related perils to property.",
    },
    {
      question: "What does fire insurance cover?",
      answer:
        "Fire insurance typically covers the building structure, contents, and loss of profits due to fire incidents.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Fire Insurance in India</h1>
          <div className="intro-section">
            <img
              src={fire_insurance}
              alt="Fire Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Fire insurance protects your property against damages caused by
              fire, ensuring that you can recover financially from such
              devastating events. It provides coverage for repair or replacement
              costs, helping you rebuild and return to normalcy without bearing
              the full financial burden. With fire insurance, you gain peace of
              mind knowing that your property is safeguarded against one of the
              most unpredictable and destructive hazards.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Fire Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong> Specific Fire Insurance Policy:</strong>
                <p>Provides coverage for a specific asset or property against fire risk. The coverage is limited to the amount insured or the actual loss, whichever is lower.</p>
              </div>
              <div>
                <strong>Valued Fire Insurance Policy:</strong>
                <p>Provides coverage based on a pre-agreed value of the property, not the market value at the time of the loss. The sum insured is paid irrespective of the actual loss suffered.</p>
              </div>
              <div>
                <strong>Floating Fire Insurance Policy:</strong>
                <p> Designed for businesses with properties or goods located at multiple locations. Provides coverage for fire risk across various locations under a single policy.</p>
              </div>
              <div>
                <strong>Mortgage Fire Insurance Policy:</strong>
                <p>: Required by lenders, this policy protects the mortgage lender's interest in a property. It typically covers the structure of the property against fire damage.</p>
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

export default Fire_Insurance;
