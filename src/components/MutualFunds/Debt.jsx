import React from 'react';
import Debtimg from '../../images/Debtimg.jpg';
import '../../style/mutualfunds/debt.css';


function Debt() {
    return (
        <div className='container'>
            <div className='debt_screen'>
                <div className='debt_img'>
                    <img src={Debtimg} alt="debt" />
                </div>
                <div className='debt_description'>
                    <h1 className='debtheader'>Debt Funds</h1>
                    <p className='debt_p'>
                        A debt fund is a mutual fund that allocates its resources to fixed-income instruments such as bonds and treasury bills, offering investors a means to earn consistent interest. It targets stable returns and reduced risk, making it ideal for individuals looking for reliable income and capital protection.
                    </p>
                    <div className='debt_ul_li'>
                        <div className='debt_list1'>
                            <ul>
                                <li><div className='debt_list_item'>Liquid Funds</div></li>
                                <li><div className='debt_list_item'>Banking & PSU Funds</div></li>
                                <li><div className='debt_list_item'>Corporate Bond Funds</div></li>
                                <li><div className='debt_list_item'>Dynamic Bond Funds</div></li>
                                <li><div className='debt_list_item'>Overnight Funds</div></li>
                                <li><div className='debt_list_item'>Ultra Short Duration Funds</div></li>
                                <li><div className='debt_list_item'>Short Duration Funds</div></li>
                                <li><div className='debt_list_item'>Low Duration Funds</div></li>
                            </ul>
                        </div>
                        <div className='debt_list2'>
                            <ul>
                                <li><div className='debt_list_item'>Credit Risk Funds</div></li>
                                <li><div className='debt_list_item'>Gilt Funds</div></li>
                                <li><div className='debt_list_item'>10 Year Guilt</div></li>
                                <li><div className='debt_list_item'>Money Market Funds</div></li>
                                <li><div className='debt_list_item'>Floater Funds</div></li>
                                <li><div className='debt_list_item'>Medium Duration Funds</div></li>
                                <li><div className='debt_list_item'>Medium long Duration Funds</div></li>
                                <li><div className='debt_list_item'>Long Duration Funds</div></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Debt;
