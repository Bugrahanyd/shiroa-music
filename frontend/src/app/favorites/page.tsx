'use client';
import { safeStorage } from '@/lib/storage';

import { useState, useEffect } from 'react';
import { Heart, Music, Trash2, Play } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Track {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  duration: string;
  price: number;
  audioUrl?: string;
  coverUrl?: string;
  tags?: string[];
}

const DEMO_TRACKS: Track[] = [
  { _id: 'track_001', title: 'Neon Nights', artist: 'Cyber Dreams', genre: 'Electronic', bpm: 128, duration: '4:32', price: 89, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverUrl: '/cyber.jpg', tags: ['synthwave', 'neon'] },
  { _id: 'track_002', title: 'Urban Flow', artist: 'Street Beats', genre: 'Hip Hop', bpm: 95, duration: '3:45', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverUrl: '/logo.png', tags: ['urban', 'flow'] },
  { _id: 'track_003', title: 'Midnight Jazz', artist: 'Smooth Operator', genre: 'Jazz', bpm: 110, duration: '5:12', price: 75, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverUrl: '/pembe.jpg', tags: ['jazz', 'smooth'] },
];

export default function FavoritesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const favoriteIds = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
      const favoriteTracks = DEMO_TRACKS.filter(track => favoriteIds.includes(track._id));
      setFavorites(favoriteTracks);
    } catch (error) {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = (trackId: string) => {
    try {
      const favoriteIds = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
      const newFavorites = favoriteIds.filter((id: string) => id !== trackId);
      safeStorage.setItem('shiroa_favorites', JSON.stringify(newFavorites));
      setFavorites(favorites.filter(track => track._id !== trackId));
    } catch (error) {
      console.error('Failed to remove favorite');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Heart size={32} className="text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold theme-text font-orbitron">Your Favorites</h1>
              <p className="theme-text-secondary mt-2">{favorites.length} tracks saved</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((track) => (
              <div
                key={track._id}
                className="group relative theme-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFavorite(track._id)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-red-500/20 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/40 transition-all"
                >
                  <Trash2 size={18} className="text-red-400" />
                </button>

                {/* Cover */}
                <div className="aspect-square rounded-xl mb-4 overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Music size={48} className="theme-text-secondary" />
                </div>

                {/* Info */}
                <Link href={`/tracks/${track._id}`}>
                  <h3 className="text-xl font-bold theme-text mb-1 hover:theme-accent transition-colors">
                    {track.title}
                  </h3>
                  <p className="theme-text-secondary mb-3">{track.artist}</p>

                  <div className="flex items-center gap-3 text-sm theme-text-secondary mb-4">
                    <span>{track.genre}</span>
                    <span>•</span>
                    <span>{track.bpm} BPM</span>
                    <span>•</span>
                    <span>{track.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold theme-text">${track.price}</span>
                    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-bold hover:scale-105 transition-all">
                      Buy Now
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Heart size={64} className="theme-text-secondary" />
            </div>
            <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">No Favorites Yet</h2>
            <p className="theme-text-secondary text-lg mb-8 max-w-md mx-auto">
              Start exploring our catalog and save tracks you love by clicking the heart icon
            </p>
            <Link
              href="/tracks"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl"
            >
              <Music size={20} />
              Browse Tracks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

