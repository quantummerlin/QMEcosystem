// ============================================
// STRANGER PATTERNS - BRAND CONFIGURATION
// ============================================
// Stranger Things themed branding
// Copy this file to config.js to activate
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // BRAND IDENTITY
    // ============================================
    brandName: "Stranger Patterns",
    tagline: "El oráculo del Upside Down",
    subTagline: "58 lecturas • Perfil completo del sujeto • Tu plano de Hawkins",
    
    // Who is this reading for?
    subjectType: "person",
    subjectLabel: "Sujeto",
    subjectLabelPlural: "Sujetos",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Nombre del sujeto",
        namePlaceholder: "Ingresa tu nombre",
        nameHelper: "Tu identidad en esta dimensión",
        
        birthDate: "Fecha de manifestación",
        birthDateHelper: "Cuando entraste en esta dimensión",
        
        birthTime: "Hora de manifestación",
        birthTimeHelper: "Para una alineación dimensional precisa",
        
        birthPlace: "Lugar de origen",
        birthPlacePlaceholder: "Ciudad, país",
        birthPlaceHelper: "Donde comenzó tu historia"
    },
    
    ctaButton: "🔮 Abrir el portal",
    loadingMessage: "Accediendo al Upside Down...",
    
    // Result page copy
    resultTitle: "Análisis del sujeto completado",
    resultSubtitle: "Perfil dimensional de",
    generatedBy: "Transmitido por Stranger Patterns",
    
    // ============================================
    // SECTION NAMES - Stranger Things Themed
    // ============================================
    sections: {
        celestial: {
            name: "Anomalías celestiales",
            icon: "🔮",
            description: "Tus influencias planetarias desde más allá del portal"
        },
        numbers: {
            name: "Números ocultos",
            icon: "011",
            description: "Los patrones numerológicos en tu código dimensional"
        },
        soul: {
            name: "Misión psíquica",
            icon: "⚡",
            description: "Tu propósito profundo y dones sobrenaturales"
        },
        forecasts: {
            name: "Portales dimensionales",
            icon: "🌀",
            description: "Lo que el Upside Down revela sobre tu futuro"
        },
        cycles: {
            name: "Cambios temporales",
            icon: "⏳",
            description: "Fases clave de tu viaje dimensional"
        }
    },
    
    // ============================================
    // READING TITLES - Stranger Things Themed
    // ============================================
    readingTitles: {
        sunSign: "Signo solar - Tu frecuencia esencial",
        moonSign: "Signo lunar - Tu sombra",
        risingSign: "Signo ascendente - Tu máscara dimensional",
        mercurySign: "Mercurio - Tu comunicación psíquica",
        venusSign: "Venus - La dimensión de tu corazón",
        marsSign: "Marte - Tu energía de lucha",
        jupiterSign: "Júpiter - Tu portal de expansión",
        saturnSign: "Saturno - Tus lecciones dimensionales",
        chineseZodiac: "Animal espiritual - Tu guía de criaturas",
        moonPhase: "Fase lunar al nacer - Tu energía de manifestación",
        
        lifePath: "Camino de vida - Tu número de sujeto",
        destiny: "Número de destino - Tu código de misión",
        soulUrge: "Impulso del alma - Tu frecuencia oculta",
        personality: "Número de personalidad - Tu patrón superficial",
        birthday: "Número de cumpleaños - Tu fuente de poder",
        maturity: "Número de madurez - Tu forma final",
        
        personalYear: "Ciclo dimensional actual",
        pinnacle: "Cúspides de vida - Aperturas de portales",
        challenge: "Desafíos - Lecciones del Demogorgon",
        
        northNode: "Nodo norte - Tu portal del destino",
        southNode: "Nodo sur - Tu dimensión pasada",
        lifeLesson: "Lección dimensional central",
        
        yearAhead: "Pronóstico de esta temporada",
        firstYear: "Energía del año de origen"
    },
    
    // ============================================
    // COLORS & STYLING - Stranger Things Theme
    // ============================================
    colors: {
        primary: "#8B0000",      // Dark red
        secondary: "#FFD700",    // Gold/yellow
        accent: "#FF4500",       // Orange red
        background: "#0a0515",   // Near black
        backgroundDark: "#050208",
        text: "#ffffff",
        textLight: "#ffffff",
        cardBg: "rgba(139,0,0,0.1)",
        cardBorder: "rgba(139,0,0,0.3)"
    },
    
    // ============================================
    // FONTS
    // ============================================
    fonts: {
        heading: "'ITC Benguiat', 'Times New Roman', serif",
        body: "'Courier New', 'Consolas', monospace",
        accent: "'ITC Benguiat', 'Times New Roman', serif"
    },
    
    // ============================================
    // THEME
    // ============================================
    theme: "dark",
    
    // ============================================
    // FEATURES
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
    // SOCIAL SHARING
    // ============================================
    sharing: {
        hashtags: ["StrangerPatterns", "UpsideDown", "StrangerThings", "Hawkins"],
        defaultMessage: "¡Acabo de descubrir mi perfil dimensional! 🔮 El Upside Down reveló...",
        twitterHandle: "@strangerpattern"
    },
    
    // ============================================
    // PREMIUM FEATURES
    // ============================================
    premium: {
        enabled: false,
        price: "$11.11",
        features: [
            "Descarga en PDF",
            "Sin anuncios",
            "Formato imprimible",
            "Compatibilidad con personaje"
        ]
    },
    
    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2025 Stranger Patterns",
        disclaimer: "Solo con fines de entretenimiento. No estamos afiliados a Netflix ni a Stranger Things. ¡Los amigos no mienten! 🧇",
        links: [
            { text: "Política de privacidad", url: "/privacy.html" },
            { text: "Términos de servicio", url: "/terms.html" },
            { text: "Contacto", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "Stranger Patterns - El oráculo del Upside Down | Numerología Stranger Things",
        description: "Descubre tu perfil dimensional con 58 lecturas personalizadas. Encuentra tu personaje de Stranger Things, habilidades psíquicas y destino en Hawkins. Plano sobrenatural gratuito.",
        keywords: "personalidad stranger things, oráculo upside down, numerología hawkins, astrología stranger things, poderes de Eleven, demogorgon, stranger patterns"
    }
};

const BRAND_PRESETS = {
    stranger: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}