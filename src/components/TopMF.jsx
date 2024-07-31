import React from 'react';
import '../style/MutualFund.css';
import '../style/TopMF.css'


const importAll = (r) => {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
};

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const TopMF = ({ data }) => {
    if (!data || !data.top_mutual_fund_companies) return null;

    const topFiveFunds = data.top_mutual_fund_companies.slice(0, 5);

    return (
        <div>
            <span className='trmf'>Top Ranked Mutual Funds</span>
            <div className="tmf_card_row">
                {topFiveFunds.map((fund, index) => (
                    <div className="tmf_card_mf" key={index}>
                        <div className="tmf_card-header_mf">
                            <div className='tmf_img_name'>
                                {/* <img src={images[fund.logo]} alt={`${fund.amc_name} logo`} className="tmf_amc-logo" /> */}
                                <div className="tmf_amc-name">{fund.custom_scheme_name}</div>
                            </div>
                            <div className="tmf_rank"> {fund.ms_rating}⭐</div>
                        </div>
                        <div className='Aum_Nav'>
                            <div>Min.Investment: <strong>{fund.lumsum_minimum_amt}</strong> </div>
                            <div>AUM: <strong>{fund.scheme_aum}</strong> </div>
                        </div>
                        <div className="tmf_card-body">
                            <div className="tmf_details">
                                <div>1 Y returns:<strong className='f_return'> {fund.scheme_1_year_return}%</strong></div>
                                <div>3 Y returns:<strong className='f_return'> {fund.scheme_3_year_return}%</strong></div>
                                <div>5 Y returns:<strong className='f_return'> {fund.scheme_5_year_return}%</strong></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopMF;