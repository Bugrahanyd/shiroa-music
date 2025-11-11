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
    <div className="min-h-screen relative">
      {/* Professional Modern Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] z-[-2]"></div>
      <div className="fixed inset-0 opacity-10 z-[-1]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #00CED1 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-8 border-l-4 border-[#00CED1] pl-6">
          <h1 className="text-5xl font-display font-black text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-[#94a3b8] text-lg">Manage your purchases and downloads</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="group relative bg-gradient-to-br from-[#1e293b] to-[#334155] border border-[#475569] rounded-xl p-6 hover:border-[#00CED1] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#00CED1]/10 rounded-full blur-2xl"></div>
            <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wider">Total Purchases</p>
            <p className="text-5xl font-display font-black text-white group-hover:text-[#00CED1] transition-colors relative z-10">
              {mockPurchases.length}
            </p>
          </div>
          <div className="group relative bg-gradient-to-br from-[#1e293b] to-[#334155] border border-[#475569] rounded-xl p-6 hover:border-[#00CED1] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#00CED1]/10 rounded-full blur-2xl"></div>
            <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wider">Total Spent</p>
            <p className="text-5xl font-display font-black text-white group-hover:text-[#00CED1] transition-colors relative z-10">
              ${mockPurchases.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </p>
          </div>
          <div className="group relative bg-gradient-to-br from-[#1e293b] to-[#334155] border border-[#475569] rounded-xl p-6 hover:border-[#00CED1] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#00CED1]/10 rounded-full blur-2xl"></div>
            <p className="text-[#94a3b8] text-sm font-semibold mb-2 uppercase tracking-wider">Available Downloads</p>
            <p className="text-5xl font-display font-black text-white group-hover:text-[#00CED1] transition-colors relative z-10">
              {mockPurchases.length}
            </p>
          </div>
        </div>

        {/* Purchases List */}
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#00CED1] rounded-full"></span>
            My Purchases
          </h2>

          <div className="space-y-4">
            {mockPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="group bg-gradient-to-r from-[#1e293b] to-[#334155] border border-[#475569] rounded-xl p-6 hover:border-[#00CED1] hover:shadow-[0_0_30px_rgba(0,206,209,0.2)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-[#00CED1] transition-colors">
                      {purchase.trackTitle}
                    </h3>
                    <p className="text-[#94a3b8]">{purchase.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#00CED1]">${purchase.price}</p>
                    <p className="text-[#64748b] text-sm">{purchase.purchaseDate}</p>
                  </div>
                </div>

                <div className="bg-[#0f172a]/80 border border-[#334155] rounded-lg p-4 mb-4">
                  <p className="text-[#94a3b8] text-xs font-semibold mb-1 uppercase tracking-wider">License Key</p>
                  <p className="text-white font-mono text-sm">{purchase.licenseKey}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#00CED1] text-[#0f172a] py-3 rounded-lg font-bold hover:bg-[#00CED1]/80 hover:shadow-[0_0_20px_rgba(0,206,209,0.4)] transition-all">
                    ⬇ Download WAV
                  </button>
                  <button className="flex-1 bg-[#334155] text-white py-3 rounded-lg font-bold hover:bg-[#475569] transition-all">
                    ⬇ Download MP3
                  </button>
                  <button className="px-6 bg-[#334155] text-white py-3 rounded-lg font-bold hover:bg-[#475569] transition-all">
                    📜 License
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mockPurchases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#94a3b8] text-lg mb-6">No purchases yet</p>
              <Link
                href="/tracks"
                className="inline-block bg-[#00CED1] text-[#0f172a] px-8 py-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(0,206,209,0.4)] transition-all"
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
