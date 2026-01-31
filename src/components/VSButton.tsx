'use client';

import { motion } from 'framer-motion';

interface VSButtonProps {
  onClick: () => void;
}

export default function VSButton({ onClick }: VSButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-1/2 right-8 transform -translate-y-1/2 z-40"
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(255,0,0,0.5)',
            '0 0 40px rgba(255,165,0,0.8)',
            '0 0 20px rgba(255,0,0,0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative"
      >
        {/* 버튼 배경 */}
        <div className="w-32 h-32 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
          {/* VS 텍스트 */}
          <div className="text-center">
            <div
              className="text-5xl font-black text-white"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              VS
            </div>
            <div className="text-xs text-white font-bold mt-1">
              배틀!
            </div>
          </div>
        </div>

        {/* 펄스 효과 */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-orange-500 rounded-full -z-10"
        />

        {/* 회전하는 불꽃 효과 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          {[0, 90, 180, 270].map((angle) => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-80px)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* 호버 힌트 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -left-40 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        🦏 코뿔소와 대결하기!
      </motion.div>
    </motion.button>
  );
}
