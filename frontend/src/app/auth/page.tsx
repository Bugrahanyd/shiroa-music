'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const translations = {
    en: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      pleaseWait: 'Please wait...',
      tagline: 'Everything for your sound',
      subtitle: 'AI-Powered Music Production',
    },
    tr: {
      signIn: 'Giriş Yap',
      signUp: 'Kayıt Ol',
      fullName: 'Ad Soyad',
      email: 'E-posta',
      password: 'Şifre',
      pleaseWait: 'Lütfen bekleyin...',
      tagline: 'Sesiniz için her şey',
      subtitle: 'AI Destekli Müzik Prodüksiyonu',
    },
  };

  const tr = translations[language as 'en' | 'tr'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #0a0a0a, #1a1a2e)' }}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold font-orbitron mb-2">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SHIROA
            </span>
          </h1>
          <p className="text-white/60 text-lg">{tr.tagline}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Toggle */}
          <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isLogin ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-white/60'
              }`}
            >
              {tr.signIn}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isLogin ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-white/60'
              }`}
            >
              {tr.signUp}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">{tr.fullName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-white/60 font-medium block mb-2">{tr.email}</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 font-medium block mb-2">{tr.password}</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl font-bold text-white hover:shadow-2xl transition-all disabled:opacity-50"
            >
              {loading ? tr.pleaseWait : isLogin ? tr.signIn : tr.signUp}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
