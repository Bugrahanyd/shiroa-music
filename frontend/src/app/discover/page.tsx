'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import { Sparkles, Shield, Zap, Play, ArrowRight } from 'lucide-react';

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
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 + Math.sin(scrollY * 0.01) * 20}%, var(--theme-accent) 0%, transparent 50%)`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${30 + scrollY * 0.05}% ${70 + Math.cos(scrollY * 0.008) * 15}%, var(--theme-icon-color) 0%, transparent 40%)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl w-full text-center">
          
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron theme-text mb-6 leading-tight">
              {t('home.hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text">
                {t('home.hero.sound')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/tracks"
              className={`px-10 py-5 rounded-2xl ${getGradientClass()} text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3`}
            >
              <Play size={24} />
              {t('home.hero.browse')}
            </Link>
            
            <Link
              href="/about"
              className="px-10 py-5 rounded-2xl glass-card theme-text font-bold text-xl hover:scale-105 transition-all border border-white/20 flex items-center justify-center gap-3"
            >
              <ArrowRight size={24} />
              {t('home.hero.howItWorks')}
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* True Exclusivity */}
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4 font-orbitron">
                {t('home.feature1.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {t('home.feature1.desc')}
              </p>
            </div>

            {/* AI Powered Creation */}
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4 font-orbitron">
                {t('home.feature2.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {t('home.feature2.desc')}
              </p>
            </div>

            {/* Instant Delivery */}
            <div className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4 font-orbitron">
                {t('home.feature3.title')}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {t('home.feature3.desc')}
              </p>
            </div>
          </div>

          {/* Welcome Message for Logged Users */}
          {user && (
            <div className="mt-16 glass-card p-8 rounded-3xl max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">
                Welcome back, {user.name}!
              </h2>
              <p className="theme-text-secondary mb-6">
                Ready to discover your next exclusive track?
              </p>
              <Link
                href="/tracks"
                className={`inline-block px-8 py-4 rounded-xl ${getGradientClass()} text-white font-bold hover:scale-105 transition-all`}
              >
                Start Browsing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}