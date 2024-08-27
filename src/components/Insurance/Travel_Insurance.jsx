import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import travel_insurance from "../../assets/travel_insurance.jpg";

function Travel_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What does travel insurance cover?",
            answer: "Travel insurance covers medical expenses, trip cancellations, lost luggage, flight delays, and other travel-related emergencies.",
        },
        {
            question: "Is travel insurance necessary?",
            answer: "While not mandatory, travel insurance is highly recommended to protect against unexpected expenses during your travels.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Travel Insurance in India</h1>
            <section className="intro-section">
                <img src={travel_insurance} alt="Travel Insurance" className="intro-image" />
                <p className="intro-text">
                Travel insurance provides coverage for a range of unexpected events while you’re traveling, such as medical emergencies, trip cancellations, and lost luggage. It ensures that you are financially protected against unforeseen issues, allowing you to manage unexpected expenses and disruptions with ease. By offering peace of mind during your travels, travel insurance is an essential companion for a worry-free journey.</p>
            </section>

            <section className="details-section">
                <h2>Types of Travel Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Single Trip Insurance:</strong> Covers a single trip, from start to end.</li>
                    <li><strong>Multi-Trip Insurance:</strong> Provides coverage for multiple trips within a specific period, usually a year.</li>
                    <li><strong>Student Travel Insurance:</strong> Tailored for students studying abroad, covering medical and travel-related risks.</li>
                </ul>
            </section>

            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>
                {faqData.map((faq, index) => (
                    <div key={index} className="faq-item">
                        <div className="faq-question" onClick={() => handleFaqToggle(index)}>
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
            </section>
        </div>
        </div>
    );
}

export default Travel_Insurance;
