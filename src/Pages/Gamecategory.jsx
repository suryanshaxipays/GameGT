import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import { games } from "../data/games";
import "../Styles/Gamecategory.css";

const Gamecategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredGame, setHoveredGame] = useState(null);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const categoryGames = useMemo(
    () => games.filter((g) => g.genre === categoryName),
    [categoryName]
  );

  return (
    <div className="gamecategory-container">
      <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-layout"> {/* consistent layout */}
        <Sidebar isOpen={isSidebarOpen} />
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
