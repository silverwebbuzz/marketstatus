import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import pet_insurance from "../../assets/pet_insurance.jpg";

function Pet_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What does pet insurance cover?",
            answer: "Pet insurance typically covers veterinary expenses for illnesses, injuries, and sometimes routine care for your pets.",
        },
        {
            question: "Is pet insurance available for all types of pets?",
            answer: "Most pet insurance policies are available for common pets like dogs and cats, though some insurers offer coverage for other animals as well.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Pet Insurance in India</h1>
            <section className="intro-section">
                <img src={pet_insurance} alt="Pet Insurance" className="intro-image" />
                <p className="intro-text">
                Pet insurance helps cover the cost of veterinary care, ensuring that your pets receive the medical attention they need without financial strain. It provides peace of mind by alleviating the burden of unexpected medical expenses, allowing you to focus on your pet’s well-being rather than worrying about costs. With pet insurance, you can ensure that your furry friend gets the best care possible.</p>
            </section>

            <section className="details-section">
                <h2>Types of Pet Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Accident and Illness Coverage:</strong> Covers veterinary expenses due to accidents and illnesses.</li>
                    <li><strong>Routine Care Add-On:</strong> Provides coverage for routine veterinary care such as vaccinations and check-ups.</li>
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

export default Pet_Insurance;
