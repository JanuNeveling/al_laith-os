---
name: session-manager
description: >
  Manage complex multi-session projects in Cowork or Claude — tracking progress, generating
  handoff briefs, resuming cleanly after a break, and keeping large builds on track without
  losing state or repeating work. Use this skill whenever the user is: mid-build on a large
  project and needs to pause, resuming a project started in a previous session, worried about
  hitting the token limit before finishing, trying to figure out what was done and what's left,
  or planning the order and scope of upcoming build sessions. Also trigger for: "where did we
  get to?", "I need to pause this", "how do I pick this up again?", "what's left to build?",
  "can you give me a session summary?", or any request about managing a project across multiple
  Claude or Cowork sessions. This skill is tuned for the Al Laith Business OS build but applies
  to any large multi-session project.
---

# Session Manager Skill

## The Problem This Solves

Large projects like the Al Laith OS cannot be completed in a single Claude or Cowork session. Token limits, complexity, and the size of the source file mean that building everything at once produces:
- Incomplete outputs (Claude runs out of context before finishing)
- Errors (Claude loses track of earlier decisions)
- Repeated work (the next session doesn't know what the last one did)

This skill gives you a system for pausing, resuming, and tracking a complex build across as many sessions as it takes — without losing progress or momentum.

---

## The Session Lifecycle

Every session should follow this structure:

```
START → Load context → Confirm scope → Build → End → Generate handoff brief
```

Never skip the handoff brief. It is the bridge to the next session.

---

## Starting a Session Cleanly

At the start of every session, give Claude or Cowork three things in this order:

**1. The master context block** (from lean-context skill):
```
=== AL LAITH OS — PROJECT CONTEXT ===
[paste the context block]
=== END CONTEXT ===
```

**2. The project status** (from the progress tracker below, or from the last handoff brief):
```
=== PROJECT STATUS ===
Completed: [list of finished upgrades]
In progress: [current upgrade, if partially done]
Remaining: [list of upgrades not yet started]
=== END STATUS ===
```

**3. Today's task** (one upgrade only):
```
Today's session: [Upgrade N — name].
Source file: [filename] in the project folder.
[If resuming mid-upgrade]: Resume from: [exact instruction from last handoff brief]
```

This three-part start loads full context in under 300 tokens and eliminates re-explanation entirely.

---

## Al Laith OS — Project Progress Tracker

Copy and maintain this tracker. Update it after each session.

```
=== AL LAITH OS — BUILD TRACKER ===

SOURCE FILE: OPEN_THIS_-_Al_Laith_Content_Hub.html

COMPLETED:
[ ] Session 1: Brand System Prompt replacement + Brand Voice Engine (Settings)
[ ] Session 2: Content Scorer
[ ] Session 3: Repurpose Engine
[ ] Session 4: Content Calendar
[ ] Session 5: Business OS Shell (Command Centre + Ideas Bank tabs)
[ ] Session 6: Live Approval Bridge
[ ] Session 7: Intelligence Zone (Signal Research + Trend Watch + Competitors)

CURRENT SESSION: [N] — [name]
STATUS: [Not started / In progress / Complete]
LAST LINE CHANGED: [N]
NEXT ACTION: [exact instruction]

NOTES:
[Any decisions made, deviations from the plan, things to watch out for]
=== END TRACKER ===
```

Update the tracker after every session. Keep it in the Cowork project folder as `build-tracker.md`.

---

## Ending a Session — The Handoff Brief

At the end of every session, before closing Cowork or the chat, request this:

> "Generate a handoff brief for this session."

Claude produces:

```
=== HANDOFF BRIEF — Session [N]: [Upgrade Name] ===
Date: [date]

COMPLETED THIS SESSION:
- [What was built, with function names and line numbers]
- [What was changed and where]

UNFINISHED:
- [What was started but not completed]
- [What was planned but not reached]

LINES CHANGED:
- Added [X] at line [N]
- Modified [functionName()] at lines [N–M]
- Added modal HTML at line [N]

ISSUES / DECISIONS:
- [Any decisions made that future sessions should know]
- [Any edge cases discovered]

NEXT SESSION START INSTRUCTION:
"[Exact instruction to paste at the start of the next session — specific enough that Claude
can pick up immediately without context loss]"
=== END BRIEF ===
```

Save this brief. It becomes the "project status" input for the next session.

---

## Resuming Mid-Upgrade

If a session ended before an upgrade was finished:

**Start of next session:**
```
[Master context block]
[Project status from tracker]

Resuming Session [N] — [Upgrade Name].
Here is where we left off:
[Paste the "NEXT SESSION START INSTRUCTION" from the handoff brief]

Source file is [filename] in the project folder. Continue from this point only.
Do not redo what was already completed.
```

Claude picks up exactly where it left off without re-reading or re-doing completed work.

---

## When to Split a Session Mid-Build

Split into a new session when:
- Claude's responses start getting shorter or less accurate (context saturation signal)
- A single response is taking more than 2–3 minutes to generate
- The output is missing things you explicitly asked for
- You've been in the session for 30+ minutes on a complex build

**How to split cleanly:**
1. Ask Claude to stop: "Stop here. Don't build anything else."
2. Ask for the handoff brief immediately
3. Start a fresh Cowork task with the master context + handoff brief

Do not try to "push through" a saturated session. The output degrades and you end up with broken code that takes longer to fix than starting fresh.

---

## Tracking Decisions Across Sessions

Some decisions made in early sessions affect later ones. Keep a decisions log in the project folder:

**`decisions.md`:**
```
=== AL LAITH OS — DECISIONS LOG ===

[Session 1 — date]
- Using URL-encoded base64 for approval bridge (no backend)
- Brand Voice Engine stores samples in al_laith_settings.brand_voice_posts
- Switched model from claude-haiku to claude-sonnet-4-20250514 for all calls

[Session 3 — date]
- Repurpose panel is a slide-out panel (not a modal) — opens to the right of the post detail
- "Save as new post" links to source via post.repurposed_from_id field (new field added)
- Decided not to add the regenerate button this session — carry to Session 4

=== END LOG ===
```

Paste the relevant decisions into the next session start when they affect what's being built.

---

## The Scope Agreement

At the start of every session, confirm scope before building:

> "Before starting, confirm: today's session covers [Upgrade N] only. When that is complete, stop and generate the handoff brief. Do not start any other upgrade. Confirm you understand."

Claude confirms. You build. You stop. You get the brief. Next session starts clean.

This one habit eliminates 80% of the "Claude went off-track" problems in large builds.

---

## Quick Reference

```
# Start a new session
[Master context block]
[Project status / last handoff brief]
Today: Build [Upgrade N — name] only.
Read [filename] from the project folder. Confirm scope before starting.

# Mid-session check (if unsure what's done)
"Give me a brief summary of what has been completed in this session
and what remains from today's scope."

# End of session
"Stop here. Generate a handoff brief:
what was completed, what's unfinished, which lines changed,
exact instruction for the next session."

# Emergency stop (Claude going off-track)
"Stop. Do not continue building. Summarize what you have done so far in this session only."

# Resume after handoff
[Master context block]
[Paste handoff brief]
Continue from: [next session instruction from brief]
Do not redo what was already completed.
```
