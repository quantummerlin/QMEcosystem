// Cloudflare Worker: Shared Readings API
// Handles save-reading, get-reading, and cleanup for shareable readings

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), ...extraHeaders }
  });
}

function generateReadingId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const timestamp = Date.now().toString(36);
  let random = '';
  for (let i = 0; i < 8; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${timestamp}-${random}`;
}

async function handleSaveReading(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await request.json();

    if (!body.html || !body.userData) {
      return jsonResponse({ error: 'Missing required fields' }, 400);
    }

    const readingId = generateReadingId();

    const readingData = {
      id: readingId,
      html: body.html,
      userData: {
        name: body.userData.name,
        birthDate: body.userData.birthDate,
        birthTime: body.userData.birthTime || null,
        birthPlace: body.userData.birthPlace || null,
        giftedBy: body.userData.giftedBy || null
      },
      colorScheme: body.colorScheme || 'pink',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + ONE_YEAR_SECONDS * 1000).toISOString()
    };

    await env.SHARED_READINGS.put(readingId, JSON.stringify(readingData), {
      expirationTtl: ONE_YEAR_SECONDS
    });

    // Use query param format since GitHub Pages doesn't support redirects
    const shareUrl = `https://quantummerlin.com/soulblueprint/view.html?id=${readingId}`;

    return jsonResponse({
      success: true,
      id: readingId,
      shareUrl,
      expiresAt: readingData.expiresAt
    });
  } catch (error) {
    return jsonResponse({ error: 'Failed to save reading', details: error.message }, 500);
  }
}

async function handleGetReading(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return jsonResponse({ error: 'Missing reading ID' }, 400);
    }

    const readingRaw = await env.SHARED_READINGS.get(id);

    if (!readingRaw) {
      return jsonResponse({
        error: 'Reading not found',
        message: 'This reading may have expired or been removed.'
      }, 404);
    }

    const reading = JSON.parse(readingRaw);

    if (reading.expiresAt && new Date(reading.expiresAt) < new Date()) {
      await env.SHARED_READINGS.delete(id);
      return jsonResponse({
        error: 'Reading expired',
        message: 'This reading has expired after 12 months.'
      }, 410);
    }

    return jsonResponse({
      success: true,
      reading
    }, 200, { 'Cache-Control': 'public, max-age=3600' });
  } catch (error) {
    return jsonResponse({ error: 'Failed to retrieve reading', details: error.message }, 500);
  }
}

async function cleanupExpiredReadings(env) {
  let cursor = undefined;
  let deleted = 0;
  let checked = 0;

  do {
    const listResult = await env.SHARED_READINGS.list({ cursor, limit: 1000 });
    cursor = listResult.cursor;

    for (const key of listResult.keys) {
      checked++;
      try {
        const raw = await env.SHARED_READINGS.get(key.name);
        if (!raw) continue;
        const reading = JSON.parse(raw);
        if (reading.expiresAt && new Date(reading.expiresAt) < new Date()) {
          await env.SHARED_READINGS.delete(key.name);
          deleted++;
        }
      } catch (err) {
        // Ignore malformed entries
      }
    }
  } while (cursor);

  return { checked, deleted };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/save-reading') {
      return handleSaveReading(request, env);
    }

    if (url.pathname === '/api/get-reading') {
      return handleGetReading(request, env);
    }

    if (url.pathname === '/api/cleanup-readings') {
      const result = await cleanupExpiredReadings(env);
      return jsonResponse({ success: true, ...result, timestamp: new Date().toISOString() });
    }

    return new Response('Not Found', { status: 404 });
  },

  async scheduled(event, env) {
    await cleanupExpiredReadings(env);
  }
};
