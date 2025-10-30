# 🔐 스마트 비밀번호 생성기

안전하고 강력한 비밀번호를 생성하는 웹 애플리케이션입니다.  
한국어 단어를 영문 자판으로 변환하여, 기억하기 슆고 실용적인 비밀번호를 만들 수 있습니다.

## 📁 프로젝트 구조
```
password-generator/
├── index.html
├── css/
│   ├── base.css          # 기본 스타일, CSS 변수
│   ├── layout.css        # 레이아웃
│   ├── components.css    # 컴포넌트 스타일
│   └── themes.css        # 테마 및 애니메이션
├── js/
│   ├── config.js         # 설정 및 상수
│   ├── generator.js      # 비밀번호 생성 로직
│   ├── strength.js       # 강도 계산 로직
│   ├── ui.js             # UI 업데이트
│   └── app.js            # 메인 애플리케이션
├── utils/
│   └── helpers.js        # 유틸리티 함수
└── README.md
```

## ✨ 주요 기능

### 기본 기능
- ✅ **일반 비밀번호 생성**: 길이와 문자 종류를 커스터마이징 (대문자, 소문자, 숫자, 특수문자)
- ✅ **패스프레이즈 생성**: 기억하기 쉬운 단어 조합 (영어/한국어)
- ✅ **실시간 비밀번호 강도 시각화**: 약함/보통/강함/매우 강함 4단계
- ✅ **클립보드 복사 기능**: 원클릭 복사
- ✅ **생성 기록 저장**: 최근 5개 비밀번호 자동 저장
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 지원

### `NEW` 한국어 패스프레이즈
- ✅ **한글→영문 자판 변환**: 한국어 단어를 영문 자판으로 자동 변환
   - 예: `사과` → `tkrhk`, `바나나` → `qksksk`
- ✅ **힌트 표시**: 원본 한글 단어를 힌트로 제공
   - 비밀번호: `tkrhk-qksksk-cpfl-dyd`
   - 💡 힌트: `사과-바나나-체리-용`
- ✅ **실용적 사용**: 대부분의 시스템에서 영문 비밀번호 요구사항 충족

## 🎯 사용 예시

### 1. 일반 비밀번호
**설정:**
- 타입: 일반 비밀번호
- 길이: 16
- 대문자, 소문자, 숫자, 특수문자 모두 포함

**결과:**
```
aB3$xY9@pQ2#mK5!
강도: 매우 강함
```

### 2. 영어 패스프레이즈
**설정:**
- 타입: 패스프레이즈
- 언어: 영어
- 단어 수: 4
- 구분자: -
- 첫 글자 대문자 ✓
- 숫자 추가 ✓

**결과:**
```
Apple-Dragon-Sunset-Thunder-7392
강도: 강함
```

### 3. 한국어 패스프레이즈 (영문 자판 변환) 🔥
**설정:**
- 타입: 패스프레이즈
- 언어: 한국어
- 단어 수: 4
- 구분자: -
- 숫자 추가 ✓

**결과:**
```
비밀번호: tkrhk-qksksk-cpfl-dyd-5281
💡 힌트: 사과-바나나-체리-용-(숫자)
```

**실제 사용:**
- 로그인 시 한글로 기억: "사과, 바나나, 체리, 용"
- 입력은 영문 자판: `tkrhk-qksksk-cpfl-dyd-5281`
- 한영 전환 없이 그대로 입력하면 됨!

### 4. 한글→영문 자판 변환 예시

| 한글 단어 | 영문 변환 | 설명 |
|----------|-----------|------|
| 사과 | tkrhk | ㅅ(t) + ㅏ(k) + ㄱ(r) + ㅗ(h) + ㅏ(k) |
| 호랑이 | ghfkddl | ㅎ(g) + ㅗ(h) + ㄹ(f) + ㅏ(k) + ㅇ(d) + ㅇ(d) + ㅣ(l) |
| 마법사 | akqjqtk | 각 자모를 영문 자판으로 매핑 |
| 우주 | dnwn | ㅇ(d) + ㅜ(n) + ㅈ(w) + ㅜ(n) |

## 🚀 실행 방법

### ⚠ 중요: ES6 모듈 사용으로 인한 제약

이 프로젝트는 ES6 모듈(`import`/`export`)을 사용하기 때문에,  
**반드시 로컬 서버를 통해 실행해야 합니다.**

파일을 직접 브라우저로 열면(`file://` 프로토콜) CORS 에러가 발생합니다! ❌

---

### 방법 1: Live Server (가장 추천!) ⭐

