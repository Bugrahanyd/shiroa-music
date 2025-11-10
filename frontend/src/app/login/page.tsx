"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="text-4xl font-display font-black text-turquoise">SHIROA</h1>
          <p className="text-gray-400 mt-2">Everything for your sound</p>
        </Link>

        {/* Form */}
        <div className="bg-brand-blue/20 border border-turquoise/30 rounded-3xl p-8">
          <h2 className="text-3xl font-display font-bold text-brand-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-8">Login to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-turquoise text-brand-black py-4 rounded-full font-bold text-lg hover:bg-turquoise-soft transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-turquoise hover:text-turquoise-soft font-medium">
                Sign up
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
