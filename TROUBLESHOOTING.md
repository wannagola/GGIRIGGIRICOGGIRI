# 🔧 문제 해결 가이드

## 버튼이 보이지 않거나 사라지는 문제

### 증상 1: 빨간 버튼이 아예 안 보임
**원인**: 개발 서버가 실행되지 않음

**해결**:
```bash
cd "/Users/wanipark1004/Desktop/끼리끼리코끼리"
npm run dev
```

그 후 브라우저에서 http://localhost:3000 접속

---

### 증상 2: 버튼이 나타났다가 바로 사라짐
**원인**: 상태 동기화 버그 (useEffect에서 status를 잘못 변경)

**해결**: 이미 수정 완료! (2026-01-29 저녁)

**수정 내용**:
1. `setPlayingStatus` 함수가 idle 상태를 변경하지 않도록 수정
2. 재생 상태 동기화 useEffect에 조건 추가
3. status가 'ready' 또는 'playing'일 때만 동기화

---

### 증상 3: 투명하게 보임 (희미함)
**원인**: Framer Motion 초기 opacity: 0 애니메이션

**해결**: 이미 수정 완료!
- 주요 UI 요소의 초기 애니메이션 제거
- 즉시 보이도록 변경

---

## 디버깅 방법

### 브라우저 콘솔 확인
1. 브라우저에서 F12 (Mac: Cmd+Option+I)
2. Console 탭 클릭
3. 다음 로그 확인:

```
🔍 Page status: idle
🔍 audioBlob: null
🔍 isProcessing: false
🔍 isPlaying: false
🔍 modulatedBuffer: null
RecordButton status: idle
```

**정상 상태**: status가 'idle'이어야 함

**문제**: status가 다른 값이면 버그

---

### 상태 흐름

```
초기 → idle (빨간 버튼 보임)
  ↓
클릭 → recording (녹음 중)
  ↓
중지 → processing (변조 중)
  ↓
완료 → ready (초록 재생 버튼 보임)
  ↓
재생 → playing (재생 중)
  ↓
종료 → ready
```

---

## 버튼이 여전히 안 보이면?

### 1. 완전 초기화
```bash
cd "/Users/wanipark1004/Desktop/끼리끼리코끼리"
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### 2. 브라우저 캐시 삭제
- Mac: Cmd+Shift+R
- Windows: Ctrl+Shift+R

### 3. 다른 브라우저 시도
- Chrome
- Firefox
- Safari
- Edge

---

## 마이크 권한 문제

### 증상: "NotAllowedError" 또는 권한 거부

**해결**:

**Chrome**:
1. 주소창 왼쪽 자물쇠 🔒 클릭
2. 마이크 → 허용
3. 페이지 새로고침

**Safari**:
1. Safari > 환경설정 > 웹사이트 > 마이크
2. localhost → 허용

**Mac 시스템**:
1. 시스템 환경설정 > 보안 및 개인정보 보호
2. 개인 정보 보호 > 마이크
3. 브라우저에 체크

---

## 포트 충돌

### 증상: "Port 3000 is already in use"

**해결 1**: 다른 포트 사용
```bash
npm run dev -- -p 3001
```
그 후 http://localhost:3001 접속

**해결 2**: 3000 포트 사용 중인 프로세스 종료
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

---

## 녹음이 안 됨

### 체크리스트:
- [ ] 마이크가 컴퓨터에 연결되어 있나요?
- [ ] 브라우저 마이크 권한이 허용되었나요?
- [ ] 시스템 마이크 권한이 허용되었나요?
- [ ] HTTPS 또는 localhost인가요? (HTTP는 안 됨)
- [ ] 브라우저가 최신 버전인가요?

---

## 음성 변조가 안 됨

### 증상: 녹음은 되는데 변조가 안 됨

**확인**:
1. 콘솔에서 에러 메시지 확인
2. `isProcessing` 상태가 true로 변하는지 확인
3. Web Audio API 지원 브라우저인지 확인

**해결**:
- 브라우저 재시작
- 다른 브라우저 시도
- 녹음 시간을 1-2초 이상으로 (너무 짧으면 문제 발생 가능)

---

## 성능 문제

### 증상: 앱이 느리거나 버벅임

**해결**:
1. 다른 탭/앱 종료
2. 브라우저 재시작
3. 녹음 시간을 10초 이하로 제한
4. 브라우저 확장 프로그램 비활성화

---

## 여전히 문제가 있나요?

다음 정보를 수집해서 알려주세요:

1. **브라우저 콘솔 로그** (F12 → Console 탭)
2. **터미널 출력** (npm run dev 실행한 터미널)
3. **브라우저 종류와 버전**
4. **운영체제** (Mac, Windows, Linux)
5. **정확한 증상** (언제, 무엇을, 어떻게)

이 정보가 있으면 더 정확하게 도와드릴 수 있습니다!
