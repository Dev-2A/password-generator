import { CHARSET, WORD_LISTS } from './config.js';
import { getRandomElement, getRandomInt, shuffleString, convertHangulToEnglish } from '../utils/helpers.js';

/**
 * 일반 비밀번호 생성
 */
export function generatePassword(options) {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;

  let charset = '';
  let password = '';

  // 문자 세트 구성
  if (includeUppercase) charset += CHARSET.UPPERCASE;
  if (includeLowercase) charset += CHARSET.LOWERCASE;
  if (includeNumbers) charset += CHARSET.NUMBERS;
  if (includeSymbols) charset += CHARSET.SYMBOLS;

  // 선택된 옵션이 없으면 에러
  if (charset === '') {
    throw new Error('최소 하나의 옵션을 선택해주세요!');
  }

  // 각 타입별로 최소 1개씩 보장
  const guaranteedChars = [];
  if (includeUppercase) guaranteedChars.push(getRandomElement(CHARSET.UPPERCASE));
  if (includeLowercase) guaranteedChars.push(getRandomElement(CHARSET.LOWERCASE));
  if (includeNumbers) guaranteedChars.push(getRandomElement(CHARSET.NUMBERS));
  if (includeSymbols) guaranteedChars.push(getRandomElement(CHARSET.SYMBOLS));

  // 나머지 길이만큼 랜덤 생성
  for (let i = guaranteedChars.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // 보장된 문자 추가 후 셔플
  password += guaranteedChars.join('');
  password = shuffleString(password).slice(0, length);

  return password;
}

/**
 * 패스프레이즈 생성
 */
export function generatePassphrase(options) {
  const { wordCount, separator, capitalize, includeNumber, language, customWords } = options;

  let wordList;
  let isKoreanBased = false; // 한글 기반 여부

  // 커스텀 단어 처리
  if (language === 'custom') {
    if (!customWords || customWords.trim() === '') {
      throw new Error('커스텀 단어를 입력해주세요!');
    }

    // 쉼표로 분리하고 공백 제거
    wordList = customWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    if (wordList.length === 0) {
      throw new Error('유효한 단어를 입력해주세요!');
    }

    if (wordList.length < wordCount) {
      throw new Error(`최소 ${wordCount}개 이상의 단어가 필요합니다! (현재: ${wordList.length}개)`);
    }

    // 한글이 포함되어 있는지 확인
    isKoreanBased = wordList.some(word => /[가-힣]/.test(word));
  } else {
    // 선택된 언어의 단어 리스트 가져오기
    wordList = WORD_LISTS[language] || WORD_LISTS.en;
    isKoreanBased = (language === 'ko');
  }

  const selectedWords = [];
  const originalWords = [];   // 원본 한글 저장용

  // 랜덤 단어 선택
  for (let i = 0; i < wordCount; i++) {
    let word = getRandomElement(wordList);
    const originalWord = word;    // 원본 저장

    // 한국어인 경우 영문 자판으로 변환
    if (isKoreanBased || /[가-힣]/.test(word)) {
      originalWords.push(originalWord);
      word = convertHangulToEnglish(word);
    }

    // 첫 글자 대문자 옵션
    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    selectedWords.push(word);
  }

  // 조합
  let passphrase = selectedWords.join(separator);

  // 숫자 추가 옵션
  if (includeNumber) {
    const randomNum = getRandomInt(0, 9999);
    passphrase += separator + randomNum;
  }

  // 한국어인 경우 힌트 정보도 함께 반환
if (originalWords.length > 0) {
  let hint = originalWords.join(separator);
  if (includeNumber) {
    hint += separator + '(숫자)';
  }
  return { password: passphrase, hint: hint };
}

return { password: passphrase, hint: null };
}

/**
 * 비밀번호 타입에 따라 적절한 생성 함수 호출
 */
export function generate(type, options) {
  if (type === 'password') {
    return { password: generatePassword(options), hint: null };
  } else if (type === 'passphrase') {
    return generatePassphrase(options);
  } else {
    throw new Error('Unknown password type');
  }
}