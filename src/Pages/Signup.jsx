import { Link } from "react-router-dom";
import "../Styles/Auth.css";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup submitted");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
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

        <div className="auth-divider">or</div>

        <button className="google-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
          Sign up with Google
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
