# SHIROA - Proje Özeti (Gemini İçin)

## Proje Tanımı
SHIROA, AI destekli müzik prodüksiyonu ve özel lisanslama platformudur. Müzik yaratıcılarını alıcılarla profesyonel bir lisanslama sistemi üzerinden buluşturan ve kapsamlı bir AI destekli müzik prodüksiyon stüdyosuna dönüşen bir platformdur.

## Temel Amaç
- Profesyonel müzik lisanslama pazaryeri (özel haklar yönetimi)
- AI destekli müzik prodüksiyon araçları (besteci, vokalist, mikser)
- Yaratımdan lisanslamaya entegre iş akışı
- Bireysel yaratıcılar ve kurumsal müşteriler için ölçeklenebilir platform

---

## Teknoloji Stack'i

### Frontend (Mevcut)
- **Framework**: Next.js 15.1.0 (App Router, React Server Components)
- **React**: 19.2.0
- **TypeScript**: 5.x (strict mode)
- **Styling**: Tailwind CSS 4.1.17
- **Ses Kütüphaneleri**: 
  - Wavesurfer.js 7.8.10 (dalga formu görselleştirme)
  - Tone.js 15.1.3 (ses sentezi ve işleme)
- **State Management**: Zustand 5.0.2
- **Build Tools**: PostCSS, Autoprefixer, ESLint

### Backend (Planlanmış - Nest.js)
- Auth Service (kimlik doğrulama)
- Tracks Service (müzik kataloğu)
- Studio Proxy (AI servislerine gateway)
- Analytics Collector (kullanım metrikleri)
- API Gateway (birleşik giriş noktası)

### AI Servisleri (Planlanmış - FastAPI + PyTorch)
- **Composer**: AI müzik kompozisyonu
- **Vocalizer**: Vokal sentezi ve işleme
- **Mixer**: Akıllı ses miksajı
- **GPU Nodes**: Konteynerize PyTorch modelleri

### Veritabanları (Planlanmış)
- **MongoDB Atlas**: Esnek metadata (tracks, analytics, ai_profiles)
- **PostgreSQL**: İşlemsel veri (users, payments, licenses, credits)
- **Redis**: Cache ve session yönetimi

### Depolama & CDN (Planlanmış)
- **AWS S3**: Master ses dosyaları ve transcode edilmiş versiyonlar
- **CloudFront**: Global CDN, signed URL'lerle güvenli streaming

### Ödeme
- **Stripe**: Ödeme işleme, webhook'lar, abonelik yönetimi

---

## Proje Yapısı

```
SHIROA/
├── .amazonq/rules/memory-bank/    # AI asistan hafızası ve proje konteksti
├── docs/                          # Kapsamlı proje dokümantasyonu
│   ├── README.md                  # Proje genel bakış
│   ├── TECHMAP.md                 # Teknik mimari
│   ├── ROADMAP.md                 # Geliştirme fazları
│   ├── FRONTEND.md                # Frontend mimari
│   ├── BACKEND.md                 # Backend servisleri
│   ├── AI_INTEGRATION.md          # AI mikroservis entegrasyonu
│   ├── DEPLOYMENT.md              # Deployment stratejileri
│   ├── SECURITY.md                # Güvenlik politikaları
│   ├── DATA_BLUEPRINT.md          # Veritabanı şemaları
│   ├── UPLOAD_WORKFLOW.md         # Media upload pipeline
│   └── STUDIO_SPEC.md             # Stüdyo özellik spesifikasyonları
├── frontend/                      # Next.js frontend (MEVCUT)
│   ├── src/app/                   # App Router sayfaları
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Ana sayfa
│   │   └── globals.css            # Global stiller
│   ├── public/                    # Statik varlıklar
│   ├── package.json               # Dependencies
│   ├── tsconfig.json              # TypeScript config
│   └── next.config.ts             # Next.js config
├── backend/                       # Nest.js backend (PLANLANMIŞ)
├── ai_service/                    # AI mikroservisleri (PLANLANMIŞ)
└── infra/                         # Terraform IaC (PLANLANMIŞ)
```

---

## Geliştirme Fazları

