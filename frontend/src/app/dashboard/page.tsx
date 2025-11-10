"use client";

import Link from "next/link";

const mockPurchases = [
  {
    id: "1",
    trackTitle: "Summer Vibes",
    artist: "DJ Producer",
    purchaseDate: "2024-01-15",
    price: 49.99,
    licenseKey: "SHIROA-1234567890-ABC123"
  },
  {
    id: "2",
    trackTitle: "Dark Ambient",
    artist: "Sound Designer",
    purchaseDate: "2024-01-10",
    price: 39.99,
    licenseKey: "SHIROA-0987654321-XYZ789"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="border-b border-turquoise/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold text-turquoise">
            SHIROA
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tracks" className="text-brand-white hover:text-turquoise transition-colors">
              Browse
            </Link>
            <Link href="/dashboard" className="text-turquoise font-medium">
              Dashboard
            </Link>
            <button className="text-brand-white hover:text-turquoise transition-colors">
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-black text-brand-white mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-400">Manage your purchases and downloads</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-brand-blue/20 border border-turquoise/30 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">Total Purchases</p>
            <p className="text-4xl font-display font-black text-turquoise">
              {mockPurchases.length}
            </p>
          </div>
          <div className="bg-brand-blue/20 border border-turquoise/30 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">Total Spent</p>
            <p className="text-4xl font-display font-black text-turquoise">
              ${mockPurchases.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-brand-blue/20 border border-turquoise/30 rounded-2xl p-6">
            <p className="text-gray-400 mb-2">Available Downloads</p>
            <p className="text-4xl font-display font-black text-turquoise">
              {mockPurchases.length}
            </p>
          </div>
        </div>

        {/* Purchases List */}
        <div>
          <h2 className="text-2xl font-display font-bold text-brand-white mb-6">
            My Purchases
          </h2>

          <div className="space-y-4">
            {mockPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="bg-brand-blue/20 border border-turquoise/30 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-white mb-1">
                      {purchase.trackTitle}
                    </h3>
                    <p className="text-gray-400">{purchase.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-turquoise">${purchase.price}</p>
                    <p className="text-gray-500 text-sm">{purchase.purchaseDate}</p>
                  </div>
                </div>

                <div className="bg-brand-black/50 rounded-xl p-4 mb-4">
                  <p className="text-gray-400 text-sm mb-1">License Key</p>
                  <p className="text-brand-white font-mono text-sm">{purchase.licenseKey}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-turquoise text-brand-black py-3 rounded-full font-bold hover:bg-turquoise-soft transition-colors">
                    Download WAV
                  </button>
                  <button className="flex-1 bg-brand-blue/40 text-brand-white py-3 rounded-full font-bold hover:bg-brand-blue/60 transition-colors">
                    Download MP3
                  </button>
                  <button className="px-6 bg-brand-blue/40 text-brand-white py-3 rounded-full font-bold hover:bg-brand-blue/60 transition-colors">
                    License
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mockPurchases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-6">No purchases yet</p>
              <Link
                href="/tracks"
                className="inline-block bg-turquoise text-brand-black px-8 py-4 rounded-full font-bold hover:bg-turquoise-soft transition-colors"
              >
                Browse Tracks
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
