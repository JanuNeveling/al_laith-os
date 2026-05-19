@echo off
echo.
echo ================================================
echo   Al Laith Weekly Intelligence Report
echo   %date% %time%
echo ================================================
echo.

python "%~dp0weekly_intelligence_report.py"

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Report generation failed. See message above.
    pause
) else (
    echo Report complete. Check your Desktop for the .docx file.
    timeout /t 5
)
