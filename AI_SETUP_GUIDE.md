# 🎵 SHIROA AI Kurulum Rehberi

## ✅ Suno Çıkarıldı - Kendi AI'mız Hazır!

### 🚀 Hızlı Başlangıç

#### 1. AI Servisi Kurulumu
```bash
cd ai-services
pip install -r requirements.txt
python main.py
```

#### 2. Model İndirme (Otomatik)
- İlk çalıştırmada MusicGen-small (~1.2GB) indirilir
- GPU varsa otomatik kullanılır
- CPU'da da çalışır (yavaş)

#### 3. Test
```bash
curl -X POST "http://localhost:8000/composer/generate" \
  -H "Content-Type: application/json" \
  -d '{"genre": "electronic", "mood": "energetic", "duration": 30}'
```

### 🎯 Mevcut Özellikler

#### ✅ Çalışan:
- **MusicGen Integration**: Meta'nın açık kaynak modeli
- **10 Genre**: electronic, hip-hop, rock, pop, jazz, classical, ambient, trap, house, techno
- **10 Mood**: energetic, calm, dark, uplifting, melancholic, aggressive, dreamy, mysterious, happy, intense
- **Tempo Control**: 60-180 BPM
- **Duration**: 15-120 saniye
- **Fallback System**: Model yüklenemezse demo response

#### 🔄 Geliştirme Aşamasında:
- Lyrics support (MusicGen desteklemez, başka model gerekli)
- Multi-track generation
- Style transfer
- Real-time processing

### 💻 Sistem Gereksinimleri

#### Minimum:
- **RAM**: 8GB
- **Storage**: 5GB (model + cache)
- **Python**: 3.8+
- **PyTorch**: GPU support için CUDA

#### Önerilen:
- **GPU**: NVIDIA RTX 3060+ (8GB VRAM)
- **RAM**: 16GB+
- **Storage**: SSD

### 🛠️ Geliştirme Roadmap

#### Faz 1: Temel AI (✅ Tamamlandı)
- [x] MusicGen entegrasyonu
- [x] API endpoints
- [x] Frontend bağlantısı
- [x] Fallback sistemi

#### Faz 2: Gelişmiş Özellikler (2-3 hafta)
- [ ] AudioLDM (lyrics-to-music)
- [ ] Bark (vocal synthesis)
- [ ] Multi-model pipeline
- [ ] Caching sistemi

#### Faz 3: Optimizasyon (1-2 hafta)
- [ ] Model quantization
- [ ] Batch processing
- [ ] GPU memory optimization
- [ ] Production deployment

### 🎵 Kullanım

1. **Studio'ya git**: http://localhost:3000/studio
2. **AI Generate** butonuna tıkla
3. **Genre, mood, tempo** seç
4. **Generate with Local AI** tıkla
5. **Track oluşturulunca** TrackList'e ekle

### 🔧 Troubleshooting

#### Model yüklenmiyor:
```bash
# Manuel model indirme
python -c "from transformers import MusicgenForConditionalGeneration; MusicgenForConditionalGeneration.from_pretrained('facebook/musicgen-small')"
```

#### GPU kullanılmıyor:
```bash
# CUDA kontrolü
python -c "import torch; print(torch.cuda.is_available())"
```

#### Memory hatası:
```bash
# Küçük model kullan
# main.py'da "musicgen-small" yerine "musicgen-melody" kullan
```

### 🚀 Sonraki Adımlar

1. **Hemen test et**: AI servisi çalışıyor mu?
2. **GPU setup**: CUDA kurulumu
3. **Model upgrade**: Daha büyük modeller
4. **Custom training**: Kendi verilerimizle eğitim

Hangi adımdan başlamak istiyorsun?