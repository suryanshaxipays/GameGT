import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Footer.css";

// --- Images ---
import twitterIcon from "../Assets/twitter.png";
import Facebook from "../Assets/Facebook.png";
import instagramIcon from "../Assets/instagram.png";
import githubIcon from "../Assets/github.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { src: twitterIcon, alt: "Twitter", href: "https://twitter.com" },
    { src: Facebook, alt: "Facebook", href: "https://facebook.com" },
    { src: instagramIcon, alt: "Instagram", href: "https://instagram.com" },
  ];

  const footerLinks = {
    Company: [
      { name: "Home", type: "section", target: "home" },
      { name: "About", type: "section", target: "about" },
      { name: "Games", type: "route", target: "/gameview" },
      { name: "Featured Games", type: "section", target: "features" },
      { name: "FAQ", type: "section", target: "faq" },
    ],
    Categories: [
      { name: "Action", type: "route", target: "/category/Action" },
      { name: "Classic", type: "route", target: "/category/Classic" },
      { name: "Hidden", type: "route", target: "/category/Hidden Objects" },
      { name: "Mahjong", type: "route", target: "/category/Mahjong" },
      { name: "Match 3", type: "route", target: "/category/Match 3" },
      { name: "Mind", type: "route", target: "/category/Mind" },
      { name: "Solitaire", type: "route", target: "/category/Solitaire" },
      { name: "Skill", type: "route", target: "/category/Skill" },
      { name: "Sports", type: "route", target: "/category/Sports" },
      { name: "Golf", type: "route", target: "/category/Golf" },
    ],
  };

  // Handle navigation & scroll
  const handleLinkClick = (link) => {
    if (link.type === "route") {
      navigate(link.target);
    } else if (link.type === "section") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(link.target);
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 400);
      } else {
        const section = document.getElementById(link.target);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Left Section */}
            <div className="footer-left">
              <div className="footer-company">
                <h2 className="company-name">Game Tourer</h2>
                <p className="company-description">
                  Game Tourer is your go-to hub for exciting online games — from
                  action to puzzle, classic to mind-bending challenges. Play
                  instantly, no downloads required!
                </p>
                <br></br>
              </div>

              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <img
                      src={social.src}
                      alt={social.alt}
                      className="footer-social-icon"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-spacer"></div>

            {/* Right Section */}
            <div className="footer-links">
              {Object.entries(footerLinks).map(([title, links], colIndex) => (
                <div key={title} className="footer-column">
                  <h3 className="footer-heading">{title}</h3>
                  <ul
                    className={`footer-list ${
                      title === "Categories" ? "categories-grid" : ""
                    }`}
                  >
                    {links.map((link) => (
                      <li key={link.name}>
                        <button
                          className="footer-link"
                          onClick={() => handleLinkClick(link)}
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; Copyright 2025. All Rights Reserved by Game Tourer</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
