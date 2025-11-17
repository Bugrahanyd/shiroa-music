@echo off
echo ========================================
echo SHIROA - Basit Baslatma
echo ========================================
echo.

echo [1/3] Backend baslatiliyor...
cd backend
start cmd /k "npm run start:dev"
timeout /t 5

echo.
echo [2/3] Frontend baslatiliyor...
cd ..\frontend
start cmd /k "npm run dev"

echo.
echo [3/3] Tarayici aciliyor...
timeout /t 10
start http://localhost:3000

echo.
echo ========================================
echo SHIROA Baslatildi!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo ========================================
pause
