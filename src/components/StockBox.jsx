import React, { Component } from 'react';
import Chart from "react-apexcharts";
import '../style/StockBox.css';

class StockBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      chartData: { labels: [], values: [] },
      loading: true,
      error: null,
      options: {
        chart: {
          id: 'stock-chart',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: true,
            format: 'HH:mm',
          },
        },
        yaxis: {
          show: true,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ['rgba(16, 145, 33, 0.3)'],
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        colors: ['rgb(16, 145, 33)'],
        tooltip: {
          x: {
            format: 'HH:mm',
          },
          y: {
            formatter: (value) => value.toFixed(2),
          },
          theme: 'dark',
        },
      },
      series: [
        {
          name: 'Market Price',
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    this.fetchData(this.props.title);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.fetchData(this.props.title);
    }
  }

  fetchData = async (title) => {
    const apiUrls = {
      'NIFTY 50': 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=nifty50',
      'NIFTYBANK': 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=niftyBank',
      'SENSEX': 'https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=sensex',
    };

    const dataKeys = {
      'NIFTY 50': 'today_stock_data',
      'NIFTYBANK': 'today_stock_data_bn',
      'SENSEX': 'today_stocks_sx_data',
    };

    try {
      const response = await fetch(apiUrls[title]);
      const result = await response.json();

      this.setState({
        data: result.data[dataKeys[title]],
        loading: false,
        marketSentiment: result.data,
      }, this.updateChart);
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  updateChart = () => {
    const { data, marketSentiment } = this.state;
    if (!data || data.length === 0 || !marketSentiment) return;

    const values = data.map(item => ({
      x: new Date(item.time * 1000).toISOString(),
      y: item.value,
    }));

    this.setState({
      chartData: { values },
      options: {
        ...this.state.options,
        colors: [parseFloat(marketSentiment.indiceSnapData.price_change) >= 0 ? 'rgb(16, 145, 33)' : 'rgb(192, 9, 9)'],
        fill: {
          ...this.state.options.fill,
          gradient: {
            ...this.state.options.fill.gradient,
            gradientToColors: [parseFloat(marketSentiment.indiceSnapData.price_change) >= 0 ? 'rgba(16, 145, 33, 0.3)' : 'rgba(192, 9, 9, 0.3)'],
          },
        },
      },
      series: [
        {
          name: 'Market Price',
          data: values,
        },
      ],
    });
  };

  formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  render() {
    const { marketSentiment, loading, error } = this.state;
    const isMarketUp = marketSentiment && parseFloat(marketSentiment.indiceSnapData.price_change) >= 0;
    const chartColor = isMarketUp ? 'rgb(16, 145, 33)' : 'rgb(192, 9, 9)';
    const textColor = { color: chartColor };
    const arrowClass = isMarketUp ? 'arrowIndicator arrow-up-green' : 'arrowIndicator arrow-down-red';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div className="stock-box">
        <div>
          <h4 className='updated'>Updated: {new Date().toLocaleString()}</h4>
        </div>
        <div className='box_top'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='box_middle'>
          <div className='graph_ahead'>
            <ul>
              <li className='d-value fc'>
                <span>
                  <span className='value'>{this.formatNumber(marketSentiment.indiceSnapData.ltp)}</span>
                  <span className={arrowClass}></span>
                </span>
                <span className='change_perc' style={textColor}>{this.formatNumber(marketSentiment.indiceSnapData.price_change)} ({this.formatNumber(marketSentiment.indiceSnapData.price_change_per)}%)</span>
              </li>
              <li className='open fc'>
                <span className='Open'>Open</span>
                <span className='d_open'>{this.formatNumber(marketSentiment.indiceSnapData.today_open)}</span>
              </li>
              <li className='high fc'>
                <span className='High'>High</span>
                <span className='d_high'>{this.formatNumber(marketSentiment.indiceSnapData.day_high)}</span>
              </li>
              <li className='low fc'>
                <span className='Low'>Low</span>
                <span className='d_low'>{this.formatNumber(marketSentiment.indiceSnapData.day_low)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="chart-container">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height='100%'
            width='100%'
          />
        </div>
      </div>
    );
  }
}

export default StockBox;
