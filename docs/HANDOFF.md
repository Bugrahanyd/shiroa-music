# SHIROA — HANDOFF GUIDE  
> Central onboarding and project transfer document  
> Version: 1.0 • Updated: 2025-11-10  

---

## 🧭 PROJECT OVERVIEW
**SHIROA** is an advanced AI-powered music platform designed around three core goals:
1. Empower creators and producers to publish, sell, and analyze their music seamlessly.
2. Integrate AI-generated vocals, lyrics, and production features (inspired by tools like SUNO or Udio).
3. Build a data-driven ecosystem where every interaction contributes to improving both UX and AI capabilities.

Our long-term vision:  
> **"SHIROA will be everything for you."**

---

## 🧱 CORE STACK & STRUCTURE
| Layer | Tech Stack | Description |
|-------|-------------|-------------|
| Frontend | **Next.js (TypeScript, TailwindCSS)** | User-facing app, dark/light themes, responsive layout |
| Backend | **NestJS (TypeScript)** | API + admin layer + AI job orchestration |
| Database | **PostgreSQL + MongoDB (hybrid)** | Postgres for transactions, Mongo for content + analytics |
| Storage | **S3-compatible (e.g., AWS, Cloudflare R2)** | Stores audio files and previews |
| AI / ML | **Python-based microservice** (planned) | Model for lyrics, voice synthesis, mastering |
| CI/CD | **GitHub Actions** | Auto-deploy + test workflows |
| Hosting | **Vercel (frontend)** + **Render / AWS (backend)** | Scalable multi-environment deployment |

---

## 🗂️ FOLDER STRUCTURE
