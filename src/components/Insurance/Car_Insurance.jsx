import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import car_insurance from "../../assets/car_insurance.jpg";

function Car_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "Is car insurance mandatory?",
      answer:
        "Yes, third-party car insurance is mandatory in India as per the Motor Vehicles Act.",
    },
    {
      question:
        "What is the difference between third-party and comprehensive insurance?",
      answer:
        "Third-party insurance covers only damages to other people's vehicles or property, while comprehensive insurance covers both third-party liabilities and damages to your own car.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Car Insurance in India</h1>
          <div className="intro-section">
            <img
              src={car_insurance}
              alt="Car Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Car insurance provides financial protection against damages to
              your vehicle due to accidents, theft, or natural disasters, as
              well as liability for third-party damage. It ensures that you are
              not left with significant out-of-pocket expenses in the event of
              unforeseen incidents, covering repair costs and even legal fees if
              you are held responsible for damage to others. Car insurance is a
              crucial component of responsible vehicle ownership, offering a
              safety net against potential financial losses.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Car Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Third-Party Insurance:</strong>
                <p>This is the most basic and mandatory type of car insurance. It covers legal liabilities for injuries, death, or property damage caused to a third party by your vehicle.</p>
              </div>
              <div>
                <strong>Comprehensive Insurance:</strong>
                <p>This policy provides extensive coverage, including both third-party liabilities and damages to your own car due to accidents, theft, fire, natural disasters (like floods, earthquakes), man-made disasters (like riots, vandalism), and personal accidents.</p>
              </div>
              <div>
                <strong> Zero Depreciation Cover:</strong>
                <p> An add-on cover with a comprehensive policy that ensures full reimbursement on the value of replaced parts without considering depreciation. Only compulsory deductibles apply. </p>
              </div>
              <div>
                <strong>Personal Accident Cover:</strong>
                <p> Provides compensation for the policyholder in case of accidental death or permanent total disability while driving. This cover is mandatory for the owner-driver. </p>
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

export default Car_Insurance;
