import { CHARSET, WORD_LIST } from './config.js';
import { getRandomElement, getRandomInt, shuffleString } from '../utils/helpers.js';

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
  const { wordCount, separator, capitalize, includeNumber } = options;

  const selectedWords = [];

  // 랜덤 단어 선택
  for (let i = 0; i < wordCount; i++) {
    let word = getRandomElement(WORD_LIST);

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

  return passphrase;
}

/**
 * 비밀번호 타입에 따라 적절한 생성 함수 호출
 */
export function generate(type, options) {
  if (type === 'password') {
    return generatePassword(options);
  } else if (type === 'passphrase') {
    return generatePassphrase(options);
  } else {
    throw new Error('Unknown password type');
  }
}