# 🚀 SHIROA Deployment Rehberi

## Vercel (Frontend)
```bash
# 1. Vercel CLI kurulumu
npm i -g vercel

# 2. Frontend deploy
cd frontend
vercel --prod

# 3. Environment variables
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## Render (Backend + AI)
```bash
# 1. GitHub'a push
git add .
git commit -m "Deploy ready"
git push origin main

# 2. Render.com'da:
- New Web Service
- Connect GitHub repo
- Use render.yaml configuration

# 3. Environment variables:
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
AI_SERVICE_URL=https://shiroa-ai.onrender.com
```

## 🎯 Model Eğitimi Adımları

### 1. Veri Toplama (1-2 hafta)
```bash
# Telif haksız müzik indir
mkdir training_data
cd training_data

# Genre klasörleri oluştur
mkdir electronic hip-hop rock pop jazz classical ambient trap house techno

# Her genre için 100+ track + metadata.json
```

### 2. Veri Hazırlama
```json
// metadata.json örneği
{
  "genre": "electronic",
  "mood": "energetic", 
  "tempo": 128,
  "key": "C major",
  "duration": 30
}
```

### 3. Model Eğitimi (GPU gerekli)
```bash
# Google Colab veya AWS/GCP kullan
python train_model.py

# Eğitim süresi: 2-7 gün (veri boyutuna göre)
# GPU: RTX 4090 önerilen
# RAM: 32GB+
```

### 4. Model Deploy
```bash
# Eğitilmiş modeli Hugging Face'e yükle
huggingface-cli upload shiroa/musicgen-custom ./shiroa_musicgen

# main.py'da model path güncelle
model = MusicgenForConditionalGeneration.from_pretrained("shiroa/musicgen-custom")
```

## ⚡ Hızlı Test

### Local Test:
```bash
# Backend
cd backend && npm run dev

# AI Service  
cd ai-services && python main.py

# Frontend
cd frontend && npm run dev
```

### Production Test:
```bash
curl https://your-ai-service.onrender.com/health
curl https://your-backend.onrender.com/health
```

## 🎵 Eğitim Veri Kaynakları

1. **Freesound.org** - 500,000+ free samples
2. **Zapsplat.com** - Royalty-free music
3. **YouTube Audio Library** - Google'ın ücretsiz müzikleri
4. **Jamendo** - Creative Commons müzikler
5. **Free Music Archive** - Açık lisanslı müzikler

## 💰 Maliyet Tahmini

### Eğitim:
- GPU Sunucu: $200-500 (1 hafta)
- Veri işleme: $50-100
- Storage: $20-50

### Operasyon:
- Render AI Service: $25/ay
- Render Backend: $7/ay  
- Vercel Frontend: $0 (hobby)
- Database: $7/ay

**Toplam: ~$40/ay**

Deploy etmeye hazır mısın? 🚀