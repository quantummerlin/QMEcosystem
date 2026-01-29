// ============================================
// ULTIMATE READING SYSTEM - EXTENDED READINGS
// ============================================
// Additional premium-depth readings for:
// - Angular Houses (1st, 4th, 7th, 10th)
// - Additional Planetary Aspects
// - Vertex by Sign
// - Nodes in Houses
// - Synthesis Readings (Career, Spiritual, Shadow, Money)
// - Progressions
// - Cosmic Wrap-Up
// ============================================

// ============================================
// ANGULAR HOUSES - The Four Pillars of Life
// ============================================

const ANGULAR_HOUSE_READINGS = {
    1: { // Ascendant/Rising - Self & Identity
        Aries: {
            title: "The Warrior Emergence",
            keywords: ["Bold Presence", "Pioneer Spirit", "Independent Soul", "Action-First"],
            reading: `With the 1st House (Ascendant) in Aries, this soul enters the world with the energy of the warrior and pioneer. The first breath carries the fire of initiative, courage, and independent spirit.

The world will see this child as someone who takes action, who doesn't wait for permission, who leads rather than follows. There's an unmistakable vitality and directness in their presence. They meet life head-on, with courage as their birthright.

This placement gifts natural leadership abilities that emerge from earliest childhood. Watch for the child who organizes other children, who wants to go first, who shows fearlessness that sometimes needs tempering with wisdom.

The life lesson woven into this Rising sign is learning that courage is not the absence of fear but action despite fear. They're here to show others how to begin, how to take the first brave step into the unknown.`,
            strengths: ["Natural courage", "Initiative", "Leadership presence", "Authentic self-expression"],
            challenges: ["Impulsiveness", "Impatience", "Can seem aggressive", "Learning to wait"]
        },
        Taurus: {
            title: "The Steady Emergence",
            keywords: ["Grounded Presence", "Sensual Soul", "Patient Builder", "Natural Grace"],
            reading: `With the 1st House (Ascendant) in Taurus, this soul enters the world with the energy of the earth itself - solid, reliable, and naturally graceful. The first breath carries the gift of groundedness and sensory awareness.

The world will perceive this child as calm, perhaps even stubborn, but unmistakably present. There's a natural elegance and an appreciation for beauty that shows from the earliest age. They meet life with patience and persistence.

This placement gifts a strong connection to the physical world - comfort, beauty, nature, and the simple pleasures of embodiment. Watch for the child who takes time to smell flowers, who notices textures, who finds security in routine.

The life lesson woven into this Rising sign is learning that true security comes from within, not from possessions. They're here to show others the beauty of slowness, of savoring, of building something that lasts.`,
            strengths: ["Natural stability", "Appreciation of beauty", "Patience", "Reliable presence"],
            challenges: ["Resistance to change", "Stubbornness", "Can seem slow", "Attachment to comfort"]
        },
        Gemini: {
            title: "The Curious Emergence",
            keywords: ["Quick Presence", "Curious Soul", "Communicator", "Mental Agility"],
            reading: `With the 1st House (Ascendant) in Gemini, this soul enters the world with the energy of the eternal student - curious, communicative, and mentally agile. The first breath carries the gift of connection and the desire to learn everything.

The world will perceive this child as bright, talkative, and endlessly interested in everything. There's a quicksilver quality to their presence, an adaptability that allows them to relate to many different types of people.

This placement gifts natural communication abilities and a mind that works quickly. Watch for the child who asks endless questions, who learns to speak early, who wants to know "why" about everything.

The life lesson woven into this Rising sign is learning that depth is as valuable as breadth. They're here to show others how to stay curious, how to make connections, how to communicate complex ideas simply.`,
            strengths: ["Quick mind", "Communication gifts", "Adaptability", "Youthful energy"],
            challenges: ["Scattered focus", "Superficiality", "Restlessness", "Difficulty committing"]
        },
        Cancer: {
            title: "The Nurturing Emergence",
            keywords: ["Sensitive Presence", "Protective Soul", "Emotional Depth", "Caretaker Nature"],
            reading: `With the 1st House (Ascendant) in Cancer, this soul enters the world with the energy of the nurturing mother - sensitive, protective, and deeply connected to emotions. The first breath carries the gift of emotional intelligence.

The world will perceive this child as sensitive, caring, and perhaps a bit shy. There's a softness to their presence that draws others in, and a protective instinct that shows even toward dolls and pets in early childhood.

This placement gifts a natural ability to sense what others need emotionally. Watch for the child who comforts others, who is affected by the moods around them, who treasures home and family above all.

The life lesson woven into this Rising sign is learning to protect their sensitivity while remaining open. They're here to show others the power of emotional attunement and the importance of creating safe spaces.`,
            strengths: ["Emotional intelligence", "Nurturing instinct", "Intuitive", "Creates belonging"],
            challenges: ["Over-sensitivity", "Moodiness", "Can seem clingy", "Difficulty with boundaries"]
        },
        Leo: {
            title: "The Radiant Emergence",
            keywords: ["Magnetic Presence", "Creative Soul", "Natural Performer", "Heart-Centered"],
            reading: `With the 1st House (Ascendant) in Leo, this soul enters the world with the energy of the Sun itself - radiant, warm, and naturally commanding attention. The first breath carries the gift of creative self-expression.

The world will perceive this child as confident, dramatic, and impossible to ignore. There's a warmth and generosity to their presence that draws others like planets to the sun. They meet life as if they belong on a stage.

This placement gifts natural charisma and creative abilities. Watch for the child who loves performing, who organizes theatrical games, who needs an audience and knows instinctively how to work a room.

The life lesson woven into this Rising sign is learning that true confidence comes from the heart, not from applause. They're here to show others how to shine unapologetically while lifting others into the light.`,
            strengths: ["Natural charisma", "Creative confidence", "Warmth", "Leadership through love"],
            challenges: ["Need for attention", "Drama", "Pride", "Difficulty sharing spotlight"]
        },
        Virgo: {
            title: "The Discerning Emergence",
            keywords: ["Thoughtful Presence", "Helpful Soul", "Detail-Oriented", "Practical Wisdom"],
            reading: `With the 1st House (Ascendant) in Virgo, this soul enters the world with the energy of the sacred servant - observant, helpful, and attentive to details others miss. The first breath carries the gift of discernment.

The world will perceive this child as thoughtful, perhaps quietly critical, and genuinely helpful. There's a modesty to their presence combined with a sharp mind that notices everything. They meet life wanting to make things better.

This placement gifts natural analytical abilities and a genuine desire to serve. Watch for the child who organizes their toys precisely, who wants to help with grown-up tasks, who notices when something is slightly off.

The life lesson woven into this Rising sign is learning that imperfection is not failure. They're here to show others the sacred nature of service and the healing power of paying attention to details.`,
            strengths: ["Attention to detail", "Helpful nature", "Analytical mind", "Practical service"],
            challenges: ["Perfectionism", "Self-criticism", "Worry", "Can seem critical"]
        },
        Libra: {
            title: "The Graceful Emergence",
            keywords: ["Charming Presence", "Diplomatic Soul", "Beauty-Seeker", "Partnership-Oriented"],
            reading: `With the 1st House (Ascendant) in Libra, this soul enters the world with the energy of the diplomat and artist - charming, balanced, and naturally drawn to beauty and partnership. The first breath carries the gift of grace.

The world will perceive this child as pleasant, fair-minded, and socially gifted. There's an elegance to their presence that charms everyone. They meet life wanting to create harmony and beauty wherever they go.

This placement gifts natural social abilities and an aesthetic sense. Watch for the child who hates conflict, who naturally mediates between friends, who arranges things beautifully and cares about appearance.

The life lesson woven into this Rising sign is learning that true harmony includes their own needs. They're here to show others the art of balance, the beauty of fairness, and the power of peaceful resolution.`,
            strengths: ["Natural charm", "Diplomatic skills", "Aesthetic sense", "Partnership abilities"],
            challenges: ["Indecisiveness", "People-pleasing", "Avoiding conflict", "Losing self in others"]
        },
        Scorpio: {
            title: "The Intense Emergence",
            keywords: ["Powerful Presence", "Perceptive Soul", "Transformative", "Magnetic Depth"],
            reading: `With the 1st House (Ascendant) in Scorpio, this soul enters the world with the energy of the transformer - intense, perceptive, and unafraid of life's depths. The first breath carries the gift of psychological insight.

The world will perceive this child as intense, mysterious, and somehow older than their years. There's a power to their presence that others feel immediately. They meet life with unwavering gaze, seeing what others try to hide.

This placement gifts natural psychological insight and the courage to face darkness. Watch for the child who asks about death, who sees through pretense, who has an intense presence even in silence.

The life lesson woven into this Rising sign is learning to use their power for healing rather than control. They're here to show others that transformation is possible, that facing darkness leads to light.`,
            strengths: ["Psychological insight", "Transformative power", "Perception", "Emotional courage"],
            challenges: ["Intensity", "Control issues", "Secretiveness", "Trust difficulties"]
        },
        Sagittarius: {
            title: "The Adventurous Emergence",
            keywords: ["Optimistic Presence", "Freedom-Seeking Soul", "Philosophical", "Expansive Spirit"],
            reading: `With the 1st House (Ascendant) in Sagittarius, this soul enters the world with the energy of the explorer - optimistic, freedom-loving, and naturally philosophical. The first breath carries the gift of faith in life's journey.

The world will perceive this child as cheerful, adventurous, and refreshingly honest. There's an expansiveness to their presence that makes possibilities seem endless. They meet life as a grand adventure to be embraced.

This placement gifts natural optimism and a love of learning and travel. Watch for the child who wants to explore everywhere, who asks big questions about meaning, who speaks with sometimes startling honesty.

The life lesson woven into this Rising sign is learning that freedom includes responsibility. They're here to show others how to keep faith, how to find meaning in the journey, how to laugh even when lost.`,
            strengths: ["Natural optimism", "Love of adventure", "Philosophical mind", "Honest expression"],
            challenges: ["Restlessness", "Tactlessness", "Over-promising", "Difficulty with limits"]
        },
        Capricorn: {
            title: "The Ambitious Emergence",
            keywords: ["Mature Presence", "Responsible Soul", "Achievement-Oriented", "Quietly Powerful"],
            reading: `With the 1st House (Ascendant) in Capricorn, this soul enters the world with the energy of the wise elder - responsible, ambitious, and naturally authoritative. The first breath carries the gift of determination.

The world will perceive this child as mature beyond their years, serious, and quietly capable. There's a dignity to their presence that commands respect even in childhood. They meet life with goals already forming.

This placement gifts natural ambition and the patience to achieve long-term goals. Watch for the child who sets goals, who takes responsibility early, who seems somehow more grown-up than peers.

The life lesson woven into this Rising sign is learning that success includes joy and play. They're here to show others how to build something lasting, how to climb mountains one step at a time.`,
            strengths: ["Natural maturity", "Goal-orientation", "Responsible nature", "Quiet authority"],
            challenges: ["Too serious too young", "Pessimism", "Workaholism", "Difficulty with play"]
        },
        Aquarius: {
            title: "The Unique Emergence",
            keywords: ["Original Presence", "Humanitarian Soul", "Independent Thinker", "Future-Oriented"],
            reading: `With the 1st House (Ascendant) in Aquarius, this soul enters the world with the energy of the visionary - unique, humanitarian, and naturally unconventional. The first breath carries the gift of originality.

The world will perceive this child as different, intellectually curious, and somewhat detached. There's a quality of being from the future about their presence. They meet life determined to be themselves, regardless of expectations.

This placement gifts original thinking and a natural concern for humanity. Watch for the child who questions rules, who befriends the outcasts, who has unusual interests and doesn't care about fitting in.

The life lesson woven into this Rising sign is learning to balance individuality with intimacy. They're here to show others that being different is a gift, that the future belongs to those willing to think new thoughts.`,
            strengths: ["Original thinking", "Humanitarian concern", "Independence", "Future vision"],
            challenges: ["Emotional detachment", "Rebelliousness", "Difficulty with intimacy", "Feeling alienated"]
        },
        Pisces: {
            title: "The Mystic Emergence",
            keywords: ["Ethereal Presence", "Compassionate Soul", "Intuitive", "Dreamer"],
            reading: `With the 1st House (Ascendant) in Pisces, this soul enters the world with the energy of the mystic - sensitive, compassionate, and naturally connected to realms beyond the ordinary. The first breath carries the gift of intuition.

The world will perceive this child as gentle, dreamy, and perhaps otherworldly. There's a softness and permeability to their presence that makes boundaries hard to maintain. They meet life with open heart and vivid imagination.

This placement gifts natural intuition and artistic sensitivity. Watch for the child who has imaginary friends, who senses moods instantly, who shows early artistic or musical abilities, who seems to dream while awake.

The life lesson woven into this Rising sign is learning to be in the world while not being consumed by it. They're here to show others the beauty of compassion, the reality of the unseen, and the healing power of imagination.`,
            strengths: ["Deep intuition", "Artistic sensitivity", "Compassion", "Spiritual awareness"],
            challenges: ["Boundary issues", "Escapism", "Overwhelm", "Difficulty with practical matters"]
        }
    },
    
    4: { // IC - Home, Roots, Foundation
        Aries: {
            title: "The Pioneer's Foundation",
            keywords: ["Independent Roots", "Active Home", "Self-Made Security", "Dynamic Foundation"],
            reading: `With the 4th House (Imum Coeli) in Aries, this soul's deepest foundation is built on independence and self-reliance. The roots are those of a pioneer, someone whose sense of home must be self-created.

The family of origin may have emphasized independence, perhaps requiring self-sufficiency earlier than typical. The soul memory carried is of needing to fight for safety, of home being a place of action rather than rest.

For this child, true security will come from knowing they can take care of themselves. They need a home environment that allows for active expression and individual space. Encouragement of independence, while still providing a safe base, is key.

Later in life, they may create an unconventional home life or frequently change residences. Their sense of "home" is portable - it goes wherever they go. The gift is learning that true home is an internal state of self-trust.`,
            strengths: ["Self-reliant", "Adaptable to change", "Creates own security", "Active home life"],
            challenges: ["Difficulty settling", "Need for solitude", "Conflict in family", "Impatience with domestic matters"]
        },
        Taurus: {
            title: "The Secure Foundation",
            keywords: ["Stable Roots", "Comfortable Home", "Material Security", "Earth Connection"],
            reading: `With the 4th House (Imum Coeli) in Taurus, this soul's deepest foundation is built on stability, comfort, and connection to the earth. The roots are deep and need physical security to truly flourish.

The family of origin likely emphasized material security, traditional values, and the importance of creating comfortable surroundings. The soul memory carried is of home as a place of comfort, beauty, and sensory pleasure.

For this child, true security comes from physical comfort and predictable routines. They need a beautiful, stable home environment with access to nature. Changes to home should be made gradually to avoid disrupting their sense of safety.

Later in life, they often create homes of great beauty and comfort. Property ownership matters. Their sense of "home" is deeply tied to place and possessions. The gift is learning that stability can be internal as well as external.`,
            strengths: ["Creates comfortable home", "Loyal to family", "Builds lasting security", "Connected to land"],
            challenges: ["Resistance to moving", "Attached to possessions", "Fear of financial instability", "Stubbornness about home"]
        },
        Gemini: {
            title: "The Communicative Foundation",
            keywords: ["Mental Roots", "Active Home", "Learning Environment", "Connected Family"],
            reading: `With the 4th House (Imum Coeli) in Gemini, this soul's deepest foundation is built on communication, learning, and mental stimulation. The roots are in connection and the exchange of ideas.

The family of origin likely emphasized education, communication, and mental activity. There may have been many siblings, much talking, or frequent moving. The soul memory carried is of home as a place of learning and conversation.

For this child, true security comes from mental stimulation and communication. They need a home environment filled with books, conversations, and variety. Silence and isolation can feel threatening.

Later in life, they often work from home or have homes that serve as community gathering places. They may maintain multiple residences. The gift is learning that home is wherever meaningful connection happens.`,
            strengths: ["Adaptable to change", "Creates stimulating home", "Values family communication", "Curious about ancestry"],
            challenges: ["Restless in domestic life", "Scattered home energy", "Superficial family ties", "Difficulty with silence"]
        },
        Cancer: {
            title: "The Nurtured Foundation",
            keywords: ["Deep Roots", "Emotional Home", "Family Bond", "Ancestral Connection"],
            reading: `With the 4th House (Imum Coeli) in Cancer, this soul's deepest foundation is perfectly aligned - Cancer rules the 4th House naturally. The roots are deep in family, emotion, and ancestral memory.

The family of origin was likely central to development, with strong emotional bonds and perhaps some challenges around over-protection or emotional intensity. The soul memory carried is of home as sanctuary and source of emotional nourishment.

For this child, true security comes from emotional connection and family belonging. They need a home environment that is warm, safe, and emotionally nurturing. Family traditions and belongings carry deep significance.

Later in life, they often create deeply nurturing homes and are devoted to family. They may live near family of origin or become the emotional center of extended family. The gift is understanding that home is where they feel truly loved.`,
            strengths: ["Deep family bonds", "Creates nurturing home", "Honors ancestors", "Emotional security"],
            challenges: ["Difficulty leaving home", "Over-attached to past", "Mother complex", "Smothering tendencies"]
        },
        Leo: {
            title: "The Creative Foundation",
            keywords: ["Proud Roots", "Joyful Home", "Creative Family", "Heart-Centered Security"],
            reading: `With the 4th House (Imum Coeli) in Leo, this soul's deepest foundation is built on creativity, joy, and being truly seen by family. The roots are in self-expression and heart-centered connection.

The family of origin likely emphasized creativity, possibly had a dramatic quality, and placed importance on recognition within the family structure. The soul memory carried is of home as a place where one's light should shine.

For this child, true security comes from being seen and appreciated for who they are. They need a home environment that celebrates their unique gifts and allows creative expression. Feeling invisible in the family is deeply wounding.

Later in life, they often create homes of warmth and welcome, places where creativity flourishes. They take pride in their home and family. The gift is learning that the heart is the true home, and love is the true foundation.`,
            strengths: ["Proud family legacy", "Creates joyful home", "Celebrates family", "Generous hosting"],
            challenges: ["Drama in family", "Need for family recognition", "Pride about heritage", "Ego issues with parents"]
        },
        Virgo: {
            title: "The Ordered Foundation",
            keywords: ["Organized Roots", "Practical Home", "Service-Oriented Family", "Healing Environment"],
            reading: `With the 4th House (Imum Coeli) in Virgo, this soul's deepest foundation is built on order, service, and practical care. The roots are in useful contribution and creating environments that function well.

The family of origin likely emphasized practical skills, health, and contribution to the household. There may have been a focus on doing things "right." The soul memory carried is of home as a place of service and improvement.

For this child, true security comes from feeling useful and having order in their environment. They need a home that is clean, organized, and functions efficiently. Chaos is deeply unsettling.

Later in life, they often create highly organized, health-conscious homes. They may work from home or create home-based services. The gift is learning that perfection isn't required for love, and imperfect homes can still be sanctuaries.`,
            strengths: ["Creates efficient home", "Health-conscious family", "Practical domestic skills", "Helpful to family"],
            challenges: ["Critical of family", "Perfectionism about home", "Worry about domestic matters", "Difficulty relaxing at home"]
        },
        Libra: {
            title: "The Harmonious Foundation",
            keywords: ["Balanced Roots", "Beautiful Home", "Peaceful Family", "Partnership-Oriented"],
            reading: `With the 4th House (Imum Coeli) in Libra, this soul's deepest foundation is built on harmony, beauty, and balanced relationships. The roots are in peace, fairness, and aesthetic environment.

The family of origin likely emphasized fairness, possibly conflict avoidance, and appreciation of beauty. There may have been focus on appearances or partnership. The soul memory carried is of home as a place of peace and beauty.

For this child, true security comes from harmony in relationships and beautiful surroundings. They need a home environment that is aesthetically pleasing and conflict-free. Family discord is deeply disturbing.

Later in life, they often create beautifully decorated, harmonious homes. Partnership is essential to their sense of home. The gift is learning to maintain peace without sacrificing truth, and creating beauty that nourishes the soul.`,
            strengths: ["Creates beautiful home", "Peacemaker in family", "Values fairness", "Partnership-oriented"],
            challenges: ["Avoids family conflict", "Dependent on partner for security", "Superficial harmony", "Indecisive about home"]
        },
        Scorpio: {
            title: "The Transformative Foundation",
            keywords: ["Deep Roots", "Intense Home", "Powerful Family", "Hidden Foundations"],
            reading: `With the 4th House (Imum Coeli) in Scorpio, this soul's deepest foundation is built on intensity, transformation, and emotional power. The roots reach into hidden family dynamics and ancestral patterns.

The family of origin likely had intense emotional dynamics, possibly secrets, power struggles, or transformation through crisis. The soul memory carried is of home as a place of deep feeling and necessary transformation.

For this child, true security comes from emotional truth and facing family shadows. They need a home environment where feelings can be expressed honestly, where nothing is hidden. Superficial family dynamics feel unsafe.

Later in life, they often transform their understanding of family and home. They may uncover family secrets or break generational patterns. The gift is learning that true security comes from facing darkness, not hiding from it.`,
            strengths: ["Transforms family patterns", "Deep family bonds", "Psychological insight", "Creates emotionally safe home"],
            challenges: ["Intense family dynamics", "Control issues at home", "Family secrets", "Difficulty with superficial domesticity"]
        },
        Sagittarius: {
            title: "The Adventurous Foundation",
            keywords: ["Expansive Roots", "Free-Spirited Home", "Philosophical Family", "Multicultural Background"],
            reading: `With the 4th House (Imum Coeli) in Sagittarius, this soul's deepest foundation is built on freedom, adventure, and the search for meaning. The roots are expansive, possibly spanning cultures or philosophies.

The family of origin likely emphasized education, travel, philosophy, or religion. There may have been multiple cultures or beliefs represented. The soul memory carried is of home as a place of exploration and meaning-making.

For this child, true security comes from freedom to explore and space for growth. They need a home environment that encourages questions, celebrates learning, and allows room to expand. Confinement feels threatening.

Later in life, they often create homes that reflect their adventures - filled with travel mementos, books, and space for guests from afar. The gift is learning that home is a concept that can expand to include the whole world.`,
            strengths: ["Worldly perspective", "Creates adventurous home", "Philosophical family values", "Welcomes diversity"],
            challenges: ["Restless at home", "Difficulty settling", "Family scattered geographically", "Commitment to place"]
        },
        Capricorn: {
            title: "The Structured Foundation",
            keywords: ["Strong Roots", "Traditional Home", "Responsible Family", "Achievement-Oriented"],
            reading: `With the 4th House (Imum Coeli) in Capricorn, this soul's deepest foundation is built on structure, tradition, and achievement. The roots are in responsibility, possibly involving early maturity or family duty.

The family of origin likely emphasized responsibility, achievement, and traditional values. There may have been a serious quality to home life or early responsibilities. The soul memory carried is of home as a place of duty and achievement.

For this child, true security comes from structure, clear expectations, and contributing to family success. They need a home environment with clear rules and recognition for achievement. Chaos or irresponsibility feels unsafe.

Later in life, they often become the family patriarch or matriarch, taking responsibility for extended family. Home is built carefully over time. The gift is learning that the best structures include room for joy and spontaneity.`,
            strengths: ["Strong family structure", "Responsible for family", "Builds lasting home", "Traditional values"],
            challenges: ["Too much responsibility too young", "Serious home atmosphere", "Father complex", "Workaholism about home"]
        },
        Aquarius: {
            title: "The Unconventional Foundation",
            keywords: ["Unique Roots", "Progressive Home", "Community Family", "Independent Foundation"],
            reading: `With the 4th House (Imum Coeli) in Aquarius, this soul's deepest foundation is built on uniqueness, independence, and progressive values. The roots are in unconventional family structures or ideologies.

The family of origin likely was unusual in some way - perhaps the structure, the values, or the approach to parenting. There may have been emphasis on independence or community. The soul memory carried is of home as a place of freedom and originality.

For this child, true security comes from being accepted for their uniqueness and having freedom within family. They need a home environment that allows individual expression and doesn't enforce conformity. Rigid traditions feel suffocating.

Later in life, they often create unconventional homes or chosen family structures. Community may replace or supplement traditional family. The gift is learning that belonging doesn't require becoming like everyone else.`,
            strengths: ["Creates unique home", "Chosen family", "Progressive values", "Independent within family"],
            challenges: ["Difficulty with tradition", "Emotionally detached from family", "Rebellion against roots", "Alienation from origin"]
        },
        Pisces: {
            title: "The Spiritual Foundation",
            keywords: ["Boundless Roots", "Spiritual Home", "Sensitive Family", "Ancestral Connection"],
            reading: `With the 4th House (Imum Coeli) in Pisces, this soul's deepest foundation is built on spirituality, sensitivity, and connection to the unseen. The roots are in imagination, possibly sacrifice, and transcendent experience.

The family of origin likely had spiritual or artistic emphasis, possibly also challenges around boundaries, addiction, or sacrifice. The soul memory carried is of home as a place of dreams and spiritual connection.

For this child, true security comes from spiritual connection and emotional safety. They need a home environment that honors sensitivity, allows imagination, and provides refuge from the harsh world. Chaos or harshness is deeply wounding.

Later in life, they often create homes as sanctuaries - places of retreat, artistic expression, and spiritual practice. The gift is learning that the truest home exists in connection to something greater than the material world.`,
            strengths: ["Creates spiritual home", "Intuitive about family", "Ancestral connection", "Compassionate family member"],
            challenges: ["Boundary issues with family", "Idealized view of home", "Escapism", "Sacrifice for family"]
        }
    },
    
    7: { // Descendant - Partnerships & Others
        Aries: {
            title: "The Warrior Partner",
            keywords: ["Independent Partners", "Active Relationships", "Direct Connection", "Passionate Bonds"],
            reading: `With the 7th House (Descendant) in Aries, this soul seeks and attracts partners who embody courage, independence, and direct action. Relationships become arenas for developing self-assertion through partnership.

This placement suggests that while the individual may present as peace-loving or diplomatic (Libra Ascendant), they are drawn to partners who are bold, competitive, and action-oriented. Through relationships, they learn to develop their own courage and initiative.

In adult relationships, they'll be attracted to independent, energetic partners who don't need them. Relationships will have a dynamic, sometimes competitive quality. The ideal partner challenges them to grow stronger.

The life lesson is learning that healthy relationships can include conflict and still be loving. They're here to find partners who ignite their inner fire rather than keep the peace.`,
            strengths: ["Passionate partnerships", "Direct communication", "Active relationship life", "Independence in togetherness"],
            challenges: ["Conflict in relationships", "Competitive dynamics", "Partner anger issues", "Rush into commitment"]
        },
        Taurus: {
            title: "The Stable Partner",
            keywords: ["Reliable Partners", "Sensual Relationships", "Security Through Others", "Loyal Bonds"],
            reading: `With the 7th House (Descendant) in Taurus, this soul seeks and attracts partners who embody stability, sensuality, and reliability. Relationships become sources of security and physical connection.

This placement suggests that while the individual may present as intense or transformative (Scorpio Ascendant), they are drawn to partners who are steady, patient, and grounded. Through relationships, they learn to develop their own stability and self-worth.

In adult relationships, they'll be attracted to dependable, sensual partners who offer security. Relationships will have a loyal, perhaps possessive quality. The ideal partner grounds their intensity.

The life lesson is learning that true security in relationship comes from self-worth, not the partner's reliability. They're here to find partners who offer stability while they transform together.`,
            strengths: ["Loyal partnerships", "Sensual connection", "Stable relationships", "Material partnership"],
            challenges: ["Possessive dynamics", "Resistant to change", "Materialism in partnership", "Stuck in relationships"]
        },
        Gemini: {
            title: "The Communicative Partner",
            keywords: ["Intellectual Partners", "Communicative Relationships", "Variety in Partnership", "Mental Connection"],
            reading: `With the 7th House (Descendant) in Gemini, this soul seeks and attracts partners who embody communication, curiosity, and mental agility. Relationships become arenas for learning and exchange of ideas.

This placement suggests that while the individual may present as philosophical or freedom-loving (Sagittarius Ascendant), they are drawn to partners who are witty, curious, and communicative. Through relationships, they learn to listen as well as teach.

In adult relationships, they'll be attracted to intelligent, talkative partners who stimulate their mind. Relationships will have a lively, varied quality. The ideal partner keeps them mentally engaged forever.

The life lesson is learning that depth and commitment are as important as variety and stimulation. They're here to find partners who can discuss anything while building something lasting together.`,
            strengths: ["Intellectual partnerships", "Communication in relationships", "Flexible partnership", "Learning through others"],
            challenges: ["Superficial connections", "Partner inconsistency", "Too much variety", "Commitment issues"]
        },
        Cancer: {
            title: "The Nurturing Partner",
            keywords: ["Caring Partners", "Emotional Relationships", "Protective Bonds", "Family-Oriented Union"],
            reading: `With the 7th House (Descendant) in Cancer, this soul seeks and attracts partners who embody nurturing, emotional depth, and family orientation. Relationships become sources of emotional security and belonging.

This placement suggests that while the individual may present as ambitious or serious (Capricorn Ascendant), they are drawn to partners who are caring, sensitive, and family-oriented. Through relationships, they learn to access their own emotional vulnerability.

In adult relationships, they'll be attracted to nurturing, protective partners who create emotional safety. Relationships will have a domestic, perhaps parental quality. The ideal partner becomes family.

The life lesson is learning that emotional needs are valid and partners can be trusted with vulnerability. They're here to find partners who nurture their hidden soft heart.`,
            strengths: ["Emotionally safe partnerships", "Nurturing relationships", "Family through marriage", "Protective bonds"],
            challenges: ["Dependency", "Parent-child dynamics", "Moodiness in relationships", "Over-protectiveness"]
        },
        Leo: {
            title: "The Creative Partner",
            keywords: ["Confident Partners", "Dramatic Relationships", "Heart-Centered Bonds", "Romantic Union"],
            reading: `With the 7th House (Descendant) in Leo, this soul seeks and attracts partners who embody creativity, confidence, and warmth. Relationships become stages for romance, play, and creative expression.

This placement suggests that while the individual may present as cool or unconventional (Aquarius Ascendant), they are drawn to partners who are warm, expressive, and romantic. Through relationships, they learn to open their heart and embrace individual love.

In adult relationships, they'll be attracted to confident, dramatic partners who know how to romance. Relationships will have a theatrical, passionate quality. The ideal partner adores and is adored.

The life lesson is learning that personal love is as important as humanitarian concern. They're here to find partners who teach them to shine through being cherished.`,
            strengths: ["Romantic partnerships", "Creative together", "Warm relationships", "Loyalty in love"],
            challenges: ["Drama in relationships", "Partner need for attention", "Pride issues", "Competition for spotlight"]
        },
        Virgo: {
            title: "The Helpful Partner",
            keywords: ["Practical Partners", "Service-Oriented Relationships", "Healing Bonds", "Grounded Union"],
            reading: `With the 7th House (Descendant) in Virgo, this soul seeks and attracts partners who embody practicality, helpfulness, and discernment. Relationships become arenas for service, improvement, and healing.

This placement suggests that while the individual may present as dreamy or spiritual (Pisces Ascendant), they are drawn to partners who are practical, detail-oriented, and helpful. Through relationships, they learn to ground their dreams in reality.

In adult relationships, they'll be attracted to competent, helpful partners who bring order to their life. Relationships will have a service-oriented, health-conscious quality. The ideal partner helps them function better.

The life lesson is learning that imperfect partners can still be right, and love isn't about fixing. They're here to find partners who help ground their visions while accepting imperfection.`,
            strengths: ["Practical partnerships", "Mutual helpfulness", "Healthy relationships", "Service together"],
            challenges: ["Critical dynamics", "Perfectionism in partnership", "Health focus becomes criticism", "Servant-master patterns"]
        },
        Libra: {
            title: "The Balanced Partner",
            keywords: ["Harmonious Partners", "Beautiful Relationships", "Equal Partnership", "Diplomatic Bonds"],
            reading: `With the 7th House (Descendant) in Libra, this soul seeks and attracts partners who embody grace, fairness, and beauty. Relationships become central to life purpose and personal growth.

This placement suggests that while the individual may present as independent or warrior-like (Aries Ascendant), they are drawn to partners who are diplomatic, refined, and relationship-oriented. Through relationships, they learn the art of compromise.

In adult relationships, they'll be attracted to charming, balanced partners who value fairness. Relationships will have an elegant, harmonious quality. The ideal partner brings beauty and balance.

The life lesson is learning that true partnership requires showing up as a full self, not just accommodating. They're here to find partners who model grace while they bring energy.`,
            strengths: ["Equal partnerships", "Harmonious relationships", "Beautiful bonds", "Diplomatic approach"],
            challenges: ["Over-dependency", "Conflict avoidance", "Lost self in other", "Indecision about partners"]
        },
        Scorpio: {
            title: "The Transformative Partner",
            keywords: ["Intense Partners", "Transformative Relationships", "Deep Bonds", "Powerful Union"],
            reading: `With the 7th House (Descendant) in Scorpio, this soul seeks and attracts partners who embody intensity, depth, and transformative power. Relationships become catalysts for profound personal change.

This placement suggests that while the individual may present as stable or comfort-seeking (Taurus Ascendant), they are drawn to partners who are intense, passionate, and psychologically deep. Through relationships, they learn to embrace transformation.

In adult relationships, they'll be attracted to powerful, magnetic partners who see through them. Relationships will have an intense, sometimes obsessive quality. The ideal partner transforms their life completely.

The life lesson is learning that transformation is possible without destruction, and intimacy can include safety. They're here to find partners who take them to the depths while remaining trustworthy.`,
            strengths: ["Deep partnerships", "Transformative love", "Intimate bonds", "Powerful together"],
            challenges: ["Power struggles", "Jealousy", "Control in relationships", "Intensity burns out"]
        },
        Sagittarius: {
            title: "The Adventurous Partner",
            keywords: ["Free-Spirited Partners", "Adventurous Relationships", "Growing Together", "Philosophical Bond"],
            reading: `With the 7th House (Descendant) in Sagittarius, this soul seeks and attracts partners who embody freedom, adventure, and philosophical depth. Relationships become journeys of expansion and meaning.

This placement suggests that while the individual may present as intellectual or variety-seeking (Gemini Ascendant), they are drawn to partners who are adventurous, honest, and big-picture oriented. Through relationships, they learn to commit while remaining free.

In adult relationships, they'll be attracted to independent, optimistic partners who expand their world. Relationships will have an adventurous, growth-oriented quality. The ideal partner is a fellow traveler.

The life lesson is learning that commitment and freedom can coexist. They're here to find partners who explore life together while respecting individual journeys.`,
            strengths: ["Adventurous partnerships", "Growing together", "Honest relationships", "Freedom in commitment"],
            challenges: ["Commitment resistance", "Too much independence", "Philosophical differences", "Restlessness in partnership"]
        },
        Capricorn: {
            title: "The Committed Partner",
            keywords: ["Responsible Partners", "Serious Relationships", "Building Together", "Traditional Bond"],
            reading: `With the 7th House (Descendant) in Capricorn, this soul seeks and attracts partners who embody responsibility, maturity, and long-term commitment. Relationships become foundations for building something lasting.

This placement suggests that while the individual may present as sensitive or domestic (Cancer Ascendant), they are drawn to partners who are ambitious, reliable, and structured. Through relationships, they learn to build with someone rather than just nurture.

In adult relationships, they'll be attracted to mature, ambitious partners who take commitment seriously. Relationships will have a responsible, building-oriented quality. The ideal partner is a life project partner.

The life lesson is learning that partnership includes joy and play, not just work. They're here to find partners who build an empire of love that includes room for feeling.`,
            strengths: ["Serious commitment", "Building together", "Responsible partnerships", "Long-term bonds"],
            challenges: ["Cold dynamics", "Work over intimacy", "Age differences", "Status-focused partnership"]
        },
        Aquarius: {
            title: "The Unconventional Partner",
            keywords: ["Unique Partners", "Friendship-Based Relationships", "Independent Bond", "Progressive Union"],
            reading: `With the 7th House (Descendant) in Aquarius, this soul seeks and attracts partners who embody uniqueness, independence, and progressive thinking. Relationships become experiments in freedom within connection.

This placement suggests that while the individual may present as warm or attention-seeking (Leo Ascendant), they are drawn to partners who are independent, unconventional, and friendship-oriented. Through relationships, they learn that love includes letting go.

In adult relationships, they'll be attracted to unusual, free-thinking partners who remain individuals. Relationships will have an unconventional, friendship-based quality. The ideal partner is also a best friend.

The life lesson is learning that personal love and universal concern both matter. They're here to find partners who celebrate their uniqueness while creating something special together.`,
            strengths: ["Friendship in partnership", "Independence respected", "Unconventional bonds", "Progressive relationship"],
            challenges: ["Emotional distance", "Too much independence", "Rebellion against partnership", "Difficulty with traditional commitment"]
        },
        Pisces: {
            title: "The Spiritual Partner",
            keywords: ["Sensitive Partners", "Spiritual Relationships", "Compassionate Bond", "Soul Union"],
            reading: `With the 7th House (Descendant) in Pisces, this soul seeks and attracts partners who embody compassion, spirituality, and creative sensitivity. Relationships become spiritual journeys and artistic collaborations.

This placement suggests that while the individual may present as practical or analytical (Virgo Ascendant), they are drawn to partners who are dreamy, compassionate, and spiritually aware. Through relationships, they learn to transcend the mundane.

In adult relationships, they'll be attracted to sensitive, artistic partners who offer spiritual connection. Relationships will have a dreamy, soulful quality. The ideal partner feels like a soul mate.

The life lesson is learning that fantasy and reality must coexist in love. They're here to find partners who elevate them spiritually while remaining present in the physical world.`,
            strengths: ["Soul mate connections", "Spiritual partnerships", "Compassionate bonds", "Artistic collaboration"],
            challenges: ["Idealization", "Boundary confusion", "Savior-victim dynamics", "Escapism through romance"]
        }
    },
    
    10: { // Midheaven - Career & Public Life
        Aries: {
            title: "The Pioneer's Purpose",
            keywords: ["Leadership Career", "Self-Starter", "Pioneering Path", "Action-Oriented Success"],
            reading: `With the 10th House (Midheaven) in Aries, this soul's life purpose and public role involve leadership, pioneering, and independent action. Career must offer autonomy and the opportunity to be first.

This placement indicates someone destined to forge new paths in their chosen field. The world will come to know them as a leader, an initiator, someone who takes action when others hesitate. Career success requires independence.

Ideal career paths include: entrepreneurship, athletics, military, surgery, emergency services, sales leadership, fitness, motivational work, or any field where they can be first or lead the way.

The life lesson in career is learning to channel competitive energy constructively and to lead without alienating others. They're here to show the world how to begin, how to take the first brave step.`,
            strengths: ["Natural leader", "Self-starter", "Courage in career", "Pioneering work"],
            challenges: ["Impatience with hierarchy", "Career conflicts", "Burns out quickly", "Difficulty with authority"]
        },
        Taurus: {
            title: "The Builder's Purpose",
            keywords: ["Stable Career", "Financial Success", "Beauty & Value", "Patient Achievement"],
            reading: `With the 10th House (Midheaven) in Taurus, this soul's life purpose and public role involve building, creating beauty, and establishing lasting value. Career must offer security and connection to tangible results.

This placement indicates someone destined to create something of lasting value in their chosen field. The world will come to know them as reliable, productive, and connected to beauty or resources. Career success requires patience.

Ideal career paths include: finance, banking, art, music, luxury goods, agriculture, food industry, architecture, environmental work, or any field where they build something lasting and valuable.

The life lesson in career is learning to adapt when needed while maintaining core values. They're here to show the world how to build, how to create beauty, how to work with patient persistence.`,
            strengths: ["Patient achievement", "Builds lasting value", "Financial acumen", "Artistic career"],
            challenges: ["Resistance to career change", "Too slow to act", "Materialistic motivation", "Stubborn about work"]
        },
        Gemini: {
            title: "The Communicator's Purpose",
            keywords: ["Communication Career", "Versatile Path", "Information Work", "Teaching Role"],
            reading: `With the 10th House (Midheaven) in Gemini, this soul's life purpose and public role involve communication, learning, and sharing information. Career must offer variety and mental stimulation.

This placement indicates someone destined to connect ideas and people in their chosen field. The world will come to know them as an excellent communicator, possibly having multiple careers. Career success requires curiosity.

Ideal career paths include: writing, journalism, teaching, marketing, sales, social media, translation, technology, podcasting, or any field involving communication and information exchange.

The life lesson in career is learning to develop depth alongside breadth and to commit to a direction. They're here to show the world how to communicate, how to make connections, how to stay curious.`,
            strengths: ["Excellent communicator", "Versatile career", "Multiple skills", "Mental agility"],
            challenges: ["Scattered career", "Difficulty committing", "Superficial reputation", "Too many directions"]
        },
        Cancer: {
            title: "The Nurturer's Purpose",
            keywords: ["Caring Career", "Protective Role", "Emotional Intelligence", "Family Business"],
            reading: `With the 10th House (Midheaven) in Cancer, this soul's life purpose and public role involve nurturing, protection, and emotional support. Career must feel like caring for family extended outward.

This placement indicates someone destined to nurture others in their chosen field. The world will come to know them as caring, protective, and attuned to emotional needs. Career success requires emotional intelligence.

Ideal career paths include: healthcare, counseling, hospitality, real estate, childcare, food industry, social work, history, genealogy, or any field involving caring for others' wellbeing.

The life lesson in career is learning to set boundaries while remaining nurturing and to succeed without losing sensitivity. They're here to show the world how to care professionally, how to make any field a family.`,
            strengths: ["Caring profession", "Emotional intelligence at work", "Nurturing leadership", "Home-based success"],
            challenges: ["Too personal about work", "Moody in career", "Difficulty separating work and family", "Over-protective management"]
        },
        Leo: {
            title: "The Performer's Purpose",
            keywords: ["Creative Career", "Leadership Role", "Public Recognition", "Heart-Centered Work"],
            reading: `With the 10th House (Midheaven) in Leo, this soul's life purpose and public role involve creative expression, leadership, and public recognition. Career must allow them to shine and share their heart.

This placement indicates someone destined for recognition in their chosen field. The world will come to know them as a creative leader, someone who brings warmth and inspiration to their work. Career success requires self-expression.

Ideal career paths include: entertainment, performing arts, creative direction, leadership roles, children's work, luxury brands, public relations, or any field where they can express creativity and receive recognition.

The life lesson in career is learning to shine without eclipsing others and to lead with generosity. They're here to show the world how to lead with heart, how to inspire through being themselves.`,
            strengths: ["Creative leadership", "Public recognition", "Inspiring presence", "Warm management"],
            challenges: ["Need for attention at work", "Drama in career", "Pride about reputation", "Difficulty with anonymity"]
        },
        Virgo: {
            title: "The Healer's Purpose",
            keywords: ["Service Career", "Analytical Work", "Healing Role", "Practical Impact"],
            reading: `With the 10th House (Midheaven) in Virgo, this soul's life purpose and public role involve service, healing, and practical improvement. Career must allow them to be genuinely useful and make things better.

This placement indicates someone destined to serve and heal in their chosen field. The world will come to know them as capable, helpful, and attentive to details. Career success requires humility and skill.

Ideal career paths include: healthcare, nutrition, wellness, analysis, editing, administration, veterinary work, environmental science, or any field where they can improve things through careful attention.

The life lesson in career is learning that imperfect work still helps and that they don't need to sacrifice themselves. They're here to show the world how to serve with excellence without martyrdom.`,
            strengths: ["Skilled professional", "Helpful service", "Attention to detail", "Health-oriented work"],
            challenges: ["Perfectionism at work", "Self-critical career", "Workaholic tendency", "Underpaid for skill"]
        },
        Libra: {
            title: "The Harmonizer's Purpose",
            keywords: ["Partnership Career", "Artistic Work", "Diplomatic Role", "Beauty Industry"],
            reading: `With the 10th House (Midheaven) in Libra, this soul's life purpose and public role involve creating harmony, beauty, and fair relationships. Career must allow for partnership and aesthetic expression.

This placement indicates someone destined to create harmony in their chosen field. The world will come to know them as diplomatic, fair, and drawn to beauty. Career success often requires partnership.

Ideal career paths include: law, diplomacy, design, fashion, beauty industry, couples counseling, mediation, art, event planning, or any field involving aesthetics or balanced relationships.

The life lesson in career is learning to take a stand and make decisions, even when it disrupts harmony. They're here to show the world how to work together beautifully, how to lead with grace.`,
            strengths: ["Partnership in career", "Diplomatic reputation", "Aesthetic work", "Fair leadership"],
            challenges: ["Indecisive about career", "Too dependent on partners", "Avoiding career conflict", "Image over substance"]
        },
        Scorpio: {
            title: "The Transformer's Purpose",
            keywords: ["Powerful Career", "Transformative Work", "Research Role", "Deep Impact"],
            reading: `With the 10th House (Midheaven) in Scorpio, this soul's life purpose and public role involve transformation, depth, and powerful change. Career must allow them to work with what others avoid.

This placement indicates someone destined to transform their chosen field. The world will come to know them as powerful, perceptive, and unafraid of darkness. Career success requires psychological strength.

Ideal career paths include: psychology, research, investigation, surgery, hospice, transformation coaching, finance, insurance, crisis management, or any field involving depth, power, or life-death matters.

The life lesson in career is learning to use power for healing rather than control and to transform without destroying. They're here to show the world how to face darkness and find gold.`,
            strengths: ["Transformative impact", "Powerful presence", "Deep research", "Crisis leadership"],
            challenges: ["Power struggles at work", "Obsessive about career", "Secretive reputation", "Controlling management"]
        },
        Sagittarius: {
            title: "The Teacher's Purpose",
            keywords: ["Educational Career", "Inspiring Work", "International Scope", "Philosophical Role"],
            reading: `With the 10th House (Midheaven) in Sagittarius, this soul's life purpose and public role involve teaching, inspiring, and expanding horizons. Career must offer freedom and meaningful purpose.

This placement indicates someone destined to teach and inspire in their chosen field. The world will come to know them as wise, optimistic, and big-picture oriented. Career success requires meaning.

Ideal career paths include: education, publishing, travel industry, international business, philosophy, religion, motivational speaking, law, higher education, or any field involving expansion and inspiration.

The life lesson in career is learning to focus and follow through while maintaining vision. They're here to show the world how to seek meaning, how to inspire others to grow.`,
            strengths: ["Inspiring teacher", "International success", "Philosophical approach", "Optimistic leadership"],
            challenges: ["Restless career", "Over-promising", "Preachy at work", "Difficulty with details"]
        },
        Capricorn: {
            title: "The Executive's Purpose",
            keywords: ["Leadership Career", "Achievement-Oriented", "Authority Role", "Lasting Legacy"],
            reading: `With the 10th House (Midheaven) in Capricorn, this soul's life purpose and public role involve leadership, achievement, and building lasting structures. Career is central to identity and purpose.

This placement (Capricorn's natural home) indicates someone destined for significant achievement and authority. The world will come to know them as competent, reliable, and willing to take responsibility. Career success requires patience and dedication.

Ideal career paths include: executive roles, government, management, architecture, engineering, business ownership, administration, or any field where they can build something lasting and rise to authority.

The life lesson in career is learning that success includes satisfaction and that achievement doesn't replace connection. They're here to show the world how to build, lead, and achieve with integrity.`,
            strengths: ["Natural authority", "Lasting achievement", "Responsible leadership", "Career focused"],
            challenges: ["Workaholism", "Cold reputation", "All work no play", "Status obsession"]
        },
        Aquarius: {
            title: "The Innovator's Purpose",
            keywords: ["Innovative Career", "Humanitarian Work", "Technology Role", "Progressive Impact"],
            reading: `With the 10th House (Midheaven) in Aquarius, this soul's life purpose and public role involve innovation, humanitarian work, and progressive change. Career must make a difference and allow originality.

This placement indicates someone destined to innovate in their chosen field. The world will come to know them as progressive, original, and concerned with collective benefit. Career success requires thinking differently.

Ideal career paths include: technology, science, social activism, humanitarian work, invention, astrology, broadcasting, community organizing, or any field involving innovation and collective progress.

The life lesson in career is learning to connect individually while serving collectively and to remain accessible while being different. They're here to show the world how to change things for everyone.`,
            strengths: ["Innovative work", "Humanitarian impact", "Original career", "Progressive leadership"],
            challenges: ["Too unconventional", "Detached reputation", "Rebellion against work norms", "Difficulty with hierarchy"]
        },
        Pisces: {
            title: "The Healer's Purpose",
            keywords: ["Healing Career", "Creative Work", "Spiritual Role", "Compassionate Service"],
            reading: `With the 10th House (Midheaven) in Pisces, this soul's life purpose and public role involve healing, creativity, and spiritual service. Career must feel meaningful and connected to something greater.

This placement indicates someone destined to heal or create art in their chosen field. The world will come to know them as compassionate, imaginative, and somewhat mysterious. Career success requires surrender to flow.

Ideal career paths include: arts, music, film, healing professions, spiritual counseling, photography, work with the disadvantaged, dream work, or any field involving creativity, healing, or transcendence.

The life lesson in career is learning to maintain boundaries while remaining compassionate and to ground creative gifts in practical form. They're here to show the world how to work as service, how to create from soul.`,
            strengths: ["Artistic career", "Healing reputation", "Spiritual work", "Compassionate service"],
            challenges: ["Career confusion", "Boundaries at work", "Martyr complex", "Escapism from career demands"]
        }
    }
};

