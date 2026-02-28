// ============================================
// AGE-ADAPTIVE LANGUAGE SYSTEM
// ============================================
// Detects age from birth date and adapts
// reading language to the person's life stage.
// Works alongside tone-variations.js.
// ============================================

// ============================================
// AGE CATEGORIES & DETECTION
// ============================================

var AGE_CATEGORIES = {
    baby:       { min: 0,  max: 2,   label: 'Baby',        icon: '', audience: 'parent', tag: 'For Parents of a Little One' },
    child:      { min: 3,  max: 12,  label: 'Child',       icon: '', audience: 'parent', tag: 'For Parents & Caregivers' },
    teen:       { min: 13, max: 17,  label: 'Teenager',    icon: '', audience: 'blend',  tag: 'For a Growing Soul' },
    youngAdult: { min: 18, max: 25,  label: 'Young Adult', icon: '', audience: 'self',   tag: 'For an Emerging Soul' },
    adult:      { min: 26, max: 59,  label: 'Adult',       icon: '', audience: 'self',   tag: null },
    elder:      { min: 60, max: 150, label: 'Elder',       icon: '', audience: 'self',   tag: 'For a Wise Soul' }
};

/**
 * Calculate age and determine category from birth date
 * @param {string} birthDate - Birth date string (parseable by Date)
 * @returns {{ age: number, category: string, config: object }}
 */
function detectAgeCategory(birthDate) {
    if (!birthDate) return { age: 0, category: 'adult', config: AGE_CATEGORIES.adult };

    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (age < 0) age = 0;

    for (const [key, cat] of Object.entries(AGE_CATEGORIES)) {
        if (age >= cat.min && age <= cat.max) {
            return { age, category: key, config: cat };
        }
    }
    return { age, category: 'adult', config: AGE_CATEGORIES.adult };
}

// Store current age state globally
window.currentAgeProfile = null;

/**
 * Initialize age system — call this when a reading is generated
 * @param {string} birthDate
 */
function initAgeLanguage(birthDate) {
    window.currentAgeProfile = detectAgeCategory(birthDate);
    console.log(`[Age Language] Detected: ${window.currentAgeProfile.config.label} (age ${window.currentAgeProfile.age}), audience: ${window.currentAgeProfile.config.audience}`);
    return window.currentAgeProfile;
}

function getAgeProfile() {
    return window.currentAgeProfile || { age: 30, category: 'adult', config: AGE_CATEGORIES.adult };
}

// ============================================
// WORD & PHRASE SUBSTITUTIONS BY AGE
// ============================================
// Applied at render time, just like tone-variations.js
// Priority: longer phrases first, then single words

