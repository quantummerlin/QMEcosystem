// ============================================
// HOUSE READINGS - Planetary Placements
// ============================================
// Readings for planets in each of the 12 houses
// ============================================

const HOUSE_READINGS = {
    Sun: {
        1: {
            title: "Sun in 1st House - Radiant Self",
            keywords: ["Identity", "Confidence", "Leadership", "Vitality"],
            reading: `With the Sun illuminating their 1st House of Self, this little one has a radiant presence that naturally draws attention. Their core identity shines brightly, and they'll develop a strong sense of self from an early age.

This placement gifts them with natural confidence and vitality. They may be the kind of child who lights up a room when they enter, with an innate charisma that makes others notice them. Their personality is their power - authentic, warm, and commanding.

As they grow, they'll find that their greatest strength comes from being unapologetically themselves. They're here to lead by example, showing others the power of authentic self-expression. Physical vitality and energy are strong with this placement.

Support their natural leadership abilities while teaching humility. They may need gentle guidance to balance their strong personality with consideration for others. Their confidence is a gift - help them use it to uplift rather than overpower.`,
            strengths: ["Natural leadership", "Strong identity", "Confidence", "Vitality"],
            challenges: ["Ego", "Self-centeredness", "Overshadowing others"],
            guidance: "Nurture their self-confidence while teaching compassion and teamwork."
        },
        2: {
            title: "Sun in 2nd House - Builder of Security",
            keywords: ["Values", "Resources", "Stability", "Self-Worth"],
            reading: `With the Sun in their 2nd House, this child's core identity connects deeply to security, values, and building lasting foundations. They'll have a natural understanding of worth - both material and personal - from a young age.

This placement creates a builder, someone who finds fulfillment in creating stability and accumulating resources. They may show early interest in money, possessions, or collecting things they value. Their self-esteem is closely tied to what they can create and maintain.

As they develop, they'll discover that their greatest gift is the ability to build lasting value. Whether it's financial security, meaningful possessions, or solid foundations for themselves and others, they have a talent for making things grow and endure.

Teach them that their worth isn't determined by what they have, but by who they are. Help them develop healthy values around money and possessions. They can become wonderfully generous once they feel secure.`,
            strengths: ["Financial wisdom", "Values clarity", "Building ability", "Resourcefulness"],
            challenges: ["Materialism", "Stubbornness", "Self-worth tied to possessions"],
            guidance: "Support their natural business sense while teaching that true worth comes from within."
        },
        3: {
            title: "Sun in 3rd House - Bright Communicator",
            keywords: ["Communication", "Learning", "Curiosity", "Expression"],
            reading: `The Sun shining in the 3rd House creates a natural communicator and eternal student. This child's identity is expressed through words, ideas, and constant learning. They'll likely talk early and often, always curious about how things work.

Their mind is their playground, and they'll thrive in environments rich with books, conversations, and new information. Siblings, neighbors, and early childhood friends play an important role in shaping who they become. They process life through communication.

As they grow, writing, speaking, teaching, or any form of communication may become central to their path. They have a gift for making complex ideas simple and connecting people through shared information. Their voice matters.

Provide endless books, educational opportunities, and conversation. They need mental stimulation like others need food. Siblings and cousins may be especially important relationships. Help them develop depth alongside their breadth of interests.`,
            strengths: ["Communication skills", "Quick learning", "Versatility", "Curiosity"],
            challenges: ["Scattered focus", "Superficiality", "Mental restlessness"],
            guidance: "Feed their hungry mind while teaching focus and depth. Quality over quantity in learning."
        },
        4: {
            title: "Sun in 4th House - Heart of Home",
            keywords: ["Family", "Roots", "Emotions", "Foundation"],
            reading: `With the Sun at the very foundation of their chart - the 4th House - this child's identity is deeply rooted in home, family, and emotional security. They are the heart of the home, finding their power in private, intimate spaces rather than public arenas.

Family heritage and home environment profoundly shape who they become. They may be deeply connected to one parent in particular, or to family traditions and history. Creating a safe, nurturing home base is essential for their development and will remain important throughout life.

As they mature, they'll often find greatest fulfillment in caring for family, creating beautiful homes, or working in fields that nurture others. Their private life is where they truly shine. The world may not see their full light, but those closest to them feel it powerfully.

Create a stable, warm home environment. Family time and traditions matter deeply. They may be shy in public but confident at home. Their roots will always be important - honoring family history helps them thrive.`,
            strengths: ["Emotional depth", "Nurturing ability", "Family devotion", "Creating sanctuary"],
            challenges: ["Private nature", "Difficulty with public life", "Clingy to family"],
            guidance: "Provide a secure home base from which they can explore the world when ready."
        },
        5: {
            title: "Sun in 5th House - Creative Spirit",
            keywords: ["Creativity", "Joy", "Self-Expression", "Play"],
            reading: `The Sun in the 5th House creates a natural performer and creative spirit. This child's very essence is joyful, playful, and expressive. They're here to remind us all not to take life too seriously and that creativity is essential to being human.

From early on, they'll likely show artistic talents or dramatic flair. They need creative outlets like they need air - whether it's art, music, dance, drama, or imaginative play. Their personality shines brightest when they're creating or performing. Life is their stage.

As they grow, careers in the arts, entertainment, or any field allowing creative self-expression will call to them. They have a gift for bringing joy and beauty into the world. Children and romantic love will also be significant life themes.

Provide abundant creative opportunities. Drama classes, art supplies, music lessons - these aren't luxuries for this child, they're necessities. Praise their creations generously. They blossom with appreciation and wilt without it.`,
            strengths: ["Creative talents", "Joyful nature", "Performance ability", "Magnetic charm"],
            challenges: ["Need for attention", "Drama", "Risk-taking"],
            guidance: "Nurture their creative gifts while teaching that not every moment needs to be a performance."
        },
        6: {
            title: "Sun in 6th House - Devoted Server",
            keywords: ["Service", "Health", "Work", "Improvement"],
            reading: `With the Sun in the 6th House, this child finds their identity through service, daily routines, and the satisfaction of work well done. They're natural helpers who feel fulfilled when making tangible improvements in their environment and in others' lives.

Even as a small child, they may want to help with chores, care for pets, or assist others. They take pride in being useful and competent. Health and wellness may be significant themes - they're often naturally drawn to healthy habits or, if imbalanced, may struggle with health as a way of learning body awareness.

As they mature, careers in healthcare, service industries, or any field focused on practical help will appeal. They have a gift for seeing what needs fixing and methodically improving it. Perfectionism can be both strength and challenge.

Assign them age-appropriate responsibilities. They actually enjoy being helpful and capable. Teach healthy work-life balance early. Their tendency toward perfectionism needs gentling. Health routines matter - establish good habits young.`,
            strengths: ["Helpfulness", "Attention to detail", "Work ethic", "Health consciousness"],
            challenges: ["Perfectionism", "Worry", "Over-critical nature"],
            guidance: "Appreciate their helpful nature while teaching that rest and imperfection are okay too."
        },
        7: {
            title: "Sun in 7th House - Partnership Soul",
            keywords: ["Relationships", "Partnership", "Balance", "Others"],
            reading: `The Sun in the 7th House means this child discovers who they are through relationships and partnerships. They're natural diplomats who see life through the lens of connection. "I am" becomes "we are" for them - their identity develops through meaningful one-on-one bonds.

From early friendships to future romantic partnerships, relationships are their classroom and their stage. They have natural grace in dealing with others, often showing early diplomatic skills. They may be the peacemaker among siblings or the friend who brings groups together.

As they grow, marriage or committed partnership will likely be very important to their life path. They shine brightest when in balance with another. Careers in counseling, law, mediation, or any field involving partnership can fulfill them deeply.

Teach healthy relationship skills early. Help them develop a strong individual identity before defining themselves through others. They'll always be relationship-oriented, but must learn they're complete on their own too.`,
            strengths: ["Diplomatic skills", "Partnership ability", "Fair-mindedness", "Social grace"],
            challenges: ["Dependency on others", "Difficulty alone", "People-pleasing"],
            guidance: "Support their social nature while ensuring they develop a strong sense of self."
        },
        8: {
            title: "Sun in 8th House - Depth Seeker",
            keywords: ["Transformation", "Depth", "Power", "Mystery"],
            reading: `With the Sun in the intense 8th House, this child has an old soul quality and natural attraction to life's mysteries. They're deep, perceptive, and powerfully transformative. While other children play on the surface, this one wants to know what's underneath.

They may ask profound questions early, show interest in topics others find dark or taboo, and have an uncanny ability to see through pretense. Emotional intensity is their norm. They feel everything deeply and have little patience for superficiality.

As they mature, they'll be drawn to careers or interests involving psychology, healing, research, or anything requiring depth and transformation. They have healing gifts and the ability to help others through dark times. Their power is in their depth.

Honor their intensity rather than trying to lighten it. They're not interested in shallow pleasures. Privacy matters deeply to them - respect it. They may go through powerful transformations throughout life. This is how they grow.`,
            strengths: ["Emotional depth", "Transformative power", "Insight", "Resilience"],
            challenges: ["Intensity", "Control issues", "Difficulty with lightness"],
            guidance: "Respect their depth while ensuring they also experience appropriate childhood joy."
        },
        9: {
            title: "Sun in 9th House - Eternal Explorer",
            keywords: ["Wisdom", "Adventure", "Truth", "Expansion"],
            reading: `The Sun in the 9th House creates a natural philosopher and eternal student of life. This child is born seeking wisdom, truth, and adventure. Their identity expands through learning, travel, and exploring different cultures, beliefs, and perspectives.

Even young, they may ask "why" more than most, wanting to understand the bigger picture. They're natural optimists with faith that life is an adventure worth taking. Books, travel, and exposure to different ways of thinking feed their soul.

As they grow, higher education, travel, teaching, or work involving sharing wisdom will call to them. They have a gift for seeing life's bigger patterns and helping others expand their perspectives. They're here to be bridges between cultures and ideas.

Provide books, travel when possible, and exposure to diverse ideas and cultures. Their mind needs room to roam. Formal education matters, but so does life experience. They're learning about meaning, purpose, and truth.`,
            strengths: ["Wisdom seeking", "Optimism", "Open-mindedness", "Teaching ability"],
            challenges: ["Restlessness", "Over-confidence", "Preachy tendencies"],
            guidance: "Feed their hunger for knowledge and adventure while teaching groundedness and humility."
        },
        10: {
            title: "Sun in 10th House - Destined Leader",
            keywords: ["Achievement", "Career", "Public Life", "Authority"],
            reading: `With the Sun at the very top of their chart in the 10th House, this child is destined for public recognition and achievement. Their light is meant to shine in the world, not be hidden. Leadership and career will be central life themes.

From early on, they may show ambition or a sense of purpose beyond their years. They want to be someone, to accomplish something significant. Authority figures, especially fathers or father-figures, play an important role in shaping their path.

As they mature, career success and public achievement will matter deeply. They're meant to leave a mark on the world. Leadership comes naturally. They have the potential to reach the top of their chosen field and to inspire others through their achievements.

Support their ambitions while ensuring they also have private life and childhood. Success will come, but balance matters. Help them define what success means beyond external achievement. Their purpose is real and should be honored.`,
            strengths: ["Leadership ability", "Ambition", "Public success", "Authority"],
            challenges: ["Work-life balance", "Pressure", "Public scrutiny"],
            guidance: "Honor their ambitions while protecting their childhood and private life."
        },
        11: {
            title: "Sun in 11th House - Humanitarian Heart",
            keywords: ["Friendship", "Community", "Vision", "Innovation"],
            reading: `The Sun in the 11th House creates a natural humanitarian with a vision for a better future. This child's identity develops through friendships, groups, and working toward collective dreams. They're here to show us what human connection and shared hopes can achieve.

From young ages, friendships matter enormously. They're often the one with many friends from different groups, naturally inclusive and future-oriented. They may show early interest in making the world better or in technology and innovation.

As they grow, working with groups, organizations, or causes will fulfill them. They have gifts for bringing people together around shared visions. Technology, humanitarian work, or innovative fields may call. Their friendships remain life-defining.

Encourage diverse friendships and group activities. They thrive with peers. Support their idealistic visions while teaching practical steps. They're dreamers who can make dreams real when given community support.`,
            strengths: ["Friendship ability", "Humanitarian vision", "Innovation", "Community building"],
            challenges: ["Rebellion", "Difficulty with authority", "Scattered social energy"],
            guidance: "Support their social nature and visions while teaching them to work within systems when needed."
        },
        12: {
            title: "Sun in 12th House - Mystic Soul",
            keywords: ["Spirituality", "Compassion", "Dreams", "Service"],
            reading: `With the Sun in the mysterious 12th House, this child has a deeply spiritual, compassionate nature. They may seem to exist partially in another realm, with natural access to dreams, imagination, and spiritual dimensions. They're old souls with gentle, healing presences.

They may be shy or private, preferring solitude or small, intimate settings over large groups. Creative imagination is powerful. They might have imaginary friends, vivid dreams, or seem to know things they couldn't logically know. Boundaries with others may be fluid.

As they mature, careers in healing, spirituality, the arts, or service to those who suffer will call. They have deep wells of compassion and can work behind the scenes to help others. Their power is in their gentleness and spiritual connection.

Respect their need for alone time and quiet. Their sensitivity is real - protect them from harsh environments. Creative and spiritual outlets matter. They need sleep and dream time. Their compassion is beautiful but teach healthy boundaries.`,
            strengths: ["Spiritual connection", "Compassion", "Imagination", "Healing ability"],
            challenges: ["Boundaries", "Escapism", "Victimization", "Shyness"],
            guidance: "Honor their spiritual sensitivity while helping them stay grounded in the physical world."
        }
    }
    // Moon, Mercury, Venus, Mars, Jupiter, Saturn readings would follow similar structure
    // This is just the Sun placements - we need all planets in all houses
    // For brevity in this initial implementation, I'm showing the pattern
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HOUSE_READINGS };
}