### Faz 1 - Müzik Lisanslama Pazaryeri (MVP)
- Admin track yükleme (otomatik transcoding ve önizleme)
- Track tarama ve detay sayfaları
- Stripe entegrasyonlu güvenli satın alma
- Analytics tracking ve popüler track önerileri
- CDN destekli streaming (signed URL'lerle içerik koruması)

### Faz 2 - Büyüme & Stüdyo
- Kredi tabanlı sistem
- Studio v1 arayüzü (müzik prodüksiyonu)
- Producer onboarding ve yönetimi
- Öneri motoru (collaborative filtering)

### Faz 3 - AI Entegrasyonu
- AI Composer (otomatik müzik kompozisyonu)
- AI Vocalizer (vokal sentezi)
- AI Mixer (akıllı ses miksajı)
- Studio v2 (AI destekli düzenleme)
- Model eğitim pipeline'ı

### Faz 4 - Kurumsal Ölçek
- Global CDN optimizasyonu (SLA garantileri)
- Kurumsal lisanslama platformu
- Label dashboard (gelişmiş analytics)
- Marketplace özellikleri

---

## Kod Standartları

### TypeScript Konfigürasyonu
- Strict mode aktif
- Target: ES2017
- Module: ESNext (bundler resolution)
- Path aliases: `@/*` (örn: `import { Component } from '@/components/Button'`)

### Kod Formatlama
- **Indentation**: 2 boşluk
- **Quotes**: Çift tırnak
- **Semicolons**: Zorunlu
- **Line Length**: ~100 karakter
- **Template Literals**: String interpolasyon için kullanılır

### Dosya Adlandırma
- **Components**: PascalCase + .tsx (örn: `RootLayout.tsx`)
- **Config**: kebab-case (örn: `next.config.ts`)
- **Styles**: kebab-case + .css (örn: `globals.css`)

### Import Organizasyonu
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```

### Component Yapısı
```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (/* JSX */);
}
```

### React Patterns
- **Default**: Server Components
- **Client**: Sadece interaktivite gerektiğinde 'use client'
- **Async**: Data fetching için async components
- **Metadata**: SEO için exported metadata object

---

## Tailwind CSS Kullanımı

### Utility Class Patterns
- **Responsive**: Mobile-first (sm:, md:, lg:)
- **Dark Mode**: dark: prefix
- **Layout**: Flexbox primary (flex, items-center, justify-center)
- **Spacing**: gap-4, gap-6, py-32, px-16
- **Typography**: text-3xl, text-lg, text-base

### Yaygın Kombinasyonlar
- **Centering**: `flex items-center justify-center`
- **Full Height**: `min-h-screen`
- **Responsive Width**: `w-full max-w-3xl`
- **Buttons**: `rounded-full` (pill-shaped)
- **Transitions**: `transition-colors`

### Renk Sistemi
- Semantic colors (foreground/background CSS variables)
- Zinc palette (zinc-50, zinc-600, zinc-950)
- Dark mode: prefers-color-scheme media query
- Opacity: bracket notation (örn: `black/[.08]`)

---

## Next.js Özel Patterns

### Image Optimization
```typescript
<Image
  className="dark:invert"
  src="/next.svg"
  alt="Next.js logo"
  width={100}
  height={20}
  priority
/>
```

### Font Optimization
```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

### Configuration
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

---

## Mimari Patterns

### Microservices Architecture
- Servis izolasyonu (net sınırlar)
- Bağımsız deployment ve scaling
- REST/gRPC ile servisler arası iletişim
- API Gateway pattern

### Frontend Architecture
- Server-Side Rendering (SSR) - SEO
- Static Site Generation (SSG) - performans
- Client-side hydration - interaktivite
- Component-based (React 19)

### Data Architecture
- Polyglot persistence (MongoDB + PostgreSQL + Redis)
- Event-driven analytics
- Cache stratejisi
- Transactional ve analytical workload ayrımı

### Security Architecture
- Signed URLs (içerik koruması)
- JWT authentication
- Role-based access control (RBAC)
- Stripe webhook verification

---

## Kullanıcı Akışları

### User Flow
```
Browser → CloudFront CDN → Next.js Frontend → API Gateway
                                                    ↓
                                    ┌───────────────┴───────────────┐
                                    ↓               ↓               ↓
                              Auth Service   Tracks Service   Studio Proxy
                                    ↓               ↓               ↓
                              PostgreSQL       MongoDB         AI Services
```

### Data Flow
```
Admin Upload → Tracks Service → S3 Master → Transcode Pipeline → S3 Variants
                                                                        ↓
User Request → CloudFront → Signed URL → Streaming Delivery
```

### AI Integration Flow
```
Studio UI → Studio Proxy → AI Service (FastAPI) → PyTorch Model → Result
                                ↓
                          Credit Deduction (PostgreSQL)
```

---

## Hedef Kullanıcılar

### Birincil Kullanıcılar
- Müzik prodüktörleri (eserlerini lisanslamak isteyen)
- İçerik yaratıcıları (video, podcast, oyun için lisanslı müzik)
- Bağımsız sanatçılar (prodüksiyon araçları arayan)
- Müzik alıcıları (özel lisanslama hakları gereken)

### İkincil Kullanıcılar
- Plak şirketleri (katalog yönetimi)
- Kurumsal müşteriler (toplu lisanslama)
- AI destekli müzik yaratıcıları
- Platform yöneticileri

---

