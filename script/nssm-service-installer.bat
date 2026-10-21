@echo off
setlocal enabledelayedexpansion

:: ============================================
::  Next.js Windows Service Installer (NSSM)
::  Run this from: [project_dir]/script/
:: ============================================

:: Keep window open on any exit
if not "%1"=="admin" (
    powershell -Command "Start-Process cmd -ArgumentList '/k \"%~fs0\" admin' -Verb RunAs"
    exit /b
)

:: Resolve PROJECT_DIR to parent of script location
for %%I in ("%~dp0..") do set "PROJECT_DIR=%%~fI"

:: move to project directory
cd /d "%PROJECT_DIR%"
if errorlevel 1 (
    echo [ERROR] Directory not found: %PROJECT_DIR%
    pause
    exit /b 1
)

:: Get full long folder name using PowerShell (avoids 8.3 short name like GROWTH~1)
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-Item '%PROJECT_DIR%').Name"`) do set "FOLDER_NAME=%%I"
set "SERVICE_NAME=nextjs-%FOLDER_NAME%-service"

echo ============================================
echo  Next.js Windows Service Setup
echo  Directory : %PROJECT_DIR%
echo  Service   : %SERVICE_NAME%
echo ============================================

:: check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found in this directory.
    echo         Make sure this is a Next.js project directory.
    pause
    exit /b 1
)

:: Check if NSSM is installed
where nssm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] NSSM not found! Please install it first:
    echo.
    echo   Option 1 - winget:
    echo     winget install nssm
    echo.
    echo   Option 2 - Chocolatey:
    echo     choco install nssm
    echo.
    echo   Option 3 - Manual:
    echo     Download from https://nssm.cc/download
    echo     Then add nssm.exe to PATH
    pause
    exit /b 1
)

:: check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo.
    echo [INFO] Installing dependencies...
    bun install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
)

:: check if build directory exists, if not run build
if exist ".next\BUILD_ID" (
    echo.
    echo [INFO] Build directory found, skipping build process...
) else (
    echo.
    echo [INFO] Build not found. Building the project...
    bun run build
    if errorlevel 1 (
        echo [ERROR] Build failed!
        pause
        exit /b 1
    )
)

:: Get bun executable path
for /f "tokens=*" %%i in ('where bun') do set "BUN_PATH=%%i"

:: Get node executable path
for /f "tokens=*" %%i in ('where node') do set "NODE_PATH=%%i"
if "!NODE_PATH!"=="" (
    echo [ERROR] Node.js not found! Please install Node.js to run the production server.
    pause
    exit /b 1
)

:: Prompt for custom port
echo.
echo ============================================
echo  Configure Custom Port
echo ============================================
set "PORT=3001"
set /p PORT="Enter port number (Press Enter for default !PORT!): "
echo [INFO] Service will run on PORT: !PORT!

:: Remove existing service if already exists
nssm status "%SERVICE_NAME%" >nul 2>&1
if not errorlevel 1 (
    echo.
    echo [INFO] Service "%SERVICE_NAME%" already exists. Removing...
    nssm stop "%SERVICE_NAME%" >nul 2>&1
    nssm remove "%SERVICE_NAME%" confirm >nul 2>&1
)

:: Give Windows time to fully release removed services (and their ports)
timeout /t 3 /nobreak >nul

:: Build service PATH (bun, node)
for /f "tokens=*" %%i in ('where bun') do set "BUN_DIR=%%~dpi"
if "!BUN_DIR:~-1!"=="\" set "BUN_DIR=!BUN_DIR:~0,-1!"

for /f "tokens=*" %%i in ('where node') do set "NODE_DIR=%%~dpi"
if "!NODE_DIR:~-1!"=="\" set "NODE_DIR=!NODE_DIR:~0,-1!"

set "SERVICE_PATH=%SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;!BUN_DIR!;!NODE_DIR!"

:: Setup log files
set "LOG_DIR=%PROJECT_DIR%\logs"
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

:: ============================================
::  Service 1: Next.js
:: ============================================
echo.
echo [INFO] Installing Next.js Windows Service...
:: Use Node.js instead of Bun to start Next.js to avoid "module.SourceMap is not yet implemented in Bun" error
nssm install "%SERVICE_NAME%" "!NODE_PATH!"
nssm set "%SERVICE_NAME%" AppParameters "node_modules\next\dist\bin\next" start -p !PORT!
nssm set "%SERVICE_NAME%" AppDirectory "%PROJECT_DIR%"
nssm set "%SERVICE_NAME%" Description "Next.js Application - %PROJECT_DIR%"
nssm set "%SERVICE_NAME%" Start SERVICE_AUTO_START
nssm set "%SERVICE_NAME%" AppEnvironmentExtra "PATH=!SERVICE_PATH!" "PORT=!PORT!"
nssm set "%SERVICE_NAME%" AppStdout "%LOG_DIR%\service-stdout.log"
nssm set "%SERVICE_NAME%" AppStderr "%LOG_DIR%\service-stderr.log"
nssm set "%SERVICE_NAME%" AppRotateFiles 1
nssm set "%SERVICE_NAME%" AppRotateSeconds 86400
nssm set "%SERVICE_NAME%" AppRotateBytes 10485760

:: Start the service
echo.
echo [INFO] Starting service...
nssm start "%SERVICE_NAME%"
if errorlevel 1 (
    echo [ERROR] Failed to start %SERVICE_NAME%!
    pause
    exit /b 1
)

echo.
echo ============================================
echo  Service installed and running!
echo  Name    : %SERVICE_NAME%
echo  URL     : http://localhost:!PORT!
echo  Logs    : %LOG_DIR%
echo ============================================
echo.
echo  Useful commands:
echo    nssm restart %SERVICE_NAME%
echo    nssm stop    %SERVICE_NAME%
echo    nssm remove  %SERVICE_NAME%
echo ============================================

pause