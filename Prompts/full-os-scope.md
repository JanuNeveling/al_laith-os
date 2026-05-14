# Al Laith Business OS — Full Project Scope
## Cowork Master Awareness Document
## Read this before any build session

---

## WHAT THIS PROJECT IS

The Al Laith Business OS is a modular, multi-file web application system built for Al Laith Group — a UAE/GCC equipment rental, scaffolding, and events infrastructure company. It serves one primary content creator and 1–2 marketing approvers.

This is not a single app. It is an **OS architecture** — a Command Centre shell that connects independent zone applications, all sharing the same data layer, design system, and AI integration.

**The entry point is always `os-shell.html` — the Command Centre.**
Every zone is a separate HTML file that opens from the shell.

---

## ARCHITECTURE — OS SHELL + ZONE APPS

```
os-shell.html                  ← THE ENTRY POINT. Command Centre. Links to all zones.
│
├── zone1-content.html         ← EXISTING APP (Al Laith Content Hub) — Zone 1
├── zone2-projects.html        ← To build
├── zone3-learning.html        ← To build
├── zone4-intelligence.html    ← To build
├── zone5-knowledge.html       ← To build (Obsidian-style Knowledge Graph)
├── zone6-pulse.html           ← To build
│
└── shared/
    ├── design-system.css      ← Single source of truth for all visual styles
    ├── storage-schema.js      ← All localStorage key definitions + dbGet/dbSet
    ├── brand-voice.js         ← BRAND_SYSTEM const + callClaude() function
    └── al-laith-context.js    ← Company context, competitor list, baseline URLs
```

**Why this architecture:**
- Each zone file stays under 2,000 lines — buildable in one focused session
- One zone breaks, others keep working
- Shared layer means design and data stay consistent across all zones
- Zone 5 (Knowledge Graph) is a specialist interactive app that cannot exist in a monolith
- When ready to move to a real backend: swap `storage-schema.js` only — nothing else changes

---

## THE COMMAND CENTRE — os-shell.html

The OS Shell is a thin dashboard that:
- Is the single entry point — the user opens this, not individual zone files
- Shows live stats pulled from all zones via shared localStorage
- Provides navigation cards/links to each zone
- Shows a unified activity feed (recent actions across all zones)
- Has a Quick Add bar (idea, job, note — routes to the right zone)
- Shows "Needs attention" alerts (posts awaiting approval, changes requested, goals behind)
- Has the theme toggle (dark/light) that applies globally via a localStorage flag

The shell does NOT duplicate zone functionality. It reads and surfaces. Zones do the work.

---

## THE SHARED LAYER — shared/

### design-system.css
Every zone imports this. Contains all CSS variables, font imports, sidebar styles, card patterns, button styles, badge styles, toast styles. No zone defines its own colours or fonts — they all use this file.

```css
/* Core brand */
--navy:   #0C172C;   --navy-2: #183057;
--blue:   #0071B7;   --blue-2: #329FCD;   --sky: #63CFEE;
--paper:  #F2F6FA;   --ink:    #0C172C;   --mute: #6B7891;
--rule:   #D9E3EF;

/* Zone accent colours */
--zone1:  #0071B7;   /* Content — blue */
--zone2:  #F59E0B;   /* Projects — amber */
--zone3:  #10B981;   /* Learning — emerald */
--zone4:  #EC4899;   /* Intelligence — pink */
--zone5:  #8B5CF6;   /* Knowledge — violet */
--zone6:  #06B6D4;   /* Pulse — cyan */

/* Pillars */
--p-sectors: #0071B7; --p-products: #329FCD; --p-messaging: #183057;
--p-community: #63CFEE; --p-interactive: #0082AF; --p-training: #72747E;

/* Fonts: Manrope (primary), Fraunces (display), JetBrains Mono (mono) */
/* Sidebar: 248px. Radius: 14px cards, 10px small. */
```

### storage-schema.js
All localStorage key definitions. Every zone reads/writes through `dbGet()` and `dbSet()`:

