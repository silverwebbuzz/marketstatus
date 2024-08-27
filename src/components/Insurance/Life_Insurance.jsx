import React, { useState } from 'react';
import '../../style/Insurance/general_insurance.css';
import life_insurance from "../../assets/life_insurance.png";

function Life_Insurance() {
    const [faqOpen, setFaqOpen] = useState(null);

    const handleFaqToggle = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const faqData = [
        {
            question: "What is life insurance?",
            answer: "Life insurance is a policy that pays a sum of money either on the death of the insured person or after a set period.",
        },
        {
            question: "Why do I need life insurance?",
            answer: "Life insurance provides financial security to your family in the event of your untimely demise, ensuring they can maintain their standard of living.",
        },
    ];

    return (
        <div className='container'>
        <div className="insurance-page">
            <h1>Life Insurance in India</h1>
            <section className="intro-section">
                <img src={life_insurance} alt="Life Insurance" className="intro-image"/>
                <p className="intro-text">
                Life insurance is a contract between an insurer and a policyholder, where the insurer guarantees payment of a death benefit to named beneficiaries upon the death of the insured. This type of insurance is crucial for financial planning and protection, offering peace of mind that loved ones will be financially secure even in the policyholder's absence. By ensuring that beneficiaries receive a predetermined sum, life insurance helps to cover expenses such as mortgages, education, and daily living costs, making it an essential component of long-term financial security.</p>
            </section>

            <section className="details-section">
                <h2>Types of Life Insurance</h2>
                <ul className="insurance-list">
                    <li><strong>Term Life Insurance:</strong> Provides coverage for a specific period or "term" and is usually the most affordable type of life insurance.</li>
                    <li><strong>Whole Life Insurance:</strong> Offers lifelong coverage with a cash value component that grows over time.</li>
                    <li><strong>Endowment Plans:</strong> Combines life insurance with savings, paying out a lump sum on maturity or death.</li>
                    <li><strong>Unit-Linked Insurance Plans (ULIPs):</strong> Combines life insurance with investment in equity and debt instruments.</li>
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

export default Life_Insurance;
