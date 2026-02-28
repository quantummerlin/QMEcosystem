// Comprehensive daily insights for each zodiac animal

export interface DailyInsight {
  // Core daily guidance
  overallEnergy: string;
  energyLevel: 'high' | 'medium' | 'low';
  
  // Lucky information
  luckyHours: string[];
  luckyDirections: string[];
  luckyColors: string[];
  
  // Daily activities
  auspiciousActivities: string[];
  activitiesToAvoid: string[];
  
  // Specific areas
  career: {
    rating: number; // 1-5
    advice: string;
    opportunities: string[];
    warnings: string[];
  };
  
  love: {
    rating: number;
    advice: string;
    singles: string;
    couples: string;
  };
  
  wealth: {
    rating: number;
    advice: string;
    luckyActions: string[];
    warnings: string[];
  };
  
  health: {
    rating: number;
    advice: string;
    focusAreas: string[];
    tips: string[];
  };
  
  // Quick daily tips
  morningRitual: string;
  afternoonFocus: string;
  eveningReflection: string;
  
  // Affirmation
  dailyAffirmation: string;
  
  // Warnings & cautions
  cautions: string[];
  
  // Element-specific daily boost
  elementBoost: {
    element: string;
    action: string;
    item: string;
  };
}

// Generate daily insights for each zodiac animal
export const generateDailyInsight = (animal: string, element: string): DailyInsight => {
  const insights: Record<string, DailyInsight> = {
    rat: {
      overallEnergy: "Your quick wit and adaptability are your superpowers today. Trust your instincts when opportunities arise.",
      energyLevel: 'high',
      luckyHours: ['9:00-11:00 AM', '3:00-5:00 PM', '7:00-9:00 PM'],
      luckyDirections: ['North', 'Northeast'],
      luckyColors: ['Blue', 'Gold', 'Silver'],
      auspiciousActivities: ['Networking', 'Financial planning', 'Starting new projects', 'Problem-solving'],
      activitiesToAvoid: ['Making impulsive purchases', 'Confronting authority', 'Overcommitting'],
      career: {
        rating: 5,
        advice: "Your innovative ideas will be well-received. Present your proposals with confidence.",
        opportunities: ['New project assignments', 'Recognition from superiors', 'Collaboration offers'],
        warnings: ['Avoid office gossip', "Don't take on too many tasks"],
      },
      love: {
        rating: 4,
        advice: "Your charm is magnetic today. Be open to unexpected connections.",
        singles: "A chance encounter could lead to something special. Stay alert in social settings.",
        couples: "Plan a surprise for your partner. Small gestures create big impacts today.",
      },
      wealth: {
        rating: 4,
        advice: "Financial opportunities are flowing. Trust your instincts but verify details.",
        luckyActions: ['Review investments', 'Negotiate deals', 'Seek financial advice'],
        warnings: ['Avoid risky speculation', "Don't lend money today"],
      },
      health: {
        rating: 4,
        advice: "Your energy is high, but pace yourself. Mental stimulation is as important as physical activity.",
        focusAreas: ['Mental clarity', 'Stress management', 'Eye health'],
        tips: ['Take screen breaks', 'Practice deep breathing', 'Stay hydrated'],
      },
      morningRitual: "Start with a 5-minute meditation to sharpen your intuition for the day ahead.",
      afternoonFocus: "Tackle your most challenging tasks. Your problem-solving abilities peak now.",
      eveningReflection: "Journal about today's wins and insights. Your mind processes best before sleep.",
      dailyAffirmation: "I trust my instincts and attract opportunities effortlessly.",
      cautions: ['Avoid overthinking small decisions', "Don't let perfectionism slow you down"],
      elementBoost: {
        element: element,
        action: element === 'Water' ? 'Meditate near water' : element === 'Fire' ? 'Light a candle' : element === 'Wood' ? 'Spend time in nature' : element === 'Metal' ? 'Organize your space' : 'Ground yourself with earthy scents',
        item: element === 'Water' ? 'Blue crystal' : element === 'Fire' ? 'Red accessory' : element === 'Wood' ? 'Wooden bracelet' : element === 'Metal' ? 'Silver jewelry' : 'Clay or stone item',
      },
    },
    
    ox: {
      overallEnergy: "Your steady determination brings progress today. Slow and consistent wins the race.",
      energyLevel: 'medium',
      luckyHours: ['7:00-9:00 AM', '1:00-3:00 PM', '5:00-7:00 PM'],
      luckyDirections: ['North', 'Southeast'],
      luckyColors: ['Yellow', 'Brown', 'Green'],
      auspiciousActivities: ['Long-term planning', 'Physical exercise', 'Home organization', 'Quality time with family'],
      activitiesToAvoid: ['Rushing decisions', 'Taking unnecessary risks', 'Skipping meals'],
      career: {
        rating: 4,
        advice: "Your reliability is noticed. Focus on completing ongoing projects before starting new ones.",
        opportunities: ['Leadership roles', 'Mentoring opportunities', 'Skill development'],
        warnings: ['Avoid stubbornness in team discussions', "Don't resist necessary changes"],
      },
      love: {
        rating: 3,
        advice: "Stability is attractive. Show your dependable side to strengthen bonds.",
        singles: "Look for someone who values loyalty as much as you do. Quality over quantity.",
        couples: "Create routines together. Shared habits build lasting connections.",
      },
      wealth: {
        rating: 4,
        advice: "Consistent savings matter more than big wins. Review your budget today.",
        luckyActions: ['Set up automatic savings', 'Review long-term investments', 'Declutter and sell unused items'],
        warnings: ['Avoid get-rich-quick schemes', "Don't make large purchases impulsively"],
      },
      health: {
        rating: 4,
        advice: "Your physical strength is good, but watch your digestion. Eat mindfully.",
        focusAreas: ['Digestive health', 'Joint mobility', 'Consistent sleep schedule'],
        tips: ['Eat slowly and chew thoroughly', 'Stretch after sitting long periods', 'Maintain regular meal times'],
      },
      morningRitual: "Begin with gentle stretching to awaken your body gradually and steadily.",
      afternoonFocus: "Work on tasks requiring persistence. Your stamina is your advantage now.",
      eveningReflection: "Review what you accomplished today. Celebrate small victories.",
      dailyAffirmation: "I build my dreams one steady step at a time.",
      cautions: ['Avoid being too rigid in your approach', "Don't ignore your body's need for rest"],
      elementBoost: {
        element: element,
        action: element === 'Earth' ? 'Garden or pot plants' : element === 'Water' ? 'Take a long bath' : element === 'Fire' ? 'Cook a warm meal' : element === 'Metal' ? 'Practice precision tasks' : 'Walk barefoot on grass',
        item: element === 'Earth' ? 'Clay pottery' : element === 'Water' ? 'Sea salt' : element === 'Fire' ? 'Cinnamon stick' : element === 'Metal' ? 'Brass item' : 'Bamboo accessory',
      },
    },
    
    tiger: {
      overallEnergy: "Your courage and charisma shine today. Take bold steps toward your goals.",
      energyLevel: 'high',
      luckyHours: ['3:00-5:00 AM', '11:00 AM-1:00 PM', '7:00-9:00 PM'],
      luckyDirections: ['East', 'Southeast'],
      luckyColors: ['Orange', 'Purple', 'Black'],
      auspiciousActivities: ['Taking calculated risks', 'Leadership opportunities', 'Physical activities', 'Creative pursuits'],
      activitiesToAvoid: ['Reckless behavior', 'Ignoring advice', 'Starting conflicts'],
      career: {
        rating: 5,
        advice: "Lead with confidence. Your natural authority opens doors today.",
        opportunities: ['New ventures', 'Promotions', 'Public speaking engagements'],
        warnings: ['Avoid impulsive career moves', "Don't burn bridges with colleagues"],
      },
      love: {
        rating: 5,
        advice: "Passion is high. Express your feelings boldly but thoughtfully.",
        singles: "Your magnetism is strong. Be bold in expressing interest.",
        couples: "Plan an adventurous date. Shared excitement strengthens bonds.",
      },
      wealth: {
        rating: 3,
        advice: "Opportunities exist but require careful evaluation. Don't let excitement cloud judgment.",
        luckyActions: ['Research before investing', 'Seek expert advice', 'Diversify your portfolio'],
        warnings: ['Avoid gambling', "Don't make financial decisions in anger"],
      },
      health: {
        rating: 4,
        advice: "Your energy is high but channel it wisely. Avoid burnout through proper rest.",
        focusAreas: ['Cardiovascular health', 'Stress management', 'Sleep quality'],
        tips: ['Engage in vigorous exercise', 'Practice anger management techniques', 'Wind down before bed'],
      },
      morningRitual: "Start with an energizing activity - a brisk walk or dynamic stretching.",
      afternoonFocus: "Channel your energy into challenging projects. Your drive is at its peak.",
      eveningReflection: "Release the day's intensity through journaling or creative expression.",
      dailyAffirmation: "I embrace challenges with courage and emerge stronger.",
      cautions: ['Avoid unnecessary confrontations', "Don't let pride override wisdom"],
      elementBoost: {
        element: element,
        action: element === 'Fire' ? 'Practice sun salutations' : element === 'Wood' ? 'Climb stairs or hike' : element === 'Water' ? 'Swim or do water aerobics' : element === 'Metal' ? 'Practice martial arts' : 'Strength training',
        item: element === 'Fire' ? 'Tiger eye stone' : element === 'Wood' ? 'Jade bracelet' : element === 'Water' ? 'Aquamarine' : element === 'Metal' ? 'Iron accessory' : 'Amber pendant',
      },
    },
    
    rabbit: {
      overallEnergy: "Your gentle diplomacy creates harmony today. Trust your refined instincts.",
      energyLevel: 'medium',
      luckyHours: ['5:00-7:00 AM', '1:00-3:00 PM', '9:00-11:00 PM'],
      luckyDirections: ['East', 'South'],
      luckyColors: ['Pink', 'Purple', 'Blue'],
      auspiciousActivities: ['Diplomatic negotiations', 'Creative work', 'Self-care rituals', 'Home decoration'],
      activitiesToAvoid: ['Confrontations', 'Making hasty decisions', 'Overextending socially'],
      career: {
        rating: 4,
        advice: "Your attention to detail shines. Focus on quality over quantity in your work.",
        opportunities: ['Creative projects', 'Collaborative work', 'Client relations'],
        warnings: ['Avoid taking criticism personally', "Don't avoid necessary difficult conversations"],
      },
      love: {
        rating: 5,
        advice: "Romance is in the air. Your gentle nature attracts deep connections.",
        singles: "A meaningful connection may develop slowly. Patience brings rewards.",
        couples: "Create a peaceful, beautiful environment together. Aesthetics matter today.",
      },
      wealth: {
        rating: 3,
        advice: "Conservative approaches serve you best. Avoid speculative investments.",
        luckyActions: ['Save consistently', 'Invest in quality items', 'Review insurance policies'],
        warnings: ['Avoid lending money', "Don't be pressured into financial decisions"],
      },
      health: {
        rating: 4,
        advice: "Your nervous system needs care. Create calm in your environment.",
        focusAreas: ['Nervous system', 'Respiratory health', 'Skin care'],
        tips: ['Practice gentle yoga', 'Use calming essential oils', 'Maintain a peaceful sleep environment'],
      },
      morningRitual: "Begin with gentle movements and breathing exercises to center yourself.",
      afternoonFocus: "Work on detailed tasks requiring precision. Your focus is sharp now.",
      eveningReflection: "Create beauty in your space. Arrange flowers or light candles.",
      dailyAffirmation: "I create peace and beauty wherever I go.",
      cautions: ['Avoid overthinking', "Don't let fear of conflict prevent necessary discussions"],
      elementBoost: {
        element: element,
        action: element === 'Wood' ? 'Arrange fresh flowers' : element === 'Water' ? 'Listen to flowing water sounds' : element === 'Fire' ? 'Enjoy candlelight' : element === 'Metal' ? 'Wear elegant jewelry' : 'Create a cozy nest space',
        item: element === 'Wood' ? 'Rose quartz' : element === 'Water' ? 'Moonstone' : element === 'Fire' ? 'Carnelian' : element === 'Metal' ? 'Pearl' : 'Ceramic piece',
      },
    },
    
    dragon: {
      overallEnergy: "Your powerful presence commands attention today. Use your influence wisely.",
      energyLevel: 'high',
      luckyHours: ['7:00-9:00 AM', '3:00-5:00 PM', '11:00 PM-1:00 AM'],
      luckyDirections: ['East', 'Southeast', 'South'],
      luckyColors: ['Gold', 'Silver', 'Gray'],
      auspiciousActivities: ['Leadership roles', 'Big presentations', 'Starting major projects', 'Networking events'],
      activitiesToAvoid: ['Micromanaging', 'Ignoring others\' input', 'Overspending to impress'],
      career: {
        rating: 5,
        advice: "Your vision inspires others. Step into leadership opportunities confidently.",
        opportunities: ['Executive decisions', 'Vision casting', 'Team building'],
        warnings: ['Avoid arrogance', "Don't overlook details in big picture thinking"],
      },
      love: {
        rating: 4,
        advice: "Your charisma is undeniable. Balance passion with genuine connection.",
        singles: "Your magnetism attracts admirers. Choose quality connections.",
        couples: "Plan something grand. Your partner appreciates your ambitious nature.",
      },
      wealth: {
        rating: 5,
        advice: "Fortune favors the bold. Strategic risks can pay off handsomely.",
        luckyActions: ['Invest in growth opportunities', 'Negotiate from strength', 'Expand your portfolio'],
        warnings: ['Avoid showing off wealth', "Don't ignore financial advice completely"],
      },
      health: {
        rating: 3,
        advice: "Your drive may push you too hard. Schedule rest as diligently as work.",
        focusAreas: ['Heart health', 'Blood pressure', 'Stress levels'],
        tips: ['Monitor caffeine intake', 'Practice heart-opening exercises', 'Schedule regular breaks'],
      },
      morningRitual: "Visualize your success for the day. Your mind creates your reality.",
      afternoonFocus: "Tackle your most ambitious goals. Your power is at its peak.",
      eveningReflection: "Acknowledge your achievements. Gratitude amplifies abundance.",
      dailyAffirmation: "I am powerful, confident, and worthy of my dreams.",
      cautions: ['Avoid dominating conversations', "Don't let perfectionism paralyze you"],
      elementBoost: {
        element: element,
        action: element === 'Fire' ? 'Practice power poses' : element === 'Earth' ? 'Stand barefoot on earth' : element === 'Metal' ? 'Wear statement pieces' : element === 'Water' ? 'Take a luxurious bath' : 'Practice in nature',
        item: element === 'Fire' ? 'Ruby' : element === 'Earth' ? 'Citrine' : element === 'Metal' ? 'Gold jewelry' : element === 'Water' ? 'Sapphire' : 'Emerald',
      },
    },
    
    snake: {
      overallEnergy: "Your wisdom and intuition guide you today. Trust what you sense beneath the surface.",
      energyLevel: 'medium',
      luckyHours: ['9:00-11:00 AM', '5:00-7:00 PM', '1:00-3:00 AM'],
      luckyDirections: ['South', 'Southwest'],
      luckyColors: ['Black', 'Red', 'Yellow'],
      auspiciousActivities: ['Research and analysis', 'Strategic planning', 'Meditation', 'Behind-the-scenes work'],
      activitiesToAvoid: ['Rushing to conclusions', 'Oversharing information', 'Ignoring red flags'],
      career: {
        rating: 4,
        advice: "Your analytical skills shine. Dive deep into complex problems.",
        opportunities: ['Research projects', 'Strategic roles', 'Consulting opportunities'],
        warnings: ['Avoid secrecy that harms trust', "Don't overanalyze to the point of inaction"],
      },
      love: {
        rating: 4,
        advice: "Deep connections matter more than surface charm. Be authentically mysterious.",
        singles: "Quality over quantity. One meaningful conversation beats many superficial ones.",
        couples: "Share your deeper thoughts. Intimacy grows through vulnerability.",
      },
      wealth: {
        rating: 4,
        advice: "Your research pays off. Thorough analysis leads to smart investments.",
        luckyActions: ['Conduct due diligence', 'Seek hidden opportunities', 'Review fine print carefully'],
        warnings: ['Avoid suspicious schemes', "Don't keep financial secrets from partners"],
      },
      health: {
        rating: 4,
        advice: "Your nervous system needs care. Balance mental activity with physical movement.",
        focusAreas: ['Nervous system', 'Digestive health', 'Skin conditions'],
        tips: ['Practice grounding exercises', 'Eat foods that support digestion', 'Get adequate sleep'],
      },
      morningRitual: "Practice mindfulness meditation to sharpen your intuitive senses.",
      afternoonFocus: "Delve into research or analysis. Your investigative skills are heightened.",
      eveningReflection: "Journal your insights. Your subconscious reveals wisdom in quiet moments.",
      dailyAffirmation: "I trust my inner wisdom to guide me toward truth.",
      cautions: ['Avoid excessive secrecy', "Don't let suspicion poison relationships"],
      elementBoost: {
        element: element,
        action: element === 'Fire' ? 'Practice candle gazing' : element === 'Earth' ? 'Walk in silence' : element === 'Metal' ? 'Practice precision breathing' : element === 'Water' ? 'Float in water' : 'Meditate in nature',
        item: element === 'Fire' ? 'Garnet' : element === 'Earth' ? 'Onyx' : element === 'Metal' ? 'Platinum accessory' : element === 'Water' ? 'Obsidian' : 'Malachite',
      },
    },
    
    horse: {
      overallEnergy: "Your free spirit craves movement and adventure today. Follow your enthusiasm.",
      energyLevel: 'high',
      luckyHours: ['11:00 AM-1:00 PM', '7:00-9:00 PM', '3:00-5:00 AM'],
      luckyDirections: ['South', 'Northwest'],
      luckyColors: ['Yellow', 'Green', 'Brown'],
      auspiciousActivities: ['Travel planning', 'Physical exercise', 'Social gatherings', 'Learning new skills'],
      activitiesToAvoid: ['Being confined', 'Boring routines', 'Making long-term commitments'],
      career: {
        rating: 4,
        advice: "Your energy is contagious. Use it to motivate teams and drive projects forward.",
        opportunities: ['Travel for work', 'Public speaking', 'Dynamic projects'],
        warnings: ['Avoid jumping between tasks', "Don't promise more than you can deliver"],
      },
      love: {
        rating: 4,
        advice: "Spontaneity keeps romance alive. Surprise your partner with adventure.",
        singles: "Social events bring opportunities. Your vibrant energy attracts others.",
        couples: "Plan an adventure together. Shared experiences deepen your bond.",
      },
      wealth: {
        rating: 3,
        advice: "Income opportunities flow but require discipline to retain. Budget carefully.",
        luckyActions: ['Explore multiple income streams', 'Invest in experiences', 'Review spending habits'],
        warnings: ['Avoid impulse purchases', "Don't chase get-rich-quick schemes"],
      },
      health: {
        rating: 4,
        advice: "Your physical energy is high. Channel it into beneficial activities.",
        focusAreas: ['Cardiovascular fitness', 'Leg strength', 'Mental restlessness'],
        tips: ['Engage in cardio exercise', 'Practice stillness meditation', 'Maintain varied activities'],
      },
      morningRitual: "Start with movement - a run, dance, or brisk walk to awaken your energy.",
      afternoonFocus: "Tackle dynamic tasks. Your energy peaks in active engagement.",
      eveningReflection: "Wind down gradually. Transition from activity to rest mindfully.",
      dailyAffirmation: "I embrace freedom while creating meaningful connections.",
      cautions: ['Avoid restlessness that leads to mistakes', "Don't abandon projects prematurely"],
      elementBoost: {
        element: element,
        action: element === 'Fire' ? 'Dance freely' : element === 'Earth' ? 'Run on trails' : element === 'Metal' ? 'Cycle or skate' : element === 'Water' ? 'Swim laps' : 'Gallop or sprint',
        item: element === 'Fire' ? 'Sunstone' : element === 'Earth' ? 'Jasper' : element === 'Metal' ? 'Steel watch' : element === 'Water' ? 'Blue lace agate' : 'Moss agate',
      },
    },
    
    goat: {
      overallEnergy: "Your creative sensitivity brings beauty and harmony to everything you touch today.",
      energyLevel: 'medium',
      luckyHours: ['1:00-3:00 PM', '9:00-11:00 PM', '5:00-7:00 AM'],
      luckyDirections: ['South', 'Southwest'],
      luckyColors: ['Brown', 'Red', 'Purple'],
      auspiciousActivities: ['Creative projects', 'Helping others', 'Home beautification', 'Artistic pursuits'],
      activitiesToAvoid: ['Harsh criticism', 'Competitive environments', 'Neglecting self-care'],
      career: {
        rating: 3,
        advice: "Your creative solutions are valuable. Present them with quiet confidence.",
        opportunities: ['Creative roles', 'Supportive positions', 'Collaborative projects'],
        warnings: ['Avoid being taken advantage of', "Don't let sensitivity derail you"],
      },
      love: {
        rating: 5,
        advice: "Your nurturing nature creates deep bonds. Express your affection freely.",
        singles: "Your gentle soul attracts those seeking genuine connection. Be yourself.",
        couples: "Create something beautiful together. Shared creativity strengthens love.",
      },
      wealth: {
        rating: 3,
        advice: "Steady progress matters more than big wins. Focus on sustainable growth.",
        luckyActions: ['Save consistently', 'Invest in art or beauty', 'Support ethical businesses'],
        warnings: ['Avoid emotional spending', "Don't lend to unreliable people"],
      },
      health: {
        rating: 4,
        advice: "Your sensitive nature requires gentle care. Create peaceful surroundings.",
        focusAreas: ['Emotional wellbeing', 'Respiratory health', 'Skin sensitivity'],
        tips: ['Create a calming environment', 'Practice gentle exercise', 'Use natural skincare'],
      },
      morningRitual: "Begin with gentle stretching and gratitude for the beauty in your life.",
      afternoonFocus: "Engage in creative work. Your artistic sensibilities are heightened.",
      eveningReflection: "Create something beautiful - journal, sketch, or arrange flowers.",
      dailyAffirmation: "I create beauty and harmony in my world.",
      cautions: ['Avoid absorbing others\' negativity', "Don't let self-doubt limit you"],
      elementBoost: {
        element: element,
        action: element === 'Fire' ? 'Paint or draw' : element === 'Earth' ? 'Garden or craft' : element === 'Metal' ? 'Sculpt or carve' : element === 'Water' ? 'Play music' : 'Create with natural materials',
        item: element === 'Fire' ? 'Coral' : element === 'Earth' ? 'Clay bead' : element === 'Metal' ? 'Copper bracelet' : element === 'Water' ? 'Abalone shell' : 'Wooden charm',
      },
    },
    
    monkey: {
      overallEnergy: "Your clever mind finds solutions where others see problems. Enjoy the mental challenge.",
      energyLevel: 'high',
      luckyHours: ['3:00-5:00 PM', '11:00 PM-1:00 AM', '7:00-9:00 AM'],
      luckyDirections: ['West', 'Southwest'],
      luckyColors: ['White', 'Blue', 'Gold'],
      auspiciousActivities: ['Problem-solving', 'Learning new skills', 'Socializing', 'Multitasking'],
      activitiesToAvoid: ['Boring repetition', 'Overcommitting', 'Playing pranks'],
      career: {
        rating: 5,
        advice: "Your innovative ideas shine. Present them with your natural charm.",
        opportunities: ['Innovation projects', 'Tech roles', 'Consulting gigs'],
        warnings: ['Avoid distractions', "Don't let cleverness replace thoroughness"],
      },
      love: {
        rating: 4,
        advice: "Your wit is attractive. Balance humor with genuine emotional connection.",
        singles: "Your playful nature attracts many. Seek someone who appreciates your mind.",
        couples: "Keep things fun and fresh. Laughter strengthens your bond.",
      },
      wealth: {
        rating: 4,
        advice: "Your quick thinking spots opportunities. Verify before acting on them.",
        luckyActions: ['Explore innovative investments', 'Develop multiple skills', 'Network strategically'],
        warnings: ['Avoid get-rich-quick schemes', "Don't take unnecessary financial risks"],
      },
      health: {
        rating: 4,
        advice: "Your active mind needs physical outlets. Balance mental and physical activity.",
        focusAreas: ['Nervous system', 'Hand and wrist health', 'Mental rest'],
        tips: ['Take frequent movement breaks', 'Practice hand stretches', 'Meditate to calm the mind'],
      },
      morningRitual: "Challenge your brain with puzzles or learning something new.",
      afternoonFocus: "Tackle complex problems. Your mental agility is at its peak.",
      eveningReflection: "Play games or engage in light entertainment to unwind.",
      dailyAffirmation: "My clever mind creates solutions and opportunities.",
      cautions: ['Avoid restlessness', "Don't use humor to deflect from real issues"],
      elementBoost: {
        element: element,
        action: element === 'Metal' ? 'Solve puzzles' : element === 'Water' ? 'Learn something new' : element === 'Fire' ? 'Play competitive games' : element === 'Earth' ? 'Build or construct' : 'Explore and discover',
        item: element === 'Metal' ? 'Silver puzzle piece' : element === 'Water' ? 'Lapis lazuli' : element === 'Fire' ? 'Red jasper' : element === 'Earth' ? 'Petrified wood' : 'Clear quartz',
      },
    },
    
    rooster: {
      overallEnergy: "Your attention to detail and pride in excellence set you apart today. Shine brightly.",
      energyLevel: 'high',
      luckyHours: ['5:00-7:00 PM', '1:00-3:00 AM', '9:00-11:00 AM'],
      luckyDirections: ['West', 'Southwest'],
      luckyColors: ['Gold', 'Brown', 'Yellow'],
      auspiciousActivities: ['Detail-oriented work', 'Presentations', 'Organization', 'Quality control'],
      activitiesToAvoid: ['Sloppy work', 'Ignoring feedback', 'Being overly critical'],
      career: {
        rating: 5,
        advice: "Your precision is valued. Take pride in delivering excellent work.",
        opportunities: ['Quality assurance roles', 'Management positions', 'Public recognition'],
        warnings: ['Avoid perfectionism paralysis', "Don't criticize without offering solutions"],
      },
      love: {
        rating: 3,
        advice: "Your standards are high. Ensure they don't prevent connection.",
        singles: "Look for someone who appreciates your attention to detail and shares your values.",
        couples: "Show appreciation for your partner's efforts. Acknowledge the details they get right.",
      },
      wealth: {
        rating: 4,
        advice: "Thorough research leads to smart decisions. Your diligence pays off.",
        luckyActions: ['Review finances carefully', 'Invest in quality', 'Seek professional advice'],
        warnings: ['Avoid penny-wise pound-foolish decisions', "Don't let pride prevent asking for help"],
      },
      health: {
        rating: 4,
        advice: "Your active nature serves you well. Pay attention to warning signs.",
        focusAreas: ['Respiratory health', 'Posture', 'Eye strain'],
        tips: ['Practice good posture', 'Take screen breaks', 'Maintain regular exercise'],
      },
      morningRitual: "Organize your day with precision. A clear plan sets you up for success.",
      afternoonFocus: "Work on detail-oriented tasks. Your focus is sharpest now.",
      eveningReflection: "Review your accomplishments. Take pride in what you achieved.",
      dailyAffirmation: "I create excellence in everything I do.",
      cautions: ['Avoid excessive self-criticism', "Don't let pride blind you to growth opportunities"],
      elementBoost: {
        element: element,
        action: element === 'Metal' ? 'Polish or clean something' : element === 'Earth' ? 'Organize your space' : element === 'Fire' ? 'Dress to impress' : element === 'Water' ? 'Flow through routines' : 'Refine and perfect',
        item: element === 'Metal' ? 'Gold accessory' : element === 'Earth' ? 'Brown leather' : element === 'Fire' ? 'Bronze item' : element === 'Water' ? 'Mercury symbol' : 'Topaz',
      },
    },
    
    dog: {
      overallEnergy: "Your loyalty and integrity create trust today. Stand by your values.",
      energyLevel: 'medium',
      luckyHours: ['7:00-9:00 PM', '3:00-5:00 AM', '11:00 AM-1:00 PM'],
      luckyDirections: ['West', 'Northwest'],
      luckyColors: ['Green', 'Red', 'Purple'],
      auspiciousActivities: ['Helping others', 'Protecting loved ones', 'Honest conversations', 'Community work'],
      activitiesToAvoid: ['Suspicion without cause', 'Holding grudges', 'Neglecting self-care'],
      career: {
        rating: 4,
        advice: "Your reliability is your greatest asset. Teams trust you with important tasks.",
        opportunities: ['Team leadership', 'Supportive roles', 'Trust-based positions'],
        warnings: ['Avoid excessive worry about job security', "Don't let loyalty trap you in bad situations"],
      },
      love: {
        rating: 5,
        advice: "Your loyalty creates deep, lasting bonds. Show your devotion through actions.",
        singles: "Your genuine nature attracts those seeking authentic connection. Be patient.",
        couples: "Your partner values your faithfulness. Small acts of loyalty mean everything.",
      },
      wealth: {
        rating: 3,
        advice: "Steady progress through honest work. Avoid shortcuts that compromise integrity.",
        luckyActions: ['Save consistently', 'Invest in trustworthy institutions', 'Support ethical businesses'],
        warnings: ['Avoid suspicious schemes', "Don't let generosity exceed your means"],
      },
      health: {
        rating: 4,
        advice: "Your protective nature extends to yourself. Prioritize your wellbeing.",
        focusAreas: ['Immune system', 'Joint health', 'Mental peace'],
        tips: ['Maintain regular exercise', 'Practice stress management', 'Get adequate rest'],
      },
      morningRitual: "Set your intentions for being of service while protecting your energy.",
      afternoonFocus: "Support others while maintaining boundaries. Balance giving and receiving.",
      eveningReflection: "Reflect on how you helped others today. Service brings fulfillment.",
      dailyAffirmation: "My loyalty and integrity create trust and meaningful connections.",
      cautions: ['Avoid suspicion without cause', "Don't let past betrayals close your heart"],
      elementBoost: {
        element: element,
        action: element === 'Earth' ? 'Walk a dog or in nature' : element === 'Fire' ? 'Protect something valuable' : element === 'Metal' ? 'Strengthen boundaries' : element === 'Water' ? 'Flow with loyalty' : 'Stand firm in values',
        item: element === 'Earth' ? 'Green aventurine' : element === 'Fire' ? 'Red coral' : element === 'Metal' ? 'Iron charm' : element === 'Water' ? 'Aquamarine' : 'Turquoise',
      },
    },
    
    pig: {
      overallEnergy: "Your generous spirit brings joy to those around you. Enjoy life's pleasures mindfully.",
      energyLevel: 'medium',
      luckyHours: ['9:00-11:00 PM', '5:00-7:00 AM', '1:00-3:00 PM'],
      luckyDirections: ['North', 'Northwest'],
      luckyColors: ['Yellow', 'Brown', 'Gold'],
      auspiciousActivities: ['Enjoying good food', 'Social gatherings', 'Helping others', 'Creative pursuits'],
      activitiesToAvoid: ['Overindulgence', 'Overspending', 'Being taken advantage of'],
      career: {
        rating: 3,
        advice: "Your good nature serves you well in team environments. Maintain healthy boundaries.",
        opportunities: ['Supportive roles', 'Hospitality positions', 'Creative collaborations'],
        warnings: ['Avoid being too trusting', "Don't let kindness prevent necessary decisions"],
      },
      love: {
        rating: 5,
        advice: "Your warm heart attracts love easily. Choose partners who appreciate your generosity.",
        singles: "Your genuine kindness is magnetic. Look for someone who reciprocates your warmth.",
        couples: "Enjoy life's pleasures together. Shared joy deepens your bond.",
      },
      wealth: {
        rating: 3,
        advice: "Enjoyment of life is important, but balance pleasure with responsibility.",
        luckyActions: ['Save for experiences', 'Invest in quality', 'Share abundance wisely'],
        warnings: ['Avoid impulse spending', "Don't let generosity deplete your resources"],
      },
      health: {
        rating: 3,
        advice: "Enjoyment of food and comfort is fine in moderation. Balance pleasure with health.",
        focusAreas: ['Digestive health', 'Weight management', 'Cardiovascular health'],
        tips: ['Practice mindful eating', 'Balance indulgence with activity', 'Stay hydrated'],
      },
      morningRitual: "Start with gratitude for life's abundance. Set intentions for joyful giving.",
      afternoonFocus: "Enjoy your work and find pleasure in tasks. Your positive attitude is contagious.",
      eveningReflection: "Savor a good meal or enjoyable activity. You deserve life's pleasures.",
      dailyAffirmation: "I am abundant, generous, and deserving of life's joys.",
      cautions: ['Avoid overindulgence', "Don't let others take advantage of your kindness"],
      elementBoost: {
        element: element,
        action: element === 'Water' ? 'Enjoy a luxurious bath' : element === 'Fire' ? 'Cook a feast' : element === 'Earth' ? 'Savor a meal outdoors' : element === 'Metal' ? 'Invest in quality items' : 'Share abundance with others',
        item: element === 'Water' ? 'Pearl' : element === 'Fire' ? 'Carnelian' : element === 'Earth' ? 'Yellow citrine' : element === 'Metal' ? 'Gold coin' : 'Jade',
      },
    },
  };

  return insights[animal.toLowerCase()] || insights.rat;
};

