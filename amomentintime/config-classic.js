// ============================================
// QUANTUM MERLIN CLASSIC - BRAND CONFIGURATION
// ============================================
// Classic Quantum Merlin themed branding
// Copy this file to config.js to activate
// ============================================

var BRAND_CONFIG = {
 // ============================================
 // BRAND IDENTITY
 // ============================================
 brandName: "Quantum Merlin",
 tagline: "No Sign-Up • Always Free",
 subTagline: "65+ personalized readings combining numerology, astrology, and cosmic wisdom — all from your birth data.",
 
 // Who is this reading for?
 subjectType: "person",
 subjectLabel: "Soul",
 subjectLabelPlural: "Souls",
 
 // ============================================
 // COPY & LANGUAGE
 // ============================================
 inputLabels: {
 name: "Your Name",
 namePlaceholder: "Enter your name",
 nameHelper: "The name you resonate with most",
 
 birthDate: "Date of Birth",
 birthDateHelper: "Your cosmic entry point",
 
 birthTime: "Time of Birth",
 birthTimeHelper: "For accurate Rising Sign (check birth certificate)",
 
 birthPlace: "Place of Birth",
 birthPlacePlaceholder: "City, Country",
 birthPlaceHelper: "Where your journey began"
 },
 
 ctaButton: " Generate My Reading",
 loadingMessage: "Decoding your cosmic blueprint...",
 
 // Result page copy
 resultTitle: "Cosmic Reading",
 resultSubtitle: "The Cosmic Profile of",
 generatedBy: "Created with by Quantum Merlin",
 
 // ============================================
 // SECTION NAMES
 // ============================================
 sections: {
 celestial: {
 name: "Celestial DNA",
 icon: "",
 description: "Your planetary influences and cosmic personality"
 },
 numbers: {
 name: "Sacred Numbers",
 icon: "",
 description: "The numerological codes woven into your birth"
 },
 soul: {
 name: "Soul Mission",
 icon: "",
 description: "Your deeper purpose and spiritual gifts"
 },
 forecasts: {
 name: "Current Cosmic Cycles",
 icon: "",
 description: "The energetic rhythms influencing your present moment"
 },
 cycles: {
 name: "Life Cycles",
 icon: "",
 description: "Major phases and turning points in your journey"
 }
 },
 
 // ============================================
 // READING TITLES
 // ============================================
 readingTitles: {
 sunSign: "Sun Sign — Core Identity",
 moonSign: "Moon Sign — Emotional Blueprint",
 risingSign: "Rising Sign — Your Cosmic Mask",
 mercurySign: "Mercury — How You Think & Communicate",
 venusSign: "Venus — How You Love & Create",
 marsSign: "Mars — Your Drive & Passion",
 jupiterSign: "Jupiter — Your Luck & Expansion",
 saturnSign: "Saturn — Your Life Lessons",
 chineseZodiac: "Chinese Zodiac — Animal Spirit",
 moonPhase: "Birth Moon Phase — Emotional Rhythm",
 
 lifePath: "Life Path Number — Soul's Journey",
 destiny: "Destiny Number — Life Purpose",
 soulUrge: "Soul Urge — Heart's Deepest Desire",
 personality: "Personality Number — How Others See You",
 birthday: "Birthday Number — Special Gifts",
 maturity: "Maturity Number — Who You're Becoming",
 
 personalYear: "Personal Year — Current Energy",
 pinnacle: "Life Pinnacles — Major Phases",
 challenge: "Life Challenges — Growth Opportunities",
 
 northNode: "North Node — Soul's Direction",
 southNode: "South Node — Past Life Gifts",
 lifeLesson: "Core Life Lesson",
 
 yearAhead: "Year Ahead Forecast",
 firstYear: "Current Year Milestones"
 },
 
 // ============================================
 // COLORS & STYLING — Quantum Merlin Cosmic Purple
 // ============================================
 colors: {
 primary: "#bf5af2", // Quantum purple
 secondary: "#FFD700", // Gold
 accent: "#00d4ff", // Cyan
 background: "#0d0221", // Deep cosmic
 backgroundDark: "#070114",
 text: "#ffffff",
 textLight: "#ffffff",
 cardBg: "rgba(191,90,242,0.08)",
 cardBorder: "rgba(191,90,242,0.3)"
 },
 
 // ============================================
 // FONTS
 // ============================================
 fonts: {
 heading: "'Cinzel', 'Playfair Display', Georgia, serif",
 body: "'Cormorant Garamond', 'Inter', 'Segoe UI', sans-serif",
 accent: "'Cinzel', Georgia, serif"
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
 hashtags: ["QuantumMerlin", "AMomentInTime", "CosmicReading", "NumerologyReading"],
 defaultMessage: "I just discovered my cosmic reading on A Moment in Time! ",
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
 copyright: "© 2026 Quantum Merlin",
 disclaimer: "For entertainment and self-discovery purposes. Your cosmic journey is unique — let the stars guide, not define you. ",
 links: [
 { text: "Privacy Policy", url: "/privacy.html" },
 { text: "Terms of Service", url: "/terms.html" },
 { text: "Disclaimer", url: "/disclaimer.html" },
 { text: "All Tools", url: "/classic/tools_index.html" }
 ]
 },
 
 // ============================================
 // SEO
 // ============================================
 seo: {
 title: "Quantum Merlin — 65+ Free Cosmic Readings",
 description: "Get 65+ personalized readings combining numerology, astrology, and cosmic wisdom. Enter your birth data once and explore your complete cosmic profile. Free, no sign-up required.",
 keywords: "quantum merlin, numerology reading, astrology reading, birth chart, life path number, free reading, cosmic profile, complete reading"
 }
};

var BRAND_PRESETS = {
 classic: BRAND_CONFIG
};

if (typeof module!== 'undefined' && module.exports) {
 module.exports = { BRAND_CONFIG, BRAND_PRESETS };
}
