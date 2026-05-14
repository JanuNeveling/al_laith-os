---
name: lean-context
description: >
  Maximize what you get from Claude while using the minimum tokens, context, and back-and-forths.
  Use this skill whenever the user wants to: reduce Claude usage limits, speed up slow bloated chats,
  carry context across sessions without re-explaining everything, compress a long conversation into
  a clean brief, or get more done per message. Also trigger for: "my chat is getting slow", "I keep
  explaining the same thing", "I'm hitting my usage limit", "how do I use Claude more efficiently",
  "save my context", "compress this conversation", or any request about working smarter with Claude.
  This skill is specific to the Al Laith Business OS project — a Dubai equipment rental, scaffolding,
  and events company building a full content OS in Cowork and Claude artifacts.
---

# Lean Context Skill — Al Laith OS Edition

## Why Tokens Run Out On This Project

The Al Laith OS is a complex, multi-session build. Token exhaustion happens for four specific reasons:

1. **File re-reading** — Claude re-reads the 5,200-line HTML file every message when it's in context
2. **Re-explanation tax** — restating the same project background across sessions
3. **Bloated prompts** — asking for too much in one shot without structure, forcing Claude to plan mid-response
4. **Missing handoff** — no clean way to pause and resume a Cowork session without losing state

This skill fixes all four.

---

## The Master Context Block

Paste this at the start of any new chat or Cowork session to load full project context in ~180 tokens:

```
=== AL LAITH OS — PROJECT CONTEXT ===
Project: Al Laith Business OS — single HTML file app (~5,200 lines)
Source file: OPEN_THIS_-_Al_Laith_Content_Hub.html
Company: Al Laith Group — UAE/GCC equipment rental, scaffolding, events infrastructure
Role: I create content, 1-2 marketing people approve it

WHAT'S BUILT (do not rebuild):
Content Creator (6 pillars) / Content Library / Ideas Bank (180 ideas) / Marketing Pipeline /
Marketing Pack Export (HTML+JSON) / Asset Manager / Hashtag Studio / Dashboard / Shot List / Settings

WHAT'S BEING ADDED (current build phase):
1. Live Approval Bridge (URL-encoded, no backend)
2. Content Calendar (drag/drop scheduling)
3. Repurpose Engine (rewrite existing posts for new platforms)
4. Content Scorer (5-dimension AI scoring)
5. Brand Voice Engine (trainable from real posts)
6. Business OS Shell (Command Centre + Ideas Bank — personal layer)
7. Intelligence Zone (Signal Research / Trend Watch / Competitors — 5 research modes)

TECH: Vanilla HTML/CSS/JS, single file, localStorage, Anthropic API (claude-sonnet-4-20250514)
DESIGN: Navy sidebar #0C172C, Blue primary #0071B7, Manrope/Fraunces/JetBrains Mono fonts
RULE: Extend only — never rebuild. Add CSS to <style>, JS before </script>, nav to <nav>, modals before </body>
=== END CONTEXT ===
```

---

## Technique 1 — Phase-Based Building (the main fix for hitting the wall)

The biggest token drain on this project is trying to build everything in one session. The OS has 7 upgrades — building all 7 at once uses enormous context because Claude holds the entire app in memory while writing thousands of new lines.

**The right approach: one upgrade per session.**

Start each Cowork session with:
```
[Paste master context block]

TODAY'S SESSION: Build Upgrade [N] only — [name].
File is attached. When done, output the complete updated file and nothing else.
Do not start Upgrade [N+1].
```

This keeps each session under ~40k tokens, which is well within limits and produces cleaner code than a single exhausted mega-session.

**Session order (recommended):**
- Session 1: Brand System Prompt replacement + Brand Voice Engine (Settings page)
- Session 2: Content Scorer
- Session 3: Repurpose Engine
- Session 4: Content Calendar
- Session 5: Business OS Shell (Command Centre + Ideas Bank tabs)
- Session 6: Live Approval Bridge
- Session 7: Intelligence Zone (Signal Research, Trend Watch, Competitors screens)

---

## Technique 2 — The Handoff Brief

When a session ends before finishing — or when you need to resume in a new chat — ask Claude to generate a handoff brief before the session closes:

> "Generate a handoff brief for this session. Include: what was completed, what was left unfinished, which lines were changed, and the exact next instruction to start the next session."

Claude outputs something like:
```
=== HANDOFF BRIEF — Session 3 ===
Completed: Repurpose Engine — UI panel, AI call, Save as new post, Replace caption button
Left unfinished: Regenerate per-platform button (inside repurpose panel, needs connecting to aiCall)
Lines changed: Added repurposePost() at line ~3100, added repurpose modal HTML at line ~5150
Next session start: "Build the 'Regenerate' button inside the Repurpose panel.
  It should call aiCall('repurpose', {...}) and update the textarea. See repurposePost() at line ~3100."
=== END BRIEF ===
```

