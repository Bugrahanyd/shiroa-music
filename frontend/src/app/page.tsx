import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0C0C]">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-6xl font-[family-name:var(--font-orbitron)] font-black text-white mb-6">
          Everything for your <span className="text-[#00CED1]">sound</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          AI-powered music production and exclusive licensing platform. 
          Create, license, and own professional tracks.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/tracks" 
            className="bg-[#00CED1] text-[#0C0C0C] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5FE0E5] transition-colors"
          >
            Explore Tracks
          </Link>
          <Link 
            href="/about" 
            className="border-2 border-[#00CED1] text-[#00CED1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#00CED1]/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#00CED1] rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2">Exclusive Licensing</h3>
            <p className="text-gray-400">
              Purchase exclusive rights to professional tracks. One buyer, one license.
            </p>
          </div>

          <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#00CED1] rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2">AI-Powered Studio</h3>
            <p className="text-gray-400">
              Create music with AI composer, vocalizer, and mixer tools.
            </p>
          </div>

          <div className="bg-[#003366]/20 border border-[#00CED1]/30 rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#00CED1] rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-2">Secure & Fast</h3>
            <p className="text-gray-400">
              Instant downloads with license keys. Stripe-powered secure payments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#00CED1] to-[#5FE0E5] rounded-3xl p-12 text-center">
          <h3 className="text-4xl font-[family-name:var(--font-orbitron)] font-black text-[#0C0C0C] mb-4">
            Ready to elevate your sound?
          </h3>
          <p className="text-lg text-[#0C0C0C]/80 mb-8">
            Join SHIROA and access exclusive tracks today.
          </p>
          <Link 
            href="/register" 
            className="inline-block bg-[#0C0C0C] text-[#00CED1] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#003366] transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00CED1]/20 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
          <p>&copy; 2024 SHIROA. Everything for your sound.</p>
        </div>
      </footer>
    </div>
  );
}
