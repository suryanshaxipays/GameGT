import "../Styles/TournamentCard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TournamentCard = () => {
  const navigate = useNavigate();
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleStartPlaying = () => {
    navigate("/gameplay/3");
  };

  useEffect(() => {
    // Check if a stored start time exists
    let startTime = localStorage.getItem("tournamentStartTime");
    const baseOffset = (14 * 3600) + (20 * 60); // 14 hours 20 minutes in seconds

    if (!startTime) {
      // Save start time when first opened
      startTime = Date.now();
      localStorage.setItem("tournamentStartTime", startTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      setElapsedTime(baseOffset + elapsedSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format elapsed time -> HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="tournament-card-container">
      {/* Decorative Diamond with Glow */}
      <div className="tournament-diamond">
        <svg width="180" height="180" viewBox="0 -27 96 96">
          <path d="M48 12L84 48L48 84L12 48L48 12Z" fill="white" />
        </svg>
      </div>

      {/* Main Card */}
      <div className="tournament-main">
        {/* Background Shape */}
        <div className="tournament-bg">
          <div className="tournament-bg-overlay"></div>
        </div>

        {/* Content */}
        <div className="tournament-content">
          {/* Left: Date & Time */}
          <div className="tournament-left">
            <div className="tournament-date">
              <div className="month">RANK</div>
              <div className="day">#1</div>
              <div className="time">{formatTime(elapsedTime)}</div>
            </div>
          </div>

          {/* Middle: Video Thumbnail */}
          <div className="tournament-center">
            <div className="thumbnail">
              <img
                src={
                  "https://www.htmlgames.com/uploaded/game/thumb800/mahjonggpyramids800450.webp"
                }
                alt="Tournament Preview"
              />
            </div>
          </div>

          {/* Right: Join Button */}
          <div className="tournament-right">
            <button className="join-btn" onClick={handleStartPlaying}>
              <div className="join-content">
                <span>Start Playing</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="arrow"
                >
                  <path
                    d="M14.43 5.93L20.5 12L14.43 18.07"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H20.33"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
