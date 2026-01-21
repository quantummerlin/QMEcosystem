// ============================================
// K-Pop Realm: Complete Data System
// Copyright-Safe Idol Archetypes & kosmic Mappings
// ============================================

// ============================================
// Idol Archetypes (Copyright-Safe)
// ============================================

const KPOP_ARCHETYPES = {
    1: {
        name: "Golden Leader",
        icon: "🌟",
        planet: "Sun",
        energy: "Leadership & Stage Presence",
        traits: ["Natural authority", "Charismatic", "Decisive", "Protective", "Visionary"],
        strengths: ["Commanding stage presence", "Natural leadership", "Unifying force", "Magnetic personality"],
        challenges: ["Taking on too much responsibility", "Difficulty delegating", "Pressure to be perfect"],
        success_path: ["Lead by example", "Trust your team", "Embrace your leadership destiny"],
        cosmic_influence: "Strong Sun energy gives you star power and natural authority. Your aura commands attention.",
        group_role: "Leader / Center",
        performance_style: "Commanding, charismatic, center-focused",
        fan_connection: "Natural fan service ability through genuine leadership"
    },
    2: {
        name: "Harmonious Diplomat",
        icon: "🤝",
        planet: "Moon",
        energy: "Emotional Balance & Group Harmony",
        traits: ["Peacemaker", "Intuitive", "Supportive", "Diplomatic", "Empathetic"],
        strengths: ["Group harmony", "Emotional intelligence", "Conflict resolution", "Fan connection"],
        challenges: ["People-pleasing", "Difficulty asserting yourself", "Absorbing others' emotions"],
        success_path: ["Balance your needs with others", "Trust your intuition", "Use harmony as strength"],
        cosmic_influence: "Moon energy provides emotional depth and intuitive understanding. You sense group dynamics.",
        group_role: "Peacekeeper / Team Player",
        performance_style: "Graceful, balanced, emotionally resonant",
        fan_connection: "Deep emotional connection through empathy"
    },
    3: {
        name: "Mood Maker",
        icon: "😄",
        planet: "Jupiter",
        energy: "Joy & Expansion",
        traits: ["Optimistic", "Charismatic", "Funny", "Energetic", "Spontaneous"],
        strengths: ["Variety show star", "Instant mood booster", "Natural entertainer", "Fan favorite"],
        challenges: ["Overextending energy", "Difficulty being serious", "Impulsive decisions"],
        success_path: ["Channel your joy purposefully", "Balance fun with focus", "Share your light freely"],
        cosmic_influence: "Jupiter expands your natural joy and optimism. You light up every room you enter.",
        group_role: "Mood Maker / Variety Star",
        performance_style: "Energetic, playful, crowd-pleasing",
        fan_connection: "Instant connection through joy and humor"
    },
    4: {
        name: "Reliable Backbone",
        icon: "💪",
        planet: "Saturn",
        energy: "Stability & Foundation",
        traits: ["Hardworking", "Dependable", "Disciplined", "Loyal", "Structured"],
        strengths: ["Perfect practice habits", "Rock-solid performance", "Group foundation", "Long-term success"],
        challenges: ["Being too hard on yourself", "Rigidity", "Fear of change"],
        success_path: ["Trust your work ethic", "Find balance in discipline", "Embrace growth through structure"],
        cosmic_influence: "Saturn provides the discipline and endurance needed for legendary training journeys.",
        group_role: "Stability Anchor / Practice Leader",
        performance_style: "Precise, reliable, technically perfect",
        fan_connection: "Respected for consistency and dedication"
    },
    5: {
        name: "Main Dancer Virtuoso",
        icon: "💃",
        planet: "Mars",
        energy: "Movement & Performance Intensity",
        traits: ["Athletic", "Expressive", "Rhythmic", "Dynamic", "Visual impact"],
        strengths: ["Viral dance moments", "Center stage magnet", "Incredible technique", "Stage domination"],
        challenges: ["Physical burnout", "Comparison with others", "Pressure to be perfect"],
        success_path: ["Honor your body", "Trust your unique movement", "Let dance be your expression"],
        cosmic_influence: "Mars fuels your performance intensity and physical power. Every move creates impact.",
        group_role: "Main Dancer / Performance Ace",
        performance_style: "Powerful, precise, viral-worthy",
        fan_connection: "Captivates through movement and presence"
    },
    6: {
        name: "Visual Icon",
        icon: "✨",
        planet: "Venus",
        energy: "Beauty & Charm",
        traits: ["Striking appearance", "Elegant", "Charismatic", "Photogenic", "Stylish"],
        strengths: ["Viral visual moments", "Brand ambassador material", "Camera magnet", "International appeal"],
        challenges: ["Being seen only as a visual", "Pressure to maintain appearance", "Typecasting"],
        success_path: ["Embrace your unique look", "Show your depth beyond visuals", "Use beauty as platform"],
        cosmic_influence: "Venus bestows visual power and natural charm. The camera loves you naturally.",
        group_role: "Visual / Face of Group",
        performance_style: "Elegant, photogenic, visually stunning",
        fan_connection: "Draws attention and creates brand appeal"
    },
    7: {
        name: "Quiet Genius",
        icon: "🧠",
        planet: "Mercury",
        energy: "Intellect & Innovation",
        traits: ["Analytical", "Creative", "Innovative", "Deep thinker", "Visionary"],
        strengths: ["Hit song creation", "Concept development", "Artistic direction", "Unique perspective"],
        challenges: ["Overthinking", "Isolation", "Difficulty expressing emotions"],
        success_path: ["Share your creations boldly", "Trust your vision", "Balance depth with connection"],
        cosmic_influence: "Mercury sharpens your intellect and innovation. Your mind creates hits.",
        group_role: "Songwriter / Producer / Concept Creator",
        performance_style: "Intelligent, nuanced, artistically rich",
        fan_connection: "Respected for artistic depth and innovation"
    },
    8: {
        name: "Rapper Firecracker",
        icon: "🔥",
        planet: "Mars + Pluto",
        energy: "Intensity & Transformation",
        traits: ["Confident", "Quick-witted", "Bold", "Charismatic", "Swag"],
        strengths: ["Impactful rap delivery", "Viral verses", "Stage charisma", "Memorable presence"],
        challenges: ["Intensity overload", "Clashing with others", "Impulsive actions"],
        success_path: ["Channel intensity constructively", "Use power for good", "Balance fire with control"],
        cosmic_influence: "Mars provides the fire, Pluto the transformation. Your rap creates lasting impact.",
        group_role: "Main Rapper / Fire Starter",
        performance_style: "Explosive, confident, unforgettable",
        fan_connection: "Commands respect and creates buzz"
    },
    9: {
        name: "Main Vocal Powerhouse",
        icon: "🎤",
        planet: "Venus + Moon",
        energy: "Emotion & Expression",
        traits: ["Emotional", "Expressive", "Talented", "Passionate", "Soulful"],
        strengths: ["Emotional vocal delivery", "Song interpretation", "Live performance mastery", "Touching hearts"],
        challenges: ["Emotional burnout", "Perfectionism", "Taking criticism personally"],
        success_path: ["Protect your emotional energy", "Trust your voice", "Share your soul through song"],
        cosmic_influence: "Venus gives vocal beauty, Moon emotional depth. Your voice touches souls.",
        group_role: "Main Vocalist / Emotional Anchor",
        performance_style: "Emotional, powerful, soul-stirring",
        fan_connection: "Deep emotional connection through voice"
    },
    11: {
        name: "All-Rounder Ace",
        icon: "🏆",
        planet: "All Planets Strong",
        energy: "Complete Mastery",
        traits: ["Exceptional", "Versatile", "Hardworking", "Charismatic", "Natural talent"],
        strengths: ["Can do everything well", "Solo potential", "Group backbone", "Viral magnet"],
        challenges: ["Pressure to be perfect", "Taking on too much", "Comparison with others"],
        success_path: ["Embrace your versatility", "Trust your journey", "Share your gifts generously"],
        cosmic_influence: "All planets align in your chart. You're kosmic perfection embodied.",
        group_role: "Ace / Center / All-Rounder",
        performance_style: "Perfect in everything, natural star",
        fan_connection: "Adored for excellence and versatility"
    },
    22: {
        name: "Master Builder",
        icon: "🏗️",
        planet: "Saturn + Jupiter",
        energy: "Construction & Success",
        traits: ["Visionary", "Disciplined", "Ambitious", "Strategic", "Leader"],
        strengths: ["Building empires", "Long-term success", "Strategic thinking", "Industry leadership"],
        challenges: ["Taking on too much", "Perfectionism", "Difficulty delegating"],
        success_path: ["Build your empire step by step", "Trust your vision", "Lead with wisdom"],
        cosmic_influence: "Saturn provides foundation, Jupiter expansion. You're built for lasting success.",
        group_role: "Industry Leader / Empire Builder",
        performance_style: "Commanding, strategic, legendary",
        fan_connection: "Respected as industry icon"
    },
    33: {
        name: "Master Teacher",
        icon: "📚",
        planet: "All Planets + Neptune",
        energy: "Wisdom & Inspiration",
        traits: ["Wise", "Inspiring", "Compassionate", "Visionary", "Mentor"],
        strengths: ["Inspiring millions", "Teaching others", "Cultural impact", "Lasting legacy"],
        challenges: ["Living up to expectations", "Being a role model constantly", "Emotional weight"],
        success_path: ["Share your wisdom freely", "Lead with compassion", "Build your legacy"],
        cosmic_influence: "All planets plus Neptune spiritual energy. You're here to inspire generations.",
        group_role: "Cultural Icon / Inspiration",
        performance_style: "Transcendent, inspiring, legendary",
        fan_connection: "Loved and respected as cultural figure"
    }
};

