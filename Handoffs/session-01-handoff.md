# Al Laith Business OS — Session Handoff
## Sessions 0 + 1a Complete · Next: Phase 1b

> **CLAUDE — READ THIS FIRST IN EVERY NEW SESSION.**
> This document is the single source of truth for the Al Laith Business OS build.
> Before touching any file, read this top to bottom. Do not guess what's been done.

---

## 1. What This Project Is

A modular, static-HTML operating system for **Al Laith Group** — UAE/GCC equipment rental, scaffolding, and events company. Six zone apps connected by a shared layer (CSS, JS, localStorage), launched from a central Command Centre shell. No frameworks, no build step, no server required. Files open directly in the browser.

**User:** Janu (janu.neveling@allaith.com) — content and marketing lead at Al Laith.

---

## 2. Folder Map (Desktop → Al Laith OS)

```
Al Laith OS/
├── Apps/
│   ├── os-shell.html          ← Command Centre (Phase 0 ✅)
│   └── zone1-content.html     ← Content Hub (Phase 1a ✅, 1b–1g pending)
├── Shared/
│   ├── design-system.css      ← 97 CSS tokens, full component library (Phase 0 ✅)
│   ├── storage-schema.js      ← localStorage layer, window.AlLaithOS (Phase 0 ✅)
│   └── brand-voice.js         ← AI brand engine, window.AlLaithAI (Phase 0 ✅)
├── Prompts/
│   ├── full-os-scope.md       ← Full system vision — READ before any new zone
│   ├── al-laith-master-build-prompt.md ← Zone 1 upgrade instructions
│   ├── al-laith-brand-voice-context.md ← Authoritative brand voice source
│   └── al-laith-voice-tone-guide.md
├── Sessions/
│   ├── build-tracker.md       ← Live build status — update after every session
│   └── handoffs/              ← (older, now superseded by Handoffs/ at root)
├── Handoffs/
│   └── session-01-handoff.md  ← THIS FILE
├── reference/
│   ├── al-laith-context-block.md
│   ├── brand-assets-spec.md
│   ├── graphic-context.md
│   └── hub-project-context.md
└── README.md
```

---

## 3. Design System

`os-shell.html` uses **inline CSS** (the design handoff was applied directly). It does NOT import design-system.css. All other zone files WILL import it.

**os-shell.html design tokens (inline):**
- Background: `#060D1A`
- Surface: `#0C1729`
- Blue accent: `#5B9BFF` / `#82B5FF`
- Fonts: DM Sans (body) + JetBrains Mono (labels, stats, mono)
- Dotted grid background via `body::before` + radial blue glow from top

**design-system.css tokens (for all zone files):**
- Background: `--paper: #F2F6FA` (light editorial theme)
- Brand: `--navy: #0C172C`, `--blue: #0071B7`, `--blue-2: #329FCD`
- Fonts: Manrope (body) + Fraunces (serif headings) + JetBrains Mono

---

## 4. Shared Layer — Public APIs

### `window.AlLaithOS` (storage-schema.js)
```javascript
AlLaithOS.zone1.posts.getAll()          // all posts
AlLaithOS.zone1.posts.save(item)        // save/update a post
AlLaithOS.zone1.posts.delete(id)
AlLaithOS.zone1.posts.getByStatus(s)    // 'idea'|'draft'|'ready_to_post'|'posted'
AlLaithOS.zone1.posts.getThisWeek()
AlLaithOS.zone1.writeStats()            // pushes stats to os:stats for the shell
AlLaithOS.getOsStats()                  // all zone stats (shell reads this)
AlLaithOS.debug.storageUsed()
AlLaithOS.debug.clearZone(n)
AlLaithOS.debug.inspect()
// uid() generator: `${prefix}_${Date.now()}_${random}`
// localStorage keys: os:z1:posts, os:z1:ideas, os:z2:jobs, os:z3:resources,
//                    os:z3:topics, os:z4:reports, os:z4:competitors, os:stats
```

### `window.AlLaithAI` (brand-voice.js)
```javascript
AlLaithAI.setKey('sk-ant-...')          // activate live AI (memory only, not stored)
AlLaithAI.isLive()                      // true if key set
AlLaithAI.generate({ type, context, systemContext, options })
// types: 'instagram' | 'linkedin' | 'facebook' | 'blog' | 'reel' |
//        'caption' | 'hooks' | 'hashtags' | 'scorer' | 'repurpose' | 'intelligence'
AlLaithAI.quick.instagram(ctx)          // convenience wrappers
AlLaithAI.quick.linkedin(ctx)
AlLaithAI.quick.score(ctx)
AlLaithAI.quick.repurpose(ctx)
AlLaithAI.addVoiceExample(text, platform)   // teach AI real post voice
AlLaithAI.clearVoiceExamples()
AlLaithAI.getSystemPrompt()             // full brand prompt + voice examples
AlLaithAI.CORE_BRAND_PROMPT            // the authoritative brand voice string
AlLaithAI.inspectPrompt(type, ctx)      // dev console helper
AlLaithAI.CONFIG                        // { apiKey, model, maxTokens, apiUrl }
// Stub-first: returns realistic Al Laith stubs with no key.
// Activate via AlLaithAI.setKey('sk-ant-...')
// Model: claude-sonnet-4-20250514 (set in CONFIG)
```

