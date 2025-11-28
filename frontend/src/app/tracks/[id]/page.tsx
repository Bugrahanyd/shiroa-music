"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { api } from "@/lib/api";
import { Play, Heart, Share2, Download, ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/audio/AudioPlayer";

export default function TrackDetailPage() {
  const params = useParams();
  const { t } = useLanguage();
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchTrack = async () => {
      setLoading(true);
      try {
        // Use local API first
        const trackData = await api.getTrack(params.id as string);
        if (trackData) {
          setTrack(trackData);
        } else {
          throw new Error('Track not found');
        }
      } catch (error) {
        // Fallback demo track
        setTrack({
          _id: params.id,
          title: "Neon Nights",
          artist: "Cyber Dreams",
          genre: "Electronic",
          bpm: 128,
          key: "C Major",
          duration: 272,
          price: 89,
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          tags: ["synthwave", "neon", "electronic"],
          status: "available",
          description: "A high-energy electronic track perfect for cyberpunk and futuristic content."
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchTrack();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: 'var(--theme-icon-color)' }}></div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="theme-text-secondary text-xl mb-4">Track not found</p>
          <Link href="/tracks" className="theme-accent hover:opacity-80">← Back to Tracks</Link>
        </div>
      </div>
    );
  }

  const isSold = track.status === "sold";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/tracks" className="inline-flex items-center gap-2 theme-text-secondary hover:theme-text transition-colors mb-8">
        <ArrowLeft size={20} />
        Back to Tracks
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left: Cover & Player */}
        <div>
          {/* Cover Art */}
          <div className="aspect-square rounded-3xl mb-6 relative overflow-hidden theme-card">
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}>
              <div className="text-white text-9xl font-bold opacity-20">♪</div>
            </div>
            
            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
            >
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                {isPlaying ? (
                  <div className="w-6 h-6 flex gap-1.5">
                    <div className="w-2 bg-black"></div>
                    <div className="w-2 bg-black"></div>
                  </div>
                ) : (
                  <Play size={32} className="text-black ml-1" fill="black" />
                )}
              </div>
            </button>
          </div>

          {/* Audio Player */}
          {track.audioUrl && (
            <AudioPlayer 
              src={track.audioUrl} 
              title={track.title}
              artist={track.artist}
            />
          )}
        </div>

        {/* Right: Info & Purchase */}
        <div>
          {/* Title & Artist */}
          <div className="mb-6">
            <h1 className="text-5xl font-bold theme-text mb-2 font-orbitron">{track.title}</h1>
            <p className="text-2xl theme-text-secondary">{track.artist}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button className="theme-button-outline px-6 py-2 rounded-full flex items-center gap-2">
              <Heart size={18} />
              Save
            </button>
            <button className="theme-button-outline px-6 py-2 rounded-full flex items-center gap-2">
              <Share2 size={18} />
              Share
            </button>
          </div>

          {/* Description */}
          {track.description && (
            <p className="theme-text-secondary mb-8">{track.description}</p>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="theme-card rounded-xl p-4">
              <p className="theme-text-secondary text-sm mb-1">Genre</p>
              <p className="theme-text font-semibold capitalize">{track.genre}</p>
            </div>
            {track.bpm && (
              <div className="theme-card rounded-xl p-4">
                <p className="theme-text-secondary text-sm mb-1">BPM</p>
                <p className="theme-text font-semibold">{track.bpm}</p>
              </div>
            )}
            {track.key && (
              <div className="theme-card rounded-xl p-4">
                <p className="theme-text-secondary text-sm mb-1">Key</p>
                <p className="theme-text font-semibold">{track.key}</p>
              </div>
            )}
            <div className="theme-card rounded-xl p-4">
              <p className="theme-text-secondary text-sm mb-1">Duration</p>
              <p className="theme-text font-semibold">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Tags */}
          {track.tags && track.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {track.tags.map((tag: string) => (
                <span key={tag} className="px-4 py-1 rounded-full text-sm theme-button-outline">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Price & Purchase */}
          <div className="rounded-3xl p-8 backdrop-blur-xl" style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm mb-1">Exclusive License</p>
                <p className="text-5xl font-bold text-white font-orbitron">${track.price}</p>
              </div>
              {isSold ? (
                <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">SOLD</span>
              ) : (
                <span className="bg-white/20 text-white px-6 py-2 rounded-full font-bold">AVAILABLE</span>
              )}
            </div>

            {isSold ? (
              <button disabled className="w-full bg-gray-400 text-white py-4 rounded-full font-bold text-lg cursor-not-allowed">
                Track Sold
              </button>
            ) : (
              <button
                onClick={async () => {
                  try {
                    const response = await fetch('/api/payment/create-checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        trackId: track._id,
                        trackTitle: track.title,
                        trackArtist: track.artist,
                        price: track.price
                      })
                    });
                    const { url } = await response.json();
                    window.location.href = url;
                  } catch (error) {
                    alert('Payment failed. Please try again.');
                  }
                }}
                className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Purchase Now
              </button>
            )}

            <p className="text-white/80 text-sm text-center mt-4">
              Includes: WAV + MP3 + License Certificate
            </p>
          </div>
        </div>
      </div>

      {/* AI Story & Lyrics Section */}
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        {/* AI Generated Story */}
        <div className="theme-card rounded-3xl p-8">
          <h2 className="text-2xl font-bold theme-text mb-4 font-orbitron flex items-center gap-2">
            <span className="text-2xl">✨</span>
            The Story Behind
          </h2>
          <div className="theme-text-secondary space-y-4 leading-relaxed">
            <p>
              This track was born from the intersection of human creativity and artificial intelligence. 
              The artist envisioned a soundscape that captures the essence of {track.genre} while pushing 
              the boundaries of modern production.
            </p>
            <p>
              Using SHIROA's AI-powered studio, the composition evolved through multiple iterations, 
              each one refining the emotional depth and sonic texture. The result is a unique piece 
              that resonates with both contemporary and timeless qualities.
            </p>
            <p>
              At {track.bpm} BPM in the key of {track.key || 'unknown'}, this track creates an atmosphere 
              that's perfect for {track.tags?.join(', ') || 'various applications'}. Every element was 
              carefully crafted to ensure maximum impact and versatility.
            </p>
          </div>
        </div>

        {/* Lyrics / Production Notes */}
        <div className="theme-card rounded-3xl p-8">
          <h2 className="text-2xl font-bold theme-text mb-4 font-orbitron flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            Production Notes
          </h2>
          <div className="theme-text-secondary space-y-3 font-mono text-sm">
            <div className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-icon-color)' }}>
              <p className="theme-text font-semibold mb-1">Intro (0:00 - 0:30)</p>
              <p>Atmospheric build-up with layered synths and subtle percussion</p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-icon-color)' }}>
              <p className="theme-text font-semibold mb-1">Verse (0:30 - 1:15)</p>
              <p>Main melody introduction with rhythmic elements</p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-icon-color)' }}>
              <p className="theme-text font-semibold mb-1">Drop (1:15 - 2:00)</p>
              <p>Full energy release with all elements combined</p>
            </div>
            <div className="border-l-2 pl-4" style={{ borderColor: 'var(--theme-icon-color)' }}>
              <p className="theme-text font-semibold mb-1">Outro (2:00 - 3:00)</p>
              <p>Gradual wind-down maintaining emotional resonance</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--theme-bg-secondary)' }}>
            <p className="theme-text-secondary text-xs">
              <span className="theme-accent font-semibold">Note:</span> This track is 100% royalty-free 
              with exclusive licensing. Once purchased, you own all commercial rights forever.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
