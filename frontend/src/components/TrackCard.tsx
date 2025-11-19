"use client";

import { useState } from "react";
import Link from "next/link";
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
  };
}

export default function TrackCard({ track }: TrackCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = new Audio('/demo-track.mp3');
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
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all"
        aria-label="Add to favorites"
      >
        <span className={`text-xl transition-all ${isFavorite ? "text-red-500 scale-125" : "text-white/60"}`}>
          {isFavorite ? "❤️" : "🤍"}
        </span>
      </button>

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
