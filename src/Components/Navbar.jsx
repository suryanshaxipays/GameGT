import React, { useState } from "react";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={(e) => handleNavClick(e, "home")}>HOME</a></li>
          <li><a href="#features" onClick={(e) => handleNavClick(e, "features")}>FEATURES</a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>ABOUT</a></li>
          <li><a href="#games" onClick={(e) => handleNavClick(e, "games")}>GAMES CATEGORY</a></li>
          <li><a href="#faq" onClick={(e) => handleNavClick(e, "faq")}>F&Q</a></li>
          <li>
            <button className="login-btn" onClick={() => setIsOpen(false)}>
              LOGIN
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
