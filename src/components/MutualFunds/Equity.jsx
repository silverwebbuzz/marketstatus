import React from 'react';
import Equitymain from '../../images/Equitymain.jpg';
import '../../style/mutualfunds/equity.css';
import { Link } from 'react-router-dom';


function Equity() {
    return (
        <div className='container'>
            <div className='equity_screen'>
                <div className='equity_description'>
                    <h1 className='equityheader'>Equity Funds</h1>
                    <p className='equity_p'>
                        An equity fund is a type of mutual fund that allocates its assets to stocks, enabling investors to combine their money and diversify their portfolios. It focuses on achieving long-term growth, making it suitable for individuals looking for higher returns and active involvement in the market.
                    </p>
                    <div className='equity_ul_li'>
                        <div className='equity_list1'>
                            <ul>
                                <li className='equity_list_item'><Link to="/funds/large_cap_fund">Large Cap Fund</Link></li>
                                <li className='equity_list_item'><Link to="/funds/mid_cap_fund">Mid Cap Fund</Link></li>
                                <li className='equity_list_item'><Link to="/funds/small_cap_fund">Small Cap Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/large_mid_cap_fund">Large & Mid Cap Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/flexi_cap_fund">Flexi Cap Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/multi_cap_fund">Multi Cap Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/dividend_yield_fund">Dividend Yield Funds</Link></li>
                            </ul>
                        </div>
                        <div className='equity_list2'>
                            <ul>
                                <li className='equity_list_item'><Link to="/funds/bluechip_fund">Bluechip Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/focused_fund">Focused Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/sectoral_fund">Sectoral Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/international_fund">International Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/value_fund">Value Funds</Link></li>
                                <li className='equity_list_item'><Link to="/funds/contra_fund">Contra Funds</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='quity_img'>
                    <img src={Equitymain} alt="equity" />
                </div>
            </div>
        </div>
    )
}

export default Equity
