"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Target, Eye, Heart, Shield, Zap, Users, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tr = {
    en: {
      about: 'About Us',
      aboutText: 'SHIROA is a next-generation music platform combining AI technology with exclusive licensing. We empower creators with high-quality, unique tracks and provide producers with a fair marketplace. Born from passion for music and innovation, we\'re building the future of music production.',
      mission: 'Our Mission',
      missionText: 'To democratize music production by providing AI-powered tools and exclusive tracks, making professional music accessible to everyone.',
      vision: 'Our Vision',
      visionText: 'To become the world\'s leading platform for AI-generated music and exclusive licensing, revolutionizing how music is created and distributed.',
      values: 'Our Values',
      passion: 'Passion',
      passionText: 'Driven by love for music and innovation',
      trust: 'Trust',
      trustText: 'Transparent processes and fair practices',
      innovation: 'Innovation',
      innovationText: 'Pushing boundaries with AI technology',
      community: 'Community',
      communityText: 'Building together with creators',
      quality: 'Quality',
      qualityText: 'Professional standards in everything',
      visionValue: 'Vision',
      visionValueText: 'Long-term thinking and sustainability',
      cta: 'Ready to Create?',
      ctaText: 'Join thousands of creators using SHIROA to produce professional music',
      explore: 'Explore Music Catalog →',
      back: 'Back to Home',
    },
    tr: {
      about: 'Hakkımızda',
      aboutText: 'SHIROA, AI teknolojisini özel lisanslama ile birleştiren yeni nesil bir müzik platformudur. Yaratıcılara yüksek kaliteli, benzersiz parçalar sunuyor ve prodüktörlere adil bir pazar yeri sağlıyoruz. Müzik ve yenilik tutkusundan doğan SHIROA, müzik prodüksiyonunun geleceğini inşa ediyor.',
      mission: 'Misyonumuz',
      missionText: 'AI destekli araçlar ve özel parçalar sunarak müzik prodüksiyonunu demokratikleştirmek, profesyonel müziği herkese erişilebilir kılmak.',
      vision: 'Vizyonumuz',
      visionText: 'AI ile üretilen müzik ve özel lisanslama konusunda dünyanın önde gelen platformu olmak, müziğin nasıl yaratıldığını ve dağıtıldığını devrimleştirmek.',
      values: 'Değerlerimiz',
      passion: 'Tutku',
      passionText: 'Müzik ve yenilik sevgisiyle hareket ediyoruz',
      trust: 'Güven',
      trustText: 'Şeffaf süreçler ve adil uygulamalar',
      innovation: 'Yenilik',
      innovationText: 'AI teknolojisiyle sınırları zorluyoruz',
      community: 'Topluluk',
      communityText: 'Yaratıcılarla birlikte inşa ediyoruz',
      quality: 'Kalite',
      qualityText: 'Her şeyde profesyonel standartlar',
      visionValue: 'Vizyon',
      visionValueText: 'Uzun vadeli düşünce ve sürdürülebilirlik',
      cta: 'Yaratmaya Hazır mısın?',
      ctaText: 'Profesyonel müzik üretmek için SHIROA kullanan binlerce yaratıcıya katıl',
      explore: 'Müzik Kataloğunu Keşfet →',
      back: 'Ana Sayfaya Dön',
    },
  };

  const t = tr[language as 'en' | 'tr'];

  return (
    <div className="min-h-screen">
      {/* Animated Logo Header */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          transform: `translateY(${Math.min(scrollY / 2, 100)}px)`,
          opacity: Math.max(1 - scrollY / 300, 0.3),
        }}
      >
        <div className="flex items-center justify-center gap-4 py-8">
          <Image src="/logo.png" alt="SHIROA" width={60} height={60} className="rounded-2xl" />
          <h1 className="text-5xl font-bold font-orbitron animate-gradient-text bg-clip-text text-transparent">
            SHIROA
          </h1>
        </div>
      </div>

      {/* Back Button */}
      <Link 
        href="/"
        className="fixed top-8 left-8 z-50 flex items-center gap-2 px-4 py-2 rounded-lg theme-card hover:scale-105 transition-all"
      >
        <ArrowLeft size={20} className="theme-text-secondary" />
        <span className="theme-text-secondary text-sm">{t.back}</span>
      </Link>

      <div className="container mx-auto px-4 pt-48 pb-12 max-w-5xl">

        {/* About */}
        <section 
          className="mb-16 theme-card rounded-3xl p-8 transition-all duration-700"
          style={{
            opacity: Math.min(scrollY / 100, 1),
            transform: `translateY(${Math.max(50 - scrollY / 5, 0)}px)`,
          }}
        >
          <h2 className="text-4xl font-bold theme-text mb-6 font-orbitron">{t.about}</h2>
          <p className="theme-text-secondary text-lg leading-relaxed">
            {t.aboutText}
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div 
            className="theme-card rounded-2xl p-8 hover:scale-105 transition-all duration-700"
            style={{
              opacity: Math.min((scrollY - 100) / 100, 1),
              transform: `translateX(${Math.max(-50 + (scrollY - 100) / 5, 0)}px)`,
            }}
          >
            <Target size={40} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
            <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">{t.mission}</h2>
            <p className="theme-text-secondary leading-relaxed">
              {t.missionText}
            </p>
          </div>

          <div 
            className="theme-card rounded-2xl p-8 hover:scale-105 transition-all duration-700"
            style={{
              opacity: Math.min((scrollY - 100) / 100, 1),
              transform: `translateX(${Math.min(50 - (scrollY - 100) / 5, 0)}px)`,
            }}
          >
            <Eye size={40} className="mb-4" style={{ color: 'var(--theme-accent)' }} />
            <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">{t.vision}</h2>
            <p className="theme-text-secondary leading-relaxed">
              {t.visionText}
            </p>
          </div>
        </div>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold theme-text mb-8 text-center font-orbitron">{t.values}</h2>
        
          <div className="grid md:grid-cols-3 gap-6">
            <div 
              className="theme-card rounded-2xl p-6 hover:scale-105 transition-all duration-700"
              style={{
                opacity: Math.min((scrollY - 200) / 100, 1),
                transform: `scale(${Math.min(0.8 + (scrollY - 200) / 500, 1)})`,
              }}
            >
              <Heart size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
              <h3 className="text-xl font-bold theme-text mb-2">{t.passion}</h3>
              <p className="theme-text-secondary text-sm">
                {t.passionText}
              </p>
            </div>

            {[{icon: Shield, title: t.trust, text: t.trustText}, {icon: Zap, title: t.innovation, text: t.innovationText}, {icon: Users, title: t.community, text: t.communityText}, {icon: Target, title: t.quality, text: t.qualityText}, {icon: Eye, title: t.visionValue, text: t.visionValueText}].map((item, i) => (
              <div 
                key={i}
                className="theme-card rounded-2xl p-6 hover:scale-105 transition-all duration-700"
                style={{
                  opacity: Math.min((scrollY - 200 - i * 50) / 100, 1),
                  transform: `scale(${Math.min(0.8 + (scrollY - 200 - i * 50) / 500, 1)})`,
                }}
              >
                <item.icon size={32} className="mb-4" style={{ color: i % 2 === 0 ? 'var(--theme-accent)' : 'var(--theme-icon-color)' }} />
                <h3 className="text-xl font-bold theme-text mb-2">{item.title}</h3>
                <p className="theme-text-secondary text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center theme-card rounded-3xl p-12">
          <h3 className="text-3xl font-bold theme-text mb-4 font-orbitron">{t.cta}</h3>
          <p className="theme-text-secondary mb-8 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <Link 
            href="/tracks"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}
          >
            {t.explore}
          </Link>
        </div>
      </div>
    </div>
  );
}
