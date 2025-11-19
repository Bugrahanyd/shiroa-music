"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();

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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-20 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: 'var(--theme-icon-color)' }}></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: 'var(--theme-accent)' }}></div>

      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 z-10">
        <Image src="/logo.jpg" alt="SHIROA" width={32} height={32} className="rounded-lg" />
        <span className="text-xl font-bold theme-text font-orbitron">SHIROA</span>
      </Link>

      {/* Main Card */}
      <div className="max-w-md w-full relative z-10">
        {/* Glassmorphism Card */}
        <div className="theme-card backdrop-blur-xl bg-opacity-50 rounded-3xl p-8 shadow-2xl border-2">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold theme-text mb-2 font-orbitron">Welcome Back</h1>
            <p className="theme-text-secondary">Sign in to continue to SHIROA</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm theme-text-secondary font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 theme-card backdrop-blur-sm rounded-xl theme-text placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm theme-text-secondary font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 theme-card backdrop-blur-sm rounded-xl theme-text placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                style={{ '--tw-ring-color': 'var(--theme-icon-color)' } as any}
                placeholder="••••••••"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm theme-accent hover:opacity-80 transition-opacity">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-white disabled:opacity-50"
              style={{ background: `linear-gradient(135deg, var(--theme-icon-color), var(--theme-accent))` }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t theme-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 theme-bg theme-text-secondary">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="theme-text-secondary text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="theme-accent font-semibold hover:opacity-80 transition-opacity">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="theme-text-secondary hover:theme-text transition-colors text-sm">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