var AGE_PHRASE_SUBSTITUTIONS = {
    // --- Subject references ---
    "This soul has arrived": {
        baby:       "This little soul has arrived",
        child:      "This young soul has arrived",
        teen:       "This emerging soul has arrived",
        youngAdult: "You arrived in this world",
        adult:      "You arrived in this world",
        elder:      "You arrived in this world"
    },
    "this soul is here to": {
        baby:       "your little one is here to",
        child:      "your child is here to",
        teen:       "this young soul is here to",
        youngAdult: "you are here to",
        adult:      "you are here to",
        elder:      "you are here to"
    },
    "This individual possesses": {
        baby:       "Your baby possesses",
        child:      "Your child possesses",
        teen:       "This young person possesses",
        youngAdult: "You possess",
        adult:      "You possess",
        elder:      "You possess"
    },
    "this individual": {
        baby:       "your little one",
        child:      "your child",
        teen:       "this young person",
        youngAdult: "you",
        adult:      "you",
        elder:      "you"
    },
    "This individual": {
        baby:       "Your little one",
        child:      "Your child",
        teen:       "This young person",
        youngAdult: "You",
        adult:      "You",
        elder:      "You"
    },

    // --- Life framing ---
    "destined to": {
        baby:       "destined to one day",
        child:      "growing to",
        teen:       "beginning to",
        youngAdult: "destined to",
        adult:      "destined to",
        elder:      "have always been destined to"
    },
    "Throughout life": {
        baby:       "As they grow",
        child:      "As they grow up",
        teen:       "As they mature",
        youngAdult: "Throughout your life",
        adult:      "Throughout your life",
        elder:      "Throughout your life"
    },
    "throughout life": {
        baby:       "as they grow",
        child:      "as they grow up",
        teen:       "as they mature",
        youngAdult: "throughout your life",
        adult:      "throughout your life",
        elder:      "throughout your life"
    },
    "Early in life": {
        baby:       "In these early years",
        child:      "In these formative years",
        teen:       "In these pivotal years",
        youngAdult: "In your early years",
        adult:      "Earlier in life",
        elder:      "Looking back on your early years"
    },
    "In relationships, career, and personal development": {
        baby:       "As they develop bonds, discover interests, and grow",
        child:      "In friendships, learning, and personal development",
        teen:       "In friendships, first loves, and self-discovery",
        youngAdult: "In your relationships, career, and personal growth",
        adult:      "In your relationships, career, and personal development",
        elder:      "Across your relationships, career, and personal evolution"
    },
    "In relationships": {
        baby:       "In their earliest bonds",
        child:      "In their friendships",
        teen:       "In their relationships",
        youngAdult: "In your relationships",
        adult:      "In your relationships",
        elder:      "In your relationships"
    },

    // --- Advice/Growth framing ---
    "The greatest growth comes when": {
        baby:       "The greatest growth will come as",
        child:      "The greatest growth will come as",
        teen:       "The greatest growth is happening now as",
        youngAdult: "Your greatest growth comes when",
        adult:      "Your greatest growth comes when",
        elder:      "Your deepest wisdom emerged when"
    },
    "Challenges may arise around": {
        baby:       "Watch for early signs of",
        child:      "Growing pains may show up as",
        teen:       "Current challenges may include",
        youngAdult: "You may notice challenges around",
        adult:      "You may recognize challenges around",
        elder:      "You may have noticed patterns around"
    },
    "Their greatest fulfillment": {
        baby:       "Their greatest joy",
        child:      "Their greatest fulfillment",
        teen:       "Their greatest fulfillment",
        youngAdult: "Your greatest fulfillment",
        adult:      "Your greatest fulfillment",
        elder:      "Your deepest fulfillment"
    },
    "they will thrive when": {
        baby:       "they will thrive when",
        child:      "they thrive when",
        teen:       "they thrive when",
        youngAdult: "you thrive when",
        adult:      "you thrive when",
        elder:      "you have always thrived when"
    }
};

var AGE_WORD_SUBSTITUTIONS = {
    // Third-person → second-person for adults, keep third for children
    "This soul": {
        baby:       "Your little one",
        child:      "Your child",
        teen:       "This young soul",
        youngAdult: "You",
        adult:      "You",
        elder:      "You"
    },
    "this soul": {
        baby:       "your little one",
        child:      "your child",
        teen:       "this young soul",
        youngAdult: "you",
        adult:      "you",
        elder:      "you"
    },
    "They are": {
        baby:       "They are",
        child:      "They are",
        teen:       "They are",
        youngAdult: "You are",
        adult:      "You are",
        elder:      "You are"
    },
    "they are": {
        baby:       "they are",
        child:      "they are",
        teen:       "they are",
        youngAdult: "you are",
        adult:      "you are",
        elder:      "you are"
    },
    "They have": {
        baby:       "They have",
        child:      "They have",
        teen:       "They have",
        youngAdult: "You have",
        adult:      "You have",
        elder:      "You have"
    },
    "they have": {
        baby:       "they have",
        child:      "they have",
        teen:       "they have",
        youngAdult: "you have",
        adult:      "you have",
        elder:      "you have"
    },
    "They will": {
        baby:       "They will",
        child:      "They will",
        teen:       "They will",
        youngAdult: "You will",
        adult:      "You will",
        elder:      "You will"
    },
    "they will": {
        baby:       "they will",
        child:      "they will",
        teen:       "they will",
        youngAdult: "you will",
        adult:      "you will",
        elder:      "you will"
    },
    "Their": {
        baby:       "Their",
        child:      "Their",
        teen:       "Their",
        youngAdult: "Your",
        adult:      "Your",
        elder:      "Your"
    },
    "their": {
        baby:       "their",
        child:      "their",
        teen:       "their",
        youngAdult: "your",
        adult:      "your",
        elder:      "your"
    },
    "them": {
        baby:       "them",
        child:      "them",
        teen:       "them",
        youngAdult: "you",
        adult:      "you",
        elder:      "you"
    },
    "themselves": {
        baby:       "themselves",
        child:      "themselves",
        teen:       "themselves",
        youngAdult: "yourself",
        adult:      "yourself",
        elder:      "yourself"
    }
};


