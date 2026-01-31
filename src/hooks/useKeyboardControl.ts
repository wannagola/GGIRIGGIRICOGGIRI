/**
 * 키보드 방향키 입력을 처리하는 Custom Hook
 */

import { useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface KeyboardControlProps {
  isRiding: boolean;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
}

export const useKeyboardControl = ({ isRiding, onMove }: KeyboardControlProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!isRiding) return;

    // 기본 스크롤 방지
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        onMove('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        onMove('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        onMove('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        onMove('right');
        break;
    }
  }, [isRiding, onMove]);

  useEffect(() => {
    if (isRiding) {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isRiding, handleKeyPress]);
};
