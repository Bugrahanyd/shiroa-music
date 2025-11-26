'use client';

import { useState, useRef } from "react";
import { Sparkles, Music, Sliders, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import AIGenerator from "@/components/AIGenerator";

export default function StudioPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerate = (url: string, metadata: any) => {
    setAudioUrl(url);
    setCurrentTrack(metadata);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {['S', 'H', 'I', 'R', 'O', 'A'].map((letter, index) => (
                <span
                  key={index}
                  className="text-3xl font-bold font-orbitron"
                  style={{
                    color: ['#00CED1', '#5F9FFF', '#9D4EDD', '#FF6B9D', '#FFB347', '#00CED1'][index],
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <span className="text-2xl font-bold font-orbitron text-white/50">STUDIO</span>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-bold">BETA</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm">
              Save
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm font-semibold">
              Export
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex h-[calc(100vh-73px)]">
        {/* Left Panel - AI Generator */}
        <div className="w-96 border-r border-white/10 backdrop-blur-xl bg-black/30 p-6 overflow-y-auto">
          <AIGenerator onGenerate={handleGenerate} />
        </div>

        {/* Center - Waveform Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 flex items-center justify-center">
            {currentTrack ? (
              <div className="text-center">
                <div className="w-full max-w-2xl">
                  <div className="h-32 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <Music className="text-cyan-400 animate-pulse" size={64} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{currentTrack.genre || 'Generated Track'}</h3>
                  <p className="text-white/60">{currentTrack.mood || 'AI Generated Music'}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Music className="mx-auto mb-4 text-cyan-400" size={64} />
                <h3 className="text-xl font-bold mb-2">No track loaded</h3>
                <p className="text-white/60">Generate music with AI</p>
              </div>
            )}
          </div>
          <audio ref={audioRef} />

          {/* Transport Controls */}
          <div className="border-t border-white/10 backdrop-blur-xl bg-black/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-white/60">00:00</div>
              <div className="flex-1 mx-6">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                </div>
              </div>
              <div className="text-sm text-white/60">00:00</div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <SkipBack size={20} />
              </button>
              <button 
                onClick={togglePlay}
                disabled={!audioUrl}
                className="p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <SkipForward size={20} />
              </button>
              <div className="ml-8 flex items-center gap-2">
                <Volume2 size={20} className="text-white/60" />
                <input type="range" className="w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Effects */}
        <div className="w-80 border-l border-white/10 backdrop-blur-xl bg-black/30 p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sliders className="text-purple-400" size={20} />
            <h2 className="text-lg font-bold">Effects</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Reverb</span>
                <span className="text-xs text-white/60">50%</span>
              </div>
              <input type="range" className="w-full" defaultValue={50} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Delay</span>
                <span className="text-xs text-white/60">30%</span>
              </div>
              <input type="range" className="w-full" defaultValue={30} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Distortion</span>
                <span className="text-xs text-white/60">0%</span>
              </div>
              <input type="range" className="w-full" defaultValue={0} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Filter</span>
                <span className="text-xs text-white/60">100%</span>
              </div>
              <input type="range" className="w-full" defaultValue={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
