import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import car_insurance from "../../assets/car_insurance.jpg";

function Car_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "Is car insurance mandatory?",
            answer: "Yes, third-party car insurance is mandatory in India as per the Motor Vehicles Act.",
        },
        {
            question: "What is the difference between third-party and comprehensive insurance?",
            answer: "Third-party insurance covers only damages to other people's vehicles or property, while comprehensive insurance covers both third-party liabilities and damages to your own car.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Car Insurance in India</h1>
            <section className="intro-section">
                <img src={car_insurance} alt="Car Insurance" className="intro-image" />
                <p className="intro-text">
                
Car insurance provides financial protection against damages to your vehicle due to accidents, theft, or natural disasters, as well as liability for third-party damage. It ensures that you are not left with significant out-of-pocket expenses in the event of unforeseen incidents, covering repair costs and even legal fees if you are held responsible for damage to others. Car insurance is a crucial component of responsible vehicle ownership, offering a safety net against potential financial losses.</p>
            </section>

            <section className="details-section">
                <h2>Types of Car Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Third-Party Insurance:</strong> Mandatory coverage that protects against damages to third parties.</li>
                    <li><strong>Comprehensive Insurance:</strong> Covers both third-party liabilities and damages to your own vehicle.</li>
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

export default Car_Insurance;
