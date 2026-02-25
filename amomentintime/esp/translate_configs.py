"""
Complete Spanish Translation Script for amomentintime/esp
Translates all config files, HTML pages, manifest, sw.js, and utility JS files
"""
import os
import re

ESP_DIR = os.path.dirname(os.path.abspath(__file__))

# ============================================
# 1. CONFIG.JS - Main brand configuration
# ============================================
CONFIG_JS = r'''// ============================================
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
'''

# ============================================
# 2. CONFIG-BABY.JS
# ============================================
CONFIG_BABY_JS = r'''// ============================================
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
'''

# ============================================
# 3. CONFIG-KPOP.JS
# ============================================
CONFIG_KPOP_JS = r'''// ============================================
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
'''

# ============================================
# 4. CONFIG-STRANGER.JS
# ============================================
CONFIG_STRANGER_JS = r'''// ============================================
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
'''

# ============================================
# 5. MANIFEST.JSON
# ============================================
MANIFEST_JSON = '''{
  "name": "Un Momento en el Tiempo - Lectura Cósmica",
  "short_name": "Un Momento",
  "description": "Descubre tu plano cósmico con más de 65 lecturas personalizadas. Astrología de carta natal, numerología y guía espiritual.",
  "start_url": "/amomentintime/esp/",
  "lang": "es",
  "id": "un-momento-en-el-tiempo-lectura-cosmica",
  "display": "standalone",
  "background_color": "#0a1628",
  "theme_color": "#c9a6ff",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "Amomentintime.jpg?v=1",
      "sizes": "512x512",
      "type": "image/jpeg",
      "purpose": "any"
    },
    {
      "src": "Amomentintime.jpg?v=1",
      "sizes": "192x192",
      "type": "image/jpeg",
      "purpose": "any"
    },
    {
      "src": "Amomentintime.jpg?v=1",
      "sizes": "180x180",
      "type": "image/jpeg",
      "purpose": "any"
    }
  ],
  "screenshots": [],
  "categories": ["lifestyle", "entertainment"],
  "dir": "ltr",
  "prefer_related_applications": false
}
'''

# ============================================
# WRITE ALL FILES
# ============================================
def write_file(filename, content):
    path = os.path.join(ESP_DIR, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✅ {filename} translated")

if __name__ == '__main__':
    print("=" * 50)
    print("Translating config files and manifest...")
    print("=" * 50)
    
    write_file('config.js', CONFIG_JS)
    write_file('config-baby.js', CONFIG_BABY_JS)
    write_file('config-kpop.js', CONFIG_KPOP_JS)
    write_file('config-stranger.js', CONFIG_STRANGER_JS)
    write_file('manifest.json', MANIFEST_JSON)
    
    print("\n✅ All config files and manifest translated!")
