# SHIROA — TECHMAP (Teknik Harita)

> Amaç: SHIROA platformunun teknik mimarisini, servis sınırlarını ve geliştirme/deploy akışını net ve uygulanabilir olacak şekilde açıklamak.

## One-liner
Next.js + Nest.js + MongoDB + PostgreSQL + Redis + S3/CloudFront + AI microservices (FastAPI / PyTorch) — mikroservis-ready.

## Blok Diyagram (metin)
[User Browser]
  └→ CDN (CloudFront)
    └→ Next.js (Vercel)
      └→ API Gateway
         ├→ Auth Service (Nest)
         ├→ Tracks Service (Nest)
         ├→ Studio Proxy (Nest → AI service)
         ├→ Analytics Collector (Nest)
      └→ DBs: MongoDB (tracks, analytics, ai_profiles), Postgres (users, tx), Redis (cache)
      └→ Storage: S3 (master) + Transcode buckets
      └→ AI: FastAPI + PyTorch (containerized, GPU nodes)

## Katman açıklamaları
- Frontend: Next.js + TypeScript + Tailwind, SSR/SSG for SEO.
- Backend: Nest.js modular services, REST + optional GraphQL.
- Storage & Media: S3 master, transcodes, CloudFront CDN with signed URLs.
- DB: MongoDB for flexible metadata; Postgres for financial & ledger; Redis for cache.
- AI: isolated services (Composer, Vocalizer, Mixer), exposed internally via gRPC/HTTP.
- DevOps: GitHub Actions CI, Terraform infra, Prometheus/Grafana monitoring.

## Örnek endpointler (MVP)
- GET /tracks
- GET /tracks/{id}
- POST /analytics
- POST /checkout
- POST /admin/tracks
- POST /webhooks/stripe

## MVP->Prod route (Sprint list)
1. Repo + infra baseline
2. Admin upload + transcode + preview
3. Buy flow + stripe + postgres ledger
4. Analytics + popular lists
5. Studio baseline + credit
6. AI microservice POC

## Notlar
- Kalıcı kararlar: DB stratejisi, storage, auth patterns.
- Esnek kararlar: UI details, AI model choices.
