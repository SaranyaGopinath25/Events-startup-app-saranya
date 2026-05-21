ARG NODE_VERSION=20
ARG VITE_API_URL=/api

FROM node:${NODE_VERSION} AS builder
WORKDIR /workspace

# Copy app sources
COPY app/package*.json app/
COPY app/ app/

WORKDIR /workspace/app

# Build the frontend with the API mounted at /api
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm install --silent
RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

# Copy runtime package metadata first for caching
COPY app/package*.json ./
RUN npm install --silent

# Copy API server and built frontend
COPY app/api ./api
COPY --from=builder /workspace/app/dist ./api/dist

# Expose a single port for app + API
ENV PORT=3001
EXPOSE 3001

CMD ["node", "api/server.cjs"]