@echo off
echo Starting SHIROA...
echo.

start "SHIROA Backend" cmd /k "cd backend && npm run start:dev"
timeout /t 3 >nul
start "SHIROA Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
pause
