import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Briefcase, Sparkles, Users } from 'lucide-react';
import { ZodiacFlipCard, GuidanceFlipCard, LuckyNumberFlipCard, CompatibilityFlipCard, SectionFlipCard, ElementBlendFlipCard } from '../components/FlipCard';
import { YearInsightsSection } from './YearInsightsSection';
import { DailyDashboard } from '../components/DailyDashboard';
import { animalNaturalElements, elementData } from '../components/ZodiacData';
import type { ZodiacResult } from './CalculatorSection';

// Complete Chinese Zodiac Compatibility Matrix
// Based on traditional compatibility: Trines (best), Sextiles (good), Neutral, Clashing (avoid)
const zodiacCompatibility: Record<string, Record<string, 'Excellent' | 'Good' | 'Moderate' | 'Challenging'>> = {
  Rat: { Rat: 'Good', Ox: 'Excellent', Tiger: 'Moderate', Rabbit: 'Moderate', Dragon: 'Excellent', Snake: 'Good', Horse: 'Challenging', Goat: 'Moderate', Monkey: 'Excellent', Rooster: 'Moderate', Dog: 'Moderate', Pig: 'Good' },
  Ox: { Rat: 'Excellent', Ox: 'Good', Tiger: 'Moderate', Rabbit: 'Moderate', Dragon: 'Good', Snake: 'Excellent', Horse: 'Challenging', Goat: 'Challenging', Monkey: 'Good', Rooster: 'Excellent', Dog: 'Moderate', Pig: 'Good' },
  Tiger: { Rat: 'Moderate', Ox: 'Moderate', Tiger: 'Good', Rabbit: 'Good', Dragon: 'Excellent', Snake: 'Challenging', Horse: 'Excellent', Goat: 'Good', Monkey: 'Challenging', Rooster: 'Moderate', Dog: 'Excellent', Pig: 'Excellent' },
  Rabbit: { Rat: 'Moderate', Ox: 'Moderate', Tiger: 'Good', Rabbit: 'Good', Dragon: 'Moderate', Snake: 'Good', Horse: 'Good', Goat: 'Excellent', Monkey: 'Moderate', Rooster: 'Challenging', Dog: 'Excellent', Pig: 'Excellent' },
  Dragon: { Rat: 'Excellent', Ox: 'Good', Tiger: 'Excellent', Rabbit: 'Moderate', Dragon: 'Good', Snake: 'Good', Horse: 'Good', Goat: 'Moderate', Monkey: 'Excellent', Rooster: 'Excellent', Dog: 'Challenging', Pig: 'Good' },
  Snake: { Rat: 'Good', Ox: 'Excellent', Tiger: 'Challenging', Rabbit: 'Good', Dragon: 'Good', Snake: 'Good', Horse: 'Moderate', Goat: 'Moderate', Monkey: 'Good', Rooster: 'Excellent', Dog: 'Moderate', Pig: 'Challenging' },
  Horse: { Rat: 'Challenging', Ox: 'Challenging', Tiger: 'Excellent', Rabbit: 'Good', Dragon: 'Good', Snake: 'Moderate', Horse: 'Good', Goat: 'Excellent', Monkey: 'Moderate', Rooster: 'Moderate', Dog: 'Excellent', Pig: 'Good' },
  Goat: { Rat: 'Moderate', Ox: 'Challenging', Tiger: 'Good', Rabbit: 'Excellent', Dragon: 'Moderate', Snake: 'Moderate', Horse: 'Excellent', Goat: 'Good', Monkey: 'Good', Rooster: 'Moderate', Dog: 'Good', Pig: 'Excellent' },
  Monkey: { Rat: 'Excellent', Ox: 'Good', Tiger: 'Challenging', Rabbit: 'Moderate', Dragon: 'Excellent', Snake: 'Good', Horse: 'Moderate', Goat: 'Good', Monkey: 'Good', Rooster: 'Moderate', Dog: 'Good', Pig: 'Moderate' },
  Rooster: { Rat: 'Moderate', Ox: 'Excellent', Tiger: 'Moderate', Rabbit: 'Challenging', Dragon: 'Excellent', Snake: 'Excellent', Horse: 'Moderate', Goat: 'Moderate', Monkey: 'Moderate', Rooster: 'Good', Dog: 'Challenging', Pig: 'Good' },
  Dog: { Rat: 'Moderate', Ox: 'Moderate', Tiger: 'Excellent', Rabbit: 'Excellent', Dragon: 'Challenging', Snake: 'Moderate', Horse: 'Excellent', Goat: 'Good', Monkey: 'Good', Rooster: 'Challenging', Dog: 'Good', Pig: 'Good' },
  Pig: { Rat: 'Good', Ox: 'Good', Tiger: 'Excellent', Rabbit: 'Excellent', Dragon: 'Good', Snake: 'Challenging', Horse: 'Good', Goat: 'Excellent', Monkey: 'Moderate', Rooster: 'Good', Dog: 'Good', Pig: 'Good' },
};

