"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const getSoundGradient = () => {
    switch (theme) {
      case 'dark':
        return 'from-[#94a3b8] via-[#64748b] to-[#cbd5e1]';
      case 'light':
        return 'from-[#f59e0b] via-[#ef4444] to-[#ec4899]';
      case 'japanese':
        return 'from-[#f472b6] via-[#ec4899] to-[#be185d]';
      case 'neon':
        return 'from-[#00f5ff] via-[#a855f7] to-[#8b5cf6]';
      case 'sunset':
        return 'from-[#ff6b35] via-[#ff8c42] to-[#ffa07a]';
      default:
        return 'from-[#00CED1] via-[#5F9FFF] to-[#9D4EDD]';
    }
  };



  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00CED1]/5 to-transparent rounded-3xl blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-6xl md:text-7xl font-[family-name:var(--font-orbitron)] font-black theme-text mb-6 leading-tight">
{t('home.hero.title')} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getSoundGradient()}`}>{t('home.hero.sound')}</span>
          </h2>
          <p className="text-xl theme-text-secondary mb-12 max-w-2xl mx-auto">
{t('home.hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/tracks" 
              className="theme-button px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
{t('home.hero.browse')}
            </Link>
            <Link 
              href="/about" 
              className="theme-button-outline px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
{t('home.hero.howItWorks')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group theme-card rounded-2xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all" style={{ backgroundColor: 'var(--theme-icon-color)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold theme-text mb-2 transition-colors">
{t('home.feature1.title')}
            </h3>
            <p className="theme-text-secondary transition-colors">
{t('home.feature1.desc')}
            </p>
          </div>

          <div className="group theme-card rounded-2xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all" style={{ backgroundColor: 'var(--theme-accent)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold theme-text mb-2 transition-colors">
{t('home.feature2.title')}
            </h3>
            <p className="theme-text-secondary transition-colors">
{t('home.feature2.desc')}
            </p>
          </div>

          <div className="group theme-card rounded-2xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-all" style={{ backgroundColor: 'var(--theme-icon-color)', opacity: 0.8 }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold theme-text mb-2 transition-colors">
{t('home.feature3.title')}
            </h3>
            <p className="theme-text-secondary transition-colors">
{t('home.feature3.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-3xl p-12 text-center shadow-2xl" style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}>
          <h3 className="text-4xl font-[family-name:var(--font-orbitron)] font-black text-white mb-4">
{t('home.cta.title')}
          </h3>
          <p className="text-lg text-white/90 mb-8">
{t('home.cta.subtitle')}
          </p>
          <Link 
            href="/tracks" 
            className="inline-block theme-bg theme-text px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
{t('home.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
