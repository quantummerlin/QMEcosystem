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
    tagline: "The Upside Down Oracle",
    subTagline: "58 Readings • Complete Subject Profile • Your Hawkins Blueprint",
    
    // Who is this reading for?
    subjectType: "person",
    subjectLabel: "Subject",
    subjectLabelPlural: "Subjects",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Subject Name",
        namePlaceholder: "Enter your name",
        nameHelper: "Your identity in this dimension",
        
        birthDate: "Date of Manifestation",
        birthDateHelper: "When you entered this dimension",
        
        birthTime: "Time of Manifestation",
        birthTimeHelper: "For accurate dimensional alignment",
        
        birthPlace: "Location of Origin",
        birthPlacePlaceholder: "City, Country",
        birthPlaceHelper: "Where your story began"
    },
    
    ctaButton: "Open the Gate",
    loadingMessage: "Accessing the Upside Down...",
    
    // Result page copy
    resultTitle: "Subject Analysis Complete",
    resultSubtitle: "Dimensional Profile of",
    generatedBy: "Transmitted from Stranger Patterns",
    
    // ============================================
    // SECTION NAMES - Stranger Things Themed
    // ============================================
    sections: {
        celestial: {
            name: "Celestial Anomalies",
            icon: "",
            description: "Your planetary influences from beyond the gate"
        },
        numbers: {
            name: "Hidden Numbers",
            icon: "",
            description: "The numerological patterns in your dimensional code"
        },
        soul: {
            name: "Psychic Mission",
            icon: "",
            description: "Your deeper purpose and supernatural gifts"
        },
        forecasts: {
            name: "Dimensional Portals",
            icon: "",
            description: "What the Upside Down reveals about your future"
        },
        cycles: {
            name: "Temporal Shifts",
            icon: "",
            description: "Key phases in your dimensional journey"
        }
    },
    
    // ============================================
    // READING TITLES - Stranger Things Themed
    // ============================================
    readingTitles: {
        sunSign: "Sun Sign - Your Core Frequency",
        moonSign: "Moon Sign - Your Shadow Self",
        risingSign: "Rising Sign - Your Dimensional Mask",
        mercurySign: "Mercury - Your Psychic Communication",
        venusSign: "Venus - Your Heart's Dimension",
        marsSign: "Mars - Your Fighting Energy",
        jupiterSign: "Jupiter - Your Expansion Portal",
        saturnSign: "Saturn - Your Dimensional Lessons",
        chineseZodiac: "Spirit Animal - Your Creature Guide",
        moonPhase: "Birth Moon Phase - Your Manifestation Energy",
        
        lifePath: "Life Path - Your Subject Number",
        destiny: "Destiny Number - Your Mission Code",
        soulUrge: "Soul Urge - Your Hidden Frequency",
        personality: "Personality Number - Your Surface Pattern",
        birthday: "Birthday Number - Your Power Source",
        maturity: "Maturity Number - Your Final Form",
        
        personalYear: "Current Dimensional Cycle",
        pinnacle: "Life Pinnacles - Major Gate Openings",
        challenge: "Challenges - Demogorgon Lessons",
        
        northNode: "North Node - Your Destiny Gate",
        southNode: "South Node - Your Past Dimension",
        lifeLesson: "Core Dimensional Lesson",
        
        yearAhead: "This Season's Forecast",
        firstYear: "Origin Year Energy"
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
        defaultMessage: "I just discovered my dimensional profile! The Upside Down revealed...",
        twitterHandle: "@strangerpattern"
    },
    
    // ============================================
    // PREMIUM FEATURES
    // ============================================
    premium: {
        enabled: false,
        price: "$11.11",
        features: [
            "PDF Download",
            "No Ads",
            "Printable Format",
            "Character Match"
        ]
    },
    
    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2025 Stranger Patterns",
        disclaimer: "For entertainment purposes only. Not affiliated with Netflix or Stranger Things. Friends don't lie!",
        links: [
            { text: "Privacy Policy", url: "/privacy.html" },
            { text: "Terms of Service", url: "/terms.html" },
            { text: "Contact", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "Stranger Patterns - The Upside Down Oracle | Stranger Things Numerology",
        description: "Discover your dimensional profile with 58 personalized readings! Find your Stranger Things character match, psychic abilities, and Hawkins destiny. Free supernatural blueprint.",
        keywords: "stranger things personality, upside down oracle, hawkins numerology, stranger things astrology, eleven powers, demogorgon, stranger patterns"
    }
};

const BRAND_PRESETS = {
    stranger: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}