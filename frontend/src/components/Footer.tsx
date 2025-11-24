'use client';

import { useTheme } from '@/lib/theme-context';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t theme-border mt-20">
      <div className="container mx-auto px-6 py-8 text-center theme-text-secondary">
        <p>&copy; 2026 SHIROA. Everything for your sound.</p>
        <p className="text-sm mt-2">
          Powered by{" "}
          <a 
            href="https://hydrabon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block font-bold bg-clip-text text-transparent hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          >
            HYDRABON
          </a>
        </p>
      </div>
    </footer>
  );
}
