import React, { useState } from "react";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={() => setIsOpen(false)}>HOME</a></li>
          <li><a href="#features" onClick={() => setIsOpen(false)}>FEATURES</a></li>
          <li><a href="#about" onClick={() => setIsOpen(false)}>ABOUT</a></li>
          <li><a href="#games" onClick={() => setIsOpen(false)}>GAMES CATEGORY</a></li>
          <li><a href="#faq" onClick={() => setIsOpen(false)}>F&Q</a></li>
          <li>
            <button className="login-btn" onClick={() => setIsOpen(false)}>LOGIN</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
