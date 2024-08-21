import React, { useState, useEffect } from 'react';
import '../style/NseHolidays.css';

const NseHolidays = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        // Fetch data from JSON file
        fetch('/holidays.json')
            .then((response) => response.json())
            .then((data) => setHolidays(data))
            .catch((error) => console.error('Error fetching holiday data:', error));
    }, []);

    return (
        <section>
            <div className="container">
                <div className='nseholidays_header'>
                    <h1>NSE Holidays 2024</h1>
                    <p>
                    The National Stock Exchange (NSE) is India's biggest stock exchange and stands 10th worldwide, boasting a market capitalization of over US$ 3.4 trillion.</p>
                    <p>NSE's trading hours are from 9:15 a.m. to 3:30 p.m. on weekdays. Trading holidays are observed on Saturdays, Sundays, and various national and cultural holidays. On these 2024 holidays, there will be no trading in the equity, equity derivative, or SLB segments.</p>
                    <h3> The NSE Market holidays for 2024 are observed on the following dates:</h3>
                </div>
                <div className='table_ind'>
                    <table className="nas_Holidays">
                        <thead className='nseholidays_thead'>
                            <tr className='nseholidays_tr'>
                                <th>Sr. No.</th>
                                <th>Share Market Holiday 2024</th>
                                <th>Date</th>
                                <th>Day</th>
                            </tr>
                        </thead>
                        <tbody className='nseholidays_thead'>
                            {holidays.map((holiday) => (
                                <tr className='nseholidays_tbody_tr' key={holiday.id}>
                                    <td>{holiday.id}</td>
                                    <td>{holiday.name}</td>
                                    <td>{holiday.date}</td>
                                    <td>{holiday.day}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default NseHolidays;
