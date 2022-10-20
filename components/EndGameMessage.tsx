import { Text, chakra } from "@chakra-ui/react";

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
    <Text
      fontSize="3xl"
      color={win ? "green.400" : "red.400"}
      fontWeight="bold"
      textAlign="center"
    >
      {win ? (
        <>
          ¡Has acertado! <br />
          👏👏👏
        </>
      ) : (
        <>
          Perdiste 🥺 <br />
          <chakra.span fontSize="xl">
            La palabra era: {expectedWord.toUpperCase()}
          </chakra.span>
        </>
      )}
    </Text>
  );
};

export default EndGameMessage;