// ============================================
// SECTION HEADER LABEL OVERRIDES
// ============================================
// Optional section-heading reframes per age

var AGE_SECTION_HEADERS = {
    // key = config section key from config.js
    "Parenting Guidance": {
        baby:       "Nurturing Your Little One",
        child:      "Guiding Your Child",
        teen:       "Supporting Your Teenager",
        youngAdult: null, // hide this section
        adult:      null,
        elder:      null
    },
    "For Parents": {
        baby:       "For Parents",
        child:      "For Parents & Caregivers",
        teen:       "For Parents & Mentors",
        youngAdult: null,
        adult:      null,
        elder:      null
    }
};


// ============================================
// SECTION INTRO EPIGRAPHS (Option B content)
// ============================================
// Age-specific opening text shown at the start of major sections

var AGE_SECTION_INTROS = {
    celestial: {
        baby:       "The stars that shone on the night your baby was born hold a beautiful story — one of potential, tenderness, and wonder. Here is what the cosmos whispered at their arrival.",
        child:      "At the moment your child entered the world, the planets painted a unique portrait in the sky. These celestial gifts are theirs alone — let's explore what they mean.",
        teen:       "The universe was in a particular configuration when you were born — and it has everything to do with who you're becoming. This is your cosmic DNA.",
        youngAdult: "The sky at your birth was a once-in-eternity arrangement. These planetary positions shaped your instincts, your passions, and your path. Time to meet your cosmic self.",
        adult:      "The celestial pattern at your birth has never existed before and will never exist again. These are the planetary forces that shaped who you are.",
        elder:      "The stars that witnessed your arrival have been your silent companions through every chapter of life. Now, their gifts can be seen in full — woven through every experience you've lived."
    },
    numbers: {
        baby:       "Hidden within your baby's birth date are sacred numbers — codes that hold clues to who they're becoming. Here is the numerological pattern woven into their arrival.",
        child:      "Your child's birth date contains powerful numbers — each one a key to understanding their unique gifts, challenges, and destiny. Let's decode them together.",
        teen:       "Your birth date isn't random — it contains a mathematical blueprint for your life. These numbers reveal patterns about your purpose that you're just beginning to discover.",
        youngAdult: "The numbers encoded in your birth date are like a cosmic password — unlocking insights about your life purpose, hidden talents, and soul's direction.",
        adult:      "The numerological codes in your birth hold profound patterns — maps of purpose, talent, and transformation that reveal themselves over a lifetime.",
        elder:      "The numbers that have quietly guided your life's rhythm now speak with clarity. Looking back, you may recognize their influence in every significant chapter."
    },
    soul: {
        baby:       "Beyond the stars and numbers lies something even deeper — your baby's soul mission. These readings explore the spiritual gifts and purpose they've brought into the world.",
        child:      "Every child arrives with a soul purpose. These deeper readings reveal the spiritual gifts and life lessons your child has come here to explore.",
        teen:       "There's a reason you feel drawn to certain things and restless about others. Your soul arrived with a mission — and these readings map it out.",
        youngAdult: "Your soul chose this life for a reason. These readings explore the deeper currents of purpose, karma, and spiritual potential that shape your journey.",
        adult:      "Beneath the surface of personality and circumstance lies your soul's deeper mission — the invisible thread connecting every meaningful moment of your life.",
        elder:      "Your soul's mission has been unfolding all along. These readings illuminate the deeper purpose that has quietly guided your most meaningful choices and transformations."
    },
    forecasts: {
        baby:       "Even at this tender age, cosmic cycles are already at work. Here's a glimpse at the energetic seasons that will shape your little one's early years.",
        child:      "The universe moves in cycles, and your child is entering specific energetic seasons right now. Understanding these rhythms helps you support their growth.",
        teen:       "You're in a powerful time of change — and the cosmic cycles around you are part of it. Here's what the current energies are activating in your life.",
        youngAdult: "The universe moves in personal cycles tailored to your birth chart. Here's what the current cosmic weather means for your year ahead.",
        adult:      "The cosmic clock is always turning. These current cycles reveal the energetic themes at play in your life right now.",
        elder:      "The great cycles of your life have brought you to this moment. Here is the energetic season you're in now — and the gifts it offers."
    }
};