**설치:**
1. VSCode에서 `Ctrl+shift+X` (Extensions)
2. **"Live Server"** 검색 (제작자: Ritwick Dey)
3. **Install** 버튼 클릭

**실행:**
1. `index.html` 파일 우클릭
2. **"Open with Live Server"** 선택
3. 자동으로 `http://127.09.0.1:5500`에서 열림 ✅

**장점:**
- 클릭 한 번으로 실행
- 파일 수정 시 자동 새로고침
- 다른 웹 프로젝트에서도 계속 사용 가능

---

### 방법 2: Python 내장 서버

Python이 설치되어 있다면:
```bash
# 프로젝트 폴더에서 실행
cd password-generator

# Python 3
python -m http.server 8000

# 또는 Python 2
python -m SimpleHTTPServer 8000
```

브라우저에서 `http://localhost:8000` 접속

---

### 방법 3: Node.js http-server

Node.js가 설치되어 있다면:
```bash
# http-server 전역 설치 (최초 1회)
npm install -g http-server

# 프로젝트 폴더에서 실행
cd password-generator
http-server

# 또는 포트 지정
http-server -p 8080
```

브라우저에서 `http://localhost:8080` 접속

---

## 🔧 기술 스택

- **HTML5**: 시멘틱 마크업
- **CSS3**: CSS Variables, Flexbox, 애니메이션
- **JavaScript ES6+**: Modules, Arrow Functions, Async/Await
- **한글 처리**: 유니코드 분해 및 자모 매핑 알고리즘

## 📖 코드 구조 설명

### JavaScript 모듈 분리 전략

| 파일 | 역할 | 책임 |
|------|------|------|
| `config.js` | 설정 관리 | 상수, 기본값, 선택자 정의 |
| `helpers.js` | 유틸리티 | 재사용 가능한 순수 함수 |
| `generator.js` | 생성 로직 | 비밀번호/패스프레이즈 생성 |
| `strength.js` | 강도 계산 | 비밀번호 보안 강도 분석 |
| `ui.js` | UI 업데이트 | DOM 조작 및 상태 관리 |
| `app.js` | 앱 제어 | 이벤트 바인딩 및 초기화 |

### CSS 모듈 분리 전략

| 파일 | 역할 |
|------|------|
| `base.css` | CSS 변수, 리셋, 기본 스타일 |
| `layout.css` | 전체 레이아웃, 그리드 시스템 |
| `components.css` | 버튼, 입력, 카드 등 재사용 컴포넌트 |
| `themes.css` | 색상 테마, 애니메이션, 유틸리티 클래스 |

### 왜 이렇게 분리했나요?

✅ **유지보수성**: 각 파일이 하나의 역할만 수행  
✅ **확장성**: 새 기능 추가 시 해당 모듈만 수정  
✅ **재사용성**: 다른 프로젝트에서 모듈 재사용 가능  
✅ **협업**: 여러 개발자가 동시에 다른 파일 작업 가능  
✅ **테스트**: 각 모듈을 독립적으로 테스트 가능

---

## 🎨 핵심 알고리즘

### 한글→영문 자판 변환 알고리즘
```javascript
// 1. 한글 음절 분해
'사' (U+C0AC) → 초성(ㅅ) + 중성(ㅏ) + 종성(없음)

// 2. 각 자모를 영문 키에 매핑
ㅅ → 't'
ㅏ → 'k'

// 3. 결합
'사' → 'tk'

// 전체 단어 처리
'사과' → 'tk' + 'rhk' = 'tkrhk'
```

**유니코드 기반 정확한 변환:**
- 쌍자음, 복합 모음 완벽 지원
- 받침 처리 정확도 100%
- 모든 한글 음절 지원 (가~힣)

---

### ✅ 완료된 기능
- [x] 한국어 단어 패스프레이즈
- [x] 한글→영문 자판 변환
- [x] 힌트 표시 기능

### 🔜 다음 단계 기능

#### 기능 추가
- [ ] 커스텀 단어 리스트 입력
- [ ] 파일 업로드로 단어 리스트 가져오기
- [ ] 비밀번호 검증 기능 (사용자 입력 체크)
- [ ] 비밀번호 엔트로피 계산
- [ ] 생성 기록 내보내기 (CSV)
- [ ] 비밀번호 만료 알림 설정

#### UI/UX 개선
- [ ] 다크 모드 지원
- [ ] 애니메이션 개선
- [ ] 키보드 네비게이션 지원
- [ ] 터치 제스처 지원 (모바일)
- [ ] 힌트 토글 버튼 (숨기기/보이기)

