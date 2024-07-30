import React, { useEffect, useState } from 'react';
import StockBox from './StockBox';
import SmallBox from './SmallBox';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSmallBoxesData = async () => {
      try {
        const smallBoxesData = [];
        setData({ smallBoxes: smallBoxesData });
      } catch (error) {
        console.error("Error fetching small boxes data:", error);
      }
    };

    fetchSmallBoxesData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <section>
        <div className="container">
          <div className="dashboard_row">
          <div className="dashboard">
            <div className="stock-boxes">
              <StockBox title="NIFTY 50" />
              <StockBox title="NIFTYBANK" />
              <StockBox title="SENSEX" />
              <div className="stock-box">

              </div>
            </div>
          </div>
          <div className="adv">

          </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="smallbox_row">
            {data.smallBoxes.map((box, index) => (
              <SmallBox key={index} data={box} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;