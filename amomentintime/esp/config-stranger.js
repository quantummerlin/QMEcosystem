// ============================================
// PATRONES EXTRAÑOS - CONFIGURACIÓN DE MARCA
// ============================================
// Marca temática Stranger Things
// Copia este archivo a config.js para activar
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // IDENTIDAD DE MARCA
    // ============================================
    brandName: "Patrones Extraños",
    tagline: "El Oráculo del Mundo Invertido",
    subTagline: "58 Lecturas • Perfil Completo del Sujeto • Tu Plano de Hawkins",
    
    // ¿Para quién es esta lectura?
    subjectType: "persona",
    subjectLabel: "Sujeto",
    subjectLabelPlural: "Sujetos",
    
    // ============================================
    // TEXTO E IDIOMA
    // ============================================
    inputLabels: {
        name: "Nombre del Sujeto",
        namePlaceholder: "Ingresa tu nombre",
        nameHelper: "Tu identidad en esta dimensión",
        
        birthDate: "Fecha de Manifestación",
        birthDateHelper: "Cuándo entraste en esta dimensión",
        
        birthTime: "Hora de Manifestación",
        birthTimeHelper: "Para una alineación dimensional precisa",
        
        birthPlace: "Lugar de Origen",
        birthPlacePlaceholder: "Ciudad, País",
        birthPlaceHelper: "Donde comenzó tu historia"
    },
    
    ctaButton: "🔮 Abrir el Portal",
    loadingMessage: "Accediendo al Mundo Invertido...",
    
    // Texto de la página de resultados
    resultTitle: "Análisis del Sujeto Completo",
    resultSubtitle: "Perfil Dimensional de",
    generatedBy: "Transmitido desde Patrones Extraños",
    
    // ============================================
    // NOMBRES DE SECCIONES - Tema Stranger Things
    // ============================================
    sections: {
        celestial: {
            name: "Anomalías Celestiales",
            icon: "🔮",
            description: "Tus influencias planetarias desde más allá del portal"
        },
        numbers: {
            name: "Números Ocultos",
            icon: "011",
            description: "Los patrones numerológicos en tu código dimensional"
        },
        soul: {
            name: "Misión Psíquica",
            icon: "⚡",
            description: "Tu propósito más profundo y dones sobrenaturales"
        },
        forecasts: {
            name: "Portales Dimensionales",
            icon: "🌀",
            description: "Lo que el Mundo Invertido revela sobre tu futuro"
        },
        cycles: {
            name: "Cambios Temporales",
            icon: "⏳",
            description: "Fases clave en tu viaje dimensional"
        }
    },
    
    // ============================================
    // TÍTULOS DE LECTURAS - Tema Stranger Things
    // ============================================
    readingTitles: {
        sunSign: "Signo Solar - Tu Frecuencia Central",
        moonSign: "Signo Lunar - Tu Yo Sombra",
        risingSign: "Signo Ascendente - Tu Máscara Dimensional",
        mercurySign: "Mercurio - Tu Comunicación Psíquica",
        venusSign: "Venus - La Dimensión de Tu Corazón",
        marsSign: "Marte - Tu Energía de Lucha",
        jupiterSign: "Júpiter - Tu Portal de Expansión",
        saturnSign: "Saturno - Tus Lecciones Dimensionales",
        chineseZodiac: "Animal Espiritual - Tu Guía Criatura",
        moonPhase: "Fase Lunar de Nacimiento - Tu Energía de Manifestación",
        
        lifePath: "Camino de Vida - Tu Número de Sujeto",
        destiny: "Número del Destino - Tu Código de Misión",
        soulUrge: "Impulso del Alma - Tu Frecuencia Oculta",
        personality: "Número de Personalidad - Tu Patrón Superficial",
        birthday: "Número de Cumpleaños - Tu Fuente de Poder",
        maturity: "Número de Madurez - Tu Forma Final",
        
        personalYear: "Energía Dimensional Actual",
        pinnacle: "Pináculos de Vida - Portales Principales",
        challenge: "Desafíos Dimensionales - Áreas de Crecimiento",
        
        northNode: "Nodo Norte - Tu Misión en Esta Dimensión",
        southNode: "Nodo Sur - Dones de Otras Dimensiones",
        lifeLesson: "Lección Central del Sujeto",
        
        yearAhead: "Pronóstico del Próximo Ciclo",
        firstYear: "Primer Ciclo Dimensional"
    },
    
    // ============================================
    // COLORES Y ESTILO - Tema Stranger Things
    // ============================================
    colors: {
        primary: "#FF0000",
        secondary: "#FFD700",
        accent: "#00FF00",
        background: "#1a1a2e",
        backgroundDark: "#0a0a1a",
        text: "#e0e0e0",
        textLight: "#ffffff",
        cardBg: "#2d2d44",
        cardBorder: "#FF0000"
    },
    
    // ============================================
    // FUENTES
    // ============================================
    fonts: {
        heading: "'Playfair Display', Georgia, serif",
        body: "'Inter', 'Segoe UI', sans-serif",
        accent: "'Playfair Display', Georgia, serif"
    },
    
    // ============================================
    // TEMA
    // ============================================
    theme: "dark",
    
    // ============================================
    // FUNCIONALIDADES
    // ============================================
    features: {
        showBirthTime: true,
        showBirthPlace: true,
        showPDFDownload: true,
        showShareButtons: true,
        showTableOfContents: true,
        showProgressBar: true,
        requireBirthTime: false,
        requireBirthPlace: false
    },
    
    // ============================================
    // COMPARTIR EN REDES
    // ============================================
    sharing: {
        hashtags: ["PatronesExtraños", "MundoInvertido", "CódigoDimensional"],
        defaultMessage: "He descifrado mis patrones dimensionales en Patrones Extraños... 🔮",
        twitterHandle: "@quantummerlin"
    },
    
    // ============================================
    // FUNCIONES PREMIUM
    // ============================================
    premium: {
        enabled: false,
        price: "$11.11",
        features: [
            "Descarga en PDF",
            "Sin Anuncios",
            "Formato Imprimible",
            "Actualizaciones Anuales"
        ]
    },
    
    // ============================================
    // PIE DE PÁGINA
    // ============================================
    footer: {
        copyright: "© 2026 Patrones Extraños por Quantum Merlin",
        disclaimer: "Con fines de entretenimiento. No es una herramienta de vigilancia real del Laboratorio Nacional de Hawkins.",
        links: [
            { text: "Política de Privacidad", url: "privacy.html" },
            { text: "Términos de Servicio", url: "terms.html" },
            { text: "Contacto", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "Patrones Extraños - El Oráculo del Mundo Invertido",
        description: "Descubre tu perfil dimensional con más de 58 lecturas cósmicas. Astrología y numerología con el estilo del Mundo Invertido. Gratis e ilimitado.",
        keywords: "patrones extraños, mundo invertido, oráculo cósmico, lectura dimensional, carta natal"
    }
};

var BRAND_PRESETS = {
    stranger: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
