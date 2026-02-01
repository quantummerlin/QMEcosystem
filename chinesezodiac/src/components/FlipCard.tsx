import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
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
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <motion.div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${elementColors[element] || 'from-purple-500 to-pink-500'} p-8 flex flex-col items-center justify-center text-white shadow-2xl`}
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ scale: 1.02 }}
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
          <div className="mt-4 text-xs opacity-60">Click to reveal traits</div>
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
          <p className="text-gray-500 text-sm mt-6">Click to flip back</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