// ============================================
// OPENING LETTER VARIANTS
// ============================================

var AGE_OPENING_LETTERS = {
    baby: [
        "At the exact moment your little one took their first breath, the cosmos held a pattern just for them — one that has never existed before and will never exist again.",
        "This reading captures that sacred arrangement — a map of the gifts, the tenderness, and the infinite potential woven into your baby's first heartbeat.",
        "Keep these words close. Some will ring true today; others will reveal themselves as your child grows. This is their lifelong cosmic companion."
    ],
    child: [
        "At the exact moment your child was born, the cosmos arranged itself in a pattern that has never existed before and will never exist again.",
        "This reading captures that unique configuration — not as a prediction of who they must become, but as a map of the gifts, challenges, and potentials encoded in their birth moment.",
        "Some insights will resonate right away; others will unfold over the years as your child grows. This is their cosmic blueprint — a companion for every stage of their journey."
    ],
    teen: [
        "At the exact moment you were born, the cosmos arranged itself in a pattern that has never existed before and will never exist again.",
        "This reading captures that unique configuration — a map of who you already are and who you're becoming. It's not about being told who to be, but about understanding the tools you were given.",
        "Take your time exploring. Some of this will click immediately; the rest will make sense as you grow. This is yours — a cosmic field guide for the journey ahead."
    ],
    youngAdult: [
        "At the exact moment you were born, the universe created a pattern it had never made before — and never will again.",
        "This reading is a deep dive into that moment — the gifts you were born with, the challenges that make you stronger, and the unique purpose coded into your existence.",
        "Some of this will feel like things you've always known. Some will surprise you. All of it is yours."
    ],
    adult: [
        "At the exact moment you were born, the cosmos arranged itself in a pattern that has never existed before and will never exist again.",
        "This reading captures that unique configuration — not as a prediction of who you must become, but as a map of the gifts, challenges, and potentials encoded in your birth moment.",
        "Take your time exploring each section. Some insights will resonate immediately; others may reveal their meaning over years. This is your cosmic blueprint — a lifelong companion, not a daily forecast."
    ],
    elder: [
        "At the exact moment you were born, the cosmos held a pattern that it had never made before — and never will again. That pattern has been with you through every chapter.",
        "This reading captures the celestial blueprint you've been living all along — the gifts you were given, the challenges that forged your wisdom, and the deeper purpose woven through your story.",
        "As you read, you may find that the stars confirm what your heart has always known. This is a mirror, not a map — reflecting the extraordinary life you've already lived."
    ]
};


// ============================================
// CLOSING VARIANTS
// ============================================

