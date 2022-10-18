import { parseWordToBePlayable, wordHasSpaces } from "../utils";

export const getWord = async (): Promise<string> => {
  const response = await fetch(
    `https://random-word-api.herokuapp.com/word?lang=es`
  );
  const newWord = (await response.json())[0];

  if (wordHasSpaces(newWord)) {
    return getWord();
  }

  return parseWordToBePlayable(newWord);
};
