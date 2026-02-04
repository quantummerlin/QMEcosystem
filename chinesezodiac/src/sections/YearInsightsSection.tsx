import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { ZodiacResult } from './CalculatorSection';

interface YearInsightsSectionProps {
  result: ZodiacResult;
}

type FortuneType = 'excellent' | 'good' | 'neutral' | 'caution' | 'challenging';

// Flip Card Component for interactive reveals
interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  frontBg?: string;
  backBg?: string;
  className?: string;
}

function FlipCard({ frontContent, backContent, frontBg = 'bg-white', backBg = 'bg-gradient-to-br from-purple-500 to-pink-500', className = '' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg p-4 ${frontBg}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 animate-pulse">👆 Tap to reveal</div>
        </div>
        {/* Back */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg p-4 ${backBg} text-white`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {backContent}
          <div className="absolute bottom-2 right-2 text-xs text-white/60">👆 Tap to flip back</div>
        </div>
      </motion.div>
    </div>
  );
}

const fortuneColors: Record<FortuneType, { bg: string; text: string; icon: string }> = {
  excellent: { bg: 'from-green-400 to-emerald-600', text: 'text-green-700', icon: '✨' },
  good: { bg: 'from-blue-400 to-cyan-600', text: 'text-blue-700', icon: '⭐' },
  neutral: { bg: 'from-gray-400 to-slate-600', text: 'text-gray-700', icon: '➖' },
  caution: { bg: 'from-yellow-400 to-amber-600', text: 'text-yellow-700', icon: '⚠️' },
  challenging: { bg: 'from-red-400 to-rose-600', text: 'text-red-700', icon: '🚫' },
};

// Element-specific modifiers and advice for 2025 (Wood Snake Year)
// Wood feeds Fire, overcomes Earth, is overcome by Metal, rests on Water
const elementModifiers: Record<string, {
  yearAffinity: 'aligned' | 'supportive' | 'neutral' | 'tension' | 'draining';
  ratingBoost: number;
  theme: string;
  extraLucky: string[];
  extraAvoid: string[];
  monthlyBoost: { strong: number[]; weak: number[] };
  strategy: string;
  mantra: string;
}> = {
  Wood: {
    yearAffinity: 'aligned',
    ratingBoost: 1,
    theme: '2025 resonates deeply with your Wood element. Growth, learning, and expansion feel natural this year.',
    extraLucky: ['New ventures', 'Education', 'Spring initiatives', 'Teaching others'],
    extraAvoid: ['Overextension', 'Rigid plans', 'Ignoring rest'],
    monthlyBoost: { strong: [2, 3, 4], weak: [9, 10] },
    strategy: 'Plant seeds early (Jan-Apr), nurture through summer, harvest wisdom in fall. Your natural growth energy is amplified—use it for learning and launching.',
    mantra: 'I grow at my own pace, rooted and rising.',
  },
  Fire: {
    yearAffinity: 'supportive',
    ratingBoost: 0,
    theme: 'Wood feeds your Fire—expect inspiration, visibility, and creative momentum this year.',
    extraLucky: ['Leadership', 'Visibility', 'Creative projects', 'Public speaking'],
    extraAvoid: ['Burnout', 'Impulsive decisions', 'Scattered energy'],
    monthlyBoost: { strong: [5, 6, 7], weak: [11, 12, 1] },
    strategy: 'Channel the Wood energy fueling you into focused projects, not scattered flames. Summer is your peak—plan visibility moves for May-July.',
    mantra: 'I shine brightly without burning out.',
  },
  Earth: {
    yearAffinity: 'tension',
    ratingBoost: -1,
    theme: 'Wood challenges Earth—expect growth through disruption and necessary change.',
    extraLucky: ['Flexibility', 'Letting go', 'Fresh structures', 'Adaptability'],
    extraAvoid: ['Stubbornness', 'Over-control', 'Resistance to change'],
    monthlyBoost: { strong: [8, 9], weak: [2, 3, 4] },
    strategy: 'Spring brings disruption—lean into it rather than resist. Late summer (Aug-Sep) is your stable window for major decisions. Use tension as fertilizer for growth.',
    mantra: 'I bend without breaking. Change enriches me.',
  },
  Metal: {
    yearAffinity: 'neutral',
    ratingBoost: 0,
    theme: 'Metal shapes Wood—use your precision to carve out clear goals this year.',
    extraLucky: ['Refinement', 'Cutting ties', 'Precision', 'Editing life'],
    extraAvoid: ['Over-criticism', 'Harsh judgments', 'Perfectionism paralysis'],
    monthlyBoost: { strong: [9, 10], weak: [2, 3] },
    strategy: "Your clarity can shape the Wood energy into something refined. Autumn (Sep-Oct) is your power window. Focus on pruning what doesn't serve you.",
    mantra: 'I refine, release, and rise sharper.',
  },
  Water: {
    yearAffinity: 'draining',
    ratingBoost: 0,
    theme: 'Water nourishes Wood—your energy fuels growth, but pace yourself to avoid depletion.',
    extraLucky: ['Rest cycles', 'Intuition', 'Flowing with change', 'Deep reflection'],
    extraAvoid: ['Over-giving', 'Ignoring fatigue', 'Saying yes to everything'],
    monthlyBoost: { strong: [11, 12, 1], weak: [5, 6] },
    strategy: 'You naturally feed the Wood energy of 2025—which can deplete you. Winter (Nov-Jan) is your recharge window. Build in rest before summer drains you.',
    mantra: 'I nourish others by first filling my own well.',
  },
};

const currentYear = {
  year: 2025,
  zodiac: 'Snake',
  element: 'Wood',
  startDate: 'January 29, 2025',
  endDate: 'February 16, 2026',
  description: 'A year of wisdom, transformation, and strategic thinking. The Wood Snake invites patient growth, sharper intuition, and long-term planning.',
  themes: {
    career: {
      summary: 'Strategic moves beat quick wins. Learn, plan, and position yourself for the long game.',
      details: 'The Snake favors those who think three steps ahead. Build expertise quietly, cultivate mentors, and avoid announcing plans prematurely. April and October bring peak visibility—save major launches for these windows.',
      bestMonths: ['April', 'October'],
      action: 'Invest 30 mins daily in a skill that compounds.',
    },
    wealth: {
      summary: 'Steady gains over risky leaps. Build reserves and invest in skills that compound.',
      details: 'Snake years reward patience over speculation. Build a 3-6 month emergency fund before investing. Focus on income diversification rather than get-rich-quick schemes. March and September favor financial decisions.',
      bestMonths: ['March', 'September'],
      action: 'Automate savings before spending each month.',
    },
    love: {
      summary: 'Honest communication deepens bonds. Slow, sincere connections thrive.',
      details: 'Snake energy favors depth over breadth. One meaningful conversation outweighs ten superficial ones. Singles: quality connections arrive when you stop searching. Couples: vulnerability strengthens bonds.',
      bestMonths: ['February', 'July'],
      action: 'Ask one deeper question in every conversation.',
    },
    health: {
      summary: 'Nervous-system care matters. Prioritize sleep, calm routines, and gentle movement.',
      details: 'Snake governs the nervous system and intuition. Chronic stress depletes faster this year. Prioritize sleep hygiene, reduce stimulants, and add gentle practices like walking or stretching. May and November need extra rest.',
      bestMonths: ['June', 'August'],
      action: 'Create a wind-down ritual 1 hour before bed.',
    },
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

const customMonthlyForecasts: Record<string, { month: string; type: FortuneType; rating: number; focus: string; lucky: string[]; avoid: string[] }[]> = {
  Rat: [
    { month: 'Jan', type: 'excellent', rating: 5, focus: 'Launch bold plans and negotiate confidently.', lucky: ['Networking', 'New offers', 'Visibility'], avoid: ['Overpromising'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Audit finances and tighten routines.', lucky: ['Budgeting', 'Simple wins'], avoid: ['Impulsive spending'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Collaborations unlock progress.', lucky: ['Teamwork', 'Referrals'], avoid: ['Isolating'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Pitch, present, and lead with clarity.', lucky: ['Public speaking', 'Mentors'], avoid: ['Perfectionism'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Slow decisions and avoid risky bets.', lucky: ['Planning', 'Conservation'], avoid: ['Speculation'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Skills compound—invest in learning.', lucky: ['Courses', 'New tools'], avoid: ['Distractions'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Solidify partnerships and contracts.', lucky: ['Agreements', 'Negotiation'], avoid: ['Vague terms'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Maintain momentum and tidy loose ends.', lucky: ['Organization', 'Health'], avoid: ['Overcommitment'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Creative problem-solving pays off.', lucky: ['Innovation', 'Brainstorming'], avoid: ['Micromanaging'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Recognition rises—step into leadership.', lucky: ['Leadership', 'Promotion'], avoid: ['Ego clashes'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Rest and review boundaries.', lucky: ['Recovery', 'Honesty'], avoid: ['Overextending'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close the year with steady gains.', lucky: ['Planning', 'Savings'], avoid: ['Last-minute chaos'] },
  ],
  Ox: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Set foundations and commit to a long plan.', lucky: ['Structure', 'Consistency'], avoid: ['Rigid thinking'] },
    { month: 'Feb', type: 'neutral', rating: 3, focus: 'Stabilize routines and rest well.', lucky: ['Sleep', 'Routine'], avoid: ['Overworking'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Steady progress brings respect.', lucky: ['Reliability', 'Focus'], avoid: ['Stubbornness'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition for hard work arrives.', lucky: ['Achievement', 'Mentors'], avoid: ['Underselling'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Watch health and pacing.', lucky: ['Gentle habits', 'Stretching'], avoid: ['Skipping breaks'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Financial planning pays off.', lucky: ['Savings', 'Investing'], avoid: ['Risky buys'] },
    { month: 'Jul', type: 'neutral', rating: 3, focus: 'Maintain consistency; avoid drama.', lucky: ['Calm', 'Boundaries'], avoid: ['Conflict'] },
    { month: 'Aug', type: 'good', rating: 4, focus: 'Relationship trust deepens.', lucky: ['Loyalty', 'Support'], avoid: ['Silence'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Finish projects with patience.', lucky: ['Persistence', 'Detail'], avoid: ['Perfectionism'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Major milestone achieved.', lucky: ['Completion', 'Praise'], avoid: ['Burnout'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Simplify and reduce obligations.', lucky: ['Minimalism', 'Rest'], avoid: ['New commitments'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close the year with calm confidence.', lucky: ['Reflection', 'Family'], avoid: ['Overplanning'] },
  ],
  Tiger: [
    { month: 'Jan', type: 'excellent', rating: 5, focus: 'Bold action brings momentum.', lucky: ['Leadership', 'Visibility'], avoid: ['Impulsiveness'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Slow down and manage expenses.', lucky: ['Budgeting', 'Patience'], avoid: ['Risky bets'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Energy rises—channel it wisely.', lucky: ['Training', 'Focus'], avoid: ['Scattered effort'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Career breakthroughs are possible.', lucky: ['Negotiation', 'Courage'], avoid: ['Overconfidence'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Emotional balance matters.', lucky: ['Mindfulness', 'Rest'], avoid: ['Arguments'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Build alliances; listen more.', lucky: ['Allies', 'Feedback'], avoid: ['Solo battles'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Creative risks pay off if planned.', lucky: ['Innovation', 'Strategy'], avoid: ['Rushing'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Maintain discipline and health.', lucky: ['Routine', 'Fitness'], avoid: ['Excess'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Recognition grows through service.', lucky: ['Mentors', 'Support'], avoid: ['Ego'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Big wins—claim your space.', lucky: ['Promotion', 'Awards'], avoid: ['Power struggles'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Step back and recalibrate.', lucky: ['Reflection', 'Healing'], avoid: ['Overextension'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Finish strong and plan ahead.', lucky: ['Planning', 'Savings'], avoid: ['Last-minute chaos'] },
  ],
  Rabbit: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Soft diplomacy opens doors.', lucky: ['Networking', 'Harmony'], avoid: ['Avoidance'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Protect your peace and energy.', lucky: ['Boundaries', 'Rest'], avoid: ['Overcommitting'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Creativity blossoms with calm focus.', lucky: ['Art', 'Ideas'], avoid: ['Self-doubt'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Supportive relationships flourish.', lucky: ['Partnerships', 'Support'], avoid: ['Isolation'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Slow spending and avoid drama.', lucky: ['Savings', 'Simplicity'], avoid: ['Gossip'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Learning brings confidence.', lucky: ['Study', 'Mentors'], avoid: ['Procrastination'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Family ties strengthen.', lucky: ['Home', 'Traditions'], avoid: ['Avoiding talks'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Balance work and rest.', lucky: ['Routine', 'Health'], avoid: ['Overwork'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Steady growth in career.', lucky: ['Consistency', 'Patience'], avoid: ['Comparisons'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Recognition for your kindness.', lucky: ['Visibility', 'Praise'], avoid: ['Self-effacement'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Simplify obligations.', lucky: ['Rest', 'Reflection'], avoid: ['Overloading'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Joyful connections close the year.', lucky: ['Community', 'Celebration'], avoid: ['Overplanning'] },
  ],
  Dragon: [
    { month: 'Jan', type: 'excellent', rating: 5, focus: 'Lead boldly; vision is favored.', lucky: ['Leadership', 'Expansion'], avoid: ['Overreach'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Reassess finances and pacing.', lucky: ['Budgeting', 'Strategy'], avoid: ['Big risks'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Refine plans and align allies.', lucky: ['Planning', 'Allies'], avoid: ['Solo pushes'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Momentum builds—act decisively.', lucky: ['Execution', 'Visibility'], avoid: ['Ego clashes'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Care for health and recovery.', lucky: ['Rest', 'Routine'], avoid: ['Overwork'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Expand influence with diplomacy.', lucky: ['Partnerships', 'Negotiation'], avoid: ['Dominance'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Creative projects gain traction.', lucky: ['Innovation', 'Branding'], avoid: ['Perfectionism'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Stabilize and streamline.', lucky: ['Systems', 'Delegation'], avoid: ['Scattered focus'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Strengthen long-term plans.', lucky: ['Vision', 'Patience'], avoid: ['Impatience'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Major wins and recognition.', lucky: ['Awards', 'Leadership'], avoid: ['Power struggles'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Reduce pressure and rest.', lucky: ['Reflection', 'Boundaries'], avoid: ['Overcommitment'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close strong with gratitude.', lucky: ['Legacy', 'Family'], avoid: ['Overplanning'] },
  ],
  Snake: [
    { month: 'Jan', type: 'excellent', rating: 5, focus: 'Your year begins with strong clarity.', lucky: ['Strategy', 'Influence'], avoid: ['Isolation'] },
    { month: 'Feb', type: 'neutral', rating: 3, focus: 'Maintain calm and refine priorities.', lucky: ['Focus', 'Health'], avoid: ['Overthinking'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Insightful decisions pay off.', lucky: ['Analysis', 'Timing'], avoid: ['Rushing'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Major growth and recognition.', lucky: ['Visibility', 'Leadership'], avoid: ['Rigid control'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Rest and protect your energy.', lucky: ['Recovery', 'Boundaries'], avoid: ['Excess'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Strengthen partnerships carefully.', lucky: ['Allies', 'Trust'], avoid: ['Suspicion'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Creative and spiritual growth.', lucky: ['Learning', 'Ritual'], avoid: ['Isolation'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Simplify and declutter.', lucky: ['Minimalism', 'Calm'], avoid: ['Overanalysis'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Career steadies into success.', lucky: ['Focus', 'Discipline'], avoid: ['Overwork'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Peak influence and respect.', lucky: ['Recognition', 'Leadership'], avoid: ['Ego battles'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Recover and slow the pace.', lucky: ['Sleep', 'Reflection'], avoid: ['Overextension'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Finish the year with wisdom.', lucky: ['Legacy', 'Family'], avoid: ['Perfectionism'] },
  ],
  Horse: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Energy is high—direct it wisely.', lucky: ['Momentum', 'Fitness'], avoid: ['Burnout'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Slow down and manage finances.', lucky: ['Budgeting', 'Rest'], avoid: ['Impulsiveness'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Social momentum grows.', lucky: ['Networking', 'Travel'], avoid: ['Overcommitment'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Leadership opportunities surge.', lucky: ['Visibility', 'Promotion'], avoid: ['Arrogance'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Protect health and sleep.', lucky: ['Recovery', 'Hydration'], avoid: ['Overwork'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Learning and skill growth.', lucky: ['Training', 'Mentors'], avoid: ['Distraction'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Relationships stabilize.', lucky: ['Connection', 'Support'], avoid: ['Avoiding talks'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Maintain routines and pace.', lucky: ['Discipline', 'Health'], avoid: ['Excess'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Focus on long-term gains.', lucky: ['Planning', 'Savings'], avoid: ['Quick fixes'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Peak performance month.', lucky: ['Recognition', 'Wins'], avoid: ['Overconfidence'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Rest, recalibrate, and simplify.', lucky: ['Calm', 'Reflection'], avoid: ['Arguments'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close with gratitude and clarity.', lucky: ['Family', 'Celebration'], avoid: ['Overplanning'] },
  ],
  Goat: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Creative seeds are strong—begin.', lucky: ['Art', 'Support'], avoid: ['Self-doubt'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Protect energy and budget.', lucky: ['Boundaries', 'Rest'], avoid: ['Overspending'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Collaboration brings flow.', lucky: ['Teamwork', 'Harmony'], avoid: ['Avoidance'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition in creative work.', lucky: ['Visibility', 'Praise'], avoid: ['Overgiving'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Slow pace and self-care.', lucky: ['Rest', 'Routine'], avoid: ['Emotional drain'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Learning and refinement.', lucky: ['Study', 'Mentors'], avoid: ['Indecision'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Family bonds strengthen.', lucky: ['Home', 'Community'], avoid: ['Isolation'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Organize and prioritize.', lucky: ['Structure', 'Health'], avoid: ['Overworry'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Steady career progress.', lucky: ['Consistency', 'Patience'], avoid: ['Comparisons'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Creative peak and impact.', lucky: ['Influence', 'Exposure'], avoid: ['Perfectionism'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Reduce obligations.', lucky: ['Simplicity', 'Rest'], avoid: ['Overcommitment'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Celebrate and consolidate.', lucky: ['Joy', 'Gratitude'], avoid: ['Overplanning'] },
  ],
  Monkey: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Clever ideas lead to wins.', lucky: ['Innovation', 'Speed'], avoid: ['Shortcuts'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Recheck details and finances.', lucky: ['Review', 'Budgeting'], avoid: ['Carelessness'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Networking expands options.', lucky: ['Connections', 'Pitching'], avoid: ['Overpromising'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition for smart solutions.', lucky: ['Visibility', 'Promotion'], avoid: ['Ego'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Rest and simplify.', lucky: ['Recovery', 'Sleep'], avoid: ['Overwork'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Skill-building pays off.', lucky: ['Training', 'Mentors'], avoid: ['Distraction'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Partnerships stabilize.', lucky: ['Allies', 'Trust'], avoid: ['Pranks'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Organize and streamline.', lucky: ['Systems', 'Health'], avoid: ['Chaos'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Creative bursts bring gains.', lucky: ['Ideas', 'Testing'], avoid: ['Abandoning projects'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Peak performance month.', lucky: ['Achievement', 'Leadership'], avoid: ['Overconfidence'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Step back and reflect.', lucky: ['Calm', 'Boundaries'], avoid: ['Arguments'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close with clarity.', lucky: ['Planning', 'Gratitude'], avoid: ['Last-minute chaos'] },
  ],
  Rooster: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Precision brings early wins.', lucky: ['Detail', 'Order'], avoid: ['Nitpicking'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Avoid perfectionism overload.', lucky: ['Rest', 'Balance'], avoid: ['Overcritical tone'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Refine plans and present clearly.', lucky: ['Communication', 'Structure'], avoid: ['Rigidity'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition for your standards.', lucky: ['Visibility', 'Promotion'], avoid: ['Ego'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Slow down and protect health.', lucky: ['Routine', 'Sleep'], avoid: ['Overwork'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Financial planning works well.', lucky: ['Savings', 'Investing'], avoid: ['Risky buys'] },
    { month: 'Jul', type: 'neutral', rating: 3, focus: 'Maintain balance and relationships.', lucky: ['Harmony', 'Support'], avoid: ['Criticism'] },
    { month: 'Aug', type: 'good', rating: 4, focus: 'Projects progress steadily.', lucky: ['Consistency', 'Focus'], avoid: ['Overanalysis'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Career stability grows.', lucky: ['Discipline', 'Trust'], avoid: ['Stubbornness'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Major achievements and praise.', lucky: ['Awards', 'Recognition'], avoid: ['Overcontrol'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Reduce commitments.', lucky: ['Simplify', 'Rest'], avoid: ['Overextension'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close with pride and gratitude.', lucky: ['Legacy', 'Family'], avoid: ['Perfectionism'] },
  ],
  Dog: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Loyalty opens supportive doors.', lucky: ['Allies', 'Trust'], avoid: ['Doubt'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Protect energy and finances.', lucky: ['Budgeting', 'Rest'], avoid: ['Overgiving'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Steady work builds respect.', lucky: ['Consistency', 'Integrity'], avoid: ['Overworry'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition for reliability.', lucky: ['Praise', 'Visibility'], avoid: ['Self-doubt'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Prioritize health and boundaries.', lucky: ['Routine', 'Rest'], avoid: ['Overload'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Relationships deepen.', lucky: ['Honesty', 'Support'], avoid: ['Silence'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Home and family thrive.', lucky: ['Community', 'Care'], avoid: ['Neglecting self'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Maintain balance and routines.', lucky: ['Health', 'Order'], avoid: ['Overcommitment'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Career steadies with patience.', lucky: ['Consistency', 'Planning'], avoid: ['Comparisons'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Major wins and strong bonds.', lucky: ['Success', 'Celebration'], avoid: ['Overcontrol'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Rest and recalibrate.', lucky: ['Reflection', 'Boundaries'], avoid: ['Arguments'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close the year with gratitude.', lucky: ['Family', 'Joy'], avoid: ['Overplanning'] },
  ],
  Pig: [
    { month: 'Jan', type: 'good', rating: 4, focus: 'Warmth attracts opportunities.', lucky: ['Connections', 'Support'], avoid: ['Overgiving'] },
    { month: 'Feb', type: 'caution', rating: 2, focus: 'Watch spending and energy.', lucky: ['Budgeting', 'Rest'], avoid: ['Impulse buys'] },
    { month: 'Mar', type: 'good', rating: 4, focus: 'Steady progress at work.', lucky: ['Consistency', 'Patience'], avoid: ['Procrastination'] },
    { month: 'Apr', type: 'excellent', rating: 5, focus: 'Recognition for kindness.', lucky: ['Praise', 'Visibility'], avoid: ['Self-sacrifice'] },
    { month: 'May', type: 'caution', rating: 2, focus: 'Prioritize health and calm.', lucky: ['Routine', 'Sleep'], avoid: ['Overindulgence'] },
    { month: 'Jun', type: 'good', rating: 4, focus: 'Family and relationships thrive.', lucky: ['Community', 'Home'], avoid: ['Avoiding conflict'] },
    { month: 'Jul', type: 'good', rating: 4, focus: 'Creative hobbies bring joy.', lucky: ['Art', 'Fun'], avoid: ['Overspending'] },
    { month: 'Aug', type: 'neutral', rating: 3, focus: 'Maintain balance and routines.', lucky: ['Health', 'Order'], avoid: ['Chaos'] },
    { month: 'Sep', type: 'good', rating: 4, focus: 'Career stability strengthens.', lucky: ['Consistency', 'Planning'], avoid: ['Complacency'] },
    { month: 'Oct', type: 'excellent', rating: 5, focus: 'Big wins and celebration.', lucky: ['Success', 'Visibility'], avoid: ['Overconfidence'] },
    { month: 'Nov', type: 'caution', rating: 2, focus: 'Slow down and rest.', lucky: ['Recovery', 'Reflection'], avoid: ['Overcommitment'] },
    { month: 'Dec', type: 'good', rating: 4, focus: 'Close the year with gratitude.', lucky: ['Family', 'Joy'], avoid: ['Overplanning'] },
  ],
};

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

  // Get element-specific modifier for the user's birth element
  const elementMod = elementModifiers[result.element] || elementModifiers.Wood;

  // Calculate current month for filtering forecasts
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-indexed (0 = January)

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeMonthIndex, setActiveMonthIndex] = useState(currentMonth);

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
    // Get base forecasts for the animal
    const baseForecasts = customMonthlyForecasts[result.animal] || months.map((month, index) => {
      const type = fortunePattern[index];
      const rating = type === 'excellent' ? 5 : type === 'good' ? 4 : type === 'neutral' ? 3 : type === 'caution' ? 2 : 1;
      const focus = type === 'caution'
        ? 'Slow down, review plans, and protect your energy.'
        : type === 'excellent'
          ? 'Take initiative and push key goals forward.'
          : type === 'good'
            ? 'Make steady progress and build momentum.'
            : type === 'neutral'
              ? 'Stabilize routines and refine your direction.'
              : 'Rest, reduce risk, and simplify commitments.';

      const lucky = type === 'excellent'
        ? ['Bold decisions', 'Networking', 'Visibility']
        : type === 'good'
          ? ['Consistency', 'Skill building', 'Supportive allies']
          : type === 'neutral'
            ? ['Organization', 'Study', 'Planning']
            : type === 'caution'
              ? ['Budgeting', 'Boundaries', 'Self-care']
              : ['Recovery', 'Quiet reflection', 'Low-stakes tasks'];

      const avoid = type === 'excellent'
        ? ['Overcommitting', 'Impulsive spending']
        : type === 'good'
          ? ['Shortcuts', 'Ignoring details']
          : type === 'neutral'
            ? ['Mixed signals', 'Unclear agreements']
            : type === 'caution'
              ? ['Major risks', 'Emotional reactions']
              : ['Big purchases', 'High-stress conflicts'];

      return { month, type, rating, focus, lucky, avoid };
    });

    // Apply element modifiers to each month
    return baseForecasts.map((forecast, index) => {
      const monthNum = index + 1;
      const isStrongMonth = elementMod.monthlyBoost.strong.includes(monthNum);
      const isWeakMonth = elementMod.monthlyBoost.weak.includes(monthNum);
      
      // Calculate adjusted rating
      let adjustedRating = forecast.rating + elementMod.ratingBoost;
      if (isStrongMonth) adjustedRating = Math.min(5, adjustedRating + 1);
      if (isWeakMonth) adjustedRating = Math.max(1, adjustedRating - 1);
      adjustedRating = Math.max(1, Math.min(5, adjustedRating));

      // Determine adjusted type based on new rating
      let adjustedType: FortuneType = forecast.type;
      if (adjustedRating >= 5) adjustedType = 'excellent';
      else if (adjustedRating >= 4) adjustedType = 'good';
      else if (adjustedRating >= 3) adjustedType = 'neutral';
      else if (adjustedRating >= 2) adjustedType = 'caution';
      else adjustedType = 'challenging';

      // Add element-specific lucky items on strong months
      const enhancedLucky = isStrongMonth 
        ? [...forecast.lucky, elementMod.extraLucky[0]]
        : forecast.lucky;

      // Add element-specific avoid items on weak months
      const enhancedAvoid = isWeakMonth
        ? [...forecast.avoid, elementMod.extraAvoid[0]]
        : forecast.avoid;

      return {
        ...forecast,
        rating: adjustedRating,
        type: adjustedType,
        lucky: enhancedLucky,
        avoid: enhancedAvoid,
        elementBoost: isStrongMonth ? 'strong' : isWeakMonth ? 'weak' : null,
        monthIndex: index, // Add month index for filtering
      };
    });
  }, [result.animal, result.element, elementMod]);

  // Filter to show only current month and future months within the Chinese year
  // The Snake year ends Feb 16, 2026, so if we're past CNY, we shouldn't show those months
  const relevantMonthlyForecasts = useMemo(() => {
    // Check if we're still in the Snake year (before Feb 17, 2026)
    const now_check = new Date();
    const cnyEnd = new Date('2026-02-17');
    
    if (now_check >= cnyEnd) {
      // Chinese New Year has passed - Snake year forecasts no longer relevant
      return [];
    }
    
    // Filter to show current month onward
    // But only up to January if we're in 2026 (since Snake year ends Feb 16)
    return monthlyForecasts.filter((_, index) => {
      const monthNum = index; // 0-indexed
      const nowMonth = now_check.getMonth();
      const nowYear = now_check.getFullYear();
      
      // If we're in 2025, show current month onwards
      if (nowYear === 2025 || (nowYear === 2026 && nowMonth === 0)) {
        return monthNum >= nowMonth;
      }
      
      // If we're in Feb 2026 (before CNY), only show Feb
      if (nowYear === 2026 && nowMonth === 1 && now_check < cnyEnd) {
        return monthNum === 1; // February only
      }
      
      return false;
    });
  }, [monthlyForecasts, currentMonth]);

  // Get active month from all forecasts (for the month picker)
  const activeMonth = monthlyForecasts[activeMonthIndex] || monthlyForecasts[0];

  // Theme icons for flip cards
  const themeIcons: Record<string, { icon: string; gradient: string }> = {
    career: { icon: '💼', gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    wealth: { icon: '💰', gradient: 'bg-gradient-to-br from-amber-500 to-yellow-600' },
    love: { icon: '❤️', gradient: 'bg-gradient-to-br from-pink-500 to-rose-600' },
    health: { icon: '🌿', gradient: 'bg-gradient-to-br from-green-500 to-emerald-600' },
  };

  return (
    <section className="mt-10 space-y-10">
      {/* Current Year Overview */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-4xl mb-2">🐍</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{currentYear.year}: Year of the {currentYear.element} {currentYear.zodiac}</h3>
        <p className="text-gray-500 mt-2">{currentYear.startDate} – {currentYear.endDate}</p>
        <p className="text-gray-700 mt-4">{currentYear.description}</p>
        
        {/* Flip Cards for Year Themes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {Object.entries(currentYear.themes).map(([key, theme]) => (
            <FlipCard
              key={key}
              className="h-48 md:h-52"
              frontBg="bg-white border border-gray-100"
              backBg={themeIcons[key]?.gradient || 'bg-gradient-to-br from-purple-500 to-pink-500'}
              frontContent={
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-3xl mb-2">{themeIcons[key]?.icon || '✨'}</div>
                  <div className="text-lg font-semibold text-gray-800 capitalize">{key}</div>
                  <p className="text-xs text-gray-500 mt-2 text-center px-2 line-clamp-2">{theme.summary}</p>
                </div>
              }
              backContent={
                <div className="flex flex-col justify-between h-full text-xs">
                  <p className="text-white/90 leading-relaxed line-clamp-4">{theme.details}</p>
                  <div className="mt-2 space-y-1">
                    <div className="text-white/70">📅 Best: {theme.bestMonths.join(', ')}</div>
                    <div className="bg-white/20 rounded-lg px-2 py-1 text-white font-medium">💡 {theme.action}</div>
                  </div>
                </div>
              }
            />
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
        <div className="mt-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <button
              className="px-3 py-1 rounded-full border border-gray-200 text-sm"
              onClick={() => setActiveMonthIndex((prev) => (prev === 0 ? months.length - 1 : prev - 1))}
              aria-label="Previous month"
            >
              ◀
            </button>
            <div className={`px-4 py-2 rounded-full text-white text-sm bg-gradient-to-r ${fortuneColors[activeMonth.type].bg}`}>
              {fortuneColors[activeMonth.type].icon} {activeMonth.month}
            </div>
            <button
              className="px-3 py-1 rounded-full border border-gray-200 text-sm"
              onClick={() => setActiveMonthIndex((prev) => (prev === months.length - 1 ? 0 : prev + 1))}
              aria-label="Next month"
            >
              ▶
            </button>
          </div>
          <div className="rounded-2xl border border-gray-100 p-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-gray-500">Monthly Forecast • Rating: {'⭐'.repeat(activeMonth.rating)}{'☆'.repeat(5 - activeMonth.rating)}</div>
              {activeMonth.elementBoost === 'strong' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">🌿 {result.element} Boost</span>
              )}
              {activeMonth.elementBoost === 'weak' && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">⚠️ {result.element} Caution</span>
              )}
            </div>
            <p className="text-gray-700 mb-3">{activeMonth.focus}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <div className="font-semibold text-gray-800">Lucky Focus</div>
                <ul className="text-gray-600 space-y-1">
                  {activeMonth.lucky.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Avoid</div>
                <ul className="text-gray-600 space-y-1">
                  {activeMonth.avoid.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Element Influence - Flip Card */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Your {result.element} Element in {currentYear.year}</h3>
        <p className="text-gray-500 mt-2">How your birth element interacts with the Wood Snake year</p>
        
        {/* Main Element Flip Card */}
        <div className="flex justify-center mt-6">
          <FlipCard
            className="w-72 h-56"
            frontBg={`${
              elementMod.yearAffinity === 'aligned' ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
              elementMod.yearAffinity === 'supportive' ? 'bg-gradient-to-br from-orange-400 to-red-500' :
              elementMod.yearAffinity === 'neutral' ? 'bg-gradient-to-br from-gray-400 to-slate-600' :
              elementMod.yearAffinity === 'tension' ? 'bg-gradient-to-br from-amber-400 to-orange-600' :
              'bg-gradient-to-br from-blue-400 to-cyan-600'
            }`}
            backBg="bg-gradient-to-br from-purple-600 to-indigo-700"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-5xl mb-2">
                  {result.element === 'Wood' && '🌳'}
                  {result.element === 'Fire' && '🔥'}
                  {result.element === 'Earth' && '🌍'}
                  {result.element === 'Metal' && '⚔️'}
                  {result.element === 'Water' && '💧'}
                </div>
                <div className="text-2xl font-bold">{result.element}</div>
                <div className="text-sm mt-2 opacity-80">
                  {elementMod.yearAffinity === 'aligned' && '🌿 Aligned with Wood Snake'}
                  {elementMod.yearAffinity === 'supportive' && '🔥 Energized by Wood Snake'}
                  {elementMod.yearAffinity === 'neutral' && '⚖️ Balanced with Wood Snake'}
                  {elementMod.yearAffinity === 'tension' && '⚡ Challenged by Wood Snake'}
                  {elementMod.yearAffinity === 'draining' && '💧 Giving to Wood Snake'}
                </div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-between h-full text-white text-sm text-left">
                <p className="text-white/90 leading-relaxed">{elementMod.strategy}</p>
                <div className="bg-white/20 rounded-lg px-3 py-2 mt-2 text-center italic">
                  "{elementMod.mantra}"
                </div>
              </div>
            }
          />
        </div>

        {/* Strengths & Cautions Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <FlipCard
            className="h-44"
            frontBg="bg-gradient-to-br from-green-400 to-emerald-600"
            backBg="bg-gradient-to-br from-green-500 to-teal-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">🌟</div>
                <div className="text-lg font-semibold">Element Strengths</div>
                <div className="text-sm opacity-80 mt-1">{elementMod.extraLucky.length} advantages this year</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-between h-full text-white text-sm text-left">
                <ul className="space-y-1">
                  {elementMod.extraLucky.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
                <div className="bg-white/20 rounded-lg px-2 py-1 mt-2 text-xs">
                  📅 Peak months: {elementMod.monthlyBoost.strong.map(m => months[m-1]).join(', ')}
                </div>
              </div>
            }
          />
          <FlipCard
            className="w-72 h-56"
            frontBg="bg-gradient-to-br from-amber-400 to-orange-600"
            backBg="bg-gradient-to-br from-amber-500 to-red-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">⚠️</div>
                <div className="text-lg font-semibold">Energy Drains</div>
                <div className="text-sm opacity-80 mt-1">{elementMod.extraAvoid.length} patterns to avoid</div>
                <div className="text-xs opacity-60 mt-2">Tap for awareness guide</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center h-full text-white text-xs text-left p-1">
                <ul className="space-y-1 mb-2">
                  {elementMod.extraAvoid.map((item) => <li key={item}>🚫 {item}</li>)}
                </ul>
                <div className="bg-black/20 rounded-lg px-2 py-1.5">
                  <div className="font-semibold text-amber-200">⏰ Low-Energy Months:</div>
                  <div className="opacity-90">{elementMod.monthlyBoost.weak.map(m => months[m-1]).join(', ')}</div>
                  <div className="text-[10px] opacity-70 mt-1 italic">Slow down, don't force outcomes during these periods</div>
                </div>
              </div>
            }
          />
        </div>
      </motion.div>

      {/* Fortune Timeline - Mini Flip Cards */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Your {currentYear.year} Fortune Map</h3>
        <p className="text-gray-500 mt-2">
          {relevantMonthlyForecasts.length > 0 
            ? `Showing ${relevantMonthlyForecasts.length} remaining month${relevantMonthlyForecasts.length > 1 ? 's' : ''} • Tap to reveal`
            : 'The Snake year has ended'}
        </p>
        {relevantMonthlyForecasts.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
            {relevantMonthlyForecasts.map((m, idx) => (
              <FlipCard
                key={m.month}
                className={`h-28 ${idx === 0 ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
                frontBg={`bg-gradient-to-br ${fortuneColors[m.type].bg}`}
                backBg="bg-gradient-to-br from-slate-700 to-slate-900"
                frontContent={
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    {idx === 0 && <div className="absolute top-1 left-1 text-xs bg-white/20 rounded px-1">NOW</div>}
                    <div className="text-xl">{fortuneColors[m.type].icon}</div>
                    <div className="text-lg font-bold mt-1">{m.month}</div>
                    <div className="text-xs opacity-80 mt-1">{'⭐'.repeat(m.rating)}</div>
                  </div>
                }
                backContent={
                  <div className="flex flex-col justify-center h-full text-white text-xs text-left">
                    <p className="leading-relaxed line-clamp-3">{m.focus}</p>
                    <div className="mt-2 text-green-300">✓ {m.lucky[0]}</div>
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
            <p className="text-gray-700">🎊 The Year of the Fire Horse has begun! Check back for 2026 forecasts.</p>
          </div>
        )}
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

      {/* Next Year Preview - Flip Cards */}
      <motion.div className="bg-white rounded-3xl shadow-xl p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-4xl mb-2">🐴</div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{nextYear.year}: Year of the {nextYear.element} {nextYear.zodiac}</h3>
        <p className="text-gray-700 mt-3">{nextYear.description}</p>
        <div className="mt-4 text-2xl">Compatibility Preview: {'⭐'.repeat(horseRating)}{'☆'.repeat(5 - horseRating)}</div>
        
        {/* 2026 Predictions Flip Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <FlipCard
            className="h-36"
            frontBg="bg-gradient-to-br from-red-400 to-orange-500"
            backBg="bg-gradient-to-br from-red-500 to-rose-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-lg font-semibold">Career</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center h-full text-white text-sm">
                <p>{nextYear.predictions.career}</p>
              </div>
            }
          />
          <FlipCard
            className="h-36"
            frontBg="bg-gradient-to-br from-yellow-400 to-amber-500"
            backBg="bg-gradient-to-br from-amber-500 to-orange-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-lg font-semibold">Wealth</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center h-full text-white text-sm">
                <p>{nextYear.predictions.wealth}</p>
              </div>
            }
          />
          <FlipCard
            className="h-36"
            frontBg="bg-gradient-to-br from-pink-400 to-rose-500"
            backBg="bg-gradient-to-br from-rose-500 to-pink-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-lg font-semibold">Love</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center h-full text-white text-sm">
                <p>{nextYear.predictions.love}</p>
              </div>
            }
          />
          <FlipCard
            className="h-36"
            frontBg="bg-gradient-to-br from-green-400 to-emerald-500"
            backBg="bg-gradient-to-br from-emerald-500 to-teal-600"
            frontContent={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <div className="text-3xl mb-2">🌿</div>
                <div className="text-lg font-semibold">Health</div>
              </div>
            }
            backContent={
              <div className="flex flex-col justify-center h-full text-white text-sm">
                <p>{nextYear.predictions.health}</p>
              </div>
            }
          />
        </div>
      </motion.div>
    </section>
  );
}
