import React, { useState, useEffect } from "react";
import "../../style/Finance_companies/Insurance_companies.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../assets/broker_companies", false, /\.(png|jpe?g|svg)$/)
);

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
      {halfStar && <FaStarHalfAlt />}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
    </div>
  );
};

const Broker_Companies = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/broker.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data || !data.companies) return null;

  return (
    <section>
      <div className="container">
        <div className="broker_header">
          <h2>Broker Companies</h2>
          <p>
            A real list of top stock brokers in India 2024 by number of active
            clients in 2024. Groww is the top stock broker among all brokers in
            India. Groww is followed by Zerodha, Angel One, Upstox, and ICICI
            direct.
          </p>
        </div>
        <div className="broker_company_row">
          {data.companies.map((broker, index) => (
            <div className="broker_card" key={index}>
              <div className="broker_card_top">
                <div className="broker_company_img">
                  <img
                    src={images[broker.logo]}
                    alt={`${broker.broker_name} logo`}
                    className="broker-logo"
                  />
                  <div className="broker-name">{broker.broker_name}</div>
                </div>
                <div className="ranks">
                  <div className="rank_rating">Rating {broker.rating}</div>
                  {renderStars(broker.rating)}
                </div>
              </div>
              <div className="broker_card_bottom">
                <div className="broker_card_details">
                  Open Charge:<strong> {broker.open_charge}</strong>
                </div>
                <div className="broker_card_details">
                  Maintenance Charge:
                  <strong> {broker.maintenance_charge}</strong>
                </div>
                <div className="broker_card_details">
                  Delivery Brokerage:
                  <strong>{broker.delivery_brokerage}</strong>
                </div>
                <div className="broker_card_details">
                  Intraday Brokerage:
                  <strong>{broker.intraday_brokerage}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Broker_Companies;
