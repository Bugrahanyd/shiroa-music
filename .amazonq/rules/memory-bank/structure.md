# SHIROA Project Structure

## Architecture Overview
SHIROA follows a modern full-stack architecture with separate frontend and backend services, containerized deployment, and microservices-ready design.

## Directory Structure

```
SHIROA/
├── frontend/              # Next.js 15 React application
├── backend/               # NestJS API server
├── ai-services/           # AI integration services
├── docs/                  # Comprehensive documentation
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Multi-container orchestration
├── Makefile              # Development commands
└── .env.example          # Environment configuration template
```

## Frontend Structure (`/frontend`)

### Application Layer (`/src/app`)
- **Route-based pages**: Next.js 15 App Router with file-based routing
- **Key routes**:
  - `/` - Landing page
  - `/auth`, `/login`, `/register` - Authentication flows
  - `/dashboard` - User dashboard with analytics
  - `/studio` - AI music production studio
  - `/tracks` - Track browsing and details
  - `/discover`, `/search` - Content discovery
  - `/favorites`, `/playlists`, `/purchases` - User collections
  - `/admin` - Administrative interface
  - `/profile`, `/onboarding` - User management
  - `/about`, `/contact`, `/partnership`, `/community` - Informational pages

### Component Layer (`/src/components`)
- **Audio components**: AudioPlayer, MiniPlayer, WaveformVisualizer
- **Studio components**: AIGenerator, EffectsPanel, LyricsEditor, TrackList, TransportControls, WaveformEditor
- **UI components**: Navigation, Sidebar, TopNavigation, Footer
- **Feature components**: SearchBar, SearchAutocomplete, FilterPanel, TrackCard
- **User experience**: ThemeSwitcher, MouseGlow, Toast, NotificationCenter, Loading states
- **Management**: PlaylistManager, ProducerDashboard, SocialFeed

### Library Layer (`/src/lib`)
- **api.ts**: Backend API client and HTTP utilities
- **auth-context.tsx**: Authentication state management
- **theme-context.tsx**: Theme switching logic
- **language-context.tsx**: Internationalization support
- **keep-alive.ts**: Session persistence utilities

### Configuration
- **Next.js 15** with App Router and React 19
- **Tailwind CSS 4** for styling
- **TypeScript** for type safety
- **Middleware** for route protection and authentication

## Backend Structure (`/backend`)

### Core Application (`/src`)
- **main.ts**: Application bootstrap with NestJS
- **app.module.ts**: Root module with dependency injection
- **main-simple.ts**: Simplified server for testing

### Module Architecture (`/src/modules`)

#### Authentication & Authorization (`/auth`)
- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Guards: JwtAuthGuard, RolesGuard
- Strategies: JWT strategy with Passport
- DTOs: Login, Register validation
- Entities: RefreshToken persistence

#### User Management (`/users`)
- User CRUD operations
- Profile management
- Dual entity support (PostgreSQL + MongoDB)
- User roles and permissions

#### Track Management (`/tracks`)
- Track CRUD with metadata
- View and download tracking (MongoDB schemas)
- Genre, mood, BPM filtering
- Search and discovery
- DTOs: CreateTrack, UpdateTrack

#### Payment & Licensing (`/payment`)
- Stripe integration for payments
- Purchase entity for transaction records
- Checkout session creation
- Download controller for licensed content
- Transaction history

#### File Upload (`/upload`)
- Multi-storage support: AWS S3, Cloudflare R2, Local
- Multer integration for file handling
- Presigned URL generation
- Audio file validation

#### Studio & AI (`/studio`)
- AI proxy service for external AI APIs
- Music generation endpoints
- Real-time composition tools

#### Analytics (`/analytics`)
- Track performance metrics
- User engagement tracking
- Revenue analytics
- Platform statistics

#### Favorites (`/favorites`)
- User favorite tracks
- Collection management

#### Email (`/email`)
- Email service abstraction
- Resend integration
- Transactional emails

### Common Layer (`/src/common`)
- **cache/**: Redis caching module
- **decorators/**: Custom decorators (cache, roles)
- **filters/**: HTTP exception handling
- **health/**: Health check endpoints
- **interceptors/**: Cache interceptor
- **middleware/**: Validation middleware
- **schemas/**: Shared MongoDB schemas
- **logger.service.ts**: Winston-based logging

### Database & Persistence
- **migrations/**: TypeORM database migrations
- **scripts/**: Utility scripts (seed-tracks, clean-users, create-admin)

### Configuration
- **NestJS 11** framework
- **TypeORM** for PostgreSQL
- **Mongoose** for MongoDB
- **Redis** for caching
- **Passport JWT** for authentication
- **Winston** for logging
- **Helmet** for security
- **Throttler** for rate limiting

## Infrastructure

### Docker Compose Services
- **frontend**: Next.js app (port 3000)
- **backend**: NestJS API (port 4000)
- **postgres**: PostgreSQL 16 database
- **mongodb**: MongoDB 7 for analytics
- **redis**: Redis 7 for caching

### CI/CD (`/.github/workflows`)
- **ci.yml**: Continuous integration pipeline
- **deploy.yml**: Automated deployment

### Development Tools
- **Makefile**: Simplified commands (dev, build, up, down, logs, clean)
- **validate-env.js**: Environment validation
- **Docker**: Containerized development and production

## Architectural Patterns

### Frontend Patterns
- **Server Components**: Default rendering strategy
- **Client Components**: Interactive UI with 'use client'
- **Context Providers**: Global state (auth, theme, language)
- **Custom Hooks**: Reusable logic
- **API Routes**: Backend proxy endpoints

### Backend Patterns
- **Module-based Architecture**: Feature modules with clear boundaries
- **Dependency Injection**: NestJS IoC container
- **Repository Pattern**: Data access abstraction
- **DTO Pattern**: Request/response validation
- **Guard Pattern**: Route protection
- **Interceptor Pattern**: Cross-cutting concerns
- **Service Layer**: Business logic separation
- **Entity Pattern**: Database models

### Data Flow
1. Frontend → API Client (lib/api.ts)
2. Backend Controller → Service Layer
3. Service → Repository/Database
4. Response → DTO Transformation
5. Frontend State Update

### Security Layers
- JWT authentication with refresh tokens
- Role-based authorization guards
- Helmet security headers
- Rate limiting with throttler
- Input validation with class-validator
- CORS configuration
- Environment variable validation

## Key Relationships

### User → Track
- Users create tracks (producers)
- Users purchase tracks (buyers)
- Users favorite tracks
- Users view/download tracks

### Track → Payment
- Tracks have pricing
- Purchases link users to tracks
- Transactions record payment details

### Track → Analytics
- Views tracked in MongoDB
- Downloads tracked in MongoDB
- Performance metrics aggregated

### User → Authentication
- JWT tokens for sessions
- Refresh tokens for persistence
- Role-based permissions
