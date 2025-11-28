"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Download, ExternalLink, Calendar, DollarSign, Key } from "lucide-react";

// HARDCODED DUMMY DATA FOR MVP DEMO
const dummyPurchases = [
  { 
    _id: '1', 
    trackId: { title: 'Neon Horizon', artist: 'Hydrabon AI', _id: 't1' }, 
    amount: 29.99, 
    status: 'Completed', 
    createdAt: new Date().toISOString(), 
    licenseKey: 'SH-8823-X99' 
  },
  { 
    _id: '2', 
    trackId: { title: 'Cyberpunk City', artist: 'Shiroa', _id: 't2' }, 
    amount: 19.99, 
    status: 'Completed', 
    createdAt: '2024-11-20', 
    licenseKey: 'SH-1102-B77' 
  },
  { 
    _id: '3', 
    trackId: { title: 'Midnight Drift', artist: 'Neon Vibe', _id: 't3' }, 
    amount: 24.99, 
    status: 'Completed', 
    createdAt: '2024-11-15', 
    licenseKey: 'SH-4451-C22' 
  },
  { 
    _id: '4', 
    trackId: { title: 'Digital Dreams', artist: 'AI Composer', _id: 't4' }, 
    amount: 34.99, 
    status: 'Completed', 
    createdAt: '2024-11-10', 
    licenseKey: 'SH-7788-D44' 
  },
  { 
    _id: '5', 
    trackId: { title: 'Synthwave Sunset', artist: 'Retro Future', _id: 't5' }, 
    amount: 22.99, 
    status: 'Completed', 
    createdAt: '2024-11-05', 
    licenseKey: 'SH-9966-E11' 
  }
];

export default function PurchasesPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // SIMULATE LOADING FOR REALISTIC EXPERIENCE
      setTimeout(() => {
        setPurchases(dummyPurchases);
        setLoading(false);
      }, 800);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDownload = (purchase: any) => {
    // DEMO MODE DOWNLOAD SIMULATION
    alert(`Demo Mode: Download Started...

Track: ${purchase.trackId.title}
Artist: ${purchase.trackId.artist}
License: ${purchase.licenseKey}

In production, this would download:
• High-quality WAV/MP3 files
• Stems and MIDI files
• Commercial license certificate
• Usage guidelines`);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center theme-card p-12 rounded-3xl max-w-md">
          <h1 className="text-3xl font-bold theme-text mb-4 font-orbitron">Access Restricted</h1>
          <p className="theme-text-secondary mb-6">Please login to view your purchases</p>
          <Link 
            href="/login" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl theme-text font-orbitron">Loading your purchases...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold theme-text mb-4 font-orbitron">
            My Purchases
          </h1>
          <p className="theme-text-secondary text-xl">
            Download and manage your licensed tracks
          </p>
          <div className="mt-6 flex items-center justify-center gap-8 text-sm theme-text-secondary">
            <div className="flex items-center gap-2">
              <DollarSign size={16} />
              <span>Total Spent: ${purchases.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download size={16} />
              <span>{purchases.length} Tracks Owned</span>
            </div>
          </div>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-20 theme-card rounded-3xl">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold theme-text mb-4">No Purchases Yet</h2>
            <p className="theme-text-secondary text-lg mb-8 max-w-md mx-auto">
              Start building your music library with exclusive, high-quality tracks
            </p>
            <Link
              href="/tracks"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all"
            >
              Browse Tracks
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="theme-card rounded-3xl p-8 hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  {/* Track Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {purchase.trackId.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold theme-text mb-2 font-orbitron">
                          {purchase.trackId.title}
                        </h3>
                        <p className="theme-text-secondary text-lg mb-3">
                          by {purchase.trackId.artist}
                        </p>
                        
                        {/* Purchase Details */}
                        <div className="flex flex-wrap items-center gap-6 text-sm theme-text-secondary">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>Purchased: {new Date(purchase.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            <span>${purchase.amount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-green-400 font-semibold">{purchase.status}</span>
                          </div>
                        </div>

                        {/* License Key */}
                        <div className="mt-4 p-3 theme-bg-secondary rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <Key size={16} className="theme-accent" />
                            <span className="text-sm font-semibold theme-text">License Key:</span>
                          </div>
                          <code className="text-sm theme-accent font-mono bg-black/20 px-2 py-1 rounded">
                            {purchase.licenseKey}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <button
                      onClick={() => handleDownload(purchase)}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Download size={20} />
                      Download Files
                    </button>
                    <Link
                      href={`/tracks/${purchase.trackId._id}`}
                      className="px-8 py-4 theme-card border-2 theme-border theme-text rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={20} />
                      View Track
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary Card */}
            <div className="theme-card rounded-3xl p-8 text-center">
              <h3 className="text-2xl font-bold theme-text mb-4 font-orbitron">
                Purchase Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold theme-accent mb-2">
                    {purchases.length}
                  </div>
                  <div className="theme-text-secondary">Tracks Owned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold theme-accent mb-2">
                    ${purchases.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                  </div>
                  <div className="theme-text-secondary">Total Invested</div>
                </div>
                <div>
                  <div className="text-3xl font-bold theme-accent mb-2">
                    100%
                  </div>
                  <div className="theme-text-secondary">Commercial Rights</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
