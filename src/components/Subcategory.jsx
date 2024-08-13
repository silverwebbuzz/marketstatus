import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../style/subcategory.css";

const getColor = (value) =>
    parseFloat(value).toFixed(2) >= 0 ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)";

const Subcategory = () => {
    const { category, subcategory } = useParams(); 
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/mutualfunds/${category}/${subcategory}.json`);
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
    }, [category, subcategory]);

    if (error) return <div>Error: {error}</div>;
    if (!data || !data[subcategory]) return <div>Loading...</div>;

    return (
        <div className='container'>
            <div className='breadcrumb_subcategory'>
                <Link to="/">Mutual Funds</Link> &gt; 
                <Link to={`/mutualfunds/${category}`}> {category.charAt(0).toUpperCase() + category.slice(1)} Funds</Link> &gt; 
                {data[subcategory].length ? <span>{data[subcategory][0].subcategory_name}</span> : ''}
            </div>
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
                            <td>₹{parseFloat(item.lumsum_minimum_amt).toFixed(2)}</td>
                            <td>₹{parseFloat(item.scheme_aum).toFixed(2)}</td>
                            <td>{item.ms_rating}⭐</td>
                            <td style={{ color: getColor(item.scheme_1_year_return) }}>
                                {parseFloat(item.scheme_1_year_return).toFixed(2)}%
                            </td>
                            <td style={{ color: getColor(item.scheme_3_year_return) }}>
                                {parseFloat(item.scheme_3_year_return).toFixed(2)}%
                            </td>
                            <td style={{ color: getColor(item.scheme_5_year_return) }}>
                                {parseFloat(item.scheme_5_year_return).toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subcategory;
