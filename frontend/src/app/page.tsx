'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';

type FormMode = 'signin' | 'signup' | 'forgot' | 'code';

export default function GatePage() {
  const [mode, setMode] = useState<FormMode>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await login(email, password);
        router.push('/tracks');
      } else if (mode === 'signup') {
        await register(email, password, name);
        router.push('/tracks');
      } else if (mode === 'forgot') {
        // Simulate sending email
        setMode('code');
      } else if (mode === 'code') {
        // Simulate code verification
        setMode('signin');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ec4899]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#ff6b35]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="SHIROA" 
            className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-2xl"
          />
          <h1 className="text-7xl font-black font-orbitron mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#ec4899] to-[#ff6b35] animate-gradient-text bg-[length:200%_auto]">
              SHIROA
            </span>
          </h1>
          <p className="text-white/70 text-lg">
            {language === 'tr' ? 'Sesiniz için her şey' : 'Everything for your sound'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {language === 'tr' ? 'Ad Soyad' : 'Full Name'}
                </label>
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

            {mode !== 'code' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {language === 'tr' ? 'E-posta' : 'Email'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            )}

            {mode === 'code' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {language === 'tr' ? 'Doğrulama Kodu' : 'Verification Code'}
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="123456"
                />
              </div>
            )}

            {(mode === 'signin' || mode === 'signup') && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {language === 'tr' ? 'Şifre' : 'Password'}
                </label>
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
            )}

            {mode === 'signin' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm text-white/60">
                    {language === 'tr' ? 'Beni Hatırla' : 'Remember Me'}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {language === 'tr' ? 'Şifremi Unuttum' : 'Forgot Password'}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#00f5ff] via-[#a855f7] to-[#ec4899] rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {loading
                ? (language === 'tr' ? 'Lütfen bekleyin...' : 'Please wait...')
                : mode === 'signin'
                ? (language === 'tr' ? 'Giriş Yap' : 'Sign In')
                : mode === 'signup'
                ? (language === 'tr' ? 'Kayıt Ol' : 'Sign Up')
                : mode === 'forgot'
                ? (language === 'tr' ? 'Kod Gönder' : 'Send Code')
                : (language === 'tr' ? 'Doğrula' : 'Verify')}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center">
            {mode === 'signin' && (
              <p className="text-white/60 text-sm">
                {language === 'tr' ? 'Hesabın yok mu?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {language === 'tr' ? 'Kayıt Ol' : 'Sign Up'}
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-white/60 text-sm">
                {language === 'tr' ? 'Zaten hesabın var mı?' : 'Already have an account?'}{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {language === 'tr' ? 'Giriş Yap' : 'Sign In'}
                </button>
              </p>
            )}
            {(mode === 'forgot' || mode === 'code') && (
              <button
                onClick={() => setMode('signin')}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                ← {language === 'tr' ? 'Giriş sayfasına dön' : 'Back to Sign In'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
