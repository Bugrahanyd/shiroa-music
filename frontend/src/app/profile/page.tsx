"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, MapPin, FileText, Edit2, LogOut, Music, TrendingUp, ShoppingBag } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: (user as any)?.bio || "",
    location: (user as any)?.location || ""
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center theme-card rounded-2xl p-12">
          <h1 className="text-2xl font-bold theme-text mb-4">Please Login</h1>
          <Link href="/login" className="theme-accent hover:opacity-80">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    alert("Profile update coming soon!");
    setEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold theme-text mb-8 font-orbitron">My Profile</h1>

      {/* Profile Card */}
      <div className="theme-card rounded-3xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b theme-border">
          {/* Avatar */}
          {(user as any)?.avatarUrl ? (
            <img 
              src={(user as any).avatarUrl} 
              alt={user.name} 
              className="w-32 h-32 rounded-full shadow-xl border-4 border-white/10"
            />
          ) : (
            <div className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl" style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          
          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold theme-text mb-2 font-orbitron">{user.name}</h2>
            <p className="theme-text-secondary mb-3 text-lg">{user.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider" style={{ backgroundColor: 'var(--theme-icon-color)', color: 'white' }}>
                {user.role}
              </span>
              {(user as any)?.location && (
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm theme-bg-secondary theme-text">
                  <MapPin size={14} />
                  {(user as any).location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {(user as any)?.bio && (
          <div className="mb-8 pb-8 border-b theme-border">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={20} className="theme-icon" />
              <h3 className="text-lg font-bold theme-text">Bio</h3>
            </div>
            <p className="theme-text-secondary leading-relaxed">{(user as any).bio}</p>
          </div>
        )}

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm theme-text-secondary font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 theme-card rounded-xl theme-text focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
              />
            </div>

            <div>
              <label className="block text-sm theme-text-secondary font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 theme-card rounded-xl theme-text focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
              />
            </div>

            <div>
              <label className="block text-sm theme-text-secondary font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 theme-card rounded-xl theme-text focus:outline-none focus:ring-2 transition-all"
                placeholder="Istanbul, TR"
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
              />
            </div>

            <div>
              <label className="block text-sm theme-text-secondary font-medium mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 theme-card rounded-xl theme-text focus:outline-none focus:ring-2 transition-all resize-none"
                placeholder="Tell us about yourself..."
                rows={4}
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={handleSave} className="theme-button px-6 py-3 rounded-xl font-semibold">
                Save Changes
              </button>
              <button onClick={() => setEditing(false)} className="theme-button-outline px-6 py-3 rounded-xl font-semibold">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User size={20} className="theme-text-secondary" />
                <div>
                  <p className="theme-text-secondary text-sm">Name</p>
                  <p className="theme-text font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="theme-text-secondary" />
                <div>
                  <p className="theme-text-secondary text-sm">Email</p>
                  <p className="theme-text font-semibold">{user.email}</p>
                </div>
              </div>

              {(user as any)?.location && (
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="theme-text-secondary" />
                  <div>
                    <p className="theme-text-secondary text-sm">Location</p>
                    <p className="theme-text font-semibold">{(user as any).location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button onClick={() => setEditing(true)} className="theme-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
                <Edit2 size={18} />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="px-6 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/purchases" className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer">
          <ShoppingBag size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
          <h3 className="text-xl font-bold theme-text mb-2">My Purchases</h3>
          <p className="theme-text-secondary text-sm">View your purchased tracks</p>
        </Link>

        <Link href="/dashboard" className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer">
          <TrendingUp size={32} className="mb-4" style={{ color: 'var(--theme-accent)' }} />
          <h3 className="text-xl font-bold theme-text mb-2">Dashboard</h3>
          <p className="theme-text-secondary text-sm">View your activity</p>
        </Link>

        <Link href="/tracks" className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer">
          <Music size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)', opacity: 0.8 }} />
          <h3 className="text-xl font-bold theme-text mb-2">Browse Tracks</h3>
          <p className="theme-text-secondary text-sm">Discover new music</p>
        </Link>
      </div>
    </div>
  );
}
