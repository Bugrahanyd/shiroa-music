from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from typing import Optional
import logging
import time

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Try to import AI libraries
try:
    import torch
    import torchaudio
    from transformers import MusicgenForConditionalGeneration, AutoProcessor
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False
    logger.warning("AI libraries not available - running in fallback mode")

app = FastAPI(title="SHIROA AI Services", version="2.0.0")

# Global model variables
model = None
processor = None

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ComposerRequest(BaseModel):
    genre: str
    mood: str
    duration: int  # seconds
    tempo: Optional[int] = 120
    lyrics: Optional[str] = None

class VocalizerRequest(BaseModel):
    audio_url: str
    voice_type: str = "neutral"
    lyrics: str = ""

class MixerRequest(BaseModel):
    audio_url: str
    style: str = "professional"

@app.on_event("startup")
async def load_model():
    global model, processor
    if not AI_AVAILABLE:
        logger.info("Running in fallback mode - no AI libraries")
        return
    
    try:
        logger.info("Loading MusicGen model...")
        model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
        processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
        
        if torch.cuda.is_available():
            model = model.to("cuda")
            logger.info("Model loaded on GPU")
        else:
            logger.info("Model loaded on CPU")
    except Exception as e:
        logger.error(f"Failed to load model: {e}")
        model = None
        processor = None

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "ok" if model is not None else "fallback_mode",
        "service": "SHIROA AI Services",
        "ai_available": AI_AVAILABLE,
        "gpu_available": torch.cuda.is_available() if AI_AVAILABLE else False,
        "model_loaded": model is not None
    }

# AI Composer endpoint
@app.post("/composer/generate")
async def generate_music(request: ComposerRequest):
    if not AI_AVAILABLE or model is None or processor is None:
        # Fallback response
        track_id = f"demo_{int(time.time())}"
        return {
            "success": True,
            "trackId": track_id,
            "audioUrl": f"http://localhost:8000/audio/{track_id}.wav",
            "status": "completed",
            "metadata": {
                "genre": request.genre,
                "mood": request.mood,
                "tempo": request.tempo,
                "duration": request.duration,
                "fallback": True,
                "message": "Demo mode - install torch for real AI generation"
            }
        }
    
    try:
        # Build prompt
        prompt = build_prompt(request.genre, request.mood, request.tempo)
        logger.info(f"Generating music: {prompt}")
        
        # Generate music
        inputs = processor(text=[prompt], padding=True, return_tensors="pt")
        
        if torch.cuda.is_available():
            inputs = {k: v.to("cuda") for k, v in inputs.items()}
        
        with torch.no_grad():
            audio_values = model.generate(
                **inputs,
                max_new_tokens=int(request.duration * 50),
                do_sample=True,
                guidance_scale=3.0,
            )
        
        # Save audio
        track_id = f"musicgen_{abs(hash(prompt))}_{request.duration}"
        audio_path = f"/tmp/{track_id}.wav"
        
        audio_cpu = audio_values[0].cpu()
        torchaudio.save(audio_path, audio_cpu, sample_rate=model.config.audio_encoder.sampling_rate)
        
        return {
            "success": True,
            "trackId": track_id,
            "audioUrl": f"http://localhost:8000/audio/{track_id}.wav",
            "status": "completed",
            "metadata": {
                "genre": request.genre,
                "mood": request.mood,
                "duration": request.duration,
                "tempo": request.tempo,
                "prompt": prompt,
                "model": "musicgen-small"
            }
        }
        
    except Exception as e:
        logger.error(f"Generation failed: {e}")
        track_id = f"error_{int(time.time())}"
        return {
            "success": True,
            "trackId": track_id,
            "audioUrl": f"http://localhost:8000/audio/{track_id}.wav",
            "status": "completed",
            "metadata": {
                "genre": request.genre,
                "mood": request.mood,
                "fallback": True,
                "error": str(e)
            }
        }

# AI Vocalizer endpoint
@app.post("/vocalizer/process")
async def add_vocals(request: VocalizerRequest):
    # TODO: Implement AI vocal synthesis
    return {
        "status": "success",
        "audio_url": f"https://example.com/vocalized/{request.voice_type}.wav",
        "original_url": request.audio_url
    }

# AI Mixer endpoint
@app.post("/mixer/enhance")
async def enhance_audio(request: MixerRequest):
    # TODO: Implement AI audio enhancement
    return {
        "status": "success",
        "audio_url": f"https://example.com/mixed/{request.style}.wav",
        "original_url": request.audio_url
    }

@app.get("/audio/{filename}")
async def get_audio(filename: str):
    from fastapi.responses import FileResponse
    file_path = f"/tmp/{filename}"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/wav")
    raise HTTPException(status_code=404, detail="Audio file not found")

@app.get("/status/{track_id}")
async def get_status(track_id: str):
    return {
        "status": "completed",
        "progress": 100,
        "audio_url": f"http://localhost:8000/audio/{track_id}.wav"
    }

def build_prompt(genre: str, mood: str, tempo: int) -> str:
    genre_map = {
        "electronic": "electronic music, synthesizers, digital beats",
        "hip-hop": "hip hop, rap beats, urban style",
        "rock": "rock music, electric guitars, drums",
        "pop": "pop music, catchy melody",
        "jazz": "jazz music, improvisation, swing",
        "classical": "classical music, orchestral",
        "ambient": "ambient music, atmospheric",
        "trap": "trap music, heavy bass, hi-hats",
        "house": "house music, dance, four-on-the-floor",
        "techno": "techno music, repetitive beats"
    }
    
    mood_map = {
        "energetic": "high energy, upbeat",
        "calm": "peaceful, relaxing",
        "dark": "dark, mysterious",
        "uplifting": "uplifting, positive",
        "melancholic": "sad, emotional",
        "aggressive": "aggressive, intense",
        "dreamy": "dreamy, ethereal",
        "mysterious": "mysterious, suspenseful",
        "happy": "happy, joyful",
        "intense": "intense, dramatic"
    }
    
    tempo_desc = "slow" if tempo < 90 else "medium" if tempo < 130 else "fast"
    
    return f"{genre_map.get(genre, genre)}, {mood_map.get(mood, mood)}, {tempo_desc} tempo"

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)