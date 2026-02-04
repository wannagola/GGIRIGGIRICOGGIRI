'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { trunkUpVariants, wiggleVariants, trunkSwingVariants, tuskShineVariants, eatAnimationVariants, mouthMovementVariants, waterSprayVariants } from '@/utils/animations';
import WaterSpray from './WaterSpray';

interface ElephantCharacterProps {
  isPlaying: boolean;
  isEating: boolean;
  isSpraying: boolean;
  isRiding: boolean;
  onTickle: () => void;
  onTrunkClick: () => void;
  onTuskClick: () => void;
  onSaddleClick: () => void;
}

export default function ElephantCharacter({ 
  isPlaying,
  isEating,
  isSpraying,
  isRiding,
  onTickle, 
  onTrunkClick, 
  onTuskClick,
  onSaddleClick
}: ElephantCharacterProps) {
  const bodyControls = useAnimation();
  const trunkControls = useAnimation();
  const tuskControls = useAnimation();
  const elephantControls = useAnimation();
  const mouthControls = useAnimation();

  const handleBodyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    bodyControls.start('wiggle');
    onTickle();
  };

  const handleTrunkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) {
      trunkControls.start('swing');
      onTrunkClick();
    }
  };

  // 재생 중일 때 코 올리기
  useEffect(() => {
    if (isPlaying) {
      trunkControls.start('up');
    } else {
      trunkControls.start('idle');
    }
  }, [isPlaying, trunkControls]);

  // 먹이 먹을 때 애니메이션
  useEffect(() => {
    if (isEating) {
      elephantControls.start('eating');
      mouthControls.start('chewing');
      // 코를 앞으로 뻗기
      trunkControls.start({
        rotate: 15,
        y: 10,
        transition: { duration: 0.5 }
      });
      // 애니메이션 끝나면 원래대로
      setTimeout(() => {
        trunkControls.start('idle');
      }, 2000);
    }
  }, [isEating, elephantControls, mouthControls, trunkControls]);

  // 물 뿌릴 때 애니메이션
  useEffect(() => {
    if (isSpraying) {
      // 코를 불 쪽으로 향하게
      trunkControls.start('spraying');
      // 2.5초 후 원래대로
      setTimeout(() => {
        trunkControls.start('idle');
      }, 2500);
    }
  }, [isSpraying, trunkControls]);

  const handleTuskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    tuskControls.start('shine');
    onTuskClick();
  };

  const handleSaddleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaddleClick();
  };

  return (
    <div className="relative flex items-center justify-center pointer-events-auto">
      <motion.div
        animate={elephantControls}
        variants={eatAnimationVariants}
        initial="idle"
      >
        <motion.div
          animate={bodyControls}
          variants={wiggleVariants}
          initial="idle"
          whileHover={{ scale: 1.02 }}
          className="relative pointer-events-auto"
        >
        {/* 코끼리 몸통 */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* 몸통 (클릭 가능) */}
          <ellipse
            cx="150"
            cy="180"
            rx="100"
            ry="80"
            fill="#8B8680"
            stroke="#5C5854"
            strokeWidth="3"
            onClick={handleBodyClick}
            className="cursor-pointer hover:fill-[#9B9690] transition-colors"
          />

          {/* 안장 (클릭 가능) - 몸통 하단 */}
          <motion.g
            onClick={handleSaddleClick}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            {/* 안장 밑받침 */}
            <rect
              x="120"
              y="230"
              width="60"
              height="20"
              rx="5"
              fill="#8B4513"
              stroke="#654321"
              strokeWidth="2"
            />
            {/* 안장 쿠션 */}
            <ellipse
              cx="150"
              cy="235"
              rx="35"
              ry="15"
              fill="#A0522D"
              stroke="#654321"
              strokeWidth="2"
            />
            {/* 안장 장식 */}
            <circle cx="135" cy="235" r="3" fill="#FFD700" />
            <circle cx="150" cy="235" r="3" fill="#FFD700" />
            <circle cx="165" cy="235" r="3" fill="#FFD700" />
            {/* 고삐 */}
            <path
              d="M 130 240 Q 125 245, 120 250"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 170 240 Q 175 245, 180 250"
              stroke="#654321"
              strokeWidth="2"
              fill="none"
            />
          </motion.g>

          {/* 머리 */}
          <motion.ellipse
            animate={mouthControls}
            variants={mouthMovementVariants}
            initial="idle"
            cx="150"
            cy="100"
            rx="80"
            ry="70"
            fill="#8B8680"
            stroke="#5C5854"
            strokeWidth="3"
            style={{ transformOrigin: '150px 100px' }}
          />

          {/* 왼쪽 귀 */}
          <ellipse
            cx="80"
            cy="80"
            rx="40"
            ry="50"
            fill="#8B8680"
            stroke="#5C5854"
            strokeWidth="3"
          />

          {/* 오른쪽 귀 */}
          <ellipse
            cx="220"
            cy="80"
            rx="40"
            ry="50"
            fill="#8B8680"
            stroke="#5C5854"
            strokeWidth="3"
          />

          {/* 코 (애니메이션 대상 - 클릭 가능) */}
          <motion.g
            animate={trunkControls}
            variants={{
              idle: { rotate: 0, y: 0 },
              up: trunkUpVariants.up,
              swing: trunkSwingVariants.swing,
              spraying: waterSprayVariants.spraying
            }}
            initial="idle"
            style={{ transformOrigin: '150px 120px', pointerEvents: 'auto' }}
            onClick={handleTrunkClick}
            className="cursor-pointer"
          >
            <motion.path
              d="M 150 120 Q 145 160, 140 200 Q 138 220, 150 225 Q 162 220, 160 200 Q 155 160, 150 120"
              fill="#8B8680"
              stroke="#5C5854"
              strokeWidth="3"
              whileHover={{ fill: '#9B9690' }}
            />
            {/* 코 끝 */}
            <ellipse
              cx="150"
              cy="225"
              rx="12"
              ry="8"
              fill="#5C5854"
            />
          </motion.g>

          {/* 재생 중일 때 코 올리기 */}
          {isPlaying && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ transformOrigin: '150px 120px' }}
            >
              {/* 투명 오버레이로 코 올림 효과 */}
            </motion.g>
          )}

          {/* 왼쪽 눈 */}
          <circle cx="120" cy="90" r="8" fill="#2C2C2C" />
          <circle cx="123" cy="88" r="3" fill="#FFFFFF" />

          {/* 오른쪽 눈 */}
          <circle cx="180" cy="90" r="8" fill="#2C2C2C" />
          <circle cx="183" cy="88" r="3" fill="#FFFFFF" />

          {/* 왼쪽 엄니 (클릭 가능) */}
          <motion.path
            animate={tuskControls}
            variants={tuskShineVariants}
            initial="idle"
            d="M 110 130 Q 105 140, 100 155"
            stroke="#FFFAF0"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            onClick={handleTuskClick}
            className="cursor-pointer"
            whileHover={{ stroke: '#FFFFFF', strokeWidth: 7 }}
            style={{ pointerEvents: 'auto' }}
          />

          {/* 오른쪽 엄니 (클릭 가능) */}
          <motion.path
            animate={tuskControls}
            variants={tuskShineVariants}
            initial="idle"
            d="M 190 130 Q 195 140, 200 155"
            stroke="#FFFAF0"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            onClick={handleTuskClick}
            className="cursor-pointer"
            whileHover={{ stroke: '#FFFFFF', strokeWidth: 7 }}
            style={{ pointerEvents: 'auto' }}
          />

          {/* 발 (4개) */}
          <rect x="90" y="240" width="30" height="50" rx="15" fill="#8B8680" stroke="#5C5854" strokeWidth="2" />
          <rect x="130" y="240" width="30" height="50" rx="15" fill="#8B8680" stroke="#5C5854" strokeWidth="2" />
          <rect x="140" y="240" width="30" height="50" rx="15" fill="#8B8680" stroke="#5C5854" strokeWidth="2" />
          <rect x="180" y="240" width="30" height="50" rx="15" fill="#8B8680" stroke="#5C5854" strokeWidth="2" />
        </svg>
        </motion.div>
      </motion.div>

      {/* 재생 중 표시 */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-10 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          🎺 Trumpeting...
        </motion.div>
      )}

      {/* 먹는 중 표시 */}
      {isEating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-10 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          😋 냠냠냠...
        </motion.div>
      )}

      {/* 물 뿌리는 중 표시 */}
      {isSpraying && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-10 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            💦 불 끄는 중...
          </motion.div>
          <WaterSpray isActive={true} />
        </>
      )}

      {/* 탑승 중 표시 */}
      {isRiding && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium"
          >
            🏇 탑승 중! 방향키로 이동
          </motion.div>
          
          {/* 사람 (탑승자) */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute top-40 left-1/2 transform -translate-x-1/2"
          >
            <svg width="40" height="60" viewBox="0 0 40 60">
              {/* 머리 */}
              <circle cx="20" cy="15" r="8" fill="#FFD7A8" stroke="#000" strokeWidth="1" />
              {/* 몸통 */}
              <rect x="15" y="23" width="10" height="20" rx="3" fill="#4169E1" stroke="#000" strokeWidth="1" />
              {/* 다리 */}
              <rect x="15" y="43" width="4" height="15" rx="2" fill="#2C2C2C" />
              <rect x="21" y="43" width="4" height="15" rx="2" fill="#2C2C2C" />
              {/* 팔 */}
              <rect x="10" y="25" width="4" height="12" rx="2" fill="#FFD7A8" />
              <rect x="26" y="25" width="4" height="12" rx="2" fill="#FFD7A8" />
            </svg>
          </motion.div>
        </>
      )}

      {/* 인터랙션 힌트 */}
      {!isRiding && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-xs text-white/60 whitespace-nowrap">
            💡 코끼리의 각 부위를 클릭해보세요!
          </p>
          <p className="text-xs text-white/50 mt-1">
            코 🎺 | 상아 ✨ | 몸통 😆 | 안장 🏇
          </p>
        </div>
      )}
      
      {/* 탑승 중 조작 힌트 */}
      {isRiding && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center bg-purple-900/80 px-4 py-2 rounded-lg">
          <p className="text-xs text-white font-bold mb-1">
            🎮 조작법
          </p>
          <p className="text-xs text-white/90">
            ↑↓←→ 또는 WASD: 이동 | 안장 다시 클릭: 내리기
          </p>
        </div>
      )}
    </div>
  );
}
