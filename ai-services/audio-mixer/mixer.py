"""
SHIROA Audio Mixer
Müzik + vokal birleştirme ve mastering
"""

import subprocess
import os
from pathlib import Path
from typing import Optional, Dict
import librosa
import soundfile as sf
import numpy as np

class AudioMixer:
    """
    FFmpeg ve Librosa ile audio mixing
    """
    
    def __init__(self):
        self.sample_rate = 44100
    
    def mix_music_and_vocals(
        self,
        music_path: str,
        vocals_path: str,
        output_path: str,
        music_volume: float = 0.7,
        vocals_volume: float = 1.0,
        apply_mastering: bool = True
    ) -> str:
        """
        Müzik ve vokali birleştir
        
        Args:
            music_path: Müzik dosyası
            vocals_path: Vokal dosyası
            output_path: Çıktı dosyası
            music_volume: Müzik ses seviyesi (0.0-1.0)
            vocals_volume: Vokal ses seviyesi (0.0-1.0)
            apply_mastering: Otomatik mastering uygula
        
        Returns:
            Output file path
        """
        
        # FFmpeg ile mix
        cmd = [
            "ffmpeg",
            "-i", music_path,
            "-i", vocals_path,
            "-filter_complex",
            f"[0:a]volume={music_volume}[music];[1:a]volume={vocals_volume}[vocals];[music][vocals]amix=inputs=2:duration=longest",
            "-y",  # Overwrite
            output_path
        ]
        
        try:
            subprocess.run(cmd, check=True, capture_output=True)
        except subprocess.CalledProcessError as e:
            raise Exception(f"FFmpeg error: {e.stderr.decode()}")
        
        # Mastering uygula
        if apply_mastering:
            return self.apply_mastering(output_path)
        
        return output_path
    
    def apply_mastering(self, audio_path: str) -> str:
        """
        Otomatik mastering (EQ, compression, limiting)
        
        Args:
            audio_path: Audio dosyası
        
        Returns:
            Mastered audio path
        """
        # Audio yükle
        audio, sr = librosa.load(audio_path, sr=self.sample_rate, mono=False)
        
        # Stereo'ya çevir (mono ise)
        if audio.ndim == 1:
            audio = np.stack([audio, audio])
        
        # 1. Normalize
        audio = self.normalize_audio(audio)
        
        # 2. EQ (bass boost, treble enhance)
        audio = self.apply_eq(audio, sr)
        
        # 3. Compression
        audio = self.apply_compression(audio)
        
        # 4. Limiting (prevent clipping)
        audio = self.apply_limiter(audio, threshold=-1.0)
        
        # Kaydet
        output_path = audio_path.replace(".mp3", "_mastered.mp3")
        sf.write(output_path, audio.T, sr)
        
        return output_path
    
    def normalize_audio(self, audio: np.ndarray, target_db: float = -14.0) -> np.ndarray:
        """
        Loudness normalization (LUFS)
        
        Args:
            audio: Audio array
            target_db: Target loudness (dB)
        
        Returns:
            Normalized audio
        """
        # RMS hesapla
        rms = np.sqrt(np.mean(audio**2))
        
        # Target RMS
        target_rms = 10 ** (target_db / 20)
        
        # Normalize
        if rms > 0:
            audio = audio * (target_rms / rms)
        
        return audio
    
    def apply_eq(self, audio: np.ndarray, sr: int) -> np.ndarray:
        """
        Basit EQ (bass boost, treble enhance)
        
        Args:
            audio: Audio array
            sr: Sample rate
        
        Returns:
            EQ'ed audio
        """
        # Bass boost (60-250 Hz)
        bass_boost = librosa.effects.preemphasis(audio, coef=0.97)
        
        # Treble enhance (4kHz+)
        # TODO: Implement proper EQ with scipy filters
        
        return bass_boost
    
    def apply_compression(self, audio: np.ndarray, threshold: float = -20.0, ratio: float = 4.0) -> np.ndarray:
        """
        Dynamic range compression
        
        Args:
            audio: Audio array
            threshold: Compression threshold (dB)
            ratio: Compression ratio
        
        Returns:
            Compressed audio
        """
        # Convert to dB
        audio_db = 20 * np.log10(np.abs(audio) + 1e-10)
        
        # Apply compression
        mask = audio_db > threshold
        audio_db[mask] = threshold + (audio_db[mask] - threshold) / ratio
        
        # Convert back to linear
        audio_compressed = np.sign(audio) * (10 ** (audio_db / 20))
        
        return audio_compressed
    
    def apply_limiter(self, audio: np.ndarray, threshold: float = -1.0) -> np.ndarray:
        """
        Limiter (prevent clipping)
        
        Args:
            audio: Audio array
            threshold: Limiting threshold (dB)
        
        Returns:
            Limited audio
        """
        threshold_linear = 10 ** (threshold / 20)
        
        # Hard limiting
        audio = np.clip(audio, -threshold_linear, threshold_linear)
        
        return audio
    
    def adjust_tempo(self, audio_path: str, bpm_target: int, output_path: str) -> str:
        """
        Tempo ayarlama (BPM değiştirme)
        
        Args:
            audio_path: Audio dosyası
            bpm_target: Hedef BPM
            output_path: Çıktı dosyası
        
        Returns:
            Output path
        """
        audio, sr = librosa.load(audio_path, sr=self.sample_rate)
        
        # BPM tespit
        tempo, _ = librosa.beat.beat_track(y=audio, sr=sr)
        
        # Tempo değiştir
        rate = bpm_target / tempo
        audio_stretched = librosa.effects.time_stretch(audio, rate=rate)
        
        # Kaydet
        sf.write(output_path, audio_stretched, sr)
        
        return output_path
    
    def add_reverb(self, audio_path: str, output_path: str, room_size: float = 0.5) -> str:
        """
        Reverb ekle (FFmpeg ile)
        
        Args:
            audio_path: Audio dosyası
            output_path: Çıktı dosyası
            room_size: Reverb miktarı (0.0-1.0)
        
        Returns:
            Output path
        """
        cmd = [
            "ffmpeg",
            "-i", audio_path,
            "-af", f"aecho=0.8:0.9:{int(room_size*1000)}:0.3",
            "-y",
            output_path
        ]
        
        subprocess.run(cmd, check=True, capture_output=True)
        
        return output_path


