import { Button, Grid, GridItem, Kbd, Stack } from "@chakra-ui/react";

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

const getQwertyDistributionGrid = () => {
  return [
    qwertyAlphabet.slice(0, 10),
    qwertyAlphabet.slice(10, 19),
    qwertyAlphabet.slice(19, 26),
  ];
};

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

  const qwertyDistributionGrid = getQwertyDistributionGrid();

  return (
    <Stack spacing={{ base: 3, md: 4 }}>
      <ResetButton onClick={onReset} />

      {qwertyDistributionGrid.map((row, rowIndex) => {
        return (
          <Grid
            key={rowIndex}
            templateColumns={{
              base: `repeat(${row.length}, 1.25rem)`,
              md: `repeat(${row.length}, 2.5rem)`,
            }}
            gap={3}
            justifyContent="center"
          >
            {row.map((letter, i) => {
              const isPressed = typedLetters.includes(letter);
              const isCorrect = isPressed && expectedWord.includes(letter);
              const isIncorrect = isPressed && !expectedWord.includes(letter);

              const isDisabled = isPressed;

              return (
                <GridItem key={`${letter}-${i}`}>
                  <Kbd
                    w="fit-content"
                    minW={{ base: 6, md: 10 }}
                    h={{ base: 8, md: 10 }}
                    as={Button}
                    onClick={() => onClick(letter)}
                    isDisabled={isDisabled}
                    bgColor={
                      isCorrect
                        ? "green.100"
                        : isIncorrect
                        ? "red.100"
                        : undefined
                    }
                  >
                    {letter.toUpperCase()}
                  </Kbd>
                </GridItem>
              );
            })}
          </Grid>
        );
      })}
    </Stack>
  );
};

export default Keyboard;
