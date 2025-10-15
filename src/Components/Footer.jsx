import "../Styles/Footer.css";

// --- Images ---
import twitterIcon from "../Assets/twitter.png";
import Facebook from "../Assets/Facebook.png";
import instagramIcon from "../Assets/instagram.png";
import githubIcon from "../Assets/github.png";

const Footer = () => {
  const socialLinks = [
    { src: twitterIcon, alt: "Twitter", href: "#" },
    { src: Facebook, alt: "Facebook", href: "#" },
    { src: instagramIcon, alt: "Instagram", href: "#" },
    { src: githubIcon, alt: "Github", href: "#" },
  ];

  const footerLinks = {
    Company: ["Products", "Apps & Games", "Features"],
    Help: ["Support", "About", "Contact Us"],
    Resources: ["Youtube Playlist", "How To - Blog", "Terms & Conditions"],
  };

  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Left Section */}
            <div className="footer-left">
              {/* Social Links */}
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
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
                      <li key={link}>
                        <a href="#" className="footer-link">
                          {link}
                        </a>
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
          <p>&copy; Copyright 2023. All Rights Reserved by board</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
