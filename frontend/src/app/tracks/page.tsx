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
      if (data && data.length > 0) {
        setTracks(data);
      } else {
        throw new Error('No tracks from API');
      }
    } catch (error) {
      // Demo tracks with working audio
      const demoTracks = [
        {
          _id: 'demo1',
          title: 'Neon Dreams',
          artist: 'Hydrabon AI',
          genre: 'Electronic',
          price: 299,
          bpm: 128,
          key: 'C Minor',
          status: 'available',
          coverUrl: 'https://via.placeholder.com/400x400/5F259F/00CED1?text=Neon+Dreams',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          createdAt: new Date(),
          favoriteCount: 42
        },
        {
          _id: 'demo2',
          title: 'Sakura Flow',
          artist: 'SHIROA',
          genre: 'Ambient',
          price: 249,
          bpm: 90,
          key: 'D Major',
          status: 'available',
          coverUrl: 'https://via.placeholder.com/400x400/FFB7C5/FF69B4?text=Sakura+Flow',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          createdAt: new Date(),
          favoriteCount: 38
        },
        {
          _id: 'demo3',
          title: 'Cyber Pulse',
          artist: 'Digital Dreams',
          genre: 'Synthwave',
          price: 349,
          bpm: 140,
          key: 'A Minor',
          status: 'available',
          coverUrl: 'https://via.placeholder.com/400x400/00CED1/FF00FF?text=Cyber+Pulse',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          createdAt: new Date(),
          favoriteCount: 56
        },
        {
          _id: 'demo4',
          title: 'Sunset Boulevard',
          artist: 'LA Vibes',
          genre: 'Pop',
          price: 199,
          bpm: 115,
          key: 'G Major',
          status: 'sold',
          coverUrl: 'https://via.placeholder.com/400x400/FF6B35/FFA500?text=Sunset+Blvd',
          audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
          createdAt: new Date(),
          favoriteCount: 67
        },
      ];
      
      // Add test tracks for filtering
      const genres = ["Electronic", "Hip Hop", "Rock", "Pop", "Jazz", "Trap", "Ambient", "Synthwave", "Acoustic"];
      let counter = 1;
      
      genres.forEach(genre => {
        for (let i = 0; i < 3; i++) {
          demoTracks.push({
            _id: `test${String(counter).padStart(4, '0')}`,
            title: `test${String(counter).padStart(4, '0')}`,
            artist: "Test Artist",
            genre: genre,
            price: Math.floor(Math.random() * 300) + 100,
            bpm: Math.floor(Math.random() * 60) + 80,
            key: ["C", "D", "E", "F", "G", "A", "B"][Math.floor(Math.random() * 7)] + " Major",
            status: "available",
            coverUrl: `https://via.placeholder.com/400x400/1a1a1a/00CED1?text=${genre}`,
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            createdAt: new Date(),
            favoriteCount: Math.floor(Math.random() * 50)
          });
          counter++;
        }
      });
      
      setTracks(demoTracks);
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
      <div className="mb-8 theme-card rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="theme-icon" size={24} />
          <h2 className="text-xl font-bold theme-text">Search & Filter</h2>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 theme-text-secondary" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracks, artists..."
            className="w-full pl-12 pr-4 py-3 theme-bg-secondary rounded-xl theme-text focus:outline-none focus:ring-2 transition-all"
            style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
          />
        </div>

        {/* Genre Filter */}
        <div className="mb-4">
          <p className="text-sm theme-text-secondary mb-2">Genre</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm ${
                  selectedGenre === genre ? "theme-button" : "theme-button-outline"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Sort & Results */}
        <div className="flex items-center justify-between">
          <p className="theme-text-secondary text-sm">
            {filteredTracks.length} tracks found
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 theme-bg-secondary rounded-lg theme-text focus:outline-none text-sm"
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
