import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/GameCard.css";
import VipIcon from "../Assets/vip.png"; // <-- make sure vip.png exists in /Assets

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isFree = game.id % 3 === 0;

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

        {/* VIP Badge for Paid Games */}
        {!isFree && (
          <img src={VipIcon} alt="VIP" className="vip-badge" />
        )}

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
