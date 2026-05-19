@echo off
echo.
echo ================================================
echo   Al Laith Report — First-Time Setup
echo ================================================
echo.

echo [1/2] Installing Python libraries...
pip install anthropic python-docx tavily-python

echo.
echo [2/2] Done.
echo.
echo ════════════════════════════════════════════════
echo   NEXT: Add your API keys
echo ════════════════════════════════════════════════
echo.
echo KEY 1 — Anthropic (required — for Claude AI writing)
echo   Create:  Scripts\.api_key
echo   Content: your sk-ant-... key
echo   Get it:  console.anthropic.com
echo.
echo KEY 2 — Tavily (free — for live social media research)
echo   Create:  Scripts\.tavily_key
echo   Content: your tvly-... key
echo   Get it:  tavily.com  (free tier: 1000 searches/month)
echo.
echo Both keys are plain text files — one key per file, nothing else.
echo.
echo Once keys are saved, double-click run_report.bat to test.
echo.
pause
