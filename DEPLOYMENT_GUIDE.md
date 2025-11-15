# 🚀 SHIROA Deployment Guide

## Frontend - Vercel

### 1. Vercel'e Git
https://vercel.com

### 2. GitHub ile Giriş Yap
- "Continue with GitHub" tıkla
- Authorize et

### 3. Yeni Proje Oluştur
- "Add New..." → "Project"
- Repository seç: `Bugrahanyd/shiroa-music`
- "Import" tıkla

### 4. Ayarları Yap
```
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 5. Environment Variables Ekle
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### 6. Deploy Et
- "Deploy" butonuna tıkla
- 2-3 dakika bekle
- ✅ Frontend hazır!

### 7. Domain
- Otomatik domain: `shiroa-music.vercel.app`
- Custom domain ekleyebilirsin (Settings → Domains)

---

## Backend - Render

### 1. Render'a Git
https://render.com

### 2. GitHub ile Giriş Yap
- "Get Started" → "GitHub"
- Authorize et

### 3. Yeni Web Service Oluştur
- "New +" → "Web Service"
- Repository seç: `Bugrahanyd/shiroa-music`
- "Connect" tıkla

### 4. Ayarları Yap
```
Name: shiroa-backend
Region: Frankfurt (EU Central)
Branch: develop
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:prod
Instance Type: Free
```

### 5. Environment Variables Ekle
```
NODE_ENV=production
PORT=3001

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shiroa

# JWT
JWT_SECRET=your_super_secret_key_change_this
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Frontend URL
FRONTEND_URL=https://shiroa-music.vercel.app

# Local Storage (AWS kapalı)
USE_LOCAL_STORAGE=true
```

### 6. Deploy Et
- "Create Web Service" tıkla
- 5-10 dakika bekle
- ✅ Backend hazır!

### 7. Backend URL'i Al
- `https://shiroa-backend.onrender.com`
- Bu URL'i Vercel'deki `NEXT_PUBLIC_API_URL`'e ekle

---

## Database - MongoDB Atlas (Ücretsiz)

### 1. MongoDB Atlas'a Git
https://www.mongodb.com/cloud/atlas/register

### 2. Ücretsiz Cluster Oluştur
- "Build a Database" → "Free" (M0)
- Provider: AWS
- Region: Frankfurt (eu-central-1)
- Cluster Name: shiroa-cluster

### 3. Database User Oluştur
- Security → Database Access
- "Add New Database User"
- Username: `shiroa_user`
- Password: Güçlü bir şifre oluştur
- Role: "Read and write to any database"

### 4. Network Access
- Security → Network Access
- "Add IP Address"
- "Allow Access from Anywhere" (0.0.0.0/0)
- Confirm

### 5. Connection String Al
- Database → Connect
- "Connect your application"
- Driver: Node.js
- Connection string kopyala:
```
mongodb+srv://shiroa_user:<password>@shiroa-cluster.xxxxx.mongodb.net/shiroa?retryWrites=true&w=majority
```

### 6. Render'a Ekle
- `<password>` yerine gerçek şifreyi yaz
- Render'daki `MONGODB_URI` environment variable'ına ekle

---

## Stripe Webhook (Production)

### 1. Stripe Dashboard
https://dashboard.stripe.com

### 2. Webhook Endpoint Ekle
- Developers → Webhooks
- "Add endpoint"
- Endpoint URL: `https://shiroa-backend.onrender.com/payment/webhook`
- Events to send: `checkout.session.completed`
- "Add endpoint"

### 3. Webhook Secret Al
- Webhook detaylarında "Signing secret" göreceksin
- `whsec_...` ile başlayan secret'i kopyala
- Render'daki `STRIPE_WEBHOOK_SECRET`'e ekle

---

## Vercel'de Frontend Environment Variables Güncelle

### 1. Vercel Dashboard
- Project → Settings → Environment Variables

### 2. Backend URL'i Güncelle
```
NEXT_PUBLIC_API_URL=https://shiroa-backend.onrender.com
```

### 3. Redeploy
- Deployments → Latest → "..." → "Redeploy"

---

## ✅ Deployment Checklist

### Frontend (Vercel):
- [ ] GitHub repository bağlandı
- [ ] Root directory: `frontend`
- [ ] Environment variables eklendi
- [ ] Deploy başarılı
- [ ] Site açılıyor: `https://shiroa-music.vercel.app`

### Backend (Render):
- [ ] GitHub repository bağlandı
- [ ] Root directory: `backend`
- [ ] Environment variables eklendi (MongoDB, Stripe, JWT)
- [ ] Deploy başarılı
- [ ] Health check: `https://shiroa-backend.onrender.com`

### Database (MongoDB Atlas):
- [ ] Cluster oluşturuldu
- [ ] User oluşturuldu
- [ ] Network access açıldı
- [ ] Connection string alındı
- [ ] Backend'e eklendi

### Stripe:
- [ ] Webhook endpoint eklendi
- [ ] Webhook secret alındı
- [ ] Backend'e eklendi

---

## 🔍 Test Et

### 1. Frontend Test
- https://shiroa-music.vercel.app
- Ana sayfa açılıyor mu?
- Dil değiştirme çalışıyor mu? (EN/TR)
- Tracks sayfası açılıyor mu?

### 2. Backend Test
- https://shiroa-backend.onrender.com
- 404 veya "Cannot GET /" görmek normal
- API endpoint test: `/tracks`, `/auth/login`

### 3. Full Flow Test
- Register yap
- Onboarding'de tema seç
- Dashboard'a git
- Track'lere göz at

---

## 🐛 Sorun Giderme

### Frontend 500 Error:
- Vercel logs kontrol et
- Environment variables doğru mu?
- Backend URL doğru mu?

### Backend Crash:
- Render logs kontrol et
- MongoDB connection string doğru mu?
- Environment variables eksik mi?

### CORS Error:
- Backend'de `FRONTEND_URL` doğru mu?
- Render'da redeploy yap

### Stripe Webhook Çalışmıyor:
- Webhook URL doğru mu?
- Webhook secret doğru mu?
- Render logs'da webhook istekleri görünüyor mu?

---

## 💰 Maliyet

| Servis | Plan | Ücret |
|--------|------|-------|
| Vercel | Hobby | $0 |
| Render | Free | $0 |
| MongoDB Atlas | M0 | $0 |
| Stripe | Test Mode | $0 |
| **TOPLAM** | | **$0** ✅ |

**Not:** Render free tier 15 dakika inactivity sonrası sleep mode'a girer. İlk istek 30-60 saniye sürebilir.

---

## 🚀 Hazırsın!

1. Vercel'de frontend deploy et
2. Render'da backend deploy et
3. MongoDB Atlas'ta database oluştur
4. Environment variables'ları ayarla
5. Test et!

**Sorular olursa sor!** 🎉
