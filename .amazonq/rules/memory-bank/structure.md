# Project Structure

## Directory Organization

```
SHIROA/
├── .amazonq/
│   └── rules/
│       └── memory-bank/          # AI assistant memory and project context
├── docs/                          # Comprehensive project documentation
│   ├── README.md                  # Project overview and getting started
│   ├── TECHMAP.md                 # Technical architecture and service boundaries
│   ├── ROADMAP.md                 # Development phases and milestones
│   ├── FRONTEND.md                # Frontend architecture and patterns
│   ├── BACKEND.md                 # Backend services and API design
│   ├── AI_INTEGRATION.md          # AI microservices integration
│   ├── DEPLOYMENT.md              # Deployment strategies and infrastructure
│   ├── SECURITY.md                # Security policies and best practices
│   ├── DOMAIN_SETUP.md            # Environment setup and configuration
│   ├── DATA_BLUEPRINT.md          # Database schemas and data models
│   ├── UPLOAD_WORKFLOW.md         # Media upload and processing pipeline
│   ├── STUDIO_SPEC.md             # Studio feature specifications
│   ├── BRAND.md                   # Brand guidelines and assets
│   ├── CONTRIBUTING.md            # Contribution guidelines
│   ├── GIT_CHEATSHEET.md          # Git workflow reference
│   └── HANDOFF.md                 # Project handoff documentation
├── frontend/                      # Next.js frontend application
│   ├── .next/                     # Next.js build output
│   ├── public/                    # Static assets (SVG icons, images)
│   ├── src/
│   │   └── app/                   # Next.js App Router pages and layouts
│   │       ├── layout.tsx         # Root layout component
│   │       ├── page.tsx           # Home page component
│   │       ├── globals.css        # Global styles with Tailwind
│   │       └── favicon.ico        # Site favicon
│   ├── package.json               # Frontend dependencies and scripts
│   ├── tsconfig.json              # TypeScript configuration
│   ├── next.config.ts             # Next.js configuration
│   ├── eslint.config.mjs          # ESLint configuration
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── README.md                  # Frontend-specific documentation
├── backend/                       # Nest.js backend (planned)
├── ai_service/                    # AI microservices (planned)
├── infra/                         # Terraform IaC (planned)
└── .gitignore                     # Git ignore rules
```

## Core Components

### Frontend (Next.js)
- **App Router**: Modern Next.js routing with app directory structure
- **Server Components**: Default server-side rendering for optimal performance
- **Styling**: Tailwind CSS v4 with PostCSS pipeline
- **Type Safety**: Full TypeScript integration with strict mode
- **Font Optimization**: Geist font family with next/font optimization

### Backend (Planned - Nest.js)
- **Auth Service**: User authentication and authorization
- **Tracks Service**: Music catalog management and metadata
- **Studio Proxy**: Gateway to AI microservices
- **Analytics Collector**: Usage tracking and metrics
- **API Gateway**: Unified entry point for all services

### AI Services (Planned - FastAPI)
- **Composer**: AI music composition engine
- **Vocalizer**: Vocal synthesis and processing
- **Mixer**: Intelligent audio mixing
- **GPU Nodes**: Containerized PyTorch models

### Data Layer
- **MongoDB**: Flexible metadata storage (tracks, analytics, AI profiles)
- **PostgreSQL**: Transactional data (users, payments, ledger)
- **Redis**: Caching layer for performance optimization

### Storage & CDN
- **S3**: Master audio file storage and transcoded versions
- **CloudFront**: Global CDN with signed URLs for secure streaming

## Architectural Patterns

### Microservices Architecture
- Service isolation with clear boundaries
- Independent deployment and scaling
- Inter-service communication via REST/gRPC
- API Gateway pattern for unified client interface

### Frontend Architecture
- Server-Side Rendering (SSR) for SEO optimization
- Static Site Generation (SSG) for performance
- Client-side hydration for interactivity
- Component-based architecture with React 19

### Data Architecture
- Polyglot persistence (MongoDB + PostgreSQL + Redis)
- Event-driven analytics collection
- Caching strategy for frequently accessed data
- Separation of transactional and analytical workloads

### Security Architecture
- Signed URLs for content protection
- JWT-based authentication
- Role-based access control (RBAC)
- Stripe webhook verification for payment security

## Component Relationships

### User Flow
```
Browser → CloudFront CDN → Next.js Frontend → API Gateway
                                                    ↓
                                    ┌───────────────┴───────────────┐
                                    ↓               ↓               ↓
                              Auth Service   Tracks Service   Studio Proxy
                                    ↓               ↓               ↓
                              PostgreSQL       MongoDB         AI Services
```

### Data Flow
```
Admin Upload → Tracks Service → S3 Master → Transcode Pipeline → S3 Variants
                                                                        ↓
User Request → CloudFront → Signed URL → Streaming Delivery
```

### AI Integration Flow
```
Studio UI → Studio Proxy → AI Service (FastAPI) → PyTorch Model → Result
                                ↓
                          Credit Deduction (PostgreSQL)
```

## Development Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Individual feature branches
- Pull requests required for merging

### CI/CD Pipeline
- GitHub Actions for automated testing
- Terraform for infrastructure provisioning
- Vercel for frontend deployment
- Prometheus/Grafana for monitoring

## Module Dependencies

### Frontend Dependencies
- **Core**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, PostCSS, Autoprefixer
- **Optimization**: React Compiler, next/font
- **Quality**: ESLint with Next.js config

### Planned Backend Dependencies
- Nest.js framework
- TypeORM or Prisma for database access
- Passport.js for authentication
- Stripe SDK for payments
- AWS SDK for S3 operations

### Planned AI Dependencies
- FastAPI framework
- PyTorch for model inference
- NumPy/SciPy for audio processing
- Librosa for audio analysis
