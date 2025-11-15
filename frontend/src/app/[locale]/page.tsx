import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00CED1]/5 to-transparent rounded-3xl blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-6xl md:text-7xl font-[family-name:var(--font-orbitron)] font-black text-white mb-6 leading-tight">
            {t('hero.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/tracks" 
              className="bg-[#00CED1] text-[#0a1628] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5FE0E5] transition-all shadow-[0_0_20px_rgba(0,206,209,0.4)] hover:shadow-[0_0_30px_rgba(0,206,209,0.6)]"
            >
              {t('hero.browseCatalog')}
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-[#00CED1] text-[#00CED1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#00CED1]/20 transition-all"
            >
              {t('hero.howItWorks')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#00CED1]/30 rounded-2xl p-8 hover:border-[#00CED1] hover:bg-[#00CED1]/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,206,209,0.4)] hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00CED1] to-[#5F9FFF] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,206,209,0.4)] group-hover:shadow-[0_0_25px_rgba(0,206,209,0.6)] transition-all duration-500 group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2 group-hover:text-[#00CED1] transition-colors duration-300">
              {t('features.exclusivity.title')}
            </h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              {t('features.exclusivity.description')}
            </p>
          </div>

          <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#5F9FFF]/30 rounded-2xl p-8 hover:border-[#5F9FFF] hover:bg-[#5F9FFF]/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(95,159,255,0.4)] hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5F9FFF] to-[#9D4EDD] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(95,159,255,0.4)] group-hover:shadow-[0_0_25px_rgba(95,159,255,0.6)] transition-all duration-500 group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2 group-hover:text-[#5F9FFF] transition-colors duration-300">
              {t('features.aiPowered.title')}
            </h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              {t('features.aiPowered.description')}
            </p>
          </div>

          <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#9D4EDD]/30 rounded-2xl p-8 hover:border-[#9D4EDD] hover:bg-[#9D4EDD]/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(157,78,221,0.4)] hover:scale-105 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9D4EDD] to-[#00CED1] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(157,78,221,0.4)] group-hover:shadow-[0_0_25px_rgba(157,78,221,0.6)] transition-all duration-500 group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2 group-hover:text-[#9D4EDD] transition-colors duration-300">
              {t('features.instant.title')}
            </h3>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
              {t('features.instant.description')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00CED1] to-[#5FE0E5] rounded-3xl p-12 text-center shadow-[0_0_40px_rgba(0,206,209,0.3)]">
          <h3 className="text-4xl font-[family-name:var(--font-orbitron)] font-black text-[#0a1628] mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-lg text-[#0a1628]/80 mb-8">
            {t('cta.subtitle')}
          </p>
          <Link 
            href="/tracks" 
            className="inline-block bg-[#0a1628] text-[#00CED1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1e3a5f] transition-all shadow-lg hover:shadow-xl"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
