import { Text } from "@chakra-ui/react";

interface EndGameMessageProps {
  win: boolean;
  lost: boolean;
  expectedWord: string;
}

const EndGameMessage: React.FC<EndGameMessageProps> = ({
  lost,
  win,
  expectedWord,
}) => {
  if (win && lost) {
    throw new Error("You can't win and lost at the same time");
  }

  if (!win && !lost) {
    return null;
  }

  return (
    <Text fontSize="3xl" color={win ? "green.400" : "red.400"}>
      {win
        ? "Has acertado!"
        : `Perdiste :( La palabra era: ${expectedWord.toUpperCase()}`}
    </Text>
  );
};

export default EndGameMessage;
