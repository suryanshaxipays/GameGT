import { useEffect, useState } from "react";
import "../Styles/Home.css";

import Navbar from "../Components/Navbar";
import Hero from "../Components/Home/Hero";
import Feature from "../Components/Home/Feature";
import About from "../Components/Home/About";
import Categories from "../Components/Home/Categories";
import Community from "../Components/Home/Community";
import Footer from "../Components/Footer";
import StatsSection from "../Components/Home/StatsSection";
import FAQSection from "../Components/Home/FAQSection";
import Ellipse from "../Assets/Ellipse.png";
import Arrow from "../Assets/Arrow.png"; 

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Removed cursor bubble effect completely

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      if (sections.length > 2) {
        const secondSectionBottom =
          sections[2].offsetTop + sections[2].offsetHeight;
        setShowScrollTop(window.scrollY > secondSectionBottom - 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <img src={Ellipse} alt="background" className="home-ellipse" />

      <Navbar />
      <section id="home">
        <Hero />
      </section>

      <section id="features">
        <Feature />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="games">
        <Categories />
      </section>

      <section id="stats">
        <StatsSection />
      </section>

      <section id="community">
        <Community />
      </section>

      <section id="faq">
        <FAQSection />
      </section>

      <Footer />

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <img src={Arrow} alt="Go to top" className="arrow-icon" />
        </button>
      )}
    </div>
  );
};

export default Home;
   