'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Bell, User, LogOut, Menu } from 'lucide-react';

export default function TopNavigation() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getGradientClass = () => {
    switch (theme) {
      case 'japanese':
        return 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600';
      case 'neon':
        return 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500';
      case 'dark':
        return 'bg-gradient-to-r from-gray-400 via-blue-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 theme-bg theme-border-b backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center justify-between h-full px-4 ml-16 lg:ml-64">
        
        {/* Logo + Animated Text */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold theme-text font-orbitron mr-2">SHIROA</span>
            <div className={`text-sm font-medium ${getGradientClass()} bg-clip-text text-transparent animate-pulse`}>
              Everything for your sound
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Quick Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className="px-3 py-2 rounded-lg theme-hover theme-text-secondary hover:theme-text transition-colors">
              Home
            </Link>
            <Link href="/tracks" className="px-3 py-2 rounded-lg theme-hover theme-text-secondary hover:theme-text transition-colors">
              Tracks
            </Link>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg theme-hover">
            <Bell size={20} className="theme-text-secondary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg theme-hover"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden md:block theme-text">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 theme-bg theme-border rounded-lg shadow-lg py-2">
                  <Link href="/profile" className="block px-4 py-2 theme-hover theme-text">
                    Profile
                  </Link>
                  <Link href="/dashboard" className="block px-4 py-2 theme-hover theme-text">
                    Dashboard
                  </Link>
                  <hr className="my-2 theme-border" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 theme-hover theme-text flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg theme-hover theme-text-secondary hover:theme-text transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}