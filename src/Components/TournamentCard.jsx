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
    const baseOffset = 14 * 3600 + 20 * 60; // 14 hours 20 minutes in seconds
    let startTime = localStorage.getItem("tournamentStartTime");

    if (!startTime) {
      startTime = Date.now();
      localStorage.setItem("tournamentStartTime", startTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      let totalSeconds = baseOffset + elapsedSeconds;

      // If more than 24 hours (86400 seconds) have passed, reset
      if (totalSeconds >= 86400) {
        // Reset both localStorage and state
        startTime = Date.now();
        localStorage.setItem("tournamentStartTime", startTime);
        totalSeconds = baseOffset;
      }

      setElapsedTime(totalSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format elapsed time as HH:MM:SS
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
      {/* Decorative Diamond */}
      <div className="tournament-diamond">
        <svg width="180" height="180" viewBox="0 -27 96 96">
          <path d="M48 12L84 48L48 84L12 48L48 12Z" fill="white" />
        </svg>
      </div>

      {/* Main Card */}
      <div className="tournament-main">
        {/* Background Shape */}
        <div className="tournament-bg">
          <svg width="100%" height="100%" viewBox="0 0 520 260">
            <defs>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="17.5" />
              </filter>
            </defs>
            <path
              d="M0 18 L400 18 L400 160 L180 160 L180 242 L0 242 Z"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              filter="url(#blur)"
            />
          </svg>
          <div className="tournament-bg-overlay"></div>
        </div>

        {/* Content */}
        <div className="tournament-content">
          {/* Left: Timer */}
          <div className="tournament-left">
            <div className="tournament-date">
              <div className="month">RANK</div>
              <div className="day">#1</div>
              <div className="time">{formatTime(elapsedTime)}</div>
            </div>
          </div>

          {/* Middle: Thumbnail */}
          <div className="tournament-center">
            <div className="thumbnail">
              <img
                src="https://www.htmlgames.com/uploaded/game/thumb800/mahjonggpyramids800450.webp"
                alt="Tournament Preview"
              />
              <div className="play-overlay" onClick={handleStartPlaying}>
                <div className="play-button">
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                    <path
                      d="M9.02985 5.46067L0 0V10.9213L9.02985 5.46067Z"
                      fill="#D2E041"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Start Button */}
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
