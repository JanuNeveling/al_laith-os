/* ═══════════════════════════════════════════════════════════════════
   AL LAITH BUSINESS OS — STORAGE SCHEMA
   shared/storage-schema.js

   Single source of truth for all localStorage operations across zones.
   Every zone reads and writes through these functions only.
   Never call localStorage directly from a zone file.

   Usage in any zone HTML file:
     <script src="../shared/storage-schema.js"></script>
     <script>
       const posts = AlLaithOS.zone1.getPosts();
       AlLaithOS.zone1.savePost({ id: ..., title: ... });
     </script>
═══════════════════════════════════════════════════════════════════ */

(function (window) {
  'use strict';

  /* ─── Key registry ─────────────────────────────────────────────
     All localStorage keys in one place.
     Pattern: os:{zone}:{entity}
  ──────────────────────────────────────────────────────────────── */
  const KEYS = {
    // OS Shell
    os:             'os:meta',          // OS-level config (version, lastOpened)
    osStats:        'os:stats',         // Cross-zone stats snapshot (written by each zone)

    // Zone 1 — Content Hub
    z1Posts:        'os:z1:posts',      // Array of post objects
    z1Ideas:        'os:z1:ideas',      // Idea bank items
    z1Scores:       'os:z1:scores',     // Scored posts
    z1Calendar:     'os:z1:calendar',   // Scheduled posts {date: [postIds]}
    z1Settings:     'os:z1:settings',   // Zone 1 preferences
    z1Stats:        'os:z1:stats',      // Stats snapshot for OS shell

    // Zone 2 — Projects
    z2Jobs:         'os:z2:jobs',       // Job log entries
    z2CaseStudies:  'os:z2:casestudies',// Generated case studies
    z2Events:       'os:z2:events',     // Event workspaces
    z2Stats:        'os:z2:stats',

    // Zone 3 — Learning Hub
    z3Resources:    'os:z3:resources',  // Saved links + summaries
    z3Topics:       'os:z3:topics',     // Topic tracker progress
    z3Journal:      'os:z3:journal',    // Growth journal entries
    z3Conversations:'os:z3:convos',     // Tutor chat history
    z3Stats:        'os:z3:stats',

    // Zone 4 — Intelligence
    z4Reports:      'os:z4:reports',    // Research + trend reports
    z4Competitors:  'os:z4:competitors',// Competitor watchlist cards
    z4Trends:       'os:z4:trends',     // Trend watch archive
    z4Stats:        'os:z4:stats',

    // Zone 5 — Knowledge Graph
    z5Nodes:        'os:z5:nodes',      // Graph nodes
    z5Edges:        'os:z5:edges',      // Graph edges
    z5Stats:        'os:z5:stats',

    // Zone 6 — Pulse
    z6Output:       'os:z6:output',     // Content output log
    z6Goals:        'os:z6:goals',      // Goal settings
    z6Streaks:      'os:z6:streaks',    // Platform streaks
    z6Digests:      'os:z6:digests',    // Weekly digest archive
    z6Stats:        'os:z6:stats',
  };

  /* ─── Core storage utilities ───────────────────────────────────── */
  const store = {
    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        if (raw === null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        console.warn('[AlLaithOS] storage.get failed:', key, e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        // Handle quota exceeded
        if (e.name === 'QuotaExceededError') {
          console.error('[AlLaithOS] Storage quota exceeded. Clear old data.');
        } else {
          console.warn('[AlLaithOS] storage.set failed:', key, e);
        }
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        return false;
      }
    },
    getList(key) {
      return store.get(key, []);
    },
    setList(key, array) {
      return store.set(key, array);
    },
  };

  /* ─── ID generator ─────────────────────────────────────────────── */
  function uid(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  /* ─── Timestamp helpers ────────────────────────────────────────── */
  function now() { return new Date().toISOString(); }
  function todayStr() { return new Date().toISOString().split('T')[0]; }

  /* ─── Generic list helpers ─────────────────────────────────────── */
  function makeListAPI(key, idPrefix) {
    return {
      getAll()         { return store.getList(key); },
      getById(id)      { return store.getList(key).find(item => item.id === id) || null; },
      save(item) {
        const list = store.getList(key);
        const existing = list.findIndex(i => i.id === item.id);
        if (existing >= 0) {
          list[existing] = { ...list[existing], ...item, updatedAt: now() };
        } else {
          list.unshift({ ...item, id: item.id || uid(idPrefix), createdAt: now(), updatedAt: now() });
        }
        store.setList(key, list);
        return list.find(i => i.id === (item.id || list[0].id));
      },
      delete(id) {
        const list = store.getList(key).filter(i => i.id !== id);
        store.setList(key, list);
      },
      count()          { return store.getList(key).length; },
      clear()          { store.setList(key, []); },
    };
  }

  /* ══════════════════════════════════════════════════════════════════
     ZONE 1 — CONTENT HUB
  ══════════════════════════════════════════════════════════════════ */
  const zone1 = {
    ...makeListAPI(KEYS.z1Posts, 'post'),

    /* Posts with status filter */
    getByStatus(status) {
      return store.getList(KEYS.z1Posts).filter(p => p.status === status);
    },

    /* Posts created this week */
    getThisWeek() {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return store.getList(KEYS.z1Posts).filter(p =>
        new Date(p.createdAt) >= weekAgo
      );
    },

    /* Calendar: get posts scheduled for a date */
    getForDate(dateStr) {
      return store.getList(KEYS.z1Posts).filter(p => p.scheduledDate === dateStr);
    },

    /* Ideas */
    ideas: makeListAPI(KEYS.z1Ideas, 'idea'),

    /* Scores */
    scores: makeListAPI(KEYS.z1Scores, 'score'),

    /* Settings */
    getSettings()        { return store.get(KEYS.z1Settings, {}); },
    saveSettings(data)   { return store.set(KEYS.z1Settings, { ...store.get(KEYS.z1Settings, {}), ...data }); },

    /* Stats snapshot — written by Zone 1, read by OS Shell */
    getStats()           { return store.get(KEYS.z1Stats, null); },
    writeStats() {
      const posts    = store.getList(KEYS.z1Posts);
      const thisWeek = zone1.getThisWeek();
      const stats = {
        total:        posts.length,
        thisWeek:     thisWeek.length,
        ready:        posts.filter(p => p.status === 'ready').length,
        ideas:        posts.filter(p => p.status === 'idea').length,
        scheduled:    posts.filter(p => p.scheduledDate).length,
        lastUpdated:  now(),
      };
      store.set(KEYS.z1Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     ZONE 2 — PROJECTS
  ══════════════════════════════════════════════════════════════════ */
  const zone2 = {
    jobs:       makeListAPI(KEYS.z2Jobs,        'job'),
    caseStudies:makeListAPI(KEYS.z2CaseStudies, 'cs'),
    events:     makeListAPI(KEYS.z2Events,      'evt'),

    getStats()  { return store.get(KEYS.z2Stats, null); },
    writeStats() {
      const stats = {
        jobs:       store.getList(KEYS.z2Jobs).length,
        caseStudies:store.getList(KEYS.z2CaseStudies).length,
        events:     store.getList(KEYS.z2Events).length,
        lastUpdated:now(),
      };
      store.set(KEYS.z2Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     ZONE 3 — LEARNING HUB
  ══════════════════════════════════════════════════════════════════ */
  const zone3 = {
    resources:    makeListAPI(KEYS.z3Resources,     'res'),
    topics:       makeListAPI(KEYS.z3Topics,        'topic'),
    journal:      makeListAPI(KEYS.z3Journal,       'jentry'),
    conversations:makeListAPI(KEYS.z3Conversations, 'convo'),

    /* Seed default topics if none exist yet */
    seedTopics() {
      if (store.getList(KEYS.z3Topics).length > 0) return;
      const defaults = [
        { id: uid('topic'), name: 'SEO & Content Discoverability', progress: 0, category: 'Digital Marketing' },
        { id: uid('topic'), name: 'LinkedIn Strategy for B2B',     progress: 0, category: 'Social Media' },
        { id: uid('topic'), name: 'Brand Positioning',             progress: 0, category: 'Strategy' },
        { id: uid('topic'), name: 'GCC Market Dynamics',           progress: 0, category: 'Market Knowledge' },
        { id: uid('topic'), name: 'Content Calendar Planning',     progress: 0, category: 'Operations' },
        { id: uid('topic'), name: 'Video Script Writing',          progress: 0, category: 'Content Creation' },
        { id: uid('topic'), name: 'Photography for Business',      progress: 0, category: 'Content Creation' },
        { id: uid('topic'), name: 'Analytics & Performance',       progress: 0, category: 'Digital Marketing' },
        { id: uid('topic'), name: 'Hashtag Strategy',              progress: 0, category: 'Social Media' },
        { id: uid('topic'), name: 'Storytelling for Industry',     progress: 0, category: 'Strategy' },
      ].map(t => ({ ...t, createdAt: now(), updatedAt: now() }));
      store.setList(KEYS.z3Topics, defaults);
    },

    getStats()  { return store.get(KEYS.z3Stats, null); },
    writeStats() {
      const topics = store.getList(KEYS.z3Topics);
      const stats = {
        resources:    store.getList(KEYS.z3Resources).length,
        topics:       topics.length,
        avgProgress:  topics.length
          ? Math.round(topics.reduce((s, t) => s + (t.progress || 0), 0) / topics.length)
          : 0,
        journal:      store.getList(KEYS.z3Journal).length,
        lastUpdated:  now(),
      };
      store.set(KEYS.z3Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     ZONE 4 — INTELLIGENCE
  ══════════════════════════════════════════════════════════════════ */
  const zone4 = {
    reports:     makeListAPI(KEYS.z4Reports,     'rpt'),
    competitors: makeListAPI(KEYS.z4Competitors, 'comp'),
    trends:      makeListAPI(KEYS.z4Trends,      'trend'),

    /* Seed competitor watchlist if empty */
    seedCompetitors() {
      if (store.getList(KEYS.z4Competitors).length > 0) return;
      const defaults = [
        { id: uid('comp'), name: 'Byrne Equipment Rental', lastResearched: null, summary: null },
        { id: uid('comp'), name: 'RSG',                    lastResearched: null, summary: null },
        { id: uid('comp'), name: 'GAPS',                   lastResearched: null, summary: null },
        { id: uid('comp'), name: 'BRT',                    lastResearched: null, summary: null },
        { id: uid('comp'), name: 'Triton',                 lastResearched: null, summary: null },
        { id: uid('comp'), name: 'Speedy Gulf',            lastResearched: null, summary: null },
      ].map(c => ({ ...c, createdAt: now(), updatedAt: now() }));
      store.setList(KEYS.z4Competitors, defaults);
    },

    getStats()  { return store.get(KEYS.z4Stats, null); },
    writeStats() {
      const stats = {
        reports:     store.getList(KEYS.z4Reports).length,
        competitors: store.getList(KEYS.z4Competitors).length,
        trends:      store.getList(KEYS.z4Trends).length,
        lastUpdated: now(),
      };
      store.set(KEYS.z4Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     ZONE 5 — KNOWLEDGE GRAPH
  ══════════════════════════════════════════════════════════════════ */
  const zone5 = {
    nodes: makeListAPI(KEYS.z5Nodes, 'node'),
    edges: makeListAPI(KEYS.z5Edges, 'edge'),

    getStats()  { return store.get(KEYS.z5Stats, null); },
    writeStats() {
      const stats = {
        nodes:       store.getList(KEYS.z5Nodes).length,
        edges:       store.getList(KEYS.z5Edges).length,
        lastUpdated: now(),
      };
      store.set(KEYS.z5Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     ZONE 6 — PULSE
  ══════════════════════════════════════════════════════════════════ */
  const zone6 = {
    output:  makeListAPI(KEYS.z6Output,  'out'),
    goals:   makeListAPI(KEYS.z6Goals,   'goal'),
    streaks: makeListAPI(KEYS.z6Streaks, 'streak'),
    digests: makeListAPI(KEYS.z6Digests, 'digest'),

    /* Log a content output event */
    logPost(platform, pillar, postId = null) {
      return zone6.output.save({
        platform,
        pillar,
        postId,
        date: todayStr(),
      });
    },

    getStats()  { return store.get(KEYS.z6Stats, null); },
    writeStats() {
      const output = store.getList(KEYS.z6Output);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = output.filter(o => new Date(o.createdAt) >= weekAgo);

      const byPlatform = {};
      thisWeek.forEach(o => {
        byPlatform[o.platform] = (byPlatform[o.platform] || 0) + 1;
      });

      const stats = {
        totalOutput:   output.length,
        thisWeek:      thisWeek.length,
        byPlatform,
        lastUpdated:   now(),
      };
      store.set(KEYS.z6Stats, stats);
      AlLaithOS._refreshOsStats();
      return stats;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     OS-LEVEL: Cross-zone stats aggregator
     The OS shell reads this to show the dashboard.
  ══════════════════════════════════════════════════════════════════ */
  function _refreshOsStats() {
    const stats = {
      zone1: store.get(KEYS.z1Stats),
      zone2: store.get(KEYS.z2Stats),
      zone3: store.get(KEYS.z3Stats),
      zone4: store.get(KEYS.z4Stats),
      zone5: store.get(KEYS.z5Stats),
      zone6: store.get(KEYS.z6Stats),
      lastUpdated: now(),
    };
    store.set(KEYS.osStats, stats);
    return stats;
  }

  function getOsStats() {
    return store.get(KEYS.osStats, {});
  }

  function getOsMeta() {
    return store.get(KEYS.os, { version: '1.0', firstOpened: now() });
  }

  function setOsMeta(data) {
    return store.set(KEYS.os, { ...getOsMeta(), ...data, lastOpened: now() });
  }

  /* ─── Debug / admin helpers (available in console) ─────────────── */
  const debug = {
    inspect()     { return Object.fromEntries(Object.keys(KEYS).map(k => [k, store.get(KEYS[k])])); },
    clearZone(n)  {
      const zoneKeys = Object.entries(KEYS).filter(([k]) => k.startsWith(`z${n}`));
      zoneKeys.forEach(([, v]) => store.remove(v));
      console.log(`[AlLaithOS] Zone ${n} cleared.`);
    },
    clearAll()    {
      Object.values(KEYS).forEach(k => store.remove(k));
      console.log('[AlLaithOS] All OS data cleared.');
    },
    storageUsed() {
      let total = 0;
      Object.values(KEYS).forEach(k => {
        const v = localStorage.getItem(k);
        if (v) total += v.length;
      });
      return `${(total / 1024).toFixed(1)} KB`;
    },
  };

  /* ══════════════════════════════════════════════════════════════════
     PUBLIC API — window.AlLaithOS
  ══════════════════════════════════════════════════════════════════ */
  const AlLaithOS = {
    /* Zone namespaces */
    zone1,
    zone2,
    zone3,
    zone4,
    zone5,
    zone6,

    /* OS-level */
    getOsStats,
    getOsMeta,
    setOsMeta,
    _refreshOsStats,

    /* Utils exposed for zone files */
    uid,
    now,
    todayStr,
    store,
    KEYS,

    /* Debug */
    debug,

    /* Version */
    version: '1.0.0',
  };

  window.AlLaithOS = AlLaithOS;

  /* Auto-seed defaults (safe to call multiple times) */
  try {
    zone3.seedTopics();
    zone4.seedCompetitors();
  } catch(e) {
    console.warn('[AlLaithOS] Seed skipped:', e.message);
  }

  console.log(`[AlLaithOS] Storage schema v${AlLaithOS.version} ready. Storage used: ${debug.storageUsed()}`);

})(window);
