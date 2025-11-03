# 🔐 스마트 비밀번호 생성기

안전하고 강력한 비밀번호를 생성하는 웹 애플리케이션입니다.  
한국어 단어를 영문 자판으로 변환하여, 기억하기 쉽고 실용적인 비밀번호를 만들 수 있습니다.

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-6366f1.svg)](https://github.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/)
[![CSS3](https://img.shields.io/badge/CSS3-Variables-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![No Dependencies](https://img.shields.io/badge/Dependencies-None-green.svg)](https://github.com)

--

## 📁 프로젝트 구조
```
password-generator/
├── index.html
├── css/
│   ├── base.css          # 기본 스타일, CSS 변수, 테마
│   ├── layout.css        # 레이아웃, 헤더, 탭
│   ├── components.css    # 컴포넌트 스타일
│   └── themes.css        # 애니메이션, 유틸리티
├── js/
│   ├── config.js         # 설정 및 상수
│   ├── generator.js      # 비밀번호 생성 로직
│   ├── strength.js       # 강도 계산, 엔트로피
│   ├── ui.js             # UI 업데이트
│   └── app.js            # 메인 애플리케이션
├── utils/
│   └── helpers.js        # 유틸리티 함수
└── README.md
```

---

## ✨ 주요 기능

### 🎲 비밀번호 생성기

#### 일반 비밀번호
- ✅ **길이 조절**: 8~32자 자유롭게 설정
- ✅ **문자 종류 선택**: 대문자, 소문자, 숫자, 특수문자
- ✅ **실시간 강도 표시**: 4단계 시각화 (약함/보통/강함/매우 강함)
- ✅ **엔트로피 표시**: 비밀번호의 무작위성을 bits로 표시

#### 패스프레이즈 (특별 기능 🔥)
- ✅ **영어 단어**: 50개 이상의 영단어 조합
- ✅ **한국어 → 영문 변환**: 한글 단어를 영문 자판으로 자동 변환
  - 예: `사과` → `tkrhk`, `바나나` → `qksksk`
- ✅ **힌트 표시**: 원본 한글 단어를 힌트로 제공
- ✅ **커스텀 단어**: 원하는 단어를 직접 입력 (한글/영어 모두 가능)
- ✅ **다양한 옵션**: 단어 수, 구분자, 첫 글자 대문자, 숫자 추가

### 🔍 비밀번호 검증기

- ✅ **강도 분석**: 기존 비밀번호의 보안 강도 측정
- ✅ **문제점 식별**: 구체적인 취약점 지적
- ✅ **개선 제안**: 실행 가능한 보안 강화 방법 제시
- ✅ **엔트로피 계산**: 정확한 무작위성 측정 (bits)
- ✅ **해킹 예상 시간**: 현실적인 공격 시뮬레이션
- ✅ **상세 통계**: 길이, 문자 종류, 패턴 분석

### 💾 스마트 저장

- ✅ **설정 저장**: 마지막 사용한 옵션 자동 저장
- ✅ **히스토리**: 최근 생성한 20개 비밀번호 보관
- ✅ **커스텀 단어 저장**: 자주 사용하는 단어 목록 보관
- ✅ **테마 기억**: 라이트/다크 모드 선택 저장

### 🎨 사용자 경험

- ✅ **다크 모드**: 눈의 피로를 줄이는 어두운 테마
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원
- ✅ **원클릭 복사**: 클립보드 즉시 복사
- ✅ **키보드 단축키**: Enter로 빠른 생성
- ✅ **부드러운 애니메이션**: 자연스러운 전환 효과

---

## 🎯 사용 예시

### 1. 일반 비밀번호 생성

**설정:**
```
타입: 일반 비밀번호
길이: 16자
옵션: 대문자 ✓ 소문자 ✓ 숫자 ✓ 특수문자 ✓
```

**결과:**
```
비밀번호: aB3$xY9@pQ2#mK5!
강도: 매우 강함
엔트로피: 105.5 bits
```

---

### 2. 한국어 패스프레이즈 (추천!) 🔥

**설정:**
```
타입: 패스프레이즈
언어: 한국어
단어 수: 4
구분자: -
숫자 추가: ✓
```

**결과:**
```
비밀번호: tkrhk-qksksk-cpfl-dyd-7392
💡 힌트: 사과-바나나-체리-용-(숫자)
강도: 강함
엔트로피: 84.5 bits
```

**사용법:**
- 한글로 기억: "사과, 바나나, 체리, 용, 숫자"
- 입력 시: 한영 전환 없이 그대로 타이핑
- `tkrhk-qksksk-cpfl-dyd-7392` 완성!

---

### 3. 커스텀 단어 패스프레이즈

**설정:**
```
타입: 패스프레이즈
언어: 커스텀
커스텀 단어: 햄버거, 피자, 치킨, 떡볶이, 김밥
단어 수: 4
```

**결과:**
```
비밀번호: goaquqj-vlwk-clfzs-eojqhzl
💡 힌트: 햄버거-피자-치킨-떡볶이
```

---

### 4. 비밀번호 검증

**입력:**
```
password123
```

**분석 결과:**
```
강도: 보통 (50%)
엔트로피: 52.4 bits

⚠️ 발견된 문제점:
❌ 대문자가 포함되어 있지 않습니다
❌ 특수문자가 포함되어 있지 않습니다
❌ 흔한 단어 "password"가 포함되어 있습니다

💡 개선 제안:
✅ 대문자(A-Z)를 1개 이상 포함하세요
✅ 특수문자(!@#$%^&* 등)를 1개 이상 포함하세요
✅ 예측 가능한 단어를 피하세요

예상 해킹 시간: 며칠
```

---

## 🔐 엔트로피(Entropy)란?

**엔트로피**는 비밀번호의 무작위성과 예측 불가능성을 측정하는 산업 표준 지표입니다.

### 엔트로피 수준별 안전도

| 엔트로피 | 수준 | 해킹 예상 시간 | 사용 권장 |
|---------|------|---------------|----------|
| < 28 bits | 매우 약함 ⚠️ | 몇 초 | ❌ 절대 사용 금지 |
| 28-35 bits | 약함 ⚠️ | 몇 분~몇 시간 | ❌ 사용 금지 |
| 36-59 bits | 보통 ⚡ | 며칠~몇 달 | △ 임시용만 |
| 60-127 bits | 강함 ✅ | 수년~수백년 | ✅ 안전 |
| ≥ 128 bits | 매우 강함 🛡️ | 사실상 불가능 | ✅ 최상급 |

### 계산 방법
```javascript
엔트로피 = log₂(가능한 조합 수)
       = log₂(문자 종류^비밀번호 길이)

예시:
"aB3$xY9@" (8자, 4종류 문자 = 94가지)
엔트로피 = 8 × log₂(94) ≈ 52.4 bits

"tkrhk-qksksk-cpfl" (18자, 소문자 = 26가지)
엔트로피 = 18 × log₂(26) ≈ 84.5 bits
```

### 산업 표준

- 🏦 **금융권**: 최소 100 bits 권장
- 🏛️ **정부/군사**: 128 bits 이상
- 🌐 **NIST 가이드라인**: 80 bits 이상

---

## 🚀 실행 방법

### ⚠️ 중요: ES6 모듈 사용

이 프로젝트는 ES6 모듈(`import`/`export`)을 사용합니다.  
**반드시 로컬 서버를 통해 실행**해야 합니다.

파일을 직접 브라우저로 열면(`file://`) CORS 에러가 발생합니다! ❌

---

### 방법 1: Live Server (가장 추천!) ⭐⭐⭐⭐⭐

**설치:**
1. VSCode 실행
2. Extensions (`Ctrl+Shift+X`)
3. **"Live Server"** 검색 (제작자: Ritwick Dey)
4. **Install** 클릭

**실행:**
1. `index.html` 우클릭
2. **"Open with Live Server"**
3. 자동으로 `http://127.0.0.1:5500` 오픈 ✅

**장점:**
- ⚡ 원클릭 실행
- 🔄 파일 수정 시 자동 새로고침
- 🚀 모든 웹 프로젝트에 사용 가능

---

### 방법 2: Python 서버
```bash
cd password-generator

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

브라우저: `http://localhost:8000`

---

### 방법 3: Node.js http-server
```bash
# 설치 (최초 1회)
npm install -g http-server

# 실행
cd password-generator
http-server -p 8080
```

브라우저: `http://localhost:8080`

---

## 🔧 기술 스택

### 프론트엔드
- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - CSS Variables (테마 시스템)
  - Flexbox & Grid (레이아웃)
  - Animations (부드러운 전환)
- **JavaScript ES6+**:
  - Modules (import/export)
  - Arrow Functions
  - Async/Await
  - Template Literals

### 알고리즘
- **한글 처리**: 유니코드 분해 및 자모 매핑
- **엔트로피 계산**: Shannon Entropy 알고리즘
- **강도 분석**: NIST 가이드라인 기반
- **암호학**: 안전한 난수 생성 (Crypto API)

### 저장소
- **Local Storage**: 설정 및 히스토리 영구 저장
- **Session**: 임시 상태 관리

---

## 📖 코드 아키텍처

### 모듈 분리 전략
```
┌─────────────┐
│   app.js    │  ← 이벤트 바인딩, 초기화
└──────┬──────┘
       │
   ┌───┴────┬──────────┬──────────┐
   │        │          │          │
┌──▼───┐ ┌─▼──┐  ┌────▼────┐ ┌──▼────┐
│ ui.js│ │gen │  │strength │ │config │
└──────┘ └────┘  └─────────┘ └───────┘
    │
┌───▼────┐
│helpers │
└────────┘
```

| 모듈 | 책임 | LOC |
|------|------|-----|
| `config.js` | 상수, 설정, 단어 리스트 | ~200 |
| `helpers.js` | 유틸리티, 한글 변환 | ~150 |
| `generator.js` | 비밀번호/패스프레이즈 생성 | ~150 |
| `strength.js` | 강도 분석, 엔트로피 계산 | ~300 |
| `ui.js` | DOM 조작, 상태 관리 | ~200 |
| `app.js` | 앱 제어, 이벤트 | ~250 |

**총 코드 라인**: ~1,250 lines

### 설계 원칙

✅ **단일 책임**: 각 모듈은 하나의 역할만 수행  
✅ **의존성 주입**: 함수는 필요한 데이터만 받음  
✅ **순수 함수**: 부작용 최소화  
✅ **DRY**: 코드 중복 제거  
✅ **확장 가능**: 새 기능 추가 용이

---

## 🎨 한글→영문 변환 알고리즘

### 원리
```
1. 한글 음절 분해
   '사' (U+C0AC) → 초성(ㅅ) + 중성(ㅏ) + 종성(없음)

2. 각 자모를 영문 키에 매핑
   ㅅ → 't'
   ㅏ → 'k'

3. 결합
   '사' → 'tk'

4. 전체 단어 처리
   '사과' → 'tk' + 'rhk' = 'tkrhk'
```

### 변환 예시

| 한글 | 분해 | 영문 자판 | 설명 |
|------|------|----------|------|
| 사과 | ㅅㅏ + ㄱㅗㅏ | tk + rhk | 기본 음절 |
| 호랑이 | ㅎㅗ + ㄹㅏㅇ + ㅇㅣ | gh + fkd + dl | 받침 처리 |
| 김치 | ㄱㅣㅁ + ㅊㅣ | rla + ci | 이중 받침 |

### 코드
```javascript
// 한글 유니코드 분해
const code = char.charCodeAt(0);
const base = code - 0xAC00;
const cho = Math.floor(base / 588);      // 초성 (19개)
const jung = Math.floor((base % 588) / 28);  // 중성 (21개)
const jong = base % 28;                  // 종성 (28개)

// 자모를 영문 자판으로 매핑
const result = CHO_MAP[cho] + JUNG_MAP[jung] + JONG_MAP[jong];
```

---

## 📝 확장 완료 체크리스트

### ✅ 완료된 기능

- [x] 일반 비밀번호 생성
- [x] 영어 패스프레이즈
- [x] 한국어 패스프레이즈
- [x] 한글→영문 자판 변환
- [x] 힌트 표시
- [x] 커스텀 단어 입력
- [x] 로컬 스토리지 저장
- [x] 비밀번호 검증기
- [x] 상세 강도 분석
- [x] 문제점 식별
- [x] 개선 제안
- [x] 다크 모드
- [x] 엔트로피 계산
- [x] 히스토리 관리 (20개)
- [x] 반응형 디자인

### 🔜 향후 개선 아이디어

#### 고급 기능
- [ ] 비밀번호 유출 체크 (Have I Been Pwned API)
- [ ] 비밀번호 만료 알림
- [ ] 2단계 인증 코드 생성
- [ ] 패스키(Passkey) 생성
- [ ] QR 코드 생성

#### 개인화
- [ ] 파일 업로드로 단어 리스트 가져오기
- [ ] 비밀번호 템플릿 저장
- [ ] 즐겨찾기 설정
- [ ] 커스텀 색상 테마

#### 다국어
- [ ] 일본어 히라가나/가타카나
- [ ] 중국어 병음
- [ ] UI 다국어 지원

#### 분석 & 통계
- [ ] 생성 통계 (월간/연간)
- [ ] 패턴 분석
- [ ] 취약점 트렌드

#### PWA
- [ ] 오프라인 지원
- [ ] 설치 가능
- [ ] 푸시 알림

---

## 🐛 문제 해결 (FAQ)

### Q: CORS 에러가 발생해요!

**A:** `file://` 프로토콜로 직접 열면 안 됩니다.  
**해결:** Live Server나 로컬 서버를 사용하세요.

### Q: 생성 버튼을 눌러도 아무 일도 안 일어나요

**A:** 브라우저 콘솔(F12)을 열어 에러를 확인하세요.  
**확인 사항:**
- JavaScript 파일 경로가 올바른지
- 로컬 서버로 실행했는지
- 브라우저가 최신 버전인지 (ES6 지원)

### Q: 복사 버튼이 작동하지 않아요

**A:** 클립보드 API는 HTTPS 또는 localhost에서만 작동합니다.  
Live Server는 localhost를 사용하므로 문제없습니다.

### Q: 한국어 패스프레이즈에서 힌트가 안 나와요

**A:** 언어를 '한국어'로 선택했는지 확인하세요.  
영어 모드에서는 힌트가 표시되지 않습니다.

### Q: 다크 모드가 적용되지 않아요

**A:** 페이지를 강제 새로고침하세요 (Ctrl+F5).  
브라우저 캐시 때문에 CSS가 업데이트되지 않았을 수 있습니다.

### Q: 모바일에서 레이아웃이 깨져요

**A:** 최신 버전으로 업데이트되었다면 정상 작동합니다.  
화면 너비 320px~768px에 최적화되어 있습니다.

### Q: 엔트로피 값이 이상해요

**A:** 엔트로피는 이론적 최댓값입니다.  
실제 보안은 사용자의 비밀번호 관리 습관에 따라 다릅니다.

### Q: 히스토리가 너무 많이 쌓여요

**A:** 🗑️ 버튼을 클릭하면 전체 삭제할 수 있습니다.  
최대 20개까지만 자동 저장됩니다.

---

## 💡 사용 팁

### 강력한 비밀번호 만들기

1. **길이**: 최소 12자 이상 (16자 권장)
2. **다양성**: 4가지 문자 종류 모두 포함
3. **무작위성**: 예측 가능한 패턴 피하기
4. **엔트로피**: 60 bits 이상 목표

### 한국어 패스프레이즈 활용

✅ **좋은 예:**
```
- 스토리가 있는 단어 조합
- "햄버거-피자-치킨-콜라"
- "사과-바나나-체리-포도"
```

❌ **나쁜 예:**
```
- 완전 랜덤 단어
- "테이블-하늘-자동차-의자"
```

### 다크 모드 활용

- 🌙 **저녁/밤**: 눈의 피로 감소
- ☀️ **낮**: 햇빛 아래서 가독성 향상
- 💡 **자동 전환**: 시스템 설정 감지

### 검증기 활용

- 현재 사용 중인 비밀번호 점검
- 정기적 보안 감사 (3~6개월마다)
- 중요 계정 우선 점검

---

## 🙏 기여하기

이슈 제보나 개선 제안은 언제나 환영합니다!

### 기여 방법

1. Fork the repository
2. Create your feature branch
```bash
   git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
   git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
   git push origin feature/AmazingFeature
```
5. Open a Pull Request

### 개선 제안 예시

- 새로운 언어 지원 (일본어, 중국어 등)
- UI/UX 개선
- 버그 수정
- 성능 최적화
- 문서 개선
- 테스트 코드 추가

---

## 📄 라이선스

이 프로젝트는 개인 학습 목적의 토이 프로젝트입니다.

---

## 👨‍💻 개발 환경

- **OS**: Windows 10
- **IDE**: Visual Studio Code
- **Extensions**: Live Server
- **Browser**: Chrome/Edge/Firefox (최신 버전)

---

## 📚 참고 자료

### 웹 표준
- [MDN - ES6 Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [MDN - CSS Variables](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN - Clipboard API](https://developer.mozilla.org/ko/docs/Web/API/Clipboard_API)
- [MDN - Local Storage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

### 보안 가이드라인
- [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) - Digital Identity Guidelines
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Have I Been Pwned](https://haveibeenpwned.com/) - Password Breach Database

### 암호학
- [Shannon Entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)) - Information Theory
- [Password Strength](https://en.wikipedia.org/wiki/Password_strength) - Wikipedia

### 한글 처리
- [Unicode Hangul Syllables](https://www.unicode.org/charts/PDF/UAC00.pdf)
- [한글 자모 분해 알고리즘](https://gist.github.com/jongmin92/7a9f4a83b3d9c6dbea40b1cea54e1ae3)

---

## 🎓 학습 내용

이 프로젝트를 통해 학습한 내용:

### 프론트엔드
- ✅ ES6 모듈 시스템
- ✅ CSS 변수 활용
- ✅ 반응형 디자인
- ✅ 다크 모드 구현
- ✅ Local Storage 활용

### 알고리즘
- ✅ 유니코드 처리
- ✅ 엔트로피 계산
- ✅ 비밀번호 강도 분석
- ✅ 패턴 매칭

### 보안
- ✅ NIST 가이드라인
- ✅ 암호학 기초
- ✅ 공격 시뮬레이션

### 소프트웨어 공학
- ✅ 모듈 설계
- ✅ 코드 구조화
- ✅ 테스트 전략
- ✅ 문서화

---

## 📸 스크린샷

### 라이트 모드
```
[생성기 탭 - 일반 비밀번호]
[생성기 탭 - 한국어 패스프레이즈 + 힌트]
[검증기 탭 - 분석 결과 + 엔트로피]
```

### 다크 모드
```
[생성기 탭 - 다크 테마]
[검증기 탭 - 다크 테마]
```

> 💡 **팁**: 스크린샷을 찍으려면 `Win + Shift + S` (Windows) 또는 `Cmd + Shift + 4` (Mac)

---

## 🎉 마무리

**스마트 비밀번호 생성기**는 단순한 토이 프로젝트를 넘어, 실제로 사용 가능하고 교육적 가치가 있는 웹 애플리케이션입니다.

### 핵심 가치

1. **보안**: 산업 표준 알고리즘
2. **실용성**: 실제 사용 가능
3. **교육**: 비밀번호 보안 학습
4. **혁신**: 한국어 특화 기능

### 프로젝트를 통해

- ✅ 웹 개발 전반에 대한 이해도 향상
- ✅ 모듈 설계 및 구조화 경험
- ✅ 보안 및 암호학 기초 학습
- ✅ 사용자 중심 UX 설계 경험

---

**Made with 💙 for learning web development**

**특별 기능**: 한국어를 사랑하는 개발자를 위한 실용적인 비밀번호 생성기

---

### 🔗 관련 링크

- [프로젝트 저장소](https://github.com/Dev-2A) (GitHub)
- [라이브 데모](https://github.com/Dev-2A/password-generator) (GitHub Pages)
- [이슈 제보](https://github.com/Dev-2A/password-generator/issues) (GitHub Issues)

---

**버전**: 1.0.0  
**최종 업데이트**: 2025년 11월 3일