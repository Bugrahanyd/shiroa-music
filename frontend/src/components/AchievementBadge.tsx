"use client";

import { useEffect, useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AchievementBadgeProps {
  achievement: Achievement;
  onClose: () => void;
}

export default function AchievementBadge({ achievement, onClose }: AchievementBadgeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const rarityColors = {
    common: "from-gray-500 to-gray-600",
    rare: "from-blue-500 to-blue-600",
    epic: "from-purple-500 to-purple-600",
    legendary: "from-yellow-500 to-orange-500"
  };

  return (
    <div className={`fixed top-24 right-6 z-[150] transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-[400px] opacity-0"}`}>
      <div className={`bg-gradient-to-r ${rarityColors[achievement.rarity]} p-1 rounded-2xl shadow-2xl`}>
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-6 min-w-[300px]">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{achievement.icon}</div>
            <div className="flex-1">
              <p className="text-white/60 text-xs font-bold mb-1">ACHIEVEMENT UNLOCKED</p>
              <h3 className="text-white font-bold text-lg">{achievement.title}</h3>
              <p className="text-white/60 text-sm">{achievement.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
