import fs from 'fs';
import path from 'path';
import VideoGrid from '@/components/VideoGrid';
import Link from 'next/link';

export default function GgilggilPage() {
  const videosDir = path.join(process.cwd(), 'public', 'assets', 'videos');
  let videoFiles: string[] = [];

  try {
    if (fs.existsSync(videosDir)) {
      videoFiles = fs.readdirSync(videosDir)
        .filter(file => /\.(mp4|webm|ogg|mov)$/i.test(file))
        .map(file => `/assets/videos/${file}`);
    }
  } catch (error) {
    console.error('Error reading videos directory:', error);
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] p-8 relative overflow-x-hidden font-sans">
      {/* Background Texture */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 text-center mb-16 pt-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white/90 font-handwriting drop-shadow-md text-yellow-500" 
            style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}>
          🎬 낄낄영상
        </h1>
        <p className="text-xl text-white/60 mt-4 font-handwriting">
          우리 1분반의 웃음 가득한 순간들
        </p>
      </header>

      {/* Video Grid */}
       {videoFiles.length > 0 ? (
        <VideoGrid initialVideos={videoFiles} />
      ) : (
        <div className="relative z-10 text-center text-white/50 py-20 font-handwriting text-2xl">
          <p>아직 영상이 없어요!</p>
          <p className="text-sm mt-2">public/assets/videos 폴더에 영상을 넣어주세요 🎥</p>
        </div>
      )}

      {/* Back Button */}
      <Link href="/" className="fixed bottom-8 right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-3 rounded-full border border-white/30 transition-all flex items-center gap-2 group">
        <span>🔙</span>
        <span className="group-hover:translate-x-1 transition-transform">돌아가기</span>
      </Link>
    </main>
  );
}
