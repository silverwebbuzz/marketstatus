import React, { useState, useEffect } from "react";
import "../style/FnO.css";

const FnO = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [funds, setFunds] = useState("");
  const [contract, setContract] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/fnO.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // const handleSearchByFunds = () => {
  //   const filtered = data.filter(
  //     (item) => parseFloat(item.margin) <= parseFloat(funds)
  //   );
  //   setFilteredData(filtered);
  //   setCurrentPage(1);
  // };

  const handleContractChange = (e) => {
    const contract = e.target.value;
    setContract(contract);
    const filtered = data.filter((item) =>
      item.scrip.toLowerCase().includes(contract.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the data to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Pagination logic
  const renderPageNumbers = () => {
    const pageItems = [];
    const totalPages = pageNumbers.length;

    if (totalPages <= 5) {
      pageItems.push(...pageNumbers);
    } else {
      if (currentPage <= 3) {
        pageItems.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage > totalPages - 3) {
        pageItems.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageItems.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageItems;
  };

  return (
    <section>
      <div className="container">
        <div className="dashboard_FnO">
          <div className="search_row">
            <div className="search-container">
              <input
                type="number"
                placeholder="Enter your fund"
                value={funds}
                onChange={(e) => setFunds(e.target.value)}
              />
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for a contract"
                value={contract}
                onChange={handleContractChange}
              />
            </div>
          </div>
          <div className="table_ind">
            <table className="futureoption_table">
              <thead className="futureoption_thead">
                <tr className="futureoption_thead_trow">
                  <th>Contract</th>
                  <th>Price</th>
                  <th>Lot Size</th>
                  <th>Margin</th>
                  <th>MarginRate%</th>
                  <th>No. of Lots</th>
                </tr>
              </thead>
              <tbody className="futureoption_tbody">
                {currentItems.map((item, index) => (
                  <tr key={index} className="futureoption_tbody_trow">
                    <td>{item.scrip} {item.expiry}</td>
                    <td>₹ {item.price}</td>
                    <td>{item["lot_size"]}</td>
                    <td>₹ {item.nrml_margin}</td>
                    <td>{item.margin} %</td>
                    <td>{funds ? Math.floor(parseFloat(funds) / parseFloat(item.margin)) : 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
              >
                START
              </button>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                ‹‹
              </button>
              {renderPageNumbers().map((number, index) => (
                <button 
                  key={index} 
                  onClick={() => typeof number === 'number' && handlePageChange(number)} 
                  className={currentPage === number ? "active" : ""}
                  disabled={number === '...'}
                >
                  {number}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === pageNumbers.length}
              >
                ››
              </button>
              <button 
                onClick={() => handlePageChange(pageNumbers.length)} 
                disabled={currentPage === pageNumbers.length}
              >
                END
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FnO;
