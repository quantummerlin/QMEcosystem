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
    },
    
    Moon: {
        1: {
            title: "Moon in 1st House - Emotional Heart on Sleeve",
            keywords: ["Sensitivity", "Emotions", "Nurturing", "Receptivity"],
            reading: `With the Moon in their 1st House, this child wears their heart on their sleeve. Their emotions are visible and immediately expressed through their appearance and demeanor. They're emotionally transparent and deeply sensitive to their environment.`,
            strengths: ["Emotional authenticity", "Nurturing presence", "Intuitive"],
            challenges: ["Moodiness", "Over-sensitivity", "Emotional reactivity"]
        },
        2: {
            title: "Moon in 2nd House - Emotional Security Through Stability",
            keywords: ["Security", "Comfort", "Values", "Possessions"],
            reading: `The Moon in the 2nd House connects emotional well-being to security and material comfort. This child feels safe when surrounded by familiar things and stable routines. Changes to their environment or possessions can trigger emotional responses.`,
            strengths: ["Good financial instincts", "Value stability", "Loyal"],
            challenges: ["Attachment to possessions", "Fear of change", "Comfort eating"]
        },
        3: {
            title: "Moon in 3rd House - Emotional Intelligence",
            keywords: ["Communication", "Learning", "Siblings", "Curiosity"],
            reading: `With the Moon in the 3rd House, emotions and thinking are intertwined. This child processes feelings through words and conversation. They may be an emotional storyteller, needing to talk through their feelings to understand them.`,
            strengths: ["Emotional intelligence", "Good with siblings", "Intuitive learning"],
            challenges: ["Nervous anxiety", "Overthinking feelings", "Mental restlessness"]
        },
        4: {
            title: "Moon in 4th House - Deep Roots",
            keywords: ["Home", "Family", "Belonging", "Roots"],
            reading: `The Moon is at home in the 4th House, making family and home life central to emotional well-being. This child needs a stable, nurturing home environment more than most. They have deep connections to family traditions and ancestry.`,
            strengths: ["Strong family bonds", "Natural nurturer", "Emotional depth"],
            challenges: ["Difficulty leaving home", "Clingy", "Past-focused"]
        },
        5: {
            title: "Moon in 5th House - Creative Heart",
            keywords: ["Creativity", "Play", "Romance", "Joy"],
            reading: `With the Moon in the 5th House, emotions express through creativity, play, and self-expression. This child needs creative outlets for their feelings - art, music, drama, or play. Their emotional life is colorful and dramatic.`,
            strengths: ["Creative expression", "Playful spirit", "Romantic heart"],
            challenges: ["Drama queen tendencies", "Need for attention", "Emotional risk-taking"]
        },
        6: {
            title: "Moon in 6th House - Nurturing Through Service",
            keywords: ["Health", "Service", "Routine", "Work"],
            reading: `The Moon in the 6th House connects emotional well-being to daily routines and service to others. This child feels best when helping and when life is orderly. Physical health may be affected by emotional states.`,
            strengths: ["Helpful nature", "Loves routine", "Health conscious"],
            challenges: ["Anxiety about health", "Worry", "Perfectionism about daily life"]
        },
        7: {
            title: "Moon in 7th House - Relationship Oriented",
            keywords: ["Partnerships", "Balance", "Others", "Harmony"],
            reading: `With the Moon in the 7th House, emotional fulfillment comes through relationships. This child needs partnership and may dislike being alone. They're naturally diplomatic and attuned to others' emotional needs.`,
            strengths: ["Relationship skills", "Diplomatic", "Partner-focused"],
            challenges: ["Dependent on others", "People-pleasing", "Fear of being alone"]
        },
        8: {
            title: "Moon in 8th House - Deep Emotional Waters",
            keywords: ["Intensity", "Transformation", "Secrets", "Power"],
            reading: `The Moon in the 8th House gives extraordinary emotional depth and intensity. This child feels everything deeply and may be drawn to life's mysteries. They have powerful emotional experiences and strong intuition.`,
            strengths: ["Emotional depth", "Transformative ability", "Psychic sensitivity"],
            challenges: ["Emotional intensity", "Secrecy", "Possessiveness"]
        },
        9: {
            title: "Moon in 9th House - Wandering Heart",
            keywords: ["Adventure", "Philosophy", "Travel", "Wisdom"],
            reading: `With the Moon in the 9th House, emotional fulfillment comes through exploration, learning, and adventure. This child needs variety and may feel restricted by routine. Foreign cultures and big ideas feed their soul.`,
            strengths: ["Adventurous spirit", "Philosophical nature", "Open-minded"],
            challenges: ["Restlessness", "Commitment issues", "Preachy tendencies"]
        },
        10: {
            title: "Moon in 10th House - Public Emotional Life",
            keywords: ["Career", "Reputation", "Achievement", "Public"],
            reading: `The Moon in the 10th House connects emotional needs to career and public recognition. This child's feelings may be on public display, and they may seek emotional fulfillment through achievement and status.`,
            strengths: ["Career ambition", "Public presence", "Leadership"],
            challenges: ["Work-life imbalance", "Need for approval", "Emotional exposure"]
        },
        11: {
            title: "Moon in 11th House - Friend of the World",
            keywords: ["Friends", "Groups", "Ideals", "Community"],
            reading: `With the Moon in the 11th House, emotional fulfillment comes through friendships and community involvement. This child needs to belong to groups and causes larger than themselves. They nurture through humanitarian ideals.`,
            strengths: ["Great friend", "Community minded", "Idealistic"],
            challenges: ["Emotional detachment", "Impersonal relationships", "Idealism over intimacy"]
        },
        12: {
            title: "Moon in 12th House - Hidden Depths",
            keywords: ["Spirituality", "Solitude", "Dreams", "Subconscious"],
            reading: `The Moon in the 12th House indicates a rich inner emotional life that may not be visible to others. This child needs solitude to process feelings and may have vivid dreams and strong intuition. Their sensitivity is both their challenge and gift.`,
            strengths: ["Spiritual depth", "Compassion", "Intuitive gifts"],
            challenges: ["Hidden emotions", "Loneliness", "Escapism"]
        }
    },
    
    Mercury: {
        1: { title: "Mercury in 1st House - Quick Mind", keywords: ["Communication", "Wit", "Curiosity"], reading: `Mercury in the 1st House gives a quick, curious mind that's always active. This child communicates easily and thinks fast on their feet.`, strengths: ["Quick wit", "Articulate"], challenges: ["Nervousness", "Scattered energy"] },
        2: { title: "Mercury in 2nd House - Practical Thinker", keywords: ["Values", "Money", "Resources"], reading: `Mercury here gives practical intelligence focused on values and resources. May have talent for business.`, strengths: ["Financial mind", "Practical"], challenges: ["Materialistic thinking"] },
        3: { title: "Mercury in 3rd House - Natural Communicator", keywords: ["Learning", "Writing", "Speaking"], reading: `Mercury is at home in the 3rd House, creating a natural communicator, writer, or teacher.`, strengths: ["Communication", "Learning"], challenges: ["Mental restlessness"] },
        4: { title: "Mercury in 4th House - Family Storyteller", keywords: ["Home", "Memory", "Heritage"], reading: `Mercury here gives interest in family history and home-based learning. May be the family historian.`, strengths: ["Memory", "Home-based work"], challenges: ["Stuck in past thinking"] },
        5: { title: "Mercury in 5th House - Creative Mind", keywords: ["Creativity", "Play", "Expression"], reading: `Mercury in the 5th House brings creative intelligence and playful communication style.`, strengths: ["Creative thinking", "Fun communication"], challenges: ["Drama", "Showing off"] },
        6: { title: "Mercury in 6th House - Analytical Mind", keywords: ["Analysis", "Health", "Service"], reading: `Mercury here gives analytical abilities and interest in health and daily efficiency.`, strengths: ["Analysis", "Problem-solving"], challenges: ["Worry", "Over-analysis"] },
        7: { title: "Mercury in 7th House - Partnership Mind", keywords: ["Relationships", "Negotiation", "Diplomacy"], reading: `Mercury in the 7th House gives skill in negotiation and communication within relationships.`, strengths: ["Diplomacy", "Fair-minded"], challenges: ["Indecision", "Debate"] },
        8: { title: "Mercury in 8th House - Deep Investigator", keywords: ["Research", "Psychology", "Mystery"], reading: `Mercury here gives a penetrating mind drawn to mysteries, psychology, and hidden truths.`, strengths: ["Research", "Psychology"], challenges: ["Obsessive thinking", "Secrets"] },
        9: { title: "Mercury in 9th House - Philosophical Mind", keywords: ["Philosophy", "Travel", "Teaching"], reading: `Mercury in the 9th House creates a philosophical thinker interested in big ideas and foreign cultures.`, strengths: ["Big-picture thinking", "Teaching"], challenges: ["Preachy", "Theoretical only"] },
        10: { title: "Mercury in 10th House - Career Communicator", keywords: ["Career", "Public Speaking", "Authority"], reading: `Mercury here gives communication abilities useful in career and public life.`, strengths: ["Public speaking", "Career communication"], challenges: ["Image-focused", "Calculating"] },
        11: { title: "Mercury in 11th House - Group Thinker", keywords: ["Groups", "Technology", "Innovation"], reading: `Mercury in the 11th House gives talent for group communication and innovative thinking.`, strengths: ["Innovation", "Network building"], challenges: ["Detached", "Eccentric ideas"] },
        12: { title: "Mercury in 12th House - Intuitive Mind", keywords: ["Intuition", "Spirituality", "Subconscious"], reading: `Mercury here gives intuitive, imaginative thinking that accesses the subconscious.`, strengths: ["Intuition", "Creativity"], challenges: ["Confusion", "Hidden thoughts"] }
    },
    
    Venus: {
        1: { title: "Venus in 1st House - Natural Charm", keywords: ["Beauty", "Charm", "Grace"], reading: `Venus in the 1st House bestows natural charm, beauty, and grace. This child attracts positive attention effortlessly.`, strengths: ["Charm", "Beauty", "Likability"], challenges: ["Vanity", "Superficiality"] },
        2: { title: "Venus in 2nd House - Love of Beauty", keywords: ["Values", "Possessions", "Luxury"], reading: `Venus here gives love of beautiful things and talent for attracting resources.`, strengths: ["Financial luck", "Aesthetic sense"], challenges: ["Materialism", "Indulgence"] },
        3: { title: "Venus in 3rd House - Sweet Communication", keywords: ["Harmony", "Siblings", "Words"], reading: `Venus in the 3rd House gives a pleasant communication style and harmonious relationships with siblings.`, strengths: ["Pleasant speech", "Diplomatic"], challenges: ["Avoid confrontation", "Superficial"] },
        4: { title: "Venus in 4th House - Home Lover", keywords: ["Home", "Family", "Comfort"], reading: `Venus here creates love of home and family, wanting a beautiful, harmonious domestic life.`, strengths: ["Home beautification", "Family harmony"], challenges: ["Over-attached to home"] },
        5: { title: "Venus in 5th House - Creative Romance", keywords: ["Romance", "Creativity", "Pleasure"], reading: `Venus is joyful in the 5th House, bringing romance, creativity, and love of pleasure.`, strengths: ["Creativity", "Romance", "Joy"], challenges: ["Pleasure-seeking", "Drama"] },
        6: { title: "Venus in 6th House - Service with Grace", keywords: ["Service", "Health", "Beauty"], reading: `Venus in the 6th House brings grace to daily work and interest in health/beauty routines.`, strengths: ["Graceful service", "Health consciousness"], challenges: ["Criticism avoidance"] },
        7: { title: "Venus in 7th House - Partnership Oriented", keywords: ["Marriage", "Partnership", "Harmony"], reading: `Venus is at home in the 7th House, promising harmonious relationships and partnership luck.`, strengths: ["Relationship luck", "Diplomatic"], challenges: ["Dependency", "Peace at any price"] },
        8: { title: "Venus in 8th House - Passionate Heart", keywords: ["Intensity", "Passion", "Transformation"], reading: `Venus here gives intense emotional attachments and magnetic attraction.`, strengths: ["Passionate love", "Magnetic"], challenges: ["Jealousy", "Possessiveness"] },
        9: { title: "Venus in 9th House - Love of Adventure", keywords: ["Travel", "Philosophy", "Freedom"], reading: `Venus in the 9th House loves adventure, travel, and philosophical exploration.`, strengths: ["Adventure", "Open-minded love"], challenges: ["Restless heart", "Commitment issues"] },
        10: { title: "Venus in 10th House - Charming Career", keywords: ["Career", "Reputation", "Beauty"], reading: `Venus here brings charm to career pursuits and public life.`, strengths: ["Career charm", "Public appeal"], challenges: ["Image-focused", "Using charm for gain"] },
        11: { title: "Venus in 11th House - Friend to All", keywords: ["Friends", "Groups", "Ideals"], reading: `Venus in the 11th House creates love of friendships and group activities.`, strengths: ["Friendship luck", "Group harmony"], challenges: ["Superficial friendships", "Detached love"] },
        12: { title: "Venus in 12th House - Hidden Love", keywords: ["Spirituality", "Compassion", "Secret"], reading: `Venus in the 12th House indicates hidden love nature and spiritual/compassionate heart.`, strengths: ["Spiritual love", "Compassion"], challenges: ["Secret affairs", "Unrequited love"] }
    },
    
    Mars: {
        1: { title: "Mars in 1st House - Warrior Spirit", keywords: ["Energy", "Action", "Courage"], reading: `Mars in the 1st House gives dynamic energy, courage, and a pioneering spirit. This child takes action naturally.`, strengths: ["Courage", "Initiative", "Energy"], challenges: ["Aggression", "Impatience"] },
        2: { title: "Mars in 2nd House - Resource Builder", keywords: ["Money", "Drive", "Values"], reading: `Mars here gives drive to earn money and build resources through personal effort.`, strengths: ["Financial drive", "Self-reliance"], challenges: ["Impulsive spending", "Possessive"] },
        3: { title: "Mars in 3rd House - Sharp Mind", keywords: ["Communication", "Debate", "Wit"], reading: `Mars in the 3rd House gives a sharp, competitive mind that enjoys debate.`, strengths: ["Quick mind", "Persuasive"], challenges: ["Argumentative", "Harsh words"] },
        4: { title: "Mars in 4th House - Home Warrior", keywords: ["Home", "Family", "Protection"], reading: `Mars here creates strong protective instincts toward home and family.`, strengths: ["Protective", "Home improvement"], challenges: ["Family conflicts", "Anger at home"] },
        5: { title: "Mars in 5th House - Creative Fire", keywords: ["Creativity", "Sports", "Romance"], reading: `Mars in the 5th House gives passionate creativity, competitive sports ability, and romantic pursuit.`, strengths: ["Athletic", "Creative passion"], challenges: ["Competitive love", "Drama"] },
        6: { title: "Mars in 6th House - Productive Worker", keywords: ["Work", "Health", "Service"], reading: `Mars here gives productive work energy and active approach to health.`, strengths: ["Productive", "Active health"], challenges: ["Work stress", "Accidents"] },
        7: { title: "Mars in 7th House - Passionate Partnerships", keywords: ["Relationships", "Competition", "Attraction"], reading: `Mars in the 7th House attracts dynamic, passionate relationships.`, strengths: ["Passionate partnerships", "Magnetic"], challenges: ["Conflict in relationships", "Combative"] },
        8: { title: "Mars in 8th House - Intense Drive", keywords: ["Power", "Transformation", "Intensity"], reading: `Mars here gives intense willpower and ability to transform through crisis.`, strengths: ["Willpower", "Resilience"], challenges: ["Power struggles", "Control issues"] },
        9: { title: "Mars in 9th House - Adventurous Spirit", keywords: ["Travel", "Philosophy", "Crusade"], reading: `Mars in the 9th House creates a crusader spirit driven by beliefs and adventure.`, strengths: ["Adventure", "Conviction"], challenges: ["Righteous anger", "Fanaticism"] },
        10: { title: "Mars in 10th House - Career Ambition", keywords: ["Career", "Ambition", "Achievement"], reading: `Mars here drives powerful career ambition and competitive achievement.`, strengths: ["Career success", "Leadership"], challenges: ["Ruthless ambition", "Work conflicts"] },
        11: { title: "Mars in 11th House - Group Leader", keywords: ["Groups", "Friends", "Causes"], reading: `Mars in the 11th House drives action in groups and for social causes.`, strengths: ["Group leadership", "Activism"], challenges: ["Friend conflicts", "Pushy in groups"] },
        12: { title: "Mars in 12th House - Hidden Strength", keywords: ["Spirituality", "Hidden", "Subconscious"], reading: `Mars here indicates hidden reserves of strength and action behind the scenes.`, strengths: ["Spiritual warrior", "Hidden strength"], challenges: ["Suppressed anger", "Secret enemies"] }
    },
    
    Jupiter: {
        1: { title: "Jupiter in 1st House - Lucky Self", keywords: ["Luck", "Expansion", "Optimism"], reading: `Jupiter in the 1st House bestows natural luck, optimism, and an expansive personality.`, strengths: ["Lucky", "Optimistic", "Generous"], challenges: ["Excess", "Overconfidence"] },
        2: { title: "Jupiter in 2nd House - Abundant Resources", keywords: ["Wealth", "Values", "Growth"], reading: `Jupiter here attracts financial abundance and growth of resources.`, strengths: ["Financial luck", "Generous"], challenges: ["Overspending", "Waste"] },
        3: { title: "Jupiter in 3rd House - Expansive Mind", keywords: ["Learning", "Teaching", "Communication"], reading: `Jupiter in the 3rd House gives love of learning and ability to teach others.`, strengths: ["Teaching", "Learning"], challenges: ["Know-it-all", "Scattered"] },
        4: { title: "Jupiter in 4th House - Blessed Home", keywords: ["Home", "Family", "Heritage"], reading: `Jupiter here blesses home and family life with abundance and warmth.`, strengths: ["Happy home", "Family luck"], challenges: ["Excess at home", "Over-indulgence"] },
        5: { title: "Jupiter in 5th House - Joyful Creator", keywords: ["Creativity", "Children", "Play"], reading: `Jupiter in the 5th House brings joy, creativity, and luck with children.`, strengths: ["Creative abundance", "Joyful"], challenges: ["Excessive pleasure", "Gambling"] },
        6: { title: "Jupiter in 6th House - Blessed Work", keywords: ["Service", "Health", "Work"], reading: `Jupiter here brings luck in work and service, and robust health.`, strengths: ["Work luck", "Good health"], challenges: ["Laziness", "Weight gain"] },
        7: { title: "Jupiter in 7th House - Partnership Luck", keywords: ["Marriage", "Partnerships", "Luck"], reading: `Jupiter in the 7th House promises beneficial partnerships and relationship luck.`, strengths: ["Partnership luck", "Generous spouse"], challenges: ["Multiple marriages", "Excess"] },
        8: { title: "Jupiter in 8th House - Transformative Luck", keywords: ["Inheritance", "Transformation", "Depth"], reading: `Jupiter here brings luck through others' resources and transformative experiences.`, strengths: ["Inheritance luck", "Resilience"], challenges: ["Excess in intensity", "Risk-taking"] },
        9: { title: "Jupiter in 9th House - Wisdom Seeker", keywords: ["Philosophy", "Travel", "Wisdom"], reading: `Jupiter is at home in the 9th House, giving love of wisdom, travel, and higher learning.`, strengths: ["Wisdom", "Travel luck", "Teaching"], challenges: ["Preachy", "Excessive travel"] },
        10: { title: "Jupiter in 10th House - Career Luck", keywords: ["Career", "Status", "Recognition"], reading: `Jupiter in the 10th House brings career luck and public recognition.`, strengths: ["Career success", "Recognition"], challenges: ["Overreach", "Status-seeking"] },
        11: { title: "Jupiter in 11th House - Abundant Friends", keywords: ["Friends", "Groups", "Goals"], reading: `Jupiter here brings lucky friendships and success achieving goals.`, strengths: ["Friend luck", "Goal achievement"], challenges: ["Scattered goals", "Fair-weather friends"] },
        12: { title: "Jupiter in 12th House - Spiritual Grace", keywords: ["Spirituality", "Compassion", "Hidden Luck"], reading: `Jupiter in the 12th House brings spiritual grace and hidden blessings.`, strengths: ["Spiritual protection", "Compassion"], challenges: ["Hidden excess", "Escapism"] }
    },
    
    Saturn: {
        1: { title: "Saturn in 1st House - Serious Self", keywords: ["Discipline", "Maturity", "Responsibility"], reading: `Saturn in the 1st House gives a serious, mature demeanor from early childhood.`, strengths: ["Discipline", "Maturity", "Reliability"], challenges: ["Heavy burden", "Self-criticism"] },
        2: { title: "Saturn in 2nd House - Careful Builder", keywords: ["Money", "Security", "Patience"], reading: `Saturn here teaches lessons about money and building lasting security through patience.`, strengths: ["Financial wisdom", "Patience"], challenges: ["Money fears", "Stinginess"] },
        3: { title: "Saturn in 3rd House - Structured Thinker", keywords: ["Learning", "Communication", "Discipline"], reading: `Saturn in the 3rd House creates a structured, careful approach to learning and communication.`, strengths: ["Thorough learning", "Careful speech"], challenges: ["Learning difficulties", "Communication blocks"] },
        4: { title: "Saturn in 4th House - Home Lessons", keywords: ["Home", "Family", "Roots"], reading: `Saturn here indicates lessons around home and family, possibly early responsibilities.`, strengths: ["Family responsibility", "Building foundations"], challenges: ["Cold home", "Early burdens"] },
        5: { title: "Saturn in 5th House - Serious Creativity", keywords: ["Creativity", "Children", "Discipline"], reading: `Saturn in the 5th House gives disciplined creativity and serious approach to self-expression.`, strengths: ["Disciplined creativity", "Lasting art"], challenges: ["Joy inhibition", "Fear of expression"] },
        6: { title: "Saturn in 6th House - Dedicated Worker", keywords: ["Work", "Health", "Service"], reading: `Saturn here creates a dedicated, disciplined worker with focus on health.`, strengths: ["Work ethic", "Health discipline"], challenges: ["Overwork", "Health worries"] },
        7: { title: "Saturn in 7th House - Committed Partner", keywords: ["Marriage", "Commitment", "Lessons"], reading: `Saturn in the 7th House brings serious lessons about commitment and partnership.`, strengths: ["Loyal partnerships", "Commitment"], challenges: ["Delayed marriage", "Heavy relationships"] },
        8: { title: "Saturn in 8th House - Deep Lessons", keywords: ["Transformation", "Power", "Control"], reading: `Saturn here brings deep lessons about power, control, and transformation.`, strengths: ["Psychological depth", "Control"], challenges: ["Fear of loss", "Control issues"] },
        9: { title: "Saturn in 9th House - Wise Student", keywords: ["Philosophy", "Education", "Travel"], reading: `Saturn in the 9th House creates a serious student of life and philosophy.`, strengths: ["Wisdom", "Formal education"], challenges: ["Narrow beliefs", "Travel restrictions"] },
        10: { title: "Saturn in 10th House - Career Builder", keywords: ["Career", "Authority", "Achievement"], reading: `Saturn is at home in the 10th House, giving natural authority and career building ability.`, strengths: ["Career success", "Authority"], challenges: ["Slow rise", "Heavy responsibility"] },
        11: { title: "Saturn in 11th House - Loyal Friend", keywords: ["Friends", "Groups", "Long-term Goals"], reading: `Saturn here creates loyal, long-lasting friendships and steady progress toward goals.`, strengths: ["Loyal friends", "Long-term planning"], challenges: ["Few friends", "Group restrictions"] },
        12: { title: "Saturn in 12th House - Spiritual Lessons", keywords: ["Spirituality", "Solitude", "Hidden"], reading: `Saturn in the 12th House brings spiritual lessons and need for solitude and reflection.`, strengths: ["Spiritual discipline", "Inner strength"], challenges: ["Hidden fears", "Isolation"] }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HOUSE_READINGS };
}
