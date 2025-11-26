"""
SHIROA Music Generator - Training Script
MusicGen fine-tuning for Turkish/English music generation
"""

import torch
from transformers import AutoProcessor, MusicgenForConditionalGeneration
from datasets import load_dataset
import torchaudio
from pathlib import Path
import json

class MusicGenTrainer:
    def __init__(self, model_name="facebook/musicgen-small"):
        """
        Initialize MusicGen trainer
        
        Args:
            model_name: Base model (small/medium/large)
                - small: 300M params, faster
                - medium: 1.5B params, better quality
                - large: 3.3B params, best quality
        """
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Using device: {self.device}")
        
        self.processor = AutoProcessor.from_pretrained(model_name)
        self.model = MusicgenForConditionalGeneration.from_pretrained(model_name)
        self.model.to(self.device)
        
    def prepare_dataset(self, audio_dir: str, metadata_file: str):
        """
        Dataset hazırlama
        
        Dataset formatı:
        audio_dir/
        ├── track_001.mp3
        ├── track_002.mp3
        └── ...
        
        metadata.json:
        [
            {
                "file": "track_001.mp3",
                "genre": "pop",
                "mood": "happy",
                "bpm": 120,
                "key": "C",
                "description": "upbeat pop song with electronic elements"
            },
            ...
        ]
        """
        audio_path = Path(audio_dir)
        with open(metadata_file) as f:
            metadata = json.load(f)
        
        dataset = []
        for item in metadata:
            audio_file = audio_path / item["file"]
            if audio_file.exists():
                # Audio yükle
                waveform, sample_rate = torchaudio.load(audio_file)
                
                # 30 saniyeye kırp (MusicGen max length)
                max_length = 30 * sample_rate
                if waveform.shape[1] > max_length:
                    waveform = waveform[:, :max_length]
                
                # Mono'ya çevir
                if waveform.shape[0] > 1:
                    waveform = torch.mean(waveform, dim=0, keepdim=True)
                
                # 32kHz'e resample (MusicGen requirement)
                if sample_rate != 32000:
                    resampler = torchaudio.transforms.Resample(sample_rate, 32000)
                    waveform = resampler(waveform)
                
                dataset.append({
                    "audio": waveform,
                    "description": item["description"],
                    "genre": item["genre"],
                    "mood": item["mood"]
                })
        
        return dataset
    
    def train(self, dataset, epochs=10, batch_size=4, learning_rate=1e-5):
        """
        Model eğitimi
        
        Args:
            dataset: Hazırlanmış dataset
            epochs: Eğitim epoch sayısı
            batch_size: Batch size (GPU memory'ye göre ayarla)
            learning_rate: Learning rate
        """
        optimizer = torch.optim.AdamW(self.model.parameters(), lr=learning_rate)
        
        self.model.train()
        
        for epoch in range(epochs):
            total_loss = 0
            
            for i in range(0, len(dataset), batch_size):
                batch = dataset[i:i+batch_size]
                
                # Batch hazırla
                descriptions = [item["description"] for item in batch]
                audios = [item["audio"] for item in batch]
                
                # Tokenize
                inputs = self.processor(
                    text=descriptions,
                    audio=audios,
                    sampling_rate=32000,
                    return_tensors="pt",
                    padding=True
                ).to(self.device)
                
                # Forward pass
                outputs = self.model(**inputs, labels=inputs.input_ids)
                loss = outputs.loss
                
                # Backward pass
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
                
                total_loss += loss.item()
                
                if i % 10 == 0:
                    print(f"Epoch {epoch+1}/{epochs}, Batch {i}/{len(dataset)}, Loss: {loss.item():.4f}")
            
            avg_loss = total_loss / (len(dataset) / batch_size)
            print(f"Epoch {epoch+1} completed. Average Loss: {avg_loss:.4f}")
            
            # Checkpoint kaydet
            self.save_checkpoint(f"checkpoint_epoch_{epoch+1}.pt")
    
    def save_checkpoint(self, filename):
        """Model checkpoint kaydet"""
        torch.save({
            'model_state_dict': self.model.state_dict(),
        }, filename)
        print(f"Checkpoint saved: {filename}")
    
    def save_model(self, output_dir):
        """Final model kaydet"""
        self.model.save_pretrained(output_dir)
        self.processor.save_pretrained(output_dir)
        print(f"Model saved to {output_dir}")


# Dataset toplama rehberi
DATASET_SOURCES = """
LEGAL DATASET SOURCES:

1. Free Music Archive (FMA)
   - 106,574 tracks, 30 saniye preview
   - CC licensed
   - https://github.com/mdeff/fma

2. Jamendo
   - 500,000+ tracks
   - CC licensed
   - https://www.jamendo.com/

3. ccMixter
   - Remix community
   - CC licensed
   - http://ccmixter.org/

4. Musopen
   - Classical music
   - Public domain
   - https://musopen.org/

5. YouTube Audio Library
   - Royalty-free music
   - https://www.youtube.com/audiolibrary

TÜRKÇE MÜZİK:
- Açık kaynak Türkçe şarkılar
- CC licensed Turkish artists
- Public domain Turkish music

NOT: Telif hakkı olan müzikleri kullanma!
"""

if __name__ == "__main__":
    print(DATASET_SOURCES)
    print("\n" + "="*50)
    print("SHIROA Music Generator Training")
    print("="*50 + "\n")
    
    # Örnek kullanım
    # trainer = MusicGenTrainer(model_name="facebook/musicgen-small")
    # dataset = trainer.prepare_dataset("./dataset/audio", "./dataset/metadata.json")
    # trainer.train(dataset, epochs=10)
    # trainer.save_model("./models/shiroa-musicgen-v1")