// Generate weekly insights
export const generateWeeklyInsight = (animal: string, element: string) => {
  const daily = generateDailyInsight(animal, element);
  
  return {
    theme: `Week of ${daily.overallEnergy.split('.')[0]}`,
    focusAreas: ['Career growth', 'Relationship harmony', 'Personal development'],
    keyDays: {
      monday: 'Start strong with clear intentions',
      tuesday: 'Collaboration brings success',
      wednesday: 'Mid-week check-in and adjustment',
      thursday: 'Push forward on key projects',
      friday: 'Celebrate wins and plan ahead',
      saturday: 'Rest and recharge',
      sunday: 'Reflect and prepare for the week',
    },
    challenges: daily.career.warnings,
    opportunities: daily.career.opportunities,
    loveForecast: daily.love,
    wealthForecast: daily.wealth,
    healthFocus: daily.health.focusAreas,
  };
};

// Generate monthly insights
export const generateMonthlyInsight = (animal: string, element: string) => {
  const daily = generateDailyInsight(animal, element);
  
  return {
    overallTheme: `Month of ${daily.elementBoost.element} Energy`,
    keyDates: [5, 12, 19, 26],
    careerOutlook: daily.career,
    loveOutlook: daily.love,
    wealthOutlook: daily.wealth,
    healthOutlook: daily.health,
    elementInfluence: daily.elementBoost,
    bestWeeks: [2, 4],
    challenges: ['Maintaining balance', 'Managing energy levels'],
    growthAreas: ['Adaptability', 'Creativity', 'Focus'],
  };
};

