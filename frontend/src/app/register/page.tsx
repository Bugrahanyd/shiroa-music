"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ThemeStories from "@/components/ThemeStories";
import Toast from "@/components/Toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showThemeStories, setShowThemeStories] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password, name);
      setToast({ message: "Account created! Choose your theme", type: "success" });
      setTimeout(() => setShowThemeStories(true), 500);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setToast({ message: err.message || "Registration failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    {showThemeStories && <ThemeStories onComplete={() => router.push("/onboarding")} />}
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Dark Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1a2e] z-[-2]"></div>
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#00CED1]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#5F9FFF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#9D4EDD]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] via-[#5F9FFF] to-[#9D4EDD] drop-shadow-[0_0_30px_rgba(0,206,209,0.5)]">SHIROA</h1>
          <p className="text-gray-400 font-semibold mt-2">✨ Everything for your sound</p>
        </Link>

        {/* Form */}
        <div className="bg-[#1e293b]/80 backdrop-blur-xl border-2 border-[#00CED1]/30 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,206,209,0.2)]">
          <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 mb-8">Join SHIROA and start creating</p>

          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0f172a]/50 border-2 border-[#00CED1]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00CED1] focus:bg-[#0f172a] transition-all placeholder:text-gray-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a]/50 border-2 border-[#00CED1]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00CED1] focus:bg-[#0f172a] transition-all placeholder:text-gray-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-white font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a]/50 border-2 border-[#00CED1]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00CED1] focus:bg-[#0f172a] transition-all placeholder:text-gray-500"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="text-gray-400 text-sm mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,206,209,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-[#00CED1] hover:text-[#5F9FFF] font-bold transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 hover:text-[#00CED1] font-semibold transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
