"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTheme, Theme } from "@/lib/theme-context";

const themes = [
  { 
    id: "dark" as Theme, 
    gradient: "from-[#0a1628] via-[#1a2f4a] to-[#0a1628]",
    icon: "🌊"
  },
  { 
    id: "warm" as Theme, 
    gradient: "from-[#2d1b1b] via-[#4a2c2c] to-[#2d1b1b]",
    icon: "🌅"
  },
  { 
    id: "cool" as Theme, 
    gradient: "from-[#1a2332] via-[#2d3f5a] to-[#1a2332]",
    icon: "❄️"
  },
  { 
    id: "neon" as Theme, 
    gradient: "from-[#1a0033] via-[#330066] to-[#1a0033]",
    icon: "🌃"
  },
  { 
    id: "classic" as Theme, 
    gradient: "from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]",
    icon: "⚫"
  },
  { 
    id: "sakura" as Theme, 
    gradient: "from-[#2d1b2e] via-[#4a2f4d] to-[#2d1b2e]",
    icon: "🌸"
  }
];

export default function OnboardingPage() {

  const { setTheme } = useTheme();
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  const handleContinue = () => {
    if (selectedTheme) {
      setTheme(selectedTheme);
      localStorage.setItem("onboarding-completed", "true");
    }
    router.push("/dashboard");
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding-completed", "true");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-[family-name:var(--font-orbitron)] font-black text-white mb-4">
Choose Your Creative Atmosphere
          </h1>
          <p className="text-xl text-white/60">
Select a theme that resonates with your creative spirit. You can change it anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`group relative bg-gradient-to-br ${theme.gradient} rounded-3xl p-8 transition-all duration-300 hover:scale-105 ${
                selectedTheme === theme.id
                  ? "ring-4 ring-white scale-105"
                  : "ring-1 ring-white/20"
              }`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {theme.icon}
              </div>

              <h3 className="text-2xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-3">
{theme.id === 'dark' ? 'Midnight Ocean' : theme.id === 'warm' ? 'Sunset Boulevard' : theme.id === 'cool' ? 'Arctic Aurora' : theme.id === 'neon' ? 'Tokyo Nights' : theme.id === 'classic' ? 'Timeless Elegance' : 'Sakura Dreams'}
              </h3>

              <p className="text-white/80 text-sm leading-relaxed mb-4">
{theme.id === 'dark' ? 'Dive into the depths of creativity...' : theme.id === 'warm' ? 'Feel the warmth of golden hour...' : theme.id === 'cool' ? 'Experience the serene beauty...' : theme.id === 'neon' ? 'Step into the electric pulse...' : theme.id === 'classic' ? 'Embrace the sophistication...' : 'Float through cherry blossom gardens...'}
              </p>

              <p className="text-white/60 text-xs font-semibold">
{theme.id === 'dark' ? 'Professional • Focused • Mysterious' : theme.id === 'warm' ? 'Energetic • Passionate • Creative' : theme.id === 'cool' ? 'Clear • Calm • Inspiring' : theme.id === 'neon' ? 'Bold • Modern • Electric' : theme.id === 'classic' ? 'Minimal • Elegant • Timeless' : 'Peaceful • Delicate • Harmonious'}
              </p>

              {selectedTheme === theme.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleSkip}
            className="px-8 py-4 border-2 border-white/20 text-white/60 rounded-full font-semibold hover:border-white/40 hover:text-white transition-all"
          >
Skip for now
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedTheme}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
Continue
          </button>
        </div>
      </div>
    </div>
  );
}
