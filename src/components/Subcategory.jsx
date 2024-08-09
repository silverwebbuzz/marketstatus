import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../style/subcategory.css";

const getColor = (value) =>
    parseFloat(value) >= 0 ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)";

const Subcategory = () => {
    const { subcategory } = useParams(); 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/equity/${subcategory}.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, [subcategory]);

    if (error) return <div>Error: {error}</div>;
    if (!data || !data[subcategory]) return <div>Loading...</div>;

    return (
        <div className='container'>
            <table className='subcat_table'>
                <thead className='subcat_thead'>
                    <tr className='subcat_thead_tr'>
                        <th>Scheme Name</th>
                        <th>Min. Investment</th>
                        <th>AUM in Cr.</th>
                        <th>Rating</th>
                        <th>1Y Returns</th>
                        <th>3Y Returns</th>
                        <th>5Y Returns</th>
                    </tr>
                </thead>
                <tbody className='subcat_tbody'>
                    {data[subcategory].map((item, index) => (
                        <tr key={index} className='subcat_tbody_tr'>
                            <td>{item.scheme_name}</td>
                            <td>₹{item.lumsum_minimum_amt}</td>
                            <td>₹{item.scheme_aum}</td>
                            <td>{item.ms_rating}⭐</td>
                            <td style={{ color: getColor(item.scheme_1_year_return) }}>{item.scheme_1_year_return}%</td>
                            <td style={{ color: getColor(item.scheme_3_year_return) }}>{item.scheme_3_year_return}%</td>
                            <td style={{ color: getColor(item.scheme_5_year_return) }}>{item.scheme_5_year_return}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subcategory;
