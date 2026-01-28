// ============================================
// LOVE BLUEPRINT SYNTHESIS
// ============================================
// Combines Venus (how they love), Mars (what they desire), 
// and 7th House (who they attract) for comprehensive
// relationship pattern analysis
// ============================================

function generateLoveBlueprint(venusSign, marsSign, house7Sign) {
    // Venus-Mars combinations create unique love expressions
    const venusMarsPatterns = {
        'Fire-Fire': {
            dynamic: 'Passionate Pioneer',
            keywords: 'bold, spontaneous, adventure-seeking, direct',
            essence: 'loves with fire, desires with fire - a double flame of passionate pursuit and bold affection'
        },
        'Fire-Earth': {
            dynamic: 'Steady Flame',
            keywords: 'passionate yet grounded, romantic action, stable desire',
            essence: 'loves with fire, desires with earth - passionate romance meets practical commitment'
        },
        'Fire-Air': {
            dynamic: 'Bright Spark',
            keywords: 'playful, expressive, social romance, intellectual passion',
            essence: 'loves with fire, desires with air - bright enthusiasm meets curious connection'
        },
        'Fire-Water': {
            dynamic: 'Steam & Heat',
            keywords: 'intense, emotional action, protective passion, deep fire',
            essence: 'loves with fire, desires with water - passionate intensity meets emotional depth'
        },
        'Earth-Fire': {
            dynamic: 'Grounded Passion',
            keywords: 'loyal yet exciting, sensual adventure, stable spark',
            essence: 'loves with earth, desires with fire - sensual devotion meets active pursuit'
        },
        'Earth-Earth': {
            dynamic: 'Mountain Solid',
            keywords: 'steadfast, sensual, traditional, patient building',
            essence: 'loves with earth, desires with earth - double grounding creates unshakeable loyalty'
        },
        'Earth-Air': {
            dynamic: 'Practical Dreamer',
            keywords: 'thoughtful affection, mental attraction, grounded communication',
            essence: 'loves with earth, desires with air - tangible devotion meets intellectual connection'
        },
        'Earth-Water': {
            dynamic: 'Fertile Garden',
            keywords: 'nurturing, emotionally stable, sensual depth, patient care',
            essence: 'loves with earth, desires with water - practical care meets emotional intuition'
        },
        'Air-Fire': {
            dynamic: 'Wind-Fed Flame',
            keywords: 'exciting, social, adventurous communication, playful',
            essence: 'loves with air, desires with fire - intellectual charm meets bold pursuit'
        },
        'Air-Earth': {
            dynamic: 'Thinking Heart',
            keywords: 'logical affection, stable ideas, communicative commitment',
            essence: 'loves with air, desires with earth - mental connection meets physical devotion'
        },
        'Air-Air': {
            dynamic: 'Double Breeze',
            keywords: 'intellectual, social butterfly, freedom-loving, communicative',
            essence: 'loves with air, desires with air - double lightness creates friendship-first romance'
        },
        'Air-Water': {
            dynamic: 'Mist & Fog',
            keywords: 'emotional intelligence, intuitive communication, flowing thought',
            essence: 'loves with air, desires with water - mental connection meets deep feeling'
        },
        'Water-Fire': {
            dynamic: 'Boiling Ocean',
            keywords: 'intense, emotional action, protective fire, deep passion',
            essence: 'loves with water, desires with fire - emotional depth meets passionate drive'
        },
        'Water-Earth': {
            dynamic: 'Deep Roots',
            keywords: 'nurturing stability, emotionally grounded, patient depth',
            essence: 'loves with water, desires with earth - emotional wisdom meets loyal devotion'
        },
        'Water-Air': {
            dynamic: 'Cloud Formation',
            keywords: 'intuitive communication, emotional ideas, flowing expression',
            essence: 'loves with water, desires with air - deep feeling meets mental exploration'
        },
        'Water-Water': {
            dynamic: 'Ocean Deep',
            keywords: 'psychic, empathic, deeply intuitive, merging souls',
            essence: 'loves with water, desires with water - double depth creates oceanic emotional fusion'
        }
    };
    
    // Get elements
    const venusElement = venusSign.element;
    const marsElement = marsSign.element;
    const pattern = venusMarsPatterns[`${venusElement}-${marsElement}`];
    
    // 7th house adds the "type" they attract
    const house7Archetypes = {
        'Aries': 'bold initiators, confident leaders, passionate warriors',
        'Taurus': 'stable providers, sensual souls, loyal companions',
        'Gemini': 'witty communicators, curious minds, playful spirits',
        'Cancer': 'nurturing caretakers, emotional anchors, home builders',
        'Leo': 'radiant performers, generous hearts, creative spirits',
        'Virgo': 'helpful healers, thoughtful analysts, devoted servants',
        'Libra': 'harmonious diplomats, aesthetic appreciators, fair partners',
        'Scorpio': 'intense transformers, passionate depths, magnetic souls',
        'Sagittarius': 'adventurous philosophers, free spirits, truth seekers',
        'Capricorn': 'ambitious builders, responsible leaders, patient achievers',
        'Aquarius': 'innovative rebels, unique individuals, humanitarian visionaries',
        'Pisces': 'dreamy artists, compassionate healers, mystical souls'
    };
    
    const attracted = house7Archetypes[house7Sign.name];
    
    return {
        title: `Love Blueprint: ${pattern.dynamic}`,
        subtitle: `${venusSign.name} Venus × ${marsSign.name} Mars → ${house7Sign.name} 7th House`,
        keywords: pattern.keywords,
        pattern: pattern.dynamic,
        essence: pattern.essence,
        attracted: attracted,
        venusElement: venusElement,
        marsElement: marsElement,
        synthesis: generateLoveSynthesis(venusSign, marsSign, house7Sign, pattern, attracted)
    };
}

