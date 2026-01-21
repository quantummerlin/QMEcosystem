/**
 * Kosmic K-Pop Avatar Matching System
 * Matches users to pre-generated avatars based on cosmic profile
 */

class KosmicAvatarMatcher {
    constructor() {
        this.avatarBaseURL = "/avatars/";
        this.avatarLibrary = null;
        this.userProfiles = new Map();
    }
    
    /**
     * Initialize the avatar matcher
     * @param {Object} libraryConfig - Avatar library configuration
     */
    initialize(libraryConfig) {
        this.avatarLibrary = libraryConfig;
        console.log("✅ Avatar matcher initialized");
    }
    
    /**
     * Get avatar paths for a user's cosmic profile
     * @param {Object} userProfile - User's cosmic profile
     * @returns {Array} Array of avatar image URLs
     */
    getAvatarForProfile(userProfile) {
        const {
            archetype,      // "golden_leader", "mood_maker", etc.
            lifePath,       // 1-9
            gender,         // "male" or "female"
            concept         // "soft" or "dark"
        } = userProfile;
        
        // Generate avatar paths based on profile
        const avatarPaths = this.generateAvatarPaths(
            archetype,
            lifePath,
            gender,
            concept
        );
        
        return avatarPaths;
    }
    
    /**
     * Generate avatar file paths
     * @param {string} archetype - Archetype key
     * @param {number} lifePath - Life path number
     * @param {string} gender - Gender
     * @param {string} concept - Concept (soft/dark)
     * @returns {Array} Array of avatar URLs
     */
    generateAvatarPaths(archetype, lifePath, gender, concept) {
        const paths = [];
        
        // Tier 1: Basic avatars (no styles, single variation)
        const basePath = `${this.avatarBaseURL}${archetype}/lp${lifePath}/${gender}/${concept}/`;
        
        // Generate variations (Tier 2+)
        const styles = ["retro", "futuristic"];
        const variations = [1, 2, 3];
        
        for (const style of styles) {
            for (const variation of variations) {
                const filename = this.generateFilename(
                    archetype,
                    lifePath,
                    gender,
                    concept,
                    style,
                    variation
                );
                paths.push(basePath + style + "/" + filename);
            }
        }
        
        // If Tier 1, return single avatar
        if (paths.length === 0) {
            const filename = this.generateFilename(
                archetype,
                lifePath,
                gender,
                concept
            );
            paths.push(basePath + filename);
        }
        
        return paths;
    }
    
    /**
     * Generate filename for avatar
     * @param {string} archetype - Archetype key
     * @param {number} lifePath - Life path number
     * @param {string} gender - Gender
     * @param {string} concept - Concept
     * @param {string} style - Style (optional)
     * @param {number} variation - Variation number (optional)
     * @returns {string} Filename
     */
    generateFilename(archetype, lifePath, gender, concept, style = null, variation = 1) {
        const parts = [
            archetype,
            `lp${lifePath}`,
            gender,
            concept
        ];
        
        if (style) {
            parts.push(style);
        }
        
        parts.push(`v${variation}`);
        
        return parts.join("_") + ".jpg";
    }
    
    /**
     * Get user's cosmic profile from quiz results
     * @param {Object} quizResults - Quiz results
     * @returns {Object} Cosmic profile
     */
    getCosmicProfileFromQuiz(quizResults) {
        const {
            answers,
            lifePathNumber,
            archetypeResult
        } = quizResults;
        
        // Determine concept based on answers
        const concept = this.determineConcept(answers);
        
        // Determine gender preference (could ask user)
        const gender = answers.gender || "female";
        
        return {
            archetype: archetypeResult.key,
            lifePath: lifePathNumber,
            gender: gender,
            concept: concept
        };
    }
    
    /**
     * Determine concept (soft vs dark) from quiz answers
     * @param {Array} answers - Quiz answers
     * @returns {string} "soft" or "dark"
     */
    determineConcept(answers) {
        // Simple logic: more introverted answers = dark concept
        const introvertedAnswers = answers.filter(a => 
            a.toLowerCase().includes("quiet") ||
            a.toLowerCase().includes("introvert") ||
            a.toLowerCase().includes("alone") ||
            a.toLowerCase().includes("mysterious")
        );
        
        return introvertedAnswers.length > answers.length / 2 ? "dark" : "soft";
    }
    
    /**
     * Save user's avatar choice
     * @param {string} userId - User ID
     * @param {string} avatarPath - Chosen avatar path
     */
    saveUserAvatar(userId, avatarPath) {
        this.userProfiles.set(userId, {
            avatar: avatarPath,
            timestamp: Date.now()
        });
        
        // Save to localStorage
        try {
            const savedAvatars = JSON.parse(localStorage.getItem('kosmicAvatars') || '{}');
            savedAvatars[userId] = avatarPath;
            localStorage.setItem('kosmicAvatars', JSON.stringify(savedAvatars));
        } catch (e) {
            console.error("Failed to save avatar to localStorage:", e);
        }
    }
    
    /**
     * Get user's saved avatar
     * @param {string} userId - User ID
     * @returns {string|null} Avatar path or null
     */
    getUserAvatar(userId) {
        // Check memory first
        if (this.userProfiles.has(userId)) {
            return this.userProfiles.get(userId).avatar;
        }
        
        // Check localStorage
        try {
            const savedAvatars = JSON.parse(localStorage.getItem('kosmicAvatars') || '{}');
            return savedAvatars[userId] || null;
        } catch (e) {
            console.error("Failed to load avatar from localStorage:", e);
            return null;
        }
    }
    
    /**
     * Generate share text with avatar
     * @param {Object} userProfile - User's cosmic profile
     * @param {Object} archetypeData - Archetype data
     * @returns {string} Share text
     */
    generateShareText(userProfile, archetypeData) {
        const archetype = archetypeData.name;
        const lifePath = userProfile.lifePath;
        
        return `I'm the ${archetype} archetype with Life Path ${lifePath}! 🌟\n\nMy Kosmic K-Pop avatar matches my cosmic energy ✨\n\nK + K = 11:11\n\nGet yours at kosmickpop.com`;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KosmicAvatarMatcher;
}

// Global instance
window.kosmicAvatarMatcher = new KosmicAvatarMatcher();