import React from "react";
import Debtimg from "../../images/Debtimg.jpg";
import "../../style/mutualfunds/comanMutualfunds.css";
import { Link } from "react-router-dom";
import sticker1 from '../../images/sticker1.png';

function Debt() {
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="mutualfunds_row row_reverse">
            <div className="mutualfunds_left">
              <h1>Debt Funds</h1>
              <p >
                A debt fund is a mutual fund that allocates its resources to
                fixed-income instruments such as bonds and treasury bills,
                offering investors a means to earn consistent interest. It
                targets stable returns and reduced risk, making it ideal for
                individuals looking for reliable income and capital protection.
              </p>
              <div className="mutualfunds_left_cover_row">
                <div className="left_cover_row_left">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/liquid_fund"
                      >
                        Liquid Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/banking_psu_fund"
                      >
                        Banking & PSU Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/corporate_bond_fund"
                      >
                        Corporate Bond Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/dynamic_bond"
                      >
                        Dynamic Bond Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/overnight_fund"
                      >
                        Overnight Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/ultra_short_duration_fund"
                      >
                        Ultra Short Duration Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/short_duration_fund"
                      >
                        Short Duration Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/low_duration_fund"
                      >
                        Low Duration Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left_cover_row_right">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/credit_risk_fund"
                      >
                        Credit Risk Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/gilt_fund"
                      >
                        Gilt Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/10year_guilt_fund"
                      >
                        10 Year Guilt
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/money_market_fund"
                      >
                        Money Market Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/floater_fund"
                      >
                        Floater Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/medium_duration_fund"
                      >
                        Medium Duration Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/medium_long_duration_fund"
                      >
                        Medium Long Duration Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links debt">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/debt/long_duration_fund"
                      >
                        Long Duration Funds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mutualfunds_right">
                <div className="mutualfunds_img">
                    <img src={Debtimg} alt="debt" />
                </div>
            </div>
          </div>
        </div>
        <div className="stick">
          <img src={sticker1} alt="sticker" className='sticker1' />
        </div>
      </section>
    </>
  );
}

export default Debt;
