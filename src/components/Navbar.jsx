
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../style/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="Nav_bottom">
      <div className="container">
        <div className="navbar">
          <nav className="Nav">
            <button className="menu-toggle" onClick={toggleMenu}>
              &#9776;
            </button>
            <ul className={`nav_ul ${isMenuOpen ? "open" : ""}`}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/indices">Indices</Link></li>
              <li><Link to="/fnO">Future & Options</Link></li>
              <li><Link to="">IPO</Link></li>
              <li><Link to="/mutualFunds">Mutual Funds</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

