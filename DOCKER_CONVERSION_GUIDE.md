# Docker Conversion Guide for React/Node Apps

This guide provides step-by-step instructions for converting similar apps to run in Docker with nginx reverse proxy, following the pattern established in carbi-react.

## Prerequisites Check

1. **Identify the app type:**
   - React app (Create React App or similar)
   - Node.js version (check `.nvmrc` or `package.json`)
   - Package manager: `npm` or `yarn` (check `package.json` and `package-lock.json`/`yarn.lock`)

2. **Check current deployment:**
   - Review existing `deploy.sh` to understand current deployment method
   - Check if there's an existing nginx config
   - Note the domain/server details

## Step 1: Create Dockerfile (Production)

Create `Dockerfile` with multi-stage build:

```dockerfile
# Use Node.js version from .nvmrc or package.json
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
# OR for yarn: COPY package.json yarn.lock ./

# Install dependencies
RUN npm ci --only=production=false
# OR for yarn: RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npm run build
# OR for yarn: RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Adjustments:**
- Change Node.js version if needed (check `.nvmrc` or `package.json` engines)
- Use `yarn` commands if app uses yarn
- Adjust build output directory if not `build/` (check `package.json` build script)

## Step 2: Create Dockerfile.dev (Development)

Create `Dockerfile.dev`:

```dockerfile
# Development Dockerfile
FROM node:24-alpine
# OR: FROM node:XX-alpine (match production version)

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
# OR for yarn: COPY package.json yarn.lock ./

# Install dependencies
RUN npm install
# OR for yarn: RUN yarn install

# Copy source code
COPY . .

# Expose development server port (usually 3000 for React)
EXPOSE 3000

# Start development server
CMD ["npm", "start"]
# OR for yarn: CMD ["yarn", "start"]
```

**Adjustments:**
- Match Node.js version with production
- Adjust port if different (check `package.json` start script)
- Use yarn commands if app uses yarn

## Step 3: Create docker-compose.yml

Create `docker-compose.yml`:

```yaml
services:
  # Production build served with nginx
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    container_name: <app-name>
    restart: unless-stopped

  # Development server with hot reload
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    container_name: <app-name>-dev
    environment:
      - CHOKIDAR_USEPOLLING=true
    stdin_open: true
    tty: true
```

**Adjustments:**
- Replace `<app-name>` with actual app name
- Adjust ports if they conflict with other services
- Remove `version: '3.8'` (obsolete in newer docker-compose)

## Step 4: Create .dockerignore

Create `.dockerignore`:

```
# Dependencies
node_modules
npm-debug.log*
yarn-error.log*

# Build output
build
dist

# Testing
coverage
.nyc_output

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Git
.git
.gitignore

# Docker
Dockerfile
.dockerignore
docker-compose.yml

# Misc
README.md
.nvmrc
deploy.sh
buildspec.yml
```

## Step 5: Update deploy.sh

Replace existing `deploy.sh` with Docker-based deployment:

```bash
#!/bin/bash

set -e  # Exit on error

IMAGE_NAME="<app-name>"
# Use git commit hash or timestamp for versioning
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%Y%m%d-%H%M%S)}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"
SERVER_USER="<server-user>"
SERVER_HOST="<server-ip>"
CONTAINER_NAME="<app-name>"
NETWORK_NAME="web"  # Common network name for reverse proxy setup
# Map container port 80 to localhost:8080 for host nginx to connect
LOCAL_PORT="8080"

echo "Building production Docker image..."
docker build -t $FULL_IMAGE_NAME .
# Also tag as latest for convenience
docker tag $FULL_IMAGE_NAME ${IMAGE_NAME}:latest

echo "Saving Docker image to tar file..."
IMAGE_TAR="/tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar"
docker save $FULL_IMAGE_NAME -o $IMAGE_TAR
trap "rm -f $IMAGE_TAR" EXIT

echo "Transferring image to production server..."
scp $IMAGE_TAR ${SERVER_USER}@${SERVER_HOST}:/tmp/

echo "Deploying container on production server..."
ssh ${SERVER_USER}@${SERVER_HOST} << EOF
  set -e
  
  echo "Loading Docker image..."
  docker load -i /tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar
  rm -f /tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar
  
  # Ensure network exists (create if it doesn't)
  docker network inspect $NETWORK_NAME >/dev/null 2>&1 || docker network create $NETWORK_NAME
  
  echo "Stopping and removing old container (if exists)..."
  docker stop $CONTAINER_NAME 2>/dev/null || true
  docker rm $CONTAINER_NAME 2>/dev/null || true
  
  echo "Starting new container with production best practices..."
  docker run -d \
    --name $CONTAINER_NAME \
    --network $NETWORK_NAME \
    -p 127.0.0.1:${LOCAL_PORT}:80 \
    --restart unless-stopped \
    --memory="256m" \
    --memory-swap="512m" \
    --cpus="1.0" \
    --health-cmd="wget --quiet --tries=1 --spider http://localhost:80 || exit 1" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    --health-start-period=10s \
    --label "app=${IMAGE_NAME}" \
    --label "version=${IMAGE_TAG}" \
    --label "managed-by=deploy-script" \
    --log-driver json-file \
    --log-opt max-size=10m \
    --log-opt max-file=3 \
    $FULL_IMAGE_NAME
  
  echo ""
  echo "Container information:"
  echo "  Name: $CONTAINER_NAME"
  echo "  Image: $FULL_IMAGE_NAME"
  echo "  Network: $NETWORK_NAME"
  echo "  IP Address: \$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME)"
  echo "  Local access: http://127.0.0.1:${LOCAL_PORT} (for host nginx)"
  echo "  Container accessible at: http://$CONTAINER_NAME:80 (from other containers on $NETWORK_NAME network)"
  echo ""
  echo "Container deployed successfully!"
  docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
