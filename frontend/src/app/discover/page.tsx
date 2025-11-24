'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Sparkles, Shield, Zap, Play, ArrowRight, Music, Users, Star, TrendingUp } from 'lucide-react';

export default function DiscoverPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGradientClass = () => {
    switch (theme) {
      case 'japanese':
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600';
      case 'neon':
        return 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500';
      case 'sunset':
        return 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600';
      case 'dark':
        return 'bg-gradient-to-r from-gray-500 via-blue-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 + Math.sin(scrollY * 0.01) * 20}%, var(--theme-accent) 0%, transparent 50%)`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: `radial-gradient(circle at ${30 + scrollY * 0.05}% ${70 + Math.cos(scrollY * 0.008) * 15}%, var(--theme-icon-color) 0%, transparent 40%)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl w-full text-center">
          
          {/* Main Title - Single Line */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-orbitron theme-text mb-8 leading-tight">
              <span className="block whitespace-nowrap">{t('home.hero.title')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text whitespace-nowrap">
                {t('home.hero.sound')}
              </span>
            </h1>
            
            {/* Subtitle with backdrop */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl"></div>
              <p className="relative text-xl md:text-2xl theme-text-secondary leading-relaxed p-6 text-shadow-lg">
                {t('home.hero.subtitle')}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: Music, label: 'Tracks', value: '10K+', color: 'text-blue-400' },
              { icon: Users, label: 'Creators', value: '5K+', color: 'text-purple-400' },
              { icon: TrendingUp, label: 'Downloads', value: '50K+', color: 'text-pink-400' },
              { icon: Star, label: 'Rating', value: '4.9', color: 'text-cyan-400' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold theme-text">{stat.value}</div>
                <div className="text-sm theme-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/tracks"
              className={`px-12 py-5 rounded-2xl ${getGradientClass()} text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3`}
            >
              <Play size={24} />
              {t('home.hero.browse')}
            </Link>
            
            <Link
              href="/about"
              className="px-12 py-5 rounded-2xl glass-card theme-text font-bold text-xl hover:scale-105 transition-all border border-white/20 flex items-center justify-center gap-3"
            >
              <ArrowRight size={24} />
              {t('home.hero.howItWorks')}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center theme-text mb-16 font-orbitron">
            Why Choose SHIROA?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* True Exclusivity */}
            <div className="glass-card p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className={`w-20 h-20 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform`}>
                <Shield className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-6 font-orbitron">
                {t('home.feature1.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed text-lg">
                {t('home.feature1.desc')}
              </p>
            </div>

            {/* AI Powered Creation */}
            <div className="glass-card p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className={`w-20 h-20 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform`}>
                <Sparkles className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-6 font-orbitron">
                {t('home.feature2.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed text-lg">
                {t('home.feature2.desc')}
              </p>
            </div>

            {/* Instant Delivery */}
            <div className="glass-card p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className={`w-20 h-20 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform`}>
                <Zap className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-6 font-orbitron">
                {t('home.feature3.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed text-lg">
                {t('home.feature3.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message for Logged Users */}
      {user && (
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl">
              <h2 className="text-4xl font-bold theme-text mb-6 font-orbitron">
                Welcome back, {user.name}!
              </h2>
              <p className="theme-text-secondary text-xl mb-8 leading-relaxed">
                Ready to discover your next exclusive track? Your musical journey continues here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tracks"
                  className={`inline-block px-10 py-4 rounded-xl ${getGradientClass()} text-white font-bold text-lg hover:scale-105 transition-all`}
                >
                  Start Browsing
                </Link>
                <Link
                  href="/favorites"
                  className="inline-block px-10 py-4 rounded-xl glass-card theme-text font-bold text-lg hover:scale-105 transition-all border border-white/20"
                >
                  View Favorites
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}