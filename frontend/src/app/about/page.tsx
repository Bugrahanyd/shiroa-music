"use client";

import { useLanguage } from "@/lib/language-context";
import { Target, Eye, Heart, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24">
      {/* Clean Header */}
      <div className="text-center py-12">
        <h1 className="text-6xl font-bold font-orbitron bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          SHIROA
        </h1>
        <p className="theme-text-secondary text-xl">Everything for your sound</p>
      </div>

      <div className="container mx-auto px-4 pb-12 max-w-5xl">
        {/* About Section */}
        <section className="mb-16 theme-card rounded-3xl p-8">
          <h2 className="text-4xl font-bold theme-text mb-6 font-orbitron">{t('about.title')}</h2>
          <p className="theme-text-secondary text-lg leading-relaxed">
            SHIROA is a next-generation music platform combining AI technology with exclusive licensing. We empower creators with high-quality, unique tracks and provide producers with a fair marketplace.
          </p>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="theme-card rounded-2xl p-8 hover:scale-105 transition-all">
            <Target size={40} className="mb-4 theme-accent" />
            <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">{t('about.mission')}</h2>
            <p className="theme-text-secondary leading-relaxed">
              To democratize music production by providing AI-powered tools and exclusive tracks, making professional music accessible to everyone.
            </p>
          </div>

          <div className="theme-card rounded-2xl p-8 hover:scale-105 transition-all">
            <Eye size={40} className="mb-4 theme-accent" />
            <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">{t('about.vision')}</h2>
            <p className="theme-text-secondary leading-relaxed">
              To become the world's leading platform for AI-generated music and exclusive licensing, revolutionizing how music is created and distributed.
            </p>
          </div>
        </div>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold theme-text mb-8 text-center font-orbitron">{t('about.values')}</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Heart size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Passion</h3>
              <p className="theme-text-secondary text-sm">Driven by love for music and innovation</p>
            </div>

            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Shield size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Trust</h3>
              <p className="theme-text-secondary text-sm">Transparent processes and fair practices</p>
            </div>

            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Zap size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Innovation</h3>
              <p className="theme-text-secondary text-sm">Pushing boundaries with AI technology</p>
            </div>

            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Users size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Community</h3>
              <p className="theme-text-secondary text-sm">Building together with creators</p>
            </div>

            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Target size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Quality</h3>
              <p className="theme-text-secondary text-sm">Professional standards in everything</p>
            </div>

            <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-all">
              <Eye size={32} className="mb-4 theme-accent" />
              <h3 className="text-xl font-bold theme-text mb-2">Vision</h3>
              <p className="theme-text-secondary text-sm">Long-term thinking and sustainability</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center theme-card rounded-3xl p-12">
          <h3 className="text-3xl font-bold theme-text mb-4 font-orbitron">Ready to Create?</h3>
          <p className="theme-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of creators using SHIROA to produce professional music
          </p>
          <Link 
            href="/tracks"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-all"
          >
            Explore Music Catalog →
          </Link>
        </div>
      </div>
    </div>
  );
}