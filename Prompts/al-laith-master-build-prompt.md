# Al Laith — Master Build Prompt
## Cowork Project Instruction File — Read This First

---

## HOW TO USE THIS FILE

This is the single master instruction file for the Al Laith Business OS project. It combines three things:

1. **The App Upgrade Prompt** — what to build and how to extend the existing Al Laith Content Hub
2. **The Signal Researcher** — a competitor and market intelligence system to integrate into the OS
3. **The Brand Voice Context** — the tone, rules, and language standards for all AI-generated content

When working on any task in this project, read all three sections before touching any file. They are not independent — the brand voice applies to everything the app generates, the signal researcher is a module inside the OS, and the upgrade instructions tell you exactly where and how to add things without breaking what exists.

The source file is: `OPEN_THIS_-_Al_Laith_Content_Hub.html`
Do not rebuild it. Extend it.

---

---

# PART 1 — APP UPGRADE INSTRUCTIONS

---

## CONTEXT

You are extending an existing, fully working HTML application called the Al Laith Content Creation Hub. The file is `OPEN_THIS_-_Al_Laith_Content_Hub.html` — approximately 5,200 lines of vanilla HTML, CSS, and JavaScript in a single file.

This app is used by a Dubai-based equipment rental, scaffolding and events company (Al Laith). One person creates content, 1–2 marketing people review and approve it. The goals of this build phase are:

1. Upgrade the approval workflow from file-based to a live shareable link
2. Add a visual Content Calendar
3. Add a Repurpose Engine
4. Add a Content Scorer
5. Upgrade Brand Voice to be trainable from real post examples
6. Add the Business OS shell (Command Centre + Ideas Bank) as a personal layer
7. Add the Signal Research Intelligence Zone
8. Replace and upgrade the existing BRAND_SYSTEM prompt with the new brand voice context

---

## WHAT ALREADY EXISTS — DO NOT REBUILD

- Content Creator — 6 pillars, platform-specific generation via Anthropic API
- Content Library — full CRUD, filter, search, copy, delete
- Ideas Bank — 180 seeded ideas, brief generation, convert to post
- Marketing Pipeline — kanban: Draft → In Review → Ready → Posted
- Marketing Pack Export — standalone HTML file with approve/reject/feedback, JSON export
- Feedback Import — imports JSON feedback back into the app
- Asset Manager — photos/videos with Google Drive links, AI photo matching
- Hashtag Studio — platform-specific hashtag sets
- Dashboard — stats, pillar balance, daily targets, recent activity
- Shot List — 40 shoot ideas for yard and events
- Settings — API key management, import/export JSON backup

---

## EXISTING STORAGE SCHEMA — MAINTAIN EXACTLY

```javascript
localStorage['al_laith_posts']           // JSON array of post objects
localStorage['al_laith_ideas']           // JSON array
localStorage['al_laith_assets']          // JSON array
localStorage['al_laith_mkt_' + postId]   // {feedback:[], mkt_status:''}
localStorage['al_laith_settings']        // {anthropic_api_key:'', daily_target:5, brand_voice_posts:[]}
localStorage['al_laith_series']          // JSON array

// NEW — add these for OS and Intelligence layers
localStorage['os_ideas_list']            // JSON array of idea IDs
localStorage['os_idea_' + id]            // individual OS idea objects
localStorage['os_settings']             // {theme:'dark'|'light'}
localStorage['intel_research_history']  // JSON array of past research sessions
localStorage['intel_competitor_notes']  // JSON object keyed by company name
```

---

## EXISTING BRAND / DESIGN SYSTEM — PRESERVE EXACTLY

```
Fonts: Manrope (primary), Fraunces (serif/display), JetBrains Mono (mono)

Colours:
--navy:   #0C172C   sidebar background
--navy-2: #183057
--blue:   #0071B7   primary CTA
--blue-2: #329FCD
--sky:    #63CFEE
--paper:  #F2F6FA   page background
--ink:    #0C172C   primary text

Pillar colours:
--p-sectors:     #0071B7
--p-products:    #329FCD
--p-messaging:   #183057
--p-community:   #63CFEE
--p-interactive: #0082AF
--p-training:    #72747E

Sidebar width: 248px
Border radius: 14px (cards), 10px (small)
All new UI must match this design system exactly.
```

