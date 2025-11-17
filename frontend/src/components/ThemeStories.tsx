"use client";

import { useState, useEffect } from "react";
import { useTheme, Theme } from "@/lib/theme-context";

const themeStories = [
  {
    id: "dark" as Theme,
    name: "Midnight Ocean",
    icon: "🌊",
    story: "Dive into the depths of creativity with our signature ocean-inspired theme. Perfect for late-night sessions.",
    colors: "from-[#0a1628] to-[#1a2f4a]"
  },
  {
    id: "warm" as Theme,
    name: "Sunset Boulevard",
    icon: "🌅",
    story: "Feel the warmth of golden hour. Ideal for soulful compositions and mellow vibes.",
    colors: "from-[#2d1b1b] to-[#4a2c2c]"
  },
  {
    id: "cool" as Theme,
    name: "Arctic Aurora",
    icon: "❄️",
    story: "Crystal clear focus with cool tones. Your workspace for precision and clarity.",
    colors: "from-[#1a2332] to-[#2d3f5a]"
  },
  {
    id: "neon" as Theme,
    name: "Tokyo Nights",
    icon: "🌃",
    story: "Electric energy meets urban aesthetics. For the bold and the experimental.",
    colors: "from-[#1a0033] to-[#330066]"
  },
  {
    id: "classic" as Theme,
    name: "Timeless Elegance",
    icon: "⚫",
    story: "Pure, minimal, timeless. Let your music speak without distraction.",
    colors: "from-[#0a0a0a] to-[#1a1a1a]"
  },
  {
    id: "sakura" as Theme,
    name: "Sakura Dreams",
    icon: "🌸",
    story: "Soft and serene like cherry blossoms. Create beauty in every note.",
    colors: "from-[#2d1b2e] to-[#4a2f4d]"
  }
];

interface ThemeStoriesProps {
  onComplete: () => void;
}

export default function ThemeStories({ onComplete }: ThemeStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setTheme } = useTheme();
  const current = themeStories[currentIndex];

  const handleNext = () => {
    if (currentIndex < themeStories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelect = () => {
    setTheme(current.id);
    onComplete();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Enter") handleSelect();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / themeStories.length) * 100}%` }}
        />
      </div>

      {/* Story Content */}
      <div className="relative w-full max-w-md mx-4">
        <div className={`bg-gradient-to-br ${current.colors} rounded-3xl p-12 text-center shadow-2xl border border-white/20`}>
          <div className="text-8xl mb-6">{current.icon}</div>
          <h2 className="text-4xl font-display font-black text-white mb-4">{current.name}</h2>
          <p className="text-white/80 text-lg mb-8">{current.story}</p>
          
          <button
            onClick={handleSelect}
            className="w-full bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all mb-4"
          >
            Choose This Theme
          </button>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            <div className="text-white/60 text-sm">
              {currentIndex + 1} / {themeStories.length}
            </div>
            <button
              onClick={handleNext}
              disabled={currentIndex === themeStories.length - 1}
              className="text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
