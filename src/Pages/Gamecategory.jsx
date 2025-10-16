import { useParams, useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import { games } from "../data/games";
import "../Styles/Gamecategory.css";
import { useMemo, useState } from "react";

const Gamecategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [hoveredGame, setHoveredGame] = useState(null);

  const categoryGames = useMemo(
    () => games.filter((g) => g.genre === categoryName),
    [categoryName]
  );

  return (
    <div className="gamecategory-container">
      <Navbar2 />
      <div className="gamecategory-content">
        <Sidebar />
        <main className="gamecategory-main">
          <h1 className="gamecategory-title">{categoryName} Games</h1>
          <div className="game-grid">
            {categoryGames.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => navigate(`/gameplay/${game.id}`)}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <img className="gc" src={game.thumbnail} alt={game.title} />
                <h3>{game.title}</h3>

                {hoveredGame === game.id && game.youtubePreview && (
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
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gamecategory;
