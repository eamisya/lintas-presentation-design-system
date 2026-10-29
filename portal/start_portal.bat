@echo off
title Lintas Presentation Design System — Skill Portal
echo =========================================================
echo  Launching Lintas Deck Skill Portal...
echo =========================================================
cd /d "%~dp0"
python start_portal.py
if errorlevel 1 (
    echo Python not found on PATH or error occurred.
    echo Opening static HTML directly in default browser...
    start "" "%~dp0dist\index.html"
)
pause
