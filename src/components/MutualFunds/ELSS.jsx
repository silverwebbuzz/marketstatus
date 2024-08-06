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
                   <li><div className='elss_list_item'>Growth Funds</div></li>
                                <li><div className='elss_list_item'>Dividend Funds</div></li>
                                <li><div className='elss_list_item'>Tax-Saving Funds</div></li>
                                <li><div className='elss_list_item'>Long-Term Funds</div></li>
                                <li><div className='elss_list_item'>Multi-Cap Funds</div></li>
                    </ul>
                    </div> 
                   <div className='elss_list2'>
                   <ul>
                   <li><div className='elss_list_item'>Large-Cap Funds</div></li>
                                <li><div className='elss_list_item'>Mid-Cap Funds</div></li>
                                <li><div className='elss_list_item'>Small-Cap Funds</div></li>
                                <li><div className='elss_list_item'>Equity-Debt Funds</div></li>
                                <li><div className='elss_list_item'>Sectoral Funds</div></li>
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
