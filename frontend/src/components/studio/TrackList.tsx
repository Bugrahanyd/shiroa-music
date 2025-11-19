"use client";

import { useState } from "react";

interface Track {
  id: number;
  name: string;
  color: string;
  volume: number;
  type?: string;
  audioUrl?: string;
}

interface TrackListProps {
  generatedTracks?: any[];
  onTrackSelect?: (track: any) => void;
}

export default function TrackList({ generatedTracks = [], onTrackSelect }: TrackListProps) {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 1, name: "Master", color: "#00CED1", volume: 80, type: "master" },
    { id: 2, name: "Vocals", color: "#5F9FFF", volume: 70, type: "vocal" },
    { id: 3, name: "Drums", color: "#9D4EDD", volume: 85, type: "drum" },
    { id: 4, name: "Bass", color: "#FF6B9D", volume: 75, type: "bass" }
  ]);

  const addGeneratedTrack = (generatedTrack: any) => {
    const newTrack: Track = {
      id: Date.now(),
      name: `AI ${generatedTrack.metadata?.genre || 'Track'}`,
      color: "#FFB347",
      volume: 80,
      type: "generated",
      audioUrl: generatedTrack.audioUrl
    };
    setTracks(prev => [...prev, newTrack]);
  };

  const updateTrackVolume = (id: number, volume: number) => {
    setTracks(prev => prev.map(track => 
      track.id === id ? { ...track, volume } : track
    ));
  };

  const removeTrack = (id: number) => {
    setTracks(prev => prev.filter(track => track.id !== id));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#00CED1]/20">
        <h3 className="text-lg font-bold text-white mb-2">Tracks</h3>
        <button className="w-full px-3 py-2 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(0,206,209,0.4)] transition-all">
          + Add Track
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/20 rounded-lg p-3 hover:border-[#00CED1]/40 transition-all cursor-pointer"
            onClick={() => onTrackSelect?.(track)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <span className="text-white font-semibold text-sm flex-1">
                {track.name}
                {track.type === 'generated' && (
                  <span className="ml-2 px-1 py-0.5 bg-[#FFB347]/20 text-[#FFB347] rounded text-xs">
                    AI
                  </span>
                )}
              </span>
              {track.type !== 'master' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTrack(track.id);
                  }}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={track.volume}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateTrackVolume(track.id, Number(e.target.value));
                  }}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${track.color} 0%, ${track.color} ${track.volume}%, #374151 ${track.volume}%, #374151 100%)`
                  }}
                />
                <span className="text-xs text-gray-400 w-8">{track.volume}</span>
              </div>

              <div className="flex gap-1">
                <button className="flex-1 px-2 py-1 bg-[#0f172a]/50 text-gray-400 rounded text-xs hover:text-[#00CED1] hover:bg-[#0f172a] transition-all">
                  M
                </button>
                <button className="flex-1 px-2 py-1 bg-[#0f172a]/50 text-gray-400 rounded text-xs hover:text-[#00CED1] hover:bg-[#0f172a] transition-all">
                  S
                </button>
                <button className="flex-1 px-2 py-1 bg-[#0f172a]/50 text-gray-400 rounded text-xs hover:text-[#00CED1] hover:bg-[#0f172a] transition-all">
                  R
                </button>
              </div>
            </div>

            {track.audioUrl && (
              <div className="mt-2 pt-2 border-t border-[#00CED1]/10">
                <button className="w-full px-2 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded text-xs hover:bg-[#00CED1]/30 transition-all">
                  Preview
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Generated Tracks Section */}
        {generatedTracks.length > 0 && (
          <div className="pt-4 border-t border-[#00CED1]/20">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Generated Tracks</h4>
            {generatedTracks.map((genTrack, index) => (
              <div key={index} className="mb-2">
                <button
                  onClick={() => addGeneratedTrack(genTrack)}
                  className="w-full px-3 py-2 bg-gradient-to-r from-[#FFB347]/20 to-[#FF6B9D]/20 border border-[#FFB347]/30 text-[#FFB347] rounded-lg text-sm hover:bg-gradient-to-r hover:from-[#FFB347]/30 hover:to-[#FF6B9D]/30 transition-all"
                >
                  + Add {genTrack.metadata?.genre || 'Track'} to Timeline
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