```javascript
function dbGet(key) { return JSON.parse(localStorage.getItem(key) || 'null'); }
function dbSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
// FUTURE: swap only these two functions for Supabase — nothing else changes

/* KEY NAMESPACE — all zones use these exact keys */

// OS Shell
'os_settings'              // {theme, lastZone, goals:{}}
'os_activity_feed'         // [{timestamp, zone, action, label}] — last 50

// Zone 1 — Content (existing keys — do not change)
'al_laith_posts'           // post objects array
'al_laith_ideas'           // ideas array
'al_laith_assets'          // assets array
'al_laith_settings'        // {api_key, daily_target, brand_voice_posts:[]}
'al_laith_series'          // series array
'al_laith_mkt_' + postId   // per-post marketing metadata

// Zone 2 — Projects
'z2_jobs'                  // [{id, title, sector, location, date, status, assets:[]}]
'z2_case_studies'          // [{id, jobId, blog, structured_doc, social_batch, status}]
'z2_events'                // [{id, name, date, brief, content_plan, assets:[]}]
'z2_proposals'             // [{id, title, client, jobIds:[], content, status}]

// Zone 3 — Learning
'z3_topics'                // [{id, name, category, status, notes, linkedNodes:[]}]
'z3_resources'             // [{id, url, title, summary, tags:[], savedAt}]
'z3_journal'               // [{id, date, entry, aiReflection, linkedTopics:[]}]
'z3_chat_history'          // [{role, content}] — persisted tutor conversations

// Zone 4 — Intelligence
'z4_research_sessions'     // [{id, company, mode, report, date}]
'z4_competitor_notes'      // {companyName: {lastResearched, summary, watchFlags:[]}}
'z4_trend_reports'         // [{id, date, industryTrends:[], contentTrends:[], radar:[]}]
'z4_brand_voice_profile'   // {samplePosts:[], profileSummary:'', lastUpdated}

// Zone 5 — Knowledge Graph
'z5_nodes'                 // [{id, label, category, content, links:[nodeId], position:{x,y}}]
'z5_edges'                 // [{id, source, target, label, strength}]
'z5_graph_settings'        // {layout, zoom, centerNode}

// Zone 6 — Pulse
'z6_goals'                 // [{id, platform, target, period, current}]
'z6_streaks'               // {platform: {current, longest, lastPost}}
'z6_digests'               // [{id, week, summary, ideas:[], suggestions:[]}]
```

### brand-voice.js
Single source of the BRAND_SYSTEM const and callClaude() function. Every zone imports this.

```javascript
const BRAND_SYSTEM = `[Full Al Laith brand voice rules — see al-laith-brand-voice-context.md]`;

async function callClaude(userPrompt, maxTokens = 1024) {
  const settings = dbGet('al_laith_settings') || {};
  const key = settings.anthropic_api_key || '';
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
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: BRAND_SYSTEM,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });
  const data = await resp.json();
  if (data.error) throw new Error(data.error.message);
  return data.content[0].text;
}
```

---

## ZONE 1 — CONTENT ENGINE
**File:** `zone1-content.html` (the existing Al Laith Content Hub app)
**Status:** ~70% built. Needs 7 upgrades (see `al-laith-master-build-prompt.md`)

**What's built:**
Content Creator (6 pillars) / Content Library / Ideas Bank (180 ideas) / Marketing Pipeline /
Marketing Pack Export / Feedback Import / Asset Manager / Hashtag Studio / Dashboard / Shot List / Settings

**What's being added (see master build prompt for full spec):**
1. Live Approval Bridge (URL-encoded, no backend)
2. Content Calendar (drag/drop scheduling)
3. Repurpose Engine
4. Content Scorer (5-dimension AI)
5. Brand Voice Engine (trainable)
6. OS Shell integration (stats exposed to shell via shared storage)
7. Intelligence Zone screens (Signal Research, Trend Watch, Competitors)

---

## ZONE 2 — PROJECTS & CASE STUDIES
**File:** `zone2-projects.html`
**Status:** Not started

**Modules:**

**Job Logger**
Log a completed or active job. Fields: job name, sector (construction/events/oil&gas/aviation/other), location, client type, equipment used, team size, duration, conditions (heat/overnight/tight timeline/Ramadan), photos (Google Drive links), notes. On save → auto-triggers Case Study Builder with job data pre-filled.

**Case Study Builder**
Takes job data → generates simultaneously:
- Structured document (Problem / What We Brought / Result — with all specifics)
- Long-form blog article (~800 words, H2 subheadings, SEO-aware, CTA at end)
- Social batch (Instagram, LinkedIn, Facebook — all using job specifics)
All three appear in tabs, fully editable. "Save to Zone 1 Library" pushes social content to `al_laith_posts`.

**Events Workspace**
Per-event deep workspace. Each event has: brief, content plan (linked to Zone 1 Ideas Bank), asset checklist, timeline, notes. Not for quick posts — for planning events that need weeks of content.

**Project Archive**
All completed case studies, searchable by sector, date, location, client type. "Use in proposal" action. Feed for Zone 1 content ideas ("we did X 6 months ago — could be a throwback post").

