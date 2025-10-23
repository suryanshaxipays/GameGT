import { useState } from "react";
import "../Styles/Navbar2.css";
import logo from "../Assets/logo.ico";
import SearchIcon from "../Assets/Gameview/search.png";
import { useNavigate } from "react-router-dom";
import { games } from "../data/games";

const Navbar2 = ({ onToggleSidebar = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggleSidebar();
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

  const handleLoginClick = () => {
    navigate("/login");
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
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
            className="nav-logo"
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Center: Search */}
        <div className="nav-search">
          <img src={SearchIcon} alt="Search" />
          <input
            type="text"
            placeholder="Search games..."
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
  );
};

export default Navbar2;
