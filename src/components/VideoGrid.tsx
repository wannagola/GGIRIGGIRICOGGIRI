'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  source: string;
  title: string;
  name: string;      // filename for pinning
  dateStr: string;   // formatted date
  rawDate: string;   // YYYYMMDD for sorting
}

interface VideoGridProps {
  initialVideos: string[];
}

export default function VideoGrid({ initialVideos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [pinnedVideos, setPinnedVideos] = useState<Set<string>>(new Set());

  // 1. Initialize Pinned Videos from LocalStorage
  useEffect(() => {
    const savedPinned = localStorage.getItem('ggilggil_pinned');
    if (savedPinned) {
      try {
        setPinnedVideos(new Set(JSON.parse(savedPinned)));
      } catch (e) {
        console.error('Failed to parse pinned videos', e);
      }
    }
  }, []);

  // 2. Parse and Sort Videos
  const sortedVideos = useMemo(() => {
    // Helper to parse date from filename YYYYMMDD...
    const parseDate = (filename: string) => {
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

    const videos: Video[] = initialVideos.map((src, index) => {
      const filename = decodeURIComponent(src.split('/').pop() || '');
      // Check if filename has title part after date (e.g. 20240101_Title.mp4)
      // or just use filename without extension
      const titleWithoutExt = filename.split('.')[0]; 
      const { raw, formatted } = parseDate(filename);

      return {
        id: `video-${filename}-${index}`,
        source: src,
        name: filename,
        title: titleWithoutExt,
        dateStr: formatted,
        rawDate: raw
      };
    });

    // Sort: Pinned First, then Date Descending
    return videos.sort((a, b) => {
      const aPinned = pinnedVideos.has(a.name);
      const bPinned = pinnedVideos.has(b.name);

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // Both pinned or both unpinned -> Sort by Date Descending
      if (b.rawDate !== a.rawDate) {
        return b.rawDate.localeCompare(a.rawDate);
      }
      
      return 0;
    });
  }, [initialVideos, pinnedVideos]);

  // 3. Pin Toggle Handler
  const togglePin = (e: React.MouseEvent, videoName: string) => {
    e.stopPropagation(); // Don't open modal
    
    setPinnedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoName)) {
        newSet.delete(videoName);
      } else {
        newSet.add(videoName);
      }
      localStorage.setItem('ggilggil_pinned', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8 pb-32">
        <AnimatePresence mode='popLayout'>
          {sortedVideos.map((video, index) => {
            const isPinned = pinnedVideos.has(video.name);

            return (
              <motion.div
                layout
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedVideo(video)}
                className="bg-black/80 p-2 rounded-lg shadow-xl cursor-pointer border border-white/20 relative group overflow-hidden"
              >
                {/* Pin Button */}
                <button
                  onClick={(e) => togglePin(e, video.name)}
                  className={`absolute top-4 right-4 z-30 w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-colors ${
                    isPinned ? 'bg-yellow-500 text-black' : 'bg-black/50 text-gray-400 hover:bg-yellow-500/50 hover:text-white'
                  }`}
                  title={isPinned ? "고정 해제" : "상단 고정"}
                >
                   <span className="text-sm">📌</span>
                </button>

                 {/* Film Strip Effect Top/Bottom */}
                <div className="absolute top-0 left-0 right-0 h-4 border-b border-dashed border-white/30 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-4 border-t border-dashed border-white/30 pointer-events-none"></div>

                {/* Thumbnail / Placeholder */}
                <div className="aspect-video bg-gray-900 mt-4 mb-12 relative overflow-hidden flex items-center justify-center">
                   <video src={video.source} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted preload="metadata" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                       <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                     </div>
                   </div>
                   {isPinned && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded shadow font-bold z-20">
                      고정됨
                    </div>
                  )}
                </div>

                <div className="absolute bottom-4 left-0 right-0 text-center">
                   <p className="text-white font-handwriting text-xl truncate px-4" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>{video.title}</p>
                   <p className="text-white/50 text-xs mt-1">{video.dateStr}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              layoutId={selectedVideo.id} // optional: if layoutId matches grid item, we get shared element transition
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-black rounded-lg shadow-2xl overflow-hidden relative"
            >
              <video 
                src={selectedVideo.source} 
                controls 
                autoPlay 
                className="w-full h-auto max-h-[80vh]"
              />
              <div className="p-4 bg-gray-900">
                <h3 className="text-white text-xl font-handwriting" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>{selectedVideo.title}</h3>
                <p className="text-white/50 text-sm mt-1">{selectedVideo.dateStr}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
