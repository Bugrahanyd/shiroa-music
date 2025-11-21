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
  const { language, setLanguage, t } = useLanguage();

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
        setMode('code');
      } else if (mode === 'code') {
        setMode('signin');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-black via-purple-950 to-black animate-pulse" style={{ animationDuration: '8s' }}>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="SHIROA" 
            className="w-40 h-40 mx-auto mb-6 rounded-2xl shadow-2xl shadow-purple-500/50"
          />
          <h1 className="text-6xl font-black font-orbitron text-white">
            SHIROA
          </h1>
        </div>

        {/* Form Card - Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-sm font-semibold uppercase transition-colors"
          >
            {language === 'en' ? 'TR' : 'EN'}
          </button>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {t('auth.fullName')}
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
                  {t('auth.email')}
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
                  {t('auth.verificationCode')}
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
                  {t('auth.password')}
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
                    {t('auth.rememberMe')}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#ec4899] rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {loading
                ? t('auth.pleaseWait')
                : mode === 'signin'
                ? t('auth.signIn')
                : mode === 'signup'
                ? t('auth.signUp')
                : mode === 'forgot'
                ? t('auth.sendCode')
                : t('auth.verify')}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center">
            {mode === 'signin' && (
              <p className="text-white/60 text-sm">
                {t('auth.noAccount')}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {t('auth.signUp')}
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-white/60 text-sm">
                {t('auth.haveAccount')}{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {t('auth.signIn')}
                </button>
              </p>
            )}
            {(mode === 'forgot' || mode === 'code') && (
              <button
                onClick={() => setMode('signin')}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                ← {t('auth.backToSignIn')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Powered by Hydrabon */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/40 text-sm">
          Powered by{' '}
          <a 
            href="https://hydrabon.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold bg-gradient-to-r from-[#00CED1] to-[#ec4899] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            HYDRABON
          </a>
        </p>
      </div>
    </div>
  );
}
