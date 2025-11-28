import { safeStorage } from './storage';
import { FALLBACK_TRACKS, FALLBACK_PURCHASES } from '@/data/mock-data';
import { ErrorHandler } from './error-handler';

// HTTP Client with automatic token handling
class APIClient {
  private getHeaders(): HeadersInit {
    const token = safeStorage.getItem('access_token');
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
      ErrorHandler.handle(error, 'login');
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
      const demoUser = safeStorage.getItem('shiroa_demo_user');
      if (demoUser) {
        return JSON.parse(demoUser);
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
      const localFavorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
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
      const favorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
      if (!favorites.includes(trackId)) {
        favorites.push(trackId);
        safeStorage.setItem('shiroa_favorites', JSON.stringify(favorites));
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
      const favorites = JSON.parse(safeStorage.getItem('shiroa_favorites') || '[]');
      const newFavorites = favorites.filter((id: string) => id !== trackId);
      safeStorage.setItem('shiroa_favorites', JSON.stringify(newFavorites));
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
