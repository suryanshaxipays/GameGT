// src/Components/LoginPopup.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { games } from "../data/games";
import "../Styles/Auth.css";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'

  // When opened, if no redirect target saved, save current location for back
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("postAuthRedirect") || "null");
    if (!existing?.path && location) {
      localStorage.setItem(
        "postAuthRedirect",
        JSON.stringify({ path: location.pathname + location.search })
      );
    }
  }, [location]);

  const completeAuthAndRedirect = (userEmail) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", userEmail);
    localStorage.setItem("userAuth", JSON.stringify({ email: userEmail, loggedIn: true }));

    const redirect = JSON.parse(localStorage.getItem("postAuthRedirect") || "null");
    // Clear prompt flag
    localStorage.removeItem("loginPrompt");

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (redirect?.action === "checkout" && redirect?.gameId) {
        const game = games.find((g) => g.id === Number(redirect.gameId));
        if (game) navigate("/checkout", { state: { game } });
      } else if (redirect?.path) {
        if (redirect.path !== location.pathname + location.search) {
          navigate(redirect.path);
        }
      }
      localStorage.removeItem("postAuthRedirect");
      onLoginSuccess && onLoginSuccess();
      onClose();
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Static credentials OR stored signup credentials
    const validUser = "demo";
    const validPass = "1234";
    const normalizedEmail = email?.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const isStatic =
      (normalizedEmail === validUser || normalizedEmail === `${validUser}@games.com`) &&
      password === validPass;
    const isRegistered = users[normalizedEmail] && users[normalizedEmail] === password;

    if (isStatic || isRegistered) {
      const userEmail = normalizedEmail.includes("@") ? normalizedEmail : `${validUser}@games.com`;
      completeAuthAndRedirect(userEmail);
    } else {
      alert("Invalid credentials! Use demo/1234 or your signed-up account.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) return;
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    users[normalizedEmail] = password;
    localStorage.setItem("users", JSON.stringify(users));
    completeAuthAndRedirect(normalizedEmail);
  };

  return (
    <>
      <div className="auth-container auth-overlay">
        <div className="auth-card">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>{activeTab === "login" ? "Login" : "Sign Up"}</h2>
          <p className="subtitle">
            {activeTab === "login" ? "Enter your credentials to continue" : "Create your account to start playing"}
          </p>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="demo or demo@games.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="1234"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">Login</button>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="auth-btn">Sign Up</button>
            </form>
          )}

          {activeTab === "login" ? (
            <p className="auth-switch">New here? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("signup"); }}>Create an account</a></p>
          ) : (
            <p className="auth-switch">Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab("login"); }}>Login</a></p>
          )}
        </div>
      </div>

      {showSuccess && <div className="success-box">✅ Login Successful!</div>}
    </>
  );
};

export default LoginPopup;
