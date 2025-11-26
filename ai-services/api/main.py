"""
SHIROA AI Services API
FastAPI server for AI operations
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SHIROA AI Services", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MusicGenerateRequest(BaseModel):
    prompt: str
    duration: Optional[int] = 30
    genre: Optional[str] = None


class VoiceGenerateRequest(BaseModel):
    text: str
    persona: Dict
    language: Optional[str] = "tr"


class MixRequest(BaseModel):
    music_url: str
    vocals_url: str


@app.get("/")
async def root():
    return {"service": "SHIROA AI Services", "status": "running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/music/generate")
async def generate_music(request: MusicGenerateRequest):
    try:
        # TODO: MusicGen inference
        return {
            "audio_url": "https://storage.shiroa.com/music/temp.mp3",
            "duration": request.duration,
            "prompt": request.prompt
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/voice/generate")
async def generate_voice(request: VoiceGenerateRequest):
    try:
        # TODO: XTTS inference
        return {
            "audio_url": "https://storage.shiroa.com/vocals/temp.mp3",
            "text": request.text,
            "language": request.language
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/audio/mix")
async def mix_audio(request: MixRequest):
    try:
        # TODO: FFmpeg mixing
        return {"audio_url": "https://storage.shiroa.com/tracks/final.mp3"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
