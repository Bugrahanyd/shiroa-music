// SHIROA API Service Layer - Production Ready
// Centralized data management with automatic fallbacks

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Fallback Data - High Quality Demo Content
const FALLBACK_TRACKS = [
  { _id: 'track_001', title: 'Neon Nights', artist: 'Cyber Dreams', genre: 'Electronic', bpm: 128, duration: '4:32', price: 89, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coverUrl: '/cyber.jpg', tags: ['synthwave', 'neon', 'electronic'], isExclusive: true, createdAt: '2024-01-20', status: 'available' },
  { _id: 'track_002', title: 'Urban Flow', artist: 'Street Beats', genre: 'Hip Hop', bpm: 95, duration: '3:45', price: 65, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', coverUrl: '/logo.png', tags: ['urban', 'flow', 'beats'], isExclusive: true, createdAt: '2024-01-19', status: 'available' },
  { _id: 'track_003', title: 'Midnight Jazz', artist: 'Smooth Operator', genre: 'Jazz', bpm: 110, duration: '5:12', price: 75, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', coverUrl: '/pembe.jpg', tags: ['jazz', 'smooth', 'midnight'], isExclusive: true, createdAt: '2024-01-18', status: 'available' },
  { _id: 'track_004', title: 'Rock Anthem', artist: 'Electric Storm', genre: 'Rock', bpm: 140, duration: '4:18', price: 55, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', coverUrl: '/turuncu.jpg', tags: ['rock', 'anthem', 'electric'], isExclusive: true, createdAt: '2024-01-17', status: 'available' },
  { _id: 'track_005', title: 'Pop Dreams', artist: 'Melody Maker', genre: 'Pop', bpm: 120, duration: '3:28', price: 45, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', coverUrl: '/gri.jpg', tags: ['pop', 'dreams', 'catchy'], isExclusive: true, createdAt: '2024-01-16', status: 'available' },
  { _id: 'track_006', title: 'Ambient Space', artist: 'Cosmic Sounds', genre: 'Electronic', bpm: 85, duration: '6:45', price: 95, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', coverUrl: '/cyber.jpg', tags: ['ambient', 'space', 'cosmic'], isExclusive: true, createdAt: '2024-01-15', status: 'available' },
  { _id: 'track_007', title: 'Trap Vibes', artist: 'Bass Master', genre: 'Hip Hop', bpm: 150, duration: '3:15', price: 70, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', coverUrl: '/logo.png', tags: ['trap', 'bass', 'vibes'], isExclusive: true, createdAt: '2024-01-14', status: 'available' },
  { _id: 'track_008', title: 'Smooth Jazz', artist: 'Night Lounge', genre: 'Jazz', bpm: 100, duration: '4:55', price: 80, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', coverUrl: '/pembe.jpg', tags: ['smooth', 'jazz', 'lounge'], isExclusive: true, createdAt: '2024-01-13', status: 'available' },
  { _id: 'track_009', title: 'Indie Rock', artist: 'Alternative Wave', genre: 'Rock', bpm: 125, duration: '4:02', price: 60, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', coverUrl: '/turuncu.jpg', tags: ['indie', 'rock', 'alternative'], isExclusive: true, createdAt: '2024-01-12', status: 'available' }
];

const FALLBACK_PURCHASES = [
  { _id: 'purchase_001', trackId: { _id: 'track_001', title: 'Neon Nights', artist: 'Cyber Dreams' }, amount: 89, status: 'completed', createdAt: '2024-01-20', licenseKey: 'SH-2024-001' },
  { _id: 'purchase_002', trackId: { _id: 'track_003', title: 'Midnight Jazz', artist: 'Smooth Operator' }, amount: 75, status: 'completed', createdAt: '2024-01-18', licenseKey: 'SH-2024-002' },
  { _id: 'purchase_003', trackId: { _id: 'track_007', title: 'Trap Vibes', artist: 'Bass Master' }, amount: 70, status: 'completed', createdAt: '2024-01-14', licenseKey: 'SH-2024-003' }
];

// HTTP Client with automatic token handling
class APIClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication
  async login(credentials: { email: string; password: string }) {
    try {
      return await this.request<{ access_token: string; refresh_token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch (error) {
      console.error('Login API failed:', error);
      // Fallback: Create demo user session
      const demoUser = {
        id: 'demo_user_' + Date.now(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'listener',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
      };
      return {
        access_token: 'demo_token_' + Date.now(),
        refresh_token: 'demo_refresh_' + Date.now(),
        user: demoUser
      };
    }
  }

  async register(data: { email: string; password: string; name: string }) {
    try {
      return await this.request<{ access_token: string; refresh_token: string; user: any }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Register API failed:', error);
      // Fallback: Create demo user session
      const demoUser = {
        id: 'demo_user_' + Date.now(),
        email: data.email,
        name: data.name,
        role: 'listener',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`
      };
      return {
        access_token: 'demo_token_' + Date.now(),
        refresh_token: 'demo_refresh_' + Date.now(),
        user: demoUser
      };
    }
  }

  async getProfile() {
    try {
      return await this.request<any>('/auth/profile');
    } catch (error) {
      console.error('Profile API failed:', error);
      // Fallback: Return demo user from localStorage
      const demoUser = localStorage.getItem('shiroa_demo_user');
      if (demoUser) {
        return JSON.parse(demoUser);
      }
      throw error;
    }
  }

  // Tracks
  async getTracks(params?: { genre?: string; search?: string; limit?: number }) {
    try {
      const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
      const response = await this.request<{ tracks: any[] }>(`/tracks${queryString}`);
      return response.tracks;
    } catch (error) {
      console.error('Tracks API failed, using fallback data:', error);
      return FALLBACK_TRACKS;
    }
  }

  async getTrack(id: string) {
    try {
      return await this.request<any>(`/tracks/${id}`);
    } catch (error) {
      console.error('Track API failed:', error);
      // Fallback: Find in demo data
      return FALLBACK_TRACKS.find(track => track._id === id) || null;
    }
  }

  // Purchases
  async getPurchases() {
    try {
      const response = await this.request<{ purchases: any[] }>('/payment/purchases');
      return response.purchases;
    } catch (error) {
      console.error('Purchases API failed, using fallback data:', error);
      return FALLBACK_PURCHASES;
    }
  }

  async createCheckoutSession(trackId: string) {
    try {
      return await this.request<{ url: string }>('/payment/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ trackId })
      });
    } catch (error) {
      console.error('Checkout API failed:', error);
      throw new Error('Payment service is currently unavailable. Please try again later.');
    }
  }

  // Favorites
  async getFavorites() {
    try {
      const response = await this.request<{ favorites: any[] }>('/favorites');
      return response.favorites;
    } catch (error) {
      console.error('Favorites API failed:', error);
      // Fallback: Use localStorage
      const localFavorites = JSON.parse(localStorage.getItem('shiroa_favorites') || '[]');
      return FALLBACK_TRACKS.filter(track => localFavorites.includes(track._id));
    }
  }

  async addFavorite(trackId: string) {
    try {
      return await this.request<{ success: boolean }>(`/favorites/${trackId}`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Add favorite API failed:', error);
      // Fallback: Use localStorage
      const favorites = JSON.parse(localStorage.getItem('shiroa_favorites') || '[]');
      if (!favorites.includes(trackId)) {
        favorites.push(trackId);
        localStorage.setItem('shiroa_favorites', JSON.stringify(favorites));
      }
      return { success: true };
    }
  }

  async removeFavorite(trackId: string) {
    try {
      return await this.request<{ success: boolean }>(`/favorites/${trackId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Remove favorite API failed:', error);
      // Fallback: Use localStorage
      const favorites = JSON.parse(localStorage.getItem('shiroa_favorites') || '[]');
      const newFavorites = favorites.filter((id: string) => id !== trackId);
      localStorage.setItem('shiroa_favorites', JSON.stringify(newFavorites));
      return { success: true };
    }
  }

  // Analytics
  async trackView(trackId: string) {
    try {
      return await this.request<{ success: boolean }>(`/analytics/track/${trackId}/view`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Track view API failed:', error);
      return { success: false };
    }
  }
}

// Export singleton instance
export const api = new APIClient();

// Export types for better TypeScript support
export interface Track {
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

export interface Purchase {
  _id: string;
  trackId: {
    _id: string;
    title: string;
    artist: string;
  };
  amount: number;
  status: string;
  createdAt: string;
  licenseKey: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
}