import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import GameCard from "../Components/GameCard";
import { games } from "../data/games";
import Bg from "../Assets/Gameview/bg.png";
import "../Styles/Gameview.css";
import Ellipse from "../Assets/Ellipse.png";
import VipIcon from "../Assets/vip.png"; // ✅ VIP badge
import Footer2 from "../Components/Footer";

// import category images
import Bc1 from "../Assets/Categories/Bc1.png";
import Bc2 from "../Assets/Categories/Bc2.png";
import Sc1 from "../Assets/Categories/Sc11.jpg";
import Sc2 from "../Assets/Categories/Sc2.png";
import Sc3 from "../Assets/Categories/Sc3.jpg";
import Sc4 from "../Assets/Categories/Sc4.jpg";

// ✅ Hero Banner
const HeroBanner = () => (
  <div className="hero2-banner2">
    <img src={Bg} alt="Game Banner" className="hero2-bg2" />
    <div className="hero2-backdrop" />
    <div className="hero2-overlay">
      <h1>Game Tourer!</h1>
      <p>
        Play & Earn <span>1500</span> points 
      </p>
    </div>
  </div>
);

// ✅ Trending Categories
const TrendingCategories = () => {
  const navigate = useNavigate();

  const selectedGames = [
    { img: Bc1, genre: "Action" },
    { img: Sc1, genre: "Racing" },
    { img: Sc2, genre: "Mahjong" },
    { img: Sc3, genre: "Mind" },
    { img: Sc4, genre: "Classic Games" },
    { img: Bc2, genre: "Solitaire" },
  ];

  const handleClick = (genre) => {
    navigate(`/category/${encodeURIComponent(genre)}`);
  };

  return (
    <section className="game2-section trending-categories">
      <div className="section2-header2">
        <h2>Trending Categories</h2>
      </div>

      <div className="trending-category-grid">
        {selectedGames.map((cat, i) => (
          <div
            key={i}
            className="trending-card"
            onClick={() => handleClick(cat.genre)}
          >
            <img src={cat.img} alt={cat.genre} />
            <div className="trending-overlay">
              <span>{cat.genre}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ✅ Game Section (uses GameCard for consistency)
const GameSection = ({ title, games = [], defaultLimit = 5 }) => {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? games : games.slice(0, defaultLimit);

  return (
    <section className="game2-section">
      <div className="section2-header2">
        <h2>{title}</h2>
        {games.length > defaultLimit && (
          <span className="view-all" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : "View All"}
          </span>
        )}
      </div>

      <div className="game2-grid">
        {displayed.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </section>
  );
};

export default function Gameview() {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const filteredGames = useMemo(
    () =>
      games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const handleGameClick = (g) => {
    const isFree = g.id % 3 === 0;
    const isLoggedIn =
      localStorage.getItem("isLoggedIn") === "true" ||
      JSON.parse(localStorage.getItem("userAuth") || "{}")?.loggedIn;
    const hasPaid = localStorage.getItem("hasPaidAccess") === "true";

    if (!isFree) {
      if (!isLoggedIn) {
        localStorage.setItem(
          "postAuthRedirect",
          JSON.stringify({ action: "checkout", gameId: g.id, path: window.location.pathname + window.location.search })
        );
        window.dispatchEvent(new Event("openLogin"));
        return;
      }
      if (!hasPaid) {
        navigate("/checkout", { state: { game: g } });
        return;
      }
    }
    navigate(`/gameplay/${g.id}`);
  };

  const categories = useMemo(() => {
    const uniqueGenres = [...new Set(games.map((g) => g.genre))];
    return uniqueGenres.sort();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amt = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amt : amt,
      behavior: "smooth",
    });
  };

  // Mouse drag for category scroll
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const onMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };
  const stopDragging = () => (isDragging.current = false);
  const onMouseMove = (e) => {
    if (!isDragging.current || isMobile) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current)
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="gameview-container fullwidth">
      <Navbar />
      <img src={Ellipse} alt="background" className="e1" />

      <main className="main2-content">
        {/* CATEGORY SCROLL */}
        <div
          className={`category-scroll-container ${
            isMobile ? "mobile-view" : ""
          }`}
        >
          <h2 className="category-scroll-heading">Game Categories:</h2>

          {!isMobile && (
            <button className="arrow-btn left" onClick={() => scroll("left")}>
              &#10094;
            </button>
          )}

          <div
            className="category-scroll-inline"
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={onMouseMove}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="category-scroll-btn"
                onClick={() => navigate(`/category/${cat}`)}
              >
                {cat}
              </button>
            ))}
          </div>

          {!isMobile && (
            <button className="arrow-btn right" onClick={() => scroll("right")}>
              &#10095;
            </button>
          )}
        </div>

        {/* HERO */}
        <HeroBanner />

        {/* FEATURED GAMES */}
        <section className="game2-section">
          <div className="section2-header2">
            <h2>Featured Games</h2>
          </div>
          <div className="featured-grid">
            {filteredGames.slice(40, 56).map((g) => {
              const isFree = g.id % 3 === 0;
              return (
                <div
                  key={g.id}
                  className="featured-item"
                  onClick={() => handleGameClick(g)}
                >
                  <img src={g.image} alt={g.title}  className="gameimage"/>
                  {!isFree && <img src={VipIcon} alt="VIP" className="vip-badge" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* TRENDING CATEGORIES */}
        <TrendingCategories />

        {/* TRENDING GAMES */}
        <section className="game2-section">
          <div className="section2-header2">
            <h2>Trending Games</h2>
          </div>
          <div className="featured-grid">
            {filteredGames.slice(80, 96).map((g) => {
              const isFree = g.id % 3 === 0;
              return (
                <div
                  key={g.id}
                  className="featured-item"
                  onClick={() => handleGameClick(g)}
                >
                  <img src={g.image} alt={g.title} className="gameimage"/>
                  {!isFree && <img src={VipIcon} alt="VIP" className="vip-badge" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* GAME SECTIONS */}
        <GameSection title="Recently Played" games={filteredGames.slice(20, 32)} />
        <GameSection title="Action Games" games={filteredGames.slice(32, 48)} />
        <GameSection title="War Games" games={filteredGames.slice(96, 112)} />
        <GameSection title="Board Games" games={filteredGames.slice(64, 80)} />
        <GameSection title="Racing Games" games={filteredGames.slice(80, 96)} />
        <GameSection title="Golf Games" games={filteredGames.slice(88, 98)} />
        <GameSection title="Sports Games" games={filteredGames.slice(99, 107)} />
      </main>

      <Footer2 />
    </div>
  );
}
