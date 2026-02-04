'use client';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface TreeFeederProps {
  elephantPosition: { x: number; y: number };
  treePosition: { x: number; y: number };
  onFeed: () => void;
}

// 거리 계산 함수
const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export default function TreeFeeder({ elephantPosition, treePosition, onFeed }: TreeFeederProps) {
  const [leavesCount, setLeavesCount] = useState(100);
  const treeControls = useAnimation();

  const distance = calculateDistance(
    { x: treePosition.x + 75, y: treePosition.y + 100 }, // 나무 중심
    { x: elephantPosition.x, y: elephantPosition.y }
  );
  
  const isNearby = distance < 250; // 250px 이내여야 상호작용 가능

  const handleTreeClick = () => {
    if (!isNearby) {
      console.log('🌳 너무 멀어요! 코끼리를 가까이 이동시키세요 (현재 거리:', Math.round(distance), 'px)');
      return;
    }
    
    if (leavesCount > 0) {
      setLeavesCount(prev => Math.max(0, prev - 20));
      treeControls.start({
        scale: [1, 0.95, 1],
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.5 }
      });
      onFeed();
    }
  };

  const resetTree = () => {
    setLeavesCount(100);
  };

  return (
    <div className="relative pointer-events-auto">
      <motion.div
        animate={treeControls}
        whileHover={{ scale: 1.05 }}
        onClick={handleTreeClick}
        className={`${isNearby ? 'cursor-pointer' : 'cursor-not-allowed'} pointer-events-auto`}
        style={{
          opacity: isNearby ? 1 : 0.5,
          filter: isNearby ? 'none' : 'grayscale(50%)',
        }}
      >
        <svg
          width="150"
          height="200"
          viewBox="0 0 150 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 나무 줄기 */}
          <rect
            x="60"
            y="120"
            width="30"
            height="80"
            fill="#8B4513"
            stroke="#654321"
            strokeWidth="2"
            rx="5"
          />

          {/* 나무 잎 - 3단계 */}
          {leavesCount > 60 && (
            <>
              {/* 상단 잎 */}
              <motion.ellipse
                cx="75"
                cy="50"
                rx="50"
                ry="45"
                fill="#228B22"
                stroke="#1a6b1a"
                strokeWidth="2"
                initial={{ opacity: 1 }}
                animate={{ opacity: leavesCount > 60 ? 1 : 0 }}
              />
            </>
          )}

          {leavesCount > 30 && (
            <>
              {/* 중간 잎 */}
              <motion.ellipse
                cx="75"
                cy="80"
                rx="55"
                ry="50"
                fill="#32CD32"
                stroke="#228B22"
                strokeWidth="2"
                initial={{ opacity: 1 }}
                animate={{ opacity: leavesCount > 30 ? 1 : 0 }}
              />
            </>
          )}

          {leavesCount > 0 && (
            <>
              {/* 하단 잎 */}
              <motion.ellipse
                cx="75"
                cy="110"
                rx="60"
                ry="55"
                fill="#3CB371"
                stroke="#228B22"
                strokeWidth="2"
                initial={{ opacity: 1 }}
                animate={{ opacity: leavesCount > 0 ? 1 : 0 }}
              />
            </>
          )}

          {/* 작은 잎사귀 장식 */}
          {leavesCount > 50 && (
            <>
              <circle cx="40" cy="70" r="8" fill="#32CD32" opacity="0.8" />
              <circle cx="110" cy="65" r="8" fill="#32CD32" opacity="0.8" />
              <circle cx="50" cy="100" r="6" fill="#3CB371" opacity="0.8" />
              <circle cx="100" cy="95" r="6" fill="#3CB371" opacity="0.8" />
            </>
          )}
        </svg>
      </motion.div>

      {/* 나무 상태 표시 */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-medium">
          🌿 {leavesCount}%
        </div>
        {leavesCount === 0 && (
          <button
            onClick={resetTree}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
          >
            🌱 다시 자라기
          </button>
        )}
      </div>

      {/* 호버 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
          isNearby ? 'bg-gray-800' : 'bg-red-600'
        } text-white px-3 py-1 rounded text-xs whitespace-nowrap`}
      >
        {isNearby ? '🌳 클릭해서 먹이 주기!' : '🚫 너무 멀어요!'}
      </motion.div>
    </div>
  );
}
