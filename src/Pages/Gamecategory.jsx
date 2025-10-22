import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import GameCard from "../Components/GameCard"; 
import { games } from "../data/games";
import Bg from "../Assets/category_banner.png"; // reuse existing background
import "../Styles/Gamecategory.css";

const CategoryBanner = ({ categoryName }) => (
  <div className="category-banner">
    <img src={Bg} alt={categoryName} className="category-bg" />
    <div className="category-overlay">
      <h1>{categoryName}</h1>
    </div>
  </div>
);

const Gamecategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const categoryGames = useMemo(
    () => games.filter((g) => g.genre.toLowerCase() === categoryName.toLowerCase()),
    [categoryName]
  );

  return (
    <div className="gamecategory-container">
      <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="gamecategory-main">
          {/* Category Banner */}
          <CategoryBanner categoryName={categoryName} />

          <div className="game-grid">
            {categoryGames.length > 0 ? (
              categoryGames.map((game) => (
                <div
                  key={game.id}
                  className="category-card-wrapper"
                >
                  <GameCard game={game} />
                </div>
              ))
            ) : (
              <p className="no-games">No games found in this category.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gamecategory;
