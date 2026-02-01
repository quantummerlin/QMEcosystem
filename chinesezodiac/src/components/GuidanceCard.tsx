import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Calendar, Moon, Star, Sun } from 'lucide-react';

interface GuidanceCardProps {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  rating: string;
  ratingLevel: 'high' | 'medium' | 'low';
  date: string;
  guidance: string[];
  delay?: number;
}

const typeConfig = {
  daily: {
    icon: Sun,
    title: "Today's Guidance",
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-400',
  },
  weekly: {
    icon: Calendar,
    title: "This Week's Guidance",
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-400',
  },
  monthly: {
    icon: Moon,
    title: 'Monthly Overview',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-400',
  },
  yearly: {
    icon: Star,
    title: 'Yearly Forecast',
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-400',
  },
};

const ratingConfig = {
  high: { bg: 'bg-green-100', text: 'text-green-700', label: 'High Energy' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Moderate' },
  low: { bg: 'bg-red-100', text: 'text-red-700', label: 'Low Energy' },
};

export function GuidanceCard({
  type,
  rating,
  ratingLevel,
  date,
  guidance,
  delay = 0,
}: GuidanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(type === 'daily');
  const config = typeConfig[type];
  const Icon = config.icon;
  const ratingStyle = ratingConfig[ratingLevel];

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 ${config.borderColor}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Header */}
      <motion.div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{config.title}</h3>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.span
              className={`px-3 py-1 rounded-full text-sm font-medium ${ratingStyle.bg} ${ratingStyle.text}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: 'spring' }}
            >
              {rating}
            </motion.span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <ul className="space-y-3">
            {guidance.map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.05)', x: 5 }}
              >
                <motion.div
                  className={`w-5 h-5 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + index * 0.1 + 0.1, type: 'spring' }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span className="text-gray-700">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
