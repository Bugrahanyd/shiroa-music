'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { Shield, Sparkles, Zap, Play, ArrowRight, Music, Users, TrendingUp } from 'lucide-react';

export default function DiscoverPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const heroTitle = language === 'tr' ? 'Sesiniz için her şey' : 'Everything for your sound';
  const browseText = language === 'tr' ? 'Kataloğa Göz At' : 'Browse Catalog';
  const howItWorksText = language === 'tr' ? 'Nasıl Çalışır' : 'How It Works';

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-6xl w-full text-center">
          
          {/* Main Title - Single Line Responsive */}
          <div className="mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-orbitron theme-text mb-8 leading-tight">
              <span className="whitespace-nowrap">{heroTitle}</span>
            </h1>
            
            <p className="text-lg md:text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
              {language === 'tr' 
                ? 'Yapay zeka destekli müzik üretimi ve özel lisanslama platformu'
                : 'AI-powered music production and exclusive licensing platform'
              }
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: Music, label: language === 'tr' ? 'Parça' : 'Tracks', value: '10K+', color: 'text-blue-400' },
              { icon: Users, label: language === 'tr' ? 'Sanatçı' : 'Artists', value: '5K+', color: 'text-purple-400' },
              { icon: TrendingUp, label: language === 'tr' ? 'İndirme' : 'Downloads', value: '50K+', color: 'text-pink-400' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl md:text-3xl font-bold theme-text">{stat.value}</div>
                <div className="text-sm theme-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/tracks"
              className="px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Play size={24} />
              {browseText}
            </Link>
            
            <Link
              href="/about"
              className="px-8 md:px-12 py-4 md:py-5 rounded-2xl glass-card theme-text font-bold text-lg md:text-xl hover:scale-105 transition-all border border-white/20 flex items-center justify-center gap-3"
            >
              <ArrowRight size={24} />
              {howItWorksText}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center theme-text mb-16 font-orbitron">
            {language === 'tr' ? 'Neden SHIROA?' : 'Why Choose SHIROA?'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* True Exclusivity */}
            <div className="glass-card p-8 md:p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold theme-text mb-4 md:mb-6 font-orbitron">
                {language === 'tr' ? 'Gerçek Özellik' : 'True Exclusivity'}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {language === 'tr' 
                  ? 'Her parça sadece bir kez satılır. Tamamen size özel müzik deneyimi.'
                  : 'Each track is sold only once. Completely exclusive music experience for you.'
                }
              </p>
            </div>

            {/* AI Powered Creation */}
            <div className="glass-card p-8 md:p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold theme-text mb-4 md:mb-6 font-orbitron">
                {language === 'tr' ? 'AI Destekli' : 'AI Powered'}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {language === 'tr'
                  ? 'Yapay zeka teknolojisi ile üretilen yüksek kaliteli müzik parçaları.'
                  : 'High-quality music tracks produced with artificial intelligence technology.'
                }
              </p>
            </div>

            {/* Instant Delivery */}
            <div className="glass-card p-8 md:p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold theme-text mb-4 md:mb-6 font-orbitron">
                {language === 'tr' ? 'Anında Teslimat' : 'Instant Delivery'}
              </h3>
              <p className="theme-text-secondary leading-relaxed">
                {language === 'tr'
                  ? 'Satın aldığınız müzikleri anında indirin ve kullanmaya başlayın.'
                  : 'Download and start using your purchased music instantly.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message for Logged Users */}
      {user && (
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <h2 className="text-2xl md:text-4xl font-bold theme-text mb-6 font-orbitron">
                {language === 'tr' ? `Tekrar hoş geldin, ${user.name}!` : `Welcome back, ${user.name}!`}
              </h2>
              <p className="theme-text-secondary text-lg md:text-xl mb-8 leading-relaxed">
                {language === 'tr'
                  ? 'Yeni özel parçalarını keşfetmeye hazır mısın? Müzikal yolculuğun burada devam ediyor.'
                  : 'Ready to discover your next exclusive track? Your musical journey continues here.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tracks"
                  className="inline-block px-8 md:px-10 py-3 md:py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg hover:scale-105 transition-all"
                >
                  {language === 'tr' ? 'Göz Atmaya Başla' : 'Start Browsing'}
                </Link>
                <Link
                  href="/favorites"
                  className="inline-block px-8 md:px-10 py-3 md:py-4 rounded-xl glass-card theme-text font-bold text-lg hover:scale-105 transition-all border border-white/20"
                >
                  {language === 'tr' ? 'Favorileri Gör' : 'View Favorites'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}