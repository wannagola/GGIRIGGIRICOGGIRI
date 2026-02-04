'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElephantCharacter from '@/components/ElephantCharacter';
import RecordButton from '@/components/RecordButton';
import AudioVisualizer from '@/components/AudioVisualizer';
import TreeFeeder from '@/components/TreeFeeder';
import FireElement from '@/components/FireElement';
import PoopElement from '@/components/PoopElement';
import VSButton from '@/components/VSButton';
import BattleStage from '@/components/BattleStage';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useVoiceModulation } from '@/hooks/useVoiceModulation';
import { useKeyboardControl } from '@/hooks/useKeyboardControl';
import { fadeInVariants } from '@/utils/animations';

interface Poop {
  id: string;
  position: { x: number; y: number };
}

export default function ElephantGame() {
  const [isBattleMode, setIsBattleMode] = useState(false);
  const [isEating, setIsEating] = useState(false);
  const [isSpraying, setIsSpraying] = useState(false);
  const [isFireExtinguished, setIsFireExtinguished] = useState(false);
  const [isRiding, setIsRiding] = useState(false);
  const [elephantPosition, setElephantPosition] = useState({ x: 0, y: 0 });
  const [poops, setPoops] = useState<Poop[]>([]);
  const [poopCount, setPoopCount] = useState(0);

  const {
    status,
    recordingTime,
    audioBlob,
    startRecording,
    stopRecording,
    cancelRecording,
    setPlayingStatus,
  } = useAudioRecorder();

  // 디버깅: 현재 상태 확인
  useEffect(() => {
    console.log('🔍 Page status:', status);
    console.log('🔍 audioBlob:', audioBlob ? 'exists' : 'null');
  }, [status, audioBlob]);

  const {
    isProcessing,
    isPlaying,
    modulatedBuffer,
    modulateVoice,
    playModulatedVoice,
    playTickleSound,
    playTrunkSound,
    playTuskSound,
    playEatingSound,
    playWaterSpraySound,
    playCleanUpSound,
  } = useVoiceModulation();

  // 디버깅: 음성 변조 상태
  useEffect(() => {
    console.log('🔍 isProcessing:', isProcessing);
    console.log('🔍 isPlaying:', isPlaying);
    console.log('🔍 modulatedBuffer:', modulatedBuffer ? 'exists' : 'null');
  }, [isProcessing, isPlaying, modulatedBuffer]);

  // 녹음이 끝나면 자동으로 음성 변조 시작
  useEffect(() => {
    console.log('🔍 변조 체크:', { audioBlob: !!audioBlob, status, modulatedBuffer: !!modulatedBuffer });
    if (audioBlob && status === 'ready' && !modulatedBuffer) {
      console.log('✅ 음성 변조 시작');
      const processAudio = async () => {
        await modulateVoice(audioBlob);
      };
      processAudio();
    }
  }, [audioBlob, status, modulatedBuffer, modulateVoice]);

  // 재생 상태 동기화 (ready 상태일 때만)
  useEffect(() => {
    if (status === 'ready' || status === 'playing') {
      setPlayingStatus(isPlaying);
    }
  }, [isPlaying, setPlayingStatus, status]);

  // 간지럼 핸들러 (몸통 클릭)
  const handleTickle = () => {
    if (status === 'playing') return;
    console.log('🐘 몸통 클릭 - 간지럼!');
    playTickleSound();
  };

  // 코 클릭 핸들러
  const handleTrunkClick = () => {
    if (status === 'playing') return;
    console.log('🎺 코 클릭 - 트럼펫 소리!');
    playTrunkSound();
  };

  // 상아 클릭 핸들러
  const handleTuskClick = () => {
    if (status === 'playing') return;
    console.log('✨ 상아 클릭 - 반짝!');
    playTuskSound();
  };

  // 먹이 주기 핸들러
  const handleFeed = () => {
    if (status === 'playing' || isEating || isSpraying) return;
    console.log('🌳 나무 클릭 - 먹이 주기!');
    setIsEating(true);
    playEatingSound();
    
    // 2초 후 먹는 애니메이션 종료
    setTimeout(() => {
      setIsEating(false);
    }, 2000);
  };

  // 불 끄기 핸들러
  const handleExtinguishFire = () => {
    if (status === 'playing' || isEating || isSpraying || isFireExtinguished) return;
    console.log('🔥 불 클릭 - 물 뿌리기!');
    setIsSpraying(true);
    playWaterSpraySound();
    
    // 2.5초 후 불 꺼짐
    setTimeout(() => {
      setIsSpraying(false);
      setIsFireExtinguished(true);
    }, 2500);
  };

  // 안장 클릭 핸들러 (탑승/하차)
  const handleSaddleClick = () => {
    if (status === 'playing' || isEating || isSpraying) return;
    console.log('🏇 안장 클릭 - 탑승/하차!');
    setIsRiding(prev => !prev);
  };

  // 방향키 이동 핸들러 (무한 이동 가능!)
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    const moveDistance = 20;
    setElephantPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (direction) {
        case 'up':
          newY = prev.y - moveDistance;
          break;
        case 'down':
          newY = prev.y + moveDistance;
          break;
        case 'left':
          newX = prev.x - moveDistance;
          break;
        case 'right':
          newX = prev.x + moveDistance;
          break;
      }

      return { x: newX, y: newY };
    });
  };

  // 키보드 컨트롤 활성화
  useKeyboardControl({
    isRiding,
    onMove: handleMove,
  });

  // 똥 생성 함수 (코끼리 근처에 생성)
  const createPoop = useCallback(() => {
    // 화면 중앙 위치 계산 (코끼리가 있는 곳)
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    // 코끼리의 실제 화면 위치
    const elephantScreenX = centerX + elephantPosition.x;
    const elephantScreenY = centerY + elephantPosition.y;
    
    // 코끼리 근처 랜덤 위치에 똥 생성 (반경 300px 내)
    const angle = Math.random() * Math.PI * 2; // 랜덤 각도
    const distance = Math.random() * 300 + 100; // 100~400px 거리
    
    const newPoop: Poop = {
      id: `poop-${Date.now()}-${Math.random()}`,
      position: {
        x: elephantScreenX + Math.cos(angle) * distance,
        y: elephantScreenY + Math.sin(angle) * distance,
      },
    };
    setPoops(prev => [...prev, newPoop]);
    setPoopCount(prev => prev + 1);
    console.log('💩 똥 생성 위치:', newPoop.position, '코끼리 화면 위치:', { x: elephantScreenX, y: elephantScreenY });
  }, [elephantPosition]);

  // 코끼리가 자동으로 똥을 쌈 (10초마다 체크, 30% 확률)
  useEffect(() => {
    const poopInterval = setInterval(() => {
      // 30% 확률로 똥 생성 (탑승 중에도 가능!)
      if (Math.random() < 0.3) {
        createPoop();
        console.log('💩 코끼리가 똥을 쌌어요! (30% 확률 성공)');
      }
    }, 10000); // 10초마다 체크

    return () => clearInterval(poopInterval);
  }, [createPoop]);

  // 똥 치우기 핸들러
  const handleCleanUp = (poopId: string) => {
    console.log('💩 똥 치우기!', poopId);
    playCleanUpSound();
    setPoops(prev => prev.filter(p => p.id !== poopId));
  };

  // 재생 핸들러
  const handlePlay = async () => {
    if (modulatedBuffer) {
      await playModulatedVoice();
    }
  };

  // VS 버튼 클릭 핸들러
  const handleVSClick = () => {
    console.log('⚔️ VS 모드 진입!');
    setIsBattleMode(true);
  };

  // 메인으로 돌아가기
  const handleBackToMain = () => {
    console.log('🏠 메인 화면으로 돌아가기');
    setIsBattleMode(false);
  };

  // 배틀 모드일 때는 배틀 스테이지만 렌더링
  if (isBattleMode) {
    return (
      <AnimatePresence mode="wait">
        <BattleStage onBackToMain={handleBackToMain} />
      </AnimatePresence>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* 배경 구름 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-0 w-40 h-20 bg-white/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-40 right-0 w-60 h-24 bg-white/20 rounded-full blur-xl"
        />
      </div>

      {/* 똥들 - 최상위 레이어 */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {poops.map(poop => {
            // 코끼리의 실제 화면 위치 계산
            const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
            const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
            const elephantScreenPosition = {
              x: centerX + elephantPosition.x,
              y: centerY + elephantPosition.y,
            };
            
            return (
              <PoopElement
                key={poop.id}
                id={poop.id}
                position={poop.position}
                elephantPosition={elephantScreenPosition}
                onCleanUp={handleCleanUp}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* 똥 카운터 */}
      {poops.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
        >
          💩 {poops.length}개 - 클릭해서 치우세요!
        </motion.div>
      )}

      {/* 총 치운 똥 카운터 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg"
      >
        ✨ 치운 똥: {poopCount - poops.length}개
      </motion.div>

      {/* 메인 컨텐츠 */}
      <div className="z-10 flex flex-col items-center gap-12 max-w-4xl w-full">
        {/* 헤더 */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg mb-4">
            🐘 Dumbo Echo
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            코끼리 목소리로 변신해보세요!
          </p>
        </div>

        {/* 코끼리 캐릭터와 주변 환경 */}
        <div className="relative flex items-end justify-center gap-8">
          {/* 왼쪽 나무 */}
          <div className="relative mb-8 z-20">
            <TreeFeeder 
              elephantPosition={elephantPosition}
              treePosition={{ x: -200, y: 0 }}
              onFeed={handleFeed} 
            />
          </div>

          {/* 코끼리 */}
          <motion.div
            animate={{
              x: elephantPosition.x,
              y: elephantPosition.y,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
            className="relative z-10"
          >
            <ElephantCharacter
              isPlaying={isPlaying}
              isEating={isEating}
              isSpraying={isSpraying}
              isRiding={isRiding}
              onTickle={handleTickle}
              onTrunkClick={handleTrunkClick}
              onTuskClick={handleTuskClick}
              onSaddleClick={handleSaddleClick}
            />
          </motion.div>

          {/* 오른쪽: 불 또는 나무 */}
          <div className="relative mb-8 z-20">
            {!isFireExtinguished ? (
              <FireElement 
                isExtinguished={false}
                elephantPosition={elephantPosition}
                firePosition={{ x: 200, y: 0 }}
                onFireClick={handleExtinguishFire}
              />
            ) : (
              <TreeFeeder 
                elephantPosition={elephantPosition}
                treePosition={{ x: 200, y: 0 }}
                onFeed={handleFeed} 
              />
            )}
          </div>
        </div>

        {/* 오디오 비주얼라이저 */}
        <AudioVisualizer isActive={status === 'recording' || isPlaying} />

        {/* 녹음/재생 컨트롤 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <RecordButton
            status={isProcessing ? 'processing' : status}
            recordingTime={recordingTime}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            onPlay={handlePlay}
            onCancel={cancelRecording}
          />
        </div>

        {/* 사용 방법 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            📖 사용 방법
          </h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>빨간 버튼을 눌러 목소리를 녹음하세요</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>다시 눌러 녹음을 멈추면 자동으로 변조됩니다</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>초록 버튼으로 코끼리 목소리를 들어보세요</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span>코끼리의 각 부위를 클릭해보세요!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 코: 트럼펫 소리와 흔들기 🎺</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 상아: 반짝이는 종소리 ✨</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 몸통: 간지럼 반응 😆</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">5.</span>
              <span>나무를 클릭해서 먹이를 주세요! 🌳</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 코끼리가 냠냠냠 먹어요 😋</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">6.</span>
              <span className="text-red-600 font-bold">🔥 불을 클릭하면 코끼리가 물로 끕니다!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 코끼리가 물을 뿌려요 💦</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">7.</span>
              <span className="text-purple-600 font-bold">🏇 안장을 클릭하면 코끼리를 탈 수 있어요!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 방향키(↑↓←→) 또는 WASD로 이동</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">8.</span>
              <span className="text-yellow-600 font-bold">💩 코끼리가 자동으로 똥을 싸요!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 10초마다 30% 확률로 똥이 나와요</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs text-red-600 font-bold">
              <span>⚠️ 코끼리를 가까이 이동시켜야 상호작용 가능!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 똥: 200px 이내, 나무/불: 250px 이내</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">9.</span>
              <span className="text-red-600 font-bold">⚔️ VS 버튼을 눌러 코뿔소와 대결!</span>
            </li>
            <li className="flex gap-2 ml-6 text-xs">
              <span>• 오른쪽의 빨간 VS 버튼 클릭!</span>
            </li>
          </ol>
        </div>
      </div>

      {/* VS 버튼 */}
      <VSButton onClick={handleVSClick} />

      {/* Footer */}
      <footer className="w-full text-center mt-12 mb-4 text-white/60 text-sm">
        Made with ❤️ by Wani Park & Minki Sung
      </footer>
    </main>
  );
}
