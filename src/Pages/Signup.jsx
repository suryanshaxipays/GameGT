import { useState, useEffect } from "react";
import "../Styles/Auth.css";

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful signup
    setSuccessMessage("Account Created Successfully! Redirecting...");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 2500);
  };

  const handleSwitchToLogin = (e) => {
    e.preventDefault();
    onClose();
    onSwitchToLogin();
  };

  return (
    <div className="auth-container auth-overlay">
      {successMessage && (
        <div className="success-box">{successMessage}</div>
      )}

      <div className="auth-card">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Join the Fun</h2>
        <p className="subtitle">Create an account to start playing!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="#" onClick={handleSwitchToLogin}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;