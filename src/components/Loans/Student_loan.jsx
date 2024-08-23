import React, { useState } from "react";
import "../../style/Loans/PersonalLoan.css";
import studentloan from "../../assets/studentloan.jpg";

function Student_loan() {
  const [faqOpen, setFaqOpen] = useState(null);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What is a student loan?",
      answer:
        "A student loan is a type of loan specifically designed to help students cover the cost of higher education, including tuition, books, and living expenses. These loans can be offered by the federal government or private lenders.",
    },
    {
      question: "What is the interest rate on student loans?",
      answer:
        " Interest rates on student loans vary depending on whether the loan is federal or private. Federal loans generally have fixed rates set by the government, while private loans may offer variable or fixed rates based on the lender’s policies and your creditworthiness.",
    },
    {
      question: "What is a grace period, and how does it work?",
      answer:
        " A grace period is a set amount of time after you graduate, leave school, or drop below half-time enrollment before you must begin repaying your student loans. For most federal loans, the grace period is six months.",
    },
    {
      question: "How do I pay off my student loans faster?",
      answer:
        "Making extra payments whenever possible. Refinancing your loans to a lower interest rate (especially for private loans). Choosing a repayment plan with a shorter term. Applying any windfalls, such as tax refunds or bonuses, toward your loan balance.",
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="personalloan_row">
          <div className="personalloan_left">
            <h2>Introduction to Student Loans</h2>
            <p>
              Student loans are a critical financial resource that helps
              millions of students access higher education. With the rising
              costs of tuition, housing, and other college-related expenses,
              many students and their families turn to student loans to bridge
              the gap between what they can afford and the total cost of
              education.
            </p>
            <p>
              There are two primary types of student loans: federal and private.
              Federal student loans are provided by the U.S. government and
              typically offer lower interest rates, more flexible repayment
              options, and benefits such as loan forgiveness programs. Private
              student loans, on the other hand, are offered by banks, credit
              unions, and other financial institutions and are often used to
              supplement federal loans when additional funds are needed.
            </p>
            <p>
              Understanding the different types of student loans, their terms,
              and repayment options is essential for making informed decisions
              about financing your education. While student loans can provide
              the necessary funds to pursue a degree, they also represent a
              significant financial obligation that requires careful planning
              and management.
            </p>
          </div>
          <div className="personalloan_right">
            <img src={studentloan} alt="loan" />
          </div>
        </div>
        <div className="loan_criteria">
          <div className="loan_criteria_row">
            <h2>Eligibility Criteria for Student Loans</h2>
            <div className="loan_criteria_left">
              <ul>
                <li>
                  <h4>Citizenship Status:</h4>
                  <p>
                    Must be a citizen for you apply for student Loan or an
                    eligible non-citizen (e.g., permanent resident).
                  </p>
                </li>
                <li>
                  <h4>Enrollment Status:</h4>
                  <p>
                    Must be enrolled or accepted for enrollment at an eligible
                    institution in a degree or certificate program.
                  </p>
                </li>
                <li>
                  <h4>Financial Need:</h4>
                  <p>
                    For Direct Subsidized Loans, financial need must be
                    demonstrated through the Free Application for Federal
                    Student Aid (FAFSA).
                  </p>
                </li>
                <li>
                  <h4>Academic Progress:</h4>
                  <p>
                    Must maintain satisfactory academic progress as defined by
                    the educational institution.
                  </p>
                </li>
                <li>
                  <h4>Financial Aid Requirements:</h4>
                  <p>
                    Must complete the FAFSA to determine eligibility for federal
                    student aid.
                  </p>
                </li>
                <li>
                  <h4>Default Status:</h4>
                  <p>
                    Must not be in default on any federal student loans or owe a
                    refund on federal student grants.
                  </p>
                </li>
                <li>
                  <h4>Age and Dependency Status:</h4>
                  <p>
                    Students under 24 are considered dependent, while those 24
                    or older are considered independent. Independent students
                    may have different eligibility criteria for certain types of
                    aid.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="faq-section">
          <h2>Frequently Asked Questions (FAQ)</h2>
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
    </section>
  );
}

export default Student_loan;
