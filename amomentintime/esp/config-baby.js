// ============================================
// COSMIC BABY BLUEPRINT - BRAND CONFIGURATION
// ============================================
// Baby/Newborn specific branding
// Copy this file to config.js to activate
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // BRAND IDENTITY
    // ============================================
    brandName: "Cosmic Baby Blueprint",
    tagline: "El perfil cósmico completo de tu bebé",
    subTagline: "58 lecturas • Un hermoso informe • Guía para toda la vida",
    
    // Who is this reading for?
    subjectType: "baby",
    subjectLabel: "Bebé",
    subjectLabelPlural: "Bebés",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Nombre del bebé",
        namePlaceholder: "Ingresa el nombre de tu bebé",
        nameHelper: "El nombre con el que se le llamará (o nombre de nacimiento)",
        
        birthDate: "Fecha de nacimiento",
        birthDateHelper: "El cumpleaños de tu bebé",
        
        birthTime: "Hora de nacimiento",
        birthTimeHelper: "Para ascendente preciso (ver acta de nacimiento)",
        
        birthPlace: "Lugar de nacimiento",
        birthPlacePlaceholder: "Ciudad, país",
        birthPlaceHelper: "Hospital o ciudad de nacimiento"
    },
    
    ctaButton: "✨ Generar el plano cósmico de mi bebé",
    loadingMessage: "Calculando el plano cósmico de tu bebé...",
    
    // Result page copy
    resultTitle: "Plano cósmico completo",
    resultSubtitle: "Guía para toda la vida de",
    generatedBy: "Generado con amor por Cosmic Baby Blueprint",
    
    // ============================================
    // SECTION NAMES
    // ============================================
    sections: {
        celestial: {
            name: "Dones celestiales",
            icon: "🌟",
            description: "Influencias planetarias y personalidad cósmica de tu bebé"
        },
        numbers: {
            name: "Números sagrados",
            icon: "🔢",
            description: "El plano numerológico del camino de vida de tu bebé"
        },
        soul: {
            name: "Misión del alma",
            icon: "✨",
            description: "Propósito profundo y dones espirituales de tu bebé"
        },
        forecasts: {
            name: "Estaciones de vida",
            icon: "🌈",
            description: "Lo que el cosmos tiene preparado para tu pequeño"
        },
        cycles: {
            name: "Ciclos de crecimiento",
            icon: "🌱",
            description: "Fases clave de desarrollo y su timing"
        }
    },
    
    // ============================================
    // READING TITLES
    // ============================================
    readingTitles: {
        sunSign: "Signo solar - Personalidad esencial",
        moonSign: "Signo lunar - Naturaleza emocional",
        risingSign: "Signo ascendente - Primeras impresiones",
        mercurySign: "Mercurio - Cómo se comunica",
        venusSign: "Venus - Cómo ama",
        marsSign: "Marte - Energía y empuje",
        jupiterSign: "Júpiter - Suerte y expansión",
        saturnSign: "Saturno - Lecciones de vida",
        chineseZodiac: "Animal del zodiaco chino",
        moonPhase: "Fase lunar al nacer",
        
        lifePath: "Número de camino de vida - Viaje del alma",
        destiny: "Número de destino - Propósito de vida",
        soulUrge: "Impulso del alma - Deseo del corazón",
        personality: "Número de personalidad - Cómo los ven",
        birthday: "Número de cumpleaños - Dones especiales",
        maturity: "Número de madurez - En quién se convertirá",
        
        personalYear: "Energía del año actual",
        pinnacle: "Cúspides de vida - Etapas clave",
        challenge: "Desafíos de vida - Áreas de crecimiento",
        
        northNode: "Nodo norte - Dirección del alma",
        southNode: "Nodo sur - Dones de vidas pasadas",
        lifeLesson: "Lección central de vida",
        
        yearAhead: "Pronóstico del primer año",
        firstYear: "Hitos del primer año"
    },
    
    // ============================================
    // COLORS & STYLING - Soft Baby Theme
    // ============================================
    colors: {
        primary: "#FF69B4",      // Hot pink
        secondary: "#FFD700",    // Gold
        accent: "#87CEEB",       // Sky blue
        background: "#FFF5F8",   // Soft pink
        backgroundDark: "#1a0a2e",
        text: "#333333",
        textLight: "#ffffff",
        cardBg: "#ffffff",
        cardBorder: "#FFE4EC"
    },
    
    // ============================================
    // FONTS
    // ============================================
    fonts: {
        heading: "'Playfair Display', Georgia, serif",
        body: "'Inter', 'Segoe UI', sans-serif",
        accent: "'Playfair Display', Georgia, serif"
    },
    
    // ============================================
    // THEME
    // ============================================
    theme: "light",
    
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
        hashtags: ["CosmicBaby", "BabyReading", "NewbornAstrology", "BabyNumerology"],
        defaultMessage: "¡Acabo de descubrir el plano cósmico completo de mi bebé! 🌟👶",
        twitterHandle: "@cosmicbaby"
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
            "Actualizaciones anuales"
        ]
    },
    
    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2025 Cosmic Baby Blueprint",
        disclaimer: "Con fines de entretenimiento y reflexión. Cada niño es único y se desarrollará a su manera.",
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
        title: "Cosmic Baby Blueprint - Lectura completa de astrología y numerología para recién nacidos",
        description: "Descubre el perfil cósmico completo de tu bebé con 58 lecturas personalizadas que incluyen astrología, numerología y análisis de camino de vida. Carta natal gratuita y completa para recién nacidos.",
        keywords: "astrología para bebés, numerología para recién nacidos, carta natal de bebé, horóscopo de bebé, lectura de recién nacido, camino de vida de bebé, cosmic baby, zodiaco de bebé, personalidad de recién nacido"
    }
};

// Keep BRAND_PRESETS for reference
const BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}