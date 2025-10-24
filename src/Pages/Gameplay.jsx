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
    () =>
      game
        ? games.filter((g) => g.genre === game.genre && g.id !== game.id)
        : [],
    [game]
  );

  const featuredGames = useMemo(() => games.slice(0, 6), []);

  if (!game) return <p className="no-games">Game not found</p>;

  return (
    <div
      className={`gameplay-container ${isFullScreen ? "fullscreen-mode" : ""}`}
    >
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

        {/* GAME INFO / ABOUT SECTION */}
        {!isFullScreen && (
          <section className="game-description glass-card">
            <h2 className="gradient-text2">About {game.title}</h2>

            {/* Genre Badge */}
            <div className="genre-badge">
              <span>{game.genre}</span>
            </div>

            {/* Game Details */}
            <div className="game-details">
              <p>
                <strong>Publisher :</strong> {game.publisher}
              </p>
              <p>
                <strong>Platform :</strong> {game.platform}
              </p>
              <p>
                <strong>Players :</strong> {game.players}
              </p>
              <p>
                <strong>Online :</strong> {game.isOnline ? "Yes" : "No"}
              </p>
              <p>
                <strong>rating :</strong> {game.rating}
              </p>

              <p>
                <strong>Year :</strong> {game.year}
              </p>
            </div>

            {/* Description */}
            <p className="game-description-text">
              {game.title}, published by {game.publisher} in {game.year}, offers
              an engaging experience in the {game.genre} genre. Available on{" "}
              {game.platform}, it supports {game.players} players and can be
              enjoyed {game.isOnline ? "online" : "offline"}. With a rating of{" "}
              {game.rating}, this game delivers thrilling gameplay, immersive
              design, and countless hours of entertainment for both casual and
              dedicated gamers alike.
            </p>

            {/* Mock Detailed Section */}
            <div className="mock-section">
              <div className="mock-card">
                <h4>Trending Game</h4>
                <p>{game.title} is trending worldwide!</p>
              </div>
              <div className="mock-card">
                <h4>Top Player Count</h4>
                <p>{game.id * 101} active players daily</p>
              </div>
              <div className="mock-card">
                <h4>Difficulty</h4>
                <p>{game.genre === "Action" ? "Hard" : "Medium"}</p>
              </div>
              <div className="mock-card">
                <h4>Recommended For</h4>
                <p>{game.platform} enthusiasts & online players</p>
              </div>
            </div>
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
                  className="category-card-wrapper neon-hover"
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
                  className="category-card-wrapper neon-hover"
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
