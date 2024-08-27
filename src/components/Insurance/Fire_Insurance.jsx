import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import fire_insurance from "../../assets/fire_insurance.jpg";

function Fire_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What is fire insurance?",
            answer: "Fire insurance provides coverage against damages or losses caused by fire and other related perils to property.",
        },
        {
            question: "What does fire insurance cover?",
            answer: "Fire insurance typically covers the building structure, contents, and loss of profits due to fire incidents.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
        <h1>Fire Insurance in India</h1>
            <section className="intro-section">
          
                <img src={fire_insurance} alt="Fire Insurance" className="intro-image" />
                <p className="intro-text">
                Fire insurance protects your property against damages caused by fire, ensuring that you can recover financially from such devastating events. It provides coverage for repair or replacement costs, helping you rebuild and return to normalcy without bearing the full financial burden. With fire insurance, you gain peace of mind knowing that your property is safeguarded against one of the most unpredictable and destructive hazards.</p>
            </section>

            <section className="details-section">
                <h2>Types of Fire Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Standard Fire and Special Perils Policy:</strong> Covers damage caused by fire, lightning, explosion, and other specified perils.</li>
                    <li><strong>Valued Policy:</strong> The sum assured is fixed and agreed upon at the time of the policy purchase, regardless of the actual value of the property at the time of the claim.</li>
                    <li><strong>Floating Policy:</strong> Ideal for businesses, it covers multiple properties under one policy, provided the properties are in different locations.</li>
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

export default Fire_Insurance;
