/**
 * K-Pop K-osmos Progressive Journey System
 * "From Trainee to Superstar" 🌟
 * 
 * Tracks user progress through the 5-level K-Pop journey:
 * 1. TRAINEE - Entry level (4 tools)
 * 2. DEBUT - Understanding (6 tools)
 * 3. COMEBACK - Shadow work (5 tools)
 * 4. WORLD TOUR - Alignment (8 tools)
 * 5. LEGEND - Mastery (all remaining)
 */

const KPopProgress = {
    
    // Storage key
    STORAGE_KEY: 'kpopKosmosProgress',
    
    // Level definitions
    LEVELS: {
        1: { name: 'TRAINEE', emoji: '🎤', title: 'Trainee Era', requiredTools: 0 },
        2: { name: 'DEBUT', emoji: '🌟', title: 'Debut Era', requiredTools: 2 },
        3: { name: 'COMEBACK', emoji: '💫', title: 'Comeback Era', requiredTools: 5 },
        4: { name: 'WORLD_TOUR', emoji: '🌍', title: 'World Tour Era', requiredTools: 7 },
        5: { name: 'LEGEND', emoji: '👑', title: 'Legend Status', requiredTools: 10 }
    },
    
    // Tool tier assignments (which level unlocks each tool)
    // Uses filename without .html extension as the key
    TOOL_TIERS: {
        // Level 1 - TRAINEE (Always available - 4 core tools)
        'life-path-calculator': 1,       // Debut Idol Destiny Number
        'life-path-simple': 1,           // Quick Life Path
        'zodiac-calculator': 1,          // Sun Sign Calculator
        'soul-urge-calculator': 1,       // Soul Urge Number
        
        // Level 2 - DEBUT (6 tools - Building your profile)
        'destiny-number-calculator': 2,
        'personality-number-calculator': 2,
        'expression-number-reading': 2,
        'moon-sign-reading': 2,
        'rising-sign-reading': 2,
        'chinese-zodiac-calculator': 2,
        'chinese-zodiac-reading': 2,
        'birthday-number-reading': 2,
        'name-number-calculator': 2,
        'lucky-numbers': 2,
        
        // Level 3 - COMEBACK (5+ shadow work tools)
        'chiron-reading': 3,
        'saturn-sign-reading': 3,
        'karmic-debt-reading': 3,
        'challenge-numbers-reading': 3,
        'hidden-passion-number': 3,
        'south-node-reading': 3,
        'pluto-sign-reading': 3,
        'neptune-sign-reading': 3,
        'lilith-reading': 3,
        'relationship-karma-reading': 3,
        
        // Level 4 - WORLD TOUR (8+ alignment tools)
        'love-compatibility-reading': 4,
        'venus-sign-reading': 4,
        'mars-sign-reading': 4,
        'mercury-sign-reading': 4,
        'jupiter-sign-reading': 4,
        'synastry-reading': 4,
        'composite-chart-reading': 4,
        'venus-mars-compatibility': 4,
        'soul-mate-analysis': 4,
        'squad-chemistry-reading': 4,
        'relationship-life-path': 4,
        
        // Level 5 - LEGEND (Advanced mastery)
        'band-builder': 5,
        'band-builder-debut': 5,
        'band-builder-members': 5,
        'band-builder-results': 5,
        'vocation-reading': 5,
        'life-mission-reading': 5,
        'north-node-reading': 5,
        'midheaven-reading': 5,
        'pinnacle-numbers-reading': 5,
        'maturity-number-reading': 5,
        'master-number-reading': 5,
        'dharma-number-reading': 5,
        'soul-contract-reading': 5,
        'part-of-fortune-reading': 5,
        'descendant-reading': 5,
        'stellium-reading': 5,
        'modality-reading': 5,
        'uranus-sign-reading': 5,
        
        // Forecasts - Progressive unlock based on timeframe
        'daily-forecast': 1,
        'daily-fortune': 1,
        'cosmic-daily-forecast': 2,
        'personal-day-number': 2,
        'weekly-forecast': 3,
        'cosmic-weekly-forecast': 3,
        'monthly-forecast': 4,
        'cosmic-monthly-forecast': 4,
        'personal-month-reading': 4,
        'yearly-forecast': 5,
        'cosmic-yearly-forecast': 5,
        'personal-year-reading': 5,
        'decade-forecast': 5,
        
        // Fun tools - scattered across levels
        'fortune-cookie': 1,
        'yes-no-oracle': 1,
        'crystal-ball': 2,
        'moon-phase-calculator': 2,
        'mercury-retrograde-checker': 3,
        'void-of-course-moon': 4,
        'birthday-countdown': 1,
        'age-calculator': 1,
        'life-progress': 2,
        
        // Personality tests
        'aura-color-test': 2,
        'brain-type-test': 3,
        'color-personality-test': 2
    },
    
    // Achievement definitions
    ACHIEVEMENTS: {
        // Trainee Achievements
        'first-fancam': {
            name: 'First Fancam',
            emoji: '📸',
            description: 'Generated your first reading',
            tier: 1
        },
        'visual-certified': {
            name: 'Visual Certified',
            emoji: '✨',
            description: 'Completed your Debut Profile',
            tier: 1
        },
        'trainee-complete': {
            name: 'Trainee Evaluation Complete',
            emoji: '🏆',
            description: 'Ready to debut!',
            tier: 1
        },
        
        // Debut Achievements
        'rookie-of-year': {
            name: 'Rookie of the Year',
            emoji: '🏆',
            description: 'Completed 3 debut tools',
            tier: 2
        },
        'chart-topper': {
            name: 'Chart Topper',
            emoji: '📈',
            description: 'Saved 5 readings',
            tier: 2
        },
        
        // Comeback Achievements
        'dark-concept': {
            name: 'Dark Concept Served',
            emoji: '🖤',
            description: 'Completed 2 shadow tools',
            tier: 3
        },
        'concept-master': {
            name: 'Concept Master',
            emoji: '👑',
            description: 'Completed all shadow tools',
            tier: 3
        },
        
        // World Tour Achievements
        'global-sensation': {
            name: 'Global Sensation',
            emoji: '🌍',
            description: 'Completed 4 world tour tools',
            tier: 4
        },
        'squad-goals': {
            name: 'Squad Goals',
            emoji: '💜',
            description: 'Found compatibility matches',
            tier: 4
        },
        
        // Legend Achievements
        'kpop-legend': {
            name: 'K-Pop K-osmic Legend',
            emoji: '👑',
            description: 'Reached Legend status',
            tier: 5
        },
        'stan-of-stans': {
            name: 'Stan of Stans',
            emoji: '💫',
            description: 'Completed all tools',
            tier: 5
        },
        
        // Special Achievements
        'bias-wrecker': {
            name: 'Bias Wrecker',
            emoji: '💕',
            description: 'Same reading in 3 realms',
            special: true
        },
        'comeback-season': {
            name: 'Comeback Season',
            emoji: '🔥',
            description: '7 days in a row',
            special: true
        },
        'multiverse-idol': {
            name: 'Multiverse Idol',
            emoji: '🌌',
            description: 'Tried 3+ realms',
            special: true
        }
    },
    
    // Producer voice messages
    PRODUCER_MESSAGES: {
        levelUp: {
            2: "OMGGGG BESTIE!!! 🎉✨ YOUR DEBUT IS HERE! The whole K-osmos is watching! Ready to serve LOOKS and VIBES? Let's unlock your comeback tools! 💜🌟",
            3: "Okay so like... you're ready for your DARK CONCEPT ERA. 😈 Every legend has one. BTS had 'ON', BLACKPINK had 'Kill This Love'... what's YOUR shadow vibe? Let's find out... 🖤",
            4: "BESTIE YOU'RE GOING GLOBAL!!! 🌍✈️ Sold out shows! International stans! THIS IS YOUR MOMENT! Time to connect with your squad and spread your K-osmic energy worldwide! 🌟💫",
            5: "YOU. ARE. LEGENDARY. 👑✨ Not just an idol anymore. You're a LEGACY. The K-osmos bows to you. Ready to unlock EVERYTHING and create your own magic? Let's goooo! 🚀💜"
        },
        achievements: {
            'first-fancam': "Awww look at you! Your first reading! 📸✨ The camera LOVES you bestie! Save this moment forever! 💜",
            'trainee-complete': "You passed your trainee evaluation! 🎉 The company is IMPRESSED! Debut is coming soon! 🌟",
            'rookie-of-year': "STOP IT. STOP IT RIGHT NOW. 🏆 You just won ROOKIE OF THE YEAR! *throws confetti* Your dedication is SHOWING! 🎉",
            'dark-concept': "OKAY WOW. You went THERE. 🖤😈 Dark concept DELIVERED! The critics are SHOOK! Your range is INSANE! 🔥",
            'kpop-legend': "I'M NOT CRYING, YOU'RE CRYING! 😭💜✨ You're officially a K-POP K-OSMIC LEGEND! Your name will be remembered! 👑🌟"
        },
        locked: "This tool unlocks at {level} level! Keep vibing and you'll get there soon! 💜",
        encouragement: [
            "You're doing AMAZING sweetie! 💜",
            "Main character energy detected! ✨",
            "The K-osmos believes in you! 🌟",
            "Slay bestie, SLAY! 🔥",
            "Your power is showing! 💫"
        ]
    },
    
    /**
     * Initialize or load progress
     */
    init() {
        let progress = this.getProgress();
        if (!progress) {
            progress = this.createNewProgress();
            this.saveProgress(progress);
        }
        return progress;
    },
    
    /**
     * Create new progress object
     */
    createNewProgress() {
        return {
            level: 1,
            completedTools: [],
            achievements: [],
            savedReadings: 0,
            totalVisits: 1,
            streak: 1,
            lastVisit: new Date().toISOString(),
            firstVisit: new Date().toISOString(),
            crossRealmCount: 0
        };
    },
    
    /**
     * Get progress from localStorage
     */
    getProgress() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const progress = JSON.parse(stored);
                // Update visit tracking
                progress.totalVisits = (progress.totalVisits || 0) + 1;
                this.updateStreak(progress);
                return progress;
            }
        } catch (e) {
            console.error('Error loading K-Pop progress:', e);
        }
        return null;
    },
    
    /**
     * Save progress to localStorage
     */
    saveProgress(progress) {
        try {
            progress.lastVisit = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.error('Error saving K-Pop progress:', e);
        }
    },
    
    /**
     * Update streak counter
     */
    updateStreak(progress) {
        const lastVisit = new Date(progress.lastVisit);
        const now = new Date();
        const hoursDiff = (now - lastVisit) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
            // Same day or within 24h - keep streak
        } else if (hoursDiff < 48) {
            // Within 48h - increment streak
            progress.streak = (progress.streak || 0) + 1;
            // Check for comeback season achievement
            if (progress.streak >= 7) {
                this.unlockAchievement('comeback-season');
            }
        } else {
            // Streak broken
            progress.streak = 1;
        }
    },
    
    /**
     * Mark a tool as completed
     */
    completeTool(toolId) {
        const progress = this.getProgress() || this.createNewProgress();
        
        if (!progress.completedTools.includes(toolId)) {
            progress.completedTools.push(toolId);
            
            // Check for first-fancam achievement
            if (progress.completedTools.length === 1) {
                this.unlockAchievement('first-fancam');
            }
            
            // Check for level up
            this.checkLevelUp(progress);
            
            // Check tier-specific achievements
            this.checkTierAchievements(progress);
            
            this.saveProgress(progress);
        }
        
        return progress;
    },
    
    /**
     * Check if user should level up
     */
    checkLevelUp(progress) {
        const completedCount = progress.completedTools.length;
        let newLevel = 1;
        
        for (let level = 5; level >= 1; level--) {
            if (completedCount >= this.LEVELS[level].requiredTools) {
                newLevel = level;
                break;
            }
        }
        
        if (newLevel > progress.level) {
            const oldLevel = progress.level;
            progress.level = newLevel;
            
            // Trigger level up celebration
            this.showLevelUpCelebration(oldLevel, newLevel);
            
            // Unlock level-specific achievement
            if (newLevel === 2) this.unlockAchievement('trainee-complete');
            if (newLevel === 5) this.unlockAchievement('kpop-legend');
        }
    },
    
    /**
     * Check tier-specific achievements
     */
    checkTierAchievements(progress) {
        const completedTools = progress.completedTools;
        
        // Count tools by tier
        const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        completedTools.forEach(toolId => {
            const tier = this.TOOL_TIERS[toolId] || 1;
            tierCounts[tier]++;
        });
        
        // Debut achievements
        if (tierCounts[2] >= 3 && !this.hasAchievement('rookie-of-year')) {
            this.unlockAchievement('rookie-of-year');
        }
        
        // Shadow work achievements
        if (tierCounts[3] >= 2 && !this.hasAchievement('dark-concept')) {
            this.unlockAchievement('dark-concept');
        }
        if (tierCounts[3] >= 5 && !this.hasAchievement('concept-master')) {
            this.unlockAchievement('concept-master');
        }
        
        // World tour achievements
        if (tierCounts[4] >= 4 && !this.hasAchievement('global-sensation')) {
            this.unlockAchievement('global-sensation');
        }
    },
    
    /**
     * Check if tool is unlocked
     */
    isToolUnlocked(toolId) {
        const progress = this.getProgress();
        if (!progress) return this.TOOL_TIERS[toolId] === 1;
        
        const requiredLevel = this.TOOL_TIERS[toolId] || 1;
        return progress.level >= requiredLevel;
    },
    
    /**
     * Get tool tier/level
     */
    getToolTier(toolId) {
        return this.TOOL_TIERS[toolId] || 1;
    },
    
    /**
     * Unlock an achievement
     */
    unlockAchievement(achievementId) {
        const progress = this.getProgress();
        if (!progress) return;
        
        if (!progress.achievements.some(a => a.id === achievementId)) {
            const achievement = this.ACHIEVEMENTS[achievementId];
            if (achievement) {
                progress.achievements.push({
                    id: achievementId,
                    unlockedAt: new Date().toISOString()
                });
                this.saveProgress(progress);
                this.showAchievementPopup(achievementId);
            }
        }
    },
    
    /**
     * Check if user has achievement
     */
    hasAchievement(achievementId) {
        const progress = this.getProgress();
        return progress && progress.achievements.some(a => a.id === achievementId);
    },
    
    /**
     * Show level up celebration
     */
    showLevelUpCelebration(oldLevel, newLevel) {
        const levelInfo = this.LEVELS[newLevel];
        const message = this.PRODUCER_MESSAGES.levelUp[newLevel];
        
        // Create celebration modal
        const modal = document.createElement('div');
        modal.className = 'kpop-celebration-modal';
        modal.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-confetti"></div>
                <div class="celebration-emoji">${levelInfo.emoji}</div>
                <h2 class="celebration-title">LEVEL UP!</h2>
                <h3 class="celebration-level">${levelInfo.title}</h3>
                <p class="celebration-message">${message}</p>
                <button class="celebration-btn" onclick="this.closest('.kpop-celebration-modal').remove()">
                    Let's GOOOO! 🚀
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds
        setTimeout(() => modal.remove(), 10000);
    },
    
    /**
     * Show achievement popup
     */
    showAchievementPopup(achievementId) {
        const achievement = this.ACHIEVEMENTS[achievementId];
        const message = this.PRODUCER_MESSAGES.achievements[achievementId] || 
                        `You unlocked: ${achievement.name}! 🎉`;
        
        const popup = document.createElement('div');
        popup.className = 'kpop-achievement-popup';
        popup.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-emoji">${achievement.emoji}</div>
                <div class="achievement-text">
                    <span class="achievement-label">Achievement Unlocked!</span>
                    <span class="achievement-name">${achievement.name}</span>
                </div>
            </div>
            <p class="achievement-message">${message}</p>
        `;
        document.body.appendChild(popup);
        
        // Animate in
        setTimeout(() => popup.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 5000);
    },
    
    /**
     * Get current level info
     */
    getCurrentLevel() {
        const progress = this.getProgress();
        const level = progress ? progress.level : 1;
        return {
            ...this.LEVELS[level],
            level: level,
            progress: progress
        };
    },
    
    /**
     * Get progress percentage to next level
     */
    getProgressToNextLevel() {
        const progress = this.getProgress();
        if (!progress || progress.level >= 5) return 100;
        
        const currentReq = this.LEVELS[progress.level].requiredTools;
        const nextReq = this.LEVELS[progress.level + 1].requiredTools;
        const completed = progress.completedTools.length;
        
        return Math.min(100, Math.round(((completed - currentReq) / (nextReq - currentReq)) * 100));
    },
    
    /**
     * Get random encouragement message
     */
    getEncouragement() {
        const messages = this.PRODUCER_MESSAGES.encouragement;
        return messages[Math.floor(Math.random() * messages.length)];
    },
    
    /**
     * Increment saved readings count
     */
    incrementSavedReadings() {
        const progress = this.getProgress();
        if (progress) {
            progress.savedReadings = (progress.savedReadings || 0) + 1;
            
            // Check for chart-topper achievement
            if (progress.savedReadings >= 5 && !this.hasAchievement('chart-topper')) {
                this.unlockAchievement('chart-topper');
            }
            
            this.saveProgress(progress);
        }
    },
    
    /**
     * Track cross-realm visit
     */
    trackRealmVisit(realmName) {
        const progress = this.getProgress();
        if (progress) {
            if (!progress.visitedRealms) progress.visitedRealms = [];
            if (!progress.visitedRealms.includes(realmName)) {
                progress.visitedRealms.push(realmName);
                progress.crossRealmCount = progress.visitedRealms.length;
                
                // Check for multiverse achievement
                if (progress.crossRealmCount >= 3 && !this.hasAchievement('multiverse-idol')) {
                    this.unlockAchievement('multiverse-idol');
                }
                
                this.saveProgress(progress);
            }
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    KPopProgress.init();
    // Track this realm visit
    KPopProgress.trackRealmVisit('kpop');
});

// Export for use in other scripts
window.KPopProgress = KPopProgress;
