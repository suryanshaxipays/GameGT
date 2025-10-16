import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar2 from "../Components/Navbar2";
import Sidebar from "../Components/Sidebar";
import { games } from "../data/games";
import "../Styles/Gameplay.css";

const Gameplay = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const game = games.find((g) => g.id === parseInt(id));

  if (!game) return <p>Game not found</p>;

  return (
    <div className="gameplay-container">
      <Navbar2 onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-layout"> {/* match Gameview structure */}
        <Sidebar isOpen={isSidebarOpen} />
        <main className="gameplay-main">
          <h1 className="gameplay-title">{game.title}</h1>
          <div className="gameplay-frame">
            <iframe
              src={game.embedLink}
              title={game.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="game-details">
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Year:</strong> {game.year}</p>
            <p><strong>Rating:</strong> {game.rating}</p>
            <p><strong>Price:</strong> {game.isFree ? "Free" : `$${game.price}`}</p>
            <p><strong>Publisher:</strong> {game.publisher}</p>
            <p><strong>Platform:</strong> {game.platform}</p>
            <p><strong>Players:</strong> {game.players}</p>
            <p><strong>Online:</strong> {game.isOnline ? "Yes" : "No"}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gameplay;
