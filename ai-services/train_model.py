#!/usr/bin/env python3
"""
SHIROA Custom Model Training Pipeline
"""

import torch
import torchaudio
from transformers import MusicgenForConditionalGeneration, AutoProcessor, Trainer, TrainingArguments
from datasets import Dataset
import os
import json
from pathlib import Path

class MusicDataset:
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.samples = self.load_samples()
    
    def load_samples(self):
        samples = []
        for genre_dir in self.data_dir.iterdir():
            if genre_dir.is_dir():
                for audio_file in genre_dir.glob("*.wav"):
                    metadata_file = audio_file.with_suffix(".json")
                    if metadata_file.exists():
                        with open(metadata_file) as f:
                            metadata = json.load(f)
                        samples.append({
                            "audio_path": str(audio_file),
                            "genre": genre_dir.name,
                            "mood": metadata.get("mood", "neutral"),
                            "tempo": metadata.get("tempo", 120),
                            "description": f"{genre_dir.name} music, {metadata.get('mood', 'neutral')} mood"
                        })
        return samples

def prepare_training_data(data_dir: str):
    """Prepare dataset for training"""
    dataset = MusicDataset(data_dir)
    
    def process_sample(sample):
        # Load audio
        waveform, sample_rate = torchaudio.load(sample["audio_path"])
        
        # Resample to 32kHz (MusicGen requirement)
        if sample_rate != 32000:
            resampler = torchaudio.transforms.Resample(sample_rate, 32000)
            waveform = resampler(waveform)
        
        # Ensure mono
        if waveform.shape[0] > 1:
            waveform = torch.mean(waveform, dim=0, keepdim=True)
        
        return {
            "audio": waveform.squeeze().numpy(),
            "text": sample["description"],
            "sample_rate": 32000
        }
    
    processed_samples = [process_sample(s) for s in dataset.samples]
    return Dataset.from_list(processed_samples)

def fine_tune_musicgen(data_dir: str, output_dir: str):
    """Fine-tune MusicGen on custom data"""
    
    # Load base model
    model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    
    # Prepare dataset
    train_dataset = prepare_training_data(data_dir)
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir=output_dir,
        num_train_epochs=10,
        per_device_train_batch_size=1,  # Small batch for memory
        gradient_accumulation_steps=8,
        learning_rate=1e-5,
        warmup_steps=100,
        logging_steps=10,
        save_steps=500,
        eval_steps=500,
        save_total_limit=3,
        remove_unused_columns=False,
        dataloader_pin_memory=False,
    )
    
    # Custom trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        tokenizer=processor,
    )
    
    # Start training
    trainer.train()
    
    # Save final model
    trainer.save_model(f"{output_dir}/final")
    processor.save_pretrained(f"{output_dir}/final")

if __name__ == "__main__":
    # Example usage
    DATA_DIR = "./training_data"  # Your music dataset
    OUTPUT_DIR = "./shiroa_musicgen"
    
    print("🎵 Starting SHIROA model training...")
    fine_tune_musicgen(DATA_DIR, OUTPUT_DIR)
    print("✅ Training completed!")