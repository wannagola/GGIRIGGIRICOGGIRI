'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  source: string;
  title: string;
}

interface VideoGridProps {
  initialVideos: string[];
}

export default function VideoGrid({ initialVideos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = initialVideos.map((src, index) => ({
    id: `video-${index}`,
    source: src,
    title: src.split('/').pop()?.split('.')[0] || `영상 ${index + 1}`
  }));

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-8 pb-32">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedVideo(video)}
            className="bg-black/80 p-2 rounded-lg shadow-xl cursor-pointer border border-white/20 relative group overflow-hidden"
          >
             {/* Film Strip Effect Top/Bottom */}
            <div className="absolute top-0 left-0 right-0 h-4 border-b border-dashed border-white/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 border-t border-dashed border-white/30"></div>

            {/* Thumbnail / Placeholder */}
            {/* Using video tag as thumbnail provider if no poster */}
            <div className="aspect-video bg-gray-900 mt-4 mb-12 relative overflow-hidden flex items-center justify-center">
               <video src={video.source} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                   <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                 </div>
               </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
               <p className="text-white font-handwriting text-xl truncate px-4" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>{video.title}</p>
            </div>
          </motion.div>
        ))}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
