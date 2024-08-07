import React from 'react';
import Indexmain from '../../images/Indexmain.png';
import '../../style/mutualfunds/indexx.css';


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
                                <li> <div className='index_list_item'>Nifty 50 Funds</div></li>
                                <li><div className='index_list_item'>Nifty Small Cap Funds</div></li>
                                <li><div className='index_list_item'>Nifty Bank Funds</div></li>
                            </ul>
                        </div>
                        <div className='Index_list2'>
                            <ul>
                                <li><div className='index_list_item'>Nifty Next 50 Funds</div></li>
                                <li><div className='index_list_item'>Nifty Mid Cap Funds</div></li>
                                <li><div className='index_list_item'>Sensex Funds</div></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Index;
