'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  name: string;
}

interface ElephantGalleryProps {
  initialPhotos: MediaItem[];
  initialVideos: MediaItem[];
}

export default function ElephantGalleryClient({ initialPhotos, initialVideos }: ElephantGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [pinnedPhotos, setPinnedPhotos] = useState<Set<string>>(new Set());
  const [pinnedVideos, setPinnedVideos] = useState<Set<string>>(new Set());

  // localStorage에서 고정된 항목 로드
  useEffect(() => {
    const savedPhotos = localStorage.getItem('pinnedPhotos');
    const savedVideos = localStorage.getItem('pinnedVideos');
    
    if (savedPhotos) {
      setPinnedPhotos(new Set(JSON.parse(savedPhotos)));
    }
    if (savedVideos) {
      setPinnedVideos(new Set(JSON.parse(savedVideos)));
    }
  }, []);

  // 사진 고정 토글
  const togglePinPhoto = (photoName: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 이미지 클릭 이벤트 방지
    
    setPinnedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoName)) {
        newSet.delete(photoName);
      } else {
        newSet.add(photoName);
      }
      localStorage.setItem('pinnedPhotos', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  // 동영상 고정 토글
  const togglePinVideo = (videoName: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    setPinnedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoName)) {
        newSet.delete(videoName);
      } else {
        newSet.add(videoName);
      }
      localStorage.setItem('pinnedVideos', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  // 사진 정렬 (고정된 항목이 먼저)
  const sortedPhotos = [...initialPhotos].sort((a, b) => {
    const aIsPinned = pinnedPhotos.has(a.name);
    const bIsPinned = pinnedPhotos.has(b.name);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  // 동영상 정렬 (고정된 항목이 먼저)
  const sortedVideos = [...initialVideos].sort((a, b) => {
    const aIsPinned = pinnedVideos.has(a.name);
    const bIsPinned = pinnedVideos.has(b.name);
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🐘 끼리끼리
        </h1>
        <p className="text-center text-gray-600">
          소중한 추억을 모아보세요
        </p>
      </div>

      {/* 좌우 분할 레이아웃 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 사진 섹션 */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center gap-2">
            📷 사진 <span className="text-sm font-normal text-gray-500">({initialPhotos.length})</span>
          </h2>
          
          {initialPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl">
              <p className="text-2xl text-gray-400 mb-2">📷</p>
              <p className="text-gray-600">아직 사진이 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto pr-2">
              {sortedPhotos.map((item, index) => {
                const isPinned = pinnedPhotos.has(item.name);
                return (
                  <motion.div
                    key={`photo-${item.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(index * 0.01, 0.5) }}
                    className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3E📷%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* 압정 아이콘 */}
                    <button
                      onClick={(e) => togglePinPhoto(item.name, e)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                        isPinned 
                          ? 'bg-purple-600 text-white shadow-lg' 
                          : 'bg-white/80 text-gray-600 hover:bg-white opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      📌
                    </button>
                    
                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-xs font-medium truncate">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* 오른쪽: 동영상 섹션 */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-pink-600 flex items-center gap-2">
            🎥 동영상 <span className="text-sm font-normal text-gray-500">({initialVideos.length})</span>
          </h2>
          
          {initialVideos.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl">
              <p className="text-2xl text-gray-400 mb-2">🎥</p>
              <p className="text-gray-600">동영상 파일을 추가해주세요</p>
              <p className="text-sm text-gray-500 mt-2">
                public/assets/videos 폴더에<br />
                MP4, WEBM 파일을 넣어주세요
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto pr-2">
              {sortedVideos.map((item, index) => {
                const isPinned = pinnedVideos.has(item.name);
                return (
                  <motion.div
                    key={`video-${item.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: Math.min(index * 0.02, 0.5) }}
                    className="group relative aspect-video bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[16px] border-l-pink-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    
                    {/* 압정 아이콘 */}
                    <button
                      onClick={(e) => togglePinVideo(item.name, e)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                        isPinned 
                          ? 'bg-pink-600 text-white shadow-lg' 
                          : 'bg-white/80 text-gray-600 hover:bg-white opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      📌
                    </button>
                    
                    {/* 동영상 제목 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {item.name.split('.')[0].slice(0, 8)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 미디어 모달 */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 미디어 컨텐츠 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.name}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[80vh] object-contain bg-black"
                  />
                )}
                
                {/* 미디어 정보 */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                  <p className="font-medium text-gray-800">{selectedMedia.name}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm">
        Made with ❤️ by Wani Park & Minki Sung
      </footer>
    </main>
  );
}
