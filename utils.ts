export const removeAccents = (word: string): string => {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const wordHasSpaces = (word: string): boolean => {
  return word.includes(" ");
};

export const lowerCaseString = (word: string): string => {
  return word.toLowerCase();
};

export const parseWordToBePlayable = (word: string): string => {
  if (wordHasSpaces(word)) {
    throw new Error("Word can't have spaces to be playable");
  }

  return lowerCaseString(removeAccents(word));
};
