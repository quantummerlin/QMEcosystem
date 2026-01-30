// ============================================
// THE IMPRINT - BRAND CONFIGURATION
// ============================================
// Universal branding for all ages
// Copy this file to config.js to activate
// ============================================

const BRAND_CONFIG = {
    // ============================================
    // BRAND IDENTITY
    // ============================================
    brandName: "The Imprint",
    tagline: "Your Celestial Design Revealed",
    subTagline: "You were imprinted at birth. This reading reveals the pattern.",
    
    // Who is this reading for?
    subjectType: "person",
    subjectLabel: "Person",
    subjectLabelPlural: "People",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Name",
        namePlaceholder: "Enter name",
        nameHelper: "First name or nickname",
        
        birthDate: "Date of Birth",
        birthDateHelper: "Birthday",
        
        birthTime: "Time of Birth",
        birthTimeHelper: "For accurate Rising Sign (check birth certificate)",
        
        birthPlace: "Place of Birth",
        birthPlacePlaceholder: "City, Country",
        birthPlaceHelper: "Hospital location or city of birth"
    },
    
    ctaButton: "Create The Imprint",
    loadingMessage: "Revealing the pattern...",
    
    // Result page copy
    resultTitle: "The Imprint",
    resultSubtitle: "A Portrait of",
    generatedBy: "Created with love by The Imprint",
    
    // ============================================
    // SECTION NAMES
    // ============================================
    sections: {
        celestial: {
            name: "Celestial Gifts",
            icon: "",
            description: "Planetary influences and cosmic personality"
        },
        numbers: {
            name: "Sacred Numbers",
            icon: "",
            description: "The numerological blueprint of the life path"
        },
        soul: {
            name: "Soul Mission",
            icon: "",
            description: "Deeper purpose and spiritual gifts"
        },
        forecasts: {
            name: "Life Seasons",
            icon: "",
            description: "What the cosmos has in store"
        },
        cycles: {
            name: "Growth Cycles",
            icon: "",
            description: "Key developmental phases and timing"
        }
    },
    
    // ============================================
    // READING TITLES
    // ============================================
    readingTitles: {
        sunSign: "Sun Sign - Core Personality",
        moonSign: "Moon Sign - Emotional Nature",
        risingSign: "Rising Sign - First Impressions",
        mercurySign: "Mercury - How They'll Communicate",
        venusSign: "Venus - How They'll Love",
        marsSign: "Mars - Their Energy & Drive",
        jupiterSign: "Jupiter - Their Luck & Growth",
        saturnSign: "Saturn - Life Lessons Ahead",
        chineseZodiac: "Chinese Zodiac Animal",
        moonPhase: "Birth Moon Phase",
        
        lifePath: "Life Path Number - Soul's Journey",
        destiny: "Destiny Number - Life Purpose",
        soulUrge: "Soul Urge - Heart's Desire",
        personality: "Personality Number - How Others See Them",
        birthday: "Birthday Number - Special Gifts",
        maturity: "Maturity Number - Who They'll Become",
        
        personalYear: "Current Year Energy",
        pinnacle: "Life Pinnacles - Major Phases",
        challenge: "Life Challenges - Growth Areas",
        
        northNode: "North Node - Soul's Direction",
        southNode: "South Node - Past Life Gifts",
        lifeLesson: "Core Life Lesson",
        
        yearAhead: "First Year Forecast",
        firstYear: "First Year Milestones"
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
        defaultMessage: "I just discovered The Imprint.",
        twitterHandle: "@quantummerlin"
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
            "Yearly Updates"
        ]
    },
    
    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2026 The Imprint",
        disclaimer: "For entertainment and reflection purposes. Every person is unique and will grow in their own beautiful way.",
        links: [
            { text: "Privacy Policy", url: "/soulblueprint/privacy.html" },
            { text: "Terms of Service", url: "/soulblueprint/terms.html" },
            { text: "Contact", url: "/contact.html" }
        ]
    },
    
    // ============================================
    // SEO
    // ============================================
    seo: {
        title: "The Imprint - Your Celestial Design Revealed",
        description: "You were imprinted at birth. This reading reveals the pattern with 65+ personalized insights in astrology and numerology. Free and unlimited access.",
        keywords: "the imprint, celestial design, astrology reading, numerology reading, birth chart, life path, personalized reading"
    }
};

// Keep BRAND_PRESETS for reference
const BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}