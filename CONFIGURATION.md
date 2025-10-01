# Multi-Environment Configuration Guide

This project now supports multiple Vite configurations for different environments, providing optimized settings for development, local testing, and production deployment.

## Configuration Files

### 1. `vite.config.ts` (Main Configuration)
The main configuration file that dynamically selects the appropriate configuration based on the mode and environment variables.

### 2. `vite.config.base.ts` (Base Configuration)
Contains shared configuration settings used across all environments:
- React plugin with SWC
- Path aliases (`@` → `./src`)
- Build optimizations with code splitting
- Component tagger for development
- Version information

### 3. `vite.config.local.ts` (Local Development)
Optimized for local development with:
- Port 8080
- CORS enabled
- API proxy to Vendure backend
- Source maps enabled
- No minification
- HMR on port 8081

### 4. `vite.config.prod.ts` (Production)
Production-ready configuration with:
- HTTPS with Let's Encrypt certificates
- Port 443
- Terser minification
- Console removal
- Optimized chunk splitting
- No source maps

## Available Scripts

### Development
```bash
# Standard development (port 8081)
npm run dev

# Local development (port 8080, with proxy)
npm run dev:local

# Production mode (HTTPS, port 443)
npm run dev:prod
```

### Building
```bash
# Standard build
npm run build

# Local build (with source maps)
npm run build:local

# Production build (optimized)
npm run build:prod

# Development build
npm run build:dev
```

### Preview
```bash
# Standard preview
npm run preview

# Local preview
npm run preview:local

# Production preview
npm run preview:prod
```

## Environment Variables

The configuration system supports environment-specific variables:

- `VITE_ENV`: Environment identifier (`local`, `production`, `development`)
- `VITE_VENDURE_API_URL`: Vendure Shop API endpoint
- `VITE_VENDURE_ADMIN_URL`: Vendure Admin API endpoint
- `VITE_VENDURE_ASSETS_URL`: Vendure Assets endpoint
- `VITE_APP_TITLE`: Application title
- `VITE_DEBUG`: Debug mode flag

## Code Splitting

The build configuration includes intelligent code splitting:

- **vendor**: React and React DOM
- **router**: React Router DOM
- **query**: TanStack Query
- **ui**: Radix UI components
- **graphql**: GraphQL client libraries

## Proxy Configuration

Local development includes a proxy to the Vendure backend:
- `/api/*` → `https://stablecommerce.ai/mgmt/*`
- Enables CORS for development
- Automatic path rewriting

## HTTPS Configuration

Production configuration includes:
- Let's Encrypt SSL certificates
- HTTPS server on port 443
- Secure headers and CORS
- Domain validation for `stablecommerce.ai`

## Usage Examples

### Local Development
```bash
# Start local development server
npm run dev:local

# Build for local testing
npm run build:local
```

### Production Deployment
```bash
# Build production assets
npm run build:prod

# Preview production build
npm run preview:prod
```

### Environment-Specific Development
```bash
# Set environment variable
export VITE_ENV=local
npm run dev

# Or use mode flag
npm run dev -- --mode local
```

## Troubleshooting

### Port Conflicts
- Development: 8081
- Local: 8080
- Production: 443

### SSL Certificate Issues
Ensure Let's Encrypt certificates are available at:
- `/etc/letsencrypt/live/stablecommerce.ai/privkey.pem`
- `/etc/letsencrypt/live/stablecommerce.ai/fullchain.pem`

### Proxy Issues
Check that the Vendure backend is accessible at `https://stablecommerce.ai/mgmt`

## Best Practices

1. Use `npm run dev:local` for local development with API proxy
2. Use `npm run build:prod` for production deployments
3. Test builds with `npm run preview:prod` before deployment
4. Set appropriate environment variables for each deployment
5. Monitor build output for chunk sizes and optimization
