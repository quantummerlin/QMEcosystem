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
    tagline: "Your Child's Complete Cosmic Profile",
    subTagline: "58 Readings • One Beautiful Report • Lifetime Guidance",
    
    // Who is this reading for?
    subjectType: "baby",
    subjectLabel: "Baby",
    subjectLabelPlural: "Babies",
    
    // ============================================
    // COPY & LANGUAGE
    // ============================================
    inputLabels: {
        name: "Baby's Name",
        namePlaceholder: "Enter your baby's name",
        nameHelper: "The name your child will be called (or birth name)",
        
        birthDate: "Date of Birth",
        birthDateHelper: "Your baby's birthday",
        
        birthTime: "Time of Birth",
        birthTimeHelper: "For accurate Rising Sign (check birth certificate)",
        
        birthPlace: "Place of Birth",
        birthPlacePlaceholder: "City, Country",
        birthPlaceHelper: "Hospital location or city of birth"
    },
    
    ctaButton: "✨ Generate My Baby's Cosmic Blueprint",
    loadingMessage: "Calculating your baby's cosmic blueprint...",
    
    // Result page copy
    resultTitle: "Complete Cosmic Blueprint",
    resultSubtitle: "A Lifetime Guide for",
    generatedBy: "Generated with love by Cosmic Baby Blueprint",
    
    // ============================================
    // SECTION NAMES
    // ============================================
    sections: {
        celestial: {
            name: "Celestial Gifts",
            icon: "🌟",
            description: "Your baby's planetary influences and cosmic personality"
        },
        numbers: {
            name: "Sacred Numbers",
            icon: "🔢",
            description: "The numerological blueprint of your child's life path"
        },
        soul: {
            name: "Soul Mission",
            icon: "✨",
            description: "Your baby's deeper purpose and spiritual gifts"
        },
        forecasts: {
            name: "Life Seasons",
            icon: "🌈",
            description: "What the cosmos has in store for your little one"
        },
        cycles: {
            name: "Growth Cycles",
            icon: "🌱",
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
        hashtags: ["CosmicBaby", "BabyReading", "NewbornAstrology", "BabyNumerology"],
        defaultMessage: "I just discovered my baby's complete cosmic blueprint! 🌟👶",
        twitterHandle: "@cosmicbaby"
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
        copyright: "© 2025 Cosmic Baby Blueprint",
        disclaimer: "For entertainment and reflection purposes. Every child is unique and will develop in their own beautiful way.",
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
        title: "Cosmic Baby Blueprint - Complete Newborn Astrology & Numerology Reading",
        description: "Discover your baby's complete cosmic blueprint with 65+ personalized readings covering astrology, numerology, and soul insights. Free and unlimited access.",
        keywords: "baby astrology, newborn numerology, baby birth chart, baby horoscope, newborn reading, baby life path, cosmic baby, baby zodiac, newborn personality"
    }
};

// Keep BRAND_PRESETS for reference
const BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}