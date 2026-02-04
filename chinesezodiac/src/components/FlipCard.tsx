import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTouch } from '../hooks/use-mobile';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  height?: string;
}

export function FlipCard({ front, back, className = '', height = 'h-80' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTouch = useTouch();

  return (
    <div
      className={`perspective-1000 ${className} ${height}`}
      onMouseEnter={!isTouch ? () => setIsFlipped(true) : undefined}
      onMouseLeave={!isTouch ? () => setIsFlipped(false) : undefined}
      onClick={isTouch ? () => setIsFlipped(!isFlipped) : undefined}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: isTouch ? 0.4 : 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        whileTap={isTouch ? { scale: 0.97 } : undefined}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

interface ZodiacFlipCardProps {
  animal: string;
  element: string;
  icon: string;
  subtitle: string;
  traits: string[];
}

export function ZodiacFlipCard({ animal, element, icon, subtitle, traits }: ZodiacFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTouch = useTouch();

  const elementColors: Record<string, string> = {
    Wood: 'from-green-400 to-emerald-600',
    Fire: 'from-red-400 to-orange-600',
    Earth: 'from-yellow-400 to-amber-600',
    Metal: 'from-gray-300 to-slate-500',
    Water: 'from-blue-400 to-cyan-600',
  };

  return (
    <div
      className="w-full h-80 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: isTouch ? 0.5 : 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
        whileTap={isTouch ? { scale: 0.97 } : undefined}
        whileHover={!isTouch ? { scale: 1.02 } : undefined}
      >
        {/* Front */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${elementColors[element] || 'from-purple-500 to-pink-500'} p-8 flex flex-col items-center justify-center text-white shadow-2xl`}
          style={{ backfaceVisibility: 'hidden' }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon}
          </motion.div>
          <h3 className="text-3xl font-bold mb-2">{animal}</h3>
          <p className="text-lg opacity-90">{element} {animal}</p>
          <p className="text-sm opacity-75 mt-2 italic">{subtitle}</p>
          <div className="mt-4 text-xs opacity-60">{isTouch ? 'Tap to reveal traits' : 'Click to reveal traits'}</div>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-white p-8 flex flex-col items-center justify-center shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Core Traits</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {traits.map((trait, index) => (
              <motion.span
                key={trait}
                className={`px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${elementColors[element] || 'from-purple-500 to-pink-500'}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={isFlipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">{isTouch ? 'Tap to flip back' : 'Click to flip back'}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface FeatureFlipCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  backContent?: React.ReactNode;
}

export function FeatureFlipCard({ icon, title, description, color, backContent }: FeatureFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-72 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          <motion.div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="mt-4 text-xs text-gray-400">Click to learn more</div>
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br ${color} text-white shadow-2xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {backContent || (
            <>
              <h4 className="text-xl font-bold mb-3">{title}</h4>
              <p className="text-white/90 text-sm">Discover detailed insights about your {title.toLowerCase()} based on your unique zodiac profile.</p>
            </>
          )}
          <div className="mt-4 text-xs text-white/60">Click to flip back</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ZodiacMiniFlipCardProps {
  name: string;
  icon: string;
  subtitle: string;
  element: string;
  index: number;
}

export function ZodiacMiniFlipCard({ name, icon, subtitle, element, index }: ZodiacMiniFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const elementColors: Record<string, { bg: string; text: string }> = {
    Wood: { bg: 'from-green-400 to-emerald-600', text: 'text-green-600' },
    Fire: { bg: 'from-red-400 to-orange-600', text: 'text-red-600' },
    Earth: { bg: 'from-yellow-400 to-amber-600', text: 'text-yellow-600' },
    Metal: { bg: 'from-gray-400 to-slate-600', text: 'text-gray-600' },
    Water: { bg: 'from-blue-400 to-cyan-600', text: 'text-blue-600' },
  };

  const colors = elementColors[element] || elementColors.Wood;

  return (
    <motion.div
      className="w-full h-48 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 bg-white rounded-xl p-4 shadow-lg flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' }}
        >
          <motion.span 
            className="text-5xl mb-2"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {icon}
          </motion.span>
          <h4 className="text-lg font-bold text-gray-800">{name}</h4>
          <p className="text-xs text-gray-500 text-center mt-1">{subtitle}</p>
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute inset-0 rounded-xl p-4 flex flex-col items-center justify-center bg-gradient-to-br ${colors.bg} text-white shadow-xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-3xl mb-2">
            {element === 'Wood' && '🌲'}
            {element === 'Fire' && '🔥'}
            {element === 'Earth' && '🌍'}
            {element === 'Metal' && '⚙️'}
            {element === 'Water' && '💧'}
          </span>
          <h4 className="text-lg font-bold">{element}</h4>
          <p className="text-xs text-white/80 text-center mt-1">{name} Element</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface GuidanceFlipCardProps {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  rating: string;
  ratingLevel: 'high' | 'medium' | 'low';
  date: string;
  guidance: string[];
  delay?: number;
}

const typeConfig = {
  daily: {
    icon: '☀️',
    title: "Today's Guidance",
    color: 'from-blue-500 to-cyan-500',
  },
  weekly: {
    icon: '📅',
    title: "This Week's Guidance",
    color: 'from-purple-500 to-pink-500',
  },
  monthly: {
    icon: '🌙',
    title: 'Monthly Overview',
    color: 'from-orange-500 to-red-500',
  },
  yearly: {
    icon: '⭐',
    title: 'Yearly Forecast',
    color: 'from-green-500 to-emerald-500',
  },
};

const ratingConfig = {
  high: { bg: 'bg-green-100', text: 'text-green-700', label: 'High Energy' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Moderate' },
  low: { bg: 'bg-red-100', text: 'text-red-700', label: 'Low Energy' },
};

export function GuidanceFlipCard({
  type,
  rating,
  ratingLevel,
  date,
  guidance,
  delay = 0,
}: GuidanceFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const config = typeConfig[type];
  const ratingStyle = ratingConfig[ratingLevel];

  return (
    <motion.div
      className="w-full h-64 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-purple-400"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-2xl`}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {config.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{config.title}</h3>
                  <p className="text-sm text-gray-500">{date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${ratingStyle.bg} ${ratingStyle.text}`}>
                {rating}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-sm">Click to reveal guidance</p>
            </div>
          </div>
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute inset-0 rounded-2xl p-6 bg-gradient-to-br ${config.color} text-white shadow-2xl overflow-y-auto`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-lg font-bold mb-3">{config.title}</h4>
          <ul className="space-y-2">
            {guidance.slice(0, 3).map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={isFlipped ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-yellow-300 mt-0.5">✓</span>
                <span className="text-white/90">{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-white/60 text-center">Click to flip back</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface LuckyNumberFlipCardProps {
  number: number;
  meaning: string;
  delay?: number;
}

export function LuckyNumberFlipCard({ number, meaning, delay = 0 }: LuckyNumberFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="w-full h-40 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.span 
            className="text-5xl font-bold text-white"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {number}
          </motion.span>
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute inset-0 bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-xl border-2 border-pink-400"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-3xl font-bold text-pink-500 mb-2">{number}</span>
          <p className="text-xs text-gray-600 text-center">{meaning}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface CompatibilityFlipCardProps {
  animal: string;
  icon: string;
  compatibility: string;
  delay?: number;
}

export function CompatibilityFlipCard({ animal, icon, compatibility, delay = 0 }: CompatibilityFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const compatibilityColors: Record<string, string> = {
    'Excellent': 'from-green-400 to-emerald-600',
    'Good': 'from-blue-400 to-cyan-600',
    'Moderate': 'from-yellow-400 to-orange-600',
    'Challenging': 'from-red-400 to-pink-600',
  };

  return (
    <motion.div
      className="w-full h-48 perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className="absolute inset-0 bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-lg border-2 border-purple-200"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-5xl mb-2">{icon}</span>
          <h4 className="text-lg font-bold text-gray-800">{animal}</h4>
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute inset-0 rounded-xl p-4 flex flex-col items-center justify-center bg-gradient-to-br ${compatibilityColors[compatibility] || 'from-purple-400 to-pink-600'} text-white shadow-xl`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-4xl mb-2">{icon}</span>
          <h4 className="text-lg font-bold">{animal}</h4>
          <span className="text-sm text-white/80 mt-1">{compatibility}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
