import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { animals, animalIcons, animalSubtitles, elements } from '../components/ZodiacData';
import { ZodiacMiniFlipCard } from '../components/FlipCard';

const zodiacData = animals.map((animal, i) => ({
  name: animal,
  icon: animalIcons[i],
  subtitle: animalSubtitles[i],
  element: elements[i % 5],
}));

export function ZodiacShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            🐉 The 12 Animals
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet the Zodiac
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tap any card to flip and discover the element associated with each zodiac animal
          </p>
        </motion.div>

        {/* Zodiac Grid with Flip Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {zodiacData.map((zodiac, index) => (
            <ZodiacMiniFlipCard
              key={zodiac.name}
              name={zodiac.name}
              icon={zodiac.icon}
              subtitle={zodiac.subtitle}
              element={zodiac.element}
              index={index}
            />
          ))}
        </div>

        {/* Element Legend */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {elements.map((element) => (
            <motion.div
              key={element}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg">
                {element === 'Wood' && '🌲'}
                {element === 'Fire' && '🔥'}
                {element === 'Earth' && '🌍'}
                {element === 'Metal' && '⚙️'}
                {element === 'Water' && '💧'}
              </span>
              <span className="text-sm font-medium text-gray-700">{element}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
