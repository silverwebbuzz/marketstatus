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
                        <li><div className='equity_list_item'>Large Cap Funds</div></li>
                        <li><div className='equity_list_item'>Mid Cap Funds</div></li>
                        <li><div className='equity_list_item'>Small Cap Funds</div></li>
                        <li><div className='equity_list_item'>Large & Mid Cap Funds</div></li>
                        <li><div className='equity_list_item'>Flexi Cap Funds</div></li>
                        <li><div className='equity_list_item'>Multi Cap Funds</div></li>
                        <li><div className='equity_list_item'>Divided Yield Funds</div></li>
                    </ul>
                    </div> 
                   <div className='equity_list2'>
                   <ul>
                        <li><div className='equity_list_item'>Bluechip Funds</div></li>
                        <li><div className='equity_list_item'>Focused Funds</div></li>
                        <li><div className='equity_list_item'>Sectoral Funds</div></li>
                        <li><div className='equity_list_item'>International Funds</div></li>
                        <li><div className='equity_list_item'>Vlaue Funds</div></li>
                        <li><div className='equity_list_item'>Contra Funds</div></li>
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