---

## EXISTING API — PRESERVE EXACTLY

```javascript
// API key via: getSetting('anthropic_api_key', '')
// All Claude calls via: async function callClaude(prompt, model)
// Existing endpoints in aiCall(): 'caption', 'hooks', 'hashtags', 'idea', 'match'
```

---

## UPGRADE 1 — LIVE APPROVAL BRIDGE

**Problem:** Marketing gets a downloaded HTML file, reviews it, exports JSON, creator imports JSON back. Slow and clunky.

**Solution:** URL-encoded shareable review system. No backend required.

**How it works:**
- "Send to Marketing" encodes selected posts as compressed base64 URL parameter
- Generates URL: `[app-url]?review=BASE64_ENCODED_DATA`
- App loading with `?review=` parameter enters **Marketing Review Mode** automatically
- Marketing sees a clean minimal interface — no sidebar, no app chrome
- Per post: ✅ Approve / 🔴 Request Changes / 💬 Comment textarea
- "Submit Feedback" generates a feedback URL to copy and send back
- Creator pastes feedback URL → posts update automatically
- Keep old HTML export as fallback — do not remove it

**Marketing Review Mode UI:**
- Al Laith logo + "Content Review — [Date]" header
- Each post as a card: caption, platform chip, pillar tag
- Approve / Request Changes buttons + comment box per post
- Submit Feedback button → generates feedback URL
- Must work on mobile

**Creator side:**
- Replace "Generate Marketing Pack" with "Send to Marketing →"
- Modal to select posts and copy the review URL
- New "Import Feedback URL" input alongside old JSON import

---

## UPGRADE 2 — CONTENT CALENDAR

**New sidebar nav item: "Calendar"**

**Behaviour:**
- Monthly grid, Mon–Sun columns, 4–5 week rows
- Posts appear as colour-coded chips by pillar on their `schedule_date`
- Click a day → side panel with all posts that day + quick actions
- Click a post chip → opens existing post detail modal
- Drag and drop between dates (updates `schedule_date`)
- Month navigation: prev/next + "Today" button
- Filter by pillar (colour-coded toggle pills above grid)
- Unscheduled posts in a tray below the grid
- Right-click/tap-hold a day → "Create post for this date" → opens composer with date pre-filled

**Stats bar above calendar:**
- This month: X scheduled / Y posted / Z unscheduled
- Platform icon counts for the month

---

## UPGRADE 3 — REPURPOSE ENGINE

**Add "Repurpose →" button** to the post detail view (alongside Edit/Copy/Delete).

**Opens a panel:**
- Source post shown read-only at top
- Platform selector: excludes platforms already on the post
- Optional "New angle" textarea
- Generate button → editable output below
- "Save as new post" → new draft post, same pillar, links to source ID
- "Replace caption" → updates existing post directly

**AI prompt for repurpose:**
```
Take this existing Al Laith post and rewrite it for [TARGET PLATFORM].
Original caption: [CAPTION]
Pillar: [PILLAR]
[If angle provided]: New angle to explore: [NEW ANGLE]

Apply Al Laith brand voice rules exactly (see BRAND_SYSTEM).
Output only the content itself.
```

---

## UPGRADE 4 — CONTENT SCORER

**"Score" button** on every post card and in the post detail view.

**Score dimensions (each 0–100):**
- Hook strength — does the first line stop the scroll?
- Clarity — is it immediately understandable?
- CTA strength — does it tell the reader what to do?
- Platform fit — right length and tone for this platform?
- Brand voice — sounds like Al Laith (direct, grounded, no fluff)?

**Display:** 5 horizontal score bars, overall average, one improvement tip for the weakest dimension.

**AI prompt:**
```
Score this Al Laith content piece.
Platform: [PLATFORM]
Pillar: [PILLAR]
Caption: [CAPTION]

Score each 0-100. Give one improvement tip for the lowest score.
Respond ONLY with JSON:
{
  "hook": 75,
  "clarity": 82,
  "cta": 60,
  "platform_fit": 88,
  "brand_voice": 79,
  "weakest_tip": "Your CTA is vague — tell them exactly what to do."
}
```

