<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# 🐘 Dumbo Echo - Talking Elephant Web App

사용자의 목소리를 녹음해 웅장한 코끼리 목소리로 변조하여 재생하고, 특정 클릭 이벤트(간지럼)에 반응하는 인터랙티브 웹 애플리케이션입니다.

## 📋 프로젝트 개요

### 핵심 기능
1. **음성 변조 및 리플레이 (Echo 기능)**
   - 브라우저 마이크 API를 사용한 음성 녹음
   - Pitch를 낮춰 묵직한 코끼리 목소리로 변조
   - Reverb 및 Echo 효과로 초원의 공간감 부여
   - 재생 시 코끼리 캐릭터 애니메이션 (코를 치켜드는 모션)

2. **인터랙티브 반응 (Tickle 기능)**
   - 캐릭터 특정 영역 클릭 시 반응
   - '움찔' 애니메이션 효과
   - "이잉~" 하는 높은 울음소리 재생

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Audio Processing**: Web Audio API
- **Language**: TypeScript
- **Package Manager**: npm

## 📁 프로젝트 구조

```
dumbo-echo/
├── public/                      # 정적 파일
│   ├── assets/
│   │   ├── images/
│   │   │   └── elephant/       # 코끼리 캐릭터 이미지
│   │   └── sounds/             # 효과음 파일
│   └── favicon.ico
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   └── globals.css        # 전역 스타일
│   ├── components/             # React 컴포넌트
│   │   ├── ElephantCharacter.tsx   # 코끼리 캐릭터
│   │   ├── RecordButton.tsx        # 녹음 버튼
│   │   └── AudioVisualizer.tsx     # 오디오 시각화
│   ├── hooks/                  # Custom Hooks
│   │   ├── useAudioRecorder.ts     # 오디오 녹음 로직
│   │   └── useVoiceModulation.ts   # 음성 변조 로직
│   ├── utils/                  # 유틸리티 함수
│   │   ├── audioProcessor.ts       # 오디오 처리
│   │   └── animations.ts           # 애니메이션 설정
│   └── types/                  # TypeScript 타입 정의
│       └── audio.types.ts
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🚀 시작하기

### 1️⃣ 터미널에서 프로젝트 폴더로 이동
```bash
cd "/Users/wanipark1004/Desktop/끼리끼리코끼리"
```

### 2️⃣ 의존성 패키지 설치 (최초 1회만)
```bash
npm install
```

### 3️⃣ 개발 서버 실행 ⭐️ 중요!
```bash
npm run dev
```

**✅ 성공 시 이런 메시지가 나타납니다:**
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

### 4️⃣ 브라우저에서 열기
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

> 💡 **마이크 권한 요청이 나오면 반드시 "허용"을 클릭하세요!**

### 빌드
```bash
npm run build
```

### 프로덕션 실행
```bash
npm start
```

## 📝 구현 단계

- [ ] **Step 1**: 기본 UI 레이아웃 (코끼리 캐릭터 영역 + 녹음 버튼)
- [ ] **Step 2**: Web Audio API를 활용한 음성 녹음 및 변조 기능
- [ ] **Step 3**: 클릭 이벤트 및 애니메이션 구현

## 🎯 개발 요구사항

### 필요한 리소스
- [ ] 코끼리 캐릭터 이미지 (정지 상태)
- [ ] 코끼리 캐릭터 이미지 (코 든 상태)
- [ ] "이잉~" 효과음 파일 (또는 Web Audio API Oscillator로 합성)

### 브라우저 요구사항
- 마이크 접근 권한 필요
- 최신 브라우저 (Chrome, Firefox, Safari, Edge)

---

## 📚 활동 로그

### 2026-01-29

#### ✅ 프로젝트 초기 설정 완료
- **프로젝트 구조 생성**
  - Next.js 14 (App Router) 기반 설정
  - TypeScript 설정 완료
  - Tailwind CSS 설정 완료
  
- **핵심 파일 구조 생성**
  ```
  ✅ 설정 파일: package.json, tsconfig.json, next.config.js, tailwind.config.js
  ✅ 타입 정의: src/types/audio.types.ts
  ✅ 유틸리티: src/utils/audioProcessor.ts, src/utils/animations.ts
  ✅ 커스텀 훅: src/hooks/useAudioRecorder.ts, src/hooks/useVoiceModulation.ts
  ✅ 컴포넌트: ElephantCharacter, RecordButton, AudioVisualizer
  ✅ 앱 페이지: src/app/layout.tsx, src/app/page.tsx, src/app/globals.css
  ```

#### 🎯 구현된 기능
1. **오디오 녹음 시스템** (`useAudioRecorder`)
   - 브라우저 마이크 API 통합
   - 실시간 녹음 시간 표시
   - 녹음 시작/중지/취소 기능

2. **음성 변조 시스템** (`useVoiceModulation`, `AudioProcessor`)
   - Pitch Shift: -8 semitones (묵직한 코끼리 목소리)
   - Reverb 효과: 60% (초원의 공간감)
   - Echo 효과: 200ms delay, 30% feedback
   - Web Audio API Oscillator로 "이잉~" 소리 합성

3. **인터랙티브 UI**
   - SVG 기반 코끼리 캐릭터 (직접 그려진 디자인)
   - Framer Motion 애니메이션
     - 코 들어올리기 (재생 시)
     - 움찔 반응 (간지럼 클릭 시)
     - 녹음 버튼 펄스 효과
   - 오디오 비주얼라이저

4. **UI/UX 디자인**
   - 초원 테마 그라데이션 배경 (하늘 → 대지)
   - 반응형 레이아웃
   - 구름 애니메이션 배경 효과
   - 커스텀 색상 테마 (elephant-gray, savanna-sky 등)

#### 📦 설치된 패키지
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next": "^14.2.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.3.0"
  }
}
```

