import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Heart, Briefcase, Sparkles, Users } from 'lucide-react';
import { ZodiacFlipCard } from '../components/FlipCard';
import { GuidanceCard } from '../components/GuidanceCard';
import { elementData } from '../components/ZodiacData';
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
        className="w-full p-6 flex items-center justify-between text-left"
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

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Zodiac Display Card */}
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

        {/* Element Guidance */}
        <motion.div
          className={`rounded-2xl p-8 bg-gradient-to-br ${
            result.element === 'Wood' ? 'from-green-400 to-emerald-600' :
            result.element === 'Fire' ? 'from-red-400 to-orange-600' :
            result.element === 'Earth' ? 'from-yellow-400 to-amber-600' :
            result.element === 'Metal' ? 'from-gray-300 to-slate-500' :
            'from-blue-400 to-cyan-600'
          } text-white`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-4xl">
              {result.element === 'Wood' ? '🌲' :
               result.element === 'Fire' ? '🔥' :
               result.element === 'Earth' ? '🌍' :
               result.element === 'Metal' ? '⚙️' : '💧'}
            </span>
            <h3 className="text-2xl font-bold">{result.element} Element Wisdom</h3>
          </motion.div>
          <p className="text-white/90 mb-6 leading-relaxed">{elementInfo.description}</p>
          <div className="bg-white/20 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Today's Element Tips:</h4>
            <ul className="space-y-2">
              {elementInfo.tips.slice(0, 3).map((tip, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="text-yellow-300">✓</span>
                  <span className="text-sm">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Guidance Cards */}
        <div className="space-y-4">
          <GuidanceCard
            type="daily"
            rating={daily.level === 'high' ? 'High Energy' : daily.level === 'medium' ? 'Moderate' : 'Low Energy'}
            ratingLevel={daily.level}
            date={now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            guidance={daily.items}
            delay={0.3}
          />
          <GuidanceCard
            type="weekly"
            rating={weekly.level === 'high' ? 'Excellent' : weekly.level === 'medium' ? 'Positive' : 'Challenging'}
            ratingLevel={weekly.level}
            date={`${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
            guidance={weekly.items}
            delay={0.4}
          />
          <GuidanceCard
            type="monthly"
            rating={monthly.level === 'high' ? 'Excellent' : monthly.level === 'medium' ? 'Positive' : 'Challenging'}
            ratingLevel={monthly.level}
            date={now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            guidance={monthly.items}
            delay={0.5}
          />
          <GuidanceCard
            type="yearly"
            rating={yearly.level === 'high' ? 'Excellent' : yearly.level === 'medium' ? 'Good' : 'Challenging'}
            ratingLevel={yearly.level}
            date={now.getFullYear().toString()}
            guidance={yearly.items}
            delay={0.6}
          />
        </div>

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
                    <span key={num} className="text-2xl font-bold">{num}</span>
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
