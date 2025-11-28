"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Filter, X, ChevronDown } from "lucide-react";

interface FilterPanelProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterPanel({
  selectedGenre,
  onGenreChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange
}: FilterPanelProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const genres = [
    { id: 'all', label: language === 'tr' ? 'Tümü' : 'All' },
    { id: 'Hip Hop', label: 'Hip Hop' },
    { id: 'Electronic', label: 'Electronic' },
    { id: 'Jazz', label: 'Jazz' },
    { id: 'Rock', label: 'Rock' },
    { id: 'Pop', label: 'Pop' }
  ];

  const sortOptions = [
    { id: 'newest', label: language === 'tr' ? 'En Yeni' : 'Newest' },
    { id: 'price-low', label: language === 'tr' ? 'Fiyat: Düşük-Yüksek' : 'Price: Low-High' },
    { id: 'price-high', label: language === 'tr' ? 'Fiyat: Yüksek-Düşük' : 'Price: High-Low' },
    { id: 'title', label: language === 'tr' ? 'Alfabetik' : 'Alphabetical' }
  ];

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 theme-card rounded-xl hover:scale-105 transition-all"
      >
        <div className="flex items-center gap-3">
          <Filter size={20} className="theme-icon" />
          <span className="theme-text font-semibold">
            {language === 'tr' ? 'Filtreler' : 'Filters'}
          </span>
        </div>
        {isOpen ? <X size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block space-y-6`}>
        
        {/* Genre Filter */}
        <div className="theme-card rounded-2xl p-6">
          <h3 className="text-lg font-bold theme-text mb-4 font-orbitron">
            {language === 'tr' ? 'Tür' : 'Genre'}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => onGenreChange(genre.id)}
                className={`p-3 rounded-xl text-left transition-all hover:scale-105 ${
                  selectedGenre === genre.id
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'theme-hover theme-text'
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="theme-card rounded-2xl p-6">
          <h3 className="text-lg font-bold theme-text mb-4 font-orbitron">
            {language === 'tr' ? 'Fiyat Aralığı' : 'Price Range'}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm theme-text-secondary">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs theme-text-secondary block mb-1">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 theme-bg-secondary rounded-lg theme-text text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-xs theme-text-secondary block mb-1">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 100])}
                  className="w-full px-3 py-2 theme-bg-secondary rounded-lg theme-text text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="theme-card rounded-2xl p-6">
          <h3 className="text-lg font-bold theme-text mb-4 font-orbitron">
            {language === 'tr' ? 'Sıralama' : 'Sort By'}
          </h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id)}
                className={`w-full p-3 rounded-xl text-left transition-all hover:scale-105 ${
                  sortBy === option.id
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'theme-hover theme-text'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => {
            onGenreChange('all');
            onPriceRangeChange([0, 100]);
            onSortChange('newest');
          }}
          className="w-full p-3 theme-bg-secondary theme-text rounded-xl hover:scale-105 transition-all font-semibold"
        >
          {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </>
  );
}
