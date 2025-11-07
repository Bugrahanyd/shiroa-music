# SHIROA — DEPLOYMENT GUIDE (Overview)

## Environments
- local -> dev -> staging -> production

## Frontend
- Host: Vercel for Next.js
- Add domain in Vercel, use Cloudflare DNS
- Deploy pipeline: push to `main` → production deploy; `develop` → staging

## Backend
- Host: Render / Railway / AWS ECS (recommended for production)
- Use GitHub Actions for CI: build -> tests -> push container -> deploy
- Migrations: use a migration tool (TypeORM / Prisma) and run in CI step

## Database & Storage
- MongoDB Atlas managed cluster (multi-AZ)
- Postgres managed (RDS or managed provider)
- S3 buckets + CloudFront, origin access identity

## Infrastructure as Code
- Terraform for infra (S3 buckets, CloudFront distributions, ECS clusters, IAM)
- Keep state remote (S3 backend + DynamoDB lock or Terraform Cloud)

## Rollback & Monitoring
- Use canary deploys for backend
- Prometheus & Grafana for metrics; Sentry for error tracking
