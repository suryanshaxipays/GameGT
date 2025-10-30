import { useNavigate } from "react-router-dom";
import "../../Styles/Categories.css";
import Bc1 from "../../Assets/Categories/Bc1.png";
import Bc2 from "../../Assets/Categories/Bc2.png";
import Sc1 from "../../Assets/Categories/Sc1.jpg";
import Sc2 from "../../Assets/Categories/Sc2.png";
import Sc3 from "../../Assets/Categories/Sc3.jpg";
import Sc4 from "../../Assets/Categories/Sc4.jpg";

const Categories = () => {
  const navigate = useNavigate();

  const selectedGames = [
    { id: 99, genre: "Action" },
    { id: 11, genre: "Racing" },
    { id: 16, genre: "Mahjong" },
    { id: 21, genre: "Mind" },
    { id: 26, genre: "Classic Games" },
    { id: 6, genre: "Solitaire" },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="categories-container">
      <div className="head2">
        <h2 className="categories-title">Choose Your Arena</h2>
        <p className="featured-description">
          From action to puzzles, strategy to racing — we’ve got it all! Dive
          into our categories and find your next favorite game.{" "}
        </p>
      </div>
      <div className="categories-layout">
        {/* Left Column */}
        <div className="categories-column">
          <div
            className="categories-card big"
            onClick={() => handleCategoryClick(selectedGames[0].genre)}
          >
            <img src={Bc1} alt={selectedGames[0].genre} />
            <div className="categories-genre">{selectedGames[0].genre}</div>
          </div>

          <div className="categories-row">
            <div
              className="categories-card small"
              onClick={() => handleCategoryClick(selectedGames[1].genre)}
            >
              <img src={Sc1} alt={selectedGames[1].genre} />
              <div className="categories-genre">{selectedGames[1].genre}</div>
            </div>

            <div
              className="categories-card small"
              onClick={() => handleCategoryClick(selectedGames[2].genre)}
            >
              <img src={Sc2} alt={selectedGames[2].genre} />
              <div className="categories-genre">{selectedGames[2].genre}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="categories-column">
          <div className="categories-row">
            <div
              className="categories-card small"
              onClick={() => handleCategoryClick(selectedGames[3].genre)}
            >
              <img src={Sc3} alt={selectedGames[3].genre} />
              <div className="categories-genre">{selectedGames[3].genre}</div>
            </div>

            <div
              className="categories-card small"
              onClick={() => handleCategoryClick(selectedGames[4].genre)}
            >
              <img src={Sc4} alt={selectedGames[4].genre} />
              <div className="categories-genre">{selectedGames[4].genre}</div>
            </div>
          </div>

          <div
            className="categories-card big"
            onClick={() => handleCategoryClick(selectedGames[5].genre)}
          >
            <img src={Bc2} alt={selectedGames[5].genre} />
            <div className="categories-genre">{selectedGames[5].genre}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
