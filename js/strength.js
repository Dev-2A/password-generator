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