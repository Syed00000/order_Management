@echo off
echo 🚀 Starting MERN Stack Order Management System...
echo.

echo 📦 Starting Backend (Node.js Express)...
start "BACKEND" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo ⚛️ Starting Frontend (React + Vite)...
start "FRONTEND" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ MERN Stack Started Successfully!
echo.
echo 🌐 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend:    http://localhost:5173
echo   Health:      http://localhost:8080/health
echo.
echo 📝 Press any key to open browser...
pause > nul

start http://localhost:5173
start http://localhost:8080

echo.
echo 🎉 MERN Stack is running!
echo 📱 Frontend: React + Vite + Tailwind
echo 🚀 Backend: Node.js + Express + MongoDB
echo 🍃 Database: MongoDB Atlas
echo.
echo Press any key to exit...
pause > nul
