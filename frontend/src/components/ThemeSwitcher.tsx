"use client";

import { useTheme, Theme } from "@/lib/theme-context";
import { useAuth } from "@/lib/auth-context";

const themes = [
  { id: "dark" as Theme, name: "Midnight Ocean", icon: "🌊", colors: "from-[#0a1628] to-[#1a2f4a]" },
  { id: "warm" as Theme, name: "Sunset Boulevard", icon: "🌅", colors: "from-[#2d1b1b] to-[#4a2c2c]" },
  { id: "cool" as Theme, name: "Arctic Aurora", icon: "❄️", colors: "from-[#1a2332] to-[#2d3f5a]" },
  { id: "neon" as Theme, name: "Tokyo Nights", icon: "🌃", colors: "from-[#1a0033] to-[#330066]" },
  { id: "classic" as Theme, name: "Timeless Elegance", icon: "⚫", colors: "from-[#0a0a0a] to-[#1a1a1a]" },
  { id: "sakura" as Theme, name: "Sakura Dreams", icon: "🌸", colors: "from-[#2d1b2e] to-[#4a2f4d]" }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-black/80 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl">
        <p className="text-white/60 text-xs font-semibold mb-3 text-center">THEME</p>
        <p className="text-white/40 text-[10px] mb-2 text-center">Signed in</p>
        <div className="flex gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`group relative w-12 h-12 rounded-xl bg-gradient-to-br ${t.colors} transition-all duration-300 hover:scale-110 ${
                theme === t.id ? "ring-2 ring-white scale-110" : "ring-1 ring-white/20"
              }`}
              title={t.name}
            >
              <span className="text-xl">{t.icon}</span>
              {theme === t.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
