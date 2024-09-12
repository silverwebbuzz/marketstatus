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
  require.context("../../assets/payment_gateways", false, /\.(png|jpe?g|svg)$/)
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

      {/* 1- Cashfree Payment Gateway START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(0)}>
            <div className="img_name">
              <img src={images["CASHFREE.png"]} alt="image"/>
              <div className="gateway_name">Cashfree Payment Gateway</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 0 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Type of Payment Gateway :</td>
                    <td className="td_left">Integrated Payment Gateway</td>
                  </tr>
                  <tr>
                    <td>Cashfree Payments Gateway Charges in India:</td>
                    <td className="td_left">
                      Initial Setup Fees: ZERO <br /> Annual Maintenance
                      Charges: ZERO
                      <br />
                      Minimum Annual Business Requirement: ZERO
                    </td>
                  </tr>
                  <tr>
                    <td>Applicable Fee per Transaction:</td>
                    <td className="td_left">
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
                    <td className="td_left">
                      Visa, Mastercard, Maestro, RuPay, and 65+ net banking
                    </td>
                  </tr>
                  <tr>
                    <td>Pay Later and EMI Options:</td>
                    <td className="td_left">
                      Pay Later (Ola Money Postpaid, Lazy Pay, and ePayLater,
                      ZestMoney and Flexmoney) EMI — Flexmoney, ZestMoney and
                      multiple bank EMI options
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Payment Gateway Integration:</td>
                    <td className="td_left">
                      Choose from the widest range – Android SDK, iOS SDK, Reach
                      Native, Flutter SDK, Cordova SDK, Xamarin Android SDK and
                      Xamarin iOS SDK.
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Time:</td>
                    <td className="td_left">
                      24 hours (sell today and get paid tomorrow)
                    </td>
                  </tr>
                  <tr>
                    <td>Account Activation:</td>
                    <td className="td_left">
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
                    <td className="td_left">
                      It is entirely digital procedure. Only a scanned copy of
                      the cancelled cheque, a valid PAN card and verification of
                      address are required.
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">
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
      {/* 2- PayU Payment Gateway Service START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(1)}>
            <div className="img_name">
              <img src={images["PAYU.png"]} />
              <div className="gateway_name">PayU Payment Gateway Service</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 1 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>PayU Payments Gateway Charges in India:</td>
                    <td className="td_left">Annual Maintenance Charge: Zero</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction:</td>
                    <td className="td_left">
                      2% + GST for each transaction. <br /> For American Express
                      & Diners Cards, transaction fees = 3% + GST for
                      international transactions & EMI payment options, there is
                      a set-up fee that needs to be paid along with Annual
                      Maintenance Charges (AMC). Also, the transaction rates are
                      3% + ₹6 for every transaction.
                    </td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support:</td>
                    <td className="td_left">Supported</td>
                  </tr>
                  <tr>
                    <td>Domestic Credit Cards Supported:</td>
                    <td className="td_left">
                      Visa/Mastercard/Diners/Amex credit Cards
                    </td>
                  </tr>
                  <tr>
                    <td>Multi-Currency Support:</td>
                    <td className="td_left">Yes</td>
                  </tr>
                  <tr>
                    <td>Withdrawal Fees:</td>
                    <td className="td_left">Zero</td>
                  </tr>
                  <tr>
                    <td>Settlement days:</td>
                    <td className="td_left">T+2 days</td>
                  </tr>
                  <tr>
                    <td>No of Days to Start a Transaction:</td>
                    <td className="td_left">5-7 days</td>
                  </tr>
                  <tr>
                    <td>Mobile App Integration:</td>
                    <td className="td_left">Android, Windows and iOS</td>
                  </tr>
                  <tr>
                    <td>
                      PayUMoney Payment Gateway Documentation Requirement :
                    </td>
                    <td className="td_left">
                      Proof of identity, bank account, and address, a cancelled
                      cheque, and a PAN card for your business. You may also be
                      required to provide documentation pertaining to your
                      company’s website, products, or services, as well as
                      evidence of business registration.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 3- Razorpay Payment Gateway & Payment Solutions START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(2)}>
            <div className="img_name">
              <img src={images["RAZOR.png"]}  />
              <div className="gateway_name">
                Razorpay Payment Gateway & Payment Solutions
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 2 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge:</td>
                    <td className="td_left">ZERO</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction:</td>
                    <td className="td_left">
                      Simple and transparent pricing plan which has no hidden
                      fees: 2% per successful transaction. <br /> +1% for
                      International cards, EMI and Amex. <br />
                      No setup fees; No Annual maintenance charges; GST
                      applicable of 18% on the transaction fee.
                    </td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support:</td>
                    <td className="td_left">
                      International approval is a separate process and takes
                      longer, which is subject to the bank’s approval.
                    </td>
                  </tr>
                  <tr>
                    <td>Multi-Currency Support:</td>
                    <td className="td_left">Does not support</td>
                  </tr>
                  <tr>
                    <td>Withdrawal Fees :</td>
                    <td className="td_left">Zero</td>
                  </tr>
                  <tr>
                    <td>Settlement Days :</td>
                    <td className="td_left">
                      3 days in your connected Bank account
                    </td>
                  </tr>
                  <tr>
                    <td>Documentation Required :</td>
                    <td className="td_left">
                      The requisite documentation comprises the following: a PAN
                      card for the business, the Aadhaar card of the account
                      holder, bank account particulars, business registration
                      documents (e.g., Articles of Association, Certificate of
                      Incorporation, Memorandum of Association, or Partnership
                      Deed), a cancelled cheque from the bank account designated
                      for payment receipts, and a GST certificate (if
                      applicable).
                    </td>
                  </tr>
                  <tr>
                    <td>Supported eCommerce CMS System :</td>
                    <td className="td_left">
                      All major ones such as WooCommerce, Magento, CS-Cart,
                      Opencart, Shopify, WHCMS, WordPress, Arastta, Prestashop.
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Integration :</td>
                    <td className="td_left">
                      Mobile SDK’s for Android and iOS via Cordova/Phonegap
                    </td>
                  </tr>
                  <tr>
                    <td>Razorpay Payment Gateway Integrations :</td>
                    <td className="td_left">
                      Woocommerce, Magento, CSCart, Opencart, Shopify, WHMCS,
                      Prestashop, WordPress, Wix, Arasatta, East Digital
                      Downloads
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 4- InstaMojo Payment Gateway India START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(3)}>
            <div className="img_name">
              <img src={images["INSTAMOJO.png"]}  />
              <div className="gateway_name">
                InstaMojo Payment Gateway India
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 3 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge:</td>
                    <td className="td_left">ZERO</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction:</td>
                    <td className="td_left">
                      Flat fee @ 2% + ₹3 per transaction
                    </td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support:</td>
                    <td className="td_left">Not supported</td>
                  </tr>
                  <tr>
                    <td>Withdrawal Fees :</td>
                    <td className="td_left">Zero</td>
                  </tr>
                  <tr>
                    <td>Settlement Days :</td>
                    <td className="td_left">
                      3 days in your connected Bank account
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">
                      It is clearly stated on their IVR system that they are
                      closed on weekends.
                    </td>
                  </tr>
                  <tr>
                    <td>No of Days to Start a Transaction :</td>
                    <td className="td_left">
                      You can begin receiving payments immediately following an
                      easy email registration.
                    </td>
                  </tr>
                  <tr>
                    <td>Supported eCommerce CMS System :</td>
                    <td className="td_left">
                      All major ones such as Magento, Prestashop, Opencart etc.
                    </td>
                  </tr>
                  <tr>
                    <td>InstaMojo Payment Gateway Integrations :</td>
                    <td className="td_left">
                      CScart, Drupal, WordPress, WHMCS, Prestashop, Magento,
                      Woocommerce, Ionic SDK, Python, Ruby, PHP, Java, Android,
                      iOS
                    </td>
                  </tr>
                  <tr>
                    <td>Instamojo Payment Gateway Documentation :</td>
                    <td className="td_left">
                      Typical documentation requirements include a copy of the
                      applicant’s PAN card, bank account information, business
                      registration documents (e.g., a Partnership Deed or GST
                      registration certificate), a voided bank account cheque,
                      and proof of identity and address (e.g., an Aadhaar card,
                      passport, or driver’s licence).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 5- PayPal Payment Gateway Service START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(4)}>
            <div className="img_name">
              <img src={images["PAYPAL.png"]}  />
              <div className="gateway_name">PayPal Payment Gateway Service</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 4 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge :</td>
                    <td className="td_left">Free, Zero maintenance charges</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction :</td>
                    <td className="td_left">
                      4.4% + USD $0.30 + Currency conversions charges
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">
                      PayPal provides outstanding consumer service.
                    </td>
                  </tr>
                  <tr>
                    <td>Documentation Required :</td>
                    <td className="td_left">
                      Your PAN, details of a local bank account, and a purpose
                      code (which has been implemented to denote the type of
                      cross-border transaction payment conducted in adherence to
                      regulatory obligations).
                    </td>
                  </tr>
                  <tr>
                    <td>Settlement Days :</td>
                    <td className="td_left">
                      Every money that you receive in your PayPal account will
                      be automatically transferred each day to your local bank
                      account.
                    </td>
                  </tr>
                  <tr>
                    <td>Support for Multiple Currencies :</td>
                    <td className="td_left">
                      PayPal is available in over 100 countries, and as a
                      merchant, you can keep your profits in 57 different
                      currencies!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 6- CCAvenue Payment Gateway START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(5)}>
            <div className="img_name">
              <img src={images["CC.png"]}  />
              <div className="gateway_name">CCAvenue Payment Gateway</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 5 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Initial Setup Fee :</td>
                    <td className="td_left">ZERO</td>
                  </tr>
                  <tr>
                    <td>Annual Maintenance Charge for a Startup Account :</td>
                    <td className="td_left">₹ 1,200</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction :</td>
                    <td className="td_left">
                      Domestic Credit & Debit cards on Visa, Mastercard, Maestro
                      RuPay: Flat fee @ 2% <br />
                      Wallets: Freecharge, Mobikwik, OlaMoney, Jiomoney, Paytm,
                      PayZapp, Jana Cash, SBI Buddy
                      <br />
                      Mobile Wallet: Flat fee @ 2%
                      <br />
                      IMPS & UPI: Flat fee @ 2%
                      <br />
                      International Credit Cards on Visa, Mastercard, American
                      Express, JCB and Diners Club: Flat fee @ 3%
                      <br />
                      Taxes extra as applicable from time to time
                    </td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support :</td>
                    <td className="td_left">Supported on CCAvenues</td>
                  </tr>
                  <tr>
                    <td>Multi-Currency Support :</td>
                    <td className="td_left">
                      With CCAvenue, payments may be collected in 27 popular
                      international currencies, and customers can choose the
                      currency they are most familiar with.
                    </td>
                  </tr>
                  <tr>
                    <td>Days of Settlement :</td>
                    <td className="td_left">
                      CCAvenue settles payments for sums over and above the
                      minimum amount that must be retained, which is ₹ 1,000,
                      once a week.
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">
                      Customer service is described on the website as being
                      available by phone, chat, and email 365 days a year. The
                      IVR system makes it quite evident that they are closed on
                      weekends. But their technical and sales staff responds
                      quickly and works well together internally.
                    </td>
                  </tr>
                  <tr>
                    <td>Types of Credit Card Accepted :</td>
                    <td className="td_left">
                      6 credit cards such as Amex, JCB, Diners Club, Mastercard,
                      Visa and eZeClick are accepted.
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Payment Gateway Integration :</td>
                    <td className="td_left">Android, iOS and Windows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 7- PayUbiz Payment Gateway Service START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(6)}>
            <div className="img_name">
              <img src={images["PAYUBIZ.png"]}  />
              <div className="gateway_name">
                PayUbiz Payment Gateway Service
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 6 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge :</td>
                    <td className="td_left">Variable charges apply</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction :</td>
                    <td className="td_left">Variable charges apply</td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support :</td>
                    <td className="td_left">Not supported</td>
                  </tr>
                  <tr>
                    <td>Domestic Credit Cards Supported :</td>
                    <td className="td_left">
                      Visa/Mastercard/Diners/Amex credit Cards
                    </td>
                  </tr>
                  <tr>
                    <td>No. of Days to Start Transactions :</td>
                    <td className="td_left">5-7 days</td>
                  </tr>
                  <tr>
                    <td>Supported eCommerce CMS Systems :</td>
                    <td className="td_left">All major CMS supported</td>
                  </tr>
                  <tr>
                    <td>Mobile App Integration :</td>
                    <td className="td_left">Android, Windows and iOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 8- Mobikwik Payment Gateway START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(7)}>
            <div className="img_name">
              <img src={images["MOBI.jpeg"]}  />
              <div className="gateway_name">Mobikwik Payment Gateway</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 7 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge :</td>
                    <td className="td_left">Custom</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction :</td>
                    <td className="td_left">Custom</td>
                  </tr>
                  <tr>
                    <td>International Payment/Credit Card Support :</td>
                    <td className="td_left">
                      All Indian & International Mastercards, VISA, Discover &
                      Diner’s cards acceptable
                    </td>
                  </tr>
                  <tr>
                    <td>Domestic Credit Cards Supported :</td>
                    <td className="td_left">
                      All Indian & International Mastercards, VISA, Discover &
                      Diner’s cards acceptable.
                    </td>
                  </tr>
                  <tr>
                    <td>Multi-Currency Support :</td>
                    <td className="td_left">No</td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">Available</td>
                  </tr>
                  <tr>
                    <td>Supported eCommerce CMS Systems :</td>
                    <td className="td_left">
                      WordPress, XCart, Zencart, Prestashop, CScart, Cubecart,
                      OSCommerce etc.
                    </td>
                  </tr>
                  <tr>
                    <td>Mobile App Integration :</td>
                    <td className="td_left">Android, Windows and iOS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 9- Easebuzz START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(8)}>
            <div className="img_name">
              <img src={images["EASE.png"]}  />
              <div className="gateway_name">Easebuzz</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 8 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Annual Maintenance Charge :</td>
                    <td className="td_left">Zero</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee per Transaction :</td>
                    <td className="td_left">
                      All Domestic Debit cards (Visa, Master, Rupay, and
                      Maestro) – 1.5% per transaction
                      <br />
                      All Domestic Credit Cards (Visa, Master, Rupay, and
                      Maestro) – 2.2% per transaction
                      <br />
                      Netbanking (70 + Banks) – 2% per transaction
                      <br />
                      UPI (Phone Pe, Bhim, Tex, All banks) – 1.2% per
                      transaction
                      <br />
                      Wallets (Paytm, Mobikwik, Jio, Oxygen, and 7 more) – 2.5%
                      per transaction
                      <br />
                      Post Paid (Pay Later – Ola) – 2.2% per transaction
                      <br />
                      EMI (6+ Banks) – 2.5% per transaction
                    </td>
                  </tr>
                  <tr>
                    <td>Time Taken to Start Transactions :</td>
                    <td className="td_left">24 hours</td>
                  </tr>
                  <tr>
                    <td>Payment API’s Available :</td>
                    <td className="td_left">
                      Woocommerce, PHP, Java, Python, Android, Codeva, Iphone,
                      .Net, Prestashop, Magento 1.0, 2.0, Open Cart
                      1.0,2.0,2.3,3.0, Flutter
                    </td>
                  </tr>
                  <tr>
                    <td>Value-Added Services :</td>
                    <td className="td_left">
                      Vendor Payments B2B, Split Payments, Recurring payments
                      for subscription-based businesses, Application form (CMS)
                      for fee/bill/invoicing amount collecting, and smart
                      payment link solution.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* 10- OPEN Payment Gateway START */}
      <div className="card_row_pty">
        <div className="card_tbl">
          <div className="card_header_gateways" onClick={() => toggleExpand(9)}>
            <div className="img_name">
              <img src={images["OPEN.png"]}  />
              <div className="gateway_name">OPEN Payment Gateway</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 9 && (
            <div className="card_body_gateways">
              <table>
                <tbody className="gateways_tbody">
                  <tr>
                    <td>Settlement Charges :</td>
                    <td className="td_left">Zero</td>
                  </tr>
                  <tr>
                    <td>Transaction Fee :</td>
                    <td className="td_left">
                      Most affordable in India: 1.85% for Indian Credit/Debit
                      cards and net banking.
                      <br />
                      Zero for UPI & Rupay Debit cards.
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Support :</td>
                    <td className="td_left">24/7 at pg-support@bankopen.co</td>
                  </tr>
                  <tr>
                    <td>Mobile SDK Integrations :</td>
                    <td className="td_left">Android and iOs</td>
                  </tr>
                  <tr>
                    <td>Plugins :</td>
                    <td className="td_left">
                      Woocommerce, Magento, Opencart, Prestashop
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