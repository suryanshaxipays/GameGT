import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const game = location.state?.game || {
    title: "Unknown Game",
    image: "https://via.placeholder.com/300x180?text=Game+Image",
    price: "$9.99",
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    alert("✅ Purchase Successful!");
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-game">
          <img src={game.image} alt={game.title} className="checkout-img" />
          <div className="checkout-info">
            <h2>{game.title}</h2>
            <p className="checkout-price">{game.price}</p>
          </div>
        </div>

        <form className="checkout-form" onSubmit={handleConfirm}>
          <h3>Player Details</h3>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />

          <h3>Payment Info</h3>
          <input type="text" placeholder="Card Number" required />
          <div className="checkout-row">
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVV" required />
          </div>

          <button type="submit" className="checkout-btn">
            Confirm Purchase
          </button>
          <p className="back-link" onClick={() => navigate(-1)}>
            ← Back to Store
          </p>
        </form>
      </div>
    </div>
  );
}
