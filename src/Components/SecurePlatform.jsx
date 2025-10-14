import "../Styles/SecurePlatform.css";

import encryptionIcon from "../Assets/Feature/encryption-icon.png";
import fraudProtection from "../Assets/Feature/fraud-protection.png";
import performance from "../Assets/Feature/performance.png";
import globalCompliance from "../Assets/Feature/global-compliance.png";
import lockGroup from "../Assets/Feature/lock-group.png";
import stageGroup from "../Assets/Feature/stages-group.png";

export default function SecurePlatform() {
  return (
    <div className="secure-section">
      <div className="secure-container">
        {/* ------------------ TOP SECTION ------------------ */}
        <div className="secure-top">
          {/* LEFT SIDE */}
          <div className="secure-left">
            <p className="secure-subtitle">Safe & Secure</p>
            <h1 className="secure-title">Secure Platform</h1>
            <p className="secure-description">
              Your security comes first. Built with enterprise-grade protection,
              encrypted data, and trusted infrastructure, our platform keeps
              every transaction safe and reliable.
            </p>
            <button className="secure-btn">Start Securely</button>
          </div>

          {/* RIGHT SIDE (Images) */}
          <div className="secure-right">
            <img src={lockGroup} alt="Lock Group" className="lock-img" />
            <img src={stageGroup} alt="Stages Group" className="stage-img" />
          </div>
        </div>

        {/* ------------------ BOTTOM SECTION ------------------ */}
        <div className="secure-bottom">
          <h2 className="secure-bottom-title">
            See what <br /> being built Secure
          </h2>

          {/* Feature Cards */}
          <div className="secure-cards">
            <div className="secure-card">
              <img src={encryptionIcon} alt="End-to-End Encryption" />
              <p>
                End-to-End <br /> Encryption
              </p>
            </div>

            <div className="secure-card">
              <img src={fraudProtection} alt="Fraud Protection" />
              <p>
                Fraud <br /> Protection
              </p>
            </div>

            <div className="secure-card">
              <img src={performance} alt="Reliable Performance" />
              <p>
                Reliable <br /> Performance
              </p>
            </div>

            <div className="secure-card">
              <img src={globalCompliance} alt="Global Compliance" />
              <p>
                Global <br /> Compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
