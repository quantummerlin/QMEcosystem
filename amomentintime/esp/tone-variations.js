// ============================================
// SISTEMA DE VARIACIONES DE TONO
// ============================================
// Aplica variaciones sutiles de lenguaje según el modo de color:
// - Rosa: Tono ligeramente femenino/acogedor
// - Azul: Tono ligeramente masculino/orientado a la acción
// - Púrpura (predeterminado): Tono neutro/equilibrado
// ============================================

/**
 * Sustituciones de palabras según el tono
 * Formato: { neutro: { femenino: "palabra", masculino: "palabra", neutro: "palabra" } }
 */
var TONE_SUBSTITUTIONS = {
    // Pronombres y referencias
    "Este individuo": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "este individuo": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Esta alma": { feminine: "Ella", masculine: "Él", neutral: "Esta alma" },
    "esta alma": { feminine: "ella", masculine: "él", neutral: "esta alma" },
    "Tienen": { feminine: "Ella tiene", masculine: "Él tiene", neutral: "Tienen" },
    "tienen": { feminine: "ella tiene", masculine: "él tiene", neutral: "tienen" },
    "Son": { feminine: "Ella es", masculine: "Él es", neutral: "Son" },
    "son": { feminine: "ella es", masculine: "él es", neutral: "son" },
    "Su ": { feminine: "Su ", masculine: "Su ", neutral: "Su " },
    "su ": { feminine: "su ", masculine: "su ", neutral: "su " },
    "sí mismos": { feminine: "sí misma", masculine: "sí mismo", neutral: "sí mismos" },
    
    // Ajustes descriptivos
    "fuerza": { feminine: "fuerza interior", masculine: "fuerza", neutral: "fuerza" },
    "poderoso": { feminine: "profundamente poderosa", masculine: "poderoso", neutral: "poderoso" },
    "poderosa": { feminine: "profundamente poderosa", masculine: "poderoso", neutral: "poderosa" },
    "valentía": { feminine: "valentía silenciosa", masculine: "valentía audaz", neutral: "valentía" },
    "guerrero": { feminine: "espíritu guerrero", masculine: "guerrero", neutral: "guerrero" },
    "guerrera": { feminine: "espíritu guerrero", masculine: "guerrero", neutral: "guerrera" },
    "gentil": { feminine: "gentil", masculine: "silenciosamente fuerte", neutral: "gentil" },
    "sensible": { feminine: "sensible", masculine: "perceptivo", neutral: "sensible" },
    "protector": { feminine: "protectora", masculine: "protector", neutral: "protector" },
    "protectora": { feminine: "protectora", masculine: "protector", neutral: "protectora" },
    "ambicioso": { feminine: "silenciosamente ambiciosa", masculine: "ambicioso", neutral: "ambicioso" },
    "ambiciosa": { feminine: "silenciosamente ambiciosa", masculine: "ambicioso", neutral: "ambiciosa" },
    "determinado": { feminine: "con propósito determinado", masculine: "determinado", neutral: "determinado" },
    "determinada": { feminine: "con propósito determinado", masculine: "determinado", neutral: "determinada" },
    "líder": { feminine: "líder y guía", masculine: "líder", neutral: "líder" },
    "luchador": { feminine: "defensora", masculine: "luchador", neutral: "campeón" },
    "luchadora": { feminine: "defensora", masculine: "luchador", neutral: "campeona" },
    "conquistar": { feminine: "superar", masculine: "conquistar", neutral: "superar" },
    "dominar": { feminine: "sobresalir en", masculine: "dominar", neutral: "dominar" },
    "agresivo": { feminine: "asertiva", masculine: "agresivo", neutral: "asertivo" },
    "agresiva": { feminine: "asertiva", masculine: "agresivo", neutral: "asertiva" },
    "tierno": { feminine: "tierna", masculine: "reflexivo", neutral: "cariñoso" },
    "tierna": { feminine: "tierna", masculine: "reflexivo", neutral: "cariñosa" },
    "intuición": { feminine: "intuición", masculine: "instinto", neutral: "intuición" },
    "emocional": { feminine: "emocionalmente sintonizada", masculine: "emocionalmente inteligente", neutral: "emocionalmente consciente" },
    "sentimientos": { feminine: "sentimientos", masculine: "mundo interior", neutral: "emociones" },
    "corazón": { feminine: "corazón", masculine: "esencia", neutral: "corazón" }
};

/**
 * Sustituciones a nivel de frase para una lectura más natural
 */
