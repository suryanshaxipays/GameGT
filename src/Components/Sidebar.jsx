import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { games } from "../data/games";
import HomeIcon from "../Assets/Gameview/home.png";
import CategoryIcon from "../Assets/Gameview/category.png";
import ChevronDownIcon from "../Assets/Gameview/chevron-down.png";
import FeaturesIcon from "../Assets/Gameview/home.png";
import "../Styles/Sidebar.css";

const SidebarItem = ({ icon, text, to, active }) => (
  <li className={`sidebar2-item ${active ? "active" : ""}`}>
    <Link to={to}>
      <img src={icon} alt={text} />
      <span>{text}</span>
    </Link>
  </li>
);

const Sidebar = ({ isOpen }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return uniqueGenres.sort();
  }, []);

  return (
    <aside className={`sidebar2 ${isOpen ? "open" : ""}`}>
      <ul>
        <SidebarItem icon={HomeIcon} text="Home" to="/" />
        <li className="category-section2">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="category-toggle2"
          >
            <div className="flex-row">
              <img src={CategoryIcon} alt="Category" />
              <span>Categories</span>
            </div>
            <img
              src={ChevronDownIcon}
              alt="Chevron"
              className={`chevron2 ${isCategoryOpen ? "rotate" : ""}`}
            />
          </button>
          {isCategoryOpen && (
            <ul className="category-list2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate(`/category/${cat}`)}
                    className="category-btn2"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
        <SidebarItem icon={FeaturesIcon} text="Features" to="/features" />
      </ul>
    </aside>
  );
};

export default Sidebar;