// ============================================
// ADDITIONAL PLANETARY ASPECTS
// ============================================

const ADDITIONAL_ASPECT_READINGS = {
    'Mercury-Mars': {
        conjunction: {
            title: "The Swift Warrior",
            keywords: ["Quick Mind", "Direct Speech", "Mental Fighter", "Decisive Thinker"],
            reading: `Mercury conjunct Mars creates a powerful connection between thought and action. The mind works quickly, speech is direct, and ideas are pursued with energy and determination. This child will think fast and speak fast, with a natural ability to debate and defend their ideas. They'll need to learn that not every thought requires immediate expression, and that listening can be as powerful as speaking.`,
            strength: "Quick, decisive thinking with the courage to express ideas",
            challenge: "May speak before thinking or become argumentative"
        },
        trine: {
            title: "The Articulate Warrior",
            keywords: ["Confident Communication", "Mental Energy", "Assertive Expression", "Active Mind"],
            reading: `Mercury trine Mars creates natural harmony between thinking and doing. Ideas flow easily into action, and communication is confident without being aggressive. This child will express themselves clearly and pursue knowledge actively. Their mental energy can be channeled into learning, writing, or any intellectual pursuit with excellent results.`,
            strength: "Natural ability to communicate assertively and act on ideas",
            challenge: "May become impatient with slower thinkers"
        },
        square: {
            title: "The Mental Warrior",
            keywords: ["Sharp Tongue", "Mental Conflict", "Verbal Battles", "Challenging Communication"],
            reading: `Mercury square Mars creates productive tension between thought and action. The mind is sharp, sometimes too sharp, with a tendency toward mental combat. This child will need to learn to channel their verbal energy constructively. They're learning that words are powerful tools that can build or destroy. With maturity, they become excellent advocates and debaters.`,
            strength: "Sharp wit, courage to speak up, mental agility",
            challenge: "Tendency toward verbal conflict or mental impatience"
        },
        opposition: {
            title: "The Thought-Action Balance",
            keywords: ["Mind vs. Action", "Others Challenge Ideas", "Debate Through Relationships", "Mental Opposition"],
            reading: `Mercury opposite Mars requires balancing personal thinking with others' actions. Others may challenge their ideas or provoke debates. This child is learning to stand by their thoughts while remaining open to others' perspectives. The gift is becoming skilled at understanding opposing viewpoints and defending positions with grace.`,
            strength: "Ability to see multiple sides and debate constructively",
            challenge: "May attract argumentative people or feel mentally opposed"
        }
    },
    'Sun-Venus': {
        conjunction: {
            title: "The Radiant Heart",
            keywords: ["Charming Nature", "Love of Beauty", "Artistic Soul", "Natural Grace"],
            reading: `Sun conjunct Venus blesses the soul with charm, grace, and an appreciation of beauty. The core identity is softened by Venus's gifts, creating someone naturally lovable and loving. This child radiates warmth and has an innate understanding of aesthetics. They'll be drawn to creating harmony and beauty wherever they go, and relationships will be central to their sense of self.`,
            strength: "Natural charm, artistic sensibility, ability to create harmony",
            challenge: "May be overly focused on approval or appearances"
        },
        trine: {
            title: "The Harmonious Self",
            keywords: ["Easy Grace", "Natural Charm", "Creative Expression", "Loving Nature"],
            reading: `Sun trine Venus creates natural harmony between identity and love. Self-expression is graceful, relationships come easily, and there's a natural appreciation of beauty. This child will have an easy charm and an ability to create pleasure and harmony. Creativity flows naturally, and they're generally well-liked without seeming to try.`,
            strength: "Graceful self-expression, natural popularity, artistic gifts",
            challenge: "May take love and ease for granted"
        },
        sextile: {
            title: "The Charming Spirit",
            keywords: ["Social Opportunity", "Creative Potential", "Relationship Skills", "Aesthetic Awareness"],
            reading: `Sun sextile Venus offers opportunities for charm, creativity, and harmonious self-expression. This child will have opportunities to develop social skills and artistic abilities if they choose to cultivate them. Relationships offer chances for growth and self-discovery.`,
            strength: "Opportunities for creative expression and harmonious relationships",
            challenge: "Must actively develop potential rather than assume it"
        }
    },
    'Moon-Mars': {
        conjunction: {
            title: "The Emotional Warrior",
            keywords: ["Passionate Feelings", "Emotional Courage", "Protective Instinct", "Intense Reactions"],
            reading: `Moon conjunct Mars creates intense emotional nature with strong instincts. Feelings are powerful and immediately expressed. This child will have strong protective instincts and emotional courage. They feel deeply and act on feelings quickly. Learning to pause between emotion and reaction is a key life lesson, but their emotional bravery is a genuine gift.`,
            strength: "Emotional courage, protective instincts, passion",
            challenge: "May react emotionally before processing"
        },
        trine: {
            title: "The Brave Heart",
            keywords: ["Emotional Strength", "Instinctive Action", "Protective Nature", "Healthy Expression"],
            reading: `Moon trine Mars creates healthy flow between feelings and actions. Emotions energize rather than overwhelm, and this child will act on feelings with natural confidence. They're emotionally brave and able to protect themselves and others. Anger and sadness are experienced and released naturally without getting stuck.`,
            strength: "Natural emotional courage and healthy expression",
            challenge: "May assume everyone handles emotions as easily"
        },
        square: {
            title: "The Emotional Challenge",
            keywords: ["Inner Conflict", "Emotional Intensity", "Need for Outlet", "Transformative Feelings"],
            reading: `Moon square Mars creates productive tension between feelings and actions. Emotions can be intense and sometimes feel at war with each other or with impulses to act. This child is learning to balance sensitivity with strength. Physical outlets for emotional energy are essential. The gift is developing emotional courage and the ability to act from feeling.`,
            strength: "Emotional intensity that becomes passion and drive",
            challenge: "Tendency toward emotional outbursts or inner conflict"
        },
        opposition: {
            title: "The Relationship Warrior",
            keywords: ["Others Trigger Emotions", "Emotional Projection", "Relationship Passion", "Balance Sensitivity and Strength"],
            reading: `Moon opposite Mars requires balancing personal feelings with others' actions. Others may trigger emotional responses or seem aggressive. This child is learning to own their emotional power without projecting it onto others. The gift is developing the ability to be both sensitive and strong, both nurturing and assertive.`,
            strength: "Can become skilled at balancing emotional needs with action",
            challenge: "May attract conflict or project anger onto others"
        }
    },
    'Sun-Jupiter': {
        conjunction: {
            title: "The Lucky Soul",
            keywords: ["Natural Optimism", "Abundant Spirit", "Expansion", "Generosity"],
            reading: `Sun conjunct Jupiter blesses the identity with optimism, faith, and expansion. The core self is naturally confident and generous, believing in possibilities and growth. This child will radiate positive energy and expect good things - and often receive them. Their enthusiasm is contagious, and their generosity extends to spirit as well as material things.`,
            strength: "Natural optimism, generosity, faith in life",
            challenge: "May overestimate abilities or expect too much"
        },
        trine: {
            title: "The Blessed Path",
            keywords: ["Easy Growth", "Natural Faith", "Opportunities Flow", "Positive Outlook"],
            reading: `Sun trine Jupiter creates natural harmony between identity and expansion. Growth comes easily, opportunities appear, and there's an innate faith that things work out. This child will have a positive outlook that genuinely seems to attract good fortune. They inspire others through their natural optimism and generosity of spirit.`,
            strength: "Things seem to work out, natural luck, positive nature",
            challenge: "May take good fortune for granted"
        },
        square: {
            title: "The Growth Challenge",
            keywords: ["Over-Expansion", "Faith Through Challenge", "Learning Limits", "Big Dreams"],
            reading: `Sun square Jupiter creates productive tension between identity and growth. Dreams may be too big, promises too many, or expansion unchecked. This child is learning that more isn't always better and that limits can be gifts. The struggle develops genuine wisdom and a faith that's been tested and proven.`,
            strength: "Big vision, willingness to take risks for growth",
            challenge: "Tendency to over-promise or expand beyond capacity"
        },
        opposition: {
            title: "The Expansion Balance",
            keywords: ["Others Bring Growth", "Balance Confidence", "Projected Optimism", "Learning Through Others"],
            reading: `Sun opposite Jupiter requires balancing personal identity with others' expansion or beliefs. Others may seem more confident or lucky. This child is learning that their own luck and faith are as valid as what they see in others. The gift is developing balanced optimism that neither over-inflates nor under-appreciates self.`,
            strength: "Can learn from others' success and develop balanced confidence",
            challenge: "May project their own potential onto others"
        }
    },
    'Mercury-Jupiter': {
        conjunction: {
            title: "The Expanding Mind",
            keywords: ["Big Thinking", "Philosophical Mind", "Optimistic Communication", "Learning Love"],
            reading: `Mercury conjunct Jupiter creates a mind that thinks big. Ideas are expansive, communication is enthusiastic, and learning is a lifelong joy. This child will have an insatiable curiosity and a gift for seeing the big picture. They may be drawn to philosophy, travel, or any field that expands understanding. Teaching and sharing knowledge come naturally.`,
            strength: "Expansive thinking, love of learning, optimistic communication",
            challenge: "May overlook details or exaggerate"
        },
        trine: {
            title: "The Fortunate Mind",
            keywords: ["Easy Learning", "Positive Thinking", "Natural Teacher", "Wisdom Flow"],
            reading: `Mercury trine Jupiter creates natural flow between thinking and understanding. Learning comes easily, thinking is positive, and wisdom develops naturally. This child will absorb knowledge joyfully and share it generously. They have a gift for explaining complex ideas simply and for seeing possibility in every situation.`,
            strength: "Natural wisdom, easy learning, positive mental attitude",
            challenge: "May not develop intellectual rigor"
        },
        square: {
            title: "The Thinking Challenge",
            keywords: ["Mental Restlessness", "Over-Thinking", "Faith vs. Logic", "Learning Through Challenge"],
            reading: `Mercury square Jupiter creates productive tension between detailed thinking and big-picture understanding. The mind may race ahead of facts or struggle to reconcile logic with faith. This child is learning to balance optimism with reality, big ideas with careful thought. The result is genuine wisdom earned through mental discipline.`,
            strength: "Develops rigorous thinking while maintaining vision",
            challenge: "Tendency to mental restlessness or over-confidence in ideas"
        },
        opposition: {
            title: "The Wisdom Balance",
            keywords: ["Others Challenge Ideas", "Learning Through Debate", "Balancing Detail and Vision", "Projected Wisdom"],
            reading: `Mercury opposite Jupiter requires balancing personal thinking with others' wisdom or beliefs. Others may challenge ideas or offer perspectives that expand understanding. This child is learning that their own wisdom is as valid as what they see in others. The gift is developing balanced thinking that honors both detail and vision.`,
            strength: "Can learn from others and develop nuanced understanding",
            challenge: "May project their own wisdom onto teachers or guides"
        }
    }
};

