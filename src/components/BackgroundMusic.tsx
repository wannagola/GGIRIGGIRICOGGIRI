'use client';
import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt auto-play
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // 50% volume
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log("Autoplay blocked:", e);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <audio ref={audioRef} src="/assets/sounds/bgm.mp3" loop />
      <button 
        onClick={togglePlay} 
        className="bg-white/10 hover:bg-white/20 backdrop-blur text-white p-3 rounded-full border border-white/30 transition-all shadow-lg active:scale-95"
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
