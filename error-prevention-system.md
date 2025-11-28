# SHIROA Error Prevention System

## 🛡️ Critical Error Prevention Checklist

### 1. Environment Configuration Errors

#### Backend (.env)
```bash
# REQUIRED - Missing these will crash the app
✅ JWT_SECRET (min 32 chars)
✅ DATABASE_URL (PostgreSQL connection)
✅ MONGODB_URI (MongoDB connection)
✅ PORT (default: 3001)
✅ NODE_ENV (development/production)

# OPTIONAL - Graceful degradation
⚠️ REDIS_URL (caching disabled if missing)
⚠️ STRIPE_SECRET_KEY (payment disabled if missing)
⚠️ AWS_ACCESS_KEY_ID (local storage fallback)
⚠️ RESEND_API_KEY (email disabled if missing)
```

#### Frontend (.env.local)
```bash
✅ NEXT_PUBLIC_API_URL (backend endpoint)
⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (payment disabled)
```

**Prevention:**
- Run `node validate-env.js` before starting
- Add startup validation in main.ts
- Use ConfigService with validation schema

---

### 2. Database Connection Errors

#### PostgreSQL Issues
```typescript
// ❌ WRONG - No error handling
TypeOrmModule.forRoot({ url: process.env.DATABASE_URL })

// ✅ CORRECT - With retry and fallback
TypeOrmModule.forRootAsync({
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    synchronize: process.env.NODE_ENV !== 'production',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    retryAttempts: 3,
    retryDelay: 3000,
    autoLoadEntities: true
  })
})
```

#### MongoDB Issues
```typescript
// ✅ Add connection error handling
MongooseModule.forRootAsync({
  useFactory: async (config: ConfigService) => ({
    uri: config.get('MONGODB_URI'),
    retryAttempts: 3,
    retryDelay: 3000,
    connectionFactory: (connection) => {
      connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      return connection;
    }
  })
})
```

**Prevention:**
- Always use async configuration
- Add retry logic
- Implement health checks
- Log connection status

---

### 3. Authentication & JWT Errors

#### Token Expiration
```typescript
// ❌ WRONG - No refresh logic
const token = localStorage.getItem('access_token');
fetch('/api/protected', { headers: { Authorization: `Bearer ${token}` }});

// ✅ CORRECT - Auto refresh
async request(endpoint: string) {
  let token = safeStorage.getItem('access_token');
  
  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 401) {
      // Token expired, try refresh
      const refreshToken = safeStorage.getItem('refresh_token');
      const newTokens = await this.refreshTokens(refreshToken);
      
      // Retry with new token
      return await fetch(endpoint, {
        headers: { Authorization: `Bearer ${newTokens.access_token}` }
      });
    }
    
    return response;
  } catch (error) {
    // Redirect to login
    window.location.href = '/login';
  }
}
```

#### Password Validation
```typescript
// ✅ Enforce strong passwords
private validatePassword(password: string): void {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  
  if (!regex.test(password)) {
    throw new BadRequestException(
      'Password must be 12+ chars with uppercase, lowercase, number, special char'
    );
  }
}
```

**Prevention:**
- Implement token refresh logic
- Add password strength validation
- Use secure JWT secrets (32+ chars)
- Set appropriate token expiration times

---

### 4. File Upload Errors

#### Size & Type Validation
```typescript
// ✅ Validate before upload
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
  const maxSize = 50 * 1024 * 1024; // 50MB
  
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  
  if (file.size > maxSize) {
    return cb(new Error('File too large'), false);
  }
  
  cb(null, true);
};
```

#### Storage Fallback
```typescript
// ✅ Graceful degradation
async uploadFile(file: Express.Multer.File) {
  try {
    // Try S3 first
    return await this.s3Upload(file);
  } catch (s3Error) {
    console.error('S3 upload failed, using local storage:', s3Error);
    // Fallback to local
    return await this.localUpload(file);
  }
}
```

**Prevention:**
- Validate file type and size
- Implement storage fallbacks
- Add upload progress tracking
- Clean up failed uploads

---

### 5. Payment Processing Errors

#### Stripe Integration
```typescript
// ✅ Handle payment failures
async createCheckout(trackId: string) {
  try {
    if (!this.configService.get('STRIPE_SECRET_KEY')) {
      throw new Error('Payment service not configured');
    }
    
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: {...}, quantity: 1 }],
      mode: 'payment',
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/tracks/${trackId}`,
      metadata: { trackId, userId }
    });
    
    return { url: session.url };
  } catch (error) {
    console.error('Stripe error:', error);
    throw new BadRequestException('Payment service unavailable');
  }
}
```

**Prevention:**
- Check Stripe key before operations
- Handle webhook signature verification
- Implement idempotency keys
- Log all payment events

---

### 6. API Rate Limiting Errors

#### Prevent DDoS
```typescript
// ✅ Multiple rate limit tiers
// General API
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests'
});

// AI endpoints (expensive)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'AI generation limit reached'
});

app.use(generalLimiter);
app.use('/ai/', aiLimiter);
```

**Prevention:**
- Implement tiered rate limits
- Add IP-based throttling
- Use Redis for distributed rate limiting
- Return clear error messages

---

### 7. CORS & Security Errors

#### Production CORS
```typescript
// ✅ Strict CORS in production
const allowedOrigins = [
  'http://localhost:3000',
  'https://shiroa.vercel.app',
  'https://shiroa.com'
];