---

## 5. os-shell.html — What It Does

- Hero: greeting left + live clock right
- Stat strip: 4 cards (posts this week, ideas in bank, in-flight, streak)
- Quick-add: capture ideas/jobs/resources/competitors directly from shell
- Zone cards: 6 zones, SVG icons, `live`/`build`/`off` pill states
- Attention panel: numbered markers, "02 ITEMS" mono counter
- Zone 1 live check: `fetch('http://localhost:3000/api/posts?limit=1', { signal: AbortSignal.timeout(2500) })` every 30s — shows offline gracefully
- Scripts: `../Shared/storage-schema.js` + `../Shared/brand-voice.js` (NO CSS import)

---

## 6. zone1-content.html — Current State (Phase 1a complete)

**What exists:**
- Full Content Hub app: Dashboard, Idea Board, Composer, Calendar (basic), Content Bank (asset library), Series, Production Pipeline, Shot List, Settings, For Marketing (approval pack generator)
- Sidebar navigation, topbar, modal system, AI caption/hook/hashtag/idea generation
- Vision asset matching (Claude vision API)
- localStorage: `hub_posts`, `hub_series`, `hub_settings`, `hub_marketing`, `hub_assets`, `hub_voice_examples`

**Phase 1a changes made:**
1. Added `<script src="../Shared/storage-schema.js"></script>` and `<script src="../Shared/brand-voice.js"></script>` before the main `<script>` tag
2. Replaced `BRAND_SYSTEM` const (short summary) → `getBrandSystem()` function that returns `AlLaithAI.getSystemPrompt()` — the full 600-word authoritative brand voice + any voice training examples
3. Updated `callClaude(userPrompt)` to use `AlLaithAI.CONFIG.apiKey` (with localStorage fallback) and `getBrandSystem()` as system prompt
4. `saveApiKey()` now also calls `AlLaithAI.setKey(key)`
5. `clearApiKey()` now also calls `AlLaithAI.setKey('')`
6. `loadSettings()` now syncs AlLaithAI on open + calls `loadVoiceTrainingUI()`
7. `DOMContentLoaded` initialises AlLaithAI with stored key + calls `_loadVoiceExamplesIntoEngine()`
8. **Voice Training card** added to Settings page (full-width below the two columns):
   - Textarea to paste real posts
   - Platform selector (Instagram / LinkedIn / Facebook / General)
   - "Add Example" button → saves to `hub_voice_examples` localStorage + pushes to AlLaithAI immediately
   - Example list with date, platform pill, × to remove
   - Counter showing examples loaded (green if any)
   - "Clear All" button
   - On every page load, all saved examples are fed back into `AlLaithAI.addVoiceExample()`

**Key functions in zone1-content.html:**
- `callClaude(userPrompt)` — central AI call (all features route through this)
- `getBrandSystem()` — returns `AlLaithAI.getSystemPrompt()` or fallback
- `apiAI(endpoint, body)` — routes caption/hooks/hashtags/idea/match endpoints
- `saveApiKey()` / `clearApiKey()` / `loadSettings()` — key management
- `addVoiceTrainingExample()` / `removeVoiceExample(i)` / `clearAllVoiceExamples()` — voice training
- `loadVoiceTrainingUI()` — renders the voice examples list
- `_loadVoiceExamplesIntoEngine()` — feeds localStorage examples into AlLaithAI on boot

---

## 7. Architecture Rules (NEVER break these)

1. **No frameworks, no build step.** Pure HTML/CSS/JS. Files open directly in browser.
2. **zone1-content.html is upgraded in place** — never rebuilt from scratch. Only add/extend.
3. **Shared layer is the source of truth** — brand voice, storage schema, design tokens live in `Shared/`. Zones import from there.
4. **Stub-first AI** — everything works without an API key. `AlLaithAI.setKey('sk-ant-...')` activates live mode. No key should ever be hardcoded.
5. **localStorage keys are namespaced** — `os:z1:*` (AlLaithOS), `hub_*` (zone1 internal). Do not mix.
6. **Zone 1 uses localhost:3000** — existing hub-app Express/SQLite server. Don't change this until GitHub/Railway deployment later.
7. **os-shell.html CSS is fully inline** — it does NOT import design-system.css. All other zones DO import it.
8. **Script import order in zone files:** storage-schema.js → brand-voice.js → zone's own `<script>` block.

---

## 8. Al Laith Brand Voice — Key Rules

Source: `Prompts/al-laith-brand-voice-context.md` and `Shared/brand-voice.js`

**Voice in one sentence:** Confident without arrogance. Warm without being casual. Professional without being corporate.

**Always:** Specific (real numbers, locations, timeframes). Evidence-first pride. Direct — every sentence earns its place. Safety shown in practice.

