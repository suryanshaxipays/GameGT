import "../Styles/About.css";

import hedgies from "../Assets/About/hedgies.png";
import porsche from "../Assets/About/porsche.png";
import mario from "../Assets/About/mario.png";
import subway from "../Assets/About/subway.png";
import pubg from "../Assets/About/pubg.png";
import shooter from "../Assets/About/shooter.png";
import war from "../Assets/About/war.png";
import mbg from "../Assets/About/mbg.png";  

const About = () => {
  return (
    <div className="image-wrapper">
      <section className="image-section">
        {/* Section Title */}
        <div className="image-header">
          <h2 className="image-title">Who We Are</h2>
          <p className="image-description">
            We’re more than just a gaming platform — we’re a global hub where
            passion, competition, and fun come together. Our goal is to connect
            gamers o.
          </p>
          <button className="image-button">Explore</button>
        </div>

        {/* Mobile Background */}
        <div className="image-mobile">
          <img src={mbg} alt="mobile background" />
        </div>

        {/* Desktop Layout */}
        <div className="image-content">
          {/* Left Text Section */}
          <div className="image-side left">
            <p className="image-side-text">
              Exclusive Games. <br />
              Escort mission. <br />
              Special events.
            </p>
            <div className="image-divider"></div>
            <img src={shooter} alt="Shooter" className="image-box" />
          </div>

          {/* Image Grid */}
          <div className="image-grid">
            <img src={hedgies} alt="Hedgies" className="image-box" />
            <img src={mario} alt="Mario" className="image-box tall" />
            <img src={subway} alt="Subway" className="image-box" />
            <img src={porsche} alt="Porsche" className="image-box" />
            <img src={war} alt="War" className="image-box" />
          </div>

          {/* Right Text Section */}
          <div className="image-side right">
            <img src={pubg} alt="PubG" className="image-box" />
            <p className="image-side-text">
              Rage <br />
              Aggression <br />
              Culture
            </p>
            <div className="image-divider"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
