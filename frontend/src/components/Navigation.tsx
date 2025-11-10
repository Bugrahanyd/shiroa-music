"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#00CED1] font-[family-name:var(--font-orbitron)]">
            SHIROA
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/tracks" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
              Tracks
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                  Dashboard
                </Link>
                <Link href="/purchases" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                  Purchases
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link href="/admin" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                      Upload
                    </Link>
                    <Link href="/admin/tracks" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                      Manage
                    </Link>
                  </>
                )}
                <Link href="/profile" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-zinc-300 hover:text-[#00CED1] transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-[#00CED1] text-[#0C0C0C] font-bold rounded-lg hover:bg-[#5FE0E5] transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
