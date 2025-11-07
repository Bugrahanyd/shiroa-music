# SHIROA — FRONTEND GUIDELINES

## Stack
- Next.js + TypeScript + TailwindCSS
- Player component: reusable, accessible, keyboard-friendly
- State management: React Query / Zustand for lightweight caching
- Analytics: emit events via a dedicated `analyticsClient.post('/analytics', event)`

## Pages & Components (MVP)
- / (landing) — featured, categories
- /explore — filters: genre, bpm range, mood, instruments
- /track/[id] — track detail, preview player, buy button, ai_creator card
- /admin/upload — admin-only upload form
- /studio/session/[id] — web-based studio client

## UX Considerations
- Keyboard accessibility (esc behavior tracked as event)
- Preview autoplay = OFF by default
- Visual waveform for previews (thumbnail + seek)
- Light/dark mode toggle with consistent color tokens (BRAND.md)

## Build & Lint
- ESLint + Prettier + TypeScript
- Unit tests: Jest + React Testing Library
- CI: run lint & unit tests on PR
