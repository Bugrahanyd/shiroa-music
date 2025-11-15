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
        {[1, 2, 3, 4].map((track) => (
          <div
            key={track}
            className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/20 rounded-lg p-4 hover:border-[#00CED1]/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00CED1] to-[#5F9FFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {track}
              </div>
              <div className="flex-1">
                <div className="h-12 bg-[#0f172a]/50 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00CED1]/20 to-transparent" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#00CED1] transition-colors">
                  M
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#00CED1] transition-colors">
                  S
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
