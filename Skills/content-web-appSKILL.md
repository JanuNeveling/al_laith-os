---
name: content-web-app
description: >
  Build, update, extend, debug, or add features to the Al Laith Business OS — a single HTML file
  application (~5,200 lines) that serves as a full content creation, management, marketing approval,
  competitor intelligence, and business OS platform. Use this skill whenever the user asks to build
  or improve any part of the Al Laith app: add a new module, fix a bug, extend an existing feature,
  integrate a new AI capability, or upgrade the UI. Also trigger for: "add X to the app",
  "the [feature] isn't working", "build the Intelligence Zone", "upgrade the approval flow",
  "add the calendar", "fix the scorer", or any request involving the HTML file.
  This skill encodes the full architecture, design system, storage schema, AI integration, and
  build rules so every session extends the right thing in the right way without breaking what exists.
---

# Content Web App Skill — Al Laith Business OS

## What This App Is

A **single HTML file** (~5,200 lines, vanilla HTML/CSS/JavaScript) that serves as the complete Al Laith Business OS. It is not a React artifact — it is a self-contained, deployable HTML application that runs in any browser.

One primary user creates content. 1–2 marketing team members review and approve via a shared URL (no login required for approvers).

**The golden rule: extend only. Never rebuild.**
Add CSS to the existing `<style>` block. Add JS before `</script>`. Add nav items to the existing `<nav>`. Add modals before `</body>`. Do not reorganise the file structure.

---

## File Landmarks

Always locate these before editing:

| What | Location (approximate) |
|---|---|
| CSS `<style>` block | Lines 10–800 |
| Global JS / storage helpers / nav | Lines 800–1,200 |
| Page render functions | Lines 1,200–2,800 |
| `BRAND_SYSTEM` + `callClaude()` + `aiCall()` | Lines 2,761–2,885 |
| Marketing pack generator | Lines 5,050–5,165 |
| Modals HTML | Lines 5,165–5,271 |

When adding anything, use these landmarks to find the right insertion point. State which lines you are editing.

---

## Design System — Match Exactly

```css
/* Fonts (loaded from Google Fonts) */
font-family: 'Manrope' (primary), 'Fraunces' (serif/display), 'JetBrains Mono' (mono)

/* Brand colours */
--navy:   #0C172C   /* sidebar background */
--navy-2: #183057
--blue:   #0071B7   /* primary CTA */
--blue-2: #329FCD
--sky:    #63CFEE
--paper:  #F2F6FA   /* page background */
--ink:    #0C172C   /* primary text */
--mute:   #6B7891
--rule:   #D9E3EF   /* borders */

/* Content pillars */
--p-sectors:     #0071B7
--p-products:    #329FCD
--p-messaging:   #183057
--p-community:   #63CFEE
--p-interactive: #0082AF
--p-training:    #72747E

/* Semantic */
--ok:    #1F7A4D    /* success */
--warn:  #B26B00   /* warning */
--stuck: #B23B1C   /* error/stuck */

/* Layout */
--sidebar-w: 248px
--radius: 14px
--radius-sm: 10px
```

All new UI components must use these variables. No new colour values unless adding a new named zone (Intelligence Zone uses `#EC4899` pink accent — already established).

---

## Storage Schema

All data in `localStorage`. Use the `dbGet` / `dbSet` wrapper — do not call `localStorage` directly:

```javascript
function dbGet(key) { return JSON.parse(localStorage.getItem(key) || 'null'); }
function dbSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
// FUTURE: swap only these two functions when migrating to Supabase/Firebase
```

**Existing keys — do not rename or restructure:**
```
al_laith_posts          → JSON array of post objects
al_laith_ideas          → JSON array
al_laith_assets         → JSON array
al_laith_mkt_{postId}   → {feedback:[], mkt_status:''}
al_laith_settings       → {anthropic_api_key:'', daily_target:5, brand_voice_posts:[]}
al_laith_series         → JSON array
```

**New keys (add when building new modules):**
```
os_ideas_list           → JSON array of OS idea IDs
os_idea_{id}            → individual OS idea object
os_settings             → {theme:'dark'|'light'}
intel_research_history  → JSON array of past research sessions
intel_competitor_notes  → JSON object keyed by company name
```

**Post object shape (reference before adding new fields):**
```javascript
{
  id: number,              // auto-increment
  title: string,
  hook: string,
  snippet: string,         // production brief / concept
  caption: string,
  hashtags: string,
  pillar: string,          // 'Sectors'|'Products'|'Messaging'|'Community'|'Interactive'|'Training'
  platforms: string[],
  content_type: string,    // 'photo'|'video'|'carousel'|'reel'
  status: string,          // 'draft'|'in_review'|'ready_to_post'|'posted'|'idea'
  mkt_status: string,      // 'pending'|'ready_to_post'|'changes_requested'
  schedule_date: string,   // YYYY-MM-DD
  series_name: string,
  notes: string,
  created_at: string,      // ISO timestamp
  updated_at: string
}
```

---

## AI Integration

**All AI calls go through `callClaude()`** — do not create new fetch patterns:

```javascript
async function callClaude(userPrompt) {
  const key = getSetting('anthropic_api_key', '');
  if (!key) throw Object.assign(new Error('NO_KEY'), {noKey: true});
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',  // always this model
      max_tokens: 1024,
      system: BRAND_SYSTEM,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  const data = await resp.json();
  return data.content[0].text;
}
```

**Existing AI endpoints in `aiCall(endpoint, body)`:**
- `'caption'` — generate post caption
- `'hooks'` — generate 3 hook variations
- `'hashtags'` — generate hashtag set
- `'idea'` — suggest 3 content ideas
- `'match'` — AI photo matching for assets

