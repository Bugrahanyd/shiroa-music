import torch
import numpy as np
from typing import Dict, Any
import librosa
import soundfile as sf

class AIComposer:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
    async def generate_music(self, genre: str, mood: str, duration: int, tempo: int = 120) -> Dict[str, Any]:
        """Generate music based on parameters"""
        sample_rate = 44100
        t = np.linspace(0, duration, duration * sample_rate, False)
        
        frequencies = self._get_frequencies_for_genre(genre, mood)
        audio = np.zeros_like(t)
        
        for freq in frequencies:
            audio += 0.3 * np.sin(2 * np.pi * freq * t)
        
        envelope = np.exp(-t / (duration * 0.3))
        audio *= envelope
        
        output_path = f"generated_{genre}_{mood}_{duration}s.wav"
        sf.write(output_path, audio, sample_rate)
        
        return {
            "audio_path": output_path,
            "duration": duration,
            "sample_rate": sample_rate,
            "metadata": {"genre": genre, "mood": mood, "tempo": tempo}
        }
    
    def _get_frequencies_for_genre(self, genre: str, mood: str) -> list:
        base_freqs = {
            "rock": [220, 277, 330, 440],
            "pop": [261, 329, 392, 523],
            "jazz": [220, 261, 311, 415],
            "electronic": [130, 164, 196, 261]
        }
        
        mood_multipliers = {"happy": 1.0, "sad": 0.8, "energetic": 1.2, "calm": 0.9}
        
        freqs = base_freqs.get(genre.lower(), base_freqs["pop"])
        multiplier = mood_multipliers.get(mood.lower(), 1.0)
        
        return [f * multiplier for f in freqs]