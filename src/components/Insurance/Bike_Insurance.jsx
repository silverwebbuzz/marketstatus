import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import bike_insurance from "../../assets/bike_insurance.jpg";

function Bike_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "Why is bike insurance important?",
            answer: "Bike insurance helps cover the cost of repairs or replacements due to accidents, theft, or natural disasters.",
        },
        {
            question: "Is bike insurance mandatory?",
            answer: "Yes, third-party bike insurance is mandatory in India as per the Motor Vehicles Act.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Bike Insurance in India</h1>
            <section className="intro-section">
                <img src={bike_insurance} alt="Bike Insurance" className="intro-image" />
                <p className="intro-text">
                Bike insurance offers protection against financial losses arising from accidents, theft, or damage to your motorcycle. It ensures that you are covered for repair costs, replacement, and any liabilities towards third parties in case of an accident. By providing a financial safety net, bike insurance helps you manage unforeseen expenses and maintain peace of mind while on the road.</p>
            </section>

            <section className="details-section">
                <h2>Types of Bike Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Third-Party Insurance:</strong> Covers damages to another person’s property or vehicle.</li>
                    <li><strong>Comprehensive Insurance:</strong> Covers both third-party liabilities and damages to your own bike.</li>
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

export default Bike_Insurance;