function generateLoveSynthesis(venusSign, marsSign, house7Sign, pattern, attracted) {
    const synthesis = `This little one's heart speaks the language of ${pattern.dynamic.toLowerCase()}. Their Venus in ${venusSign.name} means they express affection through ${getVenusExpression(venusSign.name)}, while Mars in ${marsSign.name} drives them toward ${getMarsDesire(marsSign.name)}.

The magic happens in the dance between how they love and what they desire. ${pattern.essence}. This creates a unique romantic signature that will unfold as they grow - ${pattern.keywords}.

Their 7th house in ${house7Sign.name} reveals a fascinating pattern: they naturally magnetize ${attracted}. This isn't random - it's their soul seeking perfect mirrors and teachers in relationship. Watch how, even as a child, they're drawn to certain personality types, certain energies that reflect back ${get7thHouseMeaning(house7Sign.name)}.

As they grow into their relationship self, they'll discover that love isn't just one thing - it's the beautiful complexity of wanting (Mars), giving (Venus), and receiving (7th house) all woven together into their own unique love language.`;

    return synthesis;
}

function getVenusExpression(sign) {
    const expressions = {
        'Aries': 'bold gestures, direct affection, and playful competition - they love through action and courage',
        'Taurus': 'sensual touch, loyal presence, and tangible gifts - they love through physical devotion and stability',
        'Gemini': 'words, ideas, and playful communication - they love through mental stimulation and variety',
        'Cancer': 'nurturing care, emotional attunement, and protective tenderness - they love through feeling and safety',
        'Leo': 'grand romance, creative expression, and generous warmth - they love through radiance and celebration',
        'Virgo': 'helpful service, thoughtful details, and devoted attention - they love through acts of improvement',
        'Libra': 'harmony, beauty, and gracious partnership - they love through balance and aesthetic appreciation',
        'Scorpio': 'intense loyalty, deep merging, and transformative intimacy - they love through powerful emotional fusion',
        'Sagittarius': 'adventurous companionship, honest expression, and philosophical connection - they love through freedom and truth',
        'Capricorn': 'committed partnership, responsible devotion, and building together - they love through time and achievement',
        'Aquarius': 'unique friendship, intellectual freedom, and humanitarian connection - they love through individuality and ideals',
        'Pisces': 'boundless compassion, romantic fantasy, and spiritual merging - they love through dreams and empathy'
    };
    return expressions[sign];
}

function getMarsDesire(sign) {
    const desires = {
        'Aries': 'conquest, challenge, and immediate action - their desire burns hot, fast, and fearlessly',
        'Taurus': 'sensual pleasure, steady building, and physical satisfaction - their desire moves slow, deep, and sensuously',
        'Gemini': 'mental stimulation, variety, and playful exchange - their desire lives in curiosity and communication',
        'Cancer': 'emotional security, protective connection, and nurturing intimacy - their desire flows through feeling and safety',
        'Leo': 'creative passion, dramatic expression, and admiring attention - their desire radiates with pride and playfulness',
        'Virgo': 'perfection, helpful service, and thoughtful connection - their desire manifests through analysis and improvement',
        'Libra': 'harmony, aesthetic pleasure, and gracious partnership - their desire seeks balance and beauty',
        'Scorpio': 'intense merging, transformative power, and deep truth - their desire plunges into emotional depths',
        'Sagittarius': 'adventurous exploration, philosophical growth, and freedom - their desire expands through experience and meaning',
        'Capricorn': 'achievement, mastery, and enduring success - their desire climbs steadily toward ambitious goals',
        'Aquarius': 'innovation, unique expression, and revolutionary ideals - their desire rebels toward the future',
        'Pisces': 'spiritual transcendence, artistic creation, and boundless compassion - their desire dissolves into universal love'
    };
    return desires[sign];
}

function get7thHouseMeaning(sign) {
    const meanings = {
        'Aries': 'their need to develop courage, independence, and self-assertion through partnership',
        'Taurus': 'their need to learn stability, sensuality, and the value of patience through relationship',
        'Gemini': 'their need to cultivate communication, curiosity, and mental flexibility through connection',
        'Cancer': 'their need to embrace emotional vulnerability, nurturing, and home building through love',
        'Leo': 'their need to step into radiance, creativity, and generous self-expression through partnership',
        'Virgo': 'their need to develop discernment, service, and practical devotion through relationship',
        'Libra': 'their need to master harmony, diplomacy, and the art of true partnership',
        'Scorpio': 'their need to dive into emotional depth, transformation, and authentic power through intimacy',
        'Sagittarius': 'their need to expand through adventure, truth-seeking, and philosophical growth',
        'Capricorn': 'their need to build lasting structures, embrace responsibility, and achieve through partnership',
        'Aquarius': 'their need to innovate, embrace uniqueness, and connect to collective ideals through relationship',
        'Pisces': 'their need to surrender, develop compassion, and dissolve boundaries through spiritual connection'
    };
    return meanings[sign];
}
