"use client";

import { useState } from "react";

export default function EffectsPanel() {
  const [effects, setEffects] = useState({
    reverb: 0,
    delay: 0,
    chorus: 0,
    distortion: 0,
    compressor: 0,
    eq: { low: 0, mid: 0, high: 0 }
  });

  const updateEffect = (effect: string, value: number) => {
    setEffects(prev => ({ ...prev, [effect]: value }));
  };

  const updateEQ = (band: string, value: number) => {
    setEffects(prev => ({
      ...prev,
      eq: { ...prev.eq, [band]: value }
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-[#00CED1]/20">
        <h3 className="text-lg font-bold text-white mb-2">Effects</h3>
        <button className="w-full px-3 py-2 bg-gradient-to-r from-[#5F9FFF] to-[#9D4EDD] text-white rounded-lg text-sm font-bold hover:shadow-[0_0_15px_rgba(95,159,255,0.4)] transition-all">
          + Add Effect
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* EQ Section */}
        <div className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/20 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00CED1] rounded-full" />
            EQ
          </h4>
          <div className="space-y-3">
            {Object.entries(effects.eq).map(([band, value]) => (
              <div key={band} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-8 uppercase">{band}</span>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  value={value}
                  onChange={(e) => updateEQ(band, Number(e.target.value))}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-gray-400 w-8">{value > 0 ? '+' : ''}{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Effects */}
        {[
          { name: 'Reverb', key: 'reverb', color: '#5F9FFF' },
          { name: 'Delay', key: 'delay', color: '#9D4EDD' },
          { name: 'Chorus', key: 'chorus', color: '#FF6B9D' },
          { name: 'Distortion', key: 'distortion', color: '#FFB347' },
          { name: 'Compressor', key: 'compressor', color: '#00CED1' }
        ].map((effect) => (
          <div key={effect.key} className="bg-[#1e293b]/50 backdrop-blur-sm border border-[#00CED1]/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: effect.color }} />
                {effect.name}
              </h4>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">
                {effects[effect.key as keyof typeof effects] > 0 ? 'ON' : 'OFF'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-8">0%</span>
              <input
                type="range"
                min="0"
                max="100"
                value={effects[effect.key as keyof typeof effects] as number}
                onChange={(e) => updateEffect(effect.key, Number(e.target.value))}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${effect.color} 0%, ${effect.color} ${effects[effect.key as keyof typeof effects]}%, #374151 ${effects[effect.key as keyof typeof effects]}%, #374151 100%)`
                }}
              />
              <span className="text-xs text-gray-400 w-8">{effects[effect.key as keyof typeof effects]}%</span>
            </div>
          </div>
        ))}

        {/* AI Enhancement */}
        <div className="bg-gradient-to-br from-[#00CED1]/20 to-[#5F9FFF]/20 border border-[#00CED1]/30 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] rounded-full" />
            AI Enhancement
          </h4>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-[#00CED1]/20 text-[#00CED1] rounded hover:bg-[#00CED1]/30 transition-all text-sm">
              Auto Master
            </button>
            <button className="w-full px-3 py-2 bg-[#5F9FFF]/20 text-[#5F9FFF] rounded hover:bg-[#5F9FFF]/30 transition-all text-sm">
              Vocal Enhance
            </button>
            <button className="w-full px-3 py-2 bg-[#9D4EDD]/20 text-[#9D4EDD] rounded hover:bg-[#9D4EDD]/30 transition-all text-sm">
              Mix Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
