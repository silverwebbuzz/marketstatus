import React from 'react';
import ELSSimg from '../../images/ELSSimg.png';
import '../../style/mutualfunds/elss.css';
import { Link } from 'react-router-dom';

function ELSS() {
    return (
        <div className='container'>
            <div className='elss_screen'>
                <div className='elss_description'>
                    <h1 className='elssheader'>Elss Funds</h1>
                    <p className='elss_p'>
                        An ELSS (Equity Linked Savings Scheme) fund is a category of mutual fund that mainly invests in stocks and provides tax advantages under Section 80C of the Income Tax Act. Its goal is to achieve long-term capital appreciation while offering tax relief, making it an appealing choice for investors seeking both wealth growth and tax savings.</p>
                    <div className='elss_ul_li'>
                        <div className='elss_list1'>
                            <ul>
                                <li className='elss_list_item'><Link className='after_Line' to="/mutualfunds/elss/growth_fund">Growth Funds</Link></li>
                                <li className='elss_list_item'><Link className='after_Line' to="/mutualfunds/elss/sectoral_fund">Sectoral Funds</Link></li>
                                <li className='elss_list_item'><Link className='after_Line' to="/mutualfunds/elss/multi_cap_fund">Multi-Cap Funds</Link></li>
                            </ul>
                        </div>
                        <div className='elss_list2'>
                            <ul>
                                <li className='elss_list_item'><Link className='after_Line' to="/mutualfunds/elss/large_cap_fund">Large-Cap Funds</Link></li>
                                <li className='elss_list_item'><Link className='after_Line' to="/mutualfunds/elss/mid_cap_fund">Mid-Cap Funds</Link></li>
                                <li className='elss_list_item'><Link className='after_Line'to="/mutualfunds/elss/small_cap_fund">Small-Cap Funds</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='elss_img'>
                    <img src={ELSSimg} alt="elss" />
                </div>
            </div>
        </div>
    )
}

export default ELSS;
