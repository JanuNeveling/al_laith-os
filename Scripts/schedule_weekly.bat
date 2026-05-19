@echo off
echo.
echo ================================================
echo   Scheduling Weekly Intelligence Report
echo   Every Monday at 08:00
echo ================================================
echo.

set TASK_NAME=AlLaith Weekly Intelligence Report
set SCRIPT_PATH=%~dp0run_report.bat

schtasks /create ^
  /tn "%TASK_NAME%" ^
  /tr "\"%SCRIPT_PATH%\"" ^
  /sc WEEKLY ^
  /d MON ^
  /st 08:00 ^
  /ru "%USERNAME%" ^
  /f

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not create scheduled task.
    echo Try running this file as Administrator (right-click → Run as administrator).
) else (
    echo.
    echo ✅  Scheduled successfully!
    echo     Runs every Monday at 08:00
    echo     Report saves to your Desktop as a .docx file
    echo.
    echo     To change the time: open Task Scheduler, find "%TASK_NAME%"
    echo     To run it now manually: double-click run_report.bat
)

echo.
pause
