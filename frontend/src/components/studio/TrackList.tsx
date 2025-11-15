"use client";

export default function TrackList() {
  const tracks = [
    { id: 1, name: "Master", color: "#00CED1", volume: 80 },
    { id: 2, name: "Vocals", color: "#5F9FFF", volume: 70 },
    { id: 3, name: "Drums", color: "#9D4EDD", volume: 85 },
    { id: 4, name: "Bass", color: "#FF6B9D", volume: 75 }
  ];

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
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <span className="text-white font-semibold text-sm flex-1">
                {track.name}
              </span>
              <button className="text-gray-400 hover:text-red-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={track.volume}
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
          </div>
        ))}
      </div>
    </div>
  );
}