var AGE_CLOSING_TEMPLATES = {
    baby: {
        heading: "{name}'s Story is Just Beginning...",
        body: "You've just explored {name}'s complete moment in time — a unique constellation of energies that has never existed before and will never exist again.\n\nWith a {sunSign} Sun warming their core, a {moonSign} Moon cradling their emotional world, and Life Path {lifePath} lighting the road ahead, {name} carries a beautiful combination of gifts waiting to unfold.\n\nKeep this reading close. As {name} grows — first steps, first words, first adventures — you'll begin to see these cosmic threads weaving through their story.",
        quote: "Every soul arrives with a purpose. {name}'s purpose is written in the stars — and you get to watch it unfold.",
        attr: "A Moment in Time"
    },
    child: {
        heading: "{name}'s Cosmic Adventure Continues...",
        body: "You've just explored {name}'s complete moment in time — a unique constellation of energies that will unfold throughout their life.\n\nWith a {sunSign} Sun shaping their personality, a {moonSign} Moon guiding their emotions, and Life Path {lifePath} revealing their soul's journey, {name} has a remarkable set of gifts.\n\nShare these insights with them when the moment feels right. Understanding their cosmic blueprint can help them feel seen, understood, and proud of who they are.",
        quote: "Every soul arrives with a purpose. {name}'s is written in the stars — and it's already starting to shine.",
        attr: "A Moment in Time"
    },
    teen: {
        heading: "{name}'s Story is Unfolding...",
        body: "You've just explored your complete moment in time — a unique constellation of energies that has never existed before and will never exist again.\n\nWith a {sunSign} Sun at your core, a {moonSign} Moon shaping your inner world, and Life Path {lifePath} guiding your direction, you carry a powerful combination of gifts.\n\nThe person you're becoming isn't random. It's written in the stars — and it's yours to shape.",
        quote: "You are not too young to know yourself deeply. {name}, your purpose is already alive inside you.",
        attr: "A Moment in Time"
    },
    youngAdult: {
        heading: "{name}'s Cosmic Story Continues...",
        body: "You've just explored your complete moment in time — a unique constellation of energies that has never existed before and will never exist again.\n\nWith a {sunSign} Sun driving your identity, a {moonSign} Moon fueling your emotional depth, and Life Path {lifePath} directing your soul's purpose, you carry a rare combination of gifts.\n\nReturn to this reading whenever you need a reminder of who you truly are beneath all the roles you play.",
        quote: "Every soul arrives with a purpose. Yours is written in the stars — and you're just getting started.",
        attr: "A Moment in Time"
    },
    adult: {
        heading: "{name}'s Cosmic Story Continues...",
        body: "You've just explored your complete moment in time — a unique constellation of energies that has never existed before and will never exist again.\n\nWith a {sunSign} Sun illuminating your core identity, a {moonSign} Moon nurturing your emotional world, and Life Path {lifePath} guiding your soul's journey, you carry a sacred combination of gifts.\n\nReturn to these pages whenever you need a reminder of who you truly are beneath all the roles you play.",
        quote: "Every soul arrives with a purpose. {name}'s purpose is written in the stars.",
        attr: "A Moment in Time"
    },
    elder: {
        heading: "The Stars Still Sing for {name}...",
        body: "You've just explored your complete moment in time — a constellation of energies that has accompanied you through every chapter of your extraordinary life.\n\nWith a {sunSign} Sun that has illuminated your path, a {moonSign} Moon that has held your deepest feelings, and Life Path {lifePath} that has guided your soul's evolution, you carry the full harvest of a rich cosmic blueprint.\n\nThese pages are a mirror for the wisdom you've already earned. Share your light with those who are still finding their way.",
        quote: "The stars that witnessed {name}'s birth have watched a remarkable story unfold — and it's not finished yet.",
        attr: "A Moment in Time"
    }
};


// ============================================
// PARENT GUIDANCE VISIBILITY
// ============================================

/**
 * Should parentGuidance content be shown for this age?
 * Show for babies, children, teens. Hide for adults/elders.
 */
function shouldShowParentGuidance() {
    const profile = getAgeProfile();
    return ['baby', 'child', 'teen'].includes(profile.category);
}

/**
 * Should the standalone "Guidance for Parents" closing card be shown?
 */
function shouldShowParentClosingCard() {
    const profile = getAgeProfile();
    return ['baby', 'child'].includes(profile.category);
}

/**
 * Get the appropriate label for parentGuidance sections
 */
function getParentGuidanceLabel() {
    const profile = getAgeProfile();
    switch (profile.category) {
        case 'baby':  return 'Nurturing This Little One';
        case 'child': return 'Guiding Your Child';
        case 'teen':  return 'Supporting Their Growth';
        default:      return 'Parenting Guidance';
    }
}


// ============================================
// MAIN TRANSFORM FUNCTION
// ============================================
// Called inside createReadingCard, after applyToneVariations

/**
 * Apply age-adaptive language transformations to reading text
 * @param {string} text - The reading text (may already have tone applied)
 * @returns {string} - Text adapted for the current age category
 */
