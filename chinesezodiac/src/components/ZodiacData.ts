export const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

export const animalIcons = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];

export const animalSubtitles = [
  'The Resourceful Innovator',
  'The Dependable Guardian',
  'The Courageous Explorer',
  'The Gentle Diplomat',
  'The Powerful Visionary',
  'The Wise Strategist',
  'The Free Spirit',
  'The Creative Artist',
  'The Clever Problem-Solver',
  'The Proud Observer',
  'The Loyal Protector',
  'The Generous Peacemaker',
];

export const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

export const elementData: Record<string, { name: string; description: string; tips: string[] }> = {
  wood: {
    name: 'Wood',
    description: 'Wood element people are known for their growth, creativity, and flexibility. Like a tree that bends in the wind but doesn\'t break, you have natural resilience and the ability to adapt to changing circumstances.',
    tips: [
      'Focus on growth and learning today',
      'Nurture your creative projects',
      'Stay flexible when plans change',
      'Connect with nature to recharge',
      'Help others grow with your wisdom',
    ],
  },
  fire: {
    name: 'Fire',
    description: 'Fire element people are passionate, energetic, and natural leaders. You have a magnetic personality and the ability to inspire others with your enthusiasm and determination.',
    tips: [
      'Channel your energy into meaningful projects',
      'Let your passion guide your decisions',
      'Inspire others with your enthusiasm',
      'Balance intensity with moments of calm',
      'Use your charisma to build connections',
    ],
  },
  earth: {
    name: 'Earth',
    description: 'Earth element people are grounded, practical, and reliable. You provide stability and support to those around you, and your patience and dedication are unmatched.',
    tips: [
      'Focus on building solid foundations',
      'Practice patience in all situations',
      'Be the rock others can lean on',
      'Stay grounded during chaotic times',
      'Value quality over speed',
    ],
  },
  metal: {
    name: 'Metal',
    description: 'Metal element people are strong, determined, and precise. You have excellent judgment and the ability to see situations clearly, making natural decisions with confidence.',
    tips: [
      'Make decisions with clarity and confidence',
      'Stay focused on your goals',
      'Use your analytical skills wisely',
      'Maintain strong boundaries',
      'Honor your commitments with precision',
    ],
  },
  water: {
    name: 'Water',
    description: 'Water element people are intuitive, adaptable, and deeply empathetic. Like water that flows around obstacles, you have the gift of finding alternative paths and understanding others\' emotions.',
    tips: [
      'Trust your intuition today',
      'Go with the flow when faced with obstacles',
      'Practice deep empathy with others',
      'Find creative solutions to problems',
      'Allow yourself time for reflection',
    ],
  },
};

