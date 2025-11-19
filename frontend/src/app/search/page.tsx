"use client";

import { useState } from "react";
import TrackCard from "@/components/TrackCard";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const allTracks = [
    { _id: "1", title: "Summer Vibes", artist: "DJ Producer", genre: "electronic", price: 299, bpm: 128, key: "C Major", status: "available" },
    { _id: "2", title: "Dark Trap Beat", artist: "Beat Maker", genre: "trap", price: 199, bpm: 140, key: "A Minor", status: "available" },
    { _id: "3", title: "Chill Lo-Fi", artist: "Lo-Fi Master", genre: "hip-hop", price: 149, bpm: 85, key: "G Major", status: "available" },
    { _id: "4", title: "Rock Anthem", artist: "Rock Star", genre: "rock", price: 399, bpm: 120, key: "E Major", status: "sold" },
    { _id: "5", title: "Pop Sensation", artist: "Pop Star", genre: "pop", price: 249, bpm: 110, key: "D Major", status: "available" },
  ];

  const filteredTracks = query
    ? allTracks.filter(t => 
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase()) ||
        t.genre.toLowerCase().includes(query.toLowerCase())
      )
    : allTracks;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold theme-text mb-8">Search Tracks</h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, artist, or genre..."
          className="w-full pl-12 pr-4 py-3 theme-card rounded-lg theme-text focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.length > 0 ? (
          filteredTracks.map(track => (
            <TrackCard key={track._id} track={track} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="theme-text-secondary text-lg">No tracks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
