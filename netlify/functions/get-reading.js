// Netlify Function: Get Reading
// Retrieves a reading by ID from Netlify Blobs

const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Get ID from query string
        const id = event.queryStringParameters?.id;

        if (!id) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing reading ID' })
            };
        }

        // Get the reading from storage
        const store = getStore("shared-readings");
        const reading = await store.get(id, { type: 'json' });

        if (!reading) {
            return {
                statusCode: 404,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    error: 'Reading not found',
                    message: 'This reading may have expired or been removed.'
                })
            };
        }

        // Check if reading has expired
        if (reading.expiresAt && new Date(reading.expiresAt) < new Date()) {
            // Delete expired reading
            await store.delete(id);
            return {
                statusCode: 410,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ 
                    error: 'Reading expired',
                    message: 'This reading has expired after 12 months.'
                })
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            body: JSON.stringify({
                success: true,
                reading: reading
            })
        };

    } catch (error) {
        console.error('Error getting reading:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to retrieve reading' })
        };
    }
};