**Proposal Generator**
Select 2–5 past jobs from the archive → AI drafts a client-facing proposal with relevant case studies embedded. Output as downloadable formatted text ready for a PDF tool.

---

## ZONE 3 — LEARNING HUB
**File:** `zone3-learning.html`
**Status:** Not started

**Modules:**

**Ask & Learn (Claude Tutor)**
Persistent conversation with Claude acting as a marketing tutor. Context: Al Laith's industry, business, and marketing goals. Teaches concepts in plain language with real examples from UAE B2B. Conversation history persists via `z3_chat_history`. Topics: SEO, paid ads, brand positioning, content strategy, LinkedIn algorithms, email marketing, GCC market dynamics.

**Resource Library**
Save articles, links, videos. On save: Claude auto-summarises in 3 sentences and suggests topic tags. Filter by tag. Mark as "read", "revisit", "shared with team". Full-text search across all summaries.

**Topic Tracker**
Structured learning paths. Pre-loaded topics:
- Content Marketing, SEO Basics, LinkedIn Strategy, Instagram for B2B, Brand Positioning, Paid Advertising, Email Marketing, Analytics & Measurement, Competitor Research, GCC Market Dynamics, Event Marketing, Construction Industry Marketing

Each topic: status (not started / learning / understood), personal notes, linked resources, linked Knowledge Graph nodes (Zone 5). Progress bar across all topics.

**Strategy Builder**
AI generates a 30/60/90-day content strategy based on: current goals (input by user), content output from Zone 1 (reads `al_laith_posts`), platform mix, recent trends from Zone 4. Output: structured plan with weekly focus areas, platform priorities, content type mix, and 10 specific post ideas.

**Growth Journal**
Daily/weekly log. Freeform entry + optional prompts ("What worked this week?", "What did you learn?", "What would you do differently?"). AI reflects on each entry and connects it to a marketing concept or Zone 5 knowledge node. Over time, builds a personal record of marketing growth.

---

## ZONE 4 — INTELLIGENCE
**File:** `zone4-intelligence.html`
**Status:** Partially specified (see `company-signal-researcher-v2.md`)

**Modules:**

**Signal Research**
Five research modes (see Signal Researcher prompt for full spec):
- Company Snapshot, Competitor Intelligence Report, Trend Intelligence, Full Gap Analysis, Tutorial/Teach Me
Al Laith baseline sources hardcoded. Default competitor list: Byrne, RSG, GAPS, BRT, Triton, Speedy Gulf.
Every output includes: "How I researched this" + "Try this now" learning prompt.

**Trend Watch**
Auto-generates a dual trend report (industry + content/marketing) on first open each week.
Shows: Top 5 industry trends, Top 5 content trends, Trend Radar table (relevance + time horizon).
Archives past reports with dates. "Refresh" button for on-demand update.

**Competitor Watchlist**
Cards for each tracked competitor. Shows: last researched date, quick summary, platform activity signal (active/quiet/unknown). "Research now" button → runs Mode 1 or Mode 2. "Full gap analysis" button → runs Mode 4 across all.

**Brand Voice Engine**
Paste real Al Laith posts (best performing or most authentic). System learns the voice pattern. Generates a "voice profile" summary. Prepends voice examples to all content generation calls across Zone 1. The more posts saved, the more accurate the voice matching.

**Content Scorer**
Score any piece of content: hook strength, clarity, CTA strength, platform fit, brand voice — each 0–100. Shows weakest dimension with one improvement tip. Can score any post from Zone 1 library directly.

---

## ZONE 5 — KNOWLEDGE GRAPH
**File:** `zone5-knowledge.html`
**Status:** Not started. Specialist app — cannot be part of a monolith.

**What it is:**
An Obsidian-style interactive knowledge graph for marketing concepts. Visual nodes connected by relationships. The user builds their marketing knowledge map over time — starting from the pre-loaded topic skeleton and expanding as they learn.

**Core behaviour:**
- Canvas with draggable, zoomable node graph (D3.js or similar)
- Each node: a marketing concept, resource, or insight
- Edges: relationships between concepts ("SEO → affects → Content Strategy", "Brand Voice → connects to → Audience Targeting")
- Click a node → expand detail panel (notes, linked resources, linked Zone 3 topics)
- Double-click blank canvas → create new node
- Drag between nodes → create edge (relationship), label it
- Pre-loaded seed nodes: the Zone 3 topic list as starting nodes, connected in a basic marketing concept map
- "Add from Zone 3" — any Zone 3 topic or resource can be added as a node in one click
- "Add from Zone 4" — any trend or competitor insight can become a node
- Search bar → highlights matching nodes, dims others
- Clusters automatically colour-coded by category (Strategy / Platforms / Audience / Brand / Analytics)

