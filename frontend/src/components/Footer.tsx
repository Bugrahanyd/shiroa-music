import Link from "next/link";

'use client';

import { useTheme } from '@/lib/theme-context';

export default function Footer() {
  const { theme } = useTheme();

  const getThemeColor = () => {
    switch (theme) {
      case 'japanese':
        return '#FF6B9D';
      case 'neon':
        return '#00CED1';
      case 'light':
        return '#5F9FFF';
      default:
        return '#9D4EDD';
    }
  };

  return (
    <footer className="border-t border-[#00CED1]/20 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2026 SHIROA. Everything for your sound.</p>
        <p className="text-sm mt-2">
          SHIROA bir{" "}
          <a 
            href="https://hydrabon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block font-bold bg-clip-text text-transparent hover:scale-110 transition-transform duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, ${getThemeColor()}, #FF8C00, ${getThemeColor()})`,
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            HYDRABON
          </a>
          {" "}iştirakidir.
        </p>
      </div>
    </footer>
  );
}
