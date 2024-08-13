import React, { useState, useEffect } from 'react';
import '../../style/mutualfunds/amc.css';

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

const images = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));

const AMC = () => {
    const [data, setData] = useState(null);

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

    return (
        <div className="container">
            <div className='amc_header'>
            <h2>AMC Funds</h2>
            <p>
            In the share market, AMC refers to an Asset Management Company. An AMC oversees investment funds by gathering capital from investors and allocating it across different assets such as stocks and bonds. They are responsible for managing investment portfolios, ensuring diversification, and tracking performance to assist investors in reaching their financial objectives.</p>
            </div>
            <div className="card_row">
                {data.mutual_fund_companies.map((fund, index) => (
                    <div className="card_mf" key={index}>
                        <div className="card-header_mf">
                            <div className='img_name'>
                                <img src={images[fund.logo]} alt={`${fund.amc_name} logo`} className="amc-logo" />
                                <div className="amc-name">{fund.amc_name}</div>
                            </div>
                            <div className="rank">Rank {fund.rank_by_aum}</div>
                        </div>
                        <div className="card-body">
                            <div className="details">
                                <div>AUM in Cr:<strong> ₹{fund.aum_in_cr}</strong></div>
                                <div>Funds:<strong> {fund.funds}</strong></div>
                                <div>AMC Age:<strong>{fund.amc_age} years</strong></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AMC;
