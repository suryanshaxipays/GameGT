import { useState, useEffect } from "react";
import "../Styles/Auth.css";

const Login = ({ onClose, onSwitchToSignup }) => {
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
    // Simulate successful login
    setSuccessMessage("Login Successful! Redirecting...");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 2500);
  };

  const handleSwitchToSignup = (e) => {
    e.preventDefault();
    onClose();
    onSwitchToSignup();
  };

  return (
    <div className="auth-container auth-overlay">
      {successMessage && (
        <div className="success-box">{successMessage}</div>
      )}

      <div className="auth-card">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue your gaming adventure!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-switch">
          New here? <a href="#" onClick={handleSwitchToSignup}>Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;