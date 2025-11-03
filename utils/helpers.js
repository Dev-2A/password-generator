/**
 * 배열에서 랜덤 요소 선택
 */
export function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * 특정 범위의 랜덤 정수 생성
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 문자열 셔플
 */
export function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

/**
 * 클립보드에 텍스트 복사
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    return false;
  }
}

/**
 * 요소에 임시 클래스 추가 (애니메이션용)
 */
export function addTemporaryClass(element, className, duration = 1000) {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, duration);
}

/**
 * 디바운스 함수
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 한글 자모를 영문 키보드 자판으로 매핑
 */
const HANGUL_TO_ENGLISH = {
  // 초성
  'ㄱ': 'r', 'ㄲ': 'R', 'ㄴ': 's', 'ㄷ': 'e', 'ㄸ': 'E',
  'ㄹ': 'f', 'ㅁ': 'a', 'ㅂ': 'q', 'ㅃ': 'Q', 'ㅅ': 't',
  'ㅆ': 'T', 'ㅇ': 'd', 'ㅈ': 'w', 'ㅉ': 'W', 'ㅊ': 'c',
  'ㅋ': 'z', 'ㅌ': 'x', 'ㅍ': 'v', 'ㅎ': 'g',
  
  // 중성
  'ㅏ': 'k', 'ㅐ': 'o', 'ㅑ': 'i', 'ㅒ': 'O', 'ㅓ': 'j',
  'ㅔ': 'p', 'ㅕ': 'u', 'ㅖ': 'P', 'ㅗ': 'h', 'ㅘ': 'hk',
  'ㅙ': 'ho', 'ㅚ': 'hl', 'ㅛ': 'y', 'ㅜ': 'n', 'ㅝ': 'nj',
  'ㅞ': 'np', 'ㅟ': 'nl', 'ㅠ': 'b', 'ㅡ': 'm', 'ㅢ': 'ml',
  'ㅣ': 'l',
  
  // 종성
  'ㄳ': 'rt', 'ㄵ': 'sw', 'ㄶ': 'sg', 'ㄺ': 'fr', 'ㄻ': 'fa',
  'ㄼ': 'fq', 'ㄽ': 'ft', 'ㄾ': 'fx', 'ㄿ': 'fv', 'ㅀ': 'fg',
  'ㅄ': 'qt'
};

/**
 * 한글 단어를 영문 자판으로 변환
 * 예: '사과' → 'tkrhk'
 */
export function convertHangulToEnglish(hangul) {
  let result = '';

  for (let i = 0; i < hangul.length; i++) {
    const char = hangul[i];
    const code = char.charCodeAt(0);

    // 한글 범위 체크 (가-힣: 0xAC00-0xD7A3)
    if (code >= 0xAC00 && code <= 0xD7A3) {
      // 유니코드에서 한글 분해
      const base = code - 0xAC00;
      const choIndex = Math.floor(base / 588);  // 초성 (19개)
      const jungIndex = Math.floor((base % 588) / 28);  // 중성 (21개)
      const jongIndex = base % 28;  // 종성 (28개, 0은 없음)

      // 초성, 중성, 종성 배열
      const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
      const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
      const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
      
      // 초성 변환
      result += HANGUL_TO_ENGLISH[CHO[choIndex]] || '';

      // 중성 변환
      result += HANGUL_TO_ENGLISH[JUNG[jungIndex]] || '';

      // 종성 변환 (있는 경우만)
      if (jongIndex > 0) {
        result += HANGUL_TO_ENGLISH[JONG[jongIndex]] || '';
      }
    } else {
      // 한글이 아닌 문자는 그대로
      result += char;
    }
  }

  return result;
};

/**
 * 로컬 스토리지에 데이터 저장
 */
export function saveToLocalStorage(key, data) {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    console.error('로컬 스토리지 저장 실패:', error);
    return false;
  }
}

/**
 * 로컬 스토리지에서 데이터 불러오기
 */
export function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const jsonString = localStorage.getItem(key);
    if (jsonString === null) {
      return defaultValue;
    }
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('로컬 스토리지 불러오기 실패:', error);
    return defaultValue;
  }
}

/**
 * 로컬 스토리지에서 데이터 삭제
 */
export function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('로컬 스토리지 삭제 실패:', error);
    return false;
  }
}