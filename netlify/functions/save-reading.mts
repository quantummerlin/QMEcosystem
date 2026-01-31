// Netlify Function: Save Reading (v2 format)
// Stores a reading in Netlify Blobs and returns a shareable ID

import { getStore } from "@netlify/blobs";

// Generate a unique, URL-friendly ID
function generateReadingId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const timestamp = Date.now().toString(36);
    let random = '';
    for (let i = 0; i < 8; i++) {
        random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${timestamp}-${random}`;
}

export default async (req, context) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await req.json();
        
        // Validate required fields
        if (!body.html || !body.userData) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Generate unique ID
        const readingId = generateReadingId();
        
        // Store the reading
        const store = getStore("shared-readings");
        
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
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };

        await store.setJSON(readingId, readingData);

        // Return the shareable URL
        const url = new URL(req.url);
        const shareUrl = `${url.origin}/soulblueprint/r/${readingId}`;

        return new Response(JSON.stringify({
            success: true,
            id: readingId,
            shareUrl: shareUrl,
            expiresAt: readingData.expiresAt
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('Error saving reading:', error);
        return new Response(JSON.stringify({ error: 'Failed to save reading', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
