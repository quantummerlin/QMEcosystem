// ============================================
// ASPECT READINGS - Planetary Relationships
// ============================================
// Readings for major aspects between planets
// ============================================

const ASPECT_READINGS = {
    "Sun-Moon": {
        Conjunction: {
            title: "Sun-Moon Conjunction - Unified Spirit",
            keywords: ["Integration", "Wholeness", "Purpose", "Alignment"],
            reading: `With the Sun and Moon together in the same sign, this child has a beautiful unity between their conscious will and emotional needs. What they want and what they feel are aligned - a rare gift that creates internal harmony.

This integration means they know themselves deeply from an early age. There's no war between head and heart, between purpose and feeling. They can trust their instincts because their emotions and will speak the same language.

The challenge is that they may have difficulty understanding people who ARE conflicted internally, since this isn't their experience. They might seem very certain of themselves, which can be both inspiring and occasionally inflexible.

This unified energy makes them powerful manifesto

rs. When they want something and feel it's right, they have tremendous focus and drive. Support their strong sense of self while teaching empathy for those who struggle with internal conflicts.`,
            nature: "harmonious",
            strength: "Emotional-will integration creates powerful self-knowledge and focus",
            challenge: "May struggle to understand internal conflicts in others"
        },
        Opposition: {
            title: "Sun-Moon Opposition - Dynamic Balance",
            keywords: ["Tension", "Awareness", "Balance", "Growth"],
            reading: `The Sun and Moon opposing each other creates internal tension between what this child wants (Sun) and what they need emotionally (Moon). This can feel like being pulled in two directions - their heart wants one thing while their will wants another.

This tension, while challenging, creates remarkable self-awareness. They learn early that life involves balancing competing needs. This makes them understanding of complexity and skilled at seeing multiple sides of situations.

They may swing between extremes - very private one day, very public the next. Their emotions and ego take turns leading. This back-and-forth can feel confusing to them and to parents, but it's teaching them valuable lessons about balance.

The gift is objectivity. Unlike those with Sun-Moon conjunction who may be overly identified with their feelings, this child develops the ability to step back and observe themselves. They're learning to integrate opposites - a powerful life skill.`,
            nature: "challenging",
            strength: "Develops objectivity and ability to balance opposing needs",
            challenge: "Internal tension between feelings and will can create confusion"
        },
        Square: {
            title: "Sun-Moon Square - Creative Friction",
            keywords: ["Friction", "Motivation", "Crisis", "Action"],
            reading: `The square between Sun and Moon creates internal friction that becomes a powerful motivator. This child will feel a fundamental discomfort between who they are (Sun) and what they need emotionally (Moon). This tension refuses to let them settle into complacency.

They're driven to resolve this inner conflict through action and achievement. The friction becomes fuel. They may work harder than others, push themselves more, always trying to reconcile their emotional needs with their life direction.

Crisis points occur periodically when these two parts of themselves clash. A parent may notice times when the child seems torn between what they "should" do and what they feel. These moments are growth opportunities, teaching integration through challenge.

The gift is drive and accomplishment. While harmonious aspects can create ease, squares create achievers. Support them through their internal struggles while celebrating the strength those struggles create. They're learning to turn friction into diamonds.`,
            nature: "challenging",
            strength: "Friction creates powerful drive and motivation to achieve",
            challenge: "Periodic crisis points when will and emotions clash"
        },
        Trine: {
            title: "Sun-Moon Trine - Flowing Harmony",
            keywords: ["Ease", "Flow", "Harmony", "Natural Gifts"],
            reading: `The trine between Sun and Moon is one of the most beautiful aspects in astrology - a flowing harmony between will and emotion. This child has an easy relationship with themselves. What they want and what they need flow together naturally, creating inner peace.

Life comes a bit easier to them than to others. There's natural confidence, emotional stability, and a sense that things will work out. They're often well-liked because their inner harmony creates an pleasant, peaceful presence that others enjoy.

The challenge with such ease is that they may not develop the drive that comes from friction. They can be too comfortable, not pushing themselves because internal peace makes ambition feel unnecessary. They may underestimate their own abilities.

Parents should gently encourage them to use their natural gifts. The harmony they possess is meant to be shared with the world, not kept in comfortable stillness. They have talents that flow easily - help them recognize and develop these rather than taking them for granted.`,
            nature: "harmonious",
            strength: "Natural inner peace and emotional stability",
            challenge: "May be too comfortable, lacking drive to achieve"
        },
        Sextile: {
            title: "Sun-Moon Sextile - Opportunity for Integration",
            keywords: ["Opportunity", "Cooperation", "Potential", "Harmony"],
            reading: `The sextile between Sun and Moon offers opportunities for harmony between will and emotion. Unlike the trine's automatic ease, the sextile requires some effort to activate - but when engaged, it creates beautiful integration.

This child has the potential for great emotional intelligence and self-understanding, but must reach for it. Opportunities to align their feelings with their purpose appear regularly, but they must choose to take advantage of them.

They may show early talent for understanding both themselves and others. The ability to balance emotional needs with conscious goals is available to them - it just requires some attention and practice.

Parents can help by pointing out moments when their child's emotions and actions align beautifully, and by creating opportunities for them to practice emotional intelligence. The gifts are there, ready to be developed with just a bit of conscious effort.`,
            nature: "harmonious",
            strength: "Natural opportunities for emotional-will integration with small effort",
            challenge: "Requires conscious activation - gifts won't develop automatically"
        }
    },
    
    "Venus-Mars": {
        Conjunction: {
            title: "Venus-Mars Conjunction - Passionate Heart",
            keywords: ["Passion", "Desire", "Attraction", "Energy"],
            reading: `With Venus and Mars together, love and desire are unified in this child. What they love (Venus) and what they want (Mars) are the same - creating passionate, direct pursuit of what attracts them. This is the aspect of the romantic, the artist, the person who loves with their whole being.

Even as a child, they pursue what they love with enthusiasm and energy. If they like something, they really like it. Their attractions are strong and direct. Creative and romantic energy flow together naturally.

As they mature, relationships will be passionate affairs. They fall in love easily and express affection directly. Creative pursuits combine beauty (Venus) with drive (Mars), making them natural artists or performers. They want beautiful things and aren't shy about going after them.

The challenge is learning balance and patience. They can be impulsive in both love and creative pursuits, jumping in before thinking. Teach them that sometimes attraction needs time to develop, and that not every desire requires immediate gratification.`,
            nature: "neutral",
            strength: "Passionate pursuit of love and beauty, integrated desire and affection",
            challenge: "Impulsiveness in relationships and creative pursuits"
        },
        Opposition: {
            title: "Venus-Mars Opposition - Romantic Tension",
            keywords: ["Attraction", "Tension", "Balance", "Relationships"],
            reading: `Venus opposite Mars creates dynamic tension in relationships and desires. What this child loves and what they desire pull in opposite directions - creating a fascinating dance between harmony and passion, peace and excitement.

They may swing between wanting peace (Venus) and craving excitement (Mars). In relationships later, they'll be attracted to people who are both similar and different, comfortable and challenging. This keeps life interesting but can create confusion.

The opposition creates a relationship radar - they notice attraction and tension in themselves and others. They're learning to balance giving and taking, peace and passion, compromise and assertion. Each relationship becomes a classroom.

The gift is understanding that love involves both harmony and healthy conflict. They won't settle for boring relationships nor destroy good ones with too much drama. They're learning the dynamic balance that makes relationships truly alive.`,
            nature: "challenging",
            strength: "Deep understanding of relationship dynamics and attraction",
            challenge: "Confusion between peaceful love and passionate desire"
        },
        Square: {
            title: "Venus-Mars Square - Dynamic Desire",
            keywords: ["Friction", "Passion", "Creative Tension", "Drive"],
            reading: `The square between Venus and Mars creates friction between love and desire, between what's pleasant and what's exciting. This tension generates creative and romantic energy - they're driven to create beauty and pursue what they love, but the path isn't smooth.

In creative pursuits, they have vision (Venus) and energy (Mars) but these two don't always cooperate. They may start projects passionately then lose interest, or love something but struggle to achieve it. This friction, while frustrating, generates remarkable creative drive.

In future relationships, they'll experience both attraction and irritation - the square creates chemistry but also challenge. They need partners who can handle both their affection and their fire. Boring relationships won't satisfy them.

The gift is passion. This aspect creates people who care deeply, love strongly, and create powerfully - even if the process is sometimes frustrating. Support their creative pursuits while teaching persistence when passion and execution don't immediately align.`,
            nature: "challenging",
            strength: "Tremendous creative and romantic passion and drive",
            challenge: "Friction between desire and affection creates frustration"
        },
        Trine: {
            title: "Venus-Mars Trine - Graceful Desire",
            keywords: ["Harmony", "Attraction", "Creativity", "Ease"],
            reading: `The trine between Venus and Mars is one of the most beautiful aspects for creativity and future relationships. Love and desire flow together harmoniously - they're attracted to what's good for them and able to pursue what they love with grace and success.

Creative talents come naturally. They have both artistic vision (Venus) and the energy to manifest it (Mars). In relationships later, they attract easily and know how to balance affection with passion. They're naturally charming and magnetic.

This ease can be a double-edged sword. Because attraction and achievement in creative/romantic realms comes so naturally, they may not develop the grit that challenges create. They can be lazy about talents because they work so effortlessly.

Parents should encourage them to fully develop their natural creative and social gifts rather than taking them for granted. They have the potential for real artistry and beautiful relationships - help them reach for that potential rather than coasting on natural charm.`,
            nature: "harmonious",
            strength: "Natural creativity, charm, and ability to attract what they love",
            challenge: "May not develop gifts fully due to ease of expression"
        }
    },
    
    "Mars-Saturn": {
        Conjunction: {
            title: "Mars-Saturn Conjunction - Disciplined Warrior",
            keywords: ["Discipline", "Endurance", "Control", "Achievement"],
            reading: `Mars conjunct Saturn is one of the most powerful aspects for achievement through disciplined effort. This child has energy (Mars) naturally structured by patience and endurance (Saturn). They understand early that good things take time and hard work.

Where other children give up when things get hard, this one keeps going. They have natural grit, self-discipline, and the ability to delay gratification. Athletic or skill-based pursuits suit them - they'll practice longer than others.

The challenge is that Saturn can restrict Mars' natural spontaneity and enthusiasm. They may be too controlled, too careful, holding back natural impulses out of fear of failure or judgment. Frustration can build when their energy meets constant internal resistance.

The gift is ultimately incredible achievement. Through patient, persistent effort, they accomplish what others only dream about. Support their discipline while ensuring they also experience spontaneous joy and permission to try without guarantee of success.`,
            nature: "challenging",
            strength: "Exceptional discipline, endurance, and ability to achieve through sustained effort",
            challenge: "Restricted spontaneity, frustration, fear of failure"
        },
        Opposition: {
            title: "Mars-Saturn Opposition - Balanced Force",
            keywords: ["Tension", "Control", "Timing", "Authority"],
            reading: `Mars opposite Saturn creates tension between action and restraint, between pushing forward and holding back. This child will experience an internal tug-of-war between their desire to act (Mars) and messages to wait, be careful, or control themselves (Saturn).

They may alternate between impulsive action and over-cautious restraint, never quite finding the middle ground. Parents might see them rush into things then suddenly freeze, or hold back and back until they explode into action. This is them learning timing.

Authority figures and rules may feel particularly restrictive to them. They need to act but also need structure - finding the balance between freedom and discipline becomes a lifelong lesson. Rebellion and submission take turns.

The gift is learning perfect timing. Eventually, they develop an instinct for when to push and when to wait. They become people who can both act decisively and exercise remarkable self-control. This balance, once learned, is incredibly powerful.`,
            nature: "challenging",
            strength: "Eventually develops excellent timing and balance of action/restraint",
            challenge: "Internal conflict between impulse and restriction creates frustration"
        }
    },
    
    "Sun-Jupiter": {
        Conjunction: {
            title: "Sun-Jupiter Conjunction - Boundless Spirit",
            keywords: ["Optimism", "Expansion", "Luck", "Confidence"],
            reading: `The Sun conjunct Jupiter blesses this child with natural optimism, confidence, and good fortune. Their identity is tied to expansion, growth, and seeing the bright side of life. They radiate warmth and generosity that attracts opportunities.

This is one of the luckiest aspects in astrology. They seem to be in the right place at the right time, meeting the right people. Their positive outlook creates a self-fulfilling prophecy - expecting good things, they often receive them.

The challenge is excess. They may overestimate their abilities, promise more than they can deliver, or expect success without effort. Their confidence, while magnetic, can tip into arrogance or overindulgence.

Guide their expansive spirit with gentle reality checks while never dampening their beautiful optimism. They're meant to inspire others and live large - just with appropriate boundaries.`,
            nature: "harmonious",
            strength: "Natural luck, optimism, and ability to attract opportunities",
            challenge: "Overconfidence, excess, expecting rewards without effort"
        },
        Trine: {
            title: "Sun-Jupiter Trine - Lucky Star",
            keywords: ["Fortune", "Ease", "Growth", "Wisdom"],
            reading: `Sun trine Jupiter bestows natural good fortune and an easy path to growth and wisdom. This child has guardian-angel energy - things tend to work out for them, and they develop a deep trust in life's benevolence.

Their generous spirit attracts generosity in return. They share naturally and receive abundantly. Educational and travel opportunities flow to them. They may show early wisdom beyond their years.

The ease of this aspect means they may not develop resilience through struggle. When rare difficulties arise, they may be unprepared. Help them appreciate that their good fortune is a gift to be used wisely, not taken for granted.`,
            nature: "harmonious",
            strength: "Natural good fortune, wisdom, and generous spirit",
            challenge: "May lack resilience when facing rare difficulties"
        },
        Square: {
            title: "Sun-Jupiter Square - Restless Growth",
            keywords: ["Excess", "Ambition", "Friction", "Overreach"],
            reading: `Sun square Jupiter creates friction between identity and expansion. This child wants MORE - more experience, more recognition, more of everything. This restless drive for growth can achieve great things but also lead to overextension.

They may promise more than they can deliver, take on too much, or expect recognition before it's earned. Their ambition exceeds their patience. Yet this very friction drives them to accomplish more than those who are content.

The challenge is learning appropriate limits without losing their magnificent ambition. They need gentle boundaries while being encouraged to dream big. Balance their expansive nature with practical steps toward their grand visions.`,
            nature: "challenging",
            strength: "Tremendous ambition and drive for growth",
            challenge: "Overextension, restlessness, impatience for recognition"
        }
    },
    
    "Mercury-Neptune": {
        Conjunction: {
            title: "Mercury-Neptune Conjunction - Dreaming Mind",
            keywords: ["Imagination", "Intuition", "Creativity", "Inspiration"],
            reading: `Mercury conjunct Neptune gives this child a mind that operates on both logical and mystical wavelengths. Their thinking is infused with imagination, intuition, and creative inspiration. They may show artistic or psychic talents early.

Learning happens differently for them - through images, feelings, and inspiration rather than pure logic. They absorb information from their environment almost psychically. Music, art, and fantasy deeply engage their mind.

The challenge is distinguishing reality from imagination. They may believe things that aren't true, have difficulty with precise facts, or struggle with deception (giving or receiving). Clear boundaries between real and imagined are essential.

Nurture their magical thinking while grounding them in practical reality. They have gifts for creative and intuitive fields - just ensure they also develop discernment and healthy skepticism.`,
            nature: "neutral",
            strength: "Brilliant creative imagination and intuitive intelligence",
            challenge: "Confusion between fact and fantasy, difficulty with precision"
        },
        Square: {
            title: "Mercury-Neptune Square - Foggy Insights",
            keywords: ["Confusion", "Creativity", "Deception", "Imagination"],
            reading: `Mercury square Neptune creates friction between logical thinking and intuitive knowing. This child's mind may feel foggy or confused at times, struggling to grasp concrete details while perceiving subtle, intangible truths.

They may have learning differences - not because they're less intelligent, but because their mind works differently. Abstract and creative thinking comes naturally; rote memorization and precise facts are challenging.

The gift is accessing realms of imagination and intuition that logical minds miss. They think in poetry, metaphor, and vision. Creative, spiritual, and artistic pursuits suit their non-linear intelligence.

Patience with their different learning style is essential. Avoid labeling their foggy moments as flaws - instead, help them translate their intuitive insights into practical expression.`,
            nature: "challenging",
            strength: "Access to intuitive and creative intelligence beyond logic",
            challenge: "Mental confusion, difficulty with facts and precision"
        }
    },
    
    "Jupiter-Saturn": {
        Conjunction: {
            title: "Jupiter-Saturn Conjunction - Grounded Expansion",
            keywords: ["Balance", "Achievement", "Wisdom", "Timing"],
            reading: `Jupiter conjunct Saturn is a rare and powerful aspect that balances expansion with limitation, optimism with realism. This child understands instinctively that big dreams require practical steps, and that patience enhances rather than limits growth.

They take calculated risks rather than blind leaps. Their ambitions are realistic, their plans practical. They inspire others with vision while also being able to execute. This combination creates natural leaders and successful achievers.

The internal balance may sometimes feel like internal conflict - the part that wants MORE battling the part that says WAIT. This tension, once integrated, becomes their greatest strength.

This aspect occurs only every 20 years, marking generational themes. Support their natural ability to dream big while building carefully. They're learning to balance faith and fear, expansion and contraction.`,
            nature: "neutral",
            strength: "Perfect balance of vision and practical execution",
            challenge: "Internal tension between expansion and limitation"
        },
        Opposition: {
            title: "Jupiter-Saturn Opposition - Expansion vs. Limitation",
            keywords: ["Tension", "Balance", "Growth", "Restriction"],
            reading: `Jupiter opposite Saturn creates a tug-of-war between wanting more and needing less, between faith and fear, between expansion and contraction. This child will experience periods of growth alternating with periods of restriction.

They may swing between excessive optimism and excessive caution, between taking on too much and holding back too long. Finding the middle ground between these extremes becomes a central life lesson.

The gift is eventual mastery of timing. They learn when to expand and when to consolidate, when to leap and when to wait. This wisdom, hard-earned through experience, makes them excellent advisors.`,
            nature: "challenging",
            strength: "Develops excellent timing and balanced judgment",
            challenge: "Swings between excess and restriction until balance is found"
        }
    }
};

// Helper function to get aspect reading
function getAspectReading(planet1, planet2, aspectName) {
    const pair = `${planet1}-${planet2}`;
    const reversePair = `${planet2}-${planet1}`;
    
    if (ASPECT_READINGS[pair] && ASPECT_READINGS[pair][aspectName]) {
        return ASPECT_READINGS[pair][aspectName];
    }
    
    if (ASPECT_READINGS[reversePair] && ASPECT_READINGS[reversePair][aspectName]) {
        return ASPECT_READINGS[reversePair][aspectName];
    }
    
    return null;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASPECT_READINGS, getAspectReading };
}
