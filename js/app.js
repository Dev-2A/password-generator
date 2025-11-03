import { generate } from './generator.js';
import {
  updatePasswordDisplay,
  updateStrengthIndicator,
  handleCopy,
  addToHistory,
  toggleOptionsPanel,
  updateSliderValue,
  initHistoryUI,
  updateHintDisplay,
  loadHistory,
  clearHistory
} from './ui.js';
import { SELECTORS, STORAGE_KEYS, DEFAULT_SETTINGS } from './config.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/helpers.js';
import { calculateStrength, getStrengthLevel, analyzePassword, validatePassword, calculateEntropy, getEntropyPercentage } from './strength.js';

/**
 * 애플리케이션 초기화
 */
function init() {
  loadTheme();
  loadHistory();
  loadSettings();
  loadCustomWords();
  setupEventListeners();
  initHistoryUI();
  console.log('🔐 비밀번호 생성기 초기화 완료');
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
  // 생성 버튼
  const generateBtn = document.querySelector(SELECTORS.GENERATE_BTN);
  generateBtn.addEventListener('click', handleGenerate);

  // 복사 버튼
  const copyBtn = document.querySelector(SELECTORS.COPY_BTN);
  copyBtn.addEventListener('click', handleCopy);

  // 타입 라디오 버튼
  const typeRadios = document.querySelectorAll(SELECTORS.TYPE_RADIOS);
  typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      toggleOptionsPanel(e.target.value);
    });
  });

  // 언어 선택 변경 이벤트
  const languageRadios = document.querySelectorAll('input[name="language"]');
  languageRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      toggleCustomWordsSection(e.target.value);
    });
  });

  // 슬라이더 값 표시
  const lengthSlider = document.getElementById('length');
  lengthSlider.addEventListener('input', () => {
    updateSliderValue('length', 'lengthValue');
  });

  const wordCountSlider = document.getElementById('wordCount');
  wordCountSlider.addEventListener('input', () => {
    updateSliderValue('wordCount', 'wordCountValue');
  });

  // 커스텀 단어 입력 실시간 검증
  const customWordsInput = document.getElementById('customWords');
  if (customWordsInput) {
    customWordsInput.addEventListener('input', updateWordCount);
    customWordsInput.addEventListener('blur', saveCustomWords);
  }

  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', clearHistory);
  }

  // 탭 전환
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      switchTab(e.target.dataset.tab);
    });
  });

  // 검증 버튼
  const validateBtn = document.querySelector(SELECTORS.VALIDATE_BTN);
  if (validateBtn) {
    validateBtn.addEventListener('click', handleValidate);
  }

  // 비밀번호 보기/숨기기 토글
  const togglePasswordBtn = document.querySelector(SELECTORS.TOGGLE_PASSWORD_BTN);
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
  }

  // 검증 입력 필드에서 엔터키
  const passwordToValidate = document.querySelector(SELECTORS.PASSWORD_TO_VALIDATE);
  if (passwordToValidate) {
    passwordToValidate.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleValidate();
      }
    });
  }

  // 테마 토글 버튼
  const themeToggle = document.querySelector(SELECTORS.THEME_TOGGLE);
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // 엔터키로 생성
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  });

  // 설정 변경 시 자동 저장
  document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('change', saveSettings);
  });

  // 슬라이더는 input 이벤트에도 반응
  lengthSlider.addEventListener('input', saveSettings);
  wordCountSlider.addEventListener('input', saveSettings);
}

/**
 * 비밀번호 생성 처리
 */
function handleGenerate() {
  try {
    const type = document.querySelector('input[name="type"]:checked').value;
    const options = getOptions(type);
    const result = generate(type, options);

    updatePasswordDisplay(result.password);
    updateStrengthIndicator(result.password);
    updateHintDisplay(result.hint);
    updateEntropyMini(result.password);
    addToHistory(result.password);

  } catch (error) {
    alert(error.message);
    console.error('생성 오류', error);
  }
}

/**
 * 현재 선택된 옵션 가져오기
 */
function getOptions(type) {
  if (type === 'password') {
    return {
      length: parseInt(document.getElementById('length').value),
      includeUppercase: document.getElementById('uppercase').checked,
      includeLowerCase: document.getElementById('lowercase').checked,
      includeNumbers: document.getElementById('numbers').checked,
      includesSymbols: document.getElementById('symbols').checked
    };
  } else {
    const language = document.querySelector('input[name="language"]:checked').value;
    const options = {
      wordCount: parseInt(document.getElementById('wordCount').value),
      separator: document.getElementById('separator').value || '-',
      capitalize: document.getElementById('capitalize').checked,
      includeNumber: document.getElementById('includeNumber').checked,
      language: language
    };

    // 커스텀 언어인 경우 단어 추가
    if (language === 'custom') {
      options.customWords = document.getElementById('customWords').value;
    }

    return options;
  }
}

