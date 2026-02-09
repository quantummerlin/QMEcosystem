// ============================================
// K-POP KOSMIC - CONFIGURACIÓN DE MARCA
// ============================================
// Marca temática K-Pop
// Copia este archivo a config.js para activar
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // IDENTIDAD DE MARCA
    // ============================================
    brandName: "K-pop Kósmico",
    tagline: "Tu Destino de Ídolo Revelado",
    subTagline: "58 Lecturas • Plano Completo de Ídolo • Tu Viaje K-pop Cósmico",
    
    // ¿Para quién es esta lectura?
    subjectType: "persona",
    subjectLabel: "Stan",
    subjectLabelPlural: "Stans",
    
    // ============================================
    // TEXTO E IDIOMA
    // ============================================
    inputLabels: {
        name: "Tu Nombre Artístico",
        namePlaceholder: "Ingresa tu nombre (o nombre artístico soñado)",
        nameHelper: "El nombre que resuena con tu energía de ídolo",
        
        birthDate: "Fecha de Nacimiento",
        birthDateHelper: "Tu cumpleaños (¡como tu bias!)",
        
        birthTime: "Hora de Nacimiento",
        birthTimeHelper: "Para un Ascendente preciso (¡pregunta a tus padres!)",
        
        birthPlace: "Lugar de Nacimiento",
        birthPlacePlaceholder: "Ciudad, País",
        birthPlaceHelper: "Donde comenzó tu viaje de ídolo"
    },
    
    ctaButton: "✨ Revela Mi Destino de Ídolo",
    loadingMessage: "Calculando tu plano de ídolo... 🎤",
    
    // Texto de la página de resultados
    resultTitle: "Plano Completo de Ídolo",
    resultSubtitle: "El Perfil Cósmico de",
    generatedBy: "Generado por K-pop Kósmico (11:11)",
    
    // ============================================
    // NOMBRES DE SECCIONES - Tema K-Pop
    // ============================================
    sections: {
        celestial: {
            name: "Posiciones Celestiales",
            icon: "🌟",
            description: "Tus influencias planetarias y energía de arquetipo de ídolo"
        },
        numbers: {
            name: "Números de Trainee",
            icon: "🔢",
            description: "El plano numerológico de tu viaje como ídolo"
        },
        soul: {
            name: "Misión de Debut",
            icon: "✨",
            description: "Tu propósito más profundo y dones únicos de ídolo"
        },
        forecasts: {
            name: "Temporadas de Comeback",
            icon: "🎤",
            description: "Lo que el cosmos tiene preparado para tu carrera"
        },
        cycles: {
            name: "Ciclos de Era",
            icon: "💫",
            description: "Fases clave en tu evolución como ídolo"
        }
    },
    
    // ============================================
    // TÍTULOS DE LECTURAS - Tema K-Pop
    // ============================================
    readingTitles: {
        sunSign: "Signo Solar - Tu Energía Central de Ídolo",
        moonSign: "Signo Lunar - Tu Concepto Emocional",
        risingSign: "Signo Ascendente - Tu Presencia en el Escenario",
        mercurySign: "Mercurio - Tu Estilo de Comunicación",
        venusSign: "Venus - Tu Concepto Visual y de Amor",
        marsSign: "Marte - Tu Energía de Actuación",
        jupiterSign: "Júpiter - Tu Crecimiento y Suerte",
        saturnSign: "Saturno - Tus Lecciones de Trainee",
        chineseZodiac: "Zodíaco Chino - Tu Energía Animal",
        moonPhase: "Fase Lunar de Nacimiento - Tu Energía de Debut",
        
        lifePath: "Camino de Vida - Tu Arquetipo de Ídolo",
        destiny: "Número del Destino - Tu Propósito de Debut",
        soulUrge: "Impulso del Alma - Tu Verdadero Concepto",
        personality: "Número de Personalidad - Tu Imagen Pública",
        birthday: "Número de Cumpleaños - Tus Talentos Especiales",
        maturity: "Número de Madurez - Tu Era Senior",
        
        personalYear: "Energía de Era Actual",
        pinnacle: "Pináculos de Carrera - Eras Principales",
        challenge: "Desafíos de Trainee - Áreas de Crecimiento",
        
        northNode: "Nodo Norte - Tu Dirección de Debut",
        southNode: "Nodo Sur - Tus Talentos Pasados",
        lifeLesson: "Lección de Vida Central",
        
        yearAhead: "Pronóstico de Tu Próxima Era",
        firstYear: "Tu Primera Era"
    },
    
    // ============================================
    // COLORES Y ESTILO - Tema K-Pop
    // ============================================
    colors: {
        primary: "#9B59B6",
        secondary: "#E91E63",
        accent: "#FF69B4",
        background: "#F3E5F5",
        backgroundDark: "#1a0a2e",
        text: "#333333",
        textLight: "#ffffff",
        cardBg: "#ffffff",
        cardBorder: "#E1BEE7"
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
        hashtags: ["KpopKósmico", "DestinoDeÍdolo", "ÍdoloCósmico", "1111"],
        defaultMessage: "¡Acabo de descubrir mi destino de ídolo con K-pop Kósmico! ✨🎤",
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
        copyright: "© 2026 K-pop Kósmico por Quantum Merlin",
        disclaimer: "Con fines de entretenimiento. Todos los nombres e imágenes de K-pop pertenecen a sus respectivos propietarios.",
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
        title: "K-pop Kósmico - Tu Destino de Ídolo Revelado",
        description: "Descubre tu destino de ídolo K-pop con más de 58 lecturas cósmicas personalizadas. Astrología, numerología y guía espiritual con temática K-pop. Gratis e ilimitado.",
        keywords: "k-pop kósmico, destino de ídolo, astrología k-pop, carta natal k-pop, lectura cósmica"
    }
};

var BRAND_PRESETS = {
    kpop: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
