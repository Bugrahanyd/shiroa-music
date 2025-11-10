const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

class ApiClient {
  private getHeaders() {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  // Auth
  async register(data: { email: string; password: string; name: string }) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken })
    });
  }

  async getProfile() {
    return this.request("/auth/profile");
  }

  // Tracks
  async getTracks(genre?: string) {
    const query = genre ? `?genre=${genre}` : "";
    return this.request(`/tracks${query}`);
  }

  async getTrack(id: string) {
    return this.request(`/tracks/${id}`);
  }

  async createTrack(data: any) {
    return this.request("/tracks", {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  // Payment
  async createCheckout(trackId: string) {
    return this.request("/payment/create-checkout", {
      method: "POST",
      body: JSON.stringify({ trackId })
    });
  }

  async getPurchases() {
    return this.request("/payment/purchases");
  }

  // Analytics
  async trackView(trackId: string) {
    return this.request(`/analytics/track/${trackId}/view`, {
      method: "POST"
    });
  }

  async trackPlay(trackId: string) {
    return this.request(`/analytics/track/${trackId}/play`, {
      method: "POST"
    });
  }

  async getPopularTracks() {
    return this.request("/analytics/popular");
  }

  // Download
  async downloadPurchase(purchaseId: string) {
    return this.request(`/download/purchase/${purchaseId}`);
  }
}

export const api = new ApiClient();
