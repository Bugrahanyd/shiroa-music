"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { api } from "@/lib/api";
import TrackCard from "@/components/TrackCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function TracksPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [tracks, setTracks] = useState<any[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const genres = ["all", "Electronic", "Hip Hop", "Rock", "Pop", "Jazz", "Trap", "Ambient", "Synthwave", "Acoustic"];

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    filterTracks();
  }, [tracks, searchQuery, selectedGenre, sortBy]);

  const loadTracks = async () => {
    setLoading(true);
    try {
      const data = await api.getTracks();
      setTracks(data);
    } catch (error) {
      // Fallback demo tracks
      setTracks([
        { _id: "1", title: "Summer Vibes", artist: "DJ Producer", genre: "electronic", price: 299, bpm: 128, key: "C Major", status: "available", createdAt: new Date() },
        { _id: "2", title: "Dark Trap Beat", artist: "Beat Maker", genre: "trap", price: 199, bpm: 140, key: "A Minor", status: "available", createdAt: new Date() },
        { _id: "3", title: "Chill Lo-Fi", artist: "Lo-Fi Master", genre: "hip-hop", price: 149, bpm: 85, key: "G Major", status: "available", createdAt: new Date() },
        { _id: "4", title: "Rock Anthem", artist: "Rock Star", genre: "rock", price: 399, bpm: 120, key: "E Major", status: "sold", createdAt: new Date() },
        { _id: "5", title: "Pop Sensation", artist: "Pop Star", genre: "pop", price: 249, bpm: 110, key: "D Major", status: "available", createdAt: new Date() },
        { _id: "6", title: "Jazz Fusion", artist: "Jazz Master", genre: "jazz", price: 349, bpm: 95, key: "F Major", status: "available", createdAt: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterTracks = () => {
    let filtered = [...tracks];

    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(t => t.genre?.toLowerCase() === selectedGenre.toLowerCase());
    }

    filtered.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredTracks(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold theme-text mb-4 font-orbitron">
          Exclusive Tracks
        </h1>
        <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
          Discover high-quality music with full commercial rights
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, artists..."
            className="w-full pl-12 pr-4 py-4 theme-card rounded-2xl theme-text focus:outline-none focus:ring-2 transition-all text-lg"
            style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
          />
        </div>

        {/* Genre Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedGenre === genre ? "theme-button" : "theme-button-outline"
              }`}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between">
          <p className="theme-text-secondary">
            {filteredTracks.length} tracks found
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 theme-card rounded-lg theme-text focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Tracks Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="theme-card rounded-2xl p-6 animate-pulse">
              <div className="h-32 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredTracks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map(track => (
            <TrackCard key={track._id} track={track} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="theme-text-secondary text-lg">No tracks found</p>
        </div>
      )}

      {/* CTA for non-users */}
      {!user && (
        <div className="mt-16 text-center theme-card rounded-3xl p-12">
          <h3 className="text-3xl font-bold theme-text mb-4 font-orbitron">
            Want Full Access?
          </h3>
          <p className="theme-text-secondary mb-8 max-w-xl mx-auto">
            Sign up to unlock all tracks, save favorites, and get exclusive deals
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="theme-button px-8 py-3 rounded-full font-semibold">
              Sign Up Free
            </Link>
            <Link href="/login" className="theme-button-outline px-8 py-3 rounded-full font-semibold">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
