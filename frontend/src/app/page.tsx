'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

type FormMode = 'signin' | 'signup' | 'forgot' | 'code';

const translations = {
  en: {
    fullName: "Full Name",
    email: "Email",
    password: "Password",
    verificationCode: "Verification Code",
    emailPlaceholder: "name@example.com",
    passwordPlaceholder: "••••••••",
    rememberMe: "Remember for 30 days",
    forgotPassword: "Forgot password?",
    signInButton: "Enter SHIROA",
    signUpButton: "Sign Up",
    sendCode: "Send Code",
    verify: "Verify",
    pleaseWait: "Please wait...",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signUp: "Sign up",
    signIn: "Sign In",
    backToSignIn: "Back to Sign In",
    poweredBy: "Powered by"
  },
  tr: {
    fullName: "Ad Soyad",
    email: "E-posta",
    password: "Şifre",
    verificationCode: "Doğrulama Kodu",
    emailPlaceholder: "isim@ornek.com",
    passwordPlaceholder: "••••••••",
    rememberMe: "30 gün beni hatırla",
    forgotPassword: "Şifremi unuttum?",
    signInButton: "SHIROA'ya Gir",
    signUpButton: "Kayıt Ol",
    sendCode: "Kod Gönder",
    verify: "Doğrula",
    pleaseWait: "Lütfen bekleyin...",
    noAccount: "Hesabın yok mu?",
    haveAccount: "Zaten hesabın var mı?",
    signUp: "Kayıt Ol",
    signIn: "Giriş Yap",
    backToSignIn: "Giriş sayfasına dön",
    poweredBy: "Altyapı:"
  }
};

export default function GatePage() {
  const [mode, setMode] = useState<FormMode>('signin');
  const [lang, setLang] = useState<'en' | 'tr'>('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();
  
  const t = translations[lang];

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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-black">
      {/* Language Switcher - Hydrabon Style */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3 select-none">
        <button
          onClick={() => setLang('en')}
          className={`text-sm font-bold tracking-widest transition-colors ${
            lang === 'en' ? 'text-white' : 'text-white/40 hover:text-white'
          }`}
        >
          EN
        </button>
        <div className="h-4 w-[1px] bg-white/20"></div>
        <button
          onClick={() => setLang('tr')}
          className={`text-sm font-bold tracking-widest transition-colors ${
            lang === 'tr' ? 'text-white' : 'text-white/40 hover:text-white'
          }`}
        >
          TR
        </button>
      </div>

      {/* Glow Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8 flex flex-col items-center gap-4">
          <img 
            src="/logo.png" 
            alt="SHIROA" 
            className="w-40 h-40"
          />
          <h1 className="text-6xl font-black font-orbitron text-white">
            SHIROA
          </h1>
        </div>

        {/* Form Card - Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {t.fullName}
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
                  {t.email}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder={t.emailPlaceholder}
                />
              </div>
            )}

            {mode === 'code' && (
              <div>
                <label className="text-sm text-white/60 font-medium block mb-2">
                  {t.verificationCode}
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
                  {t.password}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-all"
                  placeholder={t.passwordPlaceholder}
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
                    {t.rememberMe}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {t.forgotPassword}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#00CED1] to-[#ec4899] rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              {loading
                ? t.pleaseWait
                : mode === 'signin'
                ? t.signInButton
                : mode === 'signup'
                ? t.signUpButton
                : mode === 'forgot'
                ? t.sendCode
                : t.verify}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 text-center">
            {mode === 'signin' && (
              <p className="text-white/60 text-sm">
                {t.noAccount}{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {t.signUp}
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-white/60 text-sm">
                {t.haveAccount}{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {t.signIn}
                </button>
              </p>
            )}
            {(mode === 'forgot' || mode === 'code') && (
              <button
                onClick={() => setMode('signin')}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                ← {t.backToSignIn}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Powered by Hydrabon */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-white/40 text-sm">
          {t.poweredBy}{' '}
          <a 
            href="https://hydrabon.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-bold hover:scale-105 transition-transform inline-block"
          >
            HYDRABON
          </a>
        </p>
      </div>
    </div>
  );
}