---

## UPGRADE 5 — BRAND VOICE ENGINE

**In Settings, add "Brand Voice" section:**
- Textarea: "Paste your best posts — one per line or separated by ---"
- "Save voice samples" → stores in `settings.brand_voice_posts`
- Shows count: "Voice trained on 8 posts"
- "Clear samples" and "Preview voice profile" buttons

**Integration with generation:**
```javascript
const voiceBlock = brandVoicePosts.length >= 3
  ? `\n\nHere are examples of strong Al Laith content — match this voice exactly:\n---\n${brandVoicePosts.slice(0,5).join('\n---\n')}\n---\n`
  : '';
// Prepend voiceBlock to every caption, repurpose, and scoring call
```

---

## UPGRADE 6 — BUSINESS OS SHELL

**New nav section "MY OS"** above the existing Al Laith section, separated by a divider.

**OS has two sub-views:**

**Command Centre tab:**
- 4 stat cards: OS ideas / content generated / posts in review / posts ready to post
- Recent OS ideas (3 most recent, click to open)
- Quick add bar → saves to OS ideas bank instantly
- "Needs attention" section: posts with `mkt_status = 'changes_requested'` shown as alert cards

**Ideas Bank (OS) tab:**
- Left panel: list of all OS ideas (separate from Al Laith ideas bank)
- Right panel: idea detail + "Generate All" button
- Generates Instagram, LinkedIn, Facebook, Blog, Script simultaneously (parallel fetch)
- Each tab: editable content, Copy / Save to Al Laith Library / Regenerate
- "Save to Al Laith Library" creates a new `al_laith_posts` draft with correct pillar

---

## UPGRADE 7 — BRAND SYSTEM PROMPT REPLACEMENT

**Replace the existing `BRAND_SYSTEM` constant** (currently at approximately line 2764) with this upgraded version that incorporates the full brand voice context:

```javascript
const BRAND_SYSTEM = `You are a content strategist and writer for Al Laith Group — a UAE and GCC-based equipment rental, scaffolding, and events infrastructure company. Al Laith has grown from equipment supplier to full delivery partner, trusted on the region's most demanding projects: championship sporting events, aviation facilities, oil and gas sites, and major construction across the UAE and GCC.

VOICE: Confident without arrogance. Warm without being casual. Professional without being corporate. Grounded in real work. B2B audience — project managers, procurement teams, site supervisors, event directors. These people have seen every supplier claim to be "the best." They respond to evidence and specificity, not boasting.

ALWAYS:
- Be specific: use real numbers, locations, timeframes, conditions whenever available
- Write like someone who has been on the job site, not read about it
- Let pride come through evidence, never claims ("The team had 36 hours — they did it in 28" not "we're the best")
- Acknowledge complexity, then show it was handled
- Use "Whatever it takes" only when the post genuinely earns it — never as filler
- Adjust tone per platform: LinkedIn = more formal and proof-point driven, Instagram = more human and behind-the-scenes, Facebook = warm and community-facing

NEVER:
- Sound arrogant, boastful, or imply superiority over competitors
- Reference or imply competitors negatively in any way
- Be disrespectful toward government, regulation, or official bodies in the UAE or GCC
- Use these banned phrases: "world-class", "pleased to announce", "we are excited to", "synergy", "cutting-edge", "state-of-the-art", "leverage" (as verb), "solutions" (on its own), "best-in-class", "empower", "transformative", "passionate", "excited to share", "proud to partner"
- Sound like generic AI or a consumer lifestyle brand
- Make claims that cannot be backed by a specific detail
- Add preamble or explanation — output only the content itself

CONTENT PILLARS:
Sectors (industries served) | Products (equipment spotlights) | Messaging (brand values) | Community (team culture, BTS) | Interactive (polls, engagement) | Training (safety, certifications)

