import torch
import numpy as np
from typing import Dict, Any
import librosa
import soundfile as sf
from scipy import signal

class AIMixer:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
    async def enhance_audio(self, audio_url: str, style: str = "professional") -> Dict[str, Any]:
        """Enhance audio quality using AI mixing techniques"""
        
        # Load audio
        audio, sr = librosa.load(audio_url, sr=44100)
        
        # Apply enhancement based on style
        enhanced_audio = self._apply_enhancement(audio, style, sr)
        
        output_path = f"mixed_{style}.wav"
        sf.write(output_path, enhanced_audio, sr)
        
        return {
            "audio_path": output_path,
            "original_url": audio_url,
            "style": style,
            "enhancements_applied": self._get_enhancements_for_style(style)
        }
    
    def _apply_enhancement(self, audio: np.ndarray, style: str, sr: int) -> np.ndarray:
        """Apply audio enhancements based on mixing style"""
        
        enhanced = audio.copy()
        
        if style == "professional":
            # Normalize
            enhanced = self._normalize_audio(enhanced)
            # EQ boost
            enhanced = self._apply_eq(enhanced, sr)
            # Compression
            enhanced = self._apply_compression(enhanced)
            # Reverb
            enhanced = self._add_reverb(enhanced, sr)
            
        elif style == "vintage":
            # Warm saturation
            enhanced = np.tanh(enhanced * 1.5) * 0.8
            # High-frequency roll-off
            enhanced = self._apply_lowpass(enhanced, sr, 8000)
            
        elif style == "modern":
            # Brightness boost
            enhanced = self._apply_highpass(enhanced, sr, 100)
            # Stereo widening (mono to pseudo-stereo)
            enhanced = self._widen_stereo(enhanced)
            
        return enhanced
    
    def _normalize_audio(self, audio: np.ndarray) -> np.ndarray:
        """Normalize audio to prevent clipping"""
        max_val = np.max(np.abs(audio))
        if max_val > 0:
            return audio / max_val * 0.95
        return audio
    
    def _apply_eq(self, audio: np.ndarray, sr: int) -> np.ndarray:
        """Apply basic EQ curve"""
        # Simple high-pass filter to remove rumble
        sos = signal.butter(2, 80, btype='high', fs=sr, output='sos')
        return signal.sosfilt(sos, audio)
    
    def _apply_compression(self, audio: np.ndarray, threshold: float = 0.5, ratio: float = 4.0) -> np.ndarray:
        """Apply basic compression"""
        compressed = audio.copy()
        mask = np.abs(compressed) > threshold
        compressed[mask] = threshold + (compressed[mask] - threshold) / ratio
        return compressed
    
    def _add_reverb(self, audio: np.ndarray, sr: int) -> np.ndarray:
        """Add simple reverb effect"""
        # Create impulse response for reverb
        reverb_length = int(0.5 * sr)  # 0.5 second reverb
        impulse = np.random.exponential(0.1, reverb_length) * np.random.normal(0, 1, reverb_length)
        impulse = impulse / np.max(np.abs(impulse)) * 0.3
        
        # Convolve with audio
        reverb_audio = np.convolve(audio, impulse, mode='same')
        return audio * 0.8 + reverb_audio * 0.2
    
    def _apply_lowpass(self, audio: np.ndarray, sr: int, cutoff: float) -> np.ndarray:
        """Apply low-pass filter"""
        sos = signal.butter(4, cutoff, btype='low', fs=sr, output='sos')
        return signal.sosfilt(sos, audio)
    
    def _apply_highpass(self, audio: np.ndarray, sr: int, cutoff: float) -> np.ndarray:
        """Apply high-pass filter"""
        sos = signal.butter(2, cutoff, btype='high', fs=sr, output='sos')
        return signal.sosfilt(sos, audio)
    
    def _widen_stereo(self, audio: np.ndarray) -> np.ndarray:
        """Create pseudo-stereo effect from mono"""
        if len(audio.shape) == 1:
            # Create stereo from mono with slight delay
            delayed = np.roll(audio, int(len(audio) * 0.001))  # 0.1% delay
            stereo = np.column_stack([audio, delayed])
            return stereo
        return audio
    
    def _get_enhancements_for_style(self, style: str) -> list:
        """Get list of enhancements applied for each style"""
        enhancements = {
            "professional": ["normalization", "eq_boost", "compression", "reverb"],
            "vintage": ["warm_saturation", "high_frequency_rolloff"],
            "modern": ["brightness_boost", "stereo_widening"]
        }
        return enhancements.get(style, [])