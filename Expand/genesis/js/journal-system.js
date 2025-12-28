/**
 * Quantum Journal System
 * Daily check-ins, mood tracking, and manifestation logging
 */

class QuantumJournalSystem {
    constructor() {
        this.entries = [];
        this.currentEntry = null;
        this.loadEntries();
    }
    
    /**
     * Load journal entries from localStorage
     */
    loadEntries() {
        if (typeof QuantumStorage !== 'undefined') {
            const stored = QuantumStorage.getJournalEntries();
            this.entries = stored || [];
            console.log(`📖 Loaded ${this.entries.length} journal entries`);
        }
    }
    
    /**
     * Create new journal entry
     */
    createEntry() {
        this.currentEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            dateString: new Date().toLocaleDateString(),
            timeString: new Date().toLocaleTimeString(),
            
            // Mood tracking
            moodBefore: null,
            moodAfter: null,
            moodChange: null,
            
            // Energy tracking
            energyBefore: null,
            energyAfter: null,
            energyChange: null,
            
            // Focus tracking
            focusBefore: null,
            focusAfter: null,
            focusChange: null,
            
            // Session details
            frequenciesUsed: [],
            sessionDuration: 0,
            trackName: null,
            
            // Manifestation
            intentions: [],
            gratitude: [],
            manifestations: [],
            
            // Synchronicities
            synchronicities: [],
            
            // Notes
            notes: '',
            
            // Insights
            insights: [],
            
            // Tags
            tags: []
        };
        
