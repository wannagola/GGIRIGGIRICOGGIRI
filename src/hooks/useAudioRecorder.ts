/**
 * 오디오 녹음을 위한 Custom Hook
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioRecordingState, RecordingStatus } from '@/types/audio.types';

export const useAudioRecorder = () => {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  /**
   * 마이크 권한 요청 및 녹음 시작
   */
  const startRecording = useCallback(async () => {
    try {
      // 기존 녹음 데이터 초기화
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
      chunksRef.current = [];

      // 마이크 접근
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      streamRef.current = stream;

      // MediaRecorder 설정
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        setAudioBlob(blob);
        setAudioUrl(url);
        setStatus('ready');

        // 스트림 정리
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      // 녹음 시작
      mediaRecorder.start();
      setStatus('recording');

      // 타이머 시작
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Recording error:', error);
      setStatus('idle');
      
      if (error instanceof Error && error.name === 'NotAllowedError') {
        alert('마이크 권한이 필요합니다. 브라우저 설정에서 마이크 접근을 허용해주세요.');
      } else {
        alert('녹음을 시작할 수 없습니다.');
      }
    }
  }, [audioUrl]);

  /**
   * 녹음 중지
   */
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setStatus('processing');
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * 녹음 취소
   */
  const cancelRecording = useCallback(() => {
    stopRecording();
    
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setStatus('idle');
    chunksRef.current = [];
  }, [audioUrl, stopRecording]);

  /**
   * 재생 상태 업데이트
   */
  const setPlayingStatus = useCallback((isPlaying: boolean) => {
    // idle 상태에서는 변경하지 않음 (버그 방지)
    setStatus(prev => {
      // 녹음이나 재생 가능한 상태일 때만 업데이트
      if (prev === 'ready' || prev === 'playing') {
        return isPlaying ? 'playing' : 'ready';
      }
      return prev;
    });
  }, []);

  /**
   * 정리
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return {
    status,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    cancelRecording,
    setPlayingStatus,
  };
};
