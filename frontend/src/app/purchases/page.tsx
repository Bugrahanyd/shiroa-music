"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

export default function PurchasesPage() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await api.getPurchases();
        setPurchases(data);
      } catch (error) {
        console.error("Failed to fetch purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPurchases();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDownload = async (purchaseId: string) => {
    try {
      const { downloadUrl } = await api.downloadPurchase(purchaseId);
      window.open(downloadUrl, "_blank");
    } catch (error) {
      alert("Download failed. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#00CED1] mb-4">Please Login</h1>
          <Link href="/login" className="text-zinc-400 hover:text-[#00CED1]">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
        <div className="text-[#00CED1] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00CED1] mb-8 font-[family-name:var(--font-orbitron)]">
          My Purchases
        </h1>

        {purchases.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg mb-6">You haven't purchased any tracks yet.</p>
            <Link
              href="/tracks"
              className="inline-block px-6 py-3 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors"
            >
              Browse Tracks
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {purchase.trackId?.title || "Unknown Track"}
                  </h3>
                  <p className="text-zinc-400 mb-2">
                    {purchase.trackId?.artist || "Unknown Artist"}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span>Purchased: {new Date(purchase.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>${purchase.amount}</span>
                    <span>•</span>
                    <span className="text-[#00CED1]">{purchase.status}</span>
                  </div>
                  {purchase.licenseKey && (
                    <div className="mt-2">
                      <span className="text-xs text-zinc-500">License: </span>
                      <code className="text-xs bg-zinc-800 px-2 py-1 rounded text-[#00CED1]">
                        {purchase.licenseKey}
                      </code>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownload(purchase._id)}
                    className="px-6 py-3 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors"
                  >
                    Download
                  </button>
                  <Link
                    href={`/tracks/${purchase.trackId?._id}`}
                    className="px-6 py-3 bg-zinc-800 text-zinc-300 font-bold rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    View Track
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
