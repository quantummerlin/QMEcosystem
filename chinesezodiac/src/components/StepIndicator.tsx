import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export function StepIndicator({ currentStep, totalSteps, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = completedSteps.includes(stepNum);

        return (
          <motion.div
            key={stepNum}
            className="relative flex items-center"
          >
            {/* Connector line */}
            {i < totalSteps - 1 && (
              <motion.div
                className="absolute left-8 top-1/2 w-8 h-0.5 -translate-y-1/2"
                initial={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
                animate={{
                  backgroundColor: isCompleted
                    ? 'rgba(102, 126, 234, 1)'
                    : 'rgba(0,0,0,0.1)',
                }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Step circle */}
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold relative z-10 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                boxShadow: isActive
                  ? [
                      '0 0 0 0 rgba(102, 126, 234, 0.4)',
                      '0 0 0 10px rgba(102, 126, 234, 0)',
                      '0 0 0 0 rgba(102, 126, 234, 0)',
                    ]
                  : 'none',
              }}
              transition={{
                scale: { duration: 0.3 },
                boxShadow: { duration: 1.5, repeat: Infinity },
              }}
            >
              {isCompleted ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                stepNum
              )}
            </motion.div>

            {/* Step label */}
            <motion.span
              className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
                isActive ? 'text-purple-600 font-medium' : 'text-gray-400'
              }`}
              animate={{ opacity: isActive ? 1 : 0.6 }}
            >
              {stepNum === 1 ? 'Year' : stepNum === 2 ? 'Month' : 'Day'}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