export const ZODIAC_READINGS: Record<string, {
  name: string;
  icon: string;
  subtitle: string;
  personality: string;
  traits: string[];
  strengths: string;
  weaknesses: string;
  career: string;
  love: string;
  bestMatches: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  guidance: {
    daily: { high: string[]; medium: string[]; low: string[] };
    weekly: { high: string[]; medium: string[]; low: string[] };
    monthly: { high: string[]; medium: string[]; low: string[] };
    yearly: { high: string[]; medium: string[]; low: string[] };
  };
}> = {
  rat: {
    name: 'Rat',
    icon: '🐀',
    subtitle: 'The Resourceful Innovator',
    personality: "Rats are clever, quick thinkers, successful, but content with living a quiet and peaceful life. They have keen observation skills and are known for their charm and ambition.",
    traits: ['Intelligent', 'Adaptable', 'Charming', 'Ambitious', 'Practical', 'Observant'],
    strengths: "Your greatest strengths are your quick wit and ability to find solutions where others see only problems. You have an exceptional memory and are skilled at gathering information.",
    weaknesses: "Your challenges include a tendency to be overly critical of yourself and others. You can be stubborn when you believe you're right, even when evidence suggests otherwise.",
    career: "You excel in careers that require quick thinking and problem-solving. Your natural charm and persuasion make you an excellent salesperson, public relations specialist, or lawyer.",
    love: "In relationships, you're loyal and devoted to your partner. You seek someone who can match your intelligence and ambition.",
    bestMatches: ['Dragon 🐉', 'Monkey 🐒', 'Ox 🐂'],
    luckyNumbers: [2, 3, 6, 8],
    luckyColors: ['Blue', 'Gold', 'Green'],
    guidance: {
      daily: {
        high: ["Today is perfect for starting new projects", "Trust your instincts when making decisions", "Financial opportunities may appear", "Networking will bring unexpected benefits", "Your charm will help you win people over"],
        medium: ["Focus on completing existing tasks", "Avoid impulsive financial decisions", "Be patient with colleagues", "Take time for self-reflection", "Balance work and personal life"],
        low: ["Avoid confrontations today", "Postpone major decisions", "Be cautious with money", "Listen more than you speak", "Take things slowly"],
      },
      weekly: {
        high: ["Excellent week for career advancement", "Financial opportunities multiply", "Relationship connections strengthen", "Creative breakthroughs likely", "Travel planning favored"],
        medium: ["Steady progress on all fronts", "Good time for networking", "Focus on skill development", "Balance multiple priorities", "Health maintenance important"],
        low: ["Be cautious with commitments", "Focus on existing relationships", "Avoid risky investments", "Patience will bring rewards", "Take extra rest time"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  ox: {
    name: 'Ox',
    icon: '🐂',
    subtitle: 'The Dependable Guardian',
    personality: "Oxen are known for their diligence, dependability, strength, and determination. They have a strong sense of responsibility and will never let others down.",
    traits: ['Dependable', 'Strong', 'Determined', 'Patient', 'Honest', 'Traditional'],
    strengths: "Your unwavering determination is your greatest asset. Once you set your mind to something, nothing can stop you. You're incredibly reliable and others know they can count on you completely.",
    weaknesses: "Your stubbornness can be both a strength and a weakness. Once you've made up your mind, you refuse to consider alternatives, even when they might be better.",
    career: "You excel in careers that require stability and reliability. Your methodical nature makes you perfect for roles in engineering, construction, or manufacturing.",
    love: "In relationships, you're loyal, devoted, and deeply committed. You seek a stable, long-term partnership rather than casual flings.",
    bestMatches: ['Rat 🐀', 'Snake 🐍', 'Rooster 🐓'],
    luckyNumbers: [1, 4, 9],
    luckyColors: ['Blue', 'Yellow', 'Green'],
    guidance: {
      daily: {
        high: ["Persistence will pay off today", "Financial stability is strong", "Work relationships improve", "Physical energy is high", "Good day for long-term planning"],
        medium: ["Steady progress on current projects", "Avoid rushing important decisions", "Health maintenance is key", "Family time brings rewards", "Focus on quality over speed"],
        low: ["Avoid arguments with colleagues", "Be patient with delays", "Don't take criticism personally", "Rest and recharge your energy", "Postpone major commitments"],
      },
      weekly: {
        high: ["Strong momentum this week", "Financial gains accumulate", "Team collaboration excels", "Health energy peaks", "Long-term plans solidify"],
        medium: ["Consistent daily progress", "Good for routine tasks", "Relationship stability", "Balance work and rest", "Avoid rushing"],
        low: ["Slow down your pace", "Focus on one task at a time", "Be patient with others", "Extra rest needed", "Review plans carefully"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  tiger: {
    name: 'Tiger',
    icon: '🐅',
    subtitle: 'The Courageous Explorer',
    personality: "Tigers are brave, competitive, confident, and unpredictable. They have a natural charisma and are known for their courage and willingness to take risks.",
    traits: ['Brave', 'Competitive', 'Confident', 'Charismatic', 'Unpredictable', 'Independent'],
    strengths: "Your courage and willingness to take risks are your greatest assets. You're a natural leader who inspires others with your confidence and determination.",
    weaknesses: "Your unpredictability can sometimes alienate others. You may act impulsively without considering the consequences, which can lead to unnecessary conflicts.",
    career: "You excel in careers that require leadership and risk-taking. Your natural charisma makes you perfect for roles in management, entrepreneurship, or the military.",
    love: "In relationships, you're passionate and intense. You seek a partner who can match your energy and isn't afraid of your bold nature.",
    bestMatches: ['Horse 🐎', 'Dog 🐕', 'Pig 🐖'],
    luckyNumbers: [1, 3, 4],
    luckyColors: ['Blue', 'Orange', 'Purple'],
    guidance: {
      daily: {
        high: ["Your confidence attracts success", "Take calculated risks today", "Leadership opportunities arise", "Creative energy peaks", "Social connections strengthen"],
        medium: ["Maintain steady progress", "Balance boldness with caution", "Focus on team collaboration", "Physical exercise recommended", "Practice patience in conflicts"],
        low: ["Avoid unnecessary risks", "Think before acting", "Be diplomatic in disagreements", "Take time to recharge", "Listen to others' advice"],
      },
      weekly: {
        high: ["Breakthrough week ahead", "Leadership recognition grows", "Social circle expands", "Creative projects flourish", "Financial gains possible"],
        medium: ["Steady building momentum", "Good for networking", "Balance risk and caution", "Health needs attention", "Practice strategic thinking"],
        low: ["Slow down and regroup", "Focus on planning", "Avoid impulsive decisions", "Extra rest beneficial", "Seek mentor guidance"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  rabbit: {
    name: 'Rabbit',
    icon: '🐇',
    subtitle: 'The Gentle Diplomat',
    personality: "Rabbits are gentle, quiet, elegant, and alert. They have a natural talent for diplomacy and are known for their kindness and ability to create harmony.",
    traits: ['Gentle', 'Quiet', 'Elegant', 'Alert', 'Kind', 'Diplomatic'],
    strengths: "Your diplomacy and kindness are your greatest assets. You have a natural ability to create harmony and resolve conflicts, making you a valued mediator.",
    weaknesses: "Your tendency to avoid confrontation can sometimes lead to unresolved issues. You may be too passive when action is required.",
    career: "You excel in careers that require diplomacy and attention to detail. Your refined nature makes you perfect for roles in law, mediation, or the arts.",
    love: "In relationships, you're gentle and caring. You seek a peaceful partnership built on mutual respect and understanding.",
    bestMatches: ['Sheep 🐐', 'Pig 🐖', 'Dog 🐕'],
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Pink', 'Purple', 'Blue'],
    guidance: {
      daily: {
        high: ["Your diplomacy skills shine", "Peaceful resolutions possible", "Creative inspiration flows", "Social harmony prevails", "Financial luck improves"],
        medium: ["Maintain balance in relationships", "Practice gentle communication", "Focus on details", "Self-care important", "Avoid rushing"],
        low: ["Avoid conflicts if possible", "Be patient with others", "Take quiet time for yourself", "Postpone difficult conversations", "Practice self-compassion"],
      },
      weekly: {
        high: ["Harmonious relationships week", "Diplomatic success likely", "Creative breakthroughs", "Social invitations increase", "Financial stability"],
        medium: ["Build on existing relationships", "Practice patience", "Good for detailed work", "Balance social and alone time", "Health maintenance"],
        low: ["Focus on inner peace", "Limit social obligations", "Practice mindfulness", "Extra self-care needed", "Avoid drama"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  dragon: {
    name: 'Dragon',
    icon: '🐉',
    subtitle: 'The Powerful Visionary',
    personality: "Dragons are confident, intelligent, enthusiastic, and ambitious. They have natural leadership qualities and are known for their passion and determination.",
    traits: ['Confident', 'Intelligent', 'Enthusiastic', 'Ambitious', 'Passionate', 'Charismatic'],
    strengths: "Your confidence and ambition are your greatest assets. You're a natural visionary who can inspire others with your passion and drive for success.",
    weaknesses: "Your perfectionism can sometimes make you overly critical. You may have difficulty accepting help from others when you need it.",
    career: "You excel in careers that require vision and leadership. Your natural charisma makes you perfect for roles in entrepreneurship, politics, or the arts.",
    love: "In relationships, you're passionate and devoted. You seek a partner who can match your intensity and share your dreams.",
    bestMatches: ['Rat 🐀', 'Monkey 🐒', 'Rooster 🐓'],
    luckyNumbers: [1, 6, 7],
    luckyColors: ['Gold', 'Silver', 'Gray'],
    guidance: {
      daily: {
        high: ["Your vision becomes reality", "Leadership opportunities abound", "Financial success likely", "Creative energy surges", "Social status rises"],
        medium: ["Continue building toward goals", "Balance ambition with patience", "Team collaboration beneficial", "Health needs attention", "Practice gratitude"],
        low: ["Avoid taking on too much", "Be patient with progress", "Listen to others' ideas", "Take time to rest", "Reflect on your goals"],
      },
      weekly: {
        high: ["Major breakthroughs possible", "Leadership recognition increases", "Financial gains multiply", "Creative projects excel", "Network expands significantly"],
        medium: ["Steady advancement continues", "Good for strategic planning", "Balance work and life", "Health maintenance important", "Delegate when possible"],
        low: ["Slow down your pace", "Reassess priorities", "Focus on one major goal", "Extra rest needed", "Seek support from others"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  snake: {
    name: 'Snake',
    icon: '🐍',
    subtitle: 'The Wise Strategist',
    personality: "Snakes are intelligent, wise, and analytical. They have a deep understanding of human nature and are known for their mystery and intuition.",
    traits: ['Intelligent', 'Wise', 'Analytical', 'Intuitive', 'Mysterious', 'Calm'],
    strengths: "Your analytical mind and intuition are your greatest assets. You have a deep understanding of situations and can see what others miss.",
    weaknesses: "Your tendency to be secretive can sometimes create distance in relationships. You may overthink situations, leading to unnecessary worry.",
    career: "You excel in careers that require analysis and strategy. Your keen mind makes you perfect for roles in research, finance, or psychology.",
    love: "In relationships, you're deeply intuitive and devoted. You seek a partner who understands your complex nature.",
    bestMatches: ['Ox 🐂', 'Rooster 🐓', 'Monkey 🐒'],
    luckyNumbers: [2, 8, 9],
    luckyColors: ['Black', 'Red', 'Yellow'],
    guidance: {
      daily: {
        high: ["Your intuition guides correctly", "Strategic thinking pays off", "Financial insights valuable", "Research leads to answers", "Deep understanding grows"],
        medium: ["Analyze situations carefully", "Trust your gut feelings", "Focus on long-term planning", "Balance solitude with connection", "Practice patience"],
        low: ["Avoid making hasty decisions", "Take time to reflect", "Be more open with others", "Don't overthink", "Seek different perspectives"],
      },
      weekly: {
        high: ["Strategic breakthroughs occur", "Financial decisions favorable", "Deep insights gained", "Research projects advance", "Relationship depth increases"],
        medium: ["Methodical progress continues", "Good for planning and analysis", "Balance thinking and acting", "Health maintenance important", "Share insights with trusted others"],
        low: ["Take time for deep reflection", "Avoid major decisions", "Focus on research", "Extra rest beneficial", "Practice patience in relationships"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  horse: {
    name: 'Horse',
    icon: '🐎',
    subtitle: 'The Free Spirit',
    personality: "Horses are energetic, active, and animated. They love freedom and are known for their cheerful nature and ability to inspire others.",
    traits: ['Energetic', 'Active', 'Animated', 'Cheerful', 'Free-spirited', 'Popular'],
    strengths: "Your energy and enthusiasm are your greatest assets. You have a natural ability to inspire others and bring joy wherever you go.",
    weaknesses: "Your love of freedom can sometimes make you seem unreliable. You may have difficulty committing to long-term plans.",
    career: "You excel in careers that require energy and communication. Your outgoing nature makes you perfect for roles in sales, entertainment, or public relations.",
    love: "In relationships, you're passionate and exciting. You seek a partner who shares your love of adventure.",
    bestMatches: ['Tiger 🐅', 'Goat 🐐', 'Dog 🐕'],
    luckyNumbers: [2, 3, 7],
    luckyColors: ['Yellow', 'Green', 'Red'],
    guidance: {
      daily: {
        high: ["Your energy attracts opportunities", "Social connections strengthen", "Creative inspiration flows", "Financial luck improves", "Freedom feels liberating"],
        medium: ["Maintain steady activity", "Balance work and play", "Connect with friends", "Physical exercise recommended", "Practice patience in relationships"],
        low: ["Avoid overcommitting", "Take time to rest", "Be more present", "Don't rush decisions", "Practice grounding exercises"],
      },
      weekly: {
        high: ["Social opportunities multiply", "Energy levels peak", "Creative projects flourish", "Travel possibilities arise", "Financial gains likely"],
        medium: ["Maintain active lifestyle", "Good for networking", "Balance freedom and responsibility", "Health needs attention", "Plan for the future"],
        low: ["Slow down your pace", "Focus on self-care", "Limit social commitments", "Extra rest beneficial", "Practice mindfulness"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  goat: {
    name: 'Goat',
    icon: '🐐',
    subtitle: 'The Creative Artist',
    personality: "Goats are calm, gentle, sympathetic, and amicable. They have a strong sense of justice and are known for their creativity and compassion.",
    traits: ['Calm', 'Gentle', 'Sympathetic', 'Amicable', 'Creative', 'Compassionate'],
    strengths: "Your creativity and compassion are your greatest assets. You have a natural ability to create beauty and bring comfort to others.",
    weaknesses: "Your gentle nature can sometimes make you vulnerable to being taken advantage of. You may have difficulty asserting yourself.",
    career: "You excel in careers that require creativity and empathy. Your artistic nature makes you perfect for roles in design, healthcare, or the arts.",
    love: "In relationships, you're gentle and supportive. You seek a partner who appreciates your sensitivity and creativity.",
    bestMatches: ['Rabbit 🐇', 'Horse 🐎', 'Pig 🐖'],
    luckyNumbers: [2, 7],
    luckyColors: ['Brown', 'Red', 'Purple'],
    guidance: {
      daily: {
        high: ["Creative inspiration flows", "Compassion brings rewards", "Harmony in relationships", "Artistic expression flourishes", "Peaceful feelings prevail"],
        medium: ["Continue creative projects", "Practice self-compassion", "Balance giving and receiving", "Connect with nature", "Gentle communication effective"],
        low: ["Be gentle with yourself", "Avoid taking on others' problems", "Set healthy boundaries", "Take quiet time", "Practice self-care"],
      },
      weekly: {
        high: ["Creative breakthroughs occur", "Relationship harmony deepens", "Artistic recognition possible", "Peaceful week ahead", "Compassion brings connections"],
        medium: ["Steady creative progress", "Good for self-expression", "Balance solitude and social time", "Health maintenance important", "Practice gentle boundaries"],
        low: ["Focus on inner peace", "Limit emotional labor", "Creative recharge needed", "Extra self-care beneficial", "Practice saying no"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  monkey: {
    name: 'Monkey',
    icon: '🐒',
    subtitle: 'The Clever Problem-Solver',
    personality: "Monkeys are witty, intelligent, and innovative. They have a mischievous nature and are known for their problem-solving abilities and charm.",
    traits: ['Witty', 'Intelligent', 'Innovative', 'Mischievous', 'Charming', 'Adaptable'],
    strengths: "Your wit and intelligence are your greatest assets. You have a natural ability to find creative solutions to problems and entertain others.",
    weaknesses: "Your mischievous nature can sometimes get you into trouble. You may lack focus when things get boring.",
    career: "You excel in careers that require problem-solving and innovation. Your clever mind makes you perfect for roles in technology, marketing, or entertainment.",
    love: "In relationships, you're fun and engaging. You seek a partner who can keep up with your quick wit.",
    bestMatches: ['Rat 🐀', 'Dragon 🐉', 'Snake 🐍'],
    luckyNumbers: [1, 7, 8],
    luckyColors: ['White', 'Blue', 'Gold'],
    guidance: {
      daily: {
        high: ["Your cleverness solves problems", "Humor brings success", "Social charm attracts", "Innovation pays off", "Adaptability helps you thrive"],
        medium: ["Apply creativity to challenges", "Network effectively", "Stay curious", "Balance work and fun", "Practice focus"],
        low: ["Avoid practical jokes", "Stay focused on goals", "Be patient with slow progress", "Listen carefully", "Don't overcomplicate"],
      },
      weekly: {
        high: ["Problem-solving genius emerges", "Social opportunities multiply", "Creative solutions found", "Networking brings benefits", "Humor strengthens bonds"],
        medium: ["Innovative thinking useful", "Good for learning new skills", "Social connections valuable", "Health needs attention", "Balance curiosity and focus"],
        low: ["Slow down and focus", "Avoid distractions", "Practice patience", "Extra rest beneficial", "Simplify your approach"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  rooster: {
    name: 'Rooster',
    icon: '🐓',
    subtitle: 'The Proud Observer',
    personality: "Roosters are observant, hardworking, and courageous. They have a strong sense of responsibility and are known for their pride and attention to detail.",
    traits: ['Observant', 'Hardworking', 'Courageous', 'Proud', 'Responsible', 'Detail-oriented'],
    strengths: "Your attention to detail and hard work are your greatest assets. You have a natural ability to spot what others miss and get things done right.",
    weaknesses: "Your pride can sometimes make you arrogant. You may be too critical of others who don't meet your standards.",
    career: "You excel in careers that require attention to detail and hard work. Your meticulous nature makes you perfect for roles in accounting, law, or quality control.",
    love: "In relationships, you're loyal and devoted. You seek a partner who appreciates your dedication and standards.",
    bestMatches: ['Ox 🐂', 'Dragon 🐉', 'Snake 🐍'],
    luckyNumbers: [5, 7, 8],
    luckyColors: ['Gold', 'Brown', 'Yellow'],
    guidance: {
      daily: {
        high: ["Your attention to detail shines", "Hard work brings rewards", "Pride in achievements grows", "Organization pays off", "Leadership opportunities arise"],
        medium: ["Maintain high standards", "Balance perfectionism with speed", "Team collaboration beneficial", "Health maintenance important", "Practice humility"],
        low: ["Avoid being overly critical", "Accept imperfections", "Take time to rest", "Don't compare yourself to others", "Practice self-compassion"],
      },
      weekly: {
        high: ["Excellence recognized", "Hard work pays off", "Detail-oriented success", "Leadership opportunities increase", "Financial stability grows"],
        medium: ["Maintain quality standards", "Good for detailed projects", "Balance work and rest", "Health needs attention", "Delegate when possible"],
        low: ["Slow your pace", "Accept help from others", "Practice patience", "Extra rest needed", "Focus on progress not perfection"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  dog: {
    name: 'Dog',
    icon: '🐕',
    subtitle: 'The Loyal Protector',
    personality: "Dogs are loyal, courageous, and responsible. They have a strong sense of justice and are known for their honesty and willingness to help others.",
    traits: ['Loyal', 'Courageous', 'Responsible', 'Honest', 'Just', 'Helpful'],
    strengths: "Your loyalty and honesty are your greatest assets. You have a natural sense of justice and are always willing to stand up for what's right.",
    weaknesses: "Your loyalty can sometimes make you overly suspicious of others. You may have difficulty forgiving those who betray your trust.",
    career: "You excel in careers that require trust and responsibility. Your honest nature makes you perfect for roles in law enforcement, healthcare, or customer service.",
    love: "In relationships, you're fiercely loyal and protective. You seek a partner who values honesty and commitment.",
    bestMatches: ['Tiger 🐅', 'Rabbit 🐇', 'Horse 🐎'],
    luckyNumbers: [3, 4, 9],
    luckyColors: ['Green', 'Red', 'Purple'],
    guidance: {
      daily: {
        high: ["Your loyalty earns trust", "Honesty brings success", "Protective instincts helpful", "Justice prevails", "Helping others rewards you"],
        medium: ["Maintain your principles", "Balance trust and caution", "Support others genuinely", "Health maintenance important", "Practice forgiveness"],
        low: ["Avoid excessive suspicion", "Let go of past hurts", "Be more open to trust", "Take time for self-care", "Practice patience"],
      },
      weekly: {
        high: ["Trust strengthens bonds", "Honesty recognized", "Protective actions appreciated", "Justice served", "Helping brings connections"],
        medium: ["Build on trustworthy relationships", "Good for team work", "Balance giving and receiving", "Health needs attention", "Practice healthy boundaries"],
        low: ["Focus on self-protection", "Limit emotional investment", "Extra rest beneficial", "Practice self-compassion", "Rebuild trust slowly"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
  pig: {
    name: 'Pig',
    icon: '🐖',
    subtitle: 'The Generous Peacemaker',
    personality: "Pigs are compassionate, generous, and diligent. They have a peaceful nature and are known for their kindness and willingness to help others.",
    traits: ['Compassionate', 'Generous', 'Diligent', 'Peaceful', 'Kind', 'Trusting'],
    strengths: "Your compassion and generosity are your greatest assets. You have a natural ability to create peace and bring comfort to others.",
    weaknesses: "Your trusting nature can sometimes make you vulnerable. You may have difficulty saying no to others' requests.",
    career: "You excel in careers that require compassion and dedication. Your caring nature makes you perfect for roles in healthcare, education, or charity work.",
    love: "In relationships, you're loving and supportive. You seek a partner who appreciates your kindness and generosity.",
    bestMatches: ['Tiger 🐅', 'Rabbit 🐇', 'Goat 🐐'],
    luckyNumbers: [2, 5, 8],
    luckyColors: ['Yellow', 'Brown', 'Gold'],
    guidance: {
      daily: {
        high: ["Your compassion brings joy", "Generosity rewarded", "Peaceful feelings prevail", "Kindness strengthens bonds", "Diligence pays off"],
        medium: ["Continue helping others", "Practice self-care", "Balance giving and receiving", "Trust your intuition", "Maintain peace"],
        low: ["Set healthy boundaries", "Don't overextend yourself", "Practice saying no", "Take quiet time", "Focus on your own needs"],
      },
      weekly: {
        high: ["Compassion brings connections", "Generosity returns", "Peaceful week ahead", "Relationship harmony", "Diligence recognized"],
        medium: ["Help others genuinely", "Good for charitable acts", "Balance self and others", "Health maintenance important", "Practice gratitude"],
        low: ["Focus on self-compassion", "Limit giving", "Extra rest needed", "Practice boundaries", "Recharge your energy"],
      },
      monthly: {
        high: ["Excellent month for career advancement", "Financial investments look favorable", "Relationships will flourish", "Travel opportunities may arise", "Creative projects will succeed"],
        medium: ["Steady progress in work", "Good time for learning new skills", "Family matters need attention", "Health maintenance is important", "Balance different areas of life"],
        low: ["Be cautious with major changes", "Focus on self-improvement", "Avoid risky investments", "Take care of health", "Patience will be rewarded"],
      },
      yearly: {
        high: ["Year of growth and opportunity", "Career breakthrough possible", "Financial prosperity ahead", "Love and romance favored", "New ventures will succeed"],
        medium: ["Steady progress expected", "Good year for learning", "Relationships need work", "Health requires attention", "Balance ambition with caution"],
        low: ["Challenging year ahead", "Focus on foundations", "Avoid major risks", "Patience is key", "Learn from setbacks"],
      },
    },
  },
};

// Lunar New Year dates for accurate zodiac calculation
export const lunarNewYearDates: Record<number, string> = {
  1984: '2/2', 1985: '2/20', 1986: '2/9', 1987: '1/29', 1988: '2/17', 1989: '2/6',
  1990: '1/27', 1991: '2/15', 1992: '2/4', 1993: '1/23', 1994: '2/10', 1995: '1/31',
  1996: '2/19', 1997: '2/7', 1998: '1/28', 1999: '2/16', 2000: '2/5', 2001: '1/24',
  2002: '2/12', 2003: '2/1', 2004: '1/22', 2005: '2/9', 2006: '1/29', 2007: '2/18',
  2008: '2/7', 2009: '1/26', 2010: '2/14', 2011: '2/3', 2012: '1/23', 2013: '2/10',
  2014: '1/31', 2015: '2/19', 2016: '2/8', 2017: '1/28', 2018: '2/16', 2019: '2/5',
  2020: '1/25', 2021: '2/12', 2022: '2/1', 2023: '1/22', 2024: '2/10', 2025: '1/29',
  2026: '2/17', 2027: '2/6', 2028: '1/26', 2029: '2/13', 2030: '2/3', 2031: '1/23',
  2032: '2/11', 2033: '1/31', 2034: '2/19', 2035: '2/8', 2036: '1/28', 2037: '2/15',
  2038: '2/4', 2039: '1/24', 2040: '2/12', 2041: '2/1', 2042: '1/22', 2043: '2/10',
  2044: '1/30', 2045: '2/17', 2046: '2/6', 2047: '1/26', 2048: '2/14', 2049: '2/2',
  2050: '1/23', 2051: '2/11', 2052: '2/1', 2053: '2/19', 2054: '2/8', 2055: '1/28',
  2056: '2/15', 2057: '2/4', 2058: '1/24', 2059: '2/12', 2060: '2/2', 2061: '1/21',
  2062: '2/9', 2063: '1/29', 2064: '2/17', 2065: '2/5', 2066: '1/26', 2067: '2/14',
  2068: '2/3', 2069: '1/23', 2070: '2/11', 2071: '1/31', 2072: '2/19', 2073: '2/7',
  2074: '1/27', 2075: '2/15',
};
