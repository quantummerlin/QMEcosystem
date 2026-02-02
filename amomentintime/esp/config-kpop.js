// ============================================
// K-POP KOSMIC - BRAND CONFIGURATION
// ============================================
// K-Pop themed branding
// Copy this file to config.js to activate
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // BRAND IDENTITY
    // ============================================
    brandName: "K-pop Kosmic",
    tagline: "Tu destino idol revelado",
    subTagline: "58 lecturas • Plano idol completo • Tu viaje cósmico K‑pop",
    
    // Who is this reading for?
    subjectType: "person",
    subjectLabel: "Fan",
    subjectLabelPlural: "Fans",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Tu nombre artístico",
        namePlaceholder: "Ingresa tu nombre (o tu nombre artístico soñado)",
        nameHelper: "El nombre que resuena con tu energía idol",
        
        birthDate: "Fecha de nacimiento",
        birthDateHelper: "Tu cumpleaños (¡como tu bias!)",
        
        birthTime: "Hora de nacimiento",
        birthTimeHelper: "Para ascendente preciso (¡consúltalo con tus padres!)",
        
        birthPlace: "Lugar de nacimiento",
        birthPlacePlaceholder: "Ciudad, país",
        birthPlaceHelper: "Donde comenzó tu viaje idol"
    },
    
    ctaButton: "✨ Revelar mi destino idol",
    loadingMessage: "Calculando tu plano idol... 🎤",
    
    // Result page copy
    resultTitle: "Plano idol completo",
    resultSubtitle: "El perfil cósmico de",
    generatedBy: "Generado por K‑pop Kosmic (11:11)",
    
    // ============================================
    // SECTION NAMES - K-Pop Themed
    // ============================================
    sections: {
        celestial: {
            name: "Posiciones celestes",
            icon: "🌟",
            description: "Tus influencias planetarias y energía de arquetipo idol"
        },
        numbers: {
            name: "Números de trainee",
            icon: "🔢",
            description: "El plano numerológico de tu viaje idol"
        },
        soul: {
            name: "Misión de debut",
            icon: "✨",
            description: "Tu propósito profundo y dones idol únicos"
        },
        forecasts: {
            name: "Temporadas de comeback",
            icon: "🎤",
            description: "Lo que el cosmos tiene preparado para tu carrera"
        },
        cycles: {
            name: "Ciclos de era",
            icon: "💫",
            description: "Fases clave en tu evolución idol"
        }
    },
    
    // ============================================
    // READING TITLES - K-Pop Themed
    // ============================================
    readingTitles: {
        sunSign: "Signo solar - Tu energía idol esencial",
        moonSign: "Signo lunar - Tu concepto emocional",
        risingSign: "Signo ascendente - Tu presencia escénica",
        mercurySign: "Mercurio - Tu estilo de comunicación",
        venusSign: "Venus - Tu concepto visual y amor",
        marsSign: "Marte - Tu energía de performance",
        jupiterSign: "Júpiter - Tu crecimiento y suerte",
        saturnSign: "Saturno - Tus lecciones de trainee",
        chineseZodiac: "Zodiaco chino - Tu energía animal",
        moonPhase: "Fase lunar al nacer - Tu energía de debut",
        
        lifePath: "Camino de vida - Tu arquetipo idol",
        destiny: "Número de destino - Tu propósito de debut",
        soulUrge: "Impulso del alma - Tu concepto auténtico",
        personality: "Número de personalidad - Tu imagen pública",
        birthday: "Número de cumpleaños - Tus talentos especiales",
        maturity: "Número de madurez - Tu era senior",
        
        personalYear: "Energía de la era actual",
        pinnacle: "Cúspides de carrera - Comebacks clave",
        challenge: "Desafíos de crecimiento - Lecciones de trainee",
        
        northNode: "Nodo norte - Tu dirección de debut",
        southNode: "Nodo sur - Tus dones pre‑debut",
        lifeLesson: "Lección idol central",
        
        yearAhead: "Pronóstico de esta era",
        firstYear: "Energía del año de debut"
    },
    
    // ============================================
    // COLORS & STYLING - Neon K-Pop Theme
    // ============================================
    colors: {
        primary: "#FF69B4",      // Hot pink
        secondary: "#9400D3",    // Purple
        accent: "#00FFFF",       // Cyan
        background: "#1a0a2e",   // Deep purple
        backgroundDark: "#0a0515",
        text: "#ffffff",
        textLight: "#ffffff",
        cardBg: "rgba(255,255,255,0.05)",
        cardBorder: "rgba(255,105,180,0.3)"
    },
    
    // ============================================
    // FONTS
    // ============================================
    fonts: {
        heading: "'Impact', 'Arial Black', sans-serif",
        body: "'Segoe UI', 'Helvetica Neue', sans-serif",
        accent: "'Impact', 'Arial Black', sans-serif"
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
        hashtags: ["KpopKosmic", "IdolDestiny", "KpopNumerology", "StanLife", "1111"],
        defaultMessage: "¡Acabo de descubrir mi destino idol! 🎤✨ Mi arquetipo es...",
        twitterHandle: "@kpopkosmic"
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
            "Compatibilidad con bias"
        ]
    },
    
    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2025 K-pop Kosmic (11:11)",
        disclaimer: "Solo con fines de entretenimiento. No estamos afiliados a ninguna agencia o artista de K‑pop. ¡Stanea responsablemente! 💜",
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
        title: "K‑pop Kosmic - Descubre tu destino idol | Numerología y astrología K‑pop",
        description: "Encuentra tu arquetipo idol con 58 lecturas personalizadas. Descubre tu presencia escénica, energía de debut y destino K‑pop. Plano idol gratuito para fans.",
        keywords: "numerología kpop, astrología kpop, arquetipo idol, test de personalidad kpop, destino fan, carta natal kpop, energía idol, kpop kosmic"
    }
};

const BRAND_PRESETS = {
    kpop: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}