"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

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

  const handleSave = async () => {
    alert("Profile update coming soon!");
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#00CED1] mb-8 font-[family-name:var(--font-orbitron)]">
          My Profile
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-zinc-800">
            <div className="w-24 h-24 bg-[#00CED1] rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#0C0C0C]">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
              <p className="text-zinc-400">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-[#00CED1]/20 text-[#00CED1] rounded-full text-sm font-medium">
                {user.role}
              </span>
            </div>
          </div>

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-[#00CED1] focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-zinc-800 text-zinc-300 font-bold rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Name</label>
                <p className="text-white text-lg">{user.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Email</label>
                <p className="text-white text-lg">{user.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Role</label>
                <p className="text-white text-lg capitalize">{user.role}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">Member Since</label>
                <p className="text-white text-lg">January 2024</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-2 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Link
            href="/purchases"
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-[#00CED1] transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-2">My Purchases</h3>
            <p className="text-zinc-400 text-sm">View your purchased tracks</p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-[#00CED1] transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-2">Dashboard</h3>
            <p className="text-zinc-400 text-sm">View your activity</p>
          </Link>

          <Link
            href="/tracks"
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-[#00CED1] transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-2">Browse Tracks</h3>
            <p className="text-zinc-400 text-sm">Discover new music</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
