import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import GameCard from "../Components/GameCard";
import { games } from "../data/games";
import Bg from "../Assets/Gameview/bg.png";
import "../Styles/Gameview.css";

const HeroBanner = () => (
  <div className="hero2-banner2">
    <img src={Bg} alt="Game Banner" className="hero2-bg2" />
    <div className="hero2-overlay">
      <h1>Game Tourer!</h1>
      <p>
        Play & Earn <span>1500</span> points ✨
      </p>
    </div>
  </div>
);

const GameSection = ({ title, games }) => {
  const [viewAll, setViewAll] = useState(false);
  const visibleGames = viewAll ? games : games.slice(0, 5);

  return (
    <section className="game2-section">
      <div className="section2-header2">
        <h2>{title}</h2>
        <span className="view-all" onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "Show Less" : "View All"}
        </span>
      </div>
      <div className="game2-grid">
        {visibleGames.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </section>
  );
};

export default function Gameview() {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const filteredGames = useMemo(
    () => games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const categories = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return uniqueGenres.sort();
  }, []);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll with arrow buttons
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amt = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amt : amt,
      behavior: "smooth",
    });
  };

  // Drag scroll for desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };
  const stopDragging = () => (isDragging.current = false);
  const onMouseMove = (e) => {
    if (!isDragging.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="gameview-container fullwidth">
      <Navbar />
      <main className="main2-content">
        {/* Category Heading + Scrollable List */}
        <div className={`category-scroll-container ${isMobile ? "mobile-view" : ""}`}>
          <h2 className="category-scroll-heading">Game Categories:</h2>

          {!isMobile && (
            <button className="arrow-btn left" onClick={() => scroll("left")}>
              &#10094;
            </button>
          )}

          <div
            className="category-scroll-inline"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={onMouseMove}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="category-scroll-btn"
                onClick={() => navigate(`/category/${cat}`)}
              >
                {cat}
              </button>
            ))}
          </div>

          {!isMobile && (
            <button className="arrow-btn right" onClick={() => scroll("right")}>
              &#10095;
            </button>
          )}
        </div>

        <HeroBanner />

        <GameSection title="Recently Played" games={filteredGames.slice(22, 28)} />
        <GameSection title="Featured Games" games={filteredGames.slice(0, 6)} />
        <GameSection title="Action Games" games={filteredGames.slice(6, 12)} />
        <GameSection title="Trending" games={filteredGames.slice(12, 19)} />
        <GameSection title="Board Games" games={filteredGames.slice(58, 67)} />
        <GameSection title="Racing Games" games={filteredGames.slice(68, 77)} />
        <GameSection title="War Games" games={filteredGames.slice(78, 87)} />
        <GameSection title="Golf Games" games={filteredGames.slice(88, 98)} />
        <GameSection title="Sports Games" games={filteredGames.slice(99, 107)} />
      </main>
    </div>
  );
}
