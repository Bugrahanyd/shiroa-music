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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center theme-card p-12 rounded-3xl">
          <h1 className="text-2xl font-bold theme-text mb-4">Please Login</h1>
          <Link href="/login" className="theme-accent hover:opacity-80">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="theme-accent text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold theme-text mb-2 font-orbitron">
          My Purchases
        </h1>
        <p className="theme-text-secondary">Download and manage your licensed tracks</p>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-20 theme-card rounded-3xl">
          <p className="theme-text-secondary text-lg mb-6">You haven't purchased any tracks yet.</p>
          <Link
            href="/tracks"
            className="theme-button px-8 py-3 rounded-full font-semibold inline-block"
          >
            Browse Tracks
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="theme-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-xl font-bold theme-text mb-1">
                  {purchase.trackId?.title || "Unknown Track"}
                </h3>
                <p className="theme-text-secondary mb-2">
                  {purchase.trackId?.artist || "Unknown Artist"}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm theme-text-secondary">
                  <span>Purchased: {new Date(purchase.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>${purchase.amount}</span>
                  <span>•</span>
                  <span className="theme-accent">{purchase.status}</span>
                </div>
                {purchase.licenseKey && (
                  <div className="mt-2">
                    <span className="text-xs theme-text-secondary">License: </span>
                    <code className="text-xs theme-card px-2 py-1 rounded theme-accent">
                      {purchase.licenseKey}
                    </code>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(purchase._id)}
                  className="theme-button px-6 py-3 rounded-lg font-semibold"
                >
                  Download
                </button>
                <Link
                  href={`/tracks/${purchase.trackId?._id}`}
                  className="theme-button-outline px-6 py-3 rounded-lg font-semibold"
                >
                  View Track
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
