import { useState, useMemo } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import GameCard from "../Components/GameCard";
import { games } from "../data/games";
import Bg from "../Assets/Gameview/bg.png";
import "../Styles/Gameview.css";

const HeroBanner = () => (
  <div className="hero2-banner">
    <img src={Bg} alt="Game Banner" className="hero2-bg" />
    <div className="hero2-overlay">
      <h1>Game Tourer!</h1>
      <p>
        Play & Earn <span>1500</span> points ✨
      </p>
    </div>
  </div>
);

// 👇 GameSection handles its own "View All" toggle
const GameSection = ({ title, games }) => {
  const [viewAll, setViewAll] = useState(false);

  const visibleGames = viewAll ? games : games.slice(0, 4);

  return (
    <section className="game2-section">
      <div className="section2-header">
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(
    () =>
      games.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="gameview-container">
      <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main2-content">
          <HeroBanner />
          <GameSection title="Recently Played" games={filteredGames.slice(22, 28)} />
          <GameSection title="Featured Games" games={filteredGames.slice(0, 6)} />
          <GameSection title="Action Games" games={filteredGames.slice(6, 12)} />
          <GameSection title="Trending" games={filteredGames.slice(12, 19)} />
        </main>
      </div>
    </div>
  );
}