## Kullanım Senaryoları

### Prodüktörler İçin
- Orijinal müzik track'leri yükle ve para kazan
- Lisanslama şartları ve fiyatlandırma yönetimi
- Satış analytics ve gelir takibi
- AI araçlarıyla prodüksiyon kalitesini artır

### Alıcılar İçin
- Küratörlü müzik kataloğuna göz at
- Satın almadan önce track'leri önizle
- Özel lisanslama hakları güvence altına al
- Çoklu format indirme (MP3, WAV, stems)

### Kurumsal Müşteriler İçin
- Ticari projeler için toplu lisanslama
- Analytics ve kullanım raporlarına erişim
- Özel lisanslama anlaşmaları
- Özel destek ve SLA

### AI Destekli Yaratım İçin
- AI ile müzik kompozisyonu oluştur
- AI vokal işleme uygula
- Otomatik mixing ve mastering
- Kredi tabanlı kullanım modeli

---

## Development Commands

### Frontend
```bash
npm run dev      # Development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint code quality check
```

### Planned Backend
```bash
npm run start:dev    # Nest.js watch mode
npm run start:prod   # Production server
npm run test         # Unit tests
npm run test:e2e     # E2E tests
```

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=          # Backend API endpoint
NEXT_PUBLIC_CDN_URL=          # CloudFront distribution
NEXT_PUBLIC_STRIPE_KEY=       # Stripe publishable key
```

### Backend (Planned)
```
DATABASE_URL=                 # PostgreSQL
MONGODB_URI=                  # MongoDB
REDIS_URL=                    # Redis
STRIPE_SECRET_KEY=            # Stripe secret
AWS_ACCESS_KEY_ID=            # AWS credentials
AWS_SECRET_ACCESS_KEY=        # AWS credentials
JWT_SECRET=                   # Auth secret
```

---

## Önemli Notlar

### Mevcut Durum
- Frontend temel yapısı kurulu (Next.js 15 + React 19)
- Ses kütüphaneleri entegre (Wavesurfer.js, Tone.js)
- TypeScript strict mode aktif
- Tailwind CSS 4 ile styling hazır

### Geliştirilmesi Gerekenler
- Backend servisleri (Nest.js)
- AI mikroservisleri (FastAPI + PyTorch)
- Veritabanı şemaları ve migrasyonlar
- AWS infrastructure (Terraform)
- Stripe entegrasyonu
- Authentication sistemi
- Track upload ve transcoding pipeline
- Studio UI ve özellikleri

### Öncelikli Görevler (MVP için)
1. Backend API (Auth + Tracks servisleri)
2. Database setup (PostgreSQL + MongoDB)
3. Track upload workflow
4. Stripe payment integration
5. Track browsing UI
6. Purchase flow
7. CDN setup (CloudFront + S3)

---

## Git Workflow

### Branch Strategy
- `main`: Production-ready
- `develop`: Integration branch
- `feature/*`: Feature branches
- Pull requests zorunlu

### Commit Messages
- Format: Conventional Commits (feat:, fix:, docs:)
- Scope: Etkilenen alan (frontend, backend, docs)
- Description: Net ve kısa aksiyon

---

## Güvenlik Best Practices

- External links: `target="_blank" rel="noopener noreferrer"`
- HTTPS only
- Signed URLs for content protection
- JWT authentication
- Environment variables for secrets
- Input validation ve sanitization
- RBAC (Role-Based Access Control)

---

## Performans Optimizasyonu

- Code splitting (dynamic imports)
- Image optimization (next/image)
- Font optimization (next/font)
- CDN caching
- Redis caching layer
- Database indexing
- Lazy loading

---

## Browser Support
- Chrome/Edge: Son 2 versiyon
- Firefox: Son 2 versiyon
- Safari: Son 2 versiyon
- Mobile: iOS Safari, Chrome Android

---

## İletişim ve Dokümantasyon

Tüm detaylı dokümantasyon `/docs` klasöründe:
- Teknik mimari: TECHMAP.md
- Frontend detayları: FRONTEND.md
- Backend detayları: BACKEND.md
- AI entegrasyonu: AI_INTEGRATION.md
- Deployment: DEPLOYMENT.md
- Güvenlik: SECURITY.md
- Veritabanı: DATA_BLUEPRINT.md

---

## Özet

SHIROA, müzik endüstrisini AI teknolojisiyle dönüştürmeyi hedefleyen, modern web teknolojileri (Next.js, React 19, TypeScript) üzerine kurulu, mikroservis mimarisiyle ölçeklenebilir, güvenli ve performanslı bir platformdur. MVP fazında lisanslama pazaryeri, sonraki fazlarda AI destekli prodüksiyon stüdyosu özellikleriyle tam kapsamlı bir müzik ekosistemi oluşturmayı amaçlar.
