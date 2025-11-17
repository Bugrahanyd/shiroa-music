"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import SkeletonCard from "@/components/SkeletonCard";
import ScrollToTop from "@/components/ScrollToTop";
import TrackCard from "@/components/TrackCard";

export default function TracksPage() {
  const { user } = useAuth();
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

    // Limit to 6 tracks for non-authenticated users
    if (!user) {
      filtered = filtered.slice(0, 6);
    }

    setFilteredTracks(filtered);
  };

  return (
    <>
    <ScrollToTop />
    <div className="min-h-screen relative overflow-hidden">

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8 relative">
          <h1 className="text-5xl font-display font-black text-white mb-2">
            Browse Tracks
          </h1>
          <p className="text-white/60">Discover exclusive music for your projects</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-4">
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
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Tracks Grid */}
        {!loading && filteredTracks.length > 0 && (
          <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>

          {/* Login Prompt for Non-Authenticated Users */}
          {!user && tracks.length > 6 && (
            <div className="mt-12 bg-gradient-to-r from-[#00CED1]/20 to-[#5F9FFF]/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-4">
                Want to See More?
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Sign up to browse our full catalog of exclusive tracks, change themes, and unlock premium features.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all"
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
          </>
        )}

        {/* Empty State */}
        {!loading && filteredTracks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No tracks found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
