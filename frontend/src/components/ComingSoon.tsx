'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
}

export default function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-8">
          <Sparkles className="w-20 h-20 mx-auto theme-accent animate-pulse" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-orbitron theme-text mb-6">
          {title}
        </h1>
        
        <p className="text-xl theme-text-secondary mb-12 leading-relaxed">
          {description}
        </p>
        
        <Link
          href="/discover"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl"
        >
          <ArrowLeft size={20} />
          Back to Discover
        </Link>
      </div>
    </div>
  );
}