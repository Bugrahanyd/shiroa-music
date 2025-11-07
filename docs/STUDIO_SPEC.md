# SHIROA — STUDIO SPEC (3-tier studio design)

## Goal
After purchase, buyer can open an integrated web-based studio with incremental capabilities:
- Seviye 1 (basit): trim, fade, volume, basic FX (reverb, EQ), export mp3
- Seviye 2 (orta): stem isolation, prompt-based lyric patching, style transfer, undo/history
- Seviye 3 (pro): multi-track mix, parametric EQ, AI mastering, wav/flac export, collaboration

## Architecture
- Frontend: Next.js + Tone.js / WebAudio; session via WebSocket
- Backend: StudioService (Nest.js) proxies to AI microservices for heavy processing
- Long operations: asynchronous jobs + render buffer in S3
- Credits: studio sessions consume credits; receipt logged in Postgres

## Non-destructive edits
- Original master never overwritten; edits saved as diffs/variants referencing original.
- Versioning for sessions: session_id, actions[], timestamp.

## Example user flow
1. User purchases track (license token).
2. Click "Open in Studio" → backend verifies license + credits
3. Studio session created, renders preview stream
4. User edits, requests AI lyric replace → job queued, processed, result pushed to session
5. Export: user chooses quality & format; credits deducted & transaction logged.
