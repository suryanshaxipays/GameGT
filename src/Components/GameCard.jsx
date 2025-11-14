import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/GameCard.css";
import VipIcon from "../Assets/vip.png";

// ===============================
// Glass Modal Component
// ===============================
const LoginRequiredModal = ({ onClose, onLogin }) => {
  return (
    <div className="glass-login-overlay" onClick={onClose}>
      <div className="glass-login-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="glass-title">Login Required</h2>
        <p className="glass-text">Log in and complete the payment to enjoy this premium game.</p>

        <div className="glass-btn-row">
          <button className="glass-btn login" onClick={onLogin}>
            Login
          </button>
          <button className="glass-btn close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ===============================
// MAIN COMPONENT
// ===============================
const GameCard = ({ game, isLoggedIn }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [showGlassModal, setShowGlassModal] = useState(false);

  const isFree = game.id % 3 === 0;

  const computedIsLoggedIn =
    isLoggedIn ??
    (localStorage.getItem("isLoggedIn") === "true" ||
      JSON.parse(localStorage.getItem("userAuth") || "{}")?.loggedIn);

  const hasPaidAccess = localStorage.getItem("hasPaidAccess") === "true";
  const hasAccess = isFree || hasPaidAccess;

  // ============================
  // CLICK EVENT FIXED HERE
  // ============================
  const handleCardClick = () => {
    if (!isFree) {
      if (!computedIsLoggedIn) {
        // ❌ STOP dispatching event here
        // ❌ STOP auto-opening Navbar login popup
        // ✅ Show Glass modal instead
        setShowGlassModal(true);
        return;
      }

      if (!hasAccess) {
        navigate("/checkout", { state: { game } });
        return;
      }
    }

    navigate(`/gameplay/${game.id}`);
  };

  // ============================
  // LOGIN BUTTON INSIDE MODAL
  // ============================
  const handleLoginFromModal = () => {
    // Save intent (same as before)
    localStorage.setItem(
      "postAuthRedirect",
      JSON.stringify({
        action: "checkout",
        gameId: game.id,
        path: window.location.pathname + window.location.search,
      })
    );

    // NOW dispatch login event ONLY on button click
    window.dispatchEvent(new Event("openLogin"));

    setShowGlassModal(false);
  };

  return (
    <>
      {/* Card */}
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

      {/* Glass Modal */}
      {showGlassModal && (
        <LoginRequiredModal
          onClose={() => setShowGlassModal(false)}
          onLogin={handleLoginFromModal}
        />
      )}
    </>
  );
};

export default GameCard;
