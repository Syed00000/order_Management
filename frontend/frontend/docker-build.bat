@echo off
REM Docker Build Script for Frontend

echo 🚀 Building Frontend for Docker...

REM Step 1: Build locally first
echo 📦 Building application locally...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo ❌ Local build failed!
    pause
    exit /b 1
)

echo ✅ Local build successful!

REM Step 2: Build Docker image using simple Dockerfile
echo 🐳 Building Docker image...
docker build -f Dockerfile.simple -t order-management-frontend .

if %ERRORLEVEL% neq 0 (
    echo ❌ Docker build failed!
    pause
    exit /b 1
)

echo ✅ Docker build successful!
echo 🎉 Frontend Docker image ready: order-management-frontend

REM Step 3: Test run (optional)
echo 🧪 Test run Docker container...
docker run -d -p 3000:80 --name frontend-test order-management-frontend

echo ✅ Frontend running on http://localhost:3000
echo 🛑 To stop: docker stop frontend-test && docker rm frontend-test

pause
