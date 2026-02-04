'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-400 to-green-300">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-bold text-white drop-shadow-lg mb-12 text-center"
      >
        🐘 끼리끼리코끼리
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-center">
        {/* Elephant Game Link */}
        <Link href="/elephant" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-80 h-96 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer border-4 border-transparent hover:border-blue-500 transition-all duration-300"
          >
            <div className="text-8xl mb-6 group-hover:animate-bounce">🐘</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">코끼리 만지기</h2>
            <p className="text-center text-gray-600">
              코끼리와 대화하고 함께 놀아요! 목소리 변조 기능까지!
            </p>
          </motion.div>
        </Link>

        {/* Ggiriggiri Link */}
        <Link href="/ggiriggiri" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-80 h-96 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer border-4 border-transparent hover:border-yellow-500 transition-all duration-300"
          >
            <div className="text-8xl mb-6 group-hover:animate-spin">📸</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">끼리끼리</h2>
            <p className="text-center text-gray-600">
              우리 1분반의 추억을 모아봐요! 칠판 위 폴라로이드 사진들.
            </p>
          </motion.div>
        </Link>

        {/* Ggilggil Video Link */}
        <Link href="/ggilggil" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-80 h-96 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center cursor-pointer border-4 border-transparent hover:border-red-500 transition-all duration-300"
          >
            <div className="text-8xl mb-6 group-hover:animate-pulse">🎬</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">낄낄영상</h2>
            <p className="text-center text-gray-600">
               우리 1분반의 웃음 가득한 순간들! 재미있는 영상 모음.
            </p>
          </motion.div>
        </Link>
      </div>

      <footer className="absolute bottom-4 text-white/80 text-sm">
        Select a mode to start your journey
      </footer>
    </main>
  );
}
