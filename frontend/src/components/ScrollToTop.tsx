"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white w-12 h-12 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
