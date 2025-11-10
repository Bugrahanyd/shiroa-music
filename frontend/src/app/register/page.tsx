"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password, name);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-4xl font-display font-black text-turquoise">SHIROA</h1>
          <p className="text-gray-400 mt-2">Everything for your sound</p>
        </Link>

        {/* Form */}
        <div className="bg-brand-blue/20 border border-turquoise/30 rounded-3xl p-8">
          <h2 className="text-3xl font-display font-bold text-brand-white mb-2">
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
              <label className="block text-brand-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-black border border-turquoise/30 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-turquoise transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-brand-white font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-black border border-turquoise/30 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-turquoise transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-brand-white font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brand-black border border-turquoise/30 rounded-xl px-4 py-3 text-brand-white focus:outline-none focus:border-turquoise transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="text-gray-500 text-sm mt-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-turquoise text-brand-black py-4 rounded-full font-bold text-lg hover:bg-turquoise-soft transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-turquoise hover:text-turquoise-soft font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-turquoise transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
