---
name: prompt-engineer
description: >
  Write better prompts that get the right output first time — reducing back-and-forth, token waste,
  and incomplete results. Use this skill whenever the user wants to: write a prompt for Cowork or
  Claude Code, improve an existing prompt that isn't working, structure a complex instruction for
  a multi-step build, write a system prompt for a GPT or Claude Project, or get Claude to do
  something specific without it going off-track. Also trigger for: "write me a prompt for this",
  "how do I ask Claude to...", "the output keeps being wrong", "Claude keeps missing the point",
  "I need a better instruction", or any request about making AI outputs more accurate or efficient.
  This skill is tuned for the Al Laith OS project context but applies to any prompting task.
---

# Prompt Engineer Skill

## Why Prompts Fail

Most prompts fail for one of five reasons:

1. **No role** — Claude doesn't know what perspective to take
2. **No constraint** — Claude makes decisions that should have been made by the user
3. **No format spec** — Claude chooses a structure that isn't useful
4. **Too much in one shot** — Claude loses track of requirements mid-output
5. **No negative space** — Claude isn't told what NOT to do, so it defaults to what it knows

Good prompts solve all five before sending.

---

## The Anatomy of a Strong Prompt

```
[ROLE] You are a [specific role] working on [specific context].

[TASK] Your task is to [specific action verb] [specific deliverable].

[CONTEXT] Here is what you need to know: [relevant background, files, constraints].

[FORMAT] Output format: [exactly how the response should be structured].

[CONSTRAINTS] Rules:
- Do [X]
- Do not [Y]
- If [edge case], then [handle it this way]
```

Every strong prompt has all five of these. Missing any one of them is where the output goes wrong.

---

## Prompt Patterns for the Al Laith OS Project

### For Cowork build sessions

```
You are extending an existing HTML application. The source file is [filename] in this project folder.
Read it before doing anything.

Your task is to add [specific upgrade name] only. Do not build any other upgrade in this session.

What to add:
- [Specific feature 1 — with exact function name and line number if known]
- [Specific feature 2]

Rules:
- Add CSS to the existing <style> block
- Add JS before the closing </script> tag
- Use the existing callClaude() function for all AI calls
- Use dbGet()/dbSet() for all storage — never localStorage directly
- Match the existing design system (navy sidebar #0C172C, blue primary #0071B7, Manrope font)
- Do not change anything outside of the features listed above

Output: the complete updated HTML file. State which lines were changed.
```

### For targeted fixes

```
In the [functionName()] function (around line [N]), [exactly what to change].
Do not change anything outside this function.
Output only the updated function, not the whole file.
```

### For AI system prompts (writing prompts that go inside apps)

```
Write a system prompt for an AI that [what it does].
Audience: [who it talks to]
Tone: [how it should sound]
Always do: [3-5 rules]
Never do: [3-5 rules]
Output format: [what the AI should always return — JSON, markdown, plain text, etc.]
Keep it under [N] words — it will be injected into every API call.
```

### For research and analysis tasks

```
Research [company/topic] and produce a [report type].
Sources to check: [list of URLs or platforms]
Compare against: [baseline reference]
Output sections:
1. [Section 1]
2. [Section 2]
3. [Section 3]
Separate observed facts from interpretation clearly.
Do not invent metrics — if data is unavailable, say so.
```

### For content generation (Al Laith)

```
Write [platform] [content type] for Al Laith.
Context: [what happened / what's the project / what's the topic]
Tone: [punchy / professional / educational / auto]
Include: [any specific requirements — hashtags, CTA, word count]
Do not use: world-class / pleased to announce / synergy / cutting-edge
Output: the content only. No preamble, no explanation.
```

---

## The Constraint Rule

The most underused part of a prompt is what you tell Claude NOT to do. Constraints are often more valuable than instructions because they prevent Claude from defaulting to its most common patterns.

**Most useful constraints for this project:**

```
Do not rebuild the existing app — extend it only.
Do not add features beyond what is listed in this session.
Do not change anything outside the specified function.
Do not use localStorage directly — use dbGet()/dbSet().
Do not add new CDN libraries not already in the file.
Do not explain what you're doing — just do it.
Do not ask clarifying questions — make a decision and state your assumption.
Output only the [file / function / content] — no preamble, no explanation.
```

---

## Format Specification

Telling Claude exactly how to format the output eliminates the most common source of wasted tokens — Claude producing the right content in the wrong structure.

**For code outputs:**
```
Output: the complete updated [file/function/component].
State at the top: which lines were changed and what was added.
Do not include explanatory comments unless they are meaningful to a future developer.
```

**For reports:**
```
Output format:
- Section headers as H2 (##)
- Facts and interpretation clearly labelled ("What I observed:" / "What this means:")
- Recommendations numbered, most impactful first
- No more than 3 sentences per paragraph
- Total length: under [N] words
```

**For content:**
```
Output: the content only. No "Here's your caption:" intro. No explanation after.
[If multiple platforms]: Label each clearly. Separate with ---
```

---

## When to Split a Prompt Into Multiple Sessions

If the task requires Claude to:
- Read more than one large file
- Build more than one complete feature
- Produce more than ~500 lines of new code
- Make decisions in one part that affect another part it hasn't written yet

...it should be split. One task per session. Handoff brief at the end.

**The test:** Can Claude complete this task and hold the full context of the existing file in its working memory simultaneously? If the answer is "probably not" — split it.

---

## Prompting Anti-Patterns — What to Avoid

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| "Make the app better" | No specificity — Claude guesses | Name the exact feature and function |
| "Fix the bug" | No information — Claude can't diagnose | State what's broken, what error shows, which function |
| "Write something for Instagram" | No context — generic output | Give the job, the scale, the location, the angle |
| "Do everything in the master prompt" | Too many decisions at once | One upgrade per session |
| Pasting the whole 5,200-line file into chat | Massive token drain | Use Cowork project folder reference instead |
| "Use your judgment on the design" | Claude's aesthetic ≠ Al Laith's brand | Specify exact colours, fonts, and spacing from design system |
| "Make it look good" | Subjective — Claude guesses | "Use --navy for the sidebar, --blue for CTAs, Manrope 13px for nav items" |

---

## Quick Templates

```
# Cowork build session
Read [master-build-prompt.md] and [source-file.html] from the project folder.
Today: Build [Upgrade N — name] only. Do not build other upgrades.
Output: complete updated HTML file. State which lines changed.

# Surgical code fix
In [functionName()] around line [N]:
Change: [what currently exists]
To: [what it should be]
Do not touch anything else. Output only the updated function.

# System prompt creation
Write a system prompt for an AI that [role and purpose].
Tone: [voice description]. Max [N] words.
Always: [3 rules]. Never: [3 rules]. Output format: [format].

# Content — one shot
[Platform] [content type]. Context: [details]. Tone: [tone].
Output: content only. No preamble.

# Multi-platform batch
Write Instagram (punchy, 8-12 hashtags) + LinkedIn (200w, professional) + Facebook (warm, 120w).
Context: [details]. Output all three, labelled, separated by ---.

# Handoff brief request
Generate a handoff brief: what was completed, what's unfinished,
which lines changed, exact instruction to start the next session.
```
