'use client';

import Link from 'next/link';
import { Music, Sparkles, Zap, Shield } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export default function LandingPage() {
  const { theme } = useTheme();

  const getGradientClass = () => {
    switch (theme) {
      case 'japanese':
        return 'bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600';
      case 'neon':
        return 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500';
      case 'dark':
        return 'bg-gradient-to-r from-gray-500 via-blue-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img 
              src="/logo.jpg" 
              alt="SHIROA" 
              className="w-16 h-16 rounded-2xl shadow-2xl"
              style={{ imageRendering: 'crisp-edges' }}
            />
            <div className="flex">
              {['S', 'H', 'I', 'R', 'O', 'A'].map((letter, index) => (
                <span
                  key={index}
                  className="text-5xl font-bold font-orbitron animate-float"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    color: ['#00CED1', '#5F9FFF', '#9D4EDD', '#FF6B9D', '#FFB347', '#00CED1'][index],
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold theme-text mb-4">
            Everything for your sound
          </h1>
          <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
            AI-powered music production and exclusive licensing platform
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className={`w-12 h-12 rounded-xl ${getGradientClass()} flex items-center justify-center mx-auto mb-4`}>
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="font-bold theme-text mb-2">AI Studio</h3>
            <p className="text-sm theme-text-secondary">Create unique tracks with AI</p>
          </div>

          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className={`w-12 h-12 rounded-xl ${getGradientClass()} flex items-center justify-center mx-auto mb-4`}>
              <Music className="text-white" size={24} />
            </div>
            <h3 className="font-bold theme-text mb-2">Exclusive Tracks</h3>
            <p className="text-sm theme-text-secondary">License premium music</p>
          </div>

          <div className="glass-card p-6 text-center hover:scale-105 transition-transform">
            <div className={`w-12 h-12 rounded-xl ${getGradientClass()} flex items-center justify-center mx-auto mb-4`}>
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="font-bold theme-text mb-2">Full Rights</h3>
            <p className="text-sm theme-text-secondary">Own your music forever</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold theme-text mb-4">Ready to create?</h2>
          <p className="theme-text-secondary mb-8">Join SHIROA and start producing music today</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className={`px-8 py-4 rounded-xl ${getGradientClass()} text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center gap-2`}
            >
              <Zap size={20} />
              Get Started
            </Link>
            
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl glass-card theme-text font-bold text-lg hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          </div>

          <p className="text-sm theme-text-secondary mt-6">
            No credit card required • Free to start
          </p>
        </div>
      </div>
    </div>
  );
}
