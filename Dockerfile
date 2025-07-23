# Build stage
FROM node:20-alpine as build-stage

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code and public assets
COPY . .

# Debug: Check what's in public directory before build
RUN echo "=== PUBLIC DIRECTORY BEFORE BUILD ===" && \
    find public/ -type f | sort

# Build the application
RUN npm run build

# Debug: Check what's in dist directory after build
RUN echo "=== DIST DIRECTORY AFTER BUILD ===" && \
    find dist/ -type f | sort && \
    echo "=== CHECKING FOR SVG FILES ===" && \
    find dist/ -name "*.svg" | sort

# Fix permissions for all files
RUN chmod -R 755 dist/ && \
    find dist/ -type f -exec chmod 644 {} \;

# Production stage
FROM alpine:latest as production-stage

WORKDIR /app

# Copy the entire dist directory with nginx user ownership
COPY --from=build-stage --chown=101:101 /app/dist ./dist

# Install basic tools for debugging
RUN apk add --no-cache tree curl

# Fix permissions explicitly for nginx user (uid 101 in nginx:alpine)
RUN chmod -R 755 dist/ && \
    find dist/ -type f -exec chmod 644 {} \; && \
    chown -R 101:101 dist/

# Debug: Verify permissions and contents
RUN echo "=== FINAL DIST CONTENTS WITH PERMISSIONS ===" && \
    ls -la dist/ && \
    echo "=== ALL FILES WITH PERMISSIONS ===" && \
    find dist/ -ls | head -20

# Keep container running to maintain volume
CMD ["sh", "-c", "echo 'Container ready, volume populated with proper permissions' && tail -f /dev/null"]