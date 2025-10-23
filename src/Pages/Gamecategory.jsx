import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import GameCard from "../Components/GameCard"; 
import { games } from "../data/games";

import Action from "../Assets/Action.jpg";
import Match from "../Assets/Match.jpg";
import Mahjong from "../Assets/Mahjong.jpg";
import Mind from "../Assets/Mind.png";
import Classic from "../Assets/Classic.jpg";
import Solitaire from "../Assets/Solitaire.jpg";
import Hidden from "../Assets/Hidden.jpg";

import "../Styles/Gamecategory.css";

// Mapping genre to banner images
const categoryImages = {
  mahjong: Mahjong,
  solitaire: Solitaire,
  action: Action,
  "match 3": Match,
  mind: Mind,
  "classic games": Classic,
  "hidden objects": Hidden,
};

const CategoryBanner = ({ categoryName }) => {
  const imageSrc = categoryImages[categoryName.toLowerCase()];
  return (
    <div className="category-banner">
      {imageSrc && <img src={imageSrc} alt={categoryName} className="category-bg" />}
      <div className="category-overlay">
        <div className="glass-overlay">
          <h1>{categoryName}</h1>
        </div>
      </div>
    </div>
  );
};

const Gamecategory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { categoryName } = useParams();

  const categoryGames = useMemo(
    () => games.filter(g => g.genre.toLowerCase() === categoryName.toLowerCase()),
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
                <div key={game.id} className="category-card-wrapper">
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
