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
  require.context(
    "../../assets/international_money_transfer_companies",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const International_money_transfer_companies = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="container">
      <div className="gateway_header">
        <h2>International Money Transfer Companies</h2>
        <p>
          International money transfers are a popular practice. Though a bank
          might seem like the obvious place to make an international money
          transfer, banks are actually the most expensive option, costing an
          average of nearly 11.5% of the amount you’re sending, according to The
          World Bank's September 2023 Remittance Prices Worldwide Quarterly
          report. The typical cost for an international wire transfer sent from
          the U.S. is $45.
        </p>
      </div>

      {/* 1- Wise START */}
      <div className="card_row_imtc">
        <div className="card_tbl">
          <div className="card_header_imtc" onClick={() => toggleExpand(0)}>
            <div className="img_name">
              <img src={images["wise.png"]} />
              <div className="imtc_name">Wise</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 0 && (
            <div className="card_body_imtc">
              <p>
                <b>Coverage from the U.S.:</b> Over 70 countries (though this
                number can fluctuate).
              </p>
              <p>
                <b>Cost:</b> Wise, formerly TransferWise, offers some of the
                best exchange rates you can find, and upfront fees tend to be
                lowest if you use a bank account to fund your transfer,
                typically less than 1% of the transfer amount.
              </p>
              <p>
                <b>Speed:</b> Bank transfers tend to take days, but same-day
                delivery is possible for sending to some countries. A transfer
                using a debit or credit card can arrive within seconds, while a
                transfer using a bank account can take anywhere from seconds to
                two business days, depending on the destination.
              </p>
              <p>
                <b>Transfer limits and options:</b> Sending limits go up to $1
                million per transfer, if using a wire transfer to pay Wise. You
                can also pay with debit card, credit card, Apple Pay, Google Pay
                or a direct debit (or ACH transfer) from your bank account. Your
                recipient needs to have a bank account to receive money,
                regardless of how you fund the transfer.
              </p>
              <p>
                <b>Customer experience: </b>Wise’s mobile app receives high user
                ratings and its website's FAQ is easy to find.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* 1- Wise END */}

      {/* 2- OFX START */}
      <div className="card_row_imtc">
        <div className="card_tbl">
          <div className="card_header_imtc" onClick={() => toggleExpand(1)}>
            <div className="img_name">
              <img src={images["ofx.png"]} />
              <div className="imtc_name">OFX</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 1 && (
            <div className="card_body_imtc">
              <p>
                <b>Coverage from the U.S.:</b> More than 190 countries.
              </p>
              <p>
                <b>Cost:</b> OFX doesn't charge transfer fees regardless of how
                much gets sent. Its exchange rate markups tend to be around 0.5%
                to 1%.
              </p>
              <p>
                <b>Speed:</b> No same-day delivery option from the U.S. OFX
                generally receives your bank transfer within half a business day
                and delivers the money to your recipient in another one to three
                business days, depending on the destination.
              </p>
              <p>
                <b>Transfer limits and options:</b> Sending limits go up to $1
                million per transfer, if using a wire transfer to pay Wise. You
                can also pay with debit card, credit card, Apple Pay, Google Pay
                or a direct debit (or ACH transfer) from your bank account. Your
                recipient needs to have a bank account to receive money,
                regardless of how you fund the transfer.The sending minimum per
                transfer is $1,000, and there’s no set maximum. Transfers can
                only be made between bank accounts, as opposed to funding with
                cash, credit card or other options available with some of the
                providers on this list.
              </p>
              <p>
                <b>Customer experience: </b>OFX’s 24/7 support line and its
                website FAQ are helpful. Its apps get high user ratings, too.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* 2- OFX END */}

      {/* 3- Xoom START */}
      <div className="card_row_imtc">
        <div className="card_tbl">
          <div className="card_header_imtc" onClick={() => toggleExpand(2)}>
            <div className="img_name">
              <img src={images["xoom.png"]} />
              <div className="imtc_name">Xoom by PayPal</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 2 && (
            <div className="card_body_imtc">
              <p>
                <b>Coverage from the U.S.:</b> Over 160 countries and
                territories.
              </p>
              <p>
                <b>Cost:</b> Xoom tends to have low upfront fees, such as $0 to
                under $5 when you use a PayPal balance or bank account instead
                of debit or credit card, but exchange rate markups can be over
                1%. Xoom still tends to be cheaper than banks’ international
                wire transfers
              </p>
              <p>
                <b>Speed:</b> Many transfers can arrive within minutes,
                regardless of the payment method. But some could take up to a
                few days, depending on factors like banking hours or time zones.
              </p>
              <p>
                <b>Transfer limits and options:</b> Cash pickup at a supermarket
                or other locations is a delivery option in some countries.
                Sending limits vary, but daily transfers are capped at $50,000.
                You can fund a transfer with a bank account, debit or credit
                card, or PayPal account since Xoom is owned by PayPal.
              </p>
              <p>
                <b>Customer experience: </b>Phone support is available in
                several languages from 9 a.m. to 9 p.m. ET, as is assistance by
                email. The online platform provides clear cost calculators and
                FAQ, and mobile apps receive high ratings.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* 3- Xoom END */}

      {/* 4- MoneyGram START */}
      <div className="card_row_imtc">
        <div className="card_tbl">
          <div className="card_header_imtc" onClick={() => toggleExpand(3)}>
            <div className="img_name">
              <img src={images["moneygram.png"]} />
              <div className="imtc_name">MoneyGram</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 3 && (
            <div className="card_body_imtc">
              <p>
                <b>Coverage from the U.S.:</b> Over 200 countries and
                territories.
              </p>
              <p>
                <b>Cost:</b> Upfront fees for transfers funded by bank account
                tend to be low, but fees for other payment methods tend to be
                high. MoneyGram’s rate markups vary depending on where you send
                the money, and they can surpass 3%.
              </p>
              <p>
                <b>Speed:</b> Delivery can be within the same day, regardless of
                payment choice, but can take longer, depending on banking hours
                and other factors.
              </p>
              <p>
                <b>Transfer limits and options:</b> MoneyGram maxes out at
                $10,000 per online transfer and per month, but depending on the
                country you’re sending to, that limit can jump to $25,000 per
                transfer. MoneyGram has the advantage of physical locations so
                people, especially those without bank accounts, can pay in cash
                and have recipients pick up funds. Its web platform lets you pay
                with bank accounts and debit and credit cards.
              </p>
              <p>
                <b>Customer experience: </b>Support by email and live chat is
                available (and by phone for reporting fraud), and fees, rates
                and other information can be found online easily. MoneyGram's
                mobile apps have solid ratings.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* 4- MoneyGram END */}

      {/* 5- Western Union START */}
      <div className="card_row_imtc">
        <div className="card_tbl">
          <div className="card_header_imtc" onClick={() => toggleExpand(4)}>
            <div className="img_name">
              <img src={images["wu.png"]} />
              <div className="imtc_name">Western Union</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} size="1x" />
          </div>
          {expandedCard === 4 && (
            <div className="card_body_imtc">
              <p>
                <b>Coverage from the U.S.:</b> Over 200 countries and
                territories.
              </p>
              <p>
                <b>Cost:</b> Varies. Fees for transfers up to $1,000 can be
                under $5, but they can also be more, depending on the funding
                source and delivery method. Western Union’s rate markups vary
                widely based on the payment type, delivery method and
                destination country.
              </p>
              <p>
                <b>Speed:</b> Same-day delivery is possible when you have
                transfers sent to cash pickup locations and use a debit or
                credit card (or pay cash in person), though you pay more for the
                rush. The cheapest transfers require bank accounts for sending
                and receiving money and can take over a week for delivery.
              </p>
              <p>
                <b>Transfer limits and options:</b> On Western Union’s website,
                transfer limits vary by destination country, such as $5,000 to
                Mexico and $50,000 to India. As one of the biggest transfer
                providers worldwide, Western Union’s main advantage is its
                network, especially for sending cash in person and providing
                cash-pickup delivery options.
              </p>
              <p>
                <b>Customer experience: </b>There’s phone support and live chat
                available 24/7, but the website doesn’t make it easy to compare
                exchange rates and the FAQ aren’t easily found.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* 5- Western Union END */}
    </div>
  );
};
export default International_money_transfer_companies;