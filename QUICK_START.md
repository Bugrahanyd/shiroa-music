# 🚀 SHIROA Quick Start Guide

## Prerequisites
- Node.js 20+
- Git

## 1. Clone & Install (5 min)

```bash
# Clone repo
git clone <your-repo-url>
cd SHIROA

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

## 2. Setup Free Services (15 min)

### MongoDB Atlas
1. https://www.mongodb.com/cloud/atlas/register
2. Create FREE M0 cluster
3. Get connection string
4. Copy to `.env`

### Neon PostgreSQL
1. https://neon.tech
2. Sign up with GitHub
3. Create project
4. Copy connection string
5. Add to `.env`

### Cloudflare R2
1. https://dash.cloudflare.com/sign-up
2. Go to R2
3. Create bucket: `shiroa-tracks`
4. Create API token
5. Add credentials to `.env`

### Stripe
1. https://dashboard.stripe.com/register
2. Get test API key
3. Add to `.env`

## 3. Configure Environment

```bash
# Backend
cd backend
cp .env.free-tier .env
# Edit .env with your credentials

# Frontend
cd ../frontend
cp .env.local.example .env.local
# Edit .env.local
```

## 4. Run Development

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 5. Create Admin User

```bash
cd backend
npm run create-admin
# Follow prompts
```

## 6. Test

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Upload track as admin
- Register new user
- Purchase track
- Test payment with: 4242 4242 4242 4242

## Deployment (Optional)

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway)
```bash
cd backend
# Connect GitHub repo to Railway
# Add environment variables
# Deploy!
```

## Need Help?

- Backend setup: `backend/SETUP_FREE_SERVICES.md`
- API docs: `backend/API_DOCUMENTATION.md`
- Frontend guide: `docs/FRONTEND.md`

## Total Cost: $0 💰

All services are free tier, production ready, and scalable!
