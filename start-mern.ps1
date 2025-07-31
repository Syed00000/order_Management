# MERN Stack Startup Script
Write-Host "🚀 Starting MERN Stack Order Management System..." -ForegroundColor Green
Write-Host ""

Write-Host "📦 Starting Backend (Node.js Express)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal

Write-Host "⏳ Waiting 3 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "⚛️ Starting Frontend (React + Vite)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ MERN Stack Started Successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor White
Write-Host "  Backend API: http://localhost:8080" -ForegroundColor Blue
Write-Host "  Frontend:    http://localhost:5173" -ForegroundColor Cyan
Write-Host "  Health:      http://localhost:8080/health" -ForegroundColor Yellow
Write-Host ""

Write-Host "📝 Opening browsers in 5 seconds..." -ForegroundColor Magenta
Start-Sleep -Seconds 5

Start-Process "http://localhost:5173"
Start-Process "http://localhost:8080"

Write-Host ""
Write-Host "🎉 MERN Stack is running!" -ForegroundColor Green
Write-Host "📱 Frontend: React + Vite + Tailwind" -ForegroundColor Cyan
Write-Host "🚀 Backend: Node.js + Express + MongoDB" -ForegroundColor Blue
Write-Host "🍃 Database: MongoDB Atlas" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
