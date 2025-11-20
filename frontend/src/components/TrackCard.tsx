"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import WaveformVisualizer from "./WaveformVisualizer";

interface TrackCardProps {
  track: {
    _id: string;
    title: string;
    artist: string;
    genre: string;
    price: number;
    bpm?: number;
    key?: string;
    status?: string;
    isSold?: boolean;
    audioUrl?: string;
    favoriteCount?: number;
  };
}

export default function TrackCard({ track }: TrackCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(track.favoriteCount || 0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (user) {
      checkFavoriteStatus();
    }
    loadFavoriteCount();
  }, [user, track._id]);

  const checkFavoriteStatus = async () => {
    try {
      const { isFavorite } = await api.checkFavorite(track._id);
      setIsFavorite(isFavorite);
    } catch (error) {
      console.error('Failed to check favorite:', error);
    }
  };

  const loadFavoriteCount = async () => {
    try {
      const { count } = await api.getFavoriteCount(track._id);
      setFavoriteCount(count);
    } catch (error) {
      console.error('Failed to load favorite count:', error);
    }
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add favorites');
      return;
    }

    try {
      if (isFavorite) {
        await api.removeFavorite(track._id);
        setIsFavorite(false);
        setFavoriteCount(prev => Math.max(0, prev - 1));
      } else {
        await api.addFavorite(track._id);
        setIsFavorite(true);
        setFavoriteCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!track.audioUrl) {
      alert('Audio not available');
      return;
    }
    const audio = new Audio(track.audioUrl);
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const isSold = track.status === "sold" || track.isSold;

  return (
    <Link
      href={`/tracks/${track._id}`}
      className="group relative theme-card rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-accent)]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      
      {/* Waveform Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-all duration-300 z-5">
        <WaveformVisualizer isPlaying={isPlaying} color="#00CED1" />
      </div>
      
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full theme-card backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all"
        aria-label="Add to favorites"
      >
        <Heart 
          size={20} 
          className={`transition-all ${isFavorite ? 'theme-icon' : 'theme-text-secondary'}`}
          fill={isFavorite ? 'currentColor' : 'none'}
        />
      </button>
      
      {/* Favorite Count */}
      {favoriteCount > 0 && (
        <div className="absolute top-16 right-4 z-20 px-2 py-1 rounded-full theme-card backdrop-blur-sm">
          <span className="text-xs theme-text-secondary">{favoriteCount}</span>
        </div>
      )}

      {/* Play Button */}
      <button
        onClick={handlePlay}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label="Preview track"
      >
        <span className="text-white text-2xl">{isPlaying ? "⏸" : "▶"}</span>
      </button>

      <div className="mb-4 relative z-10">
        <h3 className="text-xl font-display font-bold theme-text mb-1">
          {track.title}
        </h3>
        <p className="theme-text-secondary">{track.artist}</p>
      </div>

      {/* Details */}
      <div className="flex items-center gap-4 text-sm theme-text-secondary mb-4 relative z-10">
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
        <span className="text-3xl font-black theme-text">
          ${track.price}
        </span>
        {isSold ? (
          <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold border border-red-500/50">
            SOLD
          </span>
        ) : (
          <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold border border-green-500/50">
            AVAILABLE
          </span>
        )}
      </div>
    </Link>
  );
}
