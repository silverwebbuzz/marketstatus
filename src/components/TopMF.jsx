import React from 'react';
import '../style/MutualFund.css';
import '../style/TopMF.css';

const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
};

const TopMF = ({ data }) => {
    if (!data || !data.top_mutual_fund_companies) return null;

    const topFiveFunds = data.top_mutual_fund_companies.slice(0, 5);

    return (
        <div>
            <div className="tmf_card_row">
                {topFiveFunds.map((fund, index) => (
                    <div className="tmf_card_mf" key={index}>
                        <div className="tmf_card-header_mf">
                            <div className='tmf_img_name'>
                                <div className="tmf_amc-name">{fund.custom_scheme_name}</div>
                            </div>
                            <div className="tmf_rank"> {fund.ms_rating}⭐</div>
                        </div>
                        <div className='Aum_Nav'>
                            <div>Min.Investment: <strong>{formatNumber(fund.lumsum_minimum_amt)}</strong> </div>
                            <div>AUM: <strong>{formatNumber(fund.scheme_aum)}</strong> </div>
                        </div>
                        <div className="tmf_card-body">
                            <div className="tmf_details">
                                <div>1 Y returns:<strong className='f_return'> {formatNumber(fund.scheme_1_year_return)}%</strong></div>
                                <div>3 Y returns:<strong className='f_return'> {formatNumber(fund.scheme_3_year_return)}%</strong></div>
                                <div>5 Y returns:<strong className='f_return'> {formatNumber(fund.scheme_5_year_return)}%</strong></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopMF;
