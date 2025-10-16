import { useState } from "react";
import "../Styles/Navbar2.css";
import logo from "../Assets/logo.ico";
import SearchIcon from "../Assets/Gameview/search.png";

const Navbar2 = ({ onToggleSidebar = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggleSidebar();
  };

  return (
    <nav className="navbar2">
      <div className="nav2-container">
        {/* Left: Hamburger + Logo */}
        <div className="nav-left">
          <div
            className={`hamburger2 ${isOpen ? "active" : ""}`}
            onClick={handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <img src={logo} alt="Logo" className="nav-logo" />
        </div>

        {/* Center: Search (hidden on mobile) */}
        <div className="nav-search">
          <img src={SearchIcon} alt="Search" />
          <input type="text" placeholder="Search games..." />
        </div>

        {/* Right: Login Button */}
        <button className="login2-btn">LOGIN</button>
      </div>
    </nav>
  );
};

export default Navbar2;
