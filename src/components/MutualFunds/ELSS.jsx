import React from "react";
import ELSSimg from "../../images/ELSSimg.png";
import "../../style/mutualfunds/comanMutualfunds.css";
import { Link } from "react-router-dom";

function ELSS() {
  return (
    <>
      <section className="section_gap">
        <div className="container">
          <div className="mutualfunds_row">
            <div className="mutualfunds_left">
              <h1>Elss Funds</h1>
              <p>
                An ELSS (Equity Linked Savings Scheme) fund is a category of
                mutual fund that mainly invests in stocks and provides tax
                advantages under Section 80C of the Income Tax Act. Its goal is
                to achieve long-term capital appreciation while offering tax
                relief, making it an appealing choice for investors seeking both
                wealth growth and tax savings.
              </p>
              <div className="mutualfunds_left_cover_row">
                <div className="left_cover_row_left">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/growth_fund"
                      >
                        Growth Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/sectoral_fund"
                      >
                        Sectoral Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/multi_cap_fund"
                      >
                        Multi-Cap Funds
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left_cover_row_right">
                  <ul className="cover_ul">
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/large_cap_fund"
                      >
                        Large-Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/mid_cap_fund"
                      >
                        Mid-Cap Funds
                      </Link>
                    </li>
                    <li className="mutualfunds_coman_links elss">
                      <Link
                        className="after_Line"
                        to="/mutualfunds/elss/small_cap_fund"
                      >
                        Small-Cap Funds
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mutualfunds_right">
                <div className="mutualfunds_img">
                    <img src={ELSSimg} alt="elss" />
                </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ELSS;
