# Al Laith Business OS
## Project README — Start Here

---

## What This Is

A modular web application system for Al Laith Group. One entry point (the Command Centre), six zone applications, and a shared layer that keeps everything consistent and connected.

**Open `APPS/os-shell.html` to use the system.**

---

## Folder Map

```
APPS/           → The actual applications (os-shell + 6 zones)
shared/         → Design system, storage, brand voice — shared across all zones
prompts/        → Build instructions for Cowork sessions
skills/         → Claude skill files for content, building, and prompting
sessions/       → Build tracker, decisions log, session handoffs
reference/      → Data flows, API patterns, design tokens
```

---

## Build Status

| Zone | File | Status |
|---|---|---|
| OS Shell | os-shell.html | 🔲 Not started |
| Zone 1 — Content | zone1-content.html | 🟡 In progress (7 upgrades) |
| Zone 2 — Projects | zone2-projects.html | 🔲 Not started |
| Zone 3 — Learning | zone3-learning.html | 🔲 Not started |
| Zone 4 — Intelligence | zone4-intelligence.html | 🔲 Not started |
| Zone 5 — Knowledge Graph | zone5-knowledge.html | 🔲 Not started |
| Zone 6 — Pulse | zone6-pulse.html | 🔲 Not started |
| Shared Layer | shared/ | 🔲 Not started |

---

## How to Run a Build Session

1. Open `sessions/build-tracker.md` — find the next session
2. Tell Cowork: *"Read prompts/full-os-scope.md and sessions/build-tracker.md. Today's session: [session ID]. Do this session only."*
3. When done: ask for a handoff brief → save to `sessions/handoffs/session-XX-handoff.md`
4. Update `sessions/build-tracker.md`

---

## Key Files

| File | Purpose |
|---|---|
| `prompts/full-os-scope.md` | Full system vision — read before any session |
| `prompts/al-laith-master-build-prompt.md` | Zone 1 upgrade instructions |
| `prompts/brand-voice-context.md` | Brand voice rules |
| `sessions/build-tracker.md` | What's done, what's next |
| `sessions/decisions.md` | Architectural decisions log |
