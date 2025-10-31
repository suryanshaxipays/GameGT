import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Gameplay from "./Pages/Gameplay";
import Gameview from "./Pages/Gameview";
import Gamecategory from "./Pages/Gamecategory";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Checkout from "./Components/Checkout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameplay/:id" element={<Gameplay />} />
        <Route path="/gameview" element={<Gameview />} />
        <Route path="/category/:categoryName" element={<Gamecategory />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
