'use client';
import { safeStorage } from '@/lib/storage';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import TrackCard from '@/components/TrackCard';
import FilterPanel from '@/components/FilterPanel';
import SearchBar from '@/components/SearchBar';
import { Filter, X } from 'lucide-react';

interface Track {
  _id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  duration: string;
  price: number;
  audioUrl: string;
  coverUrl?: string;
  tags: string[];
  isExclusive: boolean;
  createdAt: string;
  status: 'available' | 'sold';
}

// Realistic track data structure for API compatibility
const sampleTracks: Track[] = [
  { _id: 'track_001', title: 'Dark Trap Vibes', artist: 'AI Producer', genre: 'Hip Hop', bpm: 140, duration: '3:24', price: 49, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverUrl: '/cyber.jpg', tags: ['trap', 'dark', 'bass'], isExclusive: true, createdAt: '2024-01-15', status: 'available' },
  { _id: 'track_002', title: 'Street Anthem', artist: 'Beat Master', genre: 'Hip Hop', bpm: 85, duration: '2:58', price: 39, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverUrl: '/logo.png', tags: ['street', 'anthem', 'rap'], isExclusive: true, createdAt: '2024-01-14', status: 'available' },
  { _id: 'track_003', title: 'Boom Bap Classic', artist: 'Old School AI', genre: 'Hip Hop', bpm: 95, duration: '4:12', price: 59, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverUrl: '/gri.jpg', tags: ['boom bap', 'classic', 'vinyl'], isExclusive: true, createdAt: '2024-01-13', status: 'available' },
  { _id: 'track_004', title: 'Midnight Jazz Lounge', artist: 'Smooth AI', genre: 'Jazz', bpm: 120, duration: '5:33', price: 69, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', coverUrl: '/pembe.jpg', tags: ['smooth', 'lounge', 'saxophone'], isExclusive: true, createdAt: '2024-01-12', status: 'available' },
  { _id: 'track_005', title: 'Blue Note Harmony', artist: 'Jazz Bot', genre: 'Jazz', bpm: 110, duration: '4:45', price: 79, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverUrl: '/turuncu.jpg', tags: ['blue note', 'harmony', 'piano'], isExclusive: true, createdAt: '2024-01-11', status: 'available' },
  { _id: 'track_006', title: 'Swing Time Revival', artist: 'Retro AI', genre: 'Jazz', bpm: 130, duration: '3:21', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', coverUrl: '/logo.png', tags: ['swing', 'revival', 'brass'], isExclusive: true, createdAt: '2024-01-10', status: 'available' },
  { _id: 'track_007', title: 'Cyber Dreams', artist: 'Neon AI', genre: 'Electronic', bpm: 128, duration: '6:18', price: 89, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', coverUrl: '/cyber.jpg', tags: ['cyber', 'synthwave', 'futuristic'], isExclusive: true, createdAt: '2024-01-09', status: 'available' },
  { _id: 'track_008', title: 'Digital Pulse', artist: 'Techno Master', genre: 'Electronic', bpm: 132, duration: '7:42', price: 99, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', coverUrl: '/gri.jpg', tags: ['techno', 'pulse', 'digital'], isExclusive: true, createdAt: '2024-01-08', status: 'available' },
  { _id: 'track_009', title: 'Ambient Spaces', artist: 'Chill AI', genre: 'Electronic', bpm: 90, duration: '8:15', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', coverUrl: '/pembe.jpg', tags: ['ambient', 'chill', 'atmospheric'], isExclusive: true, createdAt: '2024-01-07', status: 'available' },
  { _id: 'track_010', title: 'Electric Storm', artist: 'Rock AI', genre: 'Rock', bpm: 145, duration: '4:33', price: 75, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', coverUrl: '/turuncu.jpg', tags: ['electric', 'storm', 'guitar'], isExclusive: true, createdAt: '2024-01-06', status: 'available' },
  { _id: 'track_011', title: 'Indie Vibes', artist: 'Alternative Bot', genre: 'Rock', bpm: 115, duration: '3:47', price: 45, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', coverUrl: '/logo.png', tags: ['indie', 'alternative', 'melodic'], isExclusive: true, createdAt: '2024-01-05', status: 'available' },
  { _id: 'track_012', title: 'Heavy Metal Thunder', artist: 'Metal AI', genre: 'Rock', bpm: 160, duration: '5:12', price: 85, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', coverUrl: '/cyber.jpg', tags: ['heavy', 'metal', 'thunder'], isExclusive: true, createdAt: '2024-01-04', status: 'available' },
  { _id: 'track_013', title: 'Summer Anthem', artist: 'Pop AI', genre: 'Pop', bpm: 125, duration: '3:35', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', coverUrl: '/pembe.jpg', tags: ['summer', 'anthem', 'catchy'], isExclusive: true, createdAt: '2024-01-03', status: 'available' },
  { _id: 'track_014', title: 'Dance Floor Hit', artist: 'Dance Bot', genre: 'Pop', bpm: 128, duration: '3:18', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', coverUrl: '/turuncu.jpg', tags: ['dance', 'hit', 'energetic'], isExclusive: true, createdAt: '2024-01-02', status: 'available' },
  { _id: 'track_015', title: 'Ballad Dreams', artist: 'Emotional AI', genre: 'Pop', bpm: 75, duration: '4:22', price: 49, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', coverUrl: '/gri.jpg', tags: ['ballad', 'emotional', 'piano'], isExclusive: true, createdAt: '2024-01-01', status: 'available' }
];

export default function TracksPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tracks from API with fail-safe fallback
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        
        // Always use sample data for fail-safe demo mode
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        setTracks(sampleTracks);
      } catch (error) {
        console.error('Error loading tracks:', error);
        // Even on error, use sample data
        setTracks(sampleTracks);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = tracks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(track => track.genre === selectedGenre);
    }

    // Price range filter
    filtered = filtered.filter(track => 
      track.price >= priceRange[0] && track.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredTracks(filtered);
  }, [tracks, searchTerm, selectedGenre, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl theme-text font-orbitron">
            {language === 'tr' ? 'Parçalar yükleniyor...' : 'Loading tracks...'}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center theme-card p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold theme-text mb-4">
            {language === 'tr' ? 'Bağlantı Hatası' : 'Connection Error'}
          </h2>
          <p className="theme-text-secondary mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
          >
            {language === 'tr' ? 'Tekrar Dene' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold theme-text mb-4 font-orbitron">
            {language === 'tr' ? 'Müzik Kataloğu' : 'Music Catalog'}
          </h1>
          <p className="theme-text-secondary text-lg">
            {language === 'tr' 
              ? 'Tam ticari haklarla özel parçaları keşfedin'
              : 'Discover exclusive tracks with full commercial rights'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Collapsible */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between p-4 theme-card rounded-xl hover:scale-105 transition-all mb-4"
            >
              <div className="flex items-center gap-3">
                <Filter size={20} className="theme-icon" />
                <span className="theme-text font-semibold">
                  {language === 'tr' ? 'Filtreler' : 'Filters'}
                </span>
              </div>
              {showFilters ? <X size={20} /> : <Filter size={20} />}
            </button>

            {/* Filter Panel */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterPanel
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar 
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={language === 'tr' 
                  ? 'Parça, sanatçı veya tür ara...'
                  : 'Search tracks, artists, or genres...'
                }
              />
            </div>

            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="theme-text-secondary">
                {language === 'tr'
                  ? `${tracks.length} parçadan ${filteredTracks.length} tanesi gösteriliyor`
                  : `Showing ${filteredTracks.length} of ${tracks.length} tracks`
                }
              </p>
              
              {(searchTerm || selectedGenre !== 'all' || priceRange[0] > 0 || priceRange[1] < 100) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('all');
                    setPriceRange([0, 100]);
                    setSortBy('newest');
                  }}
                  className="px-4 py-2 theme-bg-secondary theme-text rounded-lg hover:scale-105 transition-all text-sm font-medium"
                >
                  {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
                </button>
              )}
            </div>

            {/* Tracks Grid */}
            {filteredTracks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTracks.map((track) => (
                  <TrackCard key={track._id} track={track} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 theme-card rounded-3xl">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <Filter size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold theme-text mb-4">
                  {language === 'tr' ? 'Parça Bulunamadı' : 'No Tracks Found'}
                </h2>
                <p className="theme-text-secondary text-lg mb-8 max-w-md mx-auto">
                  {language === 'tr'
                    ? 'Arama kriterlerinize uygun parça bulunamadı. Filtreleri değiştirmeyi deneyin.'
                    : 'No tracks match your search criteria. Try adjusting your filters.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedGenre('all');
                    setPriceRange([0, 100]);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
                >
                  {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

