// Netlify Scheduled Function: Cleanup Readings (v2 format)
// Runs daily to delete readings older than 12 months

import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    console.log('Starting scheduled cleanup of expired readings...');
    
    try {
        const store = getStore("shared-readings");
        const now = new Date();
        let deletedCount = 0;
        let checkedCount = 0;
        
        // List all readings in the store
        const { blobs } = await store.list();
        
        for (const blob of blobs) {
            checkedCount++;
            
            try {
                const reading = await store.get(blob.key, { type: 'json' });
                
                if (reading && reading.expiresAt) {
                    const expiryDate = new Date(reading.expiresAt);
                    
                    if (expiryDate < now) {
                        await store.delete(blob.key);
                        deletedCount++;
                        console.log(`Deleted expired reading: ${blob.key}`);
                    }
                }
            } catch (err) {
                console.warn(`Error processing reading ${blob.key}:`, err);
            }
        }
        
        console.log(`Cleanup complete. Checked: ${checkedCount}, Deleted: ${deletedCount}`);
        
        return new Response(JSON.stringify({
            success: true,
            checked: checkedCount,
            deleted: deletedCount,
            timestamp: now.toISOString()
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Cleanup function error:', error);
        return new Response(JSON.stringify({ error: 'Cleanup failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    schedule: "@daily"
};
