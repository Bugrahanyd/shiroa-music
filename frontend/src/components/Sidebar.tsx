'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { 
  Music, User, Search, 
  ChevronLeft, ChevronRight, Palette, Mic,
  ShoppingCart, BarChart3, Upload, Compass, Heart
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const isOpen = isPinned || isHovered;

  const themes = [
    { id: 'dark', name: 'Night', color: 'bg-gray-900', story: 'Deep focus in the darkness. Where creativity meets silence.' },
    { id: 'light', name: 'Day', color: 'bg-white', story: 'Bright and clear. Perfect for daytime productivity.' },
    { id: 'japanese', name: 'Sakura', color: 'bg-pink-100', story: 'Cherry blossoms in spring. Elegant and peaceful.' },
    { id: 'neon', name: 'Cyber', color: 'bg-purple-900', story: 'Futuristic vibes. Electric dreams and neon lights.' },
    { id: 'sunset', name: 'Sunset', color: 'bg-gradient-to-br from-orange-600 to-red-700', story: 'Warm embrace of the golden hour. Creative fire burns bright.' },
  ];

  const menuItems = [
    { icon: Music, label: 'Browse', href: '/tracks' },
    ...(user ? [
      { icon: Heart, label: 'Favorites', href: '/favorites' },
      { icon: ShoppingCart, label: 'Purchases', href: '/purchases' },
    ] : []),
    ...(user?.role === 'admin' ? [
      { icon: Upload, label: 'Admin', href: '/admin' },
    ] : []),
  ];

  return (
    <>
    {/* Desktop Sidebar */}
    <div 
      className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } theme-bg border-r theme-border shadow-2xl`}
      onMouseEnter={() => !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isPinned && setIsHovered(false)}
    >
      {/* Navigation */}
      <nav className="p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg theme-hover transition-all hover:scale-105 ${
              !isOpen ? 'justify-center p-4' : 'p-3'
            }`}
            title={!isOpen ? item.label : ''}
          >
            <item.icon size={!isOpen ? 22 : 20} className="theme-icon" />
            {isOpen && (
              <span className="theme-text">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Theme Switcher & Pin Button */}
      <div className="absolute bottom-4 left-0 right-0 p-4 space-y-3">
        {/* Pin Button */}
        <button
          onClick={() => setIsPinned(!isPinned)}
          className={`w-full p-3 rounded-lg transition-all ${
            isPinned ? 'theme-accent bg-opacity-20' : 'theme-hover'
          } flex items-center gap-2 ${!isOpen ? 'justify-center' : ''}`}
          title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isPinned ? 'rotate-45 theme-accent' : 'theme-text-secondary'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          {isOpen && (
            <span className="text-sm theme-text-secondary">
              {isPinned ? 'Pinned' : 'Pin sidebar'}
            </span>
          )}
        </button>

        {/* Theme Switcher */}
        <div className="space-y-2 relative">
          <div className={`flex items-center gap-2 ${!isOpen ? 'justify-center' : ''}`}>
            <Palette size={20} className="theme-icon" />
            {isOpen && <span className="text-sm theme-text-secondary">Theme</span>}
          </div>
          
          <div className={`grid gap-2 ${!isOpen ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                onMouseEnter={() => setHoveredTheme(t.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                className={`p-2 rounded-lg border-2 transition-all relative ${
                  theme === t.id ? 'border-blue-500' : 'border-transparent theme-border'
                } ${t.color} ${t.id === 'sunset' && isOpen ? 'col-span-2' : ''}`}
                title={t.name}
              >
                {isOpen && (
                  <span className="text-xs font-medium text-white">{t.name}</span>
                )}
              </button>
            ))}
          </div>

          {/* Theme Story Card */}
          {hoveredTheme && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-card p-6 max-w-sm w-full mx-4 shadow-2xl animate-slide-in">
              <h3 className="text-xl font-bold theme-text mb-2">
                {themes.find(t => t.id === hoveredTheme)?.name}
              </h3>
              <p className="theme-text-secondary text-sm">
                {themes.find(t => t.id === hoveredTheme)?.story}
              </p>
            </div>
          )}
        </div>
      </div>


    </div>

    {/* Mobile Bottom Navigation */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 theme-bg border-t-2 theme-border backdrop-blur-md bg-opacity-95 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-3">
        {menuItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 p-2 rounded-lg theme-hover transition-all active:scale-95"
          >
            <item.icon size={22} className="theme-text-secondary" />
            <span className="text-[10px] theme-text-secondary">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}