"""
SHIROA Lyrics Analyzer
Şarkı sözlerini analiz edip genre, mood, persona belirler
"""

from openai import OpenAI
import os
from typing import Dict, List
import json

class LyricsAnalyzer:
    def __init__(self, api_key: str = None):
        """
        Initialize Lyrics Analyzer
        
        Args:
            api_key: OpenAI API key (None ise env'den alır)
        """
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
    
    def analyze_lyrics(self, lyrics: str, language: str = "auto") -> Dict:
        """
        Şarkı sözlerini analiz et
        
        Args:
            lyrics: Şarkı sözleri
            language: Dil (auto, tr, en)
        
        Returns:
            {
                "genre": "pop",
                "subgenre": "electronic-pop",
                "mood": "happy",
                "tempo": "upbeat",
                "themes": ["love", "freedom"],
                "language": "tr",
                "persona": {
                    "vocal_style": "smooth",
                    "tone": "energetic",
                    "gender": "female",
                    "age_range": "young",
                    "accent": "neutral"
                },
                "music_description": "upbeat electronic pop with synth elements"
            }
        """
        
        prompt = f"""
Analyze these song lyrics and provide detailed information:

LYRICS:
{lyrics}

Provide a JSON response with:
1. genre (main genre: pop, rock, rap, arabesk, türkü, electronic, etc.)
2. subgenre (specific subgenre)
3. mood (happy, sad, energetic, melancholic, romantic, angry, etc.)
4. tempo (slow, medium, fast, upbeat)
5. themes (array of themes: love, heartbreak, freedom, nostalgia, etc.)
6. language (detected language: tr, en, etc.)
7. persona (vocal characteristics):
   - vocal_style: smooth, raspy, powerful, soft, emotional
   - tone: energetic, calm, passionate, aggressive
   - gender: male, female, neutral
   - age_range: young, mature, elderly
   - accent: neutral, regional (if Turkish: istanbul, aegean, black-sea, etc.)
8. music_description (detailed description for music generation)

IMPORTANT FOR TURKISH LYRICS:
- Detect Turkish genres: arabesk, türkü, pop, rap, rock
- Consider Turkish cultural context
- Identify regional styles if present

Return ONLY valid JSON, no additional text.
"""
        
        response = self.client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a music expert specializing in Turkish and international music. Analyze lyrics and provide detailed genre, mood, and persona information."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.3
        )
        
        result = json.loads(response.choices[0].message.content)
        return result
    
    def generate_music_prompt(self, analysis: Dict) -> str:
        """
        Analiz sonucundan müzik üretimi için prompt oluştur
        
        Args:
            analysis: analyze_lyrics() sonucu
        
        Returns:
            Müzik üretimi için optimize edilmiş prompt
        """
        genre = analysis.get("genre", "pop")
        subgenre = analysis.get("subgenre", "")
        mood = analysis.get("mood", "neutral")
        tempo = analysis.get("tempo", "medium")
        
        prompt = f"{tempo} {mood} {genre}"
        if subgenre:
            prompt += f" with {subgenre} elements"
        
        # Türkçe müzik için özel eklemeler
        if analysis.get("language") == "tr":
            if genre == "arabesk":
                prompt += ", traditional Turkish arabesk style with emotional vocals"
            elif genre == "türkü":
                prompt += ", traditional Turkish folk music"
        
        return prompt
    
    def suggest_voice_settings(self, persona: Dict) -> Dict:
        """
        Persona'dan ses ayarları öner
        
        Args:
            persona: Persona bilgisi
        
        Returns:
            Voice generation için ayarlar
        """
        return {
            "stability": 0.8 if persona.get("tone") == "calm" else 0.5,
            "similarity_boost": 0.75,
            "style": 0.8 if persona.get("vocal_style") == "emotional" else 0.5,
            "use_speaker_boost": True
        }


class GenreClassifier:
    """
    Gelecekte kendi modelimiz için
    DistilBERT fine-tuned genre classifier
    """
    
    TURKISH_GENRES = [
        "pop", "rock", "rap", "arabesk", "türkü", 
        "electronic", "alternative", "indie", "jazz",
        "classical", "folk", "r&b"
    ]
    
    MOODS = [
        "happy", "sad", "energetic", "calm", "romantic",
        "melancholic", "angry", "nostalgic", "hopeful", "dark"
    ]
    
    def __init__(self):
        # TODO: Load fine-tuned model
        pass
    
    def classify(self, lyrics: str) -> Dict:
        """
        Kendi modelimizle genre classification
        Şimdilik GPT-4 kullanıyoruz, sonra kendi modelimize geçeceğiz
        """
        # TODO: Implement custom model inference
        pass


# Test
if __name__ == "__main__":
    # Örnek Türkçe şarkı sözü
    turkish_lyrics = """
    Yalnızlık sardı her yanımı
    Sensiz geçen günler çok zor
    Gözlerimde hep senin hayalin
    Dön geri artık yeter bu hasret
    """
    
    # Örnek İngilizce şarkı sözü
    english_lyrics = """
    Dancing in the moonlight
    Feeling so alive tonight
    Your love lifts me higher
    We're burning like fire
    """
    
    print("SHIROA Lyrics Analyzer Test\n")
    print("="*50)
    
    # analyzer = LyricsAnalyzer()
    # 
    # print("\n1. Turkish Lyrics Analysis:")
    # tr_analysis = analyzer.analyze_lyrics(turkish_lyrics)
    # print(json.dumps(tr_analysis, indent=2, ensure_ascii=False))
    # 
    # print("\n2. Music Prompt:")
    # prompt = analyzer.generate_music_prompt(tr_analysis)
    # print(prompt)
    # 
    # print("\n3. Voice Settings:")
    # voice_settings = analyzer.suggest_voice_settings(tr_analysis["persona"])
    # print(json.dumps(voice_settings, indent=2))
    
    print("\nNOT: OpenAI API key gerekli. .env dosyasına ekle:")
    print("OPENAI_API_KEY=sk-...")
