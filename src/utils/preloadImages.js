// --- Import all category images ---
import Action from "../Assets/Action.jpg";
import Match from "../Assets/Match.jpg";
import Mahjong from "../Assets/Mahjong.jpg";
import Mind from "../Assets/Mind.png";
import Classic from "../Assets/Classic.jpg";
import Solitaire from "../Assets/Solitaire.jpg";
import Hidden from "../Assets/Hidden.jpg";
import Card from "../Assets/Card.jpg";
import Board from "../Assets/Board.jpg";
import Racing from "../Assets/Racing.jpg";
import Shooting from "../Assets/Shooting.jpg";
import Golf from "../Assets/Golf.jpg";

// --- Category image map ---
export const categoryImages = {
  mahjong: Mahjong,
  solitaire: Solitaire,
  action: Action,
  "match 3": Match,
  mind: Mind,
  classic: Classic,
  "hidden objects": Hidden,
  card: Card,
  retro: Classic,
  board: Board,
  racing: Racing,
  "shooting & war": Shooting,
  golf: Golf,
  sports: Golf,
  skill: Action,
};

// --- Preload function ---
export const preloadCategoryImages = () => {
  const promises = Object.values(categoryImages).map(
    (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      })
  );

  Promise.all(promises)
    .then(() => console.log("✅ All category images preloaded globally"))
    .catch((err) => console.warn("⚠️ Some category images failed to preload", err));
};
