'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import TrackCard from '@/components/TrackCard';
import FilterPanel from '@/components/FilterPanel';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

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
}

// Dummy tracks data for MVP
const dummyTracks: Track[] = [
  // Hip Hop
  { _id: 'test001', title: 'Dark Trap Vibes', artist: 'AI Producer', genre: 'Hip Hop', bpm: 140, duration: '3:24', price: 49, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverUrl: '/cyber.jpg', tags: ['trap', 'dark', 'bass'], isExclusive: true, createdAt: '2024-01-15' },
  { _id: 'test002', title: 'Street Anthem', artist: 'Beat Master', genre: 'Hip Hop', bpm: 85, duration: '2:58', price: 39, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverUrl: '/logo.png', tags: ['street', 'anthem', 'rap'], isExclusive: true, createdAt: '2024-01-14' },
  { _id: 'test003', title: 'Boom Bap Classic', artist: 'Old School AI', genre: 'Hip Hop', bpm: 95, duration: '4:12', price: 59, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverUrl: '/gri.jpg', tags: ['boom bap', 'classic', 'vinyl'], isExclusive: true, createdAt: '2024-01-13' },
  
  // Jazz
  { _id: 'test004', title: 'Midnight Jazz Lounge', artist: 'Smooth AI', genre: 'Jazz', bpm: 120, duration: '5:33', price: 69, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', coverUrl: '/pembe.jpg', tags: ['smooth', 'lounge', 'saxophone'], isExclusive: true, createdAt: '2024-01-12' },
  { _id: 'test005', title: 'Blue Note Harmony', artist: 'Jazz Bot', genre: 'Jazz', bpm: 110, duration: '4:45', price: 79, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverUrl: '/turuncu.jpg', tags: ['blue note', 'harmony', 'piano'], isExclusive: true, createdAt: '2024-01-11' },
  { _id: 'test006', title: 'Swing Time Revival', artist: 'Retro AI', genre: 'Jazz', bpm: 130, duration: '3:21', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', coverUrl: '/logo.png', tags: ['swing', 'revival', 'brass'], isExclusive: true, createdAt: '2024-01-10' },
  
  // Electronic
  { _id: 'test007', title: 'Cyber Dreams', artist: 'Neon AI', genre: 'Electronic', bpm: 128, duration: '6:18', price: 89, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', coverUrl: '/cyber.jpg', tags: ['cyber', 'synthwave', 'futuristic'], isExclusive: true, createdAt: '2024-01-09' },
  { _id: 'test008', title: 'Digital Pulse', artist: 'Techno Master', genre: 'Electronic', bpm: 132, duration: '7:42', price: 99, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', coverUrl: '/gri.jpg', tags: ['techno', 'pulse', 'digital'], isExclusive: true, createdAt: '2024-01-08' },
  { _id: 'test009', title: 'Ambient Spaces', artist: 'Chill AI', genre: 'Electronic', bpm: 90, duration: '8:15', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', coverUrl: '/pembe.jpg', tags: ['ambient', 'chill', 'atmospheric'], isExclusive: true, createdAt: '2024-01-07' },
  
  // Rock
  { _id: 'test010', title: 'Electric Storm', artist: 'Rock AI', genre: 'Rock', bpm: 145, duration: '4:33', price: 75, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', coverUrl: '/turuncu.jpg', tags: ['electric', 'storm', 'guitar'], isExclusive: true, createdAt: '2024-01-06' },
  { _id: 'test011', title: 'Indie Vibes', artist: 'Alternative Bot', genre: 'Rock', bpm: 115, duration: '3:47', price: 45, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', coverUrl: '/logo.png', tags: ['indie', 'alternative', 'melodic'], isExclusive: true, createdAt: '2024-01-05' },
  { _id: 'test012', title: 'Heavy Metal Thunder', artist: 'Metal AI', genre: 'Rock', bpm: 160, duration: '5:12', price: 85, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', coverUrl: '/cyber.jpg', tags: ['heavy', 'metal', 'thunder'], isExclusive: true, createdAt: '2024-01-04' },
  
  // Pop
  { _id: 'test013', title: 'Summer Anthem', artist: 'Pop AI', genre: 'Pop', bpm: 125, duration: '3:35', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', coverUrl: '/pembe.jpg', tags: ['summer', 'anthem', 'catchy'], isExclusive: true, createdAt: '2024-01-03' },
  { _id: 'test014', title: 'Dance Floor Hit', artist: 'Dance Bot', genre: 'Pop', bpm: 128, duration: '3:18', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', coverUrl: '/turuncu.jpg', tags: ['dance', 'hit', 'energetic'], isExclusive: true, createdAt: '2024-01-02' },
  { _id: 'test015', title: 'Ballad Dreams', artist: 'Emotional AI', genre: 'Pop', bpm: 75, duration: '4:22', price: 49, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', coverUrl: '/gri.jpg', tags: ['ballad', 'emotional', 'piano'], isExclusive: true, createdAt: '2024-01-01' },
];

export default function TracksPage() {
  const { user } = useAuth();
  const [tracks] = useState<Track[]>(dummyTracks); // Use dummy data
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(dummyTracks);
  const [loading, setLoading] = useState(false); // No loading for dummy data
  const [error] = useState(''); // No errors for dummy data
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');

  // Filter and search logic
  useEffect(() => {
    let filtered = tracks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(track => 
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.genre.toLowerCase().includes(searchTerm.toLowerCase())
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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold theme-text mb-4 font-orbitron">
            Music Catalog
          </h1>
          <p className="theme-text-secondary text-lg">
            Discover exclusive tracks with full commercial rights
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search tracks, artists, or genres..."
          />
          
          <FilterPanel
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="theme-text-secondary">
            Showing {filteredTracks.length} of {tracks.length} tracks
          </p>
        </div>

        {/* Tracks Grid */}
        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="theme-text-secondary text-lg mb-4">
              No tracks found matching your criteria
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
                setPriceRange([0, 1000]);
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}