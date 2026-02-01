import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar } from 'lucide-react';
import { StepIndicator } from '../components/StepIndicator';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { animals, animalIcons, animalSubtitles, elements, lunarNewYearDates, ZODIAC_READINGS } from '../components/ZodiacData';

interface CalculatorSectionProps {
  onCalculate: (result: ZodiacResult) => void;
}

export interface ZodiacResult {
  animal: string;
  element: string;
  icon: string;
  subtitle: string;
  reading: typeof ZODIAC_READINGS.rat;
}

export function CalculatorSection({ onCalculate }: CalculatorSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    if (month && year) {
      const m = parseInt(month);
      const y = parseInt(year);
      let days = 31;
      if (m === 2) {
        days = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
      } else if ([4, 6, 9, 11].includes(m)) {
        days = 30;
      }
      setDaysInMonth(days);
      if (day && parseInt(day) > days) {
        setDay('');
      }
    }
  }, [month, year, day]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, boolean> = {};
    if (step === 1 && !year) newErrors.year = true;
    if (step === 2 && !month) newErrors.month = true;
    if (step === 3 && !day) newErrors.day = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleCalculate();
      }
    }
  };

  const handleCalculate = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const y = parseInt(year);
      const m = parseInt(month);
      const d = parseInt(day);

      // Get lunar new year date
      const lnyDate = lunarNewYearDates[y] || '2/1';
      const [lnyMonth, lnyDay] = lnyDate.split('/').map(Number);

      // Adjust year based on lunar calendar
      let adjustedYear = y;
      if (m < lnyMonth || (m === lnyMonth && d < lnyDay)) {
        adjustedYear = y - 1;
      }

      // Calculate animal and element
      const animalIndex = (adjustedYear - 4) % 12;
      const animal = animals[animalIndex];
      const elementIndex = Math.floor((adjustedYear - 4) % 10 / 2);
      const element = elements[elementIndex];

      const result: ZodiacResult = {
        animal,
        element,
        icon: animalIcons[animalIndex],
        subtitle: animalSubtitles[animalIndex],
        reading: ZODIAC_READINGS[animal.toLowerCase()],
      };

      setIsLoading(false);
      setShowConfetti(true);
      onCalculate(result);
    }, 1500);
  };

  return (
    <section className="py-20 px-4">
      <ConfettiEffect trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <StepIndicator
            currentStep={currentStep}
            totalSteps={3}
            completedSteps={completedSteps}
          />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-purple-200 border-t-purple-600"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <motion.p
                  className="text-xl text-purple-600 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Consulting the stars...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Step 1: Year */}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Step 1: Enter Your Birth Year
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Select the year you were born
                      </p>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={year}
                          onChange={(e) => {
                            setYear(e.target.value);
                            setErrors({ ...errors, year: false });
                          }}
                          className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg appearance-none bg-white transition-all ${
                            errors.year
                              ? 'border-red-400 animate-shake'
                              : 'border-gray-200 focus:border-purple-500'
                          }`}
                        >
                          <option value="">Select Year</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                        {errors.year && (
                          <motion.p
                            className="text-red-500 text-sm mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Please select your birth year
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Month */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Step 2: Enter Your Birth Month
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Select the month you were born
                      </p>
                      <select
                        value={month}
                        onChange={(e) => {
                          setMonth(e.target.value);
                          setErrors({ ...errors, month: false });
                        }}
                        className={`w-full px-4 py-4 rounded-xl border-2 text-lg appearance-none bg-white transition-all ${
                          errors.month
                            ? 'border-red-400 animate-shake'
                            : 'border-gray-200 focus:border-purple-500'
                        }`}
                      >
                        <option value="">Select Month</option>
                        {months.map((m, i) => (
                          <option key={i + 1} value={i + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      {errors.month && (
                        <motion.p
                          className="text-red-500 text-sm mt-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Please select your birth month
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Day */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Step 3: Enter Your Birth Day
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Select the day you were born
                      </p>
                      <select
                        value={day}
                        onChange={(e) => {
                          setDay(e.target.value);
                          setErrors({ ...errors, day: false });
                        }}
                        className={`w-full px-4 py-4 rounded-xl border-2 text-lg appearance-none bg-white transition-all ${
                          errors.day
                            ? 'border-red-400 animate-shake'
                            : 'border-gray-200 focus:border-purple-500'
                        }`}
                      >
                        <option value="">Select Day</option>
                        {Array.from({ length: daysInMonth }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      {errors.day && (
                        <motion.p
                          className="text-red-500 text-sm mt-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Please select your birth day
                        </motion.p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                <motion.button
                  onClick={handleNext}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep === 3 ? (
                    <>
                      <span>✨ Reveal Your Fortune ✨</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