// ============================================
// VERTEX BY SIGN - Fated Encounters
// ============================================

const VERTEX_READINGS = {
    Aries: {
        title: "Fated Courage",
        keywords: ["Destiny Through Action", "Fated Independence", "Karmic Leadership", "Encounter Initiation"],
        reading: `The Vertex in Aries indicates fated encounters that awaken courage, independence, and the warrior spirit. Key relationships and events seem destined to push this soul toward greater self-assertion and pioneering action.

Fated people will enter life who challenge them to be braver, more independent, more willing to fight for what they want. These encounters may feel uncomfortable at first but are ultimately activating their own warrior energy.

The soul is being called toward leadership and independent action through seemingly destined circumstances. They'll find themselves "accidentally" put in positions requiring courage.

The gift is learning that fate conspires to make them stronger. The challenge is not resisting the call to action that destiny brings.`
    },
    Taurus: {
        title: "Fated Security",
        keywords: ["Destiny Through Stability", "Fated Worth", "Karmic Resources", "Encounter Value"],
        reading: `The Vertex in Taurus indicates fated encounters that awaken self-worth, material security, and appreciation of beauty. Key relationships and events seem destined to teach lessons about value - both self-value and material resources.

Fated people will enter life who affect finances, possessions, or sense of worth. These relationships may involve shared resources or lessons about what's truly valuable.

The soul is being called toward stability, beauty, and self-worth through seemingly destined circumstances. They'll find themselves in situations requiring them to know their value.

The gift is learning that fate brings lessons about true worth. The challenge is remaining open when fated events challenge material security.`
    },
    Gemini: {
        title: "Fated Communication",
        keywords: ["Destiny Through Learning", "Fated Connections", "Karmic Communication", "Encounter Ideas"],
        reading: `The Vertex in Gemini indicates fated encounters that awaken curiosity, communication skills, and mental agility. Key relationships and events seem destined to bring important information or learning opportunities.

Fated people will enter life who teach, communicate, or share vital information. These relationships often involve siblings, neighbors, or people met through communication channels.

The soul is being called toward learning and communication through seemingly destined circumstances. They'll find themselves "accidentally" receiving important messages or connections.

The gift is learning that fate brings the teachers and information needed. The challenge is paying attention when destiny speaks.`
    },
    Cancer: {
        title: "Fated Nurturing",
        keywords: ["Destiny Through Family", "Fated Home", "Karmic Nurturing", "Encounter Belonging"],
        reading: `The Vertex in Cancer indicates fated encounters that awaken emotional needs, family bonds, and the need for belonging. Key relationships and events seem destined to affect home and family life.

Fated people will enter life who become family or trigger deep emotional responses. These relationships often feel instantly familiar, like reconnecting with someone from before.

The soul is being called toward emotional depth and nurturing through seemingly destined circumstances. They'll find themselves creating or joining families in unexpected ways.

The gift is learning that fate brings the belonging that's needed. The challenge is remaining open to emotional vulnerability when destiny calls.`
    },
    Leo: {
        title: "Fated Creativity",
        keywords: ["Destiny Through Expression", "Fated Joy", "Karmic Creativity", "Encounter Heart"],
        reading: `The Vertex in Leo indicates fated encounters that awaken creative expression, joy, and the courage to be seen. Key relationships and events seem destined to put the spotlight on their unique gifts.

Fated people will enter life who encourage creative expression or offer love and recognition. These relationships may involve artists, children, or romantic partners.

The soul is being called toward creative self-expression through seemingly destined circumstances. They'll find themselves "accidentally" in the spotlight or receiving recognition.

The gift is learning that fate wants them to shine. The challenge is accepting the call to visibility when destiny offers the stage.`
    },
    Virgo: {
        title: "Fated Service",
        keywords: ["Destiny Through Healing", "Fated Work", "Karmic Service", "Encounter Improvement"],
        reading: `The Vertex in Virgo indicates fated encounters that awaken the desire to serve, heal, and improve. Key relationships and events seem destined to involve health, work, or service to others.

Fated people will enter life who need help or who offer opportunities to be useful. These relationships often involve health practitioners, coworkers, or people who benefit from their skills.

The soul is being called toward service and healing through seemingly destined circumstances. They'll find themselves in positions where their skills are exactly what's needed.

The gift is learning that fate brings opportunities to be useful. The challenge is accepting the call to service without becoming a martyr.`
    },
    Libra: {
        title: "Fated Partnership",
        keywords: ["Destiny Through Others", "Fated Relationships", "Karmic Balance", "Encounter Harmony"],
        reading: `The Vertex in Libra indicates fated encounters that awaken through partnership, balance, and harmony. Key relationships and events seem destined to bring significant others who transform life direction.

Fated people will enter life who become partners in love, business, or art. These relationships feel destined and life-changing from the first meeting.

The soul is being called toward partnership and balance through seemingly destined circumstances. They'll find themselves meeting people who feel like fate.

The gift is learning that fate brings the partners who are needed. The challenge is maintaining self within relationships that feel so destined.`
    },
    Scorpio: {
        title: "Fated Transformation",
        keywords: ["Destiny Through Crisis", "Fated Depth", "Karmic Transformation", "Encounter Power"],
        reading: `The Vertex in Scorpio indicates fated encounters that awaken through intensity, transformation, and facing the shadow. Key relationships and events seem destined to bring profound change.

Fated people will enter life who trigger transformation or who require confronting hidden aspects of self. These relationships are intense, sometimes difficult, but always transformative.

The soul is being called toward depth and transformation through seemingly destined circumstances. They'll find themselves in situations that require facing what they'd rather avoid.

The gift is learning that fate brings the transformation that's needed. The challenge is trusting the process when destiny brings darkness before light.`
    },
    Sagittarius: {
        title: "Fated Adventure",
        keywords: ["Destiny Through Expansion", "Fated Learning", "Karmic Journey", "Encounter Meaning"],
        reading: `The Vertex in Sagittarius indicates fated encounters that awaken through adventure, learning, and the search for meaning. Key relationships and events seem destined to expand horizons.

Fated people will enter life who are teachers, travelers, or truth-seekers. These relationships often involve people from different cultures or philosophical backgrounds.

The soul is being called toward expansion and meaning through seemingly destined circumstances. They'll find themselves "accidentally" traveling, learning, or encountering new philosophies.

The gift is learning that fate expands rather than limits. The challenge is saying yes when destiny calls to adventure.`
    },
    Capricorn: {
        title: "Fated Achievement",
        keywords: ["Destiny Through Responsibility", "Fated Authority", "Karmic Achievement", "Encounter Mastery"],
        reading: `The Vertex in Capricorn indicates fated encounters that awaken through responsibility, achievement, and mastery. Key relationships and events seem destined to involve career and public standing.

Fated people will enter life who are authority figures or who affect career direction. These relationships often involve mentors, bosses, or people who offer advancement opportunities.

The soul is being called toward achievement and responsibility through seemingly destined circumstances. They'll find themselves in positions of increasing authority.

The gift is learning that fate builds through patience and effort. The challenge is accepting responsibility when destiny promotes them.`
    },
    Aquarius: {
        title: "Fated Innovation",
        keywords: ["Destiny Through Uniqueness", "Fated Community", "Karmic Freedom", "Encounter Progress"],
        reading: `The Vertex in Aquarius indicates fated encounters that awaken through uniqueness, community, and progressive thinking. Key relationships and events seem destined to involve groups and innovation.

Fated people will enter life who are unusual, progressive, or connected to groups and causes. These relationships often involve friends, organizations, or visionary thinkers.

The soul is being called toward originality and community through seemingly destined circumstances. They'll find themselves joining movements or meeting people who change their worldview.

The gift is learning that fate connects to the collective. The challenge is maintaining individuality while answering destiny's call to community.`
    },
    Pisces: {
        title: "Fated Transcendence",
        keywords: ["Destiny Through Spirit", "Fated Compassion", "Karmic Healing", "Encounter Unity"],
        reading: `The Vertex in Pisces indicates fated encounters that awaken through spirituality, compassion, and transcendent experience. Key relationships and events seem destined to dissolve boundaries.

Fated people will enter life who are healers, artists, or spiritual teachers. These relationships often feel otherworldly, as if connecting across lifetimes or dimensions.

The soul is being called toward spiritual awakening through seemingly destined circumstances. They'll find themselves in situations that require faith, surrender, or service.

The gift is learning that fate connects to the divine. The challenge is remaining grounded when destiny calls to transcendence.`
    }
};

