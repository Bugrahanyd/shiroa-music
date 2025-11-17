'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { 
  Home, Music, User, Settings, Bell, Search, 
  ChevronLeft, ChevronRight, Palette, Mic,
  ShoppingCart, BarChart3, Upload
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'dark', name: 'Night', color: 'bg-gray-900' },
    { id: 'light', name: 'Day', color: 'bg-white' },
    { id: 'japanese', name: 'Sakura', color: 'bg-pink-100' },
    { id: 'neon', name: 'Cyber', color: 'bg-purple-900' },
  ];

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Music, label: 'Tracks', href: '/tracks' },
    { icon: Mic, label: 'Studio', href: '/studio' },
    { icon: Search, label: 'Discover', href: '/discover' },
    ...(user ? [
      { icon: User, label: 'Profile', href: '/profile' },
      { icon: ShoppingCart, label: 'Purchases', href: '/purchases' },
      { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
    ] : []),
    ...(user?.role === 'admin' ? [
      { icon: Upload, label: 'Admin', href: '/admin' },
    ] : []),
  ];

  return (
    <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } theme-bg theme-border-r`}>
      
      {/* Header */}
      <div className="p-4 border-b theme-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold theme-text font-orbitron">SHIROA</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg theme-hover"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 p-3 rounded-lg theme-hover transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <item.icon size={20} className="theme-text-secondary" />
            {!isCollapsed && (
              <span className="theme-text">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Theme Switcher */}
      <div className="absolute bottom-20 left-0 right-0 p-4">
        <div className="space-y-2">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
            <Palette size={20} className="theme-text-secondary" />
            {!isCollapsed && <span className="text-sm theme-text-secondary">Theme</span>}
          </div>
          
          <div className={`grid gap-2 ${isCollapsed ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  theme === t.id ? 'border-blue-500' : 'border-transparent theme-border'
                } ${t.color}`}
                title={t.name}
              >
                {!isCollapsed && (
                  <span className="text-xs font-medium">{t.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="absolute bottom-4 left-0 right-0 p-4">
        <button className={`w-full flex items-center gap-3 p-3 rounded-lg theme-hover ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div className="relative">
            <Bell size={20} className="theme-text-secondary" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          {!isCollapsed && <span className="theme-text">Notifications</span>}
        </button>
      </div>
    </div>
  );
}