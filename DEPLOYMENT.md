# SHIROA Deployment Guide

## Prerequisites
- Node.js 20+
- PostgreSQL 14+
- MongoDB 6+
- AWS Account (S3)
- Stripe Account
- SendGrid Account (optional)

## Environment Setup

### Backend (.env)
```bash
# Copy example and fill in values
cp backend/.env.example backend/.env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Random secure string
- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `S3_BUCKET_NAME` - Your S3 bucket name
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `FRONTEND_URL` - Frontend URL (Vercel)

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://shiroa-music.onrender.com
```

## Database Setup

### PostgreSQL Migration
```bash
cd backend
npm run migration:run
```

### MongoDB Indexes
Indexes are created automatically on first run.

## Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy from `develop` branch

### Backend (Render)
1. Connect GitHub repo to Render
2. Set environment variables in Render dashboard
3. Deploy from `develop` branch
4. Run migration after first deploy

## Post-Deployment

### Stripe Webhook
1. Get webhook URL: `https://shiroa-music.onrender.com/payment/webhook`
2. Add to Stripe dashboard
3. Copy webhook secret to env

### AWS S3 CORS
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["https://shiroa.vercel.app"],
    "ExposeHeaders": []
  }
]
```

### Create Admin User
```bash
# Use the /create-admin-user endpoint once
curl -X POST https://shiroa-music.onrender.com/create-admin-user \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@shiroa.com"}'
```

## Monitoring

### Health Check
- Backend: `https://shiroa-music.onrender.com/health`
- Frontend: `https://shiroa.vercel.app`

### Logs
- Vercel: Dashboard → Deployments → Logs
- Render: Dashboard → Logs

## Troubleshooting

### CORS Issues
Check `main.ts` CORS configuration includes your domain.

### Database Connection
Verify `DATABASE_URL` and `MONGODB_URI` are correct.

### S3 Upload Fails
Check AWS credentials and bucket permissions.

### Email Not Sending
SendGrid API key required. Currently logs to console.
