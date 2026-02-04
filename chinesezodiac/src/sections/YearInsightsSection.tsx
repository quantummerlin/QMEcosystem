import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { ZodiacResult } from './CalculatorSection';

interface YearInsightsSectionProps {
  result: ZodiacResult;
}

type FortuneType = 'excellent' | 'good' | 'neutral' | 'caution' | 'challenging';

const fortuneColors: Record<FortuneType, { bg: string; text: string; icon: string }> = {
  excellent: { bg: 'from-green-400 to-emerald-600', text: 'text-green-700', icon: '✨' },
  good: { bg: 'from-blue-400 to-cyan-600', text: 'text-blue-700', icon: '⭐' },
  neutral: { bg: 'from-gray-400 to-slate-600', text: 'text-gray-700', icon: '➖' },
  caution: { bg: 'from-yellow-400 to-amber-600', text: 'text-yellow-700', icon: '⚠️' },
  challenging: { bg: 'from-red-400 to-rose-600', text: 'text-red-700', icon: '🚫' },
};

const currentYear = {
  year: 2025,
  zodiac: 'Snake',
  element: 'Wood',
  startDate: 'January 29, 2025',
  endDate: 'February 16, 2026',
  description: 'A year of wisdom, transformation, and strategic thinking. The Wood Snake invites patient growth, sharper intuition, and long-term planning.',
  themes: {
    career: 'Strategic moves beat quick wins. Learn, plan, and position yourself for the long game.',
    wealth: 'Steady gains over risky leaps. Build reserves and invest in skills that compound.',
    love: 'Honest communication deepens bonds. Slow, sincere connections thrive.',
    health: 'Nervous-system care matters. Prioritize sleep, calm routines, and gentle movement.',
  },
  luckyColors: ['Emerald', 'Teal', 'Soft Gold'],
  luckyNumbers: [2, 6, 9],
  luckyDirections: ['East', 'Southeast'],
};

const nextYear = {
  year: 2026,
  zodiac: 'Horse',
  element: 'Fire',
  description: 'A year of energy, freedom, and bold forward motion. The Fire Horse accelerates momentum and rewards brave action.',
  predictions: {
    career: 'Major opportunities emerge for leadership and visibility.',
    wealth: 'Income growth comes through initiative and smart risk-taking.',
    love: 'Passionate connections and honest expression are favored.',
    health: 'High energy overall, but pace yourself to avoid burnout.',
  },
};

const compatibilitySnakeYear: Record<string, { rating: number; overview: string; strengths: string[]; challenges: string[]; advice: string[] }> = {
  Rat: { rating: 4, overview: 'Snake energy sharpens your natural strategy. Great year to refine plans.', strengths: ['Planning', 'Networking'], challenges: ['Overthinking'], advice: ['Trust your instincts', 'Keep timelines realistic'] },
  Ox: { rating: 3, overview: 'Steady Ox meets strategic Snake. Progress is slow but reliable.', strengths: ['Discipline', 'Consistency'], challenges: ['Stubbornness'], advice: ['Stay flexible', 'Review plans monthly'] },
  Tiger: { rating: 3, overview: 'A complex mix. Tiger wants speed, Snake wants precision.', strengths: ['Courage', 'Initiative'], challenges: ['Impulsivity'], advice: ['Pause before acting', 'Choose the right battles'] },
  Rabbit: { rating: 4, overview: 'Rabbit’s diplomacy works well with Snake’s insight.', strengths: ['Harmony', 'Intuition'], challenges: ['Avoidance'], advice: ['Speak clearly', 'Protect your peace'] },
  Dragon: { rating: 4, overview: 'Snake tempers Dragon’s power with wisdom.', strengths: ['Vision', 'Influence'], challenges: ['Control'], advice: ['Lead softly', 'Listen more'] },
  Snake: { rating: 5, overview: 'Your year. The energy feels aligned and potent.', strengths: ['Strategy', 'Self-mastery'], challenges: ['Isolation'], advice: ['Collaborate wisely', 'Share your plans'] },
  Horse: { rating: 2, overview: 'Horse speed can clash with Snake subtlety.', strengths: ['Drive', 'Courage'], challenges: ['Restlessness'], advice: ['Slow down', 'Refine your goals'] },
  Goat: { rating: 4, overview: 'Goat creativity blends with Snake’s intuition.', strengths: ['Creativity', 'Compassion'], challenges: ['Indecision'], advice: ['Create structure', 'Set clear priorities'] },
  Monkey: { rating: 4, overview: 'Monkey wit pairs with Snake strategy.', strengths: ['Problem-solving', 'Adaptability'], challenges: ['Scattered focus'], advice: ['Finish what you start', 'Think long-term'] },
  Rooster: { rating: 3, overview: 'Both are precise, but may over-criticize.', strengths: ['Detail', 'Discipline'], challenges: ['Perfectionism'], advice: ['Aim for progress', 'Avoid nitpicking'] },
  Dog: { rating: 3, overview: 'Dog loyalty meets Snake subtlety.', strengths: ['Integrity', 'Protection'], challenges: ['Doubt'], advice: ['Trust the process', 'Let go of rigid expectations'] },
  Pig: { rating: 4, overview: 'Pig warmth softens Snake intensity.', strengths: ['Kindness', 'Support'], challenges: ['Overgiving'], advice: ['Set boundaries', 'Conserve energy'] },
};

