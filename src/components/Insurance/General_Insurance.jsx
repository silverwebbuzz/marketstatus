import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import general_insurance from "../../assets/general_insurance.jpg";

function General_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What is general insurance?",
            answer: "General insurance is non-life insurance that provides financial protection against various risks like health issues, accidents, theft, natural disasters, and more.",
        },
        {
            question: "Why do I need general insurance?",
            answer: "General insurance provides financial security and peace of mind by covering unexpected expenses related to accidents, health issues, and other risks.",
        },
        // Add more FAQ items here as needed
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>General Insurance in India</h1>
            <section className="intro-section">
                <img src={general_insurance} alt="General Insurance" className="intro-image"/>
                <p className="intro-text">
                General insurance provides protection against financial losses that are not covered by life insurance.
It includes various policies such as health insurance, motor insurance, home insurance, and travel insurance.
These policies offer coverage for different types of risks and damages.</p>
            </section>

            <section className="details-section">
                <h2>Types of General Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Health Insurance:</strong> Covers medical expenses for illnesses, surgeries, and sometimes dental care.</li>
                    <li><strong>Motor Insurance:</strong> Provides coverage for cars, bikes, and other vehicles against accidents, theft, and damage.</li>
                    <li><strong>Home Insurance:</strong> Protects your home and its contents against risks like fire, theft, and natural disasters.</li>
                    <li><strong>Travel Insurance:</strong> Covers unexpected events while traveling, such as medical emergencies, trip cancellations, and lost luggage.</li>
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

export default General_Insurance;
