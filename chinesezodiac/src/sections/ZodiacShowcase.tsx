import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { animals, animalIcons, animalSubtitles, elements } from '../components/ZodiacData';

const zodiacData = animals.map((animal, i) => ({
  name: animal,
  icon: animalIcons[i],
  subtitle: animalSubtitles[i],
  element: elements[i % 5],
}));

export function ZodiacShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const elementColors: Record<string, string> = {
    Wood: 'from-green-400 to-emerald-600',
    Fire: 'from-red-400 to-orange-600',
    Earth: 'from-yellow-400 to-amber-600',
    Metal: 'from-gray-400 to-slate-600',
    Water: 'from-blue-400 to-cyan-600',
  };

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
            Each animal brings unique traits and characteristics to those born under its sign
          </p>
        </motion.div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {zodiacData.map((zodiac, index) => (
            <motion.div
              key={zodiac.name}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className={`relative bg-white rounded-2xl p-6 shadow-lg cursor-pointer overflow-hidden ${
                  hoveredIndex === index ? 'z-10' : 'z-0'
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${elementColors[zodiac.element]} opacity-0`}
                  animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative text-center">
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{
                      y: hoveredIndex === index ? -5 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {zodiac.icon}
                  </motion.div>

                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {zodiac.name}
                  </h3>

                  <motion.p
                    className="text-sm text-gray-500"
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                  >
                    {zodiac.subtitle}
                  </motion.p>

                  {/* Element badge */}
                  <motion.div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${elementColors[zodiac.element]} text-white mt-3`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {zodiac.element === 'Wood' && '🌲'}
                    {zodiac.element === 'Fire' && '🔥'}
                    {zodiac.element === 'Earth' && '🌍'}
                    {zodiac.element === 'Metal' && '⚙️'}
                    {zodiac.element === 'Water' && '💧'}
                    {zodiac.element}
                  </motion.div>
                </div>

                {/* Decorative ring */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${elementColors[zodiac.element]}`}
                  style={{ 
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
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
