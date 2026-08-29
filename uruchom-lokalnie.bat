@echo off
cd /d "%~dp0"
where pnpm >nul 2>&1
if %errorlevel%==0 (
  pnpm dev
  goto :eof
)
where npm >nul 2>&1
if %errorlevel%==0 (
  npm run dev
  goto :eof
)
echo Nie znaleziono Node.js. Zainstaluj Node.js LTS i uruchom ten plik ponownie.
pause
