/**
 * Web Audio API를 사용한 오디오 처리 유틸리티
 */

import { VoiceModulationOptions, AudioProcessorConfig } from '@/types/audio.types';

export class AudioProcessor {
  private audioContext: AudioContext | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;

  constructor(config?: AudioProcessorConfig) {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: config?.sampleRate || 44100,
      });
    }
  }

  /**
   * 오디오 파일을 AudioBuffer로 디코딩
   */
  async decodeAudioData(audioBlob: Blob): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const arrayBuffer = await audioBlob.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /**
   * 코끼리 목소리로 변조 (낮은 피치 + 리버브 + 에코)
   */
  async modulateVoice(
    audioBuffer: AudioBuffer,
    options: VoiceModulationOptions
  ): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    // 소스 생성
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;

    // Pitch Shift (playbackRate 사용)
    source.playbackRate.value = Math.pow(2, options.pitchShift / 12);

    // Reverb (ConvolverNode)
    const convolver = offlineContext.createConvolver();
    convolver.buffer = this.createReverbImpulse(
      offlineContext,
      options.reverbAmount
    );

    // Echo (Delay)
    const delay = offlineContext.createDelay();
    delay.delayTime.value = options.echoDelay / 1000;

    const feedback = offlineContext.createGain();
    feedback.gain.value = options.echoFeedback;

    const dryGain = offlineContext.createGain();
    dryGain.gain.value = 0.7;

    const wetGain = offlineContext.createGain();
    wetGain.gain.value = 0.3;

    // 연결
    source.connect(dryGain);
    source.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wetGain);

    dryGain.connect(convolver);
    wetGain.connect(convolver);
    convolver.connect(offlineContext.destination);

    source.start(0);

    return await offlineContext.startRendering();
  }

  /**
   * 리버브 임펄스 응답 생성
   */
  private createReverbImpulse(
    context: OfflineAudioContext,
    amount: number
  ): AudioBuffer {
    const sampleRate = context.sampleRate;
    const length = sampleRate * 2; // 2초 리버브
    const impulse = context.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2) * amount;
      }
    }

    return impulse;
  }

  /**
   * 오디오 재생
   */
  async playAudio(audioBuffer: AudioBuffer): Promise<void> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    // 기존 재생 중지
    this.stopAudio();

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = audioBuffer;
    this.sourceNode.connect(this.audioContext.destination);
    this.sourceNode.start(0);

    return new Promise((resolve) => {
      if (this.sourceNode) {
        this.sourceNode.onended = () => resolve();
      }
    });
  }

  /**
   * 오디오 재생 중지
   */
  stopAudio(): void {
    if (this.sourceNode) {
      try {
        this.sourceNode.stop();
      } catch (error) {
        // Already stopped
      }
      this.sourceNode = null;
    }
  }

  /**
   * "이잉~" 소리 합성 (Oscillator 사용)
   */
  async synthesizeTickleSound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 0.8;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    const oscillator = offlineContext.createOscillator();
    const gainNode = offlineContext.createGain();

    // 주파수 변화 (800Hz -> 1200Hz -> 600Hz)
    oscillator.frequency.setValueAtTime(800, 0);
    oscillator.frequency.linearRampToValueAtTime(1200, 0.2);
    oscillator.frequency.linearRampToValueAtTime(600, duration);

    // 볼륨 엔벨로프
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.3, 0.1);
    gainNode.gain.linearRampToValueAtTime(0.2, 0.4);
    gainNode.gain.linearRampToValueAtTime(0, duration);

    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(offlineContext.destination);

    oscillator.start(0);
    oscillator.stop(duration);

    return await offlineContext.startRendering();
  }

  /**
   * 코 흔들기 소리 합성 (트럼펫 소리)
   */
  async synthesizeTrunkSound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 1.2;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    const oscillator = offlineContext.createOscillator();
    const gainNode = offlineContext.createGain();

    // 트럼펫 소리 (낮은 음에서 높은 음으로)
    oscillator.frequency.setValueAtTime(200, 0);
    oscillator.frequency.exponentialRampToValueAtTime(400, 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(350, 0.6);
    oscillator.frequency.exponentialRampToValueAtTime(300, duration);

    // 볼륨 엔벨로프
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.4, 0.1);
    gainNode.gain.linearRampToValueAtTime(0.3, 0.5);
    gainNode.gain.linearRampToValueAtTime(0, duration);

    oscillator.type = 'sawtooth';
    oscillator.connect(gainNode);
    gainNode.connect(offlineContext.destination);

    oscillator.start(0);
    oscillator.stop(duration);

    return await offlineContext.startRendering();
  }

  /**
   * 상아 소리 합성 (종소리 / 맑은 소리)
   */
  async synthesizeTuskSound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 1.5;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    // 여러 주파수를 혼합하여 종소리 만들기
    const frequencies = [523, 659, 784]; // C5, E5, G5 (화음)
    
    frequencies.forEach((freq, index) => {
      const oscillator = offlineContext.createOscillator();
      const gainNode = offlineContext.createGain();

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      // 각 음의 볼륨을 다르게
      const volume = 0.15 / (index + 1);
      gainNode.gain.setValueAtTime(0, 0);
      gainNode.gain.linearRampToValueAtTime(volume, 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, duration);

      oscillator.connect(gainNode);
      gainNode.connect(offlineContext.destination);

      oscillator.start(0);
      oscillator.stop(duration);
    });

    return await offlineContext.startRendering();
  }

  /**
   * 먹이 먹는 소리 합성 (씹는 소리)
   */
  async synthesizeEatingSound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 1.5;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    // 여러 개의 짧은 소음을 연속으로 (씹는 소리)
    for (let i = 0; i < 5; i++) {
      const startTime = i * 0.3;
      const oscDuration = 0.15;

      const oscillator = offlineContext.createOscillator();
      const gainNode = offlineContext.createGain();

      // 낮은 주파수의 노이즈 (씹는 소리)
      oscillator.frequency.value = 100 + Math.random() * 50;
      oscillator.type = 'square';

      // 짧은 펄스
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, startTime + oscDuration);

      oscillator.connect(gainNode);
      gainNode.connect(offlineContext.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + oscDuration);
    }

    // 만족스러운 소리 추가 (마지막에)
    const satisfactionOsc = offlineContext.createOscillator();
    const satisfactionGain = offlineContext.createGain();

    satisfactionOsc.frequency.setValueAtTime(300, 1.3);
    satisfactionOsc.frequency.linearRampToValueAtTime(400, 1.5);
    satisfactionOsc.type = 'sine';

    satisfactionGain.gain.setValueAtTime(0, 1.3);
    satisfactionGain.gain.linearRampToValueAtTime(0.15, 1.35);
    satisfactionGain.gain.linearRampToValueAtTime(0, 1.5);

    satisfactionOsc.connect(satisfactionGain);
    satisfactionGain.connect(offlineContext.destination);

    satisfactionOsc.start(1.3);
    satisfactionOsc.stop(1.5);

    return await offlineContext.startRendering();
  }

  /**
   * 물 뿌리는 소리 합성 (쉬ㅣㅣㅣ~)
   */
  async synthesizeWaterSpraySound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 2.5;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    // 화이트 노이즈 생성 (물 뿌리는 소리)
    const bufferSize = sampleRate * duration;
    const noiseBuffer = offlineContext.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSource = offlineContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // 필터로 물소리 만들기
    const bandpass = offlineContext.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 2000;
    bandpass.Q.value = 0.5;

    const lowpass = offlineContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 4000;

    // 볼륨 엔벨로프
    const gainNode = offlineContext.createGain();
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.15, 0.2);
    gainNode.gain.setValueAtTime(0.15, 1.8);
    gainNode.gain.linearRampToValueAtTime(0, duration);

    // 연결
    noiseSource.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(offlineContext.destination);

    noiseSource.start(0);

    return await offlineContext.startRendering();
  }

  /**
   * 똥 치우는 소리 합성 (휙~ 하는 소리)
   */
  async synthesizeCleanUpSound(): Promise<AudioBuffer> {
    if (!this.audioContext) {
      throw new Error('AudioContext is not initialized');
    }

    const duration = 0.5;
    const sampleRate = this.audioContext.sampleRate;
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    const oscillator = offlineContext.createOscillator();
    const gainNode = offlineContext.createGain();

    // 휙~ 소리 (빠르게 올라가는 주파수)
    oscillator.frequency.setValueAtTime(200, 0);
    oscillator.frequency.exponentialRampToValueAtTime(1000, 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(100, duration);

    // 볼륨 엔벨로프
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(0.2, 0.05);
    gainNode.gain.linearRampToValueAtTime(0.1, 0.3);
    gainNode.gain.linearRampToValueAtTime(0, duration);

    oscillator.type = 'sawtooth';
    oscillator.connect(gainNode);
    gainNode.connect(offlineContext.destination);

    oscillator.start(0);
    oscillator.stop(duration);

    return await offlineContext.startRendering();
  }

  /**
   * 리소스 정리
   */
  dispose(): void {
    this.stopAudio();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