        return this.currentEntry;
    }
    
    /**
     * Update current entry
     */
    updateEntry(updates) {
        if (!this.currentEntry) {
            this.createEntry();
        }
        
        Object.assign(this.currentEntry, updates);
        
        // Calculate changes
        if (this.currentEntry.moodBefore && this.currentEntry.moodAfter) {
            this.currentEntry.moodChange = this.currentEntry.moodAfter - this.currentEntry.moodBefore;
        }
        
        if (this.currentEntry.energyBefore && this.currentEntry.energyAfter) {
            this.currentEntry.energyChange = this.currentEntry.energyAfter - this.currentEntry.energyBefore;
        }
        
        if (this.currentEntry.focusBefore && this.currentEntry.focusAfter) {
            this.currentEntry.focusChange = this.currentEntry.focusAfter - this.currentEntry.focusBefore;
        }
    }
    
    /**
     * Save current entry
     */
    saveEntry() {
        if (!this.currentEntry) return false;
        
        // Add to entries array
        const existingIndex = this.entries.findIndex(e => e.id === this.currentEntry.id);
        if (existingIndex >= 0) {
            this.entries[existingIndex] = this.currentEntry;
        } else {
            this.entries.push(this.currentEntry);
        }
        
        // Sort by date (newest first)
        this.entries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Save to localStorage
        if (typeof QuantumStorage !== 'undefined') {
            QuantumStorage.saveJournalEntry(this.currentEntry);
        }
        
        console.log('💾 Journal entry saved');
        return true;
    }
    
    /**
     * Get entry by ID
     */
    getEntry(id) {
        return this.entries.find(e => e.id === id);
    }
    
    /**
     * Get entries by date range
     */
    getEntriesByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return this.entries.filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= start && entryDate <= end;
        });
    }
    
    /**
     * Get today's entry
     */
    getTodayEntry() {
        const today = new Date().toLocaleDateString();
        return this.entries.find(e => e.dateString === today);
    }
    
    /**
     * Get entries for current week
     */
    getWeekEntries() {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return this.getEntriesByDateRange(weekAgo, now);
    }
    
    /**
     * Get entries for current month
     */
    getMonthEntries() {
        const now = new Date();
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return this.getEntriesByDateRange(monthAgo, now);
    }
    
    /**
     * Calculate weekly insights
     */
    getWeeklyInsights() {
        const weekEntries = this.getWeekEntries();
        
        if (weekEntries.length === 0) {
            return null;
        }
        
        // Calculate averages
        const avgMoodChange = this.calculateAverage(weekEntries, 'moodChange');
        const avgEnergyChange = this.calculateAverage(weekEntries, 'energyChange');
        const avgFocusChange = this.calculateAverage(weekEntries, 'focusChange');
        const totalSessionTime = weekEntries.reduce((sum, e) => sum + (e.sessionDuration || 0), 0);
        
        // Most used frequencies
        const frequencyCount = {};
        weekEntries.forEach(entry => {
            entry.frequenciesUsed.forEach(freq => {
                frequencyCount[freq] = (frequencyCount[freq] || 0) + 1;
            });
        });
        
        const topFrequencies = Object.entries(frequencyCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([freq, count]) => ({ frequency: freq, count }));
        
        // Collect all manifestations
        const manifestations = weekEntries
            .flatMap(e => e.manifestations)
            .filter(m => m);
        
        // Collect all synchronicities
        const synchronicities = weekEntries
            .flatMap(e => e.synchronicities)
            .filter(s => s);
        
        return {
            period: 'week',
            entryCount: weekEntries.length,
            avgMoodChange: avgMoodChange,
            avgEnergyChange: avgEnergyChange,
            avgFocusChange: avgFocusChange,
            totalSessionTime: totalSessionTime,
            topFrequencies: topFrequencies,
            manifestations: manifestations,
            synchronicities: synchronicities,
            streak: this.calculateStreak()
        };
    }
    
    /**
     * Calculate monthly insights
     */
    getMonthlyInsights() {
        const monthEntries = this.getMonthEntries();
        
        if (monthEntries.length === 0) {
            return null;
        }
        
        // Calculate averages
        const avgMoodChange = this.calculateAverage(monthEntries, 'moodChange');
        const avgEnergyChange = this.calculateAverage(monthEntries, 'energyChange');
        const avgFocusChange = this.calculateAverage(monthEntries, 'focusChange');
        const totalSessionTime = monthEntries.reduce((sum, e) => sum + (e.sessionDuration || 0), 0);
        
        // Most used frequencies
        const frequencyCount = {};
        monthEntries.forEach(entry => {
            entry.frequenciesUsed.forEach(freq => {
                frequencyCount[freq] = (frequencyCount[freq] || 0) + 1;
            });
        });
        
        const topFrequencies = Object.entries(frequencyCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([freq, count]) => ({ frequency: freq, count }));
        
        // Track progress over time
        const progressData = monthEntries.map(entry => ({
            date: entry.dateString,
            moodChange: entry.moodChange,
            energyChange: entry.energyChange,
            focusChange: entry.focusChange
        }));
        
        // Collect all manifestations
        const manifestations = monthEntries
            .flatMap(e => e.manifestations)
            .filter(m => m);
        
        // Collect all synchronicities
        const synchronicities = monthEntries
            .flatMap(e => e.synchronicities)
            .filter(s => s);
        
        return {
            period: 'month',
            entryCount: monthEntries.length,
            avgMoodChange: avgMoodChange,
            avgEnergyChange: avgEnergyChange,
            avgFocusChange: avgFocusChange,
            totalSessionTime: totalSessionTime,
            topFrequencies: topFrequencies,
            progressData: progressData,
            manifestations: manifestations,
            synchronicities: synchronicities,
            streak: this.calculateStreak()
        };
    }
    
    /**
     * Calculate average for a field
     */
    calculateAverage(entries, field) {
        const values = entries
            .map(e => e[field])
            .filter(v => v !== null && v !== undefined);
        
        if (values.length === 0) return 0;
        
        return values.reduce((sum, v) => sum + v, 0) / values.length;
    }
    
    /**
     * Calculate current streak
     */
    calculateStreak() {
        if (this.entries.length === 0) return 0;
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Sort entries by date (newest first)
        const sortedEntries = [...this.entries].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Check each day going backwards
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const checkDateString = checkDate.toLocaleDateString();
            
            const hasEntry = sortedEntries.some(e => e.dateString === checkDateString);
            
            if (hasEntry) {
                streak++;
            } else if (i > 0) {
                // Break streak if we miss a day (except today)
                break;
            }
        }
        
        return streak;
    }
    
    /**
     * Export journal entries
     */
    exportEntries(format = 'json') {
        if (format === 'json') {
            return {
                exportDate: new Date().toISOString(),
                entryCount: this.entries.length,
                entries: this.entries
            };
        } else if (format === 'csv') {
            // Convert to CSV format
            const headers = ['Date', 'Mood Change', 'Energy Change', 'Focus Change', 'Session Duration', 'Track', 'Notes'];
            const rows = this.entries.map(entry => [
                entry.dateString,
                entry.moodChange || '',
                entry.energyChange || '',
                entry.focusChange || '',
                entry.sessionDuration || '',
                entry.trackName || '',
                entry.notes || ''
            ]);
            
            return [headers, ...rows];
        }
    }
    
    /**
     * Get journal statistics
     */
    getStatistics() {
        return {
            totalEntries: this.entries.length,
            currentStreak: this.calculateStreak(),
            totalSessionTime: this.entries.reduce((sum, e) => sum + (e.sessionDuration || 0), 0),
            avgMoodImprovement: this.calculateAverage(this.entries, 'moodChange'),
            avgEnergyImprovement: this.calculateAverage(this.entries, 'energyChange'),
            avgFocusImprovement: this.calculateAverage(this.entries, 'focusChange'),
            totalManifestations: this.entries.reduce((sum, e) => sum + e.manifestations.length, 0),
            totalSynchronicities: this.entries.reduce((sum, e) => sum + e.synchronicities.length, 0)
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumJournalSystem;
}