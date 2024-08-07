import React from 'react';
import Hybridimg from '../../images/Hybridimg.png';
import '../../style/mutualfunds/hybrid.css';

function Hybrid() {
    return (
        <div className='container'>
            <div className='hybrid_screen'>
                <div className='hybrid_description'>
                    <h1 className='hybridheader'>Hybrid Funds</h1>
                    <p className='hybrid_p'>
                        A hybrid fund is a mutual fund that integrates investments in both equities and bonds, presenting a balanced strategy for growth and income. It aims to deliver a combination of stability and the potential for enhanced returns, making it suitable for investors seeking a diversified investment portfolio.</p>
                    <div className='hybrid_ul_li'>
                        <div className='hybrid_list1'>
                            <ul>
                                <li><div className='hybrid_list_item'>Conservative Funds</div></li>
                                <li><div className='hybrid_list_item'>Balanced Funds</div></li>
                                <li> <div className='hybrid_list_item'>Equity Savings Funds</div></li>
                            </ul>
                        </div>
                        <div className='hybrid_list2'>
                            <ul>
                                <li><div className='hybrid_list_item'>Aggressive Funds</div></li>
                                <li><div className='hybrid_list_item'>Arbitrage Funds</div></li>
                                <li><div className='hybrid_list_item'>Multi Asset Allocation Funds</div></li>
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