// ============================================
// NODES IN HOUSES
// ============================================

const NODES_IN_HOUSES = {
    north: {
        1: {
            title: "North Node in 1st House - Identity Journey",
            keywords: ["Self-Discovery", "Independence", "Personal Initiative", "Identity Development"],
            reading: `The North Node in the 1st House indicates this soul's growth path involves developing a strong sense of self, independent identity, and personal initiative. Past patterns (South Node in 7th House) involved over-focus on others, partnerships, and accommodating.

This lifetime calls for learning to put themselves first, develop personal goals, and act independently. They're here to learn that "I" is as important as "we."

Growth comes through taking initiative, developing self-reliance, and allowing others to adjust to them rather than always adjusting. The soul purpose involves discovering and expressing who they truly are.`
        },
        2: {
            title: "North Node in 2nd House - Value Journey",
            keywords: ["Self-Worth", "Personal Resources", "Material Security", "Values Development"],
            reading: `The North Node in the 2nd House indicates this soul's growth path involves developing self-worth, building personal resources, and creating material security. Past patterns (South Node in 8th House) involved depending on others' resources or intensity.

This lifetime calls for building their own security, knowing their worth, and enjoying simple pleasures. They're here to learn that they can provide for themselves.

Growth comes through developing practical skills, earning their own money, and appreciating what they have. The soul purpose involves discovering and living by their authentic values.`
        },
        3: {
            title: "North Node in 3rd House - Communication Journey",
            keywords: ["Learning", "Communication", "Curiosity", "Daily Connection"],
            reading: `The North Node in the 3rd House indicates this soul's growth path involves developing communication skills, staying curious, and connecting with immediate environment. Past patterns (South Node in 9th House) involved focus on higher truths at the expense of practical learning.

This lifetime calls for asking questions, learning from everyone, and communicating clearly. They're here to learn that simple connection matters as much as grand understanding.

Growth comes through writing, teaching, learning, and engaging with siblings and neighbors. The soul purpose involves becoming a messenger who shares information helpfully.`
        },
        4: {
            title: "North Node in 4th House - Home Journey",
            keywords: ["Emotional Security", "Home Building", "Family", "Inner Foundation"],
            reading: `The North Node in the 4th House indicates this soul's growth path involves developing emotional security, creating home, and building inner foundations. Past patterns (South Node in 10th House) involved over-focus on career and public achievement.

This lifetime calls for developing emotional intelligence, creating family, and finding security within. They're here to learn that home and feeling are as important as achievement.

Growth comes through nurturing self and others, establishing roots, and processing emotions. The soul purpose involves creating a sanctuary and discovering that security is internal.`
        },
        5: {
            title: "North Node in 5th House - Creative Journey",
            keywords: ["Self-Expression", "Creativity", "Joy", "Heart-Centered Living"],
            reading: `The North Node in the 5th House indicates this soul's growth path involves developing creative self-expression, finding joy, and following the heart. Past patterns (South Node in 11th House) involved losing self in group causes or future focus.

This lifetime calls for creative expression, romantic passion, and childlike play. They're here to learn that personal joy matters as much as collective good.

Growth comes through making art, having fun, taking center stage, and following the heart. The soul purpose involves shining as an individual and inspiring others through authentic expression.`
        },
        6: {
            title: "North Node in 6th House - Service Journey",
            keywords: ["Practical Service", "Daily Routine", "Health", "Improvement"],
            reading: `The North Node in the 6th House indicates this soul's growth path involves developing practical skills, serving others concretely, and establishing healthy routines. Past patterns (South Node in 12th House) involved escapism, martyrdom, or avoiding practical reality.

This lifetime calls for grounded service, attention to health, and mastering daily tasks. They're here to learn that showing up in the ordinary world is a spiritual practice.

Growth comes through developing useful skills, serving without losing self, and taking care of body and environment. The soul purpose involves being genuinely helpful in concrete ways.`
        },
        7: {
            title: "North Node in 7th House - Partnership Journey",
            keywords: ["Relationship", "Cooperation", "Others' Perspectives", "Balance"],
            reading: `The North Node in the 7th House indicates this soul's growth path involves developing relationship skills, cooperating with others, and learning to truly see partners. Past patterns (South Node in 1st House) involved self-focus and independent action.

This lifetime calls for partnership, compromise, and considering others' needs. They're here to learn that "we" is as important as "I."

Growth comes through committed relationship, cooperation, and allowing others to matter. The soul purpose involves learning the art of true partnership and balanced give-and-take.`
        },
        8: {
            title: "North Node in 8th House - Transformation Journey",
            keywords: ["Deep Intimacy", "Shared Resources", "Transformation", "Psychology"],
            reading: `The North Node in the 8th House indicates this soul's growth path involves developing intimacy, sharing resources, and embracing transformation. Past patterns (South Node in 2nd House) involved self-reliance and holding onto personal resources.

This lifetime calls for learning to merge, to share, and to transform through crisis. They're here to learn that letting go can bring more than holding on.

Growth comes through intimate relationship, shared finances, psychological depth, and facing the shadow. The soul purpose involves learning that transformation requires surrender.`
        },
        9: {
            title: "North Node in 9th House - Expansion Journey",
            keywords: ["Higher Learning", "Travel", "Philosophy", "Faith"],
            reading: `The North Node in the 9th House indicates this soul's growth path involves developing faith, seeking higher truth, and expanding horizons. Past patterns (South Node in 3rd House) involved local focus and gathering information without finding meaning.

This lifetime calls for adventure, higher education, and developing a personal philosophy. They're here to learn that meaning matters as much as facts.

Growth comes through travel, study, teaching, and developing wisdom. The soul purpose involves becoming a truth-seeker who inspires others toward growth.`
        },
        10: {
            title: "North Node in 10th House - Achievement Journey",
            keywords: ["Career", "Public Role", "Achievement", "Responsibility"],
            reading: `The North Node in the 10th House indicates this soul's growth path involves developing career, public standing, and responsible authority. Past patterns (South Node in 4th House) involved over-focus on home, family, and emotional security.

This lifetime calls for stepping into the public eye, building career, and accepting authority. They're here to learn that achievement in the world matters too.

Growth comes through professional development, public contribution, and accepting responsibility. The soul purpose involves making a mark on the world through visible achievement.`
        },
        11: {
            title: "North Node in 11th House - Community Journey",
            keywords: ["Community", "Future Vision", "Friendship", "Collective Good"],
            reading: `The North Node in the 11th House indicates this soul's growth path involves developing community connection, future vision, and concern for collective good. Past patterns (South Node in 5th House) involved self-focused creativity or personal drama.

This lifetime calls for joining groups, thinking of the future, and contributing to causes beyond self. They're here to learn that belonging to something larger is fulfilling.

Growth comes through friendship, group participation, and working for collective benefit. The soul purpose involves becoming part of something larger while maintaining individuality.`
        },
        12: {
            title: "North Node in 12th House - Spiritual Journey",
            keywords: ["Spirituality", "Surrender", "Compassion", "Transcendence"],
            reading: `The North Node in the 12th House indicates this soul's growth path involves developing spirituality, practicing surrender, and connecting to the transcendent. Past patterns (South Node in 6th House) involved over-focus on work, details, and practical service.

This lifetime calls for faith, meditation, and allowing life to flow rather than controlling every detail. They're here to learn that some things cannot be fixed, only surrendered.

Growth comes through spiritual practice, solitude, compassion, and letting go. The soul purpose involves connecting to something greater than the material world.`
        }
    },
    south: {
        1: {
            title: "South Node in 1st House - Identity Gifts",
            keywords: ["Natural Independence", "Self-Awareness", "Personal Power", "Past Self-Focus"],
            reading: `The South Node in the 1st House indicates natural gifts around identity, independence, and self-assertion. These are abilities brought from past lives - natural self-reliance that came easily. The comfort zone involves self-focus and going it alone.

The lesson is to use these gifts while developing the opposite: partnership, consideration of others, and cooperation (North Node in 7th House). The self-knowledge gained in other lifetimes now serves relationship learning.`
        },
        2: {
            title: "South Node in 2nd House - Resource Gifts",
            keywords: ["Natural Self-Worth", "Material Skills", "Values Clarity", "Past Security"],
            reading: `The South Node in the 2nd House indicates natural gifts around self-worth, material security, and knowing personal values. These are abilities brought from past lives - natural ability to create security. The comfort zone involves self-reliance and holding onto resources.

The lesson is to use these gifts while developing the opposite: sharing, intimacy, and transformation through merging (North Node in 8th House). The stability developed in other lifetimes now supports deep connection.`
        },
        3: {
            title: "South Node in 3rd House - Communication Gifts",
            keywords: ["Natural Curiosity", "Communication Skills", "Mental Agility", "Past Learning"],
            reading: `The South Node in the 3rd House indicates natural gifts around communication, learning, and mental agility. These are abilities brought from past lives - natural ability to gather and share information. The comfort zone involves staying in the mental realm.

The lesson is to use these gifts while developing the opposite: wisdom, faith, and meaning-making (North Node in 9th House). The communication skills developed in other lifetimes now serve the search for truth.`
        },
        4: {
            title: "South Node in 4th House - Emotional Gifts",
            keywords: ["Natural Nurturing", "Emotional Intelligence", "Family Connection", "Past Security"],
            reading: `The South Node in the 4th House indicates natural gifts around emotional intelligence, nurturing, and creating security. These are abilities brought from past lives - natural ability to create home and family. The comfort zone involves staying in the private sphere.

The lesson is to use these gifts while developing the opposite: career, public contribution, and visible achievement (North Node in 10th House). The emotional foundation built in other lifetimes now supports worldly success.`
        },
        5: {
            title: "South Node in 5th House - Creative Gifts",
            keywords: ["Natural Creativity", "Self-Expression", "Heart-Centered Living", "Past Joy"],
            reading: `The South Node in the 5th House indicates natural gifts around creativity, self-expression, and following the heart. These are abilities brought from past lives - natural ability to shine and create joy. The comfort zone involves personal drama and center-stage.

The lesson is to use these gifts while developing the opposite: community, collective good, and future vision (North Node in 11th House). The creative gifts developed in other lifetimes now serve something larger.`
        },
        6: {
            title: "South Node in 6th House - Service Gifts",
            keywords: ["Natural Helpfulness", "Practical Skills", "Work Ethic", "Past Service"],
            reading: `The South Node in the 6th House indicates natural gifts around service, practical skills, and attention to detail. These are abilities brought from past lives - natural ability to be useful and fix things. The comfort zone involves working and improving.

The lesson is to use these gifts while developing the opposite: spirituality, surrender, and connection to the transcendent (North Node in 12th House). The service skills developed in other lifetimes now support spiritual growth.`
        },
        7: {
            title: "South Node in 7th House - Partnership Gifts",
            keywords: ["Natural Diplomacy", "Relationship Skills", "Cooperation", "Past Partnership"],
            reading: `The South Node in the 7th House indicates natural gifts around partnership, diplomacy, and cooperation. These are abilities brought from past lives - natural ability to relate and compromise. The comfort zone involves focusing on others and partnerships.

The lesson is to use these gifts while developing the opposite: independence, self-assertion, and personal identity (North Node in 1st House). The relationship skills developed in other lifetimes now support self-development.`
        },
        8: {
            title: "South Node in 8th House - Transformation Gifts",
            keywords: ["Natural Depth", "Psychological Insight", "Transformative Power", "Past Intensity"],
            reading: `The South Node in the 8th House indicates natural gifts around transformation, psychological depth, and intimate connection. These are abilities brought from past lives - natural ability to merge and transform. The comfort zone involves intensity and others' resources.

The lesson is to use these gifts while developing the opposite: self-worth, personal resources, and simplicity (North Node in 2nd House). The transformative power developed in other lifetimes now supports building personal security.`
        },
        9: {
            title: "South Node in 9th House - Wisdom Gifts",
            keywords: ["Natural Faith", "Philosophical Mind", "Teaching Ability", "Past Adventure"],
            reading: `The South Node in the 9th House indicates natural gifts around wisdom, faith, and big-picture thinking. These are abilities brought from past lives - natural ability to see meaning and teach truth. The comfort zone involves preaching and certainty.

The lesson is to use these gifts while developing the opposite: curiosity, listening, and learning from everyone (North Node in 3rd House). The wisdom developed in other lifetimes now supports ongoing learning.`
        },
        10: {
            title: "South Node in 10th House - Achievement Gifts",
            keywords: ["Natural Authority", "Career Skills", "Public Presence", "Past Achievement"],
            reading: `The South Node in the 10th House indicates natural gifts around authority, career success, and public standing. These are abilities brought from past lives - natural ability to achieve and lead. The comfort zone involves work and public role.

The lesson is to use these gifts while developing the opposite: home, emotional connection, and inner security (North Node in 4th House). The achievement skills developed in other lifetimes now support creating true home.`
        },
        11: {
            title: "South Node in 11th House - Community Gifts",
            keywords: ["Natural Group Skills", "Future Vision", "Humanitarian Concern", "Past Community"],
            reading: `The South Node in the 11th House indicates natural gifts around community, future vision, and collective connection. These are abilities brought from past lives - natural ability to join and serve groups. The comfort zone involves belonging to groups and causes.

The lesson is to use these gifts while developing the opposite: personal creativity, heart-centered expression, and individual joy (North Node in 5th House). The community skills developed in other lifetimes now support personal expression.`
        },
        12: {
            title: "South Node in 12th House - Spiritual Gifts",
            keywords: ["Natural Intuition", "Spiritual Connection", "Compassion", "Past Transcendence"],
            reading: `The South Node in the 12th House indicates natural gifts around spirituality, intuition, and transcendence. These are abilities brought from past lives - natural ability to connect to the unseen. The comfort zone involves escape, sacrifice, or withdrawal.

The lesson is to use these gifts while developing the opposite: practical service, grounded work, and attention to daily life (North Node in 6th House). The spiritual abilities developed in other lifetimes now support being useful in the real world.`
        }
    }
};

