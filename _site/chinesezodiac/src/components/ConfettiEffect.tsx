import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  scale: number;
}

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ffd700', '#00d4ff', '#ff6b6b', '#4ecdc4'];
      const pieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      }));
      setConfetti(pieces);

      setTimeout(() => {
        setConfetti([]);
        onComplete?.();
      }, 3000);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-3 h-3 rounded-sm pointer-events-none z-50"
          style={{
            left: `${piece.x}%`,
            top: -20,
            backgroundColor: piece.color,
          }}
          initial={{
            y: 0,
            rotate: 0,
            scale: piece.scale,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 40,
            rotate: piece.rotation + 720,
            x: (Math.random() - 0.5) * 200,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2.5 + Math.random() * 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </AnimatePresence>
  );
}

export function SparkleEffect({ trigger }: { trigger: boolean }) {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 1500);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="fixed pointer-events-none z-50"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill="#ffd700"
            />
          </svg>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
