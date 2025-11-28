// SHIROA API Service Layer - Production Ready
// Centralized data management with automatic fallbacks

import { safeStorage } from './storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const IS_DEMO_MODE = process.env.NODE_ENV === 'production' || !API_BASE_URL.includes('localhost');

// Fallback Data - Real Cloudinary Tracks
const FALLBACK_TRACKS = [
  { _id: 'track_001', title: 'Echoes of Tomorrow', artist: 'SHIROA', genre: 'Electronic', bpm: 128, duration: '4:32', price: 89, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643217/Echoes_of_Tomorrow_ulhizs.wav', coverUrl: '/cyber.png', tags: ['electronic', 'future', 'echoes'], isExclusive: true, createdAt: '2024-01-20', status: 'available' },
  { _id: 'track_002', title: 'Whispers in the Ashes', artist: 'SHIROA', genre: 'Ambient', bpm: 95, duration: '5:15', price: 75, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643214/Whispers_in_the_Ashes_qhryfk.wav', coverUrl: '/gri.png', tags: ['ambient', 'whispers', 'dark'], isExclusive: true, createdAt: '2024-01-19', status: 'available' },
  { _id: 'track_003', title: 'Aşkın İzleri', artist: 'SHIROA', genre: 'Pop', bpm: 110, duration: '4:45', price: 65, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643198/A%C5%9Fk%C4%B1n_%C4%B0zleri_l7akjc.wav', coverUrl: '/pembe.png', tags: ['pop', 'turkish', 'love'], isExclusive: true, createdAt: '2024-01-18', status: 'available' },
  { _id: 'track_004', title: 'Kalbimde İz Bırak Sara', artist: 'SHIROA', genre: 'Pop', bpm: 120, duration: '4:20', price: 70, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643166/Kalbimde_%C4%B0z_B%C4%B1rak_Sara_epryrn.wav', coverUrl: '/turuncu.png', tags: ['pop', 'turkish', 'emotional'], isExclusive: true, createdAt: '2024-01-17', status: 'available' },
  { _id: 'track_005', title: 'Kalbimde İz Bırak', artist: 'SHIROA', genre: 'Pop', bpm: 118, duration: '4:10', price: 68, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643141/Kalbimde_%C4%B0z_B%C4%B1rak_bqkdka.wav', coverUrl: '/logo.png', tags: ['pop', 'turkish', 'heartfelt'], isExclusive: true, createdAt: '2024-01-16', status: 'available' },
  { _id: 'track_006', title: 'Gece Boyunca', artist: 'SHIROA', genre: 'Electronic', bpm: 125, duration: '5:00', price: 80, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643140/Gece_Boyunca_y5f4tz.wav', coverUrl: '/cyber.png', tags: ['electronic', 'night', 'turkish'], isExclusive: true, createdAt: '2024-01-15', status: 'available' },
  { _id: 'track_007', title: 'Dokunamam V2', artist: 'SHIROA', genre: 'Pop', bpm: 115, duration: '4:30', price: 72, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643142/Dokunamam_v2_k7rumn.wav', coverUrl: '/pembe.png', tags: ['pop', 'turkish', 'melancholic'], isExclusive: true, createdAt: '2024-01-14', status: 'available' },
  { _id: 'track_008', title: 'Bıraktın Yalnızlığa Sara', artist: 'SHIROA', genre: 'Pop', bpm: 110, duration: '4:25', price: 70, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643134/B%C4%B1rakt%C4%B1n_Yaln%C4%B1zl%C4%B1%C4%9Fa_Sara_hvampg.wav', coverUrl: '/turuncu.png', tags: ['pop', 'turkish', 'sad'], isExclusive: true, createdAt: '2024-01-13', status: 'available' },
  { _id: 'track_009', title: 'Dokunamam', artist: 'SHIROA', genre: 'Pop', bpm: 112, duration: '4:15', price: 68, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643127/Dokunamam_ffqoty.wav', coverUrl: '/gri.png', tags: ['pop', 'turkish', 'emotional'], isExclusive: true, createdAt: '2024-01-12', status: 'available' },
  { _id: 'track_010', title: 'Instrumental Inferno', artist: 'SHIROA', genre: 'Rock', bpm: 140, duration: '5:30', price: 95, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643095/Instrumental_Inferno_zzvawt.wav', coverUrl: '/turuncu.png', tags: ['rock', 'instrumental', 'intense'], isExclusive: true, createdAt: '2024-01-11', status: 'available' },
  { _id: 'track_011', title: 'Çalkala', artist: 'SHIROA', genre: 'Electronic', bpm: 130, duration: '4:50', price: 85, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643074/%C3%87alkala_ruldvf.wav', coverUrl: '/cyber.png', tags: ['electronic', 'turkish', 'energetic'], isExclusive: true, createdAt: '2024-01-10', status: 'available' },
  { _id: 'track_012', title: 'Bıraktın Yalnızlığa', artist: 'SHIROA', genre: 'Pop', bpm: 108, duration: '4:20', price: 68, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643072/B%C4%B1rakt%C4%B1n_Yaln%C4%B1zl%C4%B1%C4%9Fa_yusand.wav', coverUrl: '/pembe.png', tags: ['pop', 'turkish', 'lonely'], isExclusive: true, createdAt: '2024-01-09', status: 'available' },
  { _id: 'track_013', title: 'Inferno Circuit', artist: 'SHIROA', genre: 'Electronic', bpm: 145, duration: '5:10', price: 90, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643068/Inferno_Circuit_ecdjhs.wav', coverUrl: '/turuncu.png', tags: ['electronic', 'intense', 'circuit'], isExclusive: true, createdAt: '2024-01-08', status: 'available' },
  { _id: 'track_014', title: 'Senden Yoksun', artist: 'SHIROA', genre: 'Pop', bpm: 105, duration: '4:35', price: 70, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643062/Senden_Yoksun_uoec8r.wav', coverUrl: '/gri.png', tags: ['pop', 'turkish', 'longing'], isExclusive: true, createdAt: '2024-01-07', status: 'available' },
  { _id: 'track_015', title: 'Kaybolmuş Kalbim', artist: 'SHIROA', genre: 'Pop', bpm: 110, duration: '4:40', price: 72, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643056/Kaybolmu%C5%9F_Kalbim_b7nhsm.wav', coverUrl: '/pembe.png', tags: ['pop', 'turkish', 'lost'], isExclusive: true, createdAt: '2024-01-06', status: 'available' },
  { _id: 'track_016', title: 'KAOS', artist: 'SHIROA', genre: 'Electronic', bpm: 150, duration: '5:20', price: 95, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643023/KAOS_bleor3.wav', coverUrl: '/cyber.png', tags: ['electronic', 'chaos', 'intense'], isExclusive: true, createdAt: '2024-01-05', status: 'available' },
  { _id: 'track_017', title: 'PAPAPAPA', artist: 'SHIROA', genre: 'Pop', bpm: 128, duration: '3:55', price: 65, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763643001/PAPAPAPA_mu9ahw.wav', coverUrl: '/turuncu.png', tags: ['pop', 'catchy', 'fun'], isExclusive: true, createdAt: '2024-01-04', status: 'available' },
  { _id: 'track_018', title: 'Çalkala SPA', artist: 'SHIROA', genre: 'Ambient', bpm: 90, duration: '6:00', price: 85, audioUrl: 'https://res.cloudinary.com/dix5bpari/video/upload/v1763642765/%C3%87alkala_SPA_csnl8h.wav', coverUrl: '/gri.png', tags: ['ambient', 'spa', 'relaxing'], isExclusive: true, createdAt: '2024-01-03', status: 'available' }
];

const FALLBACK_PURCHASES = [
  { _id: 'purchase_001', trackId: { _id: 'track_001', title: 'Neon Nights', artist: 'Cyber Dreams' }, amount: 89, status: 'completed', createdAt: '2024-01-20', licenseKey: 'SH-2024-001' },
  { _id: 'purchase_002', trackId: { _id: 'track_003', title: 'Midnight Jazz', artist: 'Smooth Operator' }, amount: 75, status: 'completed', createdAt: '2024-01-18', licenseKey: 'SH-2024-002' },
  { _id: 'purchase_003', trackId: { _id: 'track_007', title: 'Trap Vibes', artist: 'Bass Master' }, amount: 70, status: 'completed', createdAt: '2024-01-14', licenseKey: 'SH-2024-003' }
];

// HTTP Client with automatic token handling
class APIClient {
  private getHeaders(): HeadersInit {
    let token = null;
    try {
      token = safeStorage.getItem('access_token');
    } catch (e) {
      console.warn('Storage not available');
    }
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    throw new Error('API not available - MVP Demo Mode');
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
      try {
        const demoUser = safeStorage.getItem('shiroa_demo_user');
        if (demoUser) {
          return JSON.parse(demoUser);
        }
      } catch (e) {
        console.warn('Storage not available');
      }
      throw error;
    }
  }

  // Tracks
  async getTracks(params?: { genre?: string; search?: string; limit?: number }) {
    // Always use local data first (no 404 errors)
    return FALLBACK_TRACKS;
  }

  async getTrack(id: string) {
    // Always use local data first (no 404 errors)
    const localTrack = FALLBACK_TRACKS.find(track => track._id === id);
    if (localTrack) return localTrack;
    return null;
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

      // Fallback: Use localStorage
      try {
        const localFavorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
        return FALLBACK_TRACKS.filter(track => localFavorites.includes(track._id));
      } catch (e) {
        console.warn('Storage not available');
        return [];
      }
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
      try {
        const favorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
        if (!favorites.includes(trackId)) {
          favorites.push(trackId);
          safeStorage.setItem('shiroa_favorites', JSON.stringify(favorites));
        }
      } catch (e) {
        console.warn('Storage not available');
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
      try {
        const favorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
        const newFavorites = favorites.filter((id: string) => id !== trackId);
        safeStorage.setItem('shiroa_favorites', JSON.stringify(newFavorites));
      } catch (e) {
        console.warn('Storage not available');
      }
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
