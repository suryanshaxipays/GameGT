import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Checkout.css";
import SideImage from "../Assets/login-side.jpg";
import viewIcon from "../Assets/view.png";
import hideIcon from "../Assets/hide.png";

const Checkout = () => {
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [price, setPrice] = useState(10); // editable price

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
  const stateId = location?.state?.game?.id
    ? parseInt(location.state.game.id, 10)
    : null;
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

  // ===== Input Change Handler with auto-format for expiry =====
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "expiry") {
      // Keep only digits
      let digits = value.replace(/\D/g, "");

      // Limit to 4 digits total (MMYY)
      if (digits.length > 4) digits = digits.slice(0, 4);

      // Auto-insert slash after 2 digits
      let formatted = digits;
      if (digits.length >= 3)
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      else if (digits.length > 2) formatted = digits.slice(0, 2);

      // Ensure slash always stays after MM
      if (formatted.length === 2 && !formatted.includes("/")) formatted += "/";

      setFormData((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      setFormData((prev) => ({ ...prev, cardNumber: cleaned }));
      return;
    }

    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({ ...prev, cvv: cleaned }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== Validation before payment =====
  const validateForm = () => {
    const { firstName, lastName, email, cardNumber, expiry, cvv } = formData;

    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email.");
      return false;
    }

    if (cardNumber.length < 13 || cardNumber.length > 16) {
      alert("Invalid card number.");
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Expiry must be in MM/YY format.");
      return false;
    }

    // Expiry check (not before 09/25)
    const [mm, yy] = expiry.split("/").map((n) => parseInt(n, 10));
    const expiryDate = new Date(2000 + yy, mm);
    const minDate = new Date(2025, 8); // September 2025
    if (expiryDate < minDate) {
      alert("Your card is expired.");
      return false;
    }

    if (cvv.length < 3) {
      alert("Invalid CVV.");
      return false;
    }

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid amount.");
      return false;
    }

    return true;
  };

  // ===== Payment Handler =====
  const handlePayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
          <h2 className="checkout-title">Checkout</h2>
          <p className="subtitle">Unlock all premium games.</p>

          <div className="subscription-box">
            <h3>One-Time Subscription</h3>
            <p
              className="subscription-price"
              contentEditable={!processing}
              suppressContentEditableWarning={true}
              onInput={(e) => {
                let val = e.target.innerText.replace(/[^0-9.]/g, "");
                if (val === "") val = "0";
                if (val >100000) val = "100000"; // prevent blank value from breaking
                setPrice(val);
              }}
              onBlur={(e) => {
                // Reformat neatly when user stops editing
                const num = parseFloat(price);
                e.target.innerText = `$${isNaN(num) ? 0 : num.toFixed(2)} USD`;
              }}
              onFocus={(e) => {
                // Show only raw number while editing
                e.target.innerText = price;
              }}
            >
              ${price}.00 USD
            </p>

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
                disabled={processing}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={processing}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={processing}
            />

            <div className="checkout-row">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                disabled={processing}
              />
            </div>

            <div
              className="checkout-row"
              style={{ display: "flex", gap: "0.6rem" }}
            >
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                disabled={processing}
                style={{ flex: "0 0 40%" }} // expiry narrower
              />

              <div style={{ position: "relative", flex: "0 0 57%" }}>
                {" "}
                {/* cvv wider */}
                <input
                  type={showCVV ? "text" : "password"}
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  disabled={processing}
                  style={{ width: "100%", paddingRight: "35px" }}
                />
                <img
                  src={showCVV ? hideIcon : viewIcon}
                  alt="toggle"
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowCVV(!showCVV)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="checkout-btn"
              disabled={processing}
            >
              {processing ? "Processing..." : `Pay $${price}.00`}
            </button>
          </form>

          <div className="back-link" onClick={() => navigate(-1)}>
            ← Go Back
          </div>
        </div>

        {showSuccess && (
          <div className="success-box">
            Payment Successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
