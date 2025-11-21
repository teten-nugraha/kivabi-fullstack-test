# Kivabi Service - Backend API

A Spring Boot backend service for the Kivabi fullstack project management and notes application.

## 🚀 Tech Stack

- **Framework**: Spring Boot 3.5.7
- **Database**: PostgreSQL
- **Authentication**: Spring Security + JWT Token
- **API Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven
- **Supporting Technologies**:
  - Spring Data JPA for ORM
  - Spring Validation for data validation
  - Mapstruct for object mapping
  - Lombok to reduce boilerplate code

## 📁 Project Structure

```
kivabi-service/
├── src/main/java/com/teten/kivabi/service/
│   ├── configuration/           # Spring configuration classes
│   │   ├── MessageConfiguration.java
│   │   ├── PasswordEncoderConfiguration.java
│   │   ├── SecurityConfiguration.java
│   │   └── SwaggerConfiguration.java
│   ├── controller/              # REST API controllers
│   │   ├── ApiResponse.java
│   │   ├── AuthController.java
│   │   ├── NotesController.java
│   │   └── ProjectController.java
│   ├── exceptions/              # Exception handling
│   │   ├── ApiExceptionResponse.java
│   │   ├── LoginControllerAdvice.java
│   │   ├── RegistrationControllerAdvice.java
│   │   ├── RegistrationException.java
│   │   ├── ValidationAdvice.java
│   │   └── ValidationErrorResponse.java
│   ├── model/                   # Data models/entities
│   │   ├── Notes.java
│   │   ├── Project.java
│   │   ├── User.java
│   │   └── UserRole.java
│   ├── repository/              # Spring Data JPA repositories
│   │   ├── NotesRepository.java
│   │   ├── ProjectRepository.java
│   │   └── UserRepository.java
│   ├── security/                # Security components
│   │   ├── dto/                 # Data transfer objects
│   │   │   ├── AuthenticatedUserDto.java
│   │   │   ├── LoginRequest.java
│   │   │   ├── LoginResponse.java
│   │   │   ├── RegistrationRequest.java
│   │   │   └── RegistrationResponse.java
│   │   ├── jwt/                 # JWT token handling
│   │   │   ├── JwtAuthenticationEntryPoint.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   ├── JwtProperties.java
│   │   │   ├── JwtTokenManager.java
│   │   │   └── JwtTokenService.java
│   │   ├── mapper/              # Object mappers
│   │   │   └── UserMapper.java
│   │   ├── service/             # Security services
│   │   │   ├── UserDetailsServiceImpl.java
│   │   │   ├── UserService.java
│   │   │   └── UserServiceImpl.java
│   │   └── utils/               # Security utilities
│   │       └── SecurityConstants.java
│   ├── service/                 # Business logic services
│   │   ├── NotesService.java
│   │   ├── NotesServiceImpl.java
│   │   ├── ProjectService.java
│   │   ├── ProjectServiceImpl.java
│   │   └── UserValidationService.java
│   ├── utils/                   # Utility classes
│   │   ├── ExceptionMessageAccessor.java
│   │   ├── GeneralMessageAccessor.java
│   │   └── ProjectConstants.java
│   └── CoreServiceApplication.java # Main application class
├── src/main/resources/
│   ├── messages/                # Internationalization messages
│   │   ├── exception/
│   │   │   └── ExceptionMessages_en.properties
│   │   ├── general/
│   │   │   └── GeneralMessages_en.properties
│   │   └── validation/
│   │       └── ValidationMessages_en.properties
│   └── application.yml          # Application configuration
├── .github/workflows/
│   └── publish.yml              # GitHub Actions workflow
├── Dockerfile                   # Docker container configuration
├── docker-compose.yml           # Docker Compose for production
├── local-docker-compose.yml     # Docker Compose for local development
└── pom.xml                      # Maven project configuration
```

## 🎯 API Features

### 🔐 Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login with JWT token generation
- Protected endpoints require valid JWT token

### 📋 Project Management Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/{id}` - Get project by ID
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### 📝 Notes Management Endpoints
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `GET /api/notes/{id}` - Get note by ID
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note
- `GET /api/notes/project/{projectId}` - Get notes by project

## 🛠️ Development

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL 12+
- Docker (optional, for containerized development)

### Local Development

1. **Start PostgreSQL database**:
```bash
docker-compose -f local-docker-compose.yml up -d
```

2. **Build and run the application**:
```bash
mvn clean install
mvn spring-boot:run
```

3. **Access the application**:
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Database: localhost:5432 (username: root, password: root)

### Configuration

Edit `src/main/resources/application.yml` for custom configuration:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/kivabidb
    username: root
    password: root
    hikari:
      pool-name: KivabiHikariPool
      maximum-pool-size: 20
      minimum-idle: 5

jwt:
  secret: your-jwt-secret-key
  issuer: kivabi-service
  expiry: 600000 # 10 minutes
```

## 🚀 Deployment

### Docker Deployment

1. **Build the Docker image**:
```bash
docker build -t kivabi-service .
```

2. **Run with Docker Compose**:
```bash
docker-compose up -d
```

### Traditional Deployment

1. **Build the JAR**:
```bash
mvn clean package
```

2. **Run the application**:
```bash
java -jar target/kivabi-service.jar
```

## 🔒 Security

- JWT-based authentication with Spring Security
- Password hashing with BCrypt
- Role-based access control
- CORS configuration
- Input validation and sanitization
- SQL injection prevention with Spring Data JPA

## 📊 Database

### Schema Overview
- **User**: User accounts with credentials and roles
- **Project**: Projects with metadata and ownership
- **Notes**: Notes associated with specific projects

### Connection Pooling
- HikariCP connection pool configured for optimal performance
- Adjust pool size based on expected load in `application.yml`

## 🔍 Monitoring & Documentation

- **Swagger/OpenAPI**: Automatic API documentation
- **Spring Boot Actuator**: Health checks and metrics (can be enabled)
- **Logging**: Configurable logging levels

## 🤝 Frontend Integration

This backend service is designed to work with the **kivabi-frontend** React application:
- CORS configured for frontend communication
- JWT tokens for authentication state management
- RESTful API design for easy frontend consumption

## 📈 Scaling Considerations

For production deployment with high traffic:
1. Configure Hikari connection pool size appropriately
2. Enable database connection pooling metrics
3. Consider Redis for session management caching
4. Implement horizontal scaling with load balancer
5. Monitor database performance and query optimization

## 📝 License

This project is part of the Kivabi fullstack application.

---

For frontend documentation, see the [kivabi-frontend](../kivabi-frontend/README.md) directory.

For overall architecture, see [ARCHITECTURE.md](../ARCHITECTURE.md).