import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import pet_insurance from "../../assets/pet_insurance.jpg";

function Pet_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What does pet insurance cover?",
      answer:
        "Pet insurance typically covers veterinary expenses for illnesses, injuries, and sometimes routine care for your pets.",
    },
    {
      question: "Is pet insurance available for all types of pets?",
      answer:
        "Most pet insurance policies are available for common pets like dogs and cats, though some insurers offer coverage for other animals as well.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Pet Insurance in India</h1>
          <div className="intro-section">
            <img
              src={pet_insurance}
              alt="Pet Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Pet insurance helps cover the cost of veterinary care, ensuring
              that your pets receive the medical attention they need without
              financial strain. It provides peace of mind by alleviating the
              burden of unexpected medical expenses, allowing you to focus on
              your pet’s well-being rather than worrying about costs. With pet
              insurance, you can ensure that your furry friend gets the best
              care possible.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Pet Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Accident and Illness Coverage:</strong>
                <p>Provides coverage for accidents and injuries such as fractures, lacerations, or ingestion of foreign objects. It does not cover illnesses or routine care.</p>
              </div>
              <div>
                <strong>Wellness or Routine Care Pet Insurance:</strong>
                <p>Focuses on preventive care, such as vaccinations, annual check-ups, flea/tick prevention, spaying/neutering, dental cleanings, and microchipping.</p>
              </div>
              <div>
                <strong>Accident-Only Pet Insurance:</strong>
                <p> Provides coverage for accidents and injuries such as fractures, lacerations, or ingestion of foreign objects. It does not cover illnesses or routine care.</p>
              </div>
              <div>
                <strong>Exotic Pet Insurance:</strong>
                <p>  Specifically designed for exotic pets such as reptiles, birds, rodents, and other non-traditional pets. It typically covers accidents, illnesses, and sometimes preventive care.</p>
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

export default Pet_Insurance;