**Never:** "world-class", "pleased/excited to announce", "synergy", "cutting-edge", "state-of-the-art", "leverage" (as verb), "solutions" (standalone), "seamlessly" (overused), "empower", "transformative", "unlock" (metaphor), "journey" (metaphor), "passion/passionate".

**"Whatever it takes"** — used ONLY when the post genuinely demonstrates real challenge + deadline + complexity. Not as filler.

**Six pillars:** Sectors · Products · Messaging · Community · Interactive · Training

**Platforms:** LinkedIn = more formal. Instagram = more human. Facebook = warm/community.

---

## 9. What's Next — Phase 1b

**Task:** Content Scorer — 5-dimension AI scoring for any saved post in zone1-content.html.

**5 dimensions to score:**
1. Hook strength (does it stop the scroll?)
2. Clarity (is the message obvious?)
3. CTA (is there a clear next action?)
4. Platform fit (right length/format for the platform?)
5. Brand voice (does it sound like Al Laith?)

**Expected UX:** A "Score this post" button in the Composer and/or Content Bank. Clicking it calls `AlLaithAI.quick.score({post: caption})`, returns JSON scores (0–10 per dimension), renders a visual scorecard with a weakest dimension callout and a one-line fix suggestion. Should persist the score on the post object.

**The scorer prompt is already built in brand-voice.js** (`PROMPTS.scorer`) — just needs the UI and wiring.

---

## 10. Full Phase Plan (for reference)

| Phase | Session | Task | File | Status |
|---|---|---|---|---|
| 0 | 0a | design-system.css | Shared/ | ✅ |
| 0 | 0b | storage-schema.js + brand-voice.js | Shared/ | ✅ |
| 0 | 0c | os-shell.html Command Centre | Apps/ | ✅ |
| 1 | 1a | Brand Voice Engine | zone1-content.html | ✅ |
| 1 | 1b | Content Scorer | zone1-content.html | 🔲 |
| 1 | 1c | Repurpose Engine | zone1-content.html | 🔲 |
| 1 | 1d | Content Calendar | zone1-content.html | 🔲 |
| 1 | 1e | OS Shell integration | zone1-content.html | 🔲 |
| 1 | 1f | Live Approval Bridge | zone1-content.html | 🔲 |
| 1 | 1g | Intelligence Zone screens | zone1-content.html | 🔲 |
| 2 | 2a | Zone 4 shell + Signal Research | zone4-intelligence.html | 🔲 |
| 2 | 2b | Trend Watch + auto-generation | zone4-intelligence.html | 🔲 |
| 2 | 2c | Competitor Watchlist + gap analysis | zone4-intelligence.html | 🔲 |
| 3 | 3a | Job Logger | zone2-projects.html | 🔲 |
| 3 | 3b | Case Study Builder | zone2-projects.html | 🔲 |
| 3 | 3c | Events Workspace | zone2-projects.html | 🔲 |
| 3 | 3d | Project Archive + Proposal Generator | zone2-projects.html | 🔲 |
| 4 | 4a | Ask & Learn (Claude Tutor) | zone3-learning.html | 🔲 |
| 4 | 4b | Resource Library | zone3-learning.html | 🔲 |
| 4 | 4c | Topic Tracker | zone3-learning.html | 🔲 |
| 4 | 4d | Strategy Builder | zone3-learning.html | 🔲 |
| 4 | 4e | Growth Journal | zone3-learning.html | 🔲 |
| 5 | 5a | Canvas + node rendering (D3.js) | zone5-knowledge.html | 🔲 |
| 5 | 5b | Edge creation + relationship labels | zone5-knowledge.html | 🔲 |
| 5 | 5c | Seed nodes + Zone 3 integration | zone5-knowledge.html | 🔲 |
| 5 | 5d | Search + cluster colouring | zone5-knowledge.html | 🔲 |
| 6 | 6a | Content Output + Goal Tracker | zone6-pulse.html | 🔲 |
| 6 | 6b | Streak system + Weekly Digest | zone6-pulse.html | 🔲 |
| 6 | 6c | Batch Creator | zone6-pulse.html | 🔲 |

---

## 11. Session Rules (Janu's preferences)

- **Always ask at least one clarifying question before starting any task** — even if you think it's obvious.
- **Functionality and interface are equally important** — it must look good AND work.
- **Work in `Al Laith OS/` on the Desktop** — never use the `Content Creation (1)` folder for this project.
- **Read relevant files before starting** — don't guess at existing code structure.
- **Update `Sessions/build-tracker.md`** after every completed session/task.
- **Keep the Apps folder clean** — only real, current files.

---

## 12. How to Start a New Session

1. Read this file (Handoffs/session-01-handoff.md)
2. Read `Sessions/build-tracker.md` to confirm current status
3. Ask Janu one question to confirm the task and any preferences before starting
4. Read the relevant zone file before making changes (never work blind)
5. Make changes, test logic, update build-tracker.md
6. Update this handoff (or create a new one in Handoffs/) before ending the session

---

*Last updated: 13 May 2026 — end of Session 1 (Phases 0 + 1a complete)*
