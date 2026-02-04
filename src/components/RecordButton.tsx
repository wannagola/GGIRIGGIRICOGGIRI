'use client';

import { motion } from 'framer-motion';
import { recordButtonVariants } from '@/utils/animations';
import { RecordingStatus } from '@/types/audio.types';

interface RecordButtonProps {
  status: RecordingStatus;
  recordingTime: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlay: () => void;
  onCancel: () => void;
}

export default function RecordButton({
  status,
  recordingTime,
  onStartRecording,
  onStopRecording,
  onPlay,
  onCancel,
}: RecordButtonProps) {
  
  // 디버깅
  console.log('RecordButton status:', status);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 녹음 시간 표시 */}
      {status === 'recording' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-mono font-bold text-red-500"
        >
          {formatTime(recordingTime)}
        </motion.div>
      )}

      {/* 메인 버튼 */}
      <div className="flex gap-4">
        {/* 항상 버튼 표시 - 디버깅용 */}
        {status === 'idle' || !status ? (
          <button
            onClick={onStartRecording}
            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center transition-colors hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-8 bg-white rounded-full" />
          </button>
        ) : null}

        {status === 'recording' && (
          <motion.button
            variants={recordButtonVariants}
            animate="recording"
            onClick={onStopRecording}
            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <div className="w-6 h-6 bg-white rounded" />
          </motion.button>
        )}

        {status === 'processing' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        )}

        {(status === 'ready' || status === 'playing') && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlay}
              disabled={status === 'playing'}
              className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-colors ${
                status === 'playing'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCancel}
              disabled={status === 'playing'}
              className="w-20 h-20 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-full shadow-lg flex items-center justify-center transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {/* 상태 메시지 */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-600 text-center min-h-[20px]">
          {status === 'idle' && '🎤 녹음 버튼을 눌러 시작하세요'}
          {status === 'recording' && '🔴 녹음 중... 다시 눌러 중지'}
          {status === 'processing' && '⚙️ 코끼리 목소리로 변환 중...'}
          {status === 'ready' && '✅ 재생 버튼을 눌러 들어보세요!'}
          {status === 'playing' && '🎺 재생 중...'}
          {!status && '⚠️ 상태 없음 (디버깅)'}
        </p>
        <p className="text-xs text-gray-400">현재 상태: {status || 'undefined'}</p>
      </div>
    </div>
  );
}
