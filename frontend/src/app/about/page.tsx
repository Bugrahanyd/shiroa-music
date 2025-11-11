import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-[family-name:var(--font-orbitron)] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] via-[#5F9FFF] to-[#9D4EDD] mb-4">
            🐯 SHIROA
          </h1>
          <p className="text-xl text-gray-400">Profesyonel yaklaşım, disiplinli yapı ve beyaz kaplan sembolizmi</p>
        </div>

        {/* Hakkımızda */}
        <section className="mb-16">
          <h2 className="text-4xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-6 border-l-4 border-[#00CED1] pl-6">
            Hakkımızda
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Profesyonel yaklaşım, disiplinli yapı ve beyaz kaplan sembolizmini benimseyen SHIROA; Türkiye'den doğan, 
            teknoloji ve rekabeti birleştiren yeni nesil bir organizasyondur. Temellerimizi 2026'da atarak, 
            topluluk merkezli bir platform inşa etmeyi ve sürdürülebilir başarıyı hedefliyoruz.
          </p>
        </section>

        {/* Felsefemiz */}
        <section className="mb-16 bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#00CED1]/30 rounded-2xl p-8">
          <h2 className="text-4xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-6">
            Felsefemiz
          </h2>
          <blockquote className="text-[#00CED1] text-xl italic mb-6 border-l-4 border-[#00CED1] pl-6">
            "Beyaz Kaplan gibi güçlü, disiplinli ve kararlı bir organizasyonuz; her kalıcı başarının ardında 
            takım ruhu ve tutarlı iş birliği olduğuna inanırız."
          </blockquote>
          <p className="text-gray-300 text-lg leading-relaxed">
            Bireysel yetenekleri ölçülebilir hedeflerle takım başarısına dönüştürür; sürekli öğrenme ve gelişimi 
            kültürümüzün temeline koyarız.
          </p>
        </section>

        {/* Misyon & Vizyon */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <section className="bg-gradient-to-br from-[#00CED1]/10 to-[#5F9FFF]/10 border border-[#00CED1]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-[family-name:var(--font-orbitron)] font-bold text-[#00CED1] mb-4">
              Misyonumuz
            </h2>
            <p className="text-gray-300 leading-relaxed">
              2026 başlangıcımızla birlikte, Discord topluluğu, Ar-Ge ve Medya ekseninde adil, güvenli ve üretken 
              bir ekosistem kurarak; veriyle desteklenen yenilikçi çözümler ve tutarlı bir marka diliyle kalıcı değer üretmek.
            </p>
          </section>

          <section className="bg-gradient-to-br from-[#5F9FFF]/10 to-[#9D4EDD]/10 border border-[#5F9FFF]/30 rounded-2xl p-8">
            <h2 className="text-3xl font-[family-name:var(--font-orbitron)] font-bold text-[#5F9FFF] mb-4">
              Vizyonumuz
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Türkiye'den doğup bölgede referans gösterilen bir platform olmak; Ar-Ge çıktılarını ürünleştirip 
              ölçeklenebilir iş modelleriyle medya etkisini yükseltmeyi ve koşullar olgunlaştığında esporu 
              sürdürülebilir bir programla etkinleştirerek ekosistemimizi tamamlamayı hedefliyoruz.
            </p>
          </section>
        </div>

        {/* Değerlerimiz */}
        <section className="mb-16">
          <h2 className="text-4xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-8 text-center">
            Değerlerimiz
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Organizasyonumuzun temelini oluşturan ve Beyaz Kaplan disiplinini yansıtan değerler
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#00CED1]/30 rounded-xl p-6 hover:border-[#00CED1] hover:shadow-[0_0_30px_rgba(0,206,209,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00CED1] mb-3 group-hover:text-white transition-colors">
                Tutku & Üretim
              </h3>
              <p className="text-gray-300">
                Oyun, topluluk ve üretime duyduğumuz tutku.
              </p>
            </div>

            <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#5F9FFF]/30 rounded-xl p-6 hover:border-[#5F9FFF] hover:shadow-[0_0_30px_rgba(95,159,255,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#5F9FFF] mb-3 group-hover:text-white transition-colors">
                Disiplin & Kalite
              </h3>
              <p className="text-gray-300">
                Standartlarımızı sürekli yükseltme ve profesyonel yaklaşım.
              </p>
            </div>

            <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#9D4EDD]/30 rounded-xl p-6 hover:border-[#9D4EDD] hover:shadow-[0_0_30px_rgba(157,78,221,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#9D4EDD] mb-3 group-hover:text-white transition-colors">
                Güven & Şeffaflık
              </h3>
              <p className="text-gray-300">
                Sözümüzde durma ve şeffaf süreçlerle güven oluşturma.
              </p>
            </div>

            <div className="group bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#00CED1]/30 rounded-xl p-6 hover:border-[#00CED1] hover:shadow-[0_0_30px_rgba(0,206,209,0.3)] transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#00CED1] mb-3 group-hover:text-white transition-colors">
                Yenilikçilik (Ar-Ge Odaklılık)
              </h3>
              <p className="text-gray-300">
                Yeni fikirleri hızlı deneyip ölçekleme.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link 
            href="/tracks"
            className="inline-block bg-gradient-to-r from-[#00CED1] to-[#5F9FFF] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(0,206,209,0.5)] transition-all transform hover:scale-105"
          >
            Müzik Kataloğumuzu Keşfedin →
          </Link>
        </section>
      </div>
    </div>
  );
}
