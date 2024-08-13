import React from 'react';
import Indexmain from '../../images/Indexmain.png';
import '../../style/mutualfunds/indexx.css';
import { Link } from 'react-router-dom';


function Index() {
    return (
        <div className='container'>
            <div className='Index_screen'>
                <div className='Index_img'>
                    <img src={Indexmain} alt="Index" />
                </div>
                <div className='Index_description'>
                    <h1 className='Indexheader'>Index Funds</h1>
                    <p className='Index_p'>
                        An index fund is a type of mutual fund designed to mirror the performance of a particular market index, such as the S&P 500. It offers an affordable way for investors to obtain extensive market exposure and realize returns that align with the performance of the index.</p>
                    <div className='Index_ul_li'>
                        <div className='Index_list1'>
                            <ul>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/nifty_50_fund" > Nifty 50 Funds </Link></li>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/nifty_small_cap_fund" >Nifty Small Cap Funds</Link></li>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/nifty_bank_fund" >Nifty Bank Funds</Link></li>
                            </ul>
                        </div>
                        <div className='Index_list2'>
                            <ul>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/nifty_next_50_fund" >Nifty Next 50 Funds</Link></li>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/nifty_mid_cap_fund" >Nifty Mid Cap Funds</Link></li>
                                <li className='index_list_item'><Link className='after_Line' to="/mutualfunds/index/sensex_fund" >Sensex Funds</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Index;