const compatibilityHorseYear: Record<string, number> = {
  Rat: 3,
  Ox: 2,
  Tiger: 5,
  Rabbit: 3,
  Dragon: 4,
  Snake: 3,
  Horse: 5,
  Goat: 4,
  Monkey: 3,
  Rooster: 2,
  Dog: 4,
  Pig: 3,
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const fortunePattern: FortuneType[] = ['excellent', 'caution', 'good', 'excellent', 'caution', 'good', 'good', 'neutral', 'good', 'excellent', 'caution', 'good'];

const preparationChecklist = [
  { task: 'Clean your home', deadline: '1 week before', importance: 'essential' },
  { task: 'Pay off debts', deadline: '2 weeks before', importance: 'recommended' },
  { task: 'Buy new clothes', deadline: '3 days before', importance: 'recommended' },
  { task: 'Prepare reunion dinner', deadline: 'New Year’s Eve', importance: 'essential' },
];

const traditions = [
  { title: 'Spring Cleaning', icon: '🧹', description: 'Clean to sweep away bad luck.' },
  { title: 'Red Envelopes', icon: '🧧', description: 'Share blessings and good fortune.' },
  { title: 'Reunion Dinner', icon: '🍜', description: 'Family feast on New Year’s Eve.' },
  { title: 'Avoid Sweeping', icon: '🚫', description: 'Don’t sweep on New Year’s Day.' },
];

export function YearInsightsSection({ result }: YearInsightsSectionProps) {
  const snakeCompatibility = compatibilitySnakeYear[result.animal] || {
    rating: 3,
    overview: 'A balanced year with steady growth if you stay intentional.',
    strengths: ['Adaptability'],
    challenges: ['Inconsistency'],
    advice: ['Choose one focus and commit to it'],
  };

  const horseRating = compatibilityHorseYear[result.animal] ?? 3;

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem('cny-prep');
    if (stored) {
      setChecked(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cny-prep', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    const target = new Date('2026-02-17T00:00:00');
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;
      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const monthlyForecasts = useMemo(() => {
    return months.map((month, index) => ({
      month,
      type: fortunePattern[index],
      focus: fortunePattern[index] === 'caution' ? 'Slow down and plan' : fortunePattern[index] === 'excellent' ? 'Take initiative' : 'Keep momentum steady',
    }));
  }, []);

  return (
    <section className="mt-10 space-y-10">
      {/* Current Year Overview */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-4xl mb-2">🐍</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{currentYear.year}: Year of the {currentYear.element} {currentYear.zodiac}</h3>
        <p className="text-gray-500 mt-2">{currentYear.startDate} – {currentYear.endDate}</p>
        <p className="text-gray-700 mt-4">{currentYear.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {Object.entries(currentYear.themes).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="text-lg font-semibold text-gray-800 capitalize">{key}</div>
              <p className="text-sm text-gray-600 mt-2">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
          <span>Lucky Colors: {currentYear.luckyColors.join(', ')}</span>
          <span>Lucky Numbers: {currentYear.luckyNumbers.join(', ')}</span>
          <span>Lucky Directions: {currentYear.luckyDirections.join(', ')}</span>
        </div>
      </motion.div>

      {/* Your Sign This Year */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">How {currentYear.year} Affects Your {result.animal}</h3>
        <p className="text-gray-500 mt-2">In the Year of the {currentYear.zodiac} 🐍</p>
        <div className="mt-4 text-2xl">Compatibility: {'⭐'.repeat(snakeCompatibility.rating)}{'☆'.repeat(5 - snakeCompatibility.rating)}</div>
        <p className="text-gray-700 mt-4">{snakeCompatibility.overview}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Strengths</div>
            <ul className="text-gray-600 space-y-1">
              {snakeCompatibility.strengths.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Challenges</div>
            <ul className="text-gray-600 space-y-1">
              {snakeCompatibility.challenges.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Advice</div>
            <ul className="text-gray-600 space-y-1">
              {snakeCompatibility.advice.map((s) => <li key={s}>• {s}</li>)}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {monthlyForecasts.map((m) => (
            <div key={m.month} className={`rounded-xl text-white px-3 py-2 text-sm bg-gradient-to-br ${fortuneColors[m.type].bg}`}>
              <div className="font-semibold">{m.month}</div>
              <div className="text-xs opacity-90">{m.focus}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fortune Timeline */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Your {currentYear.year} Fortune Map</h3>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {monthlyForecasts.map((m) => (
            <button key={m.month} className={`px-3 py-2 rounded-full text-white text-sm bg-gradient-to-r ${fortuneColors[m.type].bg}`}>
              {fortuneColors[m.type].icon} {m.month}
            </button>
          ))}
        </div>
        <p className="text-gray-600 mt-4">Tap a month above to reflect on your focus. Your strongest windows cluster around the “✨” months.</p>
      </motion.div>

      {/* Countdown */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">🎊 Chinese New Year {nextYear.year} 🎊</h3>
        <p className="text-gray-500 mt-2">Welcoming the Year of the Horse 🐴 · February 17, 2026</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white p-4">
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-left">
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Preparation Checklist</div>
            <ul className="space-y-2">
              {preparationChecklist.map((prep) => (
                <li key={prep.task} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!checked[prep.task]}
                    onChange={() => setChecked((prev) => ({ ...prev, [prep.task]: !prev[prep.task] }))}
                  />
                  <span className="text-gray-600">{prep.task} <span className="text-xs text-gray-400">({prep.deadline})</span></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Traditions & Customs</div>
            <ul className="space-y-2">
              {traditions.map((tradition) => (
                <li key={tradition.title} className="text-gray-600">
                  {tradition.icon} <span className="font-medium">{tradition.title}</span> — {tradition.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Next Year Preview */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-4xl mb-2">🐴</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{nextYear.year}: Year of the {nextYear.element} {nextYear.zodiac}</h3>
        <p className="text-gray-700 mt-3">{nextYear.description}</p>
        <div className="mt-4 text-2xl">Compatibility Preview: {'⭐'.repeat(horseRating)}{'☆'.repeat(5 - horseRating)}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm">
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Career</div>
            <p className="text-gray-600">{nextYear.predictions.career}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Wealth</div>
            <p className="text-gray-600">{nextYear.predictions.wealth}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Love</div>
            <p className="text-gray-600">{nextYear.predictions.love}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4">
            <div className="font-semibold text-gray-800 mb-2">Health</div>
            <p className="text-gray-600">{nextYear.predictions.health}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
