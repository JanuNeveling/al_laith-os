# Al Laith Content Creation Hub — Full Project Context
### Paste this entire document at the start of a new Claude session to continue with full context.

---

## WHO YOU ARE WORKING WITH

**User:** Ethan (ethan.maddern@allaith.com)  
**Company:** Al Laith — UAE/GCC equipment rental company  
**Tagline:** "Whatever It Takes."  
**Brand colours:** Sky Blue `#329FCD` · Corporate Blue `#0071B7` · Navy `#183057` · Dark Navy `#0C172C` · Grey `#72747E`

---

## WHAT WE ARE BUILDING

A local web app called the **Al Laith Content Creation Hub** — an internal marketing pipeline tool. It runs on Ethan's computer as a Node.js + Express server and replaces spreadsheet-based content tracking.

**The problem it solves:** Al Laith runs a campaign requiring **2 posts per day** across LinkedIn, Instagram, and Facebook, across 6 content pillars. The team needed a way to manage the full pipeline — from raw idea to published post — with AI-assisted caption writing, asset matching, and hashtag generation built in.

---

## CONTENT PILLARS (6 total)

1. **Sectors** — industry-specific content (aviation, oil & gas, construction, events, golf)
2. **Products** — equipment spotlight, specs, features, demos
3. **Messaging / Values** — brand story, culture, "Whatever It Takes" ethos
4. **Community** — team, people, behind-the-scenes, celebrations
5. **Interactive** — polls, quizzes, "spot the hazard", engagement posts
6. **Training** — safety, certifications, skills, IPAF/PASMA content

---

## PIPELINE STAGES (6 statuses)

```
idea → planned → raw_collected → editing → caption_needed → ready
```

---

## TECH STACK

- **Backend:** Node.js + Express
- **Database:** SQLite via `better-sqlite3` (WAL mode, file: `hub-app/db/hub.db`)
- **AI:** Anthropic Claude API (`@anthropic-ai/sdk`) — stubbed until API key is added
- **Frontend:** Single-file HTML/CSS/JS — no build step, no framework
- **Asset storage:** Local folder (Google Drive-synced) — scanned on demand, indexed in SQLite
- **Platforms targeted:** LinkedIn, Instagram, Facebook

---

## FILE STRUCTURE

```
Content Creation/
├── hub-app/
│   ├── package.json
│   ├── .env.example
│   ├── .env                         ← user creates this (copy of .env.example)
│   ├── server.js
│   ├── db/
│   │   ├── database.js
│   │   └── hub.db                   ← auto-created on first run
│   ├── routes/
│   │   ├── posts.js
│   │   ├── bank.js
│   │   └── ai.js
│   └── public/
│       ├── index.html
│       └── app.js
├── Brand_Assets/
│   └── logos/
│       └── logo-white.png           ← served at /Brand_Assets/logos/logo-white.png
└── Al_Laith_Hub_Project_Context.md  ← this file
```

---

## CURRENT STATUS

All 6 files are **written and saved**. The app is ready to run. Nothing is pending except first-run verification.

### What is built:
- ✅ Express server with all routes wired
- ✅ SQLite schema + 31 seeded posts covering all 6 statuses
- ✅ REST API: CRUD for posts, asset bank scanning, AI proxy endpoints
- ✅ Full HTML frontend (adapted from UI mockup) with all 5 pages
- ✅ Frontend JS data layer (`app.js`) — renders all pages from API data
- ✅ AI features stubbed (work without API key, activate by adding key to .env)

### What is next:
- ⬜ **First run verification** — `npm install` → `node server.js` → confirm it starts
- ⬜ **Add ANTHROPIC_API_KEY** to `.env` to activate live AI features
- ⬜ **Set ASSET_FOLDER** in `.env` and click "Scan folder" to index content bank
- ⬜ **Brand assets plugin** — a second plugin file with all brand assets for content creation

---

## HOW TO RUN THE APP

```bash
cd "C:\Users\Allaith\Documents\Claude\Projects\Content Creation\hub-app"

# First time only — install dependencies
npm install

# Start the server
npm start
# OR for auto-restart on file changes:
npm run dev

# Then open in browser:
# http://localhost:3000
```

---

## ENVIRONMENT SETUP

Copy `.env.example` to `.env` and fill in:

```env
PORT=3000
ANTHROPIC_API_KEY=your_key_here          # get from console.anthropic.com
ASSET_FOLDER=C:/Users/Allaith/Google Drive/My Drive/Al Laith Content Bank
CLAUDE_MODEL=claude-sonnet-4-6
```

The app runs fully without the API key — AI buttons return stub responses with a note explaining how to activate.

---

## AI FEATURES (all stubbed, Claude-ready)

| Endpoint | Function |
|---|---|
| `POST /api/ai/caption` | Write brand-voice captions |
| `POST /api/ai/hooks` | Generate 3 hook variations |
| `POST /api/ai/hashtags` | Suggest 10–15 hashtags |
| `POST /api/ai/match` | Match assets to a post idea (scans content bank) |

**Brand system prompt used for all AI calls:**
> You are the content strategist for Al Laith, a UAE/GCC equipment rental company. Brand voice: direct, confident, professional. Never fluffy or salesy. Tagline: "Whatever it takes." Every caption ends with "Whatever it takes." or a variation of the tagline. Pillars: Sectors, Products, Messaging/Values, Community, Interactive, Training. Platforms: LinkedIn (professional long-form), Instagram (punchy, visual-first), Facebook (community tone).

---

---
# COMPLETE CODE FILES
---

## FILE 1: `hub-app/package.json`

```json
{
  "name": "al-laith-hub",
  "version": "1.0.0",
  "description": "Al Laith Content Creation Hub — internal marketing pipeline tool",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.27.0",
    "better-sqlite3": "^9.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

## FILE 2: `hub-app/.env.example`

```env
# Copy this file to .env and fill in your values

# Server port (default: 3000)
PORT=3000

# Anthropic API key — get one at console.anthropic.com
# Add this when ready to enable AI features (caption writing, asset matching, hook suggestions)
ANTHROPIC_API_KEY=your_key_here

# Path to your content bank folder (photos, videos, graphics)
# This should be the local path to your Google Drive-synced content folder
# Windows example:
ASSET_FOLDER=C:/Users/Allaith/Google Drive/My Drive/Al Laith Content Bank

# Claude model to use for AI features
CLAUDE_MODEL=claude-sonnet-4-6
```

---

## FILE 3: `hub-app/server.js`

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Serve Brand_Assets from the parent Content Creation folder
app.use('/Brand_Assets', express.static(path.join(__dirname, '..', 'Brand_Assets')));

// ── API Routes ──────────────────────────────────────────────
app.use('/api/posts',    require('./routes/posts'));
app.use('/api/bank',     require('./routes/bank'));
app.use('/api/ai',       require('./routes/ai'));

// Pillar balance stats — posts per pillar in last 14 days
app.get('/api/stats/pillars', (req, res) => {
  try {
    const { getDb } = require('./db/database');
    const db = getDb();
    const rows = db.prepare(`
      SELECT pillar, COUNT(*) AS count
      FROM posts
      WHERE created_at >= datetime('now', '-14 days')
      GROUP BY pillar
      ORDER BY count DESC
    `).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── SPA fallback ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start ───────────────────────────────────────────────────
const { initDb } = require('./db/database');

try {
  initDb();
  app.listen(PORT, () => {
    console.log('');
    console.log('  ┌─────────────────────────────────────────┐');
    console.log('  │  Al Laith Content Creation Hub          │');
    console.log(`  │  Running at http://localhost:${PORT}         │`);
    console.log('  │                                         │');
    console.log('  │  Press Ctrl+C to stop                   │');
    console.log('  └─────────────────────────────────────────┘');
    console.log('');
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_key_here') {
      console.log('  ⚠  No ANTHROPIC_API_KEY found — AI features are stubbed.');
      console.log('     Add your key to .env to enable live AI features.\n');
    }
  });
} catch (err) {
  console.error('Failed to start:', err);
  process.exit(1);
}
```

---

## FILE 4: `hub-app/db/database.js`

```javascript
const Database = require('better-sqlite3');
const path = require('path');

