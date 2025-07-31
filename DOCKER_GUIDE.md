# 🐳 Docker Deployment Guide - Order Management System

## 📋 Prerequisites
- Docker installed
- Docker Compose installed

---

## 🚀 Quick Start Commands

### Production Deployment
```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

### Development Mode
```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build

# Stop development services
docker-compose -f docker-compose.dev.yml down
```

---

## 🎯 Service URLs

### Production Mode:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Backend Health**: http://localhost:8080/health

### Development Mode:
- **Frontend**: http://localhost:5173 (with hot reload)
- **Backend**: http://localhost:8081
- **Backend Health**: http://localhost:8081/health

---

## 🔧 Individual Service Commands

### Build Individual Services
```bash
# Build backend only
docker build -t order-management-backend ./backend

# Build frontend only
docker build -t order-management-frontend ./frontend

# Run backend container
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/" \
  -e MONGODB_DATABASE="orderManagement" \
  order-management-backend

# Run frontend container
docker run -p 3000:80 order-management-frontend
```

---

## 🐛 Troubleshooting

### Common Issues:

#### Port Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F
```

#### Container Build Fails
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### MongoDB Connection Issues
```bash
# Check backend logs
docker-compose logs backend

# Verify environment variables
docker-compose exec backend env | grep MONGODB
```

---

## 📊 Docker Management

### View Running Containers
```bash
docker ps
```

### View All Containers
```bash
docker ps -a
```

### Remove Containers
```bash
# Remove all stopped containers
docker container prune

# Remove specific container
docker rm container_name
```

### View Images
```bash
docker images
```

### Remove Images
```bash
# Remove unused images
docker image prune

# Remove specific image
docker rmi image_name
```

---

## 🔄 Environment Variables

### Production (.env file)
```env
# Backend
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

### Development (.env.dev file)
```env
# Backend
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:8081
VITE_APP_NAME=Order Management System
VITE_APP_VERSION=1.0.0
```

---

## 🎉 Success Indicators

### Backend Ready:
- ✅ "Started OrderManagementApplication" in logs
- ✅ Health check returns 200: http://localhost:8080/health
- ✅ MongoDB connection successful

### Frontend Ready:
- ✅ Nginx serving files
- ✅ React app loads at http://localhost:3000
- ✅ API calls to backend working

**Docker setup complete! Easy deployment with single command! 🚀**
