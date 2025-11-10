"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  const [isPlaying, setIsPlaying] = useState(false);

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
            <div className="aspect-square bg-gradient-to-br from-turquoise/20 to-brand-blue/40 rounded-3xl mb-6 flex items-center justify-center relative overflow-hidden">
              <svg className="w-32 h-32 text-turquoise/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              
              {/* Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-20 h-20 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-20 h-20 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Waveform Placeholder */}
            <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
              <div className="flex items-center gap-1 h-16">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-turquoise/30 rounded-full"
                    style={{ height: `${Math.random() * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info & Purchase */}
          <div>
            <div className="mb-6">
              <h1 className="text-5xl font-display font-black text-brand-white mb-2">
                {mockTrack.title}
              </h1>
              <p className="text-2xl text-gray-400">{mockTrack.artist}</p>
            </div>

            <p className="text-gray-300 mb-8">{mockTrack.description}</p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Genre</p>
                <p className="text-brand-white font-semibold">{mockTrack.genre}</p>
              </div>
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Mood</p>
                <p className="text-brand-white font-semibold">{mockTrack.mood}</p>
              </div>
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">BPM</p>
                <p className="text-brand-white font-semibold">{mockTrack.bpm}</p>
              </div>
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Key</p>
                <p className="text-brand-white font-semibold">{mockTrack.key}</p>
              </div>
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">Duration</p>
                <p className="text-brand-white font-semibold">
                  {Math.floor(mockTrack.duration / 60)}:{(mockTrack.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <div className="bg-brand-blue/20 border border-turquoise/30 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-1">License</p>
                <p className="text-brand-white font-semibold">Exclusive</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {mockTrack.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-turquoise/20 text-turquoise px-4 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Price & Purchase */}
            <div className="bg-gradient-to-r from-turquoise to-turquoise-soft rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-brand-black/70 text-sm mb-1">Exclusive License</p>
                  <p className="text-5xl font-display font-black text-brand-black">
                    ${mockTrack.price}
                  </p>
                </div>
                {mockTrack.isSold ? (
                  <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                    SOLD
                  </span>
                ) : (
                  <span className="bg-brand-black/20 text-brand-black px-6 py-2 rounded-full font-bold">
                    AVAILABLE
                  </span>
                )}
              </div>

              {mockTrack.isSold ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-4 rounded-full font-bold text-lg cursor-not-allowed"
                >
                  Track Sold
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-brand-black text-turquoise py-4 rounded-full font-bold text-lg text-center hover:bg-brand-blue transition-colors"
                >
                  Purchase Now
                </Link>
              )}

              <p className="text-brand-black/70 text-sm text-center mt-4">
                Includes: WAV + MP3 + License Certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
