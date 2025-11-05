// src/Components/LoginPopup.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { games } from "../data/games";
import "../Styles/Auth.css";

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Common states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'

  // Save current location for post-login redirect
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
    },3000);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = (e) => {
    e.preventDefault();

    const normalizedEmail = email?.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    const validUser = "demo";
    const validPass = "1234";
    const isStatic =
      (normalizedEmail === validUser || normalizedEmail === `${validUser}@games.com`) &&
      password === validPass;

    const isRegistered =
      users[normalizedEmail] && users[normalizedEmail].password === password;

    if (isStatic || isRegistered) {
      const userEmail = normalizedEmail.includes("@")
        ? normalizedEmail
        : `${validUser}@games.com`;
      completeAuthAndRedirect(userEmail);
    } else {
      alert("Invalid credentials! Use demo/1234 or your signed-up account.");
    }
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = (e) => {
    e.preventDefault();

    const normalizedEmail = email?.trim().toLowerCase();
    if (!firstName || !lastName || !normalizedEmail || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[normalizedEmail]) {
      alert("Account already exists with this email!");
      return;
    }

    users[normalizedEmail] = {
      firstName,
      lastName,
      email: normalizedEmail,
      password,
    };

    localStorage.setItem("users", JSON.stringify(users));
    completeAuthAndRedirect(normalizedEmail);
  };

  return (
    <>
      <div className="auth-container auth-overlay">
        <div className="auth-card">
          <button className="close-btn" onClick={onClose}>×</button>
          <h2>{activeTab === "login" ? "Login" : "Sign Up"}</h2>
          <p className="subtitle2">
            {activeTab === "login"
              ? "Enter your credentials to continue"
              : "Create your account to start playing"}
          </p>

          {/* ---------------- LOGIN FORM ---------------- */}
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
            /* ---------------- SIGNUP FORM ---------------- */
            <form onSubmit={handleSignup}>
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

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

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">Sign Up</button>
            </form>
          )}

          {activeTab === "login" ? (
            <p className="auth-switch">
              New here?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("signup");
                }}
              >
                Create an account
              </a>
            </p>
          ) : (
            <p className="auth-switch">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("login");
                }}
              >
                Login
              </a>
            </p>
          )}
        </div>
      </div>

      {showSuccess && <div className="success-box">✅ Login Successful!</div>}
    </>
  );
};

export default LoginPopup;
