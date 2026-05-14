/* ═══════════════════════════════════════════════════════════════════
   AL LAITH BUSINESS OS — BRAND VOICE ENGINE
   Shared/brand-voice.js

   Single source of truth for:
   1. The full Al Laith brand voice prompt (used in every AI call)
   2. The Claude API helper (stub-first — works without a key)
   3. Platform-specific prompt builders
   4. Trainable voice layer (paste real posts to teach the model)

   Usage in any zone HTML file:
     <script src="../Shared/storage-schema.js"></script>
     <script src="../Shared/brand-voice.js"></script>
     <script>
       const result = await AlLaithAI.generate({ type: 'instagram', context: { context: 'Scaffolding project in JLT' } });
       console.log(result.text);
     </script>

   To activate live AI: call AlLaithAI.setKey('sk-ant-...') in console.
   Everything else stays the same — no other code changes needed.
═══════════════════════════════════════════════════════════════════ */

(function (window) {
  'use strict';

  /* ─── Configuration ────────────────────────────────────────────
     Set your API key via AlLaithAI.setKey('sk-ant-...')
     Stays in memory only — never stored to disk.
  ─────────────────────────────────────────────────────────────── */
  const CONFIG = {
    apiKey:     '',
    model:      'claude-3-5-haiku-20241022',
    maxTokens:  1500,
    apiUrl:     'https://api.anthropic.com/v1/messages',
    apiVersion: '2023-06-01',
  };

  /* ══════════════════════════════════════════════════════════════
     CORE BRAND VOICE SYSTEM PROMPT
     Source: Prompts/al-laith-brand-voice-context.md
     This is the authoritative Al Laith voice — do not edit
     without updating the source Prompts file.
  ══════════════════════════════════════════════════════════════ */
  const CORE_BRAND_PROMPT = `AL LAITH BRAND VOICE RULES

Company: Al Laith Group — UAE and GCC equipment rental, scaffolding, events infrastructure.
B2B audience: project managers, procurement teams, site supervisors, event directors.
Tagline: "Whatever it takes." — used with precision only, never as filler.

WHO AL LAITH IS:
Al Laith has grown from equipment supplier into a full delivery partner — trusted on the region's most demanding projects. Clients include event organisers running championship sporting events, aviation facilities, oil and gas operators, and major construction programmes across the UAE and wider GCC. Al Laith does not just provide equipment. It solves problems, absorbs complexity, and delivers outcomes — often under pressure, often at scale, always reliably.

THE VOICE IN ONE SENTENCE:
Confident without arrogance. Warm without being casual. Professional without being corporate. Human without being unprofessional. Serious about the work, not serious about itself.

ALWAYS:
- Be specific — use real numbers, locations, timeframes, conditions when available
- Write like someone who has been on the job site, not read about it
- Let pride come through evidence, not claims ("the team had 36 hours — they did it in 28" not "we're the best")
- Be direct — every sentence earns its place, no padding
- Be grounded — language should feel lived-in, not polished to the point of feeling fake
- Allow some personality — a well-placed observation or human moment is fine; forced humour is not
- Adjust tone per platform (LinkedIn = more formal, Instagram = more human, Facebook = warm community)
- Show safety in practice — not as a checkbox or legal disclaimer
- Use "Whatever it takes" ONLY when the post genuinely demonstrates the ethos (real challenge, real deadline, real complexity shown)

NEVER:
- Sound arrogant, boastful, or imply superiority to competitors — confidence comes from showing what you've done
- Reference or imply competitors negatively
- Be disrespectful toward government, regulation, or official bodies in UAE/GCC
- Use generic AI phrases: "world-class", "pleased/excited to announce", "synergy", "cutting-edge", "state-of-the-art", "leverage" (as verb), "solutions" (standalone), "best-in-class", "seamlessly" (overused), "empower", "transformative", "unlock" (metaphor), "journey" (metaphor), "passion/passionate", "proud to partner", "excited to share"
- Make unearned claims — if you can't back it up with a specific, remove it
- Sound like a consumer lifestyle brand — no FOMO energy, no influencer casualness, no exclamation-mark enthusiasm
- Sound like generic AI — if a sentence could come from any company in any industry, rewrite it
- Exaggerate — if something was straightforward, don't dress it up as extraordinary

PROJECT CONTENT STRUCTURE (when writing about jobs):
1. Set the context — what was the project, what was the challenge or scale
2. Show what Al Laith brought — specific equipment, team, approach
3. Land on the outcome — what was delivered, by when, against what odds
Include when available: units deployed, square metres, hours to complete, team size, location (Dubai/Abu Dhabi/Yas Island/ADNEC etc.), client sector, site conditions (summer heat, overnight, Ramadan window etc.)

PRE-PUBLISH CHECK (apply to every output):
1. Would a procurement director be comfortable sharing this in a meeting?
2. Does it sound like a real person wrote it?
3. Is there at least one specific detail (number, location, timeframe, real condition)?
4. Does it make a claim we can't back up?
5. Does it feel like Al Laith — or could it be from any company?

FORMAT RULES:
- Output only the content itself — no preamble, no explanation, no "here is your caption"
- Every sentence earns its place — cut ruthlessly
- Hook line must be specific or unexpected, never generic
- Hashtags at end only, never mid-caption`;

  /* ── Trainable voice layer ─────────────────────────────────────
     Paste real Al Laith posts to fine-tune the AI's output.
     Call AlLaithAI.addVoiceExample(postText, platform)
  ─────────────────────────────────────────────────────────────── */
  let VOICE_EXAMPLES = '';

  function getSystemPrompt(extraContext) {
    let prompt = CORE_BRAND_PROMPT;
    if (VOICE_EXAMPLES.trim()) {
      prompt += `\n\n---\nREAL AL LAITH POST EXAMPLES — match this voice exactly:\n${VOICE_EXAMPLES}`;
    }
    if (extraContext && extraContext.trim()) {
      prompt += `\n\n---\nADDITIONAL CONTEXT FOR THIS REQUEST:\n${extraContext}`;
    }
    return prompt;
  }

  /* ══════════════════════════════════════════════════════════════
     PROMPT BUILDERS — one per content type
  ══════════════════════════════════════════════════════════════ */
  const PROMPTS = {

    instagram(ctx) {
      return `Write an Instagram caption for Al Laith.

What happened / context: ${ctx.context || '(no context provided)'}
Content pillar: ${ctx.pillar || 'Products'}${ctx.scale ? `\nScale / job size: ${ctx.scale}` : ''}${ctx.outcome ? `\nOutcome / result: ${ctx.outcome}` : ''}${ctx.cta ? `\nCTA to include: ${ctx.cta}` : ''}

Deliver:
- 1–2 hook lines that stop the scroll (specific, unexpected, or quietly bold — never generic)
- 2–3 short lines of context or what was done
- 1 CTA line
- 8–12 relevant hashtags at the end (mix broad and niche: #AlLaith #UAE #Dubai etc.)

Return only the caption. No preamble.`;
    },

    linkedin(ctx) {
      return `Write a LinkedIn post for Al Laith.

What happened / context: ${ctx.context || '(no context provided)'}
Content pillar: ${ctx.pillar || 'Products'}${ctx.insight ? `\nKey insight or lesson: ${ctx.insight}` : ''}${ctx.cta ? `\nCTA: ${ctx.cta}` : ''}

Deliver:
- Standalone hook line (make them stop scrolling — specific or unexpected)
- 2–4 short paragraphs (story, insight, or project breakdown)
- Key takeaway
- Subtle, professional CTA
- 150–300 words. Use line breaks generously. Suitable for a procurement director to share.

Return only the post. No preamble.`;
    },

    facebook(ctx) {
      return `Write a Facebook post for Al Laith.

What happened / context: ${ctx.context || '(no context provided)'}
Content pillar: ${ctx.pillar || 'Community'}${ctx.cta ? `\nCTA: ${ctx.cta}` : ''}

Deliver:
- Friendly, grounding opening line
- 2–3 sentences of context + what made this work
- CTA line
- 80–150 words total. Warm, approachable, community-facing.

Return only the post. No preamble.`;
    },

    blog(ctx) {
      return `Write a blog article for Al Laith.

Topic: ${ctx.context || '(no topic provided)'}
Content pillar: ${ctx.pillar || 'Products'}${ctx.targetAudience ? `\nTarget audience: ${ctx.targetAudience}` : ''}${ctx.keywords ? `\nSEO keywords to include: ${ctx.keywords}` : ''}

Deliver:
- SEO-aware title (include terms like "scaffolding hire Dubai", "equipment rental UAE" where natural)
- Intro: hook + what the article covers (~80 words)
- 3–5 H2 sections (100–200 words each)
- Conclusion with non-pushy CTA ("Talk to our team about your next project")
- 600–900 words total. Educate, don't sell. Expert-but-accessible.

Return only the article. No preamble.`;
    },

    reel(ctx) {
      return `Write a video script for Al Laith (Instagram Reel / short-form video).

Topic: ${ctx.context || '(no topic provided)'}
Content pillar: ${ctx.pillar || 'Products'}
Target duration: ${ctx.duration || '45–60 seconds'}

Use this format exactly for every beat:
[VISUAL]: what the camera shows
[AUDIO/VO]: what is said or appears as text on screen
[CAPTION]: text overlay if needed

Structure:
- Hook (0–3 sec): one punchy line or strong visual instruction
- Context / problem (3–15 sec): what is this about?
- The work (15–40 sec): what was done — step by step or highlight reel
- Result + CTA (40–60 sec): the finish, the outcome, the next action

Tone: energetic and confident for Reels. Short sentences. Written for the ear, not the eye.

Return only the script. No preamble.`;
    },

    caption(ctx) {
      return `Write a social media caption for Al Laith.

Hook line to build from: ${ctx.hook || '(write a strong hook)'}
Content pillar: ${ctx.pillar || 'Products'}
Platforms: ${Array.isArray(ctx.platforms) ? ctx.platforms.join(', ') : (ctx.platforms || 'Instagram, LinkedIn')}${ctx.cta ? `\nCTA: ${ctx.cta}` : ''}

3–5 punchy lines. No fluff. End with "Whatever it takes." or a brand-voice variation only if the post earns it.
Return only the caption.`;
    },

    hooks(ctx) {
      return `Generate 3 alternative hook lines for an Al Laith post.

Current hook: "${ctx.currentHook || '(none yet)'}"
Content pillar: ${ctx.pillar || 'Products'}
Context: ${ctx.context || '(none)'}

Rules: short, punchy, direct, specific. Must make someone stop scrolling. Al Laith voice: grounded, earned, confident — not boastful.

Return a JSON array of 3 strings only. No other text. Example: ["Hook one.", "Hook two.", "Hook three."]`;
    },

    hashtags(ctx) {
      return `Suggest 12–15 hashtags for an Al Laith post.

Content pillar: ${ctx.pillar || 'Products'}
Caption: ${ctx.caption || ''}
Platforms: ${Array.isArray(ctx.platforms) ? ctx.platforms.join(', ') : (ctx.platforms || 'Instagram')}

Mix of:
- Broad: #UAE #Dubai #Construction #EquipmentRental
- Mid: #ScaffoldingDubai #GCCConstruction #SiteServices
- Niche: #IPAFCertified #WhateverItTakes #AlLaith

Always include #AlLaith. Use #WhateverItTakes only if the post genuinely earns it.

Return a single space-separated string of hashtags only. No other text.`;
    },

    scorer(ctx) {
      return `Score this Al Laith post across 5 dimensions.

POST:
"""
${ctx.post || '(no post provided)'}
"""

Platform: ${ctx.platform || 'Instagram'}
Content pillar: ${ctx.pillar || 'Products'}

Score each 1–10 and give ONE specific fix for the weakest:
1. Hook Strength — does the first line stop the scroll?
2. Clarity — immediately clear what this is about?
3. CTA — clear next action?
4. Platform Fit — format matches the platform?
5. Brand Voice Match — sounds like Al Laith (specific, grounded, earned confidence)?

Return JSON only, no other text:
{
  "scores": {
    "hook":        { "score": 8, "note": "One sentence note" },
    "clarity":     { "score": 7, "note": "One sentence note" },
    "cta":         { "score": 5, "note": "One sentence note" },
    "platformFit": { "score": 9, "note": "One sentence note" },
    "brandVoice":  { "score": 8, "note": "One sentence note" }
  },
  "weakest": "cta",
  "fix": "Specific one-sentence fix for the weakest dimension."
}`;
    },

    repurpose(ctx) {
      return `Repurpose this Al Laith post for a different platform or format.

ORIGINAL (${ctx.fromPlatform || 'unknown platform'}):
"""
${ctx.post || '(no post provided)'}
"""

Target platform / format: ${ctx.toPlatform || 'LinkedIn'}
Content pillar: ${ctx.pillar || 'Products'}

Adapt for the target — matching its tone, length, and structure rules while keeping the core message. Do not just trim or expand — genuinely rewrite for the new format.

Return only the repurposed post. No preamble.`;
    },

    intelligence(ctx) {
      return `You are a strategic intelligence analyst briefing Al Laith — a UAE/GCC equipment rental, scaffolding, and events company.

Research mode: ${ctx.mode || 'Company Snapshot'}
Subject: ${ctx.subject || '(no subject provided)'}

${ctx.mode === 'Company Snapshot' ? `Provide:
- What they do, size, and market position
- Key products or services
- UAE/GCC presence and recent activity
- Notable projects or clients
- Relevance to Al Laith (opportunity or competitive threat)` : ''}${ctx.mode === 'Competitor Report' ? `Provide:
- Market positioning relative to Al Laith
- Strengths and weaknesses
- Content and marketing approach
- Pricing signals if available
- Strategic implications for Al Laith` : ''}${ctx.mode === 'Trend Intelligence' ? `Provide:
- What the trend is and why it matters for equipment rental / scaffolding / events in GCC
- Content opportunities this creates for Al Laith
- 3–5 specific content angles to pursue now` : ''}${ctx.mode === 'Gap Analysis' ? `Identify:
- Gaps in Al Laith's current content or market positioning
- Competitor advantages that need addressing
- Underserved audience segments
- Recommended strategic moves with rationale` : ''}${ctx.mode === 'Teach Me' ? `Explain ${ctx.subject}:
- In the context of UAE/GCC equipment rental and B2B marketing
- With concrete, actionable examples
- In plain language — not academic, not generic` : ''}

Be specific. Be direct. No padding. No phrases Al Laith doesn't use.`;
    },
  };

  /* ══════════════════════════════════════════════════════════════
     STUB RESPONSES — returned when no API key is set
  ══════════════════════════════════════════════════════════════ */
  const STUBS = {
    instagram:
`Height. Scale. Delivered on time.

Another Al Laith install completed across site — zero disruption to the programme, full handover on schedule.

This is what showing up looks like.

DM us to discuss your next project.

#AlLaith #UAE #Dubai #Scaffolding #EquipmentRental #Construction #GCCConstruction #SiteServices #ScaffoldingDubai #BuildingDubai`,

    linkedin:
`Most people don't think about scaffolding until it goes wrong.

Here's what we check on every single install — and why it matters to your programme.

Al Laith has been delivering complex site solutions across the UAE for years. Not because we have the equipment — everyone has equipment. Because we have the process.

Every access structure we put up is inspected at handover against our internal checklist, not just the minimum compliance standard. It takes longer. It's worth it.

What does your current provider check before handover?

Get in touch if you'd like to talk through your next project.`,

    facebook:
`Big project wrapped up this week.

Our team delivered the full scaffolding install on programme — no disruptions, clean handover. That's how we like to finish a job.

Get in touch if you have an upcoming project. We're ready.`,

    blog:
`# Scaffolding Hire in Dubai: What to Look For Before You Sign

Choosing the right scaffolding provider in Dubai isn't just about price. It's about who shows up when it matters — and what they check before they hand the structure back to you.

[Add your Anthropic API key to generate the full article]`,

    reel:
`[VISUAL]: Close-up of scaffolding frame rising against Dubai skyline
[AUDIO/VO]: "One brief. Zero disruption. Full delivery."
[CAPTION]: Whatever It Takes

[VISUAL]: Team working at height — time-lapse of install
[AUDIO/VO]: "Al Laith handles the complex jobs so your programme stays on track."
[CAPTION]: Equipment Rental · Scaffolding · Events

[VISUAL]: Finished install — clean and signed off
[AUDIO/VO]: "DM us for your next project."
[CAPTION]: @allaith.ae`,

    caption:
`Built for the job. Delivered on time.

Whatever it takes.`,

    hooks:
`["Height. Scale. No excuses.", "Most scaffolding companies talk about delivery. We just do it.", "Zero disruption. Full install. One team."]`,

    hashtags:
`#AlLaith #UAE #Dubai #EquipmentRental #Scaffolding #Construction #GCCConstruction #SiteServices #ScaffoldingDubai #BuildingUAE #ProjectDelivery`,

    scorer:
`{"scores":{"hook":{"score":7,"note":"Solid but could be sharper — add a specific detail"},"clarity":{"score":8,"note":"Message is clear"},"cta":{"score":4,"note":"No clear next action for the reader"},"platformFit":{"score":7,"note":"Format works for this platform"},"brandVoice":{"score":8,"note":"Confident and direct"}},"weakest":"cta","fix":"Add a CTA line: 'DM us to discuss your project.' or 'Get in touch — link in bio.'"}`,

    repurpose:
`[Repurposed version — add your Anthropic API key to generate live content]`,

    intelligence:
`[Research report — add your Anthropic API key to generate live intelligence]`,

    default:
`[AI response — add your Anthropic API key to activate live generation]

To activate: open browser console and call AlLaithAI.setKey('sk-ant-YOUR_KEY_HERE')`,
  };

  /* ══════════════════════════════════════════════════════════════
     CLAUDE API CALL
  ══════════════════════════════════════════════════════════════ */
  async function callClaude(userPrompt, systemPrompt, options) {
    const body = {
      model:      (options && options.model)     || CONFIG.model,
      max_tokens: (options && options.maxTokens) || CONFIG.maxTokens,
      system:     systemPrompt,
      messages:   [{ role: 'user', content: userPrompt }],
    };

    let response;
    if (window.location.protocol === 'https:') {
      // Deployed on Vercel — route through serverless proxy (key stays server-side)
      response = await fetch('/api/claude', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
      });
    } else {
      // Local development — use API key from settings
      const key = CONFIG.apiKey;
      if (!key) throw new Error('NO_API_KEY');
      response = await fetch(CONFIG.apiUrl, {
        method:  'POST',
        headers: {
          'Content-Type':                        'application/json',
          'x-api-key':                           key,
          'anthropic-version':                   CONFIG.apiVersion,
          'anthropic-dangerous-allow-browser-access': 'true',
        },
        body: JSON.stringify(body),
      });
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: { message: response.statusText } }));
      throw new Error((err.error && err.error.message) || `API error ${response.status}`);
    }

    const data = await response.json();
    return data.content.map(b => b.text || '').join('').trim();
  }

  /* ══════════════════════════════════════════════════════════════
     MAIN GENERATE FUNCTION
  ══════════════════════════════════════════════════════════════ */
  async function generate(params) {
    params = params || {};
    const type          = params.type          || 'default';
    const context       = params.context       || {};
    const systemContext = params.systemContext  || '';
    const options       = params.options        || {};

    const builder    = PROMPTS[type];
    const userPrompt = builder ? builder(context) : (context.prompt || 'Generate content for Al Laith.');
    const sysPrompt  = getSystemPrompt(systemContext);
    // On Vercel (https:) always use the proxy — no local key needed
    const isStub     = window.location.protocol !== 'https:' && !CONFIG.apiKey;

    if (isStub) {
      await new Promise(r => setTimeout(r, 380));
      return {
        text: STUBS[type] || STUBS.default,
        stub: true,
        type: type,
        note: 'Stub mode — call AlLaithAI.setKey("sk-ant-...") to activate live AI.',
      };
    }

    try {
      const text = await callClaude(userPrompt, sysPrompt, options);
      return { text: text, stub: false, type: type };
    } catch (err) {
      if (err.message === 'NO_API_KEY') {
        return { text: STUBS[type] || STUBS.default, stub: true, type: type, note: 'No API key.' };
      }
      throw err;
    }
  }

  /* ── Convenience wrappers ─────────────────────────────────────── */
  const quick = {
    instagram:    function(ctx) { return generate({ type: 'instagram',    context: ctx }); },
    linkedin:     function(ctx) { return generate({ type: 'linkedin',     context: ctx }); },
    facebook:     function(ctx) { return generate({ type: 'facebook',     context: ctx }); },
    blog:         function(ctx) { return generate({ type: 'blog',         context: ctx }); },
    reel:         function(ctx) { return generate({ type: 'reel',         context: ctx }); },
    caption:      function(ctx) { return generate({ type: 'caption',      context: ctx }); },
    hooks:        function(ctx) { return generate({ type: 'hooks',        context: ctx }); },
    hashtags:     function(ctx) { return generate({ type: 'hashtags',     context: ctx }); },
    score:        function(ctx) { return generate({ type: 'scorer',       context: ctx }); },
    repurpose:    function(ctx) { return generate({ type: 'repurpose',    context: ctx }); },
    intelligence: function(ctx) { return generate({ type: 'intelligence', context: ctx }); },
  };

  /* ── Voice training ───────────────────────────────────────────── */
  function addVoiceExample(postText, platform) {
    var label = platform ? '[' + platform.toUpperCase() + ']' : '';
    VOICE_EXAMPLES += '\n\n---\n' + label + '\n' + postText.trim();
    console.log('[AlLaithAI] Voice example added. Total:', VOICE_EXAMPLES.split('---').length - 1);
  }

  function clearVoiceExamples() {
    VOICE_EXAMPLES = '';
    console.log('[AlLaithAI] Voice examples cleared.');
  }

  /* ── API key management ───────────────────────────────────────── */
  function setKey(key) {
    CONFIG.apiKey = key ? key.trim() : '';
    if (CONFIG.apiKey) {
      console.log('[AlLaithAI] API key set — live AI generation active.');
    } else {
      console.log('[AlLaithAI] API key cleared — stub mode.');
    }
  }

  function isLive() { return !!CONFIG.apiKey; }

  /* ── Dev helper ───────────────────────────────────────────────── */
  function inspectPrompt(type, ctx) {
    ctx = ctx || {};
    var builder = PROMPTS[type];
    if (!builder) { console.log('Unknown type:', type); return; }
    console.log('=== SYSTEM PROMPT ===\n', getSystemPrompt());
    console.log('=== USER PROMPT ===\n', builder(ctx));
  }

  /* ══════════════════════════════════════════════════════════════
     PUBLIC API — window.AlLaithAI
  ══════════════════════════════════════════════════════════════ */
  window.AlLaithAI = {
    generate:           generate,
    quick:              quick,
    addVoiceExample:    addVoiceExample,
    clearVoiceExamples: clearVoiceExamples,
    setKey:             setKey,
    isLive:             isLive,
    inspectPrompt:      inspectPrompt,
    PROMPTS:            PROMPTS,
    CORE_BRAND_PROMPT:  CORE_BRAND_PROMPT,
    getSystemPrompt:    getSystemPrompt,
    CONFIG:             CONFIG,
    version:            '1.0.0',
  };

  var mode = CONFIG.apiKey ? 'LIVE' : 'STUB';
  console.log('[AlLaithAI] Brand voice engine v1.0.0 ready. Mode: ' + mode + '.');
  if (!CONFIG.apiKey) {
    console.log('[AlLaithAI] To activate: AlLaithAI.setKey("sk-ant-YOUR_KEY_HERE")');
  }

})(window);
