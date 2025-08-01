# Order Management System - Start All Services
# This script starts both backend and frontend services

Write-Host "Starting Order Management System..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Set JAVA_HOME for Maven
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"

# Function to start backend
function Start-Backend {
    Write-Host "Starting Backend (Spring Boot)..." -ForegroundColor Yellow
    Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "Set-Location 'c:\Users\Syed Imran Hassan\Desktop\OrderManagement\backend'; `$env:JAVA_HOME = 'C:\Program Files\Java\jdk-21'; .\mvnw.cmd spring-boot:run"
}

# Function to start frontend
function Start-Frontend {
    Write-Host "Starting Frontend (React + Vite)..." -ForegroundColor Yellow
    Start-Process PowerShell -ArgumentList "-NoExit", "-Command", "Set-Location 'c:\Users\Syed Imran Hassan\Desktop\OrderManagement\frontend'; npm run dev"
}

# Start backend first
Start-Backend
Write-Host "Waiting 10 seconds for backend to initialize..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

# Start frontend
Start-Frontend

Write-Host ""
Write-Host "Both services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "URLs:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:8081" -ForegroundColor Cyan
Write-Host "   Health:   http://localhost:8081/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Two new PowerShell windows will open for backend and frontend" -ForegroundColor Yellow
Write-Host "To stop services, close those PowerShell windows or press Ctrl+C in each" -ForegroundColor Yellow
Write-Host ""
Write-Host "Order Management System is ready!" -ForegroundColor Green
