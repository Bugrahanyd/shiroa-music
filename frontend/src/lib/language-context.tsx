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
    
    // Homepage
    'home.hero.title': 'Everything for your',
    'home.hero.sound': 'sound',
    'home.hero.subtitle': 'Discover and license high-quality music tracks with full commercial rights. One track, one owner, unlimited possibilities.',
    'home.hero.browse': 'Browse Catalog',
    'home.hero.howItWorks': 'How It Works',
    'home.feature1.title': 'True Exclusivity',
    'home.feature1.desc': 'Full commercial rights with lifetime ownership. No royalties, no recurring fees, no competition.',
    'home.feature2.title': 'AI-Powered Creation',
    'home.feature2.desc': 'Advanced AI tools for composition, vocal processing, and mixing. Create professional music faster.',
    'home.feature3.title': 'Instant Delivery',
    'home.feature3.desc': 'Secure checkout with Stripe. Instant access to high-quality files and license certificates.',
    'home.cta.title': 'Find Your Perfect Track Today',
    'home.cta.subtitle': 'Browse our catalog of exclusive tracks and elevate your content.',
    'home.cta.button': 'Browse Tracks',
    'home.cta.free': 'No credit card required • Free to start',
    
    // About
    'about.title': 'About SHIROA',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision', 
    'about.values': 'Our Values',
    
    // Onboarding
    'onboard.welcome': 'Welcome',
    'onboard.age': 'How old are you?',
    'onboard.location': 'Where are you from?',
    'onboard.role': 'What describes you best?',
    'onboard.purpose': 'What\'s your main goal?',
    'onboard.next': 'Next',
    'onboard.finish': 'Finish Setup',
    
    // Tracks Page
    'tracks.title': 'Music Catalog',
    'tracks.subtitle': 'Discover exclusive tracks with full commercial rights',
    'tracks.loading': 'Loading tracks...',
    'tracks.error': 'Connection Error',
    'tracks.retry': 'Try Again',
    'tracks.noResults': 'No Tracks Found',
    'tracks.noResultsDesc': 'No tracks match your search criteria. Try adjusting your filters.',
    'tracks.clearFilters': 'Clear Filters',
    'tracks.showing': 'Showing {count} of {total} tracks',
    'tracks.searchPlaceholder': 'Search tracks, artists, or genres...',
    
    // Filters
    'filter.title': 'Filters',
    'filter.genre': 'Genre',
    'filter.priceRange': 'Price Range',
    'filter.sortBy': 'Sort By',
    'filter.clear': 'Clear Filters',
    'filter.all': 'All',
    'filter.newest': 'Newest',
    'filter.priceAsc': 'Price: Low-High',
    'filter.priceDesc': 'Price: High-Low',
    'filter.alphabetical': 'Alphabetical',
    
    // Purchase
    'purchase.loginRequired': 'Authentication Required',
    'purchase.loginDesc': 'Please log in to purchase tracks',
    'purchase.goLogin': 'Go to Login',
    'purchase.processing': 'Processing...',
    'purchase.buyNow': 'Buy Now',
    'purchase.owned': 'Owned',
    'purchase.unavailable': 'Payment service is currently unavailable. Please try again later.',
    
    // Theme Stories
    'theme.story': 'Theme Story',
    'theme.close': 'Close',
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
    'studio.generate': 'AI Oluştur',
    'studio.save': 'Projeyi Kaydet',
    'studio.export': 'Dışa Aktar',
    
    // Tagline
    'tagline': 'AI Müzik Platformu',
    
    // Homepage
    'home.hero.title': 'Sesiniz için',
    'home.hero.sound': 'her şey',
    'home.hero.subtitle': 'Tam ticari haklarla yüksek kaliteli müzik parçalarını keşfedin ve lisanslayın. Bir parça, bir sahip, sınırsız olasılıklar.',
    'home.hero.browse': 'Kataloğa Göz At',
    'home.hero.howItWorks': 'Nasıl Çalışır',
    'home.feature1.title': 'Gerçek Münhasırlık',
    'home.feature1.desc': 'Ömür boyu sahiplik ile tam ticari haklar. Telif ücreti yok, tekrarlayan ücret yok, rekabet yok.',
    'home.feature2.title': 'AI Destekli Oluşturma',
    'home.feature2.desc': 'Kompozisyon, vokal işleme ve mixing için gelişmiş AI araçları. Profesyonel müziği daha hızlı oluşturun.',
    'home.feature3.title': 'Anında Teslimat',
    'home.feature3.desc': 'Stripe ile güvenli ödeme. Yüksek kaliteli dosyalara ve lisans sertifikalarına anında erişim.',
    'home.cta.title': 'Bugün Mükemmel Parçanızı Bulun',
    'home.cta.subtitle': 'Özel parça kataloğumuza göz atın ve içeriğinizi yükseltin.',
    'home.cta.button': 'Parçalara Göz At',
    'home.cta.free': 'Kredi kartı gerekmez • Ücretsiz başlayın',
    
    // About
    'about.title': 'SHIROA Hakkında',
    'about.mission': 'Misyonumuz',
    'about.vision': 'Vizyonumuz',
    'about.values': 'Değerlerimiz',
    
    // Onboarding
    'onboard.welcome': 'Hoş Geldiniz',
    'onboard.age': 'Kaç yaşındasınız?',
    'onboard.location': 'Nerelisiniz?',
    'onboard.role': 'Sizi en iyi hangisi tanımlar?',
    'onboard.purpose': 'Ana hedefiniz nedir?',
    'onboard.next': 'İleri',
    'onboard.finish': 'Kurulumu Tamamla',
    
    // Tracks Page
    'tracks.title': 'Müzik Kataloğu',
    'tracks.subtitle': 'Tam ticari haklarla özel parçaları keşfedin',
    'tracks.loading': 'Parçalar yükleniy or...',
    'tracks.error': 'Bağlantı Hatası',
    'tracks.retry': 'Tekrar Dene',
    'tracks.noResults': 'Parça Bulunamadı',
    'tracks.noResultsDesc': 'Arama kriterlerinize uygun parça bulunamadı. Filtreleri değiştirmeyi deneyin.',
    'tracks.clearFilters': 'Filtreleri Temizle',
    'tracks.showing': '{total} parçadan {count} tanesi gösteriliyor',
    'tracks.searchPlaceholder': 'Parça, sanatçı veya tür ara...',
    
    // Filters
    'filter.title': 'Filtreler',
    'filter.genre': 'Tür',
    'filter.priceRange': 'Fiyat Aralığı',
    'filter.sortBy': 'Sıralama',
    'filter.clear': 'Filtreleri Temizle',
    'filter.all': 'Tümü',
    'filter.newest': 'En Yeni',
    'filter.priceAsc': 'Fiyat: Düşük-Yüksek',
    'filter.priceDesc': 'Fiyat: Yüksek-Düşük',
    'filter.alphabetical': 'Alfabetik',
    
    // Purchase
    'purchase.loginRequired': 'Kimlik Doğrulama Gerekli',
    'purchase.loginDesc': 'Parça satın almak için giriş yapın',
    'purchase.goLogin': 'Girişe Git',
    'purchase.processing': 'İşleniyor...',
    'purchase.buyNow': 'Satın Al',
    'purchase.owned': 'Sahip Olunan',
    'purchase.unavailable': 'Ödeme servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
    
    // Theme Stories
    'theme.story': 'Tema Hikayesi',
    'theme.close': 'Kapat',
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
