"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";

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
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="border-b border-turquoise/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold text-turquoise">
            SHIROA
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tracks" className="text-turquoise font-medium">
              Browse
            </Link>
            <Link href="/login" className="text-brand-white hover:text-turquoise transition-colors">
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-turquoise text-brand-black px-6 py-2 rounded-full font-medium hover:bg-turquoise-soft transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-brand-white mb-2">
            Browse Tracks
          </h1>
          <p className="text-gray-400">Discover exclusive music for your projects</p>
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
        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Loading tracks...</p>
          </div>
        )}

        {/* Tracks Grid */}
        {!loading && filteredTracks.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <Link
                key={track._id}
                href={`/tracks/${track._id}`}
                className="bg-brand-blue/20 border border-turquoise/30 rounded-2xl p-6 hover:border-turquoise transition-all hover:scale-105"
              >
                {/* Cover */}
                <div className="aspect-square bg-gradient-to-br from-turquoise/20 to-brand-blue/40 rounded-xl mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-turquoise/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>

                {/* Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-display font-bold text-brand-white mb-1">
                    {track.title}
                  </h3>
                  <p className="text-gray-400">{track.artist}</p>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-turquoise">
                    ${track.price}
                  </span>
                  {track.status === "sold" || track.isSold ? (
                    <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-medium">
                      Sold
                    </span>
                  ) : (
                    <span className="bg-turquoise/20 text-turquoise px-4 py-1 rounded-full text-sm font-medium">
                      Available
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
            <p className="text-gray-400 text-lg">No tracks found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