// ============================================
// Planetary Mappings to K-Pop Concepts
// ============================================

const PLANETARY_KPOP_MEANINGS = {
    sun: {
        name: "Sun ☀️",
        kpop_meaning: "Stage Presence & Leadership",
        reading: "Your Sun energy reveals your star power and leadership potential. Strong Sun placement means you naturally command stages and attention. You're born to be a center.",
        archetype_connection: "Strongest in Golden Leader and All-Rounder Ace"
    },
    moon: {
        name: "Moon 🌙",
        kpop_meaning: "Fan Connection & Emotional Performance",
        reading: "Your Moon energy shows how you emotionally connect with fans. Strong Moon means ballad mastery and natural fan service. You feel what fans feel.",
        archetype_connection: "Strongest in Harmonious Diplomat and Main Vocal Powerhouse"
    },
    mercury: {
        name: "Mercury ☿️",
        kpop_meaning: "Versatility & Communication",
        reading: "Mercury reveals your versatility and communication power. Strong Mercury means rap capability and variety show talent. You're quick-witted and adaptable.",
        archetype_connection: "Strongest in Quiet Genius and Rapper Firecracker"
    },
    venus: {
        name: "Venus ♀️",
        kpop_meaning: "Visual Impact & Charm",
        reading: "Venus determines your visual power and charm. Strong Venus means you're a visual icon with natural magnetism. The camera loves you.",
        archetype_connection: "Strongest in Visual Icon and Main Vocal Powerhouse"
    },
    mars: {
        name: "Mars ♂️",
        kpop_meaning: "Performance Intensity & Training Energy",
        reading: "Mars shows your performance intensity and training potential. Strong Mars means explosive dance power and tireless work ethic.",
        archetype_connection: "Strongest in Main Dancer Virtuoso and Rapper Firecracker"
    },
    jupiter: {
        name: "Jupiter ♃",
        kpop_meaning: "Luck & Success Timing",
        reading: "Jupiter reveals your luck windows and success potential. Strong Jupiter means you're a natural fame magnet with perfect timing.",
        archetype_connection: "Strongest in Mood Maker and All-Rounder Ace"
    },
    saturn: {
        name: "Saturn ♄",
        kpop_meaning: "Training & Longevity",
        reading: "Saturn shows your training journey and career longevity. Strong Saturn means long training pays off and enduring success.",
        archetype_connection: "Strongest in Reliable Backbone and Master Builder"
    },
    uranus: {
        name: "Uranus ♅",
        kpop_meaning: "Innovation & Viral Potential",
        reading: "Uranus reveals your viral potential and trendsetting ability. Strong Uranus means you create viral moments and set trends.",
        archetype_connection: "Strongest in Quiet Genius and All-Rounder Ace"
    },
    neptune: {
        name: "Neptune ♆",
        kpop_meaning: "Fantasy & Concept Mastery",
        reading: "Neptune shows your concept mastery and dreamy stage presence. Strong Neptune means you're a concept chameleon who creates fantasy.",
        archetype_connection: "Strongest in Main Vocal Powerhouse and Master Teacher"
    },
    pluto: {
        name: "Pluto ♇",
        kpop_meaning: "Transformation & Evolution",
        reading: "Pluto reveals your evolution power and comeback magic. Strong Pluto means you're a comeback legend who reinvents yourself.",
        archetype_connection: "Strongest in Rapper Firecracker and Master Teacher"
    }
};

