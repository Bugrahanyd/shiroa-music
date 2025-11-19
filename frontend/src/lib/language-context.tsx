"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tracks': 'Tracks',
    'nav.studio': 'Studio',
    'nav.playlists': 'Playlists',
    'nav.community': 'Community',
    'nav.dashboard': 'Dashboard',
    'nav.analytics': 'Analytics',
    'nav.purchases': 'Purchases',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.upload': 'Upload',
    'nav.manage': 'Manage',
    
    // Sidebar
    'sidebar.browse': 'Browse',
    'sidebar.studio': 'Studio',
    'sidebar.discover': 'Discover',
    'sidebar.search': 'Search',
    'sidebar.favorites': 'Favorites',
    'sidebar.theme': 'Theme',
    'sidebar.pin': 'Pin sidebar',
    'sidebar.pinned': 'Pinned',
    
    // Notifications
    'notif.title': 'Notifications',
    'notif.markRead': 'Mark all read',
    'notif.empty': 'No notifications',
    
    // Common
    'common.available': 'AVAILABLE',
    'common.sold': 'SOLD',
    'common.price': 'Price',
    'common.genre': 'Genre',
    'common.bpm': 'BPM',
    'common.duration': 'Duration',
    
    // Studio
    'studio.title': 'SHIROA STUDIO',
    'studio.generate': 'AI Generate',
    'studio.save': 'Save Project',
    'studio.export': 'Export',
    
    // Tagline
    'tagline': 'AI Music Platform',
  },
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.tracks': 'Parçalar',
    'nav.studio': 'Stüdyo',
    'nav.playlists': 'Çalma Listeleri',
    'nav.community': 'Topluluk',
    'nav.dashboard': 'Panel',
    'nav.analytics': 'Analitik',
    'nav.purchases': 'Satın Alımlar',
    'nav.profile': 'Profil',
    'nav.login': 'Giriş',
    'nav.signup': 'Kayıt Ol',
    'nav.logout': 'Çıkış',
    'nav.upload': 'Yükle',
    'nav.manage': 'Yönet',
    
    // Sidebar
    'sidebar.browse': 'Gözat',
    'sidebar.studio': 'Stüdyo',
    'sidebar.discover': 'Keşfet',
    'sidebar.search': 'Ara',
    'sidebar.favorites': 'Favoriler',
    'sidebar.theme': 'Tema',
    'sidebar.pin': 'Sabitle',
    'sidebar.pinned': 'Sabitlendi',
    
    // Notifications
    'notif.title': 'Bildirimler',
    'notif.markRead': 'Tümünü okundu işaretle',
    'notif.empty': 'Bildirim yok',
    
    // Common
    'common.available': 'MÜSAİT',
    'common.sold': 'SATILDI',
    'common.price': 'Fiyat',
    'common.genre': 'Tür',
    'common.bpm': 'BPM',
    'common.duration': 'Süre',
    
    // Studio
    'studio.title': 'SHIROA STÜDYO',
    'studio.generate': 'AI Üret',
    'studio.save': 'Projeyi Kaydet',
    'studio.export': 'Dışa Aktar',
    
    // Tagline
    'tagline': 'AI Müzik Platformu',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'tr')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