// ============================================
// SYNTHESIS READINGS
// ============================================

const SYNTHESIS_READINGS = {
    career: {
        title: "Career Path Synthesis",
        icon: "💼",
        description: "Your complete career blueprint based on your cosmic profile",
        generate: function(readings) {
            const mc = readings.astrology.midheaven || readings.astrology.sunSign;
            const saturn = readings.astrology.saturnSign;
            const mars = readings.astrology.marsSign;
            const destiny = readings.numerology.destiny;
            
            return `Career Blueprint for ${readings.input.name}

The Midheaven in ${mc.name || mc} reveals the ultimate career direction: ${getCareerPath(mc.name || mc)}. This is the mountain they're destined to climb, the public role they're here to fulfill.

Saturn in ${saturn.name} shows where discipline and mastery must be developed: ${getSaturnCareerLesson(saturn.name)}. This indicates the challenges that will become greatest strengths through dedicated effort.

Mars in ${mars.name} reveals their work style and drive: ${getMarsWorkStyle(mars.name)}. This shows how they'll pursue goals and overcome obstacles in their professional life.

Their Destiny Number ${destiny} adds numerological purpose: this soul is here to express the energy of ${destiny}, which in career terms means ${getDestinyCareer(destiny)}.

Career Synthesis: Combining these influences, the ideal career path involves ${synthesizeCareerPath(mc.name || mc, saturn.name, mars.name, destiny)}. They'll find greatest success when their work allows them to ${getCareerSuccess(mc.name || mc)}.

Early Career: During childhood and adolescence, encourage interests that align with these natural talents. Watch for early signs of ${getEarlyCareerSigns(mc.name || mc, mars.name)}.

Life Purpose Through Work: Their ultimate contribution to the world through their career will be ${getCareerPurpose(mc.name || mc, saturn.name)}.`;
        }
    },
    
    spiritual: {
        title: "Spiritual Path Synthesis",
        icon: "🔮",
        description: "Your soul's spiritual journey and growth path",
        generate: function(readings) {
            const northNode = readings.astrology.northNode;
            const chiron = readings.astrology.chiron || { name: 'Aries' };
            const moonPhase = readings.astrology.moonPhase;
            const lifePath = readings.numerology.lifePath;
            const neptune = readings.astrology.neptuneSign || { name: 'Unknown' };
            
            return `Spiritual Path for ${readings.input.name}

Soul Direction (North Node in ${northNode.name}): This soul is growing toward ${northNode.name} qualities - ${getNorthNodeSpiritual(northNode.name)}. The spiritual curriculum of this lifetime involves developing these qualities through experience.

The Healing Journey (Chiron in ${chiron.name}): Core spiritual wound and gift involve ${chiron.name} themes - ${getChironSpiritual(chiron.name)}. Healing this wound becomes their ability to heal others similarly.

Birth Moon Phase (${moonPhase.name}): Arriving during the ${moonPhase.name} imbues the soul with ${getMoonPhaseSpiritual(moonPhase.name)}. This is the spiritual "season" they carry within.

Life Path ${lifePath} adds: This master number or vibration means the spiritual journey involves ${getLifePathSpiritual(lifePath)}. The soul is learning and teaching these lessons throughout life.

Spiritual Practices: Natural spiritual practices that support this soul include ${getSpiritualPractices(northNode.name, moonPhase.name, lifePath)}.

Soul Gifts to Develop: The unique spiritual gifts waiting to unfold include ${getSoulGifts(northNode.name, chiron.name, lifePath)}.

The Awakening Path: Spiritual awakening for this soul will likely involve ${getAwakeningPath(northNode.name, chiron.name, moonPhase.name)}. Trust the timing of their unique unfolding.`;
        }
    },
    
    shadow: {
        title: "Shadow Work Synthesis",
        icon: "🌑",
        description: "Understanding and integrating the hidden self",
        generate: function(readings) {
            const lilith = readings.astrology.lilith || { name: 'Aries' };
            const southNode = readings.astrology.southNode;
            const challenges = readings.numerology.challenges;
            const chiron = readings.astrology.chiron || { name: 'Aries' };
            
            return `Shadow Work Profile for ${readings.input.name}

Primary Shadow (Lilith in ${lilith.name}): The rejected or suppressed aspects of self relate to ${lilith.name} energy - ${getLilithShadow(lilith.name)}. This represents power that was hidden, shamed, or forbidden and must be reclaimed for wholeness.

Past Life Patterns (South Node in ${southNode.name}): Comfort zones that can become limitations involve ${southNode.name} behaviors - ${getSouthNodeShadow(southNode.name)}. Over-reliance on these past gifts prevents evolution.

Core Challenge (Challenge Number ${challenges.third}): The central shadow lesson involves ${challenges.third} energy - ${getChallengesShadow(challenges.third)}. This recurring theme appears until the lesson is learned.

The Wounded Healer (Chiron in ${chiron.name}): The deepest wound that becomes greatest gift involves ${chiron.name} - ${getChironShadow(chiron.name)}. Facing this wound transforms it into healing power.

Shadow Integration Path: To integrate these shadow elements, the soul needs ${getShadowIntegration(lilith.name, southNode.name, challenges.third)}.

Reclaimed Power: When shadow work is done, this soul accesses ${getReclaimedPower(lilith.name, chiron.name)}. The very things that were hidden become sources of authentic strength.

Support for Integration: Parents and caregivers can support shadow integration by ${getShadowSupport(lilith.name, challenges.third)}. Creating space for all parts of self prevents shadow accumulation.`;
        }
    },
    
    money: {
        title: "Money Blueprint Synthesis",
        icon: "💰",
        description: "Your relationship with abundance and resources",
        generate: function(readings) {
            const venus = readings.astrology.venusSign;
            const jupiter = readings.astrology.jupiterSign;
            const saturn = readings.astrology.saturnSign;
            const lifePath = readings.numerology.lifePath;
            const house2Sign = readings.astrology.houses ? readings.astrology.houses[1] : null;
            
            return `Money Blueprint for ${readings.input.name}

Values & Attraction (Venus in ${venus.name}): Venus shows what they value and how they attract resources - ${venus.name} Venus values ${getVenusValue(venus.name)} and attracts through ${getVenusAttraction(venus.name)}.

Expansion & Luck (Jupiter in ${jupiter.name}): Jupiter shows where luck and expansion occur - ${jupiter.name} Jupiter expands through ${getJupiterExpansion(jupiter.name)}. This is where "lucky breaks" tend to happen.

Lessons & Mastery (Saturn in ${saturn.name}): Saturn shows money lessons to master - ${saturn.name} Saturn teaches ${getSaturnMoneyLesson(saturn.name)}. Early challenges become later mastery.

Life Path ${lifePath} Money Style: This vibration approaches money with ${getLifePathMoney(lifePath)}. Understanding this helps align with natural abundance flow.

Money Mindset at Birth: This soul arrives with tendencies toward ${getMoneyMindset(venus.name, saturn.name)}. Early experiences will either reinforce or help heal these patterns.

Path to Prosperity: Financial success flows when they ${getMoneySuccess(jupiter.name, venus.name, lifePath)}. Alignment with these energies opens abundance channels.

Generosity Pattern: This soul gives and receives through ${getGenerosityPattern(venus.name, jupiter.name)}. Understanding their unique generosity style prevents money guilt.

Financial Wisdom to Develop: Key money wisdom for this soul includes ${getFinancialWisdom(saturn.name, lifePath)}. These lessons, once learned, create lasting security.`;
        }
    }
};

