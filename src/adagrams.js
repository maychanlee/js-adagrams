const LETTERS = {
  A: {qty:9, score:1},
  B: {qty:2, score:3},
  C: {qty:2, score:3},
  D: {qty:4, score:2},
  E: {qty:12, score:1},
  F: {qty:2, score:4},
  G: {qty:3, score:2},
  H: {qty:2, score:4},
  I: {qty:9, score:1},
  J: {qty:1, score:8},
  K: {qty:1, score:5},
  L: {qty:4, score:1},
  M: {qty:2, score:3},
  N: {qty:6, score:1},
  O: {qty:8, score:1},
  P: {qty:2, score:3},
  Q: {qty:1, score:10},
  R: {qty:6, score:1},
  S: {qty:4, score:1},
  T: {qty:6, score:1},
  U: {qty:4, score:1},
  V: {qty:2, score:4},
  W: {qty:2, score:4},
  X: {qty:1, score:8},
  Y: {qty:2, score:4},
  Z: {qty:1, score:10},
};

const drawableAvailableLetters = (letterPool) => {
  const availableLetters = [];
  for (const [letter, quantity] of Object.entries(letterPool)) {
    for (let i = 0; i < quantity.qty; i++) {
      availableLetters.push(letter);
    };
  };
  return availableLetters;
};

export const drawLetters = () => {
  const letterPool = drawableAvailableLetters(LETTERS);
  const outputLetters = [];
  
  const MAX_HAND_LENGTH = 10;

  while (outputLetters.length < MAX_HAND_LENGTH) {
    const index = Math.floor(Math.random() * letterPool.length);
    outputLetters.push(letterPool[index]);
    [letterPool[index], letterPool[letterPool.length - 1]] = [letterPool[letterPool.length - 1], letterPool[index]];
    letterPool.pop();
  }
  return outputLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handMap = new Map();
  const wordMap = new Map();

  for (const letter of input.toUpperCase()) {
    const letterCount = wordMap.get(letter) || 0;
    wordMap.set(letter, letterCount+1);
  }

  for (const hand of lettersInHand) {
    const handCount = handMap.get(hand) || 0;
    handMap.set(hand, handCount+1);
  }

  for (const [letter, count] of wordMap) {
    if ((handMap.get(letter) || 0) < count) {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  const BONUS_SCORE = 8;

  for (const letter of word.toUpperCase()) {
    const points = LETTERS[letter].score;
    score += points;
  }

  if (word.length >= 7) {
    score += BONUS_SCORE;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  let highestWord = '';
  let highestPoints = 0;

  for (const word of words){
    const points = scoreWord(word);

    if (points > highestPoints){
      highestPoints = points;
      highestWord = word;
    } else if (points === highestPoints) {
      if (word.length == highestWord.length) {
        continue;
      } else if (word.length == 10) {
        highestWord = word;
        continue;
      } else if (word.length < highestWord.length && highestWord.length !== 10) {
        highestWord = word;
      }
    }
  }
  return {word: highestWord, score: highestPoints};
};
