import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/GameCard.css";
import VipIcon from "../Assets/vip.png";

const GameCard = ({ game, isLoggedIn, onLoginRequest }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isFree = game.id % 3 === 0; // Dummy free check
  const computedIsLoggedIn =
    isLoggedIn ??
    (localStorage.getItem("isLoggedIn") === "true" ||
      JSON.parse(localStorage.getItem("userAuth") || "{}")?.loggedIn);
  const hasPaidAccess = localStorage.getItem("hasPaidAccess") === "true";
  const hasAccess = isFree || hasPaidAccess;


  const handleCardClick = () => {
    if (!isFree) {
      if (!computedIsLoggedIn) {
        // Save intent to return to checkout for this game, then open login popup
        localStorage.setItem(
          "postAuthRedirect",
          JSON.stringify({ action: "checkout", gameId: game.id, path: window.location.pathname + window.location.search })
        );
        if (onLoginRequest) {
          onLoginRequest();
        } else {
          window.dispatchEvent(new Event("openLogin"));
        }
        return;
      }
      if (!hasAccess) {
        navigate("/checkout", { state: { game } });
        return;
      }
    }
    navigate(`/gameplay/${game.id}`);
  };

  return (
    <div
      className="gamecard"
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="gamecard-image-wrapper">
        <img src={game.thumbnail} alt={game.title} className="gamecard-img" />

        {!isFree && <img src={VipIcon} alt="VIP" className="vip-badge" />}

        <div className="gamecard-title-overlay">
          <h3 className="gamecard-title">{game.title}</h3>
        </div>
      </div>

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
