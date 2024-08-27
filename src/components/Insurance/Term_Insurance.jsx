import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import term_insurance from "../../assets/term_insurance.jpg";

function Term_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What is term insurance?",
            answer: "Term insurance provides life coverage for a specific period. If the insured person dies during the term, the death benefit is paid to the beneficiaries.",
        },
        {
            question: "Is term insurance the same as life insurance?",
            answer: "Term insurance is a type of life insurance that provides coverage for a set period, typically without a cash value component.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Term Insurance in India</h1>
            <section className="intro-section">
                <img src={term_insurance} alt="Term Insurance" className="intro-image" />
                <p className="intro-text">
                Term insurance offers life coverage for a specific period, providing financial security to your loved ones in the event of your untimely demise. It ensures that your beneficiaries receive a lump sum payout, helping them manage expenses such as mortgages, education, and daily living costs. As an affordable and straightforward form of life insurance, term insurance is a crucial tool for protecting your family's financial future.</p>
            </section>

            <section className="details-section">
                <h2>Types of Term Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Level Term Insurance:</strong> Provides a fixed sum assured for the policy duration.</li>
                    <li><strong>Increasing Term Insurance:</strong> The sum assured increases at a pre-defined rate during the policy term.</li>
                    <li><strong>Decreasing Term Insurance:</strong> The sum assured decreases over time, often used to cover a mortgage.</li>
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

export default Term_Insurance;
