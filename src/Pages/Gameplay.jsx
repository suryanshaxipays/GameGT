import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar2 from "../Components/Navbar2";
import GameCard from "../Components/GameCard";
import { games } from "../data/games";
import "../Styles/Gameplay.css";
import FullscreenIcon from "../Assets/fullscreen.png";
import ExitFullscreenIcon from "../Assets/exit-fullscreen.png";

const Gameplay = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === parseInt(id));

  const genreGames = useMemo(
    () => (game ? games.filter((g) => g.genre === game.genre && g.id !== game.id) : []),
    [game]
  );

  const featuredGames = useMemo(() => games.slice(0, 6), []);

  if (!game) return <p className="no-games">Game not found</p>;

  return (
    <div className={`gameplay-container ${isFullScreen ? "fullscreen-mode" : ""}`}>
      {!isFullScreen && <Navbar2 />}

      <main className="main2-content">
        {/* GAME TITLE */}
        {!isFullScreen && (
          <h1 className="gameplay-title gradient-text">{game.title}</h1>
        )}

        {/* GAME FRAME */}
        <div className={`gameplay-frame ${isFullScreen ? "fullscreen" : ""}`}>
          <iframe
            src={game.embedLink}
            title={game.title}
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
          ></iframe>

          {isFullScreen && (
            <img
              src={ExitFullscreenIcon}
              alt="Exit Fullscreen"
              className="exit-fullscreen-btn"
              onClick={() => setIsFullScreen(false)}
            />
          )}
        </div>

        {/* FULLSCREEN BUTTON BELOW FRAME */}
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

        {/* GAME INFO */}
        {!isFullScreen && (
          <section className="game-description glass-card">
            <h2>About {game.title}</h2>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Publisher:</strong> {game.publisher}</p>
            <p><strong>Platform:</strong> {game.platform}</p>
            <p><strong>Players:</strong> {game.players}</p>
            <p><strong>Online:</strong> {game.isOnline ? "Yes" : "No"}</p>
            <p>
              {game.title} offers an immersive experience in the {game.genre} category.
              Whether you’re playing solo or online, its design and gameplay provide
              hours of fun and challenges.
            </p>
          </section>
        )}

        {/* RELATED GAMES */}
        {!isFullScreen && genreGames.length > 0 && (
          <section className="related-section">
            <div className="section2-header">
              <h2>More {game.genre} Games</h2>
            </div>
            <div className="game2-grid">
              {genreGames.map((g) => (
                <div
                  key={g.id}
                  className="category-card-wrapper"
                  onClick={() => navigate(`/gameplay/${g.id}`)}
                >
                  <GameCard game={g} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED GAMES */}
        {!isFullScreen && (
          <section className="related-section">
            <div className="section2-header">
              <h2>Featured Games</h2>
            </div>
            <div className="game2-grid">
              {featuredGames.map((g) => (
                <div
                  key={g.id}
                  className="category-card-wrapper"
                  onClick={() => navigate(`/gameplay/${g.id}`)}
                >
                  <GameCard game={g} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Gameplay;
