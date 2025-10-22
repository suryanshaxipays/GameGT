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
      {/* Thumbnail */}
      <img src={game.thumbnail} alt={game.title} className="gamecard-img" />

      {/* Hover Preview */}
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

      {/* Title */}
      <h3 className="gamecard-title">{game.title}</h3>
    </div>
  );
};

export default GameCard;
