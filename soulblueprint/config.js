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
    tagline: "Your Complete Soul Blueprint",
    subTagline: "Astrology \u2022 Numerology \u2022 Life Patterns \u2022 65+ Personalized Readings",
    
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
        nameHelper: "",
        
        birthDate: "Date of Birth",
        birthDateHelper: "",
        
        birthTime: "Time of Birth",
        birthTimeHelper: "For accurate Rising Sign (check birth certificate)",
        
        birthPlace: "Place of Birth",
        birthPlacePlaceholder: "City, Country",
        birthPlaceHelper: "Hospital location or city of birth"
    },
    
    ctaButton: "Generate Your Reading",
    loadingMessage: "Capturing your moment...",
    
    // Result page copy
    resultTitle: "A Moment in Time",
    resultSubtitle: "A Portrait of",
    generatedBy: "Crafted by Quantum Merlin",
    
    // ============================================
    // SECTION NAMES
    // ============================================
    sections: {
        celestial: {
            name: "Celestial Gifts",
            icon: "",
            description: "Your planetary influences and cosmic personality"
        },
        numbers: {
            name: "Karmic Numbers & Soul Codes",
            icon: "",
            description: "The numerological blueprint encoded in your birth"
        },
        soul: {
            name: "Soul Mission",
            icon: "",
            description: "Your deeper purpose and spiritual gifts"
        },
        forecasts: {
            name: "Current Cycles",
            icon: "",
            description: "The energetic rhythms influencing your present moment"
        }
    },
    
    // ============================================
    // READING TITLES
    // ============================================
    readingTitles: {
        sunSign: "Sun Sign - Core Personality",
        moonSign: "Moon Sign - Emotional Nature",
        risingSign: "Rising Sign - First Impressions",
        mercurySign: "Mercury - How You Communicate",
        venusSign: "Venus - How You Love",
        marsSign: "Mars - Your Energy & Drive",
        jupiterSign: "Jupiter - Your Luck & Growth",
        saturnSign: "Saturn - Your Life Lessons",
        chineseZodiac: "Chinese Zodiac Animal",
        moonPhase: "Birth Moon Phase",
        
        lifePath: "Life Path Number - Soul's Journey",
        destiny: "Destiny Number - Life Purpose",
        soulUrge: "Soul Urge - Heart's Desire",
        personality: "Personality Number - How Others See You",
        birthday: "Birthday Number - Your Special Gifts",
        maturity: "Maturity Number - Who You'll Become",
        
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
    // COLORS & STYLING
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
        defaultMessage: "I just got my reading from A Moment in Time.",
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
    // FOUNDER
    // ============================================
    founder: {
        name: "Quantum Merlin",
        location: "Melbourne, Victoria, Australia",
        bio: "Son of a tarot reader and crystal-loving self-proclaimed witch. I built A Moment in Time after paying $350 for my daughter's birth reading and realising this knowledge shouldn't be gatekept. What started as a personal project became a mission when I found profound, impossible patterns in the charts and numbers — connections that trace back to the Bible itself.",
        storyBeats: {
            heritage: "Grew up as the son of a tarot reader, rune caster, crystal collector, and self-proclaimed witch.",
            catalyst: "When my daughter was born, I paid $350 for her professional reading — and it changed everything.",
            realization: "This stuff is real. Billionaires use it. But it's gatekept behind expensive practitioners.",
            discovery: "As I built the tools and dug deeper, I found profound, impossible patterns in the charts and numbers — connections that trace all the way back to the Bible.",
            mission: "I had to make this accessible to everyone."
        }
    },

    // ============================================
    // FOOTER
    // ============================================
    footer: {
        copyright: "© 2026 A Moment in Time by Quantum Merlin",
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
        title: "A Moment in Time - Your Complete Cosmic Reading | by Quantum Merlin",
        description: "I built this after paying $350 for my daughter's birth reading and realising this knowledge shouldn't be gatekept. 65+ personalised insights combining astrology, numerology, and life pattern analysis.",
        keywords: "quantum merlin, a moment in time, astrology reading, numerology reading, birth chart, life path, personalized reading, soul blueprint"
    }
};

// Keep BRAND_PRESETS for reference
var BRAND_PRESETS = {
    baby: BRAND_CONFIG
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
