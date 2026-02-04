/**
 * Audio 관련 타입 정의
 */

export interface AudioRecordingState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  audioBlob: Blob | null;
  audioUrl: string | null;
}

export interface VoiceModulationOptions {
  pitchShift: number;        // 음높이 조절 (-12 ~ +12 semitones)
  reverbAmount: number;       // 리버브 양 (0 ~ 1)
  echoDelay: number;          // 에코 딜레이 (ms)
  echoFeedback: number;       // 에코 피드백 (0 ~ 1)
}

export interface AudioProcessorConfig {
  sampleRate?: number;
  bufferSize?: number;
  channels?: number;
}

export type RecordingStatus = 'idle' | 'recording' | 'processing' | 'ready' | 'playing';

export interface ElephantSound {
  type: 'echo' | 'tickle';
  audioBuffer: AudioBuffer | null;
}
