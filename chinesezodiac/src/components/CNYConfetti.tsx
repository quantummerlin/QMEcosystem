import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lunarNewYearDates } from './ZodiacData';

interface CNYConfettiProps {
  duration?: number; // Duration in hours (default 48)
}

export function CNYConfetti({ duration = 48 }: CNYConfettiProps) {
  const [isActive, setIsActive] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showBanner, setShowBanner] = useState(false);

  interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    rotation: number;
    scale: number;
    delay: number;
    shape: 'square' | 'circle' | 'star';
  }

  useEffect(() => {
    const checkCNYCelebration = () => {
      const now = new Date();
      const year = now.getFullYear();
      const cnyDate = lunarNewYearDates[year];
      
      if (!cnyDate) return false;
      
      const [month, day] = cnyDate.split('/').map(Number);
      const cnyStart = new Date(year, month - 1, day, 0, 0, 0);
      const cnyEnd = new Date(cnyStart.getTime() + (duration * 60 * 60 * 1000));
      
      return now >= cnyStart && now <= cnyEnd;
    };

    setIsActive(checkCNYCelebration());
    setShowBanner(checkCNYCelebration());

    // Check every minute
    const interval = setInterval(() => {
      const active = checkCNYCelebration();
      setIsActive(active);
      setShowBanner(active);
    }, 60000);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (isActive) {
      const launchConfetti = () => {
        const colors = [
          '#FF0000', // Red - lucky color
          '#FFD700', // Gold - prosperity
          '#FF4500', // Orange-red
          '#DC143C', // Crimson
          '#FF6347', // Tomato
          '#FFA500', // Orange
          '#FFFF00', // Yellow
          '#FF69B4', // Pink
        ];
        
        const shapes: ('square' | 'circle' | 'star')[] = ['square', 'circle', 'star'];
        
        const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          delay: Math.random() * 0.5,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        }));
        
        setConfetti(pieces);
        
        setTimeout(() => {
          setConfetti([]);
        }, 4000);
      };

      // Initial launch
      launchConfetti();
      
      // Launch every 15 seconds during celebration
      const interval = setInterval(launchConfetti, 15000);
      
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Happy CNY Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 text-white py-3 px-4 text-center shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex items-center justify-center gap-3 text-lg font-bold"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl">🧧</span>
              <span>新年快乐！Happy Chinese New Year!</span>
              <span className="text-2xl">🐍</span>
              <span>Year of the Snake 2025</span>
              <span className="text-2xl">🎆</span>
              <button 
                onClick={() => setShowBanner(false)}
                className="ml-4 text-white/80 hover:text-white text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute pointer-events-none"
              style={{
                left: `${piece.x}%`,
                top: -20,
              }}
              initial={{
                y: 0,
                rotate: 0,
                scale: piece.scale,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: piece.rotation + 720,
                x: (Math.random() - 0.5) * 300,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {piece.shape === 'square' && (
                <div
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: piece.color }}
                />
              )}
              {piece.shape === 'circle' && (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: piece.color }}
                />
              )}
              {piece.shape === 'star' && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={piece.color}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Lanterns */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${10 + i * 20}%`,
              bottom: -50,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(i) * 50, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              delay: i * 3,
              ease: 'linear',
            }}
          >
            🏮
          </motion.div>
        ))}
      </div>
    </>
  );
}
