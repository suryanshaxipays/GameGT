import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../Assets/logo.ico"; // Make sure the path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleLoginClick = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
              HOME
            </a>
          </li>
          <li>
            <a href="#features" onClick={(e) => handleNavClick(e, "features")}>
              FEATURES
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#games" onClick={(e) => handleNavClick(e, "games")}>
              GAMES CATEGORY
            </a>
          </li>
          <li>
            <a href="#faq" onClick={(e) => handleNavClick(e, "faq")}>
              FAQ
            </a>
          </li>
          <li>
            <button className="login-btn" onClick={handleLoginClick}>
              LOGIN
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
