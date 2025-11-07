# SHIROA — AI INTEGRATION (Design & Strategy)

## Vision
AI will be introduced as isolated microservices that provide:
- Composition (Composer): generate instrumental + melody from prompts
- Vocalizer: synthesize vocals, word replacement, style transfer
- Mixer: auto-mix & mastering

## Architecture
- Containerized services (Docker) deployed to GPU-backed nodes (AWS ECS/Fargate with GPU or GKE nodes)
- FastAPI for AI endpoints; gRPC for low-latency inter-service calls when needed
- Model registry: HuggingFace + internal artifact store
- Data: use `ml_training_data` bucket fed from analytics & curator-labeled datasets

## Data & Labeling
- Start with curated small dataset + high-quality labels
- Collect user edits & studio logs as training signals (consent/PII rules apply)
- Annotators add genre/mood/instrument labels for supervised training

## Safety & IP
- Track whether output is AI-generated; display to buyers
- For exclusive sales, store provenance metadata (model version, prompt hash)
- Copyright policy: define clear licensing when AI-generated content used

## Roadmap for AI
1. POC: simple melody generator & vocalizer
2. Integration into Studio (Seviye 2 features)
3. Train/fine-tune models with platform data (after labeling and consent)
