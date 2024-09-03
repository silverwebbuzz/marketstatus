import React from "react";
import Equitymain from "../../images/Equitymain.jpg";
import "../../style/mutualfunds/comanMutualfunds.css";
import { Link } from "react-router-dom";
import sticker2 from "../../images/sticker2.png";

function Equity() {
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="mutualfunds_row">
            <div className="mutualfunds_left">
              <h1>Equity Funds</h1>
              <p>
                An equity fund is a type of mutual fund that allocates its
                assets to stocks, enabling investors to combine their money and
                diversify their portfolios. It focuses on achieving long-term
                growth, making it suitable for individuals looking for higher
                returns and active involvement in the market.
              </p>
              <div className="mutualfunds_left_cover_row">
                <div className="left_cover_row_left">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/large_cap_fund"
                      >
                        Large Cap Fund
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/mid_cap_fund"
                      > 
                        Mid Cap Fund
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/small_cap_fund"
                      >
                        Small Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/large_mid_cap_fund"
                      >
                        Large & Mid Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/flexi_cap_fund"
                      >
                        Flexi Cap Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left_cover_row_right">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/multi_cap_fund"
                      >
                        Multi Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/international_fund"
                      >
                        International Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/value_fund"
                      >
                        Value Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/contra_fund"
                      >
                        Contra Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/equity/dividend_yield_fund"
                      >
                        Dividend Yield Funds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mutualfunds_right">
                <div className="mutualfunds_img">
                    <img src={Equitymain} alt="equity" />
                </div>
            </div>
          </div>
        </div>
        <div className="stick">
          <img src={sticker2} alt="sticker" className="sticker1" />
        </div>
      </section>
    </>
  );
}

export default Equity;