app.enableCors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,OPTIONS'
});
```

#### Security Headers
```typescript
// ✅ Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  }
}));
```

**Prevention:**
- Whitelist allowed origins
- Use Helmet for security headers
- Enable HSTS in production
- Validate all inputs

---

### 8. Frontend State Management Errors

#### Safe Storage Access
```typescript
// ❌ WRONG - SSR crash
const token = localStorage.getItem('token');

// ✅ CORRECT - SSR safe
export const safeStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};
```

#### Context Provider Errors
```typescript
// ✅ Prevent context errors
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Prevention:**
- Always check `typeof window`
- Wrap storage in try-catch
- Validate context usage
- Handle SSR gracefully

---

### 9. Database Query Errors

#### Mongoose Queries
```typescript
// ❌ WRONG - No error handling
const track = await this.trackModel.findById(id);
return track.title; // Crashes if null

// ✅ CORRECT - Null checks
const track = await this.trackModel.findById(id).exec();
if (!track) {
  throw new NotFoundException('Track not found');
}
return track;
```

#### TypeORM Queries
```typescript
// ✅ Use findOneOrFail
const user = await this.userRepository.findOneOrFail({
  where: { id }
});

// Or handle null
const user = await this.userRepository.findOne({ where: { id }});
if (!user) {
  throw new NotFoundException('User not found');
}
```

**Prevention:**
- Always check for null/undefined
- Use findOneOrFail when appropriate
- Add proper error messages
- Log query errors

---

### 10. Memory Leak Prevention

#### Canvas Cleanup
```typescript
// ✅ Clean up animations
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  
  let animationId: number;
  
  const draw = () => {
    // Drawing logic
    animationId = requestAnimationFrame(draw);
  };
  
  draw();
  
  // CRITICAL: Cleanup
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}, [dependencies]);
```

#### Event Listener Cleanup
```typescript
// ✅ Remove listeners
useEffect(() => {
  const handleResize = () => { /* ... */ };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**Prevention:**
- Cancel animation frames
- Remove event listeners
- Clear intervals/timeouts
- Close database connections

---

## 🚨 Common Error Patterns & Fixes

### Error: "Cannot read property of undefined"
```typescript
// ❌ WRONG
const title = track.title;

// ✅ CORRECT
const title = track?.title ?? 'Unknown';
```

### Error: "localStorage is not defined"
```typescript
// ❌ WRONG
const token = localStorage.getItem('token');

// ✅ CORRECT
const token = typeof window !== 'undefined' 
  ? localStorage.getItem('token') 
  : null;
```

### Error: "CORS policy blocked"
```typescript
// ✅ Add origin to allowedOrigins in main.ts
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-domain.com'
];
```

### Error: "JWT malformed"
```typescript
// ✅ Validate token format
const token = authHeader?.split(' ')[1];
if (!token || token === 'null' || token === 'undefined') {
  throw new UnauthorizedException('Invalid token');
}
```

### Error: "Connection refused"
```typescript
// ✅ Check service is running
docker-compose ps
make logs backend
```

---

## 📋 Pre-Deployment Checklist

### Backend
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] JWT secret is strong (32+ chars)
- [ ] CORS origins configured
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Health check endpoint working
- [ ] Error handling in all routes
- [ ] Input validation on all DTOs

### Frontend
- [ ] API URL configured
- [ ] Error boundaries implemented
- [ ] Loading states for all async operations
- [ ] Fallback data for offline mode
- [ ] Safe storage wrapper used
- [ ] No console.errors in production
- [ ] All images optimized
- [ ] Meta tags configured

### Database
- [ ] Indexes on frequently queried fields
- [ ] Connection pooling configured
- [ ] Backup strategy in place
- [ ] Migration rollback tested

### Security
- [ ] Passwords hashed with bcrypt
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (input sanitization)
- [ ] CSRF protection enabled
- [ ] Helmet security headers
- [ ] HTTPS in production

---

## 🔧 Automated Error Detection

### Run Before Every Commit
```bash
# Validate environment
node validate-env.js

# Type check
cd frontend && npm run build
cd backend && npm run build

# Lint
cd frontend && npm run lint
cd backend && npm run lint

# Test database connections
make up
make logs
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
- name: Validate Environment
  run: node validate-env.js

- name: Build Backend
  run: cd backend && npm run build

- name: Build Frontend
  run: cd frontend && npm run build
```

---

## 📊 Monitoring & Alerts

### Health Check Endpoint
```typescript
@Get('/health')
async healthCheck() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      mongodb: await this.checkMongoDB()
    }
  };
}
```

### Error Logging
```typescript
// Log all errors
app.useGlobalFilters(new HttpExceptionFilter(logger));

// Track error rates
logger.error('Payment failed', { userId, trackId, error });
```

---

## 🎯 Quick Fix Commands

```bash
# Reset everything
make clean && make build && make up

# Check logs
make logs backend
make logs frontend

# Restart service
docker-compose restart backend

# Database reset
docker-compose down -v
docker-compose up -d postgres mongodb

# Clear cache
docker-compose restart redis
```

---

## 📞 Emergency Contacts

- **Database Issues**: Check docker-compose logs
- **Auth Issues**: Verify JWT_SECRET and token expiration
- **Payment Issues**: Check Stripe dashboard
- **File Upload Issues**: Verify AWS credentials or use local storage

---

**Last Updated**: 2025-01-21
**Version**: 1.0.0
