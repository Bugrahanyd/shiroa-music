"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { Target, Eye, Heart, Shield, Zap, Users } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Image src="/logo.jpg" alt="SHIROA" width={80} height={80} className="rounded-2xl" />
          <h1 className="text-6xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] via-[#5F9FFF] to-[#9D4EDD]">
            SHIROA
          </h1>
        </div>
        <p className="text-xl theme-text-secondary">AI-Powered Music Production & Licensing Platform</p>
      </div>

      {/* About */}
      <section className="mb-16 theme-card rounded-3xl p-8">
        <h2 className="text-4xl font-bold theme-text mb-6 font-orbitron">About Us</h2>
        <p className="theme-text-secondary text-lg leading-relaxed">
          SHIROA is a next-generation music platform combining AI technology with exclusive licensing. 
          We empower creators with high-quality, unique tracks and provide producers with a fair marketplace. 
          Born from passion for music and innovation, we're building the future of music production.
        </p>
      </section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="theme-card rounded-2xl p-8 hover:scale-105 transition-transform">
          <Target size={40} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
          <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">Our Mission</h2>
          <p className="theme-text-secondary leading-relaxed">
            To democratize music production by providing AI-powered tools and exclusive tracks, 
            making professional music accessible to everyone.
          </p>
        </div>

        <div className="theme-card rounded-2xl p-8 hover:scale-105 transition-transform">
          <Eye size={40} className="mb-4" style={{ color: 'var(--theme-accent)' }} />
          <h2 className="text-3xl font-bold theme-text mb-4 font-orbitron">Our Vision</h2>
          <p className="theme-text-secondary leading-relaxed">
            To become the world's leading platform for AI-generated music and exclusive licensing, 
            revolutionizing how music is created and distributed.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold theme-text mb-8 text-center font-orbitron">Our Values</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Heart size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
            <h3 className="text-xl font-bold theme-text mb-2">Passion</h3>
            <p className="theme-text-secondary text-sm">
              Driven by love for music and innovation
            </p>
          </div>

          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Shield size={32} className="mb-4" style={{ color: 'var(--theme-accent)' }} />
            <h3 className="text-xl font-bold theme-text mb-2">Trust</h3>
            <p className="theme-text-secondary text-sm">
              Transparent processes and fair practices
            </p>
          </div>

          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Zap size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)', opacity: 0.8 }} />
            <h3 className="text-xl font-bold theme-text mb-2">Innovation</h3>
            <p className="theme-text-secondary text-sm">
              Pushing boundaries with AI technology
            </p>
          </div>

          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Users size={32} className="mb-4" style={{ color: 'var(--theme-accent)', opacity: 0.8 }} />
            <h3 className="text-xl font-bold theme-text mb-2">Community</h3>
            <p className="theme-text-secondary text-sm">
              Building together with creators
            </p>
          </div>

          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Target size={32} className="mb-4" style={{ color: 'var(--theme-icon-color)' }} />
            <h3 className="text-xl font-bold theme-text mb-2">Quality</h3>
            <p className="theme-text-secondary text-sm">
              Professional standards in everything
            </p>
          </div>

          <div className="theme-card rounded-2xl p-6 hover:scale-105 transition-transform">
            <Eye size={32} className="mb-4" style={{ color: 'var(--theme-accent)' }} />
            <h3 className="text-xl font-bold theme-text mb-2">Vision</h3>
            <p className="theme-text-secondary text-sm">
              Long-term thinking and sustainability
            </p>
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
          className="inline-block px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}
        >
          Explore Music Catalog →
        </Link>
      </div>
    </div>
  );
}
