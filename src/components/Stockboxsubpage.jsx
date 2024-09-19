import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import "../style/stockboxsubpage.css";

function Stockboxsubpage() {
  const { title } = useParams(); // Accessing the dynamic part of the URL
  const [data, setData] = useState(null);
  const [marketSentiment, setMarketSentiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({ values: [] });
  const [options, setOptions] = useState({
    chart: { id: "stock-chart", toolbar: { show: false } },
    grid: { show: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { type: "datetime", labels: { show: true, format: "HH:mm" } },
    yaxis: { show: true },
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["rgba(16, 145, 33, 0.3)"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: ["rgb(16, 145, 33)"],
    tooltip: {
      x: { format: "HH:mm" },
      y: { formatter: (value) => value.toFixed(2) },
      theme: "dark",
    },
  });

  useEffect(() => {
    fetchData(title);
  }, [title]);

  const fetchData = async (title) => {
    const apiUrls = {
      "NIFTY 50":
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=nifty50",
      NIFTYBANK:
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=niftyBank",
      SENSEX:
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=sensex",
    };

    const dataKeys = {
      "NIFTY 50": "today_stock_data",
      NIFTYBANK: "today_stock_data_bn",
      SENSEX: "today_stocks_sx_data",
    };

    setLoading(true);
    try {
      const response = await fetch(apiUrls[title]);
      const result = await response.json();

      const stockData = result.data[dataKeys[title]];
      setData(stockData);
      setMarketSentiment(result.data);
      setLoading(false);
      updateChart(stockData, result.data);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateChart = (data, marketSentiment) => {
    if (!data || data.length === 0 || !marketSentiment) return;

    const values = data.map((item) => ({
      x: new Date(item.time * 1000).toISOString(),
      y: item.value,
    }));

    setChartData({ values });

    setOptions({
      ...options,
      colors: [
        parseFloat(marketSentiment.indiceSnapData.price_change) >= 0
          ? "rgb(16, 145, 33)"
          : "rgb(192, 9, 9)",
      ],
      fill: {
        ...options.fill,
        gradient: {
          ...options.fill.gradient,
          gradientToColors: [
            parseFloat(marketSentiment.indiceSnapData.price_change) >= 0
              ? "rgba(16, 145, 33, 0.3)"
              : "rgba(192, 9, 9, 0.3)",
          ],
        },
      },
    });
  };

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isMarketUp =
    marketSentiment &&
    parseFloat(marketSentiment.indiceSnapData.price_change) >= 0;
  const textColor = {
    color: isMarketUp ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)",
  };
  const arrowClass = isMarketUp
    ? "arrowIndicator arrow-up-green"
    : "arrowIndicator arrow-down-red";

  return (
    <>
      <section>
        <div className="container">
          <div className="stock-details-container">
            <h2>{title} Stock Price</h2>
            <div className="updated_subpage">
              <h4>Updated: {new Date().toLocaleString()}</h4>
            </div>
            <div className="box_middle">
              <div className="graph_ahead">
                <ul>
                  <li className="d-value fc">
                    <span>
                      <span className="value">
                        {formatNumber(marketSentiment.indiceSnapData.ltp)}
                      </span>
                      <span className={arrowClass}></span>
                    </span>
                    <span className="change_perc" style={textColor}>
                      {formatNumber(
                        marketSentiment.indiceSnapData.price_change
                      )}{" "}
                      (
                      {formatNumber(
                        marketSentiment.indiceSnapData.price_change_per
                      )}
                      %)
                    </span>
                  </li>
                  <li className="open fc">
                    <span className="Open">Open</span>
                    <span className="d_open">
                      {formatNumber(marketSentiment.indiceSnapData.today_open)}
                    </span>
                  </li>
                  <li className="high fc">
                    <span className="High">High</span>
                    <span className="d_high">
                      {formatNumber(marketSentiment.indiceSnapData.day_high)}
                    </span>
                  </li>
                  <li className="low fc">
                    <span className="Low">Low</span>
                    <span className="d_low">
                      {formatNumber(marketSentiment.indiceSnapData.day_low)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="chart_container subpage_chart">
              <Chart
                options={options}
                series={[{ name: "Market Price", data: chartData.values }]}
                type="area"
                height="220px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stockboxsubpage;
