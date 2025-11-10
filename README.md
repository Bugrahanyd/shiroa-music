# SHIROA

AI-driven music production and exclusive-licensing platform.

## Quick Start

### Development
```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Start services
make dev
```

### Production (Docker)
```bash
# Build and start all services
make build
make up

# View logs
make logs

# Stop services
make down
```

## Environment Setup

Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

## Documentation

See `/docs` folder for detailed documentation.
