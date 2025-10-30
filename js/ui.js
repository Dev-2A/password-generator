import { DEFAULT_CONFIG, SELECTORS } from './config.js';
import { analyzePassword } from './strength.js';
import { copyToClipboard } from '../utils/helpers.js';

// 상태 관리
let history = [];

/**
 * 비밀번호 출력 영역 업데이트
 */
export function updatePasswordDisplay(password) {
  const output = document.querySelector(SELECTORS.PASSWORD_OUTPUT);
  output.value = password;
  output.classList.add('fade-in');
}

/**
 * 강도 표시 업데이트
 */
export function updateStrengthIndicator(password) {
  const strengthBar = document.querySelector(SELECTORS.STRENGTH_BAR);
  const strengthText = document.querySelector(SELECTORS.STRENGTH_TEXT);

  if (!password) {
    strengthBar.style.width = '0%';
    strengthBar.className = 'strength-bar';
    strengthText.textContent = '비밀번호를 생성해주세요';
    strengthText.style.color = '';
    return;
  }

  const analysis = analyzePassword(password);

  // 바 업데이트
  strengthBar.style.width = analysis.percentage + '%';
  strengthBar.className = `strength-bar ${analysis.className}`;

  // 텍스트 업데이트
  strengthText.textContent = `강도: ${analysis.level}`;
  const barColor = getComputedStyle(strengthBar).backgroundColor;
  strengthText.style.color = barColor;
}

/**
 * 복사 버튼 피드백
 */
export async function handleCopy() {
  const output = document.querySelector(SELECTORS.PASSWORD_OUTPUT);
  const copyBtn = document.querySelector(SELECTORS.COPY_BTN);

  if (!output.value) {
    alert('복사할 비밀번호가 없습니다!');
    return false;
  }

  const success = await copyToClipboard(output.value);

  if (success) {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✓';
    copyBtn.classList.add('pulse');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('pulse');
    }, DEFAULT_CONFIG.COPY_FEEDBACK_DURATION);

    return true;
  } else {
    alert('복사에 실패했습니다.');
    return false;
  }
}

/**
 * 히스토리에 추가
 */
export function addToHistory(password) {
  // 중복 제거
  history = history.filter(p => p !== password);

  // 최신 항목을 앞에 추가
  history.unshift(password);

  // 최대 개수 제한
  if (history.length > DEFAULT_CONFIG.MAX_HISTORY) {
    history = history.slice(0, DEFAULT_CONFIG.MAX_HISTORY);
  }

  updateHistoryUI();
}

/**
 * 히스토리 UI 업데이트
 */
function updateHistoryUI() {
  const historyList = document.querySelector(SELECTORS.HISTORY_LIST);
  historyList.innerHTML = '';

  if (history.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.textContent = '생성 기록이 없습니다';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = 'var(--color-text-muted)';
    emptyMsg.style.cursor = 'default';
    historyList.appendChild(emptyMsg);
    return;
  }

  history.forEach(password => {
    const li = document.createElement('li');
    li.textContent = password;
    li.title = '클릭하여 불러오기';

    li.addEventListener('click', () => {
      updatePasswordDisplay(password);
      updateStrengthIndicator(password);
    });

    historyList.appendChild(li);
  });
}

/**
 * 옵션 패널 토글
 */
export function toggleOptionsPanel(type) {
  const passwordOptions = document.querySelector(SELECTORS.PASSWORD_OPTIONS);
  const passphraseOptions = document.querySelector(SELECTORS.PASSPHRASE_OPTIONS);

  if (type === 'password') {
    passwordOptions.style.display = 'block';
    passphraseOptions.style.display = 'none';
  } else {
    passwordOptions.style.display = 'none';
    passphraseOptions.style.display = 'block';
  }
}

/**
 * 슬라이더 값 표시 업데이트
 */
export function updateSliderValue(sliderId, displayId) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(displayId);
  display.textContent = slider.value;
}

/**
 * 초기 히스토리 UI 설정
 */
export function initHistoryUI() {
  updateHistoryUI();
}

/**
 * 힌트 표시 업데이트
 */
export function updateHintDisplay(hint) {
  const hintSection = document.querySelector(SELECTORS.HINT_SECTION);
  const hintText = document.querySelector(SELECTORS.HINT_TEXT);

  if (hint) {
    hintText.textContent = hint;
    hintSection.style.display = 'flex';
  } else {
    hintSection.style.display = 'none';
    hintText.textContent = '';
  }
}