/**
 * 현재 설정 저장
 */
function saveSettings() {
  const type = document.querySelector('input[name="type"]:checked').value;

  const settings = {
    type: type,
    password: {
      length: parseInt(document.getElementById('length').value),
      uppercase: document.getElementById('uppercase').checked,
    lowercase: document.getElementById('lowercase').checked,
      numbers: document.getElementById('numbers').checked,
      symbols: document.getElementById('symbols').checked
    },
    passphrase: {
      wordCount: parseInt(document.getElementById('wordCount').value),
      language: document.querySelector('input[name="language"]:checked').value,
      separator: document.getElementById('separator').value,
      capitalize: document.getElementById('capitalize').checked,
      includeNumber: document.getElementById('includeNumber').checked,
      customWords: document.getElementById('customWords').value
    }
  };

  saveToLocalStorage(STORAGE_KEYS.SETTINGS, settings);
}

/**
 * 저장된 설정 불러오기
 */
function loadSettings() {
  const settings = loadFromLocalStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);

  // 타입 복원
  const typeRadio = document.querySelector(`input[name="type"][value="${settings.type}"]`);
  if (typeRadio) {
    typeRadio.checked = true;
    toggleOptionsPanel(settings.type);
  }

  // 일반 비밀번호 설정 복원
  document.getElementById('length').value = settings.password.length;
  document.getElementById('lengthValue').textContent = settings.password.length;
  document.getElementById('uppercase').checked = settings.password.uppercase;
  document.getElementById('lowercase').checked = settings.password.lowercase;
  document.getElementById('numbers').checked = settings.password.numbers;
  document.getElementById('symbols').checked = settings.password.symbols;
  
  // 패스프레이즈 설정 복원
  document.getElementById('wordCount').value = settings.passphrase.wordCount;
  document.getElementById('wordCountValue').textContent = settings.passphrase.wordCount;
  
  const languageRadio = document.querySelector(`input[name="language"][value="${settings.passphrase.language}"]`);
  if (languageRadio) {
    languageRadio.checked = true;
  }
  
  document.getElementById('separator').value = settings.passphrase.separator;
  document.getElementById('capitalize').checked = settings.passphrase.capitalize;
  document.getElementById('includeNumber').checked = settings.passphrase.includeNumber;

  // 커스텀 단어 복원
  if (settings.passphrase.customWords) {
    document.getElementById('customWords').value = settings.passphrase.customWords;
  }

  // 커스텀 언어가 선택되어 있으면 섹션 표시
  if (settings.passphrase.language === 'custom') {
    toggleCustomWordsSection('custom');
  }
}

/**
 * 커스텀 단어 섹션 토글
 */
function toggleCustomWordsSection(language) {
  const customSection = document.getElementById('customWordsSection');

  if (language === 'custom') {
    customSection.style.display = 'block';
    updateWordCount();
  } else {
    customSection.style.display = 'none';
  }
}

/**
 * 커스텀 단어 수 업데이트
 */
function updateWordCount() {
  const customWordsInput = document.getElementById('customWords');
  const wordCountInfo = document.getElementById('wordCountInfo');
  const wordCountSlider = document.getElementById('wordCount');

  if (!customWordsInput || !wordCountInfo) return;

  const text = customWordsInput.value.trim();

  if (text === '') {
    wordCountInfo.textContent = '0개 단어';
    wordCountInfo.className = 'word-count-info';
    return;
  }

  // 쉼표로 분리하고 유효한 단어만 카운트
  const words = text
    .split(',')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  const count = words.length;
  const requiredCount = parseInt(wordCountSlider.value);

  wordCountInfo.textContent = `${count}개 단어`;

  if (count >= requiredCount) {
    wordCountInfo.className = 'word-count-info valid';
  } else {
    wordCountInfo.className = 'word-count-info invalid';
  }
}

/**
 * 커스텀 단어 로컬 스토리지에 저장
 */
function saveCustomWords() {
  const customWordsInput = document.getElementById('customWords');
  if (customWordsInput) {
    saveToLocalStorage(STORAGE_KEYS.CUSTOM_WORDS, customWordsInput.value);
  }
}

/**
 * 커스텀 단어 로컬 스토리지에서 불러오기
 */
function loadCustomWords() {
  const savedWords = loadFromLocalStorage(STORAGE_KEYS.CUSTOM_WORDS, '');
  const customWordsInput = document.getElementById('customWords');

  if (customWordsInput && savedWords) {
    customWordsInput.value = savedWords;
    updateWordCount();
  }
}

/**
 * 탭 전환
 */
