import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, Briefcase, Heart, Wallet, Activity, 
  Palette, CheckCircle, AlertTriangle, Sparkles,
  Sun, Moon, Sunrise,
  Compass, Coffee
} from 'lucide-react';
import { generateDailyInsight, hourlyGuidance } from './DailyInsights';

interface DailyDashboardProps {
  animal: string;
  element: string;
  icon: string;
}

export function DailyDashboard({ animal, element, icon }: DailyDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const insight = generateDailyInsight(animal, element);
  const now = new Date();
  const currentHour = now.getHours();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'love', label: 'Love', icon: Heart },
    { id: 'wealth', label: 'Wealth', icon: Wallet },
    { id: 'health', label: 'Health', icon: Activity },
  ];

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'high': return 'from-green-400 to-emerald-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'low': return 'from-red-400 to-pink-500';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.span 
              className="text-5xl"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {icon}
            </motion.span>
            <div>
              <h2 className="text-2xl font-bold">Today's Insights</h2>
              <p className="text-white/80">{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getEnergyColor(insight.energyLevel)}`}>
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">{insight.energyLevel} Energy</span>
            </div>
          </div>
        </div>
        
        {/* Daily Affirmation */}
        <motion.div 
          className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/80">Daily Affirmation</span>
          </div>
          <p className="text-lg font-medium italic">"{insight.dailyAffirmation}"</p>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Overall Energy */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Today's Energy
                </h3>
                <p className="text-gray-700">{insight.overallEnergy}</p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickStatCard
                  icon={<Clock className="w-5 h-5" />}
                  title="Lucky Hours"
                  value={insight.luckyHours.length}
                  suffix="hours"
                  color="from-blue-400 to-cyan-500"
                  detail={insight.luckyHours.join(', ')}
                />
                <QuickStatCard
                  icon={<Compass className="w-5 h-5" />}
                  title="Directions"
                  value={insight.luckyDirections.length}
                  suffix="dirs"
                  color="from-green-400 to-emerald-500"
                  detail={insight.luckyDirections.join(', ')}
                />
                <QuickStatCard
                  icon={<Palette className="w-5 h-5" />}
                  title="Colors"
                  value={insight.luckyColors.length}
                  suffix="colors"
                  color="from-pink-400 to-rose-500"
                  detail={insight.luckyColors.join(', ')}
                />
                <QuickStatCard
                  icon={<CheckCircle className="w-5 h-5" />}
                  title="Activities"
                  value={insight.auspiciousActivities.length}
                  suffix="tasks"
                  color="from-orange-400 to-amber-500"
                  detail={insight.auspiciousActivities.join(', ')}
                />
              </div>

              {/* Lucky Colors Display */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-500" />
                  Wear These Colors Today
                </h3>
                <div className="flex gap-3">
                  {insight.luckyColors.map((color, i) => (
                    <motion.div
                      key={color}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl shadow-lg mb-2"
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          border: '2px solid rgba(0,0,0,0.1)'
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">{color}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Daily Rituals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RitualCard
                  icon={<Sunrise className="w-5 h-5" />}
                  time="Morning"
                  ritual={insight.morningRitual}
                  color="from-orange-400 to-yellow-500"
                />
                <RitualCard
                  icon={<Sun className="w-5 h-5" />}
                  time="Afternoon"
                  ritual={insight.afternoonFocus}
                  color="from-blue-400 to-cyan-500"
                />
                <RitualCard
                  icon={<Moon className="w-5 h-5" />}
                  time="Evening"
                  ritual={insight.eveningReflection}
                  color="from-purple-400 to-indigo-500"
                />
              </div>

              {/* Auspicious Activities */}
              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Do Today
                </h3>
                <div className="flex flex-wrap gap-2">
                  {insight.auspiciousActivities.map((activity, i) => (
                    <motion.span
                      key={activity}
                      className="px-3 py-1.5 bg-green-500 text-white rounded-full text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      ✓ {activity}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Activities to Avoid */}
              <div className="bg-red-50 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Avoid Today
                </h3>
                <div className="flex flex-wrap gap-2">
                  {insight.activitiesToAvoid.map((activity, i) => (
                    <motion.span
                      key={activity}
                      className="px-3 py-1.5 bg-red-400 text-white rounded-full text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      ✕ {activity}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Cautions */}
              <div className="bg-amber-50 rounded-2xl p-5 border-2 border-amber-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Today's Cautions
                </h3>
                <ul className="space-y-2">
                  {insight.cautions.map((caution, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-amber-500 mt-0.5">⚠</span>
                      <span>{caution}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Day Timeline</h3>
              <div className="space-y-3">
                {hourlyGuidance.map((hour, i) => {
                  const isCurrentHour = currentHour >= hour.hour && currentHour < hour.hour + 2;
                  const isLuckyHour = insight.luckyHours.some(lh => {
                    const [start] = lh.split('-');
                    const startHour = parseInt(start.split(':')[0]);
                    return startHour === hour.hour || startHour === hour.hour + 12;
                  });
                  
                  return (
                    <motion.div
                      key={hour.hour}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isCurrentHour 
                          ? 'bg-purple-100 border-2 border-purple-400' 
                          : isLuckyHour
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div className={`w-16 text-sm font-medium ${isCurrentHour ? 'text-purple-700' : 'text-gray-500'}`}>
                        {hour.hour.toString().padStart(2, '0')}:00
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-800">{hour.activity}</span>
                          {isLuckyHour && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Lucky</span>}
                          {isCurrentHour && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">Now</span>}
                        </div>
                        <span className="text-xs text-gray-500">{hour.element} element time</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'career' && (
            <motion.div
              key="career"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Career Outlook</h3>
                <div className="text-2xl">{getRatingStars(insight.career.rating)}</div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-5">
                <p className="text-gray-700">{insight.career.advice}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {insight.career.opportunities.map((opp, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500">→</span>
                        {opp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Warnings
                  </h4>
                  <ul className="space-y-2">
                    {insight.career.warnings.map((warn, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-500">!</span>
                        {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'love' && (
            <motion.div
              key="love"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Love & Relationships</h3>
                <div className="text-2xl">{getRatingStars(insight.love.rating)}</div>
              </div>
              
              <div className="bg-pink-50 rounded-2xl p-5">
                <p className="text-gray-700">{insight.love.advice}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    For Singles
                  </h4>
                  <p className="text-sm text-gray-700">{insight.love.singles}</p>
                </div>
                
                <div className="bg-rose-50 rounded-xl p-4">
                  <h4 className="font-bold text-rose-700 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    For Couples
                  </h4>
                  <p className="text-sm text-gray-700">{insight.love.couples}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wealth' && (
            <motion.div
              key="wealth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Wealth & Finance</h3>
                <div className="text-2xl">{getRatingStars(insight.wealth.rating)}</div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-5">
                <p className="text-gray-700">{insight.wealth.advice}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Lucky Actions
                  </h4>
                  <ul className="space-y-2">
                    {insight.wealth.luckyActions.map((action, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500">$</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Financial Warnings
                  </h4>
                  <ul className="space-y-2">
                    {insight.wealth.warnings.map((warn, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-red-500">!</span>
                        {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'health' && (
            <motion.div
              key="health"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Health & Wellness</h3>
                <div className="text-2xl">{getRatingStars(insight.health.rating)}</div>
              </div>
              
              <div className="bg-teal-50 rounded-2xl p-5">
                <p className="text-gray-700">{insight.health.advice}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-teal-700 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {insight.health.focusAreas.map((area, i) => (
                      <span key={i} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-cyan-700 mb-3 flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    Daily Tips
                  </h4>
                  <ul className="space-y-2">
                    {insight.health.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-cyan-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Element Boost Footer */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
            {element === 'Wood' && '🌲'}
            {element === 'Fire' && '🔥'}
            {element === 'Earth' && '🌍'}
            {element === 'Metal' && '⚙️'}
            {element === 'Water' && '💧'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">
              {element} Element Boost
            </p>
            <p className="text-xs text-gray-600">
              {insight.elementBoost.action} • Carry: {insight.elementBoost.item}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick Stat Card Component
interface QuickStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  suffix: string;
  color: string;
  detail: string;
}

function QuickStatCard({ icon, title, value, suffix, color, detail }: QuickStatCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-md cursor-pointer border border-gray-100"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -2 }}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-xs text-gray-500">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-600">{detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Ritual Card Component
interface RitualCardProps {
  icon: React.ReactNode;
  time: string;
  ritual: string;
  color: string;
}

function RitualCard({ icon, time, ritual, color }: RitualCardProps) {
  return (
    <motion.div
      className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{time}</span>
      </div>
      <p className="text-sm text-white/90">{ritual}</p>
    </motion.div>
  );
}
