// Netlify Scheduled Function: Cleanup Readings
// Runs daily to delete readings older than 12 months

const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
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
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                success: true,
                checked: checkedCount,
                deleted: deletedCount,
                timestamp: now.toISOString()
            })
        };
        
    } catch (error) {
        console.error('Cleanup function error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Cleanup failed' })
        };
    }
};
