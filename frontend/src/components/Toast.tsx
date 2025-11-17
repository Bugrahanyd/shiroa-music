"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "from-green-500 to-emerald-500",
    error: "from-red-500 to-rose-500",
    info: "from-blue-500 to-cyan-500"
  };

  return (
    <div className="fixed top-6 right-6 z-[200] animate-slide-in">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl">
          {type === "success" && "✓"}
          {type === "error" && "✕"}
          {type === "info" && "ℹ"}
        </span>
        <p className="font-semibold flex-1">{message}</p>
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
}