var PHRASE_SUBSTITUTIONS = {
    "destinado a liderar": { feminine: "destinada a inspirar y liderar", masculine: "destinado a liderar", neutral: "destinado a guiar" },
    "destinada a liderar": { feminine: "destinada a inspirar y liderar", masculine: "destinado a liderar", neutral: "destinada a guiar" },
    "nacido para luchar": { feminine: "nacida para defender", masculine: "nacido para luchar", neutral: "nacido para ser campeón" },
    "nacida para luchar": { feminine: "nacida para defender", masculine: "nacido para luchar", neutral: "nacida para ser campeona" },
    "líder nato": { feminine: "líder y protectora nata", masculine: "líder nato", neutral: "guía natural" },
    "líder nata": { feminine: "líder y protectora nata", masculine: "líder nato", neutral: "guía natural" },
    "conquistando desafíos": { feminine: "transformando desafíos", masculine: "conquistando desafíos", neutral: "superando desafíos" },
    "determinación feroz": { feminine: "determinación elegante", masculine: "determinación feroz", neutral: "determinación silenciosa" },
    "abrirse camino a la fuerza": { feminine: "navegar su camino", masculine: "abrirse camino a la fuerza", neutral: "encontrar su camino" },
    "presencia dominante": { feminine: "presencia imponente", masculine: "presencia dominante", neutral: "presencia notable" },
    "enfoque agresivo": { feminine: "enfoque asertivo", masculine: "enfoque agresivo", neutral: "enfoque directo" }
};

/**
 * Obtener el tono actual según el modo de color
 * @returns {string} 'feminine', 'masculine', o 'neutral'
 */
function getCurrentTone() {
    if (document.body.classList.contains('color-mode-pink')) {
        return 'feminine';
    } else if (document.body.classList.contains('color-mode-blue')) {
        return 'masculine';
    }
    return 'neutral'; // Púrpura/predeterminado
}

/**
 * Aplicar variaciones de tono al texto de la lectura
 * @param {string} text - El texto original de la lectura
 * @returns {string} - Texto con variaciones de tono aplicadas
 */
function applyToneVariations(text) {
    if (!text) return text;
    
    const tone = getCurrentTone();
    let result = text;
    
    // Aplicar sustituciones de frases primero (patrones más largos primero)
    for (const [original, replacements] of Object.entries(PHRASE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        const regex = new RegExp(original, 'gi');
        result = result.replace(regex, (match) => {
            // Preservar mayúsculas originales
            if (match[0] === match[0].toUpperCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
        });
    }
    
    // Aplicar sustituciones de palabras
    for (const [original, replacements] of Object.entries(TONE_SUBSTITUTIONS)) {
        const replacement = replacements[tone] || replacements.neutral;
        // Usar coincidencia de límites de palabra para palabras individuales
        const regex = new RegExp(`\\b${original}\\b`, 'g');
        result = result.replace(regex, replacement);
    }
    
    return result;
}

/**
 * Conectar a la visualización de lecturas para aplicar variaciones de tono
 * Esto envuelve la función original createReadingCard si existe
 */
function initToneVariations() {
    // Verificar si existe la función original
    if (typeof window.originalCreateReadingCard === 'undefined' && typeof createReadingCard !== 'undefined') {
        window.originalCreateReadingCard = createReadingCard;
        
        // Sobrescribir con versión consciente del tono
        window.createReadingCard = function(title, subtitle, keywords, content, strengths, challenges) {
            // Aplicar variaciones de tono al contenido
            const tonedContent = applyToneVariations(content);
            const tonedStrengths = Array.isArray(strengths) ? strengths.map(applyToneVariations) : strengths;
            const tonedChallenges = Array.isArray(challenges) ? challenges.map(applyToneVariations) : challenges;
            
            // Llamar a la función original con contenido modificado
            return window.originalCreateReadingCard(title, subtitle, keywords, tonedContent, tonedStrengths, tonedChallenges);
        };
    }
}

/**
 * Re-aplicar tono cuando cambia el modo de color
 */
function onColorModeChange() {
    // Si las lecturas ya se muestran, podríamos actualizarlas
    // Por ahora, el tono se aplica en el momento de la generación
    // Futuro: Podría agregar re-renderizado en vivo de las lecturas
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToneVariations);
} else {
    initToneVariations();
}

// Exportar para uso
window.applyToneVariations = applyToneVariations;
window.getCurrentTone = getCurrentTone;
