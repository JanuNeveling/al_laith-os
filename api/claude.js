/**
 * Al Laith OS — Claude API Proxy
 * Vercel Serverless Function: POST /api/claude
 *
 * Proxies requests from the browser to the Anthropic API.
 * Keeps the API key server-side (Vercel env var: ANTHROPIC_API_KEY).
 * All zone apps call this endpoint — no key ever touches the browser.
 */
module.exports = async function handler(req, res) {
  // CORS — allow calls from any origin on this deployment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: { message: 'Method not allowed' } });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: {
        message: 'ANTHROPIC_API_KEY is not set. Go to Vercel → Project → Settings → Environment Variables → add ANTHROPIC_API_KEY → Redeploy.'
      }
    });
  }

  try {
    // Ensure we have a proper body object (Vercel auto-parses JSON bodies)
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch(e) { /* leave as-is */ }
    }
    if (!body || !body.model) {
      return res.status(400).json({ error: { message: 'Invalid request body — model is required.' } });
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
