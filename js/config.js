//SECTION - 문자 세트
export const CHARSET = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

//SECTION - 패스프레이즈용 단어 목록
export const WORD_LIST_EN = [
  'apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest', 'galaxy', 'happy',
  'island', 'jungle', 'kitchen', 'lemon', 'mountain', 'nature', 'ocean', 'planet',
  'quantum', 'river', 'sunset', 'thunder', 'universe', 'valley', 'winter', 'yellow',
  'zebra', 'anchor', 'bridge', 'castle', 'diamond', 'engine', 'flame', 'garden',
  'harbor', 'iron', 'jade', 'knight', 'laser', 'magic', 'ninja', 'orbit',
  'phoenix', 'quest', 'rocket', 'storm', 'tiger', 'unicorn', 'volcano', 'wizard',
  'crystal', 'meteor', 'shadow', 'thunder', 'whisper', 'breeze', 'cosmic', 'lunar'
];

// 한국어 단어
export const WORD_LIST_KO = [
  '사과', '바나나', '체리', '용', '독수리', '숲', '은하', '행복',
  '섬', '정글', '부엌', '레몬', '산', '자연', '바다', '행성',
  '양자', '강', '일몰', '천둥', '우주', '계곡', '겨울', '노랑',
  '얼룩말', '닻', '다리', '성', '다이아', '엔진', '불꽃', '정원',
  '항구', '철', '옥', '기사', '레이저', '마법', '닌자', '궤도',
  '불사조', '탐험', '로켓', '폭풍', '호랑이', '유니콘', '화산', '마법사',
  '수정', '유성', '그림자', '속삭임', '산들바람', '달빛', '별빛', '구름',
  '꽃', '나무', '하늘', '땅', '바람', '물', '불', '빛'
];

//SECTION - 단어 리스트 맵 (언어별)
export const WORD_LISTS = {
  en: WORD_LIST_EN,
  ko: WORD_LIST_KO,
  custom: []
};

export const WORD_LIST = WORD_LIST_EN;

//SECTION - 강도 레벨 설정
export const STRENGTH_LEVELS = {
  WEAK: {
    name: '약함',
    className: 'strength-weak',
    percentage: 25,
    minScore: 0,
    maxScore: 2
  },
  MEDIUM: {
    name: '보통',
    className: 'strength-medium',
    percentage: 50,
    minScore: 3,
    maxScore: 4
  },
  STRONG: {
    name: '강함',
    className: 'strength-strong',
    percentage: 75,
    minScore: 5,
    maxScore: 6
  },
  VERY_STRONG: {
    name: '매우 강함',
    className: 'strength-very-strong',
    percentage: 100,
    minScore: 7,
    maxScore: Infinity
  }
};

//SECTION - 기본 설정
export const DEFAULT_CONFIG = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 32,
  PASSWORD_DEFAULT_LENGTH: 12,
  PASSPHRASE_MIN_WORDS: 3,
  PASSPHRASE_MAX_WORDS: 8,
  PASSPHRASE_DEFAULT_WORDS: 4,
  MAX_HISTORY: 20,
  COPY_FEEDBACK_DURATION: 1000
};

//SECTION - 로컬 스토리지 키 이름
export const STORAGE_KEYS = {
  SETTINGS: 'password-generator-settings',
  HISTORY: 'password-generator-history',
  CUSTOM_WORDS: 'password-generator-custom-words',
  THEME: 'password-generator-theme'
};

//SECTION - 기본 설정값
export const DEFAULT_SETTINGS = {
  type: 'password',
  password: {
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    sysmbols: true
  },
  passphrase: {
    wordCount: 4,
    language: 'en',
    separator: '-',
    capitalize: false,
    includeNumber: false,
    customWords: ''
  }
};

//SECTION - DOM 선택자
export const SELECTORS = {
  PASSWORD_OUTPUT: '#passwordOutput',
  COPY_BTN: '#copyBtn',
  GENERATE_BTN: '#generateBtn',
  STRENGTH_BAR: '#strengthBar',
  STRENGTH_TEXT: '#strengthText',
  HISTORY_LIST: '#historyList',
  TYPE_RADIOS: 'input[name="type"]',
  PASSWORD_OPTIONS: '#passwordOptions',
  PASSPHRASE_OPTIONS: '#passphraseOptions',
  HINT_SECTION: '#hintSection',
  HINT_TEXT: '#hintText',
  VALIDATE_BTN: '#validateBtn',
  PASSWORD_TO_VALIDATE: '#passwordToValidate',
  TOGGLE_PASSWORD_BTN: '#togglePasswordBtn',
  VALIDATION_RESULT: '#validationResult',
  VALIDATOR_STRENGTH_BAR: '#validatorStrengthBar',
  VALIDATOR_STRENGTH_TEXT: '#validatorStrengthText',
  THEME_TOGGLE: '#themeToggle'
};