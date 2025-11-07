# SHIROA — SECURITY & COMPLIANCE

## Authentication & Authorization
- JWT with short TTL + refresh tokens stored server-side (or rotate refresh tokens)
- Role based access: admin / artist / buyer / guest

## Media Protection
- S3 master files: private, SSE (server side encryption)
- Previews/streams delivered via signed CloudFront URLs (short TTL)
- No direct public access to master bucket

## Network & Infra
- WAF at edge (Cloudflare / AWS WAF)
- Private VPC for AI services and DB
- Secrets: AWS Secrets Manager or Vault
- Security scans in CI (Snyk/Dependabot)

## Data Protection
- PII minimization, consent for using studio edits in ML
- Retention policies per DATA_BLUEPRINT.md
- Compliance: GDPR/KVKK consideration; transactions stored per tax rules

## Incident Response
- Alerting via Grafana/Sentry
- RACI plan: who to call, who to notify, SLAs
