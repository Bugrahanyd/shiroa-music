"use client";

import { useState } from "react";

interface TransportControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function TransportControls({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  onSeek
}: TransportControlsProps) {
  const [volume, setVolume] = useState(75);
  const [tempo, setTempo] = useState(120);
  const [isLooping, setIsLooping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        {/* Left - Transport Buttons */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center bg-[#1e293b]/50 text-gray-400 rounded-lg hover:text-[#00CED1] hover:bg-[#1e293b] transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          
          <button 
            onClick={onPlayPause}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white rounded-lg hover:shadow-[0_0_20px_rgba(0,206,209,0.5)] transition-all"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center bg-[#1e293b]/50 text-gray-400 rounded-lg hover:text-[#00CED1] hover:bg-[#1e293b] transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center bg-[#1e293b]/50 text-gray-400 rounded-lg hover:text-[#00CED1] hover:bg-[#1e293b] transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            </svg>
          </button>

          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              isRecording 
                ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                : 'bg-[#1e293b]/50 text-gray-400 hover:text-red-400 hover:bg-[#1e293b]'
            }`}
          >
            <div className="w-3 h-3 bg-current rounded-full" />
          </button>
        </div>

        {/* Center - Time Display */}
        <div className="flex items-center gap-4">
          <div className="text-[#00CED1] font-mono text-lg font-bold">
            {formatTime(currentTime)}
          </div>
          <div className="text-gray-400 font-mono">/</div>
          <div className="text-gray-400 font-mono">
            {formatTime(duration)}
          </div>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-4">
          {/* Loop */}
          <button 
            onClick={() => setIsLooping(!isLooping)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              isLooping 
                ? 'bg-[#00CED1]/20 text-[#00CED1]' 
                : 'bg-[#1e293b]/50 text-gray-400 hover:text-[#00CED1] hover:bg-[#1e293b]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Tempo */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">BPM</span>
            <div className="bg-[#1e293b]/50 rounded px-2 py-1 min-w-[50px] text-center">
              <span className="text-white text-sm font-mono">{tempo}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00CED1 0%, #00CED1 ${volume}%, #374151 ${volume}%, #374151 100%)`
              }}
            />
            <span className="text-xs text-gray-400 w-8">{volume}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
