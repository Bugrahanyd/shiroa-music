"use client";

import { useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";

interface FilterPanelProps {
  genre: string;
  onGenreChange: (genre: string) => void;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (min: string, max: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterPanel({
  genre,
  onGenreChange,
  minPrice,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange
}: FilterPanelProps) {
  const genres = ["All", "Electronic", "Hip-Hop", "Pop", "Rock", "Jazz", "Classical", "Ambient"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* Mobile Filter Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold flex items-center justify-between hover:bg-white/10 transition-all"
    >
      <span>Filters & Sort</span>
      <span>{isOpen ? "✕" : "☰"}</span>
    </button>

    {/* Filter Panel */}
    <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-zinc-300 mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="genre"
                checked={genre === g}
                onChange={() => onGenreChange(g)}
                className="w-4 h-4 text-[#00CED1] focus:ring-[#00CED1]"
              />
              <span className="text-zinc-400 hover:text-white">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <PriceRangeSlider
          min={0}
          max={500}
          value={[Number(minPrice) || 0, Number(maxPrice) || 500]}
          onChange={([min, max]) => onPriceChange(String(min), String(max))}
        />
      </div>

      <div>
        <h3 className="text-sm font-bold text-zinc-300 mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:border-[#00CED1] focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
    </div>
    </>
  );
}
