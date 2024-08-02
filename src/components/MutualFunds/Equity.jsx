import React from 'react';
import Equitymain from '../../images/Equitymain.jpg';
import '../../style/mutualfunds/equity.css';


function Equity() {
    return (
        <div className='container'>
            <div className='equity_screen'>
                <div className='equity_description'>
                    <h1 className='equityheader'>Equity Funds</h1>
                    <p className='equity_p'>
                        An equity fund is a mutual fund that invests in stocks,
                        allowing investors to pool their money and diversify
                        their holdings. It aims for growth over time, making
                        it ideal for those seeking higher returns and market participation.
                    </p>
                    <div className='equity_ul_li'>
                   <div className='equity_list1'>
                   <ul>
                        <li>Large Cap Funds</li>
                        <li>Mid Cap Funds</li>
                        <li>Small Cap Funds</li>
                        <li>Large & Mid Cap Funds</li>
                        <li>Flexi Cap Funds</li>
                        <li>Multi Cap Funds</li>
                        <li>Divided Yield Funds</li>
                    </ul>
                    </div> 
                   <div className='equity_list2'>
                   <ul>
                        <li>Bluechip Funds</li>
                        <li>Focused Funds</li>
                        <li>Sectoral Funds</li>
                        <li>International Funds</li>
                        <li>Vlaue Funds</li>
                        <li>Contra Funds</li>
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
