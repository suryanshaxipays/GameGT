import { Link } from "react-router-dom";
import "../Styles/Footer.css";

// --- Images ---
import twitterIcon from "../Assets/twitter.png";
import Facebook from "../Assets/Facebook.png";
import instagramIcon from "../Assets/instagram.png";
import githubIcon from "../Assets/github.png";

const Footer = () => {
  const socialLinks = [
    { src: twitterIcon, alt: "Twitter", href: "https://twitter.com", external: true },
    { src: Facebook, alt: "Facebook", href: "https://facebook.com", external: true },
    { src: instagramIcon, alt: "Instagram", href: "https://instagram.com", external: true },
    { src: githubIcon, alt: "Github", href: "https://github.com", external: true },
  ];

  const footerLinks = {
    Company: [
      { name: "About", type: "section", target: "about" },
      { name: "Apps & Games", type: "route", target: "/gameview" },
      { name: "Featured Games", type: "section", target: "features" },
      { name: "FAQ", type: "section", target: "faq" },
            { name: "Home", type: "section", target: "home" },

    ],
    Categories: [
      { name: "Action", type: "route", target: "/category/Action" },
      { name: "Classic Games", type: "route", target: "/category/Classic Games" },
      { name: "Hidden Objects", type: "route", target: "/category/Hidden Objects" },
      { name: "Mahjong", type: "route", target: "/category/Mahjong" },
      { name: "Match 3", type: "route", target: "/category/Match 3" },
      { name: "Mind", type: "route", target: "/category/Mind" },
      { name: "Solitaire", type: "route", target: "/category/Solitaire" },
    ],
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Left Section */}
            <div className="footer-left">
              {/* --- Company Info --- */}
              <div className="footer-company">
                <h2 className="company-name">Game Tourer</h2>
                <p className="company-description">
                  Game Tourer is your go-to hub for exciting online games — from action to
                  puzzle, classic to mind-bending challenges. Play instantly, no downloads required!
                </p>
              </div>

              {/* --- Social Icons --- */}
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

            {/* Spacer */}
            <div className="footer-spacer"></div>

            {/* Right Section - Links */}
            <div className="footer-links">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title} className="footer-column">
                  <h3 className="footer-heading">{title}</h3>
                  <ul className="footer-list">
                    {links.map((link) => (
                      <li key={link.name}>
                        {link.type === "route" ? (
                          <Link to={link.target} className="footer-link">
                            {link.name}
                          </Link>
                        ) : link.type === "section" ? (
                          <a
                            href={`#${link.target}`}
                            className="footer-link"
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(link.target);
                            }}
                          >
                            {link.name}
                          </a>
                        ) : (
                          <a
                            href={link.target}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; Copyright 2025. All Rights Reserved by GameGT</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
