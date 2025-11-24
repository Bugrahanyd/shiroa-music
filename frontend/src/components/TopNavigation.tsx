'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { Bell, User, LogOut, Home, Music, Heart, ShoppingCart, Search } from 'lucide-react';

export default function TopNavigation() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New track uploaded', message: 'Your track "Summer Vibes" is now live', time: '5m ago', read: false },
    { id: 2, title: 'Purchase completed', message: 'You bought "Dark Trap Beat"', time: '1h ago', read: false },
    { id: 3, title: 'New follower', message: 'ProducerX started following you', time: '2h ago', read: false },
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const getGradientClass = () => {
    switch (theme) {
      case 'japanese':
        return 'bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600';
      case 'neon':
        return 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500';
      case 'sunset':
        return 'bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600';
      case 'dark':
        return 'bg-gradient-to-r from-gray-400 via-blue-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500';
    }
  };

  const getLogoSrc = () => {
    switch (theme) {
      case 'light':
        return '/gri.jpg';
      case 'sunset':
        return '/turuncu.jpg';
      case 'neon':
        return '/cyber.jpg';
      case 'japanese':
        return '/pembe.jpg';
      default:
        return '/logo.png';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 theme-bg backdrop-blur-md bg-opacity-95 border-b theme-border">
      {/* WIDER LAYOUT - NO MAX WIDTH RESTRICTION */}
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-full">
        
        {/* LEFT SIDE - Logo & Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo & SHIROA */}
          <Link href="/discover" className="flex items-center gap-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={getLogoSrc()} 
                alt="SHIROA" 
                className="w-full h-full object-cover mix-blend-difference transition-all duration-300" 
              />
            </div>
            <h1 className="hidden sm:block text-2xl font-bold font-orbitron theme-text">
              SHIROA
            </h1>
          </Link>

          {/* MAIN NAVIGATION MENU - WITH LANGUAGE SUPPORT */}
          <div className="hidden lg:flex items-center gap-6">
            <Link 
              href="/discover" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg theme-hover transition-all hover:scale-105"
            >
              <Home size={18} className="theme-icon" />
              <span className="theme-text font-medium">{t('nav.home')}</span>
            </Link>
            
            <Link 
              href="/tracks" 
              className="flex items-center gap-2 px-3 py-2 rounded-lg theme-hover transition-all hover:scale-105"
            >
              <Music size={18} className="theme-icon" />
              <span className="theme-text font-medium">{t('nav.tracks')}</span>
            </Link>

            {user && (
              <>
                <Link 
                  href="/favorites" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg theme-hover transition-all hover:scale-105"
                >
                  <Heart size={18} className="theme-icon" />
                  <span className="theme-text font-medium">{t('nav.favorites') || 'Favorites'}</span>
                </Link>
                
                <Link 
                  href="/purchases" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg theme-hover transition-all hover:scale-105"
                >
                  <ShoppingCart size={18} className="theme-icon" />
                  <span className="theme-text font-medium">{t('nav.purchases')}</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - Language, Notifications, User */}
        <div className="flex items-center gap-6">
          
          {/* Language Switcher - Enhanced */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg theme-hover">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm font-bold tracking-wider transition-all cursor-pointer ${
                language === 'en' 
                  ? 'theme-accent bg-white/10' 
                  : 'theme-text-secondary hover:theme-text'
              }`}
            >
              EN
            </button>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 rounded-md text-sm font-bold tracking-wider transition-all cursor-pointer ${
                language === 'tr' 
                  ? 'theme-accent bg-white/10' 
                  : 'theme-text-secondary hover:theme-text'
              }`}
            >
              TR
            </button>
          </div>

          {/* Notifications */}
          {user && (
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg theme-hover transition-all hover:scale-110 cursor-pointer"
              >
                <Bell size={20} className="theme-text-secondary" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{unreadCount}</span>
                  </div>
                )}
              </button>

              <div className={`absolute right-0 top-14 w-80 max-w-[calc(100vw-2rem)] theme-bg border-2 theme-border rounded-xl shadow-2xl transition-all duration-300 ease-in-out origin-top-right ${
                showNotifications 
                  ? 'opacity-100 scale-100 visible translate-y-0' 
                  : 'opacity-0 scale-95 invisible -translate-y-2 pointer-events-none'
              }`}>
                <div className="p-4 border-b theme-border flex items-center justify-between">
                  <h3 className="font-bold theme-text">{t('notif.title')}</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs theme-accent hover:opacity-80 transition-opacity"
                    >
                      {t('notif.markRead')}
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-4 border-b theme-border hover:theme-bg-secondary transition-colors cursor-pointer ${
                          !notif.read ? 'bg-opacity-50' : ''
                        }`}
                        onClick={() => {
                          setNotifications(notifications.map(n => 
                            n.id === notif.id ? { ...n, read: true } : n
                          ));
                          setUnreadCount(Math.max(0, unreadCount - 1));
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {!notif.read && (
                            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2"></div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold theme-text text-sm">{notif.title}</h4>
                            <p className="theme-text-secondary text-xs mt-1">{notif.message}</p>
                            <span className="theme-text-secondary text-xs mt-2 block">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center theme-text-secondary">
                      <Bell size={32} className="mx-auto mb-2 opacity-50" />
                      <p>{t('notif.empty')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* User Menu or Login */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl theme-hover transition-all hover:scale-105 cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-full ${getGradientClass()} flex items-center justify-center shadow-lg`}>
                  <User size={18} className="text-white" />
                </div>
                <span className="hidden xl:block theme-text font-medium">{user.name}</span>
              </button>

              <div className={`absolute right-0 top-14 w-56 theme-bg border-2 theme-border rounded-xl shadow-2xl py-2 transition-all duration-300 ease-in-out origin-top-right ${
                showUserMenu 
                  ? 'opacity-100 scale-100 visible translate-y-0' 
                  : 'opacity-0 scale-95 invisible -translate-y-2 pointer-events-none'
              }`}>
                <Link href="/profile" className="block px-4 py-3 theme-hover theme-text font-medium">
                  {t('nav.profile')}
                </Link>
                <Link href="/dashboard" className="block px-4 py-3 theme-hover theme-text font-medium">
                  {t('nav.dashboard')}
                </Link>
                <hr className="my-2 theme-border" />
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 theme-hover theme-text flex items-center gap-2 cursor-pointer font-medium"
                >
                  <LogOut size={16} />
                  {t('nav.logout')}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="px-4 py-2 theme-hover rounded-lg theme-text font-medium transition-all hover:scale-105"
              >
                {t('nav.login')}
              </Link>
              <Link 
                href="/register" 
                className={`px-6 py-2 rounded-lg text-white font-medium transition-all hover:scale-105 ${getGradientClass()}`}
              >
                {t('nav.signup')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}