import { Button, Grid, Kbd, Stack } from "@chakra-ui/react";

import ResetButton from "./ResetButton";

import useKeyboardGame from "../../hooks/useKeyboardGame";

export interface KeyboardProps {
  type?: "qwerty" | "alphabet";
  typedLetters: string[];
  expectedWord: string;
  onClick: (letter: string) => void;
  onReset?: () => void;
}

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const qwertyAlphabet = [..."qwertyuiopasdfghjklzxcvbnm"];

const Keyboard: React.FC<KeyboardProps> = ({
  type = "qwerty",
  expectedWord,
  typedLetters,
  onClick,
  onReset,
}) => {
  const selectedKeyboard = {
    qwerty: qwertyAlphabet,
    alphabet,
  }[type];

  useKeyboardGame({
    expectedWord,
    typedLetters,
    selectedKeyboard,
    onClick,
    onReset,
  });

  return (
    <Stack spacing={4}>
      <ResetButton onClick={onReset} />

      <Grid gridTemplateColumns="repeat(9, 1fr)" gap={4} w="full">
        {selectedKeyboard.map((letter, i) => {
          const isPressed = typedLetters.includes(letter);
          const isCorrect = isPressed && expectedWord.includes(letter);
          const isIncorrect = isPressed && !expectedWord.includes(letter);

          const isDisabled = isPressed;

          return (
            <Kbd
              key={`${letter}-${i}`}
              w="fit-content"
              p={4}
              as={Button}
              onClick={() => onClick(letter)}
              isDisabled={isDisabled}
              bgColor={
                isCorrect ? "green.100" : isIncorrect ? "red.100" : undefined
              }
            >
              {letter.toUpperCase()}
            </Kbd>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Keyboard;
