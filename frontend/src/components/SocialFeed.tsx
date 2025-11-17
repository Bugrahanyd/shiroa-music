"use client";

import { useState } from "react";

interface Post {
  id: string;
  user: string;
  avatar: string;
  action: string;
  track?: string;
  time: string;
  likes: number;
  comments: number;
}

export default function SocialFeed() {
  const [posts] = useState<Post[]>([
    {
      id: "1",
      user: "Luna Wave",
      avatar: "🎵",
      action: "uploaded a new track",
      track: "Midnight Dreams",
      time: "2h ago",
      likes: 24,
      comments: 5
    },
    {
      id: "2",
      user: "City Beats",
      avatar: "🎧",
      action: "made their first sale",
      time: "5h ago",
      likes: 18,
      comments: 3
    },
    {
      id: "3",
      user: "Chill Masters",
      avatar: "🌙",
      action: "reached 100 followers",
      time: "1d ago",
      likes: 42,
      comments: 8
    }
  ]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-display font-bold text-white">Community Feed</h2>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00CED1] to-[#5F9FFF] rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {post.avatar}
              </div>
              
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-bold">{post.user}</span>
                  {" "}
                  <span className="text-white/60">{post.action}</span>
                  {post.track && (
                    <>
                      {" "}
                      <span className="text-[#00CED1] font-semibold">"{post.track}"</span>
                    </>
                  )}
                </p>
                <p className="text-white/40 text-sm mt-1">{post.time}</p>
                
                {post.track && (
                  <div className="mt-4 bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#00CED1] to-[#5F9FFF] rounded-lg"></div>
                      <div>
                        <p className="text-white font-semibold">{post.track}</p>
                        <p className="text-white/60 text-sm">{post.user}</p>
                      </div>
                    </div>
                    <button className="text-white/60 hover:text-white text-2xl">▶</button>
                  </div>
                )}
                
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-all">
                    <span>❤️</span>
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#00CED1] transition-all">
                    <span>💬</span>
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#5F9FFF] transition-all">
                    <span>🔗</span>
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