#### 저장 및 동기화
- [ ] 로컬 스토리지에 설정 저장
- [ ] 커스텀 단어 리스트 저장
- [ ] 히스토리 영구 저장 옵션
- [ ] 브라우저 간 동기화

#### 다국어 및 접근성
- [ ] 다국어 UI 지원 (영어, 한국어)
- [ ] 일본어 히라가나/가타카나 지원
- [ ] 스크린 리더 지원 (ARIA)
- [ ] 고대비 모드

#### 고급 기능
- [ ] 비밀번호 강도 상세 분석 (그래프)
- [ ] 역변환 기능 (영문→한글 확인)
- [ ] 혼합 모드 (한글+영문 단어 섞기)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 비밀번호 유출 체크 (Have I Been Pwned API)

---

## 🐛 문제 해결

### Q: "CORS 에러가 발생해요!"
**A:** `file://` 프로토콜로 직접 열면 안 됩니다. Live Server나 로컬 서버를 사용하세요.

### Q: "생성 버튼을 눌러도 아무 일도 안 일어나요"
**A:** 브라우저 콘솔(F12)을 열어 에러를 확인하세요. JavaScript 파일 경로가 올바른지 확인하세요.

### Q: "복사 버튼이 작동하지 않아요"
**A:** 클립보드 API는 HTTPS 또는 localhost에서만 작동합니다. Liver Server는 localhost를 사용하므로 문제없습니다.

### Q: "한국어 패스프레이즈에서 힌트가 안 나와요"
**A:** 언어를 '한국어'로 선택했는지 확인하세요. 영어 모드에서는 힌트가 표시되지 않습니다.

### Q: "한글 변환이 이상해요"
**A:** 일부 특수한 한글 조합은 지원되지 않을 수 있습니다. 기본 단어 리스트는 모두 테스트 완료된 단어입니다.

### Q: "모바일에서 레이아웃이 깨져요"
**A:** 현재 버전은 최대 500px 폭에 최적화되어 있습니다. 추가 개선이 필요합니다.

---

## 💡 사용 팁

### 비밀번호 강도 높이기
1. **길이**: 최소 12자 이상 권장
2. **다양성**: 모든 문자 종류 포함
3. **예측 불가능**: 사전 단어 단독 사용 지양

### 한국어 패스프레이즈 활용
1. **기억하기 쉬운 단어 조합 사용**
   - 나쁜 예: 랜덤 단어들
   - 좋은 예: 스토리가 있는 단어들
   
2. **숫자 추가로 강도 향상**
   - 단어만: `tkrhk-qksksk-cpfl` (보통)
   - 숫자 포함: `tkrhk-qksksk-cpfl-7392` (강함)

3. **구분자 변경으로 개성 추가**
   - 기본: `tkrhk-qksksk-cpfl`
   - 언더스코어: `tkrhk_qksksk_cpfl`
   - 느낌표: `tkrhk!qksksk!cpfl`

---

## 🙏 기여하기

이슈 제보나 개선 제안은 언제나 환영합니다!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazaingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 개인 학습 목적의 토이 프로젝트입니다.

---

## 👩‍💻 개발 환경

- **OS**: Windows 10
- **IDE**: Visual Studio Code
- **Extensions**: Live Server
- **Browser**: Chrome/Edge/Firefox (최신 버전)

---

## 📚 참고 자료

### 웹 표준
- [MDN Web Docs - ES6 Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [CSS Variables](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [Clipboard API](https://developer.mozilla.org/ko/docs/Web/API/Clipboard_API)

### 보안 가이드라인
- [Password Strength Guidelines - NIST](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

### 한글 처리
- [Unicode Hangul Syllables](https://www.unicode.org/charts/PDF/UAC00.pdf)
- [한글 자모 분해 알고리즘](https://gist.github.com/jongmin92/7a9f4a83b3d9c6dbea40b1cea54e1ae3)

---

## 🎓 학습 내용

이 프로젝트를 통해 학습한 내용:

1. **ES6 모듈 시스템**: import/export를 활용한 코드 분리
2. **CSS 변수**: 유지보수 용이한 스타일 관리
3. **DOM 조작**: 효율적인 UI 업데이트
4. **유니코드 처리**: 한글 음절 분해 및 자모 매핑
5. **알고리즘**: 비밀번호 강도 계산, 문자열 셔플
6. **웹 API**: Clipboard API, Local Storage (예정)
7. **반응형 디자인**: Flexbox, Media Query

---

**Made with 💙 for learning web development**