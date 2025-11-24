'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Music, Sparkles, Shield, Zap, Play, Users, Star, TrendingUp, Heart, Download } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
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
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center p-4 pt-20 relative overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 + Math.sin(scrollY * 0.01) * 20}%, var(--theme-accent) 0%, transparent 50%)`,
          }}
        />
        
        <div className="max-w-6xl w-full relative z-10">
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <div 
              className="flex items-center justify-center gap-4 mb-6"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
              }}
            >
              <img 
                src="/logo.png" 
                alt="SHIROA" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-3xl shadow-2xl animate-pulse"
              />
              <h1 className="text-6xl md:text-8xl font-bold font-orbitron bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-text">
                SHIROA
              </h1>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold theme-text mb-6 leading-tight">
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">AI Music</span>
            </h2>
            <p className="text-xl md:text-2xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
              Discover exclusive AI-generated tracks, license premium beats, and join the next generation of music creators.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: Music, label: 'Tracks', value: '10K+' },
              { icon: Users, label: 'Creators', value: '5K+' },
              { icon: Download, label: 'Downloads', value: '50K+' },
              { icon: Star, label: 'Rating', value: '4.9' }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-all">
                <stat.icon className="w-8 h-8 mx-auto mb-3 theme-accent" />
                <div className="text-2xl font-bold theme-text">{stat.value}</div>
                <div className="text-sm theme-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/tracks"
              className={`px-8 py-4 rounded-2xl ${getGradientClass()} text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3`}
            >
              <Play size={20} />
              Explore Music
            </Link>
            
            {!user && (
              <Link
                href="/register"
                className="px-8 py-4 rounded-2xl glass-card theme-text font-bold text-lg hover:scale-105 transition-all border border-white/20"
              >
                Join SHIROA
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center theme-text mb-16 font-orbitron">
            Why Choose SHIROA?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:scale-105 transition-all group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4">AI-Powered Creation</h3>
              <p className="theme-text-secondary leading-relaxed">
                Advanced AI algorithms generate unique, high-quality music tracks tailored to your creative vision.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:scale-105 transition-all group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4">Exclusive Licensing</h3>
              <p className="theme-text-secondary leading-relaxed">
                Get exclusive rights to premium tracks with clear licensing terms for commercial use.
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:scale-105 transition-all group">
              <div className={`w-16 h-16 rounded-2xl ${getGradientClass()} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold theme-text mb-4">Growing Community</h3>
              <p className="theme-text-secondary leading-relaxed">
                Join thousands of creators, producers, and music enthusiasts in our thriving ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold theme-text mb-6 font-orbitron">
              Ready to Create?
            </h2>
            <p className="text-xl theme-text-secondary mb-8 max-w-2xl mx-auto">
              Join SHIROA today and discover the future of music production. Start with our free tier and unlock premium features as you grow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tracks"
                className={`px-10 py-5 rounded-2xl ${getGradientClass()} text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-3`}
              >
                <Music size={24} />
                Browse Catalog
              </Link>
              
              <Link
                href="/about"
                className="px-10 py-5 rounded-2xl glass-card theme-text font-bold text-xl hover:scale-105 transition-all border border-white/20 flex items-center justify-center gap-3"
              >
                <Heart size={24} />
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
