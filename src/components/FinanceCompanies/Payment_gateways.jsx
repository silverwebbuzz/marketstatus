import React, { useState } from "react";
import "../../style/Finance_companies/Insurance_companies.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const PaymentGateways = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container">
      <div className="gateway_header">
        <h2>Payment Gateway Companies</h2>
        <p>
          Payment gateways are tools that help businesses accept money online
          safely and easily. They act like digital cashiers, making sure that
          money moves from the customer’s bank to the seller’s bank without any
          problems. In India, where many people are shopping online, picking the
          right Payment Processing Software is very important.
        </p>
      </div>
      <div className="card_row">
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(0)}>
            <div className="img-name">
              <img src={images["CASHFREE.png"]} className="gateway-logo" />
              <div className="gateway-name">Cashfree Payment Gateway</div>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="1x"
              className="faicon"
            />
          </div>
          {expandedCard === 0 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>Type of Payment Gateway :</td>
                    <td className="td-left">Integrated Payment Gateway</td>
                  </tr>
                  <tr>
                    <td>Cashfree Payments Gateway Charges in India:</td>
                    <td className="td-left">
                      Initial Setup Fees: ZERO <br /> Annual Maintenance
                      Charges: ZERO
                      <br />
                      Minimum Annual Business Requirement: ZERO
                    </td>
                  </tr>
                  <tr>
                    <td>Applicable Fee per Transaction:</td>
                    <td className="td-left">
                      Credit & Debit cards on Visa, Mastercard, Maestro, RuPay,
                      65+ net banking: Flat fee @ 1.90% + GST
                      <br /> Wallets: Paytm, Airtel Money, Freecharge, Mobikwik,
                      Ola Money, Jiomoney: Flat fee @ 1.90% + GST per
                      transaction. <br />
                      UPI: Flat fee @ 1.90% + GST per transaction <br />
                      International Credit Cards on Visa, Mastercard, and
                      American Express: Flat fee @ 3.5% + Rs 7 per transaction
                    </td>
                  </tr>
                  <tr>
                    <td>Domestic Cards and Internet Banking Options:</td>
                    <td className="td-left">
                      Visa, Mastercard, Maestro, RuPay, and 65+ net banking
                    </td>
                  </tr>
                  <tr>
                    <td>Pay Later and EMI Options:</td>
                    <td className="td-left">
                      Pay Later (Ola Money Postpaid, Lazy Pay, and ePayLater,
                      ZestMoney and Flexmoney) EMI — Flexmoney, ZestMoney and
                      multiple bank EMI options
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Payment Gateway Integration:</td>
                    <td className="td-left">
                      Choose from the widest range – Android SDK, iOS SDK, Reach
                      Native, Flutter SDK, Cordova SDK, Xamarin Android SDK and
                      Xamarin iOS SDK.
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Time:</td>
                    <td className="td-left">
                      24 hours (sell today and get paid tomorrow)
                    </td>
                  </tr>
                  <tr>
                    <td>Account Activation:</td>
                    <td className="td-left">
                      Go live within 24 hours of registering. One of the limited
                      number of platforms that offers activation for
                      international payments on day one. Begin with
                      straightforward integration packages.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Documentation Required for Payment Gateway Registration:
                    </td>
                    <td className="td-left">
                      It is entirely digital procedure. Only a scanned copy of
                      the cancelled cheque, a valid PAN card and verification of
                      address are required.
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td-left">
                      Each account is allocated a Dedicated Account Manager who
                      serves as the single point of contact. Support for live
                      conversation is available Monday through Saturday.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="card_row">
        <div className="card_tbl">
          <div className="card-header-gateways" onClick={() => toggleExpand(1)}>
            <div className="img-name">
              <img src={images["PAYU.png"]} className="gateway-logo" />
              <div className="gateway-name">PayU Payment Gateway Service</div>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="1x"
              className="faicon"
            />
          </div>
          {expandedCard === 1 && (
            <div className="card-body-gateways">
              <table className="details-table-gateways">
                <tbody className="gateways-tbody">
                  <tr>
                    <td>PayU Payments Gateway Charges in India</td>
                    <td className="td-left">Annual Maintenance Charge: Zero</td>
                  </tr>
                  <tr>
                    <td>Cashfree Payments Gateway Charges in India:</td>
                    <td className="td-left">
                      Initial Setup Fees: ZERO <br /> Annual Maintenance
                      Charges: ZERO
                      <br />
                      Minimum Annual Business Requirement: ZERO
                    </td>
                  </tr>
                  <tr>
                    <td>Applicable Fee per Transaction:</td>
                    <td className="td-left">
                      Credit & Debit cards on Visa, Mastercard, Maestro, RuPay,
                      65+ net banking: Flat fee @ 1.90% + GST
                      <br /> Wallets: Paytm, Airtel Money, Freecharge, Mobikwik,
                      Ola Money, Jiomoney: Flat fee @ 1.90% + GST per
                      transaction. <br />
                      UPI: Flat fee @ 1.90% + GST per transaction <br />
                      International Credit Cards on Visa, Mastercard, and
                      American Express: Flat fee @ 3.5% + Rs 7 per transaction
                    </td>
                  </tr>
                  <tr>
                    <td>Domestic Cards and Internet Banking Options:</td>
                    <td className="td-left">
                      Visa, Mastercard, Maestro, RuPay, and 65+ net banking
                    </td>
                  </tr>
                  <tr>
                    <td>Pay Later and EMI Options:</td>
                    <td className="td-left">
                      Pay Later (Ola Money Postpaid, Lazy Pay, and ePayLater,
                      ZestMoney and Flexmoney) EMI — Flexmoney, ZestMoney and
                      multiple bank EMI options
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Payment Gateway Integration:</td>
                    <td className="td-left">
                      Choose from the widest range – Android SDK, iOS SDK, Reach
                      Native, Flutter SDK, Cordova SDK, Xamarin Android SDK and
                      Xamarin iOS SDK.
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Time:</td>
                    <td className="td-left">
                      24 hours (sell today and get paid tomorrow)
                    </td>
                  </tr>
                  <tr>
                    <td>Account Activation:</td>
                    <td className="td-left">
                      Go live within 24 hours of registering. One of the limited
                      number of platforms that offers activation for
                      international payments on day one. Begin with
                      straightforward integration packages.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Documentation Required for Payment Gateway Registration:
                    </td>
                    <td className="td-left">
                      It is entirely digital procedure. Only a scanned copy of
                      the cancelled cheque, a valid PAN card and verification of
                      address are required.
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td-left">
                      Each account is allocated a Dedicated Account Manager who
                      serves as the single point of contact. Support for live
                      conversation is available Monday through Saturday.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateways;
