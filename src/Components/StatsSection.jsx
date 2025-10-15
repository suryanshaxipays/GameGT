import React from "react";
import "../Styles/StatsSection.css";
import vrPlayer from "../Assets/vrPlayer.png"; // change path if needed

const StatsSection = () => {
  return (
    <section className="stats-section">
      {/* Stats Box */}
      <div className="stats-box">
        <div className="stats-grid">
          <div className="stat-item">
            <h4>Players</h4>
            <p>
              Over <span>1.2M gamers online daily</span> — join the action and
              never play alone.
            </p>
          </div>

          <div className="stat-item">
            <h4>Games</h4>
            <p>
              Discover <span>500+ titles</span> across every genre, from casual
              fun to hardcore battles.
            </p>
          </div>

          <div className="stat-item">
            <h4>Matches</h4>
            <p>
              More than <span>100K matches</span> played monthly — nonstop
              excitement awaits.
            </p>
          </div>

          <div className="stat-item">
            <h4>Events</h4>
            <p>
              Exclusive <span>weekly tournaments</span> and rewards keep the
              thrill alive.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Image */}
      <img
        src={vrPlayer}
        alt="VR Player"
        className="vr-image"
      />
    </section>
  );
};

export default StatsSection;
