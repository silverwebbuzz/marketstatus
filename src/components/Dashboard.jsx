import React, { useEffect, useState } from 'react';
import StockBox from './StockBox';
import '../style/Dashboard.css';
import advImg from '../images/YFOBS.png'
import sticker1 from '../images/sticker1.png';
import TopMF from './TopMF';
import Equity from './MutualFunds/Equity';
import Debt from './MutualFunds/Debt';
import Hybrid from './MutualFunds/Hybrid';
import Index from './MutualFunds/Index';
import ELSS from './MutualFunds/ELSS';
import CalculatorCard from './Calculators/CalculatorCard';


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  
  useEffect(() => {
    const fetchMutualFundsData = async () => {
      try {
        const response = await fetch('/topMD.json');
        const mutualFundsData = await response.json();
        setData((prevState) => ({ ...prevState, mutualFunds: mutualFundsData }));
      } catch (error) {
        console.error("Error fetching mutual funds data:", error);
      }
    };

    fetchMutualFundsData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleFaqToggle = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      question: "What are stocks or shares?",
      answer:
        "Stocks, or shares, are small pieces of a company that you can buy. When you own a share, you own a part of that company.",
    },
    {
      question: "How does the stock market work?",
      answer:
        "The stock market is where people buy and sell shares of companies. Prices go up or down based on how many people want to buy or sell.",
    },
    {
      question: "How can you pick the right stocks?",
      answer:
        "To pick the right stocks, look at how a company is doing, what’s happening in its industry, and what experts are saying. Spreading your investments across different stocks can also reduce risks.",
    },
    {
      question: "What other things can you trade in the stock market?",
      answer:
        "Besides shares, you can trade things like bonds, mutual funds, and exchange-traded funds (ETFs). These give you more options to invest.",
    },
    {
      question: "What affects the price of a stock?",
      answer:
        "Stock prices change because of things like company performance, news, the economy, and how people feel about the market. It’s all about supply and demand.",
    },
  ];
  

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="dashboard_row">
            <div className="dashboard">
              <div className="stock-boxes">
                <StockBox title="NIFTY 50" />
                <StockBox title="NIFTYBANK" />
                <StockBox title="SENSEX" />
                <div className="stock-box adv_box">
                  <div className="adverstiment">
                    <img src={advImg} alt='adv'></img>
                  </div>
                  <a href='https://yfobs.in' target='/'>yfobs</a>
                </div>
              </div>
            </div>
            <div className='adv'>
              <div>
                <h4>Top Ranked Mutual Funds</h4>
              </div>
              <div className="trmfl">
                <TopMF data={data.mutualFunds} />
              </div>
            </div>
          </div>
        </div>
        <div className="stick">
          <img src={sticker1} alt="sticker" className='sticker1' />
        </div>
      </section>
      <Equity />
      <Debt />
      <Hybrid />
      <Index />
      <ELSS />
      <CalculatorCard/>
      <div className='container'>
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
    </>
  );
};

export default Dashboard;