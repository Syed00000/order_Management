@echo off
title Order Management System Launcher
color 0A

echo.
echo ========================================
echo   Order Management System Launcher
echo ========================================
echo.

REM Set JAVA_HOME
set JAVA_HOME=C:\Program Files\Java\jdk-21

echo [1/3] Setting up environment...
echo JAVA_HOME set to: %JAVA_HOME%
echo.

echo [2/3] Starting Backend (Spring Boot)...
start "Backend - Spring Boot" cmd /k "cd backend && set JAVA_HOME=C:\Program Files\Java\jdk-21 && mvnw.cmd spring-boot:run"

echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak > nul

echo [3/3] Starting Frontend (React + Vite)...
start "Frontend - React Vite" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Services Started Successfully!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo Health:   http://localhost:8080/health
echo.
echo Note: Two new command windows opened for:
echo   - Backend (Spring Boot on port 8080)
echo   - Frontend (React Vite on port 3000)
echo.
echo To stop services, close those command windows
echo or press Ctrl+C in each window.
echo.
echo Press any key to exit this launcher...
pause > nul
