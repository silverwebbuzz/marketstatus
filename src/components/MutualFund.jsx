import React from 'react';
import '../style/MutualFund.css';


const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  };
  
  const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));
  
  const MutualFund = ({ data }) => {
    if (!data || !data.mutual_fund_companies) return null;

    return (
      <div className="container">
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
  
  export default MutualFund;