// ============================================
// Fandom Types (Copyright-Safe)
// ============================================

const FANDOM_TYPES = {
    dedicated_stan: {
        name: "Dedicated Stan",
        traits: ["Loyal", "Knowledgeable", "Active", "Supportive", "Passionate"],
        engagement_level: "Ultra High",
        social_presence: "Every platform, always active"
    },
    casual_listener: {
        name: "Casual Listener",
        traits: ["Appreciative", "Selective", "Trend-aware", "Flexible", "Relaxed"],
        engagement_level: "Medium",
        social_presence: "When inspired"
    },
    content_creator: {
        name: "Content Creator",
        traits: ["Creative", "Technical", "Community-driven", "Innovative", "Analytical"],
        engagement_level: "High",
        social_presence: "Content-focused, strategic"
    },
    collector: {
        name: "Collector",
        traits: ["Detail-oriented", "Completist", "Investment-minded", "Passionate", "Organized"],
        engagement_level: "High",
        social_presence: "Showcase-focused"
    },
    emotional_supporter: {
        name: "Emotional Supporter",
        traits: ["Empathetic", "Protective", "Devoted", "Sentimental", "Loyal"],
        engagement_level: "High",
        social_presence: "Emotional content focus"
    }
};

// ============================================
// K-Pop Career Stages
// ============================================

