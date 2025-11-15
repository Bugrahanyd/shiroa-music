# 🚀 SHIROA - Kurulum Rehberi

## Hızlı Başlangıç

### 1. Stripe API Key'leri Al (5 dakika)
1. https://stripe.com → Kayıt ol
2. Dashboard → Developers → API keys
3. Test mode açık olsun
4. İki key'i kopyala:
   - Secret key (sk_test_...)
   - Publishable key (pk_test_...)

### 2. Backend Ayarları (2 dakika)
`backend/.env` dosyasını aç ve güncelle:
```bash
STRIPE_SECRET_KEY=sk_test_BURAYA_KOPYALA
```

### 3. Frontend Ayarları (2 dakika)
`frontend/.env.local` dosyası oluştur:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_BURAYA_KOPYALA
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. MongoDB Başlat (5 dakika)
```bash
# Docker ile (önerilen):
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Veya MongoDB Community Edition kur:
# https://www.mongodb.com/try/download/community
```

### 5. Servisleri Başlat (2 dakika)
```bash
# Terminal 1 - Backend:
cd backend
npm run start:dev

# Terminal 2 - Frontend:
cd frontend
npm run dev
```

### 6. Test Et! (5 dakika)
1. Tarayıcıda aç: http://localhost:3000
2. Track'e git: http://localhost:3000/tracks/1
3. Purchase Now tıkla
4. Test kartı: 4242 4242 4242 4242
5. Tarih: 12/34, CVC: 123

## Stripe Webhook (Opsiyonel)

### Stripe CLI Kur
```bash
# Windows (Scoop):
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Veya direkt indir:
# https://github.com/stripe/stripe-cli/releases/latest
```

### Webhook Dinle
```bash
stripe login
stripe listen --forward-to localhost:3001/payment/webhook
```

Webhook secret'i backend .env'ye ekle:
```bash
STRIPE_WEBHOOK_SECRET=whsec_BURAYA_KOPYALA
```

## Test Kartları

| Senaryo | Kart Numarası |
|---------|---------------|
| ✅ Başarılı | 4242 4242 4242 4242 |
| ❌ Başarısız | 4000 0000 0000 0002 |
| 🔐 3D Secure | 4000 0027 6000 3184 |

## Sorun Giderme

**Backend başlamıyor:**
```bash
# MongoDB çalışıyor mu?
mongosh
# Çalışmıyorsa: docker start mongodb
```

**Frontend API'ye bağlanamıyor:**
- Backend çalışıyor mu? http://localhost:3001
- .env.local dosyası var mı?
- Backend'i restart et

**Stripe hatası:**
- API key'leri doğru mu?
- Test mode açık mı?
- .env dosyasını güncelledikten sonra restart et

## Maliyet

| Servis | Durum | Ücret |
|--------|-------|-------|
| Amazon Q | Free tier | $0 |
| Stripe | Test mode | $0 |
| MongoDB | Local/Docker | $0 |
| AWS S3 | Kapalı | $0 |
| **TOPLAM** | | **$0** ✅

## Detaylı Dokümantasyon

- **Stripe Detayları**: `STRIPE_SETUP.md`
- **AWS Alternatifi**: `AWS_FREE_ALTERNATIVE.md`
- **Proje Durumu**: `PROJE_HARITASI.md`
- **Gemini İçin**: `GEMINI_PROJECT_BRIEF.md`

## Özet Komutlar

```bash
# Backend:
cd backend && npm run start:dev

# Frontend:
cd frontend && npm run dev

# MongoDB (Docker):
docker run -d -p 27017:27017 --name mongodb mongo

# Stripe webhook:
stripe listen --forward-to localhost:3001/payment/webhook
```

**Hazırsın! 🎉**
