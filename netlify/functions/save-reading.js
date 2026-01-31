// Netlify Function: Save Reading
// Stores a reading in Netlify Blobs and returns a shareable ID

const { getStore } = require("@netlify/blobs");

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

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        
        // Validate required fields
        if (!body.html || !body.userData) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
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
        const host = event.headers.host || 'quantummerlin.com';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const shareUrl = `${protocol}://${host}/soulblueprint/r/${readingId}`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: true,
                id: readingId,
                shareUrl: shareUrl,
                expiresAt: readingData.expiresAt
            })
        };

    } catch (error) {
        console.error('Error saving reading:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to save reading' })
        };
    }
};
