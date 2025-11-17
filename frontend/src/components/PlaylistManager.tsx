"use client";

import { useState } from "react";

interface Playlist {
  id: string;
  name: string;
  trackCount: number;
  duration: string;
  cover: string;
}

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: "1", name: "My Favorites", trackCount: 12, duration: "45:32", cover: "🎵" },
    { id: "2", name: "Workout Mix", trackCount: 8, duration: "32:15", cover: "💪" },
    { id: "3", name: "Chill Vibes", trackCount: 15, duration: "58:42", cover: "🌙" }
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      trackCount: 0,
      duration: "0:00",
      cover: "📁"
    };
    
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    setIsCreating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-white">Your Playlists</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition-all"
        >
          + New Playlist
        </button>
      </div>

      {isCreating && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createPlaylist()}
            placeholder="Playlist name..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00CED1] mb-3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={createPlaylist}
              className="flex-1 bg-[#00CED1] text-white py-2 rounded-lg font-semibold hover:bg-[#5F9FFF] transition-all"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewPlaylistName("");
              }}
              className="flex-1 bg-white/5 text-white py-2 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="text-6xl mb-4">{playlist.cover}</div>
            <h3 className="text-white font-bold text-lg mb-1">{playlist.name}</h3>
            <p className="text-white/60 text-sm">
              {playlist.trackCount} tracks • {playlist.duration}
            </p>
            <button className="mt-4 w-full bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-all">
              Play All
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
