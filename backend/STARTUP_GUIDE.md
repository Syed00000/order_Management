# 🚀 Backend Startup Guide

## 📋 Quick Start

### Windows:
```bash
# Production mode
start.bat

# Development mode (with hot reload)
start-dev.bat
```

### Linux/Mac:
```bash
# Make scripts executable (first time only)
chmod +x start.sh start-dev.sh

# Production mode
./start.sh

# Development mode (with hot reload)
./start-dev.sh
```

---

## 🎯 Startup Scripts

### Production Scripts:
- **`start.sh`** - Linux/Mac production startup
- **`start.bat`** - Windows production startup

### Development Scripts:
- **`start-dev.sh`** - Linux/Mac development startup
- **`start-dev.bat`** - Windows development startup

---

## 🔧 What the Scripts Do

### Production Mode (`start.sh` / `start.bat`):
1. ✅ Load environment variables from `.env.production`
2. ✅ Set default values if variables not found
3. ✅ Create uploads directory
4. ✅ Check for existing JAR file
5. ✅ Build JAR if not found (`mvnw clean package`)
6. ✅ Start application with `java -jar app.jar`

### Development Mode (`start-dev.sh` / `start-dev.bat`):
1. ✅ Set development environment variables
2. ✅ Create uploads directory
3. ✅ Start with Maven (`mvnw spring-boot:run`)
4. ✅ Hot reload enabled for development

---

## 🌍 Environment Variables

### Production (Port 8080):
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
PORT=8080
SPRING_PROFILES_ACTIVE=production
UPLOAD_DIR=uploads
```

### Development (Port 8081):
```
MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
MONGODB_DATABASE=orderManagement
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
PORT=8081
SPRING_PROFILES_ACTIVE=development
UPLOAD_DIR=uploads
```

---

## 🔍 Troubleshooting

### Java Not Found:
```bash
# Check Java installation
java -version

# Install Java 17 if needed
# Windows: Download from https://adoptium.net/
# Linux: sudo apt install openjdk-17-jdk
# Mac: brew install openjdk@17
```

### Port Already in Use:
```bash
# Windows: Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac: Find and kill process
lsof -ti:8080 | xargs kill -9
```

### MongoDB Connection Issues:
1. Check internet connection
2. Verify MongoDB Atlas credentials
3. Check IP whitelist in MongoDB Atlas
4. Verify connection string format

---

## ✅ Success Indicators

### Backend Started Successfully:
- ✅ "Started OrderManagementApplication" message
- ✅ "Tomcat started on port 8080/8081"
- ✅ MongoDB connection successful
- ✅ No error messages in console

### Test Backend:
- **Health Check**: http://localhost:8080/health (production)
- **Health Check**: http://localhost:8081/health (development)
- **API Docs**: http://localhost:8080/swagger-ui.html

**Easy startup with single command! 🎉**
