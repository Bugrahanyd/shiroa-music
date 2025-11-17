"use client";

import { useState, useEffect, useRef } from "react";

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  type: "track" | "artist" | "genre";
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchAutocomplete({ value, onChange }: SearchAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockSuggestions: SearchResult[] = [
    { id: "1", title: "Midnight Dreams", artist: "Luna Wave", type: "track" },
    { id: "2", title: "Urban Pulse", artist: "City Beats", type: "track" },
    { id: "3", title: "Luna Wave", artist: "", type: "artist" },
    { id: "4", title: "Electronic", artist: "", type: "genre" }
  ];

  useEffect(() => {
    if (value.length > 1) {
      const filtered = mockSuggestions.filter(
        s => s.title.toLowerCase().includes(value.toLowerCase()) ||
             s.artist.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setIsOpen(false);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onChange(suggestions[selectedIndex].title);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const typeIcons = {
    track: "🎵",
    artist: "👤",
    genre: "🎸"
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search tracks, artists, genres..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00CED1] transition-all"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => {
                onChange(suggestion.title);
                setIsOpen(false);
              }}
              className={`w-full px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-all ${
                index === selectedIndex ? "bg-white/10" : ""
              }`}
            >
              <span className="text-2xl">{typeIcons[suggestion.type]}</span>
              <div className="flex-1 text-left">
                <p className="text-white font-semibold">{suggestion.title}</p>
                {suggestion.artist && (
                  <p className="text-white/60 text-sm">{suggestion.artist}</p>
                )}
              </div>
              <span className="text-white/40 text-xs uppercase">{suggestion.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
