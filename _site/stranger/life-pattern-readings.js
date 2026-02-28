// ============================================
// LIFE PATTERN READINGS - 7 New Analytical Systems
// ============================================
// 1. Biological Timing (Saturn Return + Life Milestones)
// 2. Identity Compression (Universal Operating Style)
// 3. Life Pattern Probability Windows
// 4. Cognitive Tendencies
// 5. Archetypal Role Detection
// 6. Name Analysis (Phonetic + Linguistic)
// 7. Location Strategy (Simplified Astrocartography)
// ============================================

var LIFE_PATTERN_SYSTEMS = (function() {

// ============================================
// HELPER: Sign-to-index mapping
// ============================================
const SIGN_ORDER = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const ELEMENT_MAP = { Aries:'Fire', Taurus:'Earth', Gemini:'Air', Cancer:'Water', Leo:'Fire', Virgo:'Earth', Libra:'Air', Scorpio:'Water', Sagittarius:'Fire', Capricorn:'Earth', Aquarius:'Air', Pisces:'Water' };
const MODALITY_MAP = { Aries:'Cardinal', Taurus:'Fixed', Gemini:'Mutable', Cancer:'Cardinal', Leo:'Fixed', Virgo:'Mutable', Libra:'Cardinal', Scorpio:'Fixed', Sagittarius:'Mutable', Capricorn:'Cardinal', Aquarius:'Fixed', Pisces:'Mutable' };
const PLANET_RULERS = { Aries:'Mars', Taurus:'Venus', Gemini:'Mercury', Cancer:'Moon', Leo:'Sun', Virgo:'Mercury', Libra:'Venus', Scorpio:'Pluto', Sagittarius:'Jupiter', Capricorn:'Saturn', Aquarius:'Uranus', Pisces:'Neptune' };

function getSignName(signObj) {
    if (!signObj) return 'Unknown';
    return typeof signObj === 'string' ? signObj : (signObj.name || 'Unknown');
}

// ============================================
// 1. BIOLOGICAL TIMING SYSTEM
// ============================================
// Saturn Return detection + biological milestone mapping

const SATURN_RETURN_READINGS = {
    approaching: {
        title: "Approaching Saturn Return",
        keywords: ["Transition", "Pressure", "Foundation", "Accountability"],
        reading: "You are entering one of life's most defining passages — the Saturn Return. Between roughly ages 27 and 30, Saturn completes its first orbit back to the position it held at your birth. This is not a punishment. It is an audit.\n\nEverything you've built on shaky ground will be tested. Relationships that lack real commitment may end. Careers pursued to please others may suddenly feel unbearable. Habits that once seemed harmless start showing consequences. This is Saturn asking: \"Is this really yours, or are you borrowing someone else's life?\"\n\nThe pressure is real — but so is what emerges. People who lean into their Saturn Return often describe it as the period where they finally became themselves. The discomfort is a feature, not a bug.\n\nThe structures you build during this window tend to last decades. Choose deliberately.",
        strengths: ["Growing ability to distinguish authentic from inherited choices", "Increasing clarity about non-negotiable values", "Natural momentum toward accountability"],
        challenges: ["Temptation to resist the restructuring", "Grief over identities that no longer fit", "External pressure may peak before the breakthrough"],
        advice: "Don't cling to what's dissolving. Saturn isn't taking things away — it's revealing what was never truly yours. What remains after the audit is your real foundation."
    },
    active_first: {
        title: "First Saturn Return — The Great Restructuring",
        keywords: ["Identity Audit", "Adulthood", "Foundation Building", "Accountability"],
        reading: "You are in the thick of your first Saturn Return — one of the most consequential astrological transits a person can experience. Roughly between ages 28 and 30, Saturn returns to the exact degree it occupied when you were born, demanding a full accounting of the life you've built so far.\n\nThis is the astrological threshold of true adulthood. Not the legal kind — the existential kind. Saturn asks: \"What have you constructed? Is it real? Will it hold weight?\" Anything built on borrowed authority, inherited expectations, or avoidance will crack under this pressure.\n\nRelationships, careers, living situations, and identities all come under review. Some survive. Some don't. The ones that don't were never meant to be permanent — they were scaffolding, and now the building needs to stand on its own.\n\nThe people who navigate this well share one trait: they let go of what isn't working instead of white-knuckling it. The structures you lay down during this period — the commitments you make, the boundaries you set, the work you commit to — often define the next 29 years.\n\nThis isn't a crisis. It's a promotion. But promotions require you to leave the old role behind.",
        strengths: ["Profound clarity about what matters", "Ability to make lasting commitments", "Earned authority replacing borrowed confidence", "Deep self-knowledge emerging from pressure"],
        challenges: ["Identity upheaval — the old self must be released", "Possible endings in relationships or career", "Loneliness that comes from outgrowing familiar patterns", "Temptation to cling to comfort over truth"],
        advice: "Trust what's falling apart. Saturn doesn't destroy what's real — it destroys what's pretending to be. Build slowly now. What you establish here will carry you for decades."
    },
    between: {
        title: "Between Saturn Returns — The Building Years",
        keywords: ["Construction", "Mastery", "Purpose", "Long Game"],
        reading: "You are in the long, powerful stretch between Saturn Returns — roughly ages 30 to 56. This is the period where the blueprints laid during your first Saturn Return get turned into something real.\n\nAstrologically, these are the \"building years.\" Saturn has tested your foundations, and now you have roughly three decades to construct upon them. This is where mastery happens — not the flashy kind that comes from talent, but the unshakeable kind that comes from repetition, refinement, and refusal to quit.\n\nThere are sub-cycles within this window. Around age 36–37, Saturn squares its natal position — a midpoint check. Are you still aligned with the commitments you made? Around 42–44, Saturn opposes natal Saturn — the midlife opposition. This is where many people either recommit with deeper conviction or quietly begin rebuilding for the second return.\n\nThe key insight: this is not a linear climb. It's a series of plateaus with breakthrough moments. The people who thrive don't chase constant growth — they compound quietly, trust the process, and show up on the days when nothing seems to be happening.\n\nMost of what you'll be remembered for is built during this phase.",
        strengths: ["Established foundations from first Saturn Return", "Increasing mastery through sustained effort", "Growing influence and earned authority", "Clarity about strengths and limitations"],
        challenges: ["Complacency risk around age 35–40", "Midlife recalibration around 42–44", "Balancing ambition with sustainability", "The compound curve feels slow before it accelerates"],
        advice: "Stay disciplined. The mundane daily effort is the actual magic. Breakthroughs emerge from consistency, not inspiration."
    },
    approaching_second: {
        title: "Approaching Second Saturn Return",
        keywords: ["Legacy", "Wisdom", "Refinement", "Purpose 2.0"],
        reading: "You are approaching your second Saturn Return — roughly ages 56 to 60. If the first Saturn Return asked \"What are you building?\", the second asks \"What will you leave behind?\"\n\nThis is the legacy transit. Saturn returns for its second audit and the question shifts from construction to significance. The career achievements, relationships, and identities that defined your 30s and 40s are now examined through a different lens: depth, meaning, and impact.\n\nMany people experience this as a liberating simplification. Things that once felt essential — status markers, social obligations, the need to prove yourself — begin falling away. What remains is what genuinely matters. Some people launch entirely new chapters during their second Saturn Return. Others refine what they've built into its most essential form.\n\nThe second Saturn Return often brings a clarity that's impossible at 29. You've lived long enough to see what actually works, what endures, and what was always a distraction. This is earned wisdom — not the philosophical kind from books, but the embodied kind from decades of direct experience.\n\nThe question isn't whether you've accomplished enough. It's whether what you've accomplished reflects who you actually are.",
        strengths: ["Decades of accumulated experience and pattern recognition", "Freedom from needing external validation", "Clear sense of authentic priorities", "Ability to mentor and transmit hard-won wisdom"],
        challenges: ["Letting go of identities that served you for decades", "Confronting what was left unfinished", "Physical energy shifts requiring new strategies", "The gap between achievement and fulfillment"],
        advice: "Simplify ruthlessly. The second Saturn Return isn't about building more — it's about distilling everything down to what's truly essential. Your legacy is already in motion."
    },
    active_second: {
        title: "Second Saturn Return — The Legacy Threshold",
        keywords: ["Mastery", "Distillation", "Wisdom", "Final Authority"],
        reading: "You are living through your second Saturn Return — the most powerful transit of earned authority in astrology. Between roughly ages 58 and 60, Saturn completes its second full orbit, and the audit this time is not about what you're building. It's about what endures.\n\nIf you've done the work — if you built on truth, committed to mastery, and stayed aligned with your authentic path — this transit can feel like a coronation. The universe is acknowledging what you've constructed. You've earned the right to speak with authority, to simplify, to say no without explanation.\n\nIf parts of your life still rest on unresolved first-Saturn-Return patterns, they'll surface now. Not as punishment, but as a final invitation to resolve them. Saturn is thorough.\n\nMany people describe the years immediately following their second Saturn Return as some of the most liberated of their lives. The need to prove, perform, or accumulate fades. What remains is purpose — clear, uncluttered, and deeply personal.\n\nYou are entering the phase of life where wisdom isn't a concept. It's what you are.",
        strengths: ["Unshakeable self-knowledge", "Authority that doesn't need to be claimed", "Freedom from superficial obligations", "Capacity to transmit decades of integrated wisdom"],
        challenges: ["Releasing the need for relevance in old terms", "Adapting identity to a new phase", "The courage to simplify rather than accumulate"],
        advice: "Embrace the elder role. This isn't about retirement — it's about operating from mastery. The world needs what you've spent 60 years learning."
    },
    post_second: {
        title: "Beyond the Second Return — Sage Phase",
        keywords: ["Wisdom", "Transmission", "Transcendence", "Simplicity"],
        reading: "You have passed through both Saturn Returns — a rare accomplishment in the astrological lifecycle. You've been tested twice, restructured twice, and emerged with something that can't be manufactured: embodied wisdom.\n\nThis phase of life exists beyond the conventional Saturn cycle. Astrologically, you're operating in what some traditions call the \"sage phase\" — a period where external achievement becomes less relevant than internal coherence. The question is no longer what you'll build or what you'll leave behind. It's who you are when all the roles, titles, and identities are stripped away.\n\nMany people in this phase discover that their most profound impact comes not from what they do, but from who they are in a room. Presence replaces performance. Being replaces doing.\n\nThe statistical data supports this too — many of history's most influential figures did their most impactful work not at the height of their careers, but in their 60s, 70s, and beyond, when they stopped trying to impress and started simply transmitting what they knew.\n\nYou are the living library. Your experience is irreplaceable.",
        strengths: ["Complete self-knowledge", "Natural authority that requires no assertion", "Decades of pattern recognition", "Ability to see what others cannot yet perceive"],
        challenges: ["Staying engaged with a world that prizes youth", "Transmitting wisdom to those ready to receive it", "Maintaining vitality through purpose"],
        advice: "Your most important work may still be ahead. Many of humanity's greatest contributions came from people who refused to stop growing."
    }
};

const BIOLOGICAL_TIMING_PHASES = {
    exploration: {
        ageRange: "18–27",
        title: "The Exploration Phase",
        description: "Statistical models show this is when most people experiment with identity, career paths, and relationships. The brain's prefrontal cortex is still completing development until roughly age 25. Decisions made here feel permanent but are almost always provisional. Risk tolerance is naturally high — use it.",
        keywords: ["Experimentation", "Neural Plasticity", "Identity Sampling", "High Risk Tolerance"]
    },
    restructuring: {
        ageRange: "27–33",
        title: "The Restructuring Phase",
        description: "Population data shows a massive spike in major life changes between 27 and 33 — career shifts, relocations, relationship formalization or dissolution, and first serious commitments. This aligns with the first Saturn Return and with neurological maturation. You're not having a crisis — you're having a construction boom.",
        keywords: ["Foundation Building", "Identity Crystallization", "Major Decisions", "Commitment Formation"]
    },
    acceleration: {
        ageRange: "33–42",
        title: "The Acceleration Phase",
        description: "Research shows this is the peak decade for career advancement, income growth, and influence building. The combination of accumulated skill, established networks, and still-high energy creates compound returns. Entrepreneurial success rates peak in the late 30s (not the 20s, despite Silicon Valley mythology). This is when your preparation converts into visible results.",
        keywords: ["Compound Growth", "Peak Performance", "Network Leverage", "Visible Results"]
    },
    recalibration: {
        ageRange: "42–50",
        title: "The Recalibration Phase",
        description: "Data shows a second wave of major transitions around 42–50. This isn't a 'midlife crisis' — it's a midlife recalibration. Priorities shift from acquisition to meaning. Career pivots in this window are often the most successful long-term because they combine deep expertise with renewed purpose. The question shifts from 'Can I succeed?' to 'Does this matter?'",
        keywords: ["Purpose Refinement", "Meaning Over Achievement", "Strategic Pivots", "Depth Over Breadth"]
    },
    mastery: {
        ageRange: "50–60",
        title: "The Mastery Phase",
        description: "Cognitive research shows that while processing speed declines, crystallized intelligence — pattern recognition, judgment, synthesis — peaks in the 50s and beyond. This is the decade where decades of experience compound into genuine expertise. Many of history's most significant contributions were made by people in their 50s who finally had enough context to see the whole picture.",
        keywords: ["Crystallized Intelligence", "Pattern Recognition", "Expert Judgment", "Accumulated Wisdom"]
    },
    legacy: {
        ageRange: "60–75",
        title: "The Legacy Phase",
        description: "Statistical analysis shows that people who remain purposefully engaged after 60 show dramatically better cognitive, physical, and emotional health outcomes. This is the phase where teaching, mentoring, and transmitting accumulated knowledge creates the deepest impact. Legacy isn't about monuments — it's about transmission.",
        keywords: ["Wisdom Transmission", "Mentorship", "Purposeful Engagement", "Deep Impact"]
    },
    transcendence: {
        ageRange: "75+",
        title: "The Transcendence Phase",
        description: "Research on long-lived, high-functioning individuals consistently shows that the common factor isn't genetics or wealth — it's continued purpose and social connection. This phase is about distilling a lifetime of experience into its most essential form. Simplicity becomes the ultimate sophistication.",
        keywords: ["Essential Wisdom", "Radical Simplification", "Presence Over Performance", "Living Legacy"]
    }
};

function calculateBiologicalTiming(readings) {
    const age = readings.lifeCycles.age.years;
    const saturnSign = getSignName(readings.astrology.saturnSign);
    
    // Determine Saturn Return status
    // First Saturn Return: ~28-30, Second: ~57-60
    let saturnReturnStatus = 'between';
    let saturnReturnReading = null;
    
    if (age >= 25 && age < 28) {
        saturnReturnStatus = 'approaching';
    } else if (age >= 28 && age < 31) {
        saturnReturnStatus = 'active_first';
    } else if (age >= 31 && age < 55) {
        saturnReturnStatus = 'between';
    } else if (age >= 55 && age < 58) {
        saturnReturnStatus = 'approaching_second';
    } else if (age >= 58 && age < 61) {
        saturnReturnStatus = 'active_second';
    } else if (age >= 61) {
        saturnReturnStatus = 'post_second';
    } else {
        // Under 25 — approaching first
        saturnReturnStatus = 'approaching';
    }
    
    saturnReturnReading = SATURN_RETURN_READINGS[saturnReturnStatus];
    
    // Add Saturn sign context
    const saturnContext = `Saturn sits in ${saturnSign} in your birth chart. This means your Saturn Return themes are filtered through ${saturnSign} energy — the specific areas where life demands maturity, discipline, and authentic commitment from you. ${getSaturnSignFlavor(saturnSign)}`;
    
    // Determine current biological phase
    let currentPhase = null;
    if (age < 18) currentPhase = { title: "The Formation Phase", ageRange: "0–18", description: "You are still forming. Every experience is shaping the neural architecture that will define your adult operating system. The patterns being laid down now — in family, education, and early social life — will become the defaults you either build upon or consciously rewrite during your Saturn Return.", keywords: ["Neural Formation", "Pattern Imprinting", "Identity Seeds", "Potential Energy"] };
    else if (age < 27) currentPhase = BIOLOGICAL_TIMING_PHASES.exploration;
    else if (age < 33) currentPhase = BIOLOGICAL_TIMING_PHASES.restructuring;
    else if (age < 42) currentPhase = BIOLOGICAL_TIMING_PHASES.acceleration;
    else if (age < 50) currentPhase = BIOLOGICAL_TIMING_PHASES.recalibration;
    else if (age < 60) currentPhase = BIOLOGICAL_TIMING_PHASES.mastery;
    else if (age < 75) currentPhase = BIOLOGICAL_TIMING_PHASES.legacy;
    else currentPhase = BIOLOGICAL_TIMING_PHASES.transcendence;
    
    // Calculate years until next major transition
    const transitions = [18, 27, 29, 33, 42, 50, 58, 60, 75];
    const nextTransition = transitions.find(t => t > age);
    const yearsToNext = nextTransition ? nextTransition - age : null;
    
    return {
        saturnReturn: {
            status: saturnReturnStatus,
            reading: saturnReturnReading,
            saturnSign: saturnSign,
            context: saturnContext
        },
        currentPhase: currentPhase,
        age: age,
        yearsToNextTransition: yearsToNext,
        nextTransitionAge: nextTransition
    };
}

function getSaturnSignFlavor(sign) {
    const flavors = {
        Aries: "Your Saturn in Aries means your deepest lessons revolve around patience, impulse control, and learning that true leadership means earning authority rather than seizing it. You may have experienced early frustrations around asserting yourself — either being told you were 'too much' or feeling blocked every time you tried to lead. The Saturn Return restructures your relationship with anger, initiative, and personal power. When mature, Saturn in Aries produces leaders of extraordinary discipline who combine courage with restraint — generals, not soldiers.",
        Taurus: "Your Saturn in Taurus means your deepest lessons center on material security, self-worth independent of possessions, and building something that endures beyond mere comfort. You may have experienced early scarcity or an unstable relationship with money and resources that made security feel like it required constant vigilance. The Saturn Return restructures your relationship with value — what you're worth, what's worth having, what endures. When mature, Saturn in Taurus produces people of remarkable financial wisdom and an almost architectural sense of lasting value.",
        Gemini: "Your Saturn in Gemini means your deepest lessons involve depth over breadth, committing to ideas long enough to master them, and learning that real communication requires listening as much as speaking. You may have felt intellectually inadequate early on, or scattered across too many interests to develop expertise in any. The Saturn Return forces a reckoning with intellectual discipline — choosing your lanes and going deep. When mature, Saturn in Gemini produces the most rigorous communicators and thinkers — people who combine broad knowledge with genuine depth.",
        Cancer: "Your Saturn in Cancer means your deepest lessons touch emotional boundaries, the difference between caretaking and controlling, and building inner security that doesn't depend on others' approval or presence. You may have experienced emotional coldness or unavailability from caretakers, creating a pattern of either walls or over-attachment. The Saturn Return restructures your entire emotional foundation — how you give care, receive care, and define home. When mature, Saturn in Cancer produces people of extraordinary emotional strength who provide genuine security to others without losing themselves.",
        Leo: "Your Saturn in Leo means your deepest lessons address authentic self-expression, ego maturity, and discovering that true recognition comes from substance rather than performance. You may have been shamed for wanting attention, or felt invisible despite desperate efforts to be seen. The Saturn Return forces you to find the difference between seeking applause and expressing your genuine creative identity. When mature, Saturn in Leo produces quietly commanding presences — people who don't need the spotlight because they carry their own light.",
        Virgo: "Your Saturn in Virgo means your deepest lessons involve perfectionism, the courage to be 'good enough,' and understanding that service without burnout requires boundaries. You may have internalized impossibly high standards early — either imposed from outside or self-generated — creating an exhausting cycle of effort and self-criticism. The Saturn Return restructures your relationship with competence and service, teaching you that excellence is sustainable only when paired with self-compassion. When mature, Saturn in Virgo produces the most skilled and reliable practitioners in any field — masters of craft who've made peace with imperfection.",
        Libra: "Your Saturn in Libra means your deepest lessons center on authentic relationships, the courage to disagree, and building partnerships based on truth rather than harmony at any cost. You may have learned early that keeping the peace required suppressing your own needs, creating relationships that looked good but felt hollow. The Saturn Return forces a reckoning with relational authenticity — you learn that real partnership requires conflict, negotiation, and the willingness to be disliked. When mature, Saturn in Libra produces exceptional mediators, negotiators, and partners who build relationships of genuine depth and mutual respect.",
        Scorpio: "Your Saturn in Scorpio means your deepest lessons address power dynamics, vulnerability as strength, and the transformation that comes from releasing control. You may have encountered power abuse, betrayal, or emotional intensity early that taught you to never let your guard down. The Saturn Return forces you through the fire — demanding that you face your deepest fears, release control where it's not serving you, and discover that true power comes from being unafraid of your own depths. When mature, Saturn in Scorpio produces people of almost frightening psychological clarity and resilience — they've been through the underworld and came back with wisdom.",
        Sagittarius: "Your Saturn in Sagittarius means your deepest lessons involve intellectual humility, committing to one path long enough to go deep, and finding meaning through discipline rather than escape. You may have experienced restriction around freedom, travel, or belief systems — feeling trapped in environments too small for your vision. The Saturn Return forces a reckoning with your philosophy of life, demanding that you move from theoretical meaning to lived wisdom. When mature, Saturn in Sagittarius produces profound teachers and thought leaders who combine visionary thinking with practical grounding — they don't just believe, they build upon their beliefs.",
        Capricorn: "Saturn is at home in Capricorn — your lessons are intensified around ambition, authority, and the difference between achievement and fulfillment. You may have felt an overwhelming pressure to succeed from a very young age, as if your worth was contingent on your accomplishments. The Saturn Return is particularly powerful here, often coinciding with either a major professional breakthrough or a complete dismantling of your achievement structure to rebuild on more authentic foundations. When mature, Saturn in Capricorn produces people of exceptional authority and institutional vision — the builders of things that outlast generations.",
        Aquarius: "Your Saturn in Aquarius means your deepest lessons center on individuality within community, the responsibility of innovation, and learning that rebellion without construction is just noise. You may have felt like an outsider — too different for conventional groups, too structured for countercultural ones. The Saturn Return forces you to reconcile your individuality with your need for community, teaching you that true innovation requires both vision and the patience to build systems that support it. When mature, Saturn in Aquarius produces revolutionary builders — people who don't just imagine a better world but create the infrastructure for it.",
        Pisces: "Your Saturn in Pisces means your deepest lessons involve boundaries between self and others, grounding spiritual ideals in practical action, and finding structure within flow. You may have struggled with feeling overwhelmed by others' emotions, difficulty distinguishing your feelings from the collective, or a sense that spiritual life and practical life were incompatible. The Saturn Return forces you to build the container for your sensitivity — learning that boundaries aren't walls, they're the banks of the river that give your flow direction. When mature, Saturn in Pisces produces healers, artists, and spiritual guides of extraordinary depth who've learned to channel the infinite through disciplined practice."
    };
    return flavors[sign] || "";
}


// ============================================
// 2. IDENTITY COMPRESSION SYSTEM
// ============================================
// Synthesizes all placements into a single operating style

const OPERATING_STYLES = {
    builder: {
        title: "The Builder",
        subtitle: "Construct. Fortify. Endure.",
        keywords: ["Structure", "Persistence", "Reliability", "Tangible Results"],
        reading: "Your chart converges on a single operating mode: construction. You are wired to take abstract ideas, raw materials, and chaotic situations and turn them into something solid, lasting, and real.\n\nBuilders don't just create — they create things that endure. While others chase novelty, you are compounding. While others start over, you are reinforcing. This isn't a limitation — it's a superpower that most people don't have the patience to develop.\n\nThe Builder's strength is that everything they touch becomes more organized, more reliable, and more valuable over time. The challenge is knowing when a structure has served its purpose and needs to be released rather than endlessly maintained.\n\nYour natural rhythm: slow starts, massive finishes. Most Builders are dramatically underestimated in their 20s and dramatically successful in their 40s. The compound curve is your best friend — trust it.",
        strengths: ["Creates lasting value from raw materials", "Exceptional follow-through and reliability", "Grows stronger under pressure", "Compound growth over decades"],
        challenges: ["Rigidity when flexibility is needed", "Over-investing in structures past their usefulness", "Slow to adapt to sudden changes", "May undervalue innovation for stability"]
    },
    pioneer: {
        title: "The Pioneer",
        subtitle: "Initiate. Disrupt. Lead.",
        keywords: ["Innovation", "Courage", "Independence", "First-Mover"],
        reading: "Your chart converges on a single operating mode: initiation. You are wired to go first — to enter spaces nobody has mapped, to start things that don't yet have names, and to move before the data is complete.\n\nPioneers don't follow playbooks. They write them. This means you'll spend a lot of time being misunderstood, dismissed, or told your ideas are 'too early.' That's fine. Being too early is the Pioneer's job description.\n\nThe Pioneer's strength is vision paired with action. You don't just see what's possible — you move toward it before others even recognize it as an option. The challenge is finishing what you start. Pioneers are ignition systems, not maintenance crews.\n\nYour natural rhythm: fast starts, high intensity, followed by a need to hand off and move to the next frontier. The smartest Pioneers learn to build teams that can sustain what they've started.",
        strengths: ["Natural first-mover in uncharted territory", "Courage to act before certainty", "Inspires others through visible boldness", "Thrives in uncertainty"],
        challenges: ["May abandon projects before they mature", "Impulsive decision-making", "Difficulty with routine maintenance", "May confuse action with progress"]
    },
    stabilizer: {
        title: "The Stabilizer",
        subtitle: "Anchor. Sustain. Protect.",
        keywords: ["Consistency", "Protection", "Depth", "Emotional Intelligence"],
        reading: "Your chart converges on a single operating mode: stabilization. You are wired to bring calm to chaos, depth to superficiality, and consistency to volatile environments.\n\nStabilizers are the people others unconsciously seek during crisis. Not because you fix things dramatically, but because your presence makes the turbulence bearable. You are the anchor — and anchors don't need to move fast to be indispensable.\n\nThe Stabilizer's strength is sustained reliability. You show up. You follow through. You hold space when others collapse. This creates a compound trust that becomes your greatest asset in relationships, career, and community.\n\nYour natural rhythm: slow to engage, but once committed, almost impossible to dislodge. Stabilizers build the deepest relationships and the most resilient organizations — but only if they choose wisely what to stabilize.",
        strengths: ["Creates psychological safety for others", "Unmatched follow-through", "Deep emotional intelligence", "Builds trust over time that others cannot replicate"],
        challenges: ["Over-attachment to the status quo", "Difficulty releasing what no longer serves", "May sacrifice growth for comfort", "Can become the caretaker who neglects themselves"]
    },
    disruptor: {
        title: "The Disruptor",
        subtitle: "Question. Transform. Rebuild.",
        keywords: ["Transformation", "Intensity", "Truth-Seeking", "Evolution"],
        reading: "Your chart converges on a single operating mode: disruption. You are wired to see what isn't working, name it, and dismantle it — often before others are ready to hear it.\n\nDisruptors are not popular in the moment. They are vindicated in retrospect. Your role is to be the catalyst for necessary change — the person who asks the question everyone is avoiding, who points to the crack in the foundation before the building collapses.\n\nThe Disruptor's strength is perception. You see beneath the surface. You detect dishonesty, misalignment, and unsustainable patterns before they become crises. This makes you invaluable — and sometimes uncomfortable to be around.\n\nYour natural rhythm: long periods of observation, followed by decisive action that changes everything. The smartest Disruptors learn to time their interventions — not every truth needs to be spoken in every room.",
        strengths: ["Sees what others miss or avoid", "Catalyzes necessary change", "Fearless in confronting dysfunction", "Creates space for authentic transformation"],
        challenges: ["May destabilize what doesn't need disrupting", "Intensity can alienate allies", "Difficulty accepting incremental progress", "The urge to rebuild can become compulsive"]
    },
    synthesizer: {
        title: "The Synthesizer",
        subtitle: "Connect. Translate. Integrate.",
        keywords: ["Integration", "Communication", "Versatility", "Bridge-Building"],
        reading: "Your chart converges on a single operating mode: synthesis. You are wired to take information from multiple domains, find the hidden connections, and create something that no single source could produce.\n\nSynthesizers are the translators of the world. You speak multiple 'languages' — not necessarily linguistic ones, but conceptual, emotional, and professional ones. You understand the engineer AND the artist. You see how the financial model connects to the human story. You bridge gaps that others don't even know exist.\n\nThe Synthesizer's strength is versatility without shallowness. Unlike a generalist who knows a little about everything, you understand the deep structure that connects different domains. This makes you the most adaptive operating style — and the hardest to replace.\n\nYour natural rhythm: wide intake, followed by integration periods where the connections crystallize. Your best ideas usually come from combining two things that nobody thought belonged together.",
        strengths: ["Sees connections across domains", "Translates complex ideas for different audiences", "Exceptional adaptability", "Creates novel solutions from existing parts"],
        challenges: ["May struggle to specialize deeply enough", "Decision paralysis from seeing all sides", "Others may undervalue versatility", "The integration process needs solitude"]
    },
    strategist: {
        title: "The Strategist",
        subtitle: "Analyze. Position. Execute.",
        keywords: ["Planning", "Long-Term Vision", "Precision", "Calculated Risk"],
        reading: "Your chart converges on a single operating mode: strategy. You are wired to think three moves ahead, to position before executing, and to win through preparation rather than force.\n\nStrategists don't react — they anticipate. While others are solving today's problem, you're already mapping next year's landscape. This creates a persistent advantage that compounds over time: by the time others see the opportunity, you've already positioned yourself.\n\nThe Strategist's strength is patience paired with precision. You're willing to wait for the right moment — and when it arrives, your execution is decisive because you've already planned for every contingency.\n\nYour natural rhythm: long observation and planning phases, followed by concentrated action with outsized results. You win fewer battles than the Pioneer but lose far fewer. Over decades, this is the most efficient path to sustainable success.",
        strengths: ["Exceptional long-term planning", "Precise risk calculation", "Patient execution", "Compound advantage from positioning"],
        challenges: ["Over-analysis can delay action", "May miss opportunities that require spontaneity", "Can be perceived as cold or calculating", "Perfectionism in planning can prevent starting"]
    },
    visionary: {
        title: "The Visionary",
        subtitle: "Imagine. Inspire. Elevate.",
        keywords: ["Inspiration", "Possibility", "Creativity", "Future-Orientation"],
        reading: "Your chart converges on a single operating mode: vision. You are wired to see what doesn't yet exist, to imagine possibilities that others dismiss as impossible, and to inspire people toward futures they can't yet picture.\n\nVisionaries live slightly ahead of their time. The ideas that come naturally to you often take years — sometimes decades — to become mainstream. This can be isolating, but it's also your gift. You're not seeing things that aren't there; you're seeing things before they arrive.\n\nThe Visionary's strength is inspirational gravity. People are drawn to your clarity of vision even when they can't fully articulate why. You make the impossible feel inevitable.\n\nYour natural rhythm: long periods of internal gestation where ideas develop, followed by moments of clarity that seem to arrive fully formed. The trick is learning to communicate your visions in terms others can act on — translation is the Visionary's most important secondary skill.",
        strengths: ["Sees possibilities before they're obvious", "Natural ability to inspire and elevate others", "Creative solutions from unconventional thinking", "Long-term perspective that transcends current limitations"],
        challenges: ["Ideas may be 'too early' for the market or audience", "Difficulty with tactical execution", "Impatience with those who can't see the vision", "May neglect present realities for future possibilities"]
    },
    operator: {
        title: "The Operator",
        subtitle: "Execute. Optimize. Deliver.",
        keywords: ["Execution", "Efficiency", "Pragmatism", "Results-Driven"],
        reading: "Your chart converges on a single operating mode: operation. You are wired to take plans, systems, and visions and make them actually work in the real world.\n\nOperators are the most underrated operating style — and the most indispensable. Every Pioneer needs an Operator to sustain what they started. Every Visionary needs an Operator to manifest what they imagined. You are the bridge between intention and reality.\n\nThe Operator's strength is execution without ego. You don't need the idea to be yours — you need it to work. This pragmatism makes you extraordinarily effective because you're optimizing for results rather than credit.\n\nYour natural rhythm: steady, consistent output with continuous optimization. You don't have dramatic peaks and valleys — you have a relentless upward trajectory built on accumulated improvements. This is the operating style that scales.",
        strengths: ["Translates vision into reality", "Continuous improvement mindset", "Pragmatic problem-solving", "Reliable delivery under pressure"],
        challenges: ["May undervalue creativity for efficiency", "Risk of optimizing systems that should be replaced", "Can become trapped in execution without questioning direction", "Burnout from being the 'make it work' person"]
    }
};

function calculateIdentityCompression(readings) {
    const scores = {
        builder: 0, pioneer: 0, stabilizer: 0, disruptor: 0,
        synthesizer: 0, strategist: 0, visionary: 0, operator: 0
    };
    
    const sunSign = getSignName(readings.astrology.sunSign);
    const moonSign = getSignName(readings.astrology.moonSign);
    const risingSign = getSignName(readings.astrology.risingSign);
    const mercurySign = getSignName(readings.astrology.mercurySign);
    const venusSign = getSignName(readings.astrology.venusSign);
    const marsSign = getSignName(readings.astrology.marsSign);
    const saturnSign = getSignName(readings.astrology.saturnSign);
    const jupiterSign = getSignName(readings.astrology.jupiterSign);
    const lifePath = readings.numerology.lifePath;
    
    // Element scoring (3x weight for Sun, 2x Moon, 2x Rising, 1.5x Venus, 1x rest)
    const allSigns = [
        { sign: sunSign, w: 3 }, { sign: moonSign, w: 2 }, { sign: risingSign, w: 2 },
        { sign: venusSign, w: 1.5 }, { sign: mercurySign, w: 1 }, { sign: marsSign, w: 1.5 }, { sign: saturnSign, w: 1 }, { sign: jupiterSign, w: 1 }
    ];
    
    const elementTally = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
    const modalityTally = { Cardinal: 0, Fixed: 0, Mutable: 0 };
    
    allSigns.forEach(({ sign, w }) => {
        if (ELEMENT_MAP[sign]) elementTally[ELEMENT_MAP[sign]] += w;
        if (MODALITY_MAP[sign]) modalityTally[MODALITY_MAP[sign]] += w;
    });
    
    // Element → style mapping
    scores.pioneer += elementTally.Fire * 1.5;
    scores.disruptor += elementTally.Fire * 0.8;
    scores.builder += elementTally.Earth * 1.5;
    scores.operator += elementTally.Earth * 1.2;
    scores.synthesizer += elementTally.Air * 1.5;
    scores.strategist += elementTally.Air * 1.0;
    scores.stabilizer += elementTally.Water * 1.5;
    scores.visionary += elementTally.Water * 0.8;
    
    // Modality → style mapping
    scores.pioneer += modalityTally.Cardinal * 1.5;
    scores.strategist += modalityTally.Cardinal * 1.0;
    scores.stabilizer += modalityTally.Fixed * 1.2;
    scores.builder += modalityTally.Fixed * 1.5;
    scores.synthesizer += modalityTally.Mutable * 1.5;
    scores.visionary += modalityTally.Mutable * 1.0;
    
    // Life Path → style mapping
    const lpMap = {
        1: ['pioneer', 'disruptor'], 2: ['stabilizer', 'synthesizer'], 3: ['visionary', 'synthesizer'],
        4: ['builder', 'operator'], 5: ['disruptor', 'pioneer'], 6: ['stabilizer', 'operator'],
        7: ['strategist', 'visionary'], 8: ['operator', 'builder'], 9: ['visionary', 'synthesizer'],
        11: ['visionary', 'disruptor'], 22: ['builder', 'strategist'], 33: ['stabilizer', 'visionary']
    };
    const lpStyles = lpMap[lifePath] || lpMap[lifePath % 9 || 9] || ['synthesizer'];
    lpStyles.forEach((s, i) => { scores[s] += (i === 0 ? 4 : 2); });
    
    // Mars sign boosts (action style)
    if (['Aries','Sagittarius'].includes(marsSign)) { scores.pioneer += 2; scores.disruptor += 1; }
    if (['Taurus','Capricorn','Virgo'].includes(marsSign)) { scores.builder += 2; scores.operator += 1; }
    if (['Gemini','Libra','Aquarius'].includes(marsSign)) { scores.synthesizer += 2; scores.strategist += 1; }
    if (['Cancer','Scorpio','Pisces'].includes(marsSign)) { scores.stabilizer += 1; scores.visionary += 2; }
    
    // Saturn sign modifiers (discipline style)
    if (['Capricorn','Virgo','Taurus'].includes(saturnSign)) { scores.builder += 2; scores.operator += 1; }
    if (['Scorpio','Aries','Leo'].includes(saturnSign)) { scores.disruptor += 1.5; }
    if (['Aquarius','Gemini','Sagittarius'].includes(saturnSign)) { scores.strategist += 1.5; scores.visionary += 1; }
    
    // Venus sign modifiers (values & relational style)
    if (['Taurus','Cancer','Pisces'].includes(venusSign)) { scores.stabilizer += 2; }
    if (['Aries','Sagittarius','Aquarius'].includes(venusSign)) { scores.disruptor += 1; scores.pioneer += 1; }
    if (['Gemini','Libra'].includes(venusSign)) { scores.synthesizer += 1.5; }
    if (['Capricorn','Virgo'].includes(venusSign)) { scores.operator += 1.5; }
    if (['Scorpio'].includes(venusSign)) { scores.strategist += 1; scores.visionary += 1; }
    if (['Leo'].includes(venusSign)) { scores.pioneer += 1; }
    
    // Rising sign modifiers (instinctive operating mode)
    if (['Aries','Sagittarius'].includes(risingSign)) { scores.pioneer += 2; }
    if (['Taurus','Virgo','Capricorn'].includes(risingSign)) { scores.builder += 1.5; scores.operator += 1; }
    if (['Gemini','Libra','Aquarius'].includes(risingSign)) { scores.synthesizer += 1.5; }
    if (['Cancer','Pisces'].includes(risingSign)) { scores.stabilizer += 1.5; }
    if (['Scorpio'].includes(risingSign)) { scores.strategist += 1.5; scores.disruptor += 1; }
    if (['Leo'].includes(risingSign)) { scores.pioneer += 1; scores.visionary += 1; }
    
    // Stellium boost
    if (readings.astrology.stelliums && readings.astrology.stelliums.length > 0) {
        readings.astrology.stelliums.forEach(st => {
            const stElement = ELEMENT_MAP[getSignName(st)] || ELEMENT_MAP[st.sign] || null;
            if (stElement === 'Earth') scores.builder += 3;
            if (stElement === 'Fire') scores.pioneer += 3;
            if (stElement === 'Air') scores.synthesizer += 3;
            if (stElement === 'Water') scores.visionary += 3;
        });
    }
    
    // Find top style
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = sorted[0][0];
    const secondary = sorted[1][0];
    const primaryScore = sorted[0][1];
    const secondaryScore = sorted[1][1];
    
    // If top two are close, it's a hybrid
    const isHybrid = (primaryScore - secondaryScore) < 4;
    
    return {
        primary: primary,
        secondary: secondary,
        isHybrid: isHybrid,
        scores: scores,
        reading: OPERATING_STYLES[primary],
        secondaryReading: OPERATING_STYLES[secondary],
        elementBalance: elementTally,
        modalityBalance: modalityTally
    };
}


// ============================================
// 3. LIFE PATTERN PROBABILITY WINDOWS
// ============================================

const PROBABILITY_WINDOWS = {
    careerShift: {
        title: "Career Shift Probability",
        icon: "💼",
        highWindows: [
            { age: "27–31", reason: "Saturn Return restructuring — highest probability of career pivot", probability: "Very High" },
            { age: "37–40", reason: "Saturn square — midcycle career audit, many pivot to leadership or independence", probability: "High" },
            { age: "42–45", reason: "Uranus opposition + Saturn opposition — midlife professional reinvention", probability: "Very High" },
            { age: "56–60", reason: "Second Saturn Return — final career distillation or transition to advisory/mentorship", probability: "High" }
        ]
    },
    marriage: {
        title: "Partnership Formation Probability",
        icon: "💍",
        highWindows: [
            { age: "25–30", reason: "Jupiter return (~24) plus Saturn maturation — readiness for genuine commitment", probability: "Very High" },
            { age: "35–38", reason: "Post first Saturn Return stability — many form partnerships from authentic choice", probability: "High" },
            { age: "42–46", reason: "Midlife recalibration — second partnerships or renewal of existing ones", probability: "Moderate" }
        ]
    },
    entrepreneurship: {
        title: "Entrepreneurial Success Window",
        icon: "🚀",
        highWindows: [
            { age: "31–36", reason: "Post Saturn Return foundations + peak energy + growing expertise. Research shows average successful founder age is 45, but momentum starts here.", probability: "High" },
            { age: "38–45", reason: "Peak statistical window — Harvard/MIT research shows highest entrepreneurial success rates. Maximum intersection of expertise, network, and capital.", probability: "Very High" },
            { age: "50–58", reason: "Encore entrepreneurship — built on mastery and industry connections, lower failure rates", probability: "High" }
        ]
    },
    relocation: {
        title: "Relocation Probability",
        icon: "🌍",
        highWindows: [
            { age: "18–24", reason: "Education and early career — highest geographic mobility in lifetime", probability: "Very High" },
            { age: "28–32", reason: "Saturn Return — many relocate to align environment with authentic identity", probability: "High" },
            { age: "42–48", reason: "Midlife recalibration — lifestyle-driven relocations peak", probability: "Moderate" },
            { age: "60–67", reason: "Post-career relocation — simplification and lifestyle optimization", probability: "Moderate" }
        ]
    },
    reinvention: {
        title: "Psychological Reinvention",
        icon: "🔄",
        highWindows: [
            { age: "28–30", reason: "First Saturn Return — the original identity audit. Who you were at 25 and who you are at 31 are often different people.", probability: "Very High" },
            { age: "38–42", reason: "Pluto square + Neptune square — deep unconscious material surfaces demanding integration", probability: "High" },
            { age: "44–48", reason: "Uranus opposition — the 'wake-up call' transit. Whatever you've been suppressing insists on expression.", probability: "Very High" },
            { age: "58–60", reason: "Second Saturn Return — the final identity distillation. Who are you when you stop performing?", probability: "High" }
        ]
    },
    financialExpansion: {
        title: "Financial Expansion Windows",
        icon: "💰",
        highWindows: [
            { age: "33–42", reason: "Peak earning growth rate — compound skills + expanding network + maximum energy", probability: "Very High" },
            { age: "48–55", reason: "Peak absolute earnings for most professions — authority + expertise + positioning", probability: "High" },
            { age: "55–65", reason: "Wealth consolidation and passive income transition — decades of compound growth materialize", probability: "Moderate" }
        ]
    },
    burnout: {
        title: "Burnout Risk Windows",
        icon: "🔥",
        highWindows: [
            { age: "26–29", reason: "Pre-Saturn Return intensity — trying to 'make it' before the deadline you feel but can't name", probability: "High" },
            { age: "34–38", reason: "Post-Saturn ambition acceleration — overcommitment during the building years", probability: "High" },
            { age: "42–46", reason: "Midlife recalibration resistance — burnout often signals meaning has drained from the structure", probability: "Very High" },
            { age: "55–58", reason: "Pre-second Saturn Return — accumulated decades of unexamined patterns", probability: "Moderate" }
        ]
    }
};

function calculateProbabilityWindows(readings) {
    const age = readings.lifeCycles.age.years;
    const results = {};
    
    // Extract chart factors for personalization
    const marsSign = getSignName(readings.astrology.marsSign);
    const saturnSign = getSignName(readings.astrology.saturnSign);
    const jupiterSign = getSignName(readings.astrology.jupiterSign);
    const venusSign = getSignName(readings.astrology.venusSign);
    const moonSign = getSignName(readings.astrology.moonSign);
    const sunSign = getSignName(readings.astrology.sunSign);
    const mcSign = getSignName(readings.astrology.midheaven);
    const risingSign = getSignName(readings.astrology.risingSign);
    const lifePath = readings.numerology.lifePath;
    const marsElement = ELEMENT_MAP[marsSign] || '';
    const saturnElement = ELEMENT_MAP[saturnSign] || '';
    const jupiterElement = ELEMENT_MAP[jupiterSign] || '';
    const moonElement = ELEMENT_MAP[moonSign] || '';
    const mcModality = MODALITY_MAP[mcSign] || '';
    
    // Chart-based probability modifiers per category
    const chartModifiers = {};
    
    // CAREER SHIFT modifiers
    let careerMod = 0;
    let careerInsight = '';
    if (mcModality === 'Cardinal') { careerMod += 2; careerInsight += `Your Cardinal Midheaven (${mcSign}) makes you naturally inclined toward initiating career changes rather than enduring stagnation. `; }
    else if (mcModality === 'Fixed') { careerMod -= 1; careerInsight += `Your Fixed Midheaven (${mcSign}) means career shifts take longer to gestate but tend to be more permanent and well-considered. `; }
    else if (mcModality === 'Mutable') { careerMod += 1; careerInsight += `Your Mutable Midheaven (${mcSign}) gives you career adaptability — you shift naturally through evolution rather than revolution. `; }
    if (marsElement === 'Fire') { careerMod += 1; careerInsight += `Mars in a fire sign (${marsSign}) adds impulsive career energy — you act on professional dissatisfaction faster than most. `; }
    if ([1, 5].includes(lifePath)) { careerMod += 1; careerInsight += `Life Path ${lifePath} amplifies your change-readiness — you get restless in careers that stop challenging you. `; }
    if ([4, 6].includes(lifePath)) { careerMod -= 1; careerInsight += `Life Path ${lifePath} adds career loyalty — you tend to optimize within existing structures before pivoting. `; }
    if (saturnElement === 'Earth') { careerMod -= 1; careerInsight += `Saturn in an earth sign (${saturnSign}) adds professional conservatism — your career shifts are deliberate, never impulsive. `; }
    chartModifiers.careerShift = { modifier: careerMod, insight: careerInsight.trim() };
    
    // MARRIAGE/PARTNERSHIP modifiers
    let marriageMod = 0;
    let marriageInsight = '';
    if (['Libra','Taurus'].includes(venusSign)) { marriageMod += 2; marriageInsight += `Venus in ${venusSign} (one of Venus's home signs) strongly inclines you toward committed partnership — your probability windows are amplified. `; }
    else if (['Aries','Scorpio','Aquarius'].includes(venusSign)) { marriageMod -= 1; marriageInsight += `Venus in ${venusSign} values autonomy in love — you may form partnerships later or need unconventional structures. `; }
    if (['Cancer','Libra','Pisces'].includes(moonSign)) { marriageMod += 1; marriageInsight += `Moon in ${moonSign} deepens your need for emotional partnership — you seek bonding more actively than most. `; }
    if (['Aquarius','Sagittarius','Aries'].includes(moonSign)) { marriageMod -= 1; marriageInsight += `Moon in ${moonSign} needs significant freedom within partnership — commitment may happen later or take unconventional forms. `; }
    if ([2, 6].includes(lifePath)) { marriageMod += 2; marriageInsight += `Life Path ${lifePath} is fundamentally partnership-oriented — your entire life trajectory bends toward finding and maintaining deep connection. `; }
    if ([1, 7].includes(lifePath)) { marriageMod -= 1; marriageInsight += `Life Path ${lifePath} is independence-focused — partnerships form when they serve growth, not social expectation. `; }
    chartModifiers.marriage = { modifier: marriageMod, insight: marriageInsight.trim() };
    
    // ENTREPRENEURSHIP modifiers
    let entreprMod = 0;
    let entreprInsight = '';
    if (marsElement === 'Fire') { entreprMod += 2; entreprInsight += `Mars in ${marsSign} gives you entrepreneurial fire — you have the drive, risk tolerance, and competitive instinct that startups demand. `; }
    else if (marsElement === 'Earth') { entreprMod += 1; entreprInsight += `Mars in ${marsSign} favors entrepreneurship through methodical execution — you build businesses that last, not flash-in-the-pan ventures. `; }
    if (['Sagittarius','Aries','Leo'].includes(jupiterSign)) { entreprMod += 1; entreprInsight += `Jupiter in ${jupiterSign} amplifies entrepreneurial luck and expansion — opportunities tend to appear when you commit to independence. `; }
    if ([1, 8].includes(lifePath)) { entreprMod += 2; entreprInsight += `Life Path ${lifePath} is the classic entrepreneurial path — you're wired to build something that bears your signature. `; }
    if ([22].includes(lifePath)) { entreprMod += 2; entreprInsight += `Life Path 22 (Master Builder) has the highest entrepreneurial ceiling of any Life Path — you're capable of building at institutional scale. `; }
    if (['Capricorn','Aries','Scorpio'].includes(mcSign)) { entreprMod += 1; entreprInsight += `Your ${mcSign} Midheaven supports entrepreneurial authority — you're credible as a founder, not just an employee. `; }
    if ([4, 6].includes(lifePath)) { entreprMod -= 1; entreprInsight += `Life Path ${lifePath} may prefer entrepreneurship within structures (intrapreneurship, franchising) over high-risk startups. `; }
    chartModifiers.entrepreneurship = { modifier: entreprMod, insight: entreprInsight.trim() };
    
    // RELOCATION modifiers
    let relocMod = 0;
    let relocInsight = '';
    const moonModality = MODALITY_MAP[moonSign] || '';
    if (moonModality === 'Mutable') { relocMod += 2; relocInsight += `Your Mutable Moon (${moonSign}) craves environmental variety — you're emotionally energized by new places and grow restless when rooted too long. `; }
    else if (moonModality === 'Fixed') { relocMod -= 2; relocInsight += `Your Fixed Moon (${moonSign}) creates deep roots wherever you land — relocations are emotionally costly and require strong motivation. `; }
    if (['Sagittarius','Gemini'].includes(jupiterSign)) { relocMod += 1; relocInsight += `Jupiter in ${jupiterSign} expands through travel and cross-cultural experience — relocation often brings your biggest growth. `; }
    if ([5].includes(lifePath)) { relocMod += 2; relocInsight += `Life Path 5 is the nomadic path — multiple relocations are not just likely, they're essential to your development. `; }
    if ([4].includes(lifePath)) { relocMod -= 1; relocInsight += `Life Path 4 builds through stability — relocations work best when they serve a long-term structural plan, not restlessness. `; }
    if (['Cancer','Taurus'].includes(moonSign)) { relocMod -= 1; relocInsight += `Moon in ${moonSign} needs environmental continuity — if you relocate, maintaining emotional anchors (objects, rituals, people) is critical. `; }
    chartModifiers.relocation = { modifier: relocMod, insight: relocInsight.trim() };
    
    // REINVENTION modifiers
    let reinventMod = 0;
    let reinventInsight = '';
    if (['Scorpio'].includes(sunSign) || ['Scorpio'].includes(risingSign)) { reinventMod += 2; reinventInsight += `Scorpio prominent in your chart (${['Scorpio'].includes(sunSign) ? 'Sun' : 'Rising'}) makes psychological reinvention not just likely but necessary — you cycle through identities as a core life pattern. `; }
    if (['Aquarius','Sagittarius'].includes(sunSign)) { reinventMod += 1; reinventInsight += `Your ${sunSign} Sun resists identity stagnation — reinvention comes naturally when your current self no longer matches your evolving vision. `; }
    if ([5, 7, 9].includes(lifePath)) { reinventMod += 2; reinventInsight += `Life Path ${lifePath} undergoes more reinvention cycles than average — identity is not a fixed destination for you, it's an ongoing experiment. `; }
    if ([4, 8].includes(lifePath)) { reinventMod -= 1; reinventInsight += `Life Path ${lifePath} reinvents through accumulation rather than demolition — you add layers rather than shedding old ones. `; }
    if (['Scorpio','Pisces','Cancer'].includes(moonSign)) { reinventMod += 1; reinventInsight += `Your water Moon (${moonSign}) processes reinvention emotionally and deeply — transformations take time but penetrate to the core. `; }
    chartModifiers.reinvention = { modifier: reinventMod, insight: reinventInsight.trim() };
    
    // FINANCIAL EXPANSION modifiers
    let financeMod = 0;
    let financeInsight = '';
    if (['Taurus','Capricorn','Virgo'].includes(jupiterSign)) { financeMod += 1; financeInsight += `Jupiter in ${jupiterSign} (earth sign) channels expansion into material and financial growth — your wealth-building instincts are grounded and practical. `; }
    if (['Sagittarius','Leo'].includes(jupiterSign)) { financeMod += 1; financeInsight += `Jupiter in ${jupiterSign} attracts financial opportunities through visibility, generosity, and bold positioning — money follows your confidence. `; }
    if ([8].includes(lifePath)) { financeMod += 3; financeInsight += `Life Path 8 is the money path — financial expansion isn't just possible, it's your primary arena for learning power, stewardship, and material mastery. `; }
    if ([22].includes(lifePath)) { financeMod += 2; financeInsight += `Life Path 22 builds wealth at institutional scale — your financial expansion tends to be larger and slower than average, but the ceiling is extraordinary. `; }
    if (['Taurus','Leo','Capricorn','Scorpio'].includes(venusSign)) { financeMod += 1; financeInsight += `Venus in ${venusSign} has strong material instincts — you understand value, investment, and the relationship between beauty and wealth. `; }
    if (['Capricorn','Taurus'].includes(saturnSign)) { financeMod += 1; financeInsight += `Saturn in ${saturnSign} builds wealth through discipline and patience — you compound better than you speculate. `; }
    if ([9, 7].includes(lifePath)) { financeMod -= 1; financeInsight += `Life Path ${lifePath} sometimes has a complex relationship with money — financial expansion may come through non-traditional channels or require reconciling material success with spiritual values. `; }
    chartModifiers.financialExpansion = { modifier: financeMod, insight: financeInsight.trim() };
    
    // BURNOUT modifiers
    let burnoutMod = 0;
    let burnoutInsight = '';
    if (marsElement === 'Fire') { burnoutMod += 2; burnoutInsight += `Mars in ${marsSign} runs hot — you push harder than your body and mind can sustain. Your burnout risk is elevated because your drive has no natural governor. Learn to rest before you crash. `; }
    if (marsElement === 'Earth') { burnoutMod += 1; burnoutInsight += `Mars in ${marsSign} grinds rather than sprints — your burnout pattern is slow accumulation rather than dramatic collapse. By the time you notice, you're already deep in it. `; }
    if (marsElement === 'Water') { burnoutMod += 1; burnoutInsight += `Mars in ${marsSign} absorbs environmental stress — you burn out from emotional overload as much as overwork. Boundaries are your primary prevention tool. `; }
    if ([4].includes(lifePath)) { burnoutMod += 2; burnoutInsight += `Life Path 4 is the workhorse path — your drive to build solid foundations can become self-destructive if you don't build rest into the structure itself. `; }
    if ([1, 8].includes(lifePath)) { burnoutMod += 1; burnoutInsight += `Life Path ${lifePath} ties identity to achievement — burnout hits when you can't separate who you are from what you produce. `; }
    if (['Capricorn','Virgo'].includes(sunSign)) { burnoutMod += 1; burnoutInsight += `Your ${sunSign} Sun has a high tolerance for overwork that masks accumulating exhaustion — you may not recognize burnout until physical symptoms force the issue. `; }
    if ([3, 5].includes(lifePath)) { burnoutMod -= 1; burnoutInsight += `Life Path ${lifePath} has natural variety-seeking that provides built-in burnout protection — you instinctively change pace before breaking. `; }
    chartModifiers.burnout = { modifier: burnoutMod, insight: burnoutInsight.trim() };
    
    // Process windows with probability adjustment
    Object.entries(PROBABILITY_WINDOWS).forEach(([key, category]) => {
        const activeWindows = [];
        const upcomingWindows = [];
        const passedWindows = [];
        const mod = chartModifiers[key] ? chartModifiers[key].modifier : 0;
        
        // Probability scale for adjustment
        const probScale = ['Low', 'Moderate', 'High', 'Very High'];
        
        category.highWindows.forEach(window => {
            const [startAge, endAge] = window.age.split('–').map(Number);
            
            // Adjust probability based on chart
            let baseIndex = probScale.indexOf(window.probability);
            if (baseIndex < 0) baseIndex = 1;
            let adjustedIndex = Math.max(0, Math.min(probScale.length - 1, baseIndex + (mod > 2 ? 1 : (mod < -2 ? -1 : 0))));
            const adjustedProb = probScale[adjustedIndex];
            const adjustedWindow = { ...window, originalProbability: window.probability, probability: adjustedProb };
            
            if (age >= startAge && age <= endAge) {
                activeWindows.push(adjustedWindow);
            } else if (age < startAge) {
                upcomingWindows.push({ ...adjustedWindow, yearsUntil: startAge - age });
            } else {
                passedWindows.push(adjustedWindow);
            }
        });
        
        results[key] = {
            title: category.title,
            icon: category.icon,
            active: activeWindows,
            upcoming: upcomingWindows.slice(0, 2),
            passed: passedWindows,
            chartInsight: chartModifiers[key] ? chartModifiers[key].insight : '',
            personalModifier: mod
        };
    });
    
    // Full personal year context — all 9 years covered
    const personalYear = readings.numerology.personalYear;
    let yearContext = '';
    if (personalYear === 1) yearContext = 'Your Personal Year 1 amplifies new beginnings — career shifts and entrepreneurial launches have extra momentum this year. Seeds planted now set the trajectory for the next nine-year cycle. This is the year to initiate, not wait.';
    else if (personalYear === 2) yearContext = 'Your Personal Year 2 is the partnership and patience year. This is not the time for bold solo launches — it\'s the year for building alliances, deepening relationships, and allowing seeds planted last year to germinate. Collaboration multiplies your probability in every category. Partnerships formed now have deep roots.';
    else if (personalYear === 3) yearContext = 'Your Personal Year 3 is the expression and expansion year. Creative projects, social networking, and visibility all peak. This is an excellent year for anything requiring communication, branding, or public presence. Entrepreneurial ideas that rely on marketing, content, or charisma have amplified windows now. The risk: scattering energy across too many opportunities.';
    else if (personalYear === 4) yearContext = 'Your Personal Year 4 favors building and consolidating — not ideal for major disruptions, but excellent for reinforcing foundations. This year rewards discipline, structure-building, and patient execution. Financial expansion through steady work outperforms speculation. If you\'re in an active probability window, this year provides the infrastructure to capitalize on it.';
    else if (personalYear === 5) yearContext = 'Your Personal Year 5 is the change year — relocations, career pivots, and reinvention all have heightened probability. Every window in every category is amplified by the 5\'s change energy. If you\'ve been resisting a shift, this year the pressure becomes irresistible. Relocations initiated now often lead to unexpected expansion.';
    else if (personalYear === 6) yearContext = 'Your Personal Year 6 is the responsibility and relationship year. Partnership formation probability spikes — this is a classic marriage/commitment year. Home, family, and community take center stage. Career shifts are less likely unless they serve family or relationship goals. Financial expansion comes through service, caregiving, or community-oriented work.';
    else if (personalYear === 7) yearContext = 'Your Personal Year 7 favors internal work — psychological reinvention peaks, but external moves may feel forced. This is the sabbatical year, the research year, the year of going deeper rather than wider. Burnout risk actually decreases if you honor the 7\'s need for solitude and reflection. Financial expansion through investment analysis or specialized expertise is favored over hustle.';
    else if (personalYear === 8) yearContext = 'Your Personal Year 8 is the harvest year — financial expansion and career authority peak. Push for results. Everything you\'ve built in years 1 through 7 comes to material fruition now. Entrepreneurial success probability is amplified. This is the year to negotiate, close deals, claim promotions, and assert your professional value. Money responds to directness.';
    else if (personalYear === 9) yearContext = 'Your Personal Year 9 is the completion year — endings and clearing, preparing the ground for the next cycle. This is the worst year to start new ventures but the best year to conclude, release, and clear what no longer serves. Reinvention probability is high, but it\'s internal clearing rather than external action. Let go of what\'s complete.';
    else yearContext = `Your Personal Year ${personalYear} (Master Number) operates at heightened intensity across all categories. Master numbers don't follow the standard rhythm — they amplify everything, creating larger windows of both opportunity and pressure.`;
    
    return {
        windows: results,
        personalYearContext: yearContext,
        age: age
    };
}


// ============================================
// 4. COGNITIVE TENDENCIES
// ============================================

const COGNITIVE_PROFILES = {
    riskTolerance: {
        high: { label: "High Risk Tolerance", description: "You are wired for calculated boldness. Your chart shows a natural comfort with uncertainty that most people don't possess. You process potential losses differently — where others see danger, you see probability. This serves you in entrepreneurship, investment, and any field where the winners are the ones who moved before the data was complete. Your risk: overconfidence. Calibrate with data, not just instinct." },
        moderate: { label: "Calibrated Risk Tolerance", description: "Your chart shows a balanced risk profile — you're neither reckless nor paralyzed by uncertainty. You tend to assess situations accurately and take action when the odds are genuinely favorable. This makes you effective in roles requiring judgment under pressure. You avoid the extremes of timidity and gambling, which statistically produces the best long-term outcomes." },
        low: { label: "Conservative Risk Profile", description: "Your chart indicates a naturally conservative approach to risk — and this is not a weakness. Research shows that risk-averse decision-makers often outperform risk-seekers over long time horizons because they avoid catastrophic losses. Your strength is preservation and steady compounding. Where others lose everything on a single bet, you build slowly and keep what you earn." }
    },
    authorityResponse: {
        challenger: { label: "Authority Challenger", description: "You have an instinctive resistance to imposed hierarchy. Your default response to being told what to do is to question it — not out of rebellion, but out of a genuine need to understand WHY before complying. This makes you a poor fit for rigid command structures but an excellent fit for environments that value independent thinking. Most innovation comes from people with exactly this profile." },
        adapter: { label: "Strategic Adapter", description: "You can work within authority structures without losing your identity. You understand hierarchy as a tool rather than an ideology — you'll follow it when it serves the goal and quietly route around it when it doesn't. This is the most politically effective profile: you advance within systems while maintaining your own judgment. Many successful leaders have this pattern." },
        builder: { label: "Structure Builder", description: "You have a natural affinity for hierarchy and authority — not as submission, but as recognition that structure enables scale. You tend to respect competence-based authority and actively build systems of governance around you. This makes you effective in organizational leadership where the goal is sustainable, scalable operation." }
    },
    innovationBias: {
        innovator: { label: "Innovation-Biased", description: "Your cognitive default is to look for what's new, what's next, and what could be different. You get bored maintaining systems and energized by creating them. This makes you a natural R&D mind, creative problem-solver, and early adopter. Your risk: abandoning proven methods too quickly. Not everything that's new is better — but you'll always be the first to find out." },
        balanced: { label: "Selective Innovator", description: "You can toggle between innovation and conservation depending on context. This is cognitively rare and extremely valuable. You know when to keep what's working and when to blow it up and start over. Most organizations desperately need people with this profile in leadership positions because they make fewer 'change for change's sake' mistakes." },
        conservator: { label: "Optimization-Biased", description: "Your cognitive default is to improve what exists rather than replace it. You see waste, inefficiency, and untapped potential in current systems — and you fix them. While others chase shiny new approaches, you extract the maximum value from what's already built. This profile drives the highest ROI per effort in any organization." }
    },
    socialOrientation: {
        independent: { label: "Independent Operator", description: "You do your best work alone or in very small, high-trust teams. Your thinking deepens in solitude and diffuses in groups. This isn't antisocial — it's how your cognitive engine runs most efficiently. History's most original thinkers disproportionately share this profile. Protect your solo time ruthlessly." },
        collaborative: { label: "Collaborative Thinker", description: "Your thinking improves in the presence of others. You don't just tolerate group work — you genuinely produce better ideas when exposed to diverse perspectives. This makes you a natural team leader, facilitator, and organizational catalyst. The modern economy rewards this profile heavily." },
        adaptive: { label: "Context-Dependent", description: "You flex between independent and collaborative modes based on the task. Deep creative work: solo. Strategy and execution: collaborative. This adaptability is your cognitive edge — you can contribute effectively in any configuration." }
    },
    peakDecade: {
        early: { label: "Early Peak Pattern", description: "Your chart suggests a cognitive profile that produces visible results earlier than average. This doesn't mean you peak early and decline — it means your initial output is strong. The risk is believing that early success defines your ceiling. Many 'early peak' profiles experience a more profound second peak in their 40s-50s when depth catches up with speed." },
        mid: { label: "Mid-Career Peak Pattern", description: "Your chart suggests a cognitive profile that hits its stride in the 35-50 range. The 20s feel like preparation (because they are). The 30s show acceleration. The 40s deliver the full compound return. This is actually the most statistically common peak pattern — but it feels frustratingly slow in a culture that celebrates precocity." },
        late: { label: "Late Bloomer Pattern", description: "Your chart suggests a cognitive profile that compounds slowly and peaks later than average. This is NOT a disadvantage. Research by David Galenson and others shows that some of history's most important creative contributions came from 'experimental innovators' — people who needed decades of accumulated experience before their best work emerged. Your 50s and 60s may be your most productive decades." }
    }
};

function calculateCognitiveTendencies(readings) {
    const mercurySign = getSignName(readings.astrology.mercurySign);
    const marsSign = getSignName(readings.astrology.marsSign);
    const saturnSign = getSignName(readings.astrology.saturnSign);
    const jupiterSign = getSignName(readings.astrology.jupiterSign);
    const sunSign = getSignName(readings.astrology.sunSign);
    const moonSign = getSignName(readings.astrology.moonSign);
    const risingSign = getSignName(readings.astrology.risingSign);
    const lifePath = readings.numerology.lifePath;
    
    // Risk Tolerance
    let riskScore = 0;
    // Fire Mars = high risk comfort
    if (['Aries','Leo','Sagittarius'].includes(marsSign)) riskScore += 3;
    if (['Gemini','Aquarius'].includes(marsSign)) riskScore += 2;
    if (['Taurus','Cancer','Virgo'].includes(marsSign)) riskScore -= 2;
    if (['Capricorn'].includes(marsSign)) riskScore -= 1;
    // Jupiter influence
    if (['Sagittarius','Aries','Leo'].includes(jupiterSign)) riskScore += 2;
    if (['Capricorn','Virgo','Cancer'].includes(jupiterSign)) riskScore -= 1;
    // Life Path
    if ([1, 5, 3].includes(lifePath)) riskScore += 2;
    if ([4, 6, 2].includes(lifePath)) riskScore -= 2;
    if ([11, 22].includes(lifePath)) riskScore += 1;
    // Sun/Rising Fire
    if (['Aries','Leo','Sagittarius'].includes(sunSign)) riskScore += 1;
    if (['Aries','Leo','Sagittarius'].includes(risingSign)) riskScore += 1;
    
    const riskLevel = riskScore >= 4 ? 'high' : (riskScore <= -2 ? 'low' : 'moderate');
    
    // Authority Response
    let authScore = 0; // Positive = challenger, negative = builder
    if (['Aries','Aquarius','Sagittarius'].includes(sunSign)) authScore += 2;
    if (['Leo','Scorpio'].includes(sunSign)) authScore += 1;
    if (['Capricorn','Virgo','Cancer'].includes(sunSign)) authScore -= 2;
    if (['Taurus','Libra'].includes(sunSign)) authScore -= 1;
    if ([1, 5, 7].includes(lifePath)) authScore += 2;
    if ([4, 6, 8].includes(lifePath)) authScore -= 2;
    if (['Aries','Aquarius','Sagittarius'].includes(marsSign)) authScore += 1;
    if (['Capricorn','Virgo'].includes(saturnSign)) authScore -= 1;
    
    const authType = authScore >= 3 ? 'challenger' : (authScore <= -2 ? 'builder' : 'adapter');
    
    // Innovation vs Security
    let innovScore = 0;
    if (['Aquarius','Gemini','Sagittarius'].includes(mercurySign)) innovScore += 3;
    if (['Aries','Leo'].includes(mercurySign)) innovScore += 1;
    if (['Taurus','Cancer','Virgo'].includes(mercurySign)) innovScore -= 2;
    if (['Capricorn'].includes(mercurySign)) innovScore -= 1;
    if (['Aquarius','Aries'].includes(sunSign)) innovScore += 1;
    if ([5, 1, 3].includes(lifePath)) innovScore += 2;
    if ([4, 6, 8].includes(lifePath)) innovScore -= 2;
    
    const innovationType = innovScore >= 3 ? 'innovator' : (innovScore <= -2 ? 'conservator' : 'balanced');
    
    // Social Orientation
    let socialScore = 0; // Positive = independent
    if (['Scorpio','Capricorn','Aquarius','Virgo'].includes(moonSign)) socialScore += 2;
    if (['Aries','Sagittarius'].includes(moonSign)) socialScore += 1;
    if (['Libra','Gemini','Leo','Cancer'].includes(moonSign)) socialScore -= 2;
    if ([7, 1, 4].includes(lifePath)) socialScore += 2;
    if ([2, 6, 3, 11].includes(lifePath)) socialScore -= 2;
    
    const socialType = socialScore >= 3 ? 'independent' : (socialScore <= -2 ? 'collaborative' : 'adaptive');
    
    // Peak Decade
    let peakScore = 0; // Higher = later peak
    if (['Capricorn','Taurus','Virgo'].includes(saturnSign)) peakScore += 2; // Earth Saturn = slow build
    if (['Aries','Gemini','Leo'].includes(saturnSign)) peakScore -= 1; // Fire/Air Saturn = earlier challenges resolved
    if ([4, 7, 22].includes(lifePath)) peakScore += 2; // Builder/seeker paths peak later
    if ([1, 3, 5].includes(lifePath)) peakScore -= 1; // Action paths show earlier
    if (['Capricorn','Scorpio','Pisces'].includes(sunSign)) peakScore += 1;
    if (['Aries','Gemini','Leo'].includes(sunSign)) peakScore -= 1;
    
    const peakType = peakScore >= 3 ? 'late' : (peakScore <= -1 ? 'early' : 'mid');
    
    // Intensity indicators (how strongly each dimension is expressed)
    const riskIntensity = Math.abs(riskScore);
    const authIntensity = Math.abs(authScore);
    const innovIntensity = Math.abs(innovScore);
    const socialIntensity = Math.abs(socialScore);
    const peakIntensity = Math.abs(peakScore);
    
    // Build personalized source citations for each dimension
    const riskSources = [];
    if (['Aries','Leo','Sagittarius'].includes(marsSign)) riskSources.push(`Mars in ${marsSign} (fire drive)`);
    else if (['Taurus','Cancer','Virgo'].includes(marsSign)) riskSources.push(`Mars in ${marsSign} (cautious action)`);
    if (['Sagittarius','Aries','Leo'].includes(jupiterSign)) riskSources.push(`Jupiter in ${jupiterSign} (bold expansion)`);
    else if (['Capricorn','Virgo','Cancer'].includes(jupiterSign)) riskSources.push(`Jupiter in ${jupiterSign} (measured growth)`);
    if ([1, 5, 3].includes(lifePath)) riskSources.push(`Life Path ${lifePath} (action-oriented)`);
    else if ([4, 6, 2].includes(lifePath)) riskSources.push(`Life Path ${lifePath} (stability-seeking)`);
    
    const authSources = [];
    if (['Aries','Aquarius','Sagittarius','Leo','Scorpio'].includes(sunSign)) authSources.push(`Sun in ${sunSign} (independent identity)`);
    else if (['Capricorn','Virgo','Cancer','Taurus'].includes(sunSign)) authSources.push(`Sun in ${sunSign} (structure-respecting)`);
    if ([1, 5, 7].includes(lifePath)) authSources.push(`Life Path ${lifePath} (self-directed)`);
    else if ([4, 6, 8].includes(lifePath)) authSources.push(`Life Path ${lifePath} (system-building)`);
    
    const innovSources = [];
    if (['Aquarius','Gemini','Sagittarius'].includes(mercurySign)) innovSources.push(`Mercury in ${mercurySign} (experimental thinking)`);
    else if (['Taurus','Cancer','Virgo','Capricorn'].includes(mercurySign)) innovSources.push(`Mercury in ${mercurySign} (practical thinking)`);
    if ([5, 1, 3].includes(lifePath)) innovSources.push(`Life Path ${lifePath} (change-seeking)`);
    else if ([4, 6, 8].includes(lifePath)) innovSources.push(`Life Path ${lifePath} (optimization-focused)`);
    
    const socialSources = [];
    if (['Scorpio','Capricorn','Aquarius','Virgo','Aries','Sagittarius'].includes(moonSign)) socialSources.push(`Moon in ${moonSign} (self-contained processing)`);
    else if (['Libra','Gemini','Leo','Cancer'].includes(moonSign)) socialSources.push(`Moon in ${moonSign} (relational processing)`);
    if ([7, 1, 4].includes(lifePath)) socialSources.push(`Life Path ${lifePath} (solitary focus)`);
    else if ([2, 6, 3, 11].includes(lifePath)) socialSources.push(`Life Path ${lifePath} (people-oriented)`);
    
    // Cross-dimension synthesis
    let synthesis = '';
    // Risk + Authority interaction
    if (riskLevel === 'high' && authType === 'challenger') {
        synthesis += 'Your combination of high risk tolerance and authority-challenging instincts creates a classic entrepreneurial-disruptor profile. You\'re wired to build your own thing, on your own terms, and you have the risk stomach to survive the early stages. ';
    } else if (riskLevel === 'low' && authType === 'builder') {
        synthesis += 'Your conservative risk profile combined with structure-building instincts makes you ideal for institutional leadership — you build things that last because you never bet the foundation on a gamble. ';
    } else if (riskLevel === 'high' && authType === 'builder') {
        synthesis += 'An unusual combination: you\'re comfortable with risk but respect institutional structure. This makes you the bold insider — the person who pushes organizations further than they\'d go alone, but from within the system rather than outside it. ';
    } else if (riskLevel === 'low' && authType === 'challenger') {
        synthesis += 'You challenge authority intellectually but not through risk-taking action. This is the profile of the strategic critic — someone who sees what\'s wrong with systems and articulates it powerfully, often becoming the voice that others rally behind. ';
    }
    
    // Innovation + Social interaction
    if (innovationType === 'innovator' && socialType === 'independent') {
        synthesis += 'Your innovation bias combined with independent operation means your best ideas emerge in solitude. You\'re the solo inventor, the writer in the cabin, the researcher who makes the breakthrough alone at 3 AM. Protect that creative isolation. ';
    } else if (innovationType === 'innovator' && socialType === 'collaborative') {
        synthesis += 'You innovate best through collaboration — bouncing ideas off others, building on what you hear, and co-creating. Your innovation style is social, which means your environment matters enormously. Surround yourself with other creative minds. ';
    } else if (innovationType === 'conservator' && socialType === 'collaborative') {
        synthesis += 'You optimize through teams — your strength is taking what exists, gathering input from diverse perspectives, and systematically improving it. This is the quality control mind that every organization needs but few appreciate enough. ';
    } else if (innovationType === 'conservator' && socialType === 'independent') {
        synthesis += 'You optimize in solitude — methodically improving systems with deep, focused attention. Your work environment should give you complex existing problems and the space to solve them without interruption. ';
    }
    
    // Peak timing context
    if (peakType === 'early' && innovationType === 'innovator') {
        synthesis += 'With an early peak pattern and innovation bias, your 20s and 30s may be your most visibly productive years — but don\'t mistake early output for your full capacity.';
    } else if (peakType === 'late' && riskLevel === 'low') {
        synthesis += 'Your late-blooming profile combined with conservative risk tolerance suggests a compounding life strategy — slow, steady, accumulative, with the biggest results arriving after decades of disciplined work.';
    } else if (peakType === 'mid' && authType === 'adapter') {
        synthesis += 'Your mid-career peak aligns with your strategic adaptation — you spend your early years learning the landscape, and your peak arrives when you\'ve fully mapped the terrain and know exactly where to place your effort.';
    }
    
    return {
        riskTolerance: { type: riskLevel, score: riskScore, intensity: riskIntensity, sources: riskSources, ...COGNITIVE_PROFILES.riskTolerance[riskLevel] },
        authorityResponse: { type: authType, score: authScore, intensity: authIntensity, sources: authSources, ...COGNITIVE_PROFILES.authorityResponse[authType] },
        innovationBias: { type: innovationType, score: innovScore, intensity: innovIntensity, sources: innovSources, ...COGNITIVE_PROFILES.innovationBias[innovationType] },
        socialOrientation: { type: socialType, score: socialScore, intensity: socialIntensity, sources: socialSources, ...COGNITIVE_PROFILES.socialOrientation[socialType] },
        peakDecade: { type: peakType, score: peakScore, intensity: peakIntensity, sources: [], ...COGNITIVE_PROFILES.peakDecade[peakType] },
        synthesis: synthesis.trim()
    };
}


// ============================================
// 5. ARCHETYPAL ROLE DETECTION
// ============================================

const ARCHETYPAL_ROLES = {
    architect: {
        title: "The Architect",
        subtitle: "You design the systems others inhabit.",
        keywords: ["Systems Design", "Long-Term Planning", "Structural Thinking", "Framework Building"],
        reading: "When all your cosmic data points converge, they form the unmistakable pattern of The Architect — the person who doesn't just build things, but designs the systems and frameworks within which others operate.\n\nArchitects think in structures. Where others see a problem, you see a system that needs redesigning. Where others see chaos, you see unimplemented architecture. Your mind naturally moves from the specific to the general — from 'this thing is broken' to 'the category this belongs to needs a new organizing principle.'\n\nThis makes you exceptionally valuable in any field that requires long-term structural thinking: urban planning, software architecture, organizational design, policy creation, educational system design, or building any institution meant to outlast its founders.\n\nThe Architect's signature move: you create something, and then other people live inside it for decades without realizing someone designed the space they're inhabiting. Your impact is often invisible precisely because it's so foundational.",
        strengths: ["Designs systems that scale beyond yourself", "Thinks in decades, not quarters", "Creates frameworks others instinctively adopt"],
        challenges: ["May over-engineer when simplicity would serve", "Can be frustrated by people who don't think structurally"]
    },
    strategist: {
        title: "The Strategist",
        subtitle: "You see the board when others see only pieces.",
        keywords: ["Pattern Recognition", "Positioning", "Long Game", "Calculated Moves"],
        reading: "Your cosmic signature converges on The Strategist — the person who instinctively maps the landscape, identifies leverage points, and positions themselves (and others) for maximum advantage with minimum wasted effort.\n\nStrategists process the world differently. You don't react to events — you anticipate them. You don't compete on effort — you compete on positioning. While others are optimizing their current situation, you're already gaming out three scenarios for what happens next.\n\nThis role is invaluable in business, politics, military strategy, competitive markets, negotiations, and any field where the winners are determined not by who worked hardest but by who positioned best. The Strategist's edge is patience: you wait for the right moment, and when you move, it looks effortless because all the calculation happened before the action.\n\nYour signature impact: people around you consistently achieve better outcomes because you helped them see angles they were missing.",
        strengths: ["Sees three moves ahead", "Optimizes for position rather than brute effort", "Makes complexity navigable for others"],
        challenges: ["Can be perceived as manipulative when you're just being efficient", "May over-think when action is needed"]
    },
    catalyst: {
        title: "The Catalyst",
        subtitle: "You accelerate transformation in everyone you touch.",
        keywords: ["Transformation", "Acceleration", "Activation", "Ignition"],
        reading: "Your cosmic data converges on The Catalyst — the person whose presence accelerates change, growth, and transformation in every system they enter.\n\nCatalysts don't just participate — they activate. Teams work harder when you join. Projects that were stalled start moving when you get involved. People who were stuck find clarity after one conversation with you. This isn't manipulation — it's your energetic signature. You carry the frequency of transformation.\n\nThe Catalyst's gift is that you speed up what's already trying to happen. You don't impose change — you remove the friction preventing it. This makes you the ultimate unlocking mechanism: you help people and organizations become what they were already meant to be, just faster.\n\nYour signature impact: when people look back on their biggest growth periods, they often find you were there — not doing it for them, but somehow making it possible.",
        strengths: ["Accelerates growth in everyone around you", "Removes invisible friction from stalled situations", "Natural change agent without force"],
        challenges: ["May exhaust yourself by catalyzing too many others", "Difficulty tolerating stagnation even when rest is needed"]
    },
    rebuilder: {
        title: "The Rebuilder",
        subtitle: "You transform wreckage into something stronger than the original.",
        keywords: ["Resilience", "Transformation", "Phoenix Energy", "Post-Crisis Construction"],
        reading: "Your cosmic signature converges on The Rebuilder — the person who specializes in taking what's broken, failed, or destroyed and turning it into something stronger than what existed before.\n\nRebuilders are not attracted to pristine environments. You come alive in the aftermath — after the company collapses, after the relationship ends, after the system fails, after the crisis. Where others see wreckage, you see raw material. Where others see endings, you see the beginning of something that couldn't have existed without the destruction.\n\nThis role is essential in turnaround management, crisis counseling, post-conflict reconstruction, and any field where the primary challenge is transforming failure into foundation. The Rebuilder's strength is that nothing is wasted — every lesson, every failure, every scar becomes structural material for what comes next.\n\nYour signature impact: the things you rebuild are always stronger than the originals, because you build with full knowledge of how things break.",
        strengths: ["Thrives in crisis and post-crisis environments", "Transforms failure into structural wisdom", "Unshakeable resilience under pressure"],
        challenges: ["May unconsciously create destruction to have something to rebuild", "Difficulty thriving in stable, functioning environments"]
    },
    translator: {
        title: "The Translator",
        subtitle: "You turn complexity into clarity.",
        keywords: ["Communication", "Bridge-Building", "Simplification", "Cross-Domain Understanding"],
        reading: "Your cosmic data converges on The Translator — the person who takes complex, specialized, or inaccessible information and makes it understandable, actionable, and compelling for people who need it.\n\nTranslators operate between worlds. You understand the technical AND the human. You speak the language of data AND the language of emotion. You can sit in a room full of engineers, then walk across the hall to the marketing team, and both groups feel like you 'get it.' Because you do.\n\nThis role is indispensable in any environment where communication gaps exist between specialists — which is everywhere. Teaching, journalism, product management, consulting, therapy, diplomacy, and content creation all benefit enormously from The Translator's gift.\n\nYour signature impact: after you explain something, people don't just understand it — they feel like they always understood it. You don't simplify by removing depth. You simplify by finding the path through it.",
        strengths: ["Makes the complex accessible without dumbing it down", "Bridges gaps between different groups, disciplines, or worldviews", "Creates understanding that feels effortless"],
        challenges: ["May struggle to develop your own original ideas while translating others'", "Can become trapped as the permanent go-between"]
    },
    amplifier: {
        title: "The Signal Amplifier",
        subtitle: "You make others more of what they already are.",
        keywords: ["Enhancement", "Support", "Multiplication", "Platform Building"],
        reading: "Your cosmic signature converges on The Signal Amplifier — the person whose primary gift is taking what others create, believe, or express and making it louder, larger, and more impactful.\n\nAmplifiers are the most misunderstood role because in a culture that worships originality, your gift looks like support. But this is a profound misunderstanding. Every great creator, leader, and innovator in history had Amplifiers who turned their signal into movement. Without amplification, genius dies in obscurity.\n\nThe Amplifier's gift is perception plus platform. You instinctively recognize quality, potential, and emerging talent — often before the person themselves sees it. Then you use your energy, connections, platform, or resources to ensure that signal reaches the people who need to hear it.\n\nYour signature impact: you are the kingmaker, the curator, the producer, the connector. The people you've amplified often credit you as the turning point — not because you did their work, but because you ensured it was seen.",
        strengths: ["Instinctive eye for quality and potential", "Multiplies others' impact through strategic support", "Builds platforms and ecosystems around talent"],
        challenges: ["May neglect your own development while amplifying others", "The role can feel invisible despite being essential"]
    }
};

function calculateArchetypalRole(readings) {
    const scores = { architect: 0, strategist: 0, catalyst: 0, rebuilder: 0, translator: 0, amplifier: 0 };
    
    const sunSign = getSignName(readings.astrology.sunSign);
    const moonSign = getSignName(readings.astrology.moonSign);
    const risingSign = getSignName(readings.astrology.risingSign);
    const mercurySign = getSignName(readings.astrology.mercurySign);
    const venusSign = getSignName(readings.astrology.venusSign);
    const marsSign = getSignName(readings.astrology.marsSign);
    const saturnSign = getSignName(readings.astrology.saturnSign);
    const jupiterSign = getSignName(readings.astrology.jupiterSign);
    const plutoSign = getSignName(readings.astrology.plutoSign);
    const uranusSign = getSignName(readings.astrology.uranusSign);
    const neptuneSign = getSignName(readings.astrology.neptuneSign);
    const northNodeSign = getSignName(readings.astrology.northNodeSign);
    const lifePath = readings.numerology.lifePath;
    const destiny = readings.numerology.destiny;
    
    // Sun sign scoring
    const sunRoles = {
        Aries: { catalyst: 3, rebuilder: 1 }, Taurus: { architect: 3, amplifier: 1 },
        Gemini: { translator: 3, catalyst: 1 }, Cancer: { amplifier: 3, rebuilder: 1 },
        Leo: { amplifier: 2, catalyst: 2 }, Virgo: { architect: 2, translator: 2 },
        Libra: { translator: 2, amplifier: 2 }, Scorpio: { rebuilder: 3, strategist: 1 },
        Sagittarius: { catalyst: 2, translator: 2 }, Capricorn: { architect: 3, strategist: 1 },
        Aquarius: { architect: 2, catalyst: 2 }, Pisces: { amplifier: 2, translator: 2 }
    };
    if (sunRoles[sunSign]) Object.entries(sunRoles[sunSign]).forEach(([r, v]) => scores[r] += v);
    
    // Mercury sign (communication style → translator/strategist)
    if (['Gemini','Libra','Aquarius'].includes(mercurySign)) { scores.translator += 2; }
    if (['Scorpio','Capricorn'].includes(mercurySign)) { scores.strategist += 2; }
    if (['Virgo'].includes(mercurySign)) { scores.architect += 2; }
    
    // Mars sign (action style)
    if (['Aries','Scorpio'].includes(marsSign)) { scores.catalyst += 2; scores.rebuilder += 1; }
    if (['Capricorn','Taurus'].includes(marsSign)) { scores.architect += 2; }
    if (['Libra','Pisces','Cancer'].includes(marsSign)) { scores.amplifier += 2; }
    
    // Saturn sign (discipline focus)
    if (['Capricorn','Aquarius','Virgo'].includes(saturnSign)) { scores.architect += 2; }
    if (['Scorpio','Pisces'].includes(saturnSign)) { scores.rebuilder += 2; }
    
    // Jupiter sign (growth mode)
    if (['Sagittarius','Leo'].includes(jupiterSign)) { scores.amplifier += 2; scores.catalyst += 1; }
    if (['Capricorn','Virgo'].includes(jupiterSign)) { scores.strategist += 2; }
    
    // Pluto sign (transformative power)
    if (['Scorpio','Aries'].includes(plutoSign)) { scores.rebuilder += 2; }
    if (['Capricorn'].includes(plutoSign)) { scores.architect += 1; scores.rebuilder += 1; }
    
    // Venus sign (relational & aesthetic mode)
    if (['Libra','Taurus'].includes(venusSign)) { scores.amplifier += 2; }
    if (['Virgo','Capricorn'].includes(venusSign)) { scores.architect += 1; scores.strategist += 1; }
    if (['Gemini','Aquarius'].includes(venusSign)) { scores.translator += 2; }
    if (['Scorpio','Pisces'].includes(venusSign)) { scores.rebuilder += 1; scores.amplifier += 1; }
    if (['Aries','Sagittarius'].includes(venusSign)) { scores.catalyst += 2; }
    if (['Leo'].includes(venusSign)) { scores.amplifier += 1; scores.catalyst += 1; }
    
    // Rising sign (instinctive presentation)
    const risingRoles = {
        Aries: { catalyst: 2 }, Taurus: { architect: 2 },
        Gemini: { translator: 2 }, Cancer: { amplifier: 2 },
        Leo: { catalyst: 1, amplifier: 1 }, Virgo: { architect: 1, translator: 1 },
        Libra: { translator: 1, amplifier: 1 }, Scorpio: { rebuilder: 2 },
        Sagittarius: { catalyst: 1, translator: 1 }, Capricorn: { architect: 1, strategist: 1 },
        Aquarius: { architect: 1, catalyst: 1 }, Pisces: { amplifier: 1, rebuilder: 1 }
    };
    if (risingRoles[risingSign]) Object.entries(risingRoles[risingSign]).forEach(([r, v]) => scores[r] += v);
    
    // Uranus sign (generational innovation style)
    if (['Aquarius','Aries'].includes(uranusSign)) { scores.catalyst += 1; }
    if (['Capricorn','Taurus'].includes(uranusSign)) { scores.architect += 1; }
    if (['Sagittarius','Gemini'].includes(uranusSign)) { scores.translator += 1; }
    
    // Neptune sign (generational vision style)
    if (['Pisces','Cancer'].includes(neptuneSign)) { scores.amplifier += 1; }
    if (['Scorpio'].includes(neptuneSign)) { scores.rebuilder += 1; }
    if (['Capricorn','Aquarius'].includes(neptuneSign)) { scores.architect += 1; }
    
    // North Node (soul direction)
    if (['Aries','Leo','Sagittarius'].includes(northNodeSign)) { scores.catalyst += 2; }
    if (['Taurus','Virgo','Capricorn'].includes(northNodeSign)) { scores.architect += 1; scores.strategist += 1; }
    if (['Gemini','Libra','Aquarius'].includes(northNodeSign)) { scores.translator += 2; }
    if (['Cancer','Scorpio','Pisces'].includes(northNodeSign)) { scores.rebuilder += 1; scores.amplifier += 1; }
    
    // Moon sign (emotional processing → support mode)
    if (['Cancer','Pisces','Taurus'].includes(moonSign)) { scores.amplifier += 2; }
    if (['Scorpio','Capricorn'].includes(moonSign)) { scores.rebuilder += 1; scores.strategist += 1; }
    if (['Gemini','Aquarius'].includes(moonSign)) { scores.translator += 1; scores.architect += 1; }
    
    // Life Path contributions
    const lpRoles = {
        1: { catalyst: 3 }, 2: { amplifier: 3, translator: 1 }, 3: { translator: 3, catalyst: 1 },
        4: { architect: 3, strategist: 1 }, 5: { catalyst: 2, translator: 2 }, 6: { amplifier: 3 },
        7: { strategist: 3 }, 8: { strategist: 2, architect: 2 }, 9: { amplifier: 2, catalyst: 2 },
        11: { catalyst: 3, translator: 1 }, 22: { architect: 3, strategist: 1 }, 33: { amplifier: 3, catalyst: 1 }
    };
    const lpKey = lpRoles[lifePath] || lpRoles[lifePath % 9 || 9];
    if (lpKey) Object.entries(lpKey).forEach(([r, v]) => scores[r] += v);
    
    // Destiny Number boost
    const destRoles = {
        1: 'catalyst', 2: 'amplifier', 3: 'translator', 4: 'architect',
        5: 'catalyst', 6: 'amplifier', 7: 'strategist', 8: 'strategist', 9: 'amplifier',
        11: 'catalyst', 22: 'architect', 33: 'amplifier'
    };
    const destRole = destRoles[destiny] || destRoles[destiny % 9 || 9];
    if (destRole) scores[destRole] += 2;
    
    // Sort and return
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primaryRole = sorted[0][0];
    const secondaryRole = sorted[1][0];
    
    return {
        primary: primaryRole,
        secondary: secondaryRole,
        reading: ARCHETYPAL_ROLES[primaryRole],
        secondaryReading: ARCHETYPAL_ROLES[secondaryRole],
        scores: scores
    };
}


// ============================================
// 6. NAME ANALYSIS (PHONETIC + LINGUISTIC)
// ============================================

const CORNERSTONE_READINGS = {
    A: { trait: "Ambitious & Independent", description: "Names beginning with A signal natural leadership. The open vowel projects confidence, approachability, and initiative. People with A-cornerstones are typically perceived as self-starters." },
    B: { trait: "Sensitive & Cooperative", description: "The B cornerstone suggests emotional depth and cooperative instincts. The soft, bilabial sound carries warmth. B-names are often perceived as trustworthy and team-oriented." },
    C: { trait: "Creative & Expressive", description: "C carries creative impulse. The hard sound projects confidence while the letter's numerological value (3) adds expressive, social energy. C-names often belong to natural communicators." },
    D: { trait: "Disciplined & Grounded", description: "D suggests discipline and determination. The dental stop carries weight and authority. D-names project reliability and substance — people take them seriously." },
    E: { trait: "Adventurous & Free-Spirited", description: "E is the most frequently used letter and projects universality and adaptability. E-names feel approachable and energetic, with a restless quality that suggests movement." },
    F: { trait: "Nurturing & Responsible", description: "F carries a protective, warm energy. The fricative sound is gentle yet present. F-names project dependability and a quiet, nurturing authority." },
    G: { trait: "Intellectual & Methodical", description: "G projects mental acuity and structured thinking. The guttural stop carries weight. G-names are often perceived as intelligent, thorough, and somewhat intense." },
    H: { trait: "Visionary & Self-Reliant", description: "H is a breath — the most natural human sound. It projects authenticity and independence. H-names feel honest, self-contained, and quietly powerful." },
    I: { trait: "Compassionate & Idealistic", description: "I projects emotional intensity in a compact form. The high-frequency vowel carries clarity. I-names suggest precision, sensitivity, and idealism." },
    J: { trait: "Dynamic & Truthful", description: "J carries a forward momentum. The fricative opening suggests honesty and directness. J-names project energy, fairness, and a no-nonsense quality." },
    K: { trait: "Powerful & Intuitive", description: "K is one of the most forceful consonants. It projects authority, decisiveness, and intuitive power. K-names command attention and suggest leadership." },
    L: { trait: "Eloquent & Sociable", description: "L is a liquid consonant — it flows. This projects eloquence, grace, and social ease. L-names are perceived as charming, articulate, and approachable." },
    M: { trait: "Steady & Hardworking", description: "M is a nasal consonant that resonates in the body. It projects groundedness, reliability, and warmth. M-names suggest dependability and quiet strength." },
    N: { trait: "Creative & Unconventional", description: "N carries a vibrant, forward-moving energy. It projects originality and mental agility. N-names suggest creative thinking and a distinctive perspective." },
    O: { trait: "Emotional & Principled", description: "O is the most resonant vowel — it projects depth, emotional range, and moral gravity. O-names feel weighty, principled, and memorable." },
    P: { trait: "Intellectual & Curious", description: "P projects precision and mental sharpness. The plosive carries authority without aggression. P-names suggest intellectual curiosity and analytical ability." },
    Q: { trait: "Unique & Enigmatic", description: "Q is rare and distinctive. It projects mystery, originality, and an unconventional path. Q-names immediately stand out and suggest a person who defies categorization." },
    R: { trait: "Passionate & Driven", description: "R projects intensity and forward motion. The liquid consonant carries fire and determination. R-names suggest passion, persistence, and emotional depth." },
    S: { trait: "Charismatic & Magnetic", description: "S is a sibilant — it draws attention. The snake-like quality projects charisma, mystery, and magnetism. S-names are often perceived as attractive and compelling." },
    T: { trait: "Purposeful & Determined", description: "T is crisp and decisive. The dental stop projects clarity of purpose and no-nonsense determination. T-names suggest efficiency, directness, and follow-through." },
    U: { trait: "Intuitive & Lucky", description: "U projects openness and receptivity. The vowel carries a gathering quality. U-names suggest intuitive ability and a natural magnetism for opportunity." },
    V: { trait: "Determined & Intense", description: "V carries vibration and intensity. The fricative projects power through precision. V-names suggest determination, focus, and a certain edge." },
    W: { trait: "Purposeful & Magnetic", description: "W is a double-U — it doubles the gathering energy. W-names project purpose, charisma, and a quality of drawing people and resources toward a goal." },
    X: { trait: "Bold & Independent", description: "X is rare, sharp, and unmistakable. It projects absolute originality and independence. X-names are impossible to ignore and suggest someone who operates outside conventional categories." },
    Y: { trait: "Spiritual & Perceptive", description: "Y straddles vowel and consonant — like someone who straddles worlds. Y-names project sensitivity, spiritual awareness, and perceptive depth." },
    Z: { trait: "Energetic & Original", description: "Z vibrates. It projects electric energy, originality, and dynamic presence. Z-names are rare and commanding — they suggest a person who brings intensity to everything." }
};

const CAPSTONE_READINGS = {
    A: { trait: "Decisive Finisher", description: "Names ending in A suggest someone who completes through decisive action — you finish what you start with clarity and forward momentum. There's no lingering or second-guessing at the finish line; you close chapters with the same boldness that opened them. This gives your work a sense of clean completion that others find refreshing and authoritative." },
    B: { trait: "Cooperative Closer", description: "The B capstone suggests cooperative completion — tasks are finished through collaboration and consensus. You instinctively bring others into the closing phase, ensuring everyone feels ownership of the outcome. This makes your endings harmonious but occasionally slow, as you wait for alignment before declaring something done." },
    C: { trait: "Creative Finisher", description: "C endings imply creative closure — you bring flair, expression, and a personal touch to the final product. Nothing you complete feels generic because you can't resist adding your signature at the last moment. This makes your finished work memorable but can also mean projects take longer as you refine the aesthetic details." },
    D: { trait: "Systematic Closer", description: "D capstone projects disciplined completion — systematic, thorough, nothing left undone. You are the person who checks every box, ties every loose end, and delivers work that requires no follow-up. Others trust your completions implicitly because your D-capstone energy treats 'almost done' as 'not done.'" },
    E: { trait: "Flexible Finisher", description: "E endings suggest flexible completion — you're adaptable in how things conclude and open to revision even at the last stage. This keeps your work alive and improvable right until delivery. The risk is difficulty declaring something truly finished — your flexibility can become perfectionism if you're not careful about deadlines." },
    F: { trait: "Protective Closer", description: "F capstone implies protective closure — you make sure the outcome serves and shields those involved. Your completion style prioritizes the well-being of the people affected by the result. This makes you exceptionally trustworthy in high-stakes environments where the consequences of careless completion ripple outward." },
    G: { trait: "Analytical Finisher", description: "G endings suggest analytical completion — everything is checked, verified, and intellectually sound before you call it done. You're the person who reviews the final draft three times because accuracy matters more than speed. This thoroughness produces work of exceptional reliability, though it can frustrate collaborators who want faster turnarounds." },
    H: { trait: "Visionary Closer", description: "H capstone implies visionary closure — you finish with an eye toward what comes next. Your completions are never just endings; they're launchpads. This forward-looking quality means your finished work often contains seeds for the next project, the next phase, the next evolution. You close one door while opening three." },
    I: { trait: "Values-Driven Finisher", description: "I endings suggest idealistic completion — the result must align with your inner values or it doesn't feel finished, regardless of what external metrics say. This makes your work deeply authentic but can create internal conflict when practical constraints clash with your ideals. When the alignment is right, though, your completions carry a rare integrity." },
    J: { trait: "Honest Closer", description: "J capstone projects honest closure — completion with integrity, no loose ends or hidden compromises. You're incapable of delivering something you know is flawed without flagging it. This radical honesty in completion makes you invaluable in quality-critical environments and trusted absolutely by anyone who works with you." },
    K: { trait: "Powerful Finisher", description: "K endings imply powerful completion — the finish carries authority and impact. When you complete something, it lands with force. There's nothing tentative about a K-capstone closing; it arrives with confidence and makes its presence felt. This gives your work a gravitas that lighter completion styles can't match." },
    L: { trait: "Graceful Closer", description: "L capstone suggests graceful closure — tasks end with elegance and social awareness. You have an instinct for ending things well, whether that's a project, a conversation, or a chapter of life. The L-capstone brings a smoothness to completion that makes transitions feel natural rather than jarring. People rarely feel blindsided by your endings." },
    M: { trait: "Steady Finisher", description: "M endings project steady completion — reliable, thorough, done right the first time. There's a workhorse quality to the M capstone: you put in the work until the work is done, without drama or shortcuts. This consistency makes you the person others rely on when something absolutely has to be finished properly, no excuses." },
    N: { trait: "Original Closer", description: "N capstone implies original closure — the ending often introduces something new or unexpected. You can't help but add a twist, an innovation, or a fresh perspective in the final stages. This makes your completed work surprising in the best sense — people think they know what's coming, and then you show them something better." },
    O: { trait: "Emotional Finisher", description: "O endings suggest emotional completion — it's not done until it feels right at a deep, gut level. You trust your emotional intelligence to tell you when something is truly complete, which gives your finished work a resonance that purely analytical completion can't achieve. The risk is that 'feeling done' can be harder to reach than 'being done.'" },
    P: { trait: "Intellectual Closer", description: "P capstone projects intellectual closure — the conclusion must be logically sound and intellectually defensible. You test your completions against reason before releasing them, which means your finished work holds up under scrutiny. This analytical rigor makes your endings trustworthy and your conclusions difficult to challenge." },
    Q: { trait: "Enigmatic Finisher", description: "Q endings imply enigmatic completion — the result often contains layers not immediately visible. Your finished work reveals new dimensions over time, like a painting that changes in different light. This depth makes your completions fascinating but occasionally underappreciated at first glance — their full quality emerges on the second and third encounter." },
    R: { trait: "Passionate Closer", description: "R capstone suggests passionate closure — finished with intensity and commitment to quality. You pour yourself into the final stretch rather than coasting to the finish line. This means your completed work carries heat and energy that others can feel. The R-capstone never phones in a completion; it delivers with full conviction." },
    S: { trait: "Magnetic Finisher", description: "S endings project magnetic completion — the result draws attention and admiration. There's something about how you finish things that makes people want to see the result. The sibilant quality of S creates a sense of anticipation even in closure — your endings feel like the start of something, not just the stop of something." },
    T: { trait: "Purposeful Closer", description: "T capstone implies purposeful closure — decisive, clean, no wasted energy. The dental stop of T cuts cleanly; your completions have crisp edges. There's no ambiguity about when something you finished is finished. This precision makes you effective in deadline-driven environments where clean closure is more valuable than elaborate flourishes." },
    U: { trait: "Intuitive Finisher", description: "U endings suggest intuitive completion — the outcome often exceeds what was consciously planned because you allow unconscious wisdom to guide the final stages. This produces work that surprises even you — the finished product contains insights you didn't know you had. Trusting this process is your key to completion that transcends the mechanical." },
    V: { trait: "Determined Closer", description: "V capstone projects determined closure — obstacles in the final stretch are overcome through pure will. When others would give up in the last mile, your V-capstone energy pushes through. This tenacity means your completions happen even when conditions are against you, which builds a reputation for reliability under pressure that few can match." },
    W: { trait: "Mission-Driven Finisher", description: "W endings imply purposeful completion — the result serves a larger goal beyond itself. Your completions are never just about the immediate task; they're building blocks for something bigger. This gives your finished work a sense of meaning and trajectory that purely task-oriented completion styles lack." },
    X: { trait: "Independent Closer", description: "X capstone suggests independent closure — the finish defies expectations in compelling ways. You don't complete things the way people expect, and that's your strength. The X-capstone brings originality to the finishing process itself, producing outcomes that redefine what was thought possible within the original parameters." },
    Y: { trait: "Spiritual Finisher", description: "Y endings imply spiritual completion — the result carries meaning beyond its practical function. There's a transcendent quality to how you finish things, as if the completion process itself is a form of meditation or meaning-making. Your finished work often touches people at levels they can't quite articulate." },
    Z: { trait: "Dynamic Closer", description: "Z capstone projects energetic closure — the finish is dynamic and leaves a lasting impression. Nothing you complete fades quietly into the background. The Z-capstone brings electric energy to endings, making them events rather than formalities. People remember how you finished something long after they forget the middle." }
};

const FIRST_VOWEL_READINGS = {
    A: { trait: "Direct & Bold", description: "Your first vowel A reveals an inner nature that is straightforward, ambitious, and action-oriented. You process experiences through the lens of 'What can I do about this?' before anything else." },
    E: { trait: "Perceptive & Restless", description: "Your first vowel E reveals an inner nature that is curious, freedom-seeking, and perceptive. You process experiences through sensation and movement — stillness is difficult." },
    I: { trait: "Sensitive & Precise", description: "Your first vowel I reveals an inner nature that is deeply sensitive, detail-oriented, and idealistic. You process experiences through feeling first, then analysis." },
    O: { trait: "Principled & Deep", description: "Your first vowel O reveals an inner nature that is emotionally deep, principled, and moral. You process experiences through your values — right and wrong matter immensely to you." },
    U: { trait: "Intuitive & Receptive", description: "Your first vowel U reveals an inner nature that is intuitive, receptive, and somewhat mysterious even to yourself. You process experiences through unconscious knowing." },
    Y: { trait: "Analytical & Spiritual", description: "Your first vowel Y (functioning as a vowel) reveals an inner nature that bridges the analytical and the spiritual. You process experiences through a dual lens of logic and intuition." }
};

function calculateNameAnalysis(name) {
    if (!name || name.length < 2) return null;
    
    const cleanName = name.trim().toUpperCase();
    const firstName = cleanName.split(/\s+/)[0];
    
    // Cornerstone (first letter)
    const cornerstone = firstName[0];
    const cornerstoneReading = CORNERSTONE_READINGS[cornerstone] || { trait: "Unique", description: "Your name begins with an uncommon character, projecting originality." };
    
    // Capstone (last letter of first name)
    const capstone = firstName[firstName.length - 1];
    const capstoneData = CAPSTONE_READINGS[capstone] || { trait: "Unique Finisher", description: "Your name ends with a distinctive character, suggesting an unconventional completion style." };
    const capstoneReading = capstoneData.description;
    
    // First vowel
    const vowels = 'AEIOUY';
    let firstVowel = '';
    for (let i = 0; i < firstName.length; i++) {
        if (vowels.includes(firstName[i])) { firstVowel = firstName[i]; break; }
    }
    const firstVowelReading = FIRST_VOWEL_READINGS[firstVowel] || { trait: "Mysterious", description: "The absence of a conventional first vowel projects enigma." };
    
    // Phonetic Impact Analysis
    const fullName = cleanName.replace(/[^A-Z]/g, '');
    
    // Count phonetic qualities
    const hardConsonants = (fullName.match(/[BCDGKPQT]/g) || []).length;
    const softConsonants = (fullName.match(/[FHLMNRSVWYZ]/g) || []).length;
    const vowelCount = (fullName.match(/[AEIOU]/g) || []).length;
    const totalLen = fullName.length;
    
    const hardRatio = hardConsonants / totalLen;
    const softRatio = softConsonants / totalLen;
    const vowelRatio = vowelCount / totalLen;
    
    // Phonetic personality
    let dominanceScore = Math.round(hardRatio * 100);
    let warmthScore = Math.round((softRatio + vowelRatio) * 60);
    let authorityScore = Math.round(hardRatio * 70 + (totalLen > 8 ? 15 : 0));
    let approachabilityScore = Math.round(vowelRatio * 100 + softRatio * 30);
    
    // Memorability factors
    let memorabilityScore = 0;
    // Short names are more memorable
    if (firstName.length <= 5) memorabilityScore += 25;
    else if (firstName.length <= 7) memorabilityScore += 15;
    // Unusual letter combos are memorable
    if (/[XZQK]/.test(firstName)) memorabilityScore += 20;
    // Repeated sounds increase memorability
    const letterFreqs = {};
    for (const ch of firstName) { letterFreqs[ch] = (letterFreqs[ch] || 0) + 1; }
    if (Object.values(letterFreqs).some(f => f >= 2)) memorabilityScore += 15;
    // Strong opening consonant
    if (/[BCDGKPT]/.test(firstName[0])) memorabilityScore += 15;
    // Vowel ending (more musical)
    if (/[AEIOUY]/.test(firstName[firstName.length - 1])) memorabilityScore += 10;
    memorabilityScore = Math.min(100, memorabilityScore);
    
    // Brand Strength
    let brandScore = Math.round(
        (memorabilityScore * 0.3) +
        (authorityScore * 0.25) +
        (dominanceScore * 0.2) +
        (firstName.length <= 6 ? 25 : 10)
    );
    brandScore = Math.min(100, brandScore);
    
    // Cap all scores at 100
    dominanceScore = Math.min(100, dominanceScore);
    warmthScore = Math.min(100, warmthScore);
    authorityScore = Math.min(100, authorityScore);
    approachabilityScore = Math.min(100, approachabilityScore);
    
    // Cornerstone + Capstone Synthesis
    let nameSynthesis = '';
    const csElement = /[BCDGKPQT]/.test(cornerstone) ? 'hard' : (/[AEIOU]/.test(cornerstone) ? 'vowel' : 'soft');
    const cpElement = /[BCDGKPQT]/.test(capstone) ? 'hard' : (/[AEIOU]/.test(capstone) ? 'vowel' : 'soft');
    
    if (csElement === 'hard' && cpElement === 'hard') {
        nameSynthesis = `Your name opens and closes with hard consonants (${cornerstone} → ${capstone}), creating a name profile of strength bookending strength. People perceive you as formidable from first impression to final delivery. This is a power name — it commands respect in professional environments and projects executive authority. The challenge is that it can create distance in intimate settings where softness is needed.`;
    } else if (csElement === 'hard' && cpElement === 'vowel') {
        nameSynthesis = `Your name opens with the authority of ${cornerstone} and closes with the openness of ${capstone} — a powerful combination that projects strength followed by approachability. You make strong first impressions but leave people feeling welcomed. This "iron fist in a velvet glove" pattern is found in many successful leaders who need to be both commanding and likable.`;
    } else if (csElement === 'hard' && cpElement === 'soft') {
        nameSynthesis = `Your name opens with force (${cornerstone}) and resolves with softness (${capstone}), creating a natural arc from impact to warmth. People experience you as initially impressive, then increasingly comfortable. This pattern builds trust efficiently — you're taken seriously immediately, then liked quickly.`;
    } else if (csElement === 'vowel' && cpElement === 'hard') {
        nameSynthesis = `Your name opens with the approachability of ${cornerstone} and closes with the decisiveness of ${capstone}. People find you easy to approach but come away respecting your substance. This "soft opening, strong close" pattern is excellent for roles where you need people to let their guard down before you deliver impact — teaching, counseling, negotiation, sales.`;
    } else if (csElement === 'vowel' && cpElement === 'vowel') {
        nameSynthesis = `Your name opens and closes with vowels (${cornerstone} → ${capstone}), creating maximum openness and musicality. This is the most approachable name pattern — people feel safe, welcomed, and drawn in. In professional settings, you may need to consciously project authority to counterbalance the inherent warmth of your name's sonic signature.`;
    } else if (csElement === 'vowel' && cpElement === 'soft') {
        nameSynthesis = `Your name opens with the warmth of ${cornerstone} and flows to the gentleness of ${capstone}. This is a name that puts people at ease — it sounds inviting and trustworthy from start to finish. You project emotional intelligence and accessibility, which makes you magnetic in helping professions, creative fields, and any role requiring genuine human connection.`;
    } else if (csElement === 'soft' && cpElement === 'hard') {
        nameSynthesis = `Your name opens with flow (${cornerstone}) and ends with impact (${capstone}), creating a crescendo effect — building from gentleness to strength. People may initially underestimate you, but your finishing power changes their assessment. This pattern serves you well in negotiations and creative work where the ending matters more than the opening.`;
    } else if (csElement === 'soft' && cpElement === 'vowel') {
        nameSynthesis = `Your name opens with the fluidity of ${cornerstone} and resolves with the openness of ${capstone}. This creates a name profile of consistent warmth and approachability — no hard edges anywhere. People feel comfortable with you immediately and remain comfortable. The gift is relational ease; the development edge is projecting authority when the situation demands it.`;
    } else {
        nameSynthesis = `Your name opens with ${cornerstone} and closes with ${capstone}, creating a consistent flow of soft energy throughout. This projects approachability, emotional intelligence, and creative sensitivity. You're the person others naturally confide in and collaborate with. Your name's sonic signature is an asset in any field requiring trust and relational depth.`;
    }
    
    // Overall name profile type
    let nameProfile = '';
    if (dominanceScore > 60 && authorityScore > 50) nameProfile = 'Power Name';
    else if (warmthScore > 60 && approachabilityScore > 60) nameProfile = 'Warmth Name';
    else if (memorabilityScore > 70) nameProfile = 'Distinctive Name';
    else if (brandScore > 70) nameProfile = 'Brand Name';
    else if (dominanceScore > 40 && warmthScore > 40) nameProfile = 'Balanced Name';
    else nameProfile = 'Subtle Name';
    
    return {
        cornerstone: { letter: cornerstone, ...cornerstoneReading },
        capstone: { letter: capstone, trait: capstoneData.trait, reading: capstoneReading },
        firstVowel: { letter: firstVowel, ...firstVowelReading },
        synthesis: nameSynthesis,
        nameProfile: nameProfile,
        phonetics: {
            dominance: dominanceScore,
            warmth: warmthScore,
            authority: authorityScore,
            approachability: approachabilityScore,
            memorability: memorabilityScore,
            brandStrength: brandScore
        },
        nameLength: firstName.length,
        fullNameLength: cleanName.replace(/\s+/g, '').length
    };
}


// ============================================
// 7. LOCATION STRATEGY (Simplified Astrocartography)
// ============================================

const SIGN_GEOGRAPHY = {
    Aries: { regions: ["Berlin", "England", "Israel", "New York", "Sydney"], energy: "High-energy cities with startup culture, competitive environments, and strong individual identity", themes: "entrepreneurship, independence, fast-paced career growth" },
    Taurus: { regions: ["Switzerland", "Ireland", "New Zealand", "Portland (OR)", "Tuscany"], energy: "Beautiful, stable environments with strong connection to nature, food culture, and quality of life", themes: "financial stability, lifestyle quality, sensory richness" },
    Gemini: { regions: ["London", "San Francisco", "Singapore", "Buenos Aires", "Amsterdam"], energy: "Intellectually stimulating, diverse, multilingual environments with strong media and communication industries", themes: "networking, communication, media, intellectual stimulation" },
    Cancer: { regions: ["Scotland", "New Orleans", "Denmark", "Vancouver", "Tokyo"], energy: "Places with strong community bonds, cultural roots, family orientation, and emotional depth", themes: "community, belonging, emotional safety, cultural richness" },
    Leo: { regions: ["Los Angeles", "Paris", "Dubai", "Rio de Janeiro", "Mumbai"], energy: "Glamorous, creative, performance-oriented cities with strong entertainment and arts scenes", themes: "creative expression, recognition, leadership visibility" },
    Virgo: { regions: ["Geneva", "Boston", "Munich", "Stockholm", "Melbourne"], energy: "Well-organized, efficient cities with strong healthcare, education, and service infrastructure", themes: "health, precision work, service, analytical careers" },
    Libra: { regions: ["Vienna", "Florence", "Montreal", "Kyoto", "Copenhagen"], energy: "Aesthetically refined, diplomatically oriented, culturally balanced environments", themes: "partnerships, art, diplomacy, justice, design" },
    Scorpio: { regions: ["Istanbul", "Marrakech", "Mexico City", "Moscow", "New Orleans"], energy: "Intense, transformative, psychologically deep environments with visible undercurrents of power", themes: "transformation, research, psychology, strategic power" },
    Sagittarius: { regions: ["Barcelona", "Cape Town", "Austin", "Bali", "Lisbon"], energy: "Expansive, multicultural, adventurous environments with strong educational and philosophical traditions", themes: "education, travel, philosophy, freedom, expansion" },
    Capricorn: { regions: ["Zurich", "Washington D.C.", "Edinburgh", "Seoul", "Brussels"], energy: "Institutional, structured, achievement-oriented environments with clear hierarchies and advancement paths", themes: "career advancement, institutional power, long-term building" },
    Aquarius: { regions: ["San Francisco", "Tel Aviv", "Berlin", "Amsterdam", "Reykjavik"], energy: "Progressive, tech-forward, unconventional environments that celebrate individuality and innovation", themes: "technology, innovation, community, humanitarian work" },
    Pisces: { regions: ["Bali", "Lisbon", "Sedona", "Kerala", "Byron Bay"], energy: "Spiritually rich, artistically inspiring, water-connected environments with strong healing traditions", themes: "spirituality, art, healing, imagination, creative flow" }
};

function calculateLocationStrategy(readings) {
    const mcSign = getSignName(readings.astrology.midheaven);
    const risingSign = getSignName(readings.astrology.risingSign);
    const sunSign = getSignName(readings.astrology.sunSign);
    const moonSign = getSignName(readings.astrology.moonSign);
    const venusSign = getSignName(readings.astrology.venusSign);
    const jupiterSign = getSignName(readings.astrology.jupiterSign);
    const marsSign = getSignName(readings.astrology.marsSign);
    const saturnSign = getSignName(readings.astrology.saturnSign);
    const mercurySign = getSignName(readings.astrology.mercurySign);
    
    // IC is opposite MC (4th house cusp)
    const mcIndex = SIGN_ORDER.indexOf(mcSign);
    const icSign = mcIndex >= 0 ? SIGN_ORDER[(mcIndex + 6) % 12] : sunSign;
    
    // Descendant is opposite Rising
    const ascIndex = SIGN_ORDER.indexOf(risingSign);
    const descSign = ascIndex >= 0 ? SIGN_ORDER[(ascIndex + 6) % 12] : 'Unknown';
    
    const results = {
        career: {
            title: "Career Power Zones",
            subtitle: "Where your professional authority is naturally amplified",
            sign: mcSign,
            data: SIGN_GEOGRAPHY[mcSign] || null,
            explanation: `Your Midheaven (career point) is in ${mcSign}. Locations with ${mcSign} energy — ${(SIGN_GEOGRAPHY[mcSign] || {}).themes || 'varied themes'} — amplify your professional visibility and advancement.`
        },
        identity: {
            title: "Identity & Vitality Zones",
            subtitle: "Where you feel most alive and authentically yourself",
            sign: risingSign,
            data: SIGN_GEOGRAPHY[risingSign] || null,
            explanation: `Your Ascendant is in ${risingSign}. Locations resonating with ${risingSign} energy support your physical vitality, self-expression, and sense of authentic identity.`
        },
        homeBase: {
            title: "Ideal Home Base",
            subtitle: "Where you feel most rooted and emotionally secure",
            sign: icSign,
            data: SIGN_GEOGRAPHY[icSign] || null,
            explanation: `Your IC (home point) is in ${icSign}. Locations with ${icSign} energy — ${(SIGN_GEOGRAPHY[icSign] || {}).themes || 'varied themes'} — provide emotional nourishment and a sense of deep belonging.`
        },
        partnership: {
            title: "Partnership Zones",
            subtitle: "Where you attract your strongest allies and partners",
            sign: descSign,
            data: SIGN_GEOGRAPHY[descSign] || null,
            explanation: `Your Descendant is in ${descSign}. Locations with ${descSign} energy attract compatible partners, collaborators, and allies.`
        },
        lifestyle: {
            title: "Lifestyle & Pleasure Zones",
            subtitle: "Where your quality of life peaks",
            sign: venusSign,
            data: SIGN_GEOGRAPHY[venusSign] || null,
            explanation: `Venus in ${venusSign} means your aesthetic, romantic, and lifestyle satisfaction peaks in environments matching ${venusSign} energy.`
        },
        growth: {
            title: "Expansion & Opportunity Zones",
            subtitle: "Where luck and opportunity multiply",
            sign: jupiterSign,
            data: SIGN_GEOGRAPHY[jupiterSign] || null,
            explanation: `Jupiter in ${jupiterSign} amplifies your luck and opportunity in locations matching ${jupiterSign} energy — ${(SIGN_GEOGRAPHY[jupiterSign] || {}).themes || 'growth areas'}.`
        },
        competition: {
            title: "Competitive Advantage Zones",
            subtitle: "Where your drive, energy, and competitive instincts are sharpest",
            sign: marsSign,
            data: SIGN_GEOGRAPHY[marsSign] || null,
            explanation: `Mars in ${marsSign} means your physical energy, competitive instincts, and fighting spirit peak in environments matching ${marsSign} energy. These are the places where you outperform, out-hustle, and out-strategize your competition — where your particular brand of drive resonates with the local culture.`
        },
        authority: {
            title: "Long-Term Authority Zones",
            subtitle: "Where you build lasting institutional credibility and respect",
            sign: saturnSign,
            data: SIGN_GEOGRAPHY[saturnSign] || null,
            explanation: `Saturn in ${saturnSign} means your authority, discipline, and long-term credibility build most naturally in environments matching ${saturnSign} energy — ${(SIGN_GEOGRAPHY[saturnSign] || {}).themes || 'structured growth'}. These locations may challenge you initially, but they reward sustained effort with deep, lasting respect and institutional standing.`
        },
        communication: {
            title: "Communication & Networking Zones",
            subtitle: "Where your ideas land best and your voice carries furthest",
            sign: mercurySign,
            data: SIGN_GEOGRAPHY[mercurySign] || null,
            explanation: `Mercury in ${mercurySign} means your communication style, intellectual approach, and networking abilities are most effective in environments matching ${mercurySign} energy. These are the places where people understand how you think, where your writing and speaking resonate, and where professional connections form most naturally.`
        },
        emotionalHome: {
            title: "Emotional Nourishment Zones",
            subtitle: "Where your emotional body feels most fed and at peace",
            sign: moonSign,
            data: SIGN_GEOGRAPHY[moonSign] || null,
            explanation: `Your Moon in ${moonSign} means your emotional needs — safety, comfort, belonging — are most naturally met in environments matching ${moonSign} energy. This isn't about career or ambition; it's about where you can exhale, recharge, and feel genuinely at home in your own skin. When life gets hard, these are your sanctuary zones.`
        }
    };
    
    // Cross-reference: if MC and Rising share element, those locations are doubly powerful
    const mcElement = ELEMENT_MAP[mcSign];
    const ascElement = ELEMENT_MAP[risingSign];
    let powerAlignment = null;
    if (mcElement && mcElement === ascElement) {
        powerAlignment = `Your career axis and identity axis share the ${mcElement} element — locations matching this energy are doubly powerful for you. You don't just succeed there; you become more yourself while succeeding.`;
    }
    
    // Additional cross-reference: Mars-MC alignment
    const marsElement = ELEMENT_MAP[marsSign];
    let driveAlignment = null;
    if (marsElement && marsElement === mcElement) {
        driveAlignment = `Your Mars and Midheaven share the ${marsElement} element — your competitive drive naturally fuels your career path. Locations matching this energy put you in professional environments where aggression and ambition are assets rather than liabilities.`;
    }
    
    // Moon-IC alignment (emotional home matches actual home needs)
    const moonElement = ELEMENT_MAP[moonSign];
    const icElement = ELEMENT_MAP[icSign];
    let rootAlignment = null;
    if (moonElement && moonElement === icElement) {
        rootAlignment = `Your Moon and IC share the ${moonElement} element — your emotional needs and your ideal home environment are deeply aligned. When you find a location matching this energy, you'll know immediately that you belong there.`;
    }
    
    return {
        zones: results,
        powerAlignment: powerAlignment,
        driveAlignment: driveAlignment,
        rootAlignment: rootAlignment,
        hasMC: mcSign !== 'Unknown'
    };
}


// ============================================
// PUBLIC API
// ============================================

return {
    calculateBiologicalTiming: calculateBiologicalTiming,
    calculateIdentityCompression: calculateIdentityCompression,
    calculateProbabilityWindows: calculateProbabilityWindows,
    calculateCognitiveTendencies: calculateCognitiveTendencies,
    calculateArchetypalRole: calculateArchetypalRole,
    calculateNameAnalysis: calculateNameAnalysis,
    calculateLocationStrategy: calculateLocationStrategy
};

})();
