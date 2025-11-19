"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Download, FileText, Music, TrendingUp } from "lucide-react";

const mockPurchases = [
  { id: "1", trackTitle: "Summer Vibes", artist: "DJ Producer", purchaseDate: "2024-01-15", price: 299, licenseKey: "SHIROA-1234567890" },
  { id: "2", trackTitle: "Dark Ambient", artist: "Sound Designer", purchaseDate: "2024-01-10", price: 199, licenseKey: "SHIROA-0987654321" }
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold theme-text mb-2 font-orbitron">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="theme-text-secondary text-lg">Manage your music library and downloads</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--theme-icon-color)' }}>
              <Music className="text-white" size={24} />
            </div>
            <div>
              <p className="theme-text-secondary text-sm">Total Purchases</p>
              <p className="text-3xl font-bold theme-text">{mockPurchases.length}</p>
            </div>
          </div>
        </div>

        <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--theme-accent)' }}>
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="theme-text-secondary text-sm">Total Spent</p>
              <p className="text-3xl font-bold theme-text">${mockPurchases.reduce((sum, p) => sum + p.price, 0)}</p>
            </div>
          </div>
        </div>

        <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--theme-icon-color)', opacity: 0.8 }}>
              <Download className="text-white" size={24} />
            </div>
            <div>
              <p className="theme-text-secondary text-sm">Downloads</p>
              <p className="text-3xl font-bold theme-text">{mockPurchases.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchases Section */}
      <div>
        <h2 className="text-3xl font-bold theme-text mb-6 font-orbitron">My Purchases</h2>

        {mockPurchases.length > 0 ? (
          <div className="space-y-4">
            {mockPurchases.map((purchase) => (
              <div key={purchase.id} className="theme-card rounded-2xl p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold theme-text mb-1">{purchase.trackTitle}</h3>
                    <p className="theme-text-secondary">{purchase.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: 'var(--theme-icon-color)' }}>${purchase.price}</p>
                    <p className="theme-text-secondary text-sm">{purchase.purchaseDate}</p>
                  </div>
                </div>

                {/* License Key */}
                <div className="theme-bg-secondary rounded-xl p-4 mb-4">
                  <p className="theme-text-secondary text-xs mb-1 uppercase">License Key</p>
                  <p className="theme-text font-mono text-sm">{purchase.licenseKey}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white" style={{ background: 'var(--theme-icon-color)' }}>
                    <Download size={18} />
                    WAV
                  </button>
                  <button className="theme-button-outline py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <Download size={18} />
                    MP3
                  </button>
                  <button className="theme-button-outline py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <FileText size={18} />
                    License
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 theme-card rounded-2xl">
            <Music size={64} className="mx-auto mb-4 theme-text-secondary opacity-50" />
            <p className="theme-text-secondary text-lg mb-6">No purchases yet</p>
            <Link href="/tracks" className="theme-button px-8 py-3 rounded-full font-semibold inline-block">
              Browse Tracks
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
