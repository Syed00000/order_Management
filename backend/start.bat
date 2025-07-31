@echo off
REM Backend Startup Script for Order Management System (Windows)
echo 🚀 Starting Order Management Backend...

REM Set environment variables
set MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/
set MONGODB_DATABASE=orderManagement
set CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
set PORT=8080
set SPRING_PROFILES_ACTIVE=production
set UPLOAD_DIR=uploads

REM Create uploads directory if it doesn't exist
if not exist "uploads" mkdir uploads

REM Check if JAR file exists
for %%f in (target\*.jar) do set JAR_FILE=%%f

if "%JAR_FILE%"=="" (
    echo ❌ JAR file not found. Building application...
    call mvnw.cmd clean package -DskipTests
    for %%f in (target\*.jar) do set JAR_FILE=%%f
)

if "%JAR_FILE%"=="" (
    echo ❌ Failed to build JAR file. Exiting...
    pause
    exit /b 1
)

echo ✅ Found JAR file: %JAR_FILE%
echo 🌍 Environment: %SPRING_PROFILES_ACTIVE%
echo 🔗 MongoDB: %MONGODB_DATABASE%
echo 🌐 Port: %PORT%
echo 📁 Upload Directory: %UPLOAD_DIR%

REM Start the application
echo 🎯 Starting Java application...
java -jar "%JAR_FILE%"

pause
