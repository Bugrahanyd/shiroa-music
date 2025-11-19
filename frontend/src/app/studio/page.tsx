"use client";

import { useState } from "react";
import WaveformEditor from "@/components/studio/WaveformEditor";
import TrackList from "@/components/studio/TrackList";
import EffectsPanel from "@/components/studio/EffectsPanel";
import TransportControls from "@/components/studio/TransportControls";
import AIGenerator from "@/components/studio/AIGenerator";

export default function StudioPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<any[]>([]);

  const handleGenerateMusic = async (params: any) => {
    try {
      const response = await fetch('/api/studio/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      const result = await response.json();
      setGeneratedTracks(prev => [...prev, result]);
    } catch (error) {
      console.error('Music generation failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1a2e] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#00CED1]/20 bg-[#0f1f3a]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-[family-name:var(--font-orbitron)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] to-[#5F9FFF]">
              SHIROA STUDIO
            </h1>
            <span className="px-3 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded-full text-sm font-bold">
              BETA
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAIGenerator(!showAIGenerator)}
              className={`px-4 py-2 rounded-lg transition-all ${
                showAIGenerator 
                  ? 'bg-[#00CED1] text-white shadow-[0_0_15px_rgba(0,206,209,0.4)]' 
                  : 'bg-[#1e3a5f]/50 text-white hover:bg-[#1e3a5f]'
              }`}
            >
              AI Generate
            </button>
            <button className="px-4 py-2 bg-[#1e3a5f]/50 text-white rounded-lg hover:bg-[#1e3a5f] transition-all">
              Save Project
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,206,209,0.5)] transition-all">
              Export
            </button>
          </div>
        </div>
      </header>

      {/* AI Generator Modal */}
      {showAIGenerator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => setShowAIGenerator(false)}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10"
            >
              ×
            </button>
            <AIGenerator onGenerate={handleGenerateMusic} />
          </div>
        </div>
      )}

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Track List */}
        <div className="w-64 border-r border-[#00CED1]/20 bg-[#0f1f3a]/50 backdrop-blur-sm">
          <TrackList 
            generatedTracks={generatedTracks}
            onTrackSelect={(track) => console.log('Selected track:', track)}
          />
        </div>

        {/* Center - Waveform Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 overflow-auto">
            <WaveformEditor 
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              onTimeUpdate={setCurrentTime}
              onDurationChange={setDuration}
            />
          </div>

          {/* Transport Controls */}
          <div className="border-t border-[#00CED1]/20 bg-[#0f1f3a]/80 backdrop-blur-md">
            <TransportControls
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              currentTime={currentTime}
              duration={duration}
              onSeek={setCurrentTime}
            />
          </div>
        </div>

        {/* Right Sidebar - Effects */}
        <div className="w-80 border-l border-[#00CED1]/20 bg-[#0f1f3a]/50 backdrop-blur-sm">
          <EffectsPanel />
        </div>
      </div>
    </div>
  );
}
