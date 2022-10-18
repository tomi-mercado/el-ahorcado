import { Stack, Text } from "@chakra-ui/react";

interface AssertionsProps {
  expectedWord: string | null;
  typedLetters: string[];
}

const Assertions: React.FC<AssertionsProps> = ({
  expectedWord,
  typedLetters,
}) => {
  const expectedWordArr = expectedWord?.split("") || [];

  return (
    <Stack direction="row">
      {expectedWordArr.map((letter, i) => {
        const isLetterPressed = typedLetters.includes(letter);
        return (
          <Text key={`expected-word-${letter}-${i}`} fontSize="2xl">
            {isLetterPressed ? letter.toUpperCase() : "_"}
          </Text>
        );
      })}
    </Stack>
  );
};

export default Assertions;
