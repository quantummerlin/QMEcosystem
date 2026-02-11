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

var ANGULAR_HOUSE_READINGS = {
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

var ADDITIONAL_ASPECT_READINGS = {
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
// VERTEX BY SIGN - Fated Encounters (Deep Version)
// ============================================

var VERTEX_READINGS = {
    Aries: {
        title: "Fated Courage",
        keywords: ["Destiny Through Action", "Fated Independence", "Karmic Leadership", "Encounter Initiation"],
        reading: `The Vertex in Aries marks the soul as destined to encounter pivotal moments and people who awaken their inner warrior. This is not a gentle unfolding—it's a lightning strike of activation. The universe has encoded into this life a series of fated meetings and events designed to ignite courage, independence, and the willingness to pioneer.

<strong>The Fated Encounters:</strong> People will enter this life who demand action rather than contemplation. These are the catalysts—sometimes aggressive, sometimes simply bold—who refuse to let this soul remain passive. A chance meeting with someone who challenges them to fight for themselves. A crisis that requires immediate, independent response. A relationship that ends specifically to force them into self-reliance. These are not accidents; they are destiny appointments.

<strong>The Activation Pattern:</strong> The Vertex in Aries creates a life punctuated by moments that feel like fate stepping in to light a fire. Just when they might settle into comfortable passivity, destiny sends a wake-up call that requires courage. These activations often feel uncomfortable at first—who wants to be forced into bravery? But they are precisely what the soul has scheduled for its evolution.

<strong>Karmic Signatures:</strong> There may be past-life patterns of over-depending on others, waiting to be rescued, or avoiding conflict at the cost of authenticity. This lifetime's Vertex appointments are designed to break those patterns. The soul is learning that it came equipped with everything it needs to lead its own life.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often an immediate, visceral recognition that something important is happening. The heart races, adrenaline flows, and there's a sense of "this matters" that transcends ordinary experience. These are the moments when fate reveals its hand.

<strong>The Gift:</strong> Through these destined encounters, the soul develops authentic courage—not the absence of fear, but action despite fear. They become someone who can begin things, who doesn't wait for permission, who knows that sometimes the brave thing is also the fated thing.

<strong>The Challenge:</strong> The temptation is to resist these activations, to resent the people and circumstances that demand courage. But resistance only delays what is inevitable. The challenge is learning to recognize destiny's knock and answering with: "I'm ready."`,
        fatedThemes: ["Initiators and catalysts", "Crisis that demands action", "Relationships that activate independence", "Moments requiring courage"]
    },
    Taurus: {
        title: "Fated Security",
        keywords: ["Destiny Through Stability", "Fated Worth", "Karmic Resources", "Encounter Value"],
        reading: `The Vertex in Taurus marks the soul as destined to encounter pivotal moments and people who awaken their relationship with security, self-worth, and the material world. Fate will speak through matters of value—both the value of things and the value of self.

<strong>The Fated Encounters:</strong> People will enter this life who affect finances, possessions, or sense of worth in profound ways. A partner who transforms their financial situation. A mentor who teaches them their true value. A loss that forces them to discover what really matters. These aren't random events—they're destiny's curriculum on the nature of true security.

<strong>The Activation Pattern:</strong> The Vertex in Taurus creates a life where the most transformative moments involve resources, beauty, and self-worth. Just when they think they understand their value (or lack thereof), fate sends someone or something that completely reframes the conversation. These activations teach that security is ultimately internal, not external.

<strong>Karmic Signatures:</strong> There may be past-life patterns around poverty and wealth, worthlessness and excess, taking and giving. This lifetime's Vertex appointments are designed to find the middle path—genuine self-worth that doesn't depend on bank accounts, authentic appreciation of beauty that doesn't become attachment.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a felt sense in the body—a grounding, a settling, or its opposite: profound ungrounding that demands they find new footing. These moments often involve sensory richness—the smell of money, the touch of beauty, the taste of abundance or scarcity.

<strong>The Gift:</strong> Through these destined encounters, the soul develops an unshakeable knowing of their own worth. They learn that true abundance is a state of being, not a state of having. They become someone who can appreciate beauty without grasping, who knows that the only security that lasts is inner security.

<strong>The Challenge:</strong> The temptation is to cling to what fate brings or to collapse when fate takes away. But the Vertex in Taurus teaches that flow, not grip, is the way. The challenge is learning to receive what comes and release what goes, trusting that worth remains constant through all changes.`,
        fatedThemes: ["Financial turning points", "Teachers of self-worth", "Beauty that transforms", "Losses that reveal true value"]
    },
    Gemini: {
        title: "Fated Communication",
        keywords: ["Destiny Through Learning", "Fated Connections", "Karmic Communication", "Encounter Ideas"],
        reading: `The Vertex in Gemini marks the soul as destined to encounter pivotal moments and people who awaken their intellectual gifts and communication abilities. Fate speaks through words, connections, and the exchange of ideas.

<strong>The Fated Encounters:</strong> People will enter this life who bring essential information or who catalyze communication breakthroughs. A teacher who changes their worldview. A sibling relationship that teaches profound lessons. A chance conversation that redirects their entire path. A book that falls open to exactly the right page. These are not coincidences—they are destiny's way of ensuring the right information reaches the right soul at the right time.

<strong>The Activation Pattern:</strong> The Vertex in Gemini creates a life where the most transformative moments involve learning, speaking, writing, or connecting. Just when they might settle into intellectual stagnation, fate sends a messenger. These activations often come through seemingly small moments—a phrase overheard, a question asked, a connection made in passing that proves to be pivotal.

<strong>Karmic Signatures:</strong> There may be past-life patterns around communication—voices silenced, truth unspoken, knowledge hoarded or scattered. This lifetime's Vertex appointments are designed to find authentic expression, to become both student and teacher, to understand that ideas want to be shared.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a mental quickening—thoughts accelerate, connections form, understanding dawns. There may be literal goosebumps as important information lands. The mind lights up in recognition that something significant is being communicated.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the gift of being a conduit for information. They become someone who asks the right questions, who knows when to speak and when to listen, who can translate between worlds of understanding.

<strong>The Challenge:</strong> The temptation is to scatter attention across too many inputs or to dismiss the importance of small moments. But the Vertex in Gemini teaches that the universe speaks constantly—the challenge is learning to listen.`,
        fatedThemes: ["Life-changing conversations", "Teachers who appear at the right moment", "Information that redirects life", "Sibling and peer connections"]
    },
    Cancer: {
        title: "Fated Nurturing",
        keywords: ["Destiny Through Family", "Fated Home", "Karmic Nurturing", "Encounter Belonging"],
        reading: `The Vertex in Cancer marks the soul as destined to encounter pivotal moments and people who awaken their deepest emotional needs and their capacity to nurture. Fate speaks through matters of home, family, and the heart's longing to belong.

<strong>The Fated Encounters:</strong> People will enter this life who become family—not necessarily by blood, but by soul. A chosen family that heals childhood wounds. A home that appears at exactly the right moment. A parent figure who gives what was never received. A child (literal or metaphorical) who teaches the soul about unconditional love. These are destiny's way of ensuring that no one walks through life without the experience of belonging.

<strong>The Activation Pattern:</strong> The Vertex in Cancer creates a life where the most transformative moments involve emotional bonding, creating home, or confronting family patterns. Just when they might armor their heart, fate sends someone or something that requires vulnerability. These activations often feel deeply personal, touching the most tender parts of the psyche.

<strong>Karmic Signatures:</strong> There may be past-life patterns around family—abandonment, enmeshment, the failure to nurture or be nurtured. This lifetime's Vertex appointments are designed to heal these patterns, to learn that home is a feeling that can be created anywhere, with anyone, at any time.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often an immediate feeling of "home"—of recognizing someone or someplace as if from a dream. The heart opens involuntarily. There may be tears that seem to come from a deeper well than the present moment warrants.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the capacity to create belonging wherever they go. They become someone who can mother/father the wounded, who makes strangers feel like family, who knows that the most powerful force in the universe is love.

<strong>The Challenge:</strong> The temptation is to cling to family (biological or chosen) or to flee from the vulnerability that belonging requires. But the Vertex in Cancer teaches that the heart must be kept open. The challenge is learning that love cannot be owned, only experienced.`,
        fatedThemes: ["Chosen family arriving", "Home that transforms life", "Healing of family patterns", "Children and nurturing relationships"]
    },
    Leo: {
        title: "Fated Creativity",
        keywords: ["Destiny Through Expression", "Fated Joy", "Karmic Creativity", "Encounter Heart"],
        reading: `The Vertex in Leo marks the soul as destined to encounter pivotal moments and people who awaken their creative fire and their courage to be seen. Fate speaks through matters of self-expression, joy, romance, and the heart's need to shine.

<strong>The Fated Encounters:</strong> People will enter this life who demand that this soul stop hiding. An artist who inspires creative awakening. A lover who sees and celebrates their unique brilliance. A child who needs their playful presence. An audience that appears when they finally dare to perform. These are not random admirers—they are destiny's way of ensuring this soul claims its spotlight.

<strong>The Activation Pattern:</strong> The Vertex in Leo creates a life where the most transformative moments involve creative expression, romantic love, or stepping into visibility. Just when they might settle for the audience rather than the stage, fate sends a catalyst that says "your turn to shine." These activations often feel dramatic—appropriate for a Leo Vertex—like scenes from a movie where everything changes.

<strong>Karmic Signatures:</strong> There may be past-life patterns around creative suppression, dimming one's light, or alternatively, ego inflation and misuse of attention. This lifetime's Vertex appointments are designed to find authentic expression—shining for the joy of it, not for the applause; creating because one must, not for recognition.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a feeling of heart opening, of warmth spreading through the chest. There may be a sense of recognition—this is what I was born for. The colors seem brighter, the music louder, life more vivid. It feels like falling in love—with a person, a project, or life itself.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the courage to be fully themselves without apology. They become someone who gives permission for others to shine by shining first, who knows that creativity is not optional but essential, who understands that joy is a legitimate life purpose.

<strong>The Challenge:</strong> The temptation is to hide (out of false humility) or to make it all about applause (out of ego). But the Vertex in Leo teaches that authentic expression cares little for audience response. The challenge is learning to create and express because it's who you are—whether anyone watches or not.`,
        fatedThemes: ["Creative awakenings", "Romantic destiny", "Being seen and celebrated", "Children and playfulness"]
    },
    Virgo: {
        title: "Fated Service",
        keywords: ["Destiny Through Healing", "Fated Work", "Karmic Service", "Encounter Improvement"],
        reading: `The Vertex in Virgo marks the soul as destined to encounter pivotal moments and people who awaken their capacity for service, healing, and meaningful work. Fate speaks through matters of health, craft, and the sacred opportunity to be useful.

<strong>The Fated Encounters:</strong> People will enter this life who need exactly what this soul can offer. A patient who teaches them about healing by being healed. A coworker who becomes a life-changing mentor. A crisis in health that redirects their entire life path. A job that doesn't just pay bills but serves purpose. These are not mere employment opportunities—they are destiny's way of ensuring this soul finds meaningful work.

<strong>The Activation Pattern:</strong> The Vertex in Virgo creates a life where the most transformative moments involve service, health, or the development of mastery. Just when they might drift into purposelessness, fate sends someone or something that needs their unique skills. These activations often feel practical and grounded—not dramatic, but deeply significant.

<strong>Karmic Signatures:</strong> There may be past-life patterns around service—martyrdom, servitude, perfectionism that paralyzed, or the failure to develop useful skills. This lifetime's Vertex appointments are designed to find sacred service—helping others without losing self, excellence without perfectionism, work as spiritual practice.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a sense of "rightness"—of being exactly where one should be, doing exactly what needs doing. There may be a felt sense of puzzle pieces clicking into place, of skills meeting needs in satisfying ways.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the gift of being genuinely helpful. They become someone whose presence improves situations, whose attention heals, whose craft serves purposes beyond personal gain.

<strong>The Challenge:</strong> The temptation is to serve until depleted or to use perfectionism as an excuse not to serve at all. But the Vertex in Virgo teaches that sacred service fills rather than drains. The challenge is learning to be helpful without becoming a martyr.`,
        fatedThemes: ["Healing encounters", "Work that serves purpose", "Health crises that redirect life", "Mentors in craft and skill"]
    },
    Libra: {
        title: "Fated Partnership",
        keywords: ["Destiny Through Others", "Fated Relationships", "Karmic Balance", "Encounter Harmony"],
        reading: `The Vertex in Libra marks the soul as destined to encounter pivotal moments and people who awaken their understanding of partnership, balance, and the art of relating. Fate speaks through significant others—romantic, business, or creative partners who change everything.

<strong>The Fated Encounters:</strong> People will enter this life who feel immediately significant—soul recognition from the first meeting. A partner who completes something. An adversary who teaches through opposition. A collaborator who doubles creative output. A mirror who reveals what can't be seen alone. These are not casual acquaintances—they are destiny's way of teaching that some things can only be learned through relationship.

<strong>The Activation Pattern:</strong> The Vertex in Libra creates a life where the most transformative moments involve significant one-on-one relationships. Just when they might settle into isolation or superficial relating, fate sends someone who demands authentic partnership. These activations often feel romantic in quality—even business partnerships may carry a sense of fated connection.

<strong>Karmic Signatures:</strong> There may be past-life patterns around relationship—isolation, enmeshment, using others or being used. This lifetime's Vertex appointments are designed to find genuine partnership—two whole people choosing to create something together, neither losing themselves nor remaining separate.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often immediate recognition—"I know you" even when just meeting. Time may seem to stop or accelerate. There's a gravitational pull toward the other person that transcends ordinary attraction.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the art of true partnership. They become someone who can be fully themselves while fully with another, who knows that relationship is a spiritual path, who can balance giving and receiving.

<strong>The Challenge:</strong> The temptation is to lose self in partnership or to avoid intimacy by remaining superficial. But the Vertex in Libra teaches that the real relationship is where two wholes meet, not two halves. The challenge is learning to relate without losing.`,
        fatedThemes: ["Soul-recognition partnerships", "Business partnerships that transform", "Enemies who teach", "Marriage and committed union"]
    },
    Scorpio: {
        title: "Fated Transformation",
        keywords: ["Destiny Through Crisis", "Fated Depth", "Karmic Transformation", "Encounter Power"],
        reading: `The Vertex in Scorpio marks the soul as destined to encounter pivotal moments and people who awaken their power through transformation. Fate speaks through intensity, crisis, and the requirement to die and be reborn—metaphorically, and sometimes quite literally in life circumstances.

<strong>The Fated Encounters:</strong> People will enter this life who cannot be kept at surface level. A lover who demands full merger. A therapist who excavates the shadow. A business partner who requires total trust. A crisis that burns away everything false. These are not comfortable connections—they are destiny's way of ensuring this soul doesn't sleepwalk through life.

<strong>The Activation Pattern:</strong> The Vertex in Scorpio creates a life where the most transformative moments involve facing darkness—their own or others'. Just when they might avoid the depths, fate sends a catalyst that demands descent. These activations often feel like initiations—ordeals that mark the before and after of a soul.

<strong>Karmic Signatures:</strong> There may be past-life patterns around power—its abuse, its absence, trauma unhealed, deaths unmourned. This lifetime's Vertex appointments are designed to reclaim authentic power—not over others, but over one's own depths. To transform rather than repeat.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often an intensity of feeling that cannot be denied. This may manifest as obsession, fear, fascination, or all three simultaneously. The body may respond with visceral knowing—desire, repulsion, or the strange combination that signals shadow work.

<strong>The Gift:</strong> Through these destined encounters, the soul develops phoenix energy—the ability to rise from any ashes, to transform any crisis into growth, to face any darkness and return with gifts.

<strong>The Challenge:</strong> The temptation is to avoid the intensity (and miss the transformation) or to become addicted to crisis and power dynamics. But the Vertex in Scorpio teaches that the only way out is through. The challenge is learning to face the shadow voluntarily rather than waiting for fate to force the confrontation.`,
        fatedThemes: ["Transformative crisis", "Intense relationships", "Near-death experiences (literal or metaphorical)", "Power and intimacy lessons"]
    },
    Sagittarius: {
        title: "Fated Adventure",
        keywords: ["Destiny Through Expansion", "Fated Learning", "Karmic Journey", "Encounter Meaning"],
        reading: `The Vertex in Sagittarius marks the soul as destined to encounter pivotal moments and people who awaken their hunger for meaning, expansion, and adventure. Fate speaks through journeys—physical, intellectual, and spiritual.

<strong>The Fated Encounters:</strong> People will enter this life who expand horizons—teachers, travelers, philosophers, foreigners, anyone who represents the unknown. A mentor who opens doors to worlds unimagined. A travel companion on a journey that changes everything. A book or teaching that provides the meaning they've been seeking. These are not random connections—they are destiny's way of ensuring this soul never settles for a too-small life.

<strong>The Activation Pattern:</strong> The Vertex in Sagittarius creates a life where the most transformative moments involve expansion—geographic, philosophical, or spiritual. Just when they might settle into comfortable certainty, fate sends an adventure that expands everything they thought they knew. These activations often feel exhilarating—the call to adventure that makes the heart race.

<strong>Karmic Signatures:</strong> There may be past-life patterns around philosophy and religion—rigid beliefs, lost faith, wisdom hoarded or squandered. This lifetime's Vertex appointments are designed to find personal truth—not borrowed beliefs but earned wisdom, the faith that comes from experience.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a sense of expansion—of perspective widening, of possibilities multiplying. There may be a feeling of "of course!"—as if remembering something always known but forgotten. The soul recognizes truth by how it frees rather than binds.

<strong>The Gift:</strong> Through these destined encounters, the soul develops genuine wisdom. They become someone who inspires others toward growth, who holds beliefs lightly while living them deeply, who knows that the journey is the destination.

<strong>The Challenge:</strong> The temptation is to become a perpetual seeker who never finds (or never applies what's found) or to become a dogmatic teacher who stops learning. But the Vertex in Sagittarius teaches that wisdom requires both seeking and finding. The challenge is learning when to quest and when to rest in what has been found.`,
        fatedThemes: ["Life-changing journeys", "Teachers who transform worldview", "Cultural encounters", "Spiritual awakening"]
    },
    Capricorn: {
        title: "Fated Achievement",
        keywords: ["Destiny Through Responsibility", "Fated Authority", "Karmic Achievement", "Encounter Mastery"],
        reading: `The Vertex in Capricorn marks the soul as destined to encounter pivotal moments and people who awaken their capacity for achievement, responsibility, and mastery. Fate speaks through matters of career, reputation, and the long game of building something that lasts.

<strong>The Fated Encounters:</strong> People will enter this life who embody authority—mentors who show the path to mastery, bosses who promote or challenge, father figures who teach (by presence or absence) about responsibility. A career opportunity that appears at exactly the right moment. A failure that teaches more than any success could. These are not mere professional developments—they are destiny's way of ensuring this soul climbs its mountain.

<strong>The Activation Pattern:</strong> The Vertex in Capricorn creates a life where the most transformative moments involve achievement, responsibility, and public standing. Just when they might avoid the hard work of mastery, fate sends a calling that demands they step up. These activations often feel heavy with significance—not the lightness of play but the weight of purpose.

<strong>Karmic Signatures:</strong> There may be past-life patterns around authority—its abuse, its avoidance, ambition unfulfilled or corrupted. This lifetime's Vertex appointments are designed to find healthy relationship with power—achievement that serves more than ego, authority that respects rather than oppresses.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a sense of gravity—of something important happening that will have long-term consequences. There may be a feeling of stepping into shoes that have been waiting, of accepting a mantle that was always theirs.

<strong>The Gift:</strong> Through these destined encounters, the soul develops earned authority. They become someone whose achievements are built on genuine mastery, whose leadership emerges from service, whose legacy will outlast their years.

<strong>The Challenge:</strong> The temptation is to pursue achievement for ego's sake or to avoid responsibility out of fear of failure. But the Vertex in Capricorn teaches that true success is measured by contribution, not accolade. The challenge is learning to climb the right mountain—the one that matters to the soul, not just to the world.`,
        fatedThemes: ["Career turning points", "Mentors and authority figures", "Public recognition", "Father lessons"]
    },
    Aquarius: {
        title: "Fated Innovation",
        keywords: ["Destiny Through Uniqueness", "Fated Community", "Karmic Freedom", "Encounter Progress"],
        reading: `The Vertex in Aquarius marks the soul as destined to encounter pivotal moments and people who awaken their capacity for innovation, community, and authentic originality. Fate speaks through groups, causes, and the call to be uniquely themselves for the benefit of all.

<strong>The Fated Encounters:</strong> People will enter this life who are ahead of their time—visionaries, rebels, reformers, anyone who represents the future. A friend group that becomes chosen family. A cause that gives life purpose beyond personal concerns. A technology or idea that transforms perspective. These are not random associations—they are destiny's way of ensuring this soul contributes to the evolution of the collective.

<strong>The Activation Pattern:</strong> The Vertex in Aquarius creates a life where the most transformative moments involve community, innovation, or the embrace of authentic uniqueness. Just when they might conform to expectations, fate sends a catalyst that demands originality. These activations often feel electric—the shock of the new, the excitement of evolution.

<strong>Karmic Signatures:</strong> There may be past-life patterns around individuality and community—the outsider, the revolutionary, the one who couldn't fit in, or conversely, the one who lost self in group identity. This lifetime's Vertex appointments are designed to find the balance—being uniquely themselves while contributing to something larger.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a sense of the future arriving. There may be a feeling of meeting one's tribe, of encountering ideas that resonate with something deep and progressive. The soul recognizes destiny by how it frees and connects simultaneously.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the gift of being a bridge between present and future. They become someone who can bring innovation without alienating, who belongs to groups without losing individuality, who serves the collective while remaining authentically themselves.

<strong>The Challenge:</strong> The temptation is to be so unique that they can't connect (rebellion as identity) or to surrender individuality to group belonging. But the Vertex in Aquarius teaches that the collective needs authentic individuals. The challenge is learning to be both unique and united.`,
        fatedThemes: ["Revolutionary friendships", "Causes that claim the heart", "Technological breakthroughs", "Finding one's tribe"]
    },
    Pisces: {
        title: "Fated Transcendence",
        keywords: ["Destiny Through Spirit", "Fated Compassion", "Karmic Healing", "Encounter Unity"],
        reading: `The Vertex in Pisces marks the soul as destined to encounter pivotal moments and people who awaken their connection to the spiritual, the artistic, and the transcendent. Fate speaks through dreams, intuitions, and experiences that dissolve the boundaries between self and everything else.

<strong>The Fated Encounters:</strong> People will enter this life who carry spiritual significance—healers, artists, mystics, or simply those whose suffering calls forth compassion. A spiritual teacher who appears at the perfect moment. An artistic experience that opens channels of awareness. A loss that breaks the heart open to universal love. These are not ordinary meetings—they are destiny's way of ensuring this soul remembers what lies beyond the material.

<strong>The Activation Pattern:</strong> The Vertex in Pisces creates a life where the most transformative moments involve surrender, spirituality, or the dissolution of boundaries. Just when they might become too solid in material identity, fate sends an experience that reminds them of the ineffable. These activations often feel dreamlike—boundaries blur, synchronicities multiply, the veil thins.

<strong>Karmic Signatures:</strong> There may be past-life patterns around transcendence—spiritual gifts misused, martyrdom, escapism, boundary dissolution that went too far. This lifetime's Vertex appointments are designed to find healthy transcendence—spiritual connection that enriches rather than escapes, compassion with boundaries, service with self-care.

<strong>Recognition of Destiny:</strong> When the Vertex is triggered, there's often a feeling of coming home to something larger than self. There may be tears that seem to come from an ocean of feeling, a sense of unity with all beings, or artistic inspiration that feels channeled from beyond.

<strong>The Gift:</strong> Through these destined encounters, the soul develops the gift of being a bridge between worlds. They become someone who can translate spiritual experience into earthly help, whose art or healing carries something of the infinite, whose compassion is practical as well as profound.

<strong>The Challenge:</strong> The temptation is to escape into transcendence (spiritual bypassing) or to wall off from spiritual experience entirely. But the Vertex in Pisces teaches that heaven and earth need each other. The challenge is learning to be in this world while connected to what transcends it.`,
        fatedThemes: ["Spiritual awakening", "Artistic transcendence", "Healing and being healed", "Compassion calling"]
    }
};

// ============================================
// NODES IN HOUSES
// ============================================

var NODES_IN_HOUSES = {
    north: {
        1: {
            title: "North Node in 1st House - The Identity Awakening",
            keywords: ["Self-Discovery", "Independence", "Personal Initiative", "Authentic Identity"],
            reading: `The North Node in the 1st House marks one of the most personal soul journeys possible: learning to exist as a distinct individual, to act from personal desire rather than obligation, and to discover that "selfish" isn't always a dirty word. This soul has spent lifetimes (South Node in 7th House) defined by relationships — merging, accommodating, compromising until the original self became almost invisible.

<strong>The Past Life Pattern:</strong> The South Node in the 7th House reveals a soul intimately familiar with partnership. There have been lifetimes as the devoted spouse, the diplomatic mediator, the one who kept the peace at any cost. Relationship skills are second nature — reading others, anticipating needs, smoothing conflict before it begins. The problem is that all this outward attention came at the expense of knowing who they actually are when nobody else is in the room.

There's often a subtle but persistent pattern of asking "what do you think?" before forming their own opinion, of scanning others' faces for approval before committing to a choice. Not because they lack intelligence or ability, but because the soul's default setting is oriented outward. The mirror has been held up to others for so long that turning it around feels almost transgressive.

<strong>The Growth Edge:</strong> This lifetime demands the courage to be someone specific. Not vaguely agreeable. Not whoever the situation requires. But a distinct individual with preferences, opinions, boundaries, and goals that exist independently of any relationship. The universe will create circumstances that force self-reliance — periods of aloneness, partnerships that fail when the self disappears into them, moments where no one else can make the decision.

The 1st House is the house of "I am." The soul is learning to complete that sentence honestly: I am angry. I am ambitious. I am leaving. I am enough on my own. Each declaration of self, each moment of choosing personal truth over relational harmony, is the curriculum being completed.

<strong>The Body Connection:</strong> The 1st House rules physical appearance and vitality. This soul is learning to inhabit their body fully — to dress for themselves rather than for others' approval, to pursue physical goals for personal satisfaction, to take up space unapologetically. Exercise, physical challenges, and anything that builds a visceral sense of "this is MY body, MY life" supports the nodal journey.

<strong>The Relationship Paradox:</strong> Ironically, this soul becomes a better partner by learning to be a better individual first. The South Node gifts of diplomacy and empathy don't disappear — they become more authentic when offered from a place of fullness rather than emptiness. The healthiest relationships for this placement are ones where both people maintain distinct identities.

<strong>The Integration:</strong> Growth isn't about abandoning relationships or becoming selfishly isolated. It's about learning to bring a whole person to the table. The past-life gifts of cooperation and empathy become truly powerful when backed by a solid sense of self. The goal is to be someone worth partnering with, not just someone who's good at partnering.`,
            growth: ["Developing authentic self-expression", "Making decisions without consensus", "Physical self-confidence"],
            resistance: ["Fear of being seen as selfish", "Discomfort with conflict", "Losing identity in relationships"]
        },
        2: {
            title: "North Node in 2nd House - The Worth Excavation",
            keywords: ["Self-Worth", "Personal Resources", "Material Security", "Values Development"],
            reading: `The North Node in the 2nd House calls this soul toward a profound reckoning with worth — not theoretical worth, not spiritual worth, but the grounded, tangible kind. What do you value? What are you worth? Can you build something that's yours? These are the questions this lifetime is organized around. The South Node in the 8th House means this soul arrives already fluent in crisis, transformation, and living off shared resources. Now it's time to build something of their own.

<strong>The Past Life Pattern:</strong> The South Node in the 8th House carries memories of intensity — lives shaped by inheritance, shared finances, power dynamics, and psychological depth. This soul knows how to merge with others, how to navigate crisis, how to transform through destruction and rebirth. There may have been lifetimes as healers, therapists, occultists, or those who managed others' resources. The comfort zone is depth, intensity, and complexity.

The shadow of this pattern is a subtle avoidance of simplicity. If life isn't dramatic enough, something must be wrong. There can be an unconscious reliance on others' resources — financially or emotionally — a sense that everything meaningful must be shared, merged, or co-created. Building something purely personal can feel lonely or pointless.

<strong>The Growth Edge:</strong> This lifetime demands learning to stand on your own two feet materially and psychologically. The universe will create situations requiring financial independence, self-reliance, and the development of personal skills that generate personal income. The question shifts from "what's ours?" to "what's mine?" — not from greed, but from the soul's need to discover its own capacity.

Self-worth is the deeper lesson. Not the 8th House worth that comes from being needed in crisis or valued for psychological insight, but the simple, steady worth of a person who knows what they bring to the table and doesn't need external validation to believe it.

<strong>The Simplicity Practice:</strong> The 2nd House rules simple pleasures — good food, physical comfort, nature, beauty you can touch. This soul grows through learning to find satisfaction in the uncomplicated. A well-cooked meal. Money in the bank. A garden that grows because you tended it. These seemingly mundane things are the spiritual curriculum.

<strong>The Values Anchor:</strong> Perhaps the deepest work involves clarifying personal values that aren't borrowed from partners, inherited from family, or absorbed from culture. What do YOU actually care about? What would you spend money on if nobody were watching? What would you fight for even if you were the only one fighting? These questions, honestly answered, become the foundation of a life that feels genuinely yours.

<strong>The Integration:</strong> The 8th House gifts of depth and psychological insight don't disappear — they become grounded. This soul can understand the depths while standing on solid ground. The combination of 8th House perception and 2nd House stability creates someone who sees clearly without being pulled under. Transformative wisdom served with practical application.`,
            growth: ["Building personal financial security", "Discovering authentic values", "Finding beauty in simplicity"],
            resistance: ["Defaulting to crisis mode", "Depending on others' resources", "Avoiding the 'boring' work of building"]
        },
        3: {
            title: "North Node in 3rd House - The Curious Messenger",
            keywords: ["Learning", "Communication", "Curiosity", "Daily Connection"],
            reading: `The North Node in the 3rd House calls this soul to trade certainty for curiosity, preaching for listening, and grand truths for small conversations that actually change things. The South Node in the 9th House means this soul arrives already loaded with philosophical frameworks, spiritual convictions, and big-picture understanding. The problem is that all that wisdom means nothing if you can't communicate it in a way ordinary people can use.

<strong>The Past Life Pattern:</strong> The South Node in the 9th House speaks of lifetimes as the teacher, the preacher, the philosopher, the one who had the answers. There's an almost automatic tendency to frame everything in terms of meaning, purpose, and universal truth. This soul doesn't just experience things — they interpret them, usually from a height that makes the details hard to see.

The shadow shows up as intellectual arrogance disguised as open-mindedness. "I'm open to all perspectives" really means "I've already decided mine is the most evolved." There can be a subtle condescension toward small talk, local concerns, or practical knowledge — as though the only conversations worth having are about God, the universe, and the meaning of existence.

<strong>The Growth Edge:</strong> This lifetime demands the humility to learn from everyone — the neighbor, the child, the person at the bus stop whose life experience holds wisdom no university teaches. The 3rd House rules communication, siblings, neighbors, short journeys, and the exchange of information. Growth comes through asking questions rather than providing answers, through listening with genuine curiosity rather than waiting for a pause to insert wisdom.

Writing, speaking, teaching at a practical level, journalism, podcasting, blogging — any form of communication that requires clarity and accessibility serves the North Node. The test is: can you explain your deepest insight to a twelve-year-old? If not, you haven't learned it well enough yet.

<strong>The Sibling/Neighbor Connection:</strong> Siblings, cousins, and local community often play significant roles in this soul's growth. These relationships teach the 3rd House lessons of everyday connection, of showing up for the unglamorous but essential bonds that hold life together.

<strong>The Curiosity Practice:</strong> Growth accelerates when this soul stays genuinely curious — reading widely, exploring their immediate environment, trying new routes to familiar places, asking "how does that work?" about ordinary things. The 9th House instinct to fly always seeks distant horizons. The 3rd House corrective says: there are discoveries to be made in your own neighborhood if you bother to look.

<strong>The Integration:</strong> The 9th House gifts of meaning-making and philosophical depth become powerful when expressed through 3rd House clarity. This soul can become a translator — taking complex truths and making them accessible, bridging the gap between wisdom and daily life. The sage who also writes well. The philosopher who also listens.`,
            growth: ["Asking questions instead of giving answers", "Writing and communicating clearly", "Finding wisdom in ordinary conversations"],
            resistance: ["Intellectual superiority", "Dismissing 'small' knowledge", "Preaching instead of listening"]
        },
        4: {
            title: "North Node in 4th House - The Homecoming",
            keywords: ["Emotional Security", "Home Building", "Family", "Inner Foundation"],
            reading: `The North Node in the 4th House calls this soul home — not to a building, but to themselves. After lifetimes of climbing, achieving, and building public reputations (South Node in 10th House), this incarnation asks a deceptively simple question: can you feel at peace when no one is watching? Can you be someone who isn't defined by what they've accomplished?

<strong>The Past Life Pattern:</strong> The South Node in the 10th House reveals a soul deeply familiar with ambition, public roles, and the weight of authority. There have been lifetimes of leadership, career building, and the relentless pursuit of respect and recognition. Achievement is second nature. These souls often display unusual maturity from a young age — the child who seems like a small adult, who understands responsibility before they understand play.

The shadow is a life organized around external markers of success at the expense of emotional depth. There can be a persistent feeling that rest must be earned, that downtime is wasted time, that if you aren't productive, you aren't valuable. Vulnerability feels like weakness. Needing others feels like failure.

<strong>The Growth Edge:</strong> This lifetime demands the development of emotional intelligence, the creation of genuine home (internal and external), and the courage to be vulnerable. The universe will create circumstances that redirect attention from career to family, from public to private, from doing to feeling. This might come through career disruptions, family responsibilities that can't be delegated, or simply an increasing sense that all the achievements ring hollow without someone to come home to.

The 4th House rules home, family, roots, and the inner emotional foundation. Growth comes through nesting — literally creating a space that feels like sanctuary, and figuratively building an inner life rich enough to sustain you when the external world stops applauding.

<strong>The Emotional Curriculum:</strong> Feelings are the coursework here. This soul is learning to sit with sadness without strategizing about it, to express need without viewing it as leverage, to cry without calling it a breakdown. Emotional fluency — the ability to identify, express, and process feelings in real time — is the skill being developed.

<strong>The Family Work:</strong> Family relationships, particularly with parents and children, often provide the most intense growth opportunities. There may be healing needed around the relationship with the mother or the concept of nurturing itself. Creating family — whether biological or chosen — is part of the soul's assignment.

<strong>The Inner Home:</strong> Perhaps the deepest lesson involves building an internal sense of security that doesn't depend on external achievement. A quiet confidence that exists even on unemployed Tuesdays. A sense of being enough that doesn't require a business card to prove it. This internal home is the real foundation this soul is learning to build.

<strong>The Integration:</strong> The 10th House gifts of discipline, leadership, and achievement don't disappear — they become sustainable. A person with deep emotional foundations can achieve without burning out, lead without losing themselves, and build a public life that's rooted in private truth. The career that grows from genuine calling rather than ego need. The leader who cries and is stronger for it.`,
            growth: ["Creating genuine sanctuary", "Developing emotional fluency", "Prioritising inner peace over outer achievement"],
            resistance: ["Workaholism as identity", "Vulnerability avoidance", "Measuring worth by productivity"]
        },
        5: {
            title: "North Node in 5th House - The Joyful Creator",
            keywords: ["Self-Expression", "Creativity", "Joy", "Heart-Centered Living"],
            reading: `The North Node in the 5th House calls this soul toward something it may have forgotten is allowed: personal joy. After lifetimes of collective focus, humanitarian service, and sublimating individual desires for the group good (South Node in 11th House), this incarnation hands back the permission slip to shine as an individual, to create for the pleasure of creating, and to follow the heart even when the head has a more rational plan.

<strong>The Past Life Pattern:</strong> The South Node in the 11th House reveals a soul deeply embedded in collective consciousness. There have been lifetimes of group work, social causes, and future-oriented thinking. The ability to see the big picture and work toward collective goals is instinctive. But somewhere along the way, the individual got lost in the collective. Personal desires were dismissed as selfish. Creative impulses were redirected toward "useful" outcomes. Joy was allowed only when it served the group.

The shadow shows up as difficulty knowing what YOU want — separate from what the group needs, what friends expect, or what would be best for humanity. There can be an almost allergic reaction to personal attention or creative risk-taking, a persistent sense that standing out is somehow betraying the team.

<strong>The Growth Edge:</strong> This lifetime demands creative courage. The universe will create opportunities — and sometimes force through circumstances — for personal expression, romantic passion, and joyful play. The soul is learning that individual creativity isn't selfish; it's necessary. The world needs your specific light, not just your contribution to the collective.

The 5th House rules creativity, romance, children, play, and self-expression. Growth comes through making things (art, music, stories, love, babies, anything that didn't exist before you showed up), through romantic connection that isn't primarily intellectual, and through the radical act of having fun for its own sake.

<strong>The Heart Over Head:</strong> This soul tends to approach even personal matters with 11th House detachment — analyzing attraction instead of feeling it, planning creative projects instead of playing with them, thinking about joy instead of experiencing it. The growth comes from dropping into the heart and staying there, even when the head protests that this isn't productive or useful.

<strong>The Creative Risk:</strong> Creating something personal and putting it out there — a painting, a performance, a love letter, a dance — is terrifying for this soul because it can't hide behind the collective. It's just you. And that exposure is exactly the medicine. Each creative risk that's taken, each moment of genuine self-expression, completes another step of the soul's curriculum.

<strong>The Integration:</strong> The 11th House gifts of vision, community connection, and progressive thinking become magnificent when fueled by genuine creative passion. This soul can inspire groups not through strategy alone, but through the infectious energy of someone who's genuinely alive. The humanitarian who also paints. The activist whose joy is their most powerful tool for change.`,
            growth: ["Creating without needing it to be 'useful'", "Following the heart over the head", "Accepting personal spotlight"],
            resistance: ["Hiding in group identity", "Intellectualising emotion", "Dismissing joy as frivolous"]
        },
        6: {
            title: "North Node in 6th House - The Sacred Service Journey",
            keywords: ["Practical Service", "Daily Routine", "Health", "Skilled Improvement", "Grounded Spirituality"],
            reading: `The North Node in the 6th House marks one of the most profound spiritual journeys: learning that the divine lives in the ordinary, that enlightenment is found not in transcendence but in showing up fully for the tasks at hand. This soul has spent lifetimes (South Node in 12th House) exploring the ethereal realms—developing intuition, surrendering to the universe, perhaps even martyring themselves for higher causes. Now they are called to bring all that spiritual wisdom down to earth.

<strong>The Past Life Pattern:</strong> The South Node in the 12th House indicates a soul deeply familiar with transcendence—meditation, mysticism, isolation, institutions, perhaps monasteries or hospitals. There may have been lifetimes of sacrifice, of dissolving ego, of merging with the cosmic. While beautiful, this pattern can create difficulty engaging with practical reality. The escape hatch is always available: "I'm too sensitive for this world," or "The spiritual is more important than the mundane."

<strong>The Growth Edge:</strong> This lifetime demands that all that spiritual development be applied in practical service. The universe is asking: "Can you be as present while filing paperwork as you were in meditation? Can you find the sacred in the routine, the divine in the details?" The 6th House North Node is learning that attending to the body, developing useful skills, and serving others in concrete ways IS the spiritual practice.

<strong>The Work Path:</strong> Work takes on special significance for this soul. They're not here to have any job—they're here to find work that allows them to be genuinely useful. The most fulfilling career paths involve helping, healing, improving, or fixing. They may be drawn to health fields, service professions, or any work where skill meets need. The key is showing up consistently—not just when inspiration strikes.

<strong>Health & Body:</strong> The 6th House rules health, and this soul is learning to inhabit their body fully. Where the 12th House South Node may have neglected physical reality, the 6th House North Node asks for attention to diet, exercise, sleep, and wellness routines. Health practices become spiritual practices. Taking care of the body becomes a form of prayer.

<strong>The Daily Practice:</strong> Routine, often resisted by the 12th House South Node, becomes the teacher. This soul grows not through dramatic spiritual experiences but through showing up every day, doing the small things well, being reliable. Making the bed, answering emails, keeping appointments—these ordinary acts become the curriculum.

<strong>The Service Orientation:</strong> The highest expression of this placement involves service without martyrdom. Unlike the 12th House pattern of sacrificing self completely, the 6th House North Node learns to serve while maintaining healthy boundaries. They become the helper who doesn't burn out, the healer who also heals themselves, the worker who knows when to rest.

<strong>The Integration:</strong> The beauty of this nodal axis is that the 12th House gifts are not abandoned but grounded. Intuition guides practical decisions. Spiritual wisdom informs daily choices. Compassion motivates service. The goal is not to leave behind the transcendent but to bring it into every ordinary moment.`
        },
        7: {
            title: "North Node in 7th House - The Partnership Awakening",
            keywords: ["Relationship", "Cooperation", "Others' Perspectives", "True Partnership"],
            reading: `The North Node in the 7th House calls this soul toward the thing it finds most terrifying: genuine dependence on another person. After lifetimes of fierce independence and self-reliance (South Node in 1st House), this incarnation asks whether you can let someone else matter as much as you do. Whether you can compromise without feeling like you're disappearing. Whether partnership might actually make you more, not less.

<strong>The Past Life Pattern:</strong> The South Node in the 1st House reveals a soul who has been fiercely, sometimes brutally, independent across many lifetimes. Self-reliance isn't just comfortable — it's identity. There have been lifetimes as the lone warrior, the solo pioneer, the one who did everything themselves because trusting others felt like a risk they couldn't afford. Initiative, courage, and personal strength are hard-wired.

The shadow is a life where "I don't need anyone" isn't strength but armor. Where independence becomes isolation dressed up as self-sufficiency. Where every compromise feels like capitulation and every request for help feels like failure. The soul is so practiced at being one that it struggles to become two.

<strong>The Growth Edge:</strong> This lifetime demands the radical vulnerability of genuine partnership. The universe will create circumstances that simply cannot be navigated alone — relationships that demand compromise, collaborations where the other person's contribution is essential, situations where the only way forward is together. Solitary approaches that worked for lifetimes will systematically fail until the lesson lands.

The 7th House rules committed partnership, marriage, business partnerships, and the art of seeing yourself through another's eyes. Growth comes through staying when every instinct says leave, through compromising when every fiber says hold your ground, through discovering that "we" contains a version of "I" you never could have found alone.

<strong>The Mirror Work:</strong> The 7th House is the house of the mirror — other people reflect back the parts of yourself you can't see. This soul grows through genuinely listening to feedback, through considering that the partner's perspective might be just as valid (or more so), and through the humbling recognition that self-knowledge has limits when you're only consulting yourself.

<strong>The Commitment Curriculum:</strong> Commitment isn't just a relationship status for this soul — it's the spiritual practice. Each day of staying, each argument worked through instead of walked away from, each moment of putting the relationship's needs alongside personal ones, is the soul completing its assignment. It's not about finding the perfect partner. It's about becoming someone who can truly partner.

<strong>The Equality Lesson:</strong> Perhaps the deepest growth involves learning that interdependence isn't weakness. That asking for help isn't failure. That the strongest thing a fiercely independent soul can do is say "I need you" and mean it. Equality in relationship — genuine give and take — requires the most courage from someone who's always been the one to give or go.

<strong>The Integration:</strong> The 1st House gifts of independence, initiative, and personal strength don't disappear — they become the foundation for extraordinary partnership. A person who knows who they are can partner without losing themselves. The self-reliance of many lifetimes becomes the stability that makes genuine intimacy safe. The warrior learns that the bravest battle is the one fought for love.`,
            growth: ["Genuine compromise without resentment", "Seeing yourself through others' eyes", "Interdependence as strength"],
            resistance: ["Reflexive self-reliance", "Leaving before things get hard", "Viewing compromise as weakness"]
        },
        8: {
            title: "North Node in 8th House - The Deep Dive",
            keywords: ["Deep Intimacy", "Shared Resources", "Transformation", "Psychological Depth"],
            reading: `The North Node in the 8th House calls this soul into the depths — of intimacy, of psychology, of shared resources, of everything that can't be controlled by holding on tighter. After lifetimes of building personal security and maintaining comfortable independence (South Node in 2nd House), this incarnation demands the terrifying surrender of letting someone else in. Really in. Past the carefully maintained walls.

<strong>The Past Life Pattern:</strong> The South Node in the 2nd House reveals a soul deeply invested in personal security, self-sufficiency, and the comfort of knowing exactly what's theirs. There have been lifetimes of building, accumulating, and protecting resources — material and emotional. Stability isn't just preferred; it's sacred. These souls often arrive with a natural talent for money, an instinctive understanding of value, and an almost physical need for things to stay as they are.

The shadow is a life where comfort becomes a prison. Where the fear of losing what you've built prevents you from experiencing anything deeper. Where "what's mine is mine" extends to emotions, keeping the inner life as carefully guarded as the bank account. There can be a stubborn resistance to change that goes beyond preference into outright rigidity.

<strong>The Growth Edge:</strong> This lifetime demands transformation through surrender. The universe will create circumstances that force merging — intimate relationships where surface-level connection won't cut it, financial situations requiring shared resources, losses that strip away the security blanket. The soul must learn that some things only become available when you let go of what you're holding.

The 8th House rules shared resources, intimacy, psychology, death and rebirth, inheritance, and the taboo. Growth comes through allowing yourself to be truly known by another person, through sharing resources without keeping score, through facing the parts of yourself you'd rather keep buried.

<strong>The Intimacy Practice:</strong> Real intimacy — not the comfortable companionship the 2nd House South Node prefers, but the raw, exposed, nothing-hidden kind — is the growth edge. This means being seen in your weakness, sharing your fears, letting someone else hold something precious to you without any guarantee they won't break it. Every act of emotional nakedness moves this soul forward.

<strong>The Transformation Through Crisis:</strong> The 8th House is where things die and are reborn. This soul's growth often comes through experiences of profound change — losing something cherished, facing mortality, navigating crisis. These aren't punishments. They're the curriculum. Each time something falls apart and this soul discovers they can survive it, the 2nd House grip loosens and 8th House trust deepens.

<strong>The Power and Psychology:</strong> There's often a fascination with — and fear of — power dynamics in relationships. Learning to navigate shared power, to merge without being consumed, to be vulnerable without being victimised, is the sophisticated emotional work of this placement.

<strong>The Integration:</strong> The 2nd House gifts of self-reliance, stability, and practical wisdom don't disappear — they become the ground from which deep connection grows. A person who knows their own worth can share intimately without losing themselves. The financial wisdom of many lifetimes becomes the foundation for generous merging. The steady hand that built personal security now builds shared wealth — material and spiritual.`,
            growth: ["Allowing emotional vulnerability", "Sharing resources without scorekeeping", "Embracing transformation through crisis"],
            resistance: ["Clinging to personal security", "Keeping emotional distance", "Resisting change at all costs"]
        },
        9: {
            title: "North Node in 9th House - The Truth Seeker",
            keywords: ["Higher Learning", "Travel", "Philosophy", "Faith Development"],
            reading: `The North Node in the 9th House calls this soul out of the familiar and into the vast — away from the neighbourhood and toward the horizon, away from facts and toward meaning, away from knowing everything about something small and toward understanding something about everything. The South Node in the 3rd House means this soul arrives with a mind like quicksilver — fast, adaptable, endlessly curious — but possibly stuck in an information loop that never quite reaches wisdom.

<strong>The Past Life Pattern:</strong> The South Node in the 3rd House reveals a soul deeply familiar with communication, local knowledge, and mental agility. There have been lifetimes as writers, teachers, messengers, merchants — people who dealt in information and thrived on variety. The mind is the sharpest tool in the kit: quick to learn, quick to speak, quick to adapt.

The shadow is a mind that never stops gathering and never starts integrating. Information without meaning. Facts without philosophy. A thousand interesting conversations that never go deep enough to change anything. There can be a restless mental energy that jumps from topic to topic, a gossipy quality that mistakes talking about things for understanding them, and an unconscious avoidance of commitment to any single truth.

<strong>The Growth Edge:</strong> This lifetime demands that all that mental agility serve something larger. The universe will create a hunger for meaning that information alone can't satisfy, opportunities for travel that change worldview rather than just adding stamps to a passport, and encounters with teachers or belief systems that challenge the comfortable habit of knowing a little about everything.

The 9th House rules higher education, long-distance travel, philosophy, religion, publishing, and the law. Growth comes through committing to deep study rather than surface scanning, through experiencing cultures radically different from your own, and through the courage to actually believe in something.

<strong>The Faith Curriculum:</strong> Developing faith — not necessarily religious, but the deep trust that life has meaning — is perhaps the most important lesson. The 3rd House South Node is comfortable with doubt, with "on the other hand," with keeping options open. The 9th House North Node asks: at some point, can you stand for something? Can you trust something you can't verify with a quick Google search?

<strong>The Teaching Path:</strong> Many souls with this placement eventually become teachers, but not the 3rd House kind who relay information. The 9th House teacher transmits wisdom — hard-won understanding that comes from experience, travel, study, and the integration of knowledge into something that actually changes how people see the world.

<strong>The Integration:</strong> The 3rd House gifts of communication and mental agility become extraordinary when aimed at 9th House purposes. This soul can make philosophy accessible, translate foreign ideas into local language, and bridge cultures with unusual ease. The writer who also seeks truth. The communicator whose message actually means something.`,
            growth: ["Committing to a belief system", "Travelling for transformation not tourism", "Teaching from wisdom not just information"],
            resistance: ["Surface-level engagement with ideas", "Mental restlessness", "Avoiding commitment to any truth"]
        },
        10: {
            title: "North Node in 10th House - The Public Calling",
            keywords: ["Career Purpose", "Public Role", "Achievement", "Responsible Authority"],
            reading: `The North Node in the 10th House calls this soul out of the private sphere and into public life — out of the nest and up the mountain, out of emotional safety and into the exposed vulnerability of visible achievement. After lifetimes of focusing on home, family, and emotional security (South Node in 4th House), this incarnation demands that the inner strength built in private be expressed on the public stage.

<strong>The Past Life Pattern:</strong> The South Node in the 4th House reveals a soul deeply rooted in domestic life, family bonds, and the comforts of home. There have been lifetimes of nurturing, of creating sanctuary, of placing family above all else. Emotional intelligence is instinctive — they read feelings the way others read words. Home isn't just where they live; it's who they are.

The shadow is a life where the private sphere becomes a hiding place. Where "family comes first" becomes the excuse never to take professional risks. Where emotional sensitivity is used to avoid the harsher world outside the front door. There can be a persistent feeling that the world is too cold, too competitive, too unlike the warmth of home — and a subtle but powerful resistance to going out and finding a place in it anyway.

<strong>The Growth Edge:</strong> This lifetime demands visible contribution. The universe will create circumstances that push toward career development, public roles, and the acceptance of authority. There may be family situations that force early responsibility, career opportunities that arrive whether invited or not, or a growing restlessness with the limitations of private life that can only be resolved by stepping into the public arena.

The 10th House rules career, public reputation, authority, achievement, and legacy. Growth comes through setting professional goals and pursuing them with the same dedication this soul naturally gives to family, through accepting leadership positions even when they feel exposed, and through building something in the world that others can see and benefit from.

<strong>The Authority Work:</strong> Learning to be an authority — not just in the gentle, nurturing 4th House way, but in the visible, accountable, sometimes lonely 10th House way — is core curriculum. This means making hard decisions, accepting that not everyone will like the outcomes, and standing behind the work with your name on it. The emotional sensitivity of the South Node must be integrated with professional backbone.

<strong>The Legacy Question:</strong> What will you have built when you leave? Not the home you maintained or the family you nurtured (the 4th House already handled that), but the visible mark you made on the wider world. A career. A contribution. A reputation earned through sustained effort. These are the 10th House assignments.

<strong>The Integration:</strong> The 4th House gifts of emotional intelligence, nurturing, and the ability to create belonging become remarkable leadership qualities when applied to the public sphere. This soul can lead with heart in environments that desperately need it, can build organizations that feel like families, and can achieve publicly without losing the private warmth that makes them human. The executive who remembers that everyone on the team has a home to get back to.`,
            growth: ["Visible professional achievement", "Accepting authority and accountability", "Building public legacy"],
            resistance: ["Hiding in domestic comfort", "Using family as an excuse to avoid risk", "Fear of public exposure"]
        },
        11: {
            title: "North Node in 11th House - The Community Architect",
            keywords: ["Community", "Future Vision", "Friendship", "Collective Purpose"],
            reading: `The North Node in the 11th House calls this soul out of the spotlight and into the tribe — away from personal drama and toward collective vision, away from "look at me" and toward "look what we can do together." After lifetimes of personal creative expression, romantic intensity, and centre-stage living (South Node in 5th House), this incarnation asks whether the individual flame can be used to light something bigger.

<strong>The Past Life Pattern:</strong> The South Node in the 5th House reveals a soul deeply familiar with personal creativity, romance, self-expression, and the particular buzz of being noticed. There have been lifetimes as artists, performers, lovers, and those who lived from the heart with dramatic flair. Creative talent is instinctive, and there's a natural ability to captivate an audience — whether that's a theatre crowd or a dinner table.

The shadow is a life where everything becomes personal drama. Where every group situation is really about whether you're getting enough attention. Where creative gifts are used for ego gratification rather than genuine contribution, and where romantic intensity substitutes for the deeper connection of true friendship. There can be a childlike self-centredness that's charming in small doses but exhausting in daily life.

<strong>The Growth Edge:</strong> This lifetime demands expanding beyond personal expression to collective purpose. The universe will create opportunities for group involvement, friendships that matter more than romances, and causes that ignite passion without requiring personal spotlight. The soul is learning that the most powerful creation isn't the solo masterpiece but the movement that changes the world.

The 11th House rules friendship, groups, social causes, future vision, technology, and collective consciousness. Growth comes through genuine friendship (not an audience), through contributing to groups where you're one of many rather than the star, and through developing a vision for the future that extends beyond personal desires.

<strong>The Friendship Lesson:</strong> Real friendship — egalitarian, non-dramatic, consistent — is often this soul's greatest teacher. The 5th House South Node is accustomed to the intensity of romance and the adrenaline of creative performance. Friendship offers something quieter but ultimately more sustaining: being valued for who you are rather than what you create or how you perform. Learning to be a good friend, reliably and without drama, is profound growth.

<strong>The Collective Vision:</strong> Finding a cause, a community, or a vision larger than personal concerns channels the 5th House creativity into something with lasting impact. The passion that once fueled personal art now fuels social change. The charisma that once drew audiences now inspires movements.

<strong>The Integration:</strong> The 5th House gifts of creativity, passion, and personal magnetism become extraordinary tools when placed in service of collective goals. This soul can inspire groups not through cold strategy but through genuine creative fire. The performer becomes the activist. The artist becomes the visionary. The individual who knows how to shine teaches the whole group how to glow.`,
            growth: ["Building genuine friendships", "Contributing to causes beyond self", "Thinking in terms of 'we' not 'me'"],
            resistance: ["Need for personal spotlight", "Treating groups as audiences", "Avoiding commitment to collective goals"]
        },
        12: {
            title: "North Node in 12th House - The Mystic's Return",
            keywords: ["Spirituality", "Surrender", "Compassion", "Transcendence"],
            reading: `The North Node in the 12th House calls this soul toward the invisible — away from to-do lists and toward surrender, away from fixing and toward faith, away from the tangible and into the territory where things can only be felt, never measured. After lifetimes of practical service, meticulous work, and devotion to usefulness (South Node in 6th House), this incarnation asks the hardest question a doer can face: can you stop doing and simply be?

<strong>The Past Life Pattern:</strong> The South Node in the 6th House reveals a soul deeply identified with work, service, and practical competence. There have been lifetimes as healers, workers, servants, craftspeople — those who found identity through being useful. Skills are sharp. Work ethic is unquestionable. There's an almost physical need to be productive, to improve things, to fix what's broken.

The shadow is a life where busyness becomes a spiritual bypass. Where there's always another task to complete, another problem to solve, another person to help — and the constant doing serves as protection against the terrifying stillness where God (or the void, or the truth) might actually be encountered. Perfectionism, anxiety, and chronic overwork are common manifestations.

<strong>The Growth Edge:</strong> This lifetime demands surrender of control. The universe will create circumstances that cannot be fixed through effort — situations that only resolve through letting go, problems that worsen with more intervention, and periods of enforced stillness (illness, isolation, waiting) that strip away the ability to do and leave only the ability to be.

The 12th House rules spirituality, the unconscious, dreams, isolation, transcendence, compassion, and the dissolution of ego boundaries. Growth comes through meditation, through time alone that isn't productive, through allowing things to unfold without managing them, and through the radical acceptance that some suffering cannot be fixed — only witnessed with compassion.

<strong>The Surrender Practice:</strong> For a soul hardwired to be useful, surrender feels like death. But the 12th House North Node is asking for exactly that — the death of the identity that says "I am what I do." Learning to sit with discomfort without rushing to fix it, to watch suffering without immediately intervening, to trust that the universe can handle things without personal supervision — this is the growth edge.

<strong>The Compassion Expansion:</strong> The 6th House South Node serves individuals — this patient, that task, this specific problem. The 12th House North Node expands compassion to encompass everything. It's the difference between nursing one person and praying for the world. Between fixing a broken machine and sitting with the mystery of why things break at all.

<strong>The Integration:</strong> The 6th House gifts of practical skill, attention to detail, and genuine helpfulness don't disappear — they become grounded spiritual practice. This soul can bring order to spiritual communities, can translate mystical experiences into practical wisdom, and can serve the invisible with the same dedication they once gave to the visible. The healer who also prays. The worker who also surrenders.`,
            growth: ["Developing a meditation or spiritual practice", "Allowing things to unfold without controlling", "Finding identity beyond productivity"],
            resistance: ["Chronic busyness as spiritual avoidance", "Perfectionism preventing surrender", "Anxiety about being useless"]
        }
    },
    south: {
        1: {
            title: "South Node in 1st House - The Independent Soul",
            keywords: ["Natural Independence", "Self-Awareness", "Personal Power", "Past Self-Focus"],
            reading: `The South Node in the 1st House marks a soul who has spent lifetimes mastering the art of being alone. Independence isn't something learned in this life — it was forged across many. Self-reliance, personal courage, and the ability to act decisively without consulting anyone are as natural as breathing.

<strong>The Gifts You Arrived With:</strong> There's a powerful sense of personal identity here. This soul knows who they are — or at least who they've been — with unusual clarity. They can walk into a room and hold their own. They can start things, initiate action, and function as a one-person operation with impressive efficiency. Physical courage and a pioneering spirit come standard.

<strong>The Comfort Zone:</strong> The trap is that independence becomes the only mode of operation. "I'll do it myself" isn't just preference — it's reflex. There can be a subtle (or not so subtle) resistance to truly needing anyone, a habit of making decisions unilaterally, and an unconscious belief that partnership means losing yourself. The soul is so practiced at being self-sufficient that asking for help feels like failure.

<strong>What's Being Released:</strong> This lifetime asks the soul to soften the grip on total independence — not to abandon it, but to discover that strength can include vulnerability. The 7th House North Node is calling for genuine partnership, and that requires loosening the 1st House armor enough to let someone else in. The courage that once served solo missions now serves the harder mission of learning to love as an equal.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring incredible strength to partnerships. They don't need a relationship to complete them — they want one because they've chosen to grow. Their self-knowledge becomes the foundation for knowing another. Their independence ensures they'll never be codependent.`,
            gifts: ["Natural self-reliance", "Courage under pressure", "Quick decisive action"],
            release: ["Compulsive independence", "Resistance to compromise", "Going it alone when help is available"]
        },
        2: {
            title: "South Node in 2nd House - The Self-Made Soul",
            keywords: ["Natural Self-Worth", "Material Skills", "Values Clarity", "Past Security"],
            reading: `The South Node in the 2nd House reveals a soul who has spent lifetimes building — wealth, security, stability, and an unshakeable sense of personal value. There's a natural talent with money and material resources that didn't develop in this lifetime. It arrived fully formed, like a skill remembered from a dream.

<strong>The Gifts You Arrived With:</strong> Financial instincts are strong. There's an innate understanding of what things are worth, how to build material security, and how to create comfort from scratch. Self-worth doesn't fluctuate with external validation — it's grounded in something deeper, earned over lifetimes. There may be a beautiful relationship with the physical world: good taste, sensory appreciation, and an ability to create beauty in tangible form.

<strong>The Comfort Zone:</strong> The trap is that security becomes the highest priority and change becomes the enemy. There can be a stubborn attachment to routine, possessions, and the familiar. "What's mine is mine" extends beyond finances to emotions, ideas, and even people. The soul may unconsciously resist any situation that requires sharing control over resources or surrendering personal comfort for something deeper.

<strong>What's Being Released:</strong> This lifetime calls for the 8th House journey — vulnerability, shared resources, psychological depth, and the kind of intimacy that can't be controlled. The soul is being asked to discover that the deepest security isn't financial but emotional, and that some treasures only become available when you open the vault and let someone else inside.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring remarkable stability to intimate relationships. They can be trusted with shared resources because they've already mastered personal ones. Their groundedness becomes the container that makes deep transformation safe.`,
            gifts: ["Natural financial wisdom", "Unshakeable self-worth", "Ability to create material security"],
            release: ["Hoarding resources or emotions", "Resistance to vulnerability", "Valuing stability over growth"]
        },
        3: {
            title: "South Node in 3rd House - The Quick Mind",
            keywords: ["Natural Curiosity", "Communication Skills", "Mental Agility", "Past Learning"],
            reading: `The South Node in the 3rd House reveals a soul with a mind that has been sharpened across lifetimes of learning, speaking, writing, and connecting. Communication isn't just a skill — it's an identity. Information flows through this soul like water, collected and redistributed with natural ease.

<strong>The Gifts You Arrived With:</strong> Mental agility is remarkable. This soul can learn quickly, speak persuasively, write clearly, and juggle multiple streams of information simultaneously. There's a natural curiosity about everything and an ability to connect dots that others miss. Siblings, neighbours, and local community may play important roles, and there's an instinct for networking and staying connected.

<strong>The Comfort Zone:</strong> The trap is a mind that never stops skimming and never starts diving. Information is gathered endlessly but rarely integrated into wisdom. Conversations are fascinating but rarely transformative. There's a restlessness that moves from topic to topic, idea to idea, plan to plan — always learning, never truly knowing. Gossip can substitute for genuine communication, and cleverness can mask a fear of committing to any single truth.

<strong>What's Being Released:</strong> This lifetime calls for the 9th House journey — depth over breadth, meaning over facts, wisdom over information. The soul is being asked to stop scanning the surface and plunge into something that can't be summarised in a paragraph. Travel that changes worldview, education that reshapes identity, and beliefs worth standing behind are the curriculum.

<strong>The Integration:</strong> When balanced, this South Node produces extraordinary communicators of deep truth. The quick mind becomes a vehicle for philosophy rather than just facts. The ability to connect with local community extends to connecting cultures. The writer becomes a wisdom teacher, the talker becomes a truth-teller.`,
            gifts: ["Quick learning ability", "Natural communication skills", "Mental flexibility and adaptability"],
            release: ["Surface-level engagement", "Mental restlessness", "Avoiding depth through constant distraction"]
        },
        4: {
            title: "South Node in 4th House - The Nurturer's Legacy",
            keywords: ["Natural Nurturing", "Emotional Intelligence", "Family Connection", "Past Security"],
            reading: `The South Node in the 4th House reveals a soul deeply rooted in family, home, and emotional belonging. Across many lifetimes, this soul has been the heart of the household — the one who created warmth, maintained traditions, and made sure everyone felt held. Nurturing isn't learned; it's remembered in the bones.

<strong>The Gifts You Arrived With:</strong> Emotional intelligence is instinctive and profound. This soul reads feelings the way others read text — naturally, immediately, accurately. Creating a sense of home comes effortlessly, whether that's a physical space or an emotional atmosphere. There's a deep connection to family, ancestry, and roots. The past feels alive and close. Cooking, caring, creating sanctuary — these come as naturally as breathing.

<strong>The Comfort Zone:</strong> The trap is using home and family as a hiding place from the wider world. "Family comes first" is noble until it becomes the reason you never step outside the front door. There can be an over-identification with the role of caretaker, a tendency to mother everyone (whether they want it or not), and a persistent belief that the outside world is too harsh for someone this sensitive. Emotional manipulation — the guilt trip, the tears, the "after all I've done for you" — can be unconscious tools.

<strong>What's Being Released:</strong> This lifetime calls for the 10th House journey — career, public contribution, visible achievement, and the kind of authority that extends beyond the family dinner table. The soul is being asked to take all that emotional intelligence and use it in the world, not just the living room. To build something visible, accountable, and lasting.

<strong>The Integration:</strong> When balanced, this South Node produces leaders with genuine heart. The emotional gifts become the foundation for compassionate authority. The ability to create belonging transforms organisations. The nurturer becomes the leader — one who builds empires that feel like family.`,
            gifts: ["Deep emotional intelligence", "Natural ability to create belonging", "Connection to ancestry and roots"],
            release: ["Using family as a hiding place", "Over-identification with caretaker role", "Fear of public exposure"]
        },
        5: {
            title: "South Node in 5th House - The Creative Heart",
            keywords: ["Natural Creativity", "Self-Expression", "Heart-Centered Living", "Past Joy"],
            reading: `The South Node in the 5th House reveals a soul who has spent lifetimes in the spotlight — creating, performing, loving, and living from the heart with dramatic flair. Creative talent didn't develop in this lifetime. It arrived polished and ready, a gift from incarnations as artists, performers, lovers, and those who knew how to make life beautiful.

<strong>The Gifts You Arrived With:</strong> Creativity flows naturally and abundantly. There's a magnetic quality — people are drawn to this soul's warmth, expressiveness, and ability to make ordinary moments feel special. Romance comes easily, as does the ability to play, to find joy, and to follow the heart without hesitation. Children (or the inner child) may be particularly important. There's a natural charisma that fills rooms.

<strong>The Comfort Zone:</strong> The trap is a life that revolves around personal drama, romantic intensity, and the addictive need to be the centre of attention. Every situation becomes a performance, every relationship a romance novel, and every group gathering an opportunity to shine. Creative gifts may be used for ego validation rather than genuine contribution, and the need for applause can become exhausting for everyone nearby.

<strong>What's Being Released:</strong> This lifetime calls for the 11th House journey — community, collective purpose, genuine friendship, and the vision to see beyond personal desires. The soul is being asked whether the creative fire can light something bigger than one person's spotlight. Whether the charisma can serve a cause. Whether the heart can expand from "my joy" to "our future."

<strong>The Integration:</strong> When balanced, this South Node produces people who bring creative magic to collective endeavours. The performer becomes the inspiring community leader. The romantic becomes the one who loves humanity. The artist creates not for applause but for change.`,
            gifts: ["Natural creative ability", "Personal magnetism and warmth", "Courage to follow the heart"],
            release: ["Need for constant validation", "Personal drama as identity", "Treating communities as audiences"]
        },
        6: {
            title: "South Node in 6th House - The Sacred Worker",
            keywords: ["Natural Helpfulness", "Practical Skills", "Work Ethic", "Past Service"],
            reading: `The South Node in the 6th House reveals a soul who has spent lifetimes in service — working, fixing, helping, and devoting themselves to practical usefulness with quiet dedication. This isn't someone who needs to learn work ethic. It's someone who needs to learn when to stop working.

<strong>The Gifts You Arrived With:</strong> Practical skills are exceptional. There's an eye for detail, a capacity for sustained effort, and a genuine desire to be helpful that goes beyond social nicety. Health awareness may be strong, and there's often skill in healing, bodywork, nutrition, or any practice that involves careful attention to systems. The ability to improve things — processes, bodies, situations — is almost compulsive.

<strong>The Comfort Zone:</strong> The trap is defining yourself entirely through productivity. The to-do list never ends because completing it would mean facing the terrifying question of who you are when you're not doing something useful. There can be chronic anxiety about imperfection, a tendency to serve until depleted, and a subtle self-righteousness about being the hardest worker in the room. Health problems may arise from the body finally refusing to keep up with the mind's demands.

<strong>What's Being Released:</strong> This lifetime calls for the 12th House journey — surrender, spirituality, and the dissolution of the identity that says "I am what I do." The soul is being asked to discover that existence has value beyond productivity, that some problems aren't meant to be fixed, and that the deepest service might be simply being present without an agenda.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring extraordinary practical skill to spiritual work. The healer who also prays. The worker who also meditates. The perfectionist who discovers the perfection in imperfection.`,
            gifts: ["Exceptional work ethic", "Eye for detail and improvement", "Genuine desire to be of service"],
            release: ["Defining worth through productivity", "Chronic overwork and anxiety", "Inability to surrender control"]
        },
        7: {
            title: "South Node in 7th House - The Natural Partner",
            keywords: ["Natural Diplomacy", "Relationship Skills", "Cooperation", "Past Partnership"],
            reading: `The South Node in the 7th House reveals a soul who has spent lifetimes perfecting the art of partnership. Compromise, diplomacy, and the ability to see every situation from another person's perspective didn't develop in this life — they were mastered long ago. Relationships are second nature, which is both the gift and the trap.

<strong>The Gifts You Arrived With:</strong> Social grace and relationship intelligence are remarkable. This soul can navigate the most complex interpersonal dynamics with ease, mediating conflicts, building bridges, and creating harmony in even the most tense environments. There's a natural gift for seeing the other person's point of view, for knowing what to say to smooth things over, and for making others feel valued and understood. Partnership feels like home.

<strong>The Comfort Zone:</strong> The trap is disappearing into relationships. When you're so skilled at considering others' perspectives, you can lose track of your own. When compromise comes this easily, you may never discover what you actually want when you're not accommodating someone else. There can be a chronic inability to make decisions alone, a fear of conflict that prevents authentic expression, and an identity that shifts to match whoever is in the room. People-pleasing becomes a lifestyle, and the question "but what do YOU want?" can feel genuinely baffling.

<strong>What's Being Released:</strong> This lifetime calls for the 1st House journey — self-discovery, independence, and the courage to stand alone. The soul is being asked to find out who they are when they're not reflecting someone else, to make decisions without consulting anyone, and to discover that conflict isn't the end of the world — it might be the beginning of authenticity.

<strong>The Integration:</strong> When balanced, this South Node produces people who can be powerfully independent while maintaining extraordinary relationship skills. The diplomat who also has backbone. The peacemaker who can also go to war when necessary. The partner who never loses themselves.`,
            gifts: ["Natural diplomacy and grace", "Ability to see all perspectives", "Skill in creating harmony"],
            release: ["Losing identity in relationships", "Chronic people-pleasing", "Fear of standing alone"]
        },
        8: {
            title: "South Node in 8th House - The Phoenix Soul",
            keywords: ["Natural Depth", "Psychological Insight", "Transformative Power", "Past Intensity"],
            reading: `The South Node in the 8th House reveals a soul who has been through the fire — repeatedly. Transformation, crisis, psychological depth, and intimate merging are not new experiences. They're the familiar territory of many lifetimes, and while this creates extraordinary resilience, it can also create an addiction to intensity.

<strong>The Gifts You Arrived With:</strong> Psychological insight is profound and instinctive. This soul can see beneath surfaces — reading motivations, detecting lies, and understanding the hidden dynamics in any situation with unsettling accuracy. There's a natural comfort with the taboo, with crisis, with the subjects that make others uncomfortable. Intimacy at the deepest level comes naturally. There may be gifts in psychology, research, finance, or any field that requires looking under the hood.

<strong>The Comfort Zone:</strong> The trap is an addiction to intensity. When you've lived many lifetimes in the deep end, the shallow end feels unbearable. Simple pleasures seem boring. Stable relationships feel flat. There can be a tendency to create drama when none exists, to plunge into crisis mode unnecessarily, and to mistake chaos for depth. Trust issues may be profound — the soul has been betrayed before and the armor is thick. Control issues around shared resources can be fierce.

<strong>What's Being Released:</strong> This lifetime calls for the 2nd House journey — simplicity, personal values, self-reliance, and the quiet pleasure of building something stable. The soul is being asked to discover that peace isn't boring, that stability isn't stagnation, and that the most radical transformation might be learning to enjoy an ordinary Tuesday.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring remarkable depth to practical life. The crisis manager who also builds steady businesses. The psychologist who also knows how to garden. The survivor who finally discovers they can also thrive.`,
            gifts: ["Profound psychological insight", "Resilience through transformation", "Comfort with life's depths"],
            release: ["Addiction to intensity and crisis", "Controlling behaviour", "Mistaking chaos for meaning"]
        },
        9: {
            title: "South Node in 9th House - The Philosopher's Return",
            keywords: ["Natural Faith", "Philosophical Mind", "Teaching Ability", "Past Adventure"],
            reading: `The South Node in the 9th House reveals a soul who has spent lifetimes pursuing truth — through travel, education, philosophy, religion, and the big questions that don't have simple answers. Wisdom and faith didn't develop in this lifetime. They're the inheritance of many incarnations as seekers, teachers, explorers, and believers.

<strong>The Gifts You Arrived With:</strong> Big-picture thinking comes naturally. This soul can see the forest when others are stuck examining bark. There's an instinctive philosophical orientation — a tendency to search for meaning in everything — and a natural teaching ability that transmits enthusiasm along with information. Travel may feel like homecoming. Higher education may come easily. Faith in something larger than the self is the default setting.

<strong>The Comfort Zone:</strong> The trap is getting lost in the big picture and missing the details. There can be a tendency to pontificate rather than listen, to have opinions on everything and curiosity about nothing, and to mistake certainty for wisdom. Intellectual arrogance can develop — the belief that having travelled widely or studied deeply makes one's perspective superior. The preacher in the soul can become preachy in life. "I already know this" becomes a way to avoid learning anything new from ordinary sources.

<strong>What's Being Released:</strong> This lifetime calls for the 3rd House journey — curiosity, local connection, the willingness to learn from everyone (not just gurus and professors), and the humility to ask questions instead of always having answers. The soul is being asked to discover that the neighbour might have as much wisdom as the Tibetan monk.

<strong>The Integration:</strong> When balanced, this South Node produces people who combine philosophical depth with genuine curiosity. The professor who still asks questions. The teacher who still learns from students. The world traveller who can also appreciate the corner shop.`,
            gifts: ["Natural wisdom and faith", "Big-picture perspective", "Teaching ability that inspires"],
            release: ["Intellectual arrogance", "Preaching instead of listening", "Dismissing ordinary knowledge"]
        },
        10: {
            title: "South Node in 10th House - The Accomplished Soul",
            keywords: ["Natural Authority", "Career Skills", "Public Presence", "Past Achievement"],
            reading: `The South Node in the 10th House reveals a soul who has spent lifetimes achieving, leading, and building reputation in the public eye. Authority, career success, and the weight of responsibility aren't new. They're well-worn grooves from many incarnations in positions of power, and while the skills are impressive, the soul is tired of performing for the world.

<strong>The Gifts You Arrived With:</strong> Leadership and professional competence are instinctive. This soul understands hierarchy, ambition, and the strategic patience required to build something significant. There's a natural authority that others recognise and respect. Career success may come relatively easily — the soul knows the game because it's been playing for lifetimes. Public speaking, organisational management, and long-term planning are second nature.

<strong>The Comfort Zone:</strong> The trap is defining yourself entirely through achievement and public standing. When career success has been the identity for lifetimes, slowing down feels like dying. There can be a workaholic tendency, a difficulty connecting emotionally (because feelings are inefficient), and a subtle coldness that prioritises results over relationships. The most personal question — "how do you feel?" — may be the hardest to answer. Home life may suffer because it doesn't have KPIs.

<strong>What's Being Released:</strong> This lifetime calls for the 4th House journey — emotional vulnerability, family connection, inner security, and the creation of home as a place of genuine belonging rather than a base camp for the next career push. The soul is being asked to build an inner life as impressive as the outer one.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring worldly competence to personal life. The executive who is also a present parent. The leader who has genuine emotional depth. The achiever who discovers that the most important legacy might be the one left at the kitchen table.`,
            gifts: ["Natural leadership and authority", "Professional competence", "Strategic thinking and planning"],
            release: ["Workaholism as identity", "Emotional unavailability", "Valuing achievement over connection"]
        },
        11: {
            title: "South Node in 11th House - The Collective Soul",
            keywords: ["Natural Group Skills", "Future Vision", "Humanitarian Concern", "Past Community"],
            reading: `The South Node in the 11th House reveals a soul who has spent lifetimes immersed in groups, communities, and collective causes. Teamwork, social awareness, and the ability to subordinate personal desires for the greater good didn't develop in this lifetime — they're the muscle memory of many incarnations as activists, community builders, and those who found identity through belonging.

<strong>The Gifts You Arrived With:</strong> Group dynamics are understood instinctively. This soul can walk into any collective and quickly identify the dynamics, the alliances, and the unspoken rules. There's a natural concern for fairness, a progressive orientation that questions established norms, and an ability to inspire collective action. Friendship comes easily, and there's often an extensive social network. Technology and innovation may be natural interests.

<strong>The Comfort Zone:</strong> The trap is losing individual identity in the group. When belonging has been the primary mode of existence for lifetimes, standing out feels terrifying. There can be a tendency to suppress personal desires because they feel selfish, to defer creative expression because it's "not about me," and to hide behind collective identity rather than risk individual exposure. The most dangerous version is the revolutionary who has no idea what they'd do with a free afternoon.

<strong>What's Being Released:</strong> This lifetime calls for the 5th House journey — personal creativity, romantic love, individual expression, and the courage to put your own heart on display without the safety net of a group. The soul is being asked to discover what joy looks like when it's not collective — when it's just yours, unapologetically, in all its dramatic, personal, glorious specificity.

<strong>The Integration:</strong> When balanced, this South Node produces people who bring genuine personal flair to group endeavours. The activist who is also an artist. The community leader who also falls madly in love. The humanitarian who paints on weekends — not for the cause, just for the sheer joy of colour on canvas.`,
            gifts: ["Natural teamwork and collaboration", "Instinct for social dynamics", "Humanitarian vision and fairness"],
            release: ["Losing self in groups", "Suppressing personal creativity", "Fear of individual spotlight"]
        },
        12: {
            title: "South Node in 12th House - The Transcendent Past",
            keywords: ["Natural Intuition", "Spiritual Connection", "Compassion", "Past Transcendence", "Mystic Memory"],
            reading: `The South Node in the 12th House reveals a soul with profound spiritual gifts accumulated over many lifetimes. This is the placement of the mystic, the healer, the one who has walked between worlds. The veil is thin for this soul—they came into this life already knowing things that others spend lifetimes seeking.

<strong>Past Life Imprints:</strong> The 12th House South Node carries memories (conscious or not) of monasteries and ashrams, of solitary spiritual practice, of service that dissolved the sense of separate self. There may have been lifetimes as monks, nuns, hermits, hospital workers, or those who cared for the dying. The soul knows the taste of transcendence, the peace that comes from surrender.

<strong>The Natural Gifts:</strong> Intuition comes naturally—they often know things without knowing how they know. Compassion is instinctive; they feel others' pain as their own. Spiritual practices that others struggle with come easily. Dreams may be vivid and meaningful. Creative inspiration may feel channeled from somewhere beyond. There's a natural ability to be with suffering without needing to fix it.

<strong>The Shadow Patterns:</strong> However, these gifts can become traps. The soul may use spirituality to avoid practical responsibility. "I'm too sensitive for this world" becomes an excuse. Martyrdom patterns may emerge—sacrificing self completely, losing identity in service. There may be tendencies toward addiction, escapism, or simply checking out when reality gets difficult. Boundaries may be chronically weak.

<strong>The Integration Challenge:</strong> The North Node in 6th House calls this soul to ground their spiritual gifts in practical service. The lesson is not to abandon transcendence but to bring it into daily life. The meditation practice must extend to the workplace. The compassion must be structured into helpful action. The intuition must guide practical decisions.

<strong>The Gift to the World:</strong> When integrated, this South Node placement produces healers who work in the real world, spiritual teachers who also do their own laundry, caregivers who maintain healthy boundaries. They bring the sacred into the ordinary, showing others that the divine is not somewhere else but right here, in this task, this moment, this body.

<strong>The Deep Memory:</strong> There's often a sense of having seen too much, of being old beyond years, of carrying the weight of many lifetimes. This is accurate. The soul does carry that weight—and the 6th House North Node provides the counterbalance: groundedness, routine, the simplicity of doing one useful thing at a time.`
        }
    }
};

// ============================================
// SYNTHESIS READINGS
// ============================================

var SYNTHESIS_READINGS = {
    career: {
        title: "Career Path Synthesis",
        icon: "💼",
        description: "Your complete career blueprint based on your cosmic profile",
        generate: function(chartData) {
            // chartData has flat properties: sunSign, moonSign, marsSign, saturnSign, midheaven, destiny, name, etc.
            const mc = chartData.midheaven || chartData.sunSign;
            const saturn = chartData.saturnSign;
            const mars = chartData.marsSign;
            const destiny = chartData.destiny;
            const name = chartData.name;
            
            return {
                title: "Career & Purpose Blueprint",
                keywords: ['Career Path', 'Public Role', 'Life Work', 'Mastery'],
                reading: `The Midheaven in ${mc} reveals the ultimate career direction: ${getCareerPath(mc)}. This is the mountain ${name} is destined to climb, the public role they're here to fulfill.

Saturn in ${saturn} shows where discipline and mastery must be developed: ${getSaturnCareerLesson(saturn)}. This indicates the challenges that will become greatest strengths through dedicated effort.

Mars in ${mars} reveals their work style and drive: ${getMarsWorkStyle(mars)}. This shows how they'll pursue goals and overcome obstacles in their professional life.

Their Destiny Number ${destiny} adds numerological purpose: this soul is here to express the energy of ${destiny}, which in career terms means ${getDestinyCareer(destiny)}.

Career Synthesis: Combining these influences, the ideal career path involves ${synthesizeCareerPath(mc, saturn, mars, destiny)}. They'll find greatest success when their work allows them to ${getCareerSuccess(mc)}.`,
                strengths: [`Natural talent for ${getCareerPath(mc)}`, `${mars} drive style`, `Destiny ${destiny} purpose`],
                watchFor: [`Saturn lessons in ${saturn}`]
            };
        }
    },
    
    spiritual: {
        title: "Spiritual Path Synthesis",
        icon: "🔮",
        description: "Your soul's spiritual journey and growth path",
        generate: function(chartData) {
            const northNode = chartData.northNode || 'Aries';
            const lifePath = chartData.lifePath;
            const moonSign = chartData.moonSign;
            const name = chartData.name;
            
            return {
                title: "Spiritual Path Blueprint",
                keywords: ['Soul Growth', 'Spiritual Gifts', 'Higher Purpose', 'Awakening'],
                reading: `Soul Direction (North Node in ${northNode}): ${name}'s soul is growing toward ${northNode} qualities - ${getNorthNodeSpiritual(northNode)}. The spiritual curriculum of this lifetime involves developing these qualities through experience.

The Emotional Path (Moon in ${moonSign}): The Moon reveals emotional and intuitive gifts - ${getMoonSpiritual(moonSign)}. This is how ${name} connects with the divine through feeling.

Life Path ${lifePath} adds: This vibration means the spiritual journey involves ${getLifePathSpiritual(lifePath)}. The soul is learning and teaching these lessons throughout life.

Spiritual Practices: Natural spiritual practices that support this soul include ${getSpiritualPractices(northNode, moonSign, lifePath)}.

Soul Gifts to Develop: The unique spiritual gifts waiting to unfold include ${getSoulGifts(northNode, moonSign, lifePath)}.`,
                gifts: [`${northNode} soul direction`, `${moonSign} intuitive style`, `Life Path ${lifePath} wisdom`],
                practices: [`${getSpiritualPracticeShort(northNode)}`]
            };
        }
    },
    
    shadow: {
        title: "Shadow Work Synthesis",
        icon: "🌑",
        description: "Understanding and integrating the hidden self",
        generate: function(chartData) {
            const saturnSign = chartData.saturnSign;
            const sunSign = chartData.sunSign;
            const moonSign = chartData.moonSign;
            const name = chartData.name;
            
            return {
                title: "Shadow Work Blueprint",
                keywords: ['Hidden Self', 'Growth Edges', 'Integration', 'Wholeness'],
                reading: `Primary Shadow (Saturn in ${saturnSign}): The growth edge that requires attention involves ${saturnSign} energy - ${getSaturnShadow(saturnSign)}. This represents areas where mastery must be developed through conscious effort.

Sun-Moon Dynamic: With Sun in ${sunSign} and Moon in ${moonSign}, there may be tension between outer identity and inner needs - ${getSunMoonShadow(sunSign, moonSign)}. Integration creates wholeness.

Shadow Integration Path: To integrate these shadow elements, ${name} needs ${getShadowIntegrationSimple(saturnSign, sunSign, moonSign)}.

Reclaimed Power: When shadow work is done, this soul accesses authentic ${saturnSign} mastery and the full power of their ${sunSign}/${moonSign} combination.

Support for Integration: Parents and caregivers can support shadow integration by honoring both ${name}'s ${sunSign} need for expression and ${moonSign} emotional needs without judgment.`,
                integration: [`${saturnSign} mastery`, `${sunSign}/${moonSign} balance`],
                patterns: [`Watch for ${getSaturnPattern(saturnSign)}`]
            };
        }
    },
    
    money: {
        title: "Money Blueprint Synthesis",
        icon: "💰",
        description: "Your relationship with abundance and resources",
        generate: function(chartData) {
            const venus = chartData.venusSign;
            const jupiter = chartData.jupiterSign;
            const saturn = chartData.saturnSign;
            const lifePath = chartData.lifePath;
            const name = chartData.name;
            
            return {
                title: "Abundance Blueprint",
                keywords: ['Prosperity', 'Values', 'Resources', 'Financial Flow'],
                reading: `Values & Attraction (Venus in ${venus}): Venus shows what ${name} values and how they attract resources - ${venus} Venus values ${getVenusValue(venus)} and attracts through ${getVenusAttraction(venus)}.

Expansion & Luck (Jupiter in ${jupiter}): Jupiter shows where luck and expansion occur - ${jupiter} Jupiter expands through ${getJupiterExpansion(jupiter)}. This is where "lucky breaks" tend to happen.

Lessons & Mastery (Saturn in ${saturn}): Saturn shows money lessons to master - ${saturn} Saturn teaches ${getSaturnMoneyLesson(saturn)}. Early challenges become later mastery.

Life Path ${lifePath} Money Style: This vibration approaches money with ${getLifePathMoney(lifePath)}. Understanding this helps align with natural abundance flow.

Path to Prosperity: Financial success flows when they ${getMoneySuccess(jupiter, venus, lifePath)}. Alignment with these energies opens abundance channels.`,
                strengths: [`${jupiter} expansion luck`, `${venus} attraction power`],
                growth: [`Master ${saturn} money lessons`]
            };
        }
    },
    
    health: {
        title: "Wellness & Vitality Synthesis",
        icon: "💚",
        description: "The body-mind connection and path to optimal wellbeing",
        generate: function(chartData) {
            const sunSign = chartData.sunSign;
            const moonSign = chartData.moonSign;
            const marsSign = chartData.marsSign;
            const risingSign = chartData.risingSign || chartData.sunSign;
            const name = chartData.name;
            
            return {
                title: "Wellness & Vitality Blueprint",
                keywords: ['Health', 'Vitality', 'Body-Mind', 'Self-Care'],
                reading: `Vitality Source (Sun in ${sunSign}): The Sun represents core vitality. ${sunSign} Sun regenerates through ${getSunVitality(sunSign)}. When energy is low, returning to these activities restores life force.

Emotional Wellness (Moon in ${moonSign}): The Moon governs emotional health and physical responses to stress. ${moonSign} Moon needs ${getMoonWellness(moonSign)} for emotional equilibrium. Ignoring these needs depletes both emotional and physical resources.

Physical Body (${risingSign} Rising): The Rising Sign influences physical constitution and appearance. ${risingSign} Rising often has ${getRisingBody(risingSign)}. Physical activities that suit this constitution include ${getRisingExercise(risingSign)}.

Energy Expression (Mars in ${marsSign}): Mars rules physical energy and how it's best expressed. ${marsSign} Mars thrives with ${getMarsExercise(marsSign)}. This is how ${name} naturally wants to move and exert energy.

Wellness Integration: Optimal health comes from honoring ${sunSign} Sun's vitality needs, ${moonSign} Moon's emotional requirements, and ${marsSign} Mars's movement style. When these align, energy flows freely.

Self-Care Priorities: The most essential self-care practices for this chart include ${getHealthPriorities(sunSign, moonSign, risingSign)}.`,
                strengths: [`${sunSign} vitality`, `${marsSign} energy expression`],
                watchFor: [`${moonSign} emotional needs affecting physical health`]
            };
        }
    },
    
    communication: {
        title: "Communication Style Synthesis",
        icon: "💬",
        description: "How this soul expresses, learns, and connects through language",
        generate: function(chartData) {
            const mercury = chartData.mercurySign;
            const sunSign = chartData.sunSign;
            const moonSign = chartData.moonSign;
            const risingSign = chartData.risingSign || chartData.sunSign;
            const lifePath = chartData.lifePath;
            const name = chartData.name;
            
            return {
                title: "Communication & Learning Blueprint",
                keywords: ['Communication', 'Learning Style', 'Expression', 'Mental Gifts'],
                reading: `The Mind (Mercury in ${mercury}): Mercury governs thinking and communication. ${mercury} Mercury has ${getMercuryMindStyle(mercury)}. This child learns best through ${getMercuryLearning(mercury)} and communicates with ${getMercuryCommStyle(mercury)}.

Core Expression (Sun in ${sunSign}): The Sun influences what they want to communicate about. ${sunSign} Sun naturally talks about ${getSunTopics(sunSign)} and expresses ideas with ${getSunCommStyle(sunSign)}.

Emotional Communication (Moon in ${moonSign}): The Moon reveals how feelings are expressed. ${moonSign} Moon ${getMoonCommStyle(moonSign)}. Understanding this helps decode what they really mean versus what they say.

First Impressions (${risingSign} Rising): The Rising Sign colors initial communication. ${risingSign} Rising initially comes across as ${getRisingCommStyle(risingSign)}.

Learning Environment: This child thrives in learning environments that offer ${getLearningEnvironment(mercury, moonSign, lifePath)}. Traditional schooling may need to be supplemented with approaches that honor their unique mental wiring.

Communication Gifts: Natural talents include ${getCommGifts(mercury, sunSign, moonSign)}. These gifts can be developed into genuine strengths.

Parent Guidance: When communicating with ${name}, remember they process information ${getMercuryProcessing(mercury)}. Adjust your communication style to ${getParentCommTip(mercury, moonSign)}.`,
                strengths: [`${mercury} mental gifts`, `${sunSign} expression style`],
                tips: [`Honor ${moonSign} emotional communication needs`]
            };
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

// Additional helper functions for simplified synthesis
function getMoonSpiritual(sign) {
    const spiritual = {
        Aries: "bold emotional expression and intuitive action",
        Taurus: "grounded emotional wisdom and sensory intuition",
        Gemini: "curious emotional exploration and intellectual intuition",
        Cancer: "deep emotional sensitivity and psychic attunement",
        Leo: "heart-centered intuition and creative emotional expression",
        Virgo: "discerning emotional wisdom and service-oriented intuition",
        Libra: "balanced emotional perception and harmonious intuition",
        Scorpio: "profound emotional depth and transformative intuition",
        Sagittarius: "expansive emotional faith and philosophical intuition",
        Capricorn: "mature emotional wisdom and practical intuition",
        Aquarius: "unique emotional perspective and progressive intuition",
        Pisces: "boundless emotional compassion and mystical intuition"
    };
    return spiritual[sign] || "unique emotional-intuitive gifts";
}

function getSpiritualPracticeShort(northNode) {
    const practices = {
        Aries: "active meditation, movement practices",
        Taurus: "grounding, nature connection",
        Gemini: "journaling, learning, breath work",
        Cancer: "emotional processing, moon rituals",
        Leo: "creative expression, heart-opening",
        Virgo: "service meditation, health practices",
        Libra: "partner practices, beauty appreciation",
        Scorpio: "shadow work, transformation rituals",
        Sagittarius: "vision quests, philosophical study",
        Capricorn: "disciplined practice, goal-setting rituals",
        Aquarius: "group meditation, humanitarian focus",
        Pisces: "surrender practices, water rituals"
    };
    return practices[northNode] || "contemplative practices";
}

function getSaturnShadow(sign) {
    const shadows = {
        Aries: "fear of asserting self, hidden anger about not leading",
        Taurus: "scarcity fears, hidden material attachments",
        Gemini: "fear of being misunderstood, communication anxiety",
        Cancer: "emotional armor, hidden sensitivity",
        Leo: "hidden need for recognition, fear of shining",
        Virgo: "perfectionism paralysis, critical inner voice",
        Libra: "fear of rejection, hidden need for approval",
        Scorpio: "control issues, hidden power struggles",
        Sagittarius: "fear of limitation, hidden dogmatism",
        Capricorn: "workaholism, fear of failure",
        Aquarius: "detachment as defense, fear of intimacy",
        Pisces: "escapism, boundary confusion"
    };
    return shadows[sign] || "growth edge requiring conscious attention";
}

function getSunMoonShadow(sun, moon) {
    const sunElement = getElement(sun);
    const moonElement = getElement(moon);
    
    if (sunElement === moonElement) {
        return "natural internal harmony, though may need to develop complementary elements";
    } else if ((sunElement === 'Fire' && moonElement === 'Water') || (sunElement === 'Water' && moonElement === 'Fire')) {
        return "creative tension between action and emotion - learning to honor both";
    } else if ((sunElement === 'Earth' && moonElement === 'Air') || (sunElement === 'Air' && moonElement === 'Earth')) {
        return "balancing practical needs with intellectual desires";
    } else {
        return "complementary energies that create wholeness when integrated";
    }
}

function getElement(sign) {
    const elements = {
        Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
        Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
        Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
        Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
    };
    return elements[sign] || 'Fire';
}

function getShadowIntegrationSimple(saturn, sun, moon) {
    return `conscious work on ${saturn} lessons while honoring both ${sun} identity needs and ${moon} emotional needs`;
}

function getSaturnPattern(sign) {
    const patterns = {
        Aries: "avoiding initiative due to fear of failure",
        Taurus: "holding on too tightly to security",
        Gemini: "scattered energy avoiding depth",
        Cancer: "over-protecting or under-nurturing",
        Leo: "hiding light to avoid criticism",
        Virgo: "paralysis from perfectionism",
        Libra: "losing self in others' expectations",
        Scorpio: "power struggles masking vulnerability",
        Sagittarius: "over-promising, under-delivering",
        Capricorn: "achievement addiction",
        Aquarius: "emotional detachment as defense",
        Pisces: "boundary dissolution"
    };
    return patterns[sign] || "habitual limitation patterns";
}

// ============================================
// HELPER FUNCTIONS FOR HEALTH SYNTHESIS
// ============================================

function getSunVitality(sign) {
    const vitality = {
        Aries: "physical challenges, competition, new adventures, and being first at something",
        Taurus: "nature, good food, comfortable spaces, and sensory pleasures",
        Gemini: "mental stimulation, conversation, variety, and learning new things",
        Cancer: "home, family connection, water, and nurturing activities",
        Leo: "creative expression, play, appreciation, and joyful celebration",
        Virgo: "purposeful work, healthy routines, organization, and being of service",
        Libra: "beauty, harmony, partnership, and aesthetic experiences",
        Scorpio: "intensity, deep experiences, transformation, and emotional truth",
        Sagittarius: "adventure, freedom, travel, learning, and philosophical exploration",
        Capricorn: "achievement, goal completion, respect, and building something lasting",
        Aquarius: "intellectual stimulation, freedom, innovation, and being authentically unique",
        Pisces: "creativity, spiritual connection, imagination, and compassionate service"
    };
    return vitality[sign] || "authentic self-expression";
}

function getMoonWellness(sign) {
    const wellness = {
        Aries: "physical outlets for emotional energy and quick resolution of upsets",
        Taurus: "consistent routines, comfort objects, and sensory soothing",
        Gemini: "talking through feelings, mental stimulation, and social connection",
        Cancer: "family closeness, nurturing, and feeling emotionally held",
        Leo: "appreciation, creative play, and feeling special and seen",
        Virgo: "order, helpful activities, and practical expressions of care",
        Libra: "harmony in environment, beauty, and peaceful relationships",
        Scorpio: "emotional depth, privacy, and feelings being honored as valid",
        Sagittarius: "freedom, optimism, adventure, and meaning",
        Capricorn: "respect, achievement, and practical problem-solving for feelings",
        Aquarius: "acceptance of uniqueness, space, and intellectual engagement",
        Pisces: "imagination, gentleness, spiritual connection, and creative expression"
    };
    return wellness[sign] || "emotional attunement and care";
}

function getRisingBody(sign) {
    const bodies = {
        Aries: "athletic build, strong constitution, tendency toward heat, and high energy reserves",
        Taurus: "sturdy constitution, pleasant features, potential weight sensitivity, and strong endurance",
        Gemini: "youthful appearance, nervous system sensitivity, and need for variety in movement",
        Cancer: "round features, digestive sensitivity, and strong response to emotional-physical connection",
        Leo: "proud bearing, strong heart and spine, and vital constitution that responds to joy",
        Virgo: "refined features, digestive sensitivity, and body that responds to routine and purity",
        Libra: "symmetrical features, kidney and skin sensitivity, and need for balance in all things",
        Scorpio: "penetrating eyes, reproductive and elimination system focus, and intense energy reserves",
        Sagittarius: "athletic build, liver and thigh sensitivity, and body that needs movement and freedom",
        Capricorn: "strong bone structure, knees and joints sensitivity, and constitution that improves with age",
        Aquarius: "unusual features, circulatory and nervous sensitivity, and electric energy quality",
        Pisces: "soft features, feet and lymphatic sensitivity, and highly permeable energy field"
    };
    return bodies[sign] || "unique physical expression";
}

function getRisingExercise(sign) {
    const exercises = {
        Aries: "competitive sports, high-intensity intervals, martial arts, and challenging physical goals",
        Taurus: "walking in nature, yoga, swimming, and steady rhythmic activities",
        Gemini: "dance, activities with variety, sports that involve hand-eye coordination, and movement with mental engagement",
        Cancer: "swimming, water activities, yoga, and movement that feels emotionally safe",
        Leo: "dance, performance, team sports where they can shine, and joyful movement",
        Virgo: "precise activities like pilates, hiking, detailed sports, and movement with clear purpose",
        Libra: "dance, partner activities, beautiful exercise environments, and graceful movement",
        Scorpio: "intense workouts, martial arts, swimming, and transformative physical practices",
        Sagittarius: "outdoor adventures, hiking, horseback riding, team sports, and movement that feels like freedom",
        Capricorn: "climbing, structured routines, goal-oriented fitness, and activities that build strength over time",
        Aquarius: "unusual or innovative exercise, group fitness, and movement that feels uniquely their own",
        Pisces: "swimming, dance, yoga, tai chi, and fluid movement practices"
    };
    return exercises[sign] || "movement that honors their unique nature";
}

function getMarsExercise(sign) {
    const exercises = {
        Aries: "high-intensity, competitive, and challenging activities that let them push their edge",
        Taurus: "steady, sensory, and strength-building activities they can do at their own pace",
        Gemini: "varied activities that engage the mind alongside the body, changing things up often",
        Cancer: "activities that feel emotionally safe and connected, often home-based or with family",
        Leo: "activities where they can express themselves and receive appreciation, often creative or performance-based",
        Virgo: "precise, purposeful activities with clear technique to master and visible improvement",
        Libra: "partner activities, beautiful movement, and exercise that feels graceful rather than aggressive",
        Scorpio: "intense, transformative practices that let them push through limits and access power",
        Sagittarius: "adventurous, expansive activities with freedom and fun as primary features",
        Capricorn: "disciplined, goal-oriented training with clear progress markers and earned achievement",
        Aquarius: "unconventional, innovative activities that let them do things their own unique way",
        Pisces: "fluid, intuitive movement that feels more like art or meditation than exercise"
    };
    return exercises[sign] || "authentic physical expression";
}

function getHealthPriorities(sun, moon, rising) {
    return `honoring ${sun} Sun's energy needs, meeting ${moon} Moon's emotional requirements for physical balance, and respecting ${rising} Rising's physical constitution and exercise preferences`;
}

// ============================================
// HELPER FUNCTIONS FOR COMMUNICATION SYNTHESIS
// ============================================

function getMercuryMindStyle(sign) {
    const styles = {
        Aries: "quick, direct, and competitive mental energy — ideas come fast and are expressed immediately",
        Taurus: "methodical, practical, and sensory-based mental processing — ideas develop slowly but solidly",
        Gemini: "curious, versatile, and quick-witted mental agility — ideas multiply and connect rapidly",
        Cancer: "intuitive, memory-based, and emotionally-colored thinking — ideas are felt as much as thought",
        Leo: "creative, confident, and dramatic mental expression — ideas tend toward the grand and expressive",
        Virgo: "analytical, precise, and detail-oriented thinking — ideas are carefully examined and refined",
        Libra: "balanced, diplomatic, and relationship-aware thinking — ideas consider all perspectives",
        Scorpio: "deep, investigative, and penetrating thinking — ideas probe beneath surfaces",
        Sagittarius: "expansive, philosophical, and big-picture thinking — ideas reach toward meaning",
        Capricorn: "structured, strategic, and goal-oriented thinking — ideas serve practical purposes",
        Aquarius: "original, innovative, and unconventional thinking — ideas break from tradition",
        Pisces: "imaginative, intuitive, and poetic thinking — ideas blur boundaries between logic and intuition"
    };
    return styles[sign] || "unique mental expression";
}

function getMercuryLearning(sign) {
    const learning = {
        Aries: "hands-on experience, competition, and challenges that motivate quick mastery",
        Taurus: "repetition, sensory engagement, and slow steady progression at their own pace",
        Gemini: "variety, conversation, reading, and making connections between different subjects",
        Cancer: "emotional safety, personal connection to material, and learning through relationship",
        Leo: "creative engagement, drama, presentation, and learning through expression",
        Virgo: "systematic approach, detailed instruction, and practical application of knowledge",
        Libra: "discussion, debate, partnership learning, and beautiful learning environments",
        Scorpio: "deep investigation, discovering hidden knowledge, and learning through intensity",
        Sagittarius: "big-picture understanding first, freedom to explore, and learning through adventure",
        Capricorn: "structured curriculum, clear goals, and learning that leads to mastery",
        Aquarius: "unconventional methods, technology, group learning, and questioning established ideas",
        Pisces: "imagination, art, music, and learning through feeling and intuition"
    };
    return learning[sign] || "approaches that honor their unique mind";
}

function getMercuryCommStyle(sign) {
    const comm = {
        Aries: "directness, speed, and competitive edge — they say what they mean quickly",
        Taurus: "calm, measured, deliberate speech — they think before speaking and mean what they say",
        Gemini: "quick, varied, versatile communication — they talk about many things and adapt to their audience",
        Cancer: "emotionally attuned, nurturing communication — they communicate care and pick up on feelings",
        Leo: "warm, expressive, dramatic communication — they speak from the heart with natural performance",
        Virgo: "precise, helpful, detailed communication — they notice and articulate specifics",
        Libra: "diplomatic, pleasant, balanced communication — they consider others and seek harmony",
        Scorpio: "intense, probing, meaningful communication — they go deep or stay silent",
        Sagittarius: "enthusiastic, honest, expansive communication — they speak truth and inspire",
        Capricorn: "reserved, purposeful, authoritative communication — they speak when they have something worth saying",
        Aquarius: "unique, innovative, intellectual communication — they share unconventional perspectives",
        Pisces: "gentle, intuitive, imaginative communication — they communicate through feeling and imagery"
    };
    return comm[sign] || "authentic verbal expression";
}

function getSunTopics(sign) {
    const topics = {
        Aries: "achievements, adventures, competitions, and being first or best",
        Taurus: "beautiful things, comfort, nature, food, and what they're building",
        Gemini: "everything — ideas, information, gossip, questions, and interesting connections",
        Cancer: "family, feelings, home, memories, and people they care about",
        Leo: "creative projects, adventures, romance, and things they're proud of",
        Virgo: "improvements, health, work, details others missed, and helpful information",
        Libra: "relationships, fairness, beauty, and ideas from multiple perspectives",
        Scorpio: "depth, truth, mysteries, transformation, and what's really going on beneath surfaces",
        Sagittarius: "adventures, meaning, philosophy, truth, and what they're excited about",
        Capricorn: "goals, achievements, responsibilities, and things of substance",
        Aquarius: "ideas, innovations, social causes, and unique perspectives",
        Pisces: "dreams, feelings, art, spirituality, and imaginative possibilities"
    };
    return topics[sign] || "what matters to their authentic self";
}

function getSunCommStyle(sign) {
    const styles = {
        Aries: "confident, direct, enthusiastic energy",
        Taurus: "calm, grounded, sensible energy",
        Gemini: "curious, quick, adaptable energy",
        Cancer: "caring, protective, emotional energy",
        Leo: "warm, dramatic, generous energy",
        Virgo: "precise, helpful, thoughtful energy",
        Libra: "charming, balanced, diplomatic energy",
        Scorpio: "intense, penetrating, powerful energy",
        Sagittarius: "optimistic, honest, enthusiastic energy",
        Capricorn: "authoritative, practical, measured energy",
        Aquarius: "unique, innovative, intellectual energy",
        Pisces: "gentle, imaginative, compassionate energy"
    };
    return styles[sign] || "authentic expressive energy";
}

function getMoonCommStyle(sign) {
    const styles = {
        Aries: "expresses emotions quickly and directly, may seem aggressive when just being honest about feelings",
        Taurus: "expresses emotions slowly and steadily, may not talk about feelings readily but shows them through actions",
        Gemini: "talks about emotions readily, processes feelings by discussing them, may seem to change emotional positions",
        Cancer: "deeply emotional communication, may communicate indirectly through nurturing, very sensitive to tone",
        Leo: "expresses emotions dramatically and openly, needs emotional expression to be witnessed and valued",
        Virgo: "analyzes emotions before expressing, may help rather than emote, can be self-critical about feelings",
        Libra: "expresses emotions diplomatically, may suppress own feelings for harmony, sensitive to relationship dynamics",
        Scorpio: "guards emotions intensely, when they share feelings it's significant, very private about inner world",
        Sagittarius: "expresses emotions optimistically, may avoid heavy emotional processing, needs freedom in emotional expression",
        Capricorn: "reserved with emotions, may struggle to express vulnerability, more comfortable with respect than sentiment",
        Aquarius: "intellectual about emotions, may seem detached when processing feelings, needs freedom in emotional expression",
        Pisces: "deeply sensitive communication, may absorb others' emotions, expresses through art and imagination"
    };
    return styles[sign] || "unique emotional communication style";
}

function getRisingCommStyle(sign) {
    const styles = {
        Aries: "direct, confident, and energetic — people know immediately where they stand",
        Taurus: "calm, pleasant, and grounded — people feel settled in their presence",
        Gemini: "curious, engaging, and quick — people find them easy to talk to",
        Cancer: "warm, caring, and emotionally attuned — people feel nurtured by them",
        Leo: "confident, warm, and engaging — people notice and are drawn to them",
        Virgo: "helpful, thoughtful, and precise — people find them competent and caring",
        Libra: "charming, gracious, and balanced — people feel comfortable and appreciated",
        Scorpio: "intense, perceptive, and powerful — people sense depth and respect their presence",
        Sagittarius: "optimistic, open, and enthusiastic — people feel inspired and cheered",
        Capricorn: "capable, mature, and authoritative — people trust their competence",
        Aquarius: "unique, friendly, and intellectual — people find them interesting and refreshing",
        Pisces: "gentle, intuitive, and dreamy — people feel understood and accepted"
    };
    return styles[sign] || "unique first impression style";
}

function getLearningEnvironment(mercury, moon, lifePath) {
    return `${mercury} Mercury's mental needs (variety, structure, depth, etc.), ${moon} Moon's emotional safety requirements, and Life Path ${lifePath}'s learning purpose`;
}

function getCommGifts(mercury, sun, moon) {
    return `${mercury} Mercury's mental abilities combined with ${sun} Sun's expressive confidence and ${moon} Moon's emotional intelligence`;
}

function getMercuryProcessing(sign) {
    const processing = {
        Aries: "quickly and directly — give information in brief, action-oriented chunks",
        Taurus: "slowly and thoroughly — give time to process and repeat important information",
        Gemini: "rapidly and variably — engage multiple senses and approaches",
        Cancer: "emotionally — connect information to feelings and relationships",
        Leo: "dramatically — make learning fun, creative, and personally meaningful",
        Virgo: "analytically — provide details, systems, and practical applications",
        Libra: "relationally — discuss, debate, and consider multiple perspectives",
        Scorpio: "deeply — allow investigation and honor their need to understand fully",
        Sagittarius: "expansively — provide big picture first, then details",
        Capricorn: "practically — connect learning to goals and real-world application",
        Aquarius: "unconventionally — allow unique approaches and intellectual exploration",
        Pisces: "intuitively — use imagination, story, and feeling alongside logic"
    };
    return processing[sign] || "in their unique way";
}

function getParentCommTip(mercury, moon) {
    return `honor ${mercury} Mercury's thinking style and ${moon} Moon's emotional needs — both shape how communication lands`;
}

// ============================================
// PROGRESSIONS - Current Life Phase
// ============================================

var PROGRESSION_READINGS = {
    description: "Progressions show how the birth chart evolves over time - the unfolding of the soul's development",
    
    sun: {
        Aries: {
            title: "Progressed Sun in Aries - The Awakening Warrior",
            keywords: ['Initiative', 'New Beginnings', 'Courage', 'Identity Rebirth'],
            reading: `The Progressed Sun entering Aries marks one of the most significant turning points in the soul's development. This is a cosmic rebirth—a complete new cycle beginning that will color approximately 30 years of life (the time it takes to progress through one sign).

<strong>The Initiation:</strong> Something has awakened. A fire has been lit. The soul is being called from whatever came before into a brand-new chapter that requires courage, initiative, and the willingness to pioneer. There's an unmistakable sense of "time to start over" or "time to become myself."

<strong>The Energy:</strong> Everything becomes more direct, more action-oriented. Where before there may have been hesitation, now there's impulse. Where before there may have been dependency, now there's fierce independence. The soul is learning to trust its own instincts and act on them.

<strong>Current Development:</strong> Leadership abilities are being activated. The soul is developing the courage to go first, to act without a map, to trust that the path will appear by walking. Independence becomes not just desired but necessary.

<strong>The Challenge:</strong> Impatience, ego inflation, and the temptation to run over others in the rush to become. Learning to be assertive without being aggressive, independent without being isolated.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Aries, this soul will have developed an unshakeable core of self that knows how to initiate, how to lead, and how to begin again whenever necessary.`,
            evolution: ['Developing leadership', 'Learning self-assertion', 'Building authentic confidence', 'Pioneer identity']
        },
        Taurus: {
            title: "Progressed Sun in Taurus - The Grounded Builder",
            keywords: ['Stability', 'Building', 'Values', 'Patience'],
            reading: `The Progressed Sun entering Taurus signals a major shift from initiation to consolidation. After the fire of Aries comes the earth of Taurus—the soul is learning to build, to sustain, to create something that lasts.

<strong>The Grounding:</strong> Whatever was started in the Aries phase now needs roots. The soul is learning the value of patience, of steady progress, of building brick by brick rather than racing forward. This is a slower, more deliberate energy.

<strong>The Energy:</strong> Sensory awareness heightens. Beauty matters more. Comfort becomes important. The soul is developing appreciation for the physical world—nature, art, food, touch. There's a settling into the body that may not have been present before.

<strong>Current Development:</strong> Values are being clarified. What really matters becomes clear. The soul is developing the ability to assess worth—both material value and self-worth. Building financial security or establishing material foundations becomes important.

<strong>The Challenge:</strong> Stubbornness, resistance to necessary change, and over-attachment to comfort. Learning to be stable without being stuck, patient without being stagnant.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Taurus, this soul will know its own worth, have developed patience, and understand how to build things that last.`,
            evolution: ['Developing patience', 'Building lasting security', 'Clarifying core values', 'Grounding the self']
        },
        Gemini: {
            title: "Progressed Sun in Gemini - The Curious Learner",
            keywords: ['Learning', 'Communication', 'Curiosity', 'Mental Expansion'],
            reading: `The Progressed Sun entering Gemini activates the mind and communication centers. After the grounding of Taurus comes the mental quickening of Gemini—the soul is learning to think, communicate, and connect.

<strong>The Awakening Mind:</strong> Suddenly there's so much to learn, so many questions to ask, so many connections to make. The soul that may have been content with steady building now craves mental stimulation and variety.

<strong>The Energy:</strong> Everything speeds up mentally. Curiosity becomes insatiable. There's a need to know, to communicate, to exchange ideas. Writing, speaking, learning—any form of information exchange becomes compelling.

<strong>Current Development:</strong> Communication skills are being honed. The soul is learning how to express ideas, how to listen actively, how to make connections between disparate pieces of information. The mind becomes a tool of growth.

<strong>The Challenge:</strong> Scattered attention, superficiality, and the tendency to know a little about everything but deeply about nothing. Learning to focus the brilliant mind and follow through on what is started.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Gemini, this soul will have developed powerful communication abilities, a versatile mind, and the capacity to make connections that others miss.`,
            evolution: ['Developing communication mastery', 'Expanding knowledge base', 'Building diverse connections', 'Mental agility']
        },
        Cancer: {
            title: "Progressed Sun in Cancer - The Emotional Deepening",
            keywords: ['Nurturing', 'Emotional Depth', 'Home', 'Family'],
            reading: `The Progressed Sun entering Cancer signals a profound emotional awakening. After the mental expansion of Gemini comes the heart-opening of Cancer—the soul is learning to feel, to nurture, to create belonging.

<strong>The Heart Opening:</strong> Emotions that may have been kept at bay or processed intellectually now demand to be felt. The soul is developing emotional depth, learning that feelings are not obstacles but essential information.

<strong>The Energy:</strong> Home and family become central concerns. There's a need to create sanctuary, to nurture and be nurtured, to belong somewhere. The past becomes important—family history, roots, heritage.

<strong>Current Development:</strong> Emotional intelligence is being developed. The soul is learning to attune to feelings—their own and others'. Nurturing abilities emerge, along with the capacity to create safe spaces.

<strong>The Challenge:</strong> Over-sensitivity, moodiness, and the tendency to retreat into the shell when threatened. Learning to protect the heart without armoring it entirely.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Cancer, this soul will have developed profound emotional intelligence, the capacity to nurture, and the knowledge that home is ultimately an internal state.`,
            evolution: ['Deepening emotional intelligence', 'Creating true home', 'Developing nurturing capacity', 'Healing family patterns']
        },
        Leo: {
            title: "Progressed Sun in Leo - The Creative Flowering",
            keywords: ['Creativity', 'Self-Expression', 'Heart-Centered Living', 'Joy'],
            reading: `The Progressed Sun entering Leo activates creative self-expression and heart-centered living. After the emotional deepening of Cancer comes the radiant self-expression of Leo—the soul is learning to shine.

<strong>The Creative Awakening:</strong> Something creative wants to be born. The soul feels compelled to express, to create, to share its unique light. Hiding is no longer an option; visibility becomes necessary for growth.

<strong>The Energy:</strong> Confidence builds. There's a warmth, a generosity, a natural magnetism that develops. Creative projects call. Romance may flourish. Joy becomes a legitimate pursuit rather than a luxury.

<strong>Current Development:</strong> The soul is learning to express authentically without apology. Creative abilities are being developed and shared. The courage to be seen, to perform, to risk rejection for the sake of authentic expression.

<strong>The Challenge:</strong> Ego inflation, need for constant attention, and the tendency to make everything about self. Learning to shine without requiring applause, to express without demanding validation.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Leo, this soul will have developed creative confidence, the courage to be fully visible, and the ability to inspire others through authentic self-expression.`,
            evolution: ['Expressing authentic creativity', 'Building heart-centered confidence', 'Following joy', 'Inspiring others through being']
        },
        Virgo: {
            title: "Progressed Sun in Virgo - The Sacred Craftsperson",
            keywords: ['Service', 'Skill Development', 'Health', 'Practical Wisdom'],
            reading: `The Progressed Sun entering Virgo focuses energy on skill development, service, and practical improvement. After the creative expansion of Leo comes the refinement of Virgo—the soul is learning to perfect its craft.

<strong>The Refinement:</strong> What was created now needs polishing. The soul develops an eye for detail, a desire to improve, and a genuine interest in being useful. Service becomes meaningful rather than obligatory.

<strong>The Energy:</strong> Health and daily routines become important. There's attention to what works and what doesn't, what helps and what hinders. The body becomes a priority as the vehicle for doing good work.

<strong>Current Development:</strong> Skills are being honed to mastery. The soul is learning the sacredness of ordinary work done well. Service is understood not as servitude but as the highest expression of care.

<strong>The Challenge:</strong> Perfectionism, self-criticism, and the tendency to notice what's wrong while missing what's right. Learning to improve without being paralyzed by imperfection.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Virgo, this soul will have developed genuine mastery in chosen areas, an understanding of sacred service, and the knowledge that the divine lives in the details.`,
            evolution: ['Developing practical mastery', 'Refining health practices', 'Learning sacred service', 'Perfecting craft']
        },
        Libra: {
            title: "Progressed Sun in Libra - The Relationship Artist",
            keywords: ['Partnership', 'Balance', 'Harmony', 'Social Grace'],
            reading: `The Progressed Sun entering Libra shifts focus to relationships and the art of balance. After the service-oriented Virgo phase comes the partnership-focused Libra—the soul is learning to relate, to harmonize, to find beauty in connection.

<strong>The Partnership Focus:</strong> Others become mirrors for self-understanding. The soul is drawn to significant partnerships and is learning that some growth can only happen through relationship.

<strong>The Energy:</strong> Social awareness heightens. There's a new appreciation for beauty, harmony, and balance. Conflict becomes uncomfortable as the soul seeks ways to create peace and fairness.

<strong>Current Development:</strong> Relationship skills are being developed. The soul is learning diplomacy, compromise, and the art of seeing both sides. The ability to create harmony without losing self.

<strong>The Challenge:</strong> People-pleasing, indecision, and losing self in partnerships. Learning to relate deeply while maintaining identity, to seek harmony without abandoning truth.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Libra, this soul will have developed refined relationship skills, an aesthetic sense, and the ability to create beauty and harmony wherever it goes.`,
            evolution: ['Mastering partnership dynamics', 'Developing diplomatic wisdom', 'Creating aesthetic beauty', 'Balancing self and other']
        },
        Scorpio: {
            title: "Progressed Sun in Scorpio - The Deep Transformer",
            keywords: ['Transformation', 'Psychological Depth', 'Intensity', 'Regeneration'],
            reading: `The Progressed Sun entering Scorpio initiates a period of profound transformation. After the social refinement of Libra comes the depth-seeking intensity of Scorpio—the soul is learning to face darkness and emerge transformed.

<strong>The Descent:</strong> Something needs to die for something new to be born. The soul is called into the underworld of the psyche—confronting shadows, releasing what no longer serves, and finding power in the depths.

<strong>The Energy:</strong> Everything becomes more intense. Superficiality is intolerable. There's a need to understand the hidden workings, the psychological depths, the transformative power of facing what has been denied.

<strong>Current Development:</strong> The soul is developing psychological depth and the courage to face shadow material. Power is being reclaimed from where it was lost. Intimacy becomes the arena of growth.

<strong>The Challenge:</strong> Obsession, manipulation, and getting lost in darkness. Learning to transform without destroying, to go deep without drowning, to claim power without misusing it.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Scorpio, this soul will have undergone genuine transformation, developed psychological power, and learned that facing darkness is the path to light.`,
            evolution: ['Developing transformative power', 'Mastering psychological depths', 'Building regenerative strength', 'Facing and integrating shadow']
        },
        Sagittarius: {
            title: "Progressed Sun in Sagittarius - The Truth Seeker",
            keywords: ['Expansion', 'Faith', 'Adventure', 'Meaning-Making'],
            reading: `The Progressed Sun entering Sagittarius expands horizons and develops faith. After the intense depth of Scorpio comes the soaring expansion of Sagittarius—the soul is learning to reach for meaning, adventure, and truth.

<strong>The Expansion:</strong> After going deep, now the soul needs to go wide. There's a hunger for meaning, for adventure, for understanding how all the pieces fit together. Horizons expand in every direction.

<strong>The Energy:</strong> Optimism returns or develops. There's faith that things work out, that life has meaning, that the journey is worth taking. Travel, learning, and philosophical exploration all call.

<strong>Current Development:</strong> The soul is developing a personal philosophy, a sense of meaning that guides decisions. Faith is being tested and strengthened. The teacher within is awakening.

<strong>The Challenge:</strong> Over-extension, preachiness, and the tendency to see the horizon while missing what's right here. Learning to expand without escaping, to seek meaning without forcing answers.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Sagittarius, this soul will have developed genuine wisdom, a personal philosophy, and the ability to inspire others toward their own truths.`,
            evolution: ['Expanding worldview', 'Developing personal philosophy', 'Building faith', 'Becoming a truth-seeker']
        },
        Capricorn: {
            title: "Progressed Sun in Capricorn - The Master Achiever",
            keywords: ['Achievement', 'Discipline', 'Responsibility', 'Legacy Building'],
            reading: `The Progressed Sun entering Capricorn focuses energy on achievement and legacy building. After the expansive seeking of Sagittarius comes the disciplined building of Capricorn—the soul is learning to manifest real-world results.

<strong>The Achievement Call:</strong> It's time to build something that lasts. The soul feels called to take responsibility, to work toward long-term goals, to create something that will stand the test of time.

<strong>The Energy:</strong> Patience and persistence develop. There's willingness to delay gratification for larger goals. Authority becomes important—earning it, accepting it, using it wisely.

<strong>Current Development:</strong> The soul is developing the ability to plan and execute long-term projects. Discipline becomes a ally rather than a constraint. The satisfaction of real achievement becomes the reward.

<strong>The Challenge:</strong> Workaholism, coldness, and the tendency to sacrifice personal life for achievement. Learning to build without becoming the work, to achieve without losing heart.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Capricorn, this soul will have developed genuine mastery, earned authority, and built something that contributes beyond individual life.`,
            evolution: ['Building lasting achievement', 'Developing strategic discipline', 'Earning authentic authority', 'Creating meaningful legacy']
        },
        Aquarius: {
            title: "Progressed Sun in Aquarius - The Visionary Revolutionary",
            keywords: ['Innovation', 'Freedom', 'Community', 'Authentic Uniqueness'],
            reading: `The Progressed Sun entering Aquarius activates uniqueness and humanitarian vision. After the structured building of Capricorn comes the revolutionary freedom of Aquarius—the soul is learning to innovate and serve the collective.

<strong>The Liberation:</strong> Something breaks free. Rules that once seemed necessary now feel confining. The soul is discovering its own unique rhythm, its own original contribution, its own unconventional path.

<strong>The Energy:</strong> Innovation becomes natural. There's attraction to the new, the different, the progressive. Community and friendship matter, but not at the cost of individuality.

<strong>Current Development:</strong> The soul is developing the courage to be genuinely unique, not just different for its own sake. Vision for the future emerges. Service to the collective becomes meaningful.

<strong>The Challenge:</strong> Disconnection, rebellion for its own sake, and the tendency to value uniqueness over connection. Learning to be individual while remaining human, to innovate while staying grounded.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Aquarius, this soul will have embraced its authentic uniqueness, developed vision for collective benefit, and learned to be both individual and belonging.`,
            evolution: ['Embracing authentic uniqueness', 'Developing humanitarian vision', 'Innovating meaningfully', 'Serving collective evolution']
        },
        Pisces: {
            title: "Progressed Sun in Pisces - The Spiritual Completion",
            keywords: ['Spirituality', 'Compassion', 'Intuition', 'Transcendent Unity'],
            reading: `The Progressed Sun entering Pisces deepens spirituality and compassion. After the individuating freedom of Aquarius comes the dissolving boundaries of Pisces—the soul is learning to merge, to surrender, to return to source.

<strong>The Dissolution:</strong> Boundaries that once seemed essential begin to dissolve. The soul is learning that separation is illusion, that compassion is natural, that surrender can be strength.

<strong>The Energy:</strong> Intuition heightens. Dreams become meaningful. There's sensitivity to the unseen, the subtle, the spiritual. Art, music, and mystical experience all call.

<strong>Current Development:</strong> The soul is developing spiritual awareness and the capacity for unconditional compassion. Ego boundaries soften. Connection to something larger than self becomes real.

<strong>The Challenge:</strong> Escapism, victimhood, and the tendency to dissolve too completely. Learning to transcend without escaping, to surrender without losing, to be spiritual while remaining embodied.

<strong>The Gift:</strong> By the time the Progressed Sun leaves Pisces, this soul will have developed genuine spiritual wisdom, the capacity for boundless compassion, and the knowing that separation was always illusion.`,
            evolution: ['Developing spiritual depth', 'Cultivating boundless compassion', 'Surrendering to flow', 'Merging with the infinite']
        }
    },
    
    moon: {
        Aries: {
            title: "Progressed Moon in Aries - Emotional Ignition",
            keywords: ['Emotional Independence', 'New Feelings', 'Courage', 'Fresh Start'],
            reading: `The Progressed Moon in Aries marks an emotional new beginning. For approximately 2.5 years, the emotional body is being renewed, energized, and called to independence.

<strong>The Emotional Climate:</strong> Feelings are direct, immediate, and action-oriented. There's no patience for processing endlessly—emotions want to be expressed and moved. This is a time of emotional courage.

<strong>Current Needs:</strong> Freedom to feel what is felt without censorship. Space to be emotionally independent. Permission to start fresh emotionally. Action that expresses feelings rather than suppresses them.

<strong>The Growth:</strong> Learning to honor immediate emotional responses. Developing the courage to feel fully without analyzing. Trusting emotional instincts.`,
            currentNeeds: ['Emotional freedom', 'New emotional experiences', 'Direct expression', 'Independence']
        },
        Taurus: {
            title: "Progressed Moon in Taurus - Emotional Grounding",
            keywords: ['Emotional Security', 'Comfort', 'Stability', 'Sensory Satisfaction'],
            reading: `The Progressed Moon in Taurus brings emotional stabilization and the need for comfort. For approximately 2.5 years, the emotional body is seeking security, pleasure, and sensory satisfaction.

<strong>The Emotional Climate:</strong> Feelings slow down and deepen. There's need for consistency, reliability, and the comfort of routine. Emotions are processed through the body—through touch, taste, beauty.

<strong>Current Needs:</strong> Physical comfort and sensory pleasure. Financial and material security. Consistency in emotional environment. Time to process feelings slowly.

<strong>The Growth:</strong> Learning that emotional security comes from within. Developing appreciation for simple pleasures. Building emotional resilience through stability.`,
            currentNeeds: ['Physical comfort', 'Material security', 'Slow processing time', 'Sensory satisfaction']
        },
        Gemini: {
            title: "Progressed Moon in Gemini - Emotional Curiosity",
            keywords: ['Emotional Variety', 'Communication', 'Mental Processing', 'Social Connection'],
            reading: `The Progressed Moon in Gemini stimulates emotional curiosity and the need for communication. For approximately 2.5 years, feelings are processed through talking, thinking, and connecting.

<strong>The Emotional Climate:</strong> Emotions become more mental. There's need to understand feelings, to talk about them, to gather information about them. Variety in emotional experiences is sought rather than depth.

<strong>Current Needs:</strong> Verbal processing of emotions. Mental stimulation alongside emotional engagement. Variety and change. Social connection.

<strong>The Growth:</strong> Learning to communicate feelings effectively. Developing emotional flexibility. Understanding that thinking about feelings is one valid way to process them.`,
            currentNeeds: ['Communication', 'Mental stimulation', 'Emotional variety', 'Social processing']
        },
        Cancer: {
            title: "Progressed Moon in Cancer - Emotional Deepening",
            keywords: ['Emotional Depth', 'Home', 'Nurturing', 'Family'],
            reading: `The Progressed Moon in Cancer brings emotional deepening and heightened sensitivity. For approximately 2.5 years, the soul is called home to the heart, to family, to the depths of feeling.

<strong>The Emotional Climate:</strong> Sensitivity increases dramatically. Feelings are felt more deeply, more personally. There's need for safety, for nurturing, for emotional connection that goes beyond surface.

<strong>Current Needs:</strong> Emotional safety and nurturing. Family connection or creating family. Time to process feelings fully. Permission to be sensitive.

<strong>The Growth:</strong> Learning to honor sensitivity as a gift. Developing capacity to nurture self and others. Understanding emotional needs as legitimate.`,
            currentNeeds: ['Emotional safety', 'Nurturing connection', 'Home sanctuary', 'Deep feeling']
        },
        Leo: {
            title: "Progressed Moon in Leo - Emotional Radiance",
            keywords: ['Emotional Expression', 'Joy', 'Recognition', 'Heart Opening'],
            reading: `The Progressed Moon in Leo brightens the emotional landscape and calls for creative expression of feelings. For approximately 2.5 years, the heart opens and demands to be seen.

<strong>The Emotional Climate:</strong> Feelings become warmer, more dramatic, more expressive. There's no desire to hide emotions—they want to be performed, celebrated, shared. The heart leads.

<strong>Current Needs:</strong> Recognition and appreciation. Creative outlets for emotions. Play, romance, and joy. Permission to be the center of attention emotionally.

<strong>The Growth:</strong> Learning that emotional expression is a gift, not a weakness. Developing the courage to show the heart fully. Understanding that joy is a legitimate emotional need.`,
            currentNeeds: ['Recognition', 'Creative expression', 'Warmth', 'Appreciation']
        },
        Virgo: {
            title: "Progressed Moon in Virgo - Emotional Refinement",
            keywords: ['Emotional Service', 'Analysis', 'Improvement', 'Practical Care'],
            reading: `The Progressed Moon in Virgo brings emotional focus on service, improvement, and practical expression of care. For approximately 2.5 years, feelings are processed through action and analysis.

<strong>The Emotional Climate:</strong> Feelings become more analytical, more concerned with practical expression. There's need to improve, to be useful, to show love through doing. Emotions seek practical outlets.

<strong>Current Needs:</strong> Being helpful and useful. Order and organization in emotional environment. Practical ways to show care. Health and routine.

<strong>The Growth:</strong> Learning that service is love in action. Developing the ability to improve without criticizing. Understanding that small acts of care are emotionally significant.`,
            currentNeeds: ['Being helpful', 'Order', 'Practical care', 'Health focus']
        },
        Libra: {
            title: "Progressed Moon in Libra - Emotional Harmony",
            keywords: ['Emotional Balance', 'Partnership', 'Harmony', 'Beauty'],
            reading: `The Progressed Moon in Libra seeks emotional balance and partnership harmony. For approximately 2.5 years, relationships become the primary arena for emotional processing.

<strong>The Emotional Climate:</strong> Feelings want to be shared, balanced, harmonized. Conflict becomes emotionally unbearable. There's strong need for fairness and beauty in all emotional exchanges.

<strong>Current Needs:</strong> Partnership and significant relationship. Harmony in environment. Beauty and aesthetics. Fair treatment in emotional matters.

<strong>The Growth:</strong> Learning to balance own needs with others'. Developing diplomatic emotional expression. Understanding that beauty in environment affects emotional wellbeing.`,
            currentNeeds: ['Partnership', 'Harmony', 'Beauty', 'Fairness']
        },
        Scorpio: {
            title: "Progressed Moon in Scorpio - Emotional Depth",
            keywords: ['Emotional Intensity', 'Depth', 'Transformation', 'Truth'],
            reading: `The Progressed Moon in Scorpio intensifies the entire emotional experience. For approximately 2.5 years, feelings run deeper than ever, demanding truth, transformation, and authentic connection.

<strong>The Emotional Climate:</strong> Surface emotions are intolerable. There's need to go deep, to understand the psychology behind feelings, to transform patterns that no longer serve. Intensity is the default.

<strong>Current Needs:</strong> Emotional truth and authenticity. Deep intimate connection. Space to transform old patterns. Permission to feel intensely.

<strong>The Growth:</strong> Learning that emotional depth is strength. Developing the capacity to transform pain into power. Understanding that facing emotional truth is the path to freedom.`,
            currentNeeds: ['Emotional depth', 'Truth', 'Transformation', 'Intimacy']
        },
        Sagittarius: {
            title: "Progressed Moon in Sagittarius - Emotional Expansion",
            keywords: ['Emotional Freedom', 'Adventure', 'Faith', 'Optimism'],
            reading: `The Progressed Moon in Sagittarius lightens and expands the emotional landscape. For approximately 2.5 years, feelings seek adventure, meaning, and freedom.

<strong>The Emotional Climate:</strong> Emotions become more optimistic, more adventurous, more philosophical. Heavy feelings are processed through meaning-making. There's need for emotional freedom and expansion.

<strong>Current Needs:</strong> Freedom and space for feelings. Adventure and new experiences. Meaning and philosophical context for emotions. Optimism and hope.

<strong>The Growth:</strong> Learning that emotions can be teachers of truth. Developing faith that feelings will work out. Understanding that emotional expansion requires risk.`,
            currentNeeds: ['Freedom', 'Adventure', 'Optimism', 'Meaning']
        },
        Capricorn: {
            title: "Progressed Moon in Capricorn - Emotional Maturity",
            keywords: ['Emotional Maturity', 'Responsibility', 'Achievement', 'Structure'],
            reading: `The Progressed Moon in Capricorn brings emotional maturity and self-reliance. For approximately 2.5 years, feelings become more contained, more goal-oriented, more serious.

<strong>The Emotional Climate:</strong> Emotions are managed rather than freely expressed. There's need for emotional achievement, for mastering feelings, for responsible emotional behavior. The inner parent strengthens.

<strong>Current Needs:</strong> Achievement and accomplishment. Structure and predictability. Respect from self and others. Emotional self-reliance.

<strong>The Growth:</strong> Learning that emotional maturity is powerful. Developing the capacity to contain feelings appropriately. Understanding that emotional responsibility builds trust.`,
            currentNeeds: ['Achievement', 'Structure', 'Respect', 'Responsibility']
        },
        Aquarius: {
            title: "Progressed Moon in Aquarius - Emotional Liberation",
            keywords: ['Emotional Independence', 'Uniqueness', 'Community', 'Objectivity'],
            reading: `The Progressed Moon in Aquarius brings emotional objectivity and the need for space. For approximately 2.5 years, feelings are processed through intellect and community rather than intimacy.

<strong>The Emotional Climate:</strong> Emotions become more detached, more objective. There's need to understand feelings intellectually, to have space for processing, to connect emotionally through friendship rather than intensity.

<strong>Current Needs:</strong> Emotional space and independence. Intellectual processing of feelings. Community and friendship. Permission to be emotionally unique.

<strong>The Growth:</strong> Learning that emotional detachment can be healthy. Developing capacity to feel while remaining objective. Understanding that friendship is an emotionally valid need.`,
            currentNeeds: ['Space', 'Uniqueness', 'Friendship', 'Intellectual processing']
        },
        Pisces: {
            title: "Progressed Moon in Pisces - Emotional Transcendence",
            keywords: ['Emotional Sensitivity', 'Intuition', 'Compassion', 'Spirituality'],
            reading: `The Progressed Moon in Pisces heightens emotional sensitivity to its peak. For approximately 2.5 years, feelings become boundless, intuitive, and spiritually connected.

<strong>The Emotional Climate:</strong> Boundaries between self and other dissolve emotionally. There's profound sensitivity to everything—others' feelings, environmental energies, spiritual impressions. Compassion expands infinitely.

<strong>Current Needs:</strong> Spiritual connection and meaning. Artistic and imaginative outlets. Compassion expressed and received. Time for dreams and retreat.

<strong>The Growth:</strong> Learning that emotional boundlessness is a gift. Developing capacity to feel universally while remaining grounded. Understanding that sensitivity serves healing.`,
            currentNeeds: ['Spiritual connection', 'Compassion', 'Dream time', 'Artistic expression']
        }
    }
};

// ============================================
// COSMIC WRAP-UP - The Great Summary
// ============================================

var COSMIC_WRAPUP = {
    title: "The Complete Moment in Time",
    icon: "",
    
    generate: function(data) {
        // data is a flat object with: name, sunSign, moonSign, risingSign, lifePath, northNode, chineseZodiac, etc.
        const name = data.name;
        const sunSign = data.sunSign;
        const moonSign = data.moonSign;
        const risingSign = data.risingSign || 'Unknown';
        const lifePath = data.lifePath;
        const northNode = data.northNode;
        const chineseZodiac = data.chineseZodiac;
        const moonPhase = data.moonPhase || 'Unknown';
        const sunElement = data.sunElement || getElement(sunSign);
        const moonElement = data.moonElement || getElement(moonSign);
        const mercurySign = data.mercurySign;
        const venusSign = data.venusSign;
        const marsSign = data.marsSign;
        
        // Get deep reading data if available
        const deepSun = (typeof DEEP_SUN_READINGS !== 'undefined') ? DEEP_SUN_READINGS[sunSign] : null;
        const deepMoon = (typeof DEEP_MOON_READINGS !== 'undefined') ? DEEP_MOON_READINGS[moonSign] : null;
        const deepRising = (typeof DEEP_RISING_READINGS !== 'undefined') ? DEEP_RISING_READINGS[risingSign] : null;
        
        const opening = `FROM THE STARS TO YOUR ARMS

    On the day ${name} took their first breath, the cosmos aligned in a pattern that has never existed before and will never exist again. This isn't metaphor—it's mathematical precision. The exact positions of Sun, Moon, planets, and stars at that moment created a celestial fingerprint as unique as the lines on ${name}'s tiny hands.

    What follows is ${name}'s energetic birth certificate—the moment in time that describes not who they must become, but who they already ARE at their deepest level. These patterns don't limit; they illuminate. They don't predict; they empower.`;
        
        const coreEssence = `THE THREE PILLARS OF SELF

    Every human operates from three interconnected energy centers. In ${name}, these are:

    THE SUN IN ${sunSign.toUpperCase()}: The Core Light
${deepSun ? deepSun.hook : getSunSummary(sunSign)}
This is ${name}'s life force—the energy they're here to radiate into the world. Every ${sunSign} Sun is born with a mission: ${deepSun ? deepSun.lifeLesson : 'to shine their unique light'}. Their greatest power lies in ${deepSun ? deepSun.creativeExpression : 'expressing their authentic self'}.

${deepSun ? `The ${sunSign} Sun needs: ` + deepSun.parentGuidance : ''}

THE MOON IN ${moonSign.toUpperCase()}: The Inner Sanctuary  
${deepMoon ? deepMoon.hook : getMoonSummary(moonSign)}
This is ${name}'s emotional operating system—how they process feelings, what makes them feel safe, and how they'll need to be comforted. When ${name} cries, they're speaking in ${moonSign} Moon language. ${deepMoon ? deepMoon.parentGuidance : ''}

${risingSign !== 'Unknown' ? `${risingSign.toUpperCase()} RISING: The Outer Expression` : 'THE ASCENDANT'}
${risingSign !== 'Unknown' ? (deepRising ? deepRising.firstImpression : getRisingSummary(risingSign)) : 'Unknown at birth—requires birth time.'}
${risingSign !== 'Unknown' ? `This is how the world will first perceive ${name}. As they grow, they'll develop this persona as their interface with the world. ${deepRising ? deepRising.lifeApproach : ''}` : 'The Rising Sign reveals how others first perceive this soul.'}`;
        
        const soulPath = `THE SOUL'S JOURNEY

LIFE PATH ${lifePath}: ${getLifePathTitle(lifePath)}
${name}'s entire life will be shaped by the lessons and gifts of the number ${lifePath}. This isn't random—it's calculated from the precise mathematics of their birthdate. ${getLifePathPurpose(lifePath)}.

This means ${name} is here to:
• ${getLifePathLesson1(lifePath)}
• ${getLifePathLesson2(lifePath)}  
• ${getLifePathLesson3(lifePath)}

THE NORTH NODE IN ${northNode.toUpperCase()}: The Soul's Growth Edge
While the Life Path shows the journey, the North Node reveals WHERE that journey leads. ${name}'s soul is evolving toward ${getNorthNodePurpose(northNode)}. This is uncomfortable territory—it's the edge of growth. The opposite sign represents familiar patterns they're learning to balance.

THE YEAR OF THE ${chineseZodiac.toUpperCase()}: Eastern Wisdom
${name} carries the ancient energy of the ${chineseZodiac}. ${getChineseSummary(chineseZodiac)}. In Chinese astrology, this influences personality, compatibility, and fortune throughout life.

${moonPhase !== 'Unknown' ? `BORN UNDER THE ${moonPhase.toUpperCase()} MOON
The lunar phase at birth carries significance: ${getMoonPhaseMeaning(moonPhase)}.` : ''}`;
        
        const gifts = `THE GIFTS ${name.toUpperCase()} BRINGS

    ${name} didn't arrive empty-handed. The moment in time reveals specific gifts:

From their ${sunSign} Sun: ${deepSun ? deepSun.affirmation : 'The gift of authentic self-expression'}

From their ${moonSign} Moon: ${deepMoon ? 'The power of ' + deepMoon.power : 'Deep emotional wisdom'}

From their ${risingSign !== 'Unknown' ? risingSign : 'Rising'} Ascendant: ${deepRising ? 'The gift of ' + deepRising.gift : 'Unique presence in the world'}

From Life Path ${lifePath}: ${getLifePathGift(lifePath)}

THE ELEMENTAL BALANCE
${name} carries ${sunElement} at their core (Sun) and ${moonElement} in their emotional nature (Moon). ${getElementCombination(sunElement, moonElement)}

INNER PLANET SIGNATURES
• Mercury in ${mercurySign}: ${getMercurySummary(mercurySign)} (how they think and communicate)
• Venus in ${venusSign}: ${getVenusSummary(venusSign)} (how they love and create beauty)
• Mars in ${marsSign}: ${getMarsSummary(marsSign)} (how they act and assert themselves)`;
        
        const closing = `THE SACRED BLESSING

Dear ${name},

Before you could speak, before you could walk, before you knew your own name, you were already complete. The stars arranged themselves to witness your arrival. The planets moved to their positions to greet you. The numbers aligned to create your unique frequency.

You are not an accident. You are not random. You are a precise event in the cosmic story—a note in the universal symphony that only you can play.

Your ${sunSign} Sun will illuminate the world. Your ${moonSign} Moon will guide you home to yourself. Your Life Path ${lifePath} will reveal your purpose. And all of it together—the aspects, the houses, the numbers, the elements—creates a being who has never existed before and will never exist again.

The challenges in your chart aren't punishments; they're invitations to grow. The squares and oppositions are diamonds in the rough. The difficult placements are strengths disguised, waiting for you to discover them.

You chose this time.
You chose these parents.
You chose this blueprint.

And now the adventure begins.

Welcome to Earth, beloved ${name}. The universe has been waiting for you.`;
        
        const parentGuidance = `FOR ${name.toUpperCase()}'S PARENTS & GUARDIANS

    Understanding this moment in time is a gift—not a cage. Here's how to use it:

THE ${sunSign} SUN NEEDS:
${getSunNeed(sunSign)}. Honor their core nature by providing ${getSunNeedSpecific(sunSign)}.

THE ${moonSign} MOON NEEDS:
${getMoonNeed(moonSign)}. When they're upset, they'll respond best to ${getMoonComfortSpecific(moonSign)}.

${risingSign !== 'Unknown' ? `THE ${risingSign} RISING NEEDS:
Understanding that the way they present may differ from their inner nature. Their ${risingSign} outer expression is how they learn to navigate the world.` : ''}

LIFE PATH ${lifePath} NEEDS:
Opportunities to ${getLifePathNeed(lifePath)}. Their soul is oriented toward ${getLifePathPurpose(lifePath)}.

REMEMBER:
• This reading illuminates—it doesn't determine
• Free will always supersedes cosmic patterns  
• ${name} is more than any chart can capture
• Trust what you observe directly in your unique child
• The stars incline; they do not compel

Your job isn't to change who ${name} is. It's to create the conditions where who they already are can flourish.

You were chosen for this sacred role. Trust yourself. Trust ${name}. Trust the cosmos that brought you together.`;
        
        return {
            title: `The Complete Moment in Time for ${name}`,
            keywords: ['Soul Essence', 'Life Purpose', 'Celestial Gifts', 'Celestial Design'],
            opening: opening,
            coreEssence: coreEssence,
            soulPath: soulPath,
            gifts: gifts,
            closing: closing,
            parentGuidance: parentGuidance,
            affirmations: [
                `${name} is exactly who they were meant to be`,
                `Every aspect of ${name}'s chart is a gift`,
                `The universe designed ${name} with perfect intention`,
                `${name}'s challenges are superpowers in disguise`,
                `${name} chose this time, these people, this life`
            ]
        };
    }
};

// Helper functions for enhanced wrap-up
function getLifePathTitle(number) {
    const titles = {
        1: "The Pioneer",
        2: "The Peacemaker", 
        3: "The Creative",
        4: "The Builder",
        5: "The Freedom Seeker",
        6: "The Nurturer",
        7: "The Seeker",
        8: "The Achiever",
        9: "The Humanitarian",
        11: "The Intuitive",
        22: "The Master Builder",
        33: "The Master Teacher"
    };
    return titles[number] || "The Unique Soul";
}

function getLifePathLesson1(number) {
    const lessons = {
        1: "Develop independence and self-trust",
        2: "Master cooperation and sensitivity",
        3: "Express creativity and communicate joy",
        4: "Build lasting foundations with patience",
        5: "Embrace change and honor freedom",
        6: "Nurture others while caring for self",
        7: "Seek wisdom and trust intuition",
        8: "Master abundance and use power wisely",
        9: "Serve humanity with compassion",
        11: "Channel intuitive wisdom to inspire",
        22: "Manifest visions into lasting reality",
        33: "Heal through unconditional love"
    };
    return lessons[number] || "Discover unique purpose";
}

function getLifePathLesson2(number) {
    const lessons = {
        1: "Lead by example, not force",
        2: "Find strength in collaboration",
        3: "Complete creative projects fully",
        4: "Stay flexible within structure",
        5: "Find freedom within commitment",
        6: "Set healthy boundaries",
        7: "Balance solitude with connection",
        8: "Give back as much as gained",
        9: "Release and allow endings",
        11: "Stay grounded while channeling",
        22: "Build for others, not just self",
        33: "Practice receiving as well as giving"
    };
    return lessons[number] || "Balance opposites";
}

function getLifePathLesson3(number) {
    const lessons = {
        1: "Include others in the journey",
        2: "Value own needs equally",
        3: "Move through creative blocks with persistence",
        4: "Allow spontaneity and joy",
        5: "Cultivate depth alongside variety",
        6: "Love without losing self",
        7: "Share wisdom with the world",
        8: "Lead with integrity",
        9: "Embrace the cycle of completion",
        11: "Trust visions even when others doubt",
        22: "Balance practical with visionary",
        33: "Accept imperfection in self and others"
    };
    return lessons[number] || "Embrace full potential";
}

function getLifePathGift(number) {
    const gifts = {
        1: "The gift of pioneering—showing others what's possible",
        2: "The gift of peace—creating harmony wherever they go",
        3: "The gift of joy—uplifting others through creative expression",
        4: "The gift of stability—building things that last",
        5: "The gift of liberation—inspiring freedom in others",
        6: "The gift of love—creating home and healing wherever they are",
        7: "The gift of wisdom—seeing what others miss",
        8: "The gift of manifestation—turning vision into reality",
        9: "The gift of completion—bringing things to their highest form",
        11: "The gift of inspiration—channeling higher wisdom to others",
        22: "The gift of legacy—building dreams that outlive them",
        33: "The gift of healing—transforming through pure love"
    };
    return gifts[number] || "A unique gift waiting to be discovered";
}

function getLifePathPurpose(number) {
    const purposes = {
        1: "This soul is here to pioneer new paths and demonstrate the power of individuality",
        2: "This soul is here to create harmony and show that true strength lies in connection",
        3: "This soul is here to spread joy and demonstrate that creativity is essential to life",
        4: "This soul is here to build lasting foundations and show the value of dedicated work",
        5: "This soul is here to embrace change and demonstrate that freedom expands consciousness",
        6: "This soul is here to nurture and beautify, showing that love creates healing",
        7: "This soul is here to seek truth and demonstrate that wisdom comes from within",
        8: "This soul is here to master abundance and show that material success can serve spirit",
        9: "This soul is here to serve humanity and demonstrate universal compassion",
        11: "This soul is here to illuminate and inspire, channeling higher wisdom to uplift others",
        22: "This soul is here to manifest dreams into reality on a scale that benefits many",
        33: "This soul is here to heal through unconditional love and teach by divine example"
    };
    return purposes[number] || "This soul is here to discover and fulfill a unique purpose";
}

function getLifePathNeed(number) {
    const needs = {
        1: "lead and make independent decisions",
        2: "cooperate and feel emotionally safe",
        3: "create and express themselves freely",
        4: "build structure and work toward goals",
        5: "explore and experience variety",
        6: "care for others and create beauty",
        7: "question and seek deeper meaning",
        8: "achieve and be recognized for efforts",
        9: "contribute to something larger than self",
        11: "trust intuition and inspire others",
        22: "create something of lasting significance",
        33: "heal and teach through loving presence"
    };
    return needs[number] || "discover their unique path";
}

function getElementCombination(sunElement, moonElement) {
    if (sunElement === moonElement) {
        return `With both Sun and Moon in ${sunElement}, ${sunElement.toLowerCase()} energy is strongly emphasized. This creates focus but may need balance from other elements.`;
    }
    
    const combos = {
        'Fire-Earth': 'Fire inspiration meets Earth practicality—visionary ideas grounded in reality.',
        'Fire-Air': 'Fire passion meets Air intellect—enthusiastic communication and quick thinking.',
        'Fire-Water': 'Fire action meets Water intuition—passionate feelings and creative energy.',
        'Earth-Fire': 'Earth stability meets Fire inspiration—grounded ambition.',
        'Earth-Air': 'Earth practicality meets Air ideas—thoughtful implementation.',
        'Earth-Water': 'Earth grounding meets Water sensitivity—nurturing stability.',
        'Air-Fire': 'Air ideas meet Fire enthusiasm—inspired communication.',
        'Air-Earth': 'Air thinking meets Earth grounding—practical wisdom.',
        'Air-Water': 'Air intellect meets Water intuition—emotional intelligence.',
        'Water-Fire': 'Water feeling meets Fire action—emotionally motivated movement.',
        'Water-Earth': 'Water intuition meets Earth stability—sensitive practicality.',
        'Water-Air': 'Water depth meets Air clarity—feelings understood through thought.'
    };
    
    return combos[`${sunElement}-${moonElement}`] || `${sunElement} and ${moonElement} energies combine uniquely.`;
}

function getMoonPhaseMeaning(phase) {
    const meanings = {
        'New Moon': 'Born for new beginnings. This soul arrives with fresh slate energy—pioneering, initiating, and comfortable with uncertainty.',
        'Waxing Crescent': 'Born to build. This soul has natural momentum—growing, developing, and moving toward manifestation.',
        'First Quarter': 'Born for action. This soul has crisis-management skills—decisive, courageous, and able to turn challenges into opportunities.',
        'Waxing Gibbous': 'Born to refine. This soul has editing energy—improving, perfecting, and bringing things to higher expression.',
        'Full Moon': 'Born for completion and illumination. This soul has powerful projection—visible, expressive, and meant to be seen.',
        'Waning Gibbous': 'Born to share. This soul has teaching energy—distributing wisdom and helping others grow.',
        'Last Quarter': 'Born for release. This soul understands endings—letting go, completing, and clearing the way.',
        'Waning Crescent': 'Born for transition. This soul has ancient wisdom—contemplative, intuitive, and connected to the beyond.'
    };
    return meanings[phase] || 'A unique lunar influence awaits discovery.';
}

function getSunNeed(sign) {
    const needs = {
        Aries: "Freedom to lead and take bold initiative",
        Taurus: "Stability, comfort, and a steady rhythm",
        Gemini: "Variety, learning, and open communication",
        Cancer: "Emotional safety, belonging, and family closeness",
        Leo: "Creative expression, recognition, and warmth",
        Virgo: "Order, usefulness, and meaningful contribution",
        Libra: "Harmony, beauty, and balanced relationships",
        Scorpio: "Depth, trust, and honest emotional intensity",
        Sagittarius: "Adventure, exploration, and room to grow",
        Capricorn: "Respect, structure, and long-term achievement",
        Aquarius: "Freedom, originality, and shared ideals",
        Pisces: "Imagination, compassion, and spiritual nourishment"
    };
    return needs[sign] || "Support, encouragement, and space to be themselves";
}

function getMoonNeed(sign) {
    const needs = {
        Aries: "Emotional release through action and movement",
        Taurus: "Calm, physical comfort, and steady reassurance",
        Gemini: "Conversation, mental stimulation, and lightness",
        Cancer: "Nurturing, tenderness, and emotional security",
        Leo: "Affection, warmth, and being seen for who they are",
        Virgo: "Clarity, gentle structure, and helpful routines",
        Libra: "Peace, kindness, and emotional balance",
        Scorpio: "Deep trust, privacy, and emotional honesty",
        Sagittarius: "Optimism, perspective, and emotional freedom",
        Capricorn: "Reliability, respect, and quiet strength",
        Aquarius: "Acceptance, space, and emotional understanding",
        Pisces: "Softness, empathy, and imaginative comfort"
    };
    return needs[sign] || "Gentle reassurance and a safe emotional space";
}

function getSunNeedSpecific(sign) {
    const specifics = {
        Aries: "challenges, competition, and room to be first",
        Taurus: "consistency, comfort, and time to move at their own pace",
        Gemini: "books, conversations, and constant new input",
        Cancer: "closeness, traditions, and emotional acknowledgment",
        Leo: "audiences, applause, and creative supplies",
        Virgo: "order, useful tasks, and appreciation for helpfulness",
        Libra: "beauty, fairness, and harmonious surroundings",
        Scorpio: "privacy, depth, and emotional honesty",
        Sagittarius: "adventure, learning, and philosophical discussion",
        Capricorn: "goals, achievements, and earned respect",
        Aquarius: "uniqueness, freedom, and intellectual stimulation",
        Pisces: "imagination, spiritual nourishment, and creative outlets"
    };
    return specifics[sign] || "love and understanding";
}

function getMoonComfortSpecific(sign) {
    const comforts = {
        Aries: "physical movement and action—let them punch pillows or run it out",
        Taurus: "soft textures, favorite foods, and patient presence",
        Gemini: "talking it through repeatedly and naming what they feel",
        Cancer: "holding, rocking, and complete emotional presence",
        Leo: "dramatic acknowledgment and making them feel special",
        Virgo: "fixing something practical and restoring order",
        Libra: "beautiful music, aesthetic environment, and gentle fairness",
        Scorpio: "honoring the depth of their feeling without trying to fix it",
        Sagittarius: "distraction, humor, and perspective on the bigger picture",
        Capricorn: "respect, practical solutions, and quiet competence",
        Aquarius: "space, unconditional acceptance, and logical discussion",
        Pisces: "imagination, music, and gentle transcendence of the problem"
    };
    return comforts[sign] || "loving presence and patience";
}

function getMercurySummary(sign) {
    const summaries = {
        Aries: "Quick, direct, competitive thinking",
        Taurus: "Methodical, practical, sensory-based thinking",
        Gemini: "Curious, versatile, quick-witted thinking",
        Cancer: "Intuitive, memory-focused, emotional thinking",
        Leo: "Creative, confident, dramatic thinking",
        Virgo: "Analytical, precise, detail-oriented thinking",
        Libra: "Balanced, diplomatic, relationship-focused thinking",
        Scorpio: "Deep, investigative, penetrating thinking",
        Sagittarius: "Expansive, philosophical, big-picture thinking",
        Capricorn: "Structured, strategic, goal-oriented thinking",
        Aquarius: "Original, innovative, unconventional thinking",
        Pisces: "Imaginative, intuitive, poetic thinking"
    };
    return summaries[sign] || "Unique mental expression";
}

function getVenusSummary(sign) {
    const summaries = {
        Aries: "Passionate, direct, adventurous love style",
        Taurus: "Sensual, devoted, comfort-seeking love style",
        Gemini: "Curious, communicative, playful love style",
        Cancer: "Nurturing, protective, devoted love style",
        Leo: "Generous, dramatic, adoring love style",
        Virgo: "Helpful, attentive, service-oriented love style",
        Libra: "Harmonious, romantic, partnership-focused love style",
        Scorpio: "Intense, transformative, all-or-nothing love style",
        Sagittarius: "Free-spirited, adventurous, honest love style",
        Capricorn: "Committed, traditional, loyal love style",
        Aquarius: "Independent, unique, friendship-based love style",
        Pisces: "Compassionate, romantic, boundless love style"
    };
    return summaries[sign] || "Unique expression of love and beauty";
}

function getMarsSummary(sign) {
    const summaries = {
        Aries: "Direct, competitive, fearless action style",
        Taurus: "Steady, persistent, unstoppable action style",
        Gemini: "Versatile, quick, multi-directional action style",
        Cancer: "Protective, emotionally-driven action style",
        Leo: "Confident, dramatic, heart-driven action style",
        Virgo: "Precise, efficient, improvement-focused action style",
        Libra: "Strategic, diplomatic, partnership-oriented action style",
        Scorpio: "Intense, strategic, transformative action style",
        Sagittarius: "Bold, optimistic, adventure-seeking action style",
        Capricorn: "Disciplined, ambitious, goal-directed action style",
        Aquarius: "Unconventional, collective, revolutionary action style",
        Pisces: "Intuitive, compassionate, flowing action style"
    };
    return summaries[sign] || "Unique expression of will and energy";
}

function getNorthNodePurpose(sign) {
    const purposes = {
        Aries: "developing independence, courage, and self-assertion",
        Taurus: "cultivating stability, self-worth, and material mastery",
        Gemini: "embracing curiosity, communication, and versatility",
        Cancer: "nurturing emotional intelligence and creating home",
        Leo: "expressing creativity, courage, and heart-centered leadership",
        Virgo: "developing service, discernment, and practical skills",
        Libra: "learning partnership, balance, and diplomatic grace",
        Scorpio: "embracing depth, transformation, and emotional power",
        Sagittarius: "seeking truth, adventure, and expanded horizons",
        Capricorn: "building legacy, mastery, and responsible authority",
        Aquarius: "serving community, innovation, and collective progress",
        Pisces: "developing compassion, spirituality, and transcendence"
    };
    return purposes[sign] || "discovering their unique soul purpose";
}

function getMoonSummary(sign) {
    const summaries = {
        Aries: "This soul feels emotions quickly and intensely, needing action to process feelings. Comfort comes through independence and movement.",
        Taurus: "This soul processes emotions slowly but deeply, needing stability and sensory comfort. Security comes through consistency and touch.",
        Gemini: "This soul processes emotions through talking and thinking, needing mental stimulation. Comfort comes through communication and variety.",
        Cancer: "This soul feels everything deeply and remembers every emotional nuance. Comfort comes through nurturing, home, and family connection.",
        Leo: "This soul needs to feel special and appreciated, expressing emotions dramatically. Comfort comes through attention and creative expression.",
        Virgo: "This soul processes emotions analytically, sometimes worrying too much. Comfort comes through helping others and useful activity.",
        Libra: "This soul needs harmony and balance to feel secure, avoiding conflict. Comfort comes through beauty, partnership, and fairness.",
        Scorpio: "This soul feels emotions with tremendous intensity and depth. Comfort comes through trust, privacy, and emotional truth.",
        Sagittarius: "This soul processes emotions through optimism and adventure. Comfort comes through freedom, learning, and exploration.",
        Capricorn: "This soul processes emotions privately, sometimes appearing reserved. Comfort comes through achievement and being taken seriously.",
        Aquarius: "This soul needs space and intellectual understanding of emotions. Comfort comes through independence and being accepted for uniqueness.",
        Pisces: "This soul absorbs emotions from everyone around them like a sponge. Comfort comes through imagination, spirituality, and creative escape."
    };
    return summaries[sign] || "This soul has a unique way of processing and expressing emotions.";
}

function getRisingSummary(sign) {
    const summaries = {
        Aries: "The world sees a bold, energetic, and pioneering spirit. First impressions are of courage and directness.",
        Taurus: "The world sees a calm, grounded, and dependable presence. First impressions are of stability and sensuality.",
        Gemini: "The world sees a curious, articulate, and versatile spirit. First impressions are of intelligence and wit.",
        Cancer: "The world sees a nurturing, sensitive, and protective nature. First impressions are of warmth and care.",
        Leo: "The world sees a confident, warm, and charismatic presence. First impressions are of royalty and radiance.",
        Virgo: "The world sees a helpful, modest, and intelligent nature. First impressions are of competence and thoughtfulness.",
        Libra: "The world sees a graceful, charming, and balanced presence. First impressions are of beauty and diplomacy.",
        Scorpio: "The world sees an intense, mysterious, and powerful presence. First impressions are of depth and magnetism.",
        Sagittarius: "The world sees an optimistic, adventurous, and philosophical spirit. First impressions are of enthusiasm and wisdom.",
        Capricorn: "The world sees a serious, capable, and ambitious presence. First impressions are of authority and reliability.",
        Aquarius: "The world sees a unique, progressive, and friendly nature. First impressions are of originality and humanity.",
        Pisces: "The world sees a dreamy, compassionate, and artistic presence. First impressions are of sensitivity and imagination."
    };
    return summaries[sign] || "The world sees a unique and special soul.";
}

function getChineseSummary(animal) {
    const summaries = {
        Rat: "Clever, resourceful, and quick-thinking. The Rat brings intelligence, charm, and adaptability",
        Ox: "Patient, dependable, and strong. The Ox brings determination, reliability, and quiet power",
        Tiger: "Brave, confident, and unpredictable. The Tiger brings courage, passion, and magnetic presence",
        Rabbit: "Gentle, elegant, and alert. The Rabbit brings diplomacy, artistic sense, and good fortune",
        Dragon: "Powerful, lucky, and ambitious. The Dragon brings charisma, success, and natural authority",
        Snake: "Wise, intuitive, and sophisticated. The Snake brings wisdom, grace, and mysterious depth",
        Horse: "Active, energetic, and free-spirited. The Horse brings enthusiasm, independence, and warmth",
        Goat: "Creative, gentle, and artistic. The Goat brings creativity, kindness, and artistic beauty",
        Monkey: "Clever, curious, and playful. The Monkey brings wit, intelligence, and inventive spirit",
        Rooster: "Observant, hardworking, and confident. The Rooster brings precision, loyalty, and honesty",
        Dog: "Loyal, honest, and protective. The Dog brings faithfulness, justice, and true friendship",
        Pig: "Generous, compassionate, and sincere. The Pig brings abundance, generosity, and good nature"
    };
    return summaries[animal] || "This Chinese zodiac sign brings unique gifts and characteristics";
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
