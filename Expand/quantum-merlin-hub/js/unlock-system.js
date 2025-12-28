// Quantum Merlin - Progressive Unlock System
// Tracks system completion and triggers unlocks

class UnlockSystem {
    constructor() {
        this.systemMapping = {
            psychological: [
                'Energy Leak Locator',
                'Life Phase Decoder',
                'Identity Split Detector',
                'Hidden Strengths Revealer'
            ],
            energy: [
                'Manifestation Readiness',
                'Stress Signature Analysis',
                'Life-Force Signal Detector'
            ],
            unconscious: [
                'Unconscious Contract Reveal',
                'Power Avoidance Pattern',
                'Safety vs Expansion Tension'
            ],
            relational: [
                'Trust Radar',
                'Authority Imprint Detector',
                'Relationship Dynamic Decoder'
            ],
            spiritual: [
                'Birth Sigil Generator',
                'Quantum Forecaster',
                'Tarot Reading',
                'Gematria Calculator'
            ]
        };

        this.systemNames = {
            psychological: 'Psychological Patterns',
            energy: 'Energy & Manifestation',
            unconscious: 'Unconscious Patterns',
            relational: 'Relational Dynamics',
            spiritual: 'Spiritual Foundation'
        };

        this.systemIcons = {
            psychological: '🧠',
            energy: '⚡',
            unconscious: '🌙',
            relational: '💫',
            spiritual: '✨'
        };
    }

    // Get all completed tools from localStorage
    getCompletedTools() {
        const library = JSON.parse(localStorage.getItem('quantumMerlinLibrary') || '[]');
        return library.map(item => item.tool);
    }

    // Get completed tools for a specific system
    getCompletedToolsForSystem(systemKey) {
        const completedTools = this.getCompletedTools();
        const systemTools = this.systemMapping[systemKey];
        return systemTools.filter(tool => completedTools.includes(tool));
    }

    // Calculate completion percentage for a system
    getSystemCompletion(systemKey) {
        const systemTools = this.systemMapping[systemKey];
        const completedTools = this.getCompletedToolsForSystem(systemKey);
        const percentage = (completedTools.length / systemTools.length) * 100;
        return {
            completed: completedTools.length,
            total: systemTools.length,
            percentage: Math.round(percentage),
            isComplete: completedTools.length === systemTools.length
        };
    }

    // Get overall completion across all systems
    getOverallCompletion() {
        let totalTools = 0;
        let completedTools = 0;

        Object.keys(this.systemMapping).forEach(systemKey => {
            const completion = this.getSystemCompletion(systemKey);
            totalTools += completion.total;
            completedTools += completion.completed;
        });

        return {
            completed: completedTools,
            total: totalTools,
            percentage: Math.round((completedTools / totalTools) * 100)
        };
    }

    // Check if a system is unlocked
    isSystemUnlocked(systemKey) {
        const unlocks = JSON.parse(localStorage.getItem('quantumMerlinUnlocks') || '{}');
        return unlocks[systemKey] === true;
    }

    // Unlock a system
    unlockSystem(systemKey) {
        const unlocks = JSON.parse(localStorage.getItem('quantumMerlinUnlocks') || '{}');
        
        // Check if already unlocked
        if (unlocks[systemKey]) {
            return false; // Already unlocked
        }

        // Mark as unlocked
        unlocks[systemKey] = true;
        localStorage.setItem('quantumMerlinUnlocks', JSON.stringify(unlocks));

        // Save unlock timestamp
        const timestamps = JSON.parse(localStorage.getItem('quantumMerlinUnlockTimestamps') || '{}');
        timestamps[systemKey] = new Date().toISOString();
        localStorage.setItem('quantumMerlinUnlockTimestamps', JSON.stringify(timestamps));

        return true; // Newly unlocked
    }

    // Check for new unlocks and trigger celebrations
    checkForUnlocks() {
        const newUnlocks = [];

        Object.keys(this.systemMapping).forEach(systemKey => {
            const completion = this.getSystemCompletion(systemKey);
            
            if (completion.isComplete && !this.isSystemUnlocked(systemKey)) {
                const wasUnlocked = this.unlockSystem(systemKey);
                if (wasUnlocked) {
                    newUnlocks.push({
                        systemKey: systemKey,
                        systemName: this.systemNames[systemKey],
                        icon: this.systemIcons[systemKey]
                    });
                }
            }
        });

        return newUnlocks;
    }

    // Check if master unlock is available
    isMasterUnlockAvailable() {
        const allSystemsComplete = Object.keys(this.systemMapping).every(systemKey => {
            return this.getSystemCompletion(systemKey).isComplete;
        });

        return allSystemsComplete;
    }

    // Check if master unlock has been triggered
    isMasterUnlocked() {
        return localStorage.getItem('quantumMerlinMasterUnlock') === 'true';
    }

    // Trigger master unlock
    triggerMasterUnlock() {
        if (!this.isMasterUnlockAvailable()) {
            return false;
        }

        localStorage.setItem('quantumMerlinMasterUnlock', 'true');
        localStorage.setItem('quantumMerlinMasterUnlockTimestamp', new Date().toISOString());
        return true;
    }

    // Get system progress data for dashboard
    getSystemProgressData() {
        const systems = {};

        Object.keys(this.systemMapping).forEach(systemKey => {
            const completion = this.getSystemCompletion(systemKey);
            const isUnlocked = this.isSystemUnlocked(systemKey);

            systems[systemKey] = {
                name: this.systemNames[systemKey],
                icon: this.systemIcons[systemKey],
                completed: completion.completed,
                total: completion.total,
                percentage: completion.percentage,
                isComplete: completion.isComplete,
                isUnlocked: isUnlocked,
                toolsRemaining: completion.total - completion.completed
            };
        });

        return systems;
    }

    // Get unlocked systems count
    getUnlockedSystemsCount() {
        return Object.keys(this.systemMapping).filter(systemKey => 
            this.isSystemUnlocked(systemKey)
        ).length;
    }

    // Get next unlock information
    getNextUnlock() {
        // Find system closest to completion that isn't unlocked
        let closestSystem = null;
        let closestPercentage = 0;

        Object.keys(this.systemMapping).forEach(systemKey => {
            const completion = this.getSystemCompletion(systemKey);
            const isUnlocked = this.isSystemUnlocked(systemKey);

            if (!isUnlocked && completion.percentage > closestPercentage) {
                closestPercentage = completion.percentage;
                closestSystem = {
                    systemKey: systemKey,
                    systemName: this.systemNames[systemKey],
                    icon: this.systemIcons[systemKey],
                    completed: completion.completed,
                    total: completion.total,
                    remaining: completion.total - completion.completed
                };
            }
        });

        return closestSystem;
    }

    // Generate system profile URL
    getSystemProfileUrl(systemKey) {
        return `profile-${systemKey}.html`;
    }

    // Get all insights for a system
    getSystemInsights(systemKey) {
        const library = JSON.parse(localStorage.getItem('quantumMerlinLibrary') || '[]');
        const systemTools = this.systemMapping[systemKey];
        
        return library.filter(item => systemTools.includes(item.tool));
    }
}

// Initialize unlock system
const unlockSystem = new UnlockSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnlockSystem;
}