const CAREER_STAGES = {
    trainee: {
        name: "Trainee",
        cosmic_advice: "Saturn energy is strongest now. Focus on discipline and building foundations.",
        optimal_duration: "18-48 months (varies by archetype)",
        key_activities: ["Vocal training", "Dance practice", "Language study", "Personality development"]
    },
    debut: {
        name: "Debut",
        cosmic_advice: "Jupiter transit creates perfect debut windows. Trust the timing.",
        optimal_timing: "Jupiter-Sun harmony or Jupiter-Venus alignment",
        key_activities: ["Debut showcase", "Media training", "Fan engagement", "Performance perfection"]
    },
    rookie: {
        name: "Rookie",
        cosmic_advice: "Mars energy provides momentum. Capitalize on freshness.",
        key_activities: ["Variety shows", "Fan meets", "Content creation", "Skill development"]
    },
    growth: {
        name: "Growth Phase",
        cosmic_advice: "Sun-Venus harmony boosts popularity. Shine bright.",
        key_activities: ["Comeback planning", "Fan base expansion", "Concept exploration", "Skill mastery"]
    },
    established: {
        name: "Established Artist",
        cosmic_advice: "Pluto energy enables transformation. Evolve constantly.",
        key_activities: ["Concept reinvention", "International expansion", "Mentoring", "Brand building"]
    },
    legendary: {
        name: "Legendary Status",
        cosmic_advice: "All planets aligned. You've achieved kosmic perfection.",
        key_activities: ["Legacy building", "Cultural impact", "Industry leadership", "Inspiring next generation"]
    }
};

// ============================================
// Concept Types (Copyright-Safe)
// ============================================

const CONCEPT_TYPES = {
    girl_crush: {
        name: "Girl Crush",
        energy: "Confident, bold, powerful",
        ideal_archetypes: ["Rapper Firecracker", "Main Dancer Virtuoso", "Visual Icon"],
        planetary_alignment: "Mars + Venus dominance"
    },
    cute: {
        name: "Cute/Innocent",
        energy: "Sweet, playful, youthful",
        ideal_archetypes: ["Mood Maker", "Visual Icon", "Harmonious Diplomat"],
        planetary_alignment: "Moon + Jupiter harmony"
    },
    hip_hop: {
        name: "Hip-Hop",
        energy: "Edgy, authentic, street",
        ideal_archetypes: ["Rapper Firecracker", "Quiet Genius", "Main Dancer Virtuoso"],
        planetary_alignment: "Mars + Pluto intensity"
    },
    ballad: {
        name: "Ballad",
        energy: "Emotional, soulful, powerful",
        ideal_archetypes: ["Main Vocal Powerhouse", "Harmonious Diplomat", "Golden Leader"],
        planetary_alignment: "Venus + Moon emotion"
    },
    experimental: {
        name: "Experimental/Avant-Garde",
        energy: "Innovative, unique, boundary-pushing",
        ideal_archetypes: ["Quiet Genius", "All-Rounder Ace", "Master Teacher"],
        planetary_alignment: "Uranus + Neptune creativity"
    },
    retro: {
        name: "Retro/Vintage",
        energy: "Nostalgic, classic, timeless",
        ideal_archetypes: ["Visual Icon", "Golden Leader", "Main Vocal Powerhouse"],
        planetary_alignment: "Saturn + Jupiter classicism"
    }
};

