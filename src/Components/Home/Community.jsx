import "../../Styles/Community.css";

import avatar1 from "../../Assets/About/avatar1.png";
import avatar2 from "../../Assets/About/avatar2.png";
import avatar3 from "../../Assets/About/avatar3.png";
import avatar4 from "../../Assets/About/avatar4.png";
import avatar5 from "../../Assets/About/avatar5.png";
import avatar6 from "../../Assets/About/avatar6.png";
import Lock from "../../Assets/About/Lock.png";
import Arrow from "../../Assets/About/Arrow.png";
import Like from "../../Assets/About/Like.png";

import { Link } from "react-router-dom";

const Community = () => {
  return (
    <section className="community-section">
      {/* Header */}
      <div className="community-header">
        <h2 className="community-title">Our Community</h2>
        <p className="community-description">
          Our community is the heartbeat of everything we do. From casual gamers
          to pro competitors, millions come together here to have Electrifying experiences,
          build Skills, and push the limits of play. This is where passion
          meets connection and where every gamer belongs.
        </p>
      </div>

      {/* Concentric Rings + Avatars */}
      <div className="community-ring-container">
        <div className="community-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        <Link to="/gameview">
          <button className="community-center-btn">Get started for free</button>
        </Link>

        {/* Avatars */}
        <img src={avatar1} alt="Avatar 1" className="avatar avatar1" />
        <img src={avatar2} alt="Avatar 2" className="avatar avatar2" />
        <img src={avatar3} alt="Avatar 3" className="avatar avatar3" />
        <img src={avatar4} alt="Avatar 4" className="avatar avatar4" />
        <img src={avatar5} alt="Avatar 5" className="avatar avatar5" />
        <img src={avatar6} alt="Avatar 6" className="avatar avatar6" />

        {/* Floating Icons */}
        <img src={Lock} alt="Lock" className="icon icon-lock" />
        <img src={Arrow} alt="Arrow" className="icon icon-arrow" />
        <img src={Like} alt="Like" className="icon icon-like" />
      </div>

      {/* CTA Section */}
      <div className="community-cta">
        <div className="community-cta-inner">
          <h3 className="community-cta-title">
            Play. Connect. Conquer. Together.
          </h3>
          <p className="community-cta-text">Your next adventure starts here.</p>
          <Link to="/gameview">
  <button className="community-cta-btn">Start Playing Now</button>
</Link>

        </div>
      </div>
    </section>
  );
};

export default Community;
