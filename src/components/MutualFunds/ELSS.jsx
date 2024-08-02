import React from 'react';
import ELSSimg from '../../images/ELSSimg.png';
import '../../style/mutualfunds/elss.css';


function ELSS() {
    return (
        <div className='container'>
            <div className='elss_screen'>
                <div className='elss_description'>
                    <h1 className='elssheader'>Elss Funds</h1>
                    <p className='elss_p'>
                    An ELSS (Equity Linked Savings Scheme) fund is a type of mutual fund that primarily invests in equities and offers tax benefits under Section 80C of the Income Tax Act. It aims for long-term capital growth while providing tax savings, making it an attractive option for investors looking to grow wealth and save on taxes.
                    </p>
                    <div className='elss_ul_li'>
                   <div className='elss_list1'>
                   <ul>
                   <li>Growth Funds</li>
                                <li>Dividend Funds</li>
                                <li>Tax-Saving Funds</li>
                                <li>Long-Term Funds</li>
                                <li>Multi-Cap Funds</li>
                    </ul>
                    </div> 
                   <div className='elss_list2'>
                   <ul>
                   <li>Large-Cap Funds</li>
                                <li>Mid-Cap Funds</li>
                                <li>Small-Cap Funds</li>
                                <li>Equity-Debt Funds</li>
                                <li>Sectoral Funds</li>
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
