import { generate } from './generator.js';
import {
  updatePasswordDisplay,
  updateStrengthIndicator,
  handleCopy,
  addToHistory,
  toggleOptionsPanel,
  updateSliderValue,
  initHistoryUI,
  updateHintDisplay
} from './ui.js';
import { SELECTORS } from './config.js';

/**
 * 애플리케이션 초기화
 */
function init() {
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

  // 슬라이더 값 표시
  const lengthSlider = document.getElementById('length');
  lengthSlider.addEventListener('input', () => {
    updateSliderValue('length', 'lengthValue');
  });

  const wordCountSlider = document.getElementById('wordCount');
  wordCountSlider.addEventListener('input', () => {
    updateSliderValue('wordCount', 'wordCountValue');
  });

  // 엔터키로 생성
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  });
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
    return {
      wordCount: parseInt(document.getElementById('wordCount').value),
      separator: document.getElementById('separator').value || '-',
      capitalize: document.getElementById('capitalize').checked,
      includeNumber: document.getElementById('includeNumber').checked,
      language: document.querySelector('input[name="language"]:checked').value
    };
  }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', init);