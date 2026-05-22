# Multi-stage Docker build for Node.js Express backend
# Stage 1: Builder (builds dependencies)
# Stage 2: Production (minimal runtime image)
# Stage 3: Development (hot-reload with nodemon)


# ===== STAGE 1: Builder =====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy entire application
COPY . .

# ===== STAGE 2: Production =====
FROM node:20-alpine AS production

LABEL maintainer="Jhadevloper4035"
LABEL description="SkyDecor Dubai REST API Backend"

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy node_modules from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application files from builder
COPY --from=builder --chown=nodejs:nodejs /app/src ./src
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8080

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 8080) + '/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 8080

# Start application
CMD ["node", "src/server.js"]






# ===== STAGE 3: Development =====
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy entire application
COPY . .

# Install git and curl for health checks
RUN apk add --no-cache git curl

# Set environment to development
ENV NODE_ENV=development

# Expose port
EXPOSE 3000

CMD ["npm", "run", "dev"]

