import React from 'react';
import Chart from "react-apexcharts";
import '../style/SmallBox.css';

const SmallBox = ({ data }) => {
    const isMarketUp = data.change >= 0;
    const chartColor = isMarketUp ? 'rgb(16, 145, 33)' : 'rgb(192, 9, 9)';
    const textColor = { color: chartColor };

    const chartOptions = {
        chart: {
            id: 'small-box-chart',
            toolbar: {
                show: false, 
            },
        },
        grid: {
            show: false,
        },
        stroke: {
            curve: 'smooth',
            width: 1, 
        },
        xaxis: {
            type: 'category',
            categories: data.chartData.labels || [],
            labels: {
                show: false,
            },
        },
        yaxis: {
            show: false,
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
                gradientToColors: [chartColor], 
                inverseColors: false,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            },
        },
        colors: [chartColor],
        tooltip: {
            y: {
                formatter: (value) => value.toFixed(2),
            },
            theme: 'dark',
        },
    };

    const chartSeries = [
        {
            name: data.name,
            data: data.chartData.values || [],
        },
    ];

    return (
        <div className="small-box">
            <div className='sml-bx'>
                <p>{data.name}</p>
            </div>
            <div className="val_ue">
                <div className="p_value">
                    <p>{data.value}</p>
                </div>
                <div className="char_t">
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height='90'
                        width='80'
                    />
                </div>
            </div>
            <div className='chan_ge'>
                <p className="color_change" style={textColor}>{data.change} ({data.percentage}%)</p>
            </div>
        </div>
    );
};

export default SmallBox;
