# 🎤 SHIROA AI Vocal System

## Açık Kaynak AI Vokal Modelleri

### 1. **Bark (Suno AI)** - En İyi Seçenek
```python
from transformers import AutoProcessor, BarkModel

processor = AutoProcessor.from_pretrained("suno/bark")
model = BarkModel.from_pretrained("suno/bark")

# Text-to-speech with emotion
text = "[laughs] Wow, this is amazing! [clears throat]"
inputs = processor(text, voice_preset="v2/en_speaker_6")
audio = model.generate(**inputs)
```

**Özellikler:**
- Çok dilli (EN, TR, ES, FR, DE, IT, PT, PL, ZH, JA, KO)
- Duygusal ifade (gülme, öksürme, vb.)
- Müzik üretimi (şarkı söyleme)
- Ücretsiz ve açık kaynak

### 2. **Coqui TTS**
```python
from TTS.api import TTS

tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
tts.tts_to_file(
    text="Hello, this is AI voice",
    file_path="output.wav",
    speaker_wav="reference.wav",  # Voice cloning
    language="en"
)
```

### 3. **RVC (Retrieval-based Voice Conversion)**
```python
# Voice conversion - Herhangi bir sesi başka bir sese dönüştür
python infer.py --input vocals.wav --model trained_model.pth
```

## Studio Entegrasyonu

### Backend API
```python
# ai-services/services/vocalizer.py
from bark import SAMPLE_RATE, generate_audio, preload_models
from scipy.io.wavfile import write as write_wav

class VocalizerService:
    def __init__(self):
        preload_models()
    
    def text_to_speech(self, text: str, voice_preset: str = "v2/en_speaker_6"):
        audio_array = generate_audio(text, history_prompt=voice_preset)
        return audio_array, SAMPLE_RATE
    
    def lyrics_to_song(self, lyrics: str, style: str = "pop"):
        # Add music notation
        musical_text = f"♪ {lyrics} ♪"
        audio_array = generate_audio(musical_text)
        return audio_array, SAMPLE_RATE
```

### Frontend Studio Layout
```
┌─────────────────────────────────────────┐
│  SHIROA STUDIO (Ayrı Pencere)           │
├──────────┬──────────────────────────────┤
│          │                              │
│  AI      │     Waveform Editor          │
│  Panel   │                              │
│          │                              │
│  ┌────┐  │     ┌──────────────────┐    │
│  │Gen │  │     │  Track Timeline  │    │
│  └────┘  │     └──────────────────┘    │
│          │                              │
│  Lyrics  │     Transport Controls       │
│  ┌────┐  │     [◀] [▶] [■] [●]         │
│  │    │  │                              │
│  │    │  │                              │
│  └────┘  │                              │
│          │                              │
│  [Generate]                             │
└──────────┴──────────────────────────────┘
```

## Kurulum

### 1. Bark Kurulumu
```bash
cd ai-services
pip install git+https://github.com/suno-ai/bark.git
pip install scipy
```

### 2. Model İndirme (Otomatik)
İlk çalıştırmada ~2GB model indirilir.

### 3. API Endpoint
```python
@app.post("/vocalizer/generate")
async def generate_vocals(request: VocalRequest):
    text = request.lyrics
    voice = request.voice_type
    
    audio, sr = vocalizer.text_to_speech(text, voice)
    
    # Save to file
    filename = f"vocal_{uuid.uuid4()}.wav"
    write_wav(f"/tmp/{filename}", sr, audio)
    
    return {
        "success": True,
        "audioUrl": f"/audio/{filename}",
        "duration": len(audio) / sr
    }
```

## Voice Presets (Bark)

- `v2/en_speaker_0` - Male, deep
- `v2/en_speaker_1` - Female, young
- `v2/en_speaker_6` - Male, energetic
- `v2/en_speaker_9` - Female, soft
- `v2/tr_speaker_0` - Turkish male
- `v2/tr_speaker_1` - Turkish female

## Özellikler

✅ Text-to-speech
✅ Lyrics-to-song
✅ Emotion control
✅ Multi-language
✅ Voice cloning (RVC ile)
✅ Real-time generation

## Performans

- **CPU**: 30-60 saniye (10 saniyelik audio)
- **GPU**: 5-10 saniye
- **Memory**: 4-8GB RAM

## Sonraki Adımlar

1. Bark'ı ai-services'e entegre et
2. Studio'yu ayrı sayfa yap
3. AI panel ekle (sol taraf)
4. Lyrics input + Generate butonu
5. Waveform'a vokal ekle
6. Export özelliği

Başlayalım mı? 🎤