function switchTab(tabName) {
  // 모든 탭 버튼과 컨텐츠 비활성화
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  // 선택된 탭 활성화
  const selectedButton = document.querySelector(`[data-tab="${tabName}"]`);
  const selectedContent = document.getElementById(`${tabName}Tab`);

  if (selectedButton && selectedContent) {
    selectedButton.classList.add('active');
    selectedContent.classList.add('active');
  }
}

/**
 * 비밀번호 검증 처리
 */
function handleValidate() {
  const passwordInput = document.querySelector(SELECTORS.PASSWORD_TO_VALIDATE);
  const password = passwordInput.value;

  if (!password) {
    alert('검증할 비밀번호를 입력해주세요!');
    return;
  }

  const validation = validatePassword(password);
  displayValidationResult(validation);
}

/**
 * 검증 결과 표시
 */
function displayValidationResult(validation) {
  const resultSection = document.querySelector(SELECTORS.VALIDATION_RESULT);
  const strengthBar = document.querySelector(SELECTORS.VALIDATOR_STRENGTH_BAR);
  const strengthText = document.querySelector(SELECTORS.VALIDATOR_STRENGTH_TEXT);

  // 결과 섹션 표시
  resultSection.style.display = 'flex';

  // 강도 표시
  strengthBar.style.width = validation.percentage + '%';
  strengthBar.className = `strength-bar ${validation.className}`;
  strengthText.textContent = `강도: ${validation.level}`;
  strengthText.style.color = getComputedStyle(strengthBar).backgroundColor;

  // 상세 정보
  document.getElementById('detailLength').textContent = `${validation.length}자`;

  const types = [];
  if (validation.hasLowercase) types.push('소문자');
  if (validation.hasUppercase) types.push('대문자');
  if (validation.hasNumbers) types.push('숫자');
  if (validation.hasSymbols) types.push('특수문자');
  document.getElementById('detailTypes').textContent = types.join(', ') || '없음';

  document.getElementById('detailCrackTime').textContent = validation.crackTime;

  // 문제점 표시
  const issuesSection = document.getElementById('issuesSection');
  const issuesList = document.getElementById('issuesList');

  if (validation.issues.length > 0) {
    issuesSection.style.display = 'block';
    issuesList.innerHTML = '';
    validation.issues.forEach(issue => {
      const li = document.createElement('li');
      li.textContent = issue;
      issuesList.appendChild(li);
    });
  } else {
    issuesSection.style.display = 'none';
  }

  // 개선 제안 표시
  const suggestionsSection = document.getElementById('suggestionsSection');
  const suggestionsList = document.getElementById('suggestionsList');

  if (validation.suggestions.length > 0) {
    suggestionsSection.style.display = 'block';
    suggestionsList.innerHTML = '';

    // 중복 제거
    const uniqueSuggestions = [...new Set(validation.suggestions)];

    uniqueSuggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      suggestionsList.appendChild(li);
    });
  } else {
    suggestionsSection.style.display = 'none';
  }

  // 엔트로피 표시
  document.getElementById('entropyBits').textContent = validation.entropy || '0';
  document.getElementById('entropyDescription').textContent = validation.description || '';

  const entropyBar = document.getElementById('entropyBar');
  const entropyPercentage = getEntropyPercentage(validation.entropy || 0);
  entropyBar.style.width = entropyPercentage + '%';
  entropyBar.className = `entropy-bar ${validation.className || ''}`;

  // 결과로 스크롤
  result.Section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * 비밀번호 보기/숨기기 토글
 */
function togglePasswordVisibility() {
  const passwordInput = document.querySelector(SELECTORS.PASSWORD_TO_VALIDATE);
  const toggleBtn = document.querySelector(SELECTORS.TOGGLE_PASSWORD_BTN);

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = '🙈';
    toggleBtn.title = '숨기기';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = '👁';
    toggleBtn.title = '보기';
  }
}

/**
 * 테마 토글
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(newTheme);
}

/**
 * 테마 설정
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // 아이콘 변경
  const themeIcon = document.querySelector('.theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀' : '🌙';
  }

  // 로컬 스토리지에 저장
  saveToLocalStorage(STORAGE_KEYS.THEME, theme);
}

/**
 * 저장된 테마 불러오기
 */
function loadTheme() {
  // 로컬 스토리지에서 불러오기
  const savedTheme = loadFromLocalStorage(STORAGE_KEYS.THEME, null);

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // 시스템 설정 감지
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

/**
 * 생성기의 미니 엔트로피 표시
 */
function updateEntropyMini(password) {
  const entropyMini = document.getElementById('entropyMini');
  
  if (!entropyMini) return;

  if (!password) {
    entropyMini.textContent = '';
    return;
  }

  const entropy = calculateEntropy(password);

  entropyMini.textContent = `🔐 ${entropy.entropy} bits`;

  if (entropy.entropy >= 60) {
    entropyMini.classList.add('high');
  } else {
    entropyMini.classList.remove('high');
  }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', init);