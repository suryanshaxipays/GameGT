import "../Styles/Categories.css";

const Categories = () => {
  const selectedGames = [
    {
      id: 1,
      title: "Free Aliens",
      genre: "Mahjong",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/freealiens300200.webp",
    },
    {
      id: 11,
      title: "Red and Green 2",
      genre: "Action",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/redandgreen2300200.webp",
    },
    {
      id: 16,
      title: "Bubble Shooter",
      genre: "Match 3",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/bubble_shooter300200.webp",
    },
    {
      id: 21,
      title: "Find the Odd One Out",
      genre: "Mind / Puzzle",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/findtheoddout300200.webp",
    },
    {
      id: 26,
      title: "One Line",
      genre: "Classic Games",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/oneline300200.webp",
    },
    {
      id: 6,
      title: "Yukon Freecell",
      genre: "Solitaire",
      thumbnail:
        "https://www.htmlgames.com/uploaded/game/thumb/yukonfreecell300200.webp",
    },
  ];

  return (
    <div className="categories-container">
      <h2 className="categories-title">Choose Your Arena</h2>

      <div className="categories-layout">
        {/* Left Column */}
        <div className="categories-column">
          <div className="categories-card big">
            <img
              src={selectedGames[0].thumbnail}
              alt={selectedGames[0].genre}
            />
            <div className="categories-genre">{selectedGames[0].genre}</div>
          </div>

          <div className="categories-row">
            <div className="categories-card small">
              <img
                src={selectedGames[1].thumbnail}
                alt={selectedGames[1].genre}
              />
              <div className="categories-genre">{selectedGames[1].genre}</div>
            </div>

            <div className="categories-card small">
              <img
                src={selectedGames[2].thumbnail}
                alt={selectedGames[2].genre}
              />
              <div className="categories-genre">{selectedGames[2].genre}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="categories-column">
          <div className="categories-row">
            <div className="categories-card small">
              <img
                src={selectedGames[3].thumbnail}
                alt={selectedGames[3].genre}
              />
              <div className="categories-genre">{selectedGames[3].genre}</div>
            </div>

            <div className="categories-card small">
              <img
                src={selectedGames[4].thumbnail}
                alt={selectedGames[4].genre}
              />
              <div className="categories-genre">{selectedGames[4].genre}</div>
            </div>
          </div>

          <div className="categories-card big">
            <img
              src={selectedGames[5].thumbnail}
              alt={selectedGames[5].genre}
            />
            <div className="categories-genre">{selectedGames[5].genre}</div>
          </div>
        </div>
      </div>

      {/* Arrows & Progress */}
      <div className="categories-controls">
        <div className="arrow-group">
          <button className="arrow-btn">←</button>
          <button className="arrow-btn">→</button>
        </div>

        <div className="progress-bars">
          <span className="bar active"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default Categories;
