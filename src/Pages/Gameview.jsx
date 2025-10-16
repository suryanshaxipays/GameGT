import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import { games } from "../data/games";
import Bg from "../Assets/Gameview/bg.png";
import "../Styles/Gameview.css";

const HeroBanner = () => (
  <div className="hero2-banner">
    <img src={Bg} alt="Game Banner" className="hero2-bg" />
    <div className="hero2-overlay">
      <h1>Wolf Hunting!</h1>
      <p>Play & Earn <span>1500</span> points ✨</p>
      <button>Play Now</button>
    </div>
  </div>
);

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="game2-card"
      onClick={() => navigate(`/gameplay/${game.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={game.thumbnail} alt={game.title} />
      <h3>{game.title}</h3>

      {hovered && game.youtubePreview && (
        <div className="game-preview">
          <iframe
            src={game.youtubePreview}
            title={game.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

const GameSection = ({ title, games }) => (
  <section className="game2-section">
    <div className="section2-header">
      <h2>{title}</h2>
      <span className="view-all">View All</span>
    </div>
    <div className="game2-grid">
      {games.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </div>
  </section>
);

export default function Gameview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(
    () => games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="gameview-container">
      <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main2-content">
          <HeroBanner />
          <GameSection title="Featured Games" games={filteredGames.slice(0, 6)} />
          <GameSection title="Action Games" games={filteredGames.slice(6, 12)} />
          <GameSection title="Trending" games={filteredGames.slice(12, 18)} />
          <GameSection title="Recently Played" games={filteredGames.slice(0, 4)} />
        </main>
      </div>
    </div>
  );
}
