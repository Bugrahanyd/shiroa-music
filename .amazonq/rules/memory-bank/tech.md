# SHIROA Technology Stack

## Programming Languages
- **TypeScript 5.x**: Primary language for both frontend and backend
- **JavaScript**: Node.js runtime environment

## Frontend Technologies

### Core Framework
- **Next.js 15.1.0**: React framework with App Router
- **React 19.2.0**: UI library with latest features
- **React DOM 19.2.0**: React rendering

### State Management
- **Zustand 5.0.2**: Lightweight state management
- **React Context**: Built-in context for auth, theme, language

### Styling
- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.21**: CSS vendor prefixing

### Audio & Visualization
- **Tone.js 15.1.3**: Web Audio framework for music production
- **WaveSurfer.js 7.8.10**: Audio waveform visualization

### UI Components
- **Lucide React 0.554.0**: Icon library

### Development Tools
- **ESLint 9**: Code linting
- **Babel React Compiler 1.0.0**: React optimization
- **TypeScript 5**: Type checking

## Backend Technologies

### Core Framework
- **NestJS 11.1.8**: Progressive Node.js framework
- **Express**: Underlying HTTP server (via @nestjs/platform-express)

### Database & ORM
- **TypeORM 0.3.27**: PostgreSQL ORM
- **Mongoose 8.19.3**: MongoDB ODM
- **PostgreSQL** (via pg 8.16.3): Relational database driver

### Authentication & Security
- **Passport 0.7.0**: Authentication middleware
- **Passport JWT 4.0.1**: JWT strategy
- **@nestjs/jwt 11.0.1**: JWT utilities
- **bcrypt 6.0.0**: Password hashing
- **Helmet 8.1.0**: Security headers
- **@nestjs/throttler 6.4.0**: Rate limiting
- **express-rate-limit 7.5.1**: Additional rate limiting

### Caching & Performance
- **Redis 5.9.0**: In-memory data store
- **cache-manager-redis-store 3.0.1**: Redis cache adapter
- **@nestjs/cache-manager 3.0.1**: Caching module

### File Storage
- **@aws-sdk/client-s3 3.927.0**: AWS S3 client
- **@aws-sdk/s3-request-presigner 3.927.0**: S3 presigned URLs
- **Multer 2.0.2**: File upload handling

### Payment Processing
- **Stripe 19.3.0**: Payment gateway integration

### Logging & Monitoring
- **Winston 3.18.3**: Logging library
- **winston-daily-rotate-file 5.0.0**: Log rotation
- **@nestjs/terminus 11.0.0**: Health checks

### Validation & Configuration
- **class-validator 0.14.2**: DTO validation
- **class-transformer 0.5.1**: Object transformation
- **Joi 18.0.1**: Schema validation
- **@nestjs/config 4.0.2**: Configuration management

### HTTP & Communication
- **@nestjs/axios 4.0.1**: HTTP client
- **RxJS 7.8.2**: Reactive programming

### Development Tools
- **@nestjs/cli 11.0.10**: NestJS CLI
- **ts-node 10.9.2**: TypeScript execution
- **TypeScript 5.9.3**: Type checking

## Infrastructure & DevOps

### Containerization
- **Docker**: Container runtime
- **Docker Compose 3.8**: Multi-container orchestration

### Databases
- **PostgreSQL 16 Alpine**: Primary relational database
- **MongoDB 7**: Analytics and tracking data
- **Redis 7 Alpine**: Caching and session storage

### Cloud Services
- **AWS S3**: Audio file storage
- **Cloudflare R2**: Alternative storage option
- **Stripe**: Payment processing

### CI/CD
- **GitHub Actions**: Automated workflows
- **Render**: Deployment platform (render.yaml)

## Build Systems & Package Managers

### Frontend Build
- **Next.js Build System**: Production optimization
- **npm**: Package manager
- **Babel**: JavaScript compilation

### Backend Build
- **NestJS CLI**: Build and development
- **TypeScript Compiler**: Code compilation
- **npm**: Package manager

## Development Commands

### Frontend
```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
```

### Backend
```bash
npm run start:dev    # Development with watch mode
npm run start:prod   # Production server
npm run build        # Compile TypeScript
npm run create-admin # Create admin user
```

### Docker (via Makefile)
```bash
make dev            # Start databases + local dev servers
make build          # Build Docker images
make up             # Start all containers
make down           # Stop all containers
make logs           # View container logs
make clean          # Remove volumes and build artifacts
make validate       # Validate environment variables
```

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API endpoint
- `NODE_ENV`: Environment mode

### Backend (.env)
- `PORT`: Server port (default 4000)
- `NODE_ENV`: Environment mode
- `DATABASE_URL`: PostgreSQL connection string
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRES_IN`: Token expiration
- `STRIPE_SECRET_KEY`: Stripe API key
- `AWS_ACCESS_KEY_ID`: AWS credentials
- `AWS_SECRET_ACCESS_KEY`: AWS credentials
- `AWS_REGION`: AWS region
- `S3_BUCKET`: S3 bucket name

## API Documentation
- REST API endpoints documented in `/backend/API_DOCUMENTATION.md`
- Health check endpoint: `/health`
- API base URL: `http://localhost:4000` (development)

## Version Requirements
- **Node.js**: 20.x or higher
- **npm**: 9.x or higher
- **Docker**: 20.x or higher
- **Docker Compose**: 2.x or higher

## Browser Support
- Modern browsers with ES6+ support
- Web Audio API support required for studio features
- WebGL support recommended for visualizations

## Performance Optimizations
- Redis caching for frequently accessed data
- Next.js automatic code splitting
- Image optimization with Next.js Image component
- Server-side rendering for SEO
- Static generation where applicable
- React 19 compiler optimizations
- Database query optimization with indexes
- CDN for static assets
