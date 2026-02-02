// ============================================
// A MOMENT IN TIME - BRAND CONFIGURATION
// ============================================
// Universal branding for all ages
// Copy this file to config.js to activate
// ============================================

var BRAND_CONFIG = {
    // ============================================
    // BRAND IDENTITY
    // ============================================
    brandName: "A Moment in Time",
    tagline: "Tu lectura cósmica completa • Sin registro • Siempre gratis",
    subTagline: "En el exacto momento en que naciste, el universo creó un patrón.",
    
    // Who is this reading for?
    subjectType: "person",
    subjectLabel: "Persona",
    subjectLabelPlural: "Personas",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Nombre",
        namePlaceholder: "Ingresa el nombre",
        nameHelper: "",
        
        birthDate: "Fecha de nacimiento",
        birthDateHelper: "",
        
        birthTime: "Hora de nacimiento",
        birthTimeHelper: "Para ascendente preciso (ver acta de nacimiento)",
        
        birthPlace: "Lugar de nacimiento",
        birthPlacePlaceholder: "Ciudad, país",
        birthPlaceHelper: "Hospital o ciudad de nacimiento"
    },
    
    ctaButton: "Generar tu lectura",
    loadingMessage: "Capturando tu momento...",
    
    // Result page copy
    resultTitle: "A Moment in Time",
    resultSubtitle: "Un retrato de",
    generatedBy: "Creado con amor por A Moment in Time",
    
    // ============================================
    // SECTION NAMES
    // ============================================
    sections: {
        celestial: {
            name: "Dones celestiales",
            icon: "",
            description: "Tus influencias planetarias y personalidad cósmica"
        },
        numbers: {
            name: "Números kármicos y códigos del alma",
            icon: "",
            description: "El mapa numerológico codificado en tu nacimiento"
        },
        soul: {
            name: "Misión del alma",
            icon: "",
            description: "Tu propósito profundo y dones espirituales"
        },
        forecasts: {
            name: "Ciclos actuales",
            icon: "",
            description: "Los ritmos energéticos que influyen en tu presente"
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
        personality: "Número de personalidad - Cómo te ven",
        birthday: "Número de cumpleaños - Dones especiales",
        maturity: "Número de madurez - En quién te convertirás",
        
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
        hashtags: ["SoulBlueprint", "BirthChart", "SoulReading", "GiftFromTheStars"],
        defaultMessage: "Acabo de recibir mi lectura de A Moment in Time.",
        twitterHandle: "@quantummerlin"
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
        copyright: "© 2026 A Moment in Time",
        disclaimer: "Con fines de entretenimiento y reflexión. Cada persona es única y crecerá a su manera.",
        links: [
            { text: "Privacy Policy", url: "/amomentintime/privacy.html" },
            { text: "Terms of Service", url: "/amomentintime/terms.html" },
            { text: "Contact", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "A Moment in Time - Tu lectura cósmica completa",
        description: "En el exacto momento en que naciste, el universo creó un patrón. Obtén más de 65 insights personalizados de astrología y numerología. Acceso gratuito e ilimitado.",
        keywords: "a moment in time, lectura de astrología, lectura de numerología, carta natal, camino de vida, lectura personalizada"
    }
};

// Keep BRAND_PRESETS for reference
var BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
