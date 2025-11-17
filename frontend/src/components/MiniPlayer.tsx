"use client";

import { useState } from "react";
import WaveformVisualizer from "./WaveformVisualizer";

interface Track {
  id: string;
  title: string;
  artist: string;
}

export default function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>({
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Wave"
  });
  const [volume, setVolume] = useState(70);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentTrack) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ${isExpanded ? "h-32" : "h-20"}`}>
      <div className="container mx-auto px-6 h-full flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00CED1] to-[#5F9FFF] rounded-lg flex-shrink-0"></div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-bold truncate">{currentTrack.title}</h4>
            <p className="text-white/60 text-sm truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Waveform */}
        {isExpanded && (
          <div className="hidden md:block flex-1 h-16">
            <WaveformVisualizer isPlaying={isPlaying} />
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button className="text-white/60 hover:text-white transition-all">
            ⏮
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] rounded-full flex items-center justify-center text-white hover:scale-110 transition-all"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button className="text-white/60 hover:text-white transition-all">
            ⏭
          </button>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 w-32">
          <span className="text-white/60">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
          />
        </div>

        {/* Expand */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/60 hover:text-white transition-all"
        >
          {isExpanded ? "⌄" : "⌃"}
        </button>
      </div>
    </div>
  );
}
