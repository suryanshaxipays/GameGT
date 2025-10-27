import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/GameCard.css";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gamecard"
      onClick={() => navigate(`/gameplay/${game.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <img src={game.thumbnail} alt={game.title} className="gamecard-img" />

      {/* Hover Preview */}
      {hovered && game.youtubePreview && (
        <div className="gamecard-preview">
          <iframe
            src={game.youtubePreview}
            title={game.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Title */}
      <h3 className="gamecard-title">{game.title}</h3>
    </div>
  );
};

export default GameCard;

/*Landing Page
- Home Page
- - Inc Contrast and Brightness
- - Add Eclipse
- - Add Tournament Card
- - take Pink and Orange from old Website 
- Category section - make it better
- Change Contetnt

Gameview Page
- Card
- - Add 3D effect on Hover 
- - Increase the Brightness and Contrast
- - Dont waste card space on heading andd black shadow at bottom and use that to show game name 
- More Section
- - Top 5 like Time Pass
- - Potrait Long Cards
- Section Heading  need to be changed 

Category Page 
- add a back dark div to tackle banner delay 

Game play page
- Checkout page 
- Session Handling with test Id and Pass*/