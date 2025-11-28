"use client";

import { useState } from "react";
import LyricsEditor from "./LyricsEditor";

interface AIGeneratorProps {
  onGenerate: (params: any) => void;
}

export default function AIGenerator({ onGenerate }: AIGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [params, setParams] = useState({
    genre: "electronic",
    mood: "energetic",
    duration: 30,
    tempo: 120,
    lyrics: ""
  });

  const genres = [
    "electronic", "hip-hop", "rock", "pop", "jazz", "classical", 
    "ambient", "trap", "house", "techno", "r&b", "indie"
  ];

  const moods = [
    "energetic", "calm", "dark", "uplifting", "melancholic", 
    "aggressive", "dreamy", "mysterious", "happy", "intense"
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate(params);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a]/80 backdrop-blur-sm border border-[#00CED1]/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">AI Music Generator</h3>
      </div>

      <div className="space-y-4">
        {/* Genre Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Genre</label>
          <select
            value={params.genre}
            onChange={(e) => setParams(prev => ({ ...prev, genre: e.target.value }))}
            className="w-full bg-[#0f172a]/50 border border-[#00CED1]/30 rounded-lg px-3 py-2 text-white focus:border-[#00CED1] focus:outline-none"
          >
            {genres.map(genre => (
              <option key={genre} value={genre} className="bg-[#0f172a]">
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Mood</label>
          <select
            value={params.mood}
            onChange={(e) => setParams(prev => ({ ...prev, mood: e.target.value }))}
            className="w-full bg-[#0f172a]/50 border border-[#00CED1]/30 rounded-lg px-3 py-2 text-white focus:border-[#00CED1] focus:outline-none"
          >
            {moods.map(mood => (
              <option key={mood} value={mood} className="bg-[#0f172a]">
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Duration: {params.duration}s
          </label>
          <input
            type="range"
            min="15"
            max="120"
            step="15"
            value={params.duration}
            onChange={(e) => setParams(prev => ({ ...prev, duration: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #00CED1 0%, #00CED1 ${(params.duration - 15) / (120 - 15) * 100}%, #374151 ${(params.duration - 15) / (120 - 15) * 100}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>15s</span>
            <span>60s</span>
            <span>120s</span>
          </div>
        </div>

        {/* Tempo */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Tempo: {params.tempo} BPM
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={params.tempo}
            onChange={(e) => setParams(prev => ({ ...prev, tempo: Number(e.target.value) }))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #5F9FFF 0%, #5F9FFF ${(params.tempo - 60) / (180 - 60) * 100}%, #374151 ${(params.tempo - 60) / (180 - 60) * 100}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>60</span>
            <span>120</span>
            <span>180</span>
          </div>
        </div>

        {/* Lyrics Editor */}
        <LyricsEditor
          lyrics={params.lyrics}
          onLyricsChange={(lyrics) => setParams(prev => ({ ...prev, lyrics }))}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white rounded-lg font-bold hover:shadow-[0_0_25px_rgba(0,206,209,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating with MusicGen...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Generate with Local AI
            </div>
          )}
        </button>

        {/* Quick Presets */}
        <div className="pt-4 border-t border-[#00CED1]/20">
          <label className="block text-sm font-semibold text-gray-300 mb-3">Quick Presets</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Chill Vibes", genre: "ambient", mood: "calm", tempo: 80 },
              { name: "Party Banger", genre: "electronic", mood: "energetic", tempo: 128 },
              { name: "Dark Trap", genre: "trap", mood: "dark", tempo: 140 },
              { name: "Uplifting Pop", genre: "pop", mood: "uplifting", tempo: 120 }
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => setParams(prev => ({ ...prev, ...preset }))}
                className="px-3 py-2 bg-[#0f172a]/50 text-gray-300 rounded-lg text-sm hover:bg-[#0f172a] hover:text-[#00CED1] transition-all"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
