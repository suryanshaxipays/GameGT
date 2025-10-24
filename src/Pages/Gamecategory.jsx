import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Navbar2 from "../Components/Navbar2";
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
    <div className="hero2-banner3">
      {imageSrc && <img src={imageSrc} alt={categoryName} className="hero2-bg3" />}
      <div className="hero2-overlay">
        <h1>{categoryName}</h1>
        <p>Enjoy the best {categoryName} games 🎮</p>
      </div>
    </div>
  );
};

const Gamecategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const [isViewAll, setIsViewAll] = useState(true);

  const categoryGames = useMemo(
    () => games.filter((g) => g.genre.toLowerCase() === categoryName.toLowerCase()),
    [categoryName]
  );

  const categories = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return uniqueGenres.sort();
  }, []);

  return (
    <div className="gameview-container fullwidth">
      <Navbar2 />

      <main className="main2-content">
        {/* Category Heading + Inline Category List */}
        <div className="category-scroll-row">
          <h2 className="category-scroll-heading">Game Categories:</h2>
          <div className="category-scroll-inline">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-scroll-btn ${
                  cat.toLowerCase() === categoryName.toLowerCase() ? "active" : ""
                }`}
                onClick={() => navigate(`/category/${cat}`)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Banner */}
        <CategoryBanner categoryName={categoryName} />

        {/* Game Grid Section */}
        <section className="game2-section">
          <div className="section2-header">
            <h2>{categoryName} Games</h2>
            {categoryGames.length > 5 && (
              <span className="view-all" onClick={() => setIsViewAll(!isViewAll)}>
                {isViewAll ? "Show Less" : "View All"}
              </span>
            )}
          </div>

          <div className="game2-grid">
            {(isViewAll ? categoryGames : categoryGames.slice(0, 6)).map((game) => (
              <GameCard key={game.id} game={game} />
            ))}

            {categoryGames.length === 0 && (
              <p className="no-games">No games found in this category.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gamecategory;
