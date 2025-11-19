"use client";

import { useState } from "react";

interface LyricsEditorProps {
  lyrics: string;
  onLyricsChange: (lyrics: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function LyricsEditor({ 
  lyrics, 
  onLyricsChange, 
  onGenerate, 
  isGenerating 
}: LyricsEditorProps) {
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showLyrics}
            onChange={(e) => setShowLyrics(e.target.checked)}
            className="w-4 h-4 text-[#00CED1] bg-[#0f172a] border-[#00CED1]/30 rounded focus:ring-[#00CED1] focus:ring-2"
          />
          <span className="text-sm font-semibold text-gray-300">Add Lyrics</span>
        </label>
      </div>

      {showLyrics && (
        <div className="space-y-3">
          <textarea
            value={lyrics}
            onChange={(e) => onLyricsChange(e.target.value)}
            placeholder="Enter your lyrics here..."
            className="w-full h-32 bg-[#0f172a]/50 border border-[#00CED1]/30 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#00CED1] focus:outline-none resize-none"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => onLyricsChange("Verse 1:\n[Your lyrics here]\n\nChorus:\n[Your chorus here]\n\nVerse 2:\n[More lyrics here]")}
              className="px-3 py-1 bg-[#5F9FFF]/20 text-[#5F9FFF] rounded text-sm hover:bg-[#5F9FFF]/30 transition-all"
            >
              Template
            </button>
            <button
              onClick={() => onLyricsChange("")}
              className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-all"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}