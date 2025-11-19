"use client";

import { useEffect, useRef } from "react";

interface WaveformEditorProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
}

export default function WaveformEditor({
  isPlaying,
  currentTime,
  duration,
  onTimeUpdate,
  onDurationChange
}: WaveformEditorProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && waveformRef.current) {
      import("wavesurfer.js").then((WaveSurfer) => {
        wavesurferRef.current = WaveSurfer.default.create({
          container: waveformRef.current!,
          waveColor: "#5F9FFF",
          progressColor: "#00CED1",
          cursorColor: "#00CED1",
          barWidth: 2,
          barRadius: 3,
          cursorWidth: 2,
          height: 128,
          barGap: 2,
          normalize: true
        });

        wavesurferRef.current.on("ready", () => {
          onDurationChange(wavesurferRef.current.getDuration());
        });

        wavesurferRef.current.on("audioprocess", () => {
          onTimeUpdate(wavesurferRef.current.getCurrentTime());
        });
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Timeline</h2>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded hover:bg-[#00CED1]/30 transition-all text-sm">
            Import Audio
          </button>
          <button className="px-3 py-1 bg-[#5F9FFF]/20 text-[#5F9FFF] rounded hover:bg-[#5F9FFF]/30 transition-all text-sm">
            Record
          </button>
        </div>
      </div>

      {/* Waveform Container */}
      <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/30 rounded-xl p-6">
        <div ref={waveformRef} className="w-full" />
      </div>

      {/* Multi-track Area */}
      <div className="space-y-2">
        {[
          { id: 1, name: "Master", color: "#00CED1", waveform: 80 },
          { id: 2, name: "Vocals", color: "#5F9FFF", waveform: 65 },
          { id: 3, name: "Drums", color: "#9D4EDD", waveform: 90 },
          { id: 4, name: "Bass", color: "#FF6B9D", waveform: 70 }
        ].map((track) => (
          <div
            key={track.id}
            className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/20 rounded-lg p-4 hover:border-[#00CED1]/40 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: track.color }}
                >
                  {track.id}
                </div>
                <span className="text-xs text-gray-400">{track.name}</span>
              </div>
              
              <div className="flex-1 relative">
                <div className="h-12 bg-[#0f172a]/50 rounded relative overflow-hidden">
                  {/* Simulated waveform */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 mx-px rounded-full transition-all duration-300"
                        style={{
                          height: `${Math.random() * track.waveform + 10}%`,
                          backgroundColor: track.color,
                          opacity: 0.6 + Math.random() * 0.4
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Playhead */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-100"
                    style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
                  />
                </div>
                
                {/* Track controls overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="px-2 py-1 bg-[#00CED1]/80 text-white rounded text-xs hover:bg-[#00CED1] transition-colors">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-[#5F9FFF]/80 text-white rounded text-xs hover:bg-[#5F9FFF] transition-colors">
                    FX
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#00CED1] transition-colors rounded">
                  <span className="text-xs font-bold">M</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#00CED1] transition-colors rounded">
                  <span className="text-xs font-bold">S</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline ruler */}
      <div className="mt-4 bg-[#1e293b]/30 rounded-lg p-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>0:00</span>
          <span>0:30</span>
          <span>1:00</span>
          <span>1:30</span>
          <span>2:00</span>
        </div>
        <div className="h-2 bg-[#0f172a]/50 rounded relative">
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#00CED1] shadow-lg"
            style={{ left: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
