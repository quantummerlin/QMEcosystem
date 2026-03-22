/**
 * Quantum Merlin AI Hub — OpenRouter Proxy Worker
 *
 * Proxies chat completion requests to OpenRouter, keeping API keys
 * entirely server-side as Cloudflare Secrets (never in client code).
 *
 * Security:
 *   - Strict origin check: only quantummerlin.com is allowed
 *   - Per-IP daily rate limiting enforced in KV (not trust-able client-side)
 *   - Keys stored only as Worker Secrets, never in source code
 *
 * Required env bindings (set via Wrangler or Cloudflare dashboard):
 *   KV Namespace:
 *     AIHUB_RATE_LIMITS  — KV namespace for per-IP request counts
 *   Secrets (at least OR_KEY_1 required):
 *     OR_KEY_1 … OR_KEY_10 — Your OpenRouter API keys
 *
 * Route: POST quantummerlin.com/api/aihub/chat
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const ALLOWED_ORIGIN     = 'https://quantummerlin.com';
const FREE_DAILY_LIMIT   = 20;
const MAX_KEYS           = 10;

/* ── CORS ── */
function corsHeaders(origin) {
  // Only emit the real origin header when the request actually comes from our domain.
  // Any other origin gets 'null', which browsers will block.
  const allowed = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : 'null';
  return {
    'Access-Control-Allow-Origin':  allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

/* ── Helpers ── */
function jsonErr(msg, status, origin) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

/**
 * Pick a random key from configured OR_KEY_1 … OR_KEY_N secrets.
 * Workers are stateless across requests, so random beats attempted round-robin.
 */
function pickKey(env) {
  const keys = [];
  for (let i = 1; i <= MAX_KEYS; i++) {
    const k = env[`OR_KEY_${i}`];
    if (k) keys.push(k);
  }
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
}

/* ── Main handler ── */
export default {
  async fetch(request, env, ctx) {
    const url    = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // Only accept POST to the exact path
    if (request.method !== 'POST' || url.pathname !== '/api/aihub/chat') {
      return new Response('Not Found', { status: 404 });
    }

    // ── Origin restriction ──────────────────────────────────────────────────
    if (origin !== ALLOWED_ORIGIN) {
      return jsonErr('Forbidden', 403, origin);
    }

    // ── Parse body ──────────────────────────────────────────────────────────
    let body;
    try {
      body = await request.json();
    } catch {
      return jsonErr('Invalid request body', 400, origin);
    }

    const { model, messages } = body;
    if (!model || !Array.isArray(messages) || messages.length === 0) {
      return jsonErr('Missing model or messages', 400, origin);
    }

    // ── Rate limiting ───────────────────────────────────────────────────────
    // Key: rl:<ip>:<YYYY-MM-DD>  — one entry per IP per calendar day
    const ip    = request.headers.get('CF-Connecting-IP') || 'unknown';
    const today = new Date().toISOString().slice(0, 10);
    const kvKey = `rl:${ip}:${today}`;

    const stored = await env.AIHUB_RATE_LIMITS.get(kvKey);
    const count  = stored ? parseInt(stored, 10) : 0;

    if (count >= FREE_DAILY_LIMIT) {
      return jsonErr(
        `Free daily limit reached (${FREE_DAILY_LIMIT} requests). ` +
        'Add your own OpenRouter API key in Settings to continue.',
        429,
        origin
      );
    }

    // Increment counter fire-and-forget; TTL 25 h ensures keys expire overnight
    ctx.waitUntil(
      env.AIHUB_RATE_LIMITS.put(kvKey, String(count + 1), { expirationTtl: 90000 })
    );

    // ── Pick API key ────────────────────────────────────────────────────────
    const apiKey = pickKey(env);
    if (!apiKey) {
      return jsonErr('Service temporarily unavailable — no keys configured', 503, origin);
    }

    // ── Proxy to OpenRouter (streaming) ─────────────────────────────────────
    const upstream = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
        'HTTP-Referer':  ALLOWED_ORIGIN,
        'X-Title':       'Quantum Merlin AI Hub',
      },
      body: JSON.stringify({ model, messages, stream: true }),
    });

    if (!upstream.ok) {
      // Pass the upstream error body back so the client can show a meaningful message
      const errText = await upstream.text();
      return new Response(errText, {
        status: upstream.status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    // Stream the SSE response straight through to the client
    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type':      'text/event-stream; charset=utf-8',
        'Cache-Control':     'no-cache',
        'X-Accel-Buffering': 'no',
        ...corsHeaders(origin),
      },
    });
  },
};
