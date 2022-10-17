import { Button, Grid, Kbd } from "@chakra-ui/react";

interface KeyboardProps {
  type?: "qwerty" | "alphabet";
  onClick: (letter: string) => void;
}

const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
const qwertyAlphabet = [..."qwertyuiopasdfghjklzxcvbnm"];

const Keyboard: React.FC<KeyboardProps> = ({ type = "qwerty", onClick }) => {
  const selectedKeyboard = {
    qwerty: qwertyAlphabet,
    alphabet,
  }[type];

  return (
    <Grid gridTemplateColumns="repeat(9, 1fr)" gap={4} w="full">
      {selectedKeyboard.map((letter, i) => {
        return (
          <Kbd
            key={`${letter}-${i}`}
            w="fit-content"
            p={4}
            as={Button}
            onClick={() => onClick(letter)}
          >
            {letter.toUpperCase()}
          </Kbd>
        );
      })}
    </Grid>
  );
};

export default Keyboard;
