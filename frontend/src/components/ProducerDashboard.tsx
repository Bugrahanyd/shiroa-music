"use client";

import { useState } from "react";

interface Stats {
  totalSales: number;
  revenue: number;
  views: number;
  followers: number;
}

export default function ProducerDashboard() {
  const [stats] = useState<Stats>({
    totalSales: 47,
    revenue: 12450,
    views: 8932,
    followers: 234
  });

  const [recentSales] = useState([
    { id: "1", track: "Midnight Dreams", buyer: "John D.", amount: 299, time: "2h ago" },
    { id: "2", track: "Urban Pulse", buyer: "Sarah M.", amount: 199, time: "5h ago" },
    { id: "3", track: "Sunset Vibes", buyer: "Mike R.", amount: 149, time: "1d ago" }
  ]);

  const statCards = [
    { label: "Total Sales", value: stats.totalSales, icon: "💰", color: "from-green-500 to-emerald-500" },
    { label: "Revenue", value: `$${stats.revenue}`, icon: "📈", color: "from-blue-500 to-cyan-500" },
    { label: "Total Views", value: stats.views.toLocaleString(), icon: "👁️", color: "from-purple-500 to-pink-500" },
    { label: "Followers", value: stats.followers, icon: "👥", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-display font-black text-white">Producer Dashboard</h1>
        <button className="bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all">
          Upload New Track
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-white/60 text-sm mb-1">{stat.label}</p>
            <p className="text-white text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Sales */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-4">Recent Sales</h2>
        <div className="space-y-3">
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex-1">
                <h3 className="text-white font-bold">{sale.track}</h3>
                <p className="text-white/60 text-sm">Purchased by {sale.buyer}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">${sale.amount}</p>
                <p className="text-white/40 text-sm">{sale.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-display font-bold text-white mb-4">Revenue Overview</h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-[#00CED1] to-[#5F9FFF] rounded-t-lg" style={{ height: `${height}%` }}></div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-white/40 text-sm">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
}
