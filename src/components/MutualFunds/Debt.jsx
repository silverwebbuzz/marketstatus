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
                    A debt fund is a mutual fund that invests in fixed-income securities 
                    like bonds and treasury bills, providing a way for investors to earn 
                    regular interest. It aims for stable returns and lower risk, making 
                    it suitable for those seeking steady income and capital preservation.
                    </p>
                    <div className='debt_ul_li'>
                   <div className='debt_list1'>
                   <ul>
                        <li className='ni ni-check-bold'>Liquid Funds</li>
                        <li>Banking & PSU Funds</li>
                        <li>Corporate Bond Funds</li>
                        <li>Dynamic Bond Funds</li>
                        <li>Overnight Funds</li>
                        <li>Ultra Short Duration Funds</li>
                        <li>Short Duration Funds</li>
                        <li>Low Duration Funds</li>
                    </ul>
                    </div> 
                   <div className='debt_list2'>
                   <ul>
                   <li>Credit Risk Funds</li>
                        <li>Gilt Funds</li>
                        <li>10 Year Guilt</li>
                        <li>Money Market Funds</li>
                        <li>Floater Funds</li>
                        <li>Medium Duration Funds</li>
                        <li>Medium long Duration Funds</li>
                        <li>Long Duration Funds</li>
                    </ul>
                   </div>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default Debt;
