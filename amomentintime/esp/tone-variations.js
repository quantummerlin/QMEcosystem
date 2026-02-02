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
    "Esta persona": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "esta persona": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Esta alma": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "esta alma": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Ellos son": { feminine: "Ella es", masculine: "Él es", neutral: "Ellos son" },
    "ellos son": { feminine: "ella es", masculine: "él es", neutral: "ellos son" },
    "Ellos tienen": { feminine: "Ella tiene", masculine: "Él tiene", neutral: "Ellos tienen" },
    "ellos tienen": { feminine: "ella tiene", masculine: "él tiene", neutral: "ellos tienen" },
    "Ellos serán": { feminine: "Ella será", masculine: "Él será", neutral: "Ellos serán" },
    "ellos serán": { feminine: "ella será", masculine: "él será", neutral: "ellos serán" },
    "Su": { feminine: "Su", masculine: "Su", neutral: "Su" },
    "su": { feminine: "su", masculine: "su", neutral: "su" },
    "ellos": { feminine: "ella", masculine: "él", neutral: "ellos" },
    "ellos mismos": { feminine: "ella misma", masculine: "él mismo", neutral: "ellos mismos" },
    
    // Descriptive adjustments
    "fortaleza": { feminine: "fortaleza interior", masculine: "fortaleza", neutral: "fortaleza" },
    "poderoso": { feminine: "profundamente poderoso", masculine: "poderoso", neutral: "poderoso" },
    "valentía": { feminine: "valentía serena", masculine: "valentía audaz", neutral: "valentía" },
    "guerrero": { feminine: "espíritu guerrero", masculine: "guerrero", neutral: "guerrero" },
    "gentil": { feminine: "gentil", masculine: "sutilmente fuerte", neutral: "gentil" },
    "sensible": { feminine: "sensible", masculine: "perceptivo", neutral: "sensible" },
    "nutridor": { feminine: "nutridor", masculine: "apoyo", neutral: "nutridor" },
    "protector": { feminine: "protector", masculine: "protector", neutral: "protector" },
    "ambicioso": { feminine: "discretamente ambicioso", masculine: "ambicioso", neutral: "ambicioso" },
    "impulsado": { feminine: "impulsado con propósito", masculine: "impulsado", neutral: "impulsado" },
    "líder": { feminine: "líder y guía", masculine: "líder", neutral: "líder" },
    "luchador": { feminine: "defensor", masculine: "luchador", neutral: "campeón" },
    "conquistar": { feminine: "superar", masculine: "conquistar", neutral: "superar" },
    "dominar": { feminine: "destacar en", masculine: "dominar", neutral: "maestría" },
    "agresivo": { feminine: "asertivo", masculine: "agresivo", neutral: "asertivo" },
    "tierno": { feminine: "tierno", masculine: "considerado", neutral: "cariñoso" },
    "intuición": { feminine: "intuición", masculine: "instinto", neutral: "intuición" },
    "emocional": { feminine: "sintonía emocional", masculine: "inteligencia emocional", neutral: "conciencia emocional" },
    "sentimientos": { feminine: "sentimientos", masculine: "mundo interior", neutral: "emociones" },
    "corazón": { feminine: "corazón", masculine: "núcleo", neutral: "corazón" }
};

/**
 * Phrase-level substitutions for more natural reading
 */
var PHRASE_SUBSTITUTIONS = {
    "destinado a liderar": { feminine: "destinada a inspirar y liderar", masculine: "destinado a liderar", neutral: "destinado a guiar" },
    "nacido para luchar": { feminine: "nacida para defender", masculine: "nacido para luchar", neutral: "nacido para impulsar" },
    "líder nato": { feminine: "líder nata y cuidadora", masculine: "líder nato", neutral: "guía natural" },
    "conquistando desafíos": { feminine: "transformando desafíos", masculine: "conquistando desafíos", neutral: "superando desafíos" },
    "determinación feroz": { feminine: "determinación serena", masculine: "determinación feroz", neutral: "determinación silenciosa" },
    "luchar su camino": { feminine: "abrirse paso", masculine: "luchar su camino", neutral: "encontrar su camino" },
    "presencia dominante": { feminine: "presencia imponente", masculine: "presencia dominante", neutral: "presencia notable" },
    "enfoque agresivo": { feminine: "enfoque asertivo", masculine: "enfoque agresivo", neutral: "enfoque directo" }
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
