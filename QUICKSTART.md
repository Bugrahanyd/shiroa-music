# 🚀 SHIROA QUICKSTART

## Hızlı Başlangıç (5 Dakika)

### 1. Backend Başlat
```bash
cd backend
npm install
npm run start:dev
```

### 2. Frontend Başlat
```bash
cd frontend
npm install
npm run dev
```

### 3. AI Services Başlat (Opsiyonel)
```bash
cd ai-services
pip install -r requirements.txt
python api/main.py
```

## Ortam Değişkenleri

### Backend (.env)
```bash
# Minimum gerekli
DATABASE_URL=postgresql://user:pass@localhost:5432/shiroa
MONGODB_URI=mongodb://localhost:27017/shiroa
JWT_SECRET=your_secret_min_32_chars
FRONTEND_URL=http://localhost:3000

# AI (ücretsiz)
HUGGINGFACE_API_KEY=hf_your_key
AI_MUSIC_MODE=custom
AI_VOICE_MODE=xtts
AI_SERVICE_URL=http://localhost:8000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Test Et

1. Backend: http://localhost:3001/health
2. Frontend: http://localhost:3000
3. AI Services: http://localhost:8000/health

## Sonraki Adımlar

1. ✅ Güvenlik düzeltmeleri yapıldı
2. ✅ AI module backend'e eklendi
3. ⏳ AI services test edilecek
4. ⏳ Frontend UI eklenecek

## Ücretsiz Deployment

- Frontend: Vercel (ücretsiz)
- Backend: Render (ücretsiz)
- AI: Hugging Face Spaces (ücretsiz)
- Database: Supabase (ücretsiz)

Toplam maliyet: **$0/ay** 🎉
