# Makefile for Kivabi Application Docker Management

.PHONY: help start stop restart logs backend frontend build clean

# Default target
help:
	@echo "Kivabi Application Docker Management"
	@echo ""
	@echo "Usage:"
	@echo "  make start        Start all services (backend + frontend)"
	@echo "  make stop         Stop all services"
	@echo "  make restart      Restart all services"
	@echo "  make logs         Show logs for all services"
	@echo "  make backend      Start only backend service"
	@echo "  make frontend     Start only frontend service"
	@echo "  make build        Build all services without cache"
	@echo "  make clean        Stop services and remove containers, networks"
	@echo ""

# Start all services
start:
	docker-compose up -d
	@echo "Services started. Backend: http://localhost:8081, Frontend: http://localhost:5174"

# Stop all services
stop:
	docker-compose down

# Restart all services
restart: stop start

# Show logs for all services
logs:
	docker-compose logs -f

# Start only backend service
backend:
	docker-compose up -d backend
	@echo "Backend service started: http://localhost:8080"

# Start only frontend service
frontend:
	docker-compose up -d frontend
	@echo "Frontend service started: http://localhost:5173"

# Build all services without cache
build:
	docker-compose build --no-cache

# Clean: stop services and remove containers, networks
clean:
	docker-compose down --rmi all --volumes --remove-orphans

# Quick development commands
dev-backend:
	cd kivabi-service && mvn spring-boot:run

dev-frontend:
	cd kivabi-frontend && yarn dev