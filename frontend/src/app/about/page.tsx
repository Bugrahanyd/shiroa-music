"use client";

import { useLanguage } from "@/lib/language-context";
import { Target, Eye, Heart, Shield, Zap, Users, Music, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { t, language } = useLanguage();

  const content = {
    en: {
      title: "About SHIROA",
      subtitle: "Everything for your sound",
      description: "SHIROA is a next-generation music platform that combines artificial intelligence with exclusive licensing. We empower creators with high-quality, unique tracks while providing producers with a fair and transparent marketplace.",
      mission: {
        title: "Our Mission",
        content: "To democratize music production by providing AI-powered tools and exclusive tracks, making professional music accessible to everyone while ensuring fair compensation for creators."
      },
      vision: {
        title: "Our Vision", 
        content: "To become the world's leading platform for AI-generated music and exclusive licensing, revolutionizing how music is created, distributed, and monetized in the digital age."
      },
      values: [
        { icon: Heart, title: "Passion", desc: "Driven by love for music and innovation" },
        { icon: Shield, title: "Trust", desc: "Transparent processes and fair practices" },
        { icon: Zap, title: "Innovation", desc: "Pushing boundaries with AI technology" },
        { icon: Users, title: "Community", desc: "Building together with creators" },
        { icon: Target, title: "Quality", desc: "Professional standards in everything" },
        { icon: Eye, title: "Vision", desc: "Long-term thinking and sustainability" }
      ],
      features: [
        {
          icon: Music,
          title: "Exclusive Licensing",
          desc: "Each track is sold only once, ensuring complete exclusivity for buyers with full commercial rights."
        },
        {
          icon: Sparkles,
          title: "AI-Powered Creation",
          desc: "Advanced artificial intelligence tools for composition, arrangement, and production assistance."
        },
        {
          icon: Shield,
          title: "Secure Transactions",
          desc: "Stripe-powered payments with instant delivery and lifetime access to purchased content."
        }
      ],
      cta: {
        title: "Ready to Create?",
        subtitle: "Join thousands of creators using SHIROA to produce professional music",
        button: "Explore Music Catalog"
      }
    },
    tr: {
      title: "SHIROA Hakkında",
      subtitle: "Sesiniz için her şey",
      description: "SHIROA, yapay zekayı özel lisanslama ile birleştiren yeni nesil bir müzik platformudur. Yaratıcılara yüksek kaliteli, benzersiz parçalar sağlarken, prodüktörlere adil ve şeffaf bir pazar yeri sunuyoruz.",
      mission: {
        title: "Misyonumuz",
        content: "AI destekli araçlar ve özel parçalar sağlayarak müzik prodüksiyonunu demokratikleştirmek, profesyonel müziği herkese erişilebilir kılarken yaratıcılar için adil tazminat sağlamak."
      },
      vision: {
        title: "Vizyonumuz",
        content: "AI üretimi müzik ve özel lisanslama alanında dünyanın önde gelen platformu olmak, dijital çağda müziğin nasıl yaratıldığı, dağıtıldığı ve para kazandığı konusunda devrim yapmak."
      },
      values: [
        { icon: Heart, title: "Tutku", desc: "Müzik ve yenilik sevgisiyle hareket ederiz" },
        { icon: Shield, title: "Güven", desc: "Şeffaf süreçler ve adil uygulamalar" },
        { icon: Zap, title: "İnovasyon", desc: "AI teknolojisiyle sınırları zorluyoruz" },
        { icon: Users, title: "Topluluk", desc: "Yaratıcılarla birlikte inşa ediyoruz" },
        { icon: Target, title: "Kalite", desc: "Her şeyde profesyonel standartlar" },
        { icon: Eye, title: "Vizyon", desc: "Uzun vadeli düşünce ve sürdürülebilirlik" }
      ],
      features: [
        {
          icon: Music,
          title: "Özel Lisanslama",
          desc: "Her parça sadece bir kez satılır, alıcılar için tam ticari haklarla birlikte tamamen özel olmasını sağlar."
        },
        {
          icon: Sparkles,
          title: "AI Destekli Yaratım",
          desc: "Kompozisyon, düzenleme ve prodüksiyon desteği için gelişmiş yapay zeka araçları."
        },
        {
          icon: Shield,
          title: "Güvenli İşlemler",
          desc: "Stripe destekli ödemeler ile anında teslimat ve satın alınan içeriğe ömür boyu erişim."
        }
      ],
      cta: {
        title: "Oluşturmaya Hazır mısınız?",
        subtitle: "Profesyonel müzik üretmek için SHIROA kullanan binlerce yaratıcıya katılın",
        button: "Müzik Kataloğunu Keşfedin"
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            SHIROA
          </h1>
          <p className="text-xl md:text-2xl theme-text-secondary mb-8">
            {currentContent.subtitle}
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg theme-text-secondary leading-relaxed">
              {currentContent.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl space-y-20">
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="theme-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold theme-text font-orbitron">
                {currentContent.mission.title}
              </h2>
            </div>
            <p className="theme-text-secondary leading-relaxed text-lg">
              {currentContent.mission.content}
            </p>
          </div>

          <div className="theme-card rounded-3xl p-8 hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold theme-text font-orbitron">
                {currentContent.vision.title}
              </h2>
            </div>
            <p className="theme-text-secondary leading-relaxed text-lg">
              {currentContent.vision.content}
            </p>
          </div>
        </div>

        {/* Features */}
        <section>
          <h2 className="text-4xl font-bold theme-text mb-12 text-center font-orbitron">
            {language === 'tr' ? 'Özelliklerimiz' : 'Our Features'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.features.map((feature, index) => (
              <div key={index} className="theme-card rounded-3xl p-8 hover:scale-105 transition-all duration-300 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold theme-text mb-4 font-orbitron">
                  {feature.title}
                </h3>
                <p className="theme-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-4xl font-bold theme-text mb-12 text-center font-orbitron">
            {language === 'tr' ? 'Değerlerimiz' : 'Our Values'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {currentContent.values.map((value, index) => (
              <div key={index} className="theme-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-center">
                <value.icon size={32} className="mx-auto mb-4 theme-accent" />
                <h3 className="text-xl font-bold theme-text mb-2">{value.title}</h3>
                <p className="theme-text-secondary text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center theme-card rounded-3xl p-12">
          <h3 className="text-4xl font-bold theme-text mb-6 font-orbitron">
            {currentContent.cta.title}
          </h3>
          <p className="theme-text-secondary mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
            {currentContent.cta.subtitle}
          </p>
          <Link 
            href="/tracks"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
          >
            {currentContent.cta.button} →
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10K+', label: language === 'tr' ? 'Parça' : 'Tracks' },
            { number: '5K+', label: language === 'tr' ? 'Sanatçı' : 'Artists' },
            { number: '50K+', label: language === 'tr' ? 'İndirme' : 'Downloads' },
            { number: '4.9', label: language === 'tr' ? 'Puan' : 'Rating' }
          ].map((stat, index) => (
            <div key={index} className="theme-card rounded-2xl p-6">
              <div className="text-4xl font-bold theme-accent mb-2">{stat.number}</div>
              <div className="theme-text-secondary font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
