import React,{ useState } from 'react'
import microfinanceheader from '../../assets/microfianceheader.png'

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg|webp)$/)
);

const Micro_finance_companies = () => {
  const [expandedCard, setExpandedCard] = useState(null); // State to track expanded card

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section>
    <div className='container'>
      <div className='micro_finance_company'>
        <img src={microfinanceheader} alt="microfinanceimg" className='microfinanceheaderimg'/>
      <h1>11 Best Micro Finance Company In India</h1>
      <p>Microfinance term relates to a small amount of credit facility offered primarily to the low-income group, unbanked and marginalized people in rural and semi-urban areas</p>
      <p>The microloans support livelihoods in the rural areas where banks are very far and access to formal banking services is remote.</p> 
      <h2>What are Microfinance Companies </h2>  
      <p>Microfinance companies are non-banking finance (NBFC) companies registered with Reserve Bank of India (RBI) that offer short term loans to people at lower interest rates than primary lenders.</p> 
      <p>Microfinance companies focus on rural or semi-urban areas where people need money urgently for a short time period usually for a period of 1 to 2 years. </p>
      <p>Microfinance companies on one hand work closely with women entrepreneurs for helping them start small tailoring shops, art and craft shops and local produce businesses. </p>
      <h2>Working Model of Microfinance Companies in India</h2>
      <h4>1. Self Help Group (SHG)</h4>
      <p>Self Help Group is an informal group of small entrepreneurs with similar socio-economic backgrounds. Small entrepreneurs including women come together to create a common fund to meet the emergency needs of their business. The SHG is a savings oriented group.</p>
      <p>They fix periodic meets, open an account with a microfinance company and save regularly in the fund, and when any group member needs funds, he gets that from the collective savings.</p>
      <p>These groups are generally non-profit self-sustaining organizations. The group itself takes care of the responsibility of debt recovery.</p>
      <p>Self-help groups get money on credit from the bank like NABARD and SIDBI once they become stable and present a track record of regular repayments of their borrowers.</p>
      <h4>2. Joint Liability Group (JLG)</h4>
      <p>Joint Liability Group concept for microfinance was started by NABARD. JLG is a group of 4-10 small farmers, rural entrepreneurs, people of the same village/locality having the same socioeconomic background.</p>
      <p>The JLG is formed with the purpose of availing loan from a microfinance company without any collateral. The JLG is for income generation, activity-oriented groups.</p>
      <p><strong>Microfinance companies can finance a JLG in two ways</strong></p>
      <p>Financing to the group directly</p>
      <p>Financing to the individual in the groups</p>
      <br />
      <h1>Best Micro Finance Companies in India Working as Banks</h1>
      </div>

      <div className="card_row">
        {/* for first company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(0)}>
            <div className="img-name">
              <img src={images["bandhanbc.png"]} className="mfc-logo" alt='' />
              <div className="gateway-name">Bandhan Bank Limited</div>
            </div>
          </div>
          {expandedCard === 0 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Bandhan Bank Limited still serves the rural and low-income earners and has a total advance portfolio of Rs. 71,846 crore as of 31st March 2020.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Has vast experience in microfinance</li>
                      <li>Now offers other banking services</li>
                      <li>Dedicate microfinance loans</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Most of the banking outlets in eastern India</li>
                      <li>Also working as a bank</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for second company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(1)}>
            <div className="img-name">
              <img src={images["ujjivanbc.webp"]} className="mfc-logo" alt='' />
              <div className="gateway-name">Ujjivan Small Finance Bank</div>
            </div>
          </div>
          {expandedCard === 1 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Ujjivan Small Finance Bank has a diversified portfolio with branches spread across 24 states with a customer base of over 4.9 million.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Earlier experience as a micro financer</li>
                      <li>Spread across 24 states</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Most of the banking outlets in southern India</li>
                      <li>Also working as a bank</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
         {/* for third company */}
         <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(2)}>
            <div className="img-name">
              <img src={images["equitasbc.png"]} className="mfc-logo" alt='' />
              <div className="gateway-name">Equitas Small Finance Bank</div>
            </div>
          </div>
          {expandedCard === 2 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Equitas Small Finance Bank still caters to the economically weaker section (EWS) and low-income group (LIG). It provides small loans ranging from Rs. 5,000 to Rs. 50,000 for income generation purposes.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Past experience as a micro financier</li>
                      <li>Offers net banking, deposits, payments and other banking services</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Loan amount limited to Rs. 50,000</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 4th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(3)}>
            <div className="img-name">
              <img src={images["suryodaybc.jpg"]} className="mfc-logo" alt=''/>
              <div className="gateway-name">Suryoday Small Finance Bank</div>
            </div>
          </div>
          {expandedCard === 3 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Suryoday small finance bank has its genesis in Suryoday Microfinance Private Limited. After eight years of microfinance, the company started its banking operations in January 2017.Suryoday works on Joint liability group loans for income-generating activities.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Previous experience as a micro financier</li>
                      <li>Small banking services</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>The micro-credit amount is limited to Rs. 52,500.</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 5th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(4)}>
            <div className="img-name">
              <img src={images["satinbc.png"]} className="mfc-logo" alt=''/>
              <div className="gateway-name">Satin Creditcare Network Limited</div>
            </div>
          </div>
          {expandedCard === 4 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Satin Creditcare Network primarily works on the Joint Liability Group model to provide collateral-free microcredit facilities in rural, semi-urban and urban areas.The loans offered include solar loans, loans for purchasing cycle, home appliances, mobile, creating water and sanitation facilities.Satin Creditcare Network Limited has operations in 22 states and reaches 85,000+ villages. Satin offers MSME loans and also finances other microfinance companies.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Products for personal loan and business needs</li>
                      <li>Operations in 22 states</li>
                      <li>Loans to other microfinance companies</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Works only on Joint Liability Group model</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 6th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(5)}>
            <div className="img-name">
              <img src={images["annapurnabc.png"]} className="mfc-logo" alt=''/>
              <div className="gateway-name"> Annapurna Finance Pvt. Ltd</div>
            </div>
          </div>
          {expandedCard === 5 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Annapurna Finance Pvt. Ltd was established in 2009 with the aim to provide microfinance to the interior unserved areas of Odisha. The company addresses the economic necessities of poor women at their doorstep.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Microfinance and MSME loan</li>
                      <li>Housing finance loans available</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Operations majorly in the eastern part of India</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 7th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(6)}>
            <div className="img-name">
              <img src={images["arohan.png"]} className="mfc-logo" alt=''/>
              <div className="gateway-name">Arohan Financial Services Pvt. Ltd</div>
            </div>
          </div>
          {expandedCard === 6 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Arohan Financial Services is on a mission to empower the underserved through a range of financial services. The company has an outstanding loan portfolio of Rs. 4857 Crores and operates through 711 branches in 10 states.Arohan Financial Services offers microfinance loans and also MSME lending services. The loans’ purposes include solar loan, mobile, sanitation, cycle and loans for trade & services.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Microfinance and MSME loan</li>
                      <li>Operates through 711 branches in 10 states</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Operates majorly in the east and north-east India</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 8th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(7)}>
            <div className="img-name">
              <img src={images["muthootbc.png"]} className="mfc-logo" alt=''/>
              <div className="gateway-name">Muthoot Microfin Limited</div>
            </div>
          </div>
          {expandedCard === 7 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Muthoot Microfin Limited is the microfinance arm of the large Muthoot Pappachan Group. The microfinance company provides micro-loans to women entrepreneurs with a focus on rural areas of the country.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Income-generating loans like for dairy</li>
                      <li>Life betterment loans like education, mobile, solar loans</li>
                      <li>Health and hygiene loans like water and sanitation loans</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Part of Muthoot  Pappachan Group</li>
                      <li>Focused on rural women entrepreneurs</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* for 8th company */}
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(7)}>
            <div className="img-name">
              <img src={images["muthootbc.png"]} className="mfc-logo" alt=''/>
              <div className="gateway-name">Muthoot Microfin Limited</div>
            </div>
          </div>
          {expandedCard === 7 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>About</td>
                    <td>Muthoot Microfin Limited is the microfinance arm of the large Muthoot Pappachan Group. The microfinance company provides micro-loans to women entrepreneurs with a focus on rural areas of the country.</td>
                  </tr>
                  <tr>
                    <td>Pros Of Bank:</td>
                    <td>
                      <li>Income-generating loans like for dairy</li>
                      <li>Life betterment loans like education, mobile, solar loans</li>
                      <li>Health and hygiene loans like water and sanitation loans</li>
                    </td>
                  </tr>
                  <tr>
                    <td>Cons of Bank:</td>
                    <td>
                      <li>Part of Muthoot  Pappachan Group</li>
                      <li>Focused on rural women entrepreneurs</li>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </section>
  )
}

export default Micro_finance_companies
