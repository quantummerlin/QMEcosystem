// ============================================
// PLANO CÓSMICO DEL BEBÉ - CONFIGURACIÓN DE MARCA
// ============================================
// Marca específica para bebés/recién nacidos
// Copia este archivo a config.js para activar
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // IDENTIDAD DE MARCA
    // ============================================
    brandName: "Plano Cósmico del Bebé",
    tagline: "El Perfil Cósmico Completo de Tu Hijo",
    subTagline: "58 Lecturas • Un Hermoso Informe • Guía para Toda la Vida",
    
    // ¿Para quién es esta lectura?
    subjectType: "bebé",
    subjectLabel: "Bebé",
    subjectLabelPlural: "Bebés",
    
    // ============================================
    // TEXTO E IDIOMA
    // ============================================
    inputLabels: {
        name: "Nombre del Bebé",
        namePlaceholder: "Ingresa el nombre de tu bebé",
        nameHelper: "El nombre con el que llamarán a tu hijo (o nombre de nacimiento)",
        
        birthDate: "Fecha de Nacimiento",
        birthDateHelper: "El cumpleaños de tu bebé",
        
        birthTime: "Hora de Nacimiento",
        birthTimeHelper: "Para un Ascendente preciso (consulta el certificado de nacimiento)",
        
        birthPlace: "Lugar de Nacimiento",
        birthPlacePlaceholder: "Ciudad, País",
        birthPlaceHelper: "Ubicación del hospital o ciudad de nacimiento"
    },
    
    ctaButton: "✨ Genera el Plano Cósmico de Mi Bebé",
    loadingMessage: "Calculando el plano cósmico de tu bebé...",
    
    // Texto de la página de resultados
    resultTitle: "Plano Cósmico Completo",
    resultSubtitle: "Una Guía de Vida para",
    generatedBy: "Generado con amor por Plano Cósmico del Bebé",
    
    // ============================================
    // NOMBRES DE SECCIONES
    // ============================================
    sections: {
        celestial: {
            name: "Dones Celestiales",
            icon: "🌟",
            description: "Las influencias planetarias y personalidad cósmica de tu bebé"
        },
        numbers: {
            name: "Números Sagrados",
            icon: "🔢",
            description: "El plano numerológico del camino de vida de tu hijo"
        },
        soul: {
            name: "Misión del Alma",
            icon: "✨",
            description: "El propósito más profundo y dones espirituales de tu bebé"
        },
        forecasts: {
            name: "Estaciones de Vida",
            icon: "🌈",
            description: "Lo que el cosmos tiene preparado para tu pequeño"
        },
        cycles: {
            name: "Ciclos de Crecimiento",
            icon: "🌱",
            description: "Fases clave de desarrollo y su momento"
        }
    },
    
    // ============================================
    // TÍTULOS DE LECTURAS
    // ============================================
    readingTitles: {
        sunSign: "Signo Solar - Personalidad Central",
        moonSign: "Signo Lunar - Naturaleza Emocional",
        risingSign: "Signo Ascendente - Primeras Impresiones",
        mercurySign: "Mercurio - Cómo Se Comunicará",
        venusSign: "Venus - Cómo Amará",
        marsSign: "Marte - Su Energía e Impulso",
        jupiterSign: "Júpiter - Su Suerte y Crecimiento",
        saturnSign: "Saturno - Lecciones de Vida",
        chineseZodiac: "Animal del Zodíaco Chino",
        moonPhase: "Fase Lunar de Nacimiento",
        
        lifePath: "Número de Camino de Vida - Viaje del Alma",
        destiny: "Número del Destino - Propósito de Vida",
        soulUrge: "Impulso del Alma - Deseo del Corazón",
        personality: "Número de Personalidad - Cómo Lo Verán",
        birthday: "Número de Cumpleaños - Dones Especiales",
        maturity: "Número de Madurez - En Quién Se Convertirá",
        
        personalYear: "Energía del Año Actual",
        pinnacle: "Pináculos de Vida - Fases Principales",
        challenge: "Desafíos de Vida - Áreas de Crecimiento",
        
        northNode: "Nodo Norte - Dirección del Alma",
        southNode: "Nodo Sur - Dones de Vidas Pasadas",
        lifeLesson: "Lección Central de Vida",
        
        yearAhead: "Pronóstico del Primer Año",
        firstYear: "Hitos del Primer Año"
    },
    
    // ============================================
    // COLORES Y ESTILO - Tema Suave para Bebé
    // ============================================
    colors: {
        primary: "#FF69B4",
        secondary: "#FFD700",
        accent: "#87CEEB",
        background: "#FFF5F8",
        backgroundDark: "#1a0a2e",
        text: "#333333",
        textLight: "#ffffff",
        cardBg: "#ffffff",
        cardBorder: "#FFE4EC"
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
    theme: "light",
    
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
        hashtags: ["PlanoCósmicoBebé", "CartaNatal", "BebéCósmico", "RegaloDeEstrellas"],
        defaultMessage: "¡Acabo de obtener el plano cósmico de mi bebé en Un Momento en el Tiempo!",
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
        copyright: "© 2026 Un Momento en el Tiempo",
        disclaimer: "Con fines de entretenimiento y reflexión. Cada bebé es único y crecerá a su propia y hermosa manera.",
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
        title: "Plano Cósmico del Bebé - Lectura Cósmica Completa para Tu Hijo",
        description: "Descubre el plano cósmico de tu bebé con más de 58 lecturas personalizadas. Astrología de carta natal, numerología y guía espiritual para tu pequeño. Gratis e ilimitado.",
        keywords: "plano cósmico bebé, lectura astrológica bebé, carta natal bebé, numerología bebé, guía espiritual bebé"
    }
};

var BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
