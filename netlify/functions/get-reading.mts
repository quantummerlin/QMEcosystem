// Netlify Function: Get Reading (v2 format)
// Retrieves a reading by ID from Netlify Blobs

import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }

    if (req.method !== 'GET') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        // Get ID from URL query params
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return new Response(JSON.stringify({ error: 'Missing reading ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get the reading from storage
        const store = getStore("shared-readings");
        const reading = await store.get(id, { type: 'json' });

        if (!reading) {
            return new Response(JSON.stringify({ 
                error: 'Reading not found',
                message: 'This reading may have expired or been removed.'
            }), {
                status: 404,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // Check if reading has expired
        if (reading.expiresAt && new Date(reading.expiresAt) < new Date()) {
            // Delete expired reading
            await store.delete(id);
            return new Response(JSON.stringify({ 
                error: 'Reading expired',
                message: 'This reading has expired after 12 months.'
            }), {
                status: 410,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return new Response(JSON.stringify({
            success: true,
            reading: reading
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            }
        });

    } catch (error) {
        console.error('Error getting reading:', error);
        return new Response(JSON.stringify({ error: 'Failed to retrieve reading', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
