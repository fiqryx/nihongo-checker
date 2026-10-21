@echo off
setlocal enabledelayedexpansion

:: ============================================
::  Next.js Windows Service Uninstaller
::  Run this from: [project_dir]/script/
:: ============================================

:: Keep window open on any exit
if not "%1"=="admin" (
    powershell -Command "Start-Process cmd -ArgumentList '/k \"%~fs0\" admin' -Verb RunAs"
    exit /b
)

:: Resolve PROJECT_DIR to parent of script location
for %%I in ("%~dp0..") do set "PROJECT_DIR=%%~fI"

:: Set service name (same naming convention as installer)
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-Item '%PROJECT_DIR%').Name"`) do set "FOLDER_NAME=%%I"
set "SERVICE_NAME=nextjs-%FOLDER_NAME%-service"

echo ============================================
echo  Next.js Windows Service Uninstaller
echo  Service: %SERVICE_NAME%
echo ============================================

:: Check if NSSM is installed
where nssm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] NSSM not found!
    pause
    exit /b 1
)

:: Check if service exists
nssm status "%SERVICE_NAME%" >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Service "%SERVICE_NAME%" not found!
    pause
    exit /b 1
)

echo.
echo [INFO] Stopping service...
nssm stop "%SERVICE_NAME%"

echo [INFO] Removing service...
nssm remove "%SERVICE_NAME%" confirm

echo.
echo ============================================
echo  Service "%SERVICE_NAME%" removed!
echo ============================================

pause