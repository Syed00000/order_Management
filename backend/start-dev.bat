@echo off
REM Development Startup Script for Order Management System (Windows)
echo 🚀 Starting Order Management Backend (Development Mode)...

REM Set development environment variables
set MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
set MONGODB_DATABASE=orderManagement
set CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
set PORT=8081
set SPRING_PROFILES_ACTIVE=development
set UPLOAD_DIR=uploads

REM Create uploads directory if it doesn't exist
if not exist "uploads" mkdir uploads

echo 🌍 Environment: Development
echo 🔗 MongoDB: %MONGODB_DATABASE%
echo 🌐 Port: %PORT%
echo 📁 Upload Directory: %UPLOAD_DIR%

REM Start with Maven (hot reload enabled)
echo 🎯 Starting with Maven (hot reload enabled)...
call mvnw.cmd spring-boot:run

pause
