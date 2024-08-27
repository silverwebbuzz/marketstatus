import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import health_insurance from "../../assets/health_insurance.webp";

function Health_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What is health insurance?",
            answer: "Health insurance covers the cost of medical expenses incurred due to illnesses, surgeries, and hospitalizations.",
        },
        {
            question: "Is health insurance mandatory?",
            answer: "Health insurance is not mandatory in India, but it is highly recommended to protect against high medical costs.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Health Insurance in India</h1>
            <section className="intro-section">
                <img src={health_insurance} alt="Health Insurance" className="intro-image" />
                <p className="intro-text">
                Health insurance provides coverage for medical expenses, ensuring that you are financially protected in the event of illness or injury. It plays a vital role in safeguarding your financial stability by covering the costs of doctor visits, hospital stays, surgeries, and prescription medications. With health insurance, you can access necessary medical care without the burden of overwhelming expenses, making it an essential part of a comprehensive financial plan and overall well-being.</p>
            </section>

            <section className="details-section">
                <h2>Types of Health Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Individual Health Insurance:</strong> Covers medical expenses for a single person.</li>
                    <li><strong>Family Floater Policy:</strong> Covers the entire family under a single policy.</li>
                    <li><strong>Critical Illness Policy:</strong> Provides a lump sum amount on the diagnosis of a specified critical illness.</li>
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

export default Health_Insurance;
