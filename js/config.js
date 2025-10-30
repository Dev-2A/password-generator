//SECTION - 문자 세트
export const CHARSET = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

//SECTION - 패스프레이즈용 단어 목록
export const WORD_LIST = [
  'apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest', 'galaxy', 'happy',
  'island', 'jungle', 'kitchen', 'lemon', 'mountain', 'nature', 'ocean', 'planet',
  'quantum', 'river', 'sunset', 'thunder', 'universe', 'valley', 'winter', 'yellow',
  'zebra', 'anchor', 'bridge', 'castle', 'diamond', 'engine', 'flame', 'garden',
  'harbor', 'iron', 'jade', 'knight', 'laser', 'magic', 'ninja', 'orbit',
  'phoenix', 'quest', 'rocket', 'storm', 'tiger', 'unicorn', 'volcano', 'wizard',
  'crystal', 'meteor', 'shadow', 'thunder', 'whisper', 'breeze', 'cosmic', 'lunar'
];

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
  MAX_HISTORY: 5,
  COPY_FEEDBACK_DURATION: 1000
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
  PASSPHRASE_OPTIONS: '#passphraseOptions'
};