const allZodiacAnimals = [
  { name: 'Rat', icon: '🐀' },
  { name: 'Ox', icon: '🐂' },
  { name: 'Tiger', icon: '🐅' },
  { name: 'Rabbit', icon: '🐇' },
  { name: 'Dragon', icon: '🐉' },
  { name: 'Snake', icon: '🐍' },
  { name: 'Horse', icon: '🐎' },
  { name: 'Goat', icon: '🐐' },
  { name: 'Monkey', icon: '🐒' },
  { name: 'Rooster', icon: '🐓' },
  { name: 'Dog', icon: '🐕' },
  { name: 'Pig', icon: '🐖' },
];

interface ResultsSectionProps {
  result: ZodiacResult | null;
}

export function ResultsSection({ result }: ResultsSectionProps) {
  if (!result) return null;

  const elementInfo = elementData[result.element.toLowerCase()];
  const naturalElement = animalNaturalElements[result.animal] || result.element;
  
  // Get compatibility for this animal
  const userCompatibility = zodiacCompatibility[result.animal] || {};

  const generateCycle: Record<string, string> = {
    Wood: 'Fire',
    Fire: 'Earth',
    Earth: 'Metal',
    Metal: 'Water',
    Water: 'Wood',
  };

  const controlCycle: Record<string, string> = {
    Wood: 'Earth',
    Earth: 'Water',
    Water: 'Fire',
    Fire: 'Metal',
    Metal: 'Wood',
  };

  const getElementBlend = () => {
    if (result.element === naturalElement) {
      return {
        title: 'Aligned Elements',
        tone: 'text-green-600',
        description: 'Your birth element matches your animal’s natural element. This amplifies core traits and makes your sign feel “pure” and direct in expression.',
      };
    }

    if (generateCycle[result.element] === naturalElement) {
      return {
        title: 'Supportive Flow',
        tone: 'text-emerald-600',
        description: `Your ${result.element} element feeds your animal’s ${naturalElement} nature. This supports your natural traits and adds momentum and confidence.`,
      };
    }

    if (generateCycle[naturalElement] === result.element) {
      return {
        title: 'Nurtured Core',
        tone: 'text-teal-600',
        description: `Your animal’s ${naturalElement} nature nourishes your ${result.element} element. This softens your edges and adds depth and balance.`,
      };
    }

    if (controlCycle[result.element] === naturalElement) {
      return {
        title: 'Active Tension',
        tone: 'text-amber-600',
        description: `Your ${result.element} element restrains your animal’s ${naturalElement} nature. This can create inner friction, but also discipline and self-mastery.`,
      };
    }

    if (controlCycle[naturalElement] === result.element) {
      return {
        title: 'Self-Challenging',
        tone: 'text-orange-600',
        description: `Your animal’s ${naturalElement} nature presses on your ${result.element} element. This can feel like a push to grow, developing resilience and perspective.`,
      };
    }

    return {
      title: 'Mixed Blend',
      tone: 'text-purple-600',
      description: 'Your elements are different, creating a nuanced mix. This often shows up as a complex personality that adapts to different situations.',
    };
  };

  const elementBlend = getElementBlend();
  const now = new Date();
  
  // Get week info
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // Get random guidance
  const getRandomGuidance = (guidance: { high: string[]; medium: string[]; low: string[] }) => {
    const keys = ['high', 'medium', 'low'] as const;
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { level: key, items: guidance[key] };
  };

  const daily = getRandomGuidance(result.reading.guidance.daily);
  const weekly = getRandomGuidance(result.reading.guidance.weekly);
  const monthly = getRandomGuidance(result.reading.guidance.monthly);
  const yearly = getRandomGuidance(result.reading.guidance.yearly);

  // Lucky number meanings
  const luckyMeanings = [
    'Brings prosperity and success',
    'Symbolizes balance and harmony',
    'Represents creativity and growth',
    'Signifies stability and foundation',
    'Associated with adventure and change',
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Zodiac Display Card - Main Flip Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <ZodiacFlipCard
            animal={result.animal}
            element={result.element}
            icon={result.icon}
            subtitle={result.subtitle}
            traits={result.reading.traits}
          />
        </motion.div>

        {/* Daily Dashboard - NEW Comprehensive Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Daily Guide</h2>
          </div>
          <DailyDashboard 
            animal={result.animal}
            element={result.element}
            icon={result.icon}
          />
        </motion.div>

        {/* Element Guidance - Flip Card Style */}
        <motion.div
          className="perspective-1000"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ElementFlipCard 
            element={result.element}
            description={elementInfo.description}
            tips={elementInfo.tips}
          />
        </motion.div>

        <ElementBlendFlipCard
          title={elementBlend.title}
          tone={elementBlend.tone}
          birthElement={result.element}
          naturalElement={naturalElement}
          description={elementBlend.description}
        />

        <YearInsightsSection result={result} />

        {/* Guidance Flip Cards Grid */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Time-Based Guidance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GuidanceFlipCard
              type="daily"
              rating={daily.level === 'high' ? 'High Energy' : daily.level === 'medium' ? 'Moderate' : 'Low Energy'}
              ratingLevel={daily.level}
              date={now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              guidance={daily.items}
              delay={0.3}
            />
            <GuidanceFlipCard
              type="weekly"
              rating={weekly.level === 'high' ? 'Excellent' : weekly.level === 'medium' ? 'Positive' : 'Challenging'}
              ratingLevel={weekly.level}
              date={`${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              guidance={weekly.items}
              delay={0.4}
            />
            <GuidanceFlipCard
              type="monthly"
              rating={monthly.level === 'high' ? 'Excellent' : monthly.level === 'medium' ? 'Positive' : 'Challenging'}
              ratingLevel={monthly.level}
              date={now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              guidance={monthly.items}
              delay={0.5}
            />
            <GuidanceFlipCard
              type="yearly"
              rating={yearly.level === 'high' ? 'Excellent' : yearly.level === 'medium' ? 'Good' : 'Challenging'}
              ratingLevel={yearly.level}
              date={now.getFullYear().toString()}
              guidance={yearly.items}
              delay={0.6}
            />
          </div>
        </div>

        {/* Lucky Numbers - Flip Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Your Lucky Numbers</h3>
          <p className="text-gray-500 text-center mb-6">Click to reveal their meanings</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {result.reading.luckyNumbers.map((num, i) => (
              <LuckyNumberFlipCard
                key={num}
                number={num}
                meaning={luckyMeanings[i % luckyMeanings.length]}
                delay={0.8 + i * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Full Zodiac Compatibility Spectrum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Your Zodiac Compatibility</h3>
          <p className="text-gray-500 text-center mb-4">See how your {result.animal} matches with all 12 signs</p>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600"></span> Excellent</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600"></span> Good</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-600"></span> Moderate</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-pink-600"></span> Challenging</span>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {allZodiacAnimals.map((animal, i) => {
              const compatibility = userCompatibility[animal.name] || 'Moderate';
              const isSelf = animal.name === result.animal;
              return (
                <CompatibilityFlipCard
                  key={animal.name}
                  animal={animal.name}
                  icon={animal.icon}
                  compatibility={isSelf ? 'Good' : compatibility}
                  delay={1 + i * 0.05}
                />
              );
            })}
          </div>
          
          {/* Summary */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-green-600 mb-2">💚 Best Matches</h4>
              <div className="flex flex-wrap gap-1">
                {allZodiacAnimals
                  .filter(a => userCompatibility[a.name] === 'Excellent')
                  .map(a => (
                    <span key={a.name} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{a.icon} {a.name}</span>
                  ))}
              </div>
            </div>
            <div className="bg-white/70 rounded-xl p-4">
              <h4 className="font-semibold text-red-500 mb-2">⚠️ Handle With Care</h4>
              <div className="flex flex-wrap gap-1">
                {allZodiacAnimals
                  .filter(a => userCompatibility[a.name] === 'Challenging')
                  .map(a => (
                    <span key={a.name} className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">{a.icon} {a.name}</span>
                  ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Sections - Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SectionFlipCard 
            title="Personality & Nature" 
            icon={<Sparkles className="w-6 h-6" />}
            frontSummary={`${result.reading.traits.slice(0, 3).join(', ')} and more...`}
          >
            <p className="text-gray-700 mb-4">{result.reading.personality}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.reading.traits.map((trait) => (
                <span
                  key={trait}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-green-600 text-xs">Strengths: </span>
                <span className="text-gray-600 text-xs">{result.reading.strengths}</span>
              </div>
              <div>
                <span className="font-semibold text-red-500 text-xs">Growth: </span>
                <span className="text-gray-600 text-xs">{result.reading.weaknesses}</span>
              </div>
            </div>
          </SectionFlipCard>

          <SectionFlipCard 
            title="Career & Success" 
            icon={<Briefcase className="w-6 h-6" />}
            frontSummary="Discover your professional path and success strategies"
          >
            <p className="text-gray-700 text-sm">{result.reading.career}</p>
          </SectionFlipCard>

          <SectionFlipCard 
            title="Love & Relationships" 
            icon={<Heart className="w-6 h-6" />}
            frontSummary={`Best matches: ${result.reading.bestMatches.map(m => m.split(' ')[0]).join(', ')}`}
          >
            <p className="text-gray-700 mb-3 text-sm">{result.reading.love}</p>
            <div className="flex flex-wrap gap-1">
              {result.reading.bestMatches.map((match) => (
                <span
                  key={match}
                  className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium"
                >
                  {match}
                </span>
              ))}
            </div>
          </SectionFlipCard>

          <SectionFlipCard 
            title="Lucky Elements" 
            icon={<Users className="w-6 h-6" />}
            frontSummary={`Numbers: ${result.reading.luckyNumbers.join(', ')}`}
          >
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-lg p-3 text-white">
                <h4 className="font-semibold text-sm mb-1">Lucky Numbers</h4>
                <div className="flex gap-2">
                  {result.reading.luckyNumbers.map((num) => (
                    <span key={num} className="text-lg font-bold">{num}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg p-3 text-white">
                <h4 className="font-semibold text-sm mb-1">Lucky Colors</h4>
                <div className="flex gap-2 flex-wrap">
                  {result.reading.luckyColors.map((color) => (
                    <span key={color} className="text-sm">{color}</span>
                  ))}
                </div>
              </div>
            </div>
          </SectionFlipCard>
        </div>
      </div>
    </section>
  );
}

// Element Flip Card Component
interface ElementFlipCardProps {
  element: string;
  description: string;
  tips: string[];
}

function ElementFlipCard({ element, description, tips }: ElementFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const elementConfig: Record<string, { gradient: string; icon: string; title: string }> = {
    Wood: { gradient: 'from-green-400 to-emerald-600', icon: '🌲', title: 'Wood Element' },
    Fire: { gradient: 'from-red-400 to-orange-600', icon: '🔥', title: 'Fire Element' },
    Earth: { gradient: 'from-yellow-400 to-amber-600', icon: '🌍', title: 'Earth Element' },
    Metal: { gradient: 'from-gray-400 to-slate-600', icon: '⚙️', title: 'Metal Element' },
    Water: { gradient: 'from-blue-400 to-cyan-600', icon: '💧', title: 'Water Element' },
  };

  const config = elementConfig[element] || elementConfig.Wood;

  return (
    <div
      className="w-full h-72 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient} p-8 flex flex-col items-center justify-center text-white shadow-2xl`}
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.span 
            className="text-6xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {config.icon}
          </motion.span>
          <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
          <p className="text-white/80 text-center text-sm">{description.slice(0, 80)}...</p>
          <div className="mt-4 text-xs text-white/60">Click to reveal tips</div>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-white p-6 flex flex-col items-center justify-center shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-xl font-bold text-gray-800 mb-4">{config.title} Tips</h4>
          <ul className="space-y-2 w-full">
            {tips.slice(0, 3).map((tip, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
                initial={{ opacity: 0, x: -10 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5`}>✓</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-gray-400">Click to flip back</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