let db;

function getDb() {
  if (!db) {
    db = new Database(path.join(__dirname, 'hub.db'));
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDb() {
  const db = getDb();

  // ── Schema ───────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      title         TEXT NOT NULL,
      snippet       TEXT,
      pillar        TEXT NOT NULL DEFAULT 'Products',
      secondary_tags TEXT DEFAULT '[]',
      platforms     TEXT DEFAULT '["Instagram","LinkedIn","Facebook"]',
      status        TEXT NOT NULL DEFAULT 'idea',
      hook          TEXT,
      caption       TEXT,
      hashtags      TEXT,
      cta           TEXT,
      edit_notes    TEXT,
      asset_ids     TEXT DEFAULT '[]',
      schedule_date TEXT,
      series        TEXT,
      campaign      TEXT,
      target_sector TEXT,
      created_at    TEXT DEFAULT (datetime('now')),
      updated_at    TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS assets (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      filename    TEXT NOT NULL,
      filepath    TEXT NOT NULL,
      pillar      TEXT,
      type        TEXT DEFAULT 'photo',
      usage_count INTEGER DEFAULT 0,
      ai_tags     TEXT DEFAULT '[]',
      created_at  TEXT DEFAULT (datetime('now')),
      UNIQUE(filepath)
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // ── Seed posts if empty ──────────────────────────────────
  const count = db.prepare('SELECT COUNT(*) AS c FROM posts').get().c;
  if (count === 0) {
    const today = new Date().toISOString().split('T')[0];

    function d(offset) {
      const dt = new Date();
      dt.setDate(dt.getDate() + offset);
      return dt.toISOString().split('T')[0];
    }

    const seed = [
      // ── READY ───────────────────────────────────────────
      { title: 'Fuel tank launch — product spotlight',   snippet: 'Hero shot of new fuel tank with spec overlay.', pillar: 'Products',    status: 'ready',          schedule_date: today },
      { title: 'Yard team behind-the-scenes',            snippet: 'Candid crew moment — group in the yard.',       pillar: 'Community',   status: 'ready',          schedule_date: today },
      { title: 'ISO certification announcement',         snippet: 'Pure graphic — stat card.',                    pillar: 'Training',    status: 'ready',          schedule_date: null  },
      { title: 'Aviation sector spotlight Q2',           snippet: 'Stats post: hours, jobs, growth.',             pillar: 'Sectors',     status: 'ready',          schedule_date: null  },
      { title: 'Founder Q&A — episode 3',               snippet: 'Long-form for LinkedIn.',                      pillar: 'Messaging',   status: 'ready',          schedule_date: null  },
      { title: 'Golf course ready — buggy fleet',        snippet: '"From construction sites to golf courses."',   pillar: 'Sectors',     status: 'ready',          schedule_date: null  },
      { title: 'Hardhat required. No exceptions.',       snippet: 'Portrait + side gradient. Eye contact, direct.', pillar: 'Messaging', status: 'ready',          schedule_date: null  },

      // ── PLANNED ─────────────────────────────────────────
      { title: 'Aviation Q2 wrap-up',                   snippet: 'Stats post: hours flown, jobs completed, growth.', pillar: 'Sectors',  status: 'planned',        schedule_date: d(7)  },
      { title: 'Forklift cert — class 14 graduation',   snippet: 'Group photo + certificate ceremony. Carousel.',    pillar: 'Training', status: 'planned',        schedule_date: d(2)  },
      { title: 'Generator service tip — weekly',        snippet: '30-sec reel. Hook: "Most generators die from this."', pillar: 'Products', status: 'planned',     schedule_date: d(4)  },
      { title: '#NumbersOnSite — 43m',                  snippet: 'The reach of our tallest boom. Skyscrapers were built with shorter.', pillar: 'Sectors', status: 'planned', schedule_date: d(1) },
      { title: '#KitOfTheWeek — Boom lift 43m',         snippet: '"This week: 43 metres of vertical."',           pillar: 'Products',    status: 'planned',        schedule_date: d(1)  },

      // ── RAW COLLECTED ────────────────────────────────────
      { title: 'Compressor in action — yard 3',         snippet: '12 photos, 4 video clips. Needs LR pass + cuts.', pillar: 'Products',  status: 'raw_collected',  schedule_date: null  },
      { title: 'Eid celebration team photo',            snippet: 'Group shot, 3 candids. Caption pending.',        pillar: 'Community',   status: 'raw_collected',  schedule_date: null  },
      { title: 'Construction site — JV partner visit',  snippet: 'Drone footage + ground photos.',                pillar: 'Sectors',     status: 'raw_collected',  schedule_date: null  },
      { title: 'First aid refresher class',             snippet: 'Action shots from yesterday\'s session.',       pillar: 'Training',    status: 'raw_collected',  schedule_date: null  },

      // ── EDITING ──────────────────────────────────────────
      { title: 'Fuel tank launch — hero shot',          snippet: 'PSD open. Need: drop shadow, brand bar bottom.', pillar: 'Products',   status: 'editing',        schedule_date: null  },
      { title: 'Yard team BTS reel',                    snippet: 'DaVinci timeline. 30 sec target. Music chosen.', pillar: 'Community',  status: 'editing',        schedule_date: null  },
      { title: 'Poll graphic — PPE upgrade',            snippet: 'Need: this-or-that template applied.',           pillar: 'Interactive', status: 'editing',        schedule_date: null  },

      // ── CAPTION NEEDED ───────────────────────────────────
      { title: 'Oil & gas project handover',            snippet: 'Photos done. Need caption + hashtags. AI suggested 3 variants.', pillar: 'Sectors', status: 'caption_needed', schedule_date: null },
      { title: 'ISO 9001 certificate post',             snippet: 'Graphic done. Caption draft. CTA pending.',     pillar: 'Training',    status: 'caption_needed', schedule_date: null  },

      // ── IDEAS ─────────────────────────────────────────────
      { title: '"Day in the life of a forklift trainer"', snippet: 'Reel format, 60s target.',                   pillar: 'Training',    status: 'idea',           schedule_date: null  },
      { title: 'Throwback Tuesday: 2018 oil & gas project', snippet: 'Archive site photo + story.',             pillar: 'Sectors',     status: 'idea',           schedule_date: null  },
      { title: 'Poll: which PPE do you upgrade first?', snippet: 'Interactive poll graphic.',                    pillar: 'Interactive', status: 'idea',           schedule_date: null  },
      { title: 'Fuel tank — torture test reel',         snippet: 'Show tank surviving impact, dust, water. Hook: "We tested it so you don\'t have to."', pillar: 'Products', status: 'idea', schedule_date: null },
      { title: 'Skill of the week — banksman signals',  snippet: 'Carousel teaching 8 most-used hand signals on site.', pillar: 'Training', status: 'idea',      schedule_date: null  },
      { title: '"Spot the hazard" Friday',              snippet: 'Site photo with hidden hazards. Comment to spot. Winner gets a shoutout.', pillar: 'Interactive', status: 'idea', schedule_date: null },
      { title: 'Yard team takeover — Ahmed',            snippet: 'Day in the life. Stories series.',              pillar: 'Community',   status: 'idea',           schedule_date: null  },
      { title: 'Origin story video — founder',          snippet: '2-min interview. Why we exist. For LinkedIn.',  pillar: 'Messaging',   status: 'idea',           schedule_date: null  },
      { title: '#YardWalkWednesday — EP01: The full lap', snippet: 'POV reel walking every zone of the yard. 30–45 sec.', pillar: 'Community', status: 'idea',   schedule_date: null  },
      { title: '#SafetyMinute — Three checks before you climb', snippet: 'Boom lift pre-use inspection. 30s reel.', pillar: 'Training', status: 'idea',           schedule_date: null  },
    ];

    const insert = db.prepare(`
      INSERT INTO posts (title, snippet, pillar, status, schedule_date)
      VALUES (@title, @snippet, @pillar, @status, @schedule_date)
    `);

    const insertMany = db.transaction((rows) => {
      for (const row of rows) insert.run(row);
    });

    insertMany(seed);
    console.log(`  ✓ Database seeded with ${seed.length} posts.`);
  }

  console.log('  ✓ Database ready.');
}

module.exports = { getDb, initDb };
```

---

## FILE 5: `hub-app/routes/posts.js`

```javascript
const express = require('express');
const router = express.Router();
const { getDb } = require('../db/database');

// ── GET /api/posts — list with filters ─────────────────────
router.get('/', (req, res) => {
  try {
    const { status, pillar, limit = 100, offset = 0 } = req.query;
    const db = getDb();

    let query = 'SELECT * FROM posts WHERE 1=1';
    const params = {};

    if (status) { query += ' AND status = @status'; params.status = status; }
    if (pillar) { query += ' AND pillar = @pillar'; params.pillar = pillar; }

    query += ' ORDER BY created_at DESC LIMIT @limit OFFSET @offset';
    params.limit  = parseInt(limit);
    params.offset = parseInt(offset);

    res.json(db.prepare(query).all(params));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/posts/today — posts for today ─────────────────
router.get('/today', (req, res) => {
  try {
    const db = getDb();
    const today = new Date().toISOString().split('T')[0];

    const scheduled = db.prepare(`
      SELECT * FROM posts WHERE schedule_date = ? ORDER BY created_at ASC
    `).all(today);

    const queued = db.prepare(`
      SELECT * FROM posts
      WHERE status = 'ready' AND (schedule_date IS NULL OR schedule_date = '')
      ORDER BY created_at DESC
      LIMIT ?
    `).all(Math.max(0, 4 - scheduled.length));

    const all = [...scheduled, ...queued].slice(0, 4);
    res.json({ posts: all, target: 4, ready: all.filter(p => p.status === 'ready').length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/posts/calendar/:year/:month ───────────────────
router.get('/calendar/:year/:month', (req, res) => {
  try {
    const { year, month } = req.params;
    const db = getDb();
    const posts = db.prepare(`
      SELECT * FROM posts
      WHERE strftime('%Y', schedule_date) = ?
        AND strftime('%m', schedule_date) = ?
      ORDER BY schedule_date ASC, created_at ASC
    `).all(year, month.padStart(2, '0'));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/posts/:id — single post ──────────────────────
router.get('/:id', (req, res) => {
  try {
    const db = getDb();
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/posts — create ───────────────────────────────
router.post('/', (req, res) => {
  try {
    const db = getDb();
    const {
      title, snippet, pillar = 'Products', status = 'idea',
      hook, caption, hashtags, cta, edit_notes,
      schedule_date, series, campaign, target_sector,
      platforms, secondary_tags
    } = req.body;

    if (!title) return res.status(400).json({ error: 'title is required' });

    const result = db.prepare(`
      INSERT INTO posts
        (title, snippet, pillar, status, hook, caption, hashtags, cta,
         edit_notes, schedule_date, series, campaign, target_sector,
         platforms, secondary_tags)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title, snippet || null, pillar, status,
      hook || null, caption || null, hashtags || null, cta || null,
      edit_notes || null, schedule_date || null,
      series || null, campaign || null, target_sector || null,
      JSON.stringify(platforms || ['Instagram', 'LinkedIn', 'Facebook']),
      JSON.stringify(secondary_tags || [])
    );

    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/posts/:id — update ────────────────────────────
router.put('/:id', (req, res) => {
  try {
    const db = getDb();
    const existing = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const allowed = [
      'title', 'snippet', 'pillar', 'status', 'hook', 'caption',
      'hashtags', 'cta', 'edit_notes', 'schedule_date', 'series',
      'campaign', 'target_sector', 'platforms', 'secondary_tags', 'asset_ids'
    ];

    const sets   = [];
    const values = [];

    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        sets.push(`${field} = ?`);
        const v = req.body[field];
        values.push(Array.isArray(v) || typeof v === 'object' ? JSON.stringify(v) : v);
      }
    }

    if (sets.length === 0) return res.json(existing);

    sets.push("updated_at = datetime('now')");
    db.prepare(`UPDATE posts SET ${sets.join(', ')} WHERE id = ?`).run(...values, req.params.id);

    res.json(db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/posts/:id ──────────────────────────────────
router.delete('/:id', (req, res) => {
  try {
    const db = getDb();
    const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

## FILE 6: `hub-app/routes/bank.js`

```javascript
const express = require('express');
const router  = express.Router();
const path    = require('path');
const fs      = require('fs');
const { getDb } = require('../db/database');

const IMAGE_EXTS   = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.cr3', '.dng', '.raw', '.tif', '.tiff']);
const VIDEO_EXTS   = new Set(['.mp4', '.mov', '.avi', '.mkv', '.mts', '.m4v']);
const GRAPHIC_EXTS = new Set(['.psd', '.ai', '.eps', '.svg']);

function typeFromExt(ext) {
  if (IMAGE_EXTS.has(ext))   return 'photo';
  if (VIDEO_EXTS.has(ext))   return 'video';
  if (GRAPHIC_EXTS.has(ext)) return 'graphic';
  return null;
}

// ── GET /api/bank — list assets ────────────────────────────
router.get('/', (req, res) => {
  try {
    const { pillar, type, usage, limit = 50, offset = 0 } = req.query;
    const db = getDb();

    let query = 'SELECT * FROM assets WHERE 1=1';
    const params = {};

    if (pillar) { query += ' AND pillar = @pillar'; params.pillar = pillar; }
    if (type)   { query += ' AND type = @type';     params.type = type;     }
    if (usage === 'unused')    { query += ' AND usage_count = 0'; }
    if (usage === 'used_once') { query += ' AND usage_count = 1'; }
    if (usage === 'overused')  { query += ' AND usage_count >= 2'; }

    query += ' ORDER BY created_at DESC LIMIT @limit OFFSET @offset';
    params.limit  = parseInt(limit);
    params.offset = parseInt(offset);

    const assets = db.prepare(query).all(params);
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/bank/scan — scan a folder and index files ────
router.post('/scan', (req, res) => {
  try {
    const folderPath = req.body.folder_path || process.env.ASSET_FOLDER;

    if (!folderPath) {
      return res.status(400).json({
        error: 'No folder path provided. Set ASSET_FOLDER in .env or pass folder_path in body.'
      });
    }

    if (!fs.existsSync(folderPath)) {
      return res.status(400).json({ error: `Folder not found: ${folderPath}` });
    }

    function scanDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      let files = [];
      for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) {
          files = files.concat(scanDir(full));
        } else if (e.isFile()) {
          const ext  = path.extname(e.name).toLowerCase();
          const type = typeFromExt(ext);
          if (type) files.push({ name: e.name, fullPath: full, type });
        }
      }
      return files;
    }

    const files = scanDir(folderPath);
    const db    = getDb();

    const insert = db.prepare(`
      INSERT OR IGNORE INTO assets (filename, filepath, type)
      VALUES (?, ?, ?)
    `);

    let added = 0;
    const insertMany = db.transaction(() => {
      for (const f of files) {
        const r = insert.run(f.name, f.fullPath, f.type);
        if (r.changes > 0) added++;
      }
    });
    insertMany();

    res.json({ scanned: files.length, added, folder: folderPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/bank/file/:id — serve the raw file ───────────
router.get('/file/:id', (req, res) => {
  try {
    const db    = getDb();
    const asset = db.prepare('SELECT * FROM assets WHERE id = ?').get(req.params.id);

    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    if (!fs.existsSync(asset.filepath)) {
      return res.status(404).json({ error: 'File not found on disk: ' + asset.filepath });
    }

    res.sendFile(asset.filepath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/bank/:id — update asset metadata ─────────────
router.put('/:id', (req, res) => {
  try {
    const db    = getDb();
    const asset = db.prepare('SELECT * FROM assets WHERE id = ?').get(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Not found' });

    const { pillar, ai_tags, usage_count } = req.body;
    const sets   = [];
    const values = [];

    if (pillar !== undefined)      { sets.push('pillar = ?');      values.push(pillar); }
    if (ai_tags !== undefined)     { sets.push('ai_tags = ?');     values.push(JSON.stringify(ai_tags)); }
    if (usage_count !== undefined) { sets.push('usage_count = ?'); values.push(parseInt(usage_count)); }

    if (sets.length === 0) return res.json(asset);

    db.prepare(`UPDATE assets SET ${sets.join(', ')} WHERE id = ?`).run(...values, req.params.id);
    res.json(db.prepare('SELECT * FROM assets WHERE id = ?').get(req.params.id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

## FILE 7: `hub-app/routes/ai.js`

```javascript
const express = require('express');
const router  = express.Router();

function getAnthropicClient() {
  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_key_here') {
    return null;
  }
  const Anthropic = require('@anthropic-ai/sdk');
  return new Anthropic.Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';

const BRAND_SYSTEM = `You are the content strategist for Al Laith, a UAE/GCC equipment rental company.
Brand voice: direct, confident, professional. Never fluffy or salesy.
Tagline: "Whatever It Takes."
Every caption ends with "Whatever it takes." or a variation of the tagline.
Pillars: Sectors, Products, Messaging/Values, Community, Interactive, Training.
Platforms: LinkedIn (professional long-form), Instagram (punchy, visual-first), Facebook (community tone).`;

// ── POST /api/ai/match — match assets to a post idea ──────
router.post('/match', async (req, res) => {
  try {
    const client = getAnthropicClient();
    const { post_title, post_pillar, post_snippet } = req.body;
    const { getDb } = require('../db/database');

    const db     = getDb();
    const assets = db.prepare('SELECT id, filename, type, pillar, ai_tags FROM assets ORDER BY RANDOM() LIMIT 20').all();

    if (!client || assets.length === 0) {
      return res.json({
        stub: true,
        matches: [
          { asset_id: null, filename: 'example_hero_shot.jpg',     score: 94, reason: 'Wide-angle hero shot with strong product visibility and dramatic lighting. Best for hook frame.' },
          { asset_id: null, filename: 'example_action_footage.mp4', score: 81, reason: 'Action footage relevant to this post concept. Use for key beat in reel.' },
          { asset_id: null, filename: 'example_detail_shot.jpg',   score: 76, reason: 'Supporting detail shot. Good for secondary slides or carousel frame.' }
        ],
        note: assets.length === 0
          ? 'Content bank is empty. Run POST /api/bank/scan to index your asset folder.'
          : 'Add ANTHROPIC_API_KEY to .env to enable real AI matching.'
      });
    }

    const assetList = assets.map(a =>
      `ID:${a.id} | ${a.filename} | type:${a.type} | pillar:${a.pillar || 'unset'} | tags:${a.ai_tags}`
    ).join('\n');

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: BRAND_SYSTEM,
      messages: [{
        role: 'user',
        content: `Post idea: "${post_title}" (pillar: ${post_pillar})\nContext: ${post_snippet || ''}\n\nAvailable assets:\n${assetList}\n\nReturn the top 3 matching assets as JSON array: [{asset_id, filename, score (0-100), reason (1 sentence)}]. Only return the JSON array, nothing else.`
      }]
    });

    const text  = message.content[0].text.trim();
    const match = text.match(/\[[\s\S]*\]/);
    const matches = match ? JSON.parse(match[0]) : [];
    res.json({ matches });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/ai/caption — write a caption ────────────────
router.post('/caption', async (req, res) => {
  try {
    const client = getAnthropicClient();
    const { hook, pillar, platforms = [], cta, secondary_tags = [] } = req.body;

    if (!client) {
      return res.json({
        stub: true,
        caption: `[Claude API not connected]\n\nHook: ${hook || '...'}\n\nThis is where your brand-voice caption would appear — written in Al Laith's direct, confident tone for ${platforms.join(' + ') || 'your platforms'}.\n\nBuilt for the field. Ready for the site.\n\nWhatever it takes.`,
        note: 'Add ANTHROPIC_API_KEY to .env to enable real caption generation.'
      });
    }

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: BRAND_SYSTEM,
      messages: [{
        role: 'user',
        content: `Write a social media caption for Al Laith.
Pillar: ${pillar}
Hook (first line): ${hook || 'Write a strong hook'}
Platforms: ${platforms.join(', ') || 'Instagram, LinkedIn'}
CTA: ${cta || 'DM for more info'}
Tags: ${secondary_tags.join(', ')}

Write 3–5 punchy lines. No fluff. End with "Whatever it takes." or a brand-voice variation. Return only the caption text.`
      }]
    });

    res.json({ caption: message.content[0].text.trim() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/ai/hooks — suggest hook variations ──────────
router.post('/hooks', async (req, res) => {
  try {
    const client = getAnthropicClient();
    const { current_hook, pillar, snippet } = req.body;

    if (!client) {
      return res.json({
        stub: true,
        variations: [
          '"Built tough. Tested tougher."',
          '"What survives our yard, survives anything."',
          '"500kg drop test. Zero damage."'
        ],
        note: 'Add ANTHROPIC_API_KEY to .env to enable real hook suggestions.'
      });
    }

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      system: BRAND_SYSTEM,
      messages: [{
        role: 'user',
        content: `Current hook: "${current_hook}"\nPillar: ${pillar}\nContext: ${snippet || ''}\n\nWrite 3 alternative hooks — short, punchy, direct. No fluffy language. JSON array of strings only.`
      }]
    });

    const text      = message.content[0].text.trim();
    const match     = text.match(/\[[\s\S]*\]/);
    const variations = match ? JSON.parse(match[0]) : [text];
    res.json({ variations });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/ai/hashtags — suggest hashtags ──────────────
router.post('/hashtags', async (req, res) => {
  try {
    const client = getAnthropicClient();
    const { pillar, caption, platforms = [] } = req.body;

    if (!client) {
      return res.json({
        stub: true,
        hashtags: '#AlLaith #UAE #GCC #EquipmentRental #Construction #WhateverItTakes #SiteServices #Dubai',
        note: 'Add ANTHROPIC_API_KEY to .env to enable real hashtag suggestions.'
      });
    }

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 150,
      system: BRAND_SYSTEM,
      messages: [{
        role: 'user',
        content: `Pillar: ${pillar}\nCaption: ${caption || ''}\nPlatforms: ${platforms.join(', ')}\n\nSuggest 10–15 relevant hashtags for Al Laith. Mix broad (#UAE) and niche (#IPAFCertified). Return as a single space-separated string of hashtags only.`
      }]
    });

    res.json({ hashtags: message.content[0].text.trim() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

## FILE 8: `hub-app/public/index.html`

> **Note:** This file is 560 lines. It contains all CSS, SVG icon defs, and 5 page sections. The key structure is below — read the actual file at the path above for the complete version, as it is too large to duplicate verbatim here without exceeding paste limits. The containers app.js populates are listed in the API Contract section below.

**Key IDs app.js reads/writes:**

| ID | Page | Purpose |
|---|---|---|
| `dash-alert` / `dash-alert-text` | Dashboard | Warning banner |
| `today-badge` | Dashboard | "2/4" badge |
| `quota-fill` | Dashboard | Progress bar fill |
| `today-posts` | Dashboard | Post rows for today |
| `ready-posts` / `ready-badge` | Dashboard | Ready queue |
| `ideas-waiting` / `ideas-badge` | Dashboard | Ideas count |
| `pillar-balance` | Dashboard | Bar chart container |
| `pillar-suggest` | Dashboard | AI suggestion text |
| `recent-uploads` | Dashboard | 12-thumb grid |
| `kanban-board` | Ideas | 6-column kanban |
| `bank-grid` | Content Bank | Asset card grid |
| `f-all-pillar` | Content Bank | "All pillars" checkbox |
| `f-pillar` (class) | Content Bank | Specific pillar checkboxes |
| `f-type` (class) | Content Bank | Type filter checkboxes |
| `f-usage` (class) | Content Bank | Usage filter checkboxes |
| `c-title`, `c-hook`, `c-caption`, `c-hashtags`, `c-cta`, `c-notes` | Composer | Form inputs |
| `c-pillar`, `c-series`, `c-date` | Composer | Select/date inputs |
| `c-save-status` | Composer | Save feedback text |
| `hook-strip` | Composer | AI hook suggestion strip |
| `cal-grid` / `cal-title` | Calendar | Month grid |
| `match-grid` / `match-title` / `match-sub` | Modal | AI match results |
| `api-status` | Sidebar footer | DB connection status |
| `page-title` | Topbar | Current page name |

**Global functions referenced from HTML (defined in app.js):**

```
navigate(page)          showComposer(post?)     showIdeasFiltered(status)
openMatchModal(postId?) closeMatchModal()        scanBank()
applyBankFilter()       saveDraft()             markReady()
aiHooks()              aiCaption()              aiHashtags()
calNav(offset)         calToday()               editPost(id)
selectHook(el)         viewAsset(id)            calDayClick(dateStr)
```

---

## FILE 9: `hub-app/public/app.js`

```javascript
/* ══════════════════════════════════════════════════════════════
   Al Laith Content Creation Hub  —  app.js  v1.0
   Frontend data layer: fetches from local Express API and
   renders Dashboard, Kanban, Content Bank, Composer, Calendar.
══════════════════════════════════════════════════════════════ */

const PILLARS = ['Sectors','Products','Messaging','Community','Interactive','Training'];

const STATUS_META = {
  idea:           { label: 'Idea',           icon: 'i-bulb',  color: 'var(--primary)' },
  planned:        { label: 'Planned',         icon: 'i-clock', color: 'var(--warn)' },
  raw_collected:  { label: 'Raw / Shot',      icon: 'i-image', color: '#4A5C7E' },
  editing:        { label: 'Editing',          icon: 'i-edit',  color: 'var(--p-interactive)' },
  caption_needed: { label: 'Caption Needed',   icon: 'i-tag',   color: 'var(--p-community)' },
  ready:          { label: 'Ready',            icon: 'i-check', color: 'var(--success)' }
};

const PILLAR_COLORS = {
  Sectors: 'var(--p-sectors)', Products: 'var(--p-products)',
  Messaging: 'var(--p-messaging)', Community: 'var(--p-community)',
  Interactive: 'var(--p-interactive)', Training: 'var(--p-training)'
};

const state = {
  page: 'dashboard', calYear: new Date().getFullYear(),
  calMonth: new Date().getMonth() + 1, editingPostId: null, matchPostId: null
};

const $  = id  => document.getElementById(id);
const qs = sel => document.querySelector(sel);

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function svgUse(id, size=16) { return `<svg width="${size}" height="${size}" style="flex-shrink:0"><use href="#${id}"/></svg>`; }
function parseJson(val, fallback=[]) { if(!val) return fallback; if(Array.isArray(val)) return val; try{return JSON.parse(val);}catch{return fallback;} }
function fmtDate(d) { if(!d) return ''; return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'}); }
function todayStr() { return new Date().toISOString().split('T')[0]; }
function monthStr(m) { return String(m).padStart(2,'0'); }
function pillarClass(p) { return 'pillar-'+(p||'products').toLowerCase().replace(/\s+/g,'-'); }
function pillarTagHtml(p) { return `<span class="pillar-tag ${pillarClass(p)}">${esc(p||'Unset')}</span>`; }
function platformChipsHtml(platforms) {
  return parseJson(platforms,['Instagram','LinkedIn','Facebook']).map(p=>`<span class="platform-chip">${esc(p)}</span>`).join('');
}

async function api(method, url, body) {
  const opts = { method, headers: {'Content-Type':'application/json'} };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const r = await fetch(url, opts);
  if (!r.ok) { const err = await r.json().catch(()=>({error:r.statusText})); throw new Error(err.error||`${method} ${url} → ${r.status}`); }
  return r.json();
}

const PAGE_TITLES = { dashboard:'Dashboard', ideas:'Idea Board', bank:'Content Bank', composer:'Composer', calendar:'Content Calendar' };

function navigate(page) {
  state.page = page;
  document.querySelectorAll('.nav-item[data-page]').forEach(el => { el.classList.toggle('active', el.dataset.page===page && !el.dataset.pilter); });
  document.querySelectorAll('.page').forEach(el => { el.classList.toggle('active', el.id===page); });
  $('page-title').textContent = PAGE_TITLES[page] || 'Hub';
  if (page==='dashboard') loadDashboard();
  if (page==='ideas')     loadKanban();
  if (page==='bank')      applyBankFilter();
  if (page==='calendar')  loadCalendar();
}

function showComposer(post=null) { clearComposer(); navigate('composer'); if(post) fillComposer(post); }
function showIdeasFiltered(status) { navigate('ideas'); setTimeout(()=>{ const col=document.querySelector(`[data-status="${status}"]`); if(col) col.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'}); },500); }

async function loadDashboard() {
  const [todayRes,readyRes,ideasRes,pillarRes,bankRes] = await Promise.allSettled([
    api('GET','/api/posts/today'), api('GET','/api/posts?status=ready&limit=6'),
    api('GET','/api/posts?status=idea&limit=6'), api('GET','/api/stats/pillars'), api('GET','/api/bank?limit=12')
  ]);
  if(todayRes.status==='fulfilled')  renderTodaySection(todayRes.value);
  if(readyRes.status==='fulfilled')  renderReadyQueue(readyRes.value);
  if(ideasRes.status==='fulfilled')  renderIdeasWaiting(ideasRes.value);
  if(pillarRes.status==='fulfilled') renderPillarBalance(pillarRes.value);
  if(bankRes.status==='fulfilled')   renderRecentUploads(bankRes.value);
  const readyCount = todayRes.value?.ready??0, target = todayRes.value?.target??4;
  renderDashAlert(readyCount, target);
}

function renderDashAlert(ready,target) {
  const alert=$('dash-alert'),text=$('dash-alert-text'); if(!alert||!text) return;
  if(ready<target){ const gap=target-ready; text.textContent=`${gap} more post${gap>1?'s':''} needed today to hit your daily target of ${target}.`; alert.style.display='flex'; }
  else { alert.style.display='none'; }
}

function renderTodaySection(data) {
  const posts=data.posts||[], ready=data.ready??posts.filter(p=>p.status==='ready').length, target=data.target??4;
  const pct=Math.min(100,Math.round((ready/target)*100));
  $('today-badge').textContent=`${ready}/${target}`;
  const fill=$('quota-fill'); fill.style.width=Math.max(6,pct)+'%';
  fill.textContent=ready>=target?`✓ ${ready} ready — target hit!`:`${ready} of ${target} ready`;
  if(posts.length===0){ $('today-posts').innerHTML=`<div class="loading-row">No posts scheduled for today. <a href="#" onclick="showComposer();return false;" style="color:var(--primary)">Create one →</a></div>`; return; }
  $('today-posts').innerHTML=posts.map(postRowHtml).join('');
}

function renderReadyQueue(posts) {
  $('ready-badge').textContent=posts.length;
  $('ready-posts').innerHTML=posts.length===0?'<div class="loading-row">No posts marked ready yet.</div>':posts.slice(0,4).map(postRowHtml).join('');
}

function renderIdeasWaiting(posts) {
  $('ideas-badge').textContent=posts.length;
  $('ideas-waiting').innerHTML=posts.length===0?`<div class="loading-row">No ideas yet. <a href="#" onclick="showComposer();return false;" style="color:var(--primary)">Add one →</a></div>`:posts.slice(0,4).map(postRowHtml).join('');
}

function postRowHtml(post) {
  return `<div class="post-row"><div class="post-thumb empty">${svgUse('i-image',22)}</div><div class="post-meta"><div class="post-title">${esc(post.title)}</div><div class="post-sub">${pillarTagHtml(post.pillar)}${post.schedule_date?`<span style="display:inline-flex;align-items:center;gap:4px">${svgUse('i-clock',11)} ${fmtDate(post.schedule_date)}</span>`:''}${platformChipsHtml(post.platforms)}</div></div><div class="post-actions"><button class="btn btn-ghost btn-sm" onclick="editPost(${post.id})">${svgUse('i-edit',14)} Edit</button></div></div>`;
}

function renderPillarBalance(rows) {
  const container=$('pillar-balance'),suggest=$('pillar-suggest'); if(!container) return;
  if(!rows||rows.length===0){ container.innerHTML='<div class="loading-row" style="width:100%">No data yet.</div>'; return; }
  const map={}; rows.forEach(r=>{map[r.pillar]=r.count;}); const max=Math.max(...PILLARS.map(p=>map[p]||0),1);
  container.innerHTML=PILLARS.map(p=>{
    const count=map[p]||0, heightPct=Math.max(6,Math.round((count/max)*100)), color=PILLAR_COLORS[p]||'var(--primary)', short=p==='Interactive'?'Interact.':p.slice(0,7);
    return `<div class="balance-bar"><div class="bar-count">${count}</div><div class="bar-fill" style="height:${heightPct}%;background:${color}"></div><div class="bar-label">${short}</div></div>`;
  }).join('');
  if(suggest){ const min=PILLARS.reduce((a,b)=>(map[a]||0)<=(map[b]||0)?a:b); const cnt=map[min]||0; suggest.innerHTML=`${svgUse('i-sparkles',16)}<span><strong>${min}</strong> needs more content — ${cnt} post${cnt!==1?'s':''} in 14 days.</span>`; }
}

function renderRecentUploads(assets) {
  const grid=$('recent-uploads'); if(!grid||!assets||assets.length===0) return;
  const thumbs=assets.slice(0,12).map((a,i)=>a.type==='photo'?`<div class="recent-thumb" style="background:url(/api/bank/file/${a.id}) center/cover;background-color:var(--surface-2)" title="${esc(a.filename)}" onclick="navigate('bank')"></div>`:`<div class="recent-thumb ph-${(i%8)+1}" title="${esc(a.filename)}" onclick="navigate('bank')"></div>`);
  while(thumbs.length<12) thumbs.push(`<div class="recent-thumb ph-${(thumbs.length%8)+1}"></div>`);
  grid.innerHTML=thumbs.join('');
}

async function loadKanban() {
  $('kanban-board').innerHTML='<div class="loading-row" style="grid-column:1/-1">Loading ideas…</div>';
  try { renderKanban(await api('GET','/api/posts?limit=500')); }
  catch(e){ $('kanban-board').innerHTML=`<div class="loading-row" style="grid-column:1/-1;color:var(--danger)">Failed: ${esc(e.message)}</div>`; }
}

function renderKanban(posts) {
  const statuses=Object.keys(STATUS_META), grouped={};
  statuses.forEach(s=>{grouped[s]=[];});
  posts.forEach(p=>{ const bucket=grouped[p.status]?p.status:'idea'; grouped[bucket].push(p); });
  $('kanban-board').innerHTML=statuses.map(status=>{
    const meta=STATUS_META[status], cards=grouped[status]||[];
    return `<div class="kanban-col" data-status="${status}"><div class="col-header"><div class="col-name" style="color:${meta.color}">${svgUse(meta.icon,14)} ${meta.label}</div><span class="col-count">${cards.length}</span></div><div class="col-cards">${cards.length?cards.map(kanbanCardHtml).join(''):'<div style="font-size:12px;color:var(--text-dim);text-align:center;padding:24px 0">Empty</div>'}</div></div>`;
  }).join('');
}

function kanbanCardHtml(post) {
  const piCls=pillarClass(post.pillar), statusCls=post.status==='ready'?' status-ready':'';
  const datePart=post.schedule_date?`<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px">${svgUse('i-clock',10)} ${fmtDate(post.schedule_date)}</span>`:'';
  return `<div class="idea-card ${piCls}${statusCls}" onclick="editPost(${post.id})"><div class="card-title">${esc(post.title)}</div>${post.snippet?`<div class="card-snippet">${esc(post.snippet)}</div>`:''}<div class="card-meta">${pillarTagHtml(post.pillar)}${datePart}</div><div class="card-action-row"><button class="mini-btn" onclick="event.stopPropagation();editPost(${post.id})">${svgUse('i-edit',12)} Edit</button><button class="mini-btn" onclick="event.stopPropagation();openMatchModal(${post.id})">${svgUse('i-sparkles',12)} AI</button></div></div>`;
}

async function loadBank(params={}) {
  $('bank-grid').innerHTML='<div class="loading-row" style="grid-column:1/-1">Loading assets…</div>';
  try { renderBank(await api('GET','/api/bank?'+new URLSearchParams(params).toString())); }
  catch(e){ $('bank-grid').innerHTML=`<div class="loading-row" style="grid-column:1/-1;color:var(--danger)">Error: ${esc(e.message)}</div>`; }
}

function renderBank(assets) {
  if(!assets||assets.length===0){ $('bank-grid').innerHTML='<div class="loading-row" style="grid-column:1/-1">No assets. Click Scan folder to index your content bank.</div>'; return; }
  $('bank-grid').innerHTML=assets.map(bankItemHtml).join('');
}

function bankItemHtml(asset) {
  const tags=parseJson(asset.ai_tags,[]), tagHtml=tags.length?`<div class="ai-tag-row">${tags.slice(0,4).map(t=>`<span class="ai-tag">${esc(t)}</span>`).join('')}</div>`:'';
  const overused=asset.usage_count>=2, usageCls=overused?' warn':'', typeEmoji=asset.type==='video'?'▶':asset.type==='graphic'?'✦':'';
  const thumbBg=asset.type==='photo'?`style="background:url(/api/bank/file/${asset.id}) center/cover;background-color:var(--surface-2)"`:'';
  return `<div class="bank-item" onclick="viewAsset(${asset.id})"><div class="bank-thumb" ${thumbBg}><div class="bank-pillar-badge">${pillarTagHtml(asset.pillar)}</div><div class="bank-usage${usageCls}">Used ${asset.usage_count}×</div>${typeEmoji?`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:30px;color:rgba(255,255,255,.85)">${typeEmoji}</div>`:''}</div><div class="bank-info"><div class="bank-name" title="${esc(asset.filename)}">${esc(asset.filename)}</div><div class="bank-tags">${esc(asset.type)}</div>${tagHtml}</div></div>`;
}

function applyBankFilter() {
  const allPillar=$('f-all-pillar'), params={};
  if(allPillar&&!allPillar.checked){ const pillars=[...document.querySelectorAll('.f-pillar:checked')].map(el=>el.value); if(pillars.length===1) params.pillar=pillars[0]; }
  const types=[...document.querySelectorAll('.f-type:checked')].map(el=>el.value); if(types.length===1) params.type=types[0];
  const usages=[...document.querySelectorAll('.f-usage:checked')].map(el=>el.value); if(usages.length===1) params.usage=usages[0];
  loadBank(params);
}

async function scanBank() {
  const btn=document.querySelector('[onclick="scanBank()"]'); if(btn){btn.disabled=true;btn.textContent='Scanning…';}
  try{ const r=await api('POST','/api/bank/scan',{}); alert(`✓ Scan complete\n\n${r.scanned} files found\n${r.added} new assets indexed`); applyBankFilter(); }
  catch(e){ alert('Scan failed: '+e.message+'\n\nCheck ASSET_FOLDER in .env'); }
  finally{ if(btn){btn.disabled=false;btn.innerHTML=`${svgUse('i-folder',16)} Scan folder`;} }
}

function viewAsset(id){ window.open(`/api/bank/file/${id}`,'_blank'); }

function clearComposer() {
  state.editingPostId=null;
  ['c-title','c-hook','c-caption','c-hashtags','c-cta','c-notes'].forEach(id=>{const el=$(id);if(el)el.value='';});
  const p=$('c-pillar'); if(p) p.value='Products';
  const s=$('c-series'); if(s) s.value='';
  const d=$('c-date');   if(d) d.value='';
  document.querySelectorAll('.checkbox-pill').forEach(el=>el.classList.add('active'));
  const strip=$('hook-strip'); if(strip){strip.style.display='none';strip.innerHTML='';}
  const ss=$('c-save-status'); if(ss) ss.textContent='';
  const titleEl=qs('#composer .section-title'); if(titleEl) titleEl.innerHTML=`${svgUse('i-pen',18)} New Post`;
}

async function fillComposer(postOrId) {
  let post=postOrId;
  if(typeof postOrId==='number'||typeof postOrId==='string'){ try{post=await api('GET',`/api/posts/${postOrId}`);}catch{return;} }
  if(!post||!post.id) return;
  state.editingPostId=post.id;
  const set=(id,val)=>{const el=$(id);if(el)el.value=val||'';};
  set('c-title',post.title); set('c-hook',post.hook); set('c-caption',post.caption);
  set('c-hashtags',post.hashtags); set('c-cta',post.cta); set('c-notes',post.edit_notes);
  const p=$('c-pillar'); if(p) p.value=post.pillar||'Products';
  const s=$('c-series'); if(s) s.value=post.series||'';
  const d=$('c-date');   if(d) d.value=post.schedule_date||'';
  const platforms=parseJson(post.platforms,['Instagram','Facebook','LinkedIn']);
  document.querySelectorAll('.checkbox-pill').forEach(el=>el.classList.toggle('active',platforms.includes(el.dataset.val)));
  const titleEl=qs('#composer .section-title'); if(titleEl) titleEl.innerHTML=`${svgUse('i-pen',18)} Editing: ${esc(post.title)}`;
  const ss=$('c-save-status'); if(ss) ss.textContent=`Post #${post.id} · Last saved: ${post.updated_at?post.updated_at.slice(0,16).replace('T',' '):'never'}`;
}

async function editPost(id){ try{ showComposer(await api('GET',`/api/posts/${id}`)); }catch(e){console.error(e);} }

function getComposerPayload(statusOverride) {
  const platforms=[...document.querySelectorAll('.checkbox-pill.active')].map(el=>el.dataset.val);
  return { title:$('c-title')?.value?.trim()||'Untitled', hook:$('c-hook')?.value?.trim()||null, caption:$('c-caption')?.value?.trim()||null, hashtags:$('c-hashtags')?.value?.trim()||null, cta:$('c-cta')?.value?.trim()||null, edit_notes:$('c-notes')?.value?.trim()||null, pillar:$('c-pillar')?.value||'Products', series:$('c-series')?.value||null, schedule_date:$('c-date')?.value||null, platforms, ...(statusOverride?{status:statusOverride}:{}) };
}

function setComposerStatus(msg,isError=false){ const el=$('c-save-status'); if(!el) return; el.textContent=msg; el.style.color=isError?'var(--danger)':'var(--text-dim)'; }

async function saveDraft() {
  const payload=getComposerPayload();
  try{ let saved; if(state.editingPostId){saved=await api('PUT',`/api/posts/${state.editingPostId}`,payload);}else{saved=await api('POST','/api/posts',{...payload,status:'idea'});state.editingPostId=saved.id;} setComposerStatus(`✓ Draft saved at ${new Date().toLocaleTimeString()}`); }
  catch(e){ setComposerStatus(`✗ Save failed: ${e.message}`,true); }
}

async function markReady() {
  const payload=getComposerPayload('ready');
  try{ let saved; if(state.editingPostId){saved=await api('PUT',`/api/posts/${state.editingPostId}`,payload);}else{saved=await api('POST','/api/posts',payload);state.editingPostId=saved.id;} setComposerStatus(`✓ Marked ready at ${new Date().toLocaleTimeString()}`); }
  catch(e){ setComposerStatus(`✗ Error: ${e.message}`,true); }
}

async function aiHooks() {
  const strip=$('hook-strip'), hook=$('c-hook')?.value?.trim(), pillar=$('c-pillar')?.value||'Products', title=$('c-title')?.value||'';
  strip.style.display='flex'; strip.innerHTML=`<span style="font-size:12px;color:var(--text-dim)">Asking Claude…</span>`;
  try{
    const data=await api('POST','/api/ai/hooks',{current_hook:hook,pillar,snippet:title});
    const variations=data.variations||[];
    let html=variations.map(v=>`<div class="ai-suggestion" onclick="selectHook(this)">${esc(v)}</div>`).join('');
    if(data.note) html=`<div style="font-size:11px;color:var(--text-dim);width:100%;margin-bottom:6px">⚠ ${esc(data.note)}</div>`+html;
    strip.innerHTML=html||'<span style="font-size:12px;color:var(--text-dim)">No variations returned.</span>';
  }catch(e){ strip.innerHTML=`<span style="font-size:12px;color:var(--danger)">Error: ${esc(e.message)}</span>`; }
}

function selectHook(el){ const text=el.textContent.replace(/^["']|["']$/g,''); const hookEl=$('c-hook'); if(hookEl) hookEl.value=text; $('hook-strip').style.display='none'; }

async function aiCaption() {
  const textarea=$('c-caption'), pillar=$('c-pillar')?.value||'Products', hook=$('c-hook')?.value?.trim()||'', cta=$('c-cta')?.value?.trim()||'';
  const platforms=[...document.querySelectorAll('.checkbox-pill.active')].map(el=>el.dataset.val);
  if(textarea) textarea.value='Asking Claude…'; setComposerStatus('');
  try{ const data=await api('POST','/api/ai/caption',{hook,pillar,platforms,cta}); if(textarea) textarea.value=data.caption||''; if(data.note) setComposerStatus(`⚠ ${data.note}`); }
  catch(e){ if(textarea) textarea.value=''; setComposerStatus(`Caption error: ${e.message}`,true); }
}

async function aiHashtags() {
  const textarea=$('c-hashtags'), pillar=$('c-pillar')?.value||'Products', caption=$('c-caption')?.value?.trim()||'';
  const platforms=[...document.querySelectorAll('.checkbox-pill.active')].map(el=>el.dataset.val);
  if(textarea) textarea.value='Generating hashtags…'; setComposerStatus('');
  try{ const data=await api('POST','/api/ai/hashtags',{pillar,caption,platforms}); if(textarea) textarea.value=data.hashtags||''; if(data.note) setComposerStatus(`⚠ ${data.note}`); }
  catch(e){ if(textarea) textarea.value=''; setComposerStatus(`Hashtag error: ${e.message}`,true); }
}

async function loadCalendar() {
  const{calYear,calMonth}=state, ms=String(calMonth).padStart(2,'0');
  $('cal-title').textContent=new Date(calYear,calMonth-1,1).toLocaleString('en-GB',{month:'long',year:'numeric'});
  $('cal-grid').innerHTML='<div class="loading-row" style="grid-column:1/-1">Loading calendar…</div>';
  try{ renderCalendar(await api('GET',`/api/posts/calendar/${calYear}/${ms}`),calYear,calMonth); }
  catch(e){ $('cal-grid').innerHTML=`<div class="loading-row" style="grid-column:1/-1;color:var(--danger)">Error: ${esc(e.message)}</div>`; }
}

function renderCalendar(posts,year,month) {
  const byDate={}; posts.forEach(p=>{ if(!p.schedule_date) return; const d=p.schedule_date.split('T')[0]; if(!byDate[d]) byDate[d]=[]; byDate[d].push(p); });
  const daysInMonth=new Date(year,month,0).getDate(), firstWeekDay=new Date(year,month-1,1).getDay(), today=todayStr();
  const DAY_NAMES=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const headers=DAY_NAMES.map(d=>`<div class="cal-day-header">${d}</div>`).join('');
  let cells=''; for(let i=0;i<firstWeekDay;i++) cells+=`<div class="cal-cell dim"></div>`;
  for(let d=1;d<=daysInMonth;d++){
    const dateStr=`${year}-${monthStr(month)}-${String(d).padStart(2,'0')}`, dayPosts=byDate[dateStr]||[];
    const isToday=dateStr===today, isFuture=dateStr>today, isEmpty=dayPosts.length===0&&(isToday||isFuture);
    let cls='cal-cell'; if(isToday) cls+=' today'; if(isEmpty) cls+=' empty-day';
    const pips=dayPosts.slice(0,3).map(p=>`<span class="cal-pip" style="background:${PILLAR_COLORS[p.pillar]||'var(--primary)'}" title="${esc(p.title)}">${esc(p.title)}</span>`).join('');
    cells+=`<div class="${cls}" onclick="calDayClick('${dateStr}')"><div class="cal-date">${d}</div>${isEmpty?'<div class="cal-warn">⚠ No posts</div>':''}${pips}${dayPosts.length>3?`<span style="font-size:10px;color:var(--text-dim)">+${dayPosts.length-3} more</span>`:''}</div>`;
  }
  const totalCells=firstWeekDay+daysInMonth, trailing=(7-(totalCells%7))%7;
  for(let i=0;i<trailing;i++) cells+=`<div class="cal-cell dim"></div>`;
  $('cal-grid').innerHTML=headers+cells;
}

function calNav(offset){ state.calMonth+=offset; if(state.calMonth>12){state.calMonth=1;state.calYear++;} if(state.calMonth<1){state.calMonth=12;state.calYear--;} loadCalendar(); }
function calToday(){ const now=new Date(); state.calYear=now.getFullYear(); state.calMonth=now.getMonth()+1; loadCalendar(); }
function calDayClick(dateStr){ showComposer(); const dateEl=$('c-date'); if(dateEl) dateEl.value=dateStr; }

function openMatchModal(postId=null){ state.matchPostId=postId||null; $('matchModal').classList.add('open'); runMatch(); }
function closeMatchModal(){ $('matchModal').classList.remove('open'); state.matchPostId=null; }

async function runMatch() {
  const grid=$('match-grid'); grid.innerHTML='<div class="loading-row" style="grid-column:1/-1">Asking Claude…</div>';
  let postTitle=$('c-title')?.value?.trim()||'Content post', postPillar=$('c-pillar')?.value||'Products', postSnippet=$('c-caption')?.value?.trim()||$('c-hook')?.value?.trim()||'';
  if(state.matchPostId){ try{ const post=await api('GET',`/api/posts/${state.matchPostId}`); postTitle=post.title||postTitle; postPillar=post.pillar||postPillar; postSnippet=post.snippet||postSnippet; $('match-title').textContent=`AI Match: ${post.title}`; }catch{ $('match-title').textContent='AI Asset Matcher'; } }
  else{ $('match-title').textContent='AI Asset Matcher'; $('match-sub').textContent='Scanning your content bank for the best visual matches…'; }
  try{
    const data=await api('POST','/api/ai/match',{post_title:postTitle,post_pillar:postPillar,post_snippet:postSnippet});
    const matches=data.matches||[];
    if(data.note) $('match-sub').textContent='⚠ '+data.note;
    if(matches.length===0){ grid.innerHTML='<div class="loading-row" style="grid-column:1/-1">No matches. Scan your asset folder first.</div>'; return; }
    grid.innerHTML=matches.map((m,i)=>`<div class="match-card ${i===0?'best':''}"><div class="match-thumb">${m.asset_id?`<img src="/api/bank/file/${m.asset_id}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'" />`:`<div style="width:100%;height:100%;background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:var(--text-dim)">${svgUse('i-image',28)}</div>`}<div class="match-score">${m.score}%</div></div><div class="match-info"><div class="match-name">${esc(m.filename)}</div><div class="match-reason">${esc(m.reason)}</div></div></div>`).join('');
  }catch(e){ grid.innerHTML=`<div class="loading-row" style="grid-column:1/-1;color:var(--danger)">Match failed: ${esc(e.message)}</div>`; }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item[data-page]').forEach(el=>{ el.addEventListener('click',()=>navigate(el.dataset.page)); });
  document.querySelectorAll('.checkbox-pill').forEach(pill=>{ pill.addEventListener('click',()=>pill.classList.toggle('active')); });
  const allPillarCb=$('f-all-pillar');
  if(allPillarCb){
    allPillarCb.onchange=function(){ if(this.checked) document.querySelectorAll('.f-pillar').forEach(el=>{el.checked=false;}); applyBankFilter(); };
    document.querySelectorAll('.f-pillar').forEach(el=>{ el.onchange=function(){ const anyChecked=[...document.querySelectorAll('.f-pillar:checked')].length>0; allPillarCb.checked=!anyChecked; applyBankFilter(); }; });
    document.querySelectorAll('.f-type,.f-usage').forEach(el=>{el.onchange=applyBankFilter;});
  }
  api('GET','/api/posts?limit=1').then(()=>{ const el=$('api-status'); if(el) el.textContent='Connected to local DB'; }).catch(()=>{ const el=$('api-status'); if(el){el.textContent='DB error';el.style.color='var(--danger)';} });
  loadDashboard();
});
```

---

## NEXT SESSION INSTRUCTIONS FOR CLAUDE

When the user opens a new session and pastes this document, here is what to do:

1. **Confirm you have full context** — acknowledge the project, stack, current status.
2. **First action:** Help Ethan run the app for the first time:
   ```bash
   cd "C:\Users\Allaith\Documents\Claude\Projects\Content Creation\hub-app"
   npm install
   node server.js
   ```
3. **If there are errors:** Debug them (most likely: `better-sqlite3` native module needs rebuild, or path issues on Windows).
4. **Once running:** Confirm `http://localhost:3000` loads and the Dashboard populates with seed posts.
5. **Next build phase:** A brand assets plugin — a structured file containing all Al Laith brand guidelines, assets, templates, and reference material that Claude can read before creating content.
6. **After that:** Actual content creation workflow — using the hub to generate, refine, and schedule real posts for the campaign.

---

*Document generated: May 2026 — Al Laith Content Hub v1.0*
