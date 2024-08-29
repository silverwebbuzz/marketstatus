import React, { useState } from "react";
import "../../style/Insurance/general_insurance.css";
import travel_insurance from "../../assets/travel_insurance.jpg";

function Travel_Insurance() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What does travel insurance cover?",
      answer:
        "Travel insurance covers medical expenses, trip cancellations, lost luggage, flight delays, and other travel-related emergencies.",
    },
    {
      question: "Is travel insurance necessary?",
      answer:
        "While not mandatory, travel insurance is highly recommended to protect against unexpected expenses during your travels.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="insurance-page">
          <h1>Travel Insurance in India</h1>
          <div className="intro-section">
            <img
              src={travel_insurance}
              alt="Travel Insurance"
              className="intro-image"
            />
            <p className="intro-text">
              Travel insurance provides coverage for a range of unexpected
              events while you’re traveling, such as medical emergencies, trip
              cancellations, and lost luggage. It ensures that you are
              financially protected against unforeseen issues, allowing you to
              manage unexpected expenses and disruptions with ease. By offering
              peace of mind during your travels, travel insurance is an
              essential companion for a worry-free journey.
            </p>
          </div>

          <div className="details-section">
            <h2>Types of Travel Insurance</h2>
            <div className="insurance-list">
              <div>
                <strong>Single Trip Insurance:</strong>
                <p>  Provides coverage for one specific trip, including medical emergencies, trip cancellations, delays, lost luggage, and other unforeseen events.</p>
              </div>
              <div>
                <strong>Multi-Trip Insurance:</strong>
                <p>Covers multiple trips within a specified period, usually one year. It includes the same protections as single trip insurance, such as medical expenses, trip cancellations, and lost luggage.</p>
              </div>
              <div>
                <strong>Student Travel Insurance:</strong>
                <p> Tailored for students studying abroad. It includes medical expenses, loss of passport, emergency evacuation, sponsor protection, study interruption, and compassionate visits.</p>
              </div>
              <div>
                <strong>Student Travel Insurance:</strong>
                <p> Tailored for students studying abroad. It includes medical expenses, loss of passport, emergency evacuation, sponsor protection, study interruption, and compassionate visits.</p>
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

export default Travel_Insurance;
