import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Calendar, Moon, Star, Zap, Heart } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Daily Guidance',
    description: 'Get personalized insights for each day based on your zodiac animal and element.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    title: 'Weekly Forecast',
    description: 'Plan your week ahead with comprehensive weekly guidance and energy levels.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Moon,
    title: 'Monthly Overview',
    description: 'Understand the broader trends affecting your month and make informed decisions.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Star,
    title: 'Yearly Predictions',
    description: 'Get a complete picture of what the year holds for your zodiac sign.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Element Wisdom',
    description: 'Discover how your element (Wood, Fire, Earth, Metal, Water) influences your destiny.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Heart,
    title: 'Love & Compatibility',
    description: 'Find your best matches and understand relationship dynamics.',
    color: 'from-pink-500 to-rose-500',
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
            Discover insights across all time periods with Quantum Merlin's comprehensive Chinese zodiac guidance system
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative corner */}
              <motion.div
                className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
              />
            </motion.div>
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
