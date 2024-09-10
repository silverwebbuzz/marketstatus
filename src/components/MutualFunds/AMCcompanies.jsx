import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../style/mutualfunds/amccompany.css';
import scrollToTop from '../ScrollToTop';

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

const images = importAll(require.context('../../assets/amc_fund_companies', false, /\.(png|jpe?g|svg)$/));

const AMCcompanies = () => {
    const [data, setData] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch('/mutualData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data || !data.mutual_fund_companies) return null;

    const handleCardClick = (fund) => {
        const fundName = fund.amc_name.toLowerCase().replace(/\s+/g, ''); // For example: "ICICI Prudential Mutual Fund" -> "iciciprudentialmutualfund"
        navigate(`/amc/${fundName}`);
        scrollToTop();
    };

    return (
        <section>
        <div className='container'>
            <div className='amc_header'>
                <h2> Other AMC Funds</h2>
                <p>
                    In the share market, AMC refers to an Asset Management Company. An AMC oversees investment funds by gathering capital from investors and allocating it across different assets such as stocks and bonds. They are responsible for managing investment portfolios, ensuring diversification, and tracking performance to assist investors in reaching their financial objectives.
                </p>
            </div>
            <div className="card_row">
                {data.mutual_fund_companies.map((fund, index) => (
                    <div 
                        className="amccompany_card_mf" 
                        key={index} 
                        onClick={() => handleCardClick(fund)} 
                    >
                        <div className="amccompany_card-header_mf">
                            <div className='amccompanycard'>
                                <img src={images[fund.logo]} alt={`${fund.amc_name} logo`} className="amc-logo" />
                                <div className="amcompany-name">{fund.amc_name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
};

export default AMCcompanies;
