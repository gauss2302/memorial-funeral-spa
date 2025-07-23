FROM node:20 AS build-stage

# Update package sources to use faster mirrors
RUN sed -i 's|http://archive.ubuntu.com|http://mirror.yandex.ru|g' /etc/apt/sources.list || true && \
    sed -i 's|http://security.ubuntu.com|http://mirror.yandex.ru|g' /etc/apt/sources.list || true

# Install build dependencies (much faster than Alpine)
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies with faster registry
RUN npm config set registry https://registry.npmjs.org/ && \
    npm ci --prefer-offline --no-audit --production=false

# Copy source code and public assets
COPY . .

# Build the application
RUN npm run build

# Verify build output
RUN echo "=== BUILD VERIFICATION ===" && \
    find dist/ -name "*.svg" && \
    find dist/ -name "*.png" && \
    echo "Total files in dist:" && \
    find dist/ -type f | wc -l

# Production stage - Keep Alpine for smaller final image
FROM alpine:latest AS production-stage

# Use faster mirrors
RUN echo "http://mirror.yandex.ru/mirrors/alpine/latest-stable/main" > /etc/apk/repositories && \
    echo "http://mirror.yandex.ru/mirrors/alpine/latest-stable/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache curl && \
    apk cache clean

WORKDIR /app

# Copy the entire dist directory
COPY --from=build-stage --chown=101:101 /app/dist ./dist

# Keep container running
CMD ["sh", "-c", "echo 'Build complete' && tail -f /dev/null"]