import "../../Styles/Hero.css";
import HeroImage from "../../Assets/bboy.png";
import TC from "../TournamentCard"

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Left Text Content */}
      <div className="hero-left">
        <h1>Play. Compete. Conquer.<br/>Anytime, Anywhere.</h1>
        <p>
          From casual fun to competitive battles, discover games for every
          age, every mood, and every level.
        </p>
        <div className="Card">
          <TC/>
        </div>
      </div>

      {/* Right Image */}
      <div className="hero-right">
        <img src={HeroImage} alt="Hero" className="hero-image" />
      </div>

      {/* Subtle Background Glow */}
      <div className="hero-glow"></div>
    </section>
  );
};

export default Hero;
