import React from 'react';
import '../style/NseHolidays.css';

const holidays = [
    { id: 1, name: 'Republic Day', date: 'January 26, 2024', day: 'Friday' },
    { id: 2, name: 'Mahashivratri', date: 'March 08, 2024', day: 'Friday' },
    { id: 3, name: 'Holi', date: 'March 25, 2024', day: 'Monday' },
    { id: 4, name: 'Good Friday', date: 'March 29, 2024', day: 'Friday' },
    { id: 5, name: 'Id-Ul-Fitr (Ramadan Eid)', date: 'April 11, 2024', day: 'Thursday' },
    { id: 6, name: 'Shri Ram Navmi', date: 'April 17, 2024', day: 'Wednesday' },
    { id: 7, name: 'Maharashtra Day', date: 'May 01, 2024', day: 'Wednesday' },
    { id: 8, name: 'Bakri Id', date: 'June 17, 2024', day: 'Monday' },
    { id: 9, name: 'Moharram', date: 'July 17, 2024', day: 'Wednesday' },
    { id: 10, name: 'Independence Day/Parsi New Year', date: 'August 15, 2024', day: 'Thursday' },
    { id: 11, name: 'Mahatma Gandhi Jayanti', date: 'October 02, 2024', day: 'Wednesday' },
    { id: 12, name: 'Diwali Laxmi Pujan*', date: 'November 01, 2024', day: 'Friday' },
    { id: 13, name: 'Gurunanak Jayanti', date: 'November 15, 2024', day: 'Friday' },
    { id: 14, name: 'Christmas', date: 'December 25, 2024', day: 'Wednesday' },
];

const NseHolidays = () => {
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
                                <tr className='nseholidays_tbody_tr' key={holiday.id} >
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
