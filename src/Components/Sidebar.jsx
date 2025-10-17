import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { games } from "../data/games";
import HomeIcon from "../Assets/Gameview/home.png";
import CategoryIcon from "../Assets/Gameview/category.png";
import ChevronDownIcon from "../Assets/Gameview/chevron-down.png";
// --- Images ---
import twitterIcon from "../Assets/twitter.png";
import Facebook from "../Assets/Facebook.png";
import instagramIcon from "../Assets/instagram.png";
import githubIcon from "../Assets/github.png";
import "../Styles/Sidebar.css";

const socialLinks = [
  { src: twitterIcon, alt: "Twitter", href: "#" },
  { src: Facebook, alt: "Facebook", href: "#" },
  { src: instagramIcon, alt: "Instagram", href: "#" },
  { src: githubIcon, alt: "Github", href: "#" },
];

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
      <div className="sidebar2-top">
        <ul>
          <SidebarItem icon={HomeIcon} text="Home" to="/gameview" />
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
        </ul>
      </div>

      <div className="sidebar2-footer">
        <button className="contact-btn2">Contact Us</button>
        <div className="sidebar2-socials">
          {socialLinks.map((link) => (
            <a key={link.alt} href={link.href} target="_blank" rel="noreferrer">
              <img src={link.src} alt={link.alt} />
            </a>
          ))}
        </div>
        <p className="sidebar2-copy">© 2025 All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
