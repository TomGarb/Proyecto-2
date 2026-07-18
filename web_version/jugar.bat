@echo off
echo ========================================================
echo Iniciando Servidor Local para Desafio Galactico...
echo ========================================================
echo.
echo Por seguridad, los navegadores bloquean los modulos ES6 (import/export)
echo si abres el archivo index.html haciendo doble clic.
echo Este script inicia un servidor local para que el juego funcione correctamente.
echo.
echo Presiona Ctrl+C en esta ventana para detener el servidor cuando termines de jugar.
echo.
start http://localhost:8000
python -m http.server 8000
pause
