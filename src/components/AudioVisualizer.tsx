'use client';

import { motion } from 'framer-motion';
import { audioBarVariants } from '@/utils/animations';

interface AudioVisualizerProps {
  isActive: boolean;
  barCount?: number;
}

export default function AudioVisualizer({ isActive, barCount = 5 }: AudioVisualizerProps) {
  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center gap-2 h-16">
      {Array.from({ length: barCount }).map((_, index) => (
        <motion.div
          key={index}
          variants={audioBarVariants}
          initial="idle"
          animate="active"
          transition={{
            delay: index * 0.1,
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-3 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full origin-bottom"
          style={{
            height: '100%',
          }}
        />
      ))}
    </div>
  );
}
