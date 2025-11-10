# SHIROA Backend

AI-powered music production and licensing platform backend built with Nest.js.

## Tech Stack

- **Framework**: Nest.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + Passport
- **Storage**: AWS S3
- **Language**: TypeScript

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
MONGODB_URI=mongodb://localhost:27017/shiroa
PORT=3001
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=shiroa-tracks
```

### 3. Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB Community Edition
```

### 4. Run Development Server
```bash
npm run start:dev
```

Server runs on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (returns JWT token)
- `GET /auth/profile` - Get user profile (requires JWT)

### Tracks
- `GET /tracks` - List all tracks (public)
- `GET /tracks/:id` - Get track details (public)
- `POST /tracks` - Create track (ADMIN only)
- `PATCH /tracks/:id` - Update track (ADMIN only)
- `DELETE /tracks/:id` - Delete track (ADMIN only)

### Upload
- `POST /upload/audio` - Upload audio file (ADMIN only)
- `POST /upload/cover` - Upload cover image (ADMIN only)

### Payment
- `POST /payment/create-checkout` - Create Stripe checkout session (requires JWT)
- `POST /payment/webhook` - Stripe webhook handler
- `GET /payment/purchases` - Get user purchases (requires JWT)
- `GET /payment/purchases/:id` - Get purchase details (requires JWT)

### Download
- `GET /download/purchase/:purchaseId` - Download purchased track (requires JWT)

### Analytics
- `POST /analytics/track/:id/view` - Track view event
- `POST /analytics/track/:id/play` - Track play event
- `GET /analytics/popular` - Get popular tracks
- `GET /analytics/track/:id/stats` - Get track statistics (requires JWT)

## User Roles

- `user` - Regular user (can browse and purchase)
- `admin` - Administrator (full CRUD access)
- `producer` - Music producer (can upload tracks)

## Scripts

```bash
npm run start:dev    # Development mode with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── modules/
│   ├── auth/           # Authentication & JWT
│   ├── users/          # User management
│   ├── tracks/         # Track CRUD operations
│   └── upload/         # S3 file upload
├── app.module.ts       # Root module
└── main.ts             # Application entry point
```

## Development

### Create Admin User
Use `/auth/register` endpoint with these credentials, then manually update role in MongoDB:
```json
{
  "email": "admin@shiroa.com",
  "password": "admin123",
  "name": "Admin User"
}
```

Then in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@shiroa.com" },
  { $set: { role: "admin" } }
)
```

## Features

### ✅ Completed
- [x] Validation pipes (class-validator)
- [x] Stripe payment integration
- [x] Analytics module
- [x] Rate limiting (100 requests/minute)
- [x] Download system with signed URLs
- [x] JWT authentication with roles
- [x] MongoDB integration
- [x] S3 file upload

### 🔜 Next Steps
- [ ] Implement audio transcoding
- [ ] Add Redis caching
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Search functionality
