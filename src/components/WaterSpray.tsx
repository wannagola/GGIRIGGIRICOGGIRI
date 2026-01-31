'use client';

import { motion } from 'framer-motion';

interface WaterSprayProps {
  isActive: boolean;
}

export default function WaterSpray({ isActive }: WaterSprayProps) {
  if (!isActive) return null;

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 pointer-events-none">
      {/* 물줄기 효과 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 1,
            scale: 1 
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 150],
            y: [0, 80 + Math.random() * 100],
            opacity: [1, 0.8, 0],
            scale: [1, 0.8, 0.3],
          }}
          transition={{
            duration: 1,
            delay: i * 0.05,
            ease: 'easeOut',
          }}
          className="absolute left-1/2 top-10"
        >
          <div 
            className="rounded-full bg-blue-400"
            style={{
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              boxShadow: '0 0 5px rgba(100, 200, 255, 0.8)',
            }}
          />
        </motion.div>
      ))}

      {/* 큰 물줄기 */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: [0, 1, 0.8, 0],
          scaleX: [0, 1, 1, 1],
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute left-1/2 top-10 transform -translate-x-1/2"
      >
        <svg width="100" height="120" viewBox="0 0 100 120">
          <path
            d="M 50 0 Q 45 30, 40 60 Q 35 90, 30 120 M 50 0 Q 50 30, 50 60 Q 50 90, 50 120 M 50 0 Q 55 30, 60 60 Q 65 90, 70 120"
            stroke="rgba(100, 200, 255, 0.6)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 물보라 효과 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2"
      >
        <svg width="150" height="80" viewBox="0 0 150 80">
          <ellipse
            cx="75"
            cy="60"
            rx="70"
            ry="20"
            fill="rgba(100, 200, 255, 0.3)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
