import '../../Styles/Feature.css';
import A from "../../Assets/A.jpg"; // your single clubbed image
import B from "../../Assets/B.png"; // your single clubbed image
import C from "../../Assets/C.png"; // your single clubbed image
import { useNavigate } from "react-router-dom";


const Feature = () => {
  const navigate = useNavigate();

  return (
    <div className="featured-game-container">
      <div className="featured-header">
        <h1 className="featured-title">
          Featured Game
        </h1>
        <p className="featured-description">
          Dive into our featured game of the week, packed with exclusive challenges for our Gamers.
        </p>
      </div>

      <div className="games-grid">
        <div className="game-card">
          <div className="game-image-wrapper"
          onClick={() => navigate(`/gameplay/3`)}
>
            <img 
            src={C}
              className="game-image"
            />
            <div className="game-overlay">
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Mahjongg Pyramids</h3>

          </div>
        </div>

        <div className="game-card game-card-featured"
                  onClick={() => navigate(`/gameplay/36`)}
>
          <div className="game-image-wrapper">
            <img 
              src={B}
              alt="Vampire Master"
              className="game-image"
            />
            <div className="game-overlay">
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Desert Oasis</h3>

          </div>
        </div>

        <div className="game-card"
                  onClick={() => navigate(`/gameplay/333`)}
>
          <div className="game-image-wrapper">
            <img 
              src={A} 
              alt="Immortals Revenge"
              className="game-image"
            />
            <div className="game-overlay">
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Wild West Mysteries</h3>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;