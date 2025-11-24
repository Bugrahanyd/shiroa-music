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
    { 
      id: 'dark', 
      name: 'Night', 
      color: 'bg-gradient-to-br from-gray-900 via-slate-800 to-black', 
      storyEn: 'Dive into the depths of midnight creativity. Where shadows dance with inspiration and silence becomes your canvas. The darkness isn\'t empty—it\'s full of possibilities waiting to be discovered.',
      storyTr: 'Gece yarısı yaratıcılığının derinliklerine dalın. Gölgelerin ilhamla dans ettiği, sessizliğin tuvaliniz olduğu bir dünya. Karanlık boş değil—keşfedilmeyi bekleyen olasılıklarla dolu.'
    },
    { 
      id: 'light', 
      name: 'Day', 
      color: 'bg-gradient-to-br from-sky-400 via-blue-200 to-white', 
      storyEn: 'Embrace the vibrant energy of daylight. Colors burst with life, ideas flow freely, and every moment sparkles with potential. Let the sunshine fuel your creative journey.',
      storyTr: 'Gün ışığının canlı enerjisini kucaklayın. Renkler hayatla patlar, fikirler özgürce akar ve her an potansiyelle parıldar. Güneş ışığının yaratıcı yolculuğunuzu beslemesine izin verin.'
    },
    { 
      id: 'japanese', 
      name: 'Sakura', 
      color: 'bg-gradient-to-br from-pink-300 via-pink-200 to-purple-200', 
      storyEn: 'Experience the delicate beauty of cherry blossoms. Soft petals falling like musical notes, creating harmony between tradition and innovation. Find peace in every pixel.',
      storyTr: 'Kiraz çiçeklerinin narin güzelliğini deneyimleyin. Müzik notaları gibi düşen yumuşak yapraklar, gelenek ve yenilik arasında uyum yaratır. Her pikselde huzur bulun.'
    },
    { 
      id: 'neon', 
      name: 'Cyber', 
      color: 'bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900', 
      storyEn: 'Step into the electric future. Neon lights pulse with digital heartbeats, where technology and art merge into something extraordinary. The future of music is now.',
      storyTr: 'Elektrikli geleceğe adım atın. Neon ışıklar dijital kalp atışlarıyla nabız tutar, teknoloji ve sanat olağanüstü bir şeyde birleşir. Müziğin geleceği şimdi.'
    },
    { 
      id: 'sunset', 
      name: 'Sunset', 
      color: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600', 
      storyEn: 'Witness the magic of Los Angeles golden hour. Warm hues paint the sky as day meets night, palm silhouettes dance in the breeze. Every color tells a story, every gradient sings a song.',
      storyTr: 'Los Angeles altın saatinin büyüsüne tanık olun. Gün geceyle buluşurken sıcak tonlar gökyüzünü boyar, palmiye siluetleri esintide dans eder. Her renk bir hikaye anlatır, her geçiş bir şarkı söyler.'
    },
  ];

  const menuItems = [
    { icon: Compass, label: 'Home', href: '/discover' },
    { icon: Music, label: 'Tracks', href: '/tracks' },
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
      className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 w-20 hover:w-64 ${
        isPinned ? 'w-64' : ''
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
            className="flex items-center gap-3 rounded-lg theme-hover transition-all hover:scale-105 p-3 cursor-pointer"
            title={!isOpen ? item.label : ''}
          >
            <item.icon size={22} className="theme-icon flex-shrink-0" />
            {isOpen && (
              <span className="theme-text">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Studio & Theme Switcher & Pin Button */}
      <div className="absolute bottom-4 left-0 right-0 p-4 space-y-3">
        {/* Studio - Coming Soon */}
        <div className="relative group">
          <div className="flex items-center gap-3 p-3 rounded-lg theme-hover opacity-50 cursor-not-allowed">
            <Mic size={22} className="theme-text-secondary flex-shrink-0" />
            {isOpen && <span className="theme-text-secondary">Studio</span>}
          </div>
          {isOpen && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg theme-card border theme-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm theme-text">
              Coming Soon
            </div>
          )}
        </div>
        {/* Pin Button */}
        <button
          onClick={() => setIsPinned(!isPinned)}
          className={`w-full p-3 rounded-lg transition-all cursor-pointer hover:scale-105 ${
            isPinned ? 'theme-accent bg-opacity-20' : 'theme-hover'
          } flex items-center gap-2`}
          title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
        >
          <svg 
            className={`w-7 h-7 transition-transform ${isPinned ? 'rotate-45 theme-accent' : 'theme-text-secondary'} flex-shrink-0`} 
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
                className={`p-3 rounded-xl border transition-all relative cursor-pointer hover:scale-110 ${
                  theme === t.id ? 'border-white/40 shadow-lg' : 'border-white/10'
                } ${t.color} ${t.id === 'sunset' && isOpen ? 'col-span-2' : ''}`}
                title={t.name}
              >
                {isOpen && (
                  <span className="text-xs font-bold text-white drop-shadow-lg">{t.name}</span>
                )}
              </button>
            ))}
          </div>

          {/* Theme Story Card */}
          {hoveredTheme && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-card border border-white/20 p-8 max-w-2xl w-full mx-4 shadow-2xl animate-slide-in backdrop-blur-2xl rounded-2xl">
              <h3 className="text-3xl font-bold theme-text mb-4 font-orbitron">
                {themes.find(t => t.id === hoveredTheme)?.name}
              </h3>
              <p className="theme-text-secondary text-lg leading-relaxed">
                {themes.find(t => t.id === hoveredTheme)?.storyEn}
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