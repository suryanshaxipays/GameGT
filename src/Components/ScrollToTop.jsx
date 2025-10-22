// src/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const container = document.querySelector(".App");
    if (container) {
      container.scrollTo({ top: 0, behavior: "auto" }); // use "smooth" for animation
    }
  }, [pathname]);

  return null;
}
