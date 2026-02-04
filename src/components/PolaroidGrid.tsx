'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: string;
  source: string;
  rotation: number;
  caption: string;
}

interface PolaroidGridProps {
  initialPhotos: string[];
}

export default function PolaroidGrid({ initialPhotos }: PolaroidGridProps) {
  const [displayPhotos, setDisplayPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loadedCount, setLoadedCount] = useState(12); // Initial count to show
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initialize photos with random properties
  useEffect(() => {
    const formattedPhotos = initialPhotos.map((src, index) => ({
      id: `photo-${index}`,
      source: src,
      rotation: Math.random() * 6 - 3,
      caption: `추억의 사진`
    }));
    setDisplayPhotos(formattedPhotos);
  }, [initialPhotos]);

  // Derived state for currently visible photos for infinite scroll simulation
  // Since we have a finite list of files, "infinite scroll" just shows more of them
  const visiblePhotos = displayPhotos.slice(0, loadedCount);
  const hasMore = loadedCount < displayPhotos.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    // Simulate network delay for effect
    setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + 8, displayPhotos.length));
      setIsLoading(false);
    }, 800);
  }, [isLoading, hasMore, displayPhotos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore]);



  return (
    <>
      {/* Polaroid Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 pb-32">
        <AnimatePresence>
          {visiblePhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
              transition={{ delay: (index % 8) * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              onClick={() => setSelectedPhoto(photo)}
              className="bg-white p-4 pb-16 shadow-xl transform transition-transform duration-300 relative group cursor-pointer"
            >
              {/* Pin or Tape */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-md z-10" />

              {/* Image Area */}
              <div className="w-full aspect-square bg-gray-200 overflow-hidden relative">
                <img 
                  src={photo.source} 
                  alt={photo.caption} 
                  className="object-cover w-full h-full" 
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-0 w-full text-center px-4">
                <p className="font-handwriting text-gray-700 text-xl font-bold truncate" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                  {photo.caption}
                </p>
                <p className="text-xs text-gray-400 mt-1">2026.02.04</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading Indicator / Observer Target */}
      <div ref={observerTarget} className="h-20 w-full flex items-center justify-center z-10 relative">
        {isLoading && hasMore && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        )}
        {!hasMore && visiblePhotos.length > 0 && (
          <p className="text-white/50 text-sm font-handwriting">모든 추억을 다 보았습니다</p>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 cursor-zoom-out"
          >
            <motion.div
              layoutId={selectedPhoto.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
              className="relative max-w-4xl max-h-[90vh] bg-white p-4 pb-20 rounded shadow-2xl overflow-hidden"
            >
              <img
                src={selectedPhoto.source}
                alt={selectedPhoto.caption}
                className="w-full h-full object-contain max-h-[80vh]"
              />
               <div className="absolute bottom-6 left-0 w-full text-center px-8">
                <p className="font-handwriting text-gray-800 text-3xl font-bold" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                  {selectedPhoto.caption}
                </p>
              </div>
              

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
