"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#00CED1]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
              <Image src="/logo.svg" alt="SHIROA" fill className="object-contain" priority />
            </div>
            <span className="text-2xl font-bold font-[family-name:var(--font-orbitron)] text-[#00CED1] group-hover:text-white transition-colors duration-300">
              SHIROA
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/tracks" className="text-gray-300 hover:text-[#00CED1] transition-colors">
              Tracks
            </Link>

            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                  Dashboard
                </Link>
                <Link href="/purchases" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                  Purchases
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link href="/admin" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                      Upload
                    </Link>
                    <Link href="/admin/tracks" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                      Manage
                    </Link>
                  </>
                )}
                <Link href="/profile" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-[#1e3a5f]/50 text-gray-300 rounded-lg hover:bg-[#1e3a5f] transition-colors border border-[#00CED1]/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-[#00CED1] transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 bg-[#00CED1] text-[#0a1628] font-bold rounded-lg hover:bg-[#5FE0E5] transition-all shadow-[0_0_15px_rgba(0,206,209,0.3)] hover:shadow-[0_0_20px_rgba(0,206,209,0.5)]">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#00CED1]/20 py-4">
            <div className="flex flex-col gap-4">
              <Link href="/tracks" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                Tracks
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                    Dashboard
                  </Link>
                  <Link href="/purchases" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                    Purchases
                  </Link>
                  {user.role === "admin" && (
                    <>
                      <Link href="/admin" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                        Upload
                      </Link>
                      <Link href="/admin/tracks" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                        Manage
                      </Link>
                    </>
                  )}
                  <Link href="/profile" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left px-4 py-2 bg-[#1e3a5f]/50 text-gray-300 rounded-lg hover:bg-[#1e3a5f] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300 hover:text-[#00CED1] transition-colors px-4">
                    Login
                  </Link>
                  <Link href="/register" className="mx-4 px-4 py-2 bg-[#00CED1] text-[#0a1628] font-bold rounded-lg hover:bg-[#5FE0E5] transition-all text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
