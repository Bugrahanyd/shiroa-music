'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { Bell, User, LogOut, Menu, Globe } from 'lucide-react';

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
      case 'dark':
        return 'bg-gradient-to-r from-gray-400 via-blue-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 theme-bg backdrop-blur-md bg-opacity-95 border-b theme-border">
      <div className="flex items-center justify-between h-full px-3 md:px-6">
        {/* Logo & SHIROA */}
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <img 
            src="/logo.jpg" 
            alt="SHIROA" 
            className="w-10 h-10 rounded-lg shadow-lg" 
            style={{ imageRendering: 'crisp-edges' }}
          />
          <div className="hidden sm:flex">
            {['S', 'H', 'I', 'R', 'O', 'A'].map((letter, index) => (
              <span
                key={index}
                className="text-2xl font-bold font-orbitron"
                style={{
                  color: ['#00CED1', '#5F9FFF', '#9D4EDD', '#FF6B9D', '#FFB347', '#00CED1'][index],
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Quick Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg theme-text-secondary hover:theme-text transition-all hover:scale-105 relative group">
              <span>{t('nav.home')}</span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${getGradientClass()} scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
            </Link>
            <Link href="/tracks" className="px-4 py-2 rounded-lg theme-text-secondary hover:theme-text transition-all hover:scale-105 relative group">
              <span>{t('nav.tracks')}</span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${getGradientClass()} scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
            </Link>
            <a 
              href="/studio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg theme-text-secondary hover:theme-text transition-all hover:scale-105 relative group"
            >
              <span className="flex items-center gap-1">
                {t('nav.studio')}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${getGradientClass()} scale-x-0 group-hover:scale-x-100 transition-transform`}></div>
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg theme-hover transition-all hover:scale-105"
              title={language === 'en' ? 'Türkçe' : 'English'}
            >
              <Globe size={16} className="md:hidden theme-text-secondary" />
              <Globe size={18} className="hidden md:block theme-text-secondary" />
              <span className="hidden lg:block theme-text-secondary font-medium text-sm uppercase">
                {language}
              </span>
            </button>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 md:p-2 rounded-lg theme-hover transition-all hover:scale-110"
            >
              <Bell size={18} className="md:hidden theme-text-secondary" />
              <Bell size={20} className="hidden md:block theme-text-secondary" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-[8px] md:text-[10px] font-bold">{unreadCount}</span>
                </div>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-80 max-w-[calc(100vw-1rem)] theme-bg border-2 theme-border rounded-xl shadow-2xl animate-slide-in">
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
            )}
          </div>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl theme-hover transition-all hover:scale-105"
              >
                <div className={`w-7 h-7 md:w-9 md:h-9 rounded-full ${getGradientClass()} flex items-center justify-center shadow-lg`}>
                  <User size={14} className="md:hidden text-white" />
                  <User size={18} className="hidden md:block text-white" />
                </div>
                <span className="hidden lg:block theme-text font-medium text-sm">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-14 w-48 md:w-56 theme-bg border-2 theme-border rounded-xl shadow-2xl py-2 animate-slide-in">
                  <Link href="/profile" className="block px-4 py-2 theme-hover theme-text">
                    {t('nav.profile')}
                  </Link>
                  <Link href="/dashboard" className="block px-4 py-2 theme-hover theme-text">
                    {t('nav.dashboard')}
                  </Link>
                  <hr className="my-2 theme-border" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 theme-hover theme-text flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 md:px-5 py-2 rounded-lg theme-text-secondary hover:theme-text transition-all hover:scale-105 text-sm"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className={`px-3 md:px-5 py-2 rounded-lg ${getGradientClass()} text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm`}
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