// Quick daily check items
export const quickDailyChecks = [
  { id: 'energy', label: 'Energy Level', icon: '⚡' },
  { id: 'lucky-hours', label: 'Lucky Hours', icon: '🕐' },
  { id: 'career', label: 'Career', icon: '💼' },
  { id: 'love', label: 'Love', icon: '❤️' },
  { id: 'wealth', label: 'Wealth', icon: '💰' },
  { id: 'health', label: 'Health', icon: '🏃' },
  { id: 'colors', label: 'Lucky Colors', icon: '🎨' },
  { id: 'activities', label: 'Activities', icon: '✅' },
  { id: 'cautions', label: 'Cautions', icon: '⚠️' },
  { id: 'affirmation', label: 'Affirmation', icon: '✨' },
];

// Hourly guidance
export const hourlyGuidance = [
  { hour: 0, period: 'Midnight', activity: 'Rest and dream', element: 'Water' },
  { hour: 1, period: 'Early Morning', activity: 'Deep sleep, restoration', element: 'Water' },
  { hour: 3, period: 'Pre-dawn', activity: 'Subconscious processing', element: 'Wood' },
  { hour: 5, period: 'Dawn', activity: 'Gentle awakening', element: 'Wood' },
  { hour: 7, period: 'Morning', activity: 'Exercise and planning', element: 'Wood' },
  { hour: 9, period: 'Mid-morning', activity: 'Creative work', element: 'Fire' },
  { hour: 11, period: 'Late morning', activity: 'Active tasks', element: 'Fire' },
  { hour: 13, period: 'Noon', activity: 'Nourishment and rest', element: 'Fire' },
  { hour: 15, period: 'Afternoon', activity: 'Detailed work', element: 'Earth' },
  { hour: 17, period: 'Late afternoon', activity: 'Collaboration', element: 'Earth' },
  { hour: 19, period: 'Evening', activity: 'Social connections', element: 'Metal' },
  { hour: 21, period: 'Night', activity: 'Reflection and winding down', element: 'Metal' },
  { hour: 23, period: 'Late night', activity: 'Preparation for rest', element: 'Water' },
];
