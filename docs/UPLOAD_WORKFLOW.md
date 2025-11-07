# SHIROA — UPLOAD & PUBLISH WORKFLOW (Admin-first)

## Hedef
Güvenli, metadata zengin ve otomatik transcode olan admin upload akışı. Gelecekte prodüktör upload'ı açılacak.

## Adımlar
1. Admin upload form:
   - master file (wav/flac/mp3), preview (optional), title, artist, bpm, key, genres, mood, instruments, language, lyrics, cover image, license type.
2. Upload to S3 master bucket.
3. Ingestion worker (Lambda / worker) triggers:
   - FFmpeg: create preview_30, stream_320; waveform image.
   - Persist derived files to dedicated buckets.
4. Metadata auto-extract: duration, loudness(LUFS), tempo guess.
5. Manual QC (first N uploads) + admin approve.
6. Publish: status = "available". If exclusive & sold → status = "sold" and remove preview if policy dictates.

## Security
- Master files private in S3; previews signed and short TTL.
- Ingest logs stored for audits.