class StemSeparator:
    """
    Şarkıyı stems'lere ayırma (vocals, drums, bass, other)
    Demucs modeli kullanarak
    """
    
    def __init__(self):
        # TODO: Demucs model yükle
        pass
    
    def separate(self, audio_path: str, output_dir: str) -> Dict[str, str]:
        """
        Audio'yu stems'lere ayır
        
        Args:
            audio_path: Audio dosyası
            output_dir: Çıktı klasörü
        
        Returns:
            {
                "vocals": "path/to/vocals.wav",
                "drums": "path/to/drums.wav",
                "bass": "path/to/bass.wav",
                "other": "path/to/other.wav"
            }
        """
        # TODO: Implement Demucs separation
        pass


# Test
if __name__ == "__main__":
    print("SHIROA Audio Mixer\n")
    print("="*50)
    
    print("\nÖzellikler:")
    print("✅ Müzik + vokal mixing")
    print("✅ Otomatik mastering")
    print("✅ EQ, compression, limiting")
    print("✅ Tempo adjustment")
    print("✅ Reverb effects")
    print("✅ Stem separation (gelecek)")
    
    print("\nGereksinimler:")
    print("- FFmpeg (sistem PATH'inde olmalı)")
    print("- librosa")
    print("- soundfile")
    
    # Örnek kullanım
    # mixer = AudioMixer()
    # mixer.mix_music_and_vocals(
    #     "music.mp3",
    #     "vocals.mp3",
    #     "output.mp3",
    #     music_volume=0.7,
    #     vocals_volume=1.0,
    #     apply_mastering=True
    # )
