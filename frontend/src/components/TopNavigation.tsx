'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { Bell, User, LogOut, Settings, CreditCard } from 'lucide-react';

export default function TopNavigation() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
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

  const getLogoSrc = () => {
    switch (theme) {
      case 'light':
      case 'sunset':
        return '/gri.jpg';
      case 'neon':
        return '/cyber.jpg';
      case 'japanese':
        return '/pembe.jpg';
      default:
        return '/logo.png';
    }
  };

  const getLogoClass = () => {
    switch (theme) {
      case 'light':
      case 'sunset':
        return 'mix-blend-multiply';
      default:
        return 'mix-blend-screen';
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 theme-bg backdrop-blur-md bg-opacity-95 border-b theme-border">
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-full max-w-7xl mx-auto">
        
        {/* LEFT SIDE - Logo & Brand */}
        <Link href="/discover" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={getLogoSrc()} 
              alt="SHIROA" 
              className={`w-full h-full object-cover transition-all duration-300 ${getLogoClass()}`}
            />
          </div>
          <h1 className="text-2xl font-bold font-orbitron theme-text">
            SHIROA
          </h1>
        </Link>

        {/* RIGHT SIDE - Controls */}
        <div className="flex items-center gap-6">
          
          {/* Language Switcher */}
          <div className="flex items-center gap-1 px-3 py-2 rounded-lg theme-hover">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-sm font-bold tracking-wider transition-all ${
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
              className={`px-3 py-1 rounded-md text-sm font-bold tracking-wider transition-all ${
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
                className="relative p-2 rounded-lg theme-hover transition-all hover:scale-110"
              >
                <Bell size={20} className="theme-text-secondary" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{unreadCount}</span>
                  </div>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-14 w-80 theme-bg border-2 theme-border rounded-xl shadow-2xl z-50">
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
                          className={`p-4 border-b theme-border hover:theme-bg-secondary transition-colors ${
                            !notif.read ? 'bg-opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {!notif.read && (
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
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
          )}

          {/* User Menu */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl theme-hover transition-all hover:scale-105"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <User size={18} className="text-white" />
                </div>
                <span className="hidden xl:block theme-text font-medium">{user.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-14 w-56 theme-bg border-2 theme-border rounded-xl shadow-2xl py-2 z-50">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-3 px-4 py-3 theme-hover theme-text font-medium"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User size={16} />
                    {t('nav.profile')}
                  </Link>
                  <Link 
                    href="/purchases" 
                    className="flex items-center gap-3 px-4 py-3 theme-hover theme-text font-medium"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <CreditCard size={16} />
                    {t('nav.purchases')}
                  </Link>
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-3 px-4 py-3 theme-hover theme-text font-medium"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <hr className="my-2 theme-border" />
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 theme-hover theme-text flex items-center gap-3 font-medium"
                  >
                    <LogOut size={16} />
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="px-4 py-2 theme-text-secondary hover:theme-text transition-colors font-medium"
              >
                {t('nav.login')}
              </Link>
              <Link 
                href="/" 
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
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