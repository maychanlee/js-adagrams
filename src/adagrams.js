const LETTER_POOL = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2,
  'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4,
  'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6,
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1,
  'Y': 2, 'Z': 1,
};

const drawableAvailableLetters = (letterPool) => {
  let availableLetters = [];
  for (const [letter, qty] of Object.entries(letterPool)) {
    for (let i = 0; i < qty; i++) {
      availableLetters.push(letter);
    };
  };
  return availableLetters;
};

export const drawLetters = () => {
  const letterPool = drawableAvailableLetters(LETTER_POOL);
  let outputLetters = [];
  
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
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
