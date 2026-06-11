# Pilateq — Single-service Dockerfile for Coolify
# Builds the Vite frontend and serves it together with the Resend API backend.

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build the frontend
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------

FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend and backend files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/resend-backend.js ./resend-backend.js

EXPOSE 3001

CMD ["node", "resend-backend.js"]
