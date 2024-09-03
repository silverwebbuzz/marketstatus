import React from "react";
import Hybridimg from "../../images/Hybridimg.png";
import { Link } from "react-router-dom";
import "../../style/mutualfunds/comanMutualfunds.css";
import sticker2 from '../../images/sticker2.png';
function Hybrid() {
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="mutualfunds_row">
            <div className="mutualfunds_left">
              <h1>Hybrid Funds</h1>
              <p>
                A hybrid fund is a mutual fund that integrates investments in
                both equities and bonds, presenting a balanced strategy for
                growth and income. It aims to deliver a combination of stability
                and the potential for enhanced returns, making it suitable for
                investors seeking a diversified investment portfolio.
              </p>
              <div className="mutualfunds_left_cover_row">
                <div className="left_cover_row_left">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/conservative_fund"
                      >
                        Conservative Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/balanced_fund"
                      >
                        Balanced Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/equity_savings_fund"
                      >
                        Equity Savings Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left_cover_row_right">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/aggresive_fund"
                      >
                        Aggressive Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/arbitrage_fund"
                      >
                        Arbitrage Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links hybrid">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/hybrid/multi_asset_allocation_fund"
                      >
                        Multi Asset Allocation Funds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mutualfunds_right">
              <div className="mutualfunds_img">
                <img src={Hybridimg} alt="hybrid" />
              </div>
            </div>
          </div>
        </div>
        <div className="stick">
        <img src={sticker2} alt="sticker" className='sticker1' />
        </div>
      </section>
    </>
  );
}

export default Hybrid;