PLATFORM RULES:
- Instagram: hook line stops the scroll, short paragraphs, hashtags at end only (8–12), never mid-caption
- LinkedIn: hook critical, longer form acceptable when earned, CTA professional not pushy
- Facebook: warm, conversational, engagement questions work well
- Blog: educational, H2 subheadings, genuinely useful, CTA at end
- Script: [VISUAL]/[AUDIO]/[CAPTION] format, written for the ear, 45–90 seconds, first 3 seconds must hook

OUTPUT: Respond with valid JSON only. No markdown. No code blocks. No explanation.`;
```

---

## NAVIGATION — FINAL SIDEBAR ORDER

```
── MY OS ──────────────────────────
  ⌂  Command Centre          [NEW]
  💡 Ideas Bank (OS)         [NEW]

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

---

## TECHNICAL REQUIREMENTS

- Single file output: all changes produce one updated `.html` file
- Backward compatible: existing localStorage data must not break
- No new CDN dependencies beyond what already exists in the app
- All AI calls use existing `callClaude()` and API key from settings
- Model: `claude-sonnet-4-20250514`
- Mobile responsive: Calendar and Marketing Review Mode must work on mobile
- Error handling: every AI call has try/catch using existing `setStatus()` pattern
- URL parameter detection: check `window.location.search` for `?review=` on load
- Future-proof storage via wrapper:

```javascript
function dbGet(key) { return JSON.parse(localStorage.getItem(key) || 'null'); }
function dbSet(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
// FUTURE: swap these two functions for Supabase/Firebase — nothing else changes
```

---

## FILE LANDMARKS FOR EDITING

- CSS: lines ~10–800 (inside `<style>` block)
- Global JS / storage helpers / nav: lines ~800–1200
- Page render functions: lines ~1200–2800
- BRAND_SYSTEM + callClaude + aiCall: lines ~2761–2885
- Marketing pack generator: lines ~5050–5165
- Modals: lines ~5165–5271

Add new CSS to existing `<style>` block. Add new JS before closing `</script>`. Add new nav items to existing `<nav>` HTML. Add new modal HTML before `</body>`. Do not reorganise the file structure.

---

---

# PART 2 — SIGNAL RESEARCHER (INTELLIGENCE ZONE)

---

## WHAT THE INTELLIGENCE ZONE IS

A competitor and market intelligence system built into the OS sidebar under the "Intelligence" section. It gives the user three dedicated screens — Signal Research, Trend Watch, Competitors — and operates using the same Anthropic API key already in settings.

Unlike a separate GPT, this version is context-aware: it knows the user's content pillars, recent ideas, posts in pipeline, and the Al Laith baseline references automatically.

---

## AL LAITH BASELINE REFERENCES (hardcoded — do not change unless user says so)

- Website: https://allaith.com
- Instagram: https://www.instagram.com/allaithgroup/
- LinkedIn: https://www.linkedin.com/company/allaithgroup/posts/?feedView=all
- Facebook: https://www.facebook.com/allaithgroupME

---

## DEFAULT COMPETITOR LIST (user can override at runtime)

Primary (direct competitors — UAE equipment rental, scaffolding, events):
- Byrne Equipment Rental — byrne.ae
- RSG (Regional Scaffold Group)
- GAPS (Gulf Automated Protection Systems)
- BRT (Building Rental & Trading)
- Triton
- Speedy Gulf

Secondary (adjacent — events infrastructure, temporary structures):
- Any company surfacing in UAE equipment rental or events infrastructure searches during research

---

## THE FIVE RESEARCH MODES

The Intelligence Zone detects which mode applies from the user's input. If ambiguous, it asks one clarifying question.

**Mode 1 — Company Snapshot**
Triggered by: "Research [company]" / "Tell me about [company]"

Output sections:
1. Company Snapshot
2. Observed Positioning
3. Target Audience Hypotheses
4. Key Services Promoted
5. Website Observations
6. Social Media Observations
7. Messaging Themes
8. Content Strengths & Weaknesses
9. SWOT (marketing-facing)
10. Terminology Notes (plain-language explanations of any unfamiliar terms)

**Mode 2 — Competitor Intelligence Report**
Triggered by: "Compare us to [company]" / "How do we stack up against [company]?"

Output sections:
1. Executive Summary (3–5 sentences: who, key finding, what Al Laith should do)
2. Comparison Baseline (confirm Al Laith sources reviewed)
3. Side-by-Side Comparison Table
4. What I Observed (facts, clearly labelled)
5. What It Likely Means for Al Laith (interpretation, clearly labelled)
6. Gap Findings
7. Opportunities for Al Laith
8. Risks for Al Laith
9. Prioritised Recommendations (numbered, most impactful first)
10. Source Notes

**Mode 3 — Trend Intelligence**
Triggered by: "What trends matter?" / "Industry trends" / "Content trends"

Output — Part A (Industry & Market Trends, UAE/GCC):
- Market growth signals (infrastructure pipeline, government spending, sector demand)
- Regulatory trends (OSHAD, CICPA, safety standards)
- Technology trends (telematics, IoT, digital quoting platforms)
- Competitor behaviour as market signal

Output — Part B (Content & Marketing Trends):
- Platform algorithm priorities (Reels, carousels, LinkedIn long-form)
- Content themes winning in GCC B2B right now
- Competitor content behaviour analysis
- Emerging channels relevant to the market

Then:
- Top 5 Industry Trends (with: what it is / evidence / meaning for Al Laith / suggested action)
- Top 5 Content Trends (same structure)
- Trend Radar Table: Trend / Relevance (High/Med/Low) / Time Horizon (Now/6m/12m+) / Response
- "What to Watch" — 3–5 signals to monitor this quarter

**Mode 4 — Full Gap Analysis**
Triggered by: "Gap analysis" / "Full landscape" / "Where are we vs everyone?"

Combines Mode 2 for each default competitor, then synthesises:
- Individual competitor summaries
- Cross-competitor synthesis: where Al Laith leads, where it lags, patterns across the set
- Master opportunity map (ranked actions)
- Risk register (top threats across the competitive set)
PDF-ready output always.

**Mode 5 — Tutorial / Teach Me**
Triggered by: "Teach me how to research competitors" / "How do you find this?" / "Explain how this works"

Teaches marketing research methodology in plain language with Al Laith-specific examples.

Topics by level:
- Beginner: reading a competitor website, analysing social without data access, what positioning means, how to spot a target audience, how to do a SWOT
- Intermediate: building a competitor landscape map, identifying messaging gaps, Google advanced search operators, reading LinkedIn as an intelligence source, tracking trends without paid tools
- Advanced: content audit frameworks, reading a competitor's strategy from their archive, UAE tender portals (Tejouri), tracking competitors over time with Alerts and Wayback Machine

Always ends with: **"Try it yourself"** — a specific 15-minute task the user can do right now.

---

## INTELLIGENCE ZONE UI — THREE SCREENS

**Screen 1: Signal Research (🔍)**
- Search/input bar at top: "Research a company, ask about trends, or say 'teach me...'"
- Mode selector: 5 clickable mode cards below the bar
- Quick prompt chips: "Research Byrne" / "Compare us to RSG" / "GCC content trends" / "Full gap analysis" / "Teach me: LinkedIn research"
- Chat-style output area (research results appear here, scrollable)
- Right panel: OS Context (shows what's been auto-loaded: pillars, pipeline status, recent ideas) + Competitor Watchlist

**Screen 2: Trend Watch (📈)**
- Auto-generates a trend report on first open each week (stores in `intel_research_history` with date)
- Shows the latest trend radar as a visual table
- "Refresh trends" button to regenerate
- Archive of past trend reports (collapsible, date-stamped)

**Screen 3: Competitors (🏁)**
- Watchlist of default competitors as cards
- Each card shows: company name, last researched date, quick summary if researched, "Research now" button
- User can add competitors to the list
- "Run full gap analysis" button at top → triggers Mode 4 across all listed competitors

---

## LEARNING LAYER (applies to all Intelligence Zone outputs)

**Terminology notes:** Inline plain-language explanations of any unfamiliar marketing or industry terms. Formatted as italicised asides. Short, never disruptive.

**"How I researched this":** At the end of every report — 4–6 sentences explaining sources used, what was unavailable, what the user would need to do to go deeper.

**"Try this now":** At the end of every report — one specific 15-minute task to verify a finding or go deeper. Al Laith-specific and actionable.

Example:
> **Try this now:** Go to Byrne's LinkedIn page and click Posts. Sort by Top instead of Recent. The posts with the most engagement show exactly what their audience responds to — which is also your audience. Screenshot the top 3 and bring them back here for analysis.

---

## RESEARCH STANDARDS FOR INTELLIGENCE ZONE

- Clearly separate observed facts from interpretation using explicit labels
- Cite sources: URL or platform + when reviewed
- State clearly when something is behind a login wall or unavailable
- Never invent engagement numbers, follower counts, or traffic estimates
- If a third-party estimate is used, name the source and label it as an estimate
- No private data, no login bypass attempts, no assumptions presented as facts

---

---

# PART 3 — BRAND VOICE CONTEXT

---

## WHO AL LAITH IS

Al Laith is a UAE and GCC-based equipment rental, scaffolding, and events infrastructure company that has grown from equipment supplier into a full delivery partner — trusted on the region's most demanding projects. Clients include event organisers running championship sporting events, aviation facilities, oil and gas operators, and major construction programmes across the UAE and wider GCC.

---

## THE VOICE IN ONE SENTENCE

**Confident without arrogance. Warm without being casual. Professional without being corporate. Human without being unprofessional.**

---

## WHAT TO DO

**Be direct.** Every sentence earns its place. No padding.

**Be specific.** Use real numbers, real details, real context. "Delivered on time" is nothing. "Deployed 47 units across three sites in 72 hours" is something.

**Be grounded.** Write like someone who has been on a job site, not read about job sites.

**Be warm — quietly.** That warmth comes through in how you talk about people, not in exclamation marks.

**Be proud — not boastful.** Confidence comes from showing what you've done, not claiming you're the best. Always earned. Never claimed.

**Allow some personality.** There is room for a well-placed observation or a moment of wit. It must feel natural. Think: a company that can laugh at itself occasionally, not one that tries to be funny.

---

## WHAT NOT TO DO

**Never arrogant.** Do not position Al Laith as superior to competitors or above clients.

**Never aggressive toward competitors.** Do not reference, name, imply, or allude to competitors negatively. The work speaks for itself.

**Never dismissive toward government or regulation.** Al Laith operates in the UAE and GCC. Respect for government, regulation, and official bodies is non-negotiable. Any content touching on policy or government projects must be respectful and constructive.

**Never corporate or robotic.** Avoid language that sounds like it came from a boardroom or a template.

**Never generic AI-sounding.** If a sentence could have been written by any company in any industry anywhere — rewrite it.

**Never consumer-brand in tone.** No FOMO energy, no influencer casualness, no exclamation-mark enthusiasm. Professional enough for a procurement director to share in a meeting.

**Never exaggerate.** Clients see through inflation immediately. It erodes trust.

---

## BANNED WORDS AND PHRASES

Never use:
- World-class
- Pleased to announce / We are excited to announce / Excited to share
- Cutting-edge / State-of-the-art
- Synergy / Synergies
- Ecosystem
- Leverage (as a verb)
- Solutions (on its own — say what the actual thing is)
- Best-in-class
- Seamlessly (unless very sparingly and genuinely earned)
- Empower / Empowering
- Transformative / Transform (unless literally true)
- Unlock (as a metaphor)
- Journey (as a business metaphor)
- Passion / Passionate (show the behaviour instead)
- Proud to partner (say what the partnership actually achieved)
- Whatever it takes (tagline — used only when genuinely earned, never as filler)

---

## THE "WHATEVER IT TAKES" RULE

The Al Laith tagline. Used sparingly and only when a post genuinely demonstrates the ethos — real challenge, real odds, real outcome. Ask: does this post actually show "whatever it takes"? If the answer is "sort of" — don't use it.

---

## PLATFORM-SPECIFIC TONE

**Instagram:** Hook must stop the scroll. Short paragraphs. Hashtags at end only, never mid-caption (8–12 tags). Most human-facing platform — feel candid, not like a press release.

**LinkedIn:** Audience includes procurement heads, project directors, C-suite. Slightly more formal but still human. Proof points and specificity matter most. CTAs professional: "Get in touch" not "DM us now!"

**Facebook:** Warm, approachable, conversational. Good for team moments, community content, event coverage. Engagement questions work well.

**Blog:** Educational and genuinely useful. H2 subheadings. Reference real projects. End with a non-pushy CTA.

**Video Script:** Written for the ear. Short sentences. [VISUAL]/[AUDIO]/[CAPTION] format. First 3 seconds must hook. No "Hey guys, welcome back."

---

## WRITING ABOUT PROJECTS

Structure that works:
1. Set context — the project, the challenge, the scale
2. Show what Al Laith brought — specific equipment, team, approach
3. Land on the outcome — what was delivered, by when, against what odds

Include when available: unit counts, square metres, hours to complete, team size, location, client sector, conditions (heat, overnight, tight window, Ramadan).

Do not: make a simple job sound extraordinary, or replace details with adjectives.

---

## WRITING ABOUT THE TEAM

- Name people when appropriate
- Be proud without being sentimental
- Show talent, do not announce it — avoid "our talented team"
- Behind-the-scenes content should feel candid, not staged
- Safety and professionalism should come through naturally in how people are depicted

---

## WRITING ABOUT SAFETY

Show safety in practice — PPE worn correctly, briefings happening, equipment in good condition. Training content should genuinely teach something. Never make safety feel bureaucratic. Never say "safety is our top priority" — it has been said so many times it means nothing. Show it instead.

---

## PRE-PUBLISH VOICE CHECK

Before anything goes out, ask:
1. Would a procurement director be comfortable sharing this in a meeting?
2. Does it sound like a real person wrote it?
3. Is there at least one specific detail — a number, location, timeframe, condition?
4. Does it make a claim we cannot back up?
5. Could any other company have posted this — or does it feel like Al Laith?

---

## CONDENSED SYSTEM PROMPT BLOCK

This is the version injected into API calls — compact but complete:

```
AL LAITH BRAND VOICE — apply to all generated content:

Company: Al Laith Group — UAE/GCC equipment rental, scaffolding, events infrastructure. B2B audience: project managers, procurement teams, site supervisors, event directors.

Voice: Confident without arrogance. Warm without being casual. Professional without being corporate. Grounded in real work. The balance: serious about the work, not serious about itself.

ALWAYS:
- Specific — use real numbers, locations, timeframes, conditions
- Grounded — write like someone who has been on the job site
- Proud through evidence, never claims
- Platform-appropriate: LinkedIn = formal + proof-points, Instagram = human + hook-first, Facebook = warm + conversational
- "Whatever it takes" only when genuinely earned

NEVER:
- Arrogant, boastful, or superior to competitors
- Reference competitors negatively
- Disrespectful toward government, regulation, or official UAE/GCC bodies
- Use: world-class / pleased to announce / synergy / cutting-edge / state-of-the-art / leverage (verb) / solutions (alone) / best-in-class / empower / transformative / passionate / excited to share / proud to partner
- Sound like generic AI or a consumer lifestyle brand
- Make unearned claims — if you cannot back it up with a specific, remove it
- Add preamble or explanation — output only the content requested

Output: valid JSON only. No markdown. No code blocks.
```

---

## DELIVERABLE

One updated `.html` file containing:
1. All existing functionality working exactly as before
2. All 7 upgrades fully implemented (Approval Bridge, Calendar, Repurpose, Scorer, Brand Voice Engine, OS Shell, Intelligence Zone)
3. New BRAND_SYSTEM replacing the existing one at line ~2764
4. Updated sidebar with MY OS / AL LAITH HUB / INTELLIGENCE sections
5. Marketing Review Mode working from URL parameter with no login required
6. Intelligence Zone with all three screens and five research modes
7. All AI calls using the existing API key from settings, model `claude-sonnet-4-20250514`
8. Mobile responsive for Calendar and Marketing Review Mode
9. All new localStorage keys using the `dbGet` / `dbSet` wrapper pattern for future backend migration
