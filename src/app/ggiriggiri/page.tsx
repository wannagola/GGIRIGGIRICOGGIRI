import fs from 'fs';
import path from 'path';
import PolaroidGrid from '@/components/PolaroidGrid';
import BackgroundMusic from '@/components/BackgroundMusic';

// Server Component: reads files from file system
export default function GgiriggiriPage() {
  // Read files from public/assets/pictures
  const picturesDir = path.join(process.cwd(), 'public', 'assets', 'pictures');
  let photoFiles: string[] = [];

  try {
    if (fs.existsSync(picturesDir)) {
      photoFiles = fs.readdirSync(picturesDir)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/assets/pictures/${file}`);
    }
  } catch (error) {
    console.error('Error reading pictures directory:', error);
  }

  // If no photos found, verify if we should show placeholders or nothing
  // For demo purposes, if empty, we might pass an empty array
  // The PolaroidGrid handles empty state or we can add mocks if needed for dev
  
  // To allow testing without real files, let's keep the mock generator if the folder is empty
  // BUT the user said "I will put files there", so let's stick to real files logic primarily.
  // If empty, we can show a message "사진을 넣어주세요!"
  
  // NOTE: If you want to keep the mock data when empty:
  if (photoFiles.length === 0) {
      // Logic for mocks or empty state can be handled here or in client
      // Let's pass empty and let client handle, or pass mock links if we had them
  }

  return (
    <main className="min-h-screen bg-[#2b2b2b] p-8 relative overflow-x-hidden font-sans">
      {/* Blackboard Texture / Frame */}
      <div className="fixed inset-0 border-[16px] border-[#5d4037] pointer-events-none z-50 rounded-lg shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
      
      {/* Chalkboard Dust Effect */}
      <div className="fixed inset-0 bg-white/5 pointer-events-none z-40 bg-[url('/chalk-texture.png')] mix-blend-overlay opacity-30" />

      {/* Header */}
      <header className="relative z-10 text-center mb-16 pt-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white/90 font-handwriting drop-shadow-md transform -rotate-2" 
            style={{ fontFamily: "'Nanum Pen Script', cursive, sans-serif" }}>
          우리 1분반 끼리끼리
        </h1>
        <p className="text-xl text-white/60 mt-4 font-handwriting">
          함께한 소중한 순간들을 모았습니다
          {/* Chalk dust decoration */}
          <span className="block w-32 h-1 bg-white/20 mx-auto mt-4 rounded-full blur-[1px]"></span>
        </p>
      </header>

      {/* Client Component for Grid & Interaction */}
      {photoFiles.length > 0 ? (
        <PolaroidGrid initialPhotos={photoFiles} />
      ) : (
        <div className="relative z-10 text-center text-white/50 py-20 font-handwriting text-2xl">
          <p>아직 사진이 없어요!</p>
          <p className="text-sm mt-2">public/assets/pictures 폴더에 사진을 넣어주세요 📷</p>
        </div>
      )}

      {/* Background Music */}
      <BackgroundMusic />

      {/* Back Button */}
      <a href="/" className="fixed bottom-8 right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 py-3 rounded-full border border-white/30 transition-all flex items-center gap-2 group">
        <span>🔙</span>
        <span className="group-hover:translate-x-1 transition-transform">돌아가기</span>
      </a>
    </main>
  );
}
