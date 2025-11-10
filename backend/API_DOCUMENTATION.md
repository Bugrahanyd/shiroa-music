# SHIROA Backend API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

---

## Tracks Endpoints

### List All Tracks
```http
GET /tracks
GET /tracks?genre=Electronic
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Summer Vibes",
    "artist": "DJ Producer",
    "genre": "Electronic",
    "bpm": 128,
    "key": "Am",
    "duration": 180,
    "price": 49.99,
    "audioUrl": "audio/1234-track.mp3",
    "previewUrl": "audio/1234-preview.mp3",
    "coverUrl": "covers/1234-cover.jpg",
    "tags": ["electronic", "dance"],
    "isExclusive": true,
    "isSold": false,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Track by ID
```http
GET /tracks/:id
```

### Create Track (ADMIN only)
```http
POST /tracks
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "New Track",
  "artist": "Artist Name",
  "genre": "Electronic",
  "mood": "Uplifting",
  "bpm": 128,
  "key": "Am",
  "duration": 180,
  "price": 49.99,
  "audioUrl": "audio/track.mp3",
  "previewUrl": "audio/preview.mp3",
  "coverUrl": "covers/cover.jpg",
  "tags": ["electronic", "dance"],
  "isExclusive": true
}
```

### Update Track (ADMIN only)
```http
PATCH /tracks/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 39.99,
  "mood": "Chill"
}
```

### Delete Track (ADMIN only)
```http
DELETE /tracks/:id
Authorization: Bearer <admin_token>
```

---

## Upload Endpoints

### Upload Audio File (ADMIN only)
```http
POST /upload/audio
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

file: <audio_file.mp3>
```

**Response:**
```json
{
  "key": "audio/1234567890-track.mp3",
  "url": "https://shiroa-tracks.s3.us-east-1.amazonaws.com/audio/1234567890-track.mp3",
  "size": 5242880,
  "mimetype": "audio/mpeg"
}
```

### Upload Cover Image (ADMIN only)
```http
POST /upload/cover
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

file: <cover_image.jpg>
```

---

## Payment Endpoints

### Create Checkout Session
```http
POST /payment/create-checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "trackId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0",
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

### Stripe Webhook
```http
POST /payment/webhook
Stripe-Signature: <signature>

<stripe_event_payload>
```

### Get User Purchases
```http
GET /payment/purchases
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439010",
    "trackId": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Summer Vibes",
      "artist": "DJ Producer"
    },
    "amount": 49.99,
    "currency": "usd",
    "status": "completed",
    "licenseKey": "SHIROA-1234567890-ABC123XYZ",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Purchase Details
```http
GET /payment/purchases/:id
Authorization: Bearer <token>
```

---

## Download Endpoints

### Download Purchased Track
```http
GET /download/purchase/:purchaseId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "purchaseId": "507f1f77bcf86cd799439012",
  "trackTitle": "Summer Vibes",
  "artist": "DJ Producer",
  "licenseKey": "SHIROA-1234567890-ABC123XYZ",
  "downloadUrl": "https://shiroa-tracks.s3.amazonaws.com/audio/track.mp3?X-Amz-...",
  "expiresIn": 3600
}
```

---

## Analytics Endpoints

### Track View Event
```http
POST /analytics/track/:id/view
```

### Track Play Event
```http
POST /analytics/track/:id/play
```

### Get Popular Tracks
```http
GET /analytics/popular
```

**Response:**
```json
[
  {
    "trackId": "507f1f77bcf86cd799439011",
    "views": 1523,
    "track": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Summer Vibes",
      "artist": "DJ Producer",
      "genre": "Electronic"
    }
  }
]
```

### Get Track Statistics (requires JWT)
```http
GET /analytics/track/:id/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "views": 1523,
  "plays": 842
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than 6 characters"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "You do not own this purchase",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Track with ID 507f1f77bcf86cd799439011 not found",
  "error": "Not Found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

---

## Rate Limiting

All endpoints are rate-limited to **100 requests per minute** per IP address.

---

## User Roles

- **user**: Can browse tracks, make purchases, download owned tracks
- **admin**: Full access including track CRUD operations
- **producer**: Can upload tracks (future feature)
