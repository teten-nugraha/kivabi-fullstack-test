# Kivabi Application - Installation Guide

This guide will help you set up and run the Kivabi fullstack application using Docker Compose.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker** (version 20.10.0 or higher)
- **Docker Compose** (version 2.0.0 or higher)
- **Git** (for cloning the repository)
- At least **4GB RAM** available for Docker
- At least **2GB** free disk space

### Verify Installation
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Check available resources
docker info
```

## 🚀 Quick Start

### 1. Clone the Repository (if not already done)
```bash
git clone <your-repository-url>
cd Kivabi-MPV
```

### 2. Start the Application
```bash
# Using Makefile (recommended)
make start

# OR using Docker Compose directly
docker-compose up -d
```

### 3. Verify Services are Running
```bash
# Check running containers
docker ps

# Check service status
docker-compose ps

# View logs
docker-compose logs
```

### 4. Access the Application

Once all services are running, you can access:

- **Frontend Application**: http://localhost:5174
- **Backend API**: http://localhost:8081
- **API Documentation**: http://localhost:8081/swagger-ui.html
- **H2 Database Console**: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:mem:kivabidb`
  - Username: `sa`
  - Password: (leave empty)

## 📖 Detailed Setup Instructions

### Option 1: Using Makefile (Simplest)

The Makefile provides convenient commands for managing the application:

```bash
# Start all services in background
make start

# Start only backend service
make backend

# Start only frontend service  
make frontend

# View real-time logs
make logs

# Stop all services
make stop

# Restart all services
make restart

# Build services without cache
make build

# Clean up everything (containers, networks, volumes)
make clean
```

### Option 2: Manual Docker Commands

```bash
# Build and start all services
docker-compose up -d

# Build and start with force rebuild
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

## 🏗️ Project Structure

```
Kivabi-MPV/
├── kivabi-service/          # Spring Boot Backend
│   ├── src/                # Source code
│   ├── Dockerfile          # Backend container configuration
│   ├── pom.xml            # Maven dependencies
│   └── application.yml    # Application configuration
├── kivabi-frontend/        # React Frontend
│   ├── src/               # Source code  
│   ├── Dockerfile         # Frontend container configuration
│   ├── package.json       # Node.js dependencies
│   └── vite.config.js    # Vite configuration
├── docker-compose.yml     # Multi-container setup
├── Makefile               # Management commands
└── installation.md        # This file
```

## ⚙️ Configuration

### Environment Variables

Backend service uses these environment variables:

```env
SPRING_DATASOURCE_URL=jdbc:h2:mem:kivabidb
SPRING_DATASOURCE_USERNAME=sa
SPRING_DATASOURCE_PASSWORD=
SPRING_DATASOURCE_DRIVER-CLASS-NAME=org.h2.Driver
SPRING_JPA_DATABASE-PLATFORM=org.hibernate.dialect.H2Dialect
SPRING_H2_CONSOLE_ENABLED=true
SPRING_H2_CONSOLE_PATH=/h2-console
```

### Port Configuration

- **Backend**: 8081 (API and H2 Console)
- **Frontend**: 5174 (React Development Server)

To change ports, modify the `docker-compose.yml` file:

```yaml
services:
  backend:
    ports:
      - "9090:8080"  # Change 9090 to your desired port
  
  frontend:
    ports:
      - "3000:5173"  # Change 3000 to your desired port
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port 8081
lsof -i :8081

# Find process using port 5174  
lsof -i :5174

# Kill the process (replace PID)
kill -9 <PID>
```

#### 2. Docker Permission Issues
```bash
# Add your user to docker group
sudo usermod -aG docker $USER

# Reboot or restart docker service
sudo systemctl restart docker
```

#### 3. Insufficient Memory
```bash
# Check Docker resource usage
docker stats

# Increase Docker memory allocation (Docker Desktop)
# Preferences -> Resources -> Memory
```

#### 4. Build Failures
```bash
# Clean build with no cache
docker-compose build --no-cache

# Force recreate containers
docker-compose up -d --force-recreate
```

### Service Health Checks

```bash
# Check backend health
curl http://localhost:8081/actuator/health

# Check frontend health
curl http://localhost:5174

# Check container logs
make logs
```

## 🧹 Cleanup

### Remove Everything
```bash
# Stop and remove all containers, networks, volumes
make clean

# OR manually
docker-compose down --rmi all --volumes --remove-orphans
```

### Remove Specific Resources
```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```

## 📊 Monitoring

```bash
# View resource usage
docker stats

# View running processes
docker top <container-name>

# Inspect container details
docker inspect <container-name>

# View container resource usage
docker stats <container-name>
```

## 🔄 Development Workflow

### 1. Code Changes
- Make changes to your code locally
- Changes are automatically reflected in containers (hot reload)

### 2. Rebuild Services
```bash
# Rebuild specific service
docker-compose build backend

# Rebuild all services
docker-compose build

# Rebuild and restart
docker-compose up -d --build
```

### 3. Database Management
- H2 console: http://localhost:8080/h2-console
- Data is persisted in memory (resets on container restart)
- For production, consider switching to PostgreSQL

## 🚨 Emergency Procedures

### If Services Won't Start
```bash
# Check Docker daemon
sudo systemctl status docker

# Restart Docker
sudo systemctl restart docker

# Check disk space
df -h

# Check memory
free -h
```

### If Containers Keep Crashing
```bash
# Check logs for errors
make logs

# Run in foreground to see errors
docker-compose up

# Check container exit codes
docker ps -a
```

## 📞 Support

If you encounter issues:

1. Check this documentation first
2. Verify all prerequisites are met
3. Check the service logs: `make logs`
4. Ensure ports 8081 and 5174 are available
5. Verify Docker has sufficient resources

## 📝 Notes

- This setup uses H2 in-memory database for development
- Data will be lost when containers are stopped
- For production deployment, use PostgreSQL with persistent volumes
- The frontend runs in development mode with hot reload
- The backend includes Swagger API documentation

---

**Happy coding! 🎉**

Your Kivabi application should now be running at http://localhost:5174