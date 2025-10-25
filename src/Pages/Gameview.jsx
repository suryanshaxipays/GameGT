import { useState, useMemo } from "react";
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
  const navigate = useNavigate();

  const filteredGames = useMemo(
    () => games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const categories = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return uniqueGenres.sort();
  }, []);

  return (
    <div className="gameview-container fullwidth">
      <Navbar />
      <main className="main2-content">
        {/* Category Heading + Horizontal List (same row) */}
        <div className="category-scroll-row">
          <h2 className="category-scroll-heading">Game Categories:</h2>
          <div className="category-scroll-inline">
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
        </div>

        <HeroBanner />

        <GameSection title="Recently Played" games={filteredGames.slice(22, 28)} />
        <GameSection title="Featured Games" games={filteredGames.slice(0, 6)} />
        <GameSection title="Action Games" games={filteredGames.slice(6, 12)} />
        <GameSection title="Trending" games={filteredGames.slice(12, 19)} />
      </main>
      
    </div>
  );
}