EOF

echo ""
echo "Finished deploying to production!"
echo "Note: Configure your nginx reverse proxy to proxy_pass to: http://127.0.0.1:${LOCAL_PORT}"
```

**Adjustments:**
- Replace `<app-name>` with actual app name
- Replace `<server-user>` and `<server-ip>` with actual server details
- Adjust `LOCAL_PORT` if 8080 is already in use (use 8081, 8082, etc.)
- Adjust memory/CPU limits if needed

## Step 6: Create/Update Nginx Configuration

Create `nginx-<app-name>.conf`:

```nginx
# <domain>.conf
# Updated for Docker container deployment

server {
    server_name <domain>;

    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json image/*;

    location / {
        # Proxy to Docker container via localhost port mapping
        # Container exposes port 80 internally, mapped to 127.0.0.1:8080 on host
        proxy_pass http://127.0.0.1:8080;

        # Proxy headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # WebSocket support (if needed in future)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<cert-domain>/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/<cert-domain>/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = <domain>) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name <domain>;
    listen 80;
    return 404; # managed by Certbot
}
```

**Adjustments:**
- Replace `<domain>` with actual domain name
- Replace `<cert-domain>` with Certbot certificate domain
- Adjust port in `proxy_pass` to match `LOCAL_PORT` from deploy.sh

## Step 7: Update README.md

Add/update the "Running the Application" section in README.md:

```markdown
## Running the Application

### Local Development

#### Option 1: Using Docker (Recommended)

```bash
docker compose up dev
```

This will:
- Build the development Docker image
- Start the development server with hot reload
- Mount your local code for live updates
- Expose the app on `http://localhost:3000`

To run in detached mode:
```bash
docker compose up -d dev
```

To stop the development server:
```bash
docker compose down
```

#### Option 2: Without Docker

1. **Install Node.js** (check `.nvmrc` if available)

2. **Install dependencies:**
   ```bash
   npm install
   # OR: yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # OR: yarn start
   ```

   The app will be available at `http://localhost:3000` with hot reload enabled.

### Production

#### Using Docker

To run the production build:

```bash
docker compose up app
```

This will:
- Build the React app for production
- Serve it using nginx
- Expose the app on `http://localhost:3000`

To run in detached mode:
```bash
docker compose up -d app
```

To rebuild after code changes:
```bash
docker compose up --build app
```

#### Building and Running Manually

1. **Build the production bundle:**
   ```bash
   npm run build
   # OR: yarn build
   ```

2. **Serve the build directory** using any static file server:
   - Using `serve` (install with `npm install -g serve`):
     ```bash
     serve -s build
     ```
   - Using Python:
     ```bash
     cd build && python -m http.server 8000
     ```
   - Using Node.js `http-server`:
     ```bash
     npx http-server build -p 8000
     ```

### Docker Commands Reference

- **View running containers:**
  ```bash
  docker compose ps
  ```

- **View logs:**
  ```bash
  docker compose logs -f [service-name]
  ```

- **Stop all services:**
  ```bash
  docker compose down
  ```

- **Rebuild images:**
  ```bash
  docker compose build
  ```
```

## Step 8: Fix Package Lock File Issues

If `npm ci` fails due to lock file mismatch:

1. **For development:** Use `npm install` in `Dockerfile.dev` (more forgiving)
2. **For production:** Regenerate lock file:
   ```bash
   npm install
   # OR: yarn install
   ```
   This will sync `package-lock.json` or `yarn.lock` with `package.json`

## Step 9: Testing Checklist

1. **Test local development:**
   ```bash
   docker compose up dev
   ```
   - Verify app loads at `http://localhost:3000`
   - Verify hot reload works

2. **Test production build locally:**
   ```bash
   docker compose up app
   ```
   - Verify app loads at `http://localhost:3000`
   - Verify routing works (SPA)

3. **Test deployment:**
   ```bash
   npm run deploy
   # OR: yarn deploy
   ```
   - Verify container starts
   - Verify port mapping is correct
   - Test from server: `curl http://127.0.0.1:8080`

4. **Test nginx configuration:**
   - Copy nginx config to server
   - Test: `sudo nginx -t`
   - Reload: `sudo systemctl reload nginx`
   - Verify domain works

## Step 10: Common Issues and Solutions

### Port Already in Use
- **Issue:** Container can't bind to port
- **Solution:** Check if old container is running: `docker ps -a`, then `docker rm <container-id>`

### Bad Gateway Error
- **Issue:** Nginx can't reach container
- **Solution:** 
  1. Verify container is running: `docker ps | grep <app-name>`
  2. Verify port mapping: `docker port <app-name>` should show `127.0.0.1:8080->80/tcp`
  3. Test directly: `curl http://127.0.0.1:8080` on server
  4. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### Lock File Mismatch
- **Issue:** `npm ci` fails with lock file errors
- **Solution:** Run `npm install` locally to regenerate lock file, then commit

### Container Health Check Failing
- **Issue:** Health check shows as unhealthy
- **Solution:** Check container logs: `docker logs <app-name>`, verify nginx is running inside container

## Notes

- Always use `docker compose` (space) not `docker-compose` (hyphen)
- Use git commit hash for image tags when possible for better traceability
- Keep `LOCAL_PORT` unique per app if multiple apps on same server
- Use the `web` network for all apps so they can communicate if needed
- Update `.dockerignore` to exclude app-specific files if needed

