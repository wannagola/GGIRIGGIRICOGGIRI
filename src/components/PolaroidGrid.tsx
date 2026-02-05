'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: string;
  source: string;
  name: string;      // filename
  rotation: number;
  caption: string;
  dateStr: string;   // formatted date string
  rawDate: string;   // YYYYMMDD for sorting
}

interface PolaroidGridProps {
  initialPhotos: string[];
}

export default function PolaroidGrid({ initialPhotos }: PolaroidGridProps) {
  // State
  const [pinnedPhotos, setPinnedPhotos] = useState<Set<string>>(new Set());
  const [loadedCount, setLoadedCount] = useState(12);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 1. Initialize Pinned Photos from LocalStorage
  useEffect(() => {
    const savedPinned = localStorage.getItem('ggiriggiri_pinned');
    if (savedPinned) {
      try {
        setPinnedPhotos(new Set(JSON.parse(savedPinned)));
      } catch (e) {
        console.error('Failed to parse pinned photos', e);
      }
    }
  }, []);

  // 2. Parse and Sort Photos
  const allPhotos = useMemo(() => {
    // Helper to parse date from filename YYYYMMDD...
    const parseDate = (filename: string) => {
      // Logic: looks for 8 digits at start
      const match = filename.match(/^(\d{8})/);
      if (match) {
        const dateStr = match[1];
        const y = dateStr.substring(0, 4);
        const m = dateStr.substring(4, 6);
        const d = dateStr.substring(6, 8);
        return {
          raw: dateStr,
          formatted: `${y}.${m}.${d}`
        };
      }
      return { raw: '00000000', formatted: '날짜 미상' };
    };

    const photos: Photo[] = initialPhotos.map((src, index) => {
      // Decode URL to extract filename properly
      const filename = decodeURIComponent(src.split('/').pop() || ''); 
      const { raw, formatted } = parseDate(filename);
      
      return {
        id: `photo-${filename}-${index}`,
        source: src,
        name: filename,
        rotation: Math.random() * 6 - 3, // Keep random rotation
        caption: '추억의 순간', // Could potentialy parse caption from filename too?
        dateStr: formatted,
        rawDate: raw,
      };
    });

    // Sort: Pinned First, then Date Descending
    return photos.sort((a, b) => {
      const aPinned = pinnedPhotos.has(a.name);
      const bPinned = pinnedPhotos.has(b.name);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // Both pinned or both unpinned -> Sort by Date Descending
      // String comparison of YYYYMMDD works for dates
      if (b.rawDate !== a.rawDate) {
        return b.rawDate.localeCompare(a.rawDate);
      }
      
      return 0;
    });
  }, [initialPhotos, pinnedPhotos]);

  // 3. Infinite Scroll / Pagination
  const visiblePhotos = allPhotos.slice(0, loadedCount);
  const hasMore = loadedCount < allPhotos.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + 8, allPhotos.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, allPhotos.length]);

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


  // 4. Pin Toggle Handler
  const togglePin = (e: React.MouseEvent, photoName: string) => {
    e.stopPropagation(); // Don't open lightbox
    
    setPinnedPhotos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(photoName)) {
        newSet.delete(photoName);
      } else {
        newSet.add(photoName);
      }
      localStorage.setItem('ggiriggiri_pinned', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  return (
    <>
      {/* Polaroid Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 pb-32">
        <AnimatePresence mode='popLayout'>
          {visiblePhotos.map((photo, index) => {
            const isPinned = pinnedPhotos.has(photo.name);
            
            return (
              <motion.div
                layout // Enable layout animation for re-sorting
                key={photo.id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                onClick={() => setSelectedPhoto(photo)}
                className="bg-white p-4 pb-16 shadow-xl transform transition-transform duration-300 relative group cursor-pointer"
              >
                {/* Pin Button */}
                <button
                  onClick={(e) => togglePin(e, photo.name)}
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full shadow-md z-30 flex items-center justify-center transition-colors ${
                    isPinned ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-red-200'
                  }`}
                  title={isPinned ? "고정 해제" : "상단 고정"}
                >
                  <span className="text-sm">📌</span>
                </button>

                {/* Image Area */}
                <div className="w-full aspect-square bg-gray-200 overflow-hidden relative">
                  <img 
                    src={photo.source} 
                    alt={photo.caption} 
                    className="object-cover w-full h-full" 
                    loading="lazy"
                  />
                  {isPinned && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow font-bold">
                      고정됨
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-0 w-full text-center px-4">
                  <p className="font-handwriting text-gray-700 text-xl font-bold truncate" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                    {photo.caption}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{photo.dateStr}</p>
                </div>
              </motion.div>
            );
          })}
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
              onClick={(e) => e.stopPropagation()} 
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
                <p className="text-gray-500 mt-2">{selectedPhoto.dateStr}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
