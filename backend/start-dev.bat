@echo off
REM MERN Stack Backend Development Startup Script (Windows)
echo 🚀 Starting MERN Stack Backend - Development Mode...

REM Set development environment variables
set MONGODB_URI=mongodb+srv://Code2cash:cash2code1@cluster0.0eoeraf.mongodb.net/orderManagement
set MONGODB_DATABASE=orderManagement
set CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
set PORT=8080
set NODE_ENV=development
set JWT_SECRET=your-super-secret-jwt-key-change-in-production
set UPLOAD_DIR=uploads

REM Create uploads directory if it doesn't exist
if not exist "uploads" mkdir uploads
if not exist "uploads\orders" mkdir uploads\orders

echo 🌍 Environment: Development
echo 🔗 MongoDB: %MONGODB_DATABASE%
echo 🌐 Port: %PORT%
echo 📁 Upload Directory: %UPLOAD_DIR%
echo 🎯 Backend: Node.js Express Server with Hot Reload

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Start with nodemon for hot reload
echo 🎯 Starting with nodemon (hot reload enabled)...
npm run dev

pause