// Helper functions for Synthesis readings
function getCareerPath(sign) {
    const paths = {
        Aries: "leadership, pioneering, athletics, entrepreneurship",
        Taurus: "finance, art, luxury goods, agriculture",
        Gemini: "communication, writing, teaching, media",
        Cancer: "healthcare, hospitality, real estate, nurturing professions",
        Leo: "entertainment, leadership, creative fields",
        Virgo: "healthcare, analysis, service industries",
        Libra: "law, design, diplomacy, partnerships",
        Scorpio: "research, psychology, finance, transformation work",
        Sagittarius: "education, travel, publishing, philosophy",
        Capricorn: "business, government, management, architecture",
        Aquarius: "technology, humanitarian work, innovation",
        Pisces: "arts, healing, spirituality, film"
    };
    return paths[sign] || "unique creative expression";
}

function getSaturnCareerLesson(sign) {
    const lessons = {
        Aries: "patience with independent action and learning to lead without dominating",
        Taurus: "building real value and not taking shortcuts to security",
        Gemini: "depth in communication and focused learning",
        Cancer: "professional boundaries while maintaining sensitivity",
        Leo: "earning recognition through merit, not expecting it",
        Virgo: "accepting imperfection while striving for excellence",
        Libra: "commitment in partnerships and decision-making",
        Scorpio: "using power ethically and trusting collaboration",
        Sagittarius: "grounding visions in practical reality",
        Capricorn: "balancing ambition with personal fulfillment",
        Aquarius: "working within systems to change them",
        Pisces: "maintaining boundaries in service roles"
    };
    return lessons[sign] || "discipline and persistence";
}

