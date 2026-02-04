'use client';

import { motion } from 'framer-motion';

interface PoopElementProps {
  id: string;
  position: { x: number; y: number };
  elephantPosition: { x: number; y: number };
  onCleanUp: (id: string) => void;
}

// 거리 계산 함수
const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export default function PoopElement({ id, position, elephantPosition, onCleanUp }: PoopElementProps) {
  const distance = calculateDistance(
    { x: position.x + 25, y: position.y + 25 }, // 똥 중심
    { x: elephantPosition.x, y: elephantPosition.y } // 코끼리 위치
  );
  
  const isNearby = distance < 200; // 200px 이내여야 상호작용 가능
  
  const handleClick = () => {
    if (isNearby) {
      onCleanUp(id);
    } else {
      console.log('💩 너무 멀어요! 코끼리를 가까이 이동시키세요 (현재 거리:', Math.round(distance), 'px)');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, y: -50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, rotate: 360, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
      onClick={handleClick}
      whileHover={{ scale: isNearby ? 1.2 : 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute ${isNearby ? 'cursor-pointer' : 'cursor-not-allowed'} z-50`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'auto',
        opacity: isNearby ? 1 : 0.5,
        filter: isNearby ? 'none' : 'grayscale(50%)',
      }}
    >
      <svg width="50" height="50" viewBox="0 0 50 50">
        {/* 똥 모양 */}
        {/* 맨 아래 */}
        <ellipse
          cx="25"
          cy="38"
          rx="18"
          ry="10"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1.5"
        />
        {/* 중간 */}
        <ellipse
          cx="25"
          cy="30"
          rx="16"
          ry="9"
          fill="#A0522D"
          stroke="#654321"
          strokeWidth="1.5"
        />
        {/* 위 */}
        <ellipse
          cx="25"
          cy="22"
          rx="13"
          ry="8"
          fill="#CD853F"
          stroke="#654321"
          strokeWidth="1.5"
        />
        {/* 맨 위 (소용돌이) */}
        <path
          d="M 25 15 Q 23 12, 25 10 Q 27 12, 25 15"
          fill="#CD853F"
          stroke="#654321"
          strokeWidth="1.5"
        />
        
        {/* 반짝이 효과 */}
        <motion.circle
          cx="20"
          cy="25"
          r="2"
          fill="#FFFFFF"
          opacity="0.6"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        
        {/* 냄새 선 */}
        <motion.path
          d="M 15 8 Q 12 5, 10 2"
          stroke="#A9A9A9"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [-2, 0, -2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.path
          d="M 25 6 Q 25 3, 25 0"
          stroke="#A9A9A9"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [-2, 0, -2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3,
          }}
        />
        <motion.path
          d="M 35 8 Q 38 5, 40 2"
          stroke="#A9A9A9"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            y: [-2, 0, -2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.6,
          }}
        />
      </svg>

      {/* 호버 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
          isNearby ? 'bg-yellow-600' : 'bg-gray-600'
        } text-white px-2 py-1 rounded text-xs whitespace-nowrap`}
      >
        {isNearby ? '💩 클릭해서 치우기!' : '🚫 너무 멀어요! (코끼리를 가까이)'}
      </motion.div>
    </motion.div>
  );
}
