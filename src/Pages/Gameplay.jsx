import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import GameCard from "../Components/GameCard";
import { games } from "../data/games";
import "../Styles/Gameplay.css";
import FullscreenIcon from "../Assets/fullscreen.png";
import ExitFullscreenIcon from "../Assets/exit-fullscreen.png";

const Gameplay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === parseInt(id));

  // Hooks at top
  const genreGames = useMemo(
    () => (game ? games.filter((g) => g.genre === game.genre && g.id !== game.id) : []),
    [game]
  );

  const featuredGames = useMemo(() => games.slice(0, 6), []);

  if (!game) return <p>Game not found</p>;

  return (
    <div className={`gameplay-container ${isFullScreen ? "fullscreen-mode" : ""}`}>
      {!isFullScreen && <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <div className="main-layout">
        {!isFullScreen && <Sidebar isOpen={isSidebarOpen} />}
        <main className="gameplay-main">
          <h1 className="gameplay-title">{game.title}</h1>

          {/* Game Frame */}
          <div className={`gameplay-frame ${isFullScreen ? "fullscreen" : ""}`}>
  <iframe
    src={game.embedLink}
    title={game.title}
    frameBorder="0"
    allow="autoplay; fullscreen; encrypted-media"
    allowFullScreen
  ></iframe>

  {/* Exit Fullscreen button */}
  {isFullScreen && (
    <div className="exit-fullscreen-wrapper">
      <img
        src={ExitFullscreenIcon}
        alt="Exit Fullscreen"
        className="exit-fullscreen-btn"
        onClick={() => setIsFullScreen(false)}
      />
    </div>
  )}
</div>


          {/* Fullscreen button below window */}
          {!isFullScreen && (
            <div className="fullscreen-container">
              <img
                src={FullscreenIcon}
                alt="Fullscreen"
                className="fullscreen-btn"
                onClick={() => setIsFullScreen(true)}
              />
            </div>
          )}

          {/* Game Description */}
          {!isFullScreen && (
            <div className="game-description">
              <h2>About {game.title}</h2>
              <p><strong>Title:</strong> {game.title}</p>
              <p><strong>Genre:</strong> {game.genre}</p>
              <p><strong>Year:</strong> {game.year}</p>
              <p><strong>Rating:</strong> {game.rating}</p>
              <p><strong>Price:</strong> {game.isFree ? "Free" : `$${game.price}`}</p>
              <p><strong>Publisher:</strong> {game.publisher}</p>
              <p><strong>Platform:</strong> {game.platform}</p>
              <p><strong>Players:</strong> {game.players}</p>
              <p><strong>Online:</strong> {game.isOnline ? "Yes" : "No"}</p>
              <p>
                {game.title} offers an immersive gaming experience in the {game.genre} category. 
                Released in {game.year}, it has been designed for {game.platform} and supports 
                {game.players}. Whether playing online or offline, players can enjoy high-quality 
                graphics and engaging gameplay that keeps them entertained for hours. 
              </p>
            </div>
          )}

          {/* Related Genre Games */}
          {!isFullScreen && genreGames.length > 0 && (
            <section className="related-section">
              <h2>More {game.genre} Games</h2>
              <div className="game-grid">
                {genreGames.map((g) => (
                  <div key={g.id} className="category-card-wrapper" onClick={() => navigate(`/gameplay/${g.id}`)}>
                    <GameCard game={g} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Games */}
          {!isFullScreen && (
            <section className="related-section">
              <h2>Featured Games</h2>
              <div className="game-grid">
                {featuredGames.map((g) => (
                  <div key={g.id} className="category-card-wrapper" onClick={() => navigate(`/gameplay/${g.id}`)}>
                    <GameCard game={g} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Gameplay;
