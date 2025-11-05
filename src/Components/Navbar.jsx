import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../Assets/logo.ico";
import SearchIcon from "../Assets/Gameview/search.png";
import { games } from "../data/games";
import LoginPopup from "./LoginPopup";
import AvatarIcon from "../Assets/About/avatar1.png";

const Navbar = ({ onToggleSidebar = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userAuth"));
    if (storedUser?.loggedIn) setUser(storedUser);

    const prompt = localStorage.getItem("loginPrompt");
    if (prompt === "true") {
      setShowLogin(true);
      localStorage.removeItem("loginPrompt");
    }

    const openLogin = () => setShowLogin(true);
    window.addEventListener("openLogin", openLogin);
    return () => window.removeEventListener("openLogin", openLogin);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    localStorage.setItem(
      "postAuthRedirect",
      JSON.stringify({ path: location.pathname + location.search })
    );
    setShowLogin(true);
  };

  

  const handleCloseLogin = () => {
    setShowLogin(false);
    const storedUser = JSON.parse(localStorage.getItem("userAuth"));
    if (storedUser?.loggedIn) setUser(storedUser);
  };


  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("hasPaidAccess");
    setUser(null);
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
    const game = games.find((g) => g.id === id);
    if (!game) return;
    const isFree = game.id % 3 === 0;
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      JSON.parse(localStorage.getItem("userAuth") || "{}")?.loggedIn;
    const hasPaid = localStorage.getItem("hasPaidAccess") === "true";

    if (!isFree) {
      if (!isLoggedIn) {
        localStorage.setItem(
          "postAuthRedirect",
          JSON.stringify({
            action: "checkout",
            gameId: id,
            path: location.pathname + location.search,
          })
        );
        setShowLogin(true);
        return;
      }
      if (!hasPaid) {
        navigate("/checkout", { state: { game } });
        return;
      }
    }
    navigate(`/gameplay/${id}`);
  };

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

              {user ? (
                <li className="avatar-wrapper">
                  <img
                    src={AvatarIcon}
                    alt="User"
                    className="user-avatar"
                    title="Click to logout"
                    onClick={handleLogout}
                  />
                  <span className="hover-tooltip">Click to logout</span>
                </li>
              ) : (
                <li className="lb"> 
                  <button className="login-btn" onClick={handleLoginClick}>
                    LOGIN
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        {showLogin && (
          <LoginPopup
            onClose={handleCloseLogin}
            onLoginSuccess={handleCloseLogin}
          />
        )}
        
      </>
    );
  }

  return (
    <>
      <nav className="navbar2">
        <div className="nav2-container">
          <div className="nav-left">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Logo"
              className="nav-logo"
            />
          </div>

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

          {user ? (
            <div className="avatar-wrapper">
              <img
                src={AvatarIcon}
                alt="User"
                className="user-avatar"
                title="Click to logout"
                onClick={handleLogout}
              />
              <span className="hover-tooltip">Click to logout</span>
            </div>
          ) : (
            <button className="login2-btn" onClick={handleLoginClick}>
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <LoginPopup
          onClose={handleCloseLogin}
          onLoginSuccess={handleCloseLogin}
        />
      )}
    </>
  );
};

export default Navbar;
