import React from 'react';
import Hybridimg from '../../images/Hybridimg.png';
import { Link } from 'react-router-dom';
import '../../style/mutualfunds/hybrid.css';

function Hybrid() {
    return (
        <div className='container'>
            <div className='hybrid_screen'>
                <div className='hybrid_description'>
                    <h1 className='hybridheader'>Hybrid Funds</h1>
                    <p className='hybrid_p'>
                        A hybrid fund is a mutual fund that integrates investments in both equities and bonds, presenting a balanced strategy for growth and income. It aims to deliver a combination of stability and the potential for enhanced returns, making it suitable for investors seeking a diversified investment portfolio.
                    </p>
                    <div className='hybrid_ul_li'>
                        <div className='hybrid_list1'>
                            <ul>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/conservative_fund">Conservative Funds</Link></li>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/balanced_fund">Balanced Funds</Link></li>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/equity_savings_fund">Equity Savings Funds</Link></li>
                            </ul>
                        </div>
                        <div className='hybrid_list2'>
                            <ul>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/aggresive_fund">Aggressive Funds</Link></li>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/arbitrage_fund">Arbitrage Funds</Link></li>
                                <li className='hybrid_list_item'><Link className='after_Line' to="/mutualfunds/hybrid/multi_asset_allocation_fund">Multi Asset Allocation Funds</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='hybrid_img'>
                    <img src={Hybridimg} alt="hybrid" />
                </div>
            </div>
        </div>
    )
}

export default Hybrid;
