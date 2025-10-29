import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/GameCard.css";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gamecard"
      onClick={() => navigate(`/gameplay/${game.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image + Title inside same div */}
      <div className="gamecard-image-wrapper">
        <img src={game.thumbnail} alt={game.title} className="gamecard-img" />
        <div className="gamecard-title-overlay">
          <h3 className="gamecard-title">{game.title}</h3>
        </div>
      </div>

      {/* Hover YouTube Preview */}
      {hovered && game.youtubePreview && (
        <div className="gamecard-preview">
          <iframe
            src={game.youtubePreview}
            title={game.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default GameCard;

