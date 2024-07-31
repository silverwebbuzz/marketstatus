import React, { useEffect, useState } from 'react';
import StockBox from './StockBox';
import SmallBox from './SmallBox';
import '../style/Dashboard.css';
import advImg from '../images/YFOBS.png'
import TopMF from './TopMF';
// import stockData from '../Data/stockData.json';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // You can fetch other data for small boxes or other components if needed
    const fetchSmallBoxesData = async () => {
      try {
        // Add your fetching logic here if you need to fetch small boxes data
        const smallBoxesData = []; // Replace with actual fetched data
        setData({ smallBoxes: smallBoxesData });
      } catch (error) {
        console.error("Error fetching small boxes data:", error);
      }
    };
    const fetchMutualFundsData = async () => {
      try {
        const response = await fetch('/topMD.json'); // Replace with actual path to your JSON file
        const mutualFundsData = await response.json();
        setData((prevState) => ({ ...prevState, mutualFunds: mutualFundsData }));
      } catch (error) {
        console.error("Error fetching mutual funds data:", error);
      }
    };
    fetchSmallBoxesData();
    fetchMutualFundsData();
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
              <div className="stock-box adv_box">
                <img src={advImg} alt='adv'></img>
                <a href='https://yfobs.in' target='/'>yfobs</a>
              </div>
            </div>
          </div>
          <div className="adv">
          <TopMF data ={data.mutualFunds}/>
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