"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import Loading from "@/components/Loading";

export default function TracksPage() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    filterAndSortTracks();
  }, [tracks, searchQuery, selectedGenre, minPrice, maxPrice, sortBy]);

  const loadTracks = async () => {
    setLoading(true);
    try {
      const data = await api.getTracks();
      setTracks(data);
    } catch (error) {
      console.error("Failed to load tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTracks = () => {
    let filtered = [...tracks];

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      filtered = filtered.filter((t) => t.genre === selectedGenre);
    }

    if (minPrice) {
      filtered = filtered.filter((t) => t.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((t) => t.price <= parseFloat(maxPrice));
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredTracks(filtered);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gaming Style Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a0033] via-[#0d1b2a] to-[#000814] z-[-3]"></div>
      <div className="fixed inset-0 opacity-20 z-[-2]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00CED1 2px, #00CED1 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, #00CED1 2px, #00CED1 4px)',
        backgroundSize: '100px 100px'
      }}></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF00FF] via-[#00CED1] to-[#00FF88] animate-pulse z-50"></div>
      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8 relative">
          <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-[#FF00FF] via-[#00CED1] to-[#00FF88]"></div>
          <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00CED1] to-[#00FF88] mb-2 animate-pulse">
            BROWSE TRACKS
          </h1>
          <p className="text-[#00CED1] font-semibold">⚡ Discover exclusive music for your projects</p>
        </div>

        {/* Search & Filters */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div>
            <FilterPanel
              genre={selectedGenre}
              onGenreChange={setSelectedGenre}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={(min, max) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Tracks Grid */}
        {!loading && filteredTracks.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <Link
                key={track._id}
                href={`/tracks/${track._id}`}
                className="group relative bg-gradient-to-br from-[#1a0033]/80 to-[#0d1b2a]/80 backdrop-blur-sm border-2 border-[#00CED1]/30 rounded-xl p-6 hover:border-[#FF00FF] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF]/0 via-[#FF00FF]/10 to-[#FF00FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {/* Info */}
                <div className="mb-4 relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-[#00CED1] transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>

                    {track.title}
                  </h3>
                  <p className="text-[#00CED1]/70 group-hover:text-[#00CED1] transition-colors">{track.artist}</p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-[#00CED1]/50 mb-4 relative z-10">
                  <span>{track.genre}</span>
                  {track.bpm && (
                    <>
                      <span>•</span>
                      <span>{track.bpm} BPM</span>
                    </>
                  )}
                  {track.key && (
                    <>
                      <span>•</span>
                      <span>{track.key}</span>
                    </>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00CED1] group-hover:from-[#00CED1] group-hover:to-[#00FF88] transition-all">
                    ${track.price}
                  </span>
                  {track.status === "sold" || track.isSold ? (
                    <span className="bg-red-500/30 text-red-400 px-4 py-1 rounded-full text-sm font-bold border border-red-500/50">
                      ❌ SOLD
                    </span>
                  ) : (
                    <span className="bg-[#00FF88]/20 text-[#00FF88] px-4 py-1 rounded-full text-sm font-bold border border-[#00FF88]/50 group-hover:bg-[#00FF88]/30 transition-all">
                      ✓ AVAILABLE
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTracks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#00CED1] text-lg font-bold">⚠️ No tracks found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
