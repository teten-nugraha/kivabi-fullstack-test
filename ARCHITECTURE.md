# Kivabi - Fullstack Project Management & Notes Application

## Overview
Kivabi is a modern fullstack application for project management and notes organization built with cutting-edge technologies.

## High Level Architecture

![High Level Architecture](High Level Architecture.png)

## Technical Architecture

### Backend (kivabi-service)
- **Framework**: Spring Boot 3.5.7
- **Database**: PostgreSQL
- **Authentication**: Spring Security + JWT Token
- **API Documentation**: Swagger/OpenAPI
- **Supporting Technologies**:
  - Spring Data JPA for ORM
  - Spring Validation for data validation
  - Mapstruct for object mapping
  - Lombok to reduce boilerplate code

### Frontend (kivabi-frontend)
- **Framework**: React 19.2.0
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS Modules

## Main Features

### Project Management
- Create, read, update, and delete projects
- Project organization with clear structure

### Notes Management
- Notes system integrated with projects
- CRUD operations for notes
- Note categorization by project

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control

### API Features
- RESTful API design
- Comprehensive error handling
- Input validation
- Swagger documentation

## Database Structure
- **User**: User information and credentials
- **Project**: Project data with metadata
- **Notes**: Notes associated with specific projects

## Deployment & Development
- **Containerization**: Docker and Docker Compose
- **CI/CD**: GitHub Actions workflow
- **Development**: Hot reload with Vite (frontend) and Spring DevTools (backend)

## Security
- Password hashing with BCrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration

## Scaling Considerations

### Database Connection Pool Optimization
- **Hikari Connection Pool**: Configured for optimal performance at scale
- **Pool Sizing**: Adjustable based on database capacity and user load
- **Connection Management**: Efficient connection reuse and timeout handling

### Horizontal Scaling Strategy
- **Load Balancer Ready**: Stateless JWT authentication enables horizontal scaling
- **Multiple Instances**: Support for deploying behind NGINX, AWS ALB, or Kubernetes Ingress
- **Container Orchestration**: Compatible with Docker Swarm/Kubernetes for automatic scaling

### Performance Optimization
- **Database Indexing**: Optimized indexes for frequently queried tables
- **Query Optimization**: Monitoring and optimization of slow database queries
- **Caching Strategy**: Redis integration ready for frequently accessed data

This application is designed to provide a smooth experience for managing projects and notes with an intuitive interface and robust API, with architecture capable of scaling from 1,000 to 100,000+ users.

## Related Documentation

- [Audio to Text Feature Documentation](./audio-to-text.md)