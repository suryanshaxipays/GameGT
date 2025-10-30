import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../Assets/logo.ico";
import SearchIcon from "../Assets/Gameview/search.png";
import { games } from "../data/games";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

const Navbar = ({ onToggleSidebar = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    setShowLogin(true);
  };

  const handleSignupClick = () => {
    setIsOpen(false);
    setShowSignup(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = games.filter((game) =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleResultClick = (id) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/gameplay/${id}`);
  };

  // -------------------- HOME PAGE NAVBAR --------------------
  if (isHomePage) {
    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>

            <div
              className={`hamburger ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, "home")}>
                  HOME
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, "features")}
                >
                  FEATURED GAMES
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

        {showLogin && <Login onClose={handleCloseLogin} onSwitchToSignup={handleSignupClick} />}
        {showSignup && <Signup onClose={handleCloseSignup} onSwitchToLogin={handleLoginClick} />}
      </>
    );
  }

  // -------------------- OTHER PAGES NAVBAR (NAVBAR2) --------------------
  return (
    <>
      <nav className="navbar2">
        <div className="nav2-container">
          {/* Left: Logo only */}
          <div className="nav-left">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="nav-logo"
              style={{ cursor: "pointer" }}
            />
          </div>

          {/*  Search Bar */}
          <div className="nav-search small-search">
            <img src={SearchIcon} alt="Search" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((game) => (
                  <div
                    key={game.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(game.id)}
                  >
                    {game.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Login Button */}
          <button className="login2-btn" onClick={handleLoginClick}>
            LOGIN
          </button>
        </div>
      </nav>

      {showLogin && <Login onClose={handleCloseLogin} onSwitchToSignup={handleSignupClick} />}
      {showSignup && <Signup onClose={handleCloseSignup} onSwitchToLogin={handleLoginClick} />}
    </>
  );
};

export default Navbar;