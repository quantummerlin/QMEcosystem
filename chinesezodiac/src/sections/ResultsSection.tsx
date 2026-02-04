import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Heart, Briefcase, Sparkles, Users } from 'lucide-react';
import { ZodiacFlipCard, GuidanceFlipCard, LuckyNumberFlipCard, CompatibilityFlipCard } from '../components/FlipCard';
import { YearInsightsSection } from './YearInsightsSection';
import { DailyDashboard } from '../components/DailyDashboard';
import { animalNaturalElements, elementData } from '../components/ZodiacData';
import type { ZodiacResult } from './CalculatorSection';

interface ResultsSectionProps {
  result: ZodiacResult | null;
}

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="w-full p-6 flex items-center justify-between text-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function ResultsSection({ result }: ResultsSectionProps) {
  if (!result) return null;

  const elementInfo = elementData[result.element.toLowerCase()];
  const naturalElement = animalNaturalElements[result.animal] || result.element;

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

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className={`text-xl font-bold mb-2 ${elementBlend.tone}`}>{elementBlend.title}</h3>
          <p className="text-sm text-gray-500 mb-3">
            Birth Element: <span className="font-semibold text-gray-700">{result.element}</span> · Animal’s Natural Element:{' '}
            <span className="font-semibold text-gray-700">{naturalElement}</span>
          </p>
          <p className="text-gray-700 leading-relaxed">{elementBlend.description}</p>
          <p className="text-sm text-gray-500 mt-3">
            Different elements don’t cancel each other — they blend. Think of your animal as your core style and your element as the way it shows up.
          </p>
        </motion.div>

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

        {/* Best Matches - Flip Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Best Matches</h3>
          <p className="text-gray-500 text-center mb-6">Click to see compatibility level</p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {result.reading.bestMatches.map((match, i) => {
              const [animalName, icon] = match.split(' ');
              const compatibility = ['Excellent', 'Good', 'Good'][i];
              return (
                <CompatibilityFlipCard
                  key={animalName}
                  animal={animalName}
                  icon={icon}
                  compatibility={compatibility}
                  delay={1 + i * 0.1}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Detailed Sections */}
        <div className="space-y-4">
          <CollapsibleSection title="Personality & Nature" icon={<Sparkles className="w-5 h-5" />}>
            <p className="text-gray-700 mb-4">{result.reading.personality}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {result.reading.traits.map((trait, i) => (
                <motion.span
                  key={trait}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {trait}
                </motion.span>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-600 mb-1">Strengths</h4>
                <p className="text-gray-600 text-sm">{result.reading.strengths}</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-500 mb-1">Challenges</h4>
                <p className="text-gray-600 text-sm">{result.reading.weaknesses}</p>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Career & Success" icon={<Briefcase className="w-5 h-5" />}>
            <p className="text-gray-700">{result.reading.career}</p>
          </CollapsibleSection>

          <CollapsibleSection title="Love & Relationships" icon={<Heart className="w-5 h-5" />}>
            <p className="text-gray-700 mb-4">{result.reading.love}</p>
            <h4 className="font-semibold text-purple-600 mb-2">Best Matches</h4>
            <div className="flex flex-wrap gap-2">
              {result.reading.bestMatches.map((match) => (
                <span
                  key={match}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                >
                  {match}
                </span>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title="Lucky Elements" icon={<Users className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-400 to-red-500 rounded-xl p-4 text-white">
                <h4 className="font-semibold mb-2">Lucky Numbers</h4>
                <div className="flex flex-wrap gap-2">
                  {result.reading.luckyNumbers.map((num) => (
                    <motion.span 
                      key={num} 
                      className="text-2xl font-bold"
                      whileHover={{ scale: 1.2 }}
                    >
                      {num}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl p-4 text-white">
                <h4 className="font-semibold mb-2">Lucky Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {result.reading.luckyColors.map((color) => (
                    <span key={color} className="text-lg">{color}</span>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>
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
