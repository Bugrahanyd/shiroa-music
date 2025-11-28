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

// Real track data with Cloudinary URLs
const sampleTracks: Track[] = [
  { _id: 'track_001', title: 'Aşkın İzleri', artist: 'HYDRABON', genre: 'Arabesk Pop', bpm: 95, duration: '3:00', price: 49.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643198/A%C5%9Fk%C4%B1n_%C4%B0zleri_l7akjc.wav', coverUrl: '/pembe.png', tags: ['arabesk', 'pop', 'turkish'], isExclusive: true, createdAt: '2024-01-15', status: 'available' },
  { _id: 'track_002', title: 'Kalbimde İz Bırak', artist: 'HYDRABON', genre: 'Arabesk Pop', bpm: 90, duration: '3:20', price: 54.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643141/Kalbimde_%C4%B0z_B%C4%B1rak_bqkdka.wav', coverUrl: '/pembe.png', tags: ['arabesk', 'pop', 'ballad'], isExclusive: true, createdAt: '2024-01-14', status: 'available' },
  { _id: 'track_003', title: 'Bıraktın Yalnızlığa', artist: 'HYDRABON', genre: 'Arabesk Rap', bpm: 85, duration: '3:10', price: 59.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643072/B%C4%B1rakt%C4%B1n_Yaln%C4%B1zl%C4%B1%C4%9Fa_yusand.wav', coverUrl: '/gri.png', tags: ['arabesk', 'rap', 'emotional'], isExclusive: true, createdAt: '2024-01-13', status: 'available' },
  { _id: 'track_004', title: 'Dokunamam', artist: 'HYDRABON', genre: 'Arabesk Rap', bpm: 88, duration: '3:05', price: 59.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643127/Dokunamam_ffqoty.wav', coverUrl: '/gri.png', tags: ['arabesk', 'rap', 'deep'], isExclusive: true, createdAt: '2024-01-12', status: 'available' },
  { _id: 'track_005', title: 'Gece Boyunca', artist: 'HYDRABON', genre: 'Arabesk Rap', bpm: 92, duration: '3:15', price: 64.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643140/Gece_Boyunca_y5f4tz.wav', coverUrl: '/logo.png', tags: ['arabesk', 'rap', 'night'], isExclusive: true, createdAt: '2024-01-11', status: 'available' },
  { _id: 'track_006', title: 'Senden Yoksun', artist: 'HYDRABON', genre: 'Arabesk Rap', bpm: 90, duration: '3:05', price: 59.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643062/Senden_Yoksun_uoec8r.wav', coverUrl: '/gri.png', tags: ['arabesk', 'rap', 'sad'], isExclusive: true, createdAt: '2024-01-10', status: 'available' },
  { _id: 'track_007', title: 'Kaybolmuş Kalbim', artist: 'HYDRABON', genre: 'Arabesk Rap', bpm: 87, duration: '3:10', price: 59.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643056/Kaybolmu%C5%9F_Kalbim_b7nhsm.wav', coverUrl: '/gri.png', tags: ['arabesk', 'rap', 'emotional'], isExclusive: true, createdAt: '2024-01-09', status: 'available' },
  { _id: 'track_008', title: 'Inferno Circuit', artist: 'Fatih', genre: 'Electronic', bpm: 128, duration: '3:30', price: 69.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643068/Inferno_Circuit_ecdjhs.wav', coverUrl: '/cyber.png', tags: ['electronic', 'energetic', 'intense'], isExclusive: true, createdAt: '2024-01-08', status: 'available' },
  { _id: 'track_009', title: 'Instrumental Inferno', artist: 'Fatih', genre: 'Electronic', bpm: 130, duration: '3:25', price: 69.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643095/Instrumental_Inferno_zzvawt.wav', coverUrl: '/cyber.png', tags: ['electronic', 'instrumental', 'fire'], isExclusive: true, createdAt: '2024-01-07', status: 'available' },
  { _id: 'track_010', title: 'Echoes of Tomorrow', artist: 'HYDRABON', genre: 'Ambient', bpm: 75, duration: '3:40', price: 54.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643217/Echoes_of_Tomorrow_ulhizs.wav', coverUrl: '/logo.png', tags: ['ambient', 'atmospheric', 'chill'], isExclusive: true, createdAt: '2024-01-06', status: 'available' },
  { _id: 'track_011', title: 'Whispers in the Ashes', artist: 'HYDRABON', genre: 'Ambient', bpm: 70, duration: '3:50', price: 54.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643214/Whispers_in_the_Ashes_qhryfk.wav', coverUrl: '/logo.png', tags: ['ambient', 'dark', 'atmospheric'], isExclusive: true, createdAt: '2024-01-05', status: 'available' },
  { _id: 'track_012', title: 'Çalkala', artist: 'Zirzop', genre: 'Experimental', bpm: 140, duration: '2:55', price: 44.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643074/%C3%87alkala_ruldvf.wav', coverUrl: '/turuncu.png', tags: ['experimental', 'hip-hop', 'turkish'], isExclusive: true, createdAt: '2024-01-04', status: 'available' },
  { _id: 'track_013', title: 'KAOS', artist: 'Zirzop', genre: 'Experimental', bpm: 145, duration: '2:45', price: 44.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643023/KAOS_bleor3.wav', coverUrl: '/turuncu.png', tags: ['experimental', 'chaos', 'intense'], isExclusive: true, createdAt: '2024-01-03', status: 'available' },
  { _id: 'track_014', title: 'PAPAPAPA', artist: 'Zirzop', genre: 'Experimental', bpm: 150, duration: '2:40', price: 39.99, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643001/PAPAPAPA_mu9ahw.wav', coverUrl: '/turuncu.png', tags: ['experimental', 'energetic', 'unique'], isExclusive: true, createdAt: '2024-01-02', status: 'available' }
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
        
        // Load real tracks data
        await new Promise(resolve => setTimeout(resolve, 500));
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