function applyAgeLanguage(text) {
    if (!text) return text;

    const profile = getAgeProfile();
    const cat = profile.category;
    let result = text;

    // Phase 1: Long phrase substitutions (apply first to avoid partial matches)
    for (const [original, replacements] of Object.entries(AGE_PHRASE_SUBSTITUTIONS)) {
        const replacement = replacements[cat];
        if (replacement === undefined || replacement === null) continue;
        const regex = new RegExp(escapeRegExp(original), 'gi');
        result = result.replace(regex, (match) => {
            // Preserve original capitalization of first letter
            if (match[0] === match[0].toUpperCase() && replacement[0] === replacement[0].toLowerCase()) {
                return replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            return replacement;
        });
    }

    // Phase 2: Word-level substitutions
    for (const [original, replacements] of Object.entries(AGE_WORD_SUBSTITUTIONS)) {
        const replacement = replacements[cat];
        if (replacement === undefined || replacement === null) continue;
        // Exact case match only (these are case-sensitive pairs)
        const regex = new RegExp(escapeRegExp(original), 'g');
        result = result.replace(regex, replacement);
    }

    // Phase 3: Strip parentGuidance blocks for adults/elders
    if (!shouldShowParentGuidance()) {
        // Remove "Parenting Guidance:" or "For Parents" labeled sections from inline content
        result = result.replace(/<em>Parenting Guidance:<\/em>[^<]*(?:<[^>]*>[^<]*)*?(?=<em>|<\/p>|$)/gi, '');
        result = result.replace(/<h4[^>]*>(?:For Parents|Parent Guidance|Parenting Guidance)<\/h4>[\s\S]*?(?=<h4|<p\s+style|<\/div>|$)/gi, '');
        // Clean up any resulting double-breaks
        result = result.replace(/<p>\s*<\/p>/g, '');
    } else {
        // Relabel parentGuidance sections
        const label = getParentGuidanceLabel();
        result = result.replace(/<em>Parenting Guidance:<\/em>/gi, `<em>${label}:</em>`);
        result = result.replace(/(<h4[^>]*>)(?:For Parents|Parent Guidance|Parenting Guidance)(<\/h4>)/gi, `$1${label}$2`);
    }

    return result;
}

/**
 * Get age-adapted opening letter paragraphs
 * @returns {string[]} Array of paragraph strings
 */
function getAgeOpeningLetter() {
    const profile = getAgeProfile();
    return AGE_OPENING_LETTERS[profile.category] || AGE_OPENING_LETTERS.adult;
}

/**
 * Get age-adapted section intro text
 * @param {string} sectionKey - e.g. 'celestial', 'numbers', 'soul', 'forecasts'
 * @returns {string|null} Intro text or null if none
 */
function getAgeSectionIntro(sectionKey) {
    const profile = getAgeProfile();
    const intros = AGE_SECTION_INTROS[sectionKey];
    if (!intros) return null;
    return intros[profile.category] || intros.adult || null;
}

/**
 * Get age-adapted closing template
 * @param {object} data - { name, sunSign, moonSign, lifePath }
 * @returns {object} { heading, body, quote, attr } with placeholders filled
 */
function getAgeClosing(data) {
    const profile = getAgeProfile();
    const template = AGE_CLOSING_TEMPLATES[profile.category] || AGE_CLOSING_TEMPLATES.adult;

    function fill(str) {
        return str
            .replace(/\{name\}/g, data.name || 'this soul')
            .replace(/\{sunSign\}/g, data.sunSign || 'Unknown')
            .replace(/\{moonSign\}/g, data.moonSign || 'Unknown')
            .replace(/\{lifePath\}/g, data.lifePath || '?');
    }

    return {
        heading: fill(template.heading),
        body: fill(template.body),
        quote: fill(template.quote),
        attr: template.attr
    };
}

/**
 * Get the age tag badge text (shown in UI header)
 * @returns {string|null}
 */
function getAgeTag() {
    const profile = getAgeProfile();
    return profile.config.tag || null;
}

/**
 * Get age icon
 * @returns {string}
 */
function getAgeIcon() {
    const profile = getAgeProfile();
    return profile.config.icon || '';
}


// ============================================
// UTILITY
// ============================================

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


// ============================================
// EXPORTS
// ============================================

window.initAgeLanguage = initAgeLanguage;
window.getAgeProfile = getAgeProfile;
window.applyAgeLanguage = applyAgeLanguage;
window.shouldShowParentGuidance = shouldShowParentGuidance;
window.shouldShowParentClosingCard = shouldShowParentClosingCard;
window.getParentGuidanceLabel = getParentGuidanceLabel;
window.getAgeOpeningLetter = getAgeOpeningLetter;
window.getAgeSectionIntro = getAgeSectionIntro;
window.getAgeClosing = getAgeClosing;
window.getAgeTag = getAgeTag;
window.getAgeIcon = getAgeIcon;
window.detectAgeCategory = detectAgeCategory;