**Why it's a separate file:**
The Knowledge Graph requires a canvas-based rendering engine (D3 or similar). It has its own interaction model completely unlike the rest of the OS. Its storage is a graph data structure, not a list. It would double the complexity of any file it lived in.

---

## ZONE 6 — BUSINESS PULSE
**File:** `zone6-pulse.html`
**Status:** Not started

**Modules:**

**Content Output Tracker**
Visual breakdown of content created over time. By platform, by pillar, by week/month. Trend line showing output consistency. Sourced from `al_laith_posts` in Zone 1.

**Idea-to-Post Pipeline**
Visual kanban across all zones: Idea (Zone 1) → Draft → In Review → Ready → Posted. Shows where content is getting stuck. Drag to move status. Links directly to the post in Zone 1.

**Goal & Streak Tracker**
Set goals: "3x LinkedIn posts per week", "1 blog per month", "5 Instagram posts per week". Tracks actual vs target. Shows streak for each platform. Sends a visual "nudge" when behind. Streak data persists via `z6_streaks`.

**Weekly AI Digest**
Generated every Monday (or on demand). Reads last week's activity across all zones and produces: what was created, what goals were met, what slipped, 3 new content ideas based on recent jobs in Zone 2, 1 learning suggestion based on Zone 3 gaps. Archived with date in `z6_digests`.

**Batch Creator**
Generate a full month of content in one session. User sets: platforms, posting frequency, content mix (% per pillar). AI generates: 30-day idea list → user approves/edits each → all pushed to Zone 1 Library as drafts with schedule dates populated.

---

## FULL FOLDER STRUCTURE

```
📁 Al Laith OS — Cowork Project
│
├── 📄 README.md                          ← Start here. Project overview + session order.
│
├── 🌐 APPS
│   ├── os-shell.html                     ← Command Centre (build first after shared layer)
│   ├── zone1-content.html                ← Existing app. Rename from OPEN_THIS_-_...html
│   ├── zone2-projects.html               ← To build
│   ← zone3-learning.html                ← To build
│   ├── zone4-intelligence.html           ← To build
│   ├── zone5-knowledge.html              ← To build (specialist — D3 graph)
│   └── zone6-pulse.html                  ← To build
│
├── 📁 shared/
│   ├── design-system.css                 ← All CSS variables, fonts, component styles
│   ├── storage-schema.js                 ← dbGet/dbSet + all key definitions
│   ├── brand-voice.js                    ← BRAND_SYSTEM + callClaude()
│   └── al-laith-context.js               ← Company info, competitors, baseline URLs
│
├── 📁 prompts/
│   ├── al-laith-master-build-prompt.md   ← Zone 1 upgrade instructions (current build)
│   ├── full-os-scope.md                  ← THIS FILE — full system vision
│   ├── brand-voice-context.md            ← Full brand voice reference
│   └── signal-researcher-v2.md           ← Zone 4 intelligence spec
│
├── 📁 skills/
│   ├── lean-context/SKILL.md             ← Token efficiency + session management
│   ├── content-creator/SKILL.md          ← Content generation rules
│   ├── content-web-app/SKILL.md          ← App build rules + architecture
│   ├── prompt-engineer/SKILL.md          ← Prompt writing patterns
│   └── session-manager/SKILL.md          ← Multi-session project continuity
│
├── 📁 sessions/
│   ├── build-tracker.md                  ← Master progress tracker (update after each session)
│   ├── decisions.md                      ← Architectural decisions log
│   └── handoffs/
│       ├── session-01-handoff.md         ← Generated at end of each session
│       ├── session-02-handoff.md
│       └── ...
│
└── 📁 reference/
    ├── zone-data-flows.md                ← How data moves between zones
    ├── api-endpoints.md                  ← All AI call patterns
    └── design-tokens.md                 ← Visual design reference
```

---

## BUILD ORDER — RECOMMENDED SESSION SEQUENCE

Work in this order. Each session = one item. Do not combine sessions.

