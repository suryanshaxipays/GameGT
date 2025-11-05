import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Checkout.css";
import SideImage from "../Assets/login-side.jpg"; 

const Checkout = () => {
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currency: "USD",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const paramId = params?.id ? parseInt(params.id, 10) : null;
  const stateId = location?.state?.game?.id ? parseInt(location.state.game.id, 10) : null;
  const gameId = paramId || stateId || null;

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      JSON.parse(localStorage.getItem("userAuth") || "{}")?.loggedIn;

    if (!isLoggedIn) {
      localStorage.setItem("loginPrompt", "true");
      navigate("/");
      return;
    }

    const hasPaid = localStorage.getItem("hasPaidAccess") === "true";
    if (hasPaid) {
      if (gameId) navigate(`/gameplay/${gameId}`);
      else navigate("/");
    }
  }, [navigate, gameId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setShowSuccess(true);
      localStorage.setItem("hasPaidAccess", "true");
      setTimeout(() => {
        if (gameId) navigate(`/gameplay/${gameId}`);
        else navigate("/");
      }, 2500);
    }, 3000);
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-image-section">
        <img
          src={SideImage}
          alt="Checkout Visual"
          className="checkout-side-image"
        />
      </div>

      <div className="checkout-content">
        <div className="checkout-card">
          <h2 className="checkout-title">Subscription Checkout</h2>
          <p className="subtitle">
            Unlock all premium games with a one-time payment.
          </p>

          <div className="subscription-box">
            <h3>One-Time Subscription</h3>
            <p className="subscription-price">$10.00 USD</p>
            <p className="subscription-note">
              Lifetime access to all premium content.
            </p>
          </div>

          <form onSubmit={handlePayment} className="checkout-form">
            <div className="checkout-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={processing}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={processing}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={processing}
            />

            <div className="checkout-row">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                disabled={processing}
              />
            </div>

            <div className="checkout-row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
                disabled={processing}
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
                disabled={processing}
              />
            </div>

            <button type="submit" className="checkout-btn" disabled={processing}>
              {processing ? "Processing..." : "Pay $10.00"}
            </button>
          </form>

          <div className="back-link" onClick={() => navigate(-1)}>
            ← Go Back
          </div>
        </div>

        {showSuccess && (
          <div className="success-box">
            ✅ Payment Successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
