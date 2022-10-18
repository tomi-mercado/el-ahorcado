import { Button, Grid, Kbd, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

interface KeyboardProps {
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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key;

      if (alphabet.includes(letter)) {
        onClick(letter);
      } else if (event.key === "Escape" || event.key === "Esc") {
        onReset?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expectedWord, typedLetters, onClick, onReset]);

  const selectedKeyboard = {
    qwerty: qwertyAlphabet,
    alphabet,
  }[type];

  return (
    <Stack spacing={4}>
      {onReset && (
        <Kbd
          bgColor="red.100"
          w="fit-content"
          p={4}
          as={Button}
          onClick={onReset}
        >
          Reiniciar (X)
        </Kbd>
      )}
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
