"""
SHIROA Voice Generator
Şarkı sözlerini AI sesiyle seslendirme
"""

import os
from pathlib import Path
from typing import Dict, Optional
import requests
import torch
from TTS.api import TTS

class VoiceGenerator:
    """
    İki mod:
    1. ElevenLabs API (başlangıç - kolay, kaliteli)
    2. XTTS v2 (kendi modelimiz - ücretsiz, özelleştirilebilir)
    """
    
    def __init__(self, mode: str = "elevenlabs", api_key: str = None):
        """
        Args:
            mode: "elevenlabs" veya "xtts"
            api_key: ElevenLabs API key (mode=elevenlabs ise gerekli)
        """
        self.mode = mode
        
        if mode == "elevenlabs":
            self.api_key = api_key or os.getenv("ELEVENLABS_API_KEY")
            self.base_url = "https://api.elevenlabs.io/v1"
        
        elif mode == "xtts":
            # XTTS v2 model yükle (açık kaynak, ücretsiz)
            device = "cuda" if torch.cuda.is_available() else "cpu"
            self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    
    def generate_with_elevenlabs(
        self, 
        text: str, 
        voice_id: str = "21m00Tcm4TlvDq8ikWAM",  # Default: Rachel
        settings: Dict = None
    ) -> bytes:
        """
        ElevenLabs ile ses üret
        
        Args:
            text: Şarkı sözleri
            voice_id: Ses ID'si
            settings: Ses ayarları (stability, similarity_boost, style)
        
        Returns:
            Audio bytes (MP3)
        """
        url = f"{self.base_url}/text-to-speech/{voice_id}"
        
        default_settings = {
            "stability": 0.75,
            "similarity_boost": 0.75,
            "style": 0.5,
            "use_speaker_boost": True
        }
        
        if settings:
            default_settings.update(settings)
        
        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",  # Türkçe destekli
            "voice_settings": default_settings
        }
        
        headers = {
            "xi-api-key": self.api_key,
            "Content-Type": "application/json"
        }
        
        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"ElevenLabs API error: {response.text}")
    
    def generate_with_xtts(
        self,
        text: str,
        speaker_wav: str = None,
        language: str = "tr"
    ) -> str:
        """
        XTTS v2 ile ses üret (kendi modelimiz)
        
        Args:
            text: Şarkı sözleri
            speaker_wav: Referans ses dosyası (voice cloning için)
            language: Dil kodu (tr, en, es, fr, de, it, pt, pl, zh, ar, cs, ru, nl, ja, hu, ko)
        
        Returns:
            Output audio file path
        """
        output_path = f"output_{hash(text)}.wav"
        
        if speaker_wav:
            # Voice cloning mode
            self.tts.tts_to_file(
                text=text,
                speaker_wav=speaker_wav,
                language=language,
                file_path=output_path
            )
        else:
            # Default speaker
            self.tts.tts_to_file(
                text=text,
                language=language,
                file_path=output_path
            )
        
        return output_path
    
    def generate(self, text: str, **kwargs) -> bytes:
        """
        Seçilen moda göre ses üret
        """
        if self.mode == "elevenlabs":
            return self.generate_with_elevenlabs(text, **kwargs)
        elif self.mode == "xtts":
            audio_path = self.generate_with_xtts(text, **kwargs)
            with open(audio_path, "rb") as f:
                return f.read()
    
    def list_elevenlabs_voices(self) -> list:
        """
        ElevenLabs'daki mevcut sesleri listele
        """
        if self.mode != "elevenlabs":
            return []
        
        url = f"{self.base_url}/voices"
        headers = {"xi-api-key": self.api_key}
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()["voices"]
        else:
            return []
    
    def select_voice_by_persona(self, persona: Dict) -> str:
        """
        Persona'ya göre en uygun sesi seç
        
        Args:
            persona: Lyrics analyzer'dan gelen persona
        
        Returns:
            voice_id (ElevenLabs) veya speaker_wav path (XTTS)
        """
        # ElevenLabs voice mapping
        voice_map = {
            "male-young-energetic": "pNInz6obpgDQGcFmaJgB",  # Adam
            "male-mature-calm": "VR6AewLTigWG4xSOukaG",      # Arnold
            "female-young-energetic": "21m00Tcm4TlvDq8ikWAM", # Rachel
            "female-mature-calm": "EXAVITQu4vr4xnSDxMaL",     # Bella
            "female-young-emotional": "ThT5KcBeYPX3keUQqHPh",  # Dorothy
        }
        
        gender = persona.get("gender", "female")
        age = persona.get("age_range", "young")
        tone = persona.get("tone", "energetic")
        
        key = f"{gender}-{age}-{tone}"
        
        return voice_map.get(key, "21m00Tcm4TlvDq8ikWAM")  # Default: Rachel


# XTTS v2 için voice cloning
class VoiceCloner:
    """
    Kullanıcının kendi sesini klonlama (premium feature)
    """
    
    def __init__(self):
        device = "cuda" if torch.cuda.is_available() else "cpu"
        self.tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    
    def clone_voice(self, reference_audio: str, text: str, output_path: str):
        """
        Referans ses dosyasından voice cloning
        
        Args:
            reference_audio: Kullanıcının ses kaydı (min 6 saniye)
            text: Üretilecek metin
            output_path: Çıktı dosyası
        """
        self.tts.tts_to_file(
            text=text,
            speaker_wav=reference_audio,
            language="tr",  # Otomatik tespit de yapabilir
            file_path=output_path
        )
        
        return output_path


# Test
if __name__ == "__main__":
    print("SHIROA Voice Generator\n")
    print("="*50)
    
    print("\nMod 1: ElevenLabs (API)")
    print("- Kolay entegrasyon")
    print("- Yüksek kalite")
    print("- Türkçe destekli")
    print("- Maliyet: $5-99/ay")
    
    print("\nMod 2: XTTS v2 (Açık Kaynak)")
    print("- Ücretsiz")
    print("- Voice cloning")
    print("- Türkçe destekli")
    print("- Kendi sunucumuzda çalışır")
    
    print("\n" + "="*50)
    print("\nÖNERİ: Başlangıçta ElevenLabs, sonra XTTS'e geç")
    
    # Örnek kullanım
    # generator = VoiceGenerator(mode="elevenlabs", api_key="your_key")
    # audio = generator.generate("Merhaba dünya, bu bir test")
    # with open("output.mp3", "wb") as f:
    #     f.write(audio)