**New endpoints to add (when building new modules):**
- `'score'` — content scoring (5 dimensions)
- `'repurpose'` — rewrite for new platform
- `'research'` — competitor/market intelligence (Intelligence Zone)
- `'trends'` — trend intelligence report

**Error handling pattern (use consistently):**
```javascript
try {
  const result = await aiCall('endpoint', body);
  // handle result
} catch(e) {
  if (e.noKey) { setStatus('Add your Anthropic API key in Settings.'); return; }
  setStatus('AI error: ' + e.message);
}
```

---

## Navigation — Final Sidebar Structure

```
── MY OS ──────────────────────────
  ⌂  Command Centre          [OS layer]
  💡 Ideas Bank (OS)         [OS layer]

── AL LAITH HUB ───────────────────
  Dashboard
  Ideas
  Composer
  Library
  Calendar                   [NEW]
  Marketing
  Content Bank
  Shot List
  Settings

── INTELLIGENCE ────────────────────
  🔍 Signal Research          [NEW]
  📈 Trend Watch              [NEW]
  🏁 Competitors              [NEW]
```

Nav items are rendered in `loadNav()` or equivalent function. Add new items in section order.

---

## What's Built vs What's Being Added

**Already built — do not touch unless integrating:**
- Content Creator (6 pillars, AI caption/hook/hashtag generation)
- Content Library / Posts (full CRUD, filter, search)
- Ideas Bank (180 seeded ideas, brief generation, convert to post)
- Marketing Pipeline (kanban: Draft → In Review → Ready → Posted)
- Marketing Pack Export (HTML file + JSON feedback import/export)
- Asset Manager (Google Drive links, AI photo matching)
- Hashtag Studio
- Dashboard (stats, pillar balance, daily target)
- Shot List (40 shoot ideas)
- Settings (API key, import/export)

**Being added — current build phase:**

| Upgrade | Key function to add | Where to insert |
|---|---|---|
| Brand System update | Replace `BRAND_SYSTEM` const | Line ~2764 |
| Brand Voice Engine | `saveBrandVoice()`, voice block prepend | Settings section |
| Content Scorer | `scorePost()`, `renderScorePanel()` | Post detail view |
| Repurpose Engine | `repurposePost()`, repurpose modal | Post detail view |
| Content Calendar | `loadCalendar()`, drag/drop handler | New nav item |
| OS Shell | `loadOS()`, `loadOSIdeas()` | MY OS nav section |
| Live Approval Bridge | `buildReviewURL()`, `parseReviewURL()`, review mode | Marketing section + URL load |
| Intelligence Zone | `loadIntelligence()`, `runResearch()` | INTELLIGENCE nav section |

---

## Build Rules for Each Session

**Before writing any code:**
1. Identify which upgrade this session covers
2. Locate the relevant file landmarks (line numbers above)
3. Check the storage schema — use existing keys where possible, add new ones via `dbGet`/`dbSet`
4. Match the design system — use CSS variables, not hardcoded values

**When writing code:**
- Add CSS at the end of the existing `<style>` block
- Add JS functions before the closing `</script>` tag
- Add nav items in the correct section order
- Add modals before `</body>`
- Always use `setStatus()` for user-facing feedback messages
- Always handle the `noKey` error from AI calls

**When finishing a session:**
- Output the complete updated file (not a diff)
- State clearly which lines were changed and what was added
- Generate a handoff brief if the upgrade is incomplete

---

## Mobile Responsiveness

These modules MUST work on mobile (marketing approvers may use phones):
- Marketing Review Mode (approval bridge)
- Content Calendar

All other modules can be desktop-first. Use the existing responsive patterns in the CSS.

---

## URL Parameter Detection

On app load, check for the `?review=` parameter:

```javascript
window.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('review')) {
    enterMarketingReviewMode(params.get('review'));
    return; // stop normal app init
  }
  // normal app init continues
  initApp();
});
```

Marketing Review Mode replaces the full app UI with a clean review interface — no sidebar, no nav.

---

## Intelligence Zone — Research Modes

The Intelligence Zone runs inside the same app using the same `callClaude()` function. It detects research mode from user input:

| Mode | Trigger phrases | Output |
|---|---|---|
| Company Snapshot | "Research [company]" | Structured company report + SWOT |
| Competitor Intel | "Compare us to [company]" | Al Laith-facing gap report |
| Trend Intelligence | "What trends matter?" | Industry + content trend radar |
| Full Gap Analysis | "Full gap analysis" | All competitors + synthesis |
| Tutorial | "Teach me how to..." | Methodology explanation + tasks |

Default competitor list (hardcoded, user can override):
Byrne Equipment Rental / RSG / GAPS / BRT / Triton / Speedy Gulf

Al Laith baseline sources (hardcoded):
allaith.com / instagram.com/allaithgroup / linkedin.com/company/allaithgroup / facebook.com/allaithgroupME

---

## Common Issues and Fixes

| Issue | Likely cause | Fix |
|---|---|---|
| AI call returning nothing | API key not set in Settings | Check `getSetting('anthropic_api_key')` |
| Storage not persisting | Using `localStorage` directly | Use `dbGet`/`dbSet` wrapper |
| New nav item not showing | Not added to correct nav section | Check nav render function |
| Modal not closing | Missing `onclick` on overlay | Add `onclick="if(event.target===this)closeModal()"` |
| Content not updating after save | State not refreshed | Call the relevant `load[Section]()` function after save |
| Review URL too long | Too many posts encoded | Limit to 10 posts per review batch |
