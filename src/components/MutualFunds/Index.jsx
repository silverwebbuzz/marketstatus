import React from "react";
import Indexmain from "../../images/Indexmain.png";
import "../../style/mutualfunds/comanMutualfunds.css";
import { Link } from "react-router-dom";
import sticker1 from '../../images/sticker1.png';

function Index() {
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="mutualfunds_row row_reverse">
            <div className="mutualfunds_left">
              <h1>Index Funds</h1>
              <p>
                An index fund is a type of mutual fund designed to mirror the
                performance of a particular market index, such as the S&P 500.
                It offers an affordable way for investors to obtain extensive
                market exposure and realize returns that align with the
                performance of the index.
              </p>
              <div className="mutualfunds_left_cover_row">
                <div className="left_cover_row_left">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/nifty_50_fund"
                      >
                        {" "}
                        Nifty 50 Funds{" "}
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/nifty_small_cap_fund"
                      >
                        Nifty Small Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/nifty_bank_fund"
                      >
                        Nifty Bank Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left_cover_row_right">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/nifty_next_50_fund"
                      >
                        Nifty Next 50 Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/nifty_mid_cap_fund"
                      >
                        Nifty Mid Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links index">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/index/sensex_fund"
                      >
                        Sensex Funds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mutualfunds_right">
                <div className="mutualfunds_img">
                    <img src={Indexmain} alt="Index" />
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

export default Index;
