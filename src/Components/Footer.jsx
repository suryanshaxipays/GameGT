import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../Styles/Footer.css";

// --- Images ---
import twitterIcon from "../Assets/twitter.png";
import Facebook from "../Assets/Facebook.png";
import instagramIcon from "../Assets/instagram.png";
import logo from "../Assets/logo.png";
import PolicyModal from "./PolicyModal"; // ✅ separate modal component

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalContent, setModalContent] = useState(null);

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

  const openModal = (type) => {
    const content = {
      "Terms And Conditions": {
        title: "Terms and Conditions",
        text: `By accessing and playing on Elgamingo, you agree to follow all our platform rules and community standards.
        
        1. Use of Platform
        • Elgamingo provides both free and premium games. Free games are open to all users, while premium titles require secure payments.
        • You must create an account to access certain features. Keep your account credentials safe.
        
        2. Fair Play Policy
        • Cheating, hacking, exploiting bugs, or using bots/scripts is strictly prohibited.
        • Sharing accounts or impersonating others can result in permanent bans.
        • Elgamingo may monitor gameplay and take corrective actions as needed.
        
        3. Payments and Access
        • All payments are processed securely.
        • Game availability and pricing may change without notice.
        • Refunds apply only for duplicate or failed payments.
        
        By using Elgamingo, you acknowledge that you have read and accepted these Terms and Conditions.`,
      },
      "Privacy Policy": {
        title: "Privacy Policy",
        text: `Elgamingo values your privacy and ensures all personal data is handled securely.
        
        1. Information We Collect
        • Username, email, and gameplay activity.
        • Securely processed payment and transaction data.
        • Technical details (like browser/device) for performance optimization.
        
        2. How We Use Your Data
        • To personalize your experience and improve services.
        • To verify payments and manage accounts.
        • To enhance performance and security.
        
        3. Data Protection
        • All sensitive data is encrypted and stored safely.
        • Payment details are handled by secure gateways only.
        • Our systems are routinely updated for top-tier security.
        
        By using Elgamingo, you agree to the collection and use of data as outlined here.`,
      },
      "Cookies Policy": {
        title: "Cookies Policy",
        text: `Elgamingo uses cookies to improve user experience, track performance, and ensure smooth platform functionality.
        
        1. What Are Cookies
        • Cookies are small text files stored on your device to remember your preferences and session details.
        • They help us provide personalized content and enhance your browsing experience.
        
        2. How We Use Cookies
        • To maintain your login session and save preferences (like language or theme).
        • To analyze site traffic, gameplay patterns, and optimize performance.
        • To display relevant promotions or recommendations.
        
        3. Managing Cookies
        • You can control or delete cookies through your browser settings.
        • Disabling cookies may limit some features or cause certain areas of the platform to function improperly.
        
        By continuing to use Elgamingo, you consent to our use of cookies as described in this policy.`,
      },
    };

    setModalContent(content[type]);
  };

  const closeModal = () => setModalContent(null);

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-left">
              <div className="footer-brand">
                <img src={logo} alt="Elgamingo Logo" className="footer-logo" />
                <div className="footer-brand-text">
                  <h2 className="company-name">Elgamingo</h2>
                  <p className="footer-tagline">Play. Compete. Conquer.</p>
                </div>
              </div>

              <p className="company-description">
                Elgamingo is your go-to hub for exciting online games — from
                action to puzzle, classic to mind-bending challenges. Play
                instantly, no downloads required!
              </p>

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

            <div className="footer-links">
              {Object.entries(footerLinks).map(([title, links]) => (
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

        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; 2025 Elgamingo. All Rights Reserved.
          </p>

          <div className="footer-legal-links">
            {["Terms And Conditions", "Privacy Policy", "Cookies Policy"].map(
              (item) => (
                <button
                  key={item}
                  className="footer-legal-link"
                  onClick={() => openModal(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </footer>

      {modalContent && (
        <PolicyModal content={modalContent} onClose={closeModal} />
      )}
    </div>
  );
};

export default Footer;
