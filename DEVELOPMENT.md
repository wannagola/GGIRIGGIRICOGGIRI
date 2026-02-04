# 🔧 개발 가이드

## 🚀 개발 서버 실행하기

### 1. 의존성 설치 (최초 1회만)
```bash
cd "/Users/wanipark1004/Desktop/끼리끼리코끼리"
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```

서버가 시작되면 다음과 같은 메시지가 나타납니다:
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

### 3. 브라우저에서 열기
- 브라우저에서 http://localhost:3000 접속
- 마이크 권한 요청이 나오면 **"허용"** 클릭

## 🐛 문제 해결

### 빨간 버튼이 안 보여요!
1. **개발 서버가 실행 중인지 확인**
   - 터미널에서 `npm run dev` 실행했는지 확인
   - 브라우저에서 http://localhost:3000 접속 확인

2. **브라우저 콘솔 확인**
   - 브라우저에서 F12 또는 Cmd+Option+I (Mac)
   - Console 탭에서 에러 메시지 확인
   - "Current status: idle" 메시지가 보여야 정상

3. **캐시 삭제**
   - 브라우저에서 Cmd+Shift+R (Mac) 또는 Ctrl+Shift+R (Windows)
   - 강력 새로고침으로 캐시 삭제

4. **포트 충돌 확인**
   - 다른 프로그램이 3000 포트를 사용 중일 수 있음
   - 터미널에서 다른 포트로 실행: `npm run dev -- -p 3001`

### JavaScript 에러가 나요!
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 마이크가 작동하지 않아요!
1. **브라우저 마이크 권한 확인**
   - Chrome: 설정 > 개인정보 및 보안 > 사이트 설정 > 마이크
   - Safari: 환경설정 > 웹사이트 > 마이크

2. **HTTPS 필요 (로컬은 괜찮음)**
   - 로컬 개발(localhost)은 HTTP로 가능
   - 배포 시에는 HTTPS 필요

3. **시스템 마이크 권한**
   - Mac: 시스템 환경설정 > 보안 및 개인 정보 보호 > 마이크
   - 브라우저에 마이크 접근 권한이 있는지 확인

## 📝 유용한 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 타입 검사
npx tsc --noEmit
```

## 🎯 개발 체크리스트

- [ ] npm install 완료
- [ ] npm run dev 실행
- [ ] 브라우저에서 http://localhost:3000 접속
- [ ] 마이크 권한 허용
- [ ] 빨간 녹음 버튼 확인
- [ ] 콘솔에 에러 없음

## 📞 문제가 계속되면?

1. 터미널 출력 전체를 복사해서 보여주세요
2. 브라우저 콘솔(F12)의 에러 메시지를 보여주세요
3. 브라우저 종류와 버전을 알려주세요