#### 🎨 디자인 특징
- **코끼리 캐릭터**: SVG로 직접 제작 (귀, 몸통, 코, 엄니, 눈, 발)
- **애니메이션**: 코 들기, 움찔하기, 호버 효과
- **색상 팔레트**: 코끼리 회색(#8B8680), 사바나 스카이(#87CEEB)
- **간지럼 영역**: 전체 캐릭터 클릭 가능, 호버 시 노란색 힌트

#### 📝 다음 단계
- [ ] `npm install` 실행하여 의존성 설치
- [ ] `npm run dev`로 개발 서버 시작
- [ ] 브라우저에서 테스트 (마이크 권한 허용 필요)
- [ ] (선택) 커스텀 코끼리 이미지로 교체
- [ ] (선택) 커스텀 효과음 파일 추가

### 2026-01-29 (오후)
- ✅ **버그 수정: 빨간 녹음 버튼 안 보이는 문제 해결**
  - RecordButton 컴포넌트에 fallback 로직 추가
  - status가 undefined일 경우에도 버튼이 보이도록 개선
  - 디버깅을 위한 콘솔 로그 추가
  
- ✅ **개발 가이드 문서 추가**
  - `DEVELOPMENT.md` 생성
  - 문제 해결 가이드 추가
  - 개발 서버 실행 방법 상세 설명
  
- 📋 **원인 분석**
  - 개발 서버가 실행되지 않으면 앱이 로드되지 않음
  - `npm run dev` 명령어 필수!
  
### 2026-01-29 (저녁) - 버그 수정 완료 ✅
  
#### 🐛 버그 수정 1: opacity 0 문제
- **문제**: Framer Motion 초기 애니메이션이 요소를 투명하게 만듦
- **해결**: 주요 UI 요소에서 초기 애니메이션 제거
- **결과**: 버튼이 즉시 보이도록 개선

#### 🐛 버그 수정 2: 버튼이 사라지는 문제
- **문제**: 페이지 로드 시 빨간 버튼이 나타났다가 즉시 사라짐
- **원인**: `useEffect`에서 `setPlayingStatus(false)`가 호출되면서 status가 'ready'로 변경됨
- **해결**: 
  1. `setPlayingStatus` 함수에 상태 체크 로직 추가 (idle 상태 보호)
  2. 재생 상태 동기화 useEffect에 조건 추가
  3. 디버깅 로그 강화
- **결과**: 버튼이 안정적으로 표시됨

#### 📚 문서 추가
- `TROUBLESHOOTING.md` - 종합 문제 해결 가이드
- 콘솔 디버깅 로그 추가
- 상태 흐름도 문서화

### 2026-01-29 (밤) - 인터랙티브 기능 대폭 향상 ✨

#### 🎮 새로운 인터랙션 추가
코끼리의 각 부위를 클릭하면 다른 반응이 나타나도록 개선!

**1. 코(Trunk) 클릭 🎺**
- **애니메이션**: 좌우로 흔들리는 모션
- **소리**: 트럼펫 소리 (200Hz → 400Hz 사운드웨이브)
- **효과**: 호버 시 색상 변화

**2. 상아(Tusk) 클릭 ✨**
- **애니메이션**: 반짝이는 효과 (opacity & scale 변화)
- **소리**: 맑은 종소리 (C5, E5, G5 화음)
- **효과**: 호버 시 밝아지고 두꺼워짐

**3. 몸통(Body) 클릭 😆**
- **애니메이션**: 움찔하는 wiggle 모션
- **소리**: 기존 "이잉~" 소리 유지
- **효과**: 간지럼 반응

#### 🔊 새로운 사운드 합성 함수
- `synthesizeTrunkSound()` - 트럼펫 소리 (sawtooth wave)
- `synthesizeTuskSound()` - 종소리 (3개 주파수 혼합)
- Web Audio API Oscillator로 실시간 생성

#### 🎨 애니메이션 개선
- `trunkSwingVariants` - 코 흔들기 (-10° ↔ +10°)
- `tuskShineVariants` - 상아 반짝임 (opacity + scale)
- 독립적인 애니메이션 컨트롤 (useAnimation hooks)

#### 💡 UX 개선
- 각 부위에 호버 효과 추가
- 클릭 가능 영역 명확히 표시
- 하단에 인터랙션 힌트 추가
- 재생 중에는 인터랙션 비활성화 (충돌 방지)

### 2026-01-29 (심야) - 먹이 주기 기능 추가 🌳

#### 🌳 나무 먹이 주기 시스템
코끼리에게 나무 잎사귀를 먹이로 줄 수 있는 기능 추가!

**나무 컴포넌트 (`TreeFeeder.tsx`)**
- SVG로 제작된 나무 (줄기 + 3단계 잎)
- 클릭할 때마다 잎이 20%씩 감소
- 잎 상태 표시 (100% → 0%)
- 다 먹으면 "다시 자라기" 버튼으로 리셋
- 좌우 양쪽에 2개의 나무 배치

**코끼리 먹는 애니메이션**
- 코끼리가 나무 쪽으로 이동 (x축 이동)
- 코를 앞으로 뻗는 동작
- 입 움직임 애니메이션 (씹는 모션)
- "😋 냠냠냠..." 상태 표시

**먹는 소리 합성**
- `synthesizeEatingSound()` 함수 추가
- 5번의 짧은 씹는 소리 (100-150Hz)
- 마지막에 만족스러운 소리 (300-400Hz)
- Web Audio API로 실시간 생성

**새로운 애니메이션**
- `eatAnimationVariants` - 코끼리 이동 (좌우 20px)
- `mouthMovementVariants` - 입 움직임 (scaleY)
- 2초 동안 먹는 동작 후 원위치

**인터랙션 로직**
- 재생 중이거나 이미 먹고 있으면 비활성화
- 나무 클릭 → 코끼리 애니메이션 + 소리 재생
- 2초 후 자동으로 먹기 종료
- 나무 상태는 독립적으로 관리

### 2026-01-30 (새벽) - 불 끄기 기능 추가 🔥💦

#### 🚒 소방관 코끼리 기능
불이 나면 코끼리가 물을 뿌려서 끄는 영웅적인 기능!

**불 컴포넌트 (`FireElement.tsx`)**
- SVG로 제작된 실감나는 불 애니메이션
- 3단계 불꽃 (빨강 → 주황 → 노랑)
- 그라데이션 효과로 리얼한 불꽃
- 춤추는 불꽃 애니메이션 (path morphing)
- 불씨 파티클 효과 (반짝이는 불씨들)
- 장작 받침대
- 클릭 유도 UI ("🔥 불이야! 클릭해서 끄기!")

**물 뿌리기 컴포넌트 (`WaterSpray.tsx`)**
- 20개의 물방울 파티클
- 포물선 궤적으로 날아가는 물방울
- 큰 물줄기 효과 (3개의 물줄기)
- 바닥 물보라 효과
- 파란색 빛나는 효과

**코끼리 물 뿌리기 애니메이션**
- 코를 불 쪽으로 향함 (-30도 회전)
- 코가 위로 올라감
- 2.5초 동안 물 뿌리기 동작
- 동작 완료 후 원위치

**물 소리 합성**
- `synthesizeWaterSpraySound()` 함수 추가
- 화이트 노이즈 기반 물소리
- Bandpass 필터 (2000Hz)
- Lowpass 필터 (4000Hz)
- "쉬ㅣㅣㅣ~" 하는 물 뿌리는 소리
- 2.5초 지속

**불 끄기 시퀀스**
1. 불 클릭 → 코끼리 반응
2. 코끼리가 코를 불 쪽으로 향함
3. 물 뿌리기 애니메이션 + 소리
4. 2.5초 후 불이 꺼짐
5. 연기가 피어오름
6. 불 자리에 나무가 자라남 (새로운 나무!)

**레이아웃 변경**
- 왼쪽: 나무 (먹이용)
- 중앙: 코끼리
- 오른쪽: 불 → (꺼지면) 나무

**상태 관리**
- `isFireExtinguished` - 불 꺼짐 상태
- `isSpraying` - 물 뿌리는 중
- 다른 액션 중에는 불 끄기 비활성화

### 2026-01-30 (새벽) - 코끼리 타기 기능 추가 🏇

#### 🐘 탑승 시스템 구현
코끼리 등의 안장을 클릭하면 타고 방향키로 이동 가능!

**안장 디자인**
- SVG로 제작된 갈색 가죽 안장
- 금색 장식 3개
- 고삐 양쪽에 부착
- 호버 효과 (확대)
- 클릭 가능 표시

**탑승자 캐릭터**
- 간단한 SVG 사람 모델
- 머리, 몸통, 팔, 다리
- 안장 위에 앉은 자세
- 미세한 상하 움직임 (타는 느낌)

**키보드 컨트롤 (`useKeyboardControl.ts`)**
- 방향키: ↑↓←→
- WASD 키도 지원
- 탑승 중에만 활성화
- 브라우저 스크롤 방지

**이동 시스템**
- 한 번에 20px씩 이동
- 부드러운 spring 애니메이션
- 이동 범위 제한:
  - 좌우: -300px ~ +300px
  - 상하: -200px ~ +200px
- 화면 밖으로 나가지 않음

**탑승/하차**
- 안장 클릭 → 탑승
- 안장 다시 클릭 → 하차
- 탑승 중 다른 인터랙션 비활성화
- "🏇 탑승 중! 방향키로 이동" 표시

**UI/UX**
- 탑승 중 조작법 힌트 박스
- "↑↓←→ 또는 WASD: 이동"
- "안장 다시 클릭: 내리기"
- 보라색 테마로 탑승 모드 표시

**애니메이션**
- Framer Motion spring 애니메이션
- 부드러운 이동 (stiffness: 100, damping: 20)
- 탑승자의 미세한 바운스 효과

### 2026-01-30 (새벽) - 안장 위치 최종 조정
- 안장을 코끼리 몸통 하단으로 대폭 이동 (y: 150 → 200 → 215 → 230)
- 탑승자 위치도 함께 대폭 하향 조정 (top-16 → top-32 → top-36 → top-40)
- 이제 얼굴과 겹치지 않고 몸통 아래쪽에 명확히 위치
- 발 바로 위, 몸통 하단부에 안장 배치
- 더욱 안정적이고 자연스러운 탑승 자세

### 2026-01-30 (새벽) - 똥 치우기 기능 추가 💩

#### 💩 똥 관리 시스템
현실적인(?) 코끼리 키우기 체험! 똥을 치워야 해요!

**똥 컴포넌트 (`PoopElement.tsx`)**
- 3단계 똥 모양 (아래 → 중간 → 위 → 소용돌이)
- 갈색 그라데이션 (진갈색 → 밝은 갈색)
- 반짝이는 효과 (왜 반짝이는지는 모르겠지만...)
- 냄새 선 애니메이션 (회색 물결 3개)
- 클릭 가능한 인터랙션

**자동 똥 생성 시스템 (확률 기반)**
- 10초마다 체크
- 30% 확률로 똥 생성 (평균 33초에 1번)
- 코끼리 근처 랜덤 위치에 떨어짐
- 탑승 중에는 똥을 싸지 않음 (안전!)
- AnimatePresence로 부드러운 등장/퇴장
- 콘솔에 "💩 코끼리가 똥을 쌌어요!" 로그

**똥 치우기**
- 똥 클릭 → 휙~ 사라짐
- 회전하면서 사라지는 애니메이션
- "휙~" 소리 효과 (200Hz → 1000Hz → 100Hz)
- 치운 똥 카운터 증가

**UI 표시**
- 우측 상단: 현재 똥 개수 (💩 표시)
- 좌측 상단: 치운 똥 총 개수 (✨ 표시)
- "💩 X개 - 클릭해서 치우세요!" 안내

**소리 효과**
- `synthesizeCleanUpSound()` 함수
- 빠르게 올라가는 휙~ 소리
- 0.5초 지속
- sawtooth wave 사용

### 2026-01-30 (새벽) - 거리 기반 상호작용 시스템 추가 📏

#### 🎮 근접 상호작용 시스템
현실적인 게임플레이! 코끼리가 가까이 가야만 상호작용 가능!

**거리 계산 시스템**
- 피타고라스 정리로 거리 계산
- 코끼리 위치 vs 대상 위치
- 실시간 거리 체크

**상호작용 거리 제한**
- 똥 치우기: 200px 이내
- 나무 먹이: 250px 이내  
- 불 끄기: 250px 이내
- 거리 밖에서는 클릭 불가

**시각적 피드백**
- 거리 밖: 반투명 + 회색 필터 (opacity: 0.5, grayscale)
- 거리 안: 선명함 (opacity: 1, 컬러)
- 커서 변경: nearby → pointer, far → not-allowed
- 호버 힌트: "클릭하세요" vs "너무 멀어요!"

**콘솔 피드백**
- 거리 밖에서 클릭 시 경고 메시지
- "💩 너무 멀어요! 코끼리를 가까이 이동시키세요 (현재 거리: XXX px)"
- 실시간 거리 표시로 디버깅 용이

**게임플레이 개선**
- 탑승해서 이동 필수
- 전략적 위치 선택
- 더 몰입감 있는 경험
- 현실적인 상호작용

### 2026-01-30 (새벽) - 탑승 중 상호작용 제한 해제 🏇✨

#### 🎮 탑승 중에도 모든 상호작용 가능!
이제 코끼리를 타고 있을 때도 모든 활동을 할 수 있어요!

**수정된 기능**
- **불 끄기**: 탑승 중에도 가능! (이전에는 제한)
- **똥 생성**: 탑승 중에도 똥을 싸요! (이전에는 하차 중만)
- **똥 치우기**: 탑승 중에도 가능! (항상 가능했음)
- **나무 먹이**: 탑승 중에도 가능! (항상 가능했음)

**변경 사항**
1. `handleExtinguishFire`에서 `isRiding` 체크 제거
2. 똥 생성 `useEffect`에서 `!isRiding` 조건 제거
3. 탑승 중에도 자유롭게 상호작용 가능

**게임플레이 흐름**
```
1. 안장 클릭 → 탑승 🏇
   ↓
2. 방향키로 이동 ←↑→↓
   ↓
3. 대상 근처로 이동
   ↓
4. 탑승한 채로 클릭 가능! 🎉
   - 똥 치우기 💩
   - 나무 먹이 🌳
   - 불 끄기 🔥
   ↓
5. 이동 중에도 똥 생성!
```

**장점**
- 하차 없이 연속 작업 가능
- 더 빠른 게임플레이
- 편리한 플레이 경험
- 탑승의 장점 극대화

### 2026-01-30 (새벽) - 이동 경계 제거 🌍

#### 🗺️ 무한 이동 시스템
이제 코끼리가 화면 밖으로도 자유롭게 이동할 수 있어요!

**변경 사항**
- 이전: x축 -300~300, y축 -200~200 제한
- 수정: 모든 경계 제거! 무한 이동 가능

**코드 변경**
```typescript
// 이전: Math.max/Math.min으로 경계 제한
newY = Math.max(prev.y - moveDistance, -200);
newX = Math.min(prev.x + moveDistance, 300);

// 수정: 제한 없이 자유 이동
newY = prev.y - moveDistance;
newX = prev.x + moveDistance;
```

**게임플레이**
- 화면 밖으로 나갔다가 다시 돌아올 수 있어요
- 넓은 세계를 탐험하는 느낌
- 똥/나무/불을 찾아 자유롭게 모험
- 더 역동적인 플레이 경험

**주의사항**
- 너무 멀리 가면 화면에서 안 보일 수 있어요
- 똥/나무/불은 고정 위치에 있으니 위치 기억하기!
- 방향키로 언제든 돌아올 수 있어요

### 2026-01-30 (새벽) - 겹침 시 클릭 문제 해결 🎯

#### 🖱️ 모든 요소 클릭 가능 시스템
코끼리와 다른 요소가 겹쳐도 모두 클릭할 수 있어요!

**문제점**
- 코끼리와 나무/불/똥이 겹치면 클릭 안됨
- z-index만으로는 해결 안됨
- pointer-events가 명확히 설정되지 않음

**해결 방법**
1. **z-index 레이어 분리**
   - 똥: z-50 (최상위)
   - 나무/불: z-20 (중간)
   - 코끼리: z-10 (하단)

2. **pointer-events 명시적 설정**
   - 모든 클릭 가능 요소에 `pointer-events: auto` 추가
   - 각 컴포넌트마다 명시적 설정

3. **변경된 컴포넌트**
   - `ElephantCharacter.tsx`: 몸통, 코, 상아, 안장 모두 pointer-events auto
   - `TreeFeeder.tsx`: 나무 전체에 pointer-events auto
   - `FireElement.tsx`: 불 전체에 pointer-events auto
   - `PoopElement.tsx`: 이미 설정됨 (유지)
   - `page.tsx`: z-index 레이어 추가

**코드 변경**
```typescript
// 코끼리 (z-10)
<motion.div className="relative z-10">
  <ElephantCharacter ... />
</motion.div>

// 나무/불 (z-20)
<div className="relative mb-8 z-20">
  <TreeFeeder ... />
</div>

// 각 SVG 요소에 pointer-events
<motion.g style={{ pointerEvents: 'auto' }}>
```

**결과**
- ✅ 코끼리 몸통 클릭 → 간지럼
- ✅ 코끼리 코 클릭 → 트럼펫
- ✅ 코끼리 상아 클릭 → 반짝
- ✅ 안장 클릭 → 탑승/하차
- ✅ 나무 클릭 → 먹이
- ✅ 불 클릭 → 물 뿌리기
- ✅ 똥 클릭 → 치우기
- ✅ 겹쳐도 모두 클릭 가능!

### 2026-01-30 (새벽) - 똥 거리 계산 수정 📏💩

#### 🎯 정확한 거리 기반 상호작용
똥이 어디에 있든 코끼리와의 정확한 거리를 계산해요!

**문제점**
- 똥: 절대 좌표 (window 기준)
- 코끼리: 상대 좌표 (화면 중앙 기준)
- 두 좌표계가 달라서 거리 계산 오류
- 화면 중앙에서 먼 똥은 클릭 불가

**해결 방법**
1. **코끼리의 실제 화면 위치 계산**
   ```typescript
   const centerX = window.innerWidth / 2;
   const centerY = window.innerHeight / 2;
   const elephantScreenX = centerX + elephantPosition.x;
   const elephantScreenY = centerY + elephantPosition.y;
   ```

2. **똥 생성 위치 변경**
   - 이전: 화면 전체 랜덤
   - 수정: 코끼리 근처 랜덤 (반경 100~400px)
   - 각도와 거리를 랜덤하게 설정

3. **거리 계산 시 화면 좌표 사용**
   - PoopElement에 코끼리의 화면 좌표 전달
   - 똥과 코끼리 모두 같은 좌표계 사용
   - 정확한 거리 계산 가능

**코드 변경**
```typescript
// 똥 생성 - 코끼리 근처 원형 분포
const angle = Math.random() * Math.PI * 2;
const distance = Math.random() * 300 + 100; // 100~400px
const newPoop = {
  x: elephantScreenX + Math.cos(angle) * distance,
  y: elephantScreenY + Math.sin(angle) * distance,
};

// 렌더링 시 화면 좌표 전달
const elephantScreenPosition = {
  x: centerX + elephantPosition.x,
  y: centerY + elephantPosition.y,
};
<PoopElement elephantPosition={elephantScreenPosition} />
```

**효과**
- ✅ 똥이 항상 코끼리 근처에 생성
- ✅ 정확한 거리 계산
- ✅ 200px 이내면 항상 클릭 가능
- ✅ 화면 어디서든 작동
- ✅ 탑승 후 이동해도 거리 정확히 측정

### 2026-01-30 (새벽) - VS 배틀 모드 추가 ⚔️

#### 🦏 코끼리 vs 코뿔소 대결 시스템
새로운 배틀 스테이지로 전환하는 시스템 추가!

**새로운 컴포넌트**
1. **VSButton.tsx** - VS 모드 진입 버튼
   - 오른쪽에 고정된 원형 버튼
   - 펄스 효과 + 회전 불꽃 애니메이션
   - 빨강-주황-노랑 그라데이션
   - 호버 시 힌트 표시

2. **BattleStage.tsx** - 배틀 스테이지 화면
   - 전체 화면 오버레이
   - 빨강-주황 그라데이션 배경
   - 번개 효과 + 불꽃 파티클
   - VS 로고 애니메이션
   - 코끼리 🐘 vs 코뿔소 🦏 대치
   - 돌아가기 버튼

**화면 전환 시스템**
```typescript
// 상태 관리
const [isBattleMode, setIsBattleMode] = useState(false);

// VS 버튼 클릭
const handleVSClick = () => {
  setIsBattleMode(true);
};

// 배틀 모드일 때
if (isBattleMode) {
  return <BattleStage onBackToMain={handleBackToMain} />;
}

// 메인 모드
return <메인 화면 />;
```

**애니메이션 효과**
- 페이드 인/아웃 전환
- VS 버튼 회전 등장
- 캐릭터 좌우에서 등장
- VS 로고 스케일 + 회전
- 펄스, 번개, 불꽃 효과

**레이아웃**
```
┌─────────────────────────┐
│ ← 돌아가기              │
│                         │
│   BATTLE ARENA          │
│   코끼리 vs 코뿔소      │
│                         │
│  🐘      VS      🦏     │
│ DUMBO         RHINO     │
│                         │
│  ⚔️ 대결 준비 중... ⚔️  │
│                         │
│  🏟️ Stage 1: 초원 전장 │
└─────────────────────────┘
```

**다음 단계 준비**
- 전투 시스템 구현 대기
- HP 바 추가 예정
- 공격 액션 예정
- 승패 판정 예정

**현재 구현 완료**
✅ VS 버튼 (메인 화면)
✅ 배틀 스테이지 전환
✅ 화면 전환 애니메이션
✅ 캐릭터 배치
✅ 돌아가기 기능
✅ 실제 전투 시스템

### 2026-01-30 (새벽) - 배틀 시스템 구현 ⚔️

#### 🎮 턴제 전투 시스템
코끼리 vs 코뿔소 간단한 배틀 시스템 완성!

**전투 페이즈**
1. **Intro (인트로)** - 3초 카운트다운
2. **Battle (전투)** - 턴제 공격
3. **Result (결과)** - 승패 표시

**HP 시스템**
- 코끼리 HP: 100
- 코뿔소 HP: 100
- 실시간 HP 바 애니메이션
- 그라데이션 색상 (코끼리: 파랑-초록, 코뿔소: 빨강-주황)

**턴제 시스템**
```typescript
1. 코끼리 턴 → 공격 버튼 활성화
   ↓
2. 공격 버튼 클릭 → 10~30 랜덤 데미지
   ↓
3. 코뿔소 HP 감소 → 1초 대기
   ↓
4. 코뿔소 자동 반격 → 10~30 랜덤 데미지
   ↓
5. 코끼리 HP 감소 → 1초 대기
   ↓
6. 다시 코끼리 턴 (반복)
```

**공격 애니메이션**
- 공격 시 캐릭터 앞으로 이동 + 확대
- 데미지 메시지 표시
- HP 바 부드럽게 감소

**승패 판정**
- HP 0 이하 → 패배
- 상대 HP 0 → 승리
- 결과 화면 자동 전환

**결과 화면**
- 승리: 🐘 코끼리 승리! 🎉
- 패배: 🦏 코뿔소 승리! 💀
- 버튼: 다시 도전 / 메인으로

**메시지 시스템**
```
"코끼리의 차례!"
"코끼리의 공격! 🐘 → 🦏 (15 데미지!)"
"코뿔소의 차례!"
"코뿔소의 반격! 🦏 → 🐘 (22 데미지!)"
```

**UI 구성**
```
┌─────────────────────────┐
│ HP BAR 🐘 | HP BAR 🦏  │
├─────────────────────────┤
│    🐘  ⚔️  🦏          │
├─────────────────────────┤
│  "코끼리의 차례!"       │
├─────────────────────────┤
│   [⚡ 공격하기!]         │
└─────────────────────────┘
```

**코드 구조**
```typescript
// 상태 관리
const [phase, setPhase] = useState<'intro' | 'battle' | 'result'>('intro');
const [elephantHP, setElephantHP] = useState(100);
const [rhinoHP, setRhinoHP] = useState(100);
const [turn, setTurn] = useState<'elephant' | 'rhino'>('elephant');
const [winner, setWinner] = useState<'elephant' | 'rhino' | null>(null);

// 공격 로직
const handleAttack = () => {
  const damage = Math.floor(Math.random() * 20) + 10; // 10~30
  setRhinoHP(prev => Math.max(0, prev - damage));
  // ... 턴 전환 및 자동 반격
};
```

**게임 플로우**
```
메인 화면
  ↓ [VS 버튼 클릭]
인트로 (3초)
  ↓ [자동]
전투 시작
  ↓ [턴제 반복]
승패 판정
  ↓ [버튼 선택]
다시 도전 or 메인으로
```

---

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👨‍💻 제작자

- 박승완 (Wani Park)
>>>>>>> elephant
