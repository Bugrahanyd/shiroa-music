# SHIROA — BACKEND GUIDELINES

## Stack
- Nest.js + TypeScript
- API patterns: REST + OpenAPI documentation
- Auth: JWT access + refresh tokens; OAuth for social login
- Jobs: Bull / Redis-based queues for long tasks (transcode, AI jobs)
- DB: MongoDB (tracks, analytics), Postgres (transactions)

## Key Services
- AuthService: login, refresh, roles, OAuth
- TracksService: CRUD tracks, metadata extraction, status transitions
- TranscodeWorker: listens job queue, runs FFmpeg, uploads derived artifacts
- CheckoutService: interacts with Stripe, creates transactions
- AnalyticsService: validates and stores events

## Observability
- Prometheus metrics, Grafana dashboards
- Error tracking via Sentry
- Structured logs (JSON)

## Local dev
- Docker Compose for local MongoDB/Postgres/Redis + Nest app
- ENV vars via .env (do NOT commit secrets)