```
Phase 0 — Foundation (do this before any zone work)
  Session 0a: Create shared/design-system.css (extract from zone1 + add zone accents)
  Session 0b: Create shared/storage-schema.js + shared/brand-voice.js
  Session 0c: Build os-shell.html (Command Centre — reads from all zones, links to all)

Phase 1 — Complete Zone 1 (existing app upgrades)
  Session 1a: Brand System replacement + Brand Voice Engine
  Session 1b: Content Scorer
  Session 1c: Repurpose Engine
  Session 1d: Content Calendar
  Session 1e: OS Shell integration (expose stats to shared storage)
  Session 1f: Live Approval Bridge
  Session 1g: Intelligence Zone screens

Phase 2 — Zone 4 Intelligence (high value, builds on existing Signal Researcher work)
  Session 2a: Zone 4 shell + Signal Research screen
  Session 2b: Trend Watch screen + auto-generation
  Session 2c: Competitor Watchlist + full gap analysis trigger

Phase 3 — Zone 2 Projects
  Session 3a: Job Logger
  Session 3b: Case Study Builder
  Session 3c: Events Workspace
  Session 3d: Project Archive + Proposal Generator

Phase 4 — Zone 3 Learning Hub
  Session 4a: Ask & Learn (Claude Tutor with persistent history)
  Session 4b: Resource Library + auto-summarise
  Session 4c: Topic Tracker + progress
  Session 4d: Strategy Builder
  Session 4e: Growth Journal

Phase 5 — Zone 5 Knowledge Graph (most complex — dedicated sessions)
  Session 5a: Canvas setup + node rendering (D3)
  Session 5b: Edge creation + relationship labelling
  Session 5c: Pre-loaded seed nodes + Zone 3 integration
  Session 5d: Search + cluster colouring + Zone 4 integration

Phase 6 — Zone 6 Pulse
  Session 6a: Content Output Tracker + Goal Tracker
  Session 6b: Streak system + Weekly Digest
  Session 6c: Batch Creator
```

---

## HOW TO START EACH SESSION

Every Cowork session starts with this exact pattern:

```
Read full-os-scope.md and build-tracker.md from the prompts/ and sessions/ folders.
Today's session: [Session ID — e.g. "1b: Content Scorer"].
Source file: [filename] in the APPS/ folder.
Do this session only. When complete, output the updated file and generate a handoff brief.
```

---

## FUTURE-PROOFING NOTES (embedded in code comments)

Add these comments at the relevant points in every zone file:

```javascript
// FUTURE: Replace localStorage via dbGet/dbSet with Supabase client — shared/storage-schema.js only
// FUTURE: Add user auth layer — creator vs approver roles, admin view
// FUTURE: Zone 5 Knowledge Graph to sync nodes with Notion or Obsidian API
// FUTURE: Batch Creator (Zone 6) to integrate with Buffer/Later for direct scheduling
// FUTURE: os-shell.html to become a PWA (Progressive Web App) for mobile home screen install
```

---

## DATA FLOWS BETWEEN ZONES

```
Zone 1 → OS Shell:    post counts, pipeline status, ideas count, content this week
Zone 2 → Zone 1:      case study social batch → saves to al_laith_posts as drafts
Zone 2 → OS Shell:    active jobs count, case studies completed
Zone 3 → Zone 5:      topics become knowledge graph seed nodes
Zone 3 → Zone 1:      Strategy Builder outputs → content ideas → Ideas Bank
Zone 4 → Zone 1:      Brand Voice Engine → prepends to all caption generation
Zone 4 → Zone 5:      Trend insights + competitor findings → knowledge nodes
Zone 4 → OS Shell:    last research date, active competitor alerts
Zone 5 → Zone 3:      Clicking a node opens the linked Zone 3 topic
Zone 6 → OS Shell:    goal progress, streaks, digest summary
Zone 6 → Zone 1:      Batch Creator output → drafts in al_laith_posts with schedule dates
```

---

## WHAT COWORK NEEDS TO KNOW — SUMMARY

1. **This is a multi-file OS, not a single app.** The existing HTML file becomes zone1-content.html. Everything else is a new file.

2. **The shared/ folder is built first.** Every zone imports from it. Don't duplicate CSS variables or callClaude() across zone files.

3. **One session = one module or one zone file.** Never build across zone files in a single session.

4. **The existing app (zone1-content.html) is extended, not rebuilt.** All 7 upgrades add to it. They don't replace it.

5. **The Knowledge Graph (Zone 5) requires D3.js** loaded from cdnjs.cloudflare.com. It is the only zone with an external library dependency beyond what zone1 already uses.

6. **All storage goes through dbGet/dbSet in shared/storage-schema.js.** Never localStorage directly. Never window.storage (that's for Claude artifacts, not these HTML files).

7. **The brand voice const lives in shared/brand-voice.js.** Every zone that calls Claude imports it. It is never duplicated.