// ============================================
// K-Pop Style Vocabulary for Readings
// ============================================

const KPOP_VOCABULARY = {
    performance: ["Stage presence", "Center quality", "Visual impact", "Viral moments", "Fan service"],
    training: ["Debut preparation", "Training period", "Skill development", "Practice endurance", "Growth mindset"],
    career: ["Debut timing", "Comeback success", "Concept mastery", "Fandom building", "International appeal"],
    fandom: ["Fan connection", "Fan service", "Community building", "Emotional bond", "Shared journey"],
    success: ["kosmic alignment", "Energy windows", "Timing perfection", "Destiny fulfillment", "Stardom"]
};

// ============================================
// Helper Functions
// ============================================

// Get archetype by Life Path number
function getArchetype(lifePathNumber) {
    return KPOP_ARCHETYPES[lifePathNumber] || KPOP_ARCHETYPES[1];
}

// Get planetary meaning
function getPlanetaryMeaning(planet) {
    return PLANETARY_KPOP_MEANINGS[planet] || null;
}

// Get fandom type based on personality
function getFandomType(personalityTraits) {
    // Simple logic - can be expanded
    if (personalityTraits.includes("passionate")) return FANDOM_TYPES.dedicated_stan;
    if (personalityTraits.includes("creative")) return FANDOM_TYPES.content_creator;
    if (personalityTraits.includes("empathetic")) return FANDOM_TYPES.emotional_supporter;
    if (personalityTraits.includes("detail-oriented")) return FANDOM_TYPES.collector;
    return FANDOM_TYPES.casual_listener;
}

// Generate K-Pop reading
function generateKPopReading(name, lifePathNumber, zodiacSign) {
    const archetype = getArchetype(lifePathNumber);
    
    return `
        <div class="kpop-archetype">
            <div class="kpop-archetype-icon">${archetype.icon}</div>
            <div class="kpop-archetype-name">${archetype.name}</div>
            <div class="kpop-archetype-desc">${archetype.energy}</div>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">Your kosmic Blueprint</h3>
            <p class="kpop-result-text">
                <span class="kpop-accent">${name}</span>, your Life Path <span class="kpop-highlight">${lifePathNumber}</span> 
                pulses with <span class="kpop-accent">${archetype.planet}</span> energy, marking you as a natural 
                <span class="kpop-highlight">${archetype.name}</span>. This isn't just a personality type - 
                it's your kosmic blueprint for K-Pop success.
            </p>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">Your Idol Archetype</h3>
            <p class="kpop-result-text">
                <strong>Archetype:</strong> ${archetype.name} ${archetype.icon}<br>
                <strong>Group Role:</strong> ${archetype.group_role}<br>
                <strong>Performance Style:</strong> ${archetype.performance_style}<br>
                <strong>Fan Connection:</strong> ${archetype.fan_connection}
            </p>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">Your kosmic Strengths</h3>
            <ul class="kpop-result-text">
                ${archetype.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">Planetary Influence</h3>
            <p class="kpop-result-text">
                ${archetype.cosmic_influence}
            </p>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">Your Success Path</h3>
            <ul class="kpop-result-text">
                ${archetype.success_path.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
        
        <div class="kpop-result-section">
            <h3 class="kpop-result-title">kosmic Wisdom</h3>
            <p class="kpop-result-text">
                The universe has equipped you with everything needed for K-Pop stardom. 
                Your <span class="kpop-accent">${archetype.planet}</span> energy provides 
                <span class="kpop-highlight">${archetype.energy.toLowerCase()}</span>. 
                Trust your kosmic blueprint and let your star shine. 🌟
            </p>
        </div>
    `;
}

// Export for use in HTML files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        KPOP_ARCHETYPES,
        PLANETARY_KPOP_MEANINGS,
        FANDOM_TYPES,
        CAREER_STAGES,
        CONCEPT_TYPES,
        KPOP_VOCABULARY,
        getArchetype,
        getPlanetaryMeaning,
        getFandomType,
        generateKPopReading
    };
}
