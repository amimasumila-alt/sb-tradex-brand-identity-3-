import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'pulse' | 'reveal' | 'exit'>('pulse');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1800);
    const t2 = setTimeout(() => setPhase('exit'), 3200);
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {/* Radial vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_70%)]" />

          {/* Animated rings */}
          <motion.div
            animate={{
              scale: phase === 'pulse' ? [1, 1.1, 1] : 1.5,
              opacity: phase === 'pulse' ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{ duration: 1.5, repeat: phase === 'pulse' ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute w-[400px] h-[400px] rounded-full border border-[#C5A23E]/20"
          />
          <motion.div
            animate={{
              scale: phase === 'pulse' ? [1.1, 1.2, 1.1] : 1.8,
              opacity: phase === 'pulse' ? [0.2, 0.4, 0.2] : 0,
            }}
            transition={{ duration: 1.8, repeat: phase === 'pulse' ? Infinity : 0, ease: 'easeInOut', delay: 0.2 }}
            className="absolute w-[400px] h-[400px] rounded-full border border-[#C5A23E]/10"
          />

          {/* Central monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: phase === 'pulse' ? [0.9, 1, 0.9] : phase === 'reveal' ? 1.2 : 1.5,
              opacity: phase === 'pulse' ? 1 : phase === 'reveal' ? 0.8 : 0,
            }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48">
              <defs>
                <linearGradient id="loaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a7229">
                    <animate attributeName="stop-color" values="#8a7229;#F4E08A;#8a7229" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#C5A23E">
                    <animate attributeName="stop-color" values="#C5A23E;#E5C76A;#C5A23E" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#8a7229">
                    <animate attributeName="stop-color" values="#8a7229;#F4E08A;#8a7229" dur="3s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 22 50 A 28 28 0 1 1 78 50 L 78 58 L 56 58 L 56 50 L 70 50 L 70 48 A 20 20 0 1 0 50 70 L 50 78 A 28 28 0 0 1 22 50 Z"
                fill="url(#loaderGold)"
                filter="url(#glow)"
              />
              <rect x="47" y="30" width="6" height="40" fill="url(#loaderGold)" filter="url(#glow)" />
              <rect x="42" y="30" width="16" height="3" fill="url(#loaderGold)" />
              <rect x="42" y="67" width="16" height="3" fill="url(#loaderGold)" />
            </svg>
          </motion.div>

          {/* Text reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="font-label text-[10px] tracking-[0.5em] text-[#C5A23E]/60">IKTAJ GROUP</div>
          </motion.div>

          {/* Gold particles during loading */}
          {phase === 'pulse' && <LoadingParticles />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${50 + (Math.random() - 0.5) * 40}%`,
            y: '110%',
            opacity: 0,
          }}
          animate={{
            y: '-10%',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
          className="absolute w-1 h-1 rounded-full bg-[#C5A23E]"
          style={{
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 6px rgba(197, 162, 62, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
