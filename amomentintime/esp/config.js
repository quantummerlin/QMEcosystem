// ============================================
// UN MOMENTO EN EL TIEMPO - CONFIGURACIÓN DE MARCA
// ============================================
// Marca universal para todas las edades
// Copia este archivo a config.js para activar
// ============================================

var BRAND_CONFIG = {
    // ============================================
    // IDENTIDAD DE MARCA
    // ============================================
    brandName: "Un Momento en el Tiempo",
    tagline: "Tu Lectura Cósmica Completa • Sin Registro • Siempre Gratis",
    subTagline: "En el momento exacto en que naciste, el universo creó un patrón.",
    
    // ¿Para quién es esta lectura?
    subjectType: "persona",
    subjectLabel: "Persona",
    subjectLabelPlural: "Personas",
    
    // ============================================
    // TEXTO E IDIOMA
    // ============================================
    inputLabels: {
        name: "Nombre",
        namePlaceholder: "Ingresa el nombre",
        nameHelper: "",
        
        birthDate: "Fecha de Nacimiento",
        birthDateHelper: "",
        
        birthTime: "Hora de Nacimiento",
        birthTimeHelper: "Para un Ascendente preciso (consulta el certificado de nacimiento)",
        
        birthPlace: "Lugar de Nacimiento",
        birthPlacePlaceholder: "Ciudad, País",
        birthPlaceHelper: "Ubicación del hospital o ciudad de nacimiento"
    },
    
    ctaButton: "Genera Tu Lectura",
    loadingMessage: "Capturando tu momento...",
    
    // Texto de la página de resultados
    resultTitle: "Un Momento en el Tiempo",
    resultSubtitle: "Un Retrato de",
    generatedBy: "Creado con amor por Un Momento en el Tiempo",
    
    // ============================================
    // NOMBRES DE SECCIONES
    // ============================================
    sections: {
        celestial: {
            name: "Dones Celestiales",
            icon: "",
            description: "Tus influencias planetarias y personalidad cósmica"
        },
        numbers: {
            name: "Números Kármicos y Códigos del Alma",
            icon: "",
            description: "El plano numerológico codificado en tu nacimiento"
        },
        soul: {
            name: "Misión del Alma",
            icon: "",
            description: "Tu propósito más profundo y dones espirituales"
        },
        forecasts: {
            name: "Ciclos Actuales",
            icon: "",
            description: "Los ritmos energéticos que influyen en tu momento presente"
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
        personality: "Número de Personalidad - Cómo Te Ven",
        birthday: "Número de Cumpleaños - Dones Especiales",
        maturity: "Número de Madurez - En Quién Te Convertirás",
        
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
    // COLORES Y ESTILO
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
        hashtags: ["UnMomentoEnElTiempo", "CartaNatal", "LecturaDelAlma", "RegaloDeEstrellas"],
        defaultMessage: "Acabo de recibir mi lectura de Un Momento en el Tiempo.",
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
        copyright: "\u00a9 2026 Un Momento en el Tiempo",
        disclaimer: "Con fines de entretenimiento y reflexi\u00f3n. Cada persona es \u00fanica y crecer\u00e1 a su propia y hermosa manera.",
        links: [
            { text: "Pol\u00edtica de Privacidad", url: "privacy.html" },
            { text: "T\u00e9rminos de Servicio", url: "terms.html" },
            { text: "Contacto", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "Un Momento en el Tiempo - Tu Lectura C\u00f3smica Completa",
        description: "En el momento exacto en que naciste, el universo cre\u00f3 un patr\u00f3n. Obt\u00e9n m\u00e1s de 65 lecturas personalizadas de astrolog\u00eda y numerolog\u00eda. Acceso gratuito e ilimitado.",
        keywords: "un momento en el tiempo, lectura astrol\u00f3gica, lectura numerol\u00f3gica, carta natal, camino de vida, lectura personalizada"
    }
};

var BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
