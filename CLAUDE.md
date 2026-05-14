# CLAUDE.md — Al Laith Business OS
## Auto-loaded at the start of every Cowork session

---

## FIRST ACTION — READ THIS BEFORE ANYTHING ELSE

At the start of every session, before responding to any request, read these two files in order:

1. `Handoffs/session-01-handoff.md` — full project context, architecture, what's been built, what's next
2. `Sessions/build-tracker.md` — live status of every task across all phases

Do not start work, make assumptions, or ask questions until you have read both files.

---

## Project in One Line

Building the Al Laith Business OS — a 6-zone static HTML operating system for Al Laith Group (UAE equipment rental, scaffolding, events). No frameworks. No build step. Files open directly in the browser.

## Key Files

| File | What it is |
|---|---|
| `Handoffs/session-01-handoff.md` | Full handover — architecture, APIs, what's done, what's next |
| `Sessions/build-tracker.md` | Per-task build status across all phases |
| `Apps/os-shell.html` | Command Centre (✅ complete) |
| `Apps/zone1-content.html` | Content Hub (Phase 1a ✅, 1b–1g pending) |
| `Shared/design-system.css` | CSS tokens + component library (✅ complete) |
| `Shared/storage-schema.js` | localStorage layer — window.AlLaithOS (✅ complete) |
| `Shared/brand-voice.js` | AI brand engine — window.AlLaithAI (✅ complete) |
| `Prompts/full-os-scope.md` | Full system vision — read before building any new zone |

## Session Rules

- Always ask at least one clarifying question before starting any task
- Read the target file before making changes — never work blind
- Update `Sessions/build-tracker.md` when a task is done
- Update the handoff in `Handoffs/` before ending the session
- Work only in `Al Laith OS/` on the Desktop — not in any other project folder
- Functionality and interface are equally important — it must look good AND work

## Next Task

**Phase 1b — Content Scorer** in `Apps/zone1-content.html`
5-dimension AI scoring (hook, clarity, CTA, platform fit, brand voice) for any saved post.
The scorer prompt is already in `Shared/brand-voice.js` under `PROMPTS.scorer`.
Read zone1-content.html before starting. Ask Janu one question first.
