import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { AnimatedText } from '../components/AnimatedText';
import { useState } from 'react';

interface HeroSectionProps {
  onStartClick: () => void;
}

export function HeroSection({ onStartClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 gradient-hero"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #f5576c 0%, #667eea 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Discover Your Destiny</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatedText text="Ultimate Chinese" delay={0.3} />
          <br />
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300"
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5)',
                '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Zodiac Guide
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Discover your complete fortune with animal and element wisdom for daily, weekly, monthly, and yearly guidance
        </motion.p>

        {/* Flip Card Preview */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HeroFlipCards />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onStartClick}
          className="group relative px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Reveal Your Fortune
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex flex-col items-center text-white/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative zodiac icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🐀', '🐂', '🐅', '🐇', '🐉', '🐍'].map((icon, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 50}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {icon}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

// Hero Flip Cards Component
function HeroFlipCards() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const previewZodiacs = [
    { animal: 'Dragon', icon: '🐉', element: 'Fire', trait: 'Powerful' },
    { animal: 'Tiger', icon: '🐅', element: 'Wood', trait: 'Courageous' },
    { animal: 'Rabbit', icon: '🐇', element: 'Wood', trait: 'Gentle' },
  ];

  const elementColors: Record<string, string> = {
    Wood: 'from-green-400 to-emerald-600',
    Fire: 'from-red-400 to-orange-600',
    Earth: 'from-yellow-400 to-amber-600',
    Metal: 'from-gray-400 to-slate-600',
    Water: 'from-blue-400 to-cyan-600',
  };

  return (
    <div className="flex gap-4 justify-center">
      {previewZodiacs.map((zodiac, index) => (
        <motion.div
          key={zodiac.animal}
          className="w-24 h-32 perspective-1000 cursor-pointer"
          onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <motion.div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${elementColors[zodiac.element]} p-3 flex flex-col items-center justify-center text-white shadow-lg`}
              style={{ backfaceVisibility: 'hidden' }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-3xl mb-1">{zodiac.icon}</span>
              <span className="text-xs font-bold">{zodiac.animal}</span>
            </motion.div>

            {/* Back */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-white p-3 flex flex-col items-center justify-center shadow-lg border-2 border-purple-400"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <span className="text-2xl mb-1">{zodiac.icon}</span>
              <span className="text-xs text-purple-600 font-bold">{zodiac.trait}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
