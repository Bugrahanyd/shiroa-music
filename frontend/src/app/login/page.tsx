"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      {/* Bright Welcoming Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#FFE5F1] via-[#E0F4FF] to-[#F0E5FF] z-[-2]"></div>
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00CED1]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#C77DFF]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#00CED1] to-[#C77DFF] drop-shadow-lg">SHIROA</h1>
          <p className="text-[#6B7280] font-semibold mt-2">✨ Everything for your sound</p>
        </Link>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
          <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#C77DFF] mb-2">
            Welcome Back! 👋
          </h2>
          <p className="text-[#6B7280] mb-8">We're excited to see you again</p>

          {error && (
            <div className="bg-[#FFE5E5] border-2 border-[#FF6B6B] rounded-xl p-4 mb-6">
              <p className="text-[#FF0000] text-sm font-semibold">⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#374151] font-bold mb-2">
                📧 Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 border-2 border-[#00CED1]/30 rounded-xl px-4 py-3 text-[#1F2937] focus:outline-none focus:border-[#00CED1] focus:bg-white transition-all placeholder:text-[#9CA3AF]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-[#374151] font-bold mb-2">
                🔒 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 border-2 border-[#00CED1]/30 rounded-xl px-4 py-3 text-[#1F2937] focus:outline-none focus:border-[#00CED1] focus:bg-white transition-all placeholder:text-[#9CA3AF]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6B9D] via-[#00CED1] to-[#C77DFF] text-white py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,206,209,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? "Logging in... ⏳" : "Login →"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7280]">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#00CED1] hover:text-[#FF6B9D] font-bold transition-colors">
                Sign up ✨
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-[#6B7280] hover:text-[#00CED1] font-semibold transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
