import { STRENGTH_LEVELS } from './config.js';

/**
 * 비밀번호 강도 계산
 */
export function calculateStrength(password) {
  if (!password) return 0;

  let score = 0;
  const length = password.length;

  // 길이 점수 (최대 3점)
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length>= 16) score += 1;

  // 문자 다양성 점수 (최대 4점)
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  return score;
}

/**
 * 점수를 기반으로 강도 레벨 결정
 */
export function getStrengthLevel(score) {
  for (const [key, level] of Object.entries(STRENGTH_LEVELS)) {
    if (score >= level.minScore && score <= level.maxScore) {
      return level;
    }
  }
  return STRENGTH_LEVELS.WEAK;
}

/**
 * 비밀번호 강도 분석 (상세)
 */
export function analyzePassword(password) {
  const score = calculateStrength(password);
  const level = getStrengthLevel(score);

  return {
    score,
    level: level.name,
    className: level.className,
    percentage: level.percentage,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSymbols: /[^a-zA-Z0-9]/.test(password),
    length: password.length
  };
}

/**
 * 비밀번호 상세 검증 (검증기용)
 */
export function validatePassword(password) {
  if (!password) {
    return null;
  }

  const analysis = analyzePassword(password);
  const entropy = calculateEntropy(password);
  const issues = [];
  const suggestions = [];

  // 길이 체크
  if (analysis.length < 8) {
    issues.push('비밀번호가 너무 짧습니다 (8자 미만)');
    suggestions.push('최소 12자 이상으로 늘리세요');
  } else if (analysis.length < 12) {
    suggestions.push('12자 이상으로 늘리면 더 안전합니다');
  }

  // 문자 종류 체크
  if (!analysis.hasLowercase) {
    issues.push('소문자가 포함되어 있지 않습니다');
    suggestions.push('소문자(a-z)를 1개 이상 포함하세요');
  }
  
  if (!analysis.hasUppercase) {
    issues.push('대문자가 포함되어 있지 않습니다');
    suggestions.push('대문자(A-Z)를 1개 이상 포함하세요');
  }
  
  if (!analysis.hasNumbers) {
    issues.push('숫자가 포함되어 있지 않습니다');
    suggestions.push('숫자(0-9)를 1개 이상 포함하세요');
  }
  
  if (!analysis.hasSymbols) {
    issues.push('특수문자가 포함되어 있지 않습니다');
    suggestions.push('특수문자(!@#$%^&* 등)를 1개 이상 포함하세요');
  }

  // 일반적인 패턴 체크
  const commonPatterns = [
    { pattern: /^[a-zA-Z]+$/, message: '문자만으로 구성되어 있습니다' },
    { pattern: /^[0-9]+$/, message: '숫자만으로 구성되어 있습니다' },
    { pattern: /(.)\1{2,}/, message: '같은 문자가 연속으로 반복됩니다' },
    { pattern: /^123|234|345|456|567|678|789/, message: '연속된 숫자 패턴이 포함되어 있습니다' },
    { pattern: /^abc|bcd|cde|def|efg|fgh/i, message: '연속된 알파벳 패턴이 포함되어 있습니다' }
  ];

  commonPatterns.forEach(({ pattern, messasge }) => {
    if (pattern.test(password)) {
      issues.push(messasge);
    }
  });

  // 흔한 단어 체크
  const commonWords = ['password', 'admin', 'user', 'login', '1234', 'qwerty', 'abc'];
  const lowerPassword = password.toLowerCase();
    
  commonWords.forEach(word => {
    if (lowerPassword.includes(word)) {
      issues.push(`흔한 단어 "${word}"가 포함되어 있습니다`);
      suggestions.push('예측 가능한 단어를 피하세요');
    }
  });

  // 해킹 예상 시간 계산
  const crackTime = estimateCrackTime(password);

  return {
    ...analysis,
    ...entropy,
    issues,
    suggestions,
    crackTime
  };
}

/**
 * 해킹 예상 시간 추정
 */
function estimateCrackTime(password) {
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  // 가능한 조합 수
  const combinations = Math.pow(charsetSize, password.length);

  // 초당 10억 번 시도 가정 (현대적인 GPU 기준)
  const attemptsPerSecond = 1e9;
  const seconds = combinations / attemptsPerSecond / 2; // 평균적으로 절반

  return formatTime(seconds);
}

/**
 * 시간 포맷팅
 */
function formatTime(seconds) {
  if (seconds < 1) {
    return '즉시';
  }
  
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365.25;
  const thousand = year * 1000;
  const million = year * 1000000;
  const billion = year * 1000000000;
  const trillion = year * 1000000000000;
  
  if (seconds < minute) {
    return `${Math.round(seconds)}초`;
  }
  if (seconds < hour) {
    return `${Math.round(seconds / minute)}분`;
  }
  if (seconds < day) {
    return `${Math.round(seconds / hour)}시간`;
  }
  if (seconds < year) {
    return `${Math.round(seconds / day)}일`;
  }
  if (seconds < thousand) {
    return `${Math.round(seconds / year)}년`;
  }
  if (seconds < million) {
    const value = Math.round(seconds / thousand);
    return `${value.toLocaleString()}천년`;
  }
  if (seconds < billion) {
    const value = Math.round(seconds / million);
    return `${value.toLocaleString()}백만년`;
  }
  if (seconds < trillion) {
    const value = Math.round(seconds / billion);
    return `${value.toLocaleString()}십억년`;
  }
  
  // 너무 큰 숫자는 "사실상 불가능"으로 표시
  return '사실상 불가능 (우주의 나이보다 긴 시간)';
}

/**
 * 비밀번호 엔트로피 계산
 * @param {string} password - 비밀번호
 * @returns {object} - 엔트로피 정보
 */
export function calculateEntropy(password) {
  if (!password || password.length === 0) {
    return {
      entropy: 0,
      level: '없음',
      className: 'entropy-none',
      description: '비밀번호를 입력하세요'
    };
  }

  // 가능한 문자 집합 크기 계산
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;  // 소문자
  if (/[A-Z]/.test(password)) charsetSize += 26;  // 대문자
  if (/[0-9]/.test(password)) charsetSize += 10;  // 숫자
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;  // 특수문자

  // 엔트로피 계산: log2(charsetSize^length)
  const entropy = Math.log2(Math.pow(charsetSize, password.length));

  // 엔트로피 수준 결정
  let level, className, description;

  if (entropy < 28) {
    level = '매우 약함';
    className = 'entropy-very-weak';
    description = '몇 초 안에 뚫릴 수 있습니다';
  } else if (entropy < 36) {
    level = '약함';
    className = 'entropy-weak';
    description = '몇 분~몇 시간 안에 뚫릴 수 있습니다';
  } else if (entropy < 60) {
    level = '보통';
    className = 'entropy-medium';
    description = '며칠~몇 달 정도 버틸 수 있습니다';
  } else if (entropy < 128) {
    level = '강함';
    className = 'entropy-strong';
    description = '수년~수백년 이상 안전합니다';
  } else {
    level = '매우 강함';
    className = 'entropy-very-strong';
    description = '사실상 뚫을 수 없습니다';
  }

  return {
    entropy: Math.round(entropy * 10) / 10, // 소수점 1자리
    level,
    className,
    description,
    charsetSize
  };
}

/**
 * 엔트로피를 시각적 강도로 변환 (0-100%)
 */
export function getEntropyPercentage(entropy) {
  // 128 bits를 100%로 설정
  const maxEntropy = 128;
  const percentage = Math.min((entropy / maxEntropy) * 100, 100);
  return Math.round(percentage);
}