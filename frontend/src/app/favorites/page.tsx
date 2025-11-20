'use client';

import { useState, useEffect } from 'react';
import { Heart, Music } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import TrackCard from '@/components/TrackCard';

export default function FavoritesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await api.getFavorites();
      setFavorites(data.map((fav: any) => fav.trackId));
    } catch (error) {
      console.error('Failed to load favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="theme-icon" size={32} />
          <h1 className="text-4xl font-bold theme-text font-orbitron">Your Favorites</h1>
        </div>
        <p className="theme-text-secondary">Tracks you've saved for later</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="theme-card rounded-2xl p-6 animate-pulse">
              <div className="h-32 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(track => (
            <TrackCard key={track._id} track={track} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 theme-card rounded-3xl">
          <Music className="mx-auto mb-4 theme-text-secondary" size={64} />
          <h3 className="text-2xl font-bold theme-text mb-2">No favorites yet</h3>
          <p className="theme-text-secondary mb-6">Start exploring and save tracks you love</p>
          <button
            onClick={() => router.push('/tracks')}
            className="theme-button px-8 py-3 rounded-full font-semibold"
          >
            Browse Tracks
          </button>
        </div>
      )}
    </div>
  );
}
