// import React, { useState, useEffect } from "react";
// import "../style/FnO.css";

// const IC = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("/nifty_50.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && Array.isArray(data.Nifty%2050)) {
//           setData(data.Nifty%2050);
//         } else {
//           console.error("Expected an array but got:", data);
//           setData([]); // Set to an empty array to avoid map error
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <section>
//       <div className="container">
//         <div className="dashboard_FnO">
         
//           <div className="table_ind">
//             <table className="futureoption_table">
//               <thead className="futureoption_thead">
//                 <tr className="futureoption_thead_trow">
//                   <th>Identifier</th>
//                   <th>Price</th>
//                   <th>Change</th>
//                   <th>Open</th>
//                   <th>Day High</th>
//                   <th>Day Low</th>
//                 </tr>
//               </thead>
//               <tbody className="futureoption_tbody">
//                 {data.map((item, index) => (
//                   <tr key={index} className="futureoption_tbody_trow">
//                     <td>{item.identifier}</td>
//                     <td>₹ {item.lastPrice}</td>
//                     <td>{item.change}</td>
//                     <td>₹ {item.open}</td>
//                     <td>{item.dayHigh} %</td>
//                     <td>{item.dayLow} %</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default IC;