Save this. Paste it at the top of the next session along with the master context block.

---

## Technique 3 — Surgical Prompt Pattern (for edits and fixes)

When asking Claude to change something specific in the app, don't describe it vaguely. Give it the exact location and exactly what to change. This cuts the tokens Claude spends searching the file.

**Bad (Claude reads the whole file looking for context):**
> "Can you fix the marketing approval thing so it works better?"

**Good (Claude goes straight to the right place):**
> "In the `loadMarketing()` function (around line 2400), change the 'Generate Pack' button label to 'Send to Marketing →' and add an onclick that calls `openSendToMarketingModal()`. Don't change anything else in that function."

**Formula:**
```
In [function name] (around line [N]), [exactly what to change]. Don't change anything else.
```

---

## Technique 4 — File Reference Instead of File Paste (for Cowork)

In Cowork, when the app file is already in the project folder, tell Claude to reference it by name rather than pasting the content into the chat. Pasting 5,200 lines into a message uses the same tokens as the file itself.

**In Cowork, say:**
> "The source file is OPEN_THIS_-_Al_Laith_Content_Hub.html in this project folder. Read it from there. Do not ask me to paste it."

Cowork can access project files directly. Use this every session.

---

## Technique 5 — Task Batching for Content

When generating content (not building the app), batch multiple related tasks into one message. This is still relevant for the content creation side of the work.

**Bad (3 separate messages):**
> Message 1: "Write an Instagram caption for this job"
> Message 2: "Now do LinkedIn"
> Message 3: "And Facebook"

**Good (1 message, 3 outputs):**
> "Write Instagram caption (punchy, hashtags), LinkedIn post (200w, professional), and Facebook post (warm, 120w) for the same context: [details]. Output all three labelled and separated."

**Token savings:** ~65% fewer messages for multi-platform content.

---

## Technique 6 — Conversation Reset (when a chat is already bloated)

If a chat is slow or running out of space mid-session:

**Step 1 — Compress it:**
> "Summarize everything relevant from this conversation in under 200 words. Include: what was built, decisions made, what's left, and the exact next instruction. Output as a paste-able brief."

**Step 2 — Fresh session:**
Paste:
1. Master context block (above)
2. The compressed summary
3. The next task

Fresh 3-message start. Full context. No bloat.

---

## When to Use Each Technique

| Situation | Technique |
|---|---|
| Starting any new Cowork session | Master context block + Phase-based building |
| Session ends before finishing | Handoff brief |
| Fixing something specific in the app | Surgical prompt pattern |
| File is in Cowork project folder | File reference, not paste |
| Need content on multiple platforms | Task batching |
| Chat has become slow or laggy | Conversation reset |
| Getting generic or wrong outputs | Add the specific function name and line number |

---

## Cowork Project Setup

Your Cowork project folder should contain exactly these files:

```
📁 Al Laith OS Project
├── OPEN_THIS_-_Al_Laith_Content_Hub.html    ← source app (Cowork reads this directly)
├── al-laith-master-build-prompt.md           ← single instruction file for the build
├── al-laith-brand-voice-context.md           ← brand voice reference
└── company-signal-researcher-v2.md           ← signal researcher reference
```

At the start of every session, tell Cowork:
> "Read al-laith-master-build-prompt.md first. Then read the HTML file. Today's task is [specific upgrade only]."

---

## Quick Prompt Templates — Al Laith OS

```
# Start a build session
Read al-laith-master-build-prompt.md and OPEN_THIS_-_Al_Laith_Content_Hub.html from the project folder.
Today's session: Build [Upgrade N — name] only. Output the complete updated HTML file when done.

# Surgical fix
In [functionName()] around line [N], [exactly what to change]. Don't touch anything else.
Output only the changed function / section, not the whole file.

# Handoff brief (end of session)
Generate a handoff brief: what was completed, what's unfinished, which lines changed,
and the exact instruction to start the next session.

# Resume from handoff
[Paste master context block]
[Paste handoff brief]
Continue from where we left off. Today: [next instruction from brief].

# Content batch (for content creation, not building)
Write Instagram (punchy, hashtags) + LinkedIn (200w, professional) + Facebook (warm, 120w)
for the same context: [what happened / what's the project].
```

---

## Maintaining the Master Context Block

Update the context block when:
- A new upgrade is completed (move it from "being added" to "what's built")
- The tech stack changes (e.g. when moving to a real backend)
- New brand rules are added
- The team size changes (e.g. if more approvers are added)

Keep it under 200 words. Every word in the context block costs tokens on every session.
