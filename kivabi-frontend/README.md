# Kivabi Frontend - Project Management & Notes Application

A modern React frontend for the Kivabi fullstack project management and notes application.

## 🚀 Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS Modules
- **Package Manager**: Yarn

## 📁 Project Structure

```
kivabi-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.jsx          # Main application component
│   ├── Login.jsx        # User login component
│   ├── Notes.jsx        # Notes management component
│   ├── Projects.css     # Projects styling
│   ├── Projects.jsx     # Projects management component
│   ├── Register.css     # Registration styling
│   ├── Register.jsx     # User registration component
│   ├── index.css        # Global styles
│   └── main.jsx        # Application entry point
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── yarn.lock           # Yarn lock file
```

## 🎯 Features

### 🔐 Authentication
- User registration with form validation
- User login with JWT authentication
- Secure session management

### 📋 Project Management
- Create and manage projects
- View project lists and details
- Project organization and categorization

### 📝 Notes Management
- Create, read, update, and delete notes
- Notes associated with specific projects
- Rich text editing capabilities

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Start development server:
```bash
yarn dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint

## 🌐 Backend Integration

This frontend connects to the **kivabi-service** backend:
- Spring Boot 3.5.7 backend
- PostgreSQL database
- JWT authentication
- RESTful API endpoints

### API Endpoints
- Authentication: `/api/auth/*`
- Projects: `/api/projects/*`
- Notes: `/api/notes/*`

## 🚀 Deployment

### Build for Production
```bash
yarn build
```

The build output will be in the `dist/` directory, ready for deployment.

### Docker Deployment
This frontend can be containerized using Docker and deployed alongside the backend service.

## 🔧 Configuration

Environment variables can be configured in `.env` files:
- `.env` - Default environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

## 📊 Performance

- Fast development with Vite HMR (Hot Module Replacement)
- Optimized production builds
- Efficient bundle splitting
- CSS Modules for scoped styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `yarn lint`
5. Submit a pull request

## 📝 License

This project is part of the Kivabi fullstack application.

---

For backend documentation, see the [kivabi-service](../kivabi-service/README.md) directory.

For overall architecture, see [ARCHITECTURE.md](../ARCHITECTURE.md).