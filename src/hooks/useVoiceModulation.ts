/**
 * 음성 변조를 위한 Custom Hook
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioProcessor } from '@/utils/audioProcessor';
import { VoiceModulationOptions } from '@/types/audio.types';

// 코끼리 목소리 프리셋
const ELEPHANT_VOICE_PRESET: VoiceModulationOptions = {
  pitchShift: -8,        // 8 semitones 낮춤
  reverbAmount: 0.6,     // 60% 리버브
  echoDelay: 200,        // 200ms 딜레이
  echoFeedback: 0.3,     // 30% 피드백
};

export const useVoiceModulation = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modulatedBuffer, setModulatedBuffer] = useState<AudioBuffer | null>(null);
  const [tickleSoundBuffer, setTickleSoundBuffer] = useState<AudioBuffer | null>(null);
  const [trunkSoundBuffer, setTrunkSoundBuffer] = useState<AudioBuffer | null>(null);
  const [tuskSoundBuffer, setTuskSoundBuffer] = useState<AudioBuffer | null>(null);
  const [eatingSoundBuffer, setEatingSoundBuffer] = useState<AudioBuffer | null>(null);
  const [waterSpraySoundBuffer, setWaterSpraySoundBuffer] = useState<AudioBuffer | null>(null);
  const [cleanUpSoundBuffer, setCleanUpSoundBuffer] = useState<AudioBuffer | null>(null);

  const audioProcessorRef = useRef<AudioProcessor | null>(null);

  /**
   * AudioProcessor 초기화
   */
  useEffect(() => {
    audioProcessorRef.current = new AudioProcessor();

    // 효과음 미리 생성
    const initSounds = async () => {
      if (audioProcessorRef.current) {
        try {
          // 간지럼 소리
          const tickleBuffer = await audioProcessorRef.current.synthesizeTickleSound();
          setTickleSoundBuffer(tickleBuffer);

          // 코 흔들기 소리 (트럼펫 소리)
          const trunkBuffer = await audioProcessorRef.current.synthesizeTrunkSound();
          setTrunkSoundBuffer(trunkBuffer);

          // 상아 소리 (종소리)
          const tuskBuffer = await audioProcessorRef.current.synthesizeTuskSound();
          setTuskSoundBuffer(tuskBuffer);

          // 먹이 먹는 소리 (씹는 소리)
          const eatingBuffer = await audioProcessorRef.current.synthesizeEatingSound();
          setEatingSoundBuffer(eatingBuffer);

          // 물 뿌리는 소리
          const waterSprayBuffer = await audioProcessorRef.current.synthesizeWaterSpraySound();
          setWaterSpraySoundBuffer(waterSprayBuffer);

          // 똥 치우는 소리
          const cleanUpBuffer = await audioProcessorRef.current.synthesizeCleanUpSound();
          setCleanUpSoundBuffer(cleanUpBuffer);
        } catch (error) {
          console.error('Failed to synthesize sounds:', error);
        }
      }
    };

    initSounds();

    return () => {
      if (audioProcessorRef.current) {
        audioProcessorRef.current.dispose();
      }
    };
  }, []);

  /**
   * 음성 변조 처리
   */
  const modulateVoice = useCallback(async (audioBlob: Blob): Promise<AudioBuffer | null> => {
    if (!audioProcessorRef.current) {
      throw new Error('AudioProcessor is not initialized');
    }

    setIsProcessing(true);

    try {
      // Blob을 AudioBuffer로 디코딩
      const originalBuffer = await audioProcessorRef.current.decodeAudioData(audioBlob);

      // 코끼리 목소리로 변조
      const modulated = await audioProcessorRef.current.modulateVoice(
        originalBuffer,
        ELEPHANT_VOICE_PRESET
      );

      setModulatedBuffer(modulated);
      return modulated;

    } catch (error) {
      console.error('Voice modulation error:', error);
      alert('음성 변조 중 오류가 발생했습니다.');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * 변조된 음성 재생
   */
  const playModulatedVoice = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !modulatedBuffer) {
      return;
    }

    setIsPlaying(true);

    try {
      await audioProcessorRef.current.playAudio(modulatedBuffer);
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [modulatedBuffer]);

  /**
   * 간지럼 소리 재생
   */
  const playTickleSound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !tickleSoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(tickleSoundBuffer);
    } catch (error) {
      console.error('Tickle sound playback error:', error);
    }
  }, [tickleSoundBuffer]);

  /**
   * 코 흔들기 소리 재생
   */
  const playTrunkSound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !trunkSoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(trunkSoundBuffer);
    } catch (error) {
      console.error('Trunk sound playback error:', error);
    }
  }, [trunkSoundBuffer]);

  /**
   * 상아 소리 재생
   */
  const playTuskSound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !tuskSoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(tuskSoundBuffer);
    } catch (error) {
      console.error('Tusk sound playback error:', error);
    }
  }, [tuskSoundBuffer]);

  /**
   * 먹이 먹는 소리 재생
   */
  const playEatingSound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !eatingSoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(eatingSoundBuffer);
    } catch (error) {
      console.error('Eating sound playback error:', error);
    }
  }, [eatingSoundBuffer]);

  /**
   * 물 뿌리는 소리 재생
   */
  const playWaterSpraySound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !waterSpraySoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(waterSpraySoundBuffer);
    } catch (error) {
      console.error('Water spray sound playback error:', error);
    }
  }, [waterSpraySoundBuffer]);

  /**
   * 똥 치우는 소리 재생
   */
  const playCleanUpSound = useCallback(async (): Promise<void> => {
    if (!audioProcessorRef.current || !cleanUpSoundBuffer) {
      return;
    }

    try {
      await audioProcessorRef.current.playAudio(cleanUpSoundBuffer);
    } catch (error) {
      console.error('Clean up sound playback error:', error);
    }
  }, [cleanUpSoundBuffer]);

  /**
   * 재생 중지
   */
  const stopPlayback = useCallback(() => {
    if (audioProcessorRef.current) {
      audioProcessorRef.current.stopAudio();
      setIsPlaying(false);
    }
  }, []);

  return {
    isProcessing,
    isPlaying,
    modulatedBuffer,
    modulateVoice,
    playModulatedVoice,
    playTickleSound,
    playTrunkSound,
    playTuskSound,
    playEatingSound,
    playWaterSpraySound,
    playCleanUpSound,
    stopPlayback,
  };
};
