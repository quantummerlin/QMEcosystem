// ============================================
// TONE VARIATIONS SYSTEM
// ============================================
// Applies subtle language variations based on color mode:
// - Pink: Slightly feminine/nurturing tone
// - Blue: Slightly masculine/action-oriented tone
// - Purple (default): Neutral/balanced tone
// ============================================

/**
 * Word substitutions based on tone
 * Format: { neutral: { feminine: "word", masculine: "word", neutral: "word" } }
 */
var TONE_SUBSTITUTIONS = {
    // Pronouns and references
    "This individual": { feminine: "She", masculine: "He", neutral: "This soul" },
    "this individual": { feminine: "she", masculine: "he", neutral: "this soul" },
    "This soul": { feminine: "She", masculine: "He", neutral: "This soul" },
    "this soul": { feminine: "she", masculine: "he", neutral: "this soul" },
    "They are": { feminine: "She is", masculine: "He is", neutral: "They are" },
    "they are": { feminine: "she is", masculine: "he is", neutral: "they are" },
    "They have": { feminine: "She has", masculine: "He has", neutral: "They have" },
    "they have": { feminine: "she has", masculine: "he has", neutral: "they have" },
    "They will": { feminine: "She will", masculine: "He will", neutral: "They will" },
    "they will": { feminine: "she will", masculine: "he will", neutral: "they will" },
    "Their": { feminine: "Her", masculine: "His", neutral: "Their" },
    "their": { feminine: "her", masculine: "his", neutral: "their" },
    "them": { feminine: "her", masculine: "him", neutral: "them" },
    "themselves": { feminine: "herself", masculine: "himself", neutral: "themselves" },
    
    // Descriptive adjustments
    "strength": { feminine: "inner strength", masculine: "strength", neutral: "strength" },
    "powerful": { feminine: "deeply powerful", masculine: "powerful", neutral: "powerful" },
    "courage": { feminine: "quiet courage", masculine: "bold courage", neutral: "courage" },
    "warrior": { feminine: "warrior spirit", masculine: "warrior", neutral: "warrior" },
    "gentle": { feminine: "gentle", masculine: "quietly strong", neutral: "gentle" },
    "sensitive": { feminine: "sensitive", masculine: "perceptive", neutral: "sensitive" },
    "nurturing": { feminine: "nurturing", masculine: "supportive", neutral: "nurturing" },
    "protective": { feminine: "protective", masculine: "protective", neutral: "protective" },
    "ambitious": { feminine: "quietly ambitious", masculine: "ambitious", neutral: "ambitious" },
    "driven": { feminine: "purposefully driven", masculine: "driven", neutral: "driven" },
    "leader": { feminine: "leader and guide", masculine: "leader", neutral: "leader" },
    "fighter": { feminine: "advocate", masculine: "fighter", neutral: "champion" },
    "conquer": { feminine: "overcome", masculine: "conquer", neutral: "overcome" },
    "dominate": { feminine: "excel in", masculine: "dominate", neutral: "master" },
    "aggressive": { feminine: "assertive", masculine: "aggressive", neutral: "assertive" },
    "tender": { feminine: "tender", masculine: "thoughtful", neutral: "caring" },
    "intuition": { feminine: "intuition", masculine: "instinct", neutral: "intuition" },
    "emotional": { feminine: "emotionally attuned", masculine: "emotionally intelligent", neutral: "emotionally aware" },
    "feelings": { feminine: "feelings", masculine: "inner world", neutral: "emotions" },
    "heart": { feminine: "heart", masculine: "core", neutral: "heart" }
};

/**
 * Phrase-level substitutions for more natural reading
 */
var PHRASE_SUBSTITUTIONS = {
    "destined to lead": { feminine: "destined to inspire and lead", masculine: "destined to lead", neutral: "destined to guide" },
    "born to fight": { feminine: "born to advocate", masculine: "born to fight", neutral: "born to champion" },
    "natural-born leader": { feminine: "natural-born leader and nurturer", masculine: "natural-born leader", neutral: "natural guide" },
    "conquering challenges": { feminine: "transforming challenges", masculine: "conquering challenges", neutral: "overcoming challenges" },
    "fierce determination": { feminine: "graceful determination", masculine: "fierce determination", neutral: "quiet determination" },
    "battle their way": { feminine: "navigate their way", masculine: "battle their way", neutral: "find their way" },
    "dominating presence": { feminine: "commanding presence", masculine: "dominating presence", neutral: "notable presence" },
    "aggressive approach": { feminine: "assertive approach", masculine: "aggressive approach", neutral: "direct approach" }
};

/**
 * Get the current tone based on color mode
 * @returns {string} 'feminine', 'masculine', or 'neutral'
 */
function getCurrentTone() {
    if (document.body.classList.contains('color-mode-pink')) {
        return 'feminine';
    } else if (document.body.classList.contains('color-mode-blue')) {
        return 'masculine';
    }
    return 'neutral'; // Purple/default
}

/**
 * Apply tone variations to reading text
 * @param {string} text - The original reading text
 * @returns {string} - Text with tone variations applied
 */
function applyToneVariations(text) {
    if (!text) return text;
    
    const tone = getCurrentTone();
    let result = text;
    
    // Apply phrase substitutions first (longer patterns first)
    for (const [original, replacements] of Object.entries(PHRASE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        const regex = new RegExp(original, 'gi');
        result = result.replace(regex, (match) => {
            // Preserve original capitalization
            if (match[0] === match[0].toUpperCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
        });
    }
    
    // Apply word substitutions
    for (const [original, replacements] of Object.entries(TONE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        // Use word boundary matching for single words
        const regex = new RegExp(`\\b${original}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    
    return result;
}

/**
 * Hook into reading display to apply tone variations
 * This wraps the original createReadingCard function if it exists
 */
function initToneVariations() {
    // Check if original function exists
    if (typeof window.originalCreateReadingCard === 'undefined' && typeof createReadingCard !== 'undefined') {
        window.originalCreateReadingCard = createReadingCard;
        
        // Override with tone-aware version
        window.createReadingCard = function(title, subtitle, keywords, content, strengths, challenges) {
            // Apply tone variations to content
            const tonedContent = applyToneVariations(content);
            const tonedStrengths = Array.isArray(strengths) ? strengths.map(applyToneVariations) : strengths;
            const tonedChallenges = Array.isArray(challenges) ? challenges.map(applyToneVariations) : challenges;
            
            // Call original function with modified content
            return window.originalCreateReadingCard(title, subtitle, keywords, tonedContent, tonedStrengths, tonedChallenges);
        };
    }
}

/**
 * Re-apply tone when color mode changes
 */
function onColorModeChange() {
    // If readings are already displayed, we could refresh them
    // For now, tone is applied at generation time
    // Future: Could add live re-rendering of readings
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToneVariations);
} else {
    initToneVariations();
}

// Export for use
window.applyToneVariations = applyToneVariations;
window.getCurrentTone = getCurrentTone;