function getMarsWorkStyle(sign) {
    const styles = {
        Aries: "direct action, competitive drive, initiating new projects",
        Taurus: "steady persistence, methodical progress, building over time",
        Gemini: "versatile approach, mental agility, multiple projects",
        Cancer: "emotionally motivated, protective of projects, nurturing teamwork",
        Leo: "heart-led action, creative leadership, dramatic impact",
        Virgo: "detailed work, service-oriented action, perfectionist drive",
        Libra: "collaborative action, strategic partnerships, balanced approach",
        Scorpio: "intense focus, determined persistence, transformative impact",
        Sagittarius: "enthusiastic pursuit, freedom-seeking, big-picture action",
        Capricorn: "disciplined effort, strategic climbing, authoritative action",
        Aquarius: "innovative approach, team leadership, progressive methods",
        Pisces: "intuitive action, creative flow, compassionate motivation"
    };
    return styles[sign] || "determined pursuit of goals";
}

function getDestinyCareer(number) {
    const careers = {
        1: "leadership, innovation, pioneering new fields",
        2: "cooperation, mediation, supporting roles",
        3: "creative expression, communication, entertainment",
        4: "building, organizing, creating lasting structures",
        5: "variety, travel, change-agent roles",
        6: "nurturing, beautifying, service to family and community",
        7: "research, analysis, spiritual or intellectual work",
        8: "business, leadership, material mastery",
        9: "humanitarian service, teaching, global impact",
        11: "inspiring others, spiritual leadership, visionary work",
        22: "building large-scale projects, manifesting visions",
        33: "healing, teaching through love, spiritual service"
    };
    return careers[number] || "unique contribution";
}

function synthesizeCareerPath(mc, saturn, mars, destiny) {
    return `combining ${mc}'s public role aspirations with ${saturn}'s lessons in discipline and ${mars}'s action style, all serving the ${destiny} Destiny purpose`;
}

function getCareerSuccess(sign) {
    return `express their authentic ${sign} qualities while serving others`;
}

function getEarlyCareerSigns(mc, mars) {
    return `natural ${mc} inclinations activated by ${mars} energy in early play and interests`;
}

function getCareerPurpose(mc, saturn) {
    return `mastering ${saturn} challenges to fully embody ${mc} public contribution`;
}

function getNorthNodeSpiritual(sign) {
    const spiritual = {
        Aries: "developing spiritual warrior energy, courage in faith, self-initiation",
        Taurus: "grounded spirituality, embodied practice, sensory awareness as meditation",
        Gemini: "curious exploration, learning from many teachers, communication as spiritual practice",
        Cancer: "emotional attunement, intuitive development, nurturing as spiritual service",
        Leo: "heart-centered spirituality, creative expression as worship, joyful faith",
        Virgo: "service as spiritual path, attention as meditation, sacred in the ordinary",
        Libra: "balance as spiritual goal, partnership in practice, beauty as devotion",
        Scorpio: "transformative spirituality, depth practices, shadow work as sacred",
        Sagittarius: "seeking truth, philosophical exploration, teaching as spiritual service",
        Capricorn: "disciplined practice, mastery path, responsibility as spiritual lesson",
        Aquarius: "community spirituality, progressive practice, service to humanity",
        Pisces: "mystical connection, surrender, compassion as spiritual essence"
    };
    return spiritual[sign] || "unique spiritual unfoldment";
}

function getChironSpiritual(sign) {
    return `healing the ${sign} wound to become a healer of those same wounds in others`;
}

function getMoonPhaseSpiritual(phase) {
    const phases = {
        'New Moon': "new beginnings energy, planting spiritual seeds, hidden potential",
        'Waxing Crescent': "developing faith, persistent practice, growing toward light",
        'First Quarter': "spiritual challenges that strengthen, decisive commitment",
        'Waxing Gibbous': "refining practice, preparing for illumination",
        'Full Moon': "spiritual illumination, full expression, emotional awareness",
        'Waning Gibbous': "sharing wisdom, teaching, gratitude practice",
        'Last Quarter': "releasing, spiritual transitions, letting go practice",
        'Waning Crescent': "rest, surrender, preparation for new cycle"
    };
    return phases[phase] || "unique spiritual timing";
}

function getLifePathSpiritual(number) {
    const paths = {
        1: "developing spiritual independence and pioneering new paths",
        2: "learning spiritual partnership and divine feminine qualities",
        3: "creative spiritual expression and joyful practice",
        4: "building spiritual foundation and disciplined practice",
        5: "freedom within spiritual practice and adaptable faith",
        6: "love as spiritual path and service to family/community",
        7: "deep spiritual seeking and inner wisdom development",
        8: "mastering material and spiritual worlds simultaneously",
        9: "humanitarian spirituality and universal love",
        11: "intuitive spiritual development and inspirational purpose",
        22: "manifesting spiritual vision in material form",
        33: "healing through love and teaching through example"
    };
    return paths[number] || "unique spiritual journey";
}

function getSpiritualPractices(northNode, moonPhase, lifePath) {
    return `practices aligned with ${northNode} growth direction, honoring their ${moonPhase} birth energy, and supporting their Life Path ${lifePath} journey`;
}

function getSoulGifts(northNode, chiron, lifePath) {
    return `the emerging ${northNode} strengths, the healing powers from integrated ${chiron} wounds, and the natural wisdom of Life Path ${lifePath}`;
}

function getAwakeningPath(northNode, chiron, moonPhase) {
    return `gradual awakening through ${northNode} experiences, accelerated by healing ${chiron} themes, in rhythm with their ${moonPhase} nature`;
}

function getLilithShadow(sign) {
    const shadows = {
        Aries: "suppressed anger, hidden warrior energy, denied independence",
        Taurus: "rejected sensuality, hidden desires, suppressed self-worth",
        Gemini: "silenced voice, hidden truths, suppressed intellect",
        Cancer: "denied emotional needs, suppressed nurturing, hidden vulnerability",
        Leo: "hidden ego needs, suppressed creativity, denied need for recognition",
        Virgo: "suppressed criticism, hidden perfectionism, denied analytical power",
        Libra: "hidden personal desires in relationships, suppressed selfishness",
        Scorpio: "suppressed power, hidden sexuality, denied transformation needs",
        Sagittarius: "suppressed wild freedom, hidden radical truths",
        Capricorn: "hidden ambition, suppressed authority, denied power needs",
        Aquarius: "suppressed rebellion, hidden genius, denied uniqueness",
        Pisces: "suppressed psychic gifts, hidden spiritual power"
    };
    return shadows[sign] || "hidden authentic power";
}

function getSouthNodeShadow(sign) {
    return `over-reliance on ${sign} comfort zones that prevent growth toward opposite qualities`;
}

function getChallengesShadow(number) {
    const challenges = {
        0: "too much freedom without direction, needing to choose a challenge",
        1: "ego struggles, independence vs. connection",
        2: "over-sensitivity, boundary issues, people-pleasing",
        3: "scattered expression, self-doubt about creativity",
        4: "rigidity, workaholism, fear of chaos",
        5: "excess, irresponsibility, fear of commitment",
        6: "perfectionism, controlling through caretaking",
        7: "isolation, over-analysis, trust issues",
        8: "power struggles, material obsession"
    };
    return challenges[number] || "unique challenge pattern";
}

function getChironShadow(sign) {
    return `the ${sign} wound that feels too painful to face but holds the key to healing others`;
}

function getShadowIntegration(lilith, southNode, challenge) {
    return `accepting their ${lilith} Lilith power, moving beyond ${southNode} comfort zones, and facing Challenge ${challenge} themes directly`;
}

function getReclaimedPower(lilith, chiron) {
    return `the full ${lilith} power that was hidden, plus the healing wisdom from integrated ${chiron} wounds`;
}

function getShadowSupport(lilith, challenge) {
    return `creating space for ${lilith} energy expression without shame, and reframing Challenge ${challenge} as growth opportunity`;
}

function getVenusValue(sign) {
    const values = {
        Aries: "independence, courage, direct action",
        Taurus: "security, beauty, sensual pleasure",
        Gemini: "ideas, variety, communication",
        Cancer: "emotional security, family, nurturing",
        Leo: "creativity, recognition, joy",
        Virgo: "usefulness, health, improvement",
        Libra: "harmony, partnership, beauty",
        Scorpio: "depth, intimacy, transformation",
        Sagittarius: "freedom, adventure, meaning",
        Capricorn: "achievement, quality, status",
        Aquarius: "uniqueness, friendship, progress",
        Pisces: "transcendence, compassion, art"
    };
    return values[sign] || "authentic values";
}

function getVenusAttraction(sign) {
    return `${sign} qualities - expressing these attracts resources naturally`;
}

