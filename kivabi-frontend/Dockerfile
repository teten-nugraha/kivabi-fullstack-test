# Build stage for React + Vite
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile  # Install all dependencies so vite is available

COPY --from=builder /app/dist ./dist

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4173 || exit 1

CMD ["yarn", "preview", "--host", "0.0.0.0"]