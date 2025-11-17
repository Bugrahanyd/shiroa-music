# 🆓 Free Tier Services Setup Guide

## Why These Services?

✅ **Free Forever** (not trial)  
✅ **Production Ready**  
✅ **Easy to Scale** (when you grow)  
✅ **No Credit Card** (most of them)

---

## 1. MongoDB Atlas (Database) 🍃

**Free Tier:** 512MB storage, shared cluster

### Setup:
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create account (no credit card needed)
3. Create a **FREE** cluster (M0)
4. Choose region closest to you
5. Create database user
6. Whitelist IP: `0.0.0.0/0` (allow all)
7. Get connection string
8. Replace in `.env`: `MONGODB_URI=mongodb+srv://...`

**Upgrade Path:** M10 ($0.08/hr) when you need more

---

## 2. Neon PostgreSQL (Database) 🐘

**Free Tier:** 3GB storage, 1 project

### Setup:
1. Go to: https://neon.tech
2. Sign up with GitHub (instant)
3. Create project: `shiroa`
4. Copy connection string
5. Replace in `.env`: `DATABASE_URL=postgresql://...`

**Upgrade Path:** Pro plan ($19/mo) for more projects

---

## 3. Cloudflare R2 (File Storage) ☁️

**Free Tier:** 10GB storage, 1M Class A operations/month

### Setup:
1. Go to: https://dash.cloudflare.com/sign-up
2. Verify email
3. Go to R2: https://dash.cloudflare.com/?to=/:account/r2
4. Create bucket: `shiroa-tracks`
5. Create API token (R2 Read & Write)
6. Copy Access Key ID and Secret
7. Get account ID from dashboard
8. Update `.env`:
```env
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_BUCKET_NAME=shiroa-tracks
S3_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
```

**Why R2 over S3?** No egress fees! S3 charges for downloads, R2 doesn't.

**Upgrade Path:** Pay as you go ($0.015/GB)

---

## 4. Stripe (Payments) 💳

**Free:** Test mode forever, 2.9% + $0.30 per transaction in live mode

### Setup:
1. Go to: https://dashboard.stripe.com/register
2. Create account
3. Stay in **Test Mode**
4. Get API keys: https://dashboard.stripe.com/test/apikeys
5. Copy **Secret key** (starts with `sk_test_`)
6. Update `.env`: `STRIPE_SECRET_KEY=sk_test_...`

**Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

**Upgrade Path:** Switch to live mode when ready

---

## 5. Resend (Email) 📧

**Free Tier:** 3,000 emails/month, 100 emails/day

### Setup:
1. Go to: https://resend.com/signup
2. Sign up with GitHub
3. Verify domain (or use resend.dev for testing)
4. Create API key
5. Update `.env`: `RESEND_API_KEY=re_...`

**Why Resend?** Modern, simple API. Better than SendGrid for small projects.

**Upgrade Path:** $20/mo for 50K emails

---

## 6. Upstash Redis (Optional - Caching) ⚡

**Free Tier:** 10K commands/day

### Setup:
1. Go to: https://upstash.com
2. Sign up with GitHub
3. Create Redis database
4. Copy REST URL
5. Update `.env`: `REDIS_URL=redis://...`

**Use Case:** Cache track metadata, session storage

**Upgrade Path:** Pay per request ($0.2 per 100K)

---

## 7. Vercel (Backend Hosting) 🚀

**Free Tier:** Unlimited deployments, 100GB bandwidth

### Setup:
1. Go to: https://vercel.com/signup
2. Connect GitHub repo
3. Import `backend` folder
4. Add environment variables from `.env`
5. Deploy!

**Alternative:** Railway.app (also free tier)

---

## Total Monthly Cost: $0 💰

**When to Upgrade?**
- MongoDB: >512MB data (~1000 tracks)
- Neon: >3GB data
- R2: >10GB files
- Resend: >3000 emails/month

**Estimated Cost at 10K Users:**
- MongoDB M10: ~$60/mo
- Neon Pro: $19/mo
- R2: ~$15/mo (100GB)
- Resend: $20/mo
- **Total: ~$114/mo** (still cheap!)

---

## Quick Start Commands

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Copy env file
cp .env.free-tier .env

# 3. Fill in your credentials
# Edit .env with your service keys

# 4. Run migrations
npm run build

# 5. Create admin user
npm run create-admin

# 6. Start server
npm run start:dev
```

---

## Security Checklist ✅

- [ ] Change JWT_SECRET (use crypto.randomBytes)
- [ ] Enable MongoDB IP whitelist in production
- [ ] Use Stripe webhook secret
- [ ] Enable CORS only for your domain
- [ ] Use environment variables (never commit .env)
- [ ] Enable rate limiting (already configured)
- [ ] Use HTTPS in production

---

## Monitoring (Free)

- **Uptime:** UptimeRobot (50 monitors free)
- **Errors:** Sentry (5K errors/month free)
- **Logs:** Better Stack (1GB/month free)

---

## Need Help?

Check `API_DOCUMENTATION.md` for endpoint details.
