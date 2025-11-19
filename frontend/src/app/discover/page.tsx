"use client";

import { useState } from "react";
import TrackCard from "@/components/TrackCard";

export default function DiscoverPage() {
  const [selectedGenre, setSelectedGenre] = useState("all");

  const genres = ["all", "electronic", "hip-hop", "rock", "pop", "jazz", "trap"];
  
  const tracks = [
    { _id: "1", title: "Summer Vibes", artist: "DJ Producer", genre: "electronic", price: 299, bpm: 128, key: "C Major", status: "available" },
    { _id: "2", title: "Dark Trap Beat", artist: "Beat Maker", genre: "trap", price: 199, bpm: 140, key: "A Minor", status: "available" },
    { _id: "3", title: "Chill Lo-Fi", artist: "Lo-Fi Master", genre: "hip-hop", price: 149, bpm: 85, key: "G Major", status: "available" },
    { _id: "4", title: "Rock Anthem", artist: "Rock Star", genre: "rock", price: 399, bpm: 120, key: "E Major", status: "sold" },
  ];

  const filteredTracks = selectedGenre === "all" 
    ? tracks 
    : tracks.filter(t => t.genre === selectedGenre);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold theme-text mb-8">Discover Music</h1>
      
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
              selectedGenre === genre ? "theme-button" : "theme-button-outline"
            }`}
          >
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map(track => (
          <TrackCard key={track._id} track={track} />
        ))}
      </div>
    </div>
  );
}
