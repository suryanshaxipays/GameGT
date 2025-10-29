import "../../Styles/HomeCard.css";
import second from "../../Assets/vi.png";

const HomeCard = () => {
  return (
    <div className="gamecard-wrapper">
      {/* Decorative Diamond */}
      <div className="diamond-shape">
        <svg width="96" height="96" viewBox="0 -27 96 96">
          <path d="M48 12L84 48L48 84L12 48L48 12Z" fill="white" />
        </svg>
      </div>

      {/* Main Card */}
      <div className="gamecard-container">
        {/* Background */}
        <div className="background-layer">
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
          <div className="background-glass"></div>
        </div>

        {/* Card Content */}
        <div className="gamecard-content">
          {/* Left Section */}
          <div className="left-section">
            <div className="date-container">
              <div className="month">OCT</div>
              <div className="day">29</div>
              <div className="time">15:45:12</div>
            </div>
          </div>

          {/* Center Section - Game Thumbnail */}
          <div className="center-section">
            <div className="thumbnail">
              <img
                src={second}
                alt="Game Preview"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=274&h=160&fit=crop&crop=center";
                }}
              />
              <div className="play-button">
                <div className="play-inner">
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

          {/* Right Section - Play Button */}
          <div className="right-section">
            <button className="join-btn">
              <div className="btn-inner">
                <span className="btn-text">PLAY GAME</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="arrow-icon"
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

export default HomeCard;
