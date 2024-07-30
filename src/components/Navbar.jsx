// src/components/Navbar.jsx
import React from "react";
import { Link } from 'react-router-dom';
import "../style/Navbar.css";

const Navbar = () => {
  return (
    <section className="Nav_bottom">
      <div className="container">
        <div className="navbar">
          <nav className="Nav">
            <ul className="nav_ul">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/indices">Indices</Link></li>
              <li><Link to="/fnO">Future & Options</Link></li>
              {/* <li><Link to="">IPO</Link></li> */}
              <li><Link to="/mutualFunds">Mutual Funds</Link></li> {/* Updated Link */}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
