# SHIROA AI Services

## Mimari

```
ai-services/
├── music-generator/          # Müzik üretimi AI
│   ├── dataset/              # Eğitim verisi
│   ├── models/               # Eğitilmiş modeller
│   ├── training/             # Eğitim scriptleri
│   └── inference/            # API servisi
│
├── lyrics-analyzer/          # Şarkı sözü analizi
│   ├── genre-classifier/    # Genre tespiti
│   ├── persona-generator/   # Persona oluşturma
│   └── api/                 # FastAPI servisi
│
├── voice-generator/          # Vokal sentezi
│   ├── models/              # TTS modelleri
│   └── api/                 # API servisi
│
└── audio-mixer/              # Müzik + vokal birleştirme
    └── api/                 # FFmpeg servisi
```

## Teknoloji Stack

### Müzik Üretimi
- **Model**: MusicGen (Meta) - Fine-tuned
- **Framework**: PyTorch
- **Dataset**: 50,000+ tracks (legal sources)
- **Training**: 4-8 hafta (A100 GPU)

### Lyrics Analizi
- **Model**: GPT-4 API (başlangıç) → Custom model (gelecek)
- **Genre Classification**: DistilBERT fine-tuned
- **Language**: Türkçe + İngilizce

### Voice Generation
- **Model**: XTTS v2 (Coqui TTS) - Açık kaynak
- **Alternative**: ElevenLabs API (başlangıç)
- **Persona Mapping**: Custom neural network

### Audio Mixing
- **Tool**: FFmpeg + Librosa
- **Processing**: Automatic gain, EQ, compression

## Roadmap

### Faz 1: Dataset (Ay 1-2)
- [ ] 50,000 müzik dosyası toplama
- [ ] Metadata oluşturma (genre, mood, BPM)
- [ ] Türkçe şarkı sözleri dataset (10,000+)
- [ ] Data cleaning & preprocessing

### Faz 2: Model Training (Ay 3-4)
- [ ] MusicGen fine-tuning
- [ ] Genre classifier training
- [ ] Voice model training (XTTS)
- [ ] Model optimization (ONNX)

### Faz 3: API Development (Ay 5)
- [ ] FastAPI services
- [ ] Docker containerization
- [ ] Load balancing
- [ ] Caching layer

### Faz 4: Integration (Ay 6)
- [ ] Backend entegrasyonu
- [ ] Frontend UI
- [ ] Testing & optimization
- [ ] Production deployment

## Geçici Çözüm (MVP)

Kendi modelimiz hazır olana kadar:
- Müzik: Suno API / Mubert API
- Lyrics: GPT-4 API
- Voice: ElevenLabs API
- Mixing: FFmpeg

## Maliyet Tahmini

### Training (One-time)
- GPU (A100): $2.50/saat × 1000 saat = $2,500
- Dataset: $500-1,000
- Storage: $100/ay
- **Toplam**: ~$3,500-4,000

### Inference (Monthly)
- GPU Server: $500-1,000/ay
- API calls (geçici): $500-2,000/ay
- Storage: $200/ay
- **Toplam**: ~$1,200-3,200/ay

### ROI
- 100 şarkı/gün × $10 ortalama × %8 komisyon = $240/gün
- Aylık: ~$7,200
- **Break-even**: 2-3 ay
