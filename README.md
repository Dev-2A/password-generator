# 🔐 스마트 비밀번호 생성기

안전하고 강력한 비밀번호를 생성하는 웹 애플리케이션

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

## ✨ 기능
- ✅ 일반 비밀번호 생성 (커스터마이징 기능)
- ✅ 패스프레이즈 생성 (기억하기 쉬운 단어 조합)
- ✅ 실시간 비밀번호 강도 시각화
- ✅ 클립보드 복사 기능
- ✅ 생성 기록 저장 (최대 5개)

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

## 📝 확장 계획 (To-Do)

### 기능 추가
- [ ] 비밀번호 검증 기능 (사용자 입력 체크)
- [ ] 비밀번호 엔트로피 계산
- [ ] 생성 기록 내보내기 (CSV)
- [ ] 비밀번호 만료 알림 설정

### UI/UX 개선
- [ ] 다크 모드 지원
- [ ] 애니메이션 개선
- [ ] 키보드 네비게이션 지원
- [ ] 터치 제스처 지원 (모바일)

### 저장 및 동기화
- [ ] 로컬 스토리지에 설정 저장
- [ ] 히스토리 영구 저장 옵션
- [ ] 브라우저 간 동기화

### 다국어 및 접근성
- [ ] 다국어 지원 (영어, 한국어)
- [ ] 한글 단어 패스프레이즈 옵션
- [ ] 스크린 리더 지원 (ARIA)
- [ ] 고대비 모드

### 고급 기능
- [ ] 비밀번호 강도 상세 분석 (그래프)
- [ ] 커스텀 단어 리스트 업로드
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

### Q: "모바일에서 레이아웃이 깨져요"
**A:** 현재 버전은 최대 500px 폭에 최적화되어 있습니다. 추가 개선이 필요합니다.

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

- [MDN Web Docs - ES6 Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [CSS Variables](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [Password Strength Guidelines - NIST](https://pages.nist.gov/800-63-3/sp800-63b.html)

---

**Made with 💙 for learning web development**