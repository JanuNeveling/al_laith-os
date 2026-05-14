# Al Laith OS — Build Tracker
## Update this after every session

---

## Legend
🔲 Not started &nbsp;|&nbsp; 🟡 In progress &nbsp;|&nbsp; ✅ Complete

---

## Phase 0 — Foundation (shared layer + shell)

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 0a | Create design-system.css | Shared/design-system.css | ✅ | 97 CSS tokens — colours, type, spacing, buttons, cards, badges, modals, toasts |
| 0b | Create storage-schema.js + brand-voice.js | Shared/ | ✅ | Full localStorage schema for all 6 zones + real brand voice from Prompts folder |
| 0c | Build OS Shell — Command Centre | Apps/os-shell.html | ✅ | Zone cards, stats strip, quick-add, attention panel, Zone 1 live bridge |

---

## Phase 1 — Zone 1 Upgrades (existing app)

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 1a | Brand System replacement + Brand Voice Engine | zone1-content.html | ✅ | Shared/brand-voice.js imported; BRAND_SYSTEM → AlLaithAI.getSystemPrompt(); Voice Training UI added to Settings |
| 1b | Content Scorer | zone1-content.html | ✅ | Modal scorecard — 5 dims (Hook/Clarity/CTA/PlatformFit/BrandVoice), colour-coded bars, weakest callout + fix suggestion, score persisted to post |
| 1c | Repurpose Engine | zone1-content.html | 🔲 | Rewrite posts for new platforms |
| 1d | Content Calendar | zone1-content.html | 🔲 | Drag/drop scheduling, month view |
| 1e | OS Shell integration | zone1-content.html | 🔲 | Expose stats to shared storage for shell |
| 1f | Live Approval Bridge | zone1-content.html | 🔲 | URL-encoded review, no backend |
| 1g | Intelligence Zone screens | zone1-content.html | 🔲 | Signal Research, Trend Watch, Competitors |

---

## Phase 2 — Zone 4 Intelligence

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 2a | Zone 4 shell + Signal Research screen | zone4-intelligence.html | 🔲 | 5 research modes |
| 2b | Trend Watch + auto-generation | zone4-intelligence.html | 🔲 | Weekly auto-report |
| 2c | Competitor Watchlist + gap analysis | zone4-intelligence.html | 🔲 | Default competitor list |

---

## Phase 3 — Zone 2 Projects

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 3a | Job Logger | zone2-projects.html | 🔲 | Fields: sector, location, equipment, conditions |
| 3b | Case Study Builder | zone2-projects.html | 🔲 | Blog + structured doc + social batch |
| 3c | Events Workspace | zone2-projects.html | 🔲 | Per-event planning space |
| 3d | Project Archive + Proposal Generator | zone2-projects.html | 🔲 | Searchable archive + AI proposal |

---

## Phase 4 — Zone 3 Learning Hub

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 4a | Ask & Learn (Claude Tutor) | zone3-learning.html | 🔲 | Persistent chat history |
| 4b | Resource Library | zone3-learning.html | 🔲 | Save + auto-summarise |
| 4c | Topic Tracker | zone3-learning.html | 🔲 | Pre-loaded marketing topics |
| 4d | Strategy Builder | zone3-learning.html | 🔲 | 30/60/90-day content strategy |
| 4e | Growth Journal | zone3-learning.html | 🔲 | AI-reflected personal log |

---

## Phase 5 — Zone 5 Knowledge Graph

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 5a | Canvas + node rendering | zone5-knowledge.html | 🔲 | D3.js from cdnjs |
| 5b | Edge creation + relationship labels | zone5-knowledge.html | 🔲 | |
| 5c | Pre-loaded seed nodes + Zone 3 integration | zone5-knowledge.html | 🔲 | Marketing concept map |
| 5d | Search + cluster colouring + Zone 4 integration | zone5-knowledge.html | 🔲 | |

---

## Phase 6 — Zone 6 Pulse

| Session | Task | File | Status | Notes |
|---|---|---|---|---|
| 6a | Content Output Tracker + Goal Tracker | zone6-pulse.html | 🔲 | |
| 6b | Streak system + Weekly Digest | zone6-pulse.html | 🔲 | Monday auto-generation |
| 6c | Batch Creator | zone6-pulse.html | 🔲 | Full month content generation |

---

## Current Session

**Session:** Phase 1 — Zone 1 Upgrades (in progress)
**Task:** 1a ✅ → 1b ✅ → 1c Repurpose Engine → 1d Calendar → 1e OS Shell integration → 1f Approval Bridge → 1g Intelligence Screens
**Status:** 1b complete
**Next action:** Phase 1c — Repurpose Engine (rewrite posts for new platforms/formats)

---

## Notes
*(Add architectural decisions, scope changes, and issues here as the build progresses)*
