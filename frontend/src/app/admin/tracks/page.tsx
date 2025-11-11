"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export default function AdminTracksPage() {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const data = await api.getTracks();
      setTracks(data);
    } catch (error) {
      console.error("Failed to load tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      alert("Track deleted!");
      loadTracks();
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00CED1] mb-4">Access Denied</h1>
          <p className="text-zinc-400">Admin privileges required</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-[#00CED1] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#00CED1] font-[family-name:var(--font-orbitron)]">
            Manage Tracks
          </h1>
          <Link
            href="/admin"
            className="px-6 py-3 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors"
          >
            + Upload New Track
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Track</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Artist</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Genre</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-zinc-300">Created</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {tracks.map((track) => (
                <tr key={track._id} className="hover:bg-zinc-800/50">
                  <td className="px-6 py-4">
                    <Link href={`/tracks/${track._id}`} className="text-white font-medium hover:text-[#00CED1]">
                      {track.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{track.artist}</td>
                  <td className="px-6 py-4 text-zinc-400">{track.genre}</td>
                  <td className="px-6 py-4 text-white font-bold">${track.price}</td>
                  <td className="px-6 py-4">
                    {track.isSold || track.status === "sold" ? (
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Sold</span>
                    ) : (
                      <span className="px-3 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded-full text-sm">Available</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {new Date(track.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/tracks/${track._id}`}
                        className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600 text-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(track._id, track.title)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-zinc-400 text-sm">
          Total Tracks: {tracks.length}
        </div>
      </div>
    </div>
  );
}
