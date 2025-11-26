# Kivabi MPV

## Architecture

- **Backend:** Spring Boot (`kivabi-service/`)
- **Frontend:** React + Vite (`kivabi-frontend/`)
- **Containerization:** Docker Compose connects both services on a shared network.

## Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd Kivabi MPV
   ```

2. **Build and run with Docker Compose**
   ```sh
   docker compose up --build
   ```
   - Frontend: [http://localhost:5173](http://localhost:5173) (or [http://localhost:5174](http://localhost:5174) if mapped that way)
   - Backend API: [http://localhost:8081/api](http://localhost:8081/api)

3. **Environment Variables**
   - Frontend: Set `VITE_API_BASE_URL` in `.env` or via Docker Compose.
   - Backend: Uses default Spring Boot profiles for Docker.

## Project Structure

```
Kivabi MPV/
├── kivabi-frontend/   # React + Vite frontend
├── kivabi-service/    # Spring Boot backend
├── docker-compose.yml # Multi-service orchestration
```

## Links

- [Architecture Diagram](#)
- [Detailed Installation Guide](#)
