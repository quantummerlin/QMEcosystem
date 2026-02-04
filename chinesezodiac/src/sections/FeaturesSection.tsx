import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Calendar, Moon, Star, Zap, Heart } from 'lucide-react';
import { FeatureFlipCard } from '../components/FlipCard';

const features = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'Daily Guidance',
    description: 'Get personalized insights for each day based on your zodiac animal and element.',
    color: 'from-blue-500 to-cyan-500',
    backContent: (
      <>
        <Sparkles className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Daily Guidance</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Morning energy readings</li>
          <li>• Afternoon focus tips</li>
          <li>• Evening reflection prompts</li>
          <li>• Lucky hours guidance</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Calendar className="w-7 h-7" />,
    title: 'Weekly Forecast',
    description: 'Plan your week ahead with comprehensive weekly guidance and energy levels.',
    color: 'from-purple-500 to-pink-500',
    backContent: (
      <>
        <Calendar className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Weekly Forecast</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Career opportunities</li>
          <li>• Relationship dynamics</li>
          <li>• Financial insights</li>
          <li>• Health & wellness tips</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Moon className="w-7 h-7" />,
    title: 'Monthly Overview',
    description: 'Understand the broader trends affecting your month and make informed decisions.',
    color: 'from-orange-500 to-red-500',
    backContent: (
      <>
        <Moon className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Monthly Overview</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Monthly theme analysis</li>
          <li>• Key dates to remember</li>
          <li>• Growth opportunities</li>
          <li>• Challenge navigation</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: 'Yearly Predictions',
    description: 'Get a complete picture of what the year holds for your zodiac sign.',
    color: 'from-green-500 to-emerald-500',
    backContent: (
      <>
        <Star className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Yearly Predictions</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Annual fortune overview</li>
          <li>• Major life transitions</li>
          <li>• Success predictions</li>
          <li>• Personal growth areas</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Element Wisdom',
    description: 'Discover how your element (Wood, Fire, Earth, Metal, Water) influences your destiny.',
    color: 'from-yellow-500 to-amber-500',
    backContent: (
      <>
        <Zap className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Element Wisdom</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Element personality traits</li>
          <li>• Element compatibility</li>
          <li>• Balancing techniques</li>
          <li>• Element enhancement tips</li>
        </ul>
      </>
    ),
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Love & Compatibility',
    description: 'Find your best matches and understand relationship dynamics.',
    color: 'from-pink-500 to-rose-500',
    backContent: (
      <>
        <Heart className="w-10 h-10 mb-3" />
        <h4 className="text-xl font-bold mb-3">Love & Compatibility</h4>
        <ul className="text-sm text-white/90 space-y-2 text-left">
          <li>• Best zodiac matches</li>
          <li>• Relationship advice</li>
          <li>• Communication tips</li>
          <li>• Love timing insights</li>
        </ul>
      </>
    ),
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 px-4 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            ✨ What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Complete Zodiac Wisdom
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click on any card to flip and discover more about each feature
          </p>
        </motion.div>

        {/* Features Grid with Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureFlipCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              backContent={feature.backContent}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { value: '12', label: 'Zodiac Animals' },
            { value: '5', label: 'Elements' },
            { value: '4', label: 'Time Periods' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
