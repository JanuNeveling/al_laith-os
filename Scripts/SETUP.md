# Al Laith Weekly Intelligence Report — Setup Guide

## What This Does
Every Monday at 08:00, this script:
1. **Searches LinkedIn, Instagram, and the web** for real competitor activity this week
2. Researches all 6 UAE competitors (actual recent posts, campaigns, content)
3. Analyses UAE sector marketing trends (live data)
4. Analyses global B2B marketing trends (live data)
5. Writes an executive summary
6. Saves a formatted Word doc to your Desktop

You upload the .docx to Google Docs in seconds.

---

## Step 1 — Install Python (if not already installed)
Download: https://www.python.org/downloads/
✅ Tick **"Add Python to PATH"** during install.

---

## Step 2 — Install libraries
Double-click: **`setup.bat`**

Installs: `anthropic`, `python-docx`, `tavily-python`

---

## Step 3 — Add API keys (two keys, both easy to get)

### Key 1 — Anthropic (for Claude AI writing)
1. Go to: https://console.anthropic.com → API Keys
2. Create a key starting with `sk-ant-...`
3. Create a file called **`.api_key`** inside the `Scripts` folder
4. Paste your key as the only line. Save.

### Key 2 — Tavily (for live social media research — FREE)
This is what lets the report actually read LinkedIn posts, Instagram content,
and news from this week — not just AI guesswork.

1. Go to: https://tavily.com → Sign up (free)
2. Copy your API key starting with `tvly-...`
3. Create a file called **`.tavily_key`** inside the `Scripts` folder
4. Paste your key as the only line. Save.

**Free tier gives you 1,000 searches/month.**
The report uses ~25 searches per run = 40 reports/month free.

> Both key files are gitignored — they will never be accidentally shared.

---

## Step 4 — Test it
Double-click: **`run_report.bat`**

A .docx file appears on your Desktop in ~3 minutes.
The cover page shows: ✅ Includes live social media research

---

## Step 5 — Schedule it (runs automatically every Monday)
Right-click **`schedule_weekly.bat`** → **Run as administrator**

Registers a Windows Task Scheduler task. Runs every Monday at 08:00, whether you open your laptop or not.

---

## Uploading to Google Docs
1. Go to drive.google.com
2. **New → File upload** → select the .docx from your Desktop
3. Right-click the uploaded file → **Open with Google Docs**

All formatting (headings, bullets, bold, dividers) carries over cleanly.

---

## Adding LinkedIn / Instagram handles
Open `weekly_intelligence_report.py` — find the `COMPETITORS` list near the top.
Add handles for any competitors you know:
```python
'linkedin'  : 'https://www.linkedin.com/company/their-page',
'instagram' : 'https://www.instagram.com/their_handle',
```
The more handles you add, the more targeted the search.

---

## Changing the Schedule
Open Task Scheduler (Windows search) → find **"AlLaith Weekly Intelligence Report"**
→ right-click → Properties → Triggers tab.

---

## Cost Breakdown

| Item | Cost |
|---|---|
| Anthropic Claude (per report) | ~$0.08–$0.12 |
| Tavily searches (per report, ~25 searches) | Free on free tier |
| **Total per week** | **~$0.10** |
| **Total per year** | **~$5** |

To upgrade to richer prose (Claude Sonnet), open `weekly_intelligence_report.py` and change:
```python
CLAUDE_MODEL = 'claude-haiku-4-5'
```
to:
```python
CLAUDE_MODEL = 'claude-sonnet-4-5'
```
Cost becomes ~$0.40/report (~$20/year) but the writing quality is noticeably stronger.

---

## Report Structure
| Section | What's in it |
|---|---|
| Cover page | Title, date, live data badge, confidential label |
| Executive Summary | 6 punchy bullets — top insights + actions this week |
| Section 1 | Competitor analysis × 6 — **live social media data** (LinkedIn, Instagram, web), brand positioning, content strategy, weaknesses, threat level |
| Section 2 | UAE market trends — live data from this week |
| Section 3 | Global B2B marketing trends — live data from this week |
