"use client";

import { useState } from "react";

interface Notification {
  id: string;
  type: "sale" | "comment" | "follow" | "achievement";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "sale",
      title: "New Sale!",
      message: "Your track 'Midnight Dreams' was purchased",
      time: "2m ago",
      read: false
    },
    {
      id: "2",
      type: "follow",
      title: "New Follower",
      message: "John Doe started following you",
      time: "1h ago",
      read: false
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked",
      message: "First Sale - You made your first sale!",
      time: "2h ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const typeIcons = {
    sale: "💰",
    comment: "💬",
    follow: "👤",
    achievement: "🏆"
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/60 hover:text-white transition-all"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold">Notifications</h3>
            <button
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
              className="text-[#00CED1] text-sm hover:text-[#5F9FFF] transition-all"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-white/5 transition-all border-b border-white/5 ${
                    !notification.read ? "bg-white/5" : ""
                  }`}
                >
                  <span className="text-2xl">{typeIcons[notification.type]}</span>
                  <div className="flex-1 text-left">
                    <h4 className="text-white font-semibold">{notification.title}</h4>
                    <p className="text-white/60 text-sm">{notification.message}</p>
                    <p className="text-white/40 text-xs mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#00CED1] rounded-full"></div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
