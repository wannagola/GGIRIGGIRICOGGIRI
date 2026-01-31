'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BattleStageProps {
  onBackToMain: () => void;
}

type BattlePhase = 'intro' | 'battle' | 'result';
type Winner = 'elephant' | 'rhino' | null;

export default function BattleStage({ onBackToMain }: BattleStageProps) {
  const [phase, setPhase] = useState<BattlePhase>('intro');
  const [elephantHP, setElephantHP] = useState(100);
  const [rhinoHP, setRhinoHP] = useState(100);
  const [turn, setTurn] = useState<'elephant' | 'rhino'>('elephant');
  const [winner, setWinner] = useState<Winner>(null);
  const [message, setMessage] = useState('');
  const [isAttacking, setIsAttacking] = useState(false);

  // 인트로 → 배틀 전환 (3초 후)
  useEffect(() => {
    if (phase === 'intro') {
      const timer = setTimeout(() => {
        setPhase('battle');
        setMessage('코끼리의 차례!');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // HP 체크 및 승패 판정
  useEffect(() => {
    if (phase === 'battle') {
      if (elephantHP <= 0) {
        setWinner('rhino');
        setPhase('result');
        setMessage('코뿔소 승리! 🦏');
      } else if (rhinoHP <= 0) {
        setWinner('elephant');
        setPhase('result');
        setMessage('코끼리 승리! 🐘');
      }
    }
  }, [elephantHP, rhinoHP, phase]);

  // 공격 핸들러
  const handleAttack = () => {
    if (isAttacking || phase !== 'battle') return;

    setIsAttacking(true);
    const damage = Math.floor(Math.random() * 20) + 10; // 10~30 데미지

    if (turn === 'elephant') {
      // 코끼리 공격
      setRhinoHP(prev => Math.max(0, prev - damage));
      setMessage(`코끼리의 공격! 🐘 → 🦏 (${damage} 데미지!)`);
      
      setTimeout(() => {
        if (rhinoHP - damage > 0) {
          setTurn('rhino');
          setMessage('코뿔소의 차례!');
          // 코뿔소 자동 공격 (1초 후)
          setTimeout(() => {
            const rhinoDamage = Math.floor(Math.random() * 20) + 10;
            setElephantHP(prev => Math.max(0, prev - rhinoDamage));
            setMessage(`코뿔소의 반격! 🦏 → 🐘 (${rhinoDamage} 데미지!)`);
            
            setTimeout(() => {
              if (elephantHP - rhinoDamage > 0) {
                setTurn('elephant');
                setMessage('코끼리의 차례!');
              }
              setIsAttacking(false);
            }, 1000);
          }, 1000);
        } else {
          setIsAttacking(false);
        }
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-gradient-to-b from-red-900 via-orange-800 to-yellow-700"
    >
      {/* VS 화면 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 번개 효과 */}
        <motion.div
          animate={{
            opacity: [0, 1, 0, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute inset-0 bg-yellow-300/20"
        />
        
        {/* 불꽃 파티클 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute w-2 h-2 bg-orange-500 rounded-full"
          />
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
        {/* 상단: 뒤로가기 버튼 */}
        <motion.button
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onBackToMain}
          className="absolute top-8 left-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold transition-all"
        >
          ← 돌아가기
        </motion.button>

        {/* 인트로 화면 */}
        {phase === 'intro' && (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <h1 className="text-8xl font-black text-white drop-shadow-2xl mb-4">
                BATTLE ARENA
              </h1>
              <p className="text-3xl text-yellow-200 drop-shadow-lg mb-8">
                코끼리 vs 코뿔소
              </p>

              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="text-3xl text-white font-bold"
              >
                ⚔️ 3초 후 시작... ⚔️
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* 배틀 화면 */}
        {phase === 'battle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl flex flex-col gap-8"
          >
            {/* HP 바 영역 */}
            <div className="flex justify-between items-start gap-8">
              {/* 코끼리 HP */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-1"
              >
                <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-bold text-xl text-center">
                  🐘 DUMBO
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-b-lg">
                  <div className="flex justify-between text-white mb-2">
                    <span>HP</span>
                    <span className="font-bold">{elephantHP}/100</span>
                  </div>
                  <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${elephantHP}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* 코뿔소 HP */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="flex-1"
              >
                <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg font-bold text-xl text-center">
                  🦏 RHINO
                </div>
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-b-lg">
                  <div className="flex justify-between text-white mb-2">
                    <span>HP</span>
                    <span className="font-bold">{rhinoHP}/100</span>
                  </div>
                  <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${rhinoHP}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 캐릭터 대결 화면 */}
            <div className="flex items-center justify-center gap-16 py-8">
              {/* 코끼리 */}
              <motion.div
                animate={
                  isAttacking && turn === 'elephant'
                    ? { x: [0, 50, 0], scale: [1, 1.2, 1] }
                    : { x: 0, scale: 1 }
                }
                transition={{ duration: 0.5 }}
                className="text-9xl"
              >
                🐘
              </motion.div>

              {/* VS */}
              <div className="text-6xl font-black text-yellow-400">⚔️</div>

              {/* 코뿔소 */}
              <motion.div
                animate={
                  isAttacking && turn === 'rhino'
                    ? { x: [0, -50, 0], scale: [1, 1.2, 1] }
                    : { x: 0, scale: 1 }
                }
                transition={{ duration: 0.5 }}
                className="text-9xl"
              >
                🦏
              </motion.div>
            </div>

            {/* 메시지 */}
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-3xl text-white font-bold bg-black/50 backdrop-blur-sm py-4 rounded-lg"
            >
              {message}
            </motion.div>

            {/* 공격 버튼 */}
            {turn === 'elephant' && !isAttacking && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAttack}
                className="mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 rounded-full font-bold text-3xl shadow-2xl transition-all"
              >
                ⚡ 공격하기!
              </motion.button>
            )}
          </motion.div>
        )}

        {/* 결과 화면 */}
        {phase === 'result' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
              className="text-9xl mb-8"
            >
              {winner === 'elephant' ? '🐘' : '🦏'}
            </motion.div>

            <h1 className="text-7xl font-black text-yellow-400 drop-shadow-2xl mb-4">
              {winner === 'elephant' ? '코끼리 승리!' : '코뿔소 승리!'}
            </h1>
            
            <p className="text-3xl text-white mb-8">
              {winner === 'elephant' 
                ? '🎉 DUMBO가 승리했습니다! 🎉' 
                : '💀 패배했습니다... 다시 도전하세요!'}
            </p>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('intro');
                  setElephantHP(100);
                  setRhinoHP(100);
                  setTurn('elephant');
                  setWinner(null);
                  setMessage('');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all"
              >
                🔄 다시 도전
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBackToMain}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all"
              >
                🏠 메인으로
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
