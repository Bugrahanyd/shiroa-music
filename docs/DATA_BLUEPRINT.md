# SHIROA — DATA BLUEPRINT

## Amaç
Platform verilerini, koleksiyonları/tabloları, event şemalarını ve veri akışını tanımlamak. AI eğitimi, analytics ve finansal kayıtlar için sağlam ve değişmez temel oluşturmak.

## Ana veri deposu
- MongoDB Atlas: tracks, ai_profiles, analytics, ml_raw
- PostgreSQL: users, transactions, license_ledger, credit_ledger
- Redis: cache, counters, ephemeral session data

## tracks (örnek alanlar)
- track_id, title, artist, ai_profile_id
- bpm (int), key (string), genres (array), subgenres (array)
- mood (array), instruments (array), language
- duration_sec, formats { master, stream_320, preview_30 }
- status (available/reserved/sold), license_type (exclusive/non-exclusive)
- upload_date, meta { tempo_confidence, loudness, stems_count, ai_generated }

## users (Postgres)
- user_id (uuid), email, name, role, credit_balance, created_at

## transactions (Postgres)
- txn_id, user_id, track_id, amount, currency, credits_used, status, provider_info, created_at

## analytics (Mongo)
- event_id, user_id, track_id, event_type, meta, ts
- event_type examples: page_view, play_start, play_stop, preview_seek, clicked_buy, pressed_escape, hover_duration

## retention & exports
- raw events: 1 year
- aggregated metrics: 5 years
- transactions: 7+ years (mevzuata göre)

## ML data pipeline (özet)
1. Collector stores raw events in analytics collection.
2. Daily batch job aggregates & anonymizes, exports to ml_training bucket.
3. Labeling tasks: manual curator tools to create gold labels for supervised training.
