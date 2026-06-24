@echo off
title Chantico POS

echo Iniciando Chantico POS...
echo.

start "PHP Server" cmd /k "php artisan serve"
start "Vite Dev" cmd /k "pnpm run dev"

echo Servidores iniciados:
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo.
echo Cierra las ventanas de PHP Server y Vite Dev para detener.
pause
