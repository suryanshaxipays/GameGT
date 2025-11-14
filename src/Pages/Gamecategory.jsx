  import { useParams, useNavigate } from "react-router-dom";
  import { useMemo, useState, useRef, useEffect } from "react";
  import Navbar from "../Components/Navbar";
  import GameCard from "../Components/GameCard";
  import { games } from "../data/games";
  import Footer2 from "../Components/Footer";

  import { categoryImages } from "../utils/preloadImages";
  import "../Styles/Gamecategory.css";

  const CategoryBanner = ({ categoryName }) => {
    const key = categoryName?.toLowerCase();
    const src = categoryImages[key];

    return (
      <div className="hero2-banner3">
        {src ? (
          <img
            key={key}
            src={src}
            alt={categoryName}
            className="hero2-bg3 visible"
            loading="eager"
            decoding="sync"
          />
        ) : (
          <div className="hero2-fallback-fast">{categoryName}</div>
        )}

        <div className="hero2-overlay">
          <h1>{categoryName}</h1>
          <p>Enjoy the best {categoryName} games</p>
        </div>
      </div>
    );
  };

  const Gamecategory = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [isViewAll, setIsViewAll] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const categoryGames = useMemo(
      () => games.filter((g) => g.genre.toLowerCase() === categoryName.toLowerCase()),
      [categoryName]
    );

    const categories = useMemo(() => {
      const uniqueGenres = [...new Set(games.map((g) => g.genre))];
      return uniqueGenres.sort();
    }, []);

    // Detect mobile
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Scroll control
    const scroll = (direction) => {
      if (!scrollRef.current) return;
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    };

    // Drag-scroll for desktop
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const onMouseDown = (e) => {
      if (isMobile) return;
      isDragging.current = true;
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    };
    const onMouseLeave = () => (isDragging.current = false);
    const onMouseUp = () => (isDragging.current = false);
    const onMouseMove = (e) => {
      if (!isDragging.current || isMobile) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
      <div className="gameview-container fullwidth">
        <Navbar />

        <main className="main2-content">
          {/* Category scroll bar */}
          <div className={`category-scroll-container ${isMobile ? "mobile-view" : ""}`}>
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
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-scroll-btn ${
                    cat.toLowerCase() === categoryName.toLowerCase() ? "active" : ""
                  }`}
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

          {/* Banner */}
          <CategoryBanner categoryName={categoryName} />

          {/* Game Grid */}
          <section className="game2-section">
            <div className="section2-header">
              <h2 className="gameheading">{categoryName} Games</h2>
              {categoryGames.length > 5 && (
                <span className="view-all" onClick={() => setIsViewAll(!isViewAll)}>
                  {isViewAll ? "Show Less" : "View All"}
                </span>
              )}
            </div>

            <div className="game2-grid">
              {(isViewAll ? categoryGames : categoryGames.slice(0, 5)).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
              {categoryGames.length === 0 && (
                <p className="no-games">No games found in this category.</p>
              )}
            </div>
          </section>
        </main>

        <Footer2 />
      </div>
    );
  };

  export default Gamecategory;
