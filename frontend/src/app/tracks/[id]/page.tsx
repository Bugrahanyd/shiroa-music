"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import { api } from "@/lib/api";

const mockTrack = {
  id: "1",
  title: "Summer Vibes",
  artist: "DJ Producer",
  genre: "Electronic",
  mood: "Uplifting",
  bpm: 128,
  key: "Am",
  duration: 180,
  price: 49.99,
  tags: ["electronic", "dance", "summer"],
  isSold: false,
  description: "A high-energy electronic track perfect for summer projects, commercials, and uplifting content."
};

export default function TrackDetailPage() {
  const params = useParams();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const data = await api.getTrack(params.id as string);
        setTrack(data);
      } catch (error) {
        console.error("Failed to fetch track:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-[#00CED1] text-xl">Loading...</div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-zinc-400 text-xl">Track not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="border-b border-turquoise/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold text-turquoise">
            SHIROA
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tracks" className="text-brand-white hover:text-turquoise transition-colors">
              Browse
            </Link>
            <Link href="/login" className="text-brand-white hover:text-turquoise transition-colors">
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-turquoise text-brand-black px-6 py-2 rounded-full font-medium hover:bg-turquoise-soft transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-12">
        <Link href="/tracks" className="text-turquoise hover:text-turquoise-soft mb-8 inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tracks
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          {/* Left: Cover & Player */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-[#00CED1]/20 to-[#003366]/40 rounded-3xl mb-6 flex items-center justify-center">
              <svg className="w-32 h-32 text-[#00CED1]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>

            <AudioPlayer
              audioUrl={track.previewUrl || track.audioUrl}
              title={track.title}
              artist={track.artist}
            />
          </div>

          {/* Right: Info & Purchase */}
          <div>
            <div className="mb-6">
              <h1 className="text-5xl font-[family-name:var(--font-orbitron)] font-black text-white mb-2">
                {track.title}
              </h1>
              <p className="text-2xl text-gray-400">{track.artist}</p>
            </div>

            {track.description && <p className="text-gray-300 mb-8">{track.description}</p>}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Genre</p>
                <p className="text-white font-semibold">{track.genre}</p>
              </div>
              {track.mood && track.mood.length > 0 && (
                <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Mood</p>
                  <p className="text-white font-semibold">{track.mood.join(", ")}</p>
                </div>
              )}
              {track.bpm && (
                <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">BPM</p>
                  <p className="text-white font-semibold">{track.bpm}</p>
                </div>
              )}
              {track.key && (
                <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Key</p>
                  <p className="text-white font-semibold">{track.key}</p>
                </div>
              )}
              <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Duration</p>
                <p className="text-white font-semibold">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">License</p>
                <p className="text-white font-semibold">{track.licenseType || "Exclusive"}</p>
              </div>
            </div>

            {/* Tags */}
            {track.tags && track.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {track.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-[#00CED1]/20 text-[#00CED1] px-4 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price & Purchase */}
            <div className="bg-gradient-to-r from-[#00CED1] to-[#5FE0E5] rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[#0C0C0C]/70 text-sm mb-1">{track.licenseType || "Exclusive"} License</p>
                  <p className="text-5xl font-[family-name:var(--font-orbitron)] font-black text-[#0C0C0C]">
                    ${track.price}
                  </p>
                </div>
                {track.isSold ? (
                  <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                    SOLD
                  </span>
                ) : (
                  <span className="bg-[#0C0C0C]/20 text-[#0C0C0C] px-6 py-2 rounded-full font-bold">
                    AVAILABLE
                  </span>
                )}
              </div>

              {track.isSold ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-4 rounded-full font-bold text-lg cursor-not-allowed"
                >
                  Track Sold
                </button>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      const { url } = await api.createCheckout(track._id);
                      window.location.href = url;
                    } catch (error) {
                      alert("Please login to purchase");
                    }
                  }}
                  className="w-full bg-[#0C0C0C] text-[#00CED1] py-4 rounded-full font-bold text-lg hover:bg-[#003366] transition-colors"
                >
                  Purchase Now
                </button>
              )}

              <p className="text-[#0C0C0C]/70 text-sm text-center mt-4">
                Includes: WAV + MP3 + License Certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
