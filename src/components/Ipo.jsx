import React, { useEffect, useState } from 'react';
import "../style/Ipo.css";

const IpoDashboard = () => {
    const [ipos, setIpos] = useState([]);
    const [listedIpos, setListedIpos] = useState([]);

    useEffect(() => {
        fetch('/ipoData.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setIpos(data.ipodata))
            .catch(error => console.error('Error fetching IPO data:', error));
    }, []);

    useEffect(() => {
        fetch('/listedipo.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setListedIpos(data.listedIpos))
            .catch(error => console.error('Error fetching listed IPO data:', error));
    }, []);

    const getColor = (value) => {
        return parseFloat(value) >= 0 ? 'rgb(16, 145, 33)' : 'rgb(192, 9, 9)';
    };

    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item, index) => { 
            images[item.replace('./', '')] = r(item); 
        });
        return images;
    };

    const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

    return (
        <div className='container'>
            <div className="ipo-dashboard">
                <div className="ipo-list">
                    <h2>Latest IPOs</h2>
                    <div className='table_ind'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Open Date</th>
                                    <th>Close Date</th>
                                    <th>Issue Size</th>
                                    <th>Price Range</th>
                                    <th>Min Bid Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ipos.map((ipo, index) => (
                                    <tr key={index}>
                                        <td>
                                        <div className="company-logo">
                        <div className="companylogo_inner">
                          <span>{ipo.company_name}</span>
                          {ipo.ipo_switch.map((ex, i) => (
                            <p key={i}>{ex}</p>
                          ))}
                        </div>
                        <div className="exchange-tags">
                          <img
                            src={images[ipo.logo]}
                            alt={`${ipo.amc_name} logo`}
                            className="amc-logo"
                          />
                        </div>
                      </div>
                                        </td>
                                        <td>{ipo.open_date}</td>
                                        <td>{ipo.close_date}</td>
                                        <td className='text-right'>{ipo.issue_size}</td>
                                        <td className='text-right'>{ipo.price_band}</td>
                                        <td className='text-right'>{ipo.min_investment}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="listed-ipo">
                    <h2>Listed IPOs</h2>
                    {listedIpos.length > 0 ? (
                        <div className='table_main'>
                            <table className='table-scroll'>
                                <thead className='thead-list'>
                                    <tr className='text-center'>
                                        <th>Company Name</th>
                                        <th>Listing Date</th>
                                        <th>Offer Price</th>
                                        <th>Listing Price</th>
                                        <th>LTP</th>
                                        <th>Changes</th>
                                        <th>Listing Gains</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody-list'>
                                    {listedIpos.map((ipo, index) => (
                                        <tr key={index}>
                                            <td>
                                                <span>{ipo.company_name}</span>
                                            </td>
                                            <td>{ipo.listing_date}</td>
                                            <td className='text-right'>{ipo.offer_price}</td>
                                            <td className='text-right'>{ipo.listing_price}</td>
                                            <td className='text-right'>{ipo.ltp}</td>
                                            <td className='text-right' style={{ color: getColor(ipo.changes) }}>{ipo.changes}</td>
                                            <td className='text-right' style={{ color: getColor(ipo.listing_gain) }}>{ipo.listing_gain}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-listed-ipos">
                            No listed IPOs
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IpoDashboard;
