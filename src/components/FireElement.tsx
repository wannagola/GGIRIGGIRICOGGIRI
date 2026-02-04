'use client';

import { motion } from 'framer-motion';

interface FireElementProps {
  isExtinguished: boolean;
  elephantPosition: { x: number; y: number };
  firePosition: { x: number; y: number };
  onFireClick: () => void;
}

// 거리 계산 함수
const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export default function FireElement({ isExtinguished, elephantPosition, firePosition, onFireClick }: FireElementProps) {
  const distance = calculateDistance(
    { x: firePosition.x + 65, y: firePosition.y + 70 }, // 불 중심
    { x: elephantPosition.x, y: elephantPosition.y }
  );
  
  const isNearby = distance < 250; // 250px 이내여야 상호작용 가능
  
  const handleClick = () => {
    if (isNearby) {
      onFireClick();
    } else {
      console.log('🔥 너무 멀어요! 코끼리를 가까이 이동시키세요 (현재 거리:', Math.round(distance), 'px)');
    }
  };
  if (isExtinguished) {
    return (
      <div className="relative w-32 h-40 flex items-end justify-center">
        {/* 연기 (불이 꺼진 후) */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.8, 0], y: -60 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <svg width="40" height="60" viewBox="0 0 40 60">
            <path
              d="M 20 60 Q 15 45, 10 30 Q 5 15, 20 0 Q 35 15, 30 30 Q 25 45, 20 60"
              fill="#888888"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* 검은 재 */}
        <div className="w-20 h-3 bg-gray-800 rounded-full opacity-70" />
        
        <p className="absolute -bottom-6 text-xs text-white/60">💨 불이 꺼졌어요!</p>
      </div>
    );
  }

  return (
    <div className="relative pointer-events-auto">
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
        className={`${isNearby ? 'cursor-pointer' : 'cursor-not-allowed'} relative w-32 h-40 pointer-events-auto`}
        style={{
          opacity: isNearby ? 1 : 0.5,
          filter: isNearby ? 'none' : 'grayscale(50%)',
        }}
      >
        {/* 나무 장작 */}
        <svg
          width="130"
          height="40"
          viewBox="0 0 130 40"
          className="absolute bottom-0"
        >
          {/* 장작 1 */}
          <rect
            x="20"
            y="25"
            width="60"
            height="12"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="1"
            rx="2"
          />
          {/* 장작 2 */}
          <rect
            x="50"
            y="15"
            width="60"
            height="12"
            fill="#A0522D"
            stroke="#654321"
            strokeWidth="1"
            rx="2"
          />
        </svg>

        {/* 불꽃 애니메이션 */}
        <motion.div
          animate={{
            scale: [1, 1.1, 0.9, 1],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <svg width="80" height="100" viewBox="0 0 80 100">
            {/* 큰 불꽃 (빨강) */}
            <motion.path
              d="M 40 100 Q 20 80, 20 60 Q 20 40, 30 20 Q 35 10, 40 0 Q 45 10, 50 20 Q 60 40, 60 60 Q 60 80, 40 100"
              fill="url(#fireGradient1)"
              animate={{
                d: [
                  'M 40 100 Q 20 80, 20 60 Q 20 40, 30 20 Q 35 10, 40 0 Q 45 10, 50 20 Q 60 40, 60 60 Q 60 80, 40 100',
                  'M 40 100 Q 25 85, 18 60 Q 18 38, 28 18 Q 33 8, 40 0 Q 47 8, 52 18 Q 62 38, 62 60 Q 55 85, 40 100',
                  'M 40 100 Q 20 80, 20 60 Q 20 40, 30 20 Q 35 10, 40 0 Q 45 10, 50 20 Q 60 40, 60 60 Q 60 80, 40 100',
                ],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* 중간 불꽃 (주황) */}
            <motion.path
              d="M 40 90 Q 28 75, 28 55 Q 28 40, 35 25 Q 38 15, 40 5 Q 42 15, 45 25 Q 52 40, 52 55 Q 52 75, 40 90"
              fill="url(#fireGradient2)"
              animate={{
                d: [
                  'M 40 90 Q 28 75, 28 55 Q 28 40, 35 25 Q 38 15, 40 5 Q 42 15, 45 25 Q 52 40, 52 55 Q 52 75, 40 90',
                  'M 40 90 Q 30 78, 26 55 Q 26 38, 33 23 Q 36 13, 40 5 Q 44 13, 47 23 Q 54 38, 54 55 Q 50 78, 40 90',
                  'M 40 90 Q 28 75, 28 55 Q 28 40, 35 25 Q 38 15, 40 5 Q 42 15, 45 25 Q 52 40, 52 55 Q 52 75, 40 90',
                ],
              }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />

            {/* 작은 불꽃 (노랑) */}
            <motion.path
              d="M 40 80 Q 34 68, 34 50 Q 34 38, 38 28 Q 39 20, 40 15 Q 41 20, 42 28 Q 46 38, 46 50 Q 46 68, 40 80"
              fill="url(#fireGradient3)"
              animate={{
                d: [
                  'M 40 80 Q 34 68, 34 50 Q 34 38, 38 28 Q 39 20, 40 15 Q 41 20, 42 28 Q 46 38, 46 50 Q 46 68, 40 80',
                  'M 40 80 Q 36 70, 32 50 Q 32 36, 36 26 Q 38 18, 40 15 Q 42 18, 44 26 Q 48 36, 48 50 Q 44 70, 40 80',
                  'M 40 80 Q 34 68, 34 50 Q 34 38, 38 28 Q 39 20, 40 15 Q 41 20, 42 28 Q 46 38, 46 50 Q 46 68, 40 80',
                ],
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />

            {/* 그라데이션 정의 */}
            <defs>
              <linearGradient id="fireGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="50%" stopColor="#FF6347" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <linearGradient id="fireGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF6347" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFFF00" />
              </linearGradient>
              <linearGradient id="fireGradient3" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFA500" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* 반짝이는 불씨들 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -60],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
            className="absolute bottom-20 left-1/2"
            style={{ width: '4px', height: '4px' }}
          >
            <div className="w-full h-full bg-yellow-300 rounded-full" />
          </motion.div>
        ))}

        {/* 호버 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
            isNearby ? 'bg-red-600' : 'bg-gray-600'
          } text-white px-3 py-1 rounded text-xs whitespace-nowrap`}
        >
          {isNearby ? '🔥 불이야! 클릭해서 끄기!' : '🚫 너무 멀어요!'}
        </motion.div>
      </motion.div>

      {/* 불 상태 표시 */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-xs text-red-500 font-bold animate-pulse">
          🚨 불이 났어요!
        </p>
      </div>
    </div>
  );
}
