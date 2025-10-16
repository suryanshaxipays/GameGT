import '../../Styles/Feature.css';
import A from "../../Assets/A.png"; // your single clubbed image
import B from "../../Assets/B.png"; // your single clubbed image
import C from "../../Assets/C.png"; // your single clubbed image


const Feature = () => {
  return (
    <div className="featured-game-container">
      <div className="featured-header">
        <h1 className="featured-title">
          Featured Game
        </h1>
        <p className="featured-description">
          Dive into our featured game of the week, packed with challenges, rewards, and exclusive events .
        </p>
      </div>

      <div className="games-grid">
        <div className="game-card">
          <div className="game-image-wrapper">
            <img 
            src={C}
              className="game-image"
            />
            <div className="game-overlay">
              <h3 className="game-title">Phoenix Contract</h3>
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Phoenix Contract</h3>
            <p className="game-address">3891 ranchew Dr</p>
            <p className="game-city">Richardson, california</p>
          </div>
        </div>

        <div className="game-card game-card-featured">
          <div className="game-image-wrapper">
            <img 
              src={B}
              alt="Vampire Master"
              className="game-image"
            />
            <div className="game-overlay">
              <h3 className="game-title">Vampire Master</h3>
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Vampire Master</h3>
            <p className="game-address">4516 w. Gray,Utica</p>
            <p className="game-city">Pennsylvania</p>
          </div>
        </div>

        <div className="game-card">
          <div className="game-image-wrapper">
            <img 
              src={A} 
              alt="Immortals Revenge"
              className="game-image"
            />
            <div className="game-overlay">
              <h3 className="game-title">Immortals Revenge</h3>
            </div>
          </div>
          <div className="game-info">
            <h3 className="game-name">Immortals Revenge</h3>
            <p className="game-address">3891 ranchew Dr</p>
            <p className="game-city">Richardson, california</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;