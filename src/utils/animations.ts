/**
 * Framer Motion 애니메이션 설정
 */

import { Variants } from 'framer-motion';

/**
 * 코끼리 코 들어올리기 애니메이션
 */
export const trunkUpVariants: Variants = {
  idle: {
    rotate: 0,
    y: 0,
    transition: { duration: 0.3 }
  },
  up: {
    rotate: -15,
    y: -20,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * 움찔 애니메이션 (간지럼 반응)
 */
export const wiggleVariants: Variants = {
  idle: {
    rotate: 0,
    scale: 1,
  },
  wiggle: {
    rotate: [0, -3, 3, -3, 3, 0],
    scale: [1, 1.02, 0.98, 1.02, 0.98, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
};

/**
 * 녹음 버튼 펄스 애니메이션
 */
export const recordButtonVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)',
  },
  recording: {
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0 0 rgba(239, 68, 68, 0.7)',
      '0 0 0 10px rgba(239, 68, 68, 0)',
      '0 0 0 0 rgba(239, 68, 68, 0)'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};

/**
 * 페이드 인 애니메이션
 */
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

/**
 * 오디오 비주얼라이저 바 애니메이션
 */
export const audioBarVariants: Variants = {
  idle: {
    scaleY: 0.2,
  },
  active: {
    scaleY: [0.2, 1, 0.5, 1, 0.2],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * 코 흔들기 애니메이션
 */
export const trunkSwingVariants: Variants = {
  idle: {
    rotate: 0,
  },
  swing: {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
};

/**
 * 상아 반짝이기 애니메이션
 */
export const tuskShineVariants: Variants = {
  idle: {
    opacity: 1,
    scale: 1,
  },
  shine: {
    opacity: [1, 0.5, 1, 0.5, 1],
    scale: [1, 1.05, 1, 1.05, 1],
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

/**
 * 먹이 먹는 애니메이션 (코끼리가 나무 쪽으로)
 */
export const eatAnimationVariants: Variants = {
  idle: {
    x: 0,
    rotate: 0,
  },
  eating: {
    x: [0, 20, 20, 0],
    transition: {
      duration: 2,
      times: [0, 0.3, 0.7, 1],
      ease: 'easeInOut'
    }
  }
};

/**
 * 입 움직임 애니메이션
 */
export const mouthMovementVariants: Variants = {
  idle: {
    scaleY: 1,
  },
  chewing: {
    scaleY: [1, 0.9, 1, 0.9, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
};

/**
 * 물 뿌리기 애니메이션 (불 끄기)
 */
export const waterSprayVariants: Variants = {
  idle: {
    rotate: 0,
    y: 0,
  },
  spraying: {
    rotate: [0, -30, -30, 0],
    y: [0, -10, -10, 0],
    transition: {
      duration: 2.5,
      times: [0, 0.3, 0.7, 1],
      ease: 'easeInOut'
    }
  }
};