function getJupiterExpansion(sign) {
    const expansions = {
        Aries: "bold initiative and pioneering action",
        Taurus: "steady building and patient accumulation",
        Gemini: "communication and learning opportunities",
        Cancer: "nurturing and real estate/family connections",
        Leo: "creative ventures and heart-led enterprises",
        Virgo: "service industries and health-related work",
        Libra: "partnerships and aesthetic fields",
        Scorpio: "investments, inheritances, and transformation",
        Sagittarius: "education, travel, and publishing",
        Capricorn: "business building and authority positions",
        Aquarius: "innovation and technology",
        Pisces: "creative and healing arts"
    };
    return expansions[sign] || "natural expansion channels";
}

function getSaturnMoneyLesson(sign) {
    const lessons = {
        Aries: "patience in building rather than rushing",
        Taurus: "true vs. false security",
        Gemini: "focused earning rather than scattered efforts",
        Cancer: "emotional security vs. material dependency",
        Leo: "earning recognition rather than expecting it",
        Virgo: "valuing their skills appropriately",
        Libra: "balance in partnership finances",
        Scorpio: "shared resources and power dynamics",
        Sagittarius: "practical reality vs. optimistic spending",
        Capricorn: "healthy relationship with achievement and wealth",
        Aquarius: "unconventional paths to security",
        Pisces: "boundaries in financial generosity"
    };
    return lessons[sign] || "discipline in money matters";
}

function getLifePathMoney(number) {
    const approaches = {
        1: "independent earning, self-employment, leadership compensation",
        2: "partnership income, supportive roles, patient accumulation",
        3: "creative income, multiple streams, expression-based earning",
        4: "steady building, systematic saving, earned security",
        5: "varied income sources, adaptable earning, freedom through money",
        6: "service-based income, family business, beauty and healing arts",
        7: "specialized expertise, research and analysis, teaching income",
        8: "business ownership, investments, authority-based earning",
        9: "humanitarian work, global income, giving and receiving balance",
        11: "inspirational income, teaching and healing, intuitive investments",
        22: "large-scale projects, building empires, legacy wealth",
        33: "healing arts income, teaching through example, service prosperity"
    };
    return approaches[number] || "unique prosperity path";
}

function getMoneyMindset(venus, saturn) {
    return `valuing ${venus} qualities while learning ${saturn} money lessons - an evolving relationship with abundance`;
}

function getMoneySuccess(jupiter, venus, lifePath) {
    return `align with ${jupiter} Jupiter expansion channels while honoring ${venus} Venus values and Life Path ${lifePath} purpose`;
}

function getGenerosityPattern(venus, jupiter) {
    return `${venus} Venus style of valuing combined with ${jupiter} Jupiter generosity - unique giving and receiving patterns`;
}

function getFinancialWisdom(saturn, lifePath) {
    return `mastering ${saturn} Saturn lessons while following Life Path ${lifePath} guidance toward true prosperity`;
}

// ============================================
// PROGRESSIONS - Current Life Phase
// ============================================

const PROGRESSION_READINGS = {
    description: "Progressions show how the birth chart evolves over time - where the soul is NOW in their journey",
    
    progressedSun: {
        title: "Progressed Sun",
        icon: "☉",
        description: "The current evolution of core identity (advances ~1 degree per year)",
        generate: function(birthDate, currentAge) {
            // Progressed Sun moves about 1 degree per year
            // For a newborn, it's still in birth sign for first ~30 years
            const yearsFromBirth = currentAge || 0;
            
            if (yearsFromBirth < 1) {
                return `The Progressed Sun remains in the birth sign, fully expressing the natal Sun qualities. This is the foundation phase - the core identity is establishing itself in its purest form. All solar themes from the birth chart are at full strength.`;
            } else if (yearsFromBirth < 30) {
                return `The Progressed Sun has advanced approximately ${yearsFromBirth} degrees from birth position. It likely remains in the birth sign, but is developing new dimensions of that sign's expression. Watch for subtle shifts in identity expression as the Sun progresses through different degrees.`;
            } else {
                return `The Progressed Sun may have moved into the next sign, adding new dimensions to identity expression. The original birth Sun remains foundational, but new qualities are emerging.`;
            }
        }
    },
    
    progressedMoon: {
        title: "Progressed Moon",
        icon: "☽",
        description: "Current emotional phase and inner development (cycles through all signs every ~28 years)",
        generate: function(birthDate, currentAge) {
            // Progressed Moon moves about 1 degree per month (~12 degrees per year)
            // Completes zodiac in about 27-28 years
            const yearsFromBirth = currentAge || 0;
            const monthsFromBirth = yearsFromBirth * 12;
            const degreesProgressed = monthsFromBirth; // ~1 degree per month
            const signsPassed = Math.floor(degreesProgressed / 30);
            
            if (yearsFromBirth < 1) {
                return `The Progressed Moon remains in or near the birth Moon sign, establishing the foundational emotional patterns. The first year of life sees the Moon progressing through approximately 12-13 degrees, beginning the emotional journey of development.`;
            } else if (yearsFromBirth < 3) {
                return `The Progressed Moon has likely moved into the sign following the birth Moon, introducing new emotional themes. These early years see rapid emotional evolution as the progressed Moon moves through new territory.`;
            } else {
                const currentPhase = signsPassed % 12;
                return `The Progressed Moon has completed approximately ${signsPassed} sign changes, and is now in an evolved emotional phase. Each ~2.5 years brings a new emotional chapter as the Moon progresses through different signs.`;
            }
        }
    }
};

// ============================================
// COSMIC WRAP-UP - The Great Summary
// ============================================

const COSMIC_WRAPUP = {
    title: "The Complete Cosmic Blueprint",
    icon: "✨",
    
    generate: function(readings) {
        const name = readings.input.name;
        const sunSign = readings.astrology.sunSign;
        const moonSign = readings.astrology.moonSign;
        const risingSign = readings.astrology.risingSign;
        const lifePath = readings.numerology.lifePath;
        const northNode = readings.astrology.northNode;
        const chineseZodiac = readings.astrology.chineseZodiac;
        
        return `✨ THE COMPLETE COSMIC BLUEPRINT FOR ${name.toUpperCase()} ✨

From the very moment of first breath, ${name} arrived carrying a unique cosmic signature - a blueprint written in the stars that no one else has ever carried or ever will carry again.

🌟 THE SOUL ESSENCE
At the core, ${name} is a ${sunSign.name || sunSign} Sun - ${getSunSummary(sunSign.name || sunSign)}. This is the light they carry within, the fundamental life force that animates their being. Everything they do throughout life will be colored by this solar essence.

Their Moon in ${moonSign.name || moonSign} reveals the inner emotional landscape - ${getMoonSummary(moonSign.name || moonSign)}. This is how they feel, what they need for emotional security, and how they'll nurture and be nurtured throughout life.

${risingSign.name && risingSign.name !== 'Unknown' ? `With ${risingSign.name} Rising, they enter every room with ${getRisingSummary(risingSign.name || risingSign)}. This is the mask they wear, the first impression they make, and the filter through which they experience life's beginnings.` : ''}

🔮 THE SOUL PURPOSE
Life Path ${lifePath} reveals their numerological destiny: ${getLifePathPurpose(lifePath)}. This number will echo through every major life event, guiding them toward their highest expression.

The North Node in ${northNode.name} points to their soul's growth direction: ${getNorthNodePurpose(northNode.name)}. This is the edge of evolution, where comfort zones end and real growth begins.

Born in the Year of the ${chineseZodiac.name}, they carry the ancient wisdom of ${getChineseSummary(chineseZodiac.name)}. This Eastern influence adds another layer to their complex cosmic makeup.

💫 THE GIFT THEY BRING
${name} arrives at this precise moment in history carrying exactly what the world needs. Their unique combination of energies - ${sunSign.name || sunSign} determination, ${moonSign.name || moonSign} emotional wisdom, and Life Path ${lifePath} purpose - creates a soul unlike any other.

They are not here by accident. The exact moment of birth, the precise alignment of celestial bodies, the specific numerical vibrations of their name and birthdate - all conspired to create this unrepeatable cosmic event.

🌈 THE JOURNEY AHEAD
The path will unfold uniquely for ${name}. There will be moments when the ${sunSign.name || sunSign} Sun blazes with confidence, and moments when it seeks rest. The ${moonSign.name || moonSign} Moon will cycle through emotional seasons. The Life Path ${lifePath} lessons will present themselves again and again until mastered.

Every challenge written in this chart is also an opportunity. Every tension is potential energy waiting to be transformed. Every seeming limitation is actually a focusing force, concentrating power into specific channels.

🙏 THE BLESSING
May ${name} grow into the fullness of this cosmic blueprint. May they learn to work WITH their energies rather than against them. May they discover that the stars don't bind them - they illuminate the path.

This reading captures a single moment in time - the moment of ${name}'s first breath. But the soul is vast, mysterious, and ultimately free. The stars incline; they do not compel. ${name} is the author of their own story, and these cosmic patterns are simply the ink with which they write.

Welcome to the world, precious ${name}. The universe has been waiting for you.

With love and stardust,
Your Complete Cosmic Blueprint 💫`;
    }
};

// Helper functions for wrap-up
function getSunSummary(sign) {
    const summaries = {
        Aries: "a bold pioneer who leads with courage and action",
        Taurus: "a steady builder who creates beauty and lasting value",
        Gemini: "a curious communicator who connects ideas and people",
        Cancer: "a nurturing soul who creates belonging and emotional safety",
        Leo: "a radiant heart who shines through creative self-expression",
        Virgo: "a sacred servant who heals through attention and service",
        Libra: "a graceful harmonizer who creates balance and beauty",
        Scorpio: "a powerful transformer who finds gold in the shadows",
        Sagittarius: "a joyful seeker who expands horizons and inspires faith",
        Capricorn: "a wise master who builds mountains through patient effort",
        Aquarius: "a visionary revolutionary who serves the future",
        Pisces: "a compassionate mystic who bridges the visible and invisible worlds"
    };
    return summaries[sign] || "a unique soul with special gifts";
}

function getMoonSummary(sign) {
    const summaries = {
        Aries: "quick-feeling and courageous, needing action to process emotions",
        Taurus: "steady and security-oriented, needing comfort and consistency",
        Gemini: "quick-minded emotionally, processing feelings through talking and thinking",
        Cancer: "deeply sensitive and nurturing, needing emotional closeness",
        Leo: "warm-hearted and expressive, needing to be seen and appreciated",
        Virgo: "careful and service-oriented, processing emotions through helping",
        Libra: "harmony-seeking, needing beauty and balanced relationships",
        Scorpio: "intensely feeling, needing depth and emotional truth",
        Sagittarius: "freedom-loving emotionally, needing space and adventure",
        Capricorn: "responsible with feelings, needing emotional self-reliance",
        Aquarius: "unique in emotional expression, needing space for individuality",
        Pisces: "boundlessly compassionate, needing spiritual connection"
    };
    return summaries[sign] || "unique emotional needs and gifts";
}

function getRisingSummary(sign) {
    const summaries = {
        Aries: "directness and courage, ready to take initiative",
        Taurus: "groundedness and grace, a calming presence",
        Gemini: "curiosity and adaptability, ready to connect",
        Cancer: "sensitivity and warmth, a nurturing presence",
        Leo: "confidence and radiance, commanding attention",
        Virgo: "thoughtfulness and helpfulness, ready to serve",
        Libra: "charm and grace, creating harmony",
        Scorpio: "intensity and perception, seeing beneath surfaces",
        Sagittarius: "enthusiasm and openness, ready for adventure",
        Capricorn: "maturity and capability, quietly commanding respect",
        Aquarius: "uniqueness and independence, refreshingly different",
        Pisces: "sensitivity and imagination, an otherworldly quality"
    };
    return summaries[sign] || "unique presentation to the world";
}

function getLifePathPurpose(number) {
    const purposes = {
        1: "learning independence, developing leadership, pioneering new paths",
        2: "mastering cooperation, developing sensitivity, creating partnership",
        3: "expressing creativity, spreading joy, communicating truth",
        4: "building foundations, creating systems, developing discipline",
        5: "embracing change, honoring freedom, experiencing life fully",
        6: "nurturing others, creating beauty, serving family and community",
        7: "seeking wisdom, developing intuition, understanding mysteries",
        8: "mastering abundance, developing authority, using power wisely",
        9: "serving humanity, completing cycles, expressing universal love",
        11: "inspiring others, developing intuition, channeling higher wisdom",
        22: "building dreams, manifesting visions, creating lasting legacy",
        33: "healing through love, teaching through example, embodying compassion"
    };
    return purposes[number] || "discovering unique purpose through experience";
}

function getNorthNodePurpose(sign) {
    const purposes = {
        Aries: "developing courage, self-assertion, and independent action",
        Taurus: "building self-worth, creating stability, enjoying simple pleasures",
        Gemini: "staying curious, communicating, learning from everyone",
        Cancer: "developing emotional intelligence, nurturing, creating home",
        Leo: "expressing creatively, following the heart, learning to shine",
        Virgo: "serving practically, developing skills, attending to details",
        Libra: "partnering, cooperating, learning balance and harmony",
        Scorpio: "embracing transformation, developing intimacy, facing shadow",
        Sagittarius: "seeking truth, adventuring, developing faith and meaning",
        Capricorn: "building achievement, accepting responsibility, developing authority",
        Aquarius: "serving humanity, honoring uniqueness, building community",
        Pisces: "developing spirituality, practicing compassion, surrendering to flow"
    };
    return purposes[sign] || "unique soul evolution path";
}

function getChineseSummary(animal) {
    const summaries = {
        Rat: "clever adaptability and resourceful problem-solving",
        Ox: "steady determination and reliable strength",
        Tiger: "bold courage and magnetic leadership",
        Rabbit: "gentle diplomacy and refined sensitivity",
        Dragon: "powerful fortune and natural magnetism",
        Snake: "wise intuition and elegant mystery",
        Horse: "energetic freedom and warm enthusiasm",
        Goat: "creative gentleness and peaceful artistry",
        Monkey: "clever playfulness and quick intelligence",
        Rooster: "confident precision and observant honesty",
        Dog: "loyal protection and faithful friendship",
        Pig: "generous warmth and sincere kindness"
    };
    return summaries[animal] || "unique Eastern wisdom";
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ANGULAR_HOUSE_READINGS,
        ADDITIONAL_ASPECT_READINGS,
        VERTEX_READINGS,
        NODES_IN_HOUSES,
        SYNTHESIS_READINGS,
        PROGRESSION_READINGS,
        COSMIC_WRAPUP
    };
}
