'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { Shield, Sparkles, Zap, Play, ArrowRight } from 'lucide-react';

export default function DiscoverPage() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const heroContent = {
    en: {
      title: "Everything for your sound",
      subtitle: "Discover and license high-quality music tracks with full commercial rights. One track, one owner, unlimited possibilities.",
      browse: "Browse Catalog",
      howItWorks: "How It Works"
    },
    tr: {
      title: "Sesiniz için her şey",
      subtitle: "Tam ticari haklarla yüksek kaliteli müzik parçalarını keşfedin ve lisanslayın. Bir parça, bir sahip, sınırsız olasılıklar.",
      browse: "Kataloğa Göz At",
      howItWorks: "Nasıl Çalışır"
    }
  };

  const features = {
    en: [
      {
        icon: Shield,
        title: "True Exclusivity",
        desc: "Each track is sold only once. Complete ownership with full commercial rights and no recurring fees."
      },
      {
        icon: Sparkles,
        title: "AI-Powered Creation",
        desc: "Advanced artificial intelligence tools for composition, arrangement, and professional music production."
      },
      {
        icon: Zap,
        title: "Instant Delivery",
        desc: "Secure checkout with immediate access to high-quality files and lifetime license certificates."
      }
    ],
    tr: [
      {
        icon: Shield,
        title: "Gerçek Münhasırlık",
        desc: "Her parça sadece bir kez satılır. Tam ticari haklarla tamamen sahiplik ve tekrarlayan ücret yok."
      },
      {
        icon: Sparkles,
        title: "AI Destekli Üretim",
        desc: "Kompozisyon, düzenleme ve profesyonel müzik üretimi için gelişmiş yapay zeka araçları."
      },
      {
        icon: Zap,
        title: "Anında Teslimat",
        desc: "Yüksek kaliteli dosyalara ve ömür boyu lisans sertifikalarına anında erişimle güvenli ödeme."
      }
    ]
  };

  const content = heroContent[language];
  const currentFeatures = features[language];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-6xl w-full text-center">
          
          {/* Main Title */}
          <div className="mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron theme-text mb-8 leading-tight whitespace-nowrap overflow-hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse inline-block">
                {content.title}
              </span>
            </h1>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
              <p className="relative text-lg md:text-xl theme-text-secondary leading-relaxed p-6">
                {content.subtitle}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link
              href="/tracks"
              className="px-8 md:px-12 py-4 md:py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Play size={24} />
              {content.browse}
            </Link>
            
            <Link
              href="/about"
              className="px-8 md:px-12 py-4 md:py-5 rounded-2xl glass-card theme-text font-bold text-lg md:text-xl hover:scale-105 transition-all border border-white/20 flex items-center justify-center gap-3"
            >
              <ArrowRight size={24} />
              {content.howItWorks}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {currentFeatures.map((feature, index) => (
              <div key={index} className="glass-card p-8 md:p-10 rounded-3xl hover:scale-105 transition-all duration-300 group text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold theme-text mb-4 md:mb-6 font-orbitron">
                  {feature.title}
                </h3>
                <p className="theme